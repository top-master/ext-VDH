// Shim resolving the `webextension-polyfill` bare import used by the vendored weh
// framework (../weh/weh.js) to the polyfill loaded separately as a /vendor script
// (content/vendor/browser-polyfill.js publishes window.browser). CommonJS on
// purpose: weh does `exports.browser = require('webextension-polyfill')`, so the
// require must return the browser object itself, not an ESM { default } wrapper.
module.exports = window.browser;
