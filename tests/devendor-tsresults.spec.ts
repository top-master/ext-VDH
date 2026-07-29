import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import vm from 'node:vm';
import { loadDevendoredBundle } from './devendor-helpers';

/**
 * Verifies ts-results (vultix/ts-results 3.3.0) was de-vendored out of every
 * bundle into the single shared copy at vendor/ts-results.js. esbuild had inlined
 * a full copy into each of 11 bundles; the rename project then renamed each
 * copy's locals independently. We replaced them all with redirects to
 * globalThis.tsResults and dead-code-eliminated the duplicates, leaving one copy.
 *
 * Three things are checked: (1) the shared copy behaves exactly like ts-results
 * 3.3.0; (2) no bundle still carries a duplicate implementation and every bundle
 * declares the shared copy as a dependency; (3) the classic pages actually load
 * the shared copy so the bundles' redirects resolve at runtime. The ESM bundles'
 * runtime loads live in devendor-tsresults-runtime.spec.ts (jsdom).
 */

// Every bundle ts-results was de-vendored from, and how it loads the vendor.
const ESM_BUNDLES = [
  'content2/blacklist.js',
  'content2/details.js',
  'content2/history.js',
  'content2/locales.js',
  'content2/panel.js',
  'content2/settings.js',
  'content2/smartnaming_editor.js',
  'content/media-user-prefs-edit.js',
];
const CLASSIC_PAGES = [
  { page: 'content/settings.html', bundle: 'content/settings.js' },
  { page: 'content/popup.html', bundle: 'content/popup.js' },
];
const ALL_BUNDLES = [
  ...ESM_BUNDLES,
  ...CLASSIC_PAGES.map(entry => entry.bundle),
];

/** Load vendor/ts-results.js in a bare sandbox and return its globalThis.tsResults. */
function loadVendor(): any {
  const code = readFileSync(resolve('vendor/ts-results.js'), 'utf8');
  const sandbox: Record<string, unknown> = {
    Promise,
    Object,
    Symbol,
    Error,
    TypeError,
    JSON,
    String,
    Array,
    Math,
    Number,
    Boolean,
    console,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return (sandbox as any).tsResults;
}

describe('vendor/ts-results.js behaves exactly like ts-results 3.3.0', () => {
  const tsResults = loadVendor();

  it('exposes the full public API', () => {
    for (const key of [
      'Some',
      'None',
      'Ok',
      'Err',
      'Option',
      'Result',
      'AsyncResult',
    ])
      expect(tsResults[key], key).toBeDefined();
  });

  it('Some / None option behaviour', () => {
    expect(tsResults.Some(5).unwrap()).toBe(5);
    expect(tsResults.Some(5).isSome()).toBe(true);
    expect(
      tsResults
        .Some(5)
        .map((value: number) => value + 1)
        .unwrap(),
    ).toBe(6);
    expect(tsResults.Some(2).toString()).toBe('Some(2)');
    expect(tsResults.None.isNone()).toBe(true);
    expect(tsResults.None.unwrapOr(9)).toBe(9);
    expect(String(tsResults.None)).toBe('None');
    expect(() => tsResults.None.unwrap()).toThrow('Tried to unwrap None');
  });

  it('Ok / Err result behaviour', () => {
    expect(tsResults.Ok(3).unwrap()).toBe(3);
    expect(tsResults.Ok(3).isOk()).toBe(true);
    expect(tsResults.Err('boom').isErr()).toBe(true);
    expect(tsResults.Err('boom').unwrapErr()).toBe('boom');
    expect(() => tsResults.Ok(7).unwrapErr()).toThrow('Tried to unwrap Ok: 7');
    expect(
      tsResults
        .Ok(4)
        .map((value: number) => value * 2)
        .unwrap(),
    ).toBe(8);
  });

  it('Result / Option namespaces', () => {
    expect(
      tsResults.Result.all(tsResults.Ok(1), tsResults.Ok(2)).unwrap(),
    ).toEqual([1, 2]);
    expect(
      tsResults.Result.all(tsResults.Ok(1), tsResults.Err('x')).isErr(),
    ).toBe(true);
    expect(
      tsResults.Option.all(tsResults.Some(1), tsResults.Some(2)).unwrap(),
    ).toEqual([1, 2]);
    expect(tsResults.Result.isResult(tsResults.Ok(1))).toBe(true);
    expect(tsResults.Result.isResult(5)).toBe(false);
    expect(tsResults.Option.isOption(tsResults.None)).toBe(true);
    expect(
      tsResults.Result.wrap(() => {
        throw new Error('e');
      }).isErr(),
    ).toBe(true);
  });

  it('AsyncResult chains asynchronously', async () => {
    const okResult = await tsResults
      .Ok(10)
      .toAsyncResult()
      .map((value: number) => value * 2).promise;
    expect(okResult.unwrap()).toBe(20);
    const errResult = await tsResults
      .Err('z')
      .toAsyncResult()
      .map((value: number) => value * 2).promise;
    expect(errResult.isErr()).toBe(true);
  });
});

describe('no bundle keeps a duplicate ts-results, and each declares the shared copy', () => {
  it.each(ALL_BUNDLES)('%s carries no ts-results implementation', bundle => {
    const source = readFileSync(resolve(bundle), 'utf8');
    // The class bodies (and their unique error strings) are gone after DCE.
    expect(source).not.toContain('Tried to unwrap None');
    expect(source).not.toContain('Tried to unwrap Ok: ');
    // It now references the shared copy instead.
    expect(source).toContain('globalThis.tsResults');
  });

  it.each(ESM_BUNDLES)('%s imports the shared copy', bundle => {
    const source = readFileSync(resolve(bundle), 'utf8');
    expect(source).toContain("import '../vendor/ts-results.js';");
  });

  it.each(CLASSIC_PAGES)(
    '$page loads the shared copy via a script tag',
    ({ page }) => {
      const html = readFileSync(resolve(page), 'utf8');
      expect(html).toContain('<script src="../vendor/ts-results.js"></script>');
    },
  );
});

describe('classic pages load the shared ts-results the bundles redirect to', () => {
  it.each(CLASSIC_PAGES)(
    '$page exposes a working window.tsResults',
    ({ page }) => {
      const windowObject = loadDevendoredBundle(page).windowObject;
      const tsResults = windowObject.tsResults;
      expect(tsResults).toBeDefined();
      expect(tsResults.Ok(1).unwrap()).toBe(1);
      expect(tsResults.None.isNone()).toBe(true);
      expect(
        tsResults.Result.all(tsResults.Ok(1), tsResults.Ok(2)).unwrap(),
      ).toEqual([1, 2]);
    },
  );
});
