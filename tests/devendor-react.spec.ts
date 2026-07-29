import { describe, it, expect } from 'vitest';
import { loadDevendoredBundle } from './devendor-helpers';

/**
 * Runtime verification that React was de-vendored correctly: content-libs.js no
 * longer bundles React's source — it loads it from content/vendor/react-v16.js,
 * and its internal `require("react")` shim resolves to that global. We load the
 * page's vendored libs + the bundle into a JSDOM exactly as a page does, and
 * assert the whole thing initializes and renders end-to-end.
 */
describe('de-vendored React (content-libs.js -> content/vendor/react-v16.js)', () => {
  it('loads, initializes, and renders with the vendored React 16.14.0', () => {
    const { windowObject } = loadDevendoredBundle('content/settings.html');

    expect(windowObject.React.version).toBe('16.14.0');
    expect(typeof windowObject.React.createElement).toBe('function');
    expect(typeof windowObject.render).toBe('function'); // ReactDOM.render, wired to vendored React
    expect(typeof windowObject.weh).toBe('object'); // app/framework init reached the end

    // end-to-end: render a React element into the DOM via the bundle's ReactDOM
    const container = windowObject.document.getElementById('app')!;
    windowObject.render(
      windowObject.React.createElement(
        'span',
        { id: 'probe' },
        'hello devendor',
      ),
      container,
    );
    expect(container.querySelector('#probe')?.textContent).toBe(
      'hello devendor',
    );
  });
});
