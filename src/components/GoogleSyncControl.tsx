'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FirebaseOptions } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { questions } from '../content/questions';
import { vocabularyQuestions } from '../content/vocabulary';
import type { LearningState } from '../domain/types';
import { parseBackup, serializeBackup } from '../learning/backup';
import { mergeLearningStates } from '../learning/merge';
import { LEARNING_STATE_CHANGED_EVENT, loadLearningState, saveLearningState } from '../learning/storage';

const knownIds = new Set([...questions, ...vocabularyQuestions].map((question) => question.id));
const FIREBASE_APP_NAME = 'fe-study-sync';
const CLOUD_WRITE_DELAY_MS = 650;

type SyncStatus = 'loading' | 'local' | 'syncing' | 'synced' | 'error';
type AuthModule = typeof import('firebase/auth');
type FirestoreModule = typeof import('firebase/firestore');

type FirebaseRuntime = {
  auth: Auth;
  db: Firestore;
  authModule: AuthModule;
  firestoreModule: FirestoreModule;
};

async function loadFirebaseOptions(): Promise<FirebaseOptions> {
  const response = await fetch('/firebase-config.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`firebase-config:${response.status}`);
  const value = await response.json() as FirebaseOptions;
  if (!value.apiKey || !value.authDomain || !value.projectId || !value.appId) throw new Error('firebase-config:invalid');
  return value;
}

function cloudStateFromData(data: Record<string, unknown> | undefined): LearningState | null {
  if (!data) return null;
  const parsed = parseBackup(JSON.stringify({
    schemaVersion: data.schemaVersion,
    attempts: data.attempts,
    activeExam: data.activeExam ?? null,
  }), knownIds);
  return parsed.ok ? parsed.state : null;
}

function sameState(left: LearningState, right: LearningState): boolean {
  return serializeBackup(left) === serializeBackup(right);
}

export function GoogleSyncControl() {
  const [status, setStatus] = useState<SyncStatus>('loading');
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const runtimeRef = useRef<FirebaseRuntime | null>(null);
  const unsubscribeCloudRef = useRef<(() => void) | null>(null);
  const writeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const writeCloud = useCallback(async (nextState: LearningState) => {
    const runtime = runtimeRef.current;
    const currentUser = runtime?.auth.currentUser;
    if (!runtime || !currentUser) return;
    const { doc, serverTimestamp, setDoc } = runtime.firestoreModule;
    setStatus('syncing');
    await setDoc(doc(runtime.db, 'users', currentUser.uid, 'feStudy', 'state'), {
      ...JSON.parse(serializeBackup(nextState)),
      syncedAt: serverTimestamp(),
    });
    setStatus('synced');
  }, []);

  const queueCloudWrite = useCallback((nextState: LearningState) => {
    if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
    writeTimerRef.current = setTimeout(() => {
      void writeCloud(nextState).catch(() => setStatus('error'));
    }, CLOUD_WRITE_DELAY_MS);
  }, [writeCloud]);

  const startCloudSync = useCallback(async (signedInUser: User) => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    unsubscribeCloudRef.current?.();
    const { doc, getDoc, onSnapshot } = runtime.firestoreModule;
    const stateRef = doc(runtime.db, 'users', signedInUser.uid, 'feStudy', 'state');
    const local = loadLearningState(knownIds).state;
    const firstSnapshot = await getDoc(stateRef);
    const cloud = cloudStateFromData(firstSnapshot.exists() ? firstSnapshot.data() : undefined);
    const merged = cloud ? mergeLearningStates(local, cloud) : local;
    if (!sameState(local, merged)) saveLearningState(merged);
    await writeCloud(merged);

    unsubscribeCloudRef.current = onSnapshot(stateRef, (snapshot) => {
      const remote = cloudStateFromData(snapshot.exists() ? snapshot.data() : undefined);
      if (!remote) return;
      const latestLocal = loadLearningState(knownIds).state;
      const next = mergeLearningStates(latestLocal, remote);
      if (!sameState(latestLocal, next)) saveLearningState(next);
      if (!sameState(remote, next)) queueCloudWrite(next);
      else setStatus('synced');
    }, () => setStatus('error'));
  }, [queueCloudWrite, writeCloud]);

  useEffect(() => {
    let active = true;
    let unsubscribeAuth: (() => void) | undefined;

    void (async () => {
      try {
        const options = await loadFirebaseOptions();
        const [appModule, authModule, firestoreModule] = await Promise.all([
          import('firebase/app'),
          import('firebase/auth'),
          import('firebase/firestore'),
        ]);
        if (!active) return;
        const app = appModule.getApps().find((candidate) => candidate.name === FIREBASE_APP_NAME)
          ?? appModule.initializeApp(options, FIREBASE_APP_NAME);
        const auth = authModule.getAuth(app);
        const db = firestoreModule.getFirestore(app);
        runtimeRef.current = { auth, db, authModule, firestoreModule };
        await authModule.setPersistence(auth, authModule.browserLocalPersistence);
        unsubscribeAuth = authModule.onAuthStateChanged(auth, (nextUser) => {
          if (!active) return;
          setUser(nextUser);
          unsubscribeCloudRef.current?.();
          unsubscribeCloudRef.current = null;
          if (!nextUser) {
            setStatus('local');
            return;
          }
          setStatus('syncing');
          void startCloudSync(nextUser).catch(() => setStatus('error'));
        });
      } catch {
        if (active) setStatus('error');
      }
    })();

    const handleLocalChange = () => {
      if (!runtimeRef.current?.auth.currentUser) return;
      queueCloudWrite(loadLearningState(knownIds).state);
    };
    window.addEventListener(LEARNING_STATE_CHANGED_EVENT, handleLocalChange);

    return () => {
      active = false;
      unsubscribeAuth?.();
      unsubscribeCloudRef.current?.();
      if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
      window.removeEventListener(LEARNING_STATE_CHANGED_EVENT, handleLocalChange);
    };
  }, [queueCloudWrite, startCloudSync]);

  const login = async () => {
    const runtime = runtimeRef.current;
    if (!runtime || busy) return;
    setBusy(true);
    try {
      await runtime.authModule.signInWithPopup(runtime.auth, new runtime.authModule.GoogleAuthProvider());
    } catch (error) {
      const code = typeof error === 'object' && error && 'code' in error
        ? String((error as { code?: unknown }).code)
        : '';
      if (code === 'auth/popup-blocked') {
        await runtime.authModule.signInWithRedirect(runtime.auth, new runtime.authModule.GoogleAuthProvider());
      } else {
        setStatus('error');
      }
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    const runtime = runtimeRef.current;
    if (!runtime || busy) return;
    setBusy(true);
    try {
      await runtime.authModule.signOut(runtime.auth);
    } finally {
      setBusy(false);
    }
  };

  const statusText = status === 'syncing' ? '同期中…'
    : status === 'synced' ? 'クラウド同期済み'
      : status === 'error' ? '同期設定を確認'
        : 'この端末に保存';

  return (
    <div className="google-sync-control" aria-label="Google同期">
      {user ? (
        <div className="google-sync-signed-in">
          <span className="google-sync-user" title={user.email ?? undefined}>
            {user.displayName || user.email || 'Googleログイン中'}
          </span>
          <button className="google-sync-signout" type="button" onClick={() => void logout()} disabled={busy}>ログアウト</button>
        </div>
      ) : (
        <button className="google-sync-button" type="button" onClick={() => void login()} disabled={status === 'loading' || busy}>
          {busy ? 'ログイン中…' : 'Googleで同期'}
        </button>
      )}
      <small className={`google-sync-status is-${status}`}>{statusText}</small>
    </div>
  );
}
