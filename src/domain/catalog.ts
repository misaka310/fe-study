import type { Subject } from './types';

export interface SubjectBlueprint {
  count: number;
  durationMinutes: number;
  practiceTier?: 'foundation' | 'exam';
  domainCounts?: Readonly<Record<string, number>>;
}

export const SUBJECT_BLUEPRINT: Record<Subject, SubjectBlueprint> = {
  A: { count: 60, durationMinutes: 90 },
  B: {
    count: 20,
    durationMinutes: 100,
    practiceTier: 'exam',
    domainCounts: { algorithm: 16, 'security-case': 4 },
  },
};
