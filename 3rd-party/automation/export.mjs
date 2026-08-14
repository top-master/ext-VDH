#!/usr/bin/env node
/**
 * `yarn export`: produce a distributable, signed Chrome extension package.
 *
 * Steps: run the content build (so the generated artifacts exist), stage ONLY
 * the files the extension needs at runtime (dropping sources, tooling, tests and
 * VCS/editor cruft), then zip + sign that into `dist/<name>-<version>.crx`.
 *
 * Signing uses `dist/extension-key.pem` (a CRX3 private key). It is generated on
 * first run and reused after, so the extension id stays stable; it is git-ignored
 * (never commit a private key). For an official release, drop your real key in at
 * that path before running. The packaged manifest's `key` field is removed so the
 * signing key alone defines the id (Chrome rejects a .crx whose manifest `key`
 * disagrees with the signature).
 */
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const ChromeExtension = require('crx');

const root = process.cwd();
const dist = 'dist';
const stage = path.join(dist, '.stage');
const keyPath = path.join(dist, 'extension-key.pem');

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const slug = manifest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const crxPath = path.join(dist, `${slug}-${manifest.version}.crx`);

// Top-level entries the extension never loads at runtime: dependencies, build and
// test tooling, docs, editor/VCS config, and the dist output itself.
const excludedTopLevel = new Set([
  'node_modules',
  '3rd-party',
  'tests',
  'todo',
  'docs',
  'dist',
  '.git',
  '.github',
  '.idea',
  '.yarn',
  'package.json',
  'yarn.lock',
  'yarn',
  'yarn.bat',
  '.yarnrc',
  '.yarnrc.yml',
  'tsconfig.json',
  'vitest.config.ts',
  'AGENTS.md',
  'README.md',
  '.gitignore',
  '.gitattributes',
  '.prettierignore',
  '.prettierrc',
]);

/** True for a source path the runtime package must not carry. */
function isExcluded(sourcePath) {
  const relativePath = path.relative(root, sourcePath);
  if (relativePath === '') {
    return false;
  }
  const [top] = relativePath.split(path.sep);
  if (excludedTopLevel.has(top)) {
    return true;
  }
  // content/src is the build INPUT; the shipped bundle is content/content-libs.js.
  if (
    relativePath === path.join('content', 'src')
    || relativePath.startsWith(path.join('content', 'src') + path.sep)
  ) {
    return true;
  }
  return relativePath.endsWith('.pem');
}

// 1. Build the generated artifacts (content-libs.js / content-weh.css /
//    content-tooltip.css) so the staged copy carries them.
execFileSync('yarn', ['build'], { stdio: 'inherit' });

// 2. Stage only the runtime files.
mkdirSync(dist, { recursive: true });
rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
cpSync('.', stage, {
  recursive: true,
  filter: source => !isExcluded(source),
});

// The signing key defines the id, so drop the manifest `key` to avoid a mismatch.
const stagedManifestPath = path.join(stage, 'manifest.json');
const stagedManifest = JSON.parse(readFileSync(stagedManifestPath, 'utf8'));
delete stagedManifest.key;
writeFileSync(stagedManifestPath, JSON.stringify(stagedManifest, null, 2) + '\n');

// 3. Ensure a signing key exists (generate a stable one on first run).
if (!existsSync(keyPath)) {
  execFileSync('openssl', ['genrsa', '-out', keyPath, '2048'], {
    stdio: 'inherit',
  });
}

// 4. Zip + sign the staged tree into the .crx, then clean up.
const crx = new ChromeExtension({ privateKey: readFileSync(keyPath) });
await crx.load(path.resolve(stage));
const packed = await crx.pack();
writeFileSync(crxPath, packed);
rmSync(stage, { recursive: true, force: true });

console.log('exported ' + crxPath);
