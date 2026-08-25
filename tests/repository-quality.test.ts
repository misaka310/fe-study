import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

const publicDocs = ['README.md', 'AGENTS.md', 'docs/SPEC.md'];

describe('repository presentation quality', () => {
  it('does not expose machine-specific development paths in current public-facing docs', () => {
    for (const path of publicDocs) {
      const text = read(path);
      expect(text, path).not.toMatch(/[A-Za-z]:\\/);
      expect(text, path).not.toMatch(/\/Users\//);
      expect(text, path).not.toMatch(/\/home\//);
    }
  });

  it('README is usable without access to the private hosted preview', () => {
    const readme = read('README.md');
    expect(readme).toContain('npm ci');
    expect(readme).toContain('npm run dev');
    expect(readme).not.toContain('所有者限定サイトを開く');
    expect(readme).not.toContain('chatgpt.site');
  });

  it('README states the unofficial status, local data handling, and MIT license', () => {
    const readme = read('README.md');
    expect(readme).toContain('非公式');
    expect(readme).toContain('localStorage');
    expect(readme).toContain('MIT License');
    expect(existsSync('LICENSE')).toBe(true);
    expect(read('LICENSE')).toContain('MIT License');
  });

  it('does not keep stale agent implementation plans as end-user repository documentation', () => {
    expect(existsSync('docs/superpowers')).toBe(false);
  });

  it('ignores local credentials and temporary agent artifacts', () => {
    const gitignore = read('.gitignore');
    expect(gitignore).toContain('.env*');
    expect(gitignore).toContain('.ai-bridge/');
    expect(gitignore).toContain('*.pem');
    expect(gitignore).toContain('*.key');
  });
});
