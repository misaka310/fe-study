import { SUBJECT_BLUEPRINT } from '../domain/catalog';
import type { LearningState, Question, Subject, WeaknessSummary } from '../domain/types';

export function createEmptyState(): LearningState {
  return { schemaVersion: 1, attempts: {}, activeExam: null };
}

export function recordAttempt(
  state: LearningState,
  questionId: string,
  picks: number[],
  correct: boolean,
  answeredAt: string,
): LearningState {
  const attempts = state.attempts[questionId] ?? [];
  return {
    ...state,
    attempts: {
      ...state.attempts,
      [questionId]: [...attempts, { picks: [...picks], correct, answeredAt }],
    },
  };
}

export function buildWeaknessRanking(
  state: LearningState,
  questions: readonly Question[],
): WeaknessSummary[] {
  const topics = new Map<string, WeaknessSummary>();
  for (const question of questions) {
    for (const attempt of state.attempts[question.id] ?? []) {
      const current = topics.get(question.topic) ?? {
        topic: question.topic,
        wrong: 0,
        correct: 0,
        score: 0,
        latestWrongAt: '',
      };
      if (attempt.correct) current.correct += 1;
      else {
        current.wrong += 1;
        if (attempt.answeredAt > current.latestWrongAt) current.latestWrongAt = attempt.answeredAt;
      }
      current.score = current.wrong * 3 - current.correct;
      topics.set(question.topic, current);
    }
  }
  return [...topics.values()]
    .filter((item) => item.wrong > 0)
    .sort((left, right) => right.score - left.score || right.latestWrongAt.localeCompare(left.latestWrongAt));
}

function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function stableQuestionRank(id: string, seed: number) {
  let hash = (2166136261 ^ (seed >>> 0)) >>> 0;
  for (let index = 0; index < id.length; index += 1) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x7feb352d) >>> 0;
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 0x846ca68b) >>> 0;
  hash ^= hash >>> 16;
  return hash >>> 0;
}

export function orderQuestionIds(ids: readonly string[], seed: number): string[] {
  return [...ids].sort((left, right) => {
    const leftRank = stableQuestionRank(left, seed);
    const rightRank = stableQuestionRank(right, seed);
    return leftRank - rightRank || left.localeCompare(right);
  });
}

export function createExamSession(
  subject: Subject,
  questions: readonly Question[],
  startedAt: string,
  random: () => number = Math.random,
) {
  const blueprint = SUBJECT_BLUEPRINT[subject];
  const pool = questions.filter((question) => question.subject === subject);
  if (pool.length < blueprint.count) {
    throw new Error(`科目${subject}模試には${blueprint.count}問以上が必要です`);
  }
  let selected: Question[];
  if (subject === 'B') {
    const examPool = pool.filter((question) => question.practiceTier === 'exam');
    const algorithm = examPool.filter((question) => question.domain === 'algorithm');
    const security = examPool.filter((question) => question.domain === 'security-case');
    if (algorithm.length < 16 || security.length < 4) {
      throw new Error('科目B模試には本番レベルのアルゴリズム16問・セキュリティ4問以上が必要です');
    }
    selected = shuffled([
      ...shuffled(algorithm, random).slice(0, 16),
      ...shuffled(security, random).slice(0, 4),
    ], random);
  } else {
    selected = shuffled(pool, random).slice(0, blueprint.count);
  }

  return {
    subject,
    questionIds: selected.map((question) => question.id),
    currentIndex: 0,
    startedAt,
    durationMinutes: blueprint.durationMinutes,
    picks: {},
    completedAt: null,
  };
}
