import { MaterialReader } from '../src/components/MaterialReader';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { ExamCenter } from '../src/components/ExamCenter';
import { LearningDashboard } from '../src/components/LearningDashboard';
import { ProgressSummary } from '../src/components/ProgressSummary';

const learningPaths = [
  { href: '?view=materials', label: '教材から始める', description: '12章の教材で、科目A・Bの全体像から順番に理解する', tone: 'cyan' },
  { href: '?view=practice&mode=all', label: '問題演習', description: '独自問題を解き、全選択肢の理由まで確認する', tone: 'amber' },
  { href: '?view=exams', label: '模擬試験', description: '科目A 60問・科目B 20問を本番時間で実施する', tone: 'navy' },
] as const;

function Landing() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="?">
          <span className="brand-mark" aria-hidden="true">FE</span>
          <span>基本情報技術者 合格ナビ</span>
        </a>
        <nav aria-label="主要メニュー">
          <a href="?view=materials">教材</a><a href="?view=practice&mode=all">問題集</a><a href="?view=exams">模試</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Fundamental Information Technology Engineer</p>
          <h1>基本情報技術者 合格ナビ</h1>
          <p className="hero-lead">ITパスポートの次から、科目A・科目Bの合格水準まで。教材、問題演習、弱点補強、模試をひとつの流れで進めます。</p>
          <div className="hero-actions">
            <a className="primary-action" href="?view=materials">学習を始める</a>
            <a className="secondary-action" href="?view=practice&mode=weakness">弱点を確認</a>
          </div>
        </div>
        <ProgressSummary />
      </section>

      <section className="path-section" aria-labelledby="path-title">
        <div className="section-heading"><p className="eyebrow">Start here</p><h2 id="path-title">今日やることを選ぶ</h2></div>
        <div className="path-grid">
          {learningPaths.map((path, index) => (
            <a aria-label={path.label} className={`path-card path-${path.tone}`} href={path.href} key={path.href}>
              <span className="path-number">0{index + 1}</span><h3>{path.label}</h3><p>{path.description}</p><span className="path-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="exam-strip" aria-label="試験構成">
        <div><span>科目A</span><strong>60問 / 90分</strong></div><div><span>科目B</span><strong>20問 / 100分</strong></div>
        <p>サイト内の正答率は学習目安です。公式のIRT評価点は再現しません。</p>
      </section>
    </main>
  );
}

interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams = Promise.resolve({}) }: PageProps = {}) {
  const params = await searchParams;
  if (params.view === 'materials') {
    return <MaterialReader initialMaterialId={typeof params.material === 'string' ? params.material : '01-roadmap'} />;
  }
  if (params.view === 'practice') {
    return <PracticeRunner mode={typeof params.mode === 'string' ? params.mode : 'all'} materialId={typeof params.material === 'string' ? params.material : undefined} domain={typeof params.domain === 'string' ? params.domain : undefined} subject={typeof params.subject === 'string' ? params.subject : undefined} />;
  }
  if (params.view === 'exams') return <ExamCenter />;
  if (params.view === 'dashboard') return <LearningDashboard />;
  return <Landing />;
}
