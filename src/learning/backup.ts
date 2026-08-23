import type { Attempt, ExamSession, LearningState } from '../domain/types';

export type BackupResult =
  | { ok: true; state: LearningState }
  | { ok: false; message: string };

export function serializeBackup(state: LearningState): string {
  return JSON.stringify(state, null, 2);
}

function validAttempt(value: unknown): value is Attempt {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Attempt>;
  return Array.isArray(candidate.picks)
    && candidate.picks.every((pick) => Number.isInteger(pick) && pick >= 0)
    && typeof candidate.correct === 'boolean'
    && typeof candidate.answeredAt === 'string'
    && !Number.isNaN(Date.parse(candidate.answeredAt));
}

function validExam(value: unknown, knownIds: ReadonlySet<string>): value is ExamSession | null {
  if (value === null) return true;
  if (!value || typeof value !== 'object') return false;
  const exam = value as Partial<ExamSession>;
  return (exam.subject === 'A' || exam.subject === 'B')
    && Array.isArray(exam.questionIds)
    && exam.questionIds.every((id) => typeof id === 'string' && knownIds.has(id))
    && Number.isInteger(exam.currentIndex)
    && Number(exam.currentIndex) >= 0
    && typeof exam.startedAt === 'string'
    && (exam.durationMinutes === 90 || exam.durationMinutes === 100)
    && !!exam.picks
    && typeof exam.picks === 'object'
    && (exam.completedAt === null || typeof exam.completedAt === 'string');
}

export function parseBackup(json: string, knownIds: ReadonlySet<string>): BackupResult {
  let value: unknown;
  try {
    value = JSON.parse(json);
  } catch {
    return { ok: false, message: 'JSONを読み取れませんでした。' };
  }
  if (!value || typeof value !== 'object' || (value as { schemaVersion?: unknown }).schemaVersion !== 1) {
    return { ok: false, message: 'このバックアップ形式には対応していません。' };
  }
  const source = value as { attempts?: unknown; activeExam?: unknown };
  if (!source.attempts || typeof source.attempts !== 'object' || Array.isArray(source.attempts)) {
    return { ok: false, message: '回答履歴の形式が正しくありません。' };
  }
  const attempts: Record<string, Attempt[]> = {};
  for (const [questionId, records] of Object.entries(source.attempts)) {
    if (!knownIds.has(questionId)) {
      return { ok: false, message: '現在の問題集に存在しない問題IDが含まれています。' };
    }
    if (!Array.isArray(records) || !records.every(validAttempt)) {
      return { ok: false, message: '回答履歴の形式が正しくありません。' };
    }
    attempts[questionId] = records.map((record) => ({ ...record, picks: [...record.picks] }));
  }
  const activeExam = source.activeExam ?? null;
  if (!validExam(activeExam, knownIds)) {
    return { ok: false, message: '模試の保存状態が正しくありません。' };
  }
  return { ok: true, state: { schemaVersion: 1, attempts, activeExam } };
}
