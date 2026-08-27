import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function runScript(path, context) {
	vm.runInNewContext(readFileSync(join(root, path), 'utf8'), context, { filename: path });
}

test('engine is pinned and generated from the installed Monogatari package', () => {
	const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
	assert.equal(packageJson.dependencies['@monogatari/core'], '2.8.0');
	assert.ok(existsSync(join(root, 'engine', 'LICENSE')));
	assert.ok(existsSync(join(root, 'engine', 'core', 'monogatari.js')));
	assert.deepEqual(
		readFileSync(join(root, 'engine', 'core', 'monogatari.js')),
		readFileSync(join(root, 'node_modules', '@monogatari', 'core', 'dist', 'engine', 'core', 'monogatari.js'))
	);
});

test('bootstrap scene is story-free and structurally playable', () => {
	let script;
	runScript('scenes/bootstrap.js', {
		monogatari: { script: (value) => { script = value; } }
	});

	assert.deepEqual(Object.keys(script), ['Start']);
	assert.equal(script.Start.at(-1), 'end');
	assert.ok(script.Start.every((action) => typeof action === 'string'));
});

test('project settings use a stable Aether save namespace', () => {
	let settings;
	let preferences;
	runScript('js/options.js', {
		monogatari: {
			settings: (value) => { settings = value; },
			preferences: (value) => { preferences = value; }
		}
	});

	assert.equal(settings.Name, 'AetherSignal');
	assert.equal(settings.Version, '0.1.0');
	assert.equal(settings.Label, 'Start');
	assert.equal(settings.MultiLanguage, false);
	assert.equal(preferences.Language, '한국어');
});

test('bootstrap storage and project asset manifest add no premature state axes', () => {
	let storage;
	runScript('js/storage.js', {
		monogatari: { storage: (value) => { storage = value; } }
	});

	assert.equal(storage.schemaVersion, 1);
	assert.deepEqual(Object.keys(storage), ['schemaVersion']);

	const manifest = JSON.parse(readFileSync(join(root, 'assets', 'manifest.json'), 'utf8'));
	assert.equal(manifest.project, 'aether-signal');
	assert.equal(manifest.status, 'bootstrap-empty');
	assert.deepEqual(manifest.assets, []);
});

test('public scaffold does not contain canon source directories', () => {
	for (const directory of ['episode', 'design', 'metadata', 'revision']) {
		assert.equal(existsSync(join(root, directory)), false, `${directory}/ must remain outside the public game repository`);
	}
});

test('HTML loads project modules before initialization', () => {
	const html = readFileSync(join(root, 'index.html'), 'utf8');
	const required = [
		'./js/options.js',
		'./js/storage.js',
		'./js/script.js',
		'./assets/aether-assets.js',
		'./characters/aether-characters.js',
		'./scenes/bootstrap.js',
		'./js/main.js'
	];

	for (const source of required) assert.ok(html.includes(source), `missing script: ${source}`);
	for (let index = 1; index < required.length; index += 1) {
		assert.ok(html.indexOf(required[index - 1]) < html.indexOf(required[index]), `${required[index]} is out of order`);
	}
});
