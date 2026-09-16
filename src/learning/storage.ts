import type { LearningState } from '../domain/types';
import { parseBackup, serializeBackup } from './backup';
import { createEmptyState } from './state';

export const STORAGE_KEY = 'fe-study-learning-state-v1';
export const LEARNING_STATE_CHANGED_EVENT = 'fe-study-learning-state-changed';

export function saveLearningState(state: LearningState): void {
  localStorage.setItem(STORAGE_KEY, serializeBackup(state));
  if (typeof window !== 'undefined') {
    queueMicrotask(() => window.dispatchEvent(new Event(LEARNING_STATE_CHANGED_EVENT)));
  }
}

export function loadLearningState(knownIds: ReadonlySet<string>): {
  state: LearningState;
  message: string | null;
} {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) return { state: createEmptyState(), message: null };
  const parsed = parseBackup(stored, knownIds);
  if (parsed.ok) return { state: parsed.state, message: null };
  return {
    state: createEmptyState(),
    message: '保存済みの学習履歴を読み取れなかったため、新しい状態で開始しました。',
  };
}
