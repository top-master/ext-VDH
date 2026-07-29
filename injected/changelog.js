'use strict';

(() => {
  var objectCreate = Object.create;
  var defineProperty = Object.defineProperty;
  var getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var getOwnPropNames = Object.getOwnPropertyNames;
  var getPrototypeOf = Object.getPrototypeOf;
  var hasOwnPropertyRef = Object.prototype.hasOwnProperty;
  var defineCommonjsModule = (defineModule, cachedExports) => () => (
    cachedExports
      || defineModule(
        (cachedExports = {
          exports: {},
        }).exports,
        cachedExports,
      ),
    cachedExports.exports
  );
  var copyProps = (targetObj, from, except, desc) => {
    if ((from && typeof from == 'object') || typeof from == 'function') {
      for (let key of getOwnPropNames(from)) {
        if (!hasOwnPropertyRef.call(targetObj, key) && key !== except) {
          defineProperty(targetObj, key, {
            get: () => from[key],
            enumerable: !(desc = getOwnPropDesc(from, key)) || desc.enumerable,
          });
        }
      }
    }
    return targetObj;
  };
  var toEsm = (mod, isNodeMode, target) => (
    (target = mod != null ? objectCreate(getPrototypeOf(mod)) : {}),
    copyProps(
      isNodeMode || !mod || !mod.__esModule
        ? defineProperty(target, 'default', {
            value: mod,
            enumerable: !0,
          })
        : target,
      mod,
    )
  );
  var requirePolyfill = defineCommonjsModule(
    (polyfillExports, polyfillModule) => {
      (function (globalScope, factory) {
        if (typeof define == 'function' && define.amd) {
          define('webextension-polyfill', ['module'], factory);
        } else if (typeof polyfillExports < 'u') {
          factory(polyfillModule);
        } else {
          var moduleShim = {
            exports: {},
          };
          factory(moduleShim);
          globalScope.browser = moduleShim.exports;
        }
      })(
        typeof globalThis < 'u'
          ? globalThis
          : typeof self < 'u'
            ? self
            : polyfillExports,
        function (browserGlobal) {
          'use strict';

          if (!globalThis.chrome?.runtime?.id) {
            throw new Error(
              'This script should only be loaded in a browser extension.',
            );
          }
          if (
            typeof globalThis.browser > 'u'
            || Object.getPrototypeOf(globalThis.browser) !== Object.prototype
          ) {
            let messagePortClosedMessage =
              'The message port closed before a response was received.';
            let wrapApis = chromeApi => {
              let apiMetadata = {
                alarms: {
                  clear: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  clearAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  get: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                },
                bookmarks: {
                  create: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getChildren: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getRecent: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getSubTree: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getTree: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  move: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeTree: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  search: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                },
                browserAction: {
                  disable: {
                    minArgs: 0,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  enable: {
                    minArgs: 0,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  getBadgeBackgroundColor: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getBadgeText: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getPopup: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getTitle: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  openPopup: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  setBadgeBackgroundColor: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  setBadgeText: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  setIcon: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  setPopup: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  setTitle: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                },
                browsingData: {
                  remove: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                  removeCache: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeCookies: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeDownloads: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeFormData: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeHistory: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeLocalStorage: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removePasswords: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removePluginData: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  settings: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                },
                commands: {
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                },
                contextMenus: {
                  remove: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                },
                cookies: {
                  get: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getAll: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getAllCookieStores: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                },
                devtools: {
                  inspectedWindow: {
                    eval: {
                      minArgs: 1,
                      maxArgs: 2,
                      singleCallbackArg: !1,
                    },
                  },
                  panels: {
                    create: {
                      minArgs: 3,
                      maxArgs: 3,
                      singleCallbackArg: !0,
                    },
                    elements: {
                      createSidebarPane: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                    },
                  },
                },
                downloads: {
                  cancel: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  download: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  erase: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getFileIcon: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  open: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  pause: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeFile: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  resume: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  search: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  show: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                },
                extension: {
                  isAllowedFileSchemeAccess: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  isAllowedIncognitoAccess: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                },
                history: {
                  addUrl: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  deleteAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  deleteRange: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  deleteUrl: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getVisits: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  search: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                },
                i18n: {
                  detectLanguage: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getAcceptLanguages: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                },
                identity: {
                  launchWebAuthFlow: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                },
                idle: {
                  queryState: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                },
                management: {
                  get: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  getSelf: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  setEnabled: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                  uninstallSelf: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                },
                notifications: {
                  clear: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  create: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  getPermissionLevel: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                },
                pageAction: {
                  getPopup: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getTitle: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  hide: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  setIcon: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  setPopup: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  setTitle: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                  show: {
                    minArgs: 1,
                    maxArgs: 1,
                    fallbackToNoCallback: !0,
                  },
                },
                permissions: {
                  contains: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  request: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                },
                runtime: {
                  getBackgroundPage: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  getPlatformInfo: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  openOptionsPage: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  requestUpdateCheck: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  sendMessage: {
                    minArgs: 1,
                    maxArgs: 3,
                  },
                  sendNativeMessage: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                  setUninstallURL: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                },
                sessions: {
                  getDevices: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  getRecentlyClosed: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  restore: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                },
                storage: {
                  local: {
                    clear: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    get: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getBytesInUse: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    set: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  managed: {
                    get: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getBytesInUse: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                  },
                  sync: {
                    clear: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    get: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getBytesInUse: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    set: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                },
                tabs: {
                  captureVisibleTab: {
                    minArgs: 0,
                    maxArgs: 2,
                  },
                  create: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  detectLanguage: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  discard: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  duplicate: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  executeScript: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getCurrent: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                  getZoom: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  getZoomSettings: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  goBack: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  goForward: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  highlight: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  insertCSS: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  move: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                  query: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  reload: {
                    minArgs: 0,
                    maxArgs: 2,
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  removeCSS: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  sendMessage: {
                    minArgs: 2,
                    maxArgs: 3,
                  },
                  setZoom: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  setZoomSettings: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  update: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                },
                topSites: {
                  get: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                },
                webNavigation: {
                  getAllFrames: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  getFrame: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                },
                webRequest: {
                  handlerBehaviorChanged: {
                    minArgs: 0,
                    maxArgs: 0,
                  },
                },
                windows: {
                  create: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 2,
                  },
                  getAll: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  getCurrent: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  getLastFocused: {
                    minArgs: 0,
                    maxArgs: 1,
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  update: {
                    minArgs: 2,
                    maxArgs: 2,
                  },
                },
              };
              if (Object.keys(apiMetadata).length === 0) {
                throw new Error(
                  'api-metadata.json has not been included in browser-polyfill',
                );
              }
              class DefaultWeakMap extends WeakMap {
                constructor(createItem, entries = void 0) {
                  super(entries);
                  this.createItem = createItem;
                }
                get(key) {
                  if (!this.has(key)) {
                    this.set(key, this.createItem(key));
                  }
                  return super.get(key);
                }
              }
              let isThenable = value =>
                value
                && typeof value == 'object'
                && typeof value.then == 'function';
              let makeCallback =
                (promiseCallbacks, metadata) =>
                (...callbackArgs) => {
                  if (chromeApi.runtime.lastError) {
                    promiseCallbacks.reject(
                      new Error(chromeApi.runtime.lastError.message),
                    );
                  } else {
                    if (
                      metadata.singleCallbackArg
                      || (callbackArgs.length <= 1
                        && metadata.singleCallbackArg !== !1)
                    ) {
                      promiseCallbacks.resolve(callbackArgs[0]);
                    } else {
                      promiseCallbacks.resolve(callbackArgs);
                    }
                  }
                };
              let pluralizeArgs = count =>
                count == 1 ? 'argument' : 'arguments';
              let wrapAsyncFunction = (name, metadata) =>
                function (apiTarget, ...args) {
                  if (args.length < metadata.minArgs) {
                    throw new Error(
                      `Expected at least ${metadata.minArgs} ${pluralizeArgs(metadata.minArgs)} for ${name}(), got ${args.length}`,
                    );
                  }
                  if (args.length > metadata.maxArgs) {
                    throw new Error(
                      `Expected at most ${metadata.maxArgs} ${pluralizeArgs(metadata.maxArgs)} for ${name}(), got ${args.length}`,
                    );
                  }
                  return new Promise((resolve, reject) => {
                    if (metadata.fallbackToNoCallback) {
                      try {
                        apiTarget[name](
                          ...args,
                          makeCallback(
                            {
                              resolve: resolve,
                              reject: reject,
                            },
                            metadata,
                          ),
                        );
                      } catch (error) {
                        console.warn(
                          `${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,
                          error,
                        );
                        apiTarget[name](...args);
                        metadata.fallbackToNoCallback = !1;
                        metadata.noCallback = !0;
                        resolve();
                      }
                    } else {
                      if (metadata.noCallback) {
                        apiTarget[name](...args);
                        resolve();
                      } else {
                        apiTarget[name](
                          ...args,
                          makeCallback(
                            {
                              resolve: resolve,
                              reject: reject,
                            },
                            metadata,
                          ),
                        );
                      }
                    }
                  });
                };
              let wrapMethod = (target, method, wrapper) =>
                new Proxy(method, {
                  apply(fnTarget, thisArg, callArgs) {
                    return wrapper.call(thisArg, target, ...callArgs);
                  },
                });
              let hasOwnProperty = Function.call.bind(
                Object.prototype.hasOwnProperty,
              );
              let wrapObject = (target, wrappers = {}, metadata = {}) => {
                let cache = Object.create(null);
                let handler = {
                  has(proxyTarget, prop) {
                    return prop in target || prop in cache;
                  },
                  get(proxyTarget, prop, receiver) {
                    if (prop in cache) {
                      return cache[prop];
                    }
                    if (!(prop in target)) {
                      return;
                    }
                    let value = target[prop];
                    if (typeof value == 'function') {
                      if (typeof wrappers[prop] == 'function') {
                        value = wrapMethod(
                          target,
                          target[prop],
                          wrappers[prop],
                        );
                      } else if (hasOwnProperty(metadata, prop)) {
                        let wrappedFn = wrapAsyncFunction(prop, metadata[prop]);
                        value = wrapMethod(target, target[prop], wrappedFn);
                      } else {
                        value = value.bind(target);
                      }
                    } else if (
                      typeof value == 'object'
                      && value !== null
                      && (hasOwnProperty(wrappers, prop)
                        || hasOwnProperty(metadata, prop))
                    ) {
                      value = wrapObject(value, wrappers[prop], metadata[prop]);
                    } else if (hasOwnProperty(metadata, '*')) {
                      value = wrapObject(value, wrappers[prop], metadata['*']);
                    } else {
                      Object.defineProperty(cache, prop, {
                        configurable: !0,
                        enumerable: !0,
                        get() {
                          return target[prop];
                        },
                        set(newValue) {
                          target[prop] = newValue;
                        },
                      });
                      return value;
                    }
                    cache[prop] = value;
                    return value;
                  },
                  set(proxyTarget, prop, value, receiver) {
                    if (prop in cache) {
                      cache[prop] = value;
                    } else {
                      target[prop] = value;
                    }
                    return !0;
                  },
                  defineProperty(proxyTarget, prop, desc) {
                    return Reflect.defineProperty(cache, prop, desc);
                  },
                  deleteProperty(proxyTarget, prop) {
                    return Reflect.deleteProperty(cache, prop);
                  },
                };
                let proxyBase = Object.create(target);
                return new Proxy(proxyBase, handler);
              };
              let wrapEvent = wrapperMap => ({
                addListener(target, listener, ...args) {
                  target.addListener(wrapperMap.get(listener), ...args);
                },
                hasListener(target, listener) {
                  return target.hasListener(wrapperMap.get(listener));
                },
                removeListener(target, listener) {
                  target.removeListener(wrapperMap.get(listener));
                },
              });
              let onRequestFinishedWrappers = new DefaultWeakMap(listener =>
                typeof listener != 'function'
                  ? listener
                  : function (request) {
                      let wrappedRequest = wrapObject(
                        request,
                        {},
                        {
                          getContent: {
                            minArgs: 0,
                            maxArgs: 0,
                          },
                        },
                      );
                      listener(wrappedRequest);
                    },
              );
              let onMessageWrappers = new DefaultWeakMap(listener =>
                typeof listener != 'function'
                  ? listener
                  : function (message, sender, sendResponse) {
                      let responseSent = !1;
                      let resolveResponse;
                      let responsePromise = new Promise(resolvePromise => {
                        resolveResponse = function (response) {
                          responseSent = !0;
                          resolvePromise(response);
                        };
                      });
                      let result;
                      try {
                        result = listener(message, sender, resolveResponse);
                      } catch (error) {
                        result = Promise.reject(error);
                      }
                      let resultIsThenable =
                        result !== !0 && isThenable(result);
                      if (result !== !0 && !resultIsThenable && !responseSent) {
                        return !1;
                      }
                      let sendResolvedResponse = resultPromise => {
                        resultPromise
                          .then(
                            response => {
                              sendResponse(response);
                            },
                            error => {
                              let errorMessage;
                              if (
                                error
                                && (error instanceof Error
                                  || typeof error.message == 'string')
                              ) {
                                errorMessage = error.message;
                              } else {
                                errorMessage = 'An unexpected error occurred';
                              }
                              sendResponse({
                                __mozWebExtensionPolyfillReject__: !0,
                                message: errorMessage,
                              });
                            },
                          )
                          .catch(replyError => {
                            console.error(
                              'Failed to send onMessage rejected reply',
                              replyError,
                            );
                          });
                      };
                      sendResolvedResponse(
                        resultIsThenable ? result : responsePromise,
                      );
                      return !0;
                    },
              );
              let processResponse = (
                { reject: reject, resolve: resolve },
                response,
              ) => {
                if (chromeApi.runtime.lastError) {
                  if (
                    chromeApi.runtime.lastError.message
                    === messagePortClosedMessage
                  ) {
                    resolve();
                  } else {
                    reject(new Error(chromeApi.runtime.lastError.message));
                  }
                } else {
                  if (response && response.__mozWebExtensionPolyfillReject__) {
                    reject(new Error(response.message));
                  } else {
                    resolve(response);
                  }
                }
              };
              let wrapSendMessage = (name, metadata, apiTarget, ...args) => {
                if (args.length < metadata.minArgs) {
                  throw new Error(
                    `Expected at least ${metadata.minArgs} ${pluralizeArgs(metadata.minArgs)} for ${name}(), got ${args.length}`,
                  );
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(
                    `Expected at most ${metadata.maxArgs} ${pluralizeArgs(metadata.maxArgs)} for ${name}(), got ${args.length}`,
                  );
                }
                return new Promise((resolve, reject) => {
                  let boundCallback = processResponse.bind(null, {
                    resolve: resolve,
                    reject: reject,
                  });
                  args.push(boundCallback);
                  apiTarget.sendMessage(...args);
                });
              };
              let staticWrappers = {
                devtools: {
                  network: {
                    onRequestFinished: wrapEvent(onRequestFinishedWrappers),
                  },
                },
                runtime: {
                  onMessage: wrapEvent(onMessageWrappers),
                  onMessageExternal: wrapEvent(onMessageWrappers),
                  sendMessage: wrapSendMessage.bind(null, 'sendMessage', {
                    minArgs: 1,
                    maxArgs: 3,
                  }),
                },
                tabs: {
                  sendMessage: wrapSendMessage.bind(null, 'sendMessage', {
                    minArgs: 2,
                    maxArgs: 3,
                  }),
                },
              };
              let settingMetadata = {
                clear: {
                  minArgs: 1,
                  maxArgs: 1,
                },
                get: {
                  minArgs: 1,
                  maxArgs: 1,
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1,
                },
              };
              apiMetadata.privacy = {
                network: {
                  '*': settingMetadata,
                },
                services: {
                  '*': settingMetadata,
                },
                websites: {
                  '*': settingMetadata,
                },
              };
              return wrapObject(chromeApi, staticWrappers, apiMetadata);
            };
            browserGlobal.exports = wrapApis(chrome);
          } else {
            browserGlobal.exports = globalThis.browser;
          }
        },
      );
    },
  );
  var browserPolyfill = toEsm(requirePolyfill(), 1);
  var buildTarget = 'google';
  function sendToBackground(message) {
    browserPolyfill.default.runtime.sendMessage(message);
  }
  sendToBackground('request_license_status');
  browserPolyfill.default.runtime.onMessage.addListener(async message => {
    if ('license_status' in message) {
      let licenseStatus = message.license_status;
      if (
        buildTarget == 'mozilla'
        && ('unneeded' in licenseStatus || 'unset' in licenseStatus)
      ) {
        document.body.classList.add('show-donation');
      }
    }
  });
})();
