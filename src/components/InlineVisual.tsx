import { studyVisuals } from '../content/visuals';

export function InlineVisual({ visualId }: { visualId: string }) {
  const visual = studyVisuals.find((item) => item.id === visualId);
  if (!visual) return null;
  return (
    <figure className="markdown-visual">
      <img src={visual.src} alt={visual.alt} loading="lazy" />
      <figcaption><strong>{visual.label}</strong><span>{visual.description}</span></figcaption>
    </figure>
  );
}
