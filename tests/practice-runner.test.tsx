import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { questions } from '../src/content/questions';
import { PRACTICE_SESSION_STORAGE_KEY } from '../src/learning/practiceSession';
import { STORAGE_KEY } from '../src/learning/storage';

afterEach(() => {
  vi.unstubAllGlobals();
});

function setVisualAlgorithmSession(questionIds = ['b-algorithm-047', 'b-algorithm-050', 'b-algorithm-053']) {
  localStorage.setItem(PRACTICE_SESSION_STORAGE_KEY, JSON.stringify({
    'practice-v1|all|||algorithm|': {
      seed: 1,
      questionIds,
      answeredIds: [],
    },
  }));
}

describe('PracticeRunner', () => {
  it('回答直後に解説を自動表示し、解説を見るボタンを出さない', async () => {
    localStorage.clear();
    render(<PracticeRunner questionCount={265} mode="all" subject="A" />);
    const choices = await screen.findAllByRole('radio');
    fireEvent.click(choices[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    expect(screen.getByText(/^(正解|不正解)$/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '次へ' })).toBeEnabled();
    expect(screen.queryByRole('button', { name: '解説を見る' })).not.toBeInTheDocument();
    expect(screen.getByText('条件')).toBeInTheDocument();
    expect(screen.getByText('決め手')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '選択肢ごとの判定' })).toBeInTheDocument();
    expect(screen.getAllByTestId('choice-reason')).toHaveLength(4);
    expect(localStorage.getItem(STORAGE_KEY)).toContain('attempts');
  });

  it('次へを押す前に次のアルゴリズム問題の解説画像を先読みし、移動時に再要求しない', async () => {
    localStorage.clear();
    setVisualAlgorithmSession();
    const loadedSources: string[] = [];

    class MockImage {
      private value = '';
      onload: (() => void) | null = null;

      set src(value: string) {
        this.value = value;
        loadedSources.push(value);
        this.onload?.();
      }

      get src() {
        return this.value;
      }
    }

    vi.stubGlobal('Image', MockImage);
    render(<PracticeRunner questionCount={questions.length} mode="all" domain="algorithm" />);
    await screen.findAllByRole('radio');
    expect(loadedSources).toHaveLength(1);
    expect(loadedSources[0]).toMatch(/^\/images\/explanations\/b-algorithm-\d{3}\.webp$/);

    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    fireEvent.click(screen.getByRole('button', { name: '次へ' }));

    expect(loadedSources).toHaveLength(2);
    expect(loadedSources[1]).toMatch(/^\/images\/explanations\/b-algorithm-\d{3}\.webp$/);
  });

  it('現在の問題を解いている間に次のアルゴリズム問題の解説画像を先読みする', async () => {
    localStorage.clear();
    setVisualAlgorithmSession(['b-algorithm-047', 'b-algorithm-065', 'b-algorithm-066']);
    const loadedSources: string[] = [];

    class MockImage {
      onload: (() => void) | null = null;

      set src(value: string) {
        loadedSources.push(value);
        this.onload?.();
      }
    }

    vi.stubGlobal('Image', MockImage);
    render(<PracticeRunner questionCount={questions.length} mode="all" domain="algorithm" />);
    await screen.findAllByRole('radio');

    expect(loadedSources).toHaveLength(1);
    expect(loadedSources[0]).toMatch(/^\/images\/explanations\/b-algorithm-\d{3}\.webp$/);
  });

  it('未回答モードでは回答済み問題を除外する', async () => {
    localStorage.clear();
    const { unmount } = render(<PracticeRunner questionCount={265} mode="all" />);
    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    unmount();
    render(<PracticeRunner questionCount={265} mode="unanswered" />);
    expect(await screen.findByRole('link', { name: /未回答だけ/ })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${questions.length - 1}問`))).toBeInTheDocument();
  });

  it('通常問題を全科目・科目A・科目Bで分類し、対象件数を表示する', async () => {
    localStorage.clear();
    const allRender = render(<PracticeRunner questionCount={265} mode="all" />);
    await screen.findAllByRole('radio');

    expect(screen.getByText('全科目 · 全問題')).toBeInTheDocument();
    expect(screen.getByText('全科目の全問題：265問')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /全科目.*265問/ })).toHaveAttribute('href', '?view=practice&mode=all');
    expect(screen.getByRole('link', { name: /科目A.*165問/ })).toHaveAttribute('href', '?view=practice&mode=all&subject=A');
    expect(screen.getByRole('link', { name: /科目B.*100問/ })).toHaveAttribute('href', '?view=practice&mode=all&subject=B');

    allRender.unmount();
    render(<PracticeRunner questionCount={265} mode="all" subject="B" />);
    await screen.findAllByRole('radio');
    expect(screen.getByText('科目B · 全問題')).toBeInTheDocument();
    expect(screen.getByText('科目Bの全問題：100問')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /科目B.*100問/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /科目B.*100問/ })).toHaveClass('is-selected');
    expect(screen.getByRole('link', { name: '全問題' })).toHaveClass('is-selected');
    expect(screen.getByRole('link', { name: '未回答だけ' })).not.toHaveClass('is-selected');
    expect(screen.getByRole('link', { name: '全問題' })).not.toHaveTextContent('✓');
  });

  it('絞り込みモードでは対象全体の件数も表示する', async () => {
    localStorage.clear();
    const allRender = render(<PracticeRunner questionCount={265} mode="all" />);
    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    allRender.unmount();
    render(<PracticeRunner questionCount={265} mode="unanswered" />);
    await screen.findAllByRole('radio');
    expect(screen.getByText(/全科目の未回答だけ：\d+問（全265問）/)).toBeInTheDocument();
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

  it('基本問題の途中で再読み込みすると解答済みを飛ばして同じセットの続きから再開する', async () => {
    localStorage.clear();
    const now = vi.spyOn(Date, 'now').mockReturnValue(20260908);
    const firstRender = render(<PracticeRunner questionCount={265} mode="vocabulary" vocabSet="1" />);
    await screen.findAllByRole('radio');
    const answeredStem = firstRender.container.querySelector('.practice-question-card h2')?.textContent;
    expect(answeredStem).toBeTruthy();

    fireEvent.click((await screen.findAllByRole('radio'))[0]);
    fireEvent.click(screen.getByRole('button', { name: '解答する' }));
    firstRender.unmount();

    const resumedRender = render(<PracticeRunner questionCount={265} mode="vocabulary" vocabSet="1" />);
    await screen.findAllByRole('radio');
    expect(resumedRender.container.querySelector('.practice-question-card h2')?.textContent).not.toBe(answeredStem);
    expect(screen.getByText('2 / 20')).toBeInTheDocument();
    expect(screen.queryByText('保存済みの学習履歴を読み取れなかったため、新しい状態で開始しました。')).not.toBeInTheDocument();
    now.mockRestore();
  });
});
