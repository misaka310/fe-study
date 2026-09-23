import { afterEach, describe, expect, it } from 'vitest';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { pngInfo } from '../scripts/image-regeneration-png.mjs';

const dirs = [];
function tempFile() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fe-image-png-test-'));
  dirs.push(dir);
  return path.join(dir, 'generated.png');
}
afterEach(() => {
  for (const dir of dirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

async function actualPng() {
  return sharp({ create: { width: 1254, height: 1254, channels: 4, background: '#ffffff' } })
    .png().toBuffer();
}

describe('image batch PNG integrity', () => {
  it('reports a missing generated image as missing', async () => {
    expect(await pngInfo(tempFile())).toBeNull();
  });

  it('accepts a completely decodable PNG and records its actual SHA-256', async () => {
    const file = tempFile();
    const raw = await actualPng();
    fs.writeFileSync(file, raw);
    expect(await pngInfo(file)).toEqual({
      sha256: crypto.createHash('sha256').update(raw).digest('hex'),
      width: 1254,
      height: 1254,
      bytes: raw.length,
    });
  });

  it('rejects a partial PNG even if it contains the correct signature and dimensions', async () => {
    const file = tempFile();
    const raw = await actualPng();
    fs.writeFileSync(file, raw.subarray(0, 24));
    await expect(pngInfo(file)).rejects.toThrow('invalid or incomplete PNG');
  });

  it('rejects broken pixel data even when a valid PNG footer is present', async () => {
    const file = tempFile();
    const raw = await actualPng();
    const broken = Buffer.concat([raw.subarray(0, 64), raw.subarray(-12)]);
    fs.writeFileSync(file, broken);
    await expect(pngInfo(file)).rejects.toThrow('undecodable PNG');
  });
});
