import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const template = join(root, 'node_modules', '@monogatari', 'core', 'dist');
const entries = [
  'assets',
  'favicon.ico',
  'index.html',
  'js',
  'jsconfig.json',
  'jsconfig.node.json',
  'manifest.json',
  'service-worker.js',
  'style'
];

if (!existsSync(template)) {
  throw new Error('Monogatari is not installed. Run npm install first.');
}

for (const entry of entries) {
  const source = join(template, entry);
  const target = join(root, entry);

  if (existsSync(target)) {
    console.log(`Kept existing ${entry}`);
    continue;
  }

  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
  console.log(`Created ${entry}`);
}
