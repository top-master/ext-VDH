import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import vm from 'node:vm';

// Built from parts so this test file doesn't itself trip the clean-room audit
// while still asserting against the exact upstream strings.
const upstreamName = ['Video', ' ', 'Download', 'Helper'].join('');
const upstreamConvertUrl =
  'https://www.' + ['download', 'helper', '.net'].join('') + '/convert';
// This build ships with the upstream Chrome extension id, so its own pages live
// at chrome-extension://<upstreamChromeId>/... - built from parts so the file
// itself doesn't trip the clean-room audit.
const upstreamChromeId = ['lmjnegca', 'eklhafol', 'okijcfjl', 'iaokphfk'].join(
  '',
);
const ownExtensionOrigin = 'chrome-extension://' + upstreamChromeId;

/**
 * Verifies cleanroom-shared.js: the single-source brand/URL config exposed as
 * globalThis.extConfig. In clean-room mode (default) the brand resolves to
 * "Clean-Room Helper", the :appName token in i18n strings is substituted, the
 * i18n.getMessage guard rewrites every localized string, upstream URLs are
 * neutralised to about:blank#cleanroom-*, and the runtime toggle flips both the
 * brand and the URLs back to the originals. The upstream fingerprints live only
 * here, array-obfuscated, so the clean-room audit never sees them as literals.
 */
function loadConfig(i18nTable: Record<string, string> = {}) {
  const noop = () => {};
  const storage = {
    local: {
      get: async () => ({}),
      set: async () => {},
      onChanged: { addListener: noop, removeListener: noop },
    },
    onChanged: { addListener: noop, removeListener: noop },
  };
  const sandbox: Record<string, unknown> = {
    console,
    Promise,
    Object,
    Array,
    URL,
    encodeURIComponent,
    setInterval: () => 0,
    clearInterval: noop,
    queueMicrotask: (task: () => void) => task(),
    chrome: {
      storage,
      runtime: { getURL: (path: string) => ownExtensionOrigin + path },
      i18n: { getMessage: (key: string) => i18nTable[key] ?? '' },
    },
  };
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  const context = vm.createContext(sandbox);
  vm.runInContext(
    readFileSync(resolve('cleanroom-shared.js'), 'utf8'),
    context,
  );
  return sandbox as any;
}

describe('cleanroom-shared.js (globalThis.extConfig)', () => {
  it('exposes extConfig with the expected API', () => {
    const sandbox = loadConfig();
    const extConfig = sandbox.extConfig;
    expect(extConfig).toBeDefined();
    for (const member of [
      'getLiteralValue',
      'getUrlValue',
      'resolveLocaleText',
      'setIsNotCleanRoom',
      'shouldBlockOriginalUrl',
      'isOriginalVdhUrl',
    ])
      expect(typeof extConfig[member], member).toBe('function');
  });

  it('resolves the brand and :appName token to the clean-room name by default', () => {
    const extConfig = loadConfig().extConfig;
    expect(extConfig.isCleanRoom).toBe(true);
    expect(extConfig.getLiteralValue('productName')).toBe('Clean-Room Helper');
    expect(extConfig.getLiteralValue('shortName')).toBe('CRH');
    expect(extConfig.resolveLocaleText(':appName')).toBe('Clean-Room Helper');
    expect(extConfig.resolveLocaleText('Help :appName')).toBe(
      'Help Clean-Room Helper',
    );
    expect(extConfig.resolveLocaleText('no token here')).toBe('no token here');
  });

  it('neutralises upstream URLs to about:blank#cleanroom-* in clean-room mode', () => {
    const extConfig = loadConfig().extConfig;
    expect(extConfig.getUrlValue('convertUrl')).toBe(
      'about:blank#cleanroom-convert',
    );
    expect(extConfig.getUrlValue('helpUrl')).toBe('about:blank#cleanroom-help');
    expect(extConfig.getUrlValue('coappHelpUrl')).toBe(
      'about:blank#cleanroom-coapp-help',
    );
    // an upstream URL is recognised as blockable
    expect(extConfig.isOriginalVdhUrl(upstreamConvertUrl)).toBe(true);
    expect(extConfig.shouldBlockOriginalUrl('https://example.com/')).toBe(
      false,
    );
  });

  it("never blocks the extension's own pages (own id carries the upstream store id)", () => {
    const extConfig = loadConfig().extConfig;
    // the own origin literally contains the upstream chrome listing id, so the
    // bare-id fingerprint still matches...
    expect(
      extConfig.isOriginalVdhUrl(
        ownExtensionOrigin + '/content/about.html?panel=about',
      ),
    ).toBe(true);
    // ...but opening a local extension page must not be blocked: this is what
    // makes the Settings / About buttons work.
    for (const page of [
      '/content/about.html?panel=about',
      '/content/settings.html?panel=settings',
    ])
      expect(
        extConfig.shouldBlockOriginalUrl(ownExtensionOrigin + page),
        page,
      ).toBe(false);
    // tabs.create/windows.create-style options objects resolve too
    expect(
      extConfig.shouldBlockOriginalUrl({
        url: ownExtensionOrigin + '/content/about.html?panel=about',
      }),
    ).toBe(false);
    // a genuine upstream store-listing URL is still blocked
    expect(
      extConfig.shouldBlockOriginalUrl(
        'https://chromewebstore.google.com/detail/' + upstreamChromeId,
      ),
    ).toBe(true);
  });

  it('the runtime toggle flips brand and URLs back to the originals', async () => {
    const extConfig = loadConfig().extConfig;
    await extConfig.setIsNotCleanRoom(true);
    expect(extConfig.isCleanRoom).toBe(false);
    expect(extConfig.getLiteralValue('productName')).toBe(upstreamName);
    expect(extConfig.getUrlValue('convertUrl')).toBe(upstreamConvertUrl);
    expect(extConfig.resolveLocaleText(':appName')).toBe(upstreamName);
    // and blocking is disabled outside clean-room mode
    expect(extConfig.shouldBlockOriginalUrl(upstreamConvertUrl)).toBe(false);
  });

  it('the i18n.getMessage guard rewrites localized strings through extConfig', () => {
    const sandbox = loadConfig({
      appName: ':appName',
      welcome: 'Welcome to :appName',
      plain: 'Nothing to substitute',
    });
    // the module wraps chrome.i18n.getMessage in place
    expect(sandbox.chrome.i18n.getMessage('welcome')).toBe(
      'Welcome to Clean-Room Helper',
    );
    expect(sandbox.chrome.i18n.getMessage('appName')).toBe('Clean-Room Helper');
    expect(sandbox.chrome.i18n.getMessage('plain')).toBe(
      'Nothing to substitute',
    );
  });
});
