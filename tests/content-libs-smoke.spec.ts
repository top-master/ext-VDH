import { describe, it, expect, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Behavioural smoke test / parity guard for the content/content-libs.js bundle.
 *
 * content-libs.js is loaded on ~19 extension pages as a plain <script>: it reads
 * the vendor globals (React, ReactDOM, Redux, ReactRedux, reactstrap, ...) and
 * publishes a fixed set of window.* globals that every page script consumes. It
 * has no rendering tests, yet it is about to be modularized behind an esbuild
 * build. This test pins the public contract: it loads the real vendor scripts +
 * the bundle in jsdom, asserts every published global exists, and renders a few
 * components end to end. The modular rebuild must keep this green unchanged.
 */

// The window.* globals content-libs.js must publish (see the bundle's export
// tail) plus the inline shared components. The reactstrap fan-out is checked via
// a representative sample (Button/Modal/Nav).
const EXPECTED_GLOBALS: Record<string, string> = {
  React: 'object',
  render: 'function',
  Provider: 'function',
  connect: 'function',
  applyMiddleware: 'function',
  createStore: 'function',
  combineReducers: 'function',
  bindActionCreators: 'function',
  logger: 'function',
  deepEqual: 'function',
  ReactJson: 'function',
  ReactResizeDetector: 'function',
  prefsSettingsReducer: 'function',
  PrefsSettingsApp: 'function',
  WehParam: 'object',
  WehPrefsControls: 'object',
  listenPrefs: 'function',
  translateReducer: 'function',
  WehTranslationForm: 'object',
  WehHeader: 'function',
  Embedder: 'function',
  Embedded: 'function',
  VDHModal: 'function',
  NativeMessagingShell: 'function',
  weh: 'object',
  browser: 'object',
  // shared form-control hierarchy
  InputField: 'function',
  ComboBox: 'function',
  ComboBoxLabeled: 'function',
  // representative reactstrap fan-out
  Button: 'function',
  Modal: 'function',
  Nav: 'function',
};

const VENDOR_SCRIPTS = [
  'browser-polyfill.js',
  'deep-equal.js',
  'redux-v4.js',
  'react-v16.js',
  'react-dom-v16.js',
  'react-resize-detector.js',
  'react-json-view.js',
  'react-redux-v7.js',
  'prop-types-v15.js',
  'classnames-v2.js',
  'redux-logger-v3.js',
  'popper.js',
  'react-popper.js',
  'reactstrap.js',
];

function loadBundle(): any {
  const dom = new JSDOM('<!DOCTYPE html><body><div id="root"></div></body>', {
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    // content-libs.js reads a ?panel= param at load and throws without it.
    url: 'https://localhost/content/settings.html?panel=main',
  });
  const { window } = dom as any;
  // Minimal WebExtension API so the weh runtime's startup does not throw.
  const noop = () => {};
  window.chrome = {
    runtime: {
      sendMessage: noop,
      onMessage: { addListener: noop },
      getManifest: () => ({ version: '1.0' }),
      connect: () => ({
        onMessage: { addListener: noop },
        onDisconnect: { addListener: noop },
        postMessage: noop,
      }),
      id: 'test',
      getURL: (path: string) => 'chrome-extension://test/' + path,
    },
    storage: {
      local: { get: () => Promise.resolve({}), set: () => Promise.resolve() },
      onChanged: { addListener: noop },
    },
    i18n: { getMessage: (key: string) => key },
    downloads: { download: noop },
  };
  const runScript = (relativePath: string) =>
    window.eval(readFileSync(resolve(relativePath), 'utf8'));
  for (const vendor of VENDOR_SCRIPTS) {
    runScript('vendor/' + vendor);
  }
  runScript('content/content-libs.js');
  return window;
}

describe('content-libs.js bundle (behavioural parity guard)', () => {
  let window: any;
  beforeAll(() => {
    window = loadBundle();
  });

  it('publishes every expected window.* global with the right type', () => {
    const wrong: string[] = [];
    for (const [name, expectedType] of Object.entries(EXPECTED_GLOBALS)) {
      if (typeof window[name] !== expectedType) {
        wrong.push(
          `${name}: expected ${expectedType}, got ${typeof window[name]}`,
        );
      }
    }
    expect(wrong).toEqual([]);
  });

  it('renders a reactstrap Button', () => {
    const root = window.document.getElementById('root');
    window.ReactDOM.render(
      window.React.createElement(window.Button, { color: 'primary' }, 'Hi'),
      root,
    );
    const button = root.querySelector('button');
    expect(button).not.toBeNull();
    expect(button.className).toContain('btn-primary');
  });

  it('renders the shared ComboBoxLabeled with its options and label', () => {
    const root = window.document.getElementById('root');
    window.ReactDOM.render(
      window.React.createElement(window.ComboBoxLabeled, {
        id: 'ui',
        label: 'User interface',
        value: 'a',
        options: [
          { value: 'a', name: 'Alpha' },
          { value: 'b', name: 'Beta' },
        ],
      }),
      root,
    );
    expect(root.querySelector('label')?.textContent).toBe('User interface');
    const select = root.querySelector('select');
    expect(select).not.toBeNull();
    expect(select.querySelectorAll('option')).toHaveLength(2);
    expect(select.style.width).toBe('12em');
  });

  it('renders a connected WehParam choice control through a redux store', () => {
    // WehParam is a connect()-wrapped component: build the same store the settings
    // page does (combineReducers({prefs: prefsSettingsReducer}) + createStore) with
    // a preloaded choice pref, render it inside a Provider, and check it produces a
    // labeled ComboBox. This guards the connected-component wiring end to end.
    const root = window.document.getElementById('root');
    const rootReducer = window.combineReducers({
      prefs: window.prefsSettingsReducer,
    });
    const spec = {
      name: 'smokeChoice',
      type: 'choice',
      label: 'Smoke choice',
      choices: [
        { value: 'a', name: 'Alpha' },
        { value: 'b', name: 'Beta' },
      ],
      defaultValue: 'a',
    };
    const store = window.createStore(rootReducer, {
      prefs: {
        specs: { smokeChoice: spec },
        current: { smokeChoice: 'a' },
        values: { smokeChoice: 'a' },
      },
    });
    window.ReactDOM.render(
      window.React.createElement(
        window.Provider,
        { store },
        window.React.createElement(window.WehParam, {
          prefName: 'smokeChoice',
        }),
      ),
      root,
    );
    expect(root.querySelector('label')?.textContent).toContain('Smoke choice');
    const select = root.querySelector('select');
    expect(select).not.toBeNull();
    expect(select.querySelectorAll('option')).toHaveLength(2);
  });

  it('renders the connected WehTranslationForm with its WehHeader and rows', () => {
    // WehTranslationForm is connect()-wrapped and renders a WehHeader plus one
    // WehTranslationRow per translation key. Build the store the translation page
    // uses (translateReducer) with two preloaded keys, render it, and assert the
    // weh-header, the form, AND a per-key row input all appear — exercising the
    // whole cluster (WehHeader + WehTranslationForm + WehTranslationRow) end to
    // end. Preloading keys is what makes the row render-testable: an empty keys
    // list produces a form with no rows, so the row class would never run.
    const root = window.document.getElementById('root');
    const store = window.createStore(
      window.combineReducers({ translate: window.translateReducer }),
      {
        translate: {
          keys: ['greeting', 'farewell'],
          custom: { greeting: 'Hello' },
          modified: {},
        },
      },
    );
    window.ReactDOM.render(
      window.React.createElement(
        window.Provider,
        { store },
        window.React.createElement(window.WehTranslationForm, null),
      ),
      root,
    );
    expect(root.querySelector('.weh-header')).not.toBeNull();
    expect(root.querySelector('form.weh-shf')).not.toBeNull();
    // One WehTranslationRow per key: each renders an input#weh-<key> whose value
    // is the current custom string.
    const rows = root.querySelectorAll('.form-group.row input.form-control');
    expect(rows).toHaveLength(2);
    const greeting = root.querySelector('#weh-greeting') as HTMLInputElement;
    expect(greeting).not.toBeNull();
    expect(greeting.value).toBe('Hello');
    expect(root.querySelector('#weh-farewell')).not.toBeNull();
  });
});
