'use client';

import { useState } from 'react';
import type { ExplanationVisual } from '../domain/types';

export function QuestionExplanationVisual({ visual }: { visual: ExplanationVisual }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <p className="practice-explanation-visual-error" role="status">説明画像を読み込めませんでした。関連教材の本文でこの考え方を確認できます。</p>;
  }

  return (
    <figure className="practice-explanation-visual">
      <img src={visual.src} alt={visual.alt} loading="eager" decoding="async" onError={() => setFailed(true)} />
      <figcaption><strong>{visual.label}</strong><span>{visual.description}</span></figcaption>
    </figure>
  );
}
