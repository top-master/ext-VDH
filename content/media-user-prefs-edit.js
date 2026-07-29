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
    for (let propKey of getOwnPropNames(from)) {
      if (!hasOwnPropertyRef.call(targetObj, propKey) && propKey !== except) {
        defineProperty(targetObj, propKey, {
          get: () => from[propKey],
          enumerable:
            !(desc = getOwnPropDesc(from, propKey)) || desc.enumerable,
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
var requireBrowserApi = defineCommonjsModule(
  (browserApiExports, browserApiModule) => {
    'use strict';

    browserApiModule.exports.browser = requirePolyfill();
    var detectedBrowserType;
    if (typeof browser > 'u' && typeof chrome < 'u' && chrome.runtime) {
      if (/\bOPR\//.test(navigator.userAgent)) {
        detectedBrowserType = 'opera';
      } else {
        detectedBrowserType = 'chrome';
      }
    } else {
      if (/\bEdge\//.test(navigator.userAgent)) {
        detectedBrowserType = 'edge';
      } else {
        detectedBrowserType = 'firefox';
      }
    }
    browserApiModule.exports.browserType = detectedBrowserType;
    if (typeof browserApiModule.exports.browser.action > 'u') {
      browserApiModule.exports.browser.action =
        browserApiModule.exports.browser.browserAction;
    }
    browserApiModule.exports.isBrowser = (...browserTypes) => {
      for (let typeIndex = 0; typeIndex < browserTypes.length; typeIndex++) {
        if (browserTypes[typeIndex] == browserApiModule.exports.browserType) {
          return !0;
        }
      }
      return !1;
    };
    browserApiModule.exports.error = errorObj => {
      console.groupCollapsed(errorObj.message);
      if (errorObj.stack) {
        console.error(errorObj.stack);
      }
      console.groupEnd();
    };
  },
);
var requireI18n = defineCommonjsModule((i18nExports, i18nModule) => {
  'use strict';

  var { browser: browserApi } = requireBrowserApi();
  var i18nCache = {};
  var placeholderPattern = new RegExp('\\$[a-zA-Z]*([0-9]+)\\$', 'g');
  var customStringsLoaded = !1;
  var customStringsPromise = browserApi.storage.local
    .get('wehI18nCustom')
    .then(storageResult => {
      customStringsLoaded = !0;
      let customStrings = storageResult.wehI18nCustom;
      if (customStrings) {
        Object.assign(i18nCache, customStrings);
      }
    });
  function getMessage(messageKey, substitutions) {
    if (
      (customStringsLoaded
        || console.warn(
          'Using `weh._` before custom strings were loaded:',
          messageKey,
        ),
      /-/.test(messageKey))
    ) {
      let normalizedKey = messageKey.replace(/-/g, '_');
      console.warn(
        'Wrong i18n message name. Should it be',
        normalizedKey,
        'instead of',
        messageKey,
        '?',
      );
      messageKey = normalizedKey;
    }
    let cachedEntry = i18nCache[messageKey];
    if (
      (substitutions
        && !Array.isArray(substitutions)
        && (substitutions = [substitutions]),
      cachedEntry && cachedEntry.message.length > 0)
    ) {
      return (cachedEntry.message || '').replace(
        placeholderPattern,
        placeholder => {
          let placeholderMatch = placeholderPattern.exec(placeholder);
          return (
            (placeholderMatch
              && substitutions
              && substitutions[parseInt(placeholderMatch[1]) - 1])
            || '??'
          );
        },
      );
    }
    try {
      if (substitutions) {
        return browserApi.i18n.getMessage(messageKey, substitutions);
      } else {
        return browserApi.i18n.getMessage(messageKey);
      }
    } catch {
      return '';
    }
  }
  i18nModule.exports = {
    getMessage: getMessage,
    custom_strings_ready: customStringsPromise,
  };
});
var i18n = toEsm(requireI18n(), 1);
var releaseChannel = 'stable';
function dispatchReefEvent(eventName, detail, root = document) {
  let reefEvent = new CustomEvent(`reef:${eventName}`, {
    bubbles: !0,
    cancelable: !0,
    detail: detail,
  });
  return root.dispatchEvent(reefEvent);
}
function resolveElement(selectorOrElement) {
  if (typeof selectorOrElement == 'string') {
    return document.querySelector(selectorOrElement);
  } else {
    return selectorOrElement;
  }
}
var formElementTags = ['input', 'option', 'textarea'];
var domProperties = ['value', 'checked', 'selected'];
var booleanProperties = ['checked', 'selected'];
function isFalsyString(stringValue) {
  return ['false', 'null', 'undefined', '0', '-0', 'NaN', '0n', '-0n'].includes(
    stringValue,
  );
}
function bindEventHandler(element, attrName, attrValue, handlers) {
  if (!attrName.startsWith('on') || !handlers || element[attrName]) {
    return;
  }
  let handler = handlers[attrValue.split('(')[0]];
  if (handler) {
    element[attrName] = handler;
  }
}
function isDangerousAttribute(attrName, attrValue) {
  let normalizedValue = attrValue.replace(/\s+/g, '').toLowerCase();
  return (
    !(
      !['src', 'href', 'xlink:href'].includes(attrName)
      || (!normalizedValue.includes('javascript:')
        && !normalizedValue.includes('data:text/html'))
    )
    || !!(
      attrName.startsWith('on')
      || attrName.startsWith('@on')
      || attrName.startsWith('#on')
    )
    || void 0
  );
}
function applyAttribute(element, attrName, attrValue, handlers) {
  bindEventHandler(element, attrName, attrValue, handlers);
  if (!isDangerousAttribute(attrName, attrValue)) {
    if (domProperties.includes(attrName)) {
      element[attrName] = attrName === 'value' ? attrValue : ' ';
    }
    element.setAttribute(attrName, attrValue);
  }
}
function removeDomAttribute(element, attrName) {
  if (domProperties.includes(attrName)) {
    element[attrName] = '';
  }
  element.removeAttribute(attrName);
}
function sanitizeNode(node, handlers) {
  if (node.nodeType === 1) {
    for (let { name: attrName, value: attrValue } of node.attributes) {
      if (isDangerousAttribute(attrName, attrValue)) {
        removeDomAttribute(node, attrName);
        bindEventHandler(node, attrName, attrValue, handlers);
        continue;
      }
      if (!attrName.startsWith('@') && !attrName.startsWith('#')) {
        continue;
      }
      let cleanName = attrName.slice(1);
      removeDomAttribute(node, attrName);
      if (
        !(booleanProperties.includes(cleanName) && isFalsyString(attrValue))
      ) {
        applyAttribute(node, cleanName, attrValue, handlers);
      }
    }
    if (node.childNodes) {
      for (let childNode of node.childNodes) {
        sanitizeNode(childNode, handlers);
      }
    }
  }
}
function getTextContentOnly(node) {
  if (node.childNodes && node.childNodes.length) {
    return null;
  } else {
    return node.textContent;
  }
}
function patchNodes(templateParent, existingParent, handlers) {
  let templateChildren = templateParent.childNodes;
  let existingChildren = existingParent.childNodes;
  if (
    !(function (templateRoot) {
      let scriptNodes = templateRoot.querySelectorAll('script');
      for (let scriptNode of scriptNodes) {
        scriptNode.remove();
      }
    })(templateParent)
  ) {
    templateChildren.forEach(function (templateChild, childIndex) {
      if (!existingChildren[childIndex]) {
        let clonedNode = templateChild.cloneNode(!0);
        sanitizeNode(clonedNode, handlers);
        return void existingParent.append(clonedNode);
      }
      if (
        ((diffTemplateNode = templateChild),
        (diffExistingNode = existingChildren[childIndex]),
        (typeof diffTemplateNode.nodeType == 'number'
          && diffTemplateNode.nodeType !== diffExistingNode.nodeType)
          || (typeof diffTemplateNode.tagName == 'string'
            && diffTemplateNode.tagName !== diffExistingNode.tagName)
          || (typeof diffTemplateNode.id == 'string'
            && diffTemplateNode.id
            && diffTemplateNode.id !== diffExistingNode.id)
          || ('getAttribute' in diffTemplateNode
            && 'getAttribute' in diffExistingNode
            && diffTemplateNode.getAttribute('key')
              !== diffExistingNode.getAttribute('key'))
          || (typeof diffTemplateNode.src == 'string'
            && diffTemplateNode.src
            && diffTemplateNode.src !== diffExistingNode.src))
      ) {
        let findMatchingChild = (function (candidateNode, parentElement) {
          if (candidateNode.nodeType !== 1) {
            return;
          }
          let nodeId = candidateNode.getAttribute('id');
          let nodeKey = candidateNode.getAttribute('key');
          if (!nodeId || !nodeKey) {
            return;
          }
          let childSelector = nodeId ? `#${nodeId}` : `[key="${nodeKey}"]`;
          return parentElement.querySelector(`:scope > ${childSelector}`);
        })(templateChild, existingParent);
        if (!findMatchingChild) {
          let clonedNode = templateChild.cloneNode(!0);
          sanitizeNode(clonedNode, handlers);
          return void existingChildren[childIndex].before(clonedNode);
        }
        existingChildren[childIndex].before(findMatchingChild);
      }
      var diffTemplateNode;
      var diffExistingNode;
      if (
        (templateChildren[childIndex]
          && 'hasAttribute' in templateChildren[childIndex]
          && templateChildren[childIndex].hasAttribute('reef-ignore'))
        || ((function (templateNode, existingNode, handlers) {
          if (templateNode.nodeType !== 1) {
            return;
          }
          let templateAttrs = templateNode.attributes;
          let existingAttrs = existingNode.attributes;
          for (let { name: attrName, value: attrValue } of templateAttrs) {
            if (
              attrName.startsWith('#')
              || (domProperties.includes(attrName)
                && formElementTags.includes(templateNode.tagName.toLowerCase()))
            ) {
              continue;
            }
            let cleanAttrName = attrName.startsWith('@')
              ? attrName.slice(1)
              : attrName;
            if (
              booleanProperties.includes(cleanAttrName)
              && isFalsyString(attrValue)
            ) {
              removeDomAttribute(existingNode, cleanAttrName);
            } else {
              applyAttribute(existingNode, cleanAttrName, attrValue, handlers);
            }
          }
          for (let {
            name: existingAttrName,
            value: existingAttrValue,
          } of existingAttrs) {
            if (
              !(
                templateAttrs[existingAttrName]
                || (domProperties.includes(existingAttrName)
                  && formElementTags.includes(
                    existingNode.tagName.toLowerCase(),
                  ))
              )
            ) {
              removeDomAttribute(existingNode, existingAttrName);
            }
          }
        })(templateChild, existingChildren[childIndex], handlers),
        templateChild.nodeName.includes('-'))
      ) {
        return;
      }
      let textContent = getTextContentOnly(templateChild);
      if (
        (textContent
          && textContent !== getTextContentOnly(existingChildren[childIndex])
          && (existingChildren[childIndex].textContent = textContent),
        templateChild.childNodes.length
          || !existingChildren[childIndex].childNodes.length)
      ) {
        if (
          !existingChildren[childIndex].childNodes.length
          && templateChild.childNodes.length
        ) {
          let fragment = document.createDocumentFragment();
          patchNodes(templateChild, fragment, handlers);
          return void existingChildren[childIndex].appendChild(fragment);
        }
        if (templateChild.childNodes.length) {
          patchNodes(templateChild, existingChildren[childIndex], handlers);
        }
      } else {
        existingChildren[childIndex].innerHTML = '';
      }
    });
    (function (existingChildList, templateChildList) {
      let excessCount = existingChildList.length - templateChildList.length;
      if (!(excessCount < 1)) {
        for (; excessCount > 0; excessCount--) {
          existingChildList[existingChildList.length - 1].remove();
        }
      }
    })(existingChildren, templateChildren);
  }
}
function renderTemplate(target, htmlString, handlers) {
  let targetElement = resolveElement(target);
  let parseTemplate = (function (markup) {
    let parsedDoc = new DOMParser().parseFromString(
      `<body><template>${markup}</template></body>`,
      'text/html',
    );
    if (parsedDoc.body) {
      return parsedDoc.body.firstElementChild.content;
    } else {
      return document.createElement('body');
    }
  })(htmlString);
  if (dispatchReefEvent('before-render', null, targetElement)) {
    patchNodes(parseTemplate, targetElement, handlers);
    dispatchReefEvent('render', null, targetElement);
  }
}
var None = globalThis.tsResults.None;
Object.freeze(None);
var SomeImpl = globalThis.tsResults.Some;
var Some = SomeImpl;
var SomeNamespace = globalThis.tsResults.Option;

var ErrResultImpl = globalThis.tsResults.Err;
var ErrResult = ErrResultImpl;
var OkResultImpl = globalThis.tsResults.Ok;
var OkResult = OkResultImpl;
var ResultNamespace = globalThis.tsResults.Result;

var runAwaiter = function (thisArg, generatorArgs, promiseCtor, generatorFn) {
  function adoptValue(pendingValue) {
    if (pendingValue instanceof promiseCtor) {
      return pendingValue;
    } else {
      return new promiseCtor(function (resolveAdopted) {
        resolveAdopted(pendingValue);
      });
    }
  }
  return new (promiseCtor || (promiseCtor = Promise))(function (
    resolve,
    reject,
  ) {
    function onFulfilled(sentValue) {
      try {
        advance(generatorFn.next(sentValue));
      } catch (stepError) {
        reject(stepError);
      }
    }
    function onRejected(thrownReason) {
      try {
        advance(generatorFn.throw(thrownReason));
      } catch (stepError) {
        reject(stepError);
      }
    }
    function advance(stepResult) {
      if (stepResult.done) {
        resolve(stepResult.value);
      } else {
        adoptValue(stepResult.value).then(onFulfilled, onRejected);
      }
    }
    advance(
      (generatorFn = generatorFn.apply(thisArg, generatorArgs || [])).next(),
    );
  });
};
function withIteratorHelpers(generatorFn) {
  Object.assign(generatorFn.prototype, {
    find: function (predicate) {
      for (let item of this) {
        if (predicate(item)) {
          return Some(item);
        }
      }
      return None;
    },
    count: function (predicate) {
      return this.reduce(
        (matchCount, item) => (predicate(item) && matchCount++, matchCount),
        0,
      );
    },
    reduce: function (reducer, initialValue) {
      let accumulator = initialValue;
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
      return this.filterMap(item => (predicate(item) ? Some(item) : None));
    },
    enumerate: function () {
      let source = this;
      return withIteratorHelpers(function* () {
        let index = 0;
        for (let item of source) {
          yield [index, item];
          index++;
        }
      })();
    },
    filterMap: function (mapFn) {
      let source = this;
      return withIteratorHelpers(function* () {
        for (let item of source) {
          let mapped = mapFn(item);
          if (mapped.isSome()) {
            yield mapped.unwrap();
          }
        }
      })();
    },
    sort: function (comparator) {
      let array = this.toArray();
      array.sort(comparator);
      return array;
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
    return withIteratorHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Set.prototype.as_iter) {
  Set.prototype.as_iter = function () {
    let source = this;
    return withIteratorHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Map.prototype.as_iter) {
  Map.prototype.as_iter = function () {
    let source = this;
    return withIteratorHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
var browserPolyfill = toEsm(requirePolyfill(), 1);
var hasStringProp = (obj, propName) => typeof obj[propName] == 'string';
function deserialize(data) {
  try {
    if (hasStringProp(data, '__serializer_tag')) {
      if (data.__serializer_tag === 'primitive') {
        return OkResult(data.__serializer_value);
      }
      if (data.__serializer_tag === 'regex') {
        let regexPattern = new RegExp(data.__serializer_value);
        return OkResult(regexPattern);
      } else if (data.__serializer_tag === 'array') {
        let arrayItems = [];
        for (let serializedItem of data.__serializer_value) {
          let deserializedItem = deserialize(serializedItem);
          if (deserializedItem.isErr()) {
            return deserializedItem;
          }
          arrayItems.push(deserializedItem.unwrap());
        }
        return OkResult(arrayItems);
      } else if (data.__serializer_tag === 'map') {
        let mapEntries = [];
        for (let serializedEntry of data.__serializer_value) {
          let deserializedEntry = deserialize(serializedEntry);
          if (deserializedEntry.isErr()) {
            return deserializedEntry;
          }
          mapEntries.push(deserializedEntry.unwrap());
        }
        return OkResult(new Map(mapEntries));
      } else if (data.__serializer_tag === 'set') {
        let setItems = [];
        for (let serializedItem of data.__serializer_value) {
          let deserializedItem = deserialize(serializedItem);
          if (deserializedItem.isErr()) {
            return deserializedItem;
          }
          setItems.push(deserializedItem.unwrap());
        }
        return OkResult(new Set(setItems));
      } else if (data.__serializer_tag === 'result_ok') {
        let serializedInner = data.__serializer_value;
        let deserializedInner = deserialize(serializedInner);
        if (deserializedInner.isErr()) {
          return deserializedInner;
        } else {
          return OkResult(OkResult(deserializedInner.unwrap()));
        }
      } else if (data.__serializer_tag === 'result_err') {
        let serializedInner = data.__serializer_value;
        let deserializedInner = deserialize(serializedInner);
        if (deserializedInner.isErr()) {
          return deserializedInner;
        } else {
          return OkResult(ErrResult(deserializedInner.unwrap()));
        }
      } else if (data.__serializer_tag === 'option_some') {
        let serializedInner = data.__serializer_value;
        let deserializedInner = deserialize(serializedInner);
        if (deserializedInner.isErr()) {
          return deserializedInner;
        } else {
          return OkResult(Some(deserializedInner.unwrap()));
        }
      } else if (data.__serializer_tag === 'option_none') {
        return OkResult(None);
      }
    }
    let valueType = typeof data;
    if (
      valueType === 'string'
      || valueType === 'number'
      || valueType === 'boolean'
      || valueType === 'undefined'
      || Array.isArray(data)
      || data == null
    ) {
      return ErrResult('This object was not serialized with Serialize');
    }
    let deserializedObj = {};
    for (let objKey of Object.keys(data)) {
      if (typeof objKey == 'string') {
        let deserializedProp = deserialize(data[objKey]);
        if (deserializedProp.isErr()) {
          return deserializedProp;
        }
        deserializedObj[objKey] = deserializedProp.unwrap();
      }
    }
    return OkResult(deserializedObj);
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
      .find(serializedResult => serializedResult.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let unwrappedItems = serializedItems
      .as_iter()
      .map(serializedResult => serializedResult.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'array',
      __serializer_value: unwrappedItems,
    });
  } else if (value instanceof Map) {
    let serializedEntries = [...value.entries()].map(entry => serialize(entry));
    let firstError = serializedEntries
      .as_iter()
      .find(serializedResult => serializedResult.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let unwrappedEntries = serializedEntries
      .as_iter()
      .map(serializedResult => serializedResult.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'map',
      __serializer_value: unwrappedEntries,
    });
  } else if (value instanceof Set) {
    let serializedValues = [...value.values()].map(setValue =>
      serialize(setValue),
    );
    let firstError = serializedValues
      .as_iter()
      .find(serializedResult => serializedResult.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let unwrappedValues = serializedValues
      .as_iter()
      .map(serializedResult => serializedResult.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: 'set',
      __serializer_value: unwrappedValues,
    });
  } else if (ResultNamespace.isResult(value)) {
    if (value.isOk()) {
      let okValue = value.unwrap();
      let serializedOk = serialize(okValue);
      if (serializedOk.isErr()) {
        return serializedOk;
      } else {
        return OkResult({
          __serializer_tag: 'result_ok',
          __serializer_value: serializedOk.unwrap(),
        });
      }
    } else {
      let errValue = value.unwrapErr();
      let serializedErr = serialize(errValue);
      if (serializedErr.isErr()) {
        return serializedErr;
      } else {
        return OkResult({
          __serializer_tag: 'result_err',
          __serializer_value: serializedErr.unwrap(),
        });
      }
    }
  } else if (SomeNamespace.isOption(value)) {
    if (value.isSome()) {
      let someValue = value.unwrap();
      let serializedSome = serialize(someValue);
      if (serializedSome.isErr()) {
        return serializedSome;
      } else {
        return OkResult({
          __serializer_tag: 'option_some',
          __serializer_value: serializedSome.unwrap(),
        });
      }
    } else {
      return OkResult({
        __serializer_tag: 'option_none',
      });
    }
  } else if (valueType === 'object') {
    let serializedObj = {};
    let sourceObj = value;
    for (let objKey of Object.keys(value)) {
      let propValue = sourceObj[objKey];
      let serializedProp = serialize(propValue);
      if (serializedProp.isErr()) {
        continue;
      }
      let unwrappedProp = serializedProp.unwrap();
      serializedObj[objKey] = unwrappedProp;
    }
    return OkResult(serializedObj);
  } else {
    return ErrResult('Unsupported value');
  }
}
var matchNothingRegex = /.^/;
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
    mimetype: matchNothingRegex,
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
    mimetype: matchNothingRegex,
    defacto_container: 'Mpeg',
  },
  MPEG2: {
    name: 'MPEG2',
    type: 'video',
    mimetype: matchNothingRegex,
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
    mimetype: matchNothingRegex,
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
    mimetype: matchNothingRegex,
    defacto_container: 'Wav',
  },
  unknown: {
    name: 'unknown',
    type: 'audio',
    mimetype: matchNothingRegex,
    defacto_container: 'Mp4',
  },
};
var iterVideoCodecs = withIteratorHelpers(function* () {
  for (let codecKey of Object.keys(videoCodecs)) {
    yield videoCodecs[codecKey];
  }
});
var iterAudioCodecs = withIteratorHelpers(function* () {
  for (let codecKey of Object.keys(audioCodecs)) {
    yield audioCodecs[codecKey];
  }
});
function parseVideoCodec(codecName) {
  if (typeof codecName == 'string' && codecName in videoCodecs) {
    return Some(codecName);
  } else {
    return None;
  }
}
var containers = {
  Mp4: {
    name: 'Mp4',
    extension: 'mp4',
    audio_only_extension: 'mp3',
    defacto_codecs: {
      audio: None,
      video: None,
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
      audio: None,
      video: None,
    },
    supported_video_codecs: iterVideoCodecs()
      .filter(codec => codec.name != 'unknown')
      .map(codec => codec.name)
      .toArray(),
    supported_audio_codecs: iterAudioCodecs()
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
      audio: None,
      video: None,
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
      audio: None,
      video: None,
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
      audio: None,
      video: None,
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
      audio: None,
      video: None,
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
      video: None,
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
      video: None,
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
      audio: None,
      video: None,
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
      video: None,
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
      audio: None,
      video: None,
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
      audio: None,
      video: None,
    },
    supported_video_codecs: ['MPEG1', 'MPEG2'],
    supported_audio_codecs: [],
    mimetype: /(?:x-)?mov/i,
  },
};
var iterContainerNames = withIteratorHelpers(function* () {
  for (let containerKey of Object.keys(containers)) {
    yield containerKey;
  }
});
var iterContainers = withIteratorHelpers(function* () {
  for (let containerKey of iterContainerNames()) {
    yield containers[containerKey];
  }
});
function parseContainer(containerName) {
  if (typeof containerName == 'string' && containerName in containers) {
    return Some(containerName);
  } else {
    return None;
  }
}
function getContainer(containerName) {
  return containers[containerName];
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
function isLowerQuality(qualityA, qualityB) {
  let valueA = parseInt(qualityA);
  let valueB = parseInt(qualityB);
  return valueA < valueB;
}
function isHigherQuality(qualityA, qualityB) {
  let valueA = parseInt(qualityA);
  let valueB = parseInt(qualityB);
  return valueA > valueB;
}
var iterQualityIds = withIteratorHelpers(function* () {
  for (let qualityKey of Object.keys(videoQualities)) {
    yield qualityKey;
  }
});
var iterQualities = withIteratorHelpers(function* () {
  for (let qualityKey of iterQualityIds()) {
    yield videoQualities[qualityKey];
  }
});
function parseQuality(qualityValue) {
  if (typeof qualityValue == 'string') {
    return iterQualityIds().find(qualityId => qualityId == qualityValue);
  }
  if (typeof qualityValue == 'number') {
    let qualityString = qualityValue.toString();
    return parseQuality(qualityString);
  }
  return None;
}
function defaultPrefs() {
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
function deserializePrefs(serializedPrefs) {
  let rawPrefs = deserialize(serializedPrefs).unwrapOr({});
  let defaults = defaultPrefs();
  let container = parseContainer(rawPrefs.container).unwrapOr(
    defaults.container,
  );
  let videoCodec = parseVideoCodec(rawPrefs.video_codec).unwrapOr(
    defaults.video_codec,
  );
  let bestVideoQuality = parseQuality(rawPrefs.best_video_quality).unwrapOr(
    defaults.best_video_quality,
  );
  let lowestVideoQuality = parseQuality(rawPrefs.lowest_video_quality).unwrapOr(
    defaults.lowest_video_quality,
  );
  let preferedVideoQuality;
  if ('prefered_video_quality' in rawPrefs) {
    let parsedPreferred = parseQuality(rawPrefs.prefered_video_quality);
    if (parsedPreferred.isSome()) {
      preferedVideoQuality = parsedPreferred.unwrap();
    }
  }
  let maxVariants = defaults.max_variants;
  if (typeof rawPrefs.max_variants == 'number') {
    let rawMaxVariants = rawPrefs.max_variants;
    if (
      Number.isInteger(rawMaxVariants)
      && rawMaxVariants <= 11
      && rawMaxVariants > 0
    ) {
      maxVariants = rawMaxVariants;
    }
  }
  let prefer60fps = defaults.prefer_60fps;
  if (typeof rawPrefs.prefer_60fps == 'boolean') {
    prefer60fps = rawPrefs.prefer_60fps;
  }
  let ignoreLowQualityHits = defaults.ignore_low_quality_hits;
  if (typeof rawPrefs.ignore_low_quality_hits == 'boolean') {
    ignoreLowQualityHits = rawPrefs.ignore_low_quality_hits;
  }
  let ignoredContainers = [];
  if (Array.isArray(rawPrefs.ignored_containers)) {
    for (let rawContainerName of rawPrefs.ignored_containers) {
      let parsedContainer = parseContainer(rawContainerName);
      if (parsedContainer.isSome()) {
        ignoredContainers.push(parsedContainer.unwrap());
      }
    }
  }
  let ignoredVideoCodecs = [];
  if (Array.isArray(rawPrefs.ignored_video_codecs)) {
    for (let rawCodecName of rawPrefs.ignored_video_codecs) {
      let parsedCodec = parseVideoCodec(rawCodecName);
      if (parsedCodec.isSome()) {
        ignoredVideoCodecs.push(parsedCodec.unwrap());
      }
    }
  }
  let normalizedPrefs = {
    prefer_60fps: prefer60fps,
    ignore_low_quality_hits: ignoreLowQualityHits,
    container: container,
    max_variants: maxVariants,
    video_codec: videoCodec,
    lowest_video_quality: lowestVideoQuality,
    best_video_quality: bestVideoQuality,
    ignored_containers: ignoredContainers,
    ignored_video_codecs: ignoredVideoCodecs,
  };
  if (typeof preferedVideoQuality < 'u') {
    normalizedPrefs.prefered_video_quality = preferedVideoQuality;
  }
  return normalizedPrefs;
}
var browserPolyfillImport = toEsm(requirePolyfill(), 1);
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
  let allKeysPresent = Object.keys(right).every(
    key => leftKeys.indexOf(key) !== -1,
  );
  let valuesEqual = leftKeys.every(key => deepEqual(left[key], right[key]));
  return allKeysPresent && valuesEqual;
}
async function writeSetting(setting, value) {
  let storedValue = value;
  if (setting.hooks) {
    storedValue = setting.hooks.setter(value);
  }
  await browserPolyfill.storage[setting.where].set({
    [setting.name]: storedValue,
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
function watchSetting(setting, onChange) {
  browserPolyfill.storage[setting.where].onChanged.addListener(changes => {
    let change = changes[setting.name];
    if (change) {
      if (deepEqual(change.oldValue, change.newValue)) {
        return;
      }
      if (typeof change.newValue > 'u') {
        onChange(setting.default());
      } else {
        if (setting.hooks) {
          onChange(setting.hooks.getter(change.newValue, setting));
        } else {
          onChange(change.newValue);
        }
      }
    }
  });
}
var mediaPrefsSetting = {
  name: 'media_user_pref',
  where: 'local',
  default: () => defaultPrefs(),
  hooks: {
    setter: prefsToStore => serializePrefs(prefsToStore),
    getter: storedPrefs => deserializePrefs(storedPrefs),
  },
};
{
  await new Promise(resolveReady => {
    if (document.readyState == 'loading') {
      window.addEventListener('DOMContentLoaded', () => resolveReady());
    } else {
      resolveReady();
    }
  });
  await i18n.custom_strings_ready;
  document.title = (0, i18n.getMessage)('mup_page_title');
  document.documentElement.setAttribute('channel', releaseChannel);
  for (let i18nElement of Array.from(
    document.querySelectorAll('[data-i18n]'),
  )) {
    i18nElement.textContent = (0, i18n.getMessage)(i18nElement.dataset.i18n);
  }
}
var savedToastTimeout = null;
var showSavedToast = () => {
  if (savedToastTimeout) {
    clearTimeout(savedToastTimeout);
  }
  let toaster = document.querySelector('#saved-toaster');
  toaster.classList.remove('hidden');
  savedToastTimeout = window.setTimeout(() => {
    toaster.classList.add('hidden');
  }, 1e3);
};
var renderPrefsForm = prefs => {
  let containerOptionsHtml = '';
  let formHtml = '';
  formHtml += `
    <div>
      <label for="max-variant-input">${(0, i18n.getMessage)('mup_max_variants')}:</label>
      <input type="number" step="1" size="3" id="max-variant-input" min="1" max="10" @value="${prefs.max_variants}"/>
      <br><em>${(0, i18n.getMessage)('mup_max_variants_help')}</em>
    </div>`;
  formHtml += `
    <div>
      <label for="prefer-60fps-input">${(0, i18n.getMessage)('mup_prefer_60fps')}:</label>
      <input type="checkbox" id="prefer-60fps-input" @checked="${prefs.prefer_60fps}"/>
    </div>`;
  formHtml += `
    <div>
      <label for="ignore-low-quality-hits-input">${(0, i18n.getMessage)('mup_ignore_low_quality')}:</label>
      <input type="checkbox" id="ignore-low-quality-hits-input" @checked="${prefs.ignore_low_quality_hits}"/>
      <br><em>${(0, i18n.getMessage)('mup_ignore_low_quality_help')}</em>
    </div>`;
  {
    let supportedContainers = iterContainers().filter(
      container => container.supported_video_codecs.length > 0,
    );
    for (let container of supportedContainers) {
      let selectedAttr = container.name == prefs.container ? 'selected' : '';
      containerOptionsHtml += `<option value="${container.name}" ${selectedAttr}>${container.name}</option>`;
    }
    formHtml += `
    <div>
      <label for="container-select">${(0, i18n.getMessage)('mup_prefered_container')}:</label>
      <select id="container-select" value="${prefs.container}">
        ${containerOptionsHtml}
      </select>
    </div>`;
  }
  {
    let codecOptionsHtml = '';
    let containerDef = getContainer(prefs.container);
    for (let codec of containerDef.supported_video_codecs) {
      let selectedAttr = prefs.video_codec == codec ? 'selected' : '';
      codecOptionsHtml += `<option value="${codec}" ${selectedAttr}>${codec}</option>`;
    }
    formHtml += `
    <div>
      <label for="codec-select-${prefs.container}">${(0, i18n.getMessage)('mup_prefered_video_codecs')}:</label>
      <select class="codec-select" id="codec-select-${prefs.container}" value="${prefs.video_codec}">
        ${codecOptionsHtml}
      </select>
    </div>`;
  }
  {
    let lowestQualityOptions = '';
    let bestQualityOptions = '';
    for (let quality of iterQualityIds()) {
      let lowestSelectedAttr =
        prefs.lowest_video_quality == quality ? 'selected' : '';
      let lowestDisabledAttr = isLowerQuality(quality, prefs.best_video_quality)
        ? ''
        : 'disabled';
      lowestQualityOptions =
        `<option value="${quality}" ${lowestDisabledAttr} ${lowestSelectedAttr}>${quality}p</option>`
        + lowestQualityOptions;
      lowestSelectedAttr =
        prefs.best_video_quality == quality ? 'selected' : '';
      lowestDisabledAttr = isHigherQuality(quality, prefs.lowest_video_quality)
        ? ''
        : 'disabled';
      bestQualityOptions =
        `<option value="${quality}" ${lowestDisabledAttr} ${lowestSelectedAttr}>${quality}p</option>`
        + bestQualityOptions;
    }
    formHtml += `
    <div>
      <label for="best-video-quality-select">${(0, i18n.getMessage)('mup_best_video_quality')}:</label>
      <select id="best-video-quality-select" value="${prefs.best_video_quality}">
         ${bestQualityOptions}
      </select>
    </div>
    <div>
      <label for="lowest-video-quality-select">${(0, i18n.getMessage)('mup_lowest_video_quality')}:</label>
      <select id="lowest-video-quality-select" value="${prefs.lowest_video_quality}">
        ${lowestQualityOptions}
      </select>
    </div>`;
  }
  {
    let ignoredContainerRows = iterContainerNames()
      .map(containerName => {
        let isIgnored = prefs.ignored_containers
          .as_iter()
          .any(ignoredName => ignoredName == containerName);
        return `
        <div>
          <input type="checkbox" data-container="${containerName}" id="ignored_container_${containerName}" @checked="${isIgnored}"/>
          <label for="ignored_container_${containerName}">${containerName}</label>
        </div>`;
      })
      .toArray()
      .join('');
    let ignoredCodecRows = iterVideoCodecs()
      .map(codec => {
        let isIgnored = prefs.ignored_video_codecs
          .as_iter()
          .any(ignoredCodecName => ignoredCodecName == codec.name);
        return `
        <div>
          <input type="checkbox" data-video-codec="${codec.name}" id="ignored_codec_${codec.name}" @checked="${isIgnored}"/>
          <label for="ignored_codec_${codec.name}">${codec.name}</label>
        </div>`;
      })
      .toArray()
      .join('');
    formHtml += `
      <vbox>
        <fieldset id="ignored-containers-fieldset">
          <legend>${(0, i18n.getMessage)('mup_ignored_containers')}:</legend>
          ${ignoredContainerRows}
        </fieldset>
        <fieldset id="ignored-video-codecs-fieldset">
          <legend>${(0, i18n.getMessage)('mup_ignored_video_codecs')}:</legend>
          ${ignoredCodecRows}
        </fieldset>
      </vbox>
    `;
  }
  renderTemplate('section', formHtml);
};
var MediaPrefsController = class {
  constructor() {
    watchSetting(mediaPrefsSetting, () => {
      showSavedToast();
      this.read_from_storage();
    });
    this.is_ready_p = this.read_from_storage();
  }
  async is_ready() {
    await this.is_ready_p;
    return this;
  }
  async read_from_storage() {
    this.state = await readSetting(mediaPrefsSetting);
    renderPrefsForm(this.state);
  }
  async reset() {
    await removeSetting(mediaPrefsSetting);
  }
  async write_to_storage() {
    return writeSetting(mediaPrefsSetting, this.state);
  }
  async set_max_variants(maxVariants) {
    if (Number.isInteger(maxVariants) && maxVariants <= 10 && maxVariants > 0) {
      this.state.max_variants = maxVariants;
      await this.write_to_storage();
    }
  }
  async set_prefer_60fps(prefer60fps) {
    this.state.prefer_60fps = prefer60fps;
    await this.write_to_storage();
  }
  async set_ignore_low_quality_hits(ignoreLowQualityHits) {
    this.state.ignore_low_quality_hits = ignoreLowQualityHits;
    await this.write_to_storage();
  }
  async set_lowest_video_quality(lowestQuality) {
    this.state.lowest_video_quality = lowestQuality;
    await this.write_to_storage();
  }
  async set_best_video_quality(bestQuality) {
    this.state.best_video_quality = bestQuality;
    await this.write_to_storage();
  }
  async set_video_codec(videoCodec) {
    this.state.video_codec = videoCodec;
    await this.write_to_storage();
  }
  async set_ignored_containers(ignoredContainers) {
    this.state.ignored_containers = ignoredContainers;
    await this.write_to_storage();
  }
  async set_ignored_video_codecs(ignoredVideoCodecs) {
    this.state.ignored_video_codecs = ignoredVideoCodecs;
    await this.write_to_storage();
  }
  async set_container(container) {
    if (this.state.container == container) {
      return;
    }
    this.state.container = container;
    let defaultCodec = getContainer(container).supported_video_codecs[0];
    if (defaultCodec) {
      this.state.video_codec = defaultCodec;
    } else {
      throw new Error('Unexpected container.');
    }
    await this.write_to_storage();
  }
};
var prefsController = await new MediaPrefsController().is_ready();
{
  let handleInput = function (inputEvent) {
    let eventTarget = inputEvent.target;
    if (eventTarget) {
      let containerSelect = eventTarget.closest('#container-select');
      let codecSelect = eventTarget.closest('.codec-select');
      let lowestQualitySelect = eventTarget.closest(
        '#lowest-video-quality-select',
      );
      let bestQualitySelect = eventTarget.closest('#best-video-quality-select');
      let ignoredContainersFieldset = eventTarget.closest(
        '#ignored-containers-fieldset',
      );
      let ignoredCodecsFieldset = eventTarget.closest(
        '#ignored-video-codecs-fieldset',
      );
      let maxVariantInput = eventTarget.closest('#max-variant-input');
      let prefer60fpsInput = eventTarget.closest('#prefer-60fps-input');
      let ignoreLowQualityInput = eventTarget.closest(
        '#ignore-low-quality-hits-input',
      );
      if (containerSelect) {
        prefsController.set_container(containerSelect.value);
      } else if (codecSelect) {
        prefsController.set_video_codec(codecSelect.value);
      } else if (lowestQualitySelect) {
        prefsController.set_lowest_video_quality(
          parseQuality(lowestQualitySelect.value).unwrap(),
        );
      } else if (bestQualitySelect) {
        prefsController.set_best_video_quality(
          parseQuality(bestQualitySelect.value).unwrap(),
        );
      } else if (ignoredContainersFieldset) {
        let selectedContainers = Array.from(
          ignoredContainersFieldset.querySelectorAll('input'),
        )
          .as_iter()
          .filterMap(checkbox =>
            checkbox.checked ? Some(checkbox.dataset.container) : None,
          )
          .toArray();
        prefsController.set_ignored_containers(selectedContainers);
      } else if (ignoredCodecsFieldset) {
        let selectedCodecs = Array.from(
          ignoredCodecsFieldset.querySelectorAll('input'),
        )
          .as_iter()
          .filterMap(checkbox =>
            checkbox.checked ? Some(checkbox.dataset.videoCodec) : None,
          )
          .toArray();
        prefsController.set_ignored_video_codecs(selectedCodecs);
      } else {
        if (maxVariantInput) {
          prefsController.set_max_variants(parseInt(maxVariantInput.value));
        } else {
          if (prefer60fpsInput) {
            prefsController.set_prefer_60fps(prefer60fpsInput.checked);
          } else {
            if (ignoreLowQualityInput) {
              prefsController.set_ignore_low_quality_hits(
                ignoreLowQualityInput.checked,
              );
            }
          }
        }
      }
    }
  };
  inputChangeHandler = handleInput;
  window.addEventListener('input', handleInput);
  window.addEventListener('change', handleInput);
  window.addEventListener('click', clickEvent => {
    let clickTarget = clickEvent.target;
    if (clickTarget && clickTarget.closest('#reset_button')) {
      prefsController.reset();
    }
  });
}
var inputChangeHandler;
/*! Bundled license information:

reefjs/dist/reef.es.min.js:
  (*! reef v13.0.2 | (c) 2023 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef *)
*/
