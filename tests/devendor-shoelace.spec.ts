// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from "vitest";

/**
 * Verifies shoelace.js was de-vendored correctly: the Shoelace + Lit + Floating
 * UI library now lives in content2/vendor/shoelace-lib.js (imported by
 * shoelace.js, which keeps only the app theme/storage code). Importing the app
 * module must load the library (registering the <sl-*> custom elements) and run
 * the theme setup end-to-end against the vendored exports.
 */
beforeAll(() => {
  const noop = () => {};
  (globalThis as any).chrome = {
    runtime: { id: "test-extension", lastError: null, getManifest: () => ({ version: "9.0.0" }), getURL: (urlPath: string) => urlPath },
    storage: {
      local: { get: async () => ({}), set: async () => {}, onChanged: { addListener: noop, removeListener: noop } },
      sync: { get: async () => ({}), set: async () => {}, onChanged: { addListener: noop, removeListener: noop } },
    },
    i18n: { getMessage: () => "" },
  };
  // jsdom lacks matchMedia; the theme code needs it
  (globalThis as any).matchMedia = (query: string) => ({
    matches: false, media: query, addEventListener: noop, removeEventListener: noop, addListener: noop, removeListener: noop,
  });
  (globalThis.window as any).matchMedia = (globalThis as any).matchMedia;
});

describe("de-vendored shoelace (content2/vendor/shoelace-lib.js + shoelace.js)", () => {
  it("importing shoelace.js loads the library, registers sl-* elements, and applies the theme", async () => {
    await import("../content2/shoelace.js");

    // the library was loaded via the app module's import and registered components
    expect(customElements.get("sl-button")).toBeTruthy();
    expect(customElements.get("sl-icon")).toBeTruthy();
    expect(customElements.get("sl-dialog")).toBeTruthy();

    // theme applied: stub storage returns default "system", matchMedia dark=false -> no dark class
    expect(document.documentElement.classList.contains("sl-theme-dark")).toBe(false);
  });

  it("shoelace-lib.js re-exports the API the app imports", async () => {
    const library = await import("../vendor/shoelace-lib.js");
    expect(typeof library.setBasePath).toBe("function");
    expect(typeof library.deepEqual).toBe("function");
    expect(library.browserPolyfill).toBeTruthy();
    expect(typeof library.browserPolyfill.storage).toBe("object");
  });
});
