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
function stringifyValue(value) {
  var text = String(value);
  if (text === '[object Object]') {
    try {
      text = JSON.stringify(value);
    } catch {}
  }
  return text;
}
var NoneClass = (function () {
  function NoneImpl() {}
  NoneImpl.prototype.isSome = function () {
    return !1;
  };
  NoneImpl.prototype.isNone = function () {
    return !0;
  };
  NoneImpl.prototype[Symbol.iterator] = function () {
    return {
      next: function () {
        return {
          done: !0,
          value: void 0,
        };
      },
    };
  };
  NoneImpl.prototype.unwrapOr = function (defaultValue) {
    return defaultValue;
  };
  NoneImpl.prototype.expect = function (message) {
    throw new Error(''.concat(message));
  };
  NoneImpl.prototype.unwrap = function () {
    throw new Error('Tried to unwrap None');
  };
  NoneImpl.prototype.map = function (mapFn) {
    return this;
  };
  NoneImpl.prototype.mapOr = function (fallback, mapFn) {
    return fallback;
  };
  NoneImpl.prototype.mapOrElse = function (fallbackFn, mapFn) {
    return fallbackFn();
  };
  NoneImpl.prototype.or = function (alternative) {
    return alternative;
  };
  NoneImpl.prototype.orElse = function (alternativeFn) {
    return alternativeFn();
  };
  NoneImpl.prototype.andThen = function (mapFn) {
    return this;
  };
  NoneImpl.prototype.toResult = function (errorValue) {
    return newErr(errorValue);
  };
  NoneImpl.prototype.toString = function () {
    return 'None';
  };
  return NoneImpl;
})();
var noneSingleton = new NoneClass();
Object.freeze(noneSingleton);
var SomeClass = (function () {
  function SomeImpl(value) {
    if (!(this instanceof SomeImpl)) {
      return new SomeImpl(value);
    }
    this.value = value;
  }
  SomeImpl.prototype.isSome = function () {
    return !0;
  };
  SomeImpl.prototype.isNone = function () {
    return !1;
  };
  SomeImpl.prototype[Symbol.iterator] = function () {
    var boxedValue = Object(this.value);
    if (Symbol.iterator in boxedValue) {
      return boxedValue[Symbol.iterator]();
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
  SomeImpl.prototype.unwrapOr = function (defaultValue) {
    return this.value;
  };
  SomeImpl.prototype.expect = function (message) {
    return this.value;
  };
  SomeImpl.prototype.unwrap = function () {
    return this.value;
  };
  SomeImpl.prototype.map = function (mapFn) {
    return Some(mapFn(this.value));
  };
  SomeImpl.prototype.mapOr = function (fallback, mapFn) {
    return mapFn(this.value);
  };
  SomeImpl.prototype.mapOrElse = function (fallbackFn, mapFn) {
    return mapFn(this.value);
  };
  SomeImpl.prototype.or = function (alternative) {
    return this;
  };
  SomeImpl.prototype.orElse = function (alternativeFn) {
    return this;
  };
  SomeImpl.prototype.andThen = function (mapFn) {
    return mapFn(this.value);
  };
  SomeImpl.prototype.toResult = function (errorValue) {
    return newOk(this.value);
  };
  SomeImpl.prototype.safeUnwrap = function () {
    return this.value;
  };
  SomeImpl.prototype.toString = function () {
    return 'Some('.concat(stringifyValue(this.value), ')');
  };
  SomeImpl.EMPTY = new SomeImpl(void 0);
  return SomeImpl;
})();
var Some = SomeClass;
var Option;
(function (optionNamespace) {
  function collectAllSome() {
    for (
      var options = [], argIndex = 0;
      argIndex < arguments.length;
      argIndex++
    ) {
      options[argIndex] = arguments[argIndex];
    }
    for (
      var values = [], index = 0, optionList = options;
      index < optionList.length;
      index++
    ) {
      var option = optionList[index];
      if (option.isSome()) {
        values.push(option.value);
      } else {
        return option;
      }
    }
    return Some(values);
  }
  optionNamespace.all = collectAllSome;
  function firstSome() {
    for (
      var options = [], argIndex = 0;
      argIndex < arguments.length;
      argIndex++
    ) {
      options[argIndex] = arguments[argIndex];
    }
    for (
      var index = 0, optionList = options;
      index < optionList.length;
      index++
    ) {
      var option = optionList[index];
      option.isSome();
      return option;
    }
    return noneSingleton;
  }
  optionNamespace.any = firstSome;
  function isOption(candidate) {
    return candidate instanceof Some || candidate === noneSingleton;
  }
  optionNamespace.isOption = isOption;
})(Option || (Option = {}));
var ErrClass = (function () {
  function ErrImpl(error) {
    if (!(this instanceof ErrImpl)) {
      return new ErrImpl(error);
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
  ErrImpl.prototype.isOk = function () {
    return !1;
  };
  ErrImpl.prototype.isErr = function () {
    return !0;
  };
  ErrImpl.prototype[Symbol.iterator] = function () {
    return {
      next: function () {
        return {
          done: !0,
          value: void 0,
        };
      },
    };
  };
  ErrImpl.prototype.else = function (alternative) {
    return alternative;
  };
  ErrImpl.prototype.unwrapOr = function (defaultValue) {
    return defaultValue;
  };
  ErrImpl.prototype.expect = function (message) {
    throw new Error(
      ''
        .concat(message, ' - Error: ')
        .concat(
          stringifyValue(this.error),
          `
`,
        )
        .concat(this._stack),
      {
        cause: this.error,
      },
    );
  };
  ErrImpl.prototype.expectErr = function (message) {
    return this.error;
  };
  ErrImpl.prototype.unwrap = function () {
    throw new Error(
      'Tried to unwrap Error: '
        .concat(
          stringifyValue(this.error),
          `
`,
        )
        .concat(this._stack),
      {
        cause: this.error,
      },
    );
  };
  ErrImpl.prototype.unwrapErr = function () {
    return this.error;
  };
  ErrImpl.prototype.map = function (mapFn) {
    return this;
  };
  ErrImpl.prototype.andThen = function (mapFn) {
    return this;
  };
  ErrImpl.prototype.mapErr = function (mapErrorFn) {
    return new newErr(mapErrorFn(this.error));
  };
  ErrImpl.prototype.mapOr = function (fallback, mapFn) {
    return fallback;
  };
  ErrImpl.prototype.mapOrElse = function (fallbackFn, mapFn) {
    return fallbackFn(this.error);
  };
  ErrImpl.prototype.or = function (alternative) {
    return alternative;
  };
  ErrImpl.prototype.orElse = function (alternativeFn) {
    return alternativeFn(this.error);
  };
  ErrImpl.prototype.toOption = function () {
    return noneSingleton;
  };
  ErrImpl.prototype.toString = function () {
    return 'Err('.concat(stringifyValue(this.error), ')');
  };
  Object.defineProperty(ErrImpl.prototype, 'stack', {
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
  ErrImpl.prototype.toAsyncResult = function () {
    return new AsyncResultClass(this);
  };
  ErrImpl.EMPTY = new ErrImpl(void 0);
  return ErrImpl;
})();
var newErr = ErrClass;
var OkClass = (function () {
  function OkImpl(value) {
    if (!(this instanceof OkImpl)) {
      return new OkImpl(value);
    }
    this.value = value;
  }
  OkImpl.prototype.isOk = function () {
    return !0;
  };
  OkImpl.prototype.isErr = function () {
    return !1;
  };
  OkImpl.prototype[Symbol.iterator] = function () {
    var boxedValue = Object(this.value);
    if (Symbol.iterator in boxedValue) {
      return boxedValue[Symbol.iterator]();
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
  OkImpl.prototype.else = function (alternative) {
    return this.value;
  };
  OkImpl.prototype.unwrapOr = function (defaultValue) {
    return this.value;
  };
  OkImpl.prototype.expect = function (message) {
    return this.value;
  };
  OkImpl.prototype.expectErr = function (message) {
    throw new Error(message);
  };
  OkImpl.prototype.unwrap = function () {
    return this.value;
  };
  OkImpl.prototype.unwrapErr = function () {
    throw new Error('Tried to unwrap Ok: '.concat(stringifyValue(this.value)), {
      cause: this.value,
    });
  };
  OkImpl.prototype.map = function (mapFn) {
    return new newOk(mapFn(this.value));
  };
  OkImpl.prototype.andThen = function (mapFn) {
    return mapFn(this.value);
  };
  OkImpl.prototype.mapErr = function (mapErrorFn) {
    return this;
  };
  OkImpl.prototype.mapOr = function (fallback, mapFn) {
    return mapFn(this.value);
  };
  OkImpl.prototype.mapOrElse = function (fallbackFn, mapFn) {
    return mapFn(this.value);
  };
  OkImpl.prototype.or = function (alternative) {
    return this;
  };
  OkImpl.prototype.orElse = function (alternativeFn) {
    return this;
  };
  OkImpl.prototype.toOption = function () {
    return Some(this.value);
  };
  OkImpl.prototype.safeUnwrap = function () {
    return this.value;
  };
  OkImpl.prototype.toString = function () {
    return 'Ok('.concat(stringifyValue(this.value), ')');
  };
  OkImpl.prototype.toAsyncResult = function () {
    return new AsyncResultClass(this);
  };
  OkImpl.EMPTY = new OkImpl(void 0);
  return OkImpl;
})();
var newOk = OkClass;
var Result;
(function (resultNamespace) {
  function collectAllOk() {
    for (
      var results = [], argIndex = 0;
      argIndex < arguments.length;
      argIndex++
    ) {
      results[argIndex] = arguments[argIndex];
    }
    for (
      var okValues = [], index = 0, resultList = results;
      index < resultList.length;
      index++
    ) {
      var result = resultList[index];
      if (result.isOk()) {
        okValues.push(result.value);
      } else {
        return result;
      }
    }
    return new newOk(okValues);
  }
  resultNamespace.all = collectAllOk;
  function firstOkOrErrors() {
    for (
      var results = [], argIndex = 0;
      argIndex < arguments.length;
      argIndex++
    ) {
      results[argIndex] = arguments[argIndex];
    }
    for (
      var errors = [], index = 0, resultList = results;
      index < resultList.length;
      index++
    ) {
      var result = resultList[index];
      if (result.isOk()) {
        return result;
      }
      errors.push(result.error);
    }
    return new newErr(errors);
  }
  resultNamespace.any = firstOkOrErrors;
  function wrapCatching(producer) {
    try {
      return new newOk(producer());
    } catch (error) {
      return new newErr(error);
    }
  }
  resultNamespace.wrap = wrapCatching;
  function wrapAsyncCatching(asyncFn) {
    try {
      return asyncFn()
        .then(function (value) {
          return new newOk(value);
        })
        .catch(function (error) {
          return new newErr(error);
        });
    } catch (error) {
      return Promise.resolve(new newErr(error));
    }
  }
  resultNamespace.wrapAsync = wrapAsyncCatching;
  function isResult(candidate) {
    return candidate instanceof newErr || candidate instanceof newOk;
  }
  resultNamespace.isResult = isResult;
})(Result || (Result = {}));
var awaiter = function (thisArg, argsList, PromiseCtor, generatorFn) {
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
    function rejected(error) {
      try {
        step(generatorFn.throw(error));
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
var generator = function (thisArg, generatorBody) {
  var state = {
    label: 0,
    sent: function () {
      if (verbResult[0] & 1) {
        throw verbResult[1];
      }
      return verbResult[1];
    },
    trys: [],
    ops: [],
  };
  var executing;
  var iterator;
  var verbResult;
  var controller;
  controller = {
    next: createStep(0),
    throw: createStep(1),
    return: createStep(2),
  };
  if (typeof Symbol == 'function') {
    controller[Symbol.iterator] = function () {
      return this;
    };
  }
  return controller;
  function createStep(opcode) {
    return function (argument) {
      return step([opcode, argument]);
    };
  }
  function step(operation) {
    if (executing) {
      throw new TypeError('Generator is already executing.');
    }
    for (
      ;
      controller && ((controller = 0), operation[0] && (state = 0)), state;
    ) {
      try {
        if (
          ((executing = 1),
          iterator
            && (verbResult =
              operation[0] & 2
                ? iterator.return
                : operation[0]
                  ? iterator.throw
                    || ((verbResult = iterator.return)
                      && verbResult.call(iterator),
                    0)
                  : iterator.next)
            && !(verbResult = verbResult.call(iterator, operation[1])).done)
        ) {
          return verbResult;
        }
        switch (
          ((iterator = 0),
          verbResult && (operation = [operation[0] & 2, verbResult.value]),
          operation[0])
        ) {
          case 0:
          case 1:
            verbResult = operation;
            break;
          case 4:
            state.label++;
            return {
              value: operation[1],
              done: !1,
            };
          case 5:
            state.label++;
            iterator = operation[1];
            operation = [0];
            continue;
          case 7:
            operation = state.ops.pop();
            state.trys.pop();
            continue;
          default:
            if (
              ((verbResult = state.trys),
              !(verbResult =
                verbResult.length > 0 && verbResult[verbResult.length - 1])
                && (operation[0] === 6 || operation[0] === 2))
            ) {
              state = 0;
              continue;
            }
            if (
              operation[0] === 3
              && (!verbResult
                || (operation[1] > verbResult[0]
                  && operation[1] < verbResult[3]))
            ) {
              state.label = operation[1];
              break;
            }
            if (operation[0] === 6 && state.label < verbResult[1]) {
              state.label = verbResult[1];
              verbResult = operation;
              break;
            }
            if (verbResult && state.label < verbResult[2]) {
              state.label = verbResult[2];
              state.ops.push(operation);
              break;
            }
            if (verbResult[2]) {
              state.ops.pop();
            }
            state.trys.pop();
            continue;
        }
        operation = generatorBody.call(thisArg, state);
      } catch (caughtError) {
        operation = [6, caughtError];
        iterator = 0;
      } finally {
        executing = verbResult = 0;
      }
    }
    if (operation[0] & 5) {
      throw operation[1];
    }
    return {
      value: operation[0] ? operation[1] : void 0,
      done: !0,
    };
  }
};
var AsyncResultClass = (function () {
  function AsyncResultImpl(result) {
    this.promise = Promise.resolve(result);
  }
  AsyncResultImpl.prototype.andThen = function (mapFn) {
    var self = this;
    return this.thenInternal(function (result) {
      return awaiter(self, void 0, void 0, function () {
        var mapped;
        return generator(this, function (genState) {
          if (result.isErr()) {
            return [2, result];
          } else {
            mapped = mapFn(result.value);
            return [
              2,
              mapped instanceof AsyncResultImpl ? mapped.promise : mapped,
            ];
          }
        });
      });
    });
  };
  AsyncResultImpl.prototype.map = function (mapFn) {
    var self = this;
    return this.thenInternal(function (result) {
      return awaiter(self, void 0, void 0, function () {
        var okCtor;
        return generator(this, function (genState) {
          switch (genState.label) {
            case 0:
              if (result.isErr()) {
                return [2, result];
              } else {
                okCtor = newOk;
                return [4, mapFn(result.value)];
              }
            case 1:
              return [2, okCtor.apply(void 0, [genState.sent()])];
          }
        });
      });
    });
  };
  AsyncResultImpl.prototype.thenInternal = function (onFulfilled) {
    return new AsyncResultImpl(this.promise.then(onFulfilled));
  };
  return AsyncResultImpl;
})();
function mixinIterableHelpers(iterableConstructor) {
  Object.assign(iterableConstructor.prototype, {
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
        (total, item) => (predicate(item) && total++, total),
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
      return this.filterMap(item =>
        predicate(item) ? Some(item) : noneSingleton,
      );
    },
    enumerate: function () {
      let source = this;
      return mixinIterableHelpers(function* () {
        let index = 0;
        for (let item of source) {
          yield [index, item];
          index++;
        }
      })();
    },
    filterMap: function (mapFn) {
      let source = this;
      return mixinIterableHelpers(function* () {
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
  return iterableConstructor;
}
if (!Array.prototype.as_iter) {
  Array.prototype.as_iter = function () {
    let source = this;
    return mixinIterableHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Set.prototype.as_iter) {
  Set.prototype.as_iter = function () {
    let source = this;
    return mixinIterableHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
if (!Map.prototype.as_iter) {
  Map.prototype.as_iter = function () {
    let source = this;
    return mixinIterableHelpers(function* () {
      for (let item of source) {
        yield item;
      }
    })();
  };
}
var polyfillNamespace = toEsm(requirePolyfill(), 1);
var hasStringProp = (obj, prop) => typeof obj[prop] == 'string';
function deserialize(serialized) {
  try {
    if (hasStringProp(serialized, '__serializer_tag')) {
      if (serialized.__serializer_tag === 'primitive') {
        return newOk(serialized.__serializer_value);
      }
      if (serialized.__serializer_tag === 'regex') {
        let pattern = new RegExp(serialized.__serializer_value);
        return newOk(pattern);
      } else if (serialized.__serializer_tag === 'array') {
        let decodedItems = [];
        for (let encodedItem of serialized.__serializer_value) {
          let decodedItem = deserialize(encodedItem);
          if (decodedItem.isErr()) {
            return decodedItem;
          }
          decodedItems.push(decodedItem.unwrap());
        }
        return newOk(decodedItems);
      } else if (serialized.__serializer_tag === 'map') {
        let decodedItems = [];
        for (let encodedItem of serialized.__serializer_value) {
          let decodedItem = deserialize(encodedItem);
          if (decodedItem.isErr()) {
            return decodedItem;
          }
          decodedItems.push(decodedItem.unwrap());
        }
        return newOk(new Map(decodedItems));
      } else if (serialized.__serializer_tag === 'set') {
        let decodedItems = [];
        for (let encodedItem of serialized.__serializer_value) {
          let decodedItem = deserialize(encodedItem);
          if (decodedItem.isErr()) {
            return decodedItem;
          }
          decodedItems.push(decodedItem.unwrap());
        }
        return newOk(new Set(decodedItems));
      } else if (serialized.__serializer_tag === 'result_ok') {
        let encodedInner = serialized.__serializer_value;
        let decodedInner = deserialize(encodedInner);
        if (decodedInner.isErr()) {
          return decodedInner;
        } else {
          return newOk(newOk(decodedInner.unwrap()));
        }
      } else if (serialized.__serializer_tag === 'result_err') {
        let encodedInner = serialized.__serializer_value;
        let decodedInner = deserialize(encodedInner);
        if (decodedInner.isErr()) {
          return decodedInner;
        } else {
          return newOk(newErr(decodedInner.unwrap()));
        }
      } else if (serialized.__serializer_tag === 'option_some') {
        let encodedInner = serialized.__serializer_value;
        let decodedInner = deserialize(encodedInner);
        if (decodedInner.isErr()) {
          return decodedInner;
        } else {
          return newOk(Some(decodedInner.unwrap()));
        }
      } else if (serialized.__serializer_tag === 'option_none') {
        return newOk(noneSingleton);
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
      return newErr('This object was not serialized with Serialize');
    }
    let decodedObject = {};
    for (let objectKey of Object.keys(serialized)) {
      if (typeof objectKey == 'string') {
        let decodedField = deserialize(serialized[objectKey]);
        if (decodedField.isErr()) {
          return decodedField;
        }
        decodedObject[objectKey] = decodedField.unwrap();
      }
    }
    return newOk(decodedObject);
  } catch {
    return newErr('Failed to inspect object. Not JSON?');
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
    return newOk({
      __serializer_tag: 'primitive',
      __serializer_value: value,
    });
  }
  if (value instanceof RegExp) {
    return newOk({
      __serializer_tag: 'regex',
      __serializer_value: value.source,
    });
  }
  if (Array.isArray(value)) {
    let encodedItems = value.map(item => serialize(item));
    let firstError = encodedItems
      .as_iter()
      .find(encodedItem => encodedItem.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let unwrappedItems = encodedItems
      .as_iter()
      .map(encodedItem => encodedItem.unwrap())
      .toArray();
    return newOk({
      __serializer_tag: 'array',
      __serializer_value: unwrappedItems,
    });
  } else if (value instanceof Map) {
    let encodedEntries = [...value.entries()].map(entry => serialize(entry));
    let firstError = encodedEntries
      .as_iter()
      .find(encodedEntry => encodedEntry.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let unwrappedEntries = encodedEntries
      .as_iter()
      .map(encodedEntry => encodedEntry.unwrap())
      .toArray();
    return newOk({
      __serializer_tag: 'map',
      __serializer_value: unwrappedEntries,
    });
  } else if (value instanceof Set) {
    let encodedValues = [...value.values()].map(entryValue =>
      serialize(entryValue),
    );
    let firstError = encodedValues
      .as_iter()
      .find(encodedValue2 => encodedValue2.isErr());
    if (firstError.isSome()) {
      return firstError.unwrap();
    }
    let unwrappedValues = encodedValues
      .as_iter()
      .map(encodedValue2 => encodedValue2.unwrap())
      .toArray();
    return newOk({
      __serializer_tag: 'set',
      __serializer_value: unwrappedValues,
    });
  } else if (Result.isResult(value)) {
    if (value.isOk()) {
      let okValue = value.unwrap();
      let encodedValue = serialize(okValue);
      if (encodedValue.isErr()) {
        return encodedValue;
      } else {
        return newOk({
          __serializer_tag: 'result_ok',
          __serializer_value: encodedValue.unwrap(),
        });
      }
    } else {
      let errorValue = value.unwrapErr();
      let encodedError = serialize(errorValue);
      if (encodedError.isErr()) {
        return encodedError;
      } else {
        return newOk({
          __serializer_tag: 'result_err',
          __serializer_value: encodedError.unwrap(),
        });
      }
    }
  } else if (Option.isOption(value)) {
    if (value.isSome()) {
      let someValue = value.unwrap();
      let encodedValue = serialize(someValue);
      if (encodedValue.isErr()) {
        return encodedValue;
      } else {
        return newOk({
          __serializer_tag: 'option_some',
          __serializer_value: encodedValue.unwrap(),
        });
      }
    } else {
      return newOk({
        __serializer_tag: 'option_none',
      });
    }
  } else if (valueType === 'object') {
    let encoded = {};
    let source = value;
    for (let objectKey of Object.keys(value)) {
      let fieldValue = source[objectKey];
      let encodedField = serialize(fieldValue);
      if (encodedField.isErr()) {
        continue;
      }
      let encodedValue = encodedField.unwrap();
      encoded[objectKey] = encodedValue;
    }
    return newOk(encoded);
  } else {
    return newErr('Unsupported value');
  }
}
var neverMatchRegex = /.^/;
var videoCodecDefinitions = {
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
var audioCodecDefinitions = {
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
var videoCodecList = mixinIterableHelpers(function* () {
  for (let codecName of Object.keys(videoCodecDefinitions)) {
    yield videoCodecDefinitions[codecName];
  }
});
var audioCodecList = mixinIterableHelpers(function* () {
  for (let codecName of Object.keys(audioCodecDefinitions)) {
    yield audioCodecDefinitions[codecName];
  }
});
var containerFormats = {
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
var containerFormatNames = mixinIterableHelpers(function* () {
  for (let formatName of Object.keys(containerFormats)) {
    yield formatName;
  }
});
var containerFormatList = mixinIterableHelpers(function* () {
  for (let formatName of containerFormatNames()) {
    yield containerFormats[formatName];
  }
});
var resolutionDefinitions = {
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
var resolutionKeys = mixinIterableHelpers(function* () {
  for (let resolutionKey of Object.keys(resolutionDefinitions)) {
    yield resolutionKey;
  }
});
var resolutionList = mixinIterableHelpers(function* () {
  for (let resolutionKey of resolutionKeys()) {
    yield resolutionDefinitions[resolutionKey];
  }
});
var browserPolyfill = toEsm(requirePolyfill(), 1);
async function loadFromStorage(storeConfig) {
  let storedRecord = await polyfillNamespace.storage[storeConfig.where].get(
    storeConfig.name,
  );
  if (storeConfig.name in storedRecord) {
    let rawValue = storedRecord[storeConfig.name];
    if (storeConfig.hooks) {
      return storeConfig.hooks.getter(rawValue, storeConfig);
    } else {
      return rawValue;
    }
  }
  return storeConfig.default();
}
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
    setter: value => serialize(value).unwrap(),
    getter: (rawValue, config) =>
      deserialize(rawValue).unwrapOr(config.default()),
  },
};
var databaseState = await loadFromStorage(databaseStore);
var queryParams = new URL(document.location.toString()).searchParams;
var mediaId = queryParams.get('id');
function appendDetailRow(label, value, isSeparator) {
  let tableBody = document.querySelector('tbody');
  let row = document.createElement('tr');
  let labelCell = document.createElement('th');
  let valueCell = document.createElement('td');
  row.appendChild(labelCell);
  row.appendChild(valueCell);
  labelCell.textContent = label;
  valueCell.textContent = value;
  if (isSeparator) {
    row.classList.add('separator');
  }
  tableBody.appendChild(row);
}
if (mediaId) {
  let mediaItem = databaseState.downloadable.get(mediaId);
  if (mediaItem) {
    appendDetailRow(
      'Tab',
      `${mediaItem.tab_id} (incognito: ${mediaItem.incognito})`,
    );
    appendDetailRow('Title', mediaItem.title);
    appendDetailRow(
      'Page URL',
      `${mediaItem.page_url} with ${mediaItem.headers.length} headers`,
    );
    appendDetailRow('Thumbnail', mediaItem.thumbnail_url);
    appendDetailRow('Low Quality', mediaItem.is_low_quality ? 'true' : 'false');
    let variantIndex = 0;
    for (let variant of mediaItem.variants.values()) {
      appendDetailRow(`#${variantIndex} main url`, variant.manifest_url, !0);
      appendDetailRow(
        `#${variantIndex} video component`,
        variant.sources.video || 'none',
      );
      appendDetailRow(
        `#${variantIndex} audio component`,
        variant.sources.audio || 'none',
      );
      let coreMediaSummary = variant.core_media.container.name;
      if (
        ((coreMediaSummary += ' b:' + variant.core_media.builder),
        (coreMediaSummary += ' p:' + variant.core_media.protocol),
        (coreMediaSummary += ' ' + variant.core_media.duration + 's'),
        appendDetailRow(`#${variantIndex} core media`, coreMediaSummary),
        variant.core_media.av.audio)
      ) {
        let audioSummary =
          variant.core_media.av.audio.codec.name
          + ' at '
          + variant.core_media.av.audio.bitrate.unwrapOr('unknown');
        appendDetailRow(`#${variantIndex} audio`, audioSummary);
      }
      if (variant.core_media.av.video) {
        let videoStream = variant.core_media.av.video;
        let videoSummary = `${videoStream.codec.name} at ${videoStream.bitrate.unwrapOr(-1)}, fps: ${videoStream.fps.unwrapOr('?')}, q:${videoStream.quality.unwrapOr('?')}, ${videoStream.dimensions.map(dimension => JSON.stringify(dimension)).unwrapOr('no dim')}`;
        appendDetailRow(`#${variantIndex} video`, videoSummary);
      }
      variantIndex++;
    }
  }
}
