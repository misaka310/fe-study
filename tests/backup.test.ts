import { describe, expect, it } from 'vitest';
import { parseBackup, serializeBackup } from '../src/learning/backup';
import { createEmptyState, recordAttempt } from '../src/learning/state';

describe('学習履歴バックアップ', () => {
  it('書き出した履歴を同じ内容で復元する', () => {
    const state = recordAttempt(createEmptyState(), 'a-security-001', [2], false, '2026-08-24T04:00:00.000Z');

    expect(parseBackup(serializeBackup(state), new Set(['a-security-001']))).toEqual({ ok: true, state });
  });

  it('不正JSONを拒否する', () => {
    expect(parseBackup('{broken', new Set())).toEqual({ ok: false, message: 'JSONを読み取れませんでした。' });
  });

  it('未対応schemaを拒否する', () => {
    expect(parseBackup(JSON.stringify({ schemaVersion: 99, attempts: {}, activeExam: null }), new Set()))
      .toEqual({ ok: false, message: 'このバックアップ形式には対応していません。' });
  });

  it('問題バンクに存在しないIDを拒否する', () => {
    const json = JSON.stringify({
      schemaVersion: 1,
      attempts: { removed: [{ picks: [0], correct: false, answeredAt: '2026-08-24T04:00:00.000Z' }] },
      activeExam: null,
    });

    expect(parseBackup(json, new Set(['current']))).toEqual({
      ok: false,
      message: '現在の問題集に存在しない問題IDが含まれています。',
    });
  });

  it('未知のトップレベル項目は無視して安全な状態だけ返す', () => {
    const json = JSON.stringify({ schemaVersion: 1, attempts: {}, activeExam: null, futureField: 'ignored' });

    expect(parseBackup(json, new Set())).toEqual({ ok: true, state: createEmptyState() });
  });
});
