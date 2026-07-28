"use strict";
(() => {
  var defineProperty = Object.defineProperty;
  var getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var getOwnPropNames = Object.getOwnPropertyNames;
  var hasOwnPropertyRef = Object.prototype.hasOwnProperty;
  var defineLazyModule = (initModule, cachedModule) => () => (initModule && (cachedModule = initModule(initModule = 0)), cachedModule);
  var defineCommonjsModule = (defineModule, cachedExports) => () => (cachedExports || defineModule((cachedExports = {
        exports: {}
      })
      .exports, cachedExports), cachedExports.exports),
    defineExports = (target, source) => {
      for (var key in source) defineProperty(target, key, {
        get: source[key],
        enumerable: !0
      })
    },
    copyProps = (targetObj, from, except, desc) => {
      if (from && typeof from == "object" || typeof from == "function")
        for (let key of getOwnPropNames(from)) !hasOwnPropertyRef.call(targetObj, key) && key !== except && defineProperty(targetObj, key, {
          get: () => from[key],
          enumerable: !(desc = getOwnPropDesc(from, key)) || desc.enumerable
        });
      return targetObj
    };
  var toCommonjs = mod => copyProps(defineProperty({}, "__esModule", {
    value: !0
  }), mod);
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
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self :
      polyfillExports,
      function(browserGlobal) {
        "use strict";
        if (!globalThis.chrome?.runtime?.id) throw new Error(
          "This script should only be loaded in a browser extension.");
        if (typeof globalThis.browser > "u" || Object.getPrototypeOf(
            globalThis.browser) !== Object.prototype) {
          let messagePortClosedMessage =
            "The message port closed before a response was received.",
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
                  chromeApi.runtime.lastError ? promiseCallbacks.reject(new Error(chromeApi.runtime
                      .lastError.message)) : metadata.singleCallbackArg || callbackArgs
                    .length <= 1 && metadata.singleCallbackArg !== !1 ? promiseCallbacks
                    .resolve(callbackArgs[0]) : promiseCallbacks.resolve(callbackArgs)
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
                          error), apiTarget[name](...args), metadata.fallbackToNoCallback = !
                        1, metadata.noCallback = !0, resolve()
                    } else metadata.noCallback ? (apiTarget[name](...args), resolve()) : apiTarget[name](
                      ...args, makeCallback({
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
                          if (typeof wrappers[prop] == "function") value = wrapMethod(target, target[prop],
                            wrappers[prop]);
                          else if (hasOwnProperty(metadata, prop)) {
                          let wrappedFn = wrapAsyncFunction(prop, metadata[prop]);
                          value = wrapMethod(target, target[prop], wrappedFn)
                        } else value = value.bind(target);
                        else if (typeof value == "object" && value !== null && (
                            hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) value = wrapObject(value, wrappers[prop], metadata[prop]);
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
                        error && (error instanceof Error || typeof error
                            .message == "string") ? errorMessage = error.message :
                          errorMessage = "An unexpected error occurred", sendResponse({
                            __mozWebExtensionPolyfillReject__: !0,
                            message: errorMessage
                          })
                      })
                      .catch(replyError => {
                        console.error(
                          "Failed to send onMessage rejected reply",
                          replyError)
                      })
                  };
                  return sendResolvedResponse(resultIsThenable ? result : responsePromise), !0
                }),
                processResponse = ({
                  reject: reject,
                  resolve: resolve
                }, response) => {
                  chromeApi.runtime.lastError ? chromeApi.runtime.lastError.message ===
                    messagePortClosedMessage ? resolve() : reject(new Error(chromeApi.runtime.lastError.message)) :
                    response && response.__mozWebExtensionPolyfillReject__ ? reject(
                      new Error(response.message)) : resolve(response)
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
  var requireWehCore = defineCommonjsModule((wehCoreExports, wehCoreModule) => {
    "use strict";
    wehCoreModule.exports.browser = requirePolyfill();
    var cachedBrowserType;
    typeof browser > "u" && typeof chrome < "u" && chrome.runtime ?
      /\bOPR\//.test(navigator.userAgent) ? cachedBrowserType = "opera" : cachedBrowserType = "chrome" :
      /\bEdge\//.test(navigator.userAgent) ? cachedBrowserType = "edge" : cachedBrowserType = "firefox", wehCoreModule
      .exports.browserType = cachedBrowserType, typeof wehCoreModule.exports.browser.action > "u" && (
        wehCoreModule.exports.browser.action = wehCoreModule.exports.browser.browserAction), wehCoreModule
      .exports.isBrowser = (...browserNames) => {
        for (let index = 0; index < browserNames.length; index++)
          if (browserNames[index] == wehCoreModule.exports.browserType) return !0;
        return !1
      }, wehCoreModule.exports.error = errorValue => {
        console.groupCollapsed(errorValue.message), errorValue.stack && console.error(errorValue
          .stack), console.groupEnd()
      }
  });
  var requireRpc = defineCommonjsModule((rpcExports, rpcModule) => {
    "use strict";
    var Rpc = class {
      constructor() {
        this.replyId = 0, this.replies = {}, this.listeners = {}, this
          .hook = this.nullHook, this.debugLevel = 0, this
          .useTarget = !1, this.logger = console, this.posts = {}
      }
      setPost(peerOrPostFn, postFn) {
        typeof peerOrPostFn == "string" ? this.posts[peerOrPostFn] = postFn : this.post = peerOrPostFn
      }
      setUseTarget(useTarget) {
        this.useTarget = useTarget
      }
      setDebugLevel(debugLevel) {
        this.debugLevel = debugLevel
      }
      setHook(hook) {
        let self = this,
          startTime = Date.now();

        function now() {
          return typeof window < "u" && typeof window.performance <
            "u" ? window.performance.now() : Date.now() - startTime
        }
        hook ? this.hook = hookArg => {
          hookArg.timestamp = now();
          try {
            hook(hookArg)
          } catch (error) {
            self.logger.warn("Hoor error", error)
          }
        } : this.hook = this.nullHook
      }
      nullHook() {}
      call() {
        let self = this,
          postFn, peer, method, args, callArgs = Array.prototype.slice.call(arguments);
        return typeof callArgs[0] == "function" && (postFn = callArgs.shift()), self
          .useTarget ? [peer, method, ...args] = callArgs : [method, ...args] = callArgs, new Promise(
            function(resolve, reject) {
              let replyId = ++self.replyId;
              self.debugLevel >= 2 && self.logger.info("rpc #" + replyId,
                "call =>", method, args), self.hook({
                type: "call",
                callee: peer,
                rid: replyId,
                method: method,
                args: args
              }), self.replies[replyId] = {
                resolve: resolve,
                reject: reject,
                peer: peer
              };
              let post = postFn || self.useTarget && self.posts[peer] || self.post;
              self.useTarget ? post(peer, {
                type: "weh#rpc",
                _request: replyId,
                _method: method,
                _args: [...args]
              }) : post({
                type: "weh#rpc",
                _request: replyId,
                _method: method,
                _args: [...args]
              })
            })
      }
      receive(message, sendReply, caller) {
        let self = this;
        if (message._request) Promise.resolve()
          .then(() => {
            let listener = self.listeners[message._method];
            if (typeof listener == "function") return self.debugLevel >= 2 &&
              self.logger.info("rpc #" + message._request, "serve <= ", message
                ._method, message._args), self.hook({
                type: "call",
                caller: caller,
                rid: message._request,
                method: message._method,
                args: message._args
              }), Promise.resolve(listener.apply(null, message._args))
              .then(result => (self.hook({
                type: "reply",
                caller: caller,
                rid: message._request,
                result: result
              }), result))
              .catch(error => {
                throw self.hook({
                  type: "reply",
                  caller: caller,
                  rid: message._request,
                  error: error.message
                }), error
              });
            throw new Error("Method " + message._method +
              " is not a function")
          })
          .then(result => {
            self.debugLevel >= 2 && self.logger.info("rpc #" + message._request,
              "serve => ", result), sendReply({
              type: "weh#rpc",
              _reply: message._request,
              _result: result
            })
          })
          .catch(error => {
            self.debugLevel >= 1 && self.logger.info("rpc #" + message._request,
              "serve => !", error.message), sendReply({
              type: "weh#rpc",
              _reply: message._request,
              _error: error.message
            })
          });
        else if (message._reply) {
          let pending = self.replies[message._reply];
          delete self.replies[message._reply], pending ? message._error ? (self.debugLevel >=
            1 && self.logger.info("rpc #" + message._reply, "call <= !", message
              ._error), self.hook({
              type: "reply",
              callee: pending.peer,
              rid: message._reply,
              error: message._error
            }), pending.reject(new Error(message._error))) : (self.debugLevel >=
            2 && self.logger.info("rpc #" + message._reply, "call <= ", message
              ._result), self.hook({
              type: "reply",
              callee: pending.peer,
              rid: message._reply,
              result: message._result
            }), pending.resolve(message._result)) : self.logger.error(
            "Missing reply handler")
        }
      }
      listen(listeners) {
        Object.assign(this.listeners, listeners)
      }
    };
    rpcModule.exports = new Rpc
  });
  var requireAppTab = defineCommonjsModule((appTabExports, appTabModule) => {
    "use strict";
    var weh = requireWehCore(),
      wehBrowser = weh.browser;
    weh.rpc = requireRpc();
    weh.uiName = window._wehPanelName;
    weh.uiName || (weh.uiName = "injected-" + Math.round(Math.random() *
    1e9));
    var wehKey = "weh:" + wehBrowser.runtime.id + ":" + weh.uiName,
      port = wehBrowser.runtime.connect({
        name: wehKey
      });
    weh.rpc.setPost(port.postMessage.bind(port));
    port.onMessage.addListener(message => {
      weh.rpc.receive(message, port.postMessage.bind(port))
    });
    weh.rpc.listen({
      setPrefs: () => {},
      close: () => {}
    });
    weh.is_safe = (async () => {
      await weh.rpc.call("appStarted", {
        uiName: weh.uiName
      }), await weh.rpc.call("appReady", {
        uiName: weh.uiName
      })
    })();
    appTabModule.exports = weh
  });
  var smartNameCache = {};
  defineExports(smartNameCache, {
    SmartNameEvaluate: () => evaluateSmartName
  });

  function evaluateSmartName(spec) {
    let xpath = spec.xpath,
      result = null;

    function matchRegex() {
      if (result = result && result.trim() || "", result && spec.regexp) {
        let regex = new RegExp(spec.regexp, "m")
          .exec(result);
        regex ? typeof regex[1] < "u" ? result = regex[1] || "" : result = regex[0] || "" : result = ""
      }
    }
    switch (spec.mode) {
      case "page-title":
        xpath = "/html/head/title/text()";
      case "page-content":
        result = document.evaluate(xpath, document, null, XPathResult.STRING_TYPE,
            null)
          .stringValue || null;
        break;
      case "obfuscated":
        return new Promise((resolve, reject) => {
          crypto.subtle.digest("SHA-256", new TextEncoder("utf-8")
              .encode(window.location.href))
            .then(hashBuffer => {
              result = Array.from(new Uint8Array(hashBuffer))
                .slice(0, 16)
                .map(byte => ("00" + byte.toString(16))
                  .slice(-2))
                .join(""), matchRegex(), resolve(result)
            })
            .catch(reject)
        });
      case "header-url":
        if (result = spec.headerFilename || spec.urlFilename, !result) {
          let match = pageUrlRegex.exec(window.location.href);
          match ? result = match[1] : result = ""
        }
        break;
      default:
        result = ""
    }
    return matchRegex(), result.length > 128 && (result = result.substr(0, 64)), result
  }
  var pageUrlRegex, initPageUrlRegex = defineLazyModule(() => {
    "use strict";
    pageUrlRegex = new RegExp(
      "^.*?:/?/?[^/]+/(?:[^/]*/)*([^#\\?/]+?)(?:\\.[a-zA-Z0-9]{1,5})?(?:$|#|\\?|/)"
      )
  });
  var weh = requireAppTab(),
    {
      SmartNameEvaluate: evaluateSmartNameHandler
    } = (initPageUrlRegex(), toCommonjs(smartNameCache)),
    xpathHelper = {
      getElementTreeXPath: node => {
        let segments = [];
        for (; node && node.nodeType == Node.ELEMENT_NODE; node = node.parentNode) {
          let index = 0,
            hasFollowing = !1;
          for (let sibling = node.previousSibling; sibling; sibling = sibling.previousSibling) sibling
            .nodeType != Node.DOCUMENT_TYPE_NODE && sibling.nodeName == node
            .nodeName && ++index;
          for (let sibling = node.nextSibling; sibling && !hasFollowing; sibling = sibling.nextSibling) sibling
            .nodeName == node.nodeName && (hasFollowing = !0);
          let tagName = (node.prefix ? node.prefix + ":" : "") + node.localName,
            position = index || hasFollowing ? "[" + (index + 1) + "]" : "";
          segments.splice(0, 0, tagName + position)
        }
        return segments.length ? "/" + segments.join("/") : null
      },
      getElementXPath: node => node && node.id ? '//*[@id="' + node.id + '"]' : xpathHelper
        .getElementTreeXPath(node)
    },
    selecting = !1;

  function onSelectionChange() {
    return weh.rpc.call("openSmartNameDefiner", window._wehPanelName)
      .then(() => new Promise((resolve, reject) => {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
          let range = selection.getRangeAt(0);
          range.startContainer === range.endContainer && range.startOffset == range
            .endOffset && resolve(null);
          let container = range.startContainer;
          container && container.nodeType == 3 && (container = container.parentElement), resolve(xpathHelper
            .getElementXPath(container))
        } else resolve(null)
      }))
      .then(xpath => xpath && ["page-content", xpath] || ["page-title",
        "/html/head/title/text()"
      ])
      .then(([mode, value]) => weh.rpc.call("setSmartNameData", {
        mode: mode,
        xpath: value,
        domain: new URL(window.location.href)
          .hostname,
        ref: weh.uiName
      }))
  }
  onSelectionChange();
  var selectionListener = null;

  function startSelectionListener() {
    selectionListener && clearTimeout(selectionListener), !selecting && (selectionListener = setTimeout(() => {
      onSelectionChange()
    }, 250))
  }
  document.addEventListener("selectionchange", startSelectionListener);
  weh.rpc.listen({
    evaluate: xpath => evaluateSmartNameHandler(xpath),
    select: xpath => {
      let selection = window.getSelection();
      selection.removeAllRanges();
      let xpathResult = document.evaluate(xpath, document, null, XPathResult
          .FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
      if (xpathResult) {
        selecting = !0, setTimeout(() => {
          selecting = !1
        }, 1e3);
        let range = document.createRange();
        return range.setStart(xpathResult, 0), range.setEndAfter(xpathResult), selection.addRange(range), !0
      }
      return !1
    },
    close: () => {
      document.removeEventListener("selectionchange", startSelectionListener)
    }
  });
})();