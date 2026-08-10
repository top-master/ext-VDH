# weh — vendored subset

**weh** stands for *WebExtensions Helper*.

> **WARNING:** this is a short-cut copy of **weh** — only the content-page
> modules that ext-VDH actually bundles, taken verbatim from the full
> repository at <https://github.com/top-master/ext-VDH-helpers>. It is not the
> whole framework: the build system, the background/worker/native-messaging
> side, the inspector, docs and history all live upstream — go there for
> anything not present here. Treat these files as read-only; do not edit them
> in place, re-sync from upstream instead.
> — top master

## What is vendored here

Copied byte-for-byte from `src/` of the upstream repo (branch `master`, commit
`3099b4a`):

| file | upstream | role |
| --- | --- | --- |
| `weh.js` | `src/weh.js` | core: browser polyfill handle, browser-type detection |
| `weh-rpc.js` | `src/weh-rpc.js` | promise-based RPC between UI pages and background |
| `weh-i18n.js` | `src/weh-i18n.js` | `weh._` message lookup with custom-string overrides |
| `weh-prefs.js` | `src/weh-prefs.js` | preference store (specs, values, change events) |
| `weh-content.js` | `src/weh-content.js` | content-page entry that wires the four above together |

These refer to one another by the bare specifiers the upstream build used
(`weh`, `weh-rpc`, …) and to the browser polyfill as `webextension-polyfill`;
`3rd-party/automation/build-content.mjs` maps those names to these files (and to
the `/vendor` browser polyfill) so the copies stay verbatim while resolving
under esbuild.

## Vendored CSS (`css/`)

The framework's stylesheets used by the pages we ship, copied byte-for-byte from
upstream `src/css/`:

| file | role |
| --- | --- |
| `css/weh-form-states.css` | `.has-success` / `.has-warning` / `.has-danger` field colours |
| `css/weh-header.css` | panel header (title + close button) |
| `css/weh-shf.css` | sticky-header-footer flex layout |
| `css/weh-natmsg-shell.scss` | native-messaging shell (SCSS, nesting only) |

`css/index.css` aggregates them; the build bundles that into the committed
`content/content-weh.css` (esbuild flattens the SCSS via a `.scss`→css loader),
which `content/styles.css` `@import`s alongside the vendored Bootstrap
(`/vendor/bootstrap.css`).

One deviation is kept out of here to preserve the verbatim copies: our
`weh-header.js` sets the panel icon as a `background-image` on the `<header>`
element, whereas upstream positions it on `.weh-header-title`. That positioning
lives in `content/styles.css` (a bare `header { background-* }` rule), so the
`.weh-header-title` background in the verbatim `weh-header.css` is simply inert.

## License

**weh** is © Michel Gutierrez and licensed under the Mozilla Public License
2.0 — see [`LICENSE.txt`](./LICENSE.txt) in this directory, copied from
upstream unchanged.
