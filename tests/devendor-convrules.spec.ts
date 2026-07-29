import { describe, it, expect } from "vitest";
import { loadFullPage } from "./devendor-helpers";

/**
 * Loads the whole convrules-edit page (all vendored libs + content-libs.js +
 * convrules-edit.js) into a JSDOM exactly as the browser does. convrules-edit.js
 * defines its React components/classes at load, so evaluating it against a
 * broken (de-vendored) React would throw here. Full app init needs the
 * background rpc handshake, which a headless load does not exercise.
 */
describe("convrules-edit page loads against the vendored React stack", () => {
  it("loads without throwing and sees vendored React 16.14.0", () => {
    const { windowObject } = loadFullPage("content/convrules-edit.html");
    expect(windowObject.React.version).toBe("16.14.0");
    expect(typeof windowObject.React.createElement).toBe("function");
  });
});
