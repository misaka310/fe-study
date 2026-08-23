import { beforeEach, describe, expect, it } from 'vitest';
import { loadLearningState, saveLearningState, STORAGE_KEY } from '../src/learning/storage';
import { createEmptyState, recordAttempt } from '../src/learning/state';

describe('ブラウザ内の学習履歴', () => {
  beforeEach(() => localStorage.clear());

  it('保存がない場合は空の状態から始める', () => {
    expect(loadLearningState(new Set())).toEqual({ state: createEmptyState(), message: null });
  });

  it('保存した履歴を再読み込みできる', () => {
    const state = recordAttempt(createEmptyState(), 'q1', [1], true, '2026-08-24T05:00:00.000Z');
    saveLearningState(state);

    expect(loadLearningState(new Set(['q1']))).toEqual({ state, message: null });
  });

  it('破損データでは空の状態へ安全に戻り理由を示す', () => {
    localStorage.setItem(STORAGE_KEY, '{broken');

    expect(loadLearningState(new Set())).toEqual({
      state: createEmptyState(),
      message: '保存済みの学習履歴を読み取れなかったため、新しい状態で開始しました。',
    });
  });
});
