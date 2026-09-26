import { ExamCenter } from '../src/components/ExamCenter';
import { LearningDashboard } from '../src/components/LearningDashboard';
import { MaterialReader } from '../src/components/MaterialReader';
import { PortalHeader } from '../src/components/PortalHeader';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { questions } from '../src/content/questions';
import { vocabularyQuestions } from '../src/content/vocabulary';

function Landing({ questionCount }: { questionCount: number }) {
  return (
    <div className="portal-page">
      <PortalHeader questionCount={questionCount} />
      <main className="portal-main">
        <section className="landing-choice-grid" aria-label="学習メニュー">
          <a className="landing-choice-card" href="?view=materials">
            <span className="eyebrow">Materials</span>
            <strong>教材</strong>
            <p>12章の教材を読んで、用語・考え方・判断軸を整理する。</p>
            <b>教材を開く →</b>
          </a>
          <a className="landing-choice-card" href="?view=practice&mode=all">
            <span className="eyebrow">Practice</span>
            <strong>問題演習</strong>
            <p>{questionCount}問から選んで解く。復習や模試もここから。</p>
            <b>問題演習を開く →</b>
          </a>
        </section>
      </main>
    </div>
  );
}

interface PageProps { searchParams?: Promise<Record<string, string | string[] | undefined>>; }

export default async function Home({ searchParams = Promise.resolve({}) }: PageProps = {}) {
  const params = await searchParams;
  const questionCount = questions.length + vocabularyQuestions.length;
  if (params.view === 'materials') return <MaterialReader initialMaterialId={typeof params.material === 'string' ? params.material : '01-roadmap'} questionCount={questionCount} />;
  if (params.view === 'practice') return <PracticeRunner mode={typeof params.mode === 'string' ? params.mode : 'all'} materialId={typeof params.material === 'string' ? params.material : undefined} domain={typeof params.domain === 'string' ? params.domain : undefined} subject={typeof params.subject === 'string' ? params.subject : undefined} vocabSet={typeof params.vocabSet === 'string' ? params.vocabSet : undefined} practiceTier={typeof params.tier === 'string' ? params.tier : undefined} questionCount={questionCount} />;
  if (params.view === 'exams') return <ExamCenter questionCount={questionCount} />;
  if (params.view === 'dashboard') return <LearningDashboard questionCount={questionCount} />;
  return <Landing questionCount={questionCount} />;
}
