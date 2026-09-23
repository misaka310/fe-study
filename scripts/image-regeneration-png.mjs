import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';

// This checks the actual compressed pixel stream, not only the PNG signature.
// A partially downloaded image must never count towards the 100-image batch.
export async function pngInfo(file) {
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file);
  const header = Buffer.from('89504e470d0a1a0a', 'hex');
  const end = Buffer.from('0000000049454e44ae426082', 'hex');
  if (raw.length < 64 || !raw.subarray(0, 8).equals(header) || !raw.subarray(-12).equals(end)) {
    throw Error('invalid or incomplete PNG: ' + file);
  }
  try {
    const image = sharp(raw, { failOn: 'error' });
    const metadata = await image.metadata();
    if (metadata.format !== 'png' || !metadata.width || !metadata.height) throw Error('invalid dimensions');
    await image.stats(); // Force a full pixel decode to reject truncated/invalid IDAT data.
    return {
      sha256: crypto.createHash('sha256').update(raw).digest('hex'),
      width: metadata.width,
      height: metadata.height,
      bytes: raw.length,
    };
  } catch (error) {
    throw Error('undecodable PNG: ' + file + ': ' + error.message, { cause: error });
  }
}
