'use client';

import { useMemo, useState } from 'react';
import { materials } from '../content/materials';
import { officialLinks } from '../content/official-links';
import { VisualGallery } from './VisualGallery';

export function MaterialReader({ initialMaterialId = '01-roadmap' }: { initialMaterialId?: string }) {
  const initialIndex = Math.max(0, materials.findIndex((material) => material.id === initialMaterialId));
  const [selectedId, setSelectedId] = useState(materials[initialIndex].id);
  const [query, setQuery] = useState('');
  const currentIndex = materials.findIndex((material) => material.id === selectedId);
  const current = materials[currentIndex] ?? materials[0];
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ja-JP');
    if (!normalized) return materials;
    return materials.filter((material) => [
      material.title,
      material.summary,
      ...material.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ].join('\n').toLocaleLowerCase('ja-JP').includes(normalized));
  }, [query]);
  const previous = materials[currentIndex - 1];
  const next = materials[currentIndex + 1];

  return (
    <div className="material-layout">
      <aside className="material-nav">
        <p className="eyebrow">Materials 01–12</p>
        <label htmlFor="material-search">教材を検索</label>
        <input
          aria-label="教材を検索"
          id="material-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例: SQL、認証、EVM"
          type="search"
          value={query}
        />
        <nav aria-label="教材一覧">
          {filtered.map((material) => (
            <a
              aria-current={material.id === current.id ? 'page' : undefined}
              href={`?view=materials&material=${material.id}`}
              key={material.id}
              onClick={(event) => { event.preventDefault(); setSelectedId(material.id); }}
            >
              {material.title}
            </a>
          ))}
          {filtered.length === 0 ? <p>一致する教材がありません。別の語句で検索してください。</p> : null}
        </nav>
        <section className="official-links" aria-labelledby="official-title">
          <h3 id="official-title">IPA公式資料</h3>
          {officialLinks.map((link) => <a href={link.url} key={link.label} rel="noreferrer" target="_blank">{link.label}</a>)}
        </section>
      </aside>

      <article className="material-reader">
        <p className="eyebrow">{current.category}</p>
        <h1>{current.title}</h1>
        <p className="material-summary">{current.summary}</p>
        <a className="practice-link" href={`?view=practice&material=${current.id}`}>この章の問題を解く</a>
        {current.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            {section.code ? <pre><code>{section.code}</code></pre> : null}
          </section>
        ))}
        <nav className="chapter-pagination" aria-label="章の移動">
          {previous ? <a href={`?view=materials&material=${previous.id}`}>前の章</a> : <span />}
          {next ? <a href={`?view=materials&material=${next.id}`}>次の章</a> : <span />}
        </nav>
        {['05-algorithms', '07-network', '08-security'].includes(current.id) ? <VisualGallery compact /> : null}
      </article>
    </div>
  );
}
