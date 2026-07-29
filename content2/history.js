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
var browserRuntime = toEsm(requirePolyfill(), 1);
var browserI18n = toEsm(requirePolyfill(), 1);
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
function localizeMessage(messageKey, substitutions, localMessages) {
  let reportMissing = () => (
    console.error(`Requesting unknown i18n string ${messageKey}`),
    messageKey
  );
  substitutions = substitutions
    .map(substitution => substitution.toString())
    .map(escapeHtml);
  try {
    if (messageKey in localMessages) {
      let resolvedMessage = localMessages[messageKey];
      let placeholderIndex = 1;
      for (let argIndex = 0; argIndex < substitutions.length; argIndex++) {
        resolvedMessage = resolvedMessage.replace(
          `$${placeholderIndex}`,
          substitutions[argIndex],
        );
      }
      return resolvedMessage;
    } else {
      let browserMessage = browserI18n.default.i18n.getMessage(
        messageKey,
        substitutions,
      );
      return browserMessage || reportMissing();
    }
  } catch {
    return reportMissing();
  }
}
function applyI18n(rootElement, i18nMessages) {
  for (let element of Array.from(rootElement.querySelectorAll('[data-i18n]'))) {
    let i18nArgsRaw = element.dataset.i18nArgs;
    let i18nAttr = element.dataset.i18nAttr;
    let translatedText;
    if (i18nArgsRaw) {
      translatedText = localizeMessage(
        element.dataset.i18n,
        JSON.parse(i18nArgsRaw),
        i18nMessages,
      );
    } else {
      translatedText = localizeMessage(element.dataset.i18n, [], i18nMessages);
    }
    if (i18nAttr) {
      element.setAttribute(i18nAttr, translatedText);
    } else {
      element.textContent = translatedText;
    }
  }
}
function formatRelativeDate(dateInput, localMessages) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let entryDate = new Date(dateInput);
  entryDate.setHours(0, 0, 0, 0);
  let todayMs = today.getTime();
  let entryMs = entryDate.getTime();
  let daysAgo = Math.floor((todayMs - entryMs) / (1e3 * 60 * 60 * 24));
  if (daysAgo == 0) {
    return localizeMessage('v9_date_today', [], localMessages);
  } else {
    if (daysAgo == 1) {
      return localizeMessage('v9_date_yesterday', [], localMessages);
    } else {
      if (daysAgo < 8) {
        return localizeMessage('v9_date_x_days_ago', [daysAgo], localMessages);
      } else {
        return localizeMessage('v9_date_long_ago', [], localMessages);
      }
    }
  }
}
var browserStorage = toEsm(requirePolyfill(), 1);
var none = globalThis.tsResults.None;
Object.freeze(none);
var SomeImpl = globalThis.tsResults.Some;
var Some = SomeImpl;
var OptionNamespace = globalThis.tsResults.Option;

var ErrImpl = globalThis.tsResults.Err;
var ErrResult = ErrImpl;
var OkImpl = globalThis.tsResults.Ok;
var OkResult = OkImpl;
var ResultNamespace = globalThis.tsResults.Result;

var isStringProp = (obj, prop) => typeof obj[prop] == 'string';
function deserialize(node) {
  try {
    if (isStringProp(node, '__serializer_tag')) {
      if (node.__serializer_tag === 'primitive') {
        return OkResult(node.__serializer_value);
      }
      if (node.__serializer_tag === 'regex') {
        let pattern = new RegExp(node.__serializer_value);
        return OkResult(pattern);
      } else if (node.__serializer_tag === 'array') {
        let items = [];
        for (let element of node.__serializer_value) {
          let deserialized = deserialize(element);
          if (deserialized.isErr()) {
            return deserialized;
          }
          items.push(deserialized.unwrap());
        }
        return OkResult(items);
      } else if (node.__serializer_tag === 'map') {
        let entries = [];
        for (let element of node.__serializer_value) {
          let deserialized = deserialize(element);
          if (deserialized.isErr()) {
            return deserialized;
          }
          entries.push(deserialized.unwrap());
        }
        return OkResult(new Map(entries));
      } else if (node.__serializer_tag === 'set') {
        let items = [];
        for (let element of node.__serializer_value) {
          let deserialized = deserialize(element);
          if (deserialized.isErr()) {
            return deserialized;
          }
          items.push(deserialized.unwrap());
        }
        return OkResult(new Set(items));
      } else if (node.__serializer_tag === 'result_ok') {
        let inner = node.__serializer_value;
        let deserialized = deserialize(inner);
        if (deserialized.isErr()) {
          return deserialized;
        } else {
          return OkResult(OkResult(deserialized.unwrap()));
        }
      } else if (node.__serializer_tag === 'result_err') {
        let inner = node.__serializer_value;
        let deserialized = deserialize(inner);
        if (deserialized.isErr()) {
          return deserialized;
        } else {
          return OkResult(ErrResult(deserialized.unwrap()));
        }
      } else if (node.__serializer_tag === 'option_some') {
        let inner = node.__serializer_value;
        let deserialized = deserialize(inner);
        if (deserialized.isErr()) {
          return deserialized;
        } else {
          return OkResult(Some(deserialized.unwrap()));
        }
      } else if (node.__serializer_tag === 'option_none') {
        return OkResult(none);
      }
    }
    let valueType = typeof node;
    if (
      valueType === 'string'
      || valueType === 'number'
      || valueType === 'boolean'
      || valueType === 'undefined'
      || Array.isArray(node)
      || node == null
    ) {
      return ErrResult('This object was not serialized with Serialize');
    }
    let result = {};
    for (let key of Object.keys(node)) {
      if (typeof key == 'string') {
        let deserialized = deserialize(node[key]);
        if (deserialized.isErr()) {
          return deserialized;
        }
        result[key] = deserialized.unwrap();
      }
    }
    return OkResult(result);
  } catch {
    return ErrResult('Failed to inspect object. Not JSON?');
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
    return OkResult({
      __serializer_tag: 'primitive',
      __serializer_value: value,
    });
  }
  if (value instanceof RegExp) {
    return OkResult({
      __serializer_tag: 'regex',
      __serializer_value: value.source,
    });
  }
  if (Array.isArray(value)) {
    let serializedItems = value.map(item => serialize(item));
    let firstError = serializedItems.as_iter().find(item => item.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let values = serializedItems
      .as_iter()
      .map(item => item.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'array',
      __serializer_value: values,
    });
  } else if (value instanceof Map) {
    let serializedEntries = [...value.entries()].map(entry => serialize(entry));
    let firstError = serializedEntries.as_iter().find(entry => entry.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let values = serializedEntries
      .as_iter()
      .map(entry => entry.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'map',
      __serializer_value: values,
    });
  } else if (value instanceof Set) {
    let serializedValues = [...value.values()].map(element =>
      serialize(element),
    );
    let firstError = serializedValues
      .as_iter()
      .find(element => element.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let values = serializedValues
      .as_iter()
      .map(element => element.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'set',
      __serializer_value: values,
    });
  } else if (ResultNamespace.isResult(value)) {
    if (value.isOk()) {
      let okValue = value.unwrap();
      let serialized = serialize(okValue);
      if (serialized.isErr()) {
        return serialized;
      } else {
        return OkResult({
          __serializer_tag: 'result_ok',
          __serializer_value: serialized.unwrap(),
        });
      }
    } else {
      let errValue = value.unwrapErr();
      let serialized = serialize(errValue);
      if (serialized.isErr()) {
        return serialized;
      } else {
        return OkResult({
          __serializer_tag: 'result_err',
          __serializer_value: serialized.unwrap(),
        });
      }
    }
  } else if (OptionNamespace.isOption(value)) {
    if (value.isSome()) {
      let someValue = value.unwrap();
      let serialized = serialize(someValue);
      if (serialized.isErr()) {
        return serialized;
      } else {
        return OkResult({
          __serializer_tag: 'option_some',
          __serializer_value: serialized.unwrap(),
        });
      }
    } else {
      return OkResult({
        __serializer_tag: 'option_none',
      });
    }
  } else if (valueType === 'object') {
    let result = {};
    let source = value;
    for (let key of Object.keys(value)) {
      let propValue = source[key];
      let serialized = serialize(propValue);
      if (serialized.isErr()) {
        continue;
      }
      let unwrapped = serialized.unwrap();
      result[key] = unwrapped;
    }
    return OkResult(result);
  } else {
    return ErrResult('Unsupported value');
  }
}
function withIterHelpers(generatorFn) {
  Object.assign(generatorFn.prototype, {
    find: function (predicate) {
      for (let element of this) {
        if (predicate(element)) {
          return Some(element);
        }
      }
      return none;
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
    map: function (mapper) {
      return this.filterMap(element => Some(mapper(element)));
    },
    filter: function (predicate) {
      return this.filterMap(element =>
        predicate(element) ? Some(element) : none,
      );
    },
    enumerate: function () {
      let source = this;
      return withIterHelpers(function* () {
        let index = 0;
        for (let element of source) {
          yield [index, element];
          index++;
        }
      })();
    },
    filterMap: function (mapper) {
      let source = this;
      return withIterHelpers(function* () {
        for (let element of source) {
          let mapped = mapper(element);
          if (mapped.isSome()) {
            yield mapped.unwrap();
          }
        }
      })();
    },
    sort: function (comparator) {
      let sorted = this.toArray();
      sorted.sort(comparator);
      return sorted;
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
    return withIterHelpers(function* () {
      for (let element of source) {
        yield element;
      }
    })();
  };
}
if (!Set.prototype.as_iter) {
  Set.prototype.as_iter = function () {
    let source = this;
    return withIterHelpers(function* () {
      for (let element of source) {
        yield element;
      }
    })();
  };
}
if (!Map.prototype.as_iter) {
  Map.prototype.as_iter = function () {
    let source = this;
    return withIterHelpers(function* () {
      for (let element of source) {
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
var videoCodecsIter = withIterHelpers(function* () {
  for (let codecKey of Object.keys(videoCodecs)) {
    yield videoCodecs[codecKey];
  }
});
var audioCodecsIter = withIterHelpers(function* () {
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
      audio: none,
      video: none,
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
      audio: none,
      video: none,
    },
    supported_video_codecs: videoCodecsIter()
      .filter(codec => codec.name != 'unknown')
      .map(codec => codec.name)
      .toArray(),
    supported_audio_codecs: audioCodecsIter()
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
      audio: none,
      video: none,
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
      audio: none,
      video: none,
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
      audio: Some('MP3'),
      video: Some('H264'),
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
      audio: none,
      video: none,
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
      audio: none,
      video: none,
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
      audio: Some('AAC'),
      video: none,
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
      audio: Some('FLAC'),
      video: none,
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
      audio: Some('MP3'),
      video: Some('H264'),
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
      audio: none,
      video: none,
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
      audio: Some('Wav'),
      video: none,
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
      audio: none,
      video: none,
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
      audio: none,
      video: none,
    },
    supported_video_codecs: ['MPEG1', 'MPEG2'],
    supported_audio_codecs: [],
    mimetype: /(?:x-)?mov/i,
  },
};
var containerKeysIter = withIterHelpers(function* () {
  for (let containerKey of Object.keys(containerFormats)) {
    yield containerKey;
  }
});
var containersIter = withIterHelpers(function* () {
  for (let containerKey of containerKeysIter()) {
    yield containerFormats[containerKey];
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
var resolutionKeysIter = withIterHelpers(function* () {
  for (let resolutionKey of Object.keys(resolutions)) {
    yield resolutionKey;
  }
});
var resolutionsIter = withIterHelpers(function* () {
  for (let resolutionKey of resolutionKeysIter()) {
    yield resolutions[resolutionKey];
  }
});
var browserApi = toEsm(requirePolyfill(), 1);
function deepEqual(objectA, objectB) {
  if (objectA == null || objectB === null || objectB === void 0) {
    return objectA === objectB;
  }
  if (objectA.constructor !== objectB.constructor) {
    return !1;
  }
  if (objectA instanceof Function || objectA instanceof RegExp) {
    return objectA === objectB;
  }
  if (objectA === objectB || objectA.valueOf() === objectB.valueOf()) {
    return !0;
  }
  if (
    (Array.isArray(objectA) && objectA.length !== objectB.length)
    || objectA instanceof Date
    || !(objectA instanceof Object)
    || !(objectB instanceof Object)
  ) {
    return !1;
  }
  let keysA = Object.keys(objectA);
  let sameKeys = Object.keys(objectB).every(key => keysA.indexOf(key) !== -1);
  let valuesEqual = keysA.every(key => deepEqual(objectA[key], objectB[key]));
  return sameKeys && valuesEqual;
}
async function setStoredSetting(descriptor, value) {
  let storedValue = value;
  if (descriptor.hooks) {
    storedValue = descriptor.hooks.setter(value);
  }
  await browserStorage.storage[descriptor.where].set({
    [descriptor.name]: storedValue,
  });
}
async function getStoredSetting(descriptor) {
  let stored = await browserStorage.storage[descriptor.where].get(
    descriptor.name,
  );
  if (descriptor.name in stored) {
    let rawValue = stored[descriptor.name];
    if (descriptor.hooks) {
      return descriptor.hooks.getter(rawValue, descriptor);
    } else {
      return rawValue;
    }
  }
  return descriptor.default();
}
async function removeStoredSetting(descriptor) {
  await browserStorage.storage[descriptor.where].remove(descriptor.name);
}
function watchStoredSetting(descriptor, onChange) {
  browserStorage.storage[descriptor.where].onChanged.addListener(changes => {
    let change = changes[descriptor.name];
    if (change) {
      if (deepEqual(change.oldValue, change.newValue)) {
        return;
      }
      if (typeof change.newValue > 'u') {
        onChange(descriptor.default());
      } else {
        if (descriptor.hooks) {
          onChange(descriptor.hooks.getter(change.newValue, descriptor));
        } else {
          onChange(change.newValue);
        }
      }
    }
  });
}
var recordHistorySetting = {
  name: 'record_download_history',
  default: () => !1,
  where: 'local',
};
var viewOptionsSetting = {
  name: 'view_options',
  default: () => ({}),
  where: 'session',
};
var downloadHistorySetting = {
  name: 'download_history',
  where: 'local',
  default: () => new Map(),
  hooks: {
    setter: value => serialize(value).unwrap(),
    getter: (serialized, descriptor) =>
      deserialize(serialized).unwrapOr(descriptor.default()),
  },
};
async function sendRuntimeMessage(message) {
  browserRuntime.default.runtime.sendMessage(message);
}
function matchesSearch(entry, searchRegex) {
  if (searchRegex.test(entry.page_url)) {
    return !0;
  } else {
    return !!searchRegex.test(entry.download_result.filename);
  }
}
async function renderHistory(historyMap, isRecording, localMessages) {
  let searchInput = document.querySelector('#search');
  let searchRegex =
    searchInput.value.length == 0 ? null : new RegExp(searchInput.value, 'i');
  let templateContent = document.querySelector('template').content;
  document.body.classList.toggle('recording', isRecording);
  let noEntriesEl = document.querySelector('#noentries');
  if (historyMap.size == 0) {
    noEntriesEl.removeAttribute('hidden');
  } else {
    noEntriesEl.setAttribute('hidden', 'true');
  }
  let mainEl = document.querySelector('#main');
  let existingEntries = Array.from(mainEl.querySelectorAll('.history-entry'));
  for (let existingEntry of existingEntries) {
    let record = historyMap.get(existingEntry.id);
    if (!(record && searchRegex && matchesSearch(record, searchRegex))) {
      existingEntry.remove();
    }
  }
  let entryTemplate = templateContent.querySelector('.history-entry');
  let sortedEntries = [...historyMap.entries()]
    .filter(([, entry]) =>
      searchRegex ? matchesSearch(entry, searchRegex) : !0,
    )
    .sort(([, recordA], [, recordB]) => recordB.timestamp - recordA.timestamp)
    .slice(0, 200);
  let orderIndex = 0;
  for (let [entryId, record] of sortedEntries) {
    orderIndex++;
    let entryEl = document.getElementById(entryId);
    if (!entryEl) {
      entryEl = entryTemplate.cloneNode(!0);
      applyI18n(entryEl, localMessages);
      entryEl.id = entryId;
      let pageUrl = new URL(record.page_url);
      let pageUrlLink = entryEl.querySelector('.page-url');
      pageUrlLink.textContent = pageUrl.host;
      pageUrlLink.href = pageUrl.href;
      let dateEl = entryEl.querySelector('.date');
      dateEl.textContent = formatRelativeDate(record.timestamp, localMessages);
      let filenameEl = entryEl.querySelector('.filename');
      filenameEl.style.backgroundImage = `url(${pageUrl.origin}/favicon.ico)`;
      filenameEl.textContent = record.download_result.filename;
      filenameEl.title = record.download_result.filename;
      mainEl.appendChild(entryEl);
    }
    entryEl.style.order = orderIndex.toString();
  }
}
var initialViewOptions = await getStoredSetting(viewOptionsSetting);
var initialHistory = await getStoredSetting(downloadHistorySetting);
var initialRecording = await getStoredSetting(recordHistorySetting);
watchStoredSetting(viewOptionsSetting, async newViewOptions => {
  let currentRecording = await getStoredSetting(recordHistorySetting);
  let currentHistory = await getStoredSetting(downloadHistorySetting);
  renderHistory(currentHistory, currentRecording, newViewOptions);
});
watchStoredSetting(recordHistorySetting, async newIsRecording => {
  let currentViewOptions = await getStoredSetting(viewOptionsSetting);
  let currentHistory = await getStoredSetting(downloadHistorySetting);
  renderHistory(currentHistory, newIsRecording, currentViewOptions);
});
watchStoredSetting(downloadHistorySetting, async newHistory => {
  let currentViewOptions = await getStoredSetting(viewOptionsSetting);
  let currentRecording = await getStoredSetting(recordHistorySetting);
  renderHistory(newHistory, currentRecording, currentViewOptions);
});
applyI18n(document, initialViewOptions);
renderHistory(initialHistory, initialRecording, initialViewOptions);
async function handleUiEvent(event) {
  let target = event.target;
  if (!target) {
    return;
  }
  let entryId = target.closest('.history-entry')?.id;
  if (target.closest('#search')) {
    let currentHistory = await getStoredSetting(downloadHistorySetting);
    let currentRecording = await getStoredSetting(recordHistorySetting);
    let currentViewOptions = await getStoredSetting(viewOptionsSetting);
    renderHistory(currentHistory, currentRecording, currentViewOptions);
  } else if (target.closest('#button-clear-history')) {
    removeStoredSetting(downloadHistorySetting);
  } else if (target.closest('#button-start-recording')) {
    setStoredSetting(recordHistorySetting, !0);
  } else if (target.closest('#button-stop-recording')) {
    setStoredSetting(recordHistorySetting, !1);
    removeStoredSetting(downloadHistorySetting);
  } else if (target.closest('.button-rm')) {
    sendRuntimeMessage({
      rm: entryId,
    });
  } else if (target.closest('.button-hide')) {
    if (entryId) {
      let currentHistory = await getStoredSetting(downloadHistorySetting);
      currentHistory.delete(entryId);
      await setStoredSetting(downloadHistorySetting, currentHistory);
    }
  } else {
    if (target.closest('.button-play')) {
      sendRuntimeMessage({
        play: entryId,
      });
    } else {
      if (target.closest('.button-dir')) {
        sendRuntimeMessage({
          show_dir: entryId,
        });
      }
    }
  }
}
window.addEventListener('click', handleUiEvent, !0);
window.addEventListener('change', handleUiEvent);
window.addEventListener('input', handleUiEvent);
window.addEventListener('sl-clear', handleUiEvent);
