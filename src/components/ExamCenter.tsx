'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { questions } from '../content/questions';
import type { Subject } from '../domain/types';
import { createExamSession, recordAttempt } from '../learning/state';
import { useLearningState } from '../learning/useLearningState';
import { PortalHeader } from './PortalHeader';

const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`;

export function ExamCenter({ questionCount }: { questionCount: number }) {
  const { state, update, ready } = useLearningState();
  const [now, setNow] = useState(0);
  const [result, setResult] = useState<{ correct: number; answered: number; total: number } | null>(null);
  const session = state.activeExam;
  useEffect(() => {
    if (!session) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [session]);
  const current = useMemo(() => session ? questions.find((question) => question.id === session.questionIds[session.currentIndex]) : undefined, [session]);
  const remaining = session ? Math.max(0, session.durationMinutes * 60 - Math.floor((now - Date.parse(session.startedAt)) / 1000)) : 0;

  const start = (subject: Subject) => {
    setResult(null);
    update((value) => ({ ...value, activeExam: createExamSession(subject, questions, new Date().toISOString()) }));
    setNow(Date.now());
  };
  const finish = useCallback(() => {
    if (!session) return;
    let correctCount = 0;
    for (const id of session.questionIds) {
      const question = questions.find((item) => item.id === id)!;
      const picks = session.picks[id] ?? [];
      const correct = picks.length === question.correct.length && picks.every((pick) => question.correct.includes(pick));
      if (correct) correctCount += 1;
    }
    const answered = Object.keys(session.picks).length;
    update((value) => {
      let next = value;
      for (const id of session.questionIds) {
        const picks = session.picks[id];
        if (!picks) continue;
        const question = questions.find((item) => item.id === id)!;
        const correct = picks.length === question.correct.length && picks.every((pick) => question.correct.includes(pick));
        next = recordAttempt(next, id, picks, correct, new Date().toISOString());
      }
      return { ...next, activeExam: null };
    });
    setResult({ correct: correctCount, answered, total: session.questionIds.length });
  }, [session, update]);
  useEffect(() => {
    if (!session || remaining !== 0 || now === 0) return;
    const timeout = window.setTimeout(finish, 0);
    return () => window.clearTimeout(timeout);
  }, [finish, now, remaining, session]);

  if (!ready) return <main className="study-shell"><p>模試データを読み込んでいます…</p></main>;
  if (!session || !current) return (
    <div className="portal-page">
      <PortalHeader active="practice" questionCount={questionCount} />
      <main className="study-shell portal-main">
      <section className="study-toolbar"><div><p className="eyebrow">Mock exams</p><h1>模擬試験</h1></div></section>
      <p className="exam-note">本番と同じ問題数・制限時間で実施します。正答率は学習目安であり、公式のIRT評価点は再現しません。</p>
      {result ? <section className="result-card"><p>直前の結果</p><strong>{result.correct} / {result.total}</strong><span>回答済み {result.answered}問・正答率 {Math.round(result.correct / result.total * 100)}%</span><div><a href="?view=practice&mode=wrong">誤答を復習する</a><a href="?view=materials&material=12-final-review">直前確認へ戻る</a></div></section> : null}
      <div className="exam-grid">
        <section><p className="eyebrow">Subject A</p><h2>科目A 模試</h2><strong>60問 / 90分</strong><p>基礎理論からストラテジまでを横断して出題します。</p><button onClick={() => start('A')}>科目A模試を開始</button></section>
        <section><p className="eyebrow">Subject B</p><h2>科目B 模試</h2><strong>20問 / 100分</strong><p>本番レベル問題からアルゴリズム16問・セキュリティ4問を出題します。</p><button onClick={() => start('B')}>科目B模試を開始</button></section>
      </div>
      </main>
    </div>
  );

  const pick = session.picks[current.id]?.[0];
  return (
    <div className="portal-page">
      <PortalHeader active="practice" questionCount={questionCount} />
      <main className="study-shell portal-main exam-active">
      <header className="exam-header"><div><span>科目{session.subject} 模試</span><strong>{session.currentIndex + 1} / {session.questionIds.length}</strong></div><div aria-live="polite"><span>残り時間</span><strong>{formatTime(remaining)}</strong></div><a href="?">保存して中断</a></header>
      <article className="question-card">
        <h2>{current.stem}</h2>{current.code ? <pre><code>{current.code}</code></pre> : null}
        <fieldset><legend className="sr-only">回答を一つ選択</legend>{current.choices.map((choice, index) => <label className="choice" key={choice}><input checked={pick === index} name="exam-choice" onChange={() => update((value) => ({ ...value, activeExam: value.activeExam ? { ...value.activeExam, picks: { ...value.activeExam.picks, [current.id]: [index] } } : null }))} type="radio"/><span>{String.fromCharCode(65+index)}</span>{choice}</label>)}</fieldset>
        <nav className="question-pagination"><button disabled={session.currentIndex === 0} onClick={() => update((value) => ({...value, activeExam:value.activeExam ? {...value.activeExam,currentIndex:value.activeExam.currentIndex-1}:null}))}>前へ</button>{session.currentIndex < session.questionIds.length - 1 ? <button onClick={() => update((value) => ({...value,activeExam:value.activeExam ? {...value.activeExam,currentIndex:value.activeExam.currentIndex+1}:null}))}>次へ</button> : <button className="finish-button" onClick={finish}>採点して終了</button>}</nav>
      </article>
      </main>
    </div>
  );
}
