'use client';

import { useRef, useState } from 'react';
import { questions } from '../content/questions';
import { parseBackup, serializeBackup } from '../learning/backup';
import { buildWeaknessRanking } from '../learning/state';
import { useLearningState } from '../learning/useLearningState';

const knownIds = new Set(questions.map((question) => question.id));

export function LearningDashboard() {
  const { state, update, ready } = useLearningState();
  const [notice, setNotice] = useState('');
  const input = useRef<HTMLInputElement>(null);
  if (!ready) return <main className="study-shell"><p>学習記録を読み込んでいます…</p></main>;
  const answered = Object.keys(state.attempts).length;
  const attempts = Object.values(state.attempts).flat();
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const weaknesses = buildWeaknessRanking(state, questions).slice(0, 10);
  const progress = Math.round(answered / questions.length * 100);
  const domainScores = [...new Set(questions.map((question) => question.domain))].map((domain) => {
    const ids = new Set(questions.filter((question) => question.domain === domain).map((question) => question.id));
    const domainAttempts = Object.entries(state.attempts).filter(([id]) => ids.has(id)).flatMap(([, values]) => values);
    return { domain, attempts: domainAttempts.length, rate: domainAttempts.length ? Math.round(domainAttempts.filter((attempt) => attempt.correct).length / domainAttempts.length * 100) : 0 };
  });

  const exportData = () => {
    const blob = new Blob([serializeBackup(state)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `fe-study-backup-${new Date().toISOString().slice(0,10)}.json`; anchor.click();
    URL.revokeObjectURL(url);
    setNotice('学習履歴をJSONファイルへ書き出しました。');
  };
  const importData = async (file?: File) => {
    if (!file) return;
    const parsed = parseBackup(await file.text(), knownIds);
    if (!parsed.ok) { setNotice('読込みに失敗しました。FE合格ナビのバックアップJSONを選んでください。'); return; }
    update(parsed.state); setNotice('学習履歴を復元しました。');
  };
  return (
    <main className="study-shell">
      <header className="study-header"><a className="brand" href="?"><span className="brand-mark">FE</span><span>基本情報技術者 合格ナビ</span></a><a href="?view=practice&mode=weakness">弱点演習へ</a></header>
      <section className="study-toolbar"><div><p className="eyebrow">Learning record</p><h1>学習記録</h1></div></section>
      <div className="stats-grid"><section><span>学習進捗</span><strong>{progress}%</strong><p>{answered} / {questions.length}問に回答</p></section><section><span>累計正答率</span><strong>{attempts.length ? Math.round(correct / attempts.length * 100) : 0}%</strong><p>{correct} / {attempts.length}回答が正解</p></section><section><span>弱点トピック</span><strong>{weaknesses.length}</strong><p>誤答履歴から優先順位を算出</p></section></div>
      <section className="weakness-card"><h2>復習優先トピック</h2>{weaknesses.length ? <ol>{weaknesses.map((item) => <li key={item.topic}><strong>{item.topic}</strong><span>誤答 {item.wrong}・正解 {item.correct}</span><a href="?view=practice&mode=weakness">復習する</a></li>)}</ol> : <p>まだ弱点データがありません。問題演習から始めましょう。</p>}</section>
      <section className="weakness-card"><h2>分野別成績</h2><div className="domain-scores">{domainScores.map((item) => <a href={`?view=practice&domain=${item.domain}`} key={item.domain}><strong>{item.domain}</strong><span>{item.attempts ? `正答率 ${item.rate}%（${item.attempts}回答）` : '未着手'}</span></a>)}</div></section>
      <section className="backup-card"><h2>学習履歴のバックアップ</h2><p>履歴はこのブラウザ内に保存されます。端末変更やブラウザ消去に備えてJSONを保管できます。</p><div><button onClick={exportData}>JSONを書き出す</button><button onClick={() => input.current?.click()}>JSONから復元</button><input accept="application/json" hidden onChange={(event) => importData(event.target.files?.[0])} ref={input} type="file" /></div>{notice ? <p role="status">{notice}</p> : null}</section>
    </main>
  );
}
