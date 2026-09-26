import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

const publicMarkdown = [
  'README.md',
  'AGENTS.md',
  'CONTRIBUTING.md',
  ...readdirSync('docs')
    .filter((name) => name.endsWith('.md'))
    .map((name) => join('docs', name)),
];

describe('repository presentation quality', () => {
  it('does not expose machine-specific paths or deployment history in public markdown', () => {
    for (const path of publicMarkdown) {
      const value = read(path);
      expect(value, path).not.toMatch(/[A-Za-z]:\\\\/);
      expect(value, path).not.toMatch(/\/Users\//);
      expect(value, path).not.toMatch(/\/home\//);
      expect(value, path).not.toMatch(/appgdep_[a-zA-Z0-9]+/);
      expect(value, path).not.toMatch(/appgver_[a-zA-Z0-9]+/);
      expect(value, path).not.toMatch(/appgprj_[a-zA-Z0-9]+/);
    }
  });

  it('README is useful to a first-time public visitor', () => {
    const readme = read('README.md');
    for (const required of [
      'プロジェクトの特徴',
      '技術スタック',
      '主な機能',
      'ローカルで起動',
      '品質確認',
      'アーキテクチャ',
      'データとプライバシー',
      'MIT License',
      'npm ci',
      'npm run dev',
      'npm test',
    ]) {
      expect(readme).toContain(required);
    }
    expect(readme).not.toContain('所有者限定サイトを開く');
    expect(readme).not.toContain('最優先: ChatGPT Sitesへのデプロイ');
  });

  it('states unofficial status and local-first data handling', () => {
    const readme = read('README.md');
    expect(readme).toContain('非公式');
    expect(readme).toContain('localStorage');
    expect(readme).toContain('Firebase設定を行わなくても');
    expect(existsSync('LICENSE')).toBe(true);
    expect(read('LICENSE')).toContain('MIT License');
  });

  it('publishes architecture, quality, contribution and CI documentation', () => {
    for (const path of [
      'CONTRIBUTING.md',
      'docs/ARCHITECTURE.md',
      'docs/QUALITY.md',
      'docs/DEPLOYMENT.md',
      '.github/workflows/ci.yml',
    ]) {
      expect(existsSync(path), path).toBe(true);
    }
  });

  it('keeps optional Firebase sync free of hard-coded private infrastructure dependencies', () => {
    const prepare = read('scripts/prepare-firebase-config.mjs');
    expect(prepare).toContain('FE_FIREBASE_CONFIG_JSON');
    expect(prepare).toContain('FE_FIREBASE_CONFIG_URL');
    expect(prepare).toContain('local-only mode');
    expect(prepare).not.toContain('task-picker.onrender.com');
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
    expect(gitignore).toContain('public/firebase-config.json');
  });
});
