// Resolves the bare `react` import used by the vendored tooltip (content/src/tooltip)
// to the vendor React global. CommonJS so `import * as React from 'react'` and
// `import React from 'react'` both yield the full React object (Component,
// createElement, createRef, ...), not an ESM { default } wrapper.
module.exports = window.React;
