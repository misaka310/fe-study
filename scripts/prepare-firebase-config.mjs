import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceUrl = process.env.TASKPICKER_FIREBASE_CONFIG_URL
  ?? 'https://task-picker.onrender.com/firebase-client-settings.js';

const response = await fetch(sourceUrl, { headers: { accept: 'application/javascript' } });
if (!response.ok) throw new Error(`Firebase config fetch failed: ${response.status}`);

const source = await response.text();
const match = source.match(/export\s+const\s+firebaseConfig\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
if (!match) throw new Error('Firebase config payload was not recognized.');

const config = JSON.parse(match[1]);
for (const key of ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']) {
  if (typeof config[key] !== 'string' || !config[key]) throw new Error(`Firebase config is missing ${key}.`);
}

const publicDir = path.resolve('public');
await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, 'firebase-config.json'), `${JSON.stringify(config, null, 2)}\n`, 'utf8');
console.log(`Prepared Firebase browser config for ${config.projectId}.`);
