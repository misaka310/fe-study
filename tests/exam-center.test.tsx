import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ExamCenter } from '../src/components/ExamCenter';
import { STORAGE_KEY } from '../src/learning/storage';

describe('ExamCenter', () => {
  it('科目A 60問の模試を開始してセッションを保存する', async () => {
    localStorage.clear();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    render(<ExamCenter questionCount={217} />);
    fireEvent.click(await screen.findByRole('button', { name: '科目A模試を開始' }));
    expect(screen.getByText('1 / 60')).toBeInTheDocument();
    expect(screen.getByText(/残り時間/)).toBeInTheDocument();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    expect(saved.activeExam.subject).toBe('A');
    vi.restoreAllMocks();
  });

  it('科目Bは20問・100分として案内する', async () => {
    localStorage.clear();
    render(<ExamCenter questionCount={217} />);
    expect(await screen.findByText('20問 / 100分')).toBeInTheDocument();
    expect(screen.getByText(/IRT評価点は再現しません/)).toBeInTheDocument();
  });
});
