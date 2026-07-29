import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';
import { resolve } from 'path';
import { dummyDom } from 'xdtestutils/dom-dummy';

/** Vendor scripts a real page loads before content-libs.js, in document order. */
export function pageVendorScripts(pageFile: string): string[] {
  const html = readFileSync(resolve(pageFile), 'utf8');
  return [
    ...html.matchAll(/<script src="((?:\.\.\/)?vendor\/[^"]+\.js)">/g),
  ].map(match => match[1]);
}

/** A lightweight extension-runtime stub so the bundle's webext-polyfill init
 * and app bootstrap run outside a real extension. */
export function extensionStub() {
  const noop = () => {};
  const listener = {
    addListener: noop,
    removeListener: noop,
    hasListener: () => false,
  };
  const port = {
    name: '',
    onMessage: { ...listener },
    onDisconnect: { ...listener },
    postMessage: noop,
    disconnect: noop,
  };
  const storageArea = {
    get: (...callArgs: unknown[]) => {
      const callback = callArgs[callArgs.length - 1];
      if (typeof callback === 'function')
        (callback as (value: unknown) => void)({});
      return Promise.resolve({});
    },
    set: () => Promise.resolve(),
    remove: () => Promise.resolve(),
    clear: () => Promise.resolve(),
    onChanged: { ...listener },
  };
  return {
    runtime: {
      id: 'test-extension',
      lastError: null,
      getManifest: () => ({ version: '9.0.0' }),
      getURL: (urlPath: string) => urlPath,
      connect: () => port,
      onMessage: { ...listener },
      onConnect: { ...listener },
      sendMessage: (...callArgs: unknown[]) => {
        const callback = callArgs[callArgs.length - 1];
        if (typeof callback === 'function') (callback as () => void)();
      },
    },
    storage: {
      local: storageArea,
      sync: storageArea,
      managed: storageArea,
      onChanged: { ...listener },
    },
    tabs: {
      query: () => Promise.resolve([]),
      onUpdated: { ...listener },
      onRemoved: { ...listener },
    },
    i18n: { getMessage: () => '' },
  };
}

/** Load a page's vendored libs + content-libs.js into a fresh JSDOM, exactly as
 * the page does, and return the window. Throws if the bundle fails to load. */
export function loadDevendoredBundle(pageFile = 'content/settings.html') {
  const dom = dummyDom();
  const windowObject = dom.window as unknown as Record<string, any>;
  windowObject.chrome = extensionStub();
  windowObject._wehPanelName = 'test-panel';
  for (const relativePath of pageVendorScripts(pageFile)) {
    dom.evalUrl(pathToFileURL(resolve('content', relativePath)));
  }
  dom.evalUrl(pathToFileURL(resolve('content/content-libs.js')));
  return { dom, windowObject };
}

/** Every local (non-http) script a page loads, in document order. */
export function pageLocalScripts(pageFile: string): string[] {
  const html = readFileSync(resolve(pageFile), 'utf8');
  return [...html.matchAll(/<script src="([^"]+)">/g)]
    .map(match => match[1])
    .filter(src => !/^https?:/.test(src));
}

/** Load a full page (its real HTML + every local script, in order) into a fresh
 * JSDOM exactly as the browser would, then fire DOMContentLoaded so apps that
 * init on it run. Returns the window. */
export function loadFullPage(pageFile: string, panelName = 'test-panel') {
  const html = readFileSync(resolve(pageFile), 'utf8');
  const dom = dummyDom({ html, url: `http://localhost/?panel=${panelName}` });
  const windowObject = dom.window as unknown as Record<string, any>;
  windowObject.chrome = extensionStub();
  windowObject._wehPanelName = panelName;
  const pageDir = resolve(pageFile, '..');
  for (const src of pageLocalScripts(pageFile)) {
    dom.evalUrl(pathToFileURL(resolve(pageDir, src)));
  }
  windowObject.document.dispatchEvent(
    new windowObject.Event('DOMContentLoaded', { bubbles: true }),
  );
  windowObject.dispatchEvent(new windowObject.Event('load'));
  return { dom, windowObject };
}
