import { studyVisuals } from '../content/visuals';

type VisualKind = 'materials' | 'practice' | 'exam' | 'dashboard';

const visualByKind: Record<VisualKind, typeof studyVisuals[number]['id']> = {
  materials: 'dns-ttl',
  practice: 'tcp-udp',
  exam: 'auth-access-control',
  dashboard: 'subnet-routing',
};

export function PageVisual({ kind, materialId }: { kind: VisualKind; materialId?: string }) {
  const related = materialId ? studyVisuals.find((item) => item.relatedMaterialIds.includes(materialId)) : undefined;
  const visual = related ?? studyVisuals.find((item) => item.id === visualByKind[kind]) ?? studyVisuals[0];
  return (
    <figure className="page-visual">
      <img src={visual.src} alt={visual.alt} />
      <figcaption><strong>{visual.label}</strong><span>{visual.description}</span></figcaption>
    </figure>
  );
}
