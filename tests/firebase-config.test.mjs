import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('optional Firebase configuration', () => {
  it('does not require network configuration for local-only builds', () => {
    const env = { ...process.env };
    delete env.FE_FIREBASE_CONFIG_JSON;
    delete env.FE_FIREBASE_CONFIG_URL;
    delete env.TASKPICKER_FIREBASE_CONFIG_URL;

    const output = execFileSync(process.execPath, ['scripts/prepare-firebase-config.mjs'], {
      cwd: process.cwd(),
      env,
      encoding: 'utf8',
    });

    expect(output).toContain('local-only mode');
    expect(existsSync('public/firebase-config.json')).toBe(false);
  });
});
