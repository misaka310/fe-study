import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { vocabularyQuestions } from '../src/content/vocabulary';

describe('基礎単語問題', () => {
  it('20問ずつの3セットを持ち、出題データが完全である', () => {
    expect(vocabularyQuestions).toHaveLength(60);
    for (const set of [1, 2, 3] as const) {
      const setQuestions = vocabularyQuestions.filter((question) => question.vocabularySet === set);
      expect(setQuestions, `セット${set}`).toHaveLength(20);
      expect(new Set(setQuestions.map((question) => question.id)).size).toBe(20);
      expect(setQuestions.every((question) => question.practiceKind === 'vocabulary')).toBe(true);
      expect(setQuestions.every((question) => question.choices.length === 4 && question.correct.length === 1)).toBe(true);
      expect(setQuestions.every((question) => question.explanation.includes('決め手'))).toBe(true);
    }
  });

  it('セット2を選ぶと20問だけ表示し、回答後に意味を説明する', async () => {
    localStorage.clear();
    render(<PracticeRunner mode="vocabulary" vocabSet="2" />);
    expect(await screen.findByText('基礎単語 · セット2')).toBeInTheDocument();
    expect(screen.getByText('基礎単語 · 20問')).toBeInTheDocument();
    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    expect(screen.getByText('決め手')).toBeInTheDocument();
    expect(screen.getByText('選択肢ごとの判定')).toBeInTheDocument();
  });
});
