var objectCreate = Object.create;
var defineProperty = Object.defineProperty;
var getOwnPropDesc = Object.getOwnPropertyDescriptor;
var getOwnPropNames = Object.getOwnPropertyNames;
var getPrototypeOf = Object.getPrototypeOf,
  hasOwnPropertyRef = Object.prototype.hasOwnProperty;
var defineCommonjsModule = (defineModule, cachedExports) => () => (cachedExports || defineModule((cachedExports = {
    exports: {}
  })
  .exports, cachedExports), cachedExports.exports);
var copyProps = (targetObj, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of getOwnPropNames(from)) !hasOwnPropertyRef.call(targetObj, key) && key !== except && defineProperty(targetObj, key, {
      get: () => from[key],
      enumerable: !(desc = getOwnPropDesc(from, key)) || desc.enumerable
    });
  return targetObj
};
var toEsm = (mod, isNodeMode, target) => (target = mod != null ? objectCreate(getPrototypeOf(mod)) : {}, copyProps(isNodeMode || !mod || !mod
  .__esModule ? defineProperty(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod));
var requirePolyfill = defineCommonjsModule((polyfillExports, polyfillModule) => {
  (function(globalScope, factory) {
    if (typeof define == "function" && define.amd) define(
      "webextension-polyfill", ["module"], factory);
    else if (typeof polyfillExports < "u") factory(polyfillModule);
    else {
      var moduleShim = {
        exports: {}
      };
      factory(moduleShim), globalScope.browser = moduleShim.exports
    }
  })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : polyfillExports,
    function(browserGlobal) {
      "use strict";
      if (!globalThis.chrome?.runtime?.id) throw new Error(
        "This script should only be loaded in a browser extension.");
      if (typeof globalThis.browser > "u" || Object.getPrototypeOf(
          globalThis.browser) !== Object.prototype) {
        let messagePortClosedMessage = "The message port closed before a response was received.",
          wrapApis = chromeApi => {
            let apiMetadata = {
              alarms: {
                clear: {
                  minArgs: 0,
                  maxArgs: 1
                },
                clearAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              bookmarks: {
                create: {
                  minArgs: 1,
                  maxArgs: 1
                },
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getChildren: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getRecent: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getSubTree: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getTree: {
                  minArgs: 0,
                  maxArgs: 0
                },
                move: {
                  minArgs: 2,
                  maxArgs: 2
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeTree: {
                  minArgs: 1,
                  maxArgs: 1
                },
                search: {
                  minArgs: 1,
                  maxArgs: 1
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              },
              browserAction: {
                disable: {
                  minArgs: 0,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                enable: {
                  minArgs: 0,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                getBadgeBackgroundColor: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getBadgeText: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getPopup: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getTitle: {
                  minArgs: 1,
                  maxArgs: 1
                },
                openPopup: {
                  minArgs: 0,
                  maxArgs: 0
                },
                setBadgeBackgroundColor: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                setBadgeText: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                setIcon: {
                  minArgs: 1,
                  maxArgs: 1
                },
                setPopup: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                setTitle: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                }
              },
              browsingData: {
                remove: {
                  minArgs: 2,
                  maxArgs: 2
                },
                removeCache: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeCookies: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeDownloads: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeFormData: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeHistory: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeLocalStorage: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removePasswords: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removePluginData: {
                  minArgs: 1,
                  maxArgs: 1
                },
                settings: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              commands: {
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              contextMenus: {
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              },
              cookies: {
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAllCookieStores: {
                  minArgs: 0,
                  maxArgs: 0
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              devtools: {
                inspectedWindow: {
                  eval: {
                    minArgs: 1,
                    maxArgs: 2,
                    singleCallbackArg: !1
                  }
                },
                panels: {
                  create: {
                    minArgs: 3,
                    maxArgs: 3,
                    singleCallbackArg: !0
                  },
                  elements: {
                    createSidebarPane: {
                      minArgs: 1,
                      maxArgs: 1
                    }
                  }
                }
              },
              downloads: {
                cancel: {
                  minArgs: 1,
                  maxArgs: 1
                },
                download: {
                  minArgs: 1,
                  maxArgs: 1
                },
                erase: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getFileIcon: {
                  minArgs: 1,
                  maxArgs: 2
                },
                open: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                pause: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeFile: {
                  minArgs: 1,
                  maxArgs: 1
                },
                resume: {
                  minArgs: 1,
                  maxArgs: 1
                },
                search: {
                  minArgs: 1,
                  maxArgs: 1
                },
                show: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                }
              },
              extension: {
                isAllowedFileSchemeAccess: {
                  minArgs: 0,
                  maxArgs: 0
                },
                isAllowedIncognitoAccess: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              history: {
                addUrl: {
                  minArgs: 1,
                  maxArgs: 1
                },
                deleteAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                deleteRange: {
                  minArgs: 1,
                  maxArgs: 1
                },
                deleteUrl: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getVisits: {
                  minArgs: 1,
                  maxArgs: 1
                },
                search: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              i18n: {
                detectLanguage: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAcceptLanguages: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              identity: {
                launchWebAuthFlow: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              idle: {
                queryState: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              management: {
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getSelf: {
                  minArgs: 0,
                  maxArgs: 0
                },
                setEnabled: {
                  minArgs: 2,
                  maxArgs: 2
                },
                uninstallSelf: {
                  minArgs: 0,
                  maxArgs: 1
                }
              },
              notifications: {
                clear: {
                  minArgs: 1,
                  maxArgs: 1
                },
                create: {
                  minArgs: 1,
                  maxArgs: 2
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getPermissionLevel: {
                  minArgs: 0,
                  maxArgs: 0
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              },
              pageAction: {
                getPopup: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getTitle: {
                  minArgs: 1,
                  maxArgs: 1
                },
                hide: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                setIcon: {
                  minArgs: 1,
                  maxArgs: 1
                },
                setPopup: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                setTitle: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                },
                show: {
                  minArgs: 1,
                  maxArgs: 1,
                  fallbackToNoCallback: !0
                }
              },
              permissions: {
                contains: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 0
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                request: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              runtime: {
                getBackgroundPage: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getPlatformInfo: {
                  minArgs: 0,
                  maxArgs: 0
                },
                openOptionsPage: {
                  minArgs: 0,
                  maxArgs: 0
                },
                requestUpdateCheck: {
                  minArgs: 0,
                  maxArgs: 0
                },
                sendMessage: {
                  minArgs: 1,
                  maxArgs: 3
                },
                sendNativeMessage: {
                  minArgs: 2,
                  maxArgs: 2
                },
                setUninstallURL: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              sessions: {
                getDevices: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getRecentlyClosed: {
                  minArgs: 0,
                  maxArgs: 1
                },
                restore: {
                  minArgs: 0,
                  maxArgs: 1
                }
              },
              storage: {
                local: {
                  clear: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  get: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getBytesInUse: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                },
                managed: {
                  get: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getBytesInUse: {
                    minArgs: 0,
                    maxArgs: 1
                  }
                },
                sync: {
                  clear: {
                    minArgs: 0,
                    maxArgs: 0
                  },
                  get: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  getBytesInUse: {
                    minArgs: 0,
                    maxArgs: 1
                  },
                  remove: {
                    minArgs: 1,
                    maxArgs: 1
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                }
              },
              tabs: {
                captureVisibleTab: {
                  minArgs: 0,
                  maxArgs: 2
                },
                create: {
                  minArgs: 1,
                  maxArgs: 1
                },
                detectLanguage: {
                  minArgs: 0,
                  maxArgs: 1
                },
                discard: {
                  minArgs: 0,
                  maxArgs: 1
                },
                duplicate: {
                  minArgs: 1,
                  maxArgs: 1
                },
                executeScript: {
                  minArgs: 1,
                  maxArgs: 2
                },
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getCurrent: {
                  minArgs: 0,
                  maxArgs: 0
                },
                getZoom: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getZoomSettings: {
                  minArgs: 0,
                  maxArgs: 1
                },
                goBack: {
                  minArgs: 0,
                  maxArgs: 1
                },
                goForward: {
                  minArgs: 0,
                  maxArgs: 1
                },
                highlight: {
                  minArgs: 1,
                  maxArgs: 1
                },
                insertCSS: {
                  minArgs: 1,
                  maxArgs: 2
                },
                move: {
                  minArgs: 2,
                  maxArgs: 2
                },
                query: {
                  minArgs: 1,
                  maxArgs: 1
                },
                reload: {
                  minArgs: 0,
                  maxArgs: 2
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                removeCSS: {
                  minArgs: 1,
                  maxArgs: 2
                },
                sendMessage: {
                  minArgs: 2,
                  maxArgs: 3
                },
                setZoom: {
                  minArgs: 1,
                  maxArgs: 2
                },
                setZoomSettings: {
                  minArgs: 1,
                  maxArgs: 2
                },
                update: {
                  minArgs: 1,
                  maxArgs: 2
                }
              },
              topSites: {
                get: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              webNavigation: {
                getAllFrames: {
                  minArgs: 1,
                  maxArgs: 1
                },
                getFrame: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              webRequest: {
                handlerBehaviorChanged: {
                  minArgs: 0,
                  maxArgs: 0
                }
              },
              windows: {
                create: {
                  minArgs: 0,
                  maxArgs: 1
                },
                get: {
                  minArgs: 1,
                  maxArgs: 2
                },
                getAll: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getCurrent: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getLastFocused: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                update: {
                  minArgs: 2,
                  maxArgs: 2
                }
              }
            };
            if (Object.keys(apiMetadata)
              .length === 0) throw new Error(
              "api-metadata.json has not been included in browser-polyfill"
              );
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, entries = void 0) {
                super(entries), this.createItem = createItem
              }
              get(key) {
                return this.has(key) || this.set(key, this.createItem(key)),
                  super.get(key)
              }
            }
            let isThenable = value => value && typeof value == "object" && typeof value.then ==
              "function",
              makeCallback = (promiseCallbacks, metadata) => (...callbackArgs) => {
                chromeApi.runtime.lastError ? promiseCallbacks.reject(new Error(chromeApi.runtime.lastError
                    .message)) : metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata
                  .singleCallbackArg !== !1 ? promiseCallbacks.resolve(callbackArgs[0]) : promiseCallbacks.resolve(callbackArgs)
              },
              pluralizeArgs = count => count == 1 ? "argument" : "arguments",
              wrapAsyncFunction = (name, metadata) => function(apiTarget, ...args) {
                if (args.length < metadata.minArgs) throw new Error(
                  `Expected at least ${metadata.minArgs} ${pluralizeArgs(metadata.minArgs)} for ${name}(), got ${args.length}`
                  );
                if (args.length > metadata.maxArgs) throw new Error(
                  `Expected at most ${metadata.maxArgs} ${pluralizeArgs(metadata.maxArgs)} for ${name}(), got ${args.length}`
                  );
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) try {
                    apiTarget[name](...args, makeCallback({
                      resolve: resolve,
                      reject: reject
                    }, metadata))
                  } catch (error) {
                    console.warn(
                        `${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,
                        error), apiTarget[name](...args), metadata.fallbackToNoCallback = !1, metadata
                      .noCallback = !0, resolve()
                  } else metadata.noCallback ? (apiTarget[name](...args), resolve()) : apiTarget[name](...args,
                    makeCallback({
                      resolve: resolve,
                      reject: reject
                    }, metadata))
                })
              },
              wrapMethod = (target, method, wrapper) => new Proxy(method, {
                apply(fnTarget, thisArg, callArgs) {
                  return wrapper.call(thisArg, target, ...callArgs)
                }
              }),
              hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty),
              wrapObject = (target, wrappers = {}, metadata = {}) => {
                let cache = Object.create(null),
                  handler = {
                    has(proxyTarget, prop) {
                      return prop in target || prop in cache
                    },
                    get(proxyTarget, prop, receiver) {
                      if (prop in cache) return cache[prop];
                      if (!(prop in target)) return;
                      let value = target[prop];
                      if (typeof value == "function")
                        if (typeof wrappers[prop] == "function") value = wrapMethod(target, target[prop], wrappers[
                          prop]);
                        else if (hasOwnProperty(metadata, prop)) {
                        let wrappedFn = wrapAsyncFunction(prop, metadata[prop]);
                        value = wrapMethod(target, target[prop], wrappedFn)
                      } else value = value.bind(target);
                      else if (typeof value == "object" && value !== null && (hasOwnProperty(wrappers,
                          prop) || hasOwnProperty(metadata, prop))) value = wrapObject(value, wrappers[prop], metadata[prop]);
                      else if (hasOwnProperty(metadata, "*")) value = wrapObject(value, wrappers[prop], metadata["*"]);
                      else return Object.defineProperty(cache, prop, {
                        configurable: !0,
                        enumerable: !0,
                        get() {
                          return target[prop]
                        },
                        set(newValue) {
                          target[prop] = newValue
                        }
                      }), value;
                      return cache[prop] = value, value
                    },
                    set(proxyTarget, prop, value, receiver) {
                      return prop in cache ? cache[prop] = value : target[prop] = value, !0
                    },
                    defineProperty(proxyTarget, prop, desc) {
                      return Reflect.defineProperty(cache, prop, desc)
                    },
                    deleteProperty(proxyTarget, prop) {
                      return Reflect.deleteProperty(cache, prop)
                    }
                  },
                  proxyBase = Object.create(target);
                return new Proxy(proxyBase, handler)
              },
              wrapEvent = wrapperMap => ({
                addListener(target, listener, ...args) {
                  target.addListener(wrapperMap.get(listener), ...args)
                },
                hasListener(target, listener) {
                  return target.hasListener(wrapperMap.get(listener))
                },
                removeListener(target, listener) {
                  target.removeListener(wrapperMap.get(listener))
                }
              }),
              onRequestFinishedWrappers = new DefaultWeakMap(listener => typeof listener != "function" ? listener : function(request) {
                let wrappedRequest = wrapObject(request, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedRequest)
              }),
              onMessageWrappers = new DefaultWeakMap(listener => typeof listener != "function" ? listener : function(message, sender,
              sendResponse) {
                let responseSent = !1,
                  resolveResponse, responsePromise = new Promise(resolvePromise => {
                    resolveResponse = function(response) {
                      responseSent = !0, resolvePromise(response)
                    }
                  }),
                  result;
                try {
                  result = listener(message, sender, resolveResponse)
                } catch (error) {
                  result = Promise.reject(error)
                }
                let resultIsThenable = result !== !0 && isThenable(result);
                if (result !== !0 && !resultIsThenable && !responseSent) return !1;
                let sendResolvedResponse = resultPromise => {
                  resultPromise.then(response => {
                      sendResponse(response)
                    }, error => {
                      let errorMessage;
                      error && (error instanceof Error || typeof error.message ==
                          "string") ? errorMessage = error.message : errorMessage =
                        "An unexpected error occurred", sendResponse({
                          __mozWebExtensionPolyfillReject__: !0,
                          message: errorMessage
                        })
                    })
                    .catch(replyError => {
                      console.error(
                        "Failed to send onMessage rejected reply", replyError
                        )
                    })
                };
                return sendResolvedResponse(resultIsThenable ? result : responsePromise), !0
              }),
              processResponse = ({
                reject: reject,
                resolve: resolve
              }, response) => {
                chromeApi.runtime.lastError ? chromeApi.runtime.lastError.message === messagePortClosedMessage ?
                  resolve() : reject(new Error(chromeApi.runtime.lastError.message)) : response && response
                  .__mozWebExtensionPolyfillReject__ ? reject(new Error(response
                    .message)) : resolve(response)
              },
              wrapSendMessage = (name, metadata, apiTarget, ...args) => {
                if (args.length < metadata.minArgs) throw new Error(
                  `Expected at least ${metadata.minArgs} ${pluralizeArgs(metadata.minArgs)} for ${name}(), got ${args.length}`
                  );
                if (args.length > metadata.maxArgs) throw new Error(
                  `Expected at most ${metadata.maxArgs} ${pluralizeArgs(metadata.maxArgs)} for ${name}(), got ${args.length}`
                  );
                return new Promise((resolve, reject) => {
                  let boundCallback = processResponse.bind(null, {
                    resolve: resolve,
                    reject: reject
                  });
                  args.push(boundCallback), apiTarget.sendMessage(...args)
                })
              },
              staticWrappers = {
                devtools: {
                  network: {
                    onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                  }
                },
                runtime: {
                  onMessage: wrapEvent(onMessageWrappers),
                  onMessageExternal: wrapEvent(onMessageWrappers),
                  sendMessage: wrapSendMessage.bind(null, "sendMessage", {
                    minArgs: 1,
                    maxArgs: 3
                  })
                },
                tabs: {
                  sendMessage: wrapSendMessage.bind(null, "sendMessage", {
                    minArgs: 2,
                    maxArgs: 3
                  })
                }
              },
              settingMetadata = {
                clear: {
                  minArgs: 1,
                  maxArgs: 1
                },
                get: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              };
            return apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            }, wrapObject(chromeApi, staticWrappers, apiMetadata)
          };
        browserGlobal.exports = wrapApis(chrome)
      } else browserGlobal.exports = globalThis.browser
    })
});
var browserPolyfill = toEsm(requirePolyfill(), 1);

function stringifyValue(value) {
  var text = String(value);
  if (text === "[object Object]") try {
    text = JSON.stringify(value)
  } catch {}
  return text
}
var NoneImpl = function() {
    function NoneClass() {}
    return NoneClass.prototype.isSome = function() {
      return !1
    }, NoneClass.prototype.isNone = function() {
      return !0
    }, NoneClass.prototype[Symbol.iterator] = function() {
      return {
        next: function() {
          return {
            done: !0,
            value: void 0
          }
        }
      }
    }, NoneClass.prototype.unwrapOr = function(defaultValue) {
      return defaultValue
    }, NoneClass.prototype.expect = function(message) {
      throw new Error("".concat(message))
    }, NoneClass.prototype.unwrap = function() {
      throw new Error("Tried to unwrap None")
    }, NoneClass.prototype.map = function(mapFn) {
      return this
    }, NoneClass.prototype.mapOr = function(defaultValue, mapFn) {
      return defaultValue
    }, NoneClass.prototype.mapOrElse = function(defaultFn, mapFn) {
      return defaultFn()
    }, NoneClass.prototype.or = function(alternative) {
      return alternative
    }, NoneClass.prototype.orElse = function(alternativeFn) {
      return alternativeFn()
    }, NoneClass.prototype.andThen = function(mapFn) {
      return this
    }, NoneClass.prototype.toResult = function(errorValue) {
      return ErrResult(errorValue)
    }, NoneClass.prototype.toString = function() {
      return "None"
    }, NoneClass
  }(),
  None = new NoneImpl;
Object.freeze(None);
var SomeImpl = function() {
    function SomeClass(value) {
      if (!(this instanceof SomeClass)) return new SomeClass(value);
      this.value = value
    }
    return SomeClass.prototype.isSome = function() {
      return !0
    }, SomeClass.prototype.isNone = function() {
      return !1
    }, SomeClass.prototype[Symbol.iterator] = function() {
      var boxedValue = Object(this.value);
      return Symbol.iterator in boxedValue ? boxedValue[Symbol.iterator]() : {
        next: function() {
          return {
            done: !0,
            value: void 0
          }
        }
      }
    }, SomeClass.prototype.unwrapOr = function(defaultValue) {
      return this.value
    }, SomeClass.prototype.expect = function(message) {
      return this.value
    }, SomeClass.prototype.unwrap = function() {
      return this.value
    }, SomeClass.prototype.map = function(mapFn) {
      return Some(mapFn(this.value))
    }, SomeClass.prototype.mapOr = function(defaultValue, mapFn) {
      return mapFn(this.value)
    }, SomeClass.prototype.mapOrElse = function(defaultFn, mapFn) {
      return mapFn(this.value)
    }, SomeClass.prototype.or = function(alternative) {
      return this
    }, SomeClass.prototype.orElse = function(alternativeFn) {
      return this
    }, SomeClass.prototype.andThen = function(mapFn) {
      return mapFn(this.value)
    }, SomeClass.prototype.toResult = function(errorValue) {
      return OkResult(this.value)
    }, SomeClass.prototype.safeUnwrap = function() {
      return this.value
    }, SomeClass.prototype.toString = function() {
      return "Some(".concat(stringifyValue(this.value), ")")
    }, SomeClass.EMPTY = new SomeClass(void 0), SomeClass
  }(),
  Some = SomeImpl,
  Option;
(function(optionNamespace) {
  function collectAll() {
    for (var options = [], index = 0; index < arguments.length; index++) options[index] = arguments[index];
    for (var values = [], cursor = 0, optionsList = options; cursor < optionsList.length; cursor++) {
      var option = optionsList[cursor];
      if (option.isSome()) values.push(option.value);
      else return option
    }
    return Some(values)
  }
  optionNamespace.all = collectAll;

  function pickAny() {
    for (var options = [], index = 0; index < arguments.length; index++) options[index] = arguments[index];
    for (var cursor = 0, optionsList = options; cursor < optionsList.length; cursor++) {
      var option = optionsList[cursor];
      return option.isSome(), option
    }
    return None
  }
  optionNamespace.any = pickAny;

  function isOption(maybeOption) {
    return maybeOption instanceof Some || maybeOption === None
  }
  optionNamespace.isOption = isOption
})(Option || (Option = {}));
var ErrImpl = function() {
  function ErrClass(error) {
    if (!(this instanceof ErrClass)) return new ErrClass(error);
    this.error = error;
    var stackLines = new Error()
      .stack.split(`
`)
      .slice(2);
    stackLines && stackLines.length > 0 && stackLines[0].includes("ErrImpl") && stackLines.shift(), this._stack =
      stackLines.join(`
`)
  }
  return ErrClass.prototype.isOk = function() {
    return !1
  }, ErrClass.prototype.isErr = function() {
    return !0
  }, ErrClass.prototype[Symbol.iterator] = function() {
    return {
      next: function() {
        return {
          done: !0,
          value: void 0
        }
      }
    }
  }, ErrClass.prototype.else = function(defaultValue) {
    return defaultValue
  }, ErrClass.prototype.unwrapOr = function(defaultValue) {
    return defaultValue
  }, ErrClass.prototype.expect = function(message) {
    throw new Error("".concat(message, " - Error: ")
      .concat(stringifyValue(this.error), `
`)
      .concat(this._stack), {
        cause: this.error
      })
  }, ErrClass.prototype.expectErr = function(message) {
    return this.error
  }, ErrClass.prototype.unwrap = function() {
    throw new Error("Tried to unwrap Error: ".concat(stringifyValue(this.error), `
`)
      .concat(this._stack), {
        cause: this.error
      })
  }, ErrClass.prototype.unwrapErr = function() {
    return this.error
  }, ErrClass.prototype.map = function(mapFn) {
    return this
  }, ErrClass.prototype.andThen = function(mapFn) {
    return this
  }, ErrClass.prototype.mapErr = function(mapFn) {
    return new ErrResult(mapFn(this.error))
  }, ErrClass.prototype.mapOr = function(defaultValue, mapFn) {
    return defaultValue
  }, ErrClass.prototype.mapOrElse = function(onErr, onOk) {
    return onErr(this.error)
  }, ErrClass.prototype.or = function(alternative) {
    return alternative
  }, ErrClass.prototype.orElse = function(alternativeFn) {
    return alternativeFn(this.error)
  }, ErrClass.prototype.toOption = function() {
    return None
  }, ErrClass.prototype.toString = function() {
    return "Err(".concat(stringifyValue(this.error), ")")
  }, Object.defineProperty(ErrClass.prototype, "stack", {
    get: function() {
      return "".concat(this, `
`)
        .concat(this._stack)
    },
    enumerable: !1,
    configurable: !0
  }), ErrClass.prototype.toAsyncResult = function() {
    return new ResultAsync(this)
  }, ErrClass.EMPTY = new ErrClass(void 0), ErrClass
}();
var ErrResult = ErrImpl,
  OkImpl = function() {
    function OkClass(value) {
      if (!(this instanceof OkClass)) return new OkClass(value);
      this.value = value
    }
    return OkClass.prototype.isOk = function() {
      return !0
    }, OkClass.prototype.isErr = function() {
      return !1
    }, OkClass.prototype[Symbol.iterator] = function() {
      var boxedValue = Object(this.value);
      return Symbol.iterator in boxedValue ? boxedValue[Symbol.iterator]() : {
        next: function() {
          return {
            done: !0,
            value: void 0
          }
        }
      }
    }, OkClass.prototype.else = function(defaultValue) {
      return this.value
    }, OkClass.prototype.unwrapOr = function(defaultValue) {
      return this.value
    }, OkClass.prototype.expect = function(message) {
      return this.value
    }, OkClass.prototype.expectErr = function(message) {
      throw new Error(message)
    }, OkClass.prototype.unwrap = function() {
      return this.value
    }, OkClass.prototype.unwrapErr = function() {
      throw new Error("Tried to unwrap Ok: ".concat(stringifyValue(this.value)), {
        cause: this.value
      })
    }, OkClass.prototype.map = function(mapFn) {
      return new OkResult(mapFn(this.value))
    }, OkClass.prototype.andThen = function(mapFn) {
      return mapFn(this.value)
    }, OkClass.prototype.mapErr = function(mapFn) {
      return this
    }, OkClass.prototype.mapOr = function(defaultValue, mapFn) {
      return mapFn(this.value)
    }, OkClass.prototype.mapOrElse = function(onErr, onOk) {
      return onOk(this.value)
    }, OkClass.prototype.or = function(alternative) {
      return this
    }, OkClass.prototype.orElse = function(alternativeFn) {
      return this
    }, OkClass.prototype.toOption = function() {
      return Some(this.value)
    }, OkClass.prototype.safeUnwrap = function() {
      return this.value
    }, OkClass.prototype.toString = function() {
      return "Ok(".concat(stringifyValue(this.value), ")")
    }, OkClass.prototype.toAsyncResult = function() {
      return new ResultAsync(this)
    }, OkClass.EMPTY = new OkClass(void 0), OkClass
  }();
var OkResult = OkImpl,
  Result;
(function(resultNamespace) {
  function collectResults() {
    for (var results = [], index = 0; index < arguments.length; index++) results[index] = arguments[index];
    for (var values = [], cursor = 0, resultsList = results; cursor < resultsList.length; cursor++) {
      var result = resultsList[cursor];
      if (result.isOk()) values.push(result.value);
      else return result
    }
    return new OkResult(values)
  }
  resultNamespace.all = collectResults;

  function firstOk() {
    for (var results = [], index = 0; index < arguments.length; index++) results[index] = arguments[index];
    for (var errors = [], cursor = 0, resultsList = results; cursor < resultsList.length; cursor++) {
      var result = resultsList[cursor];
      if (result.isOk()) return result;
      errors.push(result.error)
    }
    return new ErrResult(errors)
  }
  resultNamespace.any = firstOk;

  function wrapCall(callback) {
    try {
      return new OkResult(callback())
    } catch (error) {
      return new ErrResult(error)
    }
  }
  resultNamespace.wrap = wrapCall;

  function wrapAsyncCall(callback) {
    try {
      return callback()
        .then(function(resolvedValue) {
          return new OkResult(resolvedValue)
        })
        .catch(function(caughtError) {
          return new ErrResult(caughtError)
        })
    } catch (caughtError) {
      return Promise.resolve(new ErrResult(caughtError))
    }
  }
  resultNamespace.wrapAsync = wrapAsyncCall;

  function isResult(value) {
    return value instanceof ErrResult || value instanceof OkResult
  }
  resultNamespace.isResult = isResult
})(Result || (Result = {}));
var awaiter = function(thisArg, args, PromiseCtor, generator) {
    function adopt(value) {
      return value instanceof PromiseCtor ? value : new PromiseCtor(function(resolve) {
        resolve(value)
      })
    }
    return new(PromiseCtor || (PromiseCtor = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (caughtError) {
          reject(caughtError)
        }
      }

      function rejected(value) {
        try {
          step(generator.throw(value))
        } catch (caughtError) {
          reject(caughtError)
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value)
          .then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, args || []))
        .next())
    })
  },
  runGenerator = function(thisArg, body) {
    var state = {
        label: 0,
        sent: function() {
          if (tmp[0] & 1) throw tmp[1];
          return tmp[1]
        },
        trys: [],
        ops: []
      },
      executing, iterator, tmp, controller;
    return controller = {
      next: verb(0),
      throw: verb(1),
      return: verb(2)
    }, typeof Symbol == "function" && (controller[Symbol.iterator] = function() {
      return this
    }), controller;

    function verb(opCode) {
      return function(value) {
        return step([opCode, value])
      }
    }

    function step(opPair) {
      if (executing) throw new TypeError("Generator is already executing.");
      for (; controller && (controller = 0, opPair[0] && (state = 0)), state;) try {
        if (executing = 1, iterator && (tmp = opPair[0] & 2 ? iterator.return : opPair[0] ? iterator.throw || ((tmp = iterator
            .return) && tmp.call(iterator), 0) : iterator.next) && !(tmp = tmp.call(iterator, opPair[1]))
          .done) return tmp;
        switch (iterator = 0, tmp && (opPair = [opPair[0] & 2, tmp.value]), opPair[0]) {
          case 0:
          case 1:
            tmp = opPair;
            break;
          case 4:
            return state.label++, {
              value: opPair[1],
              done: !1
            };
          case 5:
            state.label++, iterator = opPair[1], opPair = [0];
            continue;
          case 7:
            opPair = state.ops.pop(), state.trys.pop();
            continue;
          default:
            if (tmp = state.trys, !(tmp = tmp.length > 0 && tmp[tmp.length - 1]) && (opPair[
                0] === 6 || opPair[0] === 2)) {
              state = 0;
              continue
            }
            if (opPair[0] === 3 && (!tmp || opPair[1] > tmp[0] && opPair[1] < tmp[3])) {
              state.label = opPair[1];
              break
            }
            if (opPair[0] === 6 && state.label < tmp[1]) {
              state.label = tmp[1], tmp = opPair;
              break
            }
            if (tmp && state.label < tmp[2]) {
              state.label = tmp[2], state.ops.push(opPair);
              break
            }
            tmp[2] && state.ops.pop(), state.trys.pop();
            continue
        }
        opPair = body.call(thisArg, state)
      } catch (caughtError) {
        opPair = [6, caughtError], iterator = 0
      } finally {
        executing = tmp = 0
      }
      if (opPair[0] & 5) throw opPair[1];
      return {
        value: opPair[0] ? opPair[1] : void 0,
        done: !0
      }
    }
  },
  ResultAsync = function() {
    function ResultAsyncClass(result) {
      this.promise = Promise.resolve(result)
    }
    return ResultAsyncClass.prototype.andThen = function(mapFn) {
      var self = this;
      return this.thenInternal(function(result) {
        return awaiter(self, void 0, void 0, function() {
          var mapped;
          return runGenerator(this, function(genState) {
            return result.isErr() ? [2, result] : (mapped = mapFn(result.value), [2,
              mapped instanceof ResultAsyncClass ? mapped.promise : mapped
            ])
          })
        })
      })
    }, ResultAsyncClass.prototype.map = function(mapFn) {
      var self = this;
      return this.thenInternal(function(result) {
        return awaiter(self, void 0, void 0, function() {
          var okFactory;
          return runGenerator(this, function(genState) {
            switch (genState.label) {
              case 0:
                return result.isErr() ? [2, result] : (okFactory = OkResult, [4, mapFn(result
                  .value)]);
              case 1:
                return [2, okFactory.apply(void 0, [genState.sent()])]
            }
          })
        })
      })
    }, ResultAsyncClass.prototype.thenInternal = function(onFulfilled) {
      return new ResultAsyncClass(this.promise.then(onFulfilled))
    }, ResultAsyncClass
  }();
var hasStringField = (obj, key) => typeof obj[key] == "string";

function deserialize(node) {
  try {
    if (hasStringField(node, "__serializer_tag")) {
      if (node.__serializer_tag === "primitive") return OkResult(node.__serializer_value);
      if (node.__serializer_tag === "regex") {
        let pattern = new RegExp(node.__serializer_value);
        return OkResult(pattern)
      } else if (node.__serializer_tag === "array") {
        let items = [];
        for (let entry of node.__serializer_value) {
          let result = deserialize(entry);
          if (result.isErr()) return result;
          items.push(result.unwrap())
        }
        return OkResult(items)
      } else if (node.__serializer_tag === "map") {
        let items = [];
        for (let entry of node.__serializer_value) {
          let result = deserialize(entry);
          if (result.isErr()) return result;
          items.push(result.unwrap())
        }
        return OkResult(new Map(items))
      } else if (node.__serializer_tag === "set") {
        let items = [];
        for (let entry of node.__serializer_value) {
          let result = deserialize(entry);
          if (result.isErr()) return result;
          items.push(result.unwrap())
        }
        return OkResult(new Set(items))
      } else if (node.__serializer_tag === "result_ok") {
        let innerNode = node.__serializer_value,
          converted = deserialize(innerNode);
        return converted.isErr() ? converted : OkResult(OkResult(converted.unwrap()))
      } else if (node.__serializer_tag === "result_err") {
        let innerNode = node.__serializer_value,
          converted = deserialize(innerNode);
        return converted.isErr() ? converted : OkResult(ErrResult(converted.unwrap()))
      } else if (node.__serializer_tag === "option_some") {
        let innerNode = node.__serializer_value,
          converted = deserialize(innerNode);
        return converted.isErr() ? converted : OkResult(Some(converted.unwrap()))
      } else if (node.__serializer_tag === "option_none") return OkResult(None)
    }
    let valueType = typeof node;
    if (valueType === "string" || valueType === "number" || valueType === "boolean" || valueType ===
      "undefined" || Array.isArray(node) || node == null) return ErrResult(
      "This object was not serialized with Serialize");
    let resultObj = {};
    for (let key of Object.keys(node))
      if (typeof key == "string") {
        let converted = deserialize(node[key]);
        if (converted.isErr()) return converted;
        resultObj[key] = converted.unwrap()
      } return OkResult(resultObj)
  } catch {
    return ErrResult("Failed to inspect object. Not JSON?")
  }
}

function serialize(value) {
  let valueType = typeof value;
  if (valueType === "string" || valueType === "number" || valueType === "boolean" || valueType ===
    "undefined" || value == null) return OkResult({
    __serializer_tag: "primitive",
    __serializer_value: value
  });
  if (value instanceof RegExp) return OkResult({
    __serializer_tag: "regex",
    __serializer_value: value.source
  });
  if (Array.isArray(value)) {
    let serializedItems = value.map(item => serialize(item)),
      firstError = serializedItems.as_iter()
      .find(result => result.isErr());
    if (firstError.isSome()) return firstError.unwrap();
    let values = serializedItems.as_iter()
      .map(result => result.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: "array",
      __serializer_value: values
    })
  } else if (value instanceof Map) {
    let serializedItems = [...value.entries()].map(entry => serialize(entry)),
      firstError = serializedItems.as_iter()
      .find(result => result.isErr());
    if (firstError.isSome()) return firstError.unwrap();
    let values = serializedItems.as_iter()
      .map(result => result.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: "map",
      __serializer_value: values
    })
  } else if (value instanceof Set) {
    let serializedItems = [...value.values()].map(item => serialize(item)),
      firstError = serializedItems.as_iter()
      .find(result => result.isErr());
    if (firstError.isSome()) return firstError.unwrap();
    let values = serializedItems.as_iter()
      .map(result => result.unwrap())
      .toArray();
    return OkResult({
      __serializer_tag: "set",
      __serializer_value: values
    })
  } else if (Result.isResult(value))
    if (value.isOk()) {
      let innerValue = value.unwrap(),
        serialized = serialize(innerValue);
      return serialized.isErr() ? serialized : OkResult({
        __serializer_tag: "result_ok",
        __serializer_value: serialized.unwrap()
      })
    } else {
      let innerError = value.unwrapErr(),
        serialized = serialize(innerError);
      return serialized.isErr() ? serialized : OkResult({
        __serializer_tag: "result_err",
        __serializer_value: serialized.unwrap()
      })
    }
  else if (Option.isOption(value))
    if (value.isSome()) {
      let innerValue = value.unwrap(),
        serialized = serialize(innerValue);
      return serialized.isErr() ? serialized : OkResult({
        __serializer_tag: "option_some",
        __serializer_value: serialized.unwrap()
      })
    } else return OkResult({
      __serializer_tag: "option_none"
    });
  else if (valueType === "object") {
    let resultObj = {},
      source = value;
    for (let key of Object.keys(value)) {
      let propValue = source[key],
        serialized = serialize(propValue);
      if (serialized.isErr()) continue;
      let unwrapped = serialized.unwrap();
      resultObj[key] = unwrapped
    }
    return OkResult(resultObj)
  } else return ErrResult("Unsupported value")
}

function makeIterable(generatorFn) {
  return Object.assign(generatorFn.prototype, {
    find: function(predicate) {
      for (let item of this)
        if (predicate(item)) return Some(item);
      return None
    },
    count: function(predicate) {
      return this.reduce((count, item) => (predicate(item) && count++, count), 0)
    },
    reduce: function(reducer, initialValue) {
      let accumulator = initialValue;
      for (let item of this) accumulator = reducer(accumulator, item);
      return accumulator
    },
    every: function(predicate) {
      return !this.any(item => !predicate(item))
    },
    any: function(predicate) {
      for (let item of this)
        if (predicate(item)) return !0;
      return !1
    },
    map: function(mapFn) {
      return this.filterMap(item => Some(mapFn(item)))
    },
    filter: function(predicate) {
      return this.filterMap(item => predicate(item) ? Some(item) : None)
    },
    enumerate: function() {
      let self = this;
      return makeIterable(function*() {
        let index = 0;
        for (let item of self) yield [index, item], index++
      })()
    },
    filterMap: function(mapFn) {
      let self = this;
      return makeIterable(function*() {
        for (let item of self) {
          let mapped = mapFn(item);
          mapped.isSome() && (yield mapped.unwrap())
        }
      })()
    },
    sort: function(comparator) {
      let array = this.toArray();
      return array.sort(comparator), array
    },
    toArray: function() {
      return [...this]
    }
  }), generatorFn
}
Array.prototype.as_iter || (Array.prototype.as_iter = function() {
  let self = this;
  return makeIterable(function*() {
    for (let item of self) yield item
  })()
});
Set.prototype.as_iter || (Set.prototype.as_iter = function() {
  let self = this;
  return makeIterable(function*() {
    for (let item of self) yield item
  })()
});
Map.prototype.as_iter || (Map.prototype.as_iter = function() {
  let self = this;
  return makeIterable(function*() {
    for (let item of self) yield item
  })()
});
var neverMatchRegex = /.^/,
  videoCodecs = {
    Av1: {
      name: "Av1",
      type: "video",
      mimetype: /av01.*/i,
      defacto_container: "WebM"
    },
    H264: {
      name: "H264",
      type: "video",
      mimetype: /avc1.*/i,
      defacto_container: "Mp4"
    },
    H263: {
      name: "H263",
      type: "video",
      mimetype: neverMatchRegex,
      defacto_container: "3gp"
    },
    H265: {
      name: "H265",
      type: "video",
      mimetype: /(hvc1|hevc|h265|h\.265).*/i,
      defacto_container: "Mp4"
    },
    MP4V: {
      name: "MP4V",
      type: "video",
      mimetype: /mp4v\.20.*/i,
      defacto_container: "Mp4"
    },
    MPEG1: {
      name: "MPEG1",
      type: "video",
      mimetype: neverMatchRegex,
      defacto_container: "Mpeg"
    },
    MPEG2: {
      name: "MPEG2",
      type: "video",
      mimetype: neverMatchRegex,
      defacto_container: "Mpeg"
    },
    Theora: {
      name: "Theora",
      type: "video",
      mimetype: /theora/i,
      defacto_container: "Ogg"
    },
    VP8: {
      name: "VP8",
      type: "video",
      mimetype: /vp0?8.*/i,
      defacto_container: "WebM"
    },
    VP9: {
      name: "VP9",
      type: "video",
      mimetype: /vp0?9.*/i,
      defacto_container: "WebM"
    },
    unknown: {
      name: "unknown",
      type: "video",
      mimetype: neverMatchRegex,
      defacto_container: "Mp4"
    }
  },
  audioCodecs = {
    AAC: {
      name: "AAC",
      type: "audio",
      mimetype: /(aac|mp4a.40).*/i,
      defacto_container: "Mp4"
    },
    PCM: {
      name: "PCM",
      type: "audio",
      mimetype: /pcm.*/i,
      defacto_container: "Wav"
    },
    FLAC: {
      name: "FLAC",
      type: "audio",
      mimetype: /flac/i,
      defacto_container: "Flac"
    },
    MP3: {
      name: "MP3",
      type: "audio",
      mimetype: /(\.?mp3|mp4a\.69|mp4a\.6b).*/i,
      defacto_container: "Mpeg"
    },
    Opus: {
      name: "Opus",
      type: "audio",
      mimetype: /(opus|(mp4a\.ad.*))/i,
      defacto_container: "Ogg"
    },
    Vorbis: {
      name: "Vorbis",
      type: "audio",
      mimetype: /vorbis/i,
      defacto_container: "Ogg"
    },
    Wav: {
      name: "Wav",
      type: "audio",
      mimetype: neverMatchRegex,
      defacto_container: "Wav"
    },
    unknown: {
      name: "unknown",
      type: "audio",
      mimetype: neverMatchRegex,
      defacto_container: "Mp4"
    }
  },
  iterVideoCodecs = makeIterable(function*() {
    for (let codecKey of Object.keys(videoCodecs)) yield videoCodecs[codecKey]
  }),
  iterAudioCodecs = makeIterable(function*() {
    for (let codecKey of Object.keys(audioCodecs)) yield audioCodecs[codecKey]
  });
var containerFormats = {
    Mp4: {
      name: "Mp4",
      extension: "mp4",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["H264", "H265", "Av1", "MP4V", "MPEG2",
        "unknown"],
      supported_audio_codecs: ["Opus", "MP3", "FLAC", "AAC", "unknown"],
      mimetype: /(?:x-)?mp4/i
    },
    Mkv: {
      name: "Mkv",
      extension: "mkv",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: iterVideoCodecs()
        .filter(codec => codec.name != "unknown")
        .map(codec => codec.name)
        .toArray(),
      supported_audio_codecs: iterAudioCodecs()
        .filter(codec => codec.name != "unknown")
        .map(codec => codec.name)
        .toArray(),
      mimetype: /(?:x-)?matroska/i
    },
    WebM: {
      name: "WebM",
      extension: "webm",
      audio_only_extension: "oga",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["H264", "VP8", "VP9", "Av1"],
      supported_audio_codecs: ["Opus", "Vorbis"],
      mimetype: /(?:x-)?webm/i
    },
    M2TS: {
      name: "M2TS",
      extension: "mt2s",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["H264", "H265", "Av1", "MP4V", "MPEG2", "VP9",
        "unknown"
      ],
      supported_audio_codecs: ["Opus", "MP3", "FLAC", "AAC"],
      mimetype: /(?:x-)?mts/i
    },
    MP2T: {
      name: "MP2T",
      extension: "mp2t",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: Some("MP3"),
        video: Some("H264")
      },
      supported_video_codecs: ["MPEG2", "MPEG1"],
      supported_audio_codecs: ["MP3"],
      mimetype: /(?:x-)?mp2t/i
    },
    Flash: {
      name: "Flash",
      extension: "flv",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["H264"],
      supported_audio_codecs: ["AAC"],
      mimetype: /(?:x-)?flv/i
    },
    M4V: {
      name: "M4V",
      extension: "m4v",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["H264", "H265", "Av1", "MP4V", "MPEG2"],
      supported_audio_codecs: ["Opus", "MP3", "FLAC", "AAC"],
      mimetype: /(?:x-)?m4v/i
    },
    M4A: {
      name: "M4A",
      extension: "m4a",
      other_extensions: ["aac"],
      audio_only_extension: "m4a",
      defacto_codecs: {
        audio: Some("AAC"),
        video: None
      },
      supported_video_codecs: [],
      supported_audio_codecs: ["Opus", "MP3", "FLAC", "AAC", "unknown"],
      mimetype: /(?:x-)?m4a/i
    },
    Flac: {
      name: "Flac",
      extension: "flac",
      audio_only_extension: "flac",
      defacto_codecs: {
        audio: Some("FLAC"),
        video: None
      },
      supported_video_codecs: [],
      supported_audio_codecs: ["FLAC"],
      mimetype: /(?:x-)?flac/i
    },
    Mpeg: {
      name: "Mpeg",
      extension: "mpeg",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: Some("MP3"),
        video: Some("H264")
      },
      supported_video_codecs: ["MPEG2", "MPEG1"],
      supported_audio_codecs: ["MP3"],
      mimetype: /(?:x-)?mpeg/i
    },
    Ogg: {
      name: "Ogg",
      extension: "ogv",
      audio_only_extension: "oga",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["VP9", "VP8", "Theora"],
      supported_audio_codecs: ["Opus", "Vorbis", "FLAC"],
      mimetype: /(?:x-)?og./i
    },
    Wav: {
      name: "Wav",
      extension: "wav",
      audio_only_extension: "wav",
      defacto_codecs: {
        audio: Some("Wav"),
        video: None
      },
      supported_video_codecs: [],
      supported_audio_codecs: ["Wav", "PCM"],
      mimetype: /(?:x-)?(?:pn-)?wave?/i
    },
    "3gp": {
      name: "3gp",
      extension: "3gpp",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["H264", "H263", "MP4V", "VP8"],
      supported_audio_codecs: ["MP3", "AAC"],
      mimetype: /(?:x-)?3gpp2?/i
    },
    QuickTime: {
      name: "QuickTime",
      extension: "mov",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: None,
        video: None
      },
      supported_video_codecs: ["MPEG1", "MPEG2"],
      supported_audio_codecs: [],
      mimetype: /(?:x-)?mov/i
    }
  },
  iterContainerNames = makeIterable(function*() {
    for (let containerName of Object.keys(containerFormats)) yield containerName
  }),
  iterContainers = makeIterable(function*() {
    for (let containerName of iterContainerNames()) yield containerFormats[containerName]
  });
var resolutions = {
  240: {
    id: "240",
    loose_name: "Small"
  },
  360: {
    id: "360",
    loose_name: "SD"
  },
  480: {
    id: "480",
    loose_name: "SD"
  },
  720: {
    id: "720",
    loose_name: "HD"
  },
  1080: {
    id: "1080",
    loose_name: "FullHD"
  },
  1440: {
    id: "1440",
    loose_name: "UHD"
  },
  2160: {
    id: "2160",
    loose_name: "4K"
  },
  4320: {
    id: "4320",
    loose_name: "8K"
  }
};
var iterResolutionKeys = makeIterable(function*() {
    for (let resolutionKey of Object.keys(resolutions)) yield resolutionKey
  }),
  iterResolutions = makeIterable(function*() {
    for (let resolutionKey of iterResolutionKeys()) yield resolutions[resolutionKey]
  });
var browserPolyfillScripting = toEsm(requirePolyfill(), 1);

function makeDefaultRule() {
  return {
    template: "%title",
    max_length: 64
  }
}
async function generateName(mediaInfo, rule) {
  let primaryVariant = mediaInfo.variants.values()
    .next()
    .value,
    title = mediaInfo.page_title,
    hostname = new URL(mediaInfo.page_url)
    .hostname,
    hostnameBase = hostname.replace(/\.com$|\.net$|\.org$/, ""),
    pathname = new URL(primaryVariant.manifest_url)
    .pathname.split("/")
    .pop() || "none",
    selectorText = "";
  if (title.length < 4 ? title = hostnameBase : title.length < 8 && (title += "-" + hostnameBase), pathname.includes(
    ".")) {
    let segments = pathname.split(".");
    segments.pop(), pathname = segments.join(".")
  }
  if (!rule) {
    let rulesMap = await readStored(smartNamingSetting);
    rule = rulesMap.get(hostname) || rulesMap.get("*"), rule || (console.error("Missing '*' rule"), rule =
      makeDefaultRule())
  }
  try {
    if (rule.selector && mediaInfo.tab_id != "none") {
      let scriptTarget = {
        tabId: mediaInfo.tab_id
      };
      selectorText = (await browserPolyfillScripting.default.scripting.executeScript({
        target: scriptTarget,
        world: browserPolyfillScripting.default.scripting.ExecutionWorld.MAIN,
        args: [rule.selector],
        func: selector => document.querySelector(selector)
          ?.textContent
      }))[0]?.result
    }
  } catch {}
  let generatedName = rule.template.replaceAll("%title", title)
    .replaceAll("%hostname", hostnameBase)
    .replaceAll("%pathname", pathname)
    .replaceAll("%selector", selectorText);
  return generatedName.length < 3 && (generatedName = hostnameBase), generatedName.trim()
    .normalize("NFD")
    .replace(/\./gu, " ")
    .replace(/[^\p{L}\p{N}\-\s]/ug, "")
    .replace(/-+/gu, "-")
    .replace(/\s+/gu, " ")
    .substring(0, rule.max_length)
}
async function writeStored(storeDescriptor, value) {
  let storedValue = value;
  storeDescriptor.hooks && (storedValue = storeDescriptor.hooks.setter(value)), await browserPolyfill.storage[storeDescriptor.where].set({
    [storeDescriptor.name]: storedValue
  })
}
async function readStored(storeDescriptor) {
  let record = await browserPolyfill.storage[storeDescriptor.where].get(storeDescriptor.name);
  if (storeDescriptor.name in record) {
    let rawValue = record[storeDescriptor.name];
    return storeDescriptor.hooks ? storeDescriptor.hooks.getter(rawValue, storeDescriptor) : rawValue
  }
  return storeDescriptor.default()
}
async function removeStored(storeDescriptor) {
  await browserPolyfill.storage[storeDescriptor.where].remove(storeDescriptor.name)
}
var viewOptionsSetting = {
  name: "view_options",
  default: () => ({}),
  where: "session"
};
var smartNamingSetting = {
    name: "smartnaming",
    where: "local",
    default: () => new Map([
      ["*", makeDefaultRule()]
    ]),
    hooks: {
      setter: value => serialize(value)
        .unwrap(),
      getter: (serialized, descriptor) => deserialize(serialized)
        .unwrapOr(descriptor.default())
    }
  },
  databaseSetting = {
    name: "database",
    where: "session",
    default: () => ({
      yt_bulk: None,
      user_messages: new Set,
      coapp_status: "checking",
      license_status: {
        checking: !0
      },
      current_tab_id: 0,
      current_window_id: 0,
      downloadable: new Map,
      downloading: new Map,
      downloaded: new Map,
      download_errors: new Map
    }),
    hooks: {
      setter: value => serialize(value)
        .unwrap(),
      getter: (serialized, descriptor) => deserialize(serialized)
        .unwrapOr(descriptor.default())
    }
  };
var browserPolyfillI18n = toEsm(requirePolyfill(), 1);

function escapeHtml(text) {
  return text ? text.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;") : ""
}

function getI18nMessage(messageKey, args, localStrings) {
  let fallback = () => (console.error(`Requesting unknown i18n string ${messageKey}`), messageKey);
  args = args.map(substitution => substitution.toString())
    .map(escapeHtml);
  try {
    if (messageKey in localStrings) {
      let message = localStrings[messageKey],
        placeholderIndex = 1;
      for (let index = 0; index < args.length; index++) message = message.replace(`$${placeholderIndex}`, args[index]);
      return message
    } else {
      let message = browserPolyfillI18n.default.i18n.getMessage(messageKey, args);
      return message || fallback()
    }
  } catch {
    return fallback()
  }
}

function localizeDom(root, localStrings) {
  for (let element of Array.from(root.querySelectorAll("[data-i18n]"))) {
    let argsJson = element.dataset.i18nArgs,
      attr = element.dataset.i18nAttr,
      text;
    argsJson ? text = getI18nMessage(element.dataset.i18n, JSON.parse(argsJson), localStrings) : text = getI18nMessage(element.dataset.i18n, [],
      localStrings), attr ? element.setAttribute(attr, text) : element.textContent = text
  }
}
var urlParams = new URL(document.location.toString())
  .searchParams,
  downloadId = urlParams.get("id"),
  mediaInfo = (await readStored(databaseSetting))
  .downloadable.get(downloadId),
  hostname = new URL(mediaInfo.page_url)
  .hostname;
async function refreshForm() {
  let rulesMap = await readStored(smartNamingSetting),
    rule = rulesMap.get(hostname) || rulesMap.get("*") || makeDefaultRule();
  for (let element of Array.from(document.querySelectorAll(".hostname"))) element
    .textContent = hostname;
  document.querySelector("#template")
    .value = rule.template, document.querySelector("#selector")
    .value = rule.selector || "", document.querySelector("#max-length")
    .value = rule.max_length.toString(), document.querySelector("#result")
    .value = ""
}

function readRuleFromForm() {
  let template = document.querySelector("#template")
    .value,
    maxLength = parseInt(document.querySelector("#max-length")
      .value),
    selector = document.querySelector("#selector")
    .value,
    rule = makeDefaultRule();
  return rule.template = template, maxLength && (rule.max_length = maxLength), selector && (rule.selector = selector), rule
}
async function onClick(event) {
  let target = event.target;
  if (target) {
    let resetButton = target.closest("#button-reset"),
      resetAllButton = target.closest("#button-reset-all"),
      saveButton = target.closest("#button-save"),
      saveAllButton = target.closest("#button-save-all"),
      testButton = target.closest("#button-test");
    if (resetAllButton && (await removeStored(smartNamingSetting), refreshForm()), resetButton) {
      let rulesMap = await readStored(smartNamingSetting);
      rulesMap.delete(hostname), await writeStored(smartNamingSetting, rulesMap), refreshForm()
    }
    if (saveButton || saveAllButton) {
      let rulesMap = await readStored(smartNamingSetting),
        rule = readRuleFromForm(),
        ruleKey = hostname;
      saveAllButton && (delete rule.selector, ruleKey = "*"), rulesMap.set(ruleKey, rule), writeStored(smartNamingSetting, rulesMap)
    }
    if (testButton) {
      let rule = readRuleFromForm(),
        generatedName = await generateName(mediaInfo, rule);
      document.querySelector("#result")
        .value = generatedName
    }
  }
}
refreshForm();
var viewOptions = await readStored(viewOptionsSetting);
localizeDom(document, viewOptions);
window.addEventListener("click", onClick);