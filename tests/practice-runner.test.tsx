import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { questions } from '../src/content/questions';
import { STORAGE_KEY } from '../src/learning/storage';

describe('PracticeRunner', () => {
  it('回答後に正誤と全選択肢の理由を表示し、履歴を保存する', async () => {
    localStorage.clear();
    render(<PracticeRunner mode="all" />);
    const choices = await screen.findAllByRole('radio');
    fireEvent.click(choices[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    expect(screen.getByText(/^(正解|不正解)$/)).toBeInTheDocument();
    expect(screen.getByText('条件')).toBeInTheDocument();
    expect(screen.getByText('決め手')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '選択肢ごとの判定' })).toBeInTheDocument();
    expect(screen.getAllByTestId('choice-reason')).toHaveLength(4);
    expect(localStorage.getItem(STORAGE_KEY)).toContain('attempts');
  });

  it('未回答モードでは回答済み問題を除外する', async () => {
    localStorage.clear();
    const { unmount } = render(<PracticeRunner mode="all" />);
    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    unmount();
    render(<PracticeRunner mode="unanswered" />);
    expect(await screen.findByRole('link', { name: /未回答だけ/ })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${questions.length - 1}問`))).toBeInTheDocument();
  });
});
