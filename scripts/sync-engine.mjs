import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'node_modules', '@monogatari', 'core', 'dist', 'engine');
const target = join(root, 'engine');

if (!existsSync(source)) {
  throw new Error('Monogatari is not installed. Run npm install first.');
}

if (relative(root, target) !== 'engine') {
  throw new Error(`Refusing to sync outside the project engine directory: ${target}`);
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log('Synced engine/ from @monogatari/core@2.8.0.');
