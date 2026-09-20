import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ExamCenter } from '../src/components/ExamCenter';
import { questions } from '../src/content/questions';
import { STORAGE_KEY } from '../src/learning/storage';

describe('ExamCenter', () => {
  it('科目A 60問の模試を開始してセッションを保存する', async () => {
    localStorage.clear();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    render(<ExamCenter questionCount={questions.length} />);
    fireEvent.click(await screen.findByRole('button', { name: '科目A模試を開始' }));
    expect(screen.getByText('1 / 60')).toBeInTheDocument();
    expect(screen.getByText(/残り時間/)).toBeInTheDocument();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    expect(saved.activeExam.subject).toBe('A');
    vi.restoreAllMocks();
  });

  it('科目Bは20問・100分、アルゴリズム16問＋セキュリティ4問として開始する', async () => {
    localStorage.clear();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    render(<ExamCenter questionCount={questions.length} />);
    expect(await screen.findByText('20問 / 100分')).toBeInTheDocument();
    expect(screen.getByText('本番レベル問題からアルゴリズム16問・セキュリティ4問を出題します。')).toBeInTheDocument();
    expect(screen.getByText(/IRT評価点は再現しません/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '科目B模試を開始' }));
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    const selected = saved.activeExam.questionIds.map((id: string) => questions.find((question) => question.id === id)!);
    expect(selected).toHaveLength(20);
    expect(selected.every((question: typeof questions[number]) => question.practiceTier === 'exam')).toBe(true);
    expect(selected.filter((question: typeof questions[number]) => question.domain === 'algorithm')).toHaveLength(16);
    expect(selected.filter((question: typeof questions[number]) => question.domain === 'security-case')).toHaveLength(4);
    vi.restoreAllMocks();
  });
});
