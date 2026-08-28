import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'output', 'pages');

test('Pages artifact contains the complete runtime entrypoints', () => {
	for (const path of [
		'.nojekyll',
		'index.html',
		'manifest.json',
		'service-worker.js',
		'engine/core/monogatari.css',
		'engine/core/monogatari.js',
		'engine/debug/debug.js',
		'vendor/vn-components/index.css',
		'vendor/vn-components/index.js',
		'vendor/vn-components/custom-elements.json',
		'js/main.js',
		'scenes/bootstrap.js',
		'assets/manifest.json'
	]) {
		assert.ok(existsSync(join(output, path)), `missing Pages runtime file: ${path}`);
	}
});

test('Pages artifact excludes authoring, CI, and dependency files', () => {
	for (const path of [
		'.git',
		'.github',
		'AGENTS.md',
		'README.md',
		'docs',
		'node_modules',
		'package.json',
		'package-lock.json',
		'scripts',
		'tests'
	]) {
		assert.equal(existsSync(join(output, path)), false, `unexpected Pages artifact entry: ${path}`);
	}
});

test('HTML runtime references are relative and resolve inside the Pages artifact', () => {
	const html = readFileSync(join(output, 'index.html'), 'utf8');
	assert.match(html, /\.\/vendor\/vn-components\/index\.css/);
	assert.match(html, /\.\/vendor\/vn-components\/index\.js/);
	assert.doesNotMatch(html, /node_modules\/\@newchobo\/vn-components/);
	const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);

	for (const reference of references) {
		if (!reference || reference.startsWith('http') || reference.startsWith('#')) continue;
		assert.equal(reference.startsWith('/'), false, `root-relative reference breaks project Pages: ${reference}`);
		const normalized = reference.replace(/^\.\//, '').split(/[?#]/, 1)[0];
		assert.ok(existsSync(join(output, normalized)), `unresolved Pages reference: ${reference}`);
	}
});
