import { existsSync } from 'node:fs';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { QuestionExplanationVisual } from '../src/components/QuestionExplanationVisual';
import { questions } from '../src/content/questions';
import { explanationVisuals, preloadExplanationVisual } from '../src/content/explanationVisuals';
import { vocabularyQuestions } from '../src/content/vocabulary';

const allQuestions = [...questions, ...vocabularyQuestions];
const visualQuestions = allQuestions.filter((question) => question.explanationVisual);
const examQuestions = questions.filter((question) => question.practiceTier === 'exam');

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('問題解説図', () => {
  it('同じ解説画像の先読み要求を共有し、読み込み完了を待てる', async () => {
    const visual = Object.values(explanationVisuals)[0];
    const createdImages: Array<MockImage> = [];

    class MockImage {
      src = '';
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      constructor() {
        createdImages.push(this);
      }
    }

    vi.stubGlobal('Image', MockImage);
    const first = preloadExplanationVisual(visual);
    const second = preloadExplanationVisual(visual);

    expect(createdImages).toHaveLength(1);
    expect(createdImages[0].src).toBe(visual.src);
    expect(first).toBe(second);

    createdImages[0].onload?.();
    await expect(first).resolves.toBeUndefined();
  });

  it('既存365問へ解説図を一意に付与する', () => {
    expect(Object.keys(explanationVisuals)).toHaveLength(365);
    expect(visualQuestions).toHaveLength(365);
    expect(visualQuestions.every((question) => question.explanationVisual?.src === `/images/explanations/${question.id}.webp`)).toBe(true);
  });

  it('画像未付与は科目B本番レベル40問だけに限定する', () => {
    const textOnlyQuestions = allQuestions.filter((question) => !question.explanationVisual);
    expect(examQuestions).toHaveLength(40);
    expect(textOnlyQuestions.map((question) => question.id).sort()).toEqual(examQuestions.map((question) => question.id).sort());
  });

  it('対象画像が全て実ファイルとして保存されている', () => {
    for (const question of visualQuestions) {
      expect(existsSync(`public${question.explanationVisual!.src}`), question.id).toBe(true);
    }
  });

  it('画像の読み込み失敗時は日本語の復旧メッセージを表示する', () => {
    const visual = questions.find((question) => question.explanationVisual)?.explanationVisual;
    expect(visual).toBeTruthy();
    render(<QuestionExplanationVisual visual={visual!} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('status')).toHaveTextContent('説明画像を読み込めませんでした');
  });

  it('解説表示時はブラウザのlazy遅延を使わない', () => {
    const visual = questions.find((question) => question.explanationVisual)?.explanationVisual;
    expect(visual).toBeTruthy();
    render(<QuestionExplanationVisual visual={visual!} />);
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager');
  });
});
