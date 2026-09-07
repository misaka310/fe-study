import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { questions } from '../src/content/questions';
import { STORAGE_KEY } from '../src/learning/storage';

describe('PracticeRunner', () => {
  it('回答後は次へ進め、必要なときだけ解説を展開できる', async () => {
    localStorage.clear();
    render(<PracticeRunner questionCount={217} mode="all" />);
    const choices = await screen.findAllByRole('radio');
    fireEvent.click(choices[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    expect(screen.getByText(/^(正解|不正解)$/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '次へ' })).toBeEnabled();
    const explanationButton = screen.getByRole('button', { name: '解説を見る' });
    expect(explanationButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('条件')).not.toBeInTheDocument();
    fireEvent.click(explanationButton);
    expect(screen.getByText('条件')).toBeInTheDocument();
    expect(screen.getByText('決め手')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '選択肢ごとの判定' })).toBeInTheDocument();
    expect(screen.getAllByTestId('choice-reason')).toHaveLength(4);
    expect(localStorage.getItem(STORAGE_KEY)).toContain('attempts');
  });

  it('未回答モードでは回答済み問題を除外する', async () => {
    localStorage.clear();
    const { unmount } = render(<PracticeRunner questionCount={217} mode="all" />);
    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    unmount();
    render(<PracticeRunner questionCount={217} mode="unanswered" />);
    expect(await screen.findByRole('link', { name: /未回答だけ/ })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${questions.length - 1}問`))).toBeInTheDocument();
  });

  it('未回答モードで解答しても結果表示中の問題文を別問題へすり替えない', async () => {
    localStorage.clear();
    const { container } = render(<PracticeRunner questionCount={questions.length} mode="unanswered" />);
    await screen.findAllByRole('radio');
    const questionHeading = container.querySelector('.practice-question-card h2');
    const answeredStem = questionHeading?.textContent;
    expect(answeredStem).toBeTruthy();

    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));

    expect(container.querySelector('.practice-question-card h2')?.textContent).toBe(answeredStem);
    expect(screen.getByText(/^(正解|不正解)$/)).toBeInTheDocument();
  });
});
