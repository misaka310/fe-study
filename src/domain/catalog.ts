import type { Subject } from './types';

export const SUBJECT_BLUEPRINT: Record<Subject, { count: number; durationMinutes: number }> = {
  A: { count: 60, durationMinutes: 90 },
  B: { count: 20, durationMinutes: 100 },
};
