import { ExamCenter } from '../src/components/ExamCenter';
import { LearningDashboard } from '../src/components/LearningDashboard';
import { MaterialReader } from '../src/components/MaterialReader';
import { PortalHeader } from '../src/components/PortalHeader';
import { PracticeRunner } from '../src/components/PracticeRunner';
import { VisualGallery } from '../src/components/VisualGallery';
import { questions } from '../src/content/questions';

const studyPath = (questionCount: number) => [
  { href: '?view=materials&material=01-roadmap', title: '1. はじめる', text: '試験の全体像と、今日からの学習順を確認する' },
  { href: '?view=materials&material=02-theory', title: '2. 基礎を整理する', text: '理論・構成要素・OSを土台から理解する' },
  { href: '?view=materials&material=07-network', title: '3. 主要分野を学ぶ', text: 'ネットワーク、DB、セキュリティ、開発をつなげる' },
  { href: '?view=practice&mode=all', title: '4. 問題で判断力を付ける', text: `${questionCount}問を条件から選び、全選択肢の理由を確認する` },
  { href: '?view=practice&mode=weakness', title: '5. 弱点を補強する', text: '誤答履歴から未解決の論点へ戻る' },
  { href: '?view=materials&material=12-final-review', title: '6. 最終確認', text: '科目Bの追跡手順と本番の判断を確認する' },
];

const practiceLinks = (questionCount: number) => [
  { href: '?view=practice&mode=all', title: `全${questionCount}問練習`, text: '標準問題を一通り解く' },
  { href: '?view=practice&mode=all&subject=B&tier=foundation', title: '科目B 基礎100問', text: '短い追跡問題で擬似言語とデータ構造の土台を固める' },
  { href: '?view=practice&mode=all&subject=B&tier=exam', title: '科目B 本番レベル40問', text: '仕様読解と複数段階の追跡を本番相当の密度で練習する' },
  { href: '?view=practice&mode=vocabulary&vocabSet=1', title: '基本問題 20問×8セット', text: '科目Aで問われる知識判断を160問で確認する' },
  { href: '?view=practice&mode=vocabulary&vocabSet=7', title: '科目A 実戦用語20問', text: '現行シラバスと2025・2026年度の公式公開問題を基準に、既存教材で薄い重要語を追加確認する' },
  { href: '?view=practice&mode=vocabulary&vocabSet=8', title: '科目A 公開問題補強20問', text: '2023〜2026年度のIPA公式公開問題を横断し、未収録だった重要語を補強する' },
  { href: '?view=exams', title: '科目A・B模試', text: '科目Bは本番レベル問題から16問＋4問で確認する' },
  { href: '?view=practice&mode=unanswered', title: '未回答だけ', text: 'まだ解いていない問題を進める' },
  { href: '?view=practice&mode=wrong', title: '間違いだけ', text: '直近で間違えた問題を解き直す' },
  { href: '?view=practice&mode=weakness', title: '弱点補強', text: '苦手トピックに関連する問題を解く' },
  { href: '?view=dashboard', title: '学習記録', text: '正答率と分野別の変化を確認する' },
];

function Landing({ questionCount }: { questionCount: number }) {
  return (
    <div className="portal-page">
      <PortalHeader questionCount={questionCount} />
      <main className="portal-main">
        <section className="portal-section" aria-labelledby="study-path-title">
          <p className="eyebrow">Study path</p>
          <h2 id="study-path-title">この順番で進める</h2>
          <p className="section-lead">最初から順番に進めても、弱点から入っても大丈夫です。各画面から次の行動へ移動できます。</p>
          <div className="quick-grid">
            {studyPath(questionCount).map((item) => <a className="quick-card" href={item.href} key={item.href}><strong>{item.title}</strong><span>{item.text}</span></a>)}
          </div>
        </section>

        <section className="portal-section" aria-labelledby="practice-title">
          <p className="eyebrow">Practice</p>
          <h2 id="practice-title">問題演習</h2>
          <p className="section-lead">出題順を覚えるのではなく、問題文の条件と選択肢の違いから答えを決めます。</p>
          <div className="quick-grid">
            {practiceLinks(questionCount).map((item) => <a className="quick-card" href={item.href} key={item.href}><strong>{item.title}</strong><span>{item.text}</span></a>)}
          </div>
        </section>

        <section className="progress-banner" aria-label="学習記録への導線">
          <div><p className="eyebrow">Your progress</p><h2>学習の続きへ戻る</h2><p>回答履歴はこのブラウザに保存されています。弱点補強や学習記録から、前回の続きへ進めます。</p></div>
          <a href="?view=dashboard">学習記録を開く</a>
        </section>

        <VisualGallery />
      </main>
    </div>
  );
}

interface PageProps { searchParams?: Promise<Record<string, string | string[] | undefined>>; }

export default async function Home({ searchParams = Promise.resolve({}) }: PageProps = {}) {
  const params = await searchParams;
  const questionCount = questions.length;
  if (params.view === 'materials') return <MaterialReader initialMaterialId={typeof params.material === 'string' ? params.material : '01-roadmap'} questionCount={questionCount} />;
  if (params.view === 'practice') return <PracticeRunner mode={typeof params.mode === 'string' ? params.mode : 'all'} materialId={typeof params.material === 'string' ? params.material : undefined} domain={typeof params.domain === 'string' ? params.domain : undefined} subject={typeof params.subject === 'string' ? params.subject : undefined} vocabSet={typeof params.vocabSet === 'string' ? params.vocabSet : undefined} practiceTier={typeof params.tier === 'string' ? params.tier : undefined} questionCount={questionCount} />;
  if (params.view === 'exams') return <ExamCenter questionCount={questionCount} />;
  if (params.view === 'dashboard') return <LearningDashboard questionCount={questionCount} />;
  return <Landing questionCount={questionCount} />;
}
