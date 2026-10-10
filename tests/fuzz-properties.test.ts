import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { extractQuestionAcronymTokens } from '../src/content/questionAcronyms';

describe('property fuzzing', () => {
  it('extracts only unique non-empty tokens and is deterministic for arbitrary text', () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        const question = { id: 'fuzz', subject: 'A', domain: 'fuzz', topic: text, stem: text, choices: [text], correct: [0], explanation: text, choiceReasons: [text], materialId: 'fuzz', difficulty: 1 } as const;
        const first = extractQuestionAcronymTokens(question);
        const second = extractQuestionAcronymTokens(question);
        expect(first).toEqual(second);
        expect(new Set(first).size).toBe(first.length);
        expect(first.every((token) => typeof token === 'string' && token.length > 0)).toBe(true);
      }),
      { numRuns: 1000 },
    );
  });
});
