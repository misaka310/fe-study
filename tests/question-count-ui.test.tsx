import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/content/questions', () => ({
  questions: [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }],
}));

vi.mock('../src/content/vocabulary', () => ({
  vocabularyQuestions: [{ id: 'v1' }, { id: 'v2' }],
}));

import Home from '../app/page';

describe('問題数表示', () => {
  it('問題バンクの件数からUI表示を導出する', async () => {
    render(await Home());

    expect(screen.getByText('5問')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /全5問練習/ })).toBeInTheDocument();
  });
});
