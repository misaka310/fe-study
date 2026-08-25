import { describe, expect, it } from 'vitest';
import { materials } from '../src/content/materials';
import { officialLinks } from '../src/content/official-links';
import { studyVisuals } from '../src/content/visuals';

describe('教材カタログ', () => {
  it('学習順に並んだ12章を収録する', () => {
    expect(materials).toHaveLength(12);
    expect(materials.map((material) => material.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(new Set(materials.map((material) => material.id)).size).toBe(12);
  });

  it('各章が要約、複数節、関連問題論点を持つ', () => {
    for (const material of materials) {
      expect(material.summary.length, material.id).toBeGreaterThanOrEqual(35);
      expect(material.sections.length, material.id).toBeGreaterThanOrEqual(4);
      expect(material.relatedQuestionTopics.length, material.id).toBeGreaterThanOrEqual(2);
      for (const section of material.sections) {
        expect(section.heading.length, material.id).toBeGreaterThanOrEqual(3);
        expect(section.paragraphs.join('').length, `${material.id}/${section.heading}`).toBeGreaterThanOrEqual(80);
      }
    }
  });

  it('採用した説明図だけを教材から参照する', () => {
    const visualIds = new Set(studyVisuals.map((visual) => visual.id));
    for (const material of materials) {
      if (material.visualId) expect(visualIds.has(material.visualId), `${material.id}/${material.visualId}`).toBe(true);
      for (const section of material.sections) {
        if (section.visualId) expect(visualIds.has(section.visualId), `${material.id}/${section.visualId}`).toBe(true);
      }
    }
  });

  it('各章に判断軸と混同注意を明示した解説節がある', () => {
    for (const material of materials) {
      const structuredSections = material.sections.filter((section) => (
        (section.decisionAxes?.length ?? 0) >= 2
        && (section.contrast?.length ?? 0) >= 1
        && (section.pitfalls?.length ?? 0) >= 1
      ));
      expect(structuredSections.length, material.id).toBeGreaterThanOrEqual(1);
    }
  });

  it('科目Aと科目Bの必須領域を章として網羅する', () => {
    expect(materials.map((material) => material.category)).toEqual([
      '学習計画', 'テクノロジ', 'テクノロジ', 'テクノロジ', '科目B', 'テクノロジ',
      'テクノロジ', 'テクノロジ・科目B', 'テクノロジ', 'マネジメント', 'ストラテジ', '試験対策',
    ]);
    const joined = materials.flatMap((material) => material.sections.flatMap((section) => [section.heading, ...section.paragraphs])).join('\n');
    for (const keyword of ['離散数学', 'CPU', 'オペレーティングシステム', '擬似言語', 'データベース', 'TCP/IP', '認証', 'ソフトウェア設計', 'プロジェクトマネジメント', '企業活動', '科目A', '科目B']) {
      expect(joined, keyword).toContain(keyword);
    }
  });

  it('アルゴリズム章に追跡できる擬似言語例がある', () => {
    const algorithm = materials.find((material) => material.id === '05-algorithms');
    expect(algorithm).toBeDefined();
    expect(algorithm?.sections.filter((section) => section.code).length).toBeGreaterThanOrEqual(3);
    expect(algorithm?.sections.some((section) => section.code?.includes('for'))).toBe(true);
    expect(algorithm?.sections.some((section) => section.code?.includes('while'))).toBe(true);
  });

  it('公式資料リンクはIPAのHTTPS URLだけを使う', () => {
    expect(officialLinks.length).toBeGreaterThanOrEqual(7);
    for (const link of officialLinks) {
      const url = new URL(link.url);
      expect(url.protocol).toBe('https:');
      expect(url.hostname).toBe('www.ipa.go.jp');
    }
    expect(officialLinks.some((link) => link.label.includes('シラバス Ver.9.2'))).toBe(true);
    expect(officialLinks.filter((link) => link.label.includes('公開問題')).length).toBeGreaterThanOrEqual(4);
  });
});
