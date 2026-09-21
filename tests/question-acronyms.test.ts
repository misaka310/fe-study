import { describe, expect, it } from 'vitest';
import {
  extractQuestionAcronymTokens,
  questionAcronymExclusions,
  questionAcronymGlossary,
  questionAcronymEntries,
} from '../src/content/questionAcronyms';
import { questions } from '../src/content/questions';
import { vocabularyQuestions } from '../src/content/vocabulary';

const allQuestions = [...questions, ...vocabularyQuestions];

describe('question acronym coverage', () => {
  it('classifies every acronym-like token across all 445 questions', () => {
    expect(allQuestions).toHaveLength(445);

    const covered = new Set([...Object.keys(questionAcronymGlossary), ...questionAcronymExclusions]);
    const unresolved = [...new Set(allQuestions.flatMap(extractQuestionAcronymTokens))]
      .filter((token) => !covered.has(token))
      .sort();

    expect(unresolved).toEqual([]);
  });

  it('keeps a formal English expansion for every acronym shown in explanations', () => {
    const invalid = Object.values(questionAcronymGlossary)
      .filter((entry) => !entry.expansion.trim() || !entry.meaning.trim())
      .map((entry) => entry.term)
      .sort();

    expect(invalid).toEqual([]);
  });

  it('finds TCO in its basic question while leaving CPU out', () => {
    const tcoQuestion = vocabularyQuestions.find((question) => question.topic === 'TCO');
    expect(tcoQuestion).toBeDefined();
    const terms = questionAcronymEntries(tcoQuestion!).map((entry) => entry.term);
    expect(terms).toContain('TCO');
    expect(terms).not.toContain('CPU');
  });
});
