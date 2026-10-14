import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputPath = path.resolve('public', 'firebase-config.json');
const inlineConfig = process.env.FE_FIREBASE_CONFIG_JSON?.trim();
const sourceUrl = (
  process.env.FE_FIREBASE_CONFIG_URL
  ?? process.env.TASKPICKER_FIREBASE_CONFIG_URL
)?.trim();

function parseConfigPayload(source) {
  try {
    return JSON.parse(source);
  } catch {
    const match = source.match(/export\s+const\s+firebaseConfig\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
    if (!match) throw new Error('Firebase config payload was not recognized.');
    return JSON.parse(match[1]);
  }
}

function validateConfig(config) {
  for (const key of ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']) {
    if (typeof config?.[key] !== 'string' || !config[key]) {
      throw new Error(`Firebase config is missing ${key}.`);
    }
  }
  return config;
}

if (!inlineConfig && !sourceUrl) {
  await rm(outputPath, { force: true });
  console.log('Firebase sync is not configured; continuing in local-only mode.');
  process.exit(0);
}

let config;
if (inlineConfig) {
  config = validateConfig(parseConfigPayload(inlineConfig));
} else {
  const response = await fetch(sourceUrl, { headers: { accept: 'application/json, application/javascript' } });
  if (!response.ok) throw new Error(`Firebase config fetch failed: ${response.status}`);
  config = validateConfig(parseConfigPayload(await response.text()));
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
console.log(`Prepared optional Firebase browser config for ${config.projectId}.`);
