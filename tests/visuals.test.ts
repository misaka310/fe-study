import { describe, expect, it } from 'vitest';
import { studyVisuals } from '../src/content/visuals';

describe('説明図カタログ', () => {
  it('12章の全体像を説明できる図を収録する', () => {
    expect(studyVisuals.map((visual) => visual.id)).toEqual([
      'roadmap', 'theory', 'computer', 'software', 'algorithm', 'database',
      'dns-ttl', 'tcp-udp', 'subnet-routing', 'auth-access-control', 'security-overview',
      'development', 'management', 'strategy', 'final-review',
    ]);
    for (const visual of studyVisuals) {
      expect(visual.relatedMaterialIds.length, visual.id).toBeGreaterThanOrEqual(1);
      expect(visual.alt.length, visual.id).toBeGreaterThanOrEqual(20);
      expect(visual.description.length, visual.id).toBeGreaterThanOrEqual(25);
    }
  });
});
