import { describe, it, expect, beforeAll } from "vitest";
import { loadDevendoredBundle } from "./devendor-helpers";

/**
 * Verifies the vendored libraries provide everything the extension needs
 * (nothing is missing from the versions we pinned) and that the bundle's
 * de-vendored globals actually route to them. Loads the real page's vendored
 * libs + content-libs.js into a JSDOM once, then exercises the API surface the
 * app relies on, including a full React + Redux + react-redux render.
 */
let windowObject: Record<string, any>;
beforeAll(() => {
  windowObject = loadDevendoredBundle("content/settings.html").windowObject;
});

describe("vendored React", () => {
  it("is version 16.14.0", () => expect(windowObject.React.version).toBe("16.14.0"));
  it.each(["createElement", "cloneElement", "createContext", "createRef", "isValidElement", "Component", "PureComponent", "Fragment", "Children", "createFactory"])(
    "provides React.%s", (member) => expect(windowObject.React[member]).toBeDefined(),
  );
  it("createElement builds a valid element", () => {
    const element = windowObject.React.createElement("div", { className: "x" }, "hi");
    expect(windowObject.React.isValidElement(element)).toBe(true);
    expect(element.type).toBe("div");
    expect(element.props.className).toBe("x");
  });
});

describe("vendored ReactDOM", () => {
  it.each(["render", "unmountComponentAtNode", "findDOMNode", "createPortal", "unstable_batchedUpdates", "version"])(
    "provides ReactDOM.%s", (member) => expect(windowObject.ReactDOM[member]).toBeDefined(),
  );
  it("window.render is ReactDOM.render", () => expect(windowObject.render).toBe(windowObject.ReactDOM.render));
});

describe("vendored Redux", () => {
  it.each(["createStore", "combineReducers", "applyMiddleware", "bindActionCreators", "compose"])(
    "provides Redux.%s", (member) => expect(typeof windowObject.Redux[member]).toBe("function"),
  );
  it("the bundle's window.createStore routes to vendored Redux", () => {
    const store = windowObject.createStore((state = 1) => state);
    expect(typeof store.dispatch).toBe("function");
    expect(typeof store.getState).toBe("function");
    expect(typeof store.subscribe).toBe("function");
    expect(store.getState()).toBe(1);
  });
  it("createStore + dispatch updates state", () => {
    const store = windowObject.Redux.createStore(
      (state = { count: 0 }, action: any) => (action.type === "INC" ? { count: state.count + 1 } : state),
    );
    store.dispatch({ type: "INC" });
    store.dispatch({ type: "INC" });
    expect(store.getState().count).toBe(2);
  });
  it("combineReducers composes slices", () => {
    const rootReducer = windowObject.createStore
      ? windowObject.Redux.combineReducers({ a: (state = "A") => state, b: (state = "B") => state })
      : null;
    const store = windowObject.Redux.createStore(rootReducer);
    expect(store.getState()).toEqual({ a: "A", b: "B" });
  });
  it("bindActionCreators binds dispatch", () => {
    const dispatched: any[] = [];
    const bound = windowObject.Redux.bindActionCreators(
      { ping: (value: number) => ({ type: "PING", value }) },
      (action: any) => dispatched.push(action),
    );
    bound.ping(7);
    expect(dispatched).toEqual([{ type: "PING", value: 7 }]);
  });
});

describe("vendored react-redux", () => {
  it("provides Provider and connect", () => {
    expect(windowObject.ReactRedux.Provider).toBeDefined();
    expect(typeof windowObject.ReactRedux.connect).toBe("function");
  });
  it("window.Provider / window.connect route to vendored react-redux", () => {
    expect(windowObject.Provider).toBe(windowObject.ReactRedux.Provider);
    expect(windowObject.connect).toBe(windowObject.ReactRedux.connect);
  });
});

describe("full React + Redux + react-redux + ReactDOM render (nothing missing)", () => {
  it("renders a connected component and reflects dispatched state", () => {
    const React = windowObject.React;
    const store = windowObject.createStore(
      (state = { count: 0 }, action: any) => (action.type === "INC" ? { count: state.count + 1 } : state),
    );
    const CountView = (props: { count: number }) => React.createElement("span", { id: "count" }, String(props.count));
    const ConnectedCount = windowObject.connect((state: any) => ({ count: state.count }))(CountView);
    const application = React.createElement(windowObject.Provider, { store }, React.createElement(ConnectedCount));

    const container = windowObject.document.createElement("div");
    windowObject.document.body.appendChild(container);
    windowObject.render(application, container);
    expect(container.querySelector("#count")!.textContent).toBe("0");

    store.dispatch({ type: "INC" });
    expect(container.querySelector("#count")!.textContent).toBe("1");
    windowObject.ReactDOM.unmountComponentAtNode(container);
  });
});

describe("vendored prop-types", () => {
  it.each(["string", "number", "bool", "func", "object", "array", "node", "element", "oneOf", "shape"])(
    "provides PropTypes.%s", (member) => expect(windowObject.PropTypes[member]).toBeDefined(),
  );
});

describe("vendored classnames", () => {
  it("window.classNames joins truthy names", () => {
    expect(windowObject.classNames("a", { b: true, c: false }, ["d"])).toBe("a b d");
  });
});

describe("vendored redux-logger", () => {
  it("exposes a logger middleware and createLogger factory", () => {
    expect(typeof windowObject.reduxLogger.createLogger).toBe("function");
    expect(typeof windowObject.logger).toBe("function"); // the bundle exposes the default logger
  });
});

describe("vendored deep-equal (extracted to vendor/deep-equal.js)", () => {
  it("window.deepEqual compares deeply", () => {
    expect(windowObject.deepEqual({ a: [1, 2], b: { c: 3 } }, { a: [1, 2], b: { c: 3 } })).toBe(true);
    expect(windowObject.deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
});

describe("vendored react-resize-detector (extracted to vendor/react-resize-detector.js)", () => {
  it("window.ReactResizeDetector is a component/HOC", () => {
    expect(["function", "object"]).toContain(typeof windowObject.ReactResizeDetector);
    expect(windowObject.ReactResizeDetector).toBeTruthy();
  });
});

describe("vendored webextension-polyfill", () => {
  it.each(["runtime", "storage", "i18n", "tabs"])(
    "browser.%s is present", (member) => expect(windowObject.browser[member]).toBeDefined(),
  );
  it("browser.runtime has the APIs the app calls", () => {
    expect(typeof windowObject.browser.runtime.getManifest).toBe("function");
    expect(typeof windowObject.browser.runtime.connect).toBe("function");
  });
});
