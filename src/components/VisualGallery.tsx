'use client';

import { useState } from 'react';
import { studyVisuals } from '../content/visuals';

export function VisualGallery({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = studyVisuals.find((visual) => visual.id === selectedId);

  return (
    <section className={`visual-section${compact ? ' visual-section-compact' : ''}`} aria-labelledby="visual-title">
      <div className="section-heading">
        <p className="eyebrow">Visual study notes</p>
        <h2 id="visual-title">図解でつかむFEの全体像</h2>
        <p>教材の理解を助ける図をまとめています。画像を選ぶと大きく表示できます。</p>
      </div>
      <div className="visual-grid">
        {studyVisuals.filter((visual) => !compact || visual.id !== 'hero').map((visual) => (
          <figure className="visual-card" key={visual.id}>
            <button type="button" onClick={() => setSelectedId(visual.id)} aria-label={`${visual.label}を拡大表示`}>
              <img src={visual.src} alt={visual.alt} loading="lazy" />
            </button>
            <figcaption><strong>{visual.label}</strong><span>{visual.description}</span></figcaption>
          </figure>
        ))}
      </div>
      {selected ? (
        <div className="visual-lightbox" role="dialog" aria-modal="true" aria-label={`${selected.label}の拡大画像`} onClick={() => setSelectedId(null)}>
          <div className="visual-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="visual-close" onClick={() => setSelectedId(null)} aria-label="画像を閉じる">×</button>
            <img src={selected.src} alt={selected.alt} />
            <p>{selected.label}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
