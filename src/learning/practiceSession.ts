import { orderQuestionIds } from './state';

export const PRACTICE_SESSION_STORAGE_KEY = 'fe-study-practice-sessions-v1';

export interface PracticeSession {
  seed: number;
  questionIds: string[];
  answeredIds: string[];
}

type PracticeSessionStore = Record<string, PracticeSession>;

const LEGACY_SESSION_PREFIXES = ['practice-v1|'] as const;

function readStore(): PracticeSessionStore {
  const raw = localStorage.getItem(PRACTICE_SESSION_STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const store = parsed as PracticeSessionStore;
    let pruned = false;
    for (const key of Object.keys(store)) {
      if (LEGACY_SESSION_PREFIXES.some((prefix) => key.startsWith(prefix))) {
        delete store[key];
        pruned = true;
      }
    }
    if (pruned) writeStore(store);
    return store;
  } catch {
    return {};
  }
}

function writeStore(store: PracticeSessionStore) {
  localStorage.setItem(PRACTICE_SESSION_STORAGE_KEY, JSON.stringify(store));
}

function isValidSession(session: unknown, validIds: ReadonlySet<string>): session is PracticeSession {
  if (!session || typeof session !== 'object') return false;
  const candidate = session as Partial<PracticeSession>;
  if (!Number.isFinite(candidate.seed) || !Array.isArray(candidate.questionIds) || !Array.isArray(candidate.answeredIds)) return false;
  if (!candidate.questionIds.length || candidate.questionIds.some((id) => typeof id !== 'string' || !validIds.has(id))) return false;
  if (new Set(candidate.questionIds).size !== candidate.questionIds.length) return false;
  const questionIds = new Set(candidate.questionIds);
  return candidate.answeredIds.every((id) => typeof id === 'string' && questionIds.has(id))
    && new Set(candidate.answeredIds).size === candidate.answeredIds.length;
}

export function createPracticeSession(questionIds: readonly string[], seed = Date.now()): PracticeSession {
  return {
    seed,
    questionIds: orderQuestionIds(questionIds, seed),
    answeredIds: [],
  };
}

export function loadOrCreatePracticeSession(
  key: string,
  candidateIds: readonly string[],
  validIds: ReadonlySet<string>,
): PracticeSession | null {
  const store = readStore();
  const stored = store[key];
  if (isValidSession(stored, validIds) && stored.answeredIds.length < stored.questionIds.length) {
    return stored;
  }
  if (!candidateIds.length) {
    delete store[key];
    writeStore(store);
    return null;
  }
  const session = createPracticeSession(candidateIds);
  store[key] = session;
  writeStore(store);
  return session;
}

export function savePracticeAnswer(key: string, session: PracticeSession, questionId: string): PracticeSession {
  if (session.answeredIds.includes(questionId)) return session;
  const next = { ...session, answeredIds: [...session.answeredIds, questionId] };
  const store = readStore();
  if (next.answeredIds.length >= next.questionIds.length) delete store[key];
  else store[key] = next;
  writeStore(store);
  return next;
}

export function resetPracticeSession(key: string, candidateIds: readonly string[]): PracticeSession | null {
  const store = readStore();
  if (!candidateIds.length) {
    delete store[key];
    writeStore(store);
    return null;
  }
  const session = createPracticeSession(candidateIds);
  store[key] = session;
  writeStore(store);
  return session;
}

export function firstUnansweredIndex(session: PracticeSession): number {
  const answered = new Set(session.answeredIds);
  const index = session.questionIds.findIndex((id) => !answered.has(id));
  return index < 0 ? Math.max(0, session.questionIds.length - 1) : index;
}
