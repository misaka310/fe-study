import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '../app/page';

describe('学習ポータルの入口', () => {
  it('主要な学習開始操作を一画面で選べる', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: '基本情報技術者 合格ナビ' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '教材から始める' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '問題演習' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '模擬試験' })).toBeInTheDocument();
  });
});
