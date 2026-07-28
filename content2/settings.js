var objectCreate = Object.create;
var defineProperty = Object.defineProperty;
var getOwnPropDesc = Object.getOwnPropertyDescriptor;
var getOwnPropNames = Object.getOwnPropertyNames;
var getPrototypeOf = Object.getPrototypeOf,
  hasOwnPropertyRef = Object.prototype.hasOwnProperty;
var defineCommonjsModule = (defineModule, cachedExports) => () => (cachedExports || defineModule((cachedExports = {
      exports: {}
    })
    .exports, cachedExports), cachedExports.exports),
  defineExports = (exportTarget, exportsMap) => {
    for (var exportName in exportsMap) defineProperty(exportTarget, exportName, {
      get: exportsMap[exportName],
      enumerable: !0
    })
  },
  copyProps = (targetObj, fromObj, exceptKey, descFlag) => {
    if (fromObj && typeof fromObj == "object" || typeof fromObj == "function")
      for (let propKey of getOwnPropNames(fromObj)) !hasOwnPropertyRef.call(targetObj, propKey) && propKey !== exceptKey && defineProperty(targetObj, propKey, {
        get: () => fromObj[propKey],
        enumerable: !(descFlag = getOwnPropDesc(fromObj, propKey)) || descFlag.enumerable
      });
    return targetObj
  };
var toEsm = (moduleObj, isNodeMode, esmTarget) => (esmTarget = moduleObj != null ? objectCreate(getPrototypeOf(moduleObj)) : {}, copyProps(isNodeMode || !moduleObj || !moduleObj
  .__esModule ? defineProperty(esmTarget, "default", {
    value: moduleObj,
    enumerable: !0
  }) : esmTarget, moduleObj));
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
var localeStringCounts = {};
defineExports(localeStringCounts, {
  bg: () => bgStringCount,
  ca: () => caStringCount,
  co: () => coStringCount,
  cs: () => csStringCount,
  da: () => daStringCount,
  de: () => deStringCount,
  default: () => localeStringCountsDefault,
  dsb: () => dsbStringCount,
  el: () => elStringCount,
  en_US: () => enUsStringCount,
  es: () => esStringCount,
  fr: () => frStringCount,
  hsb: () => hsbStringCount,
  hu: () => huStringCount,
  id: () => idStringCount,
  is: () => isStringCount,
  it: () => itStringCount,
  ja: () => jaStringCount,
  ko: () => koStringCount,
  nb: () => nbStringCount,
  nl: () => nlStringCount,
  pl: () => plStringCount,
  pt_BR: () => ptBrStringCount,
  ro: () => roStringCount,
  ru: () => ruStringCount,
  sk: () => skStringCount,
  sl: () => slStringCount,
  sv: () => svStringCount,
  tr: () => trStringCount,
  uk: () => ukStringCount,
  zh_CN: () => zhCnStringCount,
  zh_TW: () => zhTwStringCount
});
var bgStringCount = 224,
  caStringCount = 538,
  coStringCount = 676,
  csStringCount = 637,
  daStringCount = 379,
  deStringCount = 685,
  dsbStringCount = 519,
  elStringCount = 636,
  enUsStringCount = 682,
  esStringCount = 578,
  frStringCount = 685,
  hsbStringCount = 519,
  huStringCount = 540,
  idStringCount = 538,
  isStringCount = 251,
  itStringCount = 682,
  jaStringCount = 624,
  koStringCount = 303,
  nbStringCount = 255,
  nlStringCount = 651,
  plStringCount = 636,
  ptBrStringCount = 670,
  roStringCount = 223,
  ruStringCount = 578,
  skStringCount = 535,
  slStringCount = 540,
  svStringCount = 540,
  trStringCount = 617,
  ukStringCount = 669,
  zhCnStringCount = 664,
  zhTwStringCount = 641,
  localeStringCountsDefault = {
    bg: bgStringCount,
    ca: caStringCount,
    co: coStringCount,
    cs: csStringCount,
    da: daStringCount,
    de: deStringCount,
    dsb: dsbStringCount,
    el: elStringCount,
    en_US: enUsStringCount,
    es: esStringCount,
    fr: frStringCount,
    hsb: hsbStringCount,
    hu: huStringCount,
    id: idStringCount,
    is: isStringCount,
    it: itStringCount,
    ja: jaStringCount,
    ko: koStringCount,
    nb: nbStringCount,
    nl: nlStringCount,
    pl: plStringCount,
    pt_BR: ptBrStringCount,
    ro: roStringCount,
    ru: ruStringCount,
    sk: skStringCount,
    sl: slStringCount,
    sv: svStringCount,
    tr: trStringCount,
    uk: ukStringCount,
    zh_CN: zhCnStringCount,
    zh_TW: zhTwStringCount
  };

function formatValue(value) {
  var text = String(value);
  if (text === "[object Object]") try {
    text = JSON.stringify(value)
  } catch {}
  return text
}
var NoneImpl = function() {
    function NoneCtor() {}
    return NoneCtor.prototype.isSome = function() {
      return !1
    }, NoneCtor.prototype.isNone = function() {
      return !0
    }, NoneCtor.prototype[Symbol.iterator] = function() {
      return {
        next: function() {
          return {
            done: !0,
            value: void 0
          }
        }
      }
    }, NoneCtor.prototype.unwrapOr = function(fallbackValue) {
      return fallbackValue
    }, NoneCtor.prototype.expect = function(errorMessage) {
      throw new Error("".concat(errorMessage))
    }, NoneCtor.prototype.unwrap = function() {
      throw new Error("Tried to unwrap None")
    }, NoneCtor.prototype.map = function(mapFn) {
      return this
    }, NoneCtor.prototype.mapOr = function(fallbackValue, mapFn) {
      return fallbackValue
    }, NoneCtor.prototype.mapOrElse = function(fallbackFn, mapFn) {
      return fallbackFn()
    }, NoneCtor.prototype.or = function(alternative) {
      return alternative
    }, NoneCtor.prototype.orElse = function(alternativeFn) {
      return alternativeFn()
    }, NoneCtor.prototype.andThen = function(thenFn) {
      return this
    }, NoneCtor.prototype.toResult = function(errorValue) {
      return makeErr(errorValue)
    }, NoneCtor.prototype.toString = function() {
      return "None"
    }, NoneCtor
  }(),
  NoneSingleton = new NoneImpl;
Object.freeze(NoneSingleton);
var SomeImpl = function() {
    function SomeCtor(someValue) {
      if (!(this instanceof SomeCtor)) return new SomeCtor(someValue);
      this.value = someValue
    }
    return SomeCtor.prototype.isSome = function() {
      return !0
    }, SomeCtor.prototype.isNone = function() {
      return !1
    }, SomeCtor.prototype[Symbol.iterator] = function() {
      var valueObject = Object(this.value);
      return Symbol.iterator in valueObject ? valueObject[Symbol.iterator]() : {
        next: function() {
          return {
            done: !0,
            value: void 0
          }
        }
      }
    }, SomeCtor.prototype.unwrapOr = function(fallbackValue) {
      return this.value
    }, SomeCtor.prototype.expect = function(errorMessage) {
      return this.value
    }, SomeCtor.prototype.unwrap = function() {
      return this.value
    }, SomeCtor.prototype.map = function(mapFn) {
      return makeSome(mapFn(this.value))
    }, SomeCtor.prototype.mapOr = function(fallbackValue, mapFn) {
      return mapFn(this.value)
    }, SomeCtor.prototype.mapOrElse = function(fallbackFn, mapFn) {
      return mapFn(this.value)
    }, SomeCtor.prototype.or = function(alternative) {
      return this
    }, SomeCtor.prototype.orElse = function(alternativeFn) {
      return this
    }, SomeCtor.prototype.andThen = function(thenFn) {
      return thenFn(this.value)
    }, SomeCtor.prototype.toResult = function(errorValue) {
      return makeOk(this.value)
    }, SomeCtor.prototype.safeUnwrap = function() {
      return this.value
    }, SomeCtor.prototype.toString = function() {
      return "Some(".concat(formatValue(this.value), ")")
    }, SomeCtor.EMPTY = new SomeCtor(void 0), SomeCtor
  }(),
  makeSome = SomeImpl,
  OptionNamespace;
(function(optionNs) {
  function allSome() {
    for (var optionArgs = [], argIndex = 0; argIndex < arguments.length; argIndex++) optionArgs[argIndex] = arguments[argIndex];
    for (var collected = [], scanIndex = 0, optionList = optionArgs; scanIndex < optionList.length; scanIndex++) {
      var option = optionList[scanIndex];
      if (option.isSome()) collected.push(option.value);
      else return option
    }
    return makeSome(collected)
  }
  optionNs.all = allSome;

  function firstSome() {
    for (var optionArgs = [], argIndex = 0; argIndex < arguments.length; argIndex++) optionArgs[argIndex] = arguments[argIndex];
    for (var scanIndex = 0, optionList = optionArgs; scanIndex < optionList.length; scanIndex++) {
      var option = optionList[scanIndex];
      return option.isSome(), option
    }
    return NoneSingleton
  }
  optionNs.any = firstSome;

  function isOptionGuard(candidate) {
    return candidate instanceof makeSome || candidate === NoneSingleton
  }
  optionNs.isOption = isOptionGuard
})(OptionNamespace || (OptionNamespace = {}));
var ErrImpl = function() {
  function ErrCtor(errorValue) {
    if (!(this instanceof ErrCtor)) return new ErrCtor(errorValue);
    this.error = errorValue;
    var stackLines = new Error()
      .stack.split(`
`)
      .slice(2);
    stackLines && stackLines.length > 0 && stackLines[0].includes("ErrImpl") && stackLines.shift(), this._stack =
      stackLines.join(`
`)
  }
  return ErrCtor.prototype.isOk = function() {
    return !1
  }, ErrCtor.prototype.isErr = function() {
    return !0
  }, ErrCtor.prototype[Symbol.iterator] = function() {
    return {
      next: function() {
        return {
          done: !0,
          value: void 0
        }
      }
    }
  }, ErrCtor.prototype.else = function(fallbackValue) {
    return fallbackValue
  }, ErrCtor.prototype.unwrapOr = function(fallbackValue) {
    return fallbackValue
  }, ErrCtor.prototype.expect = function(errorMessage) {
    throw new Error("".concat(errorMessage, " - Error: ")
      .concat(formatValue(this.error), `
`)
      .concat(this._stack), {
        cause: this.error
      })
  }, ErrCtor.prototype.expectErr = function(errorMessage) {
    return this.error
  }, ErrCtor.prototype.unwrap = function() {
    throw new Error("Tried to unwrap Error: ".concat(formatValue(this.error), `
`)
      .concat(this._stack), {
        cause: this.error
      })
  }, ErrCtor.prototype.unwrapErr = function() {
    return this.error
  }, ErrCtor.prototype.map = function(mapFn) {
    return this
  }, ErrCtor.prototype.andThen = function(thenFn) {
    return this
  }, ErrCtor.prototype.mapErr = function(mapErrFn) {
    return new makeErr(mapErrFn(this.error))
  }, ErrCtor.prototype.mapOr = function(fallbackValue, mapFn) {
    return fallbackValue
  }, ErrCtor.prototype.mapOrElse = function(fallbackFn, mapFn) {
    return fallbackFn(this.error)
  }, ErrCtor.prototype.or = function(alternative) {
    return alternative
  }, ErrCtor.prototype.orElse = function(alternativeFn) {
    return alternativeFn(this.error)
  }, ErrCtor.prototype.toOption = function() {
    return NoneSingleton
  }, ErrCtor.prototype.toString = function() {
    return "Err(".concat(formatValue(this.error), ")")
  }, Object.defineProperty(ErrCtor.prototype, "stack", {
    get: function() {
      return "".concat(this, `
`)
        .concat(this._stack)
    },
    enumerable: !1,
    configurable: !0
  }), ErrCtor.prototype.toAsyncResult = function() {
    return new AsyncResultImpl(this)
  }, ErrCtor.EMPTY = new ErrCtor(void 0), ErrCtor
}();
var makeErr = ErrImpl,
  OkImpl = function() {
    function OkCtor(okValue) {
      if (!(this instanceof OkCtor)) return new OkCtor(okValue);
      this.value = okValue
    }
    return OkCtor.prototype.isOk = function() {
      return !0
    }, OkCtor.prototype.isErr = function() {
      return !1
    }, OkCtor.prototype[Symbol.iterator] = function() {
      var valueObject = Object(this.value);
      return Symbol.iterator in valueObject ? valueObject[Symbol.iterator]() : {
        next: function() {
          return {
            done: !0,
            value: void 0
          }
        }
      }
    }, OkCtor.prototype.else = function(fallbackValue) {
      return this.value
    }, OkCtor.prototype.unwrapOr = function(fallbackValue) {
      return this.value
    }, OkCtor.prototype.expect = function(errorMessage) {
      return this.value
    }, OkCtor.prototype.expectErr = function(errorMessage) {
      throw new Error(errorMessage)
    }, OkCtor.prototype.unwrap = function() {
      return this.value
    }, OkCtor.prototype.unwrapErr = function() {
      throw new Error("Tried to unwrap Ok: ".concat(formatValue(this.value)), {
        cause: this.value
      })
    }, OkCtor.prototype.map = function(mapFn) {
      return new makeOk(mapFn(this.value))
    }, OkCtor.prototype.andThen = function(thenFn) {
      return thenFn(this.value)
    }, OkCtor.prototype.mapErr = function(mapErrFn) {
      return this
    }, OkCtor.prototype.mapOr = function(fallbackValue, mapFn) {
      return mapFn(this.value)
    }, OkCtor.prototype.mapOrElse = function(fallbackFn, mapFn) {
      return mapFn(this.value)
    }, OkCtor.prototype.or = function(alternative) {
      return this
    }, OkCtor.prototype.orElse = function(alternativeFn) {
      return this
    }, OkCtor.prototype.toOption = function() {
      return makeSome(this.value)
    }, OkCtor.prototype.safeUnwrap = function() {
      return this.value
    }, OkCtor.prototype.toString = function() {
      return "Ok(".concat(formatValue(this.value), ")")
    }, OkCtor.prototype.toAsyncResult = function() {
      return new AsyncResultImpl(this)
    }, OkCtor.EMPTY = new OkCtor(void 0), OkCtor
  }();
var makeOk = OkImpl,
  ResultNamespace;
(function(resultNs) {
  function allOk() {
    for (var resultArgs = [], argIndex = 0; argIndex < arguments.length; argIndex++) resultArgs[argIndex] = arguments[argIndex];
    for (var collected = [], scanIndex = 0, resultList = resultArgs; scanIndex < resultList.length; scanIndex++) {
      var result = resultList[scanIndex];
      if (result.isOk()) collected.push(result.value);
      else return result
    }
    return new makeOk(collected)
  }
  resultNs.all = allOk;

  function firstOk() {
    for (var resultArgs = [], argIndex = 0; argIndex < arguments.length; argIndex++) resultArgs[argIndex] = arguments[argIndex];
    for (var collectedErrors = [], scanIndex = 0, resultList = resultArgs; scanIndex < resultList.length; scanIndex++) {
      var result = resultList[scanIndex];
      if (result.isOk()) return result;
      collectedErrors.push(result.error)
    }
    return new makeErr(collectedErrors)
  }
  resultNs.any = firstOk;

  function wrapCall(operation) {
    try {
      return new makeOk(operation())
    } catch (caughtError) {
      return new makeErr(caughtError)
    }
  }
  resultNs.wrap = wrapCall;

  function wrapAsyncCall(asyncOperation) {
    try {
      return asyncOperation()
        .then(function(resolvedValue) {
          return new makeOk(resolvedValue)
        })
        .catch(function(rejectedError) {
          return new makeErr(rejectedError)
        })
    } catch (caughtError) {
      return Promise.resolve(new makeErr(caughtError))
    }
  }
  resultNs.wrapAsync = wrapAsyncCall;

  function isResultGuard(candidate) {
    return candidate instanceof makeErr || candidate instanceof makeOk
  }
  resultNs.isResult = isResultGuard
})(ResultNamespace || (ResultNamespace = {}));
var runAwaiter = function(thisArg, argsList, PromiseCtor, generatorFn) {
    function adopt(value) {
      return value instanceof PromiseCtor ? value : new PromiseCtor(function(resolveAdopted) {
        resolveAdopted(value)
      })
    }
    return new(PromiseCtor || (PromiseCtor = Promise))(function(resolve, reject) {
      function fulfilled(nextValue) {
        try {
          step(generatorFn.next(nextValue))
        } catch (stepError) {
          reject(stepError)
        }
      }

      function rejected(thrownValue) {
        try {
          step(generatorFn.throw(thrownValue))
        } catch (stepError) {
          reject(stepError)
        }
      }

      function step(stepResult) {
        stepResult.done ? resolve(stepResult.value) : adopt(stepResult.value)
          .then(fulfilled, rejected)
      }
      step((generatorFn = generatorFn.apply(thisArg, argsList || []))
        .next())
    })
  },
  stepGenerator = function(thisArg, body) {
    var state = {
        label: 0,
        sent: function() {
          if (tempResult[0] & 1) throw tempResult[1];
          return tempResult[1]
        },
        trys: [],
        ops: []
      },
      executingFlag, currentIterator, tempResult, iteratorApi;
    return iteratorApi = {
      next: makeVerb(0),
      throw: makeVerb(1),
      return: makeVerb(2)
    }, typeof Symbol == "function" && (iteratorApi[Symbol.iterator] = function() {
      return this
    }), iteratorApi;

    function makeVerb(verbKind) {
      return function(verbArg) {
        return runStep([verbKind, verbArg])
      }
    }

    function runStep(operation) {
      if (executingFlag) throw new TypeError("Generator is already executing.");
      for (; iteratorApi && (iteratorApi = 0, operation[0] && (state = 0)), state;) try {
        if (executingFlag = 1, currentIterator && (tempResult = operation[0] & 2 ? currentIterator.return : operation[0] ? currentIterator.throw || ((tempResult = currentIterator
            .return) && tempResult.call(currentIterator), 0) : currentIterator.next) && !(tempResult = tempResult.call(currentIterator, operation[1]))
          .done) return tempResult;
        switch (currentIterator = 0, tempResult && (operation = [operation[0] & 2, tempResult.value]), operation[0]) {
          case 0:
          case 1:
            tempResult = operation;
            break;
          case 4:
            return state.label++, {
              value: operation[1],
              done: !1
            };
          case 5:
            state.label++, currentIterator = operation[1], operation = [0];
            continue;
          case 7:
            operation = state.ops.pop(), state.trys.pop();
            continue;
          default:
            if (tempResult = state.trys, !(tempResult = tempResult.length > 0 && tempResult[tempResult.length - 1]) && (operation[
                0] === 6 || operation[0] === 2)) {
              state = 0;
              continue
            }
            if (operation[0] === 3 && (!tempResult || operation[1] > tempResult[0] && operation[1] < tempResult[3])) {
              state.label = operation[1];
              break
            }
            if (operation[0] === 6 && state.label < tempResult[1]) {
              state.label = tempResult[1], tempResult = operation;
              break
            }
            if (tempResult && state.label < tempResult[2]) {
              state.label = tempResult[2], state.ops.push(operation);
              break
            }
            tempResult[2] && state.ops.pop(), state.trys.pop();
            continue
        }
        operation = body.call(thisArg, state)
      } catch (caughtError) {
        operation = [6, caughtError], currentIterator = 0
      } finally {
        executingFlag = tempResult = 0
      }
      if (operation[0] & 5) throw operation[1];
      return {
        value: operation[0] ? operation[1] : void 0,
        done: !0
      }
    }
  },
  AsyncResultImpl = function() {
    function AsyncResultCtor(initialResult) {
      this.promise = Promise.resolve(initialResult)
    }
    return AsyncResultCtor.prototype.andThen = function(thenFn) {
      var selfAndThen = this;
      return this.thenInternal(function(innerResult) {
        return runAwaiter(selfAndThen, void 0, void 0, function() {
          var mappedResult;
          return stepGenerator(this, function(genState) {
            return innerResult.isErr() ? [2, innerResult] : (mappedResult = thenFn(innerResult.value), [2,
              mappedResult instanceof AsyncResultCtor ? mappedResult.promise : mappedResult
            ])
          })
        })
      })
    }, AsyncResultCtor.prototype.map = function(mapFn) {
      var selfMap = this;
      return this.thenInternal(function(innerResult) {
        return runAwaiter(selfMap, void 0, void 0, function() {
          var okCtorRef;
          return stepGenerator(this, function(genState) {
            switch (genState.label) {
              case 0:
                return innerResult.isErr() ? [2, innerResult] : (okCtorRef = makeOk, [4, mapFn(innerResult
                  .value)]);
              case 1:
                return [2, okCtorRef.apply(void 0, [genState.sent()])]
            }
          })
        })
      })
    }, AsyncResultCtor.prototype.thenInternal = function(onResult) {
      return new AsyncResultCtor(this.promise.then(onResult))
    }, AsyncResultCtor
  }();

function withIteratorMethods(generatorFactory) {
  return Object.assign(generatorFactory.prototype, {
    find: function(predicate) {
      for (let item of this)
        if (predicate(item)) return makeSome(item);
      return NoneSingleton
    },
    count: function(predicate) {
      return this.reduce((matchCount, countItem) => (predicate(countItem) && matchCount++, matchCount), 0)
    },
    reduce: function(reducer, initialAcc) {
      let accumulator = initialAcc;
      for (let reduceItem of this) accumulator = reducer(accumulator, reduceItem);
      return accumulator
    },
    every: function(predicate) {
      return !this.any(everyItem => !predicate(everyItem))
    },
    any: function(predicate) {
      for (let anyItem of this)
        if (predicate(anyItem)) return !0;
      return !1
    },
    map: function(mapFn) {
      return this.filterMap(mapItem => makeSome(mapFn(mapItem)))
    },
    filter: function(predicate) {
      return this.filterMap(filterItem => predicate(filterItem) ? makeSome(filterItem) : NoneSingleton)
    },
    enumerate: function() {
      let enumSource = this;
      return withIteratorMethods(function*() {
        let enumIndex = 0;
        for (let enumItem of enumSource) yield [enumIndex, enumItem], enumIndex++
      })()
    },
    filterMap: function(transform) {
      let filterSource = this;
      return withIteratorMethods(function*() {
        for (let filterMapItem of filterSource) {
          let mappedOption = transform(filterMapItem);
          mappedOption.isSome() && (yield mappedOption.unwrap())
        }
      })()
    },
    sort: function(comparator) {
      let sortedItems = this.toArray();
      return sortedItems.sort(comparator), sortedItems
    },
    toArray: function() {
      return [...this]
    }
  }), generatorFactory
}
Array.prototype.as_iter || (Array.prototype.as_iter = function() {
  let arraySource = this;
  return withIteratorMethods(function*() {
    for (let arrayItem of arraySource) yield arrayItem
  })()
});
Set.prototype.as_iter || (Set.prototype.as_iter = function() {
  let setSource = this;
  return withIteratorMethods(function*() {
    for (let setItem of setSource) yield setItem
  })()
});
Map.prototype.as_iter || (Map.prototype.as_iter = function() {
  let mapSource = this;
  return withIteratorMethods(function*() {
    for (let mapEntryItem of mapSource) yield mapEntryItem
  })()
});
var browserRuntimeApi = toEsm(requirePolyfill(), 1);
var browserI18nApi = toEsm(requirePolyfill(), 1);

function escapeHtml(text) {
  return text ? text.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;") : ""
}

function getI18nMessage(messageKey, substitutions, overrides) {
  let reportUnknown = () => (console.error(`Requesting unknown i18n string ${messageKey}`), messageKey);
  substitutions = substitutions.map(substitution => substitution.toString())
    .map(escapeHtml);
  try {
    if (messageKey in overrides) {
      let template = overrides[messageKey],
        placeholderIndex = 1;
      for (let subIndex = 0; subIndex < substitutions.length; subIndex++) template = template.replace(`$${placeholderIndex}`, substitutions[subIndex]);
      return template
    } else {
      let message = browserI18nApi.default.i18n.getMessage(messageKey, substitutions);
      return message || reportUnknown()
    }
  } catch {
    return reportUnknown()
  }
}

function applyI18nToDom(root, overrides) {
  for (let element of Array.from(root.querySelectorAll("[data-i18n]"))) {
    let argsJson = element.dataset.i18nArgs,
      attrName = element.dataset.i18nAttr,
      translated;
    argsJson ? translated = getI18nMessage(element.dataset.i18n, JSON.parse(argsJson), overrides) : translated = getI18nMessage(element.dataset.i18n, [], overrides),
      attrName ? element.setAttribute(attrName, translated) : element.textContent = translated
  }
}
var releaseChannel = "stable";
var browserVendor = "google";
var browserStorageApi = toEsm(requirePolyfill(), 1);
var isStringProperty = (targetObject, propName) => typeof targetObject[propName] == "string";

function deserializeValue(value) {
  try {
    if (isStringProperty(value, "__serializer_tag")) {
      if (value.__serializer_tag === "primitive") return makeOk(value.__serializer_value);
      if (value.__serializer_tag === "regex") {
        let regex = new RegExp(value.__serializer_value);
        return makeOk(regex)
      } else if (value.__serializer_tag === "array") {
        let arrayItems = [];
        for (let arrayEntry of value.__serializer_value) {
          let parsedArrayItem = deserializeValue(arrayEntry);
          if (parsedArrayItem.isErr()) return parsedArrayItem;
          arrayItems.push(parsedArrayItem.unwrap())
        }
        return makeOk(arrayItems)
      } else if (value.__serializer_tag === "map") {
        let mapEntries = [];
        for (let mapEntry of value.__serializer_value) {
          let parsedMapEntry = deserializeValue(mapEntry);
          if (parsedMapEntry.isErr()) return parsedMapEntry;
          mapEntries.push(parsedMapEntry.unwrap())
        }
        return makeOk(new Map(mapEntries))
      } else if (value.__serializer_tag === "set") {
        let setItems = [];
        for (let setEntry of value.__serializer_value) {
          let parsedSetItem = deserializeValue(setEntry);
          if (parsedSetItem.isErr()) return parsedSetItem;
          setItems.push(parsedSetItem.unwrap())
        }
        return makeOk(new Set(setItems))
      } else if (value.__serializer_tag === "result_ok") {
        let okInner = value.__serializer_value,
          parsedOkInner = deserializeValue(okInner);
        return parsedOkInner.isErr() ? parsedOkInner : makeOk(makeOk(parsedOkInner.unwrap()))
      } else if (value.__serializer_tag === "result_err") {
        let errInner = value.__serializer_value,
          parsedErrInner = deserializeValue(errInner);
        return parsedErrInner.isErr() ? parsedErrInner : makeOk(makeErr(parsedErrInner.unwrap()))
      } else if (value.__serializer_tag === "option_some") {
        let someInner = value.__serializer_value,
          parsedSomeInner = deserializeValue(someInner);
        return parsedSomeInner.isErr() ? parsedSomeInner : makeOk(makeSome(parsedSomeInner.unwrap()))
      } else if (value.__serializer_tag === "option_none") return makeOk(NoneSingleton)
    }
    let valueType = typeof value;
    if (valueType === "string" || valueType === "number" || valueType === "boolean" || valueType ===
      "undefined" || Array.isArray(value) || value == null) return makeErr(
      "This object was not serialized with Serialize");
    let resultObj = {};
    for (let propKey of Object.keys(value))
      if (typeof propKey == "string") {
        let parsedProp = deserializeValue(value[propKey]);
        if (parsedProp.isErr()) return parsedProp;
        resultObj[propKey] = parsedProp.unwrap()
      } return makeOk(resultObj)
  } catch {
    return makeErr("Failed to inspect object. Not JSON?")
  }
}

function serializeValue(value) {
  let valueType = typeof value;
  if (valueType === "string" || valueType === "number" || valueType === "boolean" || valueType ===
    "undefined" || value == null) return makeOk({
    __serializer_tag: "primitive",
    __serializer_value: value
  });
  if (value instanceof RegExp) return makeOk({
    __serializer_tag: "regex",
    __serializer_value: value.source
  });
  if (Array.isArray(value)) {
    let serializedItems = value.map(arrayItem => serializeValue(arrayItem)),
      firstError = serializedItems.as_iter()
      .find(errorCheck => errorCheck.isErr());
    if (firstError.isSome()) return firstError.unwrap();
    let unwrappedItems = serializedItems.as_iter()
      .map(unwrapItem => unwrapItem.unwrap())
      .toArray();
    return makeOk({
      __serializer_tag: "array",
      __serializer_value: unwrappedItems
    })
  } else if (value instanceof Map) {
    let serializedEntries = [...value.entries()].map(mapEntry => serializeValue(mapEntry)),
      firstError = serializedEntries.as_iter()
      .find(errorCheck => errorCheck.isErr());
    if (firstError.isSome()) return firstError.unwrap();
    let unwrappedEntries = serializedEntries.as_iter()
      .map(unwrapEntry => unwrapEntry.unwrap())
      .toArray();
    return makeOk({
      __serializer_tag: "map",
      __serializer_value: unwrappedEntries
    })
  } else if (value instanceof Set) {
    let serializedValues = [...value.values()].map(setValue => serializeValue(setValue)),
      firstError = serializedValues.as_iter()
      .find(errorCheck => errorCheck.isErr());
    if (firstError.isSome()) return firstError.unwrap();
    let unwrappedValues = serializedValues.as_iter()
      .map(unwrapValue => unwrapValue.unwrap())
      .toArray();
    return makeOk({
      __serializer_tag: "set",
      __serializer_value: unwrappedValues
    })
  } else if (ResultNamespace.isResult(value))
    if (value.isOk()) {
      let okValue = value.unwrap(),
        serializedOk = serializeValue(okValue);
      return serializedOk.isErr() ? serializedOk : makeOk({
        __serializer_tag: "result_ok",
        __serializer_value: serializedOk.unwrap()
      })
    } else {
      let errValue = value.unwrapErr(),
        serializedErr = serializeValue(errValue);
      return serializedErr.isErr() ? serializedErr : makeOk({
        __serializer_tag: "result_err",
        __serializer_value: serializedErr.unwrap()
      })
    }
  else if (OptionNamespace.isOption(value))
    if (value.isSome()) {
      let someValue = value.unwrap(),
        serializedSome = serializeValue(someValue);
      return serializedSome.isErr() ? serializedSome : makeOk({
        __serializer_tag: "option_some",
        __serializer_value: serializedSome.unwrap()
      })
    } else return makeOk({
      __serializer_tag: "option_none"
    });
  else if (valueType === "object") {
    let resultObj = {},
      sourceObj = value;
    for (let propKey of Object.keys(value)) {
      let propValue = sourceObj[propKey],
        serializedProp = serializeValue(propValue);
      if (serializedProp.isErr()) continue;
      let unwrappedProp = serializedProp.unwrap();
      resultObj[propKey] = unwrappedProp
    }
    return makeOk(resultObj)
  } else return makeErr("Unsupported value")
}
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
  videoCodecIterator = withIteratorMethods(function*() {
    for (let videoCodecName of Object.keys(videoCodecs)) yield videoCodecs[videoCodecName]
  }),
  audioCodecIterator = withIteratorMethods(function*() {
    for (let audioCodecName of Object.keys(audioCodecs)) yield audioCodecs[audioCodecName]
  });

function parseVideoCodec(codecName) {
  return typeof codecName == "string" && codecName in videoCodecs ? makeSome(codecName) : NoneSingleton
}
var mediaContainers = {
    Mp4: {
      name: "Mp4",
      extension: "mp4",
      audio_only_extension: "mp3",
      defacto_codecs: {
        audio: NoneSingleton,
        video: NoneSingleton
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
        audio: NoneSingleton,
        video: NoneSingleton
      },
      supported_video_codecs: videoCodecIterator()
        .filter(videoCodecDef => videoCodecDef.name != "unknown")
        .map(videoCodecDef2 => videoCodecDef2.name)
        .toArray(),
      supported_audio_codecs: audioCodecIterator()
        .filter(audioCodecDef => audioCodecDef.name != "unknown")
        .map(audioCodecDef2 => audioCodecDef2.name)
        .toArray(),
      mimetype: /(?:x-)?matroska/i
    },
    WebM: {
      name: "WebM",
      extension: "webm",
      audio_only_extension: "oga",
      defacto_codecs: {
        audio: NoneSingleton,
        video: NoneSingleton
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
        audio: NoneSingleton,
        video: NoneSingleton
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
        audio: makeSome("MP3"),
        video: makeSome("H264")
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
        audio: NoneSingleton,
        video: NoneSingleton
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
        audio: NoneSingleton,
        video: NoneSingleton
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
        audio: makeSome("AAC"),
        video: NoneSingleton
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
        audio: makeSome("FLAC"),
        video: NoneSingleton
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
        audio: makeSome("MP3"),
        video: makeSome("H264")
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
        audio: NoneSingleton,
        video: NoneSingleton
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
        audio: makeSome("Wav"),
        video: NoneSingleton
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
        audio: NoneSingleton,
        video: NoneSingleton
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
        audio: NoneSingleton,
        video: NoneSingleton
      },
      supported_video_codecs: ["MPEG1", "MPEG2"],
      supported_audio_codecs: [],
      mimetype: /(?:x-)?mov/i
    }
  },
  containerNameIterator = withIteratorMethods(function*() {
    for (let containerName of Object.keys(mediaContainers)) yield containerName
  }),
  containerIterator = withIteratorMethods(function*() {
    for (let containerKey of containerNameIterator()) yield mediaContainers[containerKey]
  });

function parseContainer(containerName) {
  return typeof containerName == "string" && containerName in mediaContainers ? makeSome(containerName) : NoneSingleton
}
var videoQualities = {
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
var qualityIdIterator = withIteratorMethods(function*() {
    for (let qualityId of Object.keys(videoQualities)) yield qualityId
  }),
  qualityIterator = withIteratorMethods(function*() {
    for (let qualityKey of qualityIdIterator()) yield videoQualities[qualityKey]
  });

function parseVideoQuality(quality) {
  if (typeof quality == "string") return qualityIdIterator()
    .find(qualityCandidate => qualityCandidate == quality);
  if (typeof quality == "number") {
    let qualityStr = quality.toString();
    return parseVideoQuality(qualityStr)
  }
  return NoneSingleton
}

function makeDefaultVariantConfig() {
  return {
    prefer_60fps: !0,
    ignore_low_quality_hits: !0,
    max_variants: 3,
    container: "Mp4",
    video_codec: "H264",
    best_video_quality: "4320",
    lowest_video_quality: "480",
    ignored_containers: [],
    ignored_video_codecs: []
  }
}

function serializeVariantConfig(config) {
  return serializeValue(config)
    .unwrap()
}

function deserializeVariantConfig(rawConfig) {
  let parsed = deserializeValue(rawConfig)
    .unwrapOr({}),
    defaults = makeDefaultVariantConfig(),
    container = parseContainer(parsed.container)
    .unwrapOr(defaults.container),
    videoCodec = parseVideoCodec(parsed.video_codec)
    .unwrapOr(defaults.video_codec),
    bestQuality = parseVideoQuality(parsed.best_video_quality)
    .unwrapOr(defaults.best_video_quality),
    lowestQuality = parseVideoQuality(parsed.lowest_video_quality)
    .unwrapOr(defaults.lowest_video_quality),
    preferredQuality;
  if ("prefered_video_quality" in parsed) {
    let preferredOpt = parseVideoQuality(parsed.prefered_video_quality);
    preferredOpt.isSome() && (preferredQuality = preferredOpt.unwrap())
  }
  let maxVariants = defaults.max_variants;
  if (typeof parsed.max_variants == "number") {
    let candidateMaxVariants = parsed.max_variants;
    Number.isInteger(candidateMaxVariants) && candidateMaxVariants <= 11 && candidateMaxVariants > 0 && (maxVariants = candidateMaxVariants)
  }
  let prefer60fps = defaults.prefer_60fps;
  typeof parsed.prefer_60fps == "boolean" && (prefer60fps = parsed.prefer_60fps);
  let ignoreLowQuality = defaults.ignore_low_quality_hits;
  typeof parsed.ignore_low_quality_hits == "boolean" && (ignoreLowQuality = parsed
    .ignore_low_quality_hits);
  let ignoredContainers = [];
  if (Array.isArray(parsed.ignored_containers))
    for (let ignoredContainerName of parsed.ignored_containers) {
      let parsedContainer = parseContainer(ignoredContainerName);
      parsedContainer.isSome() && ignoredContainers.push(parsedContainer.unwrap())
    }
  let ignoredVideoCodecs = [];
  if (Array.isArray(parsed.ignored_video_codecs))
    for (let ignoredCodecName of parsed.ignored_video_codecs) {
      let parsedCodec = parseVideoCodec(ignoredCodecName);
      parsedCodec.isSome() && ignoredVideoCodecs.push(parsedCodec.unwrap())
    }
  let variantResult = {
    prefer_60fps: prefer60fps,
    ignore_low_quality_hits: ignoreLowQuality,
    container: container,
    max_variants: maxVariants,
    video_codec: videoCodec,
    lowest_video_quality: lowestQuality,
    best_video_quality: bestQuality,
    ignored_containers: ignoredContainers,
    ignored_video_codecs: ignoredVideoCodecs
  };
  return typeof preferredQuality < "u" && (variantResult.prefered_video_quality = preferredQuality), variantResult
}
var defaultViewOptions = {
  all_tabs: !1,
  low_quality: !1,
  sort_by_status: !0,
  sort_reverse: !1,
  show_button_clean: !0,
  show_button_clean_all: !1,
  show_button_convert_local: !1,
  hide_downloaded: !1
};
var browserDownloadsApi = toEsm(requirePolyfill(), 1);

function makeDefaultNamingTemplate() {
  return {
    template: "%title",
    max_length: 64
  }
}

function deepEqual(leftValue, rightValue) {
  if (leftValue == null || rightValue === null || rightValue === void 0) return leftValue === rightValue;
  if (leftValue.constructor !== rightValue.constructor) return !1;
  if (leftValue instanceof Function || leftValue instanceof RegExp) return leftValue === rightValue;
  if (leftValue === rightValue || leftValue.valueOf() === rightValue.valueOf()) return !0;
  if (Array.isArray(leftValue) && leftValue.length !== rightValue.length || leftValue instanceof Date || !(
      leftValue instanceof Object) || !(rightValue instanceof Object)) return !1;
  let leftKeys = Object.keys(leftValue),
    rightKeys = Object.keys(rightValue)
    .every(leftKey => leftKeys.indexOf(leftKey) !== -1),
    valuesEqual = leftKeys.every(pairKey => deepEqual(leftValue[pairKey], rightValue[pairKey]));
  return rightKeys && valuesEqual
}
async function setSetting(setting, value) {
  let storedValue = value;
  setting.hooks && (storedValue = setting.hooks.setter(value)), await browserStorageApi.storage[setting.where].set({
    [setting.name]: storedValue
  })
}
async function getSetting(setting) {
  let storedRecord = await browserStorageApi.storage[setting.where].get(setting.name);
  if (setting.name in storedRecord) {
    let rawValue = storedRecord[setting.name];
    return setting.hooks ? setting.hooks.getter(rawValue, setting) : rawValue
  }
  return setting.default()
}
async function removeSetting(setting) {
  await browserStorageApi.storage[setting.where].remove(setting.name)
}

function watchSetting(setting, callback) {
  browserStorageApi.storage[setting.where].onChanged.addListener(changes => {
    let change = changes[setting.name];
    if (change) {
      if (deepEqual(change.oldValue, change.newValue)) return;
      typeof change.newValue > "u" ? callback(setting.default()) : setting.hooks ? callback(setting.hooks.getter(
        change.newValue, setting)) : callback(change.newValue)
    }
  })
}
var downloadStrategySetting = {
    name: "http_media_download_strategy",
    default: () => "coapp",
    where: "local"
  },
  debuggerEnabledSetting = {
    name: "debugger_enabled",
    default: () => !1,
    where: "local"
  },
  debuggerLogsSetting = {
    name: "debugger_logs",
    default: () => [],
    where: "session"
  },
  usedHistoryButtonSetting = {
    name: "used_history_button",
    default: () => !1,
    where: "local"
  },
  useSidebarSetting = {
    name: "use_sidebar",
    default: () => !1,
    where: "local"
  };
var downloadDirectorySetting = {
    name: "download_directory",
    default: () => "dwhelper",
    where: "local"
  },
  concurrentDownloadsMaxSetting = {
    name: "concurrent_downloads_max",
    default: () => 6,
    where: "local"
  },
  showThumbnailInNotificationSetting = {
    name: "show_thumbnail_in_notification",
    default: () => !0,
    where: "local"
  },
  showSuccessNotificationSetting = {
    name: "show_success_notification",
    default: () => !0,
    where: "local"
  },
  showIncognitoNotificationSetting = {
    name: "show_success_notification_for_icognito",
    default: () => !1,
    where: "local"
  },
  themeSetting = {
    name: "theme",
    default: () => "system",
    where: "local"
  },
  viewOptionsSetting = {
    name: "view_options",
    default: () => structuredClone(defaultViewOptions),
    where: "local"
  },
  showContextMenuSetting = {
    name: "show_context_menu",
    default: () => !0,
    where: "local"
  },
  forgetMediaOnTabCloseSetting = {
    name: "forget_media_on_tab_close",
    default: () => !0,
    where: "local"
  },
  defaultActionSetting = {
    name: "default_action",
    default: () => "download",
    where: "local"
  },
  ytWarningSetting = {
    name: "yt_warning",
    default: () => !0,
    where: "local"
  },
  useWideUiSetting = {
    name: "use_wide_ui",
    default: () => !1,
    where: "local"
  },
  useLegacyUiSetting = {
    name: "use_legacy_ui",
    default: () => !0,
    where: "local"
  },
  neverShowNoIncognitoMsgSetting = {
    name: "never_show_no_incognito_msg_again",
    default: () => !1,
    where: "local"
  },
  autoHideDownloadedMsgShownSetting = {
    name: "auto_hide_downloaded_message_has_been_displayed",
    default: () => !0,
    where: "local"
  },
  validLicenseMsgShownSetting = {
    name: "valid_license_message_has_been_displayed",
    default: () => !1,
    where: "local"
  },
  openCountStoreSetting = {
    name: "open_count_store",
    default: () => 0,
    where: "session"
  },
  successfulDownloadCountSetting = {
    name: "successfull_dl",
    default: () => 0,
    where: "local"
  },
  neverShowSuccessfulDlMsgSetting = {
    name: "never_show_successfull_dl_message",
    default: () => !1,
    where: "local"
  },
  recordDownloadHistorySetting = {
    name: "record_download_history",
    default: () => !1,
    where: "local"
  },
  historyLimitInDaysSetting = {
    name: "history_limit_in_days",
    default: () => 30,
    where: "local"
  },
  sessionViewOptionsSetting = {
    name: "view_options",
    default: () => ({}),
    where: "session"
  };
var blacklistSetting = {
    name: "blacklist",
    default: () => [],
    where: "local",
    hooks: {
      setter: list => list.filter(entry => entry.length > 0),
      getter: storedList => storedList
    }
  },
  lastDownloadDirectorySetting = {
    name: "last_download_directory",
    default: () => NoneSingleton,
    where: "local",
    hooks: {
      setter: value => serializeValue(value)
        .unwrap(),
      getter: (rawValue, setting) => deserializeValue(rawValue)
        .unwrapOr(setting.default())
    }
  },
  mediaUserPrefSetting = {
    name: "media_user_pref",
    where: "local",
    default: () => makeDefaultVariantConfig(),
    hooks: {
      setter: config => serializeVariantConfig(config),
      getter: rawValue => deserializeVariantConfig(rawValue)
    }
  },
  downloadHistorySetting = {
    name: "download_history",
    where: "local",
    default: () => new Map,
    hooks: {
      setter: value => serializeValue(value)
        .unwrap(),
      getter: (rawValue, setting) => deserializeValue(rawValue)
        .unwrapOr(setting.default())
    }
  },
  smartNamingSetting = {
    name: "smartnaming",
    where: "local",
    default: () => new Map([
      ["*", makeDefaultNamingTemplate()]
    ]),
    hooks: {
      setter: value => serializeValue(value)
        .unwrap(),
      getter: (rawValue, setting) => deserializeValue(rawValue)
        .unwrapOr(setting.default())
    }
  },
  databaseSetting = {
    name: "database",
    where: "session",
    default: () => ({
      yt_bulk: NoneSingleton,
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
      setter: value => serializeValue(value)
        .unwrap(),
      getter: (rawValue, setting) => deserializeValue(rawValue)
        .unwrapOr(setting.default())
    }
  },
  allSettings = [debuggerEnabledSetting, debuggerLogsSetting, autoHideDownloadedMsgShownSetting, validLicenseMsgShownSetting, downloadStrategySetting, usedHistoryButtonSetting, downloadDirectorySetting, lastDownloadDirectorySetting, concurrentDownloadsMaxSetting, mediaUserPrefSetting, showThumbnailInNotificationSetting, showSuccessNotificationSetting, showIncognitoNotificationSetting, neverShowNoIncognitoMsgSetting, themeSetting, viewOptionsSetting, sessionViewOptionsSetting, showContextMenuSetting,
    forgetMediaOnTabCloseSetting, blacklistSetting, smartNamingSetting, defaultActionSetting, ytWarningSetting, useWideUiSetting, useLegacyUiSetting, useSidebarSetting, openCountStoreSetting, successfulDownloadCountSetting, neverShowSuccessfulDlMsgSetting, downloadHistorySetting, recordDownloadHistorySetting, historyLimitInDaysSetting
  ];
async function applyImportedSettings(values) {
  for (let settingName in values)
    for (let setting of allSettings) setting.name == settingName && await browserStorageApi.storage[setting.where].set({
      [settingName]: values[settingName]
    })
}
async function collectAllSettings() {
  let result = {};
  for (let setting of allSettings) {
    let storedRecord = await browserStorageApi.storage[setting.where].get(setting.name);
    setting.name in storedRecord && (result = {
      ...result,
      ...storedRecord
    })
  }
  return result
}
async function clearAllSettings() {
  for (let setting of allSettings) await removeSetting(setting)
}

function sendRuntimeMessage(message) {
  browserRuntimeApi.default.runtime.sendMessage(message)
}
async function refreshSettingsUi() {
  let downloadDirectory = await getSetting(downloadDirectorySetting),
    downloadStrategy = await getSetting(downloadStrategySetting),
    concurrentMax = await getSetting(concurrentDownloadsMaxSetting),
    showContextMenu = await getSetting(showContextMenuSetting),
    showSuccessNotification = await getSetting(showSuccessNotificationSetting),
    showThumbnail = await getSetting(showThumbnailInNotificationSetting),
    showIncognitoNotification = await getSetting(showIncognitoNotificationSetting),
    viewOptions = await getSetting(viewOptionsSetting),
    mediaUserPref = await getSetting(mediaUserPrefSetting),
    theme = await getSetting(themeSetting),
    forgetOnClose = await getSetting(forgetMediaOnTabCloseSetting),
    useWideUi = await getSetting(useWideUiSetting),
    useLegacyUi = await getSetting(useLegacyUiSetting),
    historyLimit = await getSetting(historyLimitInDaysSetting);
  document.querySelector("#settings-download-directory > i")
    .textContent = downloadDirectory;
  let themeRadioEl = document.querySelector("#radio-theme");
  themeRadioEl.value = theme;
  let checkboxEl = document.querySelector("#settings-browser-download > sl-checkbox");
  checkboxEl.indeterminate = !1, downloadStrategy == "inbrowser" ? checkboxEl.checked = !0 : checkboxEl.checked = !1,
    checkboxEl = document.querySelector("#settings-show-notification > sl-checkbox"), checkboxEl
    .indeterminate = !1, showSuccessNotification ? checkboxEl.checked = !0 : checkboxEl.checked = !1, checkboxEl = document
    .querySelector("#settings-show-tb-in-notification > sl-checkbox"), checkboxEl
    .indeterminate = !1, showThumbnail ? checkboxEl.checked = !0 : checkboxEl.checked = !1, checkboxEl = document
    .querySelector("#settings-context-menu > sl-checkbox"), checkboxEl
    .indeterminate = !1, showContextMenu ? checkboxEl.checked = !0 : checkboxEl.checked = !1, checkboxEl = document
    .querySelector("#settings-forget-on-close > sl-checkbox"), checkboxEl
    .indeterminate = !1, forgetOnClose ? checkboxEl.checked = !0 : checkboxEl.checked = !1, checkboxEl = document
    .querySelector("#settings-show-notification-for-incognito > sl-checkbox"),
    checkboxEl.indeterminate = !1, showIncognitoNotification ? checkboxEl.checked = !0 : checkboxEl.checked = !1, checkboxEl = document
    .querySelector("#settings-view-convert-local > sl-checkbox"), checkboxEl
    .indeterminate = !1, viewOptions.show_button_convert_local ? checkboxEl.checked = !0 : checkboxEl
    .checked = !1, checkboxEl = document.querySelector(
      "#settings-use-wide-ui > sl-checkbox"), checkboxEl.indeterminate = !1, useWideUi ? checkboxEl
    .checked = !0 : checkboxEl.checked = !1, checkboxEl = document.querySelector(
      "#settings-use-legacy-ui > sl-checkbox"), checkboxEl.indeterminate = !1, useLegacyUi ? checkboxEl
    .checked = !0 : checkboxEl.checked = !1;
  let numberInputEl = document.querySelector("#settings-concurrent-downloads > sl-input");
  numberInputEl.value = concurrentMax.toString(), numberInputEl = document.querySelector(
    "#settings-history-limit > sl-input"), numberInputEl.value = historyLimit.toString();
  let variantQualityEl = document.querySelector("#settings-variants .variant-quality");
  mediaUserPref.prefered_video_quality ? (variantQualityEl.removeAttribute("hidden"), variantQualityEl.textContent = mediaUserPref
    .prefered_video_quality + "p", variantQualityEl.className =
    `variant-quality _${mediaUserPref.prefered_video_quality}p`) : variantQualityEl.setAttribute(
    "hidden", "true");
  let variantContainerEl = document.querySelector("#settings-variants .variant-container");
  variantContainerEl.textContent = mediaUserPref.container, numberInputEl = document.querySelector(
    "#settings-max-variants > sl-input"), numberInputEl.value = mediaUserPref.max_variants
  .toString()
}

function renderStatusDrawers(state, i18nOverrides) {
  let coappStatus = state.coapp_status,
    coappDrawerEl = document.querySelector("#drawer-settings-coapp");
  if (coappStatus == "checking") coappDrawerEl.setAttribute("coapp-status", "checking");
  else if (coappStatus.found) {
    let pathEls = Array.from(coappDrawerEl.querySelectorAll(".coapp-path"));
    for (let pathEl of pathEls) pathEl.textContent = coappStatus.path;
    let versionEls = Array.from(coappDrawerEl.querySelectorAll(".coapp-version"));
    for (let versionEl of versionEls) versionEl.textContent = coappStatus.version;
    coappStatus.new_version ? (coappDrawerEl.setAttribute("coapp-status", "outdated"), coappDrawerEl
      .querySelector("#coapp-new-version")
      .textContent = coappStatus.new_version) : coappDrawerEl.setAttribute("coapp-status", "found")
  } else coappDrawerEl.setAttribute("coapp-status", "not-found"), coappDrawerEl.querySelector(
      "#coapp-error")
    .textContent = coappStatus.error;
  let licenseStatus = state.license_status;
  if (coappDrawerEl = document.querySelector("#drawer-settings-license"), "unneeded" in licenseStatus) coappDrawerEl
    .setAttribute("license-status", "unneeded");
  else if ("nocoapp" in licenseStatus) coappDrawerEl.setAttribute("license-status", "nocoapp");
  else if ("checking" in licenseStatus) coappDrawerEl.setAttribute("license-status", "checking");
  else {
    coappDrawerEl.setAttribute("license-status", "checked");
    let licenseInputEl = document.querySelector("#input-license-number");
    licenseInputEl.classList.contains("had_focus") || ("key" in licenseStatus ? licenseInputEl.value = licenseStatus.key : licenseInputEl
      .value = "");
    let licenseMsgEl = document.querySelector("#settings-license-checked-msg");
    licenseMsgEl.classList.toggle("settings-success", !1), licenseMsgEl.classList.toggle(
        "settings-warning", !1), "unset" in licenseStatus ? licenseMsgEl.textContent = getI18nMessage(
        "v9_lic_status_unset", [], i18nOverrides) : "blocked" in licenseStatus ? (licenseMsgEl.classList.toggle(
        "settings-warning", !0), licenseMsgEl.textContent = getI18nMessage("v9_lic_status_blocked",
      [], i18nOverrides)) : "locked" in licenseStatus ? (licenseMsgEl.classList.toggle("settings-warning", !0), licenseMsgEl
        .textContent = getI18nMessage("v9_lic_status_locked2", [], i18nOverrides)) : "accepted" in licenseStatus ? (licenseMsgEl
        .classList.toggle("settings-success", !0), licenseMsgEl.textContent =
        `${getI18nMessage("v9_lic_status_accepted",[],i18nOverrides)} (${licenseStatus.email})`) : "mismatch" in licenseStatus ?
      (licenseMsgEl.classList.toggle("settings-warning", !0), licenseMsgEl.textContent = getI18nMessage(
        "v9_lic_mismatch2", [licenseStatus.other_browser, licenseStatus.this_browser], i18nOverrides)) :
      "invalid" in licenseStatus && (licenseMsgEl.classList.toggle("settings-warning", !0), licenseMsgEl
        .textContent = getI18nMessage("v9_no_license_registered", [], i18nOverrides))
  }
}
async function initSettingsPage() {
  let sessionViewOptions = await getSetting(sessionViewOptionsSetting);
  applyI18nToDom(document, sessionViewOptions), document.querySelector("#settings-version")
    .textContent = browserRuntimeApi.default.runtime.getManifest()
    .version, document.querySelector("#settings-channel")
    .textContent = releaseChannel, document.querySelector("#settings-target")
    .textContent = browserVendor, document.querySelector("#settings-locale")
    .textContent = browserRuntimeApi.default.i18n.getUILanguage();
  {
    let localeTag = browserRuntimeApi.default.i18n.getUILanguage()
      .replace("-", "_");
    if (localeTag in localeStringCounts) {
      document.querySelector("#settings-locales")
        .removeAttribute("hidden");
      let localeStringCount = localeStringCounts[localeTag],
        referenceStringCount = enUsStringCount;
      document.querySelector("#settings-locales-missing-strings-count")
        .textContent = (referenceStringCount - localeStringCount)
        .toString(), document.querySelector("#settings-locales-locale-name")
        .textContent = localeTag
    } else document.querySelector("#settings-locales")
      .setAttribute("hidden", "true")
  } {
    let incognitoModeEl = document.querySelector("#settings-incognito-mode");
    await browserRuntimeApi.default.extension.isAllowedIncognitoAccess() && incognitoModeEl.setAttribute(
      "hidden", "true")
  }
  watchSetting(downloadDirectorySetting, refreshSettingsUi), watchSetting(downloadStrategySetting, refreshSettingsUi), watchSetting(concurrentDownloadsMaxSetting, refreshSettingsUi), watchSetting(mediaUserPrefSetting, refreshSettingsUi), watchSetting(showContextMenuSetting, refreshSettingsUi), watchSetting(showSuccessNotificationSetting, refreshSettingsUi), watchSetting(showThumbnailInNotificationSetting, refreshSettingsUi), watchSetting(showIncognitoNotificationSetting,
    refreshSettingsUi), watchSetting(viewOptionsSetting, refreshSettingsUi), watchSetting(themeSetting, refreshSettingsUi), watchSetting(forgetMediaOnTabCloseSetting, refreshSettingsUi), watchSetting(useWideUiSetting, refreshSettingsUi), watchSetting(historyLimitInDaysSetting, refreshSettingsUi), refreshSettingsUi();
  {
    watchSetting(databaseSetting, async changedState => {
      let currentViewOptions = await getSetting(sessionViewOptionsSetting);
      renderStatusDrawers(changedState, currentViewOptions)
    }), watchSetting(sessionViewOptionsSetting, async changedViewOptions => {
      let currentState = await getSetting(databaseSetting);
      renderStatusDrawers(currentState, changedViewOptions), applyI18nToDom(document, changedViewOptions)
    });
    let viewOptionsState = await getSetting(sessionViewOptionsSetting),
      databaseState = await getSetting(databaseSetting);
    renderStatusDrawers(databaseState, viewOptionsState);
    async function onSettingChange(changeEvent) {
      let changeTarget = changeEvent.target;
      if (changeTarget) {
        let concurrentInputEl = changeTarget.closest("#settings-concurrent-downloads > sl-input"),
          maxVariantsInputEl = changeTarget.closest("#settings-max-variants > sl-input"),
          historyLimitInputEl = changeTarget.closest("#settings-history-limit > sl-input"),
          themeRadioEl = changeTarget.closest("#radio-theme"),
          browserDownloadCheckbox = changeTarget.closest("#settings-browser-download > sl-checkbox"),
          contextMenuCheckbox = changeTarget.closest("#settings-context-menu > sl-checkbox"),
          forgetOnCloseCheckbox = changeTarget.closest("#settings-forget-on-close > sl-checkbox"),
          showNotificationCheckbox = changeTarget.closest("#settings-show-notification > sl-checkbox"),
          showThumbnailCheckbox = changeTarget.closest("#settings-show-tb-in-notification > sl-checkbox"),
          incognitoNotificationCheckbox = changeTarget.closest(
            "#settings-show-notification-for-incognito > sl-checkbox"),
          convertLocalCheckbox = changeTarget.closest("#settings-view-convert-local > sl-checkbox"),
          wideUiCheckbox = changeTarget.closest("#settings-use-wide-ui > sl-checkbox"),
          legacyUiCheckbox = changeTarget.closest("#settings-use-legacy-ui > sl-checkbox");
        if (themeRadioEl && setSetting(themeSetting, themeRadioEl.value), concurrentInputEl && setSetting(concurrentDownloadsMaxSetting, parseInt(concurrentInputEl.value)), maxVariantsInputEl) {
          let mediaPrefForVariants = await getSetting(mediaUserPrefSetting);
          mediaPrefForVariants.max_variants = Math.max(1, Math.min(10, parseInt(maxVariantsInputEl.value))), setSetting(
            mediaUserPrefSetting, mediaPrefForVariants)
        }
        if (historyLimitInputEl && setSetting(historyLimitInDaysSetting, Math.min(99, parseInt(historyLimitInputEl.value))), browserDownloadCheckbox && setSetting(downloadStrategySetting, browserDownloadCheckbox
            .checked ? "inbrowser" : "coapp"), contextMenuCheckbox && setSetting(showContextMenuSetting, contextMenuCheckbox.checked), forgetOnCloseCheckbox &&
          setSetting(forgetMediaOnTabCloseSetting, forgetOnCloseCheckbox.checked), showNotificationCheckbox && setSetting(showSuccessNotificationSetting, showNotificationCheckbox.checked), showThumbnailCheckbox && setSetting(showThumbnailInNotificationSetting, showThumbnailCheckbox.checked),
          incognitoNotificationCheckbox && setSetting(showIncognitoNotificationSetting, incognitoNotificationCheckbox.checked), wideUiCheckbox && setSetting(useWideUiSetting, wideUiCheckbox.checked), legacyUiCheckbox && setSetting(useLegacyUiSetting, legacyUiCheckbox
            .checked), convertLocalCheckbox) {
          let viewOptionsForConvert = await getSetting(viewOptionsSetting);
          viewOptionsForConvert.show_button_convert_local = convertLocalCheckbox.checked, setSetting(viewOptionsSetting, viewOptionsForConvert)
        }
      }
    }
    async function onWindowClick(clickEvent) {
      let clickTarget = clickEvent.target;
      if (clickTarget) {
        let coappCheckBtn = clickTarget.closest(".button-coapp-check"),
          licenseCheckBtn = clickTarget.closest(".button-license-check"),
          licenseHelpBtn = clickTarget.closest(".button-license-help"),
          licenseGetBtn = clickTarget.closest(".button-license-get"),
          coappInstallBtn = clickTarget.closest(".button-coapp-install"),
          coappHelpBtn = clickTarget.closest(".button-coapp-help"),
          resetSettingsBtn = clickTarget.closest("#button-reset-settings"),
          exportSettingsBtn = clickTarget.closest("#button-export-settings"),
          importSettingsBtn = clickTarget.closest("#button-import-settings"),
          reloadAddonBtn = clickTarget.closest("#button-reload-addon"),
          changeDirectoryBtn = clickTarget.closest("#button-download-directory-change"),
          clearVariantsBtn = clickTarget.closest("#button-variants-clear"),
          translateBtn = clickTarget.closest("#button-translate");
        if (clickTarget.closest("#button-copy-settings")) {
          let {
            coapp_status: coappStatus,
            license_status: licenseStatus
          } = await getSetting(databaseSetting);
          "key" in licenseStatus && (licenseStatus.key = licenseStatus.key.substring(0, 16)), "email" in licenseStatus && (licenseStatus
            .email = "<removed>");
          let coappJson = JSON.stringify(coappStatus),
            licenseJson = JSON.stringify(licenseStatus),
            manifest = browserRuntimeApi.default.runtime.getManifest(),
            addonVersion = manifest.version_name ?? manifest.version,
            platformInfo = await browserRuntimeApi.default.runtime.getPlatformInfo(),
            uiLanguageTag = browserRuntimeApi.default.i18n.getUILanguage(),
            diagnosticsText = "";
          diagnosticsText += `version: ${addonVersion}
`, diagnosticsText += `target: ${browserVendor}
`, diagnosticsText += `channel: ${releaseChannel}
`, diagnosticsText += `lang: ${uiLanguageTag}
`, diagnosticsText += `coapp: ${coappJson}
`, diagnosticsText += `license: ${licenseJson}
`, diagnosticsText += `platform: ${platformInfo.arch} ${platformInfo.os}
`, diagnosticsText += `UA: ${navigator.userAgent}
`;
          let exportedSettings = await collectAllSettings();
          delete exportedSettings.blacklist, delete exportedSettings.media_user_pref, delete exportedSettings
            .smartnaming, diagnosticsText += JSON.stringify(exportedSettings, null, 4), navigator
            .clipboard.writeText(diagnosticsText)
        }
        if (licenseCheckBtn) {
          let licenseInputEl = document.querySelector("#input-license-number");
          sendRuntimeMessage({
            license_check: licenseInputEl.value || null
          })
        }
        if (translateBtn && browserRuntimeApi.default.tabs.create({
            url: "/content2/locales.html"
          }), licenseGetBtn && browserRuntimeApi.default.tabs.create({
            url: "https://www.downloadhelper.net/convert"
          }), licenseHelpBtn && browserRuntimeApi.default.tabs.create({
            url: "https://www.downloadhelper.net/help"
          }), coappCheckBtn && sendRuntimeMessage({
            coapp_check: !0
          }), coappInstallBtn && browserRuntimeApi.default.tabs.create({
            url: "https://downloadhelper.net/install-coapp-v2"
          }), coappHelpBtn && browserRuntimeApi.default.tabs.create({
            url: "https://github.com/aclap-dev/video-downloadhelper/wiki/CoApp-not-recognized"
          }), clearVariantsBtn && removeSetting(mediaUserPrefSetting), resetSettingsBtn && clearAllSettings(), changeDirectoryBtn && sendRuntimeMessage("select_download_directory"),
          exportSettingsBtn) {
          let allSettingsData = await collectAllSettings(),
            settingsJson = JSON.stringify(allSettingsData, null, 4),
            settingsBlob = new Blob([settingsJson], {
              type: "text/json;charset=utf-8"
            }),
            blobUrl = URL.createObjectURL(settingsBlob),
            isSidebar = document.documentElement.id == "sidebar";
          browserRuntimeApi.default.downloads.download({
            url: blobUrl,
            filename: "vdh-settings.json",
            saveAs: isSidebar,
            conflictAction: "uniquify"
          })
        }
        if (importSettingsBtn) {
          let importInputEl = document.querySelector("#button-import-settings-input"),
            onFileSelected = async () => {
              if (importInputEl.removeEventListener("change", onFileSelected), importInputEl.files && importInputEl.files
                .length > 0) {
                let fileText = await importInputEl.files[0].text(),
                  importedData = JSON.parse(fileText);
                await applyImportedSettings(importedData)
              }
            };
          importInputEl.addEventListener("change", onFileSelected), importInputEl.click()
        }
        reloadAddonBtn && browserRuntimeApi.default.runtime.reload()
      }
    }
    let licenseFocusInputEl = document.querySelector("#input-license-number");
    licenseFocusInputEl.addEventListener("sl-focus", () => {
      licenseFocusInputEl.classList.add("had_focus")
    }), window.addEventListener("click", onWindowClick), window.addEventListener(
      "sl-change", onSettingChange)
  }
}
var includeSettingsEl = document.querySelector("#include-settings");
includeSettingsEl.addEventListener("sl-load", loadEvent => {
  loadEvent.eventPhase === Event.AT_TARGET && initSettingsPage()
});
includeSettingsEl.addEventListener("sl-error", errorEvent => {
  errorEvent.eventPhase === Event.AT_TARGET && console.error("sl-include error", errorEvent
    .detail?.status)
});
