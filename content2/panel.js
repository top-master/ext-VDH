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
var noneSingleton = globalThis.tsResults.None;
Object.freeze(noneSingleton);
var SomeImpl = globalThis.tsResults.Some;
var Some = SomeImpl;
var OptionModule = globalThis.tsResults.Option;

var ErrImpl = globalThis.tsResults.Err;
var ErrResult = ErrImpl;
var OkImpl = globalThis.tsResults.Ok;
var OkResult = OkImpl;
var ResultModule = globalThis.tsResults.Result;

var awaitAsync = function (thisArg, argsList, promiseCtor, generatorFn) {
  function adopt(value) {
    if (value instanceof promiseCtor) {
      return value;
    } else {
      return new promiseCtor(function (resolveInner) {
        resolveInner(value);
      });
    }
  }
  return new (promiseCtor || (promiseCtor = Promise))(function (
    resolve,
    reject,
  ) {
    function onFulfilled(value) {
      try {
        step(generatorFn.next(value));
      } catch (error) {
        reject(error);
      }
    }
    function onRejected(value) {
      try {
        step(generatorFn.throw(value));
      } catch (error) {
        reject(error);
      }
    }
    function step(result) {
      if (result.done) {
        resolve(result.value);
      } else {
        adopt(result.value).then(onFulfilled, onRejected);
      }
    }
    step((generatorFn = generatorFn.apply(thisArg, argsList || [])).next());
  });
};
function defineIterableHelpers(iterableFactory) {
  Object.assign(iterableFactory.prototype, {
    find: function (predicate) {
      for (let item of this) {
        if (predicate(item)) {
          return Some(item);
        }
      }
      return noneSingleton;
    },
    count: function (predicate) {
      return this.reduce(
        (count, item) => (predicate(item) && count++, count),
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
    map: function (mapFn) {
      return this.filterMap(item => Some(mapFn(item)));
    },
    filter: function (predicate) {
      return this.filterMap(item =>
        predicate(item) ? Some(item) : noneSingleton,
      );
    },
    enumerate: function () {
      let source = this;
      return defineIterableHelpers(function* () {
        let index = 0;
        for (let item of source) {
          yield [index, item];
          index++;
        }
      })();
    },
    filterMap: function (mapFn) {
      let source = this;
      return defineIterableHelpers(function* () {
        for (let item of source) {
          let mapped = mapFn(item);
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
  return iterableFactory;
}
if (!Array.prototype.as_iter) {
  Array.prototype.as_iter = function () {
    let source = this;
    return defineIterableHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Set.prototype.as_iter) {
  Set.prototype.as_iter = function () {
    let source = this;
    return defineIterableHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Map.prototype.as_iter) {
  Map.prototype.as_iter = function () {
    let source = this;
    return defineIterableHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
var browserRuntimeApi = toEsm(requirePolyfill(), 1);
var browserSidebarApi = toEsm(requirePolyfill(), 1);
var browserTarget = 'google';
function configurePanelBehavior(enablePanel, windowId, applyNow) {
  let isMozilla = browserTarget == 'mozilla';
  if (
    !isMozilla
    && (chrome.sidePanel && chrome.sidePanel.setPanelBehavior
      ? (chrome.sidePanel.setOptions({
          enabled: enablePanel,
        }),
        chrome.sidePanel.setPanelBehavior({
          openPanelOnActionClick: enablePanel,
        }))
      : (enablePanel = !1),
    applyNow)
  ) {
    if (enablePanel) {
      if (windowId != 0) {
        chrome.sidePanel?.open?.({
          windowId: windowId,
        });
      }
    } else {
      try {
        chrome.action.openPopup();
      } catch {}
    }
  }
  if (isMozilla && !enablePanel) {
    browserSidebarApi.default.browserAction.setPopup({
      popup: '/content2/popup.html',
    });
    browserSidebarApi.default.sidebarAction.setPanel({
      panel: null,
    });
    if (applyNow) {
      browserSidebarApi.default.sidebarAction.close();
    }
  }
  if (isMozilla && enablePanel) {
    browserSidebarApi.default.browserAction.setPopup({
      popup: null,
    });
    browserSidebarApi.default.sidebarAction.setPanel({
      panel: '/content2/sidebar.html',
    });
    if (applyNow) {
      browserSidebarApi.default.sidebarAction.open();
    }
  }
}
var browserI18nApi = toEsm(requirePolyfill(), 1);
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
function localizeMessage(messageKey, substitutions, overrides) {
  let reportUnknown = () => (
    console.error(`Requesting unknown i18n string ${messageKey}`),
    messageKey
  );
  substitutions = substitutions
    .map(substitution => substitution.toString())
    .map(escapeHtml);
  try {
    if (messageKey in overrides) {
      let template = overrides[messageKey];
      let placeholderIndex = 1;
      for (let argIndex = 0; argIndex < substitutions.length; argIndex++) {
        template = template.replace(
          `$${placeholderIndex}`,
          substitutions[argIndex],
        );
      }
      return template;
    } else {
      let translated = browserI18nApi.default.i18n.getMessage(
        messageKey,
        substitutions,
      );
      return translated || reportUnknown();
    }
  } catch {
    return reportUnknown();
  }
}
function applyI18n(root, overrides) {
  for (let element of Array.from(root.querySelectorAll('[data-i18n]'))) {
    let argsJson = element.dataset.i18nArgs;
    let attrName = element.dataset.i18nAttr;
    let translatedText;
    if (argsJson) {
      translatedText = localizeMessage(
        element.dataset.i18n,
        JSON.parse(argsJson),
        overrides,
      );
    } else {
      translatedText = localizeMessage(element.dataset.i18n, [], overrides);
    }
    if (attrName) {
      element.setAttribute(attrName, translatedText);
    } else {
      element.textContent = translatedText;
    }
  }
}
var hasStringProp = (obj, prop) => typeof obj[prop] == 'string';
function deserialize(input) {
  try {
    if (hasStringProp(input, '__serializer_tag')) {
      if (input.__serializer_tag === 'primitive') {
        return OkResult(input.__serializer_value);
      }
      if (input.__serializer_tag === 'regex') {
        let pattern = new RegExp(input.__serializer_value);
        return OkResult(pattern);
      } else if (input.__serializer_tag === 'array') {
        let items = [];
        for (let entry of input.__serializer_value) {
          let decoded = deserialize(entry);
          if (decoded.isErr()) {
            return decoded;
          }
          items.push(decoded.unwrap());
        }
        return OkResult(items);
      } else if (input.__serializer_tag === 'map') {
        let items = [];
        for (let entry of input.__serializer_value) {
          let decoded = deserialize(entry);
          if (decoded.isErr()) {
            return decoded;
          }
          items.push(decoded.unwrap());
        }
        return OkResult(new Map(items));
      } else if (input.__serializer_tag === 'set') {
        let items = [];
        for (let entry of input.__serializer_value) {
          let decoded = deserialize(entry);
          if (decoded.isErr()) {
            return decoded;
          }
          items.push(decoded.unwrap());
        }
        return OkResult(new Set(items));
      } else if (input.__serializer_tag === 'result_ok') {
        let inner = input.__serializer_value;
        let decoded = deserialize(inner);
        if (decoded.isErr()) {
          return decoded;
        } else {
          return OkResult(OkResult(decoded.unwrap()));
        }
      } else if (input.__serializer_tag === 'result_err') {
        let inner = input.__serializer_value;
        let decoded = deserialize(inner);
        if (decoded.isErr()) {
          return decoded;
        } else {
          return OkResult(ErrResult(decoded.unwrap()));
        }
      } else if (input.__serializer_tag === 'option_some') {
        let inner = input.__serializer_value;
        let decoded = deserialize(inner);
        if (decoded.isErr()) {
          return decoded;
        } else {
          return OkResult(Some(decoded.unwrap()));
        }
      } else if (input.__serializer_tag === 'option_none') {
        return OkResult(noneSingleton);
      }
    }
    let valueType = typeof input;
    if (
      valueType === 'string'
      || valueType === 'number'
      || valueType === 'boolean'
      || valueType === 'undefined'
      || Array.isArray(input)
      || input == null
    ) {
      return ErrResult('This object was not serialized with Serialize');
    }
    let decodedObj = {};
    for (let prop of Object.keys(input)) {
      if (typeof prop == 'string') {
        let decodedProp = deserialize(input[prop]);
        if (decodedProp.isErr()) {
          return decodedProp;
        }
        decodedObj[prop] = decodedProp.unwrap();
      }
    }
    return OkResult(decodedObj);
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
    let firstError = serializedItems
      .as_iter()
      .find(serialized => serialized.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let values = serializedItems
      .as_iter()
      .map(serialized => serialized.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'array',
      __serializer_value: values,
    });
  } else if (value instanceof Map) {
    let serializedEntries = [...value.entries()].map(entry => serialize(entry));
    let firstError = serializedEntries
      .as_iter()
      .find(serialized => serialized.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let values = serializedEntries
      .as_iter()
      .map(serialized => serialized.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'map',
      __serializer_value: values,
    });
  } else if (value instanceof Set) {
    let serializedValues = [...value.values()].map(item => serialize(item));
    let firstError = serializedValues
      .as_iter()
      .find(serialized => serialized.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let values = serializedValues
      .as_iter()
      .map(serialized => serialized.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'set',
      __serializer_value: values,
    });
  } else if (ResultModule.isResult(value)) {
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
  } else if (OptionModule.isOption(value)) {
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
    let serializedObj = {};
    let source = value;
    for (let prop of Object.keys(value)) {
      let propValue = source[prop];
      let serializedProp = serialize(propValue);
      if (serializedProp.isErr()) {
        continue;
      }
      let unwrapped = serializedProp.unwrap();
      serializedObj[prop] = unwrapped;
    }
    return OkResult(serializedObj);
  } else {
    return ErrResult('Unsupported value');
  }
}
function toPlainValue(value) {
  if (typeof value > 'u') {
    return 'undef';
  }
  if (
    typeof value == 'string'
    || typeof value == 'number'
    || typeof value == 'boolean'
    || value == null
  ) {
    return value;
  }
  if (value instanceof RegExp) {
    return value.source;
  }
  if (Array.isArray(value)) {
    return value.map(toPlainValue);
  }
  if (value instanceof Map) {
    return [...value.values()].map(toPlainValue);
  }
  if (value instanceof Set) {
    return [...value.values()].map(toPlainValue);
  }
  if (ResultModule.isResult(value)) {
    if (value.isOk()) {
      return toPlainValue(value.unwrap());
    } else {
      return toPlainValue(value.unwrapErr());
    }
  }
  if (OptionModule.isOption(value)) {
    if (value.isSome()) {
      return toPlainValue(value.unwrap());
    } else {
      return 'None';
    }
  }
  if (typeof value == 'object') {
    let plainObj = {};
    let source = value;
    for (let prop of Object.keys(value)) {
      let propValue = source[prop];
      plainObj[prop] = toPlainValue(propValue);
    }
    return plainObj;
  } else {
    return '???';
  }
}
function buildDownloadableRows(state, viewOptions) {
  let tabGroups = new Map();
  let rows = [];
  {
    for (let downloadable of state.downloadable.values()) {
      if (!tabGroups.has(downloadable.tab_id)) {
        tabGroups.set(downloadable.tab_id, {
          downloadables: [],
          filter_out_low_quality: !1,
        });
      }
      let group = tabGroups.get(downloadable.tab_id);
      group.downloadables.push(downloadable);
      if (!downloadable.is_low_quality) {
        group.filter_out_low_quality = !0;
      }
    }
    for (let item of [
      ...state.downloading.values(),
      ...state.downloaded.values(),
    ]) {
      let group = tabGroups.get(item.downloadable.tab_id);
      if (group && !item.downloadable.is_low_quality) {
        group.filter_out_low_quality = !0;
      }
    }
    for (let [tabId, group] of tabGroups.entries()) {
      let isCurrentTab = tabId == state.current_tab_id;
      let isVisible = isCurrentTab || tabId == 'none' || viewOptions.all_tabs;
      for (let downloadable of group.downloadables) {
        let row = {
          order: 0,
          is_current_tab: isCurrentTab,
          id: downloadable.id,
          timestamp: downloadable.timestamp,
          reach: 'downloadable',
          is_visible: isVisible,
        };
        if (
          group.filter_out_low_quality
          && downloadable.is_low_quality
          && !viewOptions.low_quality
        ) {
          row.is_visible = !1;
        }
        rows.push([downloadable, row]);
      }
    }
  }
  let downloadingRows = [...state.downloading.values()].map(item => [
    item,
    {
      order: 0,
      id: item.downloadable.id,
      is_current_tab: item.downloadable.tab_id == state.current_tab_id,
      timestamp: item.downloadable.timestamp,
      reach: 'downloading',
      is_visible: !0,
    },
  ]);
  let downloadedRows = [...state.downloaded.values()].map(item => [
    item,
    {
      order: 0,
      id: item.downloadable.id,
      is_current_tab: item.downloadable.tab_id == state.current_tab_id,
      timestamp: item.downloadable.timestamp,
      reach: 'downloaded',
      is_visible: !viewOptions.hide_downloaded,
    },
  ]);
  let sortedRows;
  {
    let byTimestamp = ([, leftMeta], [, rightMeta]) =>
      rightMeta.timestamp - leftMeta.timestamp;
    if (viewOptions.sort_by_status) {
      rows.sort(byTimestamp);
      downloadingRows.sort(byTimestamp);
      downloadedRows.sort(byTimestamp);
      sortedRows = [...rows, ...downloadingRows, ...downloadedRows];
    } else {
      sortedRows = [...rows, ...downloadingRows, ...downloadedRows];
      sortedRows.sort(byTimestamp);
    }
    if (viewOptions.sort_reverse) {
      sortedRows.reverse();
    }
  }
  let order = 0;
  for (let row of sortedRows) {
    if (row[1].is_visible) {
      row[1].order = order++;
    }
  }
  return sortedRows;
}
function formatBytes(bytes) {
  if (bytes < 1048576) {
    return `${(bytes / 1024).toFixed(0)}Kb`;
  } else {
    return `${(bytes / 1048576).toFixed(0)}Mb`;
  }
}
function formatDuration(seconds) {
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  let wholeSeconds = Math.round(seconds);
  let hoursStr = ('0' + hours + ':').slice(-3);
  let minutesStr = ('0' + minutes + ':').slice(-3);
  let secondsStr = ('0' + wholeSeconds).slice(-2);
  if (hoursStr == '00:') {
    hoursStr = '';
  }
  return hoursStr + minutesStr + secondsStr;
}
var downloadActionNames = ['download', 'copy', 'download_as', 'download_audio'];
function UpdateProgress(downloadableId, progress) {
  let downloadEl = document.querySelector(
    `[data-downloadable-id="${downloadableId}"]`,
  );
  let progressBar = downloadEl.querySelector('sl-progress-bar');
  let percentSpan = downloadEl.querySelector('.span-percent');
  let bitrateSpan = downloadEl.querySelector('.span-bitrate');
  let durationSpan = downloadEl.querySelector('.span-downloading-duration');
  downloadEl.classList.remove('progress-unknown');
  if (typeof progress != 'string') {
    durationSpan.textContent =
      formatDuration(progress.duration_since_start / 1e3) + 's';
    downloadEl.querySelector('.button-stop').removeAttribute('loading');
    downloadEl.querySelector('.button-stop').removeAttribute('disabled');
    bitrateSpan.removeAttribute('hidden');
    bitrateSpan
      .querySelector('sl-format-bytes')
      .setAttribute('value', progress.bitrate_bs.toString());
    if (progress.progress != 'unknown') {
      percentSpan.removeAttribute('hidden');
      percentSpan
        .querySelector('sl-format-number')
        .setAttribute('value', progress.progress.toString());
      progressBar.removeAttribute('indeterminate');
      progressBar.setAttribute('value', (progress.progress * 100).toString());
    } else {
      percentSpan.setAttribute('hidden', 'true');
      progressBar.removeAttribute('value');
      progressBar.setAttribute('indeterminate', 'true');
      downloadEl.classList.add('progress-unknown');
    }
  } else {
    downloadEl.querySelector('.button-stop').setAttribute('loading', 'true');
    downloadEl.querySelector('.button-stop').setAttribute('disabled', 'true');
    bitrateSpan.setAttribute('hidden', 'true');
  }
}
function renderVariant(variant, overrides) {
  let coreMedia = variant.core_media;
  let parts = [];
  let containerExt = coreMedia.container.extension;
  if (!coreMedia.av.video) {
    containerExt = coreMedia.container.audio_only_extension;
  }
  parts.push(`<span class="variant-container">${containerExt}</span>`);
  let details = localizeMessage(
    'v9_panel_downloadable_variant_no_details',
    [],
    overrides,
  );
  if (coreMedia.av.video) {
    if (coreMedia.av.video.quality.isSome()) {
      let qualityLabel = coreMedia.av.video.quality.unwrap() + 'p';
      parts.push(
        `<span class="variant-quality _${qualityLabel}">${qualityLabel}</span>`,
      );
    }
    if (coreMedia.av.video.dimensions.isSome()) {
      let dimensions = coreMedia.av.video.dimensions.unwrap();
      details = `${dimensions.width}x${dimensions.height}`;
      if (coreMedia.av.video.bitrate.isSome()) {
        details += ` ${formatBytes(coreMedia.av.video.bitrate.unwrap())}/s`;
      }
    } else {
      if (coreMedia.content_length.isSome()) {
        details = formatBytes(coreMedia.content_length.unwrap());
      } else {
        if (coreMedia.av.video.bitrate.isSome()) {
          details += `${formatBytes(coreMedia.av.video.bitrate.unwrap())}/s`;
        }
      }
    }
  }
  parts.push(`<span class="variant-differentiator">${details}</span>`);
  return `<sl-menu-item class="menu-item-variant" data-variant-id="${variant.id}" data-to-copy="${escapeHtml(variant.to_copy)}">
    ${parts.join('')}
  </sl-menu-item>`;
}
function UpdateDefaultAction(downloadEl, action) {
  downloadEl.dataset.defaultAction = action;
  let menuItem = downloadEl.querySelector('sl-menu-item.action-' + action);
  let iconName = menuItem.querySelector('sl-icon').getAttribute('name');
  let label = menuItem.querySelector('span').textContent;
  let actionButton = downloadEl.querySelector(
    '.button-group-actions > sl-button',
  );
  for (let actionName of downloadActionNames) {
    actionButton.classList.remove('action-' + actionName);
  }
  actionButton.classList.add('action-' + action);
  actionButton.querySelector('sl-icon').setAttribute('name', iconName);
  actionButton.querySelector('span').textContent = label;
}
function RenderVariantButton(variant) {
  let containerExt = variant.core_media.container.extension;
  if (!variant.core_media.av.video) {
    containerExt = variant.core_media.container.audio_only_extension;
  }
  let containerSpan = `<span class="variant-container">${containerExt}</span>`;
  let video = variant.core_media.av.video;
  let html = containerSpan;
  if (video && video.quality.isSome()) {
    let qualityLabel = video.quality.unwrap() + 'p';
    let qualitySpan = `<span class="variant-quality _${qualityLabel}">${qualityLabel}</span>`;
    html += qualitySpan;
  } else if (variant.core_media.content_length.isSome()) {
    let contentLength = variant.core_media.content_length.unwrap();
    html += `<span class="variant-quality">${formatBytes(contentLength)}</span>`;
  }
  return html;
}
function renderDownloadable(downloadable, overrides) {
  let firstVariant = [...downloadable.variants.values()][0];
  let element = document.createElement('hbox');
  element.classList.add('download');
  element.dataset.selectedVariantId = firstVariant.id;
  element.dataset.downloadableId = downloadable.id;
  element.dataset.timestamp = downloadable.timestamp.toString();
  element.dataset.toCopy = firstVariant.to_copy;
  let leftHtml;
  {
    let duration = firstVariant.core_media.duration;
    let durationHtml = '';
    if (typeof duration == 'number') {
      durationHtml = `<div class="duration">${formatDuration(duration)}</div>`;
    }
    leftHtml = `<hbox class="download-left" align="start" style="background-image:url('${escapeHtml(downloadable.thumbnail_url)}')">
      <div class="favicon" style="background-image:url('${escapeHtml(downloadable.favicon_url)}')"></div>
      ${durationHtml}
    </hbox>`;
  }
  let topHtml;
  {
    let metaHtml = `
      <span class="span-bitrate"><sl-format-bytes></sl-format-bytes>/s</span>
      <span class="span-downloading-duration"></span>
      <span size="small" class="span-percent"><sl-format-number type="percent"></sl-format-number></span>`;
    let mediaIcons = '<sl-icon name="film"></sl-icon>';
    if (firstVariant.core_media.av.video) {
      mediaIcons =
        '<sl-icon name="film"></sl-icon><sl-icon name="plus"></sl-icon><sl-icon name="music-note-beamed"></sl-icon>';
    } else {
      mediaIcons = '<sl-icon name="music-note-beamed"></sl-icon>';
    }
    let tagsHtml = `
      <hbox class="hbox-tags">
        <sl-tag variant="primary" size="small">${firstVariant.core_media.builder}</sl-tag>
        <sl-tooltip content="Video & Audio">
          <sl-tag variant="neutral" size="small">${mediaIcons}</sl-tag>
        </sl-tooltip>
      </hbox>`;
    let pageTitle = escapeHtml(downloadable.page_title);
    topHtml = `
    <hbox class="download-top" align="center">
      ${tagsHtml}<div class="favicon" style="background-image:url('${escapeHtml(downloadable.favicon_url)}')"></div>
      <p class="title" flex="1" title="${pageTitle}">${pageTitle}</p>
      ${metaHtml}
      <sl-icon-button name="x" class="button-hide"></sl-icon-button>
    </hbox>`;
  }
  let bottomHtml;
  {
    let variantsHtml = '';
    for (let variant of downloadable.variants.values()) {
      variantsHtml += renderVariant(variant, overrides);
    }
    bottomHtml = `
      <hbox align="center" pack="end" class="download-bottom" flex="1">
        ${`
        <sl-dropdown stay-open-on-select="true" class="dropdown-variants">
          <sl-button slot="trigger" size="small" caret>
            ${RenderVariantButton(firstVariant)}
          </sl-button>
          <sl-menu>
            ${variantsHtml}
            <sl-divider></sl-divider>
            <sl-menu-item type="checkbox" class="menu-prefer-quality"><span data-i18n="v9_panel_variant_menu_prefer_quality"></span></sl-menu-item>
            <sl-menu-item type="checkbox" class="menu-prefer-container"><span data-i18n="v9_panel_variant_menu_prefer_format"></span></sl-menu-item>
          </sl-menu>
        </sl-dropdown>`}
        <sl-progress-bar flex="1"></sl-progress-bar>
        <spacer flex="1"></spacer>
        <hbox class="progress-unknown-component"><sl-icon name="broadcast"></sl-icon></hbox>
        <sl-button size="small" variant="danger" loading class="button-stop" data-i18n="v9_panel_downloading_stop" pill></sl-button>
        
      <sl-tooltip data-i18n-attr="content" data-i18n="v9_panel_downloaded_retry_tooltip" class="button-downloaded-action">
        <sl-icon-button name="arrow-clockwise" class="button-retry"></sl-icon-button>
      </sl-tooltip>

      <sl-tooltip data-i18n-attr="content" data-i18n="v9_panel_downloaded_delete_file_tooltip" class="button-downloaded-action">
        <sl-icon-button variant="danger" name="trash" class="button-rm"></sl-icon-button>
      </sl-tooltip>

      <!-- FIXME: there's a duplicate of that code in history.html -->
      <sl-button-group class="button-downloaded-action" pill>
        <sl-button variant="success" class="button-play" size="small" pill>
          <sl-icon slot="prefix" name="play-circle-fill"></sl-icon>Play
        </sl-button>
        <sl-tooltip data-i18n-attr="content" data-i18n="v9_panel_downloaded_show_dir_tooltip">
          <sl-button variant="success" class="button-dir" size="small" pill>
            <sl-icon slot="suffix" name="folder-fill"></sl-icon>
          </sl-button>
        </sl-tooltip>
      </sl-button-group>
    
        <!-- button-group-actions from template -->
        <!-- menu-actions from template -->
      </hbox>`;
  }
  element.innerHTML = `
  ${leftHtml}
  <vbox class="download-right" flex="1">
    ${topHtml}
    ${bottomHtml}
  </vbox>
  `;
  let template = document.querySelector('template').content;
  {
    let actionsGroup = template
      .querySelector('.button-group-actions')
      .cloneNode(!0);
    let actionsMenu = template.querySelector('.menu-actions').cloneNode(!0);
    let bottomEl = element.querySelector('.download-bottom');
    bottomEl.appendChild(actionsGroup);
    bottomEl.appendChild(actionsMenu);
  }
  applyI18n(element, overrides);
  return element;
}
function UpdateDownloading(item, overrides) {
  let downloadEl = document.querySelector(
    `[data-downloadable-id="${item.downloadable.id}"]`,
  );
  if (!downloadEl) {
    downloadEl = renderDownloadable(item.downloadable, overrides);
    document.querySelector('#core-downloads').append(downloadEl);
  }
  downloadEl.setAttribute('status', 'downloading');
  UpdateProgress(item.downloadable.id, item.progress);
  return downloadEl;
}
function UpdateDownloadable(downloadable, overrides) {
  let downloadEl = document.querySelector(
    `[data-downloadable-id="${downloadable.id}"]`,
  );
  if (!downloadEl) {
    downloadEl = renderDownloadable(downloadable, overrides);
    document.querySelector('#core-downloads').append(downloadEl);
  }
  downloadEl.setAttribute('status', 'downloadable');
  {
    let selectedVariantId = downloadEl.dataset.selectedVariantId;
    let variant = downloadable.variants.get(selectedVariantId);
    let buttonHtml = RenderVariantButton(variant);
    let triggerButton = downloadEl.querySelector(
      '.dropdown-variants > sl-button',
    );
    triggerButton.innerHTML = buttonHtml;
  }
  return downloadEl;
}
function UpdateDownloaded(item, overrides) {
  let downloadEl = document.querySelector(
    `[data-downloadable-id="${item.downloadable.id}"]`,
  );
  if (!downloadEl) {
    downloadEl = renderDownloadable(item.downloadable, overrides);
    document.querySelector('#core-downloads').append(downloadEl);
  }
  downloadEl.setAttribute('status', 'downloaded');
  let titleEl = downloadEl.querySelector('.title');
  if (item.download_result.inbrowser) {
    downloadEl.dataset.inBrowserDownloadId =
      item.download_result.download_id.toString();
    titleEl.textContent = item.downloadable.title;
  } else {
    titleEl.textContent = item.download_result.filename;
  }
  return downloadEl;
}
var browserStorageApi = toEsm(requirePolyfill(), 1);
var neverMatchRegex = /.^/;
var videoCodecDefs = {
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
var audioCodecDefs = {
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
var videoCodecEntries = defineIterableHelpers(function* () {
  for (let codecName of Object.keys(videoCodecDefs)) {
    yield videoCodecDefs[codecName];
  }
});
var audioCodecEntries = defineIterableHelpers(function* () {
  for (let codecName of Object.keys(audioCodecDefs)) {
    yield audioCodecDefs[codecName];
  }
});
function toVideoCodec(codecName) {
  if (typeof codecName == 'string' && codecName in videoCodecDefs) {
    return Some(codecName);
  } else {
    return noneSingleton;
  }
}
var containerDefs = {
  Mp4: {
    name: 'Mp4',
    extension: 'mp4',
    audio_only_extension: 'mp3',
    defacto_codecs: {
      audio: noneSingleton,
      video: noneSingleton,
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
      audio: noneSingleton,
      video: noneSingleton,
    },
    supported_video_codecs: videoCodecEntries()
      .filter(codec => codec.name != 'unknown')
      .map(codec => codec.name)
      .toArray(),
    supported_audio_codecs: audioCodecEntries()
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
      audio: noneSingleton,
      video: noneSingleton,
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
      audio: noneSingleton,
      video: noneSingleton,
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
      audio: noneSingleton,
      video: noneSingleton,
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
      audio: noneSingleton,
      video: noneSingleton,
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
      video: noneSingleton,
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
      video: noneSingleton,
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
      audio: noneSingleton,
      video: noneSingleton,
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
      video: noneSingleton,
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
      audio: noneSingleton,
      video: noneSingleton,
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
      audio: noneSingleton,
      video: noneSingleton,
    },
    supported_video_codecs: ['MPEG1', 'MPEG2'],
    supported_audio_codecs: [],
    mimetype: /(?:x-)?mov/i,
  },
};
var containerNames = defineIterableHelpers(function* () {
  for (let containerName of Object.keys(containerDefs)) {
    yield containerName;
  }
});
var containerEntries = defineIterableHelpers(function* () {
  for (let containerName of containerNames()) {
    yield containerDefs[containerName];
  }
});
function toContainer(containerName) {
  if (typeof containerName == 'string' && containerName in containerDefs) {
    return Some(containerName);
  } else {
    return noneSingleton;
  }
}
var qualityDefs = {
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
var qualityKeys = defineIterableHelpers(function* () {
  for (let qualityKey of Object.keys(qualityDefs)) {
    yield qualityKey;
  }
});
var qualityEntries = defineIterableHelpers(function* () {
  for (let qualityKey of qualityKeys()) {
    yield qualityDefs[qualityKey];
  }
});
function toQuality(input) {
  if (typeof input == 'string') {
    return qualityKeys().find(candidate => candidate == input);
  }
  if (typeof input == 'number') {
    let asString = input.toString();
    return toQuality(asString);
  }
  return noneSingleton;
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
function serializeMediaPrefs(prefs) {
  return serialize(prefs).unwrap();
}
function deserializeMediaPrefs(raw) {
  let parsed = deserialize(raw).unwrapOr({});
  let defaults = defaultMediaPrefs();
  let container = toContainer(parsed.container).unwrapOr(defaults.container);
  let videoCodec = toVideoCodec(parsed.video_codec).unwrapOr(
    defaults.video_codec,
  );
  let bestQuality = toQuality(parsed.best_video_quality).unwrapOr(
    defaults.best_video_quality,
  );
  let lowestQuality = toQuality(parsed.lowest_video_quality).unwrapOr(
    defaults.lowest_video_quality,
  );
  let preferredQuality;
  if ('prefered_video_quality' in parsed) {
    let parsedPreferred = toQuality(parsed.prefered_video_quality);
    if (parsedPreferred.isSome()) {
      preferredQuality = parsedPreferred.unwrap();
    }
  }
  let maxVariants = defaults.max_variants;
  if (typeof parsed.max_variants == 'number') {
    let parsedMax = parsed.max_variants;
    if (Number.isInteger(parsedMax) && parsedMax <= 11 && parsedMax > 0) {
      maxVariants = parsedMax;
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
      let container = toContainer(ignoredContainerName);
      if (container.isSome()) {
        ignoredContainers.push(container.unwrap());
      }
    }
  }
  let ignoredCodecs = [];
  if (Array.isArray(parsed.ignored_video_codecs)) {
    for (let ignoredCodecName of parsed.ignored_video_codecs) {
      let codec = toVideoCodec(ignoredCodecName);
      if (codec.isSome()) {
        ignoredCodecs.push(codec.unwrap());
      }
    }
  }
  let result = {
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
  if (typeof preferredQuality < 'u') {
    result.prefered_video_quality = preferredQuality;
  }
  return result;
}
var defaultViewOptions = {
  all_tabs: !1,
  low_quality: !1,
  sort_by_status: !0,
  sort_reverse: !1,
  show_button_clean: !0,
  show_button_clean_all: !1,
  show_button_convert_local: !1,
  hide_downloaded: !1,
};
var browserApiUnused = toEsm(requirePolyfill(), 1);
function deepEqual(left, right) {
  if (left == null || right === null || right === void 0) {
    return left === right;
  }
  if (left.constructor !== right.constructor) {
    return !1;
  }
  if (left instanceof Function || left instanceof RegExp) {
    return left === right;
  }
  if (left === right || left.valueOf() === right.valueOf()) {
    return !0;
  }
  if (
    (Array.isArray(left) && left.length !== right.length)
    || left instanceof Date
    || !(left instanceof Object)
    || !(right instanceof Object)
  ) {
    return !1;
  }
  let leftKeys = Object.keys(left);
  let rightKeys = Object.keys(right).every(key => leftKeys.indexOf(key) !== -1);
  let keysEqual = leftKeys.every(key => deepEqual(left[key], right[key]));
  return rightKeys && keysEqual;
}
async function saveStorageEntry(store, value) {
  let storedValue = value;
  if (store.hooks) {
    storedValue = store.hooks.setter(value);
  }
  await browserStorageApi.storage[store.where].set({
    [store.name]: storedValue,
  });
}
async function loadStorageEntry(store) {
  let stored = await browserStorageApi.storage[store.where].get(store.name);
  if (store.name in stored) {
    let rawValue = stored[store.name];
    if (store.hooks) {
      return store.hooks.getter(rawValue, store);
    } else {
      return rawValue;
    }
  }
  return store.default();
}
function watchStorageEntry(store, onChange) {
  browserStorageApi.storage[store.where].onChanged.addListener(changes => {
    let change = changes[store.name];
    if (change) {
      if (deepEqual(change.oldValue, change.newValue)) {
        return;
      }
      if (typeof change.newValue > 'u') {
        onChange(store.default());
      } else {
        if (store.hooks) {
          onChange(store.hooks.getter(change.newValue, store));
        } else {
          onChange(change.newValue);
        }
      }
    }
  });
}
var debuggerEnabledStore = {
  name: 'debugger_enabled',
  default: () => !1,
  where: 'local',
};
var usedHistoryButtonStore = {
  name: 'used_history_button',
  default: () => !1,
  where: 'local',
};
var useSidebarStore = {
  name: 'use_sidebar',
  default: () => !1,
  where: 'local',
};
var viewOptionsStore = {
  name: 'view_options',
  default: () => structuredClone(defaultViewOptions),
  where: 'local',
};
var defaultActionStore = {
  name: 'default_action',
  default: () => 'download',
  where: 'local',
};
var ytWarningStore = {
  name: 'yt_warning',
  default: () => !0,
  where: 'local',
};
var useWideUiStore = {
  name: 'use_wide_ui',
  default: () => !1,
  where: 'local',
};
var useLegacyUiStore = {
  name: 'use_legacy_ui',
  default: () => !0,
  where: 'local',
};
var openCountStore = {
  name: 'open_count_store',
  default: () => 0,
  where: 'session',
};
var sessionViewOptionsStore = {
  name: 'view_options',
  default: () => ({}),
  where: 'session',
};
var blacklistStore = {
  name: 'blacklist',
  default: () => [],
  where: 'local',
  hooks: {
    setter: entries => entries.filter(entry => entry.length > 0),
    getter: value => value,
  },
};
var mediaPrefsStore = {
  name: 'media_user_pref',
  where: 'local',
  default: () => defaultMediaPrefs(),
  hooks: {
    setter: value => serializeMediaPrefs(value),
    getter: raw => deserializeMediaPrefs(raw),
  },
};
var databaseStore = {
  name: 'database',
  where: 'session',
  default: () => ({
    yt_bulk: noneSingleton,
    user_messages: new Set(),
    coapp_status: 'checking',
    license_status: {
      checking: !0,
    },
    current_tab_id: 0,
    current_window_id: 0,
    downloadable: new Map(),
    downloading: new Map(),
    downloaded: new Map(),
    download_errors: new Map(),
  }),
  hooks: {
    setter: state => serialize(state).unwrap(),
    getter: (raw, store) => deserialize(raw).unwrapOr(store.default()),
  },
};
var debugLogBuffer = [];
var debuggerEnabled = await loadStorageEntry(debuggerEnabledStore);
var debugFlushTimer;
function debugLog(message) {
  if (debuggerEnabled) {
    debugLogBuffer.push({
      timestamp: Date.now(),
      message: message,
    });
    if (!debugFlushTimer) {
      debugFlushTimer = setTimeout(() => {
        debugFlushTimer = void 0;
        sendToBackground({
          debugger_new_logs: debugLogBuffer,
        });
        debugLogBuffer.length = 0;
      }, 500);
    }
  }
}
async function sendToBackground(message) {
  if (typeof message != 'string' && !('debugger_new_logs' in message)) {
    debugLog(`PostMessageToBackground - ${JSON.stringify(message)}`);
  }
  browserRuntimeApi.default.runtime.sendMessage(message);
}
browserRuntimeApi.default.runtime.onMessage.addListener(async message => {
  let payload = message;
  if ('progress_changed' in payload) {
    let { downloadable_id: downloadableId, progress: progress } =
      payload.progress_changed;
    UpdateProgress(downloadableId, progress);
  }
});
if (await loadStorageEntry(useLegacyUiStore)) {
  throw new Error('V9 panel openning while using legacy UI');
}
var currentWindowId;
function renderDownloadErrors(state, overrides) {
  let coreEl = document.querySelector('#core');
  let existingErrors = Array.from(coreEl.querySelectorAll('.download-error'));
  for (let errorEl of existingErrors) {
    let errorId = errorEl.dataset.errorId;
    if (!state.download_errors.has(errorId)) {
      errorEl.remove();
    }
  }
  let template = document.querySelector('template').content;
  for (let error of state.download_errors.values()) {
    let errorEl = document.querySelector(
      `.download-error[data-error-id="${error.id}"]`,
    );
    if (!errorEl) {
      let templateEl = template.querySelector(
        `.download-error[error-type="${error.error}"]`,
      );
      if (!templateEl) {
        debugLog("Didn't find template for error: " + error.error);
        continue;
      }
      errorEl = templateEl.cloneNode(!0);
      applyI18n(errorEl, overrides);
      errorEl.dataset.errorId = error.id;
      coreEl.insertBefore(errorEl, coreEl.firstChild);
    }
    errorEl.setAttribute('report-status', error.report_status);
    let reportButton = errorEl.querySelector('.button-report-error');
    if (reportButton) {
      if (error.report_status == 'reporting') {
        reportButton.setAttribute('loading', 'true');
        reportButton.setAttribute('disabled', 'true');
      } else {
        reportButton.removeAttribute('loading');
        reportButton.removeAttribute('disabled');
      }
    }
  }
  let nocoappEl = document.querySelector(
    '.download-error[data-error-id="nocoapp"]',
  );
  if (nocoappEl) {
    let recheckButton = nocoappEl.querySelector(
      '.error-nocoapp-button-recheck',
    );
    let installButton = nocoappEl.querySelector(
      '.error-nocoapp-button-install',
    );
    let successButton = nocoappEl.querySelector(
      '.error-nocoapp-button-success',
    );
    if (state.coapp_status == 'checking') {
      successButton.setAttribute('hidden', 'true');
      installButton.removeAttribute('hidden');
      installButton.disabled = !0;
      recheckButton.disabled = !0;
      recheckButton.setAttribute('loading', 'true');
    } else {
      if (state.coapp_status.found) {
        successButton.removeAttribute('hidden');
        installButton.setAttribute('hidden', 'true');
        installButton.disabled = !0;
        recheckButton.setAttribute('hidden', 'true');
        recheckButton.removeAttribute('loading');
      } else {
        successButton.setAttribute('hidden', 'true');
        installButton.removeAttribute('hidden');
        installButton.disabled = !1;
        recheckButton.disabled = !1;
        recheckButton.removeAttribute('loading');
      }
    }
  }
}
function renderUserMessages(state, overrides) {
  let coreEl = document.querySelector('#core');
  let existingMessages = Array.from(coreEl.querySelectorAll('.user-message'));
  for (let messageEl of existingMessages) {
    if (!state.user_messages.has(messageEl.dataset.userMessageId)) {
      messageEl.remove();
    }
  }
  let template = document.querySelector('template').content;
  for (let messageId of state.user_messages.values()) {
    let messageEl = document.querySelector(
      `.user-message[data-user-message-id="${messageId}"]`,
    );
    if (!messageEl) {
      let templateEl = template.querySelector(
        `.user-message[data-user-message-id="${messageId}"]`,
      );
      if (!templateEl) {
        debugLog("Didn't find template for user message: " + messageId);
        continue;
      }
      messageEl = templateEl.cloneNode(!0);
      applyI18n(messageEl, overrides);
      messageEl.dataset.userMessageId = messageId;
      coreEl.insertBefore(messageEl, coreEl.firstChild);
    }
    if (messageId == 'yt_bulk_detected' && state.yt_bulk.isSome()) {
      let ytBulk = state.yt_bulk.unwrap();
      messageEl.querySelector('.title').textContent = localizeMessage(
        'v9_yt_bulk_detected',
        [ytBulk.ids.length],
        overrides,
      );
    }
  }
}
function renderPanel(state, viewOptions, defaultAction, overrides) {
  let rows = buildDownloadableRows(state, viewOptions);
  let visibleCount = rows.reduce(
    (count, [, meta]) => count + (meta.is_visible ? 1 : 0),
    0,
  );
  let hasCurrentTab = rows.some(
    ([, meta]) => meta.is_visible && meta.is_current_tab,
  );
  if (
    state.download_errors.size
      + state.user_messages.size
      + visibleCount
      + (hasCurrentTab ? 0 : 1)
    > 1
  ) {
    document.documentElement.classList.add('expanded');
  }
  let nomediaEl = document.querySelector('#nomedia');
  if (hasCurrentTab) {
    nomediaEl.setAttribute('hidden', 'true');
  } else {
    nomediaEl.removeAttribute('hidden');
  }
  document.querySelector('#menu-view-all-tabs').checked = viewOptions.all_tabs;
  document.querySelector('#menu-view-hide-downloaded').checked =
    viewOptions.hide_downloaded;
  document.querySelector('#menu-view-show-low-quality').checked =
    viewOptions.low_quality;
  document.querySelector('#menu-view-sort-status').checked =
    viewOptions.sort_by_status;
  document.querySelector('#menu-view-sort-reverse').checked =
    viewOptions.sort_reverse;
  document
    .querySelector('#button-clean-all')
    .setAttribute('hidden', (!viewOptions.show_button_clean_all).toString());
  document
    .querySelector('#button-clean')
    .setAttribute('hidden', (!viewOptions.show_button_clean).toString());
  document
    .querySelector('#button-convert-local')
    .setAttribute(
      'hidden',
      (!viewOptions.show_button_convert_local).toString(),
    );
  document.querySelector('#menu-view-clean-all').checked =
    viewOptions.show_button_clean_all;
  document.querySelector('#menu-view-clean').checked =
    viewOptions.show_button_clean;
  currentWindowId = state.current_window_id;
  renderDownloadErrors(state, overrides);
  renderUserMessages(state, overrides);
  for (let downloadEl of Array.from(document.querySelectorAll('.download'))) {
    let downloadableId = downloadEl.dataset.downloadableId;
    if (
      !state.downloadable.has(downloadableId)
      && !state.downloading.has(downloadableId)
      && !state.downloaded.has(downloadableId)
    ) {
      downloadEl.remove();
    }
  }
  for (let [item, meta] of rows) {
    if (meta.is_visible) {
      let element;
      if (meta.reach === 'downloadable') {
        element = UpdateDownloadable(item, overrides);
      } else {
        if (meta.reach === 'downloading') {
          element = UpdateDownloading(item, overrides);
        } else {
          element = UpdateDownloaded(item, overrides);
        }
      }
      UpdateDefaultAction(element, defaultAction);
      element.setAttribute('style', `--order: ${meta.order.toString()}`);
    } else {
      let staleId;
      if ('downloadable' in item) {
        staleId = item.downloadable.id;
      } else {
        staleId = item.id;
      }
      let staleEl = document.querySelector(
        `#core-downloads > [data-downloadable-id="${staleId}"]`,
      );
      if (staleEl) {
        staleEl.remove();
      }
    }
  }
}
{
  let handleSlChange = function (event) {
    let target = event.target;
    if (!target) {
      return;
    }
    debugLog(`on_change - #${target.id}.${target.className}`);
    let qrCheckbox = target.closest(
      '.download-error[error-type="qrcode"] sl-checkbox',
    );
    if (qrCheckbox) {
      eventCounter++;
      let checked = qrCheckbox.checked;
      saveStorageEntry(ytWarningStore, !checked);
    }
  };
  let handleClick = function (event) {
    let target = event.target;
    if (!target) {
      return;
    }
    let downloadEl = target.closest('.download');
    let downloadableId = downloadEl?.dataset.downloadableId;
    if (target.closest('.error-nocoapp-button-install')) {
      browserRuntimeApi.default.tabs.create({
        url: 'https://www.downloadhelper.net/install-coapp-v2',
      });
    } else if (target.closest('.button-report-error')) {
      let errorEl = target.closest('.download-error');
      sendToBackground({
        report_error: errorEl.dataset.errorId,
      });
    } else if (target.closest('.button-trigger-bulk-download')) {
      sendToBackground('bulk_download');
    } else if (target.closest('.button-leave-review')) {
      sendToBackground('leave_review');
    } else if (target.closest('.button-never-show-one-hundred-message')) {
      sendToBackground('never_ask_for_review');
    } else if (target.closest('.user-message-hide-downloaded')) {
      sendToBackground({
        rm_user_message: 'auto_hide_downloaded',
      });
      loadStorageEntry(viewOptionsStore).then(viewOptions => {
        viewOptions.hide_downloaded = !0;
        saveStorageEntry(viewOptionsStore, viewOptions);
      });
    } else if (target.closest('.error-nocoapp-button-recheck')) {
      sendToBackground({
        coapp_check: !0,
      });
    } else if (target.closest('.error-nocoapp-button-success')) {
      sendToBackground({
        rm_error: 'nocoapp',
      });
    } else if (target.closest('.error-why-qr')) {
      browserRuntimeApi.default.tabs.create({
        url: 'https://www.downloadhelper.net/about-licensing',
      });
    } else if (target.closest('.error-invalid-license-get')) {
      browserRuntimeApi.default.tabs.create({
        url: 'https://www.downloadhelper.net/convert',
      });
    } else if (
      target.closest('.download-error .button-hide')
      || target.closest('.button-error-reported')
    ) {
      let errorId = target.closest('.download-error').dataset.errorId;
      sendToBackground({
        rm_error: errorId,
      });
    } else if (target.closest('.user-message .button-hide')) {
      let userMessageEl = target.closest('.user-message');
      sendToBackground({
        rm_user_message: userMessageEl.dataset.userMessageId,
      });
    } else if (target.closest('#button-convert-local')) {
      document.documentElement.classList.add('expanded');
      document.querySelector('#drawer-convert-to').show();
    } else if (target.closest('#drawer-menu-convert-to')) {
      document.querySelector('#drawer-convert-to').hide();
      let convertValue = target.value;
      sendToBackground({
        convert_local_to: convertValue,
      });
    } else if (target.closest('.menu-item-variant')) {
      let variantMenuItem = target.closest('.menu-item-variant');
      let variantId = variantMenuItem.dataset.variantId;
      let toCopy = variantMenuItem.dataset.toCopy;
      let variantsDropdown = downloadEl.querySelector('.dropdown-variants');
      let preferQualityCheckbox = downloadEl.querySelector(
        '.menu-prefer-quality',
      );
      let preferContainerCheckbox = downloadEl.querySelector(
        '.menu-prefer-container',
      );
      downloadEl.dataset.selectedVariantId = variantId;
      downloadEl.dataset.toCopy = toCopy;
      let preferQuality = preferQualityCheckbox.checked;
      let preferContainer = preferContainerCheckbox.checked;
      preferQualityCheckbox.checked = !1;
      preferContainerCheckbox.checked = !1;
      variantsDropdown.hide();
      Promise.resolve().then(async () => {
        let database = await loadStorageEntry(databaseStore);
        let downloadable = database.downloadable
          .get(downloadableId)
          .variants.get(variantId);
        let mediaPrefs = await loadStorageEntry(mediaPrefsStore);
        let viewOptions = await loadStorageEntry(viewOptionsStore);
        let sessionViewOptions = await loadStorageEntry(
          sessionViewOptionsStore,
        );
        let coreMedia = downloadable.core_media;
        if (
          preferQuality
          && coreMedia.av.video
          && coreMedia.av.video.quality.isSome()
        ) {
          mediaPrefs.prefered_video_quality =
            coreMedia.av.video.quality.unwrap();
        }
        if (preferContainer) {
          mediaPrefs.container = coreMedia.container.name;
        }
        await saveStorageEntry(mediaPrefsStore, mediaPrefs);
        let defaultAction = await loadStorageEntry(defaultActionStore);
        renderPanel(database, viewOptions, defaultAction, sessionViewOptions);
      });
    } else if (target.closest('.dropdown-actions')) {
      openActionsMenu(downloadEl);
    } else if (target.closest('.menu-smartnaming')) {
      closeOpenMenus();
      browserRuntimeApi.default.tabs.create({
        url: `/content2/smartnaming_editor.html?id=${downloadableId}`,
      });
    } else if (target.closest('#button-clean-all')) {
      sendToBackground({
        clean: !0,
      });
    } else if (target.closest('#button-clean')) {
      sendToBackground({
        clean: !1,
      });
    } else if (target.closest('#button-use-sidebar')) {
      saveStorageEntry(useSidebarStore, !0);
      configurePanelBehavior(!0, currentWindowId, !0);
      window.close();
    } else if (target.closest('#button-use-popup')) {
      saveStorageEntry(useSidebarStore, !1);
      configurePanelBehavior(!1, currentWindowId, !0);
    } else if (target.closest('.button-retry')) {
      sendToBackground({
        retry: downloadableId,
      });
    } else if (target.closest('.menu-details')) {
      closeOpenMenus();
      if (event.shiftKey) {
        loadStorageEntry(databaseStore).then(database => {
          let downloadable = database.downloadable.get(downloadableId);
          let plain = toPlainValue(downloadable);
          let json = JSON.stringify(plain, null, 4);
          let blob = new Blob([json], {
            type: 'text/json;charset=utf-8',
          });
          let blobUrl = URL.createObjectURL(blob);
          browserRuntimeApi.default.tabs.create({
            url: blobUrl,
          });
        });
      } else {
        browserRuntimeApi.default.tabs.create({
          url: `/content2/details.html?id=${downloadableId}`,
        });
      }
    } else if (target.closest('.button-dir')) {
      sendToBackground({
        show_dir: downloadableId,
      });
    } else if (target.closest('.button-play')) {
      if (downloadEl.dataset.inBrowserDownloadId) {
        let downloadId = downloadEl.dataset.inBrowserDownloadId;
        let requestPermission = () => {
          let permissionRequest = {
            permissions: ['downloads.open'],
          };
          browserRuntimeApi.default.permissions.request(permissionRequest);
        };
        if (browserRuntimeApi.default.downloads.open) {
          browserRuntimeApi.default.downloads
            .open(parseInt(downloadId))
            .catch(error => {
              requestPermission();
            });
        } else {
          requestPermission();
        }
      } else {
        sendToBackground({
          play: downloadableId,
        });
      }
    } else if (target.closest('.button-rm')) {
      sendToBackground({
        rm: downloadableId,
      });
    } else if (target.closest('.button-stop')) {
      sendToBackground({
        stop: downloadableId,
      });
    } else if (target.closest('.download .button-hide')) {
      sendToBackground({
        forget: downloadableId,
      });
    } else if (target.closest('.menu-blacklist-edit')) {
      closeOpenMenus();
      browserRuntimeApi.default.tabs.create({
        url: '/content2/blacklist.html',
      });
    } else if (target.closest('.button-open-browser-settings')) {
      if (browserTarget == 'mozilla') {
        browserRuntimeApi.default.tabs.create({
          url: 'https://github.com/aclap-dev/video-downloadhelper/wiki/Enable-Incognito',
        });
      } else {
        browserRuntimeApi.default.tabs.create({
          url: `chrome://extensions/?id=${browserRuntimeApi.default.runtime.id}`,
        });
      }
    } else if (target.closest('#dropdown-menu-view')) {
      let viewMenu = target.closest('#dropdown-menu-view');
      if (target.closest('#menu-view-open-settings')) {
        viewMenu.hide();
        sendToBackground({
          license_check: null,
        });
        sendToBackground({
          coapp_check: !1,
        });
        document.querySelector('.drawer-placement-bottom').show();
      } else {
        let allTabsItem = target.closest('#menu-view-all-tabs');
        let hideDownloadedItem = target.closest('#menu-view-hide-downloaded');
        let showLowQualityItem = target.closest('#menu-view-show-low-quality');
        let sortStatusItem = target.closest('#menu-view-sort-status');
        let sortReverseItem = target.closest('#menu-view-sort-reverse');
        let cleanAllItem = target.closest('#menu-view-clean-all');
        let cleanItem = target.closest('#menu-view-clean');
        loadStorageEntry(viewOptionsStore).then(viewOptions => {
          if (allTabsItem) {
            viewOptions.all_tabs = allTabsItem.checked;
          }
          if (hideDownloadedItem) {
            viewOptions.hide_downloaded = hideDownloadedItem.checked;
          }
          if (showLowQualityItem) {
            viewOptions.low_quality = showLowQualityItem.checked;
          }
          if (sortStatusItem) {
            viewOptions.sort_by_status = sortStatusItem.checked;
          }
          if (sortReverseItem) {
            viewOptions.sort_reverse = sortReverseItem.checked;
          }
          if (cleanAllItem) {
            viewOptions.show_button_clean_all = cleanAllItem.checked;
          }
          if (cleanItem) {
            viewOptions.show_button_clean = cleanItem.checked;
          }
          saveStorageEntry(viewOptionsStore, viewOptions);
        });
      }
    } else if (target.closest('.menu-blacklist')) {
      let blacklistMediaItem = target.closest('.menu-blacklist-media');
      let blacklistDomainItem = target.closest('.menu-blacklist-domain');
      let blacklistPageItem = target.closest('.menu-blacklist-page');
      if (blacklistPageItem || blacklistMediaItem || blacklistDomainItem) {
        closeOpenMenus();
        loadStorageEntry(blacklistStore).then(async blacklist => {
          let downloadable = (
            await loadStorageEntry(databaseStore)
          ).downloadable.get(downloadableId);
          let blacklistEntry;
          if (blacklistPageItem) {
            blacklistEntry = downloadable.page_url;
          } else {
            if (blacklistMediaItem) {
              blacklistEntry = downloadable.variants.values().next()
                .value.manifest_url;
            } else {
              if (blacklistDomainItem) {
                blacklistEntry = new URL(downloadable.page_url).origin + '/*';
              }
            }
          }
          blacklist.push(blacklistEntry);
          saveStorageEntry(blacklistStore, blacklist);
        });
      }
    } else if (target.closest('#button-show-history')) {
      saveStorageEntry(usedHistoryButtonStore, !0);
      browserRuntimeApi.default.tabs.create({
        url: '/content2/history.html',
      });
    } else {
      let downloadAction = target.closest('.action-download');
      let downloadAsAction = target.closest('.action-download_as');
      let downloadAudioAction = target.closest('.action-download_audio');
      let copyAction = target.closest('.action-copy');
      if (
        target.closest('.menu-actions')
        && downloadEl?.querySelector('.checkbox-remember-action')?.checked
      ) {
        if (downloadAction) {
          saveStorageEntry(defaultActionStore, 'download');
        } else {
          if (downloadAsAction) {
            saveStorageEntry(defaultActionStore, 'download_as');
          } else {
            if (downloadAudioAction) {
              saveStorageEntry(defaultActionStore, 'download_audio');
            } else {
              if (copyAction) {
                saveStorageEntry(defaultActionStore, 'copy');
              }
            }
          }
        }
      }
      let convertToItem = target.closest('.menu-convert-to');
      if (
        downloadAction
        ?? downloadAudioAction
        ?? downloadAsAction
        ?? convertToItem
      ) {
        debugLog('on_event - download_buttons is true');
        let selectedVariantId = downloadEl.dataset.selectedVariantId;
        let convertTo;
        if (convertToItem) {
          convertTo = convertToItem.value;
        }
        let downloadRequest = {
          download: {
            downloadable_id: downloadableId,
            variant_id: selectedVariantId,
            audio_only: !!downloadAudioAction,
            ask_for_destination: !!downloadAsAction,
            convert_to: convertTo,
          },
        };
        debugLog(`<do> download args: ${JSON.stringify(downloadRequest)}`);
        sendToBackground(downloadRequest);
        closeOpenMenus();
        debugLog('</done>');
      }
      if (copyAction) {
        let toCopy = downloadEl.dataset.toCopy;
        navigator.clipboard.writeText(toCopy);
        closeOpenMenus();
      }
    }
  };
  slChangeHandlerRef = handleSlChange;
  clickHandlerRef = handleClick;
  let eventCounter = 0;
  setInterval(() => {
    if (eventCounter > 1) {
      debugLog('event counter > 1');
    }
    eventCounter = 0;
  }, 500);
  window.addEventListener('click', handleClick);
  window.addEventListener('sl-change', handleSlChange);
}
var slChangeHandlerRef;
var clickHandlerRef;
{
  let openCount = await loadStorageEntry(openCountStore);
  await saveStorageEntry(openCountStore, ++openCount);
  if (openCount > 8) {
    sendToBackground('incognito_check');
  }
}
{
  async function bindClassToggle(store, selector, className) {
    let applyToggle = enabled => {
      document.querySelector(selector).classList.toggle(className, enabled);
    };
    applyToggle(await loadStorageEntry(store));
    watchStorageEntry(store, applyToggle);
  }
  bindClassToggle(usedHistoryButtonStore, '#footer', 'used-history-button');
  bindClassToggle(useWideUiStore, 'html', 'wide');
  let isSidebar = document.documentElement.id == 'sidebar';
  document.documentElement.setAttribute('target', browserTarget);
  document.documentElement.setAttribute(
    'os',
    (await browserRuntimeApi.default.runtime.getPlatformInfo()).os,
  );
  document.documentElement.classList.toggle('sidebar', isSidebar);
  watchStorageEntry(viewOptionsStore, async viewOptions => {
    let sessionViewOptions = await loadStorageEntry(sessionViewOptionsStore);
    let database = await loadStorageEntry(databaseStore);
    let defaultAction = await loadStorageEntry(defaultActionStore);
    renderPanel(database, viewOptions, defaultAction, sessionViewOptions);
  });
  watchStorageEntry(sessionViewOptionsStore, async sessionViewOptions => {
    let viewOptions = await loadStorageEntry(viewOptionsStore);
    let database = await loadStorageEntry(databaseStore);
    let defaultAction = await loadStorageEntry(defaultActionStore);
    renderPanel(database, viewOptions, defaultAction, sessionViewOptions);
  });
  watchStorageEntry(databaseStore, async database => {
    debugLog('DB changed');
    let sessionViewOptions = await loadStorageEntry(sessionViewOptionsStore);
    let viewOptions = await loadStorageEntry(viewOptionsStore);
    let defaultAction = await loadStorageEntry(defaultActionStore);
    renderPanel(database, viewOptions, defaultAction, sessionViewOptions);
  });
  watchStorageEntry(defaultActionStore, async defaultAction => {
    let database = await loadStorageEntry(databaseStore);
    let sessionViewOptions = await loadStorageEntry(sessionViewOptionsStore);
    let viewOptions = await loadStorageEntry(viewOptionsStore);
    renderPanel(database, viewOptions, defaultAction, sessionViewOptions);
  });
  let viewOptions = await loadStorageEntry(viewOptionsStore);
  let sessionViewOptions = await loadStorageEntry(sessionViewOptionsStore);
  let database = await loadStorageEntry(databaseStore);
  let defaultAction = await loadStorageEntry(defaultActionStore);
  renderPanel(database, viewOptions, defaultAction, sessionViewOptions);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('not-loaded');
    });
  } else {
    document.body.classList.remove('not-loaded');
  }
  document.addEventListener(
    'sl-show',
    event => {
      let target = event.target;
      if (
        target
        && (target.tagName == 'SL-DROPDOWN' || target.tagName == 'SL-DRAWER')
      ) {
        document.documentElement.classList.add('expanded');
        if (target.tagName == 'SL-DROPDOWN') {
          target.shadowRoot
            .querySelector('sl-popup')
            .removeAttribute('auto-size');
        }
      }
    },
    !0,
  );
}
function closeOpenMenus() {
  document.body.click();
}
function openActionsMenu(downloadEl) {
  let actionsMenu = downloadEl.querySelector('.menu-actions');
  if (!actionsMenu.classList.contains('closed')) {
    debugLog('Dropdown already open');
    return;
  }
  document.documentElement.classList.add('expanded');
  actionsMenu.classList.remove('closed');
  actionsMenu.removeAttribute('hidden');
  let closeMenu = () => {
    actionsMenu.classList.add('closed');
    setTimeout(() => {
      if (actionsMenu.classList.contains('closed')) {
        actionsMenu.setAttribute('hidden', 'true');
      }
    }, 200);
    window.removeEventListener('click', onOutsideClick, !0);
    window.removeEventListener('keydown', onKeydown, !0);
  };
  let onKeydown = event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };
  let onOutsideClick = event => {
    let target = event.target;
    if (target) {
      if (!(target == actionsMenu || actionsMenu.contains(target))) {
        closeMenu();
        event.stopPropagation();
      }
    }
  };
  window.addEventListener('click', onOutsideClick, !0);
  window.addEventListener('keydown', onKeydown, !0);
}
