import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import vm from 'node:vm';

/**
 * Verifies background/main.js was de-vendored correctly: the webextension-
 * polyfill is no longer bundled - it ships as vendor/browser-polyfill.js, loaded
 * by the service worker via importScripts, and the bundle's polyfill module
 * returns globalThis.browser. We run main.js in a service-worker-like vm sandbox
 * (globalThis, no window; importScripts loads the vendored polyfill) and assert
 * it obtains a working browser API. The app bootstrap needs a live extension
 * runtime we only lightly stub, so it may throw after the polyfill is set up -
 * the polyfill/browser wiring runs first (importScripts is at the top).
 */
describe('de-vendored background/main.js (webext-polyfill via importScripts)', () => {
  it('gets a working browser API from vendor/browser-polyfill.js in a service worker', async () => {
    const polyfillSrc = readFileSync(
      resolve('vendor/browser-polyfill.js'),
      'utf8',
    );
    const tsResultsSrc = readFileSync(resolve('vendor/ts-results.js'), 'utf8');
    const mainSrc = readFileSync(resolve('background/main.js'), 'utf8');
    const noop = () => {};
    const listener = {
      addListener: noop,
      removeListener: noop,
      hasListener: () => false,
    };
    const storageArea = {
      get: (...args: unknown[]) => {
        const callback = args[args.length - 1];
        if (typeof callback === 'function')
          (callback as (value: unknown) => void)({});
        return Promise.resolve({});
      },
      set: () => Promise.resolve(),
      remove: () => Promise.resolve(),
      onChanged: { ...listener },
    };
    const chrome = {
      runtime: {
        id: 'test-extension',
        lastError: null,
        getManifest: () => ({ version: '9.0.0' }),
        getURL: (urlPath: string) => urlPath,
        connect: () => ({
          onMessage: { ...listener },
          onDisconnect: { ...listener },
          postMessage: noop,
          disconnect: noop,
        }),
        onMessage: { ...listener },
        onConnect: { ...listener },
        onInstalled: { ...listener },
        onStartup: { ...listener },
        sendMessage: noop,
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
      action: {
        setPopup: noop,
        setBadgeText: noop,
        setIcon: noop,
        onClicked: { ...listener },
      },
      contextMenus: {
        create: noop,
        removeAll: noop,
        onClicked: { ...listener },
      },
    };
    const sandbox: Record<string, unknown> = {
      console,
      // no-op timers so main.js's async bootstrap never actually runs
      setTimeout: () => 0,
      clearTimeout: () => {},
      setInterval: () => 0,
      clearInterval: () => {},
      queueMicrotask: () => {},
      URL,
      URLSearchParams,
      TextEncoder,
      TextDecoder,
      Promise,
      Date,
      Math,
      JSON,
      Object,
      Array,
      Map,
      Set,
      WeakMap,
      WeakSet,
      Proxy,
      Reflect,
      Symbol,
      Error,
      navigator: { userAgent: 'test', language: 'en', onLine: true },
      crypto: {
        randomUUID: () => 'test-uuid',
        getRandomValues: (bytes: Uint8Array) => bytes,
      },
      fetch: () => Promise.reject(new Error('no network in test')),
      atob: (text: string) => Buffer.from(text, 'base64').toString('binary'),
      btoa: (text: string) => Buffer.from(text, 'binary').toString('base64'),
      chrome,
    };
    sandbox.self = sandbox;
    sandbox.globalThis = sandbox;
    const context = vm.createContext(sandbox);
    // main.js loads two vendored scripts via importScripts; route each by path.
    sandbox.importScripts = (path: string) =>
      vm.runInContext(
        path.includes('ts-results') ? tsResultsSrc : polyfillSrc,
        context,
      );

    // main.js's bootstrap runs async and will fail on runtime we don't stub;
    // swallow those while they settle - we only assert the polyfill wiring.
    const swallow = () => {};
    process.on('unhandledRejection', swallow);
    try {
      vm.runInContext(mainSrc, context);
    } catch {
      // synchronous bootstrap failure - fine.
    }
    await new Promise(resolve => setImmediate(resolve));
    process.off('unhandledRejection', swallow);

    expect(typeof sandbox.browser).toBe('object');
    const browser = sandbox.browser as any;
    expect(typeof browser.runtime.getManifest).toBe('function');
    expect(typeof browser.storage.local.get).toBe('function');
  });

  it('gets ts-results from vendor/ts-results.js and routes its lazy modules to it', async () => {
    const tsResultsSrc = readFileSync(resolve('vendor/ts-results.js'), 'utf8');
    const sandbox: Record<string, unknown> = {
      console,
      Promise,
      Object,
      Symbol,
      Error,
      TypeError,
      JSON,
      String,
      Array,
      Math,
    };
    sandbox.self = sandbox;
    sandbox.globalThis = sandbox;
    const context = vm.createContext(sandbox);
    vm.runInContext(tsResultsSrc, context);

    // The service worker's initOption/initResult shims assign the app-used
    // exports from globalThis.tsResults - exercise the shared copy the same way.
    const tsResults = (sandbox as any).tsResults;
    expect(tsResults).toBeDefined();
    expect(tsResults.Ok(1).unwrap()).toBe(1);
    expect(tsResults.Err('e').isErr()).toBe(true);
    expect(tsResults.None.isNone()).toBe(true);
    expect(tsResults.Result.isResult(tsResults.Ok(1))).toBe(true);
    expect(tsResults.Option.isOption(tsResults.Some(2))).toBe(true);

    // and the bundle no longer carries its own copy
    const mainSrc = readFileSync(resolve('background/main.js'), 'utf8');
    expect(mainSrc).not.toContain('Tried to unwrap None');
    expect(mainSrc).toContain("importScripts('../vendor/ts-results.js');");
    expect(mainSrc).toContain('globalThis.tsResults.None');
  });
});
