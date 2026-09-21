import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { vocabularyQuestions } from '../src/content/vocabulary';

describe('基本問題', () => {
  it('20問ずつの6セットを持ち、出題データが完全である', () => {
    expect(vocabularyQuestions).toHaveLength(120);
    for (const set of [1, 2, 3, 4, 5, 6] as const) {
      const setQuestions = vocabularyQuestions.filter((question) => question.vocabularySet === set);
      expect(setQuestions, `セット${set}`).toHaveLength(20);
      expect(new Set(setQuestions.map((question) => question.id)).size).toBe(20);
      expect(setQuestions.every((question) => question.practiceKind === 'vocabulary')).toBe(true);
      expect(setQuestions.every((question) => question.domain !== 'vocabulary')).toBe(true);
      expect(setQuestions.every((question) => question.choices.length === 4 && question.correct.length === 1)).toBe(true);
      expect(setQuestions.every((question) => question.explanation.length >= 20)).toBe(true);
    }
  });

  it('セット5を選ぶと20問だけ表示し、回答直後に解説を表示する', async () => {
    localStorage.clear();
    render(<PracticeRunner questionCount={305} mode="vocabulary" vocabSet="5" />);
    expect(await screen.findByText('基本問題 · セット5')).toBeInTheDocument();
    expect(screen.getByText('基本問題 · 20問')).toBeInTheDocument();
    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    expect(screen.queryByRole('button', { name: '解説を見る' })).not.toBeInTheDocument();
    expect(screen.getByText('決め手')).toBeInTheDocument();
    expect(screen.getByText('選択肢ごとの判定')).toBeInTheDocument();
  });
});
