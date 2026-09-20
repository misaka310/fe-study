'use client';

import { useEffect, useMemo, useState } from 'react';
import { questions } from '../content/questions';
import { preloadExplanationVisual } from '../content/explanationVisuals';
import { questionAcronymEntries } from '../content/questionAcronyms';
import { vocabularyQuestions } from '../content/vocabulary';
import type { Question } from '../domain/types';
import {
  firstUnansweredIndex,
  loadOrCreatePracticeSession,
  resetPracticeSession,
  savePracticeAnswer,
  type PracticeSession,
} from '../learning/practiceSession';
import { buildWeaknessRanking, recordAttempt } from '../learning/state';
import { useLearningState } from '../learning/useLearningState';
import { PortalHeader } from './PortalHeader';
import { QuestionExplanationVisual } from './QuestionExplanationVisual';
import { RichText } from './RichText';

type PracticeMode = 'all' | 'unanswered' | 'wrong' | 'weakness' | 'vocabulary';
type BasicSet = 1 | 2 | 3 | 4 | 5;

interface AnsweredContext {
  question: Question;
  index: number;
  total: number;
}

const labels: Record<PracticeMode, string> = {
  all: '全問題', unanswered: '未回答だけ', wrong: '間違いだけ', weakness: '弱点補強', vocabulary: '基本問題',
};

const domainLabels: Record<string, string> = {
  theory: '基礎理論・情報表現', computer: 'コンピュータ構成要素', software: 'OS・ソフトウェア',
  database: 'データベース', network: 'ネットワーク', security: '情報セキュリティ',
  development: 'システム開発・設計', management: 'マネジメント', strategy: 'ストラテジ',
  algorithm: 'アルゴリズム', 'security-case': 'セキュリティ事例',
};

function latestAttempt(questionId: string, attempts: Record<string, { correct: boolean }[]>) {
  const entries = attempts[questionId] ?? [];
  return entries.at(-1);
}

function percent(value: number, total: number) {
  return total ? `${Math.round(value / total * 100)}%` : '-';
}

function parseBasicSet(value?: string): BasicSet {
  if (value === '2' || value === '3' || value === '4' || value === '5') return Number(value) as BasicSet;
  return 1;
}

export function PracticeRunner({ mode = 'all', materialId, domain, subject, vocabSet, questionCount }: {
  mode?: string; materialId?: string; domain?: string; subject?: string; vocabSet?: string; questionCount: number;
}) {
  const selectedMode: PracticeMode = mode in labels ? mode as PracticeMode : 'all';
  const selectedVocabularySet = parseBasicSet(vocabSet);
  const { state, update, ready, message } = useLearningState();
  const [index, setIndex] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answeredContext, setAnsweredContext] = useState<AnsweredContext | null>(null);
  const [practiceSession, setPracticeSession] = useState<PracticeSession | null>(null);
  const [activeSessionKey, setActiveSessionKey] = useState<string | null>(null);
  const allPracticeQuestions = useMemo(() => [...questions, ...vocabularyQuestions], []);
  const weakTopics = useMemo(() => new Set(buildWeaknessRanking(state, allPracticeQuestions).map((item) => item.topic)), [allPracticeQuestions, state]);
  const sourceQuestions = useMemo(() => selectedMode === 'vocabulary' ? vocabularyQuestions : selectedMode === 'weakness' ? allPracticeQuestions : questions, [allPracticeQuestions, selectedMode]);

  const subjectPool = useMemo(() => sourceQuestions.filter((question) => {
    if (materialId && question.materialId !== materialId) return false;
    if (domain && question.domain !== domain) return false;
    if (selectedMode === 'vocabulary' && question.vocabularySet !== selectedVocabularySet) return false;
    return true;
  }), [domain, materialId, selectedMode, selectedVocabularySet, sourceQuestions]);

  const basePool = useMemo(() => {
    return subjectPool.filter((question) => {
      if (subject && question.subject !== subject) return false;
      return true;
    });
  }, [subject, subjectPool]);

  const candidatePool = useMemo(() => basePool.filter((question) => {
    const attempts = state.attempts[question.id] ?? [];
    if (selectedMode === 'unanswered') return attempts.length === 0;
    if (selectedMode === 'wrong') return attempts.length > 0 && !attempts.at(-1)!.correct;
    if (selectedMode === 'weakness') return weakTopics.has(question.topic);
    return true;
  }), [basePool, selectedMode, state, weakTopics]);

  const sessionKey = useMemo(() => [
    'practice-v1', selectedMode, subject ?? '', materialId ?? '', domain ?? '', selectedMode === 'vocabulary' ? selectedVocabularySet : '',
  ].join('|'), [domain, materialId, selectedMode, selectedVocabularySet, subject]);
  const candidateIds = useMemo(() => candidatePool.map((question) => question.id), [candidatePool]);
  const validIds = useMemo(() => new Set(basePool.map((question) => question.id)), [basePool]);

  useEffect(() => {
    if (!ready || activeSessionKey === sessionKey) return;
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const nextSession = loadOrCreatePracticeSession(sessionKey, candidateIds, validIds);
      setPracticeSession(nextSession);
      setIndex(nextSession ? firstUnansweredIndex(nextSession) : 0);
      setPick(null);
      setRevealed(false);
      setAnsweredContext(null);
      setActiveSessionKey(sessionKey);
    });
    return () => { active = false; };
  }, [activeSessionKey, candidateIds, ready, sessionKey, validIds]);

  const pool = useMemo(() => {
    if (activeSessionKey !== sessionKey || !practiceSession) return [];
    const byId = new Map(basePool.map((question) => [question.id, question]));
    return practiceSession.questionIds
      .map((questionId) => byId.get(questionId))
      .filter((question): question is Question => Boolean(question));
  }, [activeSessionKey, basePool, practiceSession, sessionKey]);

  const currentIndex = Math.min(index, Math.max(0, pool.length - 1));
  const current = pool[currentIndex];
  const displayQuestion = revealed && answeredContext ? answeredContext.question : current;
  const displayIndex = revealed && answeredContext ? answeredContext.index : currentIndex;
  const displayTotal = revealed && answeredContext ? answeredContext.total : pool.length;
  const acronymEntries = useMemo(() => displayQuestion ? questionAcronymEntries(displayQuestion) : [], [displayQuestion]);

  const answered = pool.filter((question) => latestAttempt(question.id, state.attempts));
  const correctCount = answered.filter((question) => latestAttempt(question.id, state.attempts)?.correct).length;
  const wrongQuestions = pool.filter((question) => latestAttempt(question.id, state.attempts) && !latestAttempt(question.id, state.attempts)?.correct);
  const weaknessRanking = useMemo(() => buildWeaknessRanking(state, allPracticeQuestions).slice(0, 5), [allPracticeQuestions, state]);
  const sessionAnsweredIds = useMemo(() => new Set(practiceSession?.answeredIds ?? []), [practiceSession]);

  const findMoveTarget = (direction: number) => {
    for (let target = currentIndex + direction; target >= 0 && target < pool.length; target += direction) {
      if (!sessionAnsweredIds.has(pool[target].id)) return target;
    }
    return -1;
  };

  const previousTarget = findMoveTarget(-1);
  const nextTarget = findMoveTarget(1);

  const move = (direction: number) => {
    const target = direction < 0 ? previousTarget : nextTarget;
    if (target < 0) return;
    if (direction > 0) preloadExplanationVisual(pool[target]?.explanationVisual);
    setIndex(target);
    setPick(null);
    setRevealed(false);
    setAnsweredContext(null);
  };

  const shuffle = () => {
    const nextSession = resetPracticeSession(sessionKey, candidateIds);
    setPracticeSession(nextSession);
    setActiveSessionKey(sessionKey);
    setIndex(0);
    setPick(null);
    setRevealed(false);
    setAnsweredContext(null);
  };

  const previousDisabled = previousTarget < 0;
  const nextDisabled = nextTarget < 0;

  const practiceHref = (nextMode = selectedMode, nextSubject = subject, nextDomain = domain) => {
    const params = new URLSearchParams({ view: 'practice', mode: nextMode });
    if (materialId) params.set('material', materialId);
    if (nextDomain) params.set('domain', nextDomain);
    if (nextSubject) params.set('subject', nextSubject);
    if (nextMode === 'vocabulary') params.set('vocabSet', String(selectedVocabularySet));
    return `?${params.toString()}`;
  };

  const subjectCount = (value?: string) => value ? subjectPool.filter((question) => question.subject === value).length : subjectPool.length;
  const subjectLabel = subject ? `科目${subject}` : '全科目';
  const scopeLabel = selectedMode === 'vocabulary' ? `基本問題・セット${selectedVocabularySet}` : subjectLabel;
  const basePoolLabel = subject ? `${subjectLabel}の全${basePool.length}問` : `全${basePool.length}問`;

  useEffect(() => {
    void preloadExplanationVisual(pool[nextTarget]?.explanationVisual);
  }, [nextTarget, pool]);

  if (!ready || activeSessionKey !== sessionKey) return <main className="study-shell"><p>学習履歴を読み込んでいます…</p></main>;

  return (
    <div className="portal-page">
      <PortalHeader active={selectedMode === 'weakness' ? 'weakness' : 'practice'} questionCount={questionCount} />
      <main className="portal-main practice-page-main">
        <div className="practice-layout">
          <aside className="practice-sidebar practice-sidebar-left" aria-label="問題演習のメニュー">
            <p className="eyebrow">Practice</p>
            <h1>問題演習</h1>
            <section className="practice-menu-group" aria-labelledby="practice-mode-title">
              <h2 id="practice-mode-title">モード</h2>
              {Object.entries(labels).map(([key, label]) => (
                <a aria-current={key === selectedMode ? 'page' : undefined} className={`practice-menu-link${key === selectedMode ? ' is-selected' : ''}`} href={practiceHref(key as PracticeMode, key === 'vocabulary' ? undefined : subject)} key={key}>
                  {label}
                </a>
              ))}
              <a className="practice-menu-link" href="?view=exams"><span>→</span>科目A・B模試</a>
            </section>
            {selectedMode !== 'vocabulary' ? (
              <section className="practice-menu-group" aria-labelledby="practice-subject-title">
                <h2 id="practice-subject-title">科目</h2>
                <a aria-current={!subject ? 'page' : undefined} className={`practice-menu-link${!subject ? ' is-selected' : ''}`} href={practiceHref(selectedMode, undefined)}>全科目（{subjectCount()}問）</a>
                <a aria-current={subject === 'A' ? 'page' : undefined} className={`practice-menu-link${subject === 'A' ? ' is-selected' : ''}`} href={practiceHref(selectedMode, 'A')}>科目A（{subjectCount('A')}問）</a>
                <a aria-current={subject === 'B' ? 'page' : undefined} className={`practice-menu-link${subject === 'B' ? ' is-selected' : ''}`} href={practiceHref(selectedMode, 'B')}>科目B（{subjectCount('B')}問）</a>
              </section>
            ) : null}
            <section className="practice-menu-group" aria-labelledby="vocabulary-set-title">
              <h2 id="vocabulary-set-title">基本問題 20問×5セット</h2>
              {[1, 2, 3, 4, 5].map((set) => <a aria-current={selectedMode === 'vocabulary' && selectedVocabularySet === set ? 'page' : undefined} className={`practice-menu-link${selectedMode === 'vocabulary' && selectedVocabularySet === set ? ' is-selected' : ''}`} href={`?view=practice&mode=vocabulary&vocabSet=${set}`} key={set}><span>#{set}</span>セット{set}（20問）</a>)}
            </section>
            <section className="practice-menu-group" aria-labelledby="practice-domain-title">
              <h2 id="practice-domain-title">分野</h2>
              <a aria-current={!domain ? 'page' : undefined} className="practice-menu-link" href={practiceHref(selectedMode, subject, undefined)}>全分野</a>
              {Object.entries(domainLabels).map(([key, label]) => (
                <a aria-current={domain === key ? 'page' : undefined} className={`practice-menu-link${domain === key ? ' is-selected' : ''}`} href={practiceHref(selectedMode, subject, key)} key={key}>{label}</a>
              ))}
            </section>
            <div className="practice-notice">現在のセットは、問題文の条件と選択肢の理由を確認しながら進めます。回答履歴はこのブラウザに保存されます。</div>
            <section className="practice-menu-group" aria-labelledby="practice-action-title">
              <h2 id="practice-action-title">操作</h2>
              <button className="practice-menu-button" onClick={shuffle} type="button"><span>⇄</span>現在のセットをシャッフル</button>
              <a className="practice-menu-link" href="?view=dashboard"><span>→</span>学習記録を開く</a>
            </section>
          </aside>

          <section className="practice-center" aria-labelledby="practice-board-title">
            <div className="practice-board-title" id="practice-board-title">{scopeLabel} · {selectedMode === 'vocabulary' ? '基本問題' : labels[selectedMode]}</div>
            <p className="practice-set-count">{selectedMode === 'vocabulary' ? `${scopeLabel}：${displayTotal}問` : `${scopeLabel}の${labels[selectedMode]}：${displayTotal}問${displayTotal < basePool.length ? `（${basePoolLabel}）` : ''}`}</p>
            {message ? <p className="status-message" role="status">{message}</p> : null}
            {!displayQuestion ? (
              <section className="practice-empty"><h2>該当する問題はありません</h2><p>{selectedMode === 'weakness' ? 'まだ弱点履歴がありません。まず問題を解いて誤答すると、ここへ関連問題が表示されます。' : '別のモードか分野を選ぶと、対象の問題が表示されます。'}</p><a href="?view=practice&mode=all">全問題へ戻る</a></section>
            ) : (
              <section className="practice-question-card">
                <div className="practice-meta-row"><span className="practice-pill">科目{displayQuestion.subject}</span><span className="practice-pill">{domainLabels[displayQuestion.domain] ?? displayQuestion.domain}</span><span className="practice-pill">{displayQuestion.topic}</span><span className="practice-pill">難易度 {displayQuestion.difficulty}</span><strong>{displayIndex + 1} / {displayTotal}</strong></div>
                <div className="practice-progress" aria-label={`進捗 ${displayIndex + 1} / ${displayTotal}`}><span style={{ width: `${displayTotal ? ((displayIndex + 1) / displayTotal) * 100 : 0}%` }} /></div>
                <h2>{<RichText text={displayQuestion.stem} />}</h2>
                {displayQuestion.code ? <pre><code>{displayQuestion.code}</code></pre> : null}
                <fieldset disabled={revealed}>
                  <legend className="sr-only">回答を一つ選択</legend>
                  {displayQuestion.choices.map((choice, choiceIndex) => {
                    const isCorrect = displayQuestion.correct.includes(choiceIndex);
                    const isWrongPick = revealed && pick === choiceIndex && !isCorrect;
                    return <label className={`practice-choice ${revealed && isCorrect ? 'is-correct' : ''}${isWrongPick ? ' is-wrong' : ''}`} key={choice}>
                      <input checked={pick === choiceIndex} name="choice" onChange={() => setPick(choiceIndex)} type="radio" />
                      <span>{String.fromCharCode(65 + choiceIndex)}</span><RichText text={choice} />
                    </label>;
                  })}
                </fieldset>
                {!revealed ? <button className="practice-answer-button" disabled={pick === null} onClick={() => {
                  if (pick === null || !current || !practiceSession) return;
                  const answeredQuestion = current;
                  setAnsweredContext({ question: answeredQuestion, index: currentIndex, total: pool.length });
                  setPracticeSession(savePracticeAnswer(sessionKey, practiceSession, answeredQuestion.id));
                  update((value) => recordAttempt(value, answeredQuestion.id, [pick], answeredQuestion.correct.includes(pick), new Date().toISOString()));
                  setRevealed(true);
                }} type="button">解答する</button> : (
                  <div className="practice-answer-summary" aria-live="polite">
                    <div className={pick !== null && displayQuestion.correct.includes(pick) ? 'practice-result-good' : 'practice-result-bad'}>{pick !== null && displayQuestion.correct.includes(pick) ? '正解' : '不正解'}</div>
                  </div>
                )}
                <nav className="practice-question-actions" aria-label="問題の移動"><button disabled={previousDisabled} onClick={() => move(-1)} type="button">前へ</button><button className={revealed ? 'practice-next-primary' : undefined} disabled={nextDisabled} onClick={() => move(1)} type="button">次へ</button></nav>
                {revealed ? (
                  <section className="practice-answer-panel" id="practice-explanation">
                    <div className="practice-answer-block"><strong>条件</strong><p><RichText text={displayQuestion.stem} /></p></div>
                    <div className="practice-answer-block"><strong>決め手</strong><p><RichText text={displayQuestion.explanation} /></p></div>
                    {acronymEntries.length ? <div className="practice-answer-block practice-acronym-block"><strong>略語メモ</strong><dl className="practice-acronym-list">{acronymEntries.map((entry) => <div key={entry.term}><dt><b>{entry.term}</b><span>{entry.expansion}</span></dt><dd>{entry.meaning}</dd></div>)}</dl></div> : null}
                    {displayQuestion.explanationVisual ? <QuestionExplanationVisual visual={displayQuestion.explanationVisual} /> : null}
                    <h3>選択肢ごとの判定</h3>
                    <ol className="practice-choice-reasons">{displayQuestion.choices.map((choice, choiceIndex) => <li data-testid="choice-reason" key={choice}><strong>{String.fromCharCode(65 + choiceIndex)}. {displayQuestion.correct.includes(choiceIndex) ? '正解' : '不正解'}</strong><span><RichText text={displayQuestion.choiceReasons[choiceIndex]} /></span></li>)}</ol>
                    <a href={`?view=materials&material=${displayQuestion.materialId}`}>関連教材を復習する</a>
                  </section>
                ) : null}

              </section>
            )}
          </section>

          <aside className="practice-sidebar practice-sidebar-right" aria-label="演習状況">
            <section className="practice-side-panel"><h2>Score</h2><div className="practice-score"><strong>{correctCount} / {answered.length}</strong><span>正解 / 解答済み</span><b>{percent(correctCount, answered.length)}</b><span>正答率</span><small>残り {Math.max(0, pool.length - answered.length)} 問</small></div></section>
            <section className="practice-side-panel"><h2>分野別</h2><table className="practice-domain-table"><tbody>{Object.entries(domainLabels).map(([key, label]) => { const domainQuestions = pool.filter((question) => question.domain === key); const domainAnswered = domainQuestions.filter((question) => latestAttempt(question.id, state.attempts)); const domainCorrect = domainAnswered.filter((question) => latestAttempt(question.id, state.attempts)?.correct).length; return domainQuestions.length ? <tr key={key}><td>{label}</td><td>{domainCorrect}/{domainAnswered.length}</td><td>{percent(domainCorrect, domainAnswered.length)}</td></tr> : null; })}</tbody></table></section>
            <section className="practice-side-panel"><h2>弱点</h2>{weaknessRanking.length ? <div className="practice-weakness-list">{weaknessRanking.map((item) => <a href="?view=practice&mode=weakness" key={item.topic}><strong>{item.topic}</strong><span>誤答 {item.wrong}回 / 未解決 {item.score}</span></a>)}</div> : <p className="practice-side-muted">まだ弱点履歴はありません。</p>}</section>
            <section className="practice-side-panel"><h2>間違えた問題</h2>{wrongQuestions.length ? <ol className="practice-review-list">{wrongQuestions.slice(0, 8).map((question) => <li key={question.id}><a href={`?view=practice&mode=wrong&domain=${question.domain}`}>{question.topic} · {question.stem.slice(0, 24)}…</a></li>)}</ol> : <p className="practice-side-muted">現在のセットに未解決の誤答はありません。</p>}</section>
            <section className="practice-side-panel practice-study-note"><h2>学習の目安</h2><p>正解数だけでなく、条件から正解を選んだ理由と、迷った選択肢を外す理由まで説明できる状態を目指します。</p></section>
          </aside>
        </div>
      </main>
    </div>
  );
}
