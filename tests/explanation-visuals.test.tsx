import { existsSync } from 'node:fs';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { QuestionExplanationVisual } from '../src/components/QuestionExplanationVisual';
import { questions } from '../src/content/questions';
import { explanationVisuals, preloadExplanationVisual } from '../src/content/explanationVisuals';
import { vocabularyQuestions } from '../src/content/vocabulary';

const allQuestions = [...questions, ...vocabularyQuestions];
const shouldHaveVisual = (question: typeof allQuestions[number]) => question.difficulty >= 2
  || question.domain === 'algorithm'
  || question.domain === 'security-case';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('問題解説図', () => {
  it('次の問題へ進む前に解説画像を先読みできる', () => {
    const visual = Object.values(explanationVisuals)[0];
    const createdImages: Array<{ src: string }> = [];

    class MockImage {
      src = '';

      constructor() {
        createdImages.push(this);
      }
    }

    vi.stubGlobal('Image', MockImage);
    preloadExplanationVisual(visual);

    expect(createdImages).toHaveLength(1);
    expect(createdImages[0].src).toBe(visual.src);
  });

  it('図解対象の全候補へ一意に付与する', () => {
    const candidates = allQuestions.filter(shouldHaveVisual);
    expect(candidates.length).toBeGreaterThanOrEqual(100);
    expect(Object.keys(explanationVisuals)).toHaveLength(candidates.length);
    expect(candidates.every((question) => question.explanationVisual)).toBe(true);
    expect(candidates.every((question) => question.explanationVisual?.src === `/images/explanations/${question.id}.webp`)).toBe(true);
  });

  it('本文だけで足りる単純問題には画像を付けない', () => {
    expect(allQuestions.filter((question) => !shouldHaveVisual(question)).every((question) => !question.explanationVisual)).toBe(true);
  });

  it('対象画像が全て実ファイルとして保存されている', () => {
    for (const question of allQuestions.filter(shouldHaveVisual)) {
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
});
