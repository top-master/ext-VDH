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
var polyfillNamespace = toEsm(requirePolyfill(), 1);

function escapeHtml(text) {
  return text ? text.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;") : ""
}

function localizeMessage(messageKey, substitutions, localMessages) {
  let reportMissing = () => (console.error(`Requesting unknown i18n string ${messageKey}`), messageKey);
  substitutions = substitutions.map(substitution => substitution.toString())
    .map(escapeHtml);
  try {
    if (messageKey in localMessages) {
      let resolvedMessage = localMessages[messageKey],
        placeholderIndex = 1;
      for (let argIndex = 0; argIndex < substitutions.length; argIndex++) resolvedMessage = resolvedMessage.replace(`$${placeholderIndex}`, substitutions[argIndex]);
      return resolvedMessage
    } else {
      let browserMessage = polyfillNamespace.default.i18n.getMessage(messageKey, substitutions);
      return browserMessage || reportMissing()
    }
  } catch {
    return reportMissing()
  }
}

function applyI18n(rootElement, i18nMessages) {
  for (let element of Array.from(rootElement.querySelectorAll("[data-i18n]"))) {
    let i18nArgsRaw = element.dataset.i18nArgs,
      i18nAttr = element.dataset.i18nAttr,
      translatedText;
    i18nArgsRaw ? translatedText = localizeMessage(element.dataset.i18n, JSON.parse(i18nArgsRaw), i18nMessages) : translatedText = localizeMessage(element.dataset.i18n, [], i18nMessages),
      i18nAttr ? element.setAttribute(i18nAttr, translatedText) : element.textContent = translatedText
  }
}

function formatBytes(byteCount) {
  return byteCount < 1048576 ? `${(byteCount/1024).toFixed(0)}Kb` :
    `${(byteCount/1048576).toFixed(0)}Mb`
}

function formatDuration(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;
  let minutes = Math.floor(totalSeconds / 60);
  totalSeconds -= minutes * 60;
  let seconds = Math.round(totalSeconds),
    hoursText = ("0" + hours + ":")
    .slice(-3),
    minutesText = ("0" + minutes + ":")
    .slice(-3),
    secondsText = ("0" + seconds)
    .slice(-2);
  return hoursText == "00:" && (hoursText = ""), hoursText + minutesText + secondsText
}
var downloadActionNames = ["download", "copy", "download_as", "download_audio"];

function UpdateProgress(downloadableId, progressInfo) {
  let downloadElement = document.querySelector(`[data-downloadable-id="${downloadableId}"]`),
    progressBar = downloadElement.querySelector("sl-progress-bar"),
    percentSpan = downloadElement.querySelector(".span-percent"),
    bitrateSpan = downloadElement.querySelector(".span-bitrate"),
    durationSpan = downloadElement.querySelector(".span-downloading-duration");
  downloadElement.classList.remove("progress-unknown"), typeof progressInfo != "string" ? (durationSpan
    .textContent = formatDuration(progressInfo.duration_since_start / 1e3) + "s", downloadElement.querySelector(
      ".button-stop")
    .removeAttribute("loading"), downloadElement.querySelector(".button-stop")
    .removeAttribute("disabled"), bitrateSpan.removeAttribute("hidden"), bitrateSpan
    .querySelector("sl-format-bytes")
    .setAttribute("value", progressInfo.bitrate_bs.toString()), progressInfo.progress != "unknown" ?
    (percentSpan.removeAttribute("hidden"), percentSpan.querySelector("sl-format-number")
      .setAttribute("value", progressInfo.progress.toString()), progressBar.removeAttribute(
        "indeterminate"), progressBar.setAttribute("value", (progressInfo.progress * 100)
        .toString())) : (percentSpan.setAttribute("hidden", "true"), progressBar.removeAttribute(
      "value"), progressBar.setAttribute("indeterminate", "true"), downloadElement.classList.add(
      "progress-unknown"))) : (downloadElement.querySelector(".button-stop")
    .setAttribute("loading", "true"), downloadElement.querySelector(".button-stop")
    .setAttribute("disabled", "true"), bitrateSpan.setAttribute("hidden", "true"))
}

function renderVariant(variant, localMessages) {
  let coreMedia = variant.core_media,
    variantParts = [],
    containerExt = coreMedia.container.extension;
  coreMedia.av.video || (containerExt = coreMedia.container.audio_only_extension), variantParts.push(
    `<span class="variant-container">${containerExt}</span>`);
  let differentiatorText = localizeMessage("v9_panel_downloadable_variant_no_details", [], localMessages);
  if (coreMedia.av.video) {
    if (coreMedia.av.video.quality.isSome()) {
      let qualityLabel = coreMedia.av.video.quality.unwrap() + "p";
      variantParts.push(`<span class="variant-quality _${qualityLabel}">${qualityLabel}</span>`)
    }
    if (coreMedia.av.video.dimensions.isSome()) {
      let dimensions = coreMedia.av.video.dimensions.unwrap();
      differentiatorText = `${dimensions.width}x${dimensions.height}`, coreMedia.av.video.bitrate.isSome() && (differentiatorText +=
        ` ${formatBytes(coreMedia.av.video.bitrate.unwrap())}/s`)
    } else coreMedia.content_length.isSome() ? differentiatorText = formatBytes(coreMedia.content_length.unwrap()) : coreMedia.av
      .video.bitrate.isSome() && (differentiatorText += `${formatBytes(coreMedia.av.video.bitrate.unwrap())}/s`)
  }
  return variantParts.push(`<span class="variant-differentiator">${differentiatorText}</span>`), `<sl-menu-item class="menu-item-variant" data-variant-id="${variant.id}" data-to-copy="${escapeHtml(variant.to_copy)}">
    ${variantParts.join("")}
  </sl-menu-item>`
}

function UpdateDefaultAction(downloadElement, actionName) {
  downloadElement.dataset.defaultAction = actionName;
  let actionMenuItem = downloadElement.querySelector("sl-menu-item.action-" + actionName),
    iconName = actionMenuItem.querySelector("sl-icon")
    .getAttribute("name"),
    labelText = actionMenuItem.querySelector("span")
    .textContent,
    actionButton = downloadElement.querySelector(".button-group-actions > sl-button");
  for (let otherAction of downloadActionNames) actionButton.classList.remove("action-" + otherAction);
  actionButton.classList.add("action-" + actionName), actionButton.querySelector("sl-icon")
    .setAttribute("name", iconName), actionButton.querySelector("span")
    .textContent = labelText
}

function RenderVariantButton(downloadable) {
  let containerExt = downloadable.core_media.container.extension;
  downloadable.core_media.av.video || (containerExt = downloadable.core_media.container.audio_only_extension);
  let containerHtml = `<span class="variant-container">${containerExt}</span>`,
    videoInfo = downloadable.core_media.av.video,
    buttonHtml = containerHtml;
  if (videoInfo && videoInfo.quality.isSome()) {
    let qualityLabel = videoInfo.quality.unwrap() + "p",
      qualityHtml = `<span class="variant-quality _${qualityLabel}">${qualityLabel}</span>`;
    buttonHtml += qualityHtml
  } else if (downloadable.core_media.content_length.isSome()) {
    let contentLength = downloadable.core_media.content_length.unwrap();
    buttonHtml += `<span class="variant-quality">${formatBytes(contentLength)}</span>`
  }
  return buttonHtml
}

function renderDownloadable(downloadable, localMessages) {
  let firstVariant = [...downloadable.variants.values()][0],
    downloadRow = document.createElement("hbox");
  downloadRow.classList.add("download"), downloadRow.dataset.selectedVariantId = firstVariant.id, downloadRow.dataset
    .downloadableId = downloadable.id, downloadRow.dataset.timestamp = downloadable.timestamp.toString(), downloadRow
    .dataset.toCopy = firstVariant.to_copy;
  let leftHtml;
  {
    let duration = firstVariant.core_media.duration,
      durationHtml = "";
    typeof duration == "number" && (durationHtml = `<div class="duration">${formatDuration(duration)}</div>`), leftHtml = `<hbox class="download-left" align="start" style="background-image:url('${escapeHtml(downloadable.thumbnail_url)}')">
      <div class="favicon" style="background-image:url('${escapeHtml(downloadable.favicon_url)}')"></div>
      ${durationHtml}
    </hbox>`
  }
  let topHtml;
  {
    let progressFieldsHtml =
      `
      <span class="span-bitrate"><sl-format-bytes></sl-format-bytes>/s</span>
      <span class="span-downloading-duration"></span>
      <span size="small" class="span-percent"><sl-format-number type="percent"></sl-format-number></span>`,
      mediaIconsHtml = '<sl-icon name="film"></sl-icon>';
    firstVariant.core_media.av.video ? mediaIconsHtml =
      '<sl-icon name="film"></sl-icon><sl-icon name="plus"></sl-icon><sl-icon name="music-note-beamed"></sl-icon>' :
      mediaIconsHtml = '<sl-icon name="music-note-beamed"></sl-icon>';
    let tagsHtml = `
      <hbox class="hbox-tags">
        <sl-tag variant="primary" size="small">${firstVariant.core_media.builder}</sl-tag>
        <sl-tooltip content="Video & Audio">
          <sl-tag variant="neutral" size="small">${mediaIconsHtml}</sl-tag>
        </sl-tooltip>
      </hbox>`,
      pageTitle = escapeHtml(downloadable.page_title);
    topHtml = `
    <hbox class="download-top" align="center">
      ${tagsHtml}<div class="favicon" style="background-image:url('${escapeHtml(downloadable.favicon_url)}')"></div>
      <p class="title" flex="1" title="${pageTitle}">${pageTitle}</p>
      ${progressFieldsHtml}
      <sl-icon-button name="x" class="button-hide"></sl-icon-button>
    </hbox>`
  }
  let bottomHtml;
  {
    let variantsHtml = "";
    for (let variant of downloadable.variants.values()) variantsHtml += renderVariant(variant, localMessages);
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
      </hbox>`
  }
  downloadRow.innerHTML = `
  ${leftHtml}
  <vbox class="download-right" flex="1">
    ${topHtml}
    ${bottomHtml}
  </vbox>
  `;
  let templateContent = document.querySelector("template")
    .content;
  {
    let actionsGroup = templateContent.querySelector(".button-group-actions")
      .cloneNode(!0),
      actionsMenu = templateContent.querySelector(".menu-actions")
      .cloneNode(!0),
      downloadBottom = downloadRow.querySelector(".download-bottom");
    downloadBottom.appendChild(actionsGroup), downloadBottom.appendChild(actionsMenu)
  }
  return applyI18n(downloadRow, localMessages), downloadRow
}

function UpdateDownloading(downloadingInfo, localMessages) {
  let downloadElement = document.querySelector(
    `[data-downloadable-id="${downloadingInfo.downloadable.id}"]`);
  return downloadElement || (downloadElement = renderDownloadable(downloadingInfo.downloadable, localMessages), document.querySelector(
      "#core-downloads")
    .append(downloadElement)), downloadElement.setAttribute("status", "downloading"), UpdateProgress(downloadingInfo.downloadable
    .id, downloadingInfo.progress), downloadElement
}

function UpdateDownloadable(downloadable, localMessages) {
  let downloadElement = document.querySelector(`[data-downloadable-id="${downloadable.id}"]`);
  downloadElement || (downloadElement = renderDownloadable(downloadable, localMessages), document.querySelector("#core-downloads")
    .append(downloadElement)), downloadElement.setAttribute("status", "downloadable");
  {
    let selectedVariantId = downloadElement.dataset.selectedVariantId,
      selectedVariant = downloadable.variants.get(selectedVariantId),
      variantButtonHtml = RenderVariantButton(selectedVariant),
      dropdownButton = downloadElement.querySelector(".dropdown-variants > sl-button");
    dropdownButton.innerHTML = variantButtonHtml
  }
  return downloadElement
}

function UpdateDownloaded(downloadedInfo, localMessages) {
  let downloadElement = document.querySelector(
    `[data-downloadable-id="${downloadedInfo.downloadable.id}"]`);
  downloadElement || (downloadElement = renderDownloadable(downloadedInfo.downloadable, localMessages), document.querySelector("#core-downloads")
    .append(downloadElement)), downloadElement.setAttribute("status", "downloaded");
  let titleElement = downloadElement.querySelector(".title");
  return downloadedInfo.download_result.inbrowser ? (downloadElement.dataset.inBrowserDownloadId = downloadedInfo
    .download_result.download_id.toString(), titleElement.textContent = downloadedInfo.downloadable
    .title) : titleElement.textContent = downloadedInfo.download_result.filename, downloadElement
}
export {
  RenderVariantButton as RenderVariantButton, UpdateDefaultAction as UpdateDefaultAction, UpdateDownloadable as UpdateDownloadable,
  UpdateDownloaded as UpdateDownloaded, UpdateDownloading as UpdateDownloading, UpdateProgress as UpdateProgress
};