import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { LearningDashboard } from '../src/components/LearningDashboard';
import { questions } from '../src/content/questions';
import { vocabularyQuestions } from '../src/content/vocabulary';
import { createEmptyState, recordAttempt } from '../src/learning/state';
import { saveLearningState } from '../src/learning/storage';

afterEach(() => {
  localStorage.clear();
});

describe('学習記録', () => {
  it('通常305問と基本160問を合わせた465問で進捗と分野別成績を集計する', async () => {
    const vocabularyQuestion = vocabularyQuestions[0];
    const state = recordAttempt(
      createEmptyState(),
      vocabularyQuestion.id,
      [vocabularyQuestion.correct[0]],
      true,
      '2026-09-22T00:00:00.000Z',
    );
    saveLearningState(state);

    render(<LearningDashboard questionCount={questions.length + vocabularyQuestions.length} />);

    expect(await screen.findByText('1 / 465問に回答（通常305＋基本160）')).toBeInTheDocument();
    expect(screen.getByText('通常問題と基本問題の誤答履歴から算出')).toBeInTheDocument();

    const domainLink = screen.getByRole('link', { name: new RegExp(vocabularyQuestion.domain) });
    expect(within(domainLink).getByText('正答率 100%（1回答）')).toBeInTheDocument();
  });
});
