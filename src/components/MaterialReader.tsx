'use client';

import { useMemo, useState } from 'react';
import { materials } from '../content/materials';
import { officialLinks } from '../content/official-links';
import { VisualGallery } from './VisualGallery';
import { RichText } from './RichText';
import { InlineVisual } from './InlineVisual';
import { PortalHeader } from './PortalHeader';

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
    <div className="portal-page">
      <PortalHeader active="materials" />
      <main className="portal-main">
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
        <div className="document-toolbar">
          <div><p className="eyebrow">{current.category}</p><h1>{current.title}</h1></div>
          <a className="toolbar-practice-link" href={`?view=practice&material=${current.id}`}>問題で確認する</a>
        </div>
        <p className="material-summary"><RichText text={current.summary} /></p>
        {current.visualId ? <InlineVisual visualId={current.visualId} /> : null}
        <div className="markdown-body">
          {current.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}><RichText text={paragraph} /></p>)}
            {section.visualId ? <InlineVisual visualId={section.visualId} /> : null}
            {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}><RichText text={bullet} /></li>)}</ul> : null}
            {section.code ? <pre><code>{section.code}</code></pre> : null}
            {section.takeaways?.length ? <div className="material-guide material-guide-takeaway"><h3>この節の要点</h3><ul>{section.takeaways.map((item) => <li key={item}><RichText text={item} /></li>)}</ul></div> : null}
            {section.decisionAxes?.length ? <div className="material-guide material-guide-decision"><h3>判断軸</h3><ul>{section.decisionAxes.map((item) => <li key={item}><RichText text={item} /></li>)}</ul></div> : null}
            {section.contrast?.length ? <div className="material-guide material-guide-contrast"><h3>混同注意</h3><ul>{section.contrast.map((item) => <li key={item}><RichText text={item} /></li>)}</ul></div> : null}
            {section.pitfalls?.length ? <div className="material-guide material-guide-pitfall"><h3>試験の注意点</h3><ul>{section.pitfalls.map((item) => <li key={item}><RichText text={item} /></li>)}</ul></div> : null}
          </section>
        ))}
        </div>
        <nav className="chapter-pagination" aria-label="章の移動">
          {previous ? <a href={`?view=materials&material=${previous.id}`}>前の章</a> : <span />}
          {next ? <a href={`?view=materials&material=${next.id}`}>次の章</a> : <span />}
        </nav>
        <div className="material-next-actions" aria-label="次に進む">
          <a className="next-action-primary" href={`?view=practice&material=${current.id}`}>この章の問題を解く</a>
          <a href="?view=practice&mode=weakness">弱点補強へ</a>
          <a href="?view=dashboard">学習記録を見る</a>
        </div>
        {['02-theory', '07-network', '08-security', '12-final-review'].includes(current.id) ? <VisualGallery compact materialId={current.id} /> : null}
          </article>
        </div>
      </main>
    </div>
  );
}
