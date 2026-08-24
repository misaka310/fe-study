'use client';

import { questions } from '../content/questions';
import { useLearningState } from '../learning/useLearningState';

export function ProgressSummary() {
  const { state, ready } = useLearningState();
  const answered = ready ? Object.keys(state.attempts).length : 0;
  const progress = Math.round(answered / questions.length * 100);
  return (
    <aside className="progress-card" aria-label="学習進捗">
      <p>YOUR PROGRESS</p><strong>{progress}%</strong><span>{answered ? `${answered}問に回答済み` : 'まだ回答履歴はありません'}</span>
      <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
      <a href="?view=dashboard">詳しい学習記録を見る</a>
    </aside>
  );
}
