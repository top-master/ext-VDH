#!/usr/bin/env node
/**
 * Builds the content-script bundle: esbuild bundles the ES-module source tree in
 * `content/src/` down to the single classic-script `content/content-libs.js` that
 * the ~19 extension HTML pages load via a plain <script>. The third-party libs
 * (React, ReactDOM, Redux, reactstrap, popper, ...) are NOT bundled - they are
 * loaded separately as `/vendor/*.js` window globals, so the source imports them
 * through the `content/src/externals/*` shims that just re-export `window.X`.
 *
 * The output is a COMMITTED generated artifact (there is no build in CI / at pack
 * time), so it is prettified after bundling to stay readable, and committed.
 *
 *   Edit `content/src/**`, then run:  yarn build:content
 */
import * as esbuild from 'esbuild';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const outfile = 'content/content-libs.js';

// The vendored weh framework (content/src/weh/*, a verbatim copy of the upstream
// sources) refers to its siblings by the bare specifiers the upstream build used
// (`weh`, `weh-rpc`, ...) and to the browser polyfill as `webextension-polyfill`.
// Map those to the local files so the copies stay byte-for-byte verbatim while
// still resolving under esbuild; webextension-polyfill routes to the /vendor shim.
const alias = {
  weh: resolve('content/src/weh/weh.js'),
  'weh-rpc': resolve('content/src/weh/weh-rpc.js'),
  'weh-i18n': resolve('content/src/weh/weh-i18n.js'),
  'weh-prefs': resolve('content/src/weh/weh-prefs.js'),
  'weh-content': resolve('content/src/weh/weh-content.js'),
  'webextension-polyfill': resolve(
    'content/src/externals/webextension-polyfill.js',
  ),
  // The vendored tooltip (content/src/tooltip/*, a verbatim copy of the
  // transcoder-manager component) imports React and its sibling by the paths
  // that repo used. Map those to the local files so the copies stay verbatim:
  // `react` -> a namespace shim over the vendor React global; the sibling path
  // -> the co-located viewport-metrics.
  react: resolve('content/src/externals/react-namespace.js'),
  'shared/public/components/viewport-metrics': resolve(
    'content/src/tooltip/viewport-metrics.ts',
  ),
};

await esbuild.build({
  entryPoints: ['content/src/index.js'],
  outfile,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  minify: false,
  legalComments: 'none',
  // .ts/.tsx are auto-detected by extension; the vendored tooltip is TSX, so set
  // the classic JSX transform (its `import * as React` puts React in scope).
  loader: { '.js': 'js' },
  jsx: 'transform',
  alias,
});

// Build the vendored weh framework CSS (content/src/weh/css/*, a verbatim copy of
// the upstream sources) into the committed content/content-weh.css that styles.css
// @imports. The native-messaging-shell source is SCSS (nesting only, no vars or
// mixins), so esbuild flattens it as plain CSS via the .scss->css loader.
const cssOutfile = 'content/content-weh.css';
await esbuild.build({
  entryPoints: ['content/src/weh/css/index.css'],
  outfile: cssOutfile,
  bundle: true,
  loader: { '.scss': 'css' },
  target: ['chrome80', 'firefox78'],
  minify: false,
  legalComments: 'none',
});

// Keep the committed artifacts beautified (repo ethos), same as the
// hand-maintained sources they replace.
execFileSync(
  'node',
  ['node_modules/.bin/prettier', '--write', outfile, cssOutfile],
  { stdio: 'inherit' },
);

console.log('built ' + outfile + ' + ' + cssOutfile);
