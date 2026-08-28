import {
	cpSync,
	existsSync,
	lstatSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	rmSync,
	statSync,
	writeFileSync
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'output', 'pages');
const outputRelative = relative(root, output).replaceAll('\\', '/');
const componentSource = join(root, 'node_modules', '@newchobo', 'vn-components');
const componentTarget = join(output, 'vendor', 'vn-components');
const componentFiles = ['index.css', 'index.js', 'custom-elements.json'];
const runtimeEntries = [
	'assets',
	'characters',
	'engine/core/monogatari.css',
	'engine/core/monogatari.js',
	'engine/debug/debug.js',
	'favicon.ico',
	'index.html',
	'js',
	'manifest.json',
	'scenes',
	'service-worker.js',
	'style'
];

if (outputRelative !== 'output/pages') {
	throw new Error(`Refusing to build outside output/pages: ${output}`);
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of runtimeEntries) {
	const source = join(root, entry);
	const target = join(output, entry);

	if (!existsSync(source)) {
		throw new Error(`Missing runtime entry: ${entry}`);
	}

	mkdirSync(dirname(target), { recursive: true });
	cpSync(source, target, { recursive: true });
}

for (const entry of componentFiles) {
	const source = join(componentSource, entry);
	const target = join(componentTarget, entry);
	if (!existsSync(source)) throw new Error(`Missing shared component runtime file: ${entry}`);
	mkdirSync(dirname(target), { recursive: true });
	cpSync(source, target);
}

for (const entry of ['index.html', 'service-worker.js']) {
	const target = join(output, entry);
	const source = readFileSync(target, 'utf8');
	writeFileSync(target, source.replaceAll('node_modules/@newchobo/vn-components', 'vendor/vn-components'), 'utf8');
}

writeFileSync(join(output, '.nojekyll'), '', 'utf8');

let fileCount = 0;
let totalBytes = 0;

function inspect(path) {
	const metadata = lstatSync(path);

	if (metadata.isSymbolicLink()) {
		throw new Error(`Pages artifact must not contain symbolic links: ${relative(output, path)}`);
	}

	if (metadata.isDirectory()) {
		for (const entry of readdirSync(path)) inspect(join(path, entry));
		return;
	}

	fileCount += 1;
	totalBytes += statSync(path).size;
}

inspect(output);
console.log(`Built output/pages with ${fileCount} files (${totalBytes} bytes).`);
