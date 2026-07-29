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
        function (browserModule) {
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
            browserModule.exports = wrapApis(chrome);
          } else {
            browserModule.exports = globalThis.browser;
          }
        },
      );
    },
  );
  var browserPolyfill = toEsm(requirePolyfill(), 1);
  function describeValue(value) {
    var text = String(value);
    if (text === '[object Object]') {
      try {
        text = JSON.stringify(value);
      } catch {}
    }
    return text;
  }
  var NoneOption = (function () {
    function NoneCtor() {}
    NoneCtor.prototype.isSome = function () {
      return !1;
    };
    NoneCtor.prototype.isNone = function () {
      return !0;
    };
    NoneCtor.prototype[Symbol.iterator] = function () {
      return {
        next: function () {
          return {
            done: !0,
            value: void 0,
          };
        },
      };
    };
    NoneCtor.prototype.unwrapOr = function (defaultValue) {
      return defaultValue;
    };
    NoneCtor.prototype.expect = function (message) {
      throw new Error(''.concat(message));
    };
    NoneCtor.prototype.unwrap = function () {
      throw new Error('Tried to unwrap None');
    };
    NoneCtor.prototype.map = function (mapFn) {
      return this;
    };
    NoneCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return defaultValue;
    };
    NoneCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return defaultFn();
    };
    NoneCtor.prototype.or = function (alternative) {
      return alternative;
    };
    NoneCtor.prototype.orElse = function (alternativeFn) {
      return alternativeFn();
    };
    NoneCtor.prototype.andThen = function (mapFn) {
      return this;
    };
    NoneCtor.prototype.toResult = function (errorValue) {
      return err(errorValue);
    };
    NoneCtor.prototype.toString = function () {
      return 'None';
    };
    return NoneCtor;
  })();
  var noneValue = new NoneOption();
  Object.freeze(noneValue);
  var SomeOption = (function () {
    function SomeCtor(value) {
      if (!(this instanceof SomeCtor)) {
        return new SomeCtor(value);
      }
      this.value = value;
    }
    SomeCtor.prototype.isSome = function () {
      return !0;
    };
    SomeCtor.prototype.isNone = function () {
      return !1;
    };
    SomeCtor.prototype[Symbol.iterator] = function () {
      var iterable = Object(this.value);
      if (Symbol.iterator in iterable) {
        return iterable[Symbol.iterator]();
      } else {
        return {
          next: function () {
            return {
              done: !0,
              value: void 0,
            };
          },
        };
      }
    };
    SomeCtor.prototype.unwrapOr = function (defaultValue) {
      return this.value;
    };
    SomeCtor.prototype.expect = function (message) {
      return this.value;
    };
    SomeCtor.prototype.unwrap = function () {
      return this.value;
    };
    SomeCtor.prototype.map = function (mapFn) {
      return some(mapFn(this.value));
    };
    SomeCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return mapFn(this.value);
    };
    SomeCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return mapFn(this.value);
    };
    SomeCtor.prototype.or = function (alternative) {
      return this;
    };
    SomeCtor.prototype.orElse = function (alternativeFn) {
      return this;
    };
    SomeCtor.prototype.andThen = function (mapFn) {
      return mapFn(this.value);
    };
    SomeCtor.prototype.toResult = function (errorValue) {
      return makeOk(this.value);
    };
    SomeCtor.prototype.safeUnwrap = function () {
      return this.value;
    };
    SomeCtor.prototype.toString = function () {
      return 'Some('.concat(describeValue(this.value), ')');
    };
    SomeCtor.EMPTY = new SomeCtor(void 0);
    return SomeCtor;
  })();
  var some = SomeOption;
  var optionStatics;
  (function (optionNamespace) {
    function allOptions() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (
        var values = [], index = 0, options = args;
        index < options.length;
        index++
      ) {
        var option = options[index];
        if (option.isSome()) {
          values.push(option.value);
        } else {
          return option;
        }
      }
      return some(values);
    }
    optionNamespace.all = allOptions;
    function anyOption() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (var index = 0, options = args; index < options.length; index++) {
        var option = options[index];
        option.isSome();
        return option;
      }
      return noneValue;
    }
    optionNamespace.any = anyOption;
    function isOption(value) {
      return value instanceof some || value === noneValue;
    }
    optionNamespace.isOption = isOption;
  })(optionStatics || (optionStatics = {}));
  var ErrResult = (function () {
    function ErrCtor(error) {
      if (!(this instanceof ErrCtor)) {
        return new ErrCtor(error);
      }
      this.error = error;
      var stackLines = new Error().stack
        .split(
          `
`,
        )
        .slice(2);
      if (
        stackLines
        && stackLines.length > 0
        && stackLines[0].includes('ErrImpl')
      ) {
        stackLines.shift();
      }
      this._stack = stackLines.join(`
`);
    }
    ErrCtor.prototype.isOk = function () {
      return !1;
    };
    ErrCtor.prototype.isErr = function () {
      return !0;
    };
    ErrCtor.prototype[Symbol.iterator] = function () {
      return {
        next: function () {
          return {
            done: !0,
            value: void 0,
          };
        },
      };
    };
    ErrCtor.prototype.else = function (defaultValue) {
      return defaultValue;
    };
    ErrCtor.prototype.unwrapOr = function (defaultValue) {
      return defaultValue;
    };
    ErrCtor.prototype.expect = function (message) {
      throw new Error(
        ''
          .concat(message, ' - Error: ')
          .concat(
            describeValue(this.error),
            `
`,
          )
          .concat(this._stack),
        {
          cause: this.error,
        },
      );
    };
    ErrCtor.prototype.expectErr = function (message) {
      return this.error;
    };
    ErrCtor.prototype.unwrap = function () {
      throw new Error(
        'Tried to unwrap Error: '
          .concat(
            describeValue(this.error),
            `
`,
          )
          .concat(this._stack),
        {
          cause: this.error,
        },
      );
    };
    ErrCtor.prototype.unwrapErr = function () {
      return this.error;
    };
    ErrCtor.prototype.map = function (mapFn) {
      return this;
    };
    ErrCtor.prototype.andThen = function (mapFn) {
      return this;
    };
    ErrCtor.prototype.mapErr = function (errorMapFn) {
      return new err(errorMapFn(this.error));
    };
    ErrCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return defaultValue;
    };
    ErrCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return defaultFn(this.error);
    };
    ErrCtor.prototype.or = function (alternative) {
      return alternative;
    };
    ErrCtor.prototype.orElse = function (alternativeFn) {
      return alternativeFn(this.error);
    };
    ErrCtor.prototype.toOption = function () {
      return noneValue;
    };
    ErrCtor.prototype.toString = function () {
      return 'Err('.concat(describeValue(this.error), ')');
    };
    Object.defineProperty(ErrCtor.prototype, 'stack', {
      get: function () {
        return ''
          .concat(
            this,
            `
`,
          )
          .concat(this._stack);
      },
      enumerable: !1,
      configurable: !0,
    });
    ErrCtor.prototype.toAsyncResult = function () {
      return new AsyncResult(this);
    };
    ErrCtor.EMPTY = new ErrCtor(void 0);
    return ErrCtor;
  })();
  var err = ErrResult;
  var OkResult = (function () {
    function OkCtor(value) {
      if (!(this instanceof OkCtor)) {
        return new OkCtor(value);
      }
      this.value = value;
    }
    OkCtor.prototype.isOk = function () {
      return !0;
    };
    OkCtor.prototype.isErr = function () {
      return !1;
    };
    OkCtor.prototype[Symbol.iterator] = function () {
      var iterable = Object(this.value);
      if (Symbol.iterator in iterable) {
        return iterable[Symbol.iterator]();
      } else {
        return {
          next: function () {
            return {
              done: !0,
              value: void 0,
            };
          },
        };
      }
    };
    OkCtor.prototype.else = function (defaultValue) {
      return this.value;
    };
    OkCtor.prototype.unwrapOr = function (defaultValue) {
      return this.value;
    };
    OkCtor.prototype.expect = function (message) {
      return this.value;
    };
    OkCtor.prototype.expectErr = function (message) {
      throw new Error(message);
    };
    OkCtor.prototype.unwrap = function () {
      return this.value;
    };
    OkCtor.prototype.unwrapErr = function () {
      throw new Error(
        'Tried to unwrap Ok: '.concat(describeValue(this.value)),
        {
          cause: this.value,
        },
      );
    };
    OkCtor.prototype.map = function (mapFn) {
      return new makeOk(mapFn(this.value));
    };
    OkCtor.prototype.andThen = function (mapFn) {
      return mapFn(this.value);
    };
    OkCtor.prototype.mapErr = function (errorMapFn) {
      return this;
    };
    OkCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return mapFn(this.value);
    };
    OkCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return mapFn(this.value);
    };
    OkCtor.prototype.or = function (alternative) {
      return this;
    };
    OkCtor.prototype.orElse = function (alternativeFn) {
      return this;
    };
    OkCtor.prototype.toOption = function () {
      return some(this.value);
    };
    OkCtor.prototype.safeUnwrap = function () {
      return this.value;
    };
    OkCtor.prototype.toString = function () {
      return 'Ok('.concat(describeValue(this.value), ')');
    };
    OkCtor.prototype.toAsyncResult = function () {
      return new AsyncResult(this);
    };
    OkCtor.EMPTY = new OkCtor(void 0);
    return OkCtor;
  })();
  var makeOk = OkResult;
  var resultStatics;
  (function (resultNamespace) {
    function allResults() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (
        var values = [], index = 0, results = args;
        index < results.length;
        index++
      ) {
        var result = results[index];
        if (result.isOk()) {
          values.push(result.value);
        } else {
          return result;
        }
      }
      return new makeOk(values);
    }
    resultNamespace.all = allResults;
    function anyResult() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (
        var errors = [], index = 0, results = args;
        index < results.length;
        index++
      ) {
        var result = results[index];
        if (result.isOk()) {
          return result;
        }
        errors.push(result.error);
      }
      return new err(errors);
    }
    resultNamespace.any = anyResult;
    function wrap(operation) {
      try {
        return new makeOk(operation());
      } catch (error) {
        return new err(error);
      }
    }
    resultNamespace.wrap = wrap;
    function wrapAsync(operation) {
      try {
        return operation()
          .then(function (resolvedValue) {
            return new makeOk(resolvedValue);
          })
          .catch(function (error) {
            return new err(error);
          });
      } catch (error) {
        return Promise.resolve(new err(error));
      }
    }
    resultNamespace.wrapAsync = wrapAsync;
    function isResult(value) {
      return value instanceof err || value instanceof makeOk;
    }
    resultNamespace.isResult = isResult;
  })(resultStatics || (resultStatics = {}));
  var runAsync = function (thisArg, argsList, PromiseCtor, generatorFn) {
    function adopt(value) {
      if (value instanceof PromiseCtor) {
        return value;
      } else {
        return new PromiseCtor(function (resolve) {
          resolve(value);
        });
      }
    }
    return new (PromiseCtor || (PromiseCtor = Promise))(function (
      resolve,
      reject,
    ) {
      function fulfilled(value) {
        try {
          step(generatorFn.next(value));
        } catch (error) {
          reject(error);
        }
      }
      function rejected(reason) {
        try {
          step(generatorFn.throw(reason));
        } catch (error) {
          reject(error);
        }
      }
      function step(result) {
        if (result.done) {
          resolve(result.value);
        } else {
          adopt(result.value).then(fulfilled, rejected);
        }
      }
      step((generatorFn = generatorFn.apply(thisArg, argsList || [])).next());
    });
  };
  var runGenerator = function (thisArg, bodyFn) {
    var state = {
      label: 0,
      sent: function () {
        if (currentOp[0] & 1) {
          throw currentOp[1];
        }
        return currentOp[1];
      },
      trys: [],
      ops: [],
    };
    var executing;
    var pendingGenerator;
    var currentOp;
    var iterator;
    iterator = {
      next: makeVerb(0),
      throw: makeVerb(1),
      return: makeVerb(2),
    };
    if (typeof Symbol == 'function') {
      iterator[Symbol.iterator] = function () {
        return this;
      };
    }
    return iterator;
    function makeVerb(verbCode) {
      return function (sentValue) {
        return step([verbCode, sentValue]);
      };
    }
    function step(opEntry) {
      if (executing) {
        throw new TypeError('Generator is already executing.');
      }
      for (; iterator && ((iterator = 0), opEntry[0] && (state = 0)), state; ) {
        try {
          if (
            ((executing = 1),
            pendingGenerator
              && (currentOp =
                opEntry[0] & 2
                  ? pendingGenerator.return
                  : opEntry[0]
                    ? pendingGenerator.throw
                      || ((currentOp = pendingGenerator.return)
                        && currentOp.call(pendingGenerator),
                      0)
                    : pendingGenerator.next)
              && !(currentOp = currentOp.call(pendingGenerator, opEntry[1]))
                .done)
          ) {
            return currentOp;
          }
          switch (
            ((pendingGenerator = 0),
            currentOp && (opEntry = [opEntry[0] & 2, currentOp.value]),
            opEntry[0])
          ) {
            case 0:
            case 1:
              currentOp = opEntry;
              break;
            case 4:
              state.label++;
              return {
                value: opEntry[1],
                done: !1,
              };
            case 5:
              state.label++;
              pendingGenerator = opEntry[1];
              opEntry = [0];
              continue;
            case 7:
              opEntry = state.ops.pop();
              state.trys.pop();
              continue;
            default:
              if (
                ((currentOp = state.trys),
                !(currentOp =
                  currentOp.length > 0 && currentOp[currentOp.length - 1])
                  && (opEntry[0] === 6 || opEntry[0] === 2))
              ) {
                state = 0;
                continue;
              }
              if (
                opEntry[0] === 3
                && (!currentOp
                  || (opEntry[1] > currentOp[0] && opEntry[1] < currentOp[3]))
              ) {
                state.label = opEntry[1];
                break;
              }
              if (opEntry[0] === 6 && state.label < currentOp[1]) {
                state.label = currentOp[1];
                currentOp = opEntry;
                break;
              }
              if (currentOp && state.label < currentOp[2]) {
                state.label = currentOp[2];
                state.ops.push(opEntry);
                break;
              }
              if (currentOp[2]) {
                state.ops.pop();
              }
              state.trys.pop();
              continue;
          }
          opEntry = bodyFn.call(thisArg, state);
        } catch (error) {
          opEntry = [6, error];
          pendingGenerator = 0;
        } finally {
          executing = currentOp = 0;
        }
      }
      if (opEntry[0] & 5) {
        throw opEntry[1];
      }
      return {
        value: opEntry[0] ? opEntry[1] : void 0,
        done: !0,
      };
    }
  };
  var AsyncResult = (function () {
    function AsyncResultCtor(value) {
      this.promise = Promise.resolve(value);
    }
    AsyncResultCtor.prototype.andThen = function (mapFn) {
      var self = this;
      return this.thenInternal(function (result) {
        return runAsync(self, void 0, void 0, function () {
          var mapped;
          return runGenerator(this, function (genState) {
            if (result.isErr()) {
              return [2, result];
            } else {
              mapped = mapFn(result.value);
              return [
                2,
                mapped instanceof AsyncResultCtor ? mapped.promise : mapped,
              ];
            }
          });
        });
      });
    };
    AsyncResultCtor.prototype.map = function (mapFn) {
      var self = this;
      return this.thenInternal(function (result) {
        return runAsync(self, void 0, void 0, function () {
          var okCtor;
          return runGenerator(this, function (genState) {
            switch (genState.label) {
              case 0:
                if (result.isErr()) {
                  return [2, result];
                } else {
                  okCtor = makeOk;
                  return [4, mapFn(result.value)];
                }
              case 1:
                return [2, okCtor.apply(void 0, [genState.sent()])];
            }
          });
        });
      });
    };
    AsyncResultCtor.prototype.thenInternal = function (onResolve) {
      return new AsyncResultCtor(this.promise.then(onResolve));
    };
    return AsyncResultCtor;
  })();
  var isStringProperty = (targetObject, propertyName) =>
    typeof targetObject[propertyName] == 'string';
  function deserialize(serialized) {
    try {
      if (isStringProperty(serialized, '__serializer_tag')) {
        if (serialized.__serializer_tag === 'primitive') {
          return makeOk(serialized.__serializer_value);
        }
        if (serialized.__serializer_tag === 'regex') {
          let regex = new RegExp(serialized.__serializer_value);
          return makeOk(regex);
        } else if (serialized.__serializer_tag === 'array') {
          let items = [];
          for (let element of serialized.__serializer_value) {
            let elementResult = deserialize(element);
            if (elementResult.isErr()) {
              return elementResult;
            }
            items.push(elementResult.unwrap());
          }
          return makeOk(items);
        } else if (serialized.__serializer_tag === 'map') {
          let entries = [];
          for (let element of serialized.__serializer_value) {
            let elementResult = deserialize(element);
            if (elementResult.isErr()) {
              return elementResult;
            }
            entries.push(elementResult.unwrap());
          }
          return makeOk(new Map(entries));
        } else if (serialized.__serializer_tag === 'set') {
          let members = [];
          for (let element of serialized.__serializer_value) {
            let elementResult = deserialize(element);
            if (elementResult.isErr()) {
              return elementResult;
            }
            members.push(elementResult.unwrap());
          }
          return makeOk(new Set(members));
        } else if (serialized.__serializer_tag === 'result_ok') {
          let innerValue = serialized.__serializer_value;
          let innerResult = deserialize(innerValue);
          if (innerResult.isErr()) {
            return innerResult;
          } else {
            return makeOk(makeOk(innerResult.unwrap()));
          }
        } else if (serialized.__serializer_tag === 'result_err') {
          let innerValue = serialized.__serializer_value;
          let innerResult = deserialize(innerValue);
          if (innerResult.isErr()) {
            return innerResult;
          } else {
            return makeOk(err(innerResult.unwrap()));
          }
        } else if (serialized.__serializer_tag === 'option_some') {
          let innerValue = serialized.__serializer_value;
          let innerResult = deserialize(innerValue);
          if (innerResult.isErr()) {
            return innerResult;
          } else {
            return makeOk(some(innerResult.unwrap()));
          }
        } else if (serialized.__serializer_tag === 'option_none') {
          return makeOk(noneValue);
        }
      }
      let valueType = typeof serialized;
      if (
        valueType === 'string'
        || valueType === 'number'
        || valueType === 'boolean'
        || valueType === 'undefined'
        || Array.isArray(serialized)
        || serialized == null
      ) {
        return err('This object was not serialized with Serialize');
      }
      let plainObject = {};
      for (let propKey of Object.keys(serialized)) {
        if (typeof propKey == 'string') {
          let propResult = deserialize(serialized[propKey]);
          if (propResult.isErr()) {
            return propResult;
          }
          plainObject[propKey] = propResult.unwrap();
        }
      }
      return makeOk(plainObject);
    } catch {
      return err('Failed to inspect object. Not JSON?');
    }
  }
  function serialize(value) {
    let valueType = typeof value;
    if (
      valueType === 'string'
      || valueType === 'number'
      || valueType === 'boolean'
      || valueType === 'undefined'
      || value == null
    ) {
      return makeOk({
        __serializer_tag: 'primitive',
        __serializer_value: value,
      });
    }
    if (value instanceof RegExp) {
      return makeOk({
        __serializer_tag: 'regex',
        __serializer_value: value.source,
      });
    }
    if (Array.isArray(value)) {
      let itemResults = value.map(item => serialize(item));
      let firstError = itemResults
        .as_iter()
        .find(itemResult => itemResult.isErr());
      if (firstError.isSome()) {
        return firstError.unwrap();
      }
      let serializedItems = itemResults
        .as_iter()
        .map(itemResult => itemResult.unwrap())
        .toArray();
      return makeOk({
        __serializer_tag: 'array',
        __serializer_value: serializedItems,
      });
    } else if (value instanceof Map) {
      let itemResults = [...value.entries()].map(entry => serialize(entry));
      let firstError = itemResults
        .as_iter()
        .find(itemResult => itemResult.isErr());
      if (firstError.isSome()) {
        return firstError.unwrap();
      }
      let serializedItems = itemResults
        .as_iter()
        .map(itemResult => itemResult.unwrap())
        .toArray();
      return makeOk({
        __serializer_tag: 'map',
        __serializer_value: serializedItems,
      });
    } else if (value instanceof Set) {
      let itemResults = [...value.values()].map(member => serialize(member));
      let firstError = itemResults
        .as_iter()
        .find(itemResult => itemResult.isErr());
      if (firstError.isSome()) {
        return firstError.unwrap();
      }
      let serializedItems = itemResults
        .as_iter()
        .map(itemResult => itemResult.unwrap())
        .toArray();
      return makeOk({
        __serializer_tag: 'set',
        __serializer_value: serializedItems,
      });
    } else if (resultStatics.isResult(value)) {
      if (value.isOk()) {
        let innerValue = value.unwrap();
        let serializedInner = serialize(innerValue);
        if (serializedInner.isErr()) {
          return serializedInner;
        } else {
          return makeOk({
            __serializer_tag: 'result_ok',
            __serializer_value: serializedInner.unwrap(),
          });
        }
      } else {
        let innerError = value.unwrapErr();
        let serializedInner = serialize(innerError);
        if (serializedInner.isErr()) {
          return serializedInner;
        } else {
          return makeOk({
            __serializer_tag: 'result_err',
            __serializer_value: serializedInner.unwrap(),
          });
        }
      }
    } else if (optionStatics.isOption(value)) {
      if (value.isSome()) {
        let innerValue = value.unwrap();
        let serializedInner = serialize(innerValue);
        if (serializedInner.isErr()) {
          return serializedInner;
        } else {
          return makeOk({
            __serializer_tag: 'option_some',
            __serializer_value: serializedInner.unwrap(),
          });
        }
      } else {
        return makeOk({
          __serializer_tag: 'option_none',
        });
      }
    } else if (valueType === 'object') {
      let serializedObject = {};
      let source = value;
      for (let propKey of Object.keys(value)) {
        let propValue = source[propKey];
        let propResult = serialize(propValue);
        if (propResult.isErr()) {
          continue;
        }
        let serializedProp = propResult.unwrap();
        serializedObject[propKey] = serializedProp;
      }
      return makeOk(serializedObject);
    } else {
      return err('Unsupported value');
    }
  }
  function withIteratorHelpers(generatorFn) {
    Object.assign(generatorFn.prototype, {
      find: function (predicate) {
        for (let element of this) {
          if (predicate(element)) {
            return some(element);
          }
        }
        return noneValue;
      },
      count: function (predicate) {
        return this.reduce(
          (count, element) => (predicate(element) && count++, count),
          0,
        );
      },
      reduce: function (reducer, initial) {
        let accumulator = initial;
        for (let element of this) {
          accumulator = reducer(accumulator, element);
        }
        return accumulator;
      },
      every: function (predicate) {
        return !this.any(element => !predicate(element));
      },
      any: function (predicate) {
        for (let element of this) {
          if (predicate(element)) {
            return !0;
          }
        }
        return !1;
      },
      map: function (mapFn) {
        return this.filterMap(element => some(mapFn(element)));
      },
      filter: function (predicate) {
        return this.filterMap(element =>
          predicate(element) ? some(element) : noneValue,
        );
      },
      enumerate: function () {
        let self = this;
        return withIteratorHelpers(function* () {
          let index = 0;
          for (let element of self) {
            yield [index, element];
            index++;
          }
        })();
      },
      filterMap: function (mapFn) {
        let self = this;
        return withIteratorHelpers(function* () {
          for (let element of self) {
            let mapped = mapFn(element);
            if (mapped.isSome()) {
              yield mapped.unwrap();
            }
          }
        })();
      },
      sort: function (comparator) {
        let sortedArray = this.toArray();
        sortedArray.sort(comparator);
        return sortedArray;
      },
      toArray: function () {
        return [...this];
      },
    });
    return generatorFn;
  }
  if (!Array.prototype.as_iter) {
    Array.prototype.as_iter = function () {
      let collection = this;
      return withIteratorHelpers(function* () {
        for (let element of collection) {
          yield element;
        }
      })();
    };
  }
  if (!Set.prototype.as_iter) {
    Set.prototype.as_iter = function () {
      let collection = this;
      return withIteratorHelpers(function* () {
        for (let element of collection) {
          yield element;
        }
      })();
    };
  }
  if (!Map.prototype.as_iter) {
    Map.prototype.as_iter = function () {
      let collection = this;
      return withIteratorHelpers(function* () {
        for (let element of collection) {
          yield element;
        }
      })();
    };
  }
  var neverMatchRegex = /.^/;
  var videoCodecs = {
    Av1: {
      name: 'Av1',
      type: 'video',
      mimetype: /av01.*/i,
      defacto_container: 'WebM',
    },
    H264: {
      name: 'H264',
      type: 'video',
      mimetype: /avc1.*/i,
      defacto_container: 'Mp4',
    },
    H263: {
      name: 'H263',
      type: 'video',
      mimetype: neverMatchRegex,
      defacto_container: '3gp',
    },
    H265: {
      name: 'H265',
      type: 'video',
      mimetype: /(hvc1|hevc|h265|h\.265).*/i,
      defacto_container: 'Mp4',
    },
    MP4V: {
      name: 'MP4V',
      type: 'video',
      mimetype: /mp4v\.20.*/i,
      defacto_container: 'Mp4',
    },
    MPEG1: {
      name: 'MPEG1',
      type: 'video',
      mimetype: neverMatchRegex,
      defacto_container: 'Mpeg',
    },
    MPEG2: {
      name: 'MPEG2',
      type: 'video',
      mimetype: neverMatchRegex,
      defacto_container: 'Mpeg',
    },
    Theora: {
      name: 'Theora',
      type: 'video',
      mimetype: /theora/i,
      defacto_container: 'Ogg',
    },
    VP8: {
      name: 'VP8',
      type: 'video',
      mimetype: /vp0?8.*/i,
      defacto_container: 'WebM',
    },
    VP9: {
      name: 'VP9',
      type: 'video',
      mimetype: /vp0?9.*/i,
      defacto_container: 'WebM',
    },
    unknown: {
      name: 'unknown',
      type: 'video',
      mimetype: neverMatchRegex,
      defacto_container: 'Mp4',
    },
  };
  var audioCodecs = {
    AAC: {
      name: 'AAC',
      type: 'audio',
      mimetype: /(aac|mp4a.40).*/i,
      defacto_container: 'Mp4',
    },
    PCM: {
      name: 'PCM',
      type: 'audio',
      mimetype: /pcm.*/i,
      defacto_container: 'Wav',
    },
    FLAC: {
      name: 'FLAC',
      type: 'audio',
      mimetype: /flac/i,
      defacto_container: 'Flac',
    },
    MP3: {
      name: 'MP3',
      type: 'audio',
      mimetype: /(\.?mp3|mp4a\.69|mp4a\.6b).*/i,
      defacto_container: 'Mpeg',
    },
    Opus: {
      name: 'Opus',
      type: 'audio',
      mimetype: /(opus|(mp4a\.ad.*))/i,
      defacto_container: 'Ogg',
    },
    Vorbis: {
      name: 'Vorbis',
      type: 'audio',
      mimetype: /vorbis/i,
      defacto_container: 'Ogg',
    },
    Wav: {
      name: 'Wav',
      type: 'audio',
      mimetype: neverMatchRegex,
      defacto_container: 'Wav',
    },
    unknown: {
      name: 'unknown',
      type: 'audio',
      mimetype: neverMatchRegex,
      defacto_container: 'Mp4',
    },
  };
  var videoCodecList = withIteratorHelpers(function* () {
    for (let codecKey of Object.keys(videoCodecs)) {
      yield videoCodecs[codecKey];
    }
  });
  var audioCodecList = withIteratorHelpers(function* () {
    for (let codecKey of Object.keys(audioCodecs)) {
      yield audioCodecs[codecKey];
    }
  });
  function asVideoCodec(codecName) {
    if (typeof codecName == 'string' && codecName in videoCodecs) {
      return some(codecName);
    } else {
      return noneValue;
    }
  }
  var containers = {
    Mp4: {
      name: 'Mp4',
      extension: 'mp4',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: [
        'H264',
        'H265',
        'Av1',
        'MP4V',
        'MPEG2',
        'unknown',
      ],
      supported_audio_codecs: ['Opus', 'MP3', 'FLAC', 'AAC', 'unknown'],
      mimetype: /(?:x-)?mp4/i,
    },
    Mkv: {
      name: 'Mkv',
      extension: 'mkv',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: videoCodecList()
        .filter(codec => codec.name != 'unknown')
        .map(codec => codec.name)
        .toArray(),
      supported_audio_codecs: audioCodecList()
        .filter(codec => codec.name != 'unknown')
        .map(codec => codec.name)
        .toArray(),
      mimetype: /(?:x-)?matroska/i,
    },
    WebM: {
      name: 'WebM',
      extension: 'webm',
      audio_only_extension: 'oga',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: ['H264', 'VP8', 'VP9', 'Av1'],
      supported_audio_codecs: ['Opus', 'Vorbis'],
      mimetype: /(?:x-)?webm/i,
    },
    M2TS: {
      name: 'M2TS',
      extension: 'mt2s',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: [
        'H264',
        'H265',
        'Av1',
        'MP4V',
        'MPEG2',
        'VP9',
        'unknown',
      ],
      supported_audio_codecs: ['Opus', 'MP3', 'FLAC', 'AAC'],
      mimetype: /(?:x-)?mts/i,
    },
    MP2T: {
      name: 'MP2T',
      extension: 'mp2t',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: some('MP3'),
        video: some('H264'),
      },
      supported_video_codecs: ['MPEG2', 'MPEG1'],
      supported_audio_codecs: ['MP3'],
      mimetype: /(?:x-)?mp2t/i,
    },
    Flash: {
      name: 'Flash',
      extension: 'flv',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: ['H264'],
      supported_audio_codecs: ['AAC'],
      mimetype: /(?:x-)?flv/i,
    },
    M4V: {
      name: 'M4V',
      extension: 'm4v',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: ['H264', 'H265', 'Av1', 'MP4V', 'MPEG2'],
      supported_audio_codecs: ['Opus', 'MP3', 'FLAC', 'AAC'],
      mimetype: /(?:x-)?m4v/i,
    },
    M4A: {
      name: 'M4A',
      extension: 'm4a',
      other_extensions: ['aac'],
      audio_only_extension: 'm4a',
      defacto_codecs: {
        audio: some('AAC'),
        video: noneValue,
      },
      supported_video_codecs: [],
      supported_audio_codecs: ['Opus', 'MP3', 'FLAC', 'AAC', 'unknown'],
      mimetype: /(?:x-)?m4a/i,
    },
    Flac: {
      name: 'Flac',
      extension: 'flac',
      audio_only_extension: 'flac',
      defacto_codecs: {
        audio: some('FLAC'),
        video: noneValue,
      },
      supported_video_codecs: [],
      supported_audio_codecs: ['FLAC'],
      mimetype: /(?:x-)?flac/i,
    },
    Mpeg: {
      name: 'Mpeg',
      extension: 'mpeg',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: some('MP3'),
        video: some('H264'),
      },
      supported_video_codecs: ['MPEG2', 'MPEG1'],
      supported_audio_codecs: ['MP3'],
      mimetype: /(?:x-)?mpeg/i,
    },
    Ogg: {
      name: 'Ogg',
      extension: 'ogv',
      audio_only_extension: 'oga',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: ['VP9', 'VP8', 'Theora'],
      supported_audio_codecs: ['Opus', 'Vorbis', 'FLAC'],
      mimetype: /(?:x-)?og./i,
    },
    Wav: {
      name: 'Wav',
      extension: 'wav',
      audio_only_extension: 'wav',
      defacto_codecs: {
        audio: some('Wav'),
        video: noneValue,
      },
      supported_video_codecs: [],
      supported_audio_codecs: ['Wav', 'PCM'],
      mimetype: /(?:x-)?(?:pn-)?wave?/i,
    },
    '3gp': {
      name: '3gp',
      extension: '3gpp',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: ['H264', 'H263', 'MP4V', 'VP8'],
      supported_audio_codecs: ['MP3', 'AAC'],
      mimetype: /(?:x-)?3gpp2?/i,
    },
    QuickTime: {
      name: 'QuickTime',
      extension: 'mov',
      audio_only_extension: 'mp3',
      defacto_codecs: {
        audio: noneValue,
        video: noneValue,
      },
      supported_video_codecs: ['MPEG1', 'MPEG2'],
      supported_audio_codecs: [],
      mimetype: /(?:x-)?mov/i,
    },
  };
  var containerNameList = withIteratorHelpers(function* () {
    for (let containerName of Object.keys(containers)) {
      yield containerName;
    }
  });
  var containerList = withIteratorHelpers(function* () {
    for (let containerName of containerNameList()) {
      yield containers[containerName];
    }
  });
  function asContainer(containerName) {
    if (typeof containerName == 'string' && containerName in containers) {
      return some(containerName);
    } else {
      return noneValue;
    }
  }
  var videoQualities = {
    240: {
      id: '240',
      loose_name: 'Small',
    },
    360: {
      id: '360',
      loose_name: 'SD',
    },
    480: {
      id: '480',
      loose_name: 'SD',
    },
    720: {
      id: '720',
      loose_name: 'HD',
    },
    1080: {
      id: '1080',
      loose_name: 'FullHD',
    },
    1440: {
      id: '1440',
      loose_name: 'UHD',
    },
    2160: {
      id: '2160',
      loose_name: '4K',
    },
    4320: {
      id: '4320',
      loose_name: '8K',
    },
  };
  var qualityIdList = withIteratorHelpers(function* () {
    for (let qualityId of Object.keys(videoQualities)) {
      yield qualityId;
    }
  });
  var qualityList = withIteratorHelpers(function* () {
    for (let qualityId of qualityIdList()) {
      yield videoQualities[qualityId];
    }
  });
  function asVideoQuality(quality) {
    if (typeof quality == 'string') {
      return qualityIdList().find(qualityId => qualityId == quality);
    }
    if (typeof quality == 'number') {
      let qualityString = quality.toString();
      return asVideoQuality(qualityString);
    }
    return noneValue;
  }
  function defaultMediaPrefs() {
    return {
      prefer_60fps: !0,
      ignore_low_quality_hits: !0,
      max_variants: 3,
      container: 'Mp4',
      video_codec: 'H264',
      best_video_quality: '4320',
      lowest_video_quality: '480',
      ignored_containers: [],
      ignored_video_codecs: [],
    };
  }
  function serializePrefs(prefs) {
    return serialize(prefs).unwrap();
  }
  function normalizePrefs(stored) {
    let parsed = deserialize(stored).unwrapOr({});
    let defaults = defaultMediaPrefs();
    let container = asContainer(parsed.container).unwrapOr(defaults.container);
    let videoCodec = asVideoCodec(parsed.video_codec).unwrapOr(
      defaults.video_codec,
    );
    let bestQuality = asVideoQuality(parsed.best_video_quality).unwrapOr(
      defaults.best_video_quality,
    );
    let lowestQuality = asVideoQuality(parsed.lowest_video_quality).unwrapOr(
      defaults.lowest_video_quality,
    );
    let preferedQuality;
    if ('prefered_video_quality' in parsed) {
      let preferedQualityOpt = asVideoQuality(parsed.prefered_video_quality);
      if (preferedQualityOpt.isSome()) {
        preferedQuality = preferedQualityOpt.unwrap();
      }
    }
    let maxVariants = defaults.max_variants;
    if (typeof parsed.max_variants == 'number') {
      let variantsValue = parsed.max_variants;
      if (
        Number.isInteger(variantsValue)
        && variantsValue <= 11
        && variantsValue > 0
      ) {
        maxVariants = variantsValue;
      }
    }
    let prefer60fps = defaults.prefer_60fps;
    if (typeof parsed.prefer_60fps == 'boolean') {
      prefer60fps = parsed.prefer_60fps;
    }
    let ignoreLowQuality = defaults.ignore_low_quality_hits;
    if (typeof parsed.ignore_low_quality_hits == 'boolean') {
      ignoreLowQuality = parsed.ignore_low_quality_hits;
    }
    let ignoredContainers = [];
    if (Array.isArray(parsed.ignored_containers)) {
      for (let ignoredContainerName of parsed.ignored_containers) {
        let validatedContainer = asContainer(ignoredContainerName);
        if (validatedContainer.isSome()) {
          ignoredContainers.push(validatedContainer.unwrap());
        }
      }
    }
    let ignoredCodecs = [];
    if (Array.isArray(parsed.ignored_video_codecs)) {
      for (let ignoredCodecName of parsed.ignored_video_codecs) {
        let validatedCodec = asVideoCodec(ignoredCodecName);
        if (validatedCodec.isSome()) {
          ignoredCodecs.push(validatedCodec.unwrap());
        }
      }
    }
    let normalized = {
      prefer_60fps: prefer60fps,
      ignore_low_quality_hits: ignoreLowQuality,
      container: container,
      max_variants: maxVariants,
      video_codec: videoCodec,
      lowest_video_quality: lowestQuality,
      best_video_quality: bestQuality,
      ignored_containers: ignoredContainers,
      ignored_video_codecs: ignoredCodecs,
    };
    if (typeof preferedQuality < 'u') {
      normalized.prefered_video_quality = preferedQuality;
    }
    return normalized;
  }
  var browserPolyfillModule = toEsm(requirePolyfill(), 1);
  async function clearStoredPref(prefDescriptor) {
    await browserPolyfill.storage[prefDescriptor.where].remove(
      prefDescriptor.name,
    );
  }
  var mediaUserPrefDescriptor = {
    name: 'media_user_pref',
    where: 'local',
    default: () => defaultMediaPrefs(),
    hooks: {
      setter: prefs => serializePrefs(prefs),
      getter: stored => normalizePrefs(stored),
    },
  };
  weh.is_safe.then(() => {
    let rootReducer = combineReducers({
      prefs: prefsSettingsReducer,
    });
    let store = createStore(rootReducer);
    listenPrefs(store);
    window.UseNewUIButton = class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }
      enableNewUI() {
        return () =>
          browser.storage.local.set({
            use_legacy_ui: !1,
          });
      }
      render() {
        return React.createElement(
          'button',
          {
            onClick: this.enableNewUI(),
            style: {
              marginRight: '12px',
            },
            className: 'btn btn-outline-secondary float-right',
          },
          'Enable New UI',
        );
      }
    };
    window.CompactViewCheckbox = class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isCompactViewEnabled: !0,
        };
        this.handleStorageChange = this.handleStorageChange.bind(this);
        this.syncCompactViewPreference =
          this.syncCompactViewPreference.bind(this);
      }
      componentDidMount() {
        this.syncCompactViewPreference();
        browser.storage.onChanged.addListener(this.handleStorageChange);
      }
      componentWillUnmount() {
        browser.storage.onChanged.removeListener(this.handleStorageChange);
      }
      async syncCompactViewPreference() {
        let { use_wide_ui: useWideUi = !1 } =
          await browser.storage.local.get('use_wide_ui');
        this.setState({
          isCompactViewEnabled: !useWideUi,
        });
      }
      handleStorageChange(changes, areaName) {
        if (areaName !== 'local' || !changes.use_wide_ui) {
          return;
        }
        let newWideUi =
          typeof changes.use_wide_ui.newValue == 'boolean'
            ? changes.use_wide_ui.newValue
            : !1;
        this.setState({
          isCompactViewEnabled: !newWideUi,
        });
      }
      setCompactView() {
        return event => {
          browser.storage.local.set({
            use_wide_ui: !event.target.checked,
          });
        };
      }
      render() {
        return React.createElement(
          'div',
          {
            style: {
              marginBottom: '1rem',
            },
          },
          React.createElement(
            'label',
            {
              style: {
                alignItems: 'center',
                cursor: 'pointer',
                display: 'inline-flex',
              },
            },
            React.createElement('input', {
              checked: this.state.isCompactViewEnabled,
              onChange: this.setCompactView(),
              style: {
                marginRight: '8px',
              },
              type: 'checkbox',
            }),
            'Compact view in the new UI',
          ),
        );
      }
    };
    function rpcCaller(...rpcArgs) {
      return () => {
        weh.rpc.call(...rpcArgs);
      };
    }
    let directoryInputMixin = {
      renderInput: function () {
        var self = this;
        return React.createElement(
          'div',
          {
            className: 'input-group',
            id: 'weh-param-' + self.paramIndex,
          },
          React.createElement('input', {
            ref: inputEl => {
              if (inputEl) {
                inputEl.value = self.state.value;
              }
            },
            onChange: directoryInputMixin.onChange.bind(self),
            className: 'form-control',
          }),
          React.createElement(
            'span',
            {
              className: 'input-group-btn',
            },
            React.createElement(
              'button',
              {
                className: 'btn',
                onClick: () => directoryInputMixin.selectDirectory.call(self),
              },
              weh._('change'),
            ),
          ),
        );
      },
      selectDirectory: function () {
        var self = this;
        weh.rpc.call('selectDirectory', this.state.value).then(selection => {
          if (selection) {
            self.setCustomValue(selection.directory);
          }
        });
      },
      onChange: function (event) {
        var self = this;
        var inputEl = event.target;
        weh.rpc
          .call('coappProxy', 'path.homeJoin', inputEl.value)
          .then(
            homePath => (
              (inputEl.value = homePath),
              self.setCustomValue(homePath),
              weh.rpc.call('coappProxy', 'fs.stat', homePath)
            ),
          )
          .then(stat => {
            if (!stat || stat.mode & !1) {
              throw new Error();
            }
            inputEl.style.backgroundColor = '#e8ffe8';
          })
          .catch(() => {
            inputEl.style.backgroundColor = '#ffe8e8';
          });
      },
    };
    class SettingsPage extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          activeTab: 'general',
          moreOpen: !1,
          conversion: void 0,
          modal: null,
        };
        this.fileInputChange = this.fileInputChange.bind(this);
      }
      setActiveTab(tabName) {
        this.setState({
          activeTab: tabName,
          conversion: !1,
        });
      }
      local(methodName, ...methodArgs) {
        var self = this;
        return () => {
          self[methodName].apply(self, methodArgs);
        };
      }
      toggleMore() {
        var self = this;
        return () => {
          self.setState({
            moreOpen: !self.state.moreOpen,
          });
        };
      }
      closeModal() {
        this.setState({
          modal: null,
        });
      }
      conversion() {
        var self = this;
        return () => {
          self.setState({
            activeTab: 'general',
            conversion: !0,
          });
        };
      }
      reloadAddon() {
        var self = this;
        return () => {
          self.setState({
            modal: {
              title: weh._('confirmation_required'),
              body: weh._('reload_addon_confirm'),
              buttons: [
                {
                  text: weh._('cancel'),
                  color: 'secondary',
                  click: (() => {
                    this.closeModal();
                  }).bind(self),
                },
                {
                  text: weh._('reload_addon'),
                  color: 'danger',
                  click: (() => {
                    weh.rpc.call('reloadAddon');
                    this.closeModal();
                  }).bind(self),
                },
              ],
            },
          });
        };
      }
      import() {
        var self = this;
        return () => {
          self.fileInput.click();
        };
      }
      reset() {
        var self = this;
        var resetOptions = {
          prefs: !0,
          backlist: !1,
          outputconfigs: !1,
        };
        function makeOptionToggler(optionKey) {
          return event => {
            resetOptions[optionKey] = event.target.checked;
          };
        }
        return () => {
          self.setState({
            modal: {
              title: weh._('reset_settings'),
              body: React.createElement(
                'div',
                {
                  className: 'reset-settings',
                },
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    defaultChecked: resetOptions.prefs,
                    onChange: makeOptionToggler('prefs'),
                    className: 'form-control',
                    type: 'checkbox',
                    id: 'reset-prefs',
                  }),
                  React.createElement(
                    'label',
                    {
                      className: 'col-8 col-form-label',
                      htmlFor: 'reset-prefs',
                    },
                    weh._('preferences'),
                  ),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    defaultChecked: resetOptions.blacklist,
                    onChange: makeOptionToggler('blacklist'),
                    className: 'form-control',
                    type: 'checkbox',
                    id: 'reset-blacklist',
                  }),
                  React.createElement(
                    'label',
                    {
                      className: 'col-8 col-form-label',
                      htmlFor: 'reset-blacklist',
                    },
                    weh._('blacklist'),
                  ),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    defaultChecked: resetOptions.smartnaming,
                    onChange: makeOptionToggler('smartnaming'),
                    className: 'form-control',
                    type: 'checkbox',
                    id: 'reset-smartnaming',
                  }),
                  React.createElement(
                    'label',
                    {
                      className: 'col-8 col-form-label',
                      htmlFor: 'reset-smartnaming',
                    },
                    weh._('smartnaming_rules'),
                  ),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    defaultChecked: resetOptions.outputconfigs,
                    onChange: makeOptionToggler('outputconfigs'),
                    className: 'form-control',
                    type: 'checkbox',
                    id: 'reset-outputconfigs',
                  }),
                  React.createElement(
                    'label',
                    {
                      className: 'col-8 col-form-label',
                      htmlFor: 'reset-outputconfigs',
                    },
                    weh._('conversion_outputs'),
                  ),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    defaultChecked: resetOptions.convrules,
                    onChange: makeOptionToggler('convrules'),
                    className: 'form-control',
                    type: 'checkbox',
                    id: 'reset-convrules',
                  }),
                  React.createElement(
                    'label',
                    {
                      className: 'col-8 col-form-label',
                      htmlFor: 'reset-convrules',
                    },
                    weh._('conversion_rules'),
                  ),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    defaultChecked: resetOptions[MUP_KEY],
                    onChange: makeOptionToggler(MUP_KEY),
                    className: 'form-control',
                    type: 'checkbox',
                    id: 'reset-media-user-prefs',
                  }),
                  React.createElement(
                    'label',
                    {
                      className: 'col-8 col-form-label',
                      htmlFor: 'reset-media-user-prefs',
                    },
                    weh._('video_qualities'),
                  ),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    defaultChecked: resetOptions.license,
                    onChange: makeOptionToggler('license'),
                    className: 'form-control',
                    type: 'checkbox',
                    id: 'reset-license',
                  }),
                  React.createElement(
                    'label',
                    {
                      className: 'col-8 col-form-label',
                      htmlFor: 'reset-license',
                    },
                    weh._('license'),
                  ),
                ),
              ),
              buttons: [
                {
                  text: weh._('cancel'),
                  color: 'secondary',
                  click: (() => {
                    this.closeModal();
                  }).bind(self),
                },
                {
                  text: weh._('reset_settings'),
                  color: 'danger',
                  click: (() => {
                    this.doReset(resetOptions);
                    this.closeModal();
                  }).bind(self),
                },
              ],
            },
          });
        };
      }
      doReset(resetOptions) {
        if (resetOptions.prefs) {
          store.dispatch({
            type: 'PREFS_RESET',
          });
          store.dispatch({
            type: 'PREFS_UPDATED',
            payload: {},
          });
          store.dispatch({
            type: 'PREFS_SAVE',
            payload: {},
          });
        }
        if (resetOptions.blacklist) {
          weh.rpc.call('setBlacklist', {});
        }
        if (resetOptions.smartnaming) {
          weh.rpc.call('setSmartName', {});
        }
        if (resetOptions.outputconfigs) {
          weh.rpc.call('setOutputConfigs', {});
        }
        if (resetOptions.convrules) {
          weh.rpc.call('setConversionRules', []);
        }
        if (resetOptions[MUP_KEY]) {
          clearStoredPref(mediaUserPrefDescriptor);
        }
        if (resetOptions.license) {
          weh.rpc.call('setLicense', null);
        }
      }
      fileInputChange(event) {
        var self = this;
        var selectedFile = self.fileInput.files[0];
        if (selectedFile) {
          var reader = new FileReader();
          reader.onload = loadEvent => {
            try {
              var parsedSettings = JSON.parse(loadEvent.target.result);
              weh.rpc
                .call('importSettings', parsedSettings)
                .then(updatedPrefs => {
                  Object.keys(updatedPrefs).forEach(prefName => {
                    store.dispatch({
                      type: 'PREF_UPDATE',
                      payload: {
                        prefName: prefName,
                        value: updatedPrefs[prefName],
                      },
                    });
                  });
                });
            } catch {
              self.setState({
                modal: {
                  title: weh._('error'),
                  body: weh._('import_invalid_format'),
                  buttons: [
                    {
                      text: weh._('continue'),
                      color: 'secondary',
                      click: (() => {
                        this.closeModal();
                      }).bind(self),
                    },
                  ],
                },
              });
            }
          };
          reader.readAsText(selectedFile);
        }
      }
      setFileInput(refElement) {
        var self = this;
        return node => {
          if (node) {
            node.removeEventListener('change', self.fileInputChange);
          }
          self.fileInput = node;
          if (node) {
            node.addEventListener('change', self.fileInputChange);
          }
        };
      }
      renderTabGeneral() {
        return React.createElement(
          TabPane,
          {
            tabId: 'general',
          },
          !this.state.conversion
            && React.createElement(
              'div',
              null,
              React.createElement(CopyButton, null),
              React.createElement(UseNewUIButton, null),
              React.createElement(AddonInfoPanel, null),
              React.createElement(PlatformInfoPanel, null),
              React.createElement(CoAppInfoPanel, null),
            ),
          React.createElement(LicInfoPanel, {
            open: this.state.conversion,
          }),
        );
      }
      renderTabAppearance() {
        return React.createElement(
          TabPane,
          {
            tabId: 'appearance',
          },
          React.createElement(CompactViewCheckbox, null),
          React.createElement(WehParam, {
            prefName: 'titleMode',
          }),
          React.createElement(WehParam, {
            prefName: 'iconActivation',
          }),
          React.createElement(WehParam, {
            prefName: 'iconBadge',
          }),
          React.createElement(WehParam, {
            prefName: 'hitsGotoTab',
          }),
          React.createElement(WehParam, {
            prefName: 'notifyReady',
          }),
          React.createElement(WehParam, {
            prefName: 'noPrivateNotification',
          }),
          React.createElement(WehParam, {
            prefName: 'fileDialogType',
          }),
          React.createElement(WehParam, {
            prefName: 'alertDialogType',
          }),
          React.createElement(WehParam, {
            prefName: 'dialogAutoClose',
          }),
          React.createElement(WehParam, {
            prefName: 'contextMenuEnabled',
          }),
          weh.isBrowser('firefox')
            && React.createElement(WehParam, {
              prefName: 'toolsMenuEnabled',
            }),
        );
      }
      renderTabBehavior() {
        return React.createElement(
          TabPane,
          {
            tabId: 'behavior',
          },
          React.createElement(WehParam, {
            prefName: 'coappDownloads',
          }),
          React.createElement(WehParam, {
            prefName: 'lastDownloadDirectory',
            renderInput: directoryInputMixin.renderInput,
          }),
          React.createElement(WehParam, {
            prefName: 'rememberLastDir',
          }),
          React.createElement(WehParam, {
            prefName: 'networkProbe',
          }),
          React.createElement(WehParam, {
            prefName: 'use_native_filepicker',
          }),
          React.createElement(WehParam, {
            prefName: 'monitorNetworkRequests',
          }),
          React.createElement(WehParam, {
            prefName: 'smartnamerFnameSpaces',
          }),
          React.createElement(WehParam, {
            prefName: 'smartnamerFnameMaxlen',
          }),
          React.createElement(WehParam, {
            prefName: 'downloadControlledMax',
          }),
          React.createElement(WehParam, {
            prefName: 'downloadStreamControlledMax',
          }),
          React.createElement(WehParam, {
            prefName: 'convertControlledMax',
          }),
          React.createElement(WehParam, {
            prefName: 'autoPin',
          }),
          React.createElement(WehParam, {
            prefName: 'mediaExtensions',
          }),
          React.createElement(WehParam, {
            prefName: 'coappRestartDelay',
          }),
          React.createElement(WehParam, {
            prefName: 'coappIdleExit',
          }),
          React.createElement(WehParam, {
            prefName: 'dashHideM4s',
          }),
          React.createElement(WehParam, {
            prefName: 'mpegtsHideTs',
          }),
          React.createElement(WehParam, {
            prefName: 'orphanExpiration',
          }),
          React.createElement(WehParam, {
            prefName: 'chunksEnabled',
          }),
          React.createElement(WehParam, {
            prefName: 'hlsEnabled',
          }),
          React.createElement(WehParam, {
            prefName: 'dashEnabled',
          }),
          React.createElement(WehParam, {
            prefName: 'dashOnAdp',
          }),
          React.createElement(WehParam, {
            prefName: 'hlsDownloadAsM2ts',
          }),
          React.createElement(WehParam, {
            prefName: 'hlsRememberPrevLiveChunks',
          }),
          React.createElement(WehParam, {
            prefName: 'hlsEndTimeout',
          }),
          React.createElement(WehParam, {
            prefName: 'chunkedCoappManifestsRequests',
          }),
          React.createElement(WehParam, {
            prefName: 'chunkedCoappDataRequests',
          }),
          React.createElement(WehParam, {
            prefName: 'coappUseProxy',
          }),
          React.createElement(WehParam, {
            prefName: 'checkCoappOnStartup',
          }),
          React.createElement(WehParam, {
            prefName: 'networkFilterOut',
          }),
          React.createElement(WehParam, {
            prefName: 'mediaweightThreshold',
          }),
          React.createElement(WehParam, {
            prefName: 'mediaweightMinSize',
          }),
          React.createElement(WehParam, {
            prefName: 'converterThreads',
          }),
          React.createElement(WehParam, {
            prefName: 'converterAggregTuneH264',
          }),
          React.createElement(WehParam, {
            prefName: 'avplayEnabled',
          }),
          React.createElement(WehParam, {
            prefName: 'blacklistEnabled',
          }),
          React.createElement(WehParam, {
            prefName: 'chunksConcurrentDownloads',
          }),
          React.createElement(WehParam, {
            prefName: 'chunksPrefetchCount',
          }),
          React.createElement(WehParam, {
            prefName: 'downloadRetries',
          }),
          React.createElement(WehParam, {
            prefName: 'downloadRetryDelay',
          }),
          React.createElement(WehParam, {
            prefName: 'converterKeepTmpFiles',
          }),
          React.createElement(WehParam, {
            prefName: 'contentRedirectEnabled',
          }),
          React.createElement(WehParam, {
            prefName: 'bulkEnabled',
          }),
          React.createElement(WehParam, {
            prefName: 'galleryNaming',
          }),
          React.createElement(WehParam, {
            prefName: 'tbvwsExtractionMethod',
          }),
        );
      }
      renderTabGallery() {
        return React.createElement(
          TabPane,
          {
            tabId: 'gallery',
          },
          React.createElement(WehParam, {
            prefName: 'medialinkAutoDetect',
          }),
          React.createElement(WehParam, {
            prefName: 'medialinkMinImgSize',
          }),
          React.createElement(WehParam, {
            prefName: 'medialinkMinFilesPerGroup',
          }),
          React.createElement(WehParam, {
            prefName: 'medialinkMaxHits',
          }),
          React.createElement(WehParam, {
            prefName: 'medialinkExtensions',
          }),
          React.createElement(WehParam, {
            prefName: 'medialinkScanImages',
          }),
          React.createElement(WehParam, {
            prefName: 'medialinkScanLinks',
          }),
        );
      }
      renderSettings() {
        return React.createElement(
          'div',
          null,
          React.createElement(
            Nav,
            {
              tabs: !0,
            },
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  href: '#',
                  className:
                    this.state.activeTab === 'general' && !this.state.conversion
                      ? 'active'
                      : '',
                  onClick: this.local('setActiveTab', 'general'),
                },
                weh._('general'),
              ),
            ),
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  href: '#',
                  className:
                    this.state.activeTab === 'appearance' ? 'active' : '',
                  onClick: this.local('setActiveTab', 'appearance'),
                },
                weh._('appearance'),
              ),
            ),
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  href: '#',
                  className:
                    this.state.activeTab === 'behavior' ? 'active' : '',
                  onClick: this.local('setActiveTab', 'behavior'),
                },
                weh._('behavior'),
              ),
            ),
            React.createElement(
              Dropdown,
              {
                nav: !0,
                isOpen: this.state.moreOpen,
                toggle: this.toggleMore(),
              },
              React.createElement(
                DropdownToggle,
                {
                  nav: !0,
                  caret: !0,
                },
                weh._('more'),
              ),
              React.createElement(
                DropdownMenu,
                null,
                React.createElement(
                  DropdownItem,
                  {
                    onClick: this.local('setActiveTab', 'gallery'),
                  },
                  weh._('gallery'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: rpcCaller('editConverterConfigs'),
                  },
                  weh._('conversion_outputs'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: rpcCaller('editConversionRules'),
                  },
                  weh._('conversion_rules'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: rpcCaller('editBlacklist'),
                  },
                  weh._('blacklist'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: rpcCaller('editSmartName'),
                  },
                  weh._('smartnaming_rules'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: rpcCaller('editMediaUserPrefs'),
                  },
                  weh._('video_qualities'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: this.conversion(),
                  },
                  weh._('licensing'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: rpcCaller('openTranslation'),
                  },
                  weh._('translation'),
                ),
                weh.unsafe_prefs.coappShellEnabled
                  && React.createElement(
                    DropdownItem,
                    {
                      onClick: rpcCaller('openCoapp'),
                    },
                    weh._('coapp'),
                  ),
                React.createElement(DropdownItem, {
                  divider: !0,
                }),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: rpcCaller('exportSettings'),
                  },
                  weh._('export'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: this.import(),
                  },
                  weh._('import'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: this.reloadAddon(),
                  },
                  weh._('reload_addon'),
                ),
                React.createElement(
                  DropdownItem,
                  {
                    onClick: this.reset(),
                  },
                  weh._('reset_settings'),
                ),
              ),
            ),
          ),
          React.createElement(
            TabContent,
            {
              activeTab: this.state.activeTab,
            },
            this.renderTabGeneral(),
            this.renderTabAppearance(),
            this.renderTabBehavior(),
            this.renderTabGallery(),
          ),
        );
      }
      renderPrefsControls() {
        return React.createElement(
          'div',
          {
            className: 'btn-toolbar justify-content-end',
          },
          React.createElement(
            'div',
            {
              className: 'btn-group pull-right',
            },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: this.props.cancel,
                className:
                  'btn btn-default '
                  + (this.props.flags.isModified ? '' : 'disabled'),
              },
              weh._('cancel'),
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: this.props.reset,
                className:
                  'btn btn-warning '
                  + (this.props.flags.isDefault ? 'disabled' : ''),
              },
              weh._('default'),
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: this.props.save,
                className:
                  'btn btn-primary '
                  + (this.props.flags.isModified && this.props.flags.isValid
                    ? ''
                    : 'disabled'),
              },
              weh._('save'),
            ),
          ),
        );
      }
      render() {
        return React.createElement(
          PrefsSettingsApp,
          null,
          React.createElement(WehHeader, null),
          React.createElement(
            'main',
            null,
            React.createElement(
              'div',
              {
                className: 'container settings',
              },
              React.createElement('section', null, this.renderSettings()),
            ),
          ),
          this.state.activeTab != 'general'
            && React.createElement(
              'footer',
              null,
              React.createElement(WehPrefsControls, {
                render: this.renderPrefsControls,
              }),
            ),
          React.createElement('input', {
            type: 'file',
            style: {
              display: 'none',
            },
            accept: 'application/json',
            ref: this.setFileInput(),
          }),
          React.createElement(VDHModal, {
            modalData: this.state.modal,
            close: this.closeModal.bind(this),
          }),
        );
      }
    }
    render(
      React.createElement(
        Provider,
        {
          store: store,
        },
        React.createElement(SettingsPage, null),
      ),
      document.getElementById('root'),
    );
    weh.setPageTitle(weh._('settings'));
  });
})();
