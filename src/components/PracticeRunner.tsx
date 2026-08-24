'use client';

import { useMemo, useState } from 'react';
import { questions } from '../content/questions';
import { buildWeaknessRanking, recordAttempt } from '../learning/state';
import { useLearningState } from '../learning/useLearningState';

type PracticeMode = 'all' | 'unanswered' | 'wrong' | 'weakness';

const labels: Record<PracticeMode, string> = {
  all: '全問題', unanswered: '未回答', wrong: '誤答復習', weakness: '弱点優先',
};

export function PracticeRunner({ mode = 'all', materialId, domain, subject }: {
  mode?: string; materialId?: string; domain?: string; subject?: string;
}) {
  const selectedMode: PracticeMode = mode in labels ? mode as PracticeMode : 'all';
  const { state, update, ready, message } = useLearningState();
  const [index, setIndex] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const pool = useMemo(() => {
    const weakTopics = new Set(buildWeaknessRanking(state, questions).map((item) => item.topic));
    return questions.filter((question) => {
      if (subject && question.subject !== subject) return false;
      if (materialId && question.materialId !== materialId) return false;
      if (domain && question.domain !== domain) return false;
      const attempts = state.attempts[question.id] ?? [];
      if (selectedMode === 'unanswered') return attempts.length === 0;
      if (selectedMode === 'wrong') return attempts.length > 0 && !attempts.at(-1)!.correct;
      if (selectedMode === 'weakness') return weakTopics.has(question.topic);
      return true;
    });
  }, [domain, materialId, selectedMode, state, subject]);
  const current = pool[Math.min(index, Math.max(0, pool.length - 1))];

  const move = (direction: number) => {
    setIndex((value) => Math.max(0, Math.min(pool.length - 1, value + direction)));
    setPick(null);
    setRevealed(false);
  };

  if (!ready) return <main className="study-shell"><p>学習履歴を読み込んでいます…</p></main>;
  return (
    <main className="study-shell">
      <header className="study-header">
        <a className="brand" href="?"><span className="brand-mark">FE</span><span>基本情報技術者 合格ナビ</span></a>
        <a href="?view=dashboard">学習記録</a>
      </header>
      <section className="study-toolbar" aria-label="演習モード">
        <div><p className="eyebrow">Practice</p><h1>問題演習</h1></div>
        <nav>{Object.entries(labels).map(([key, label]) => <a aria-current={key === selectedMode ? 'page' : undefined} href={`?view=practice&mode=${key}`} key={key}>{label}</a>)}</nav>
      </section>
      <nav className="scope-nav" aria-label="科目と分野">
        <a aria-current={!subject && !domain ? 'page' : undefined} href={`?view=practice&mode=${selectedMode}`}>全科目</a>
        <a aria-current={subject === 'A' ? 'page' : undefined} href={`?view=practice&mode=${selectedMode}&subject=A`}>科目A</a>
        <a aria-current={subject === 'B' ? 'page' : undefined} href={`?view=practice&mode=${selectedMode}&subject=B`}>科目B</a>
        {['theory','computer','software','database','network','security','development','management','strategy','algorithm','security-case'].map((item) => <a aria-current={domain === item ? 'page' : undefined} href={`?view=practice&mode=${selectedMode}&domain=${item}`} key={item}>{item}</a>)}
      </nav>
      {message ? <p className="status-message" role="status">{message}</p> : null}
      <p className="question-count">{labels[selectedMode]} · {pool.length}問</p>
      {!current ? (
        <section className="empty-card"><h2>該当する問題はありません</h2><p>別のモードを選ぶか、まず全問題から演習してください。</p><a href="?view=practice&mode=all">全問題へ</a></section>
      ) : (
        <article className="question-card">
          <div className="question-meta"><span>科目{current.subject}</span><span>{current.topic}</span><span>難易度 {current.difficulty}</span><strong>{index + 1} / {pool.length}</strong></div>
          <h2>{current.stem}</h2>
          {current.code ? <pre><code>{current.code}</code></pre> : null}
          <fieldset disabled={revealed}>
            <legend className="sr-only">回答を一つ選択</legend>
            {current.choices.map((choice, choiceIndex) => (
              <label className={`choice ${revealed && current.correct.includes(choiceIndex) ? 'choice-correct' : ''}`} key={choice}>
                <input checked={pick === choiceIndex} name="choice" onChange={() => setPick(choiceIndex)} type="radio" />
                <span>{String.fromCharCode(65 + choiceIndex)}</span>{choice}
              </label>
            ))}
          </fieldset>
          {!revealed ? <button className="answer-button" disabled={pick === null} onClick={() => {
            if (pick === null) return;
            const correct = current.correct.includes(pick);
            update((value) => recordAttempt(value, current.id, [pick], correct, new Date().toISOString()));
            setRevealed(true);
          }}>解答する</button> : (
            <section className="answer-panel" aria-live="polite">
              <h3>{pick !== null && current.correct.includes(pick) ? '正解' : '不正解'}</h3>
              <p>{current.explanation}</p>
              <ol>{current.choices.map((choice, choiceIndex) => <li data-testid="choice-reason" key={choice}><strong>{String.fromCharCode(65 + choiceIndex)}. {choice}</strong><span>{current.choiceReasons[choiceIndex]}</span></li>)}</ol>
              <a href={`?view=materials&material=${current.materialId}`}>関連教材を復習する</a>
            </section>
          )}
          <nav className="question-pagination"><button disabled={index === 0} onClick={() => move(-1)}>前の問題</button><button disabled={index >= pool.length - 1} onClick={() => move(1)}>次の問題</button></nav>
        </article>
      )}
    </main>
  );
}
