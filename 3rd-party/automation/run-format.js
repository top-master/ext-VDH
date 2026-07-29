#!/usr/bin/env node
'use strict';

/**
 * Wrapper around `prettier --write` for the `format` package script, in the
 * spirit of the transcoder-manager workflow: default globs live here (not in a
 * long package.json line), and extra arguments (globs, prettier flags) are
 * forwarded verbatim, so `yarn format --check background/main.js` works.
 *
 * Prettier 3.x reads `.prettierignore` (relative to the repo root) natively, so
 * no ignore-file merging is needed here. It is invoked as its `.cjs` through
 * node rather than the `.bin` shim, since Node >=20.12 refuses to spawn a
 * `.cmd` without `shell: true`.
 */

const childProcess = require('child_process');
const path = require('path');

/** Consumer repo root - two levels up from 3rd-party/automation/. */
const CONSUMER_ROOT = path.resolve(__dirname, '..', '..');

/** Files prettier formats by default when no positional glob is given. */
const DEFAULT_GLOBS = [
  '{background,content,content2,injected}/**/*.js',
  'tests/**/*.ts',
  '*.{json,md}',
];

const forwardedArgs = process.argv.slice(2);
const hasPositional = forwardedArgs.some(arg => !arg.startsWith('-'));

const prettierBin = path.resolve(
  CONSUMER_ROOT,
  'node_modules',
  'prettier',
  'bin',
  'prettier.cjs',
);

const child = childProcess.spawn(
  process.execPath,
  [
    prettierBin,
    '--write',
    ...(hasPositional ? [] : DEFAULT_GLOBS),
    ...forwardedArgs,
  ],
  { stdio: 'inherit', cwd: CONSUMER_ROOT },
);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
