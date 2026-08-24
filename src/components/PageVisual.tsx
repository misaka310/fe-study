import { studyVisuals } from '../content/visuals';

type VisualKind = 'materials' | 'practice' | 'exam' | 'dashboard';

const visualByKind: Record<VisualKind, typeof studyVisuals[number]['id']> = {
  materials: 'hero',
  practice: 'algorithm',
  exam: 'security',
  dashboard: 'hero',
};

export function PageVisual({ kind }: { kind: VisualKind }) {
  const visual = studyVisuals.find((item) => item.id === visualByKind[kind]) ?? studyVisuals[0];
  return (
    <figure className="page-visual">
      <img src={visual.src} alt={visual.alt} />
      <figcaption>{visual.label}</figcaption>
    </figure>
  );
}
