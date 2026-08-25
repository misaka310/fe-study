import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '../app/page';
import { questions } from '../src/content/questions';

describe('学習ポータルの入口', () => {
  it('主要な学習開始操作を一画面で選べる', async () => {
    render(await Home());

    expect(
      screen.getByRole('heading', { name: '基本情報技術者 合格ナビ' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /1\. はじめる/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '問題演習' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '模試' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'この順番で進める' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '弱点補強' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '学習記録' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '図解画像一覧' })).toBeInTheDocument();
    expect(screen.getByText(`${questions.length}問`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(`全${questions.length}問練習`) })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '教材' })).not.toHaveAttribute('aria-current');
  });

  it('教材URLでは指定した章を直接開く', async () => {
    const page = await Home({
      searchParams: Promise.resolve({ view: 'materials', material: '05-algorithms' }),
    } as never);
    render(page);

    expect(screen.getByRole('heading', { name: '05 データ構造とアルゴリズム' })).toBeInTheDocument();
  });
});
