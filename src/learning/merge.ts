import type { Attempt, ExamSession, LearningState } from '../domain/types';

function attemptKey(attempt: Attempt): string {
  return `${attempt.answeredAt}|${attempt.correct ? '1' : '0'}|${attempt.picks.join(',')}`;
}

function mergeAttempts(left: readonly Attempt[], right: readonly Attempt[]): Attempt[] {
  const byKey = new Map<string, Attempt>();
  for (const attempt of [...left, ...right]) {
    byKey.set(attemptKey(attempt), { ...attempt, picks: [...attempt.picks] });
  }
  return [...byKey.values()].sort(
    (a, b) => a.answeredAt.localeCompare(b.answeredAt) || attemptKey(a).localeCompare(attemptKey(b)),
  );
}

function examVersion(exam: ExamSession): string {
  return exam.completedAt ?? exam.startedAt;
}

function cloneExam(exam: ExamSession): ExamSession {
  return {
    ...exam,
    questionIds: [...exam.questionIds],
    picks: Object.fromEntries(Object.entries(exam.picks).map(([id, picks]) => [id, [...picks]])),
  };
}

function mergeExam(left: ExamSession | null, right: ExamSession | null): ExamSession | null {
  if (!left) return right ? cloneExam(right) : null;
  if (!right) return cloneExam(left);
  return cloneExam(examVersion(right) > examVersion(left) ? right : left);
}

export function mergeLearningStates(left: LearningState, right: LearningState): LearningState {
  const attempts: LearningState['attempts'] = {};
  const ids = new Set([...Object.keys(left.attempts), ...Object.keys(right.attempts)]);
  for (const id of ids) attempts[id] = mergeAttempts(left.attempts[id] ?? [], right.attempts[id] ?? []);
  return {
    schemaVersion: 1,
    attempts,
    activeExam: mergeExam(left.activeExam, right.activeExam),
  };
}
