import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';
import { dummyDom } from 'xdtestutils/dom-dummy';

/**
 * End-to-end integration for the clean-room config: loads a real extension page
 * (content2/sidebar.html) into JSDOM and evaluates cleanroom-shared.js exactly as
 * the page does (it is the page's first script). Then it asserts the live wiring
 * against the real DOM and a stubbed extension runtime:
 *   - the i18n.getMessage guard rewrites :appName in localized strings in-page,
 *   - the page's data-cleanroom-url link is bound to the neutralised URL,
 *   - and an upstream fetch is blocked in clean-room mode.
 * This exercises the actual guards installed on the page globals, not the module
 * in isolation (that is cleanroom-config.spec.ts).
 */
describe('clean-room config integration (a real page loads cleanroom-shared.js)', () => {
  let windowObject: Record<string, any>;

  beforeAll(() => {
    const html = readFileSync(resolve('content2/sidebar.html'), 'utf8');
    const dom = dummyDom({ html, url: 'http://localhost/' });
    windowObject = dom.window as unknown as Record<string, any>;

    const noop = () => {};
    const storageArea = {
      get: async () => ({}),
      set: async () => {},
      onChanged: { addListener: noop, removeListener: noop },
    };
    // localized strings as they now ship: brand references are the :appName token
    const messages: Record<string, string> = {
      appName: ':appName',
      v9_coapp_help: 'Help :appName',
      v9_plain: 'No token here',
    };
    windowObject.chrome = {
      storage: {
        local: storageArea,
        onChanged: { addListener: noop, removeListener: noop },
      },
      i18n: { getMessage: (key: string) => messages[key] ?? '' },
    };
    // give the fetch/open guards something to wrap and observe
    windowObject.fetchedUrls = [] as string[];
    windowObject.fetch = (url: string) => {
      windowObject.fetchedUrls.push(url);
      return Promise.resolve({ ok: true });
    };
    windowObject.openedUrls = [] as string[];
    windowObject.open = (url: string) => {
      windowObject.openedUrls.push(url);
      return null;
    };
    // avoid the 5s re-install interval leaking past the test (installGuards has
    // already run once synchronously on load, which is what we assert)
    windowObject.setInterval = () => 0;

    // evaluate the page's first script, exactly as the browser would
    dom.evalUrl(pathToFileURL(resolve('cleanroom-shared.js')));
  });

  it('installs globalThis.extConfig on the page', () => {
    expect(windowObject.extConfig).toBeDefined();
    expect(windowObject.extConfig.isCleanRoom).toBe(true);
  });

  it('the in-page i18n.getMessage guard substitutes :appName with the brand', () => {
    expect(windowObject.chrome.i18n.getMessage('v9_coapp_help')).toBe(
      'Help Clean-Room Helper',
    );
    expect(windowObject.chrome.i18n.getMessage('appName')).toBe(
      'Clean-Room Helper',
    );
    expect(windowObject.chrome.i18n.getMessage('v9_plain')).toBe(
      'No token here',
    );
  });

  it('resolves a data-cleanroom-url link to the neutralised URL on click, even from a <template>', () => {
    // the coapp link ships inside a <template>; the app clones it into the live
    // DOM when the coapp UI is shown. Click delegation must still resolve it.
    const template = windowObject.document.querySelector('template');
    expect(template).toBeTruthy();
    windowObject.document.body.appendChild(template.content.cloneNode(true));

    const link = windowObject.document.querySelector('[data-cleanroom-url]');
    expect(link).toBeTruthy();
    expect(link.getAttribute('data-cleanroom-url')).toBe('coappHelpUrl');

    link.dispatchEvent(
      new windowObject.MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    expect(windowObject.openedUrls).toContain(
      'about:blank#cleanroom-coapp-help',
    );
  });

  it('blocks an upstream fetch while allowing unrelated ones', async () => {
    const upstream =
      'https://www.' + ['download', 'helper', '.net'].join('') + '/convert';
    await expect(windowObject.fetch(upstream)).rejects.toThrow(/clean-room/i);
    await windowObject.fetch('https://example.com/data.json');
    expect(windowObject.fetchedUrls).toContain('https://example.com/data.json');
    expect(windowObject.fetchedUrls).not.toContain(upstream);
  });
});
