'use client';

import { useState, useSyncExternalStore } from 'react';
import { studyVisuals } from '../content/visuals';

export function VisualGallery({ compact = false, materialId }: { compact?: boolean; materialId?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false);
  const selected = studyVisuals.find((visual) => visual.id === selectedId);
  const related = materialId ? studyVisuals.filter((visual) => visual.relatedMaterialIds.includes(materialId)) : studyVisuals;
  const visibleVisuals = related.length ? related : studyVisuals;

  return (
    <section className={`visual-section${compact ? ' visual-section-compact' : ''}`} aria-labelledby="visual-title">
      <div className="section-heading">
        <p className="eyebrow">Visual study notes</p>
        <h2 id="visual-title">図解画像一覧</h2>
        <p>本文の途中で使っている説明図をまとめています。画像を選ぶと大きく表示できます。</p>
      </div>
      <div className="visual-grid">
        {visibleVisuals.filter((visual) => !compact || visual.id !== 'dns-ttl' || Boolean(materialId)).map((visual) => (
          <figure className="visual-card" key={visual.id}>
            <button type="button" disabled={!hydrated} onClick={() => setSelectedId(visual.id)} aria-label={`${visual.label}を拡大表示`}>
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
