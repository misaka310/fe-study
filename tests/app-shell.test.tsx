import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '../app/page';
import { questions } from '../src/content/questions';
import { vocabularyQuestions } from '../src/content/vocabulary';

const totalQuestionCount = questions.length + vocabularyQuestions.length;

describe('学習ポータルの入口', () => {
  it('トップレベルの入口を教材と問題演習の2つに絞る', async () => {
    render(await Home());

    expect(
      screen.getByRole('heading', { name: '基本情報技術者 合格ナビ' }),
    ).toBeInTheDocument();

    const mainNav = screen.getByRole('navigation', { name: '主な機能' });
    expect(mainNav.querySelectorAll('a')).toHaveLength(2);
    expect(mainNav).toHaveTextContent('教材');
    expect(mainNav).toHaveTextContent('問題演習');

    expect(screen.getByRole('link', { name: /教材.*12章の教材/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(`問題演習.*${totalQuestionCount}問から選んで解く`) })).toBeInTheDocument();

    expect(screen.queryByRole('link', { name: '模試' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '弱点補強' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '学習記録' })).not.toBeInTheDocument();
  });

  it('教材URLでは指定した章を直接開く', async () => {
    const page = await Home({
      searchParams: Promise.resolve({ view: 'materials', material: '05-algorithms' }),
    } as never);
    render(page);

    expect(screen.getByRole('heading', { name: '05 データ構造とアルゴリズム' })).toBeInTheDocument();
  });
});
