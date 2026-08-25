import { describe, expect, it } from 'vitest';
import { studyVisuals } from '../src/content/visuals';

describe('説明図カタログ', () => {
  it('教材として意味のある図だけを収録する', () => {
    expect(studyVisuals.map((visual) => visual.id)).toEqual([
      'theory', 'computer', 'software', 'database',
      'dns-ttl', 'tcp-udp', 'subnet-routing', 'auth-access-control',
      'development', 'management', 'strategy', 'final-review',
    ]);
    expect(studyVisuals.map((visual) => visual.id)).not.toContain('roadmap');
    expect(studyVisuals.map((visual) => visual.id)).not.toContain('algorithm');
    expect(studyVisuals.map((visual) => visual.id)).not.toContain('security-overview');
    for (const visual of studyVisuals) {
      expect(visual.relatedMaterialIds.length, visual.id).toBeGreaterThanOrEqual(1);
      expect(visual.alt.length, visual.id).toBeGreaterThanOrEqual(20);
      expect(visual.description.length, visual.id).toBeGreaterThanOrEqual(25);
    }
  });
});
