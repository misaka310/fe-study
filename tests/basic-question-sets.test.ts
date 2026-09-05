import { describe, expect, it } from 'vitest';
import { vocabularyQuestions } from '../src/content/vocabulary';

describe('基本問題 20問×5セット', () => {
  it('100問を5セットに20問ずつ収録する', () => {
    expect(vocabularyQuestions).toHaveLength(100);
    for (const set of [1, 2, 3, 4, 5]) {
      expect(vocabularyQuestions.filter((question) => question.vocabularySet === set)).toHaveLength(20);
    }
  });

  it('単純な用語当てではなくFE科目A相当の知識判断問題にする', () => {
    for (const question of vocabularyQuestions) {
      expect(question.subject).toBe('A');
      expect(question.domain).not.toBe('vocabulary');
      expect(question.stem).not.toMatch(/^次の意味・役割を表す用語はどれか。/);
      expect(question.stem.length, question.id).toBeGreaterThanOrEqual(24);
      expect(question.choices).toHaveLength(4);
      expect(question.choiceReasons).toHaveLength(4);
      expect(question.explanation.length, question.id).toBeGreaterThanOrEqual(20);
    }
  });

  it('各セットで主要9分野を扱い、同じ問題や選択肢セットを使い回さない', () => {
    const sourceStems = new Set<string>();
    const choiceSets = new Set<string>();
    for (const set of [1, 2, 3, 4, 5]) {
      const setQuestions = vocabularyQuestions.filter((question) => question.vocabularySet === set);
      expect(new Set(setQuestions.map((question) => question.domain)).size).toBe(9);
      for (const question of setQuestions) {
        expect(sourceStems.has(question.stem), question.id).toBe(false);
        sourceStems.add(question.stem);
        const key = [...question.choices].sort().join('\n');
        expect(choiceSets.has(key), question.id).toBe(false);
        choiceSets.add(key);
      }
    }
  });
});
