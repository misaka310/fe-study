import { describe, expect, it } from 'vitest';
import {
  buildWeaknessRanking,
  createEmptyState,
  createExamSession,
  orderQuestionIds,
  recordAttempt,
} from '../src/learning/state';
import type { Question } from '../src/domain/types';

const question = (id: string, subject: 'A' | 'B', topic: string): Question => ({
  id,
  subject,
  domain: subject === 'A' ? 'security' : 'algorithm',
  topic,
  stem: `${id} の判断に必要な知識を確認する問題文です。`,
  choices: ['選択肢A', '選択肢B', '選択肢C', '選択肢D'],
  correct: [1],
  explanation: '選択肢Bが要件を満たすため正解です。',
  choiceReasons: ['要件を満たしません。', '要件を満たします。', '別の目的の選択肢です。', '前提条件が異なります。'],
  materialId: '08-security',
  difficulty: 2,
});

describe('学習状態', () => {
  it('解き直して正解しても以前の誤答を保持する', () => {
    const initial = createEmptyState();
    const afterWrong = recordAttempt(initial, 'a-security-001', [0], false, '2026-08-24T00:00:00.000Z');
    const afterCorrect = recordAttempt(afterWrong, 'a-security-001', [1], true, '2026-08-24T01:00:00.000Z');

    expect(afterCorrect.attempts['a-security-001']).toEqual([
      { picks: [0], correct: false, answeredAt: '2026-08-24T00:00:00.000Z' },
      { picks: [1], correct: true, answeredAt: '2026-08-24T01:00:00.000Z' },
    ]);
    expect(initial.attempts).toEqual({});
  });

  it('誤答が多く正答が少ない論点を優先する', () => {
    const questions = [question('q1', 'A', '認証'), question('q2', 'A', '暗号'), question('q3', 'A', '認証')];
    let state = createEmptyState();
    state = recordAttempt(state, 'q1', [0], false, '2026-08-24T00:00:00.000Z');
    state = recordAttempt(state, 'q3', [0], false, '2026-08-24T00:10:00.000Z');
    state = recordAttempt(state, 'q2', [0], false, '2026-08-24T00:20:00.000Z');
    state = recordAttempt(state, 'q2', [1], true, '2026-08-24T00:30:00.000Z');

    expect(buildWeaknessRanking(state, questions)).toEqual([
      { topic: '認証', wrong: 2, correct: 0, score: 6, latestWrongAt: '2026-08-24T00:10:00.000Z' },
      { topic: '暗号', wrong: 1, correct: 1, score: 2, latestWrongAt: '2026-08-24T00:20:00.000Z' },
    ]);
  });

  it('科目A模試を60問90分、科目B模試を20問100分で作る', () => {
    const questions = [
      ...Array.from({ length: 70 }, (_, index) => question(`a-${index + 1}`, 'A', '科目A')),
      ...Array.from({ length: 30 }, (_, index) => question(`b-${index + 1}`, 'B', '科目B')),
    ];

    const examA = createExamSession('A', questions, '2026-08-24T02:00:00.000Z', () => 0.5);
    const examB = createExamSession('B', questions, '2026-08-24T03:00:00.000Z', () => 0.5);

    expect(examA.questionIds).toHaveLength(60);
    expect(new Set(examA.questionIds).size).toBe(60);
    expect(examA.durationMinutes).toBe(90);
    expect(examA.startedAt).toBe('2026-08-24T02:00:00.000Z');
    expect(examB.questionIds).toHaveLength(20);
    expect(new Set(examB.questionIds).size).toBe(20);
    expect(examB.durationMinutes).toBe(100);
  });

  it('必要数に満たない問題バンクでは模試を開始しない', () => {
    const questions = Array.from({ length: 59 }, (_, index) => question(`a-${index + 1}`, 'A', '科目A'));

    expect(() => createExamSession('A', questions, '2026-08-24T02:00:00.000Z', () => 0.5))
      .toThrow('科目A模試には60問以上が必要です');
  });

  it('演習順は同じセッションなら再現し、別セッションでは変わる', () => {
    const ids = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
    const first = orderQuestionIds(ids, 20260825);

    expect(first).toEqual(orderQuestionIds(ids, 20260825));
    expect(first).not.toEqual(ids);
    expect(first).not.toEqual(orderQuestionIds(ids, 20260826));
    expect(new Set(first)).toEqual(new Set(ids));
  });
});
