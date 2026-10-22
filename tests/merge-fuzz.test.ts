import { describe, expect, test } from 'vitest';
import fc from 'fast-check';

import { mergeLearningStates } from '../src/learning/merge';
import type { Attempt, LearningState } from '../src/domain/types';

const attemptArb = fc.record<Attempt>({
  picks: fc.array(fc.integer({ min: 0, max: 8 }), { maxLength: 8 }),
  correct: fc.boolean(),
  answeredAt: fc.string({ maxLength: 32 }),
});

const stateArb = fc.dictionary(fc.string({ minLength: 1, maxLength: 12 }), fc.array(attemptArb, { maxLength: 8 })).map(
  (attempts): LearningState => ({ schemaVersion: 1, attempts, activeExam: null }),
);

function key(attempt: Attempt): string {
  return `${attempt.answeredAt}|${attempt.correct ? '1' : '0'}|${attempt.picks.join(',')}`;
}

function compareAttempts(left: Attempt, right: Attempt): number {
  return left.answeredAt.localeCompare(right.answeredAt) || key(left).localeCompare(key(right));
}

describe('mergeLearningStates property fuzzing', () => {
  test('always emits sorted unique attempts without mutating either input', () => {
    fc.assert(
      fc.property(stateArb, stateArb, (left, right) => {
        const leftBefore = structuredClone(left);
        const rightBefore = structuredClone(right);
        const merged = mergeLearningStates(left, right);

        expect(left).toEqual(leftBefore);
        expect(right).toEqual(rightBefore);
        for (const attempts of Object.values(merged.attempts)) {
          const keys = attempts.map(key);
          expect(new Set(keys).size).toBe(keys.length);
          for (let index = 1; index < attempts.length; index += 1) {
            expect(compareAttempts(attempts[index - 1], attempts[index])).toBeLessThanOrEqual(0);
          }
        }
      }),
      { numRuns: 300 },
    );
  });
});
