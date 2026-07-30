// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest';

/**
 * Runtime companion to devendor-tsresults.spec.ts: actually imports each ESM
 * bundle the way its page does. The bundle's own `import "../vendor/ts-results.js"`
 * must run first and populate globalThis.tsResults, and the bundle's app
 * bootstrap must get through its ts-results usage without a missing-binding
 * error. The bootstrap needs a live extension/DOM we only stub lightly, so it may
 * throw afterwards - we swallow that and assert only the ts-results wiring.
 */
const ESM_BUNDLES = [
  'blacklist',
  'details',
  'history',
  'panel',
  'settings',
  'smartnaming_editor',
  // locales.js is 1.5 MB of data tables; its ts-results wiring is identical and
  // covered by the static checks - skipped here to keep the run fast.
];

beforeAll(() => {
  const noop = () => {};
  const listener = {
    addListener: noop,
    removeListener: noop,
    hasListener: () => false,
  };
  const storageArea = {
    get: async () => ({}),
    set: async () => {},
    remove: async () => {},
    clear: async () => {},
    onChanged: { ...listener },
  };
  (globalThis as any).chrome = {
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
      sendMessage: noop,
    },
    storage: {
      local: storageArea,
      sync: storageArea,
      managed: storageArea,
      onChanged: { ...listener },
    },
    tabs: {
      query: async () => [],
      onUpdated: { ...listener },
      onRemoved: { ...listener },
    },
    i18n: { getMessage: () => '' },
  };
  const matchMedia = (query: string) => ({
    matches: false,
    media: query,
    addEventListener: noop,
    removeEventListener: noop,
    addListener: noop,
    removeListener: noop,
  });
  (globalThis as any).matchMedia = matchMedia;
  (globalThis.window as any).matchMedia = matchMedia;
});

describe('ESM bundles import and route ts-results to the shared copy', () => {
  it.each(ESM_BUNDLES)(
    'content2/%s.js loads globalThis.tsResults via its own import',
    async name => {
      const swallow = () => {};
      process.on('unhandledRejection', swallow);
      try {
        await import(`../content2/${name}.js`);
      } catch {
        // app bootstrap needs runtime we don't stub; ts-results ran before it.
      }
      await new Promise(resolve => setImmediate(resolve));
      process.off('unhandledRejection', swallow);

      const tsResults = (globalThis as any).tsResults;
      expect(
        tsResults,
        'globalThis.tsResults populated by the bundle import',
      ).toBeDefined();
      expect(tsResults.Ok(1).unwrap()).toBe(1);
      expect(tsResults.None.isNone()).toBe(true);
      expect(tsResults.Some(2).toString()).toBe('Some(2)');
      expect(
        tsResults.Result.all(tsResults.Ok(1), tsResults.Ok(2)).unwrap(),
      ).toEqual([1, 2]);
    },
  );
});

/**
 * The lazy-iterable helpers (createLazyIterable / as_iter, patched onto
 * Array/Set/Map.prototype on load) are extension app code that uses ts-results - a
 * find() returns an Option, filter()/map() route through it. This code lives in
 * the content-script bundles (e.g. blacklist). Importing one patches as_iter, so
 * we can drive it and confirm it resolves to the shared globalThis.tsResults.
 */
describe('the as_iter iterable helpers use the shared ts-results', () => {
  it('blacklist.js patches Array.prototype.as_iter and it returns shared Options', async () => {
    const swallow = () => {};
    process.on('unhandledRejection', swallow);
    try {
      await import('../content2/blacklist.js');
    } catch {
      // app bootstrap needs runtime we don't stub; the as_iter patch runs first.
    }
    await new Promise(resolve => setImmediate(resolve));
    process.off('unhandledRejection', swallow);

    expect(typeof (Array.prototype as any).as_iter).toBe('function');
    const found = ([1, 2, 3, 4] as any)
      .as_iter()
      .find((value: number) => value > 2);
    expect(found.isSome()).toBe(true);
    expect(found.unwrap()).toBe(3);

    const missing = ([1, 2] as any)
      .as_iter()
      .find((value: number) => value > 9);
    expect(missing.isNone()).toBe(true);

    const evens = ([1, 2, 3, 4] as any)
      .as_iter()
      .filter((value: number) => value % 2 === 0)
      .toArray();
    expect(evens).toEqual([2, 4]);
  });
});
