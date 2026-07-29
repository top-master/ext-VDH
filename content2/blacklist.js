import '../vendor/ts-results.js';
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
                      value = wrapMethod(target, target[prop], wrappers[prop]);
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
                    let resultIsThenable = result !== !0 && isThenable(result);
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
var noneValue = globalThis.tsResults.None;
Object.freeze(noneValue);
var SomeImpl = globalThis.tsResults.Some;
var someOf = SomeImpl;

var awaiter = function (thisArg, argsList, promiseConstructor, generatorFn) {
  function adopt(pendingValue) {
    if (pendingValue instanceof promiseConstructor) {
      return pendingValue;
    } else {
      return new promiseConstructor(function (resolveAdopted) {
        resolveAdopted(pendingValue);
      });
    }
  }
  return new (promiseConstructor || (promiseConstructor = Promise))(function (
    resolve,
    reject,
  ) {
    function fulfilled(sentValue) {
      try {
        step(generatorFn.next(sentValue));
      } catch (caught) {
        reject(caught);
      }
    }
    function rejected(thrownReason) {
      try {
        step(generatorFn.throw(thrownReason));
      } catch (caught) {
        reject(caught);
      }
    }
    function step(iterationResult) {
      if (iterationResult.done) {
        resolve(iterationResult.value);
      } else {
        adopt(iterationResult.value).then(fulfilled, rejected);
      }
    }
    step((generatorFn = generatorFn.apply(thisArg, argsList || [])).next());
  });
};
function makeIterable(generatorFn) {
  Object.assign(generatorFn.prototype, {
    find: function (predicate) {
      for (let item of this) {
        if (predicate(item)) {
          return someOf(item);
        }
      }
      return noneValue;
    },
    count: function (predicate) {
      return this.reduce(
        (runningCount, item) => (
          predicate(item) && runningCount++,
          runningCount
        ),
        0,
      );
    },
    reduce: function (reducer, initial) {
      let accumulator = initial;
      for (let item of this) {
        accumulator = reducer(accumulator, item);
      }
      return accumulator;
    },
    every: function (predicate) {
      return !this.any(item => !predicate(item));
    },
    any: function (predicate) {
      for (let item of this) {
        if (predicate(item)) {
          return !0;
        }
      }
      return !1;
    },
    map: function (transform) {
      return this.filterMap(item => someOf(transform(item)));
    },
    filter: function (predicate) {
      return this.filterMap(item =>
        predicate(item) ? someOf(item) : noneValue,
      );
    },
    enumerate: function () {
      let source = this;
      return makeIterable(function* () {
        let index = 0;
        for (let item of source) {
          yield [index, item];
          index++;
        }
      })();
    },
    filterMap: function (transform) {
      let source = this;
      return makeIterable(function* () {
        for (let item of source) {
          let mappedOption = transform(item);
          if (mappedOption.isSome()) {
            yield mappedOption.unwrap();
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
    let source = this;
    return makeIterable(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Set.prototype.as_iter) {
  Set.prototype.as_iter = function () {
    let source = this;
    return makeIterable(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Map.prototype.as_iter) {
  Map.prototype.as_iter = function () {
    let source = this;
    return makeIterable(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
var neverMatch = /.^/;
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
    mimetype: neverMatch,
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
    mimetype: neverMatch,
    defacto_container: 'Mpeg',
  },
  MPEG2: {
    name: 'MPEG2',
    type: 'video',
    mimetype: neverMatch,
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
    mimetype: neverMatch,
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
    mimetype: neverMatch,
    defacto_container: 'Wav',
  },
  unknown: {
    name: 'unknown',
    type: 'audio',
    mimetype: neverMatch,
    defacto_container: 'Mp4',
  },
};
var iterateVideoCodecs = makeIterable(function* () {
  for (let codecKey of Object.keys(videoCodecs)) {
    yield videoCodecs[codecKey];
  }
});
var iterateAudioCodecs = makeIterable(function* () {
  for (let codecKey of Object.keys(audioCodecs)) {
    yield audioCodecs[codecKey];
  }
});
var containerFormats = {
  Mp4: {
    name: 'Mp4',
    extension: 'mp4',
    audio_only_extension: 'mp3',
    defacto_codecs: {
      audio: noneValue,
      video: noneValue,
    },
    supported_video_codecs: ['H264', 'H265', 'Av1', 'MP4V', 'MPEG2', 'unknown'],
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
    supported_video_codecs: iterateVideoCodecs()
      .filter(codec => codec.name != 'unknown')
      .map(codec => codec.name)
      .toArray(),
    supported_audio_codecs: iterateAudioCodecs()
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
      audio: someOf('MP3'),
      video: someOf('H264'),
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
      audio: someOf('AAC'),
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
      audio: someOf('FLAC'),
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
      audio: someOf('MP3'),
      video: someOf('H264'),
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
      audio: someOf('Wav'),
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
var iterateContainerNames = makeIterable(function* () {
  for (let containerName of Object.keys(containerFormats)) {
    yield containerName;
  }
});
var iterateContainers = makeIterable(function* () {
  for (let containerName of iterateContainerNames()) {
    yield containerFormats[containerName];
  }
});
var resolutions = {
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
var iterateResolutionKeys = makeIterable(function* () {
  for (let resolutionKey of Object.keys(resolutions)) {
    yield resolutionKey;
  }
});
var iterateResolutions = makeIterable(function* () {
  for (let resolutionKey of iterateResolutionKeys()) {
    yield resolutions[resolutionKey];
  }
});
var browserPolyfillNamespace = toEsm(requirePolyfill(), 1);
async function writeSetting(setting, value) {
  let transformedValue = value;
  if (setting.hooks) {
    transformedValue = setting.hooks.setter(value);
  }
  await browserPolyfill.storage[setting.where].set({
    [setting.name]: transformedValue,
  });
}
async function readSetting(setting) {
  let stored = await browserPolyfill.storage[setting.where].get(setting.name);
  if (setting.name in stored) {
    let rawValue = stored[setting.name];
    if (setting.hooks) {
      return setting.hooks.getter(rawValue, setting);
    } else {
      return rawValue;
    }
  }
  return setting.default();
}
async function removeSetting(setting) {
  await browserPolyfill.storage[setting.where].remove(setting.name);
}
var viewOptionsSetting = {
  name: 'view_options',
  default: () => ({}),
  where: 'session',
};
var blacklistSetting = {
  name: 'blacklist',
  default: () => [],
  where: 'local',
  hooks: {
    setter: entries => entries.filter(entry => entry.length > 0),
    getter: stored => stored,
  },
};
var i18nPolyfill = toEsm(requirePolyfill(), 1);
function escapeHtml(text) {
  if (text) {
    return text
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  } else {
    return '';
  }
}
function getI18nMessage(messageKey, substitutions, localStrings) {
  let reportMissing = () => (
    console.error(`Requesting unknown i18n string ${messageKey}`),
    messageKey
  );
  substitutions = substitutions
    .map(substitution => substitution.toString())
    .map(escapeHtml);
  try {
    if (messageKey in localStrings) {
      let messageText = localStrings[messageKey];
      let placeholderIndex = 1;
      for (
        let substitutionIndex = 0;
        substitutionIndex < substitutions.length;
        substitutionIndex++
      ) {
        messageText = messageText.replace(
          `$${placeholderIndex}`,
          substitutions[substitutionIndex],
        );
      }
      return messageText;
    } else {
      let message = i18nPolyfill.default.i18n.getMessage(
        messageKey,
        substitutions,
      );
      return message || reportMissing();
    }
  } catch {
    return reportMissing();
  }
}
function localizeElements(root, localStrings) {
  for (let element of Array.from(root.querySelectorAll('[data-i18n]'))) {
    let argsJson = element.dataset.i18nArgs;
    let attrName = element.dataset.i18nAttr;
    let translated;
    if (argsJson) {
      translated = getI18nMessage(
        element.dataset.i18n,
        JSON.parse(argsJson),
        localStrings,
      );
    } else {
      translated = getI18nMessage(element.dataset.i18n, [], localStrings);
    }
    if (attrName) {
      element.setAttribute(attrName, translated);
    } else {
      element.textContent = translated;
    }
  }
}
async function loadBlacklist() {
  let blacklistEntries = await readSetting(blacklistSetting);
  let textarea = document.querySelector('#core > sl-textarea');
  textarea.value = blacklistEntries.join(`
`);
}
async function handleClick(event) {
  let target = event.target;
  if (target) {
    let resetButton = target.closest('#button-reset');
    let saveButton = target.closest('#button-save');
    if (
      (resetButton && (removeSetting(blacklistSetting), loadBlacklist()),
      saveButton)
    ) {
      let textarea = document.querySelector('#core > sl-textarea');
      writeSetting(
        blacklistSetting,
        textarea.value.split(`
`),
      );
    }
  }
}
loadBlacklist();
var viewOptions = await readSetting(viewOptionsSetting);
localizeElements(document, viewOptions);
window.addEventListener('click', handleClick);
