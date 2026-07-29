/*
 * Shoelace 2.13.1 + Lit + Floating UI + webextension-polyfill, bundled.
 * The extensions UI component library; app code lives in ../shoelace.js which
 * imports from here. Kept byte-identical to the original bundle (only an export
 * line added). Importing this file registers the <sl-*> custom elements.
 */
var objectCreate = Object.create;
var defineProperty = Object.defineProperty;
var getOwnPropDesc = Object.getOwnPropertyDescriptor;
var getOwnPropNames = Object.getOwnPropertyNames;
var getPrototypeOf = Object.getPrototypeOf,
  hasOwnPropertyRef = Object.prototype.hasOwnProperty;
var defineCommonjsModule = (moduleInitializer, cachedModuleState) => () => (cachedModuleState || moduleInitializer((cachedModuleState = {
    exports: {}
  })
  .exports, cachedModuleState), cachedModuleState.exports);
var copyProps = (targetObj, sourceObj, excludedKey, descriptorRef) => {
  if (sourceObj && typeof sourceObj == "object" || typeof sourceObj == "function")
    for (let propKey of getOwnPropNames(sourceObj)) !hasOwnPropertyRef.call(targetObj, propKey) && propKey !== excludedKey && defineProperty(targetObj, propKey, {
      get: () => sourceObj[propKey],
      enumerable: !(descriptorRef = getOwnPropDesc(sourceObj, propKey)) || descriptorRef.enumerable
    });
  return targetObj
};
var toEsm = (moduleInput, isNodeMode, esmTarget) => (esmTarget = moduleInput != null ? objectCreate(getPrototypeOf(moduleInput)) : {}, copyProps(isNodeMode || !moduleInput || !moduleInput
  .__esModule ? defineProperty(esmTarget, "default", {
    value: moduleInput,
    enumerable: !0
  }) : esmTarget, moduleInput));
var webextPolyfillModule = defineCommonjsModule((moduleExports, moduleObject) => {
  (function(rootObject, factoryFn) {
    if (typeof define == "function" && define.amd) define(
      "webextension-polyfill", ["module"], factoryFn);
    else if (typeof moduleExports < "u") factoryFn(moduleObject);
    else {
      var localModule = {
        exports: {}
      };
      factoryFn(localModule), rootObject.browser = localModule.exports
    }
  })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : moduleExports,
    function(polyfillModule) {
      "use strict";
      if (!globalThis.chrome?.runtime?.id) throw new Error(
        "This script should only be loaded in a browser extension.");
      if (typeof globalThis.browser > "u" || Object.getPrototypeOf(
          globalThis.browser) !== Object.prototype) {
        let portClosedMessage = "The message port closed before a response was received.",
          wrapAPIs = extensionAPIs => {
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
              constructor(createItem, initialData = void 0) {
                super(initialData), this.createItem = createItem
              }
              get(lookupKey) {
                return this.has(lookupKey) || this.set(lookupKey, this.createItem(lookupKey)),
                  super.get(lookupKey)
              }
            }
            let isThenable = maybePromise => maybePromise && typeof maybePromise == "object" && typeof maybePromise.then ==
              "function",
              makeCallbackHandler = (promiseHandlers, callMetadata) => (...callbackArgs) => {
                extensionAPIs.runtime.lastError ? promiseHandlers.reject(new Error(extensionAPIs.runtime.lastError
                    .message)) : callMetadata.singleCallbackArg || callbackArgs.length <= 1 && callMetadata
                  .singleCallbackArg !== !1 ? promiseHandlers.resolve(callbackArgs[0]) : promiseHandlers.resolve(callbackArgs)
              },
              pluralizeArgWord = argCount => argCount == 1 ? "argument" : "arguments",
              wrapAsyncFunction = (funcName, funcMetadata) => function(targetObject, ...callArgs) {
                if (callArgs.length < funcMetadata.minArgs) throw new Error(
                  `Expected at least ${funcMetadata.minArgs} ${pluralizeArgWord(funcMetadata.minArgs)} for ${funcName}(), got ${callArgs.length}`
                  );
                if (callArgs.length > funcMetadata.maxArgs) throw new Error(
                  `Expected at most ${funcMetadata.maxArgs} ${pluralizeArgWord(funcMetadata.maxArgs)} for ${funcName}(), got ${callArgs.length}`
                  );
                return new Promise((resolveCallback, rejectCallback) => {
                  if (funcMetadata.fallbackToNoCallback) try {
                    targetObject[funcName](...callArgs, makeCallbackHandler({
                      resolve: resolveCallback,
                      reject: rejectCallback
                    }, funcMetadata))
                  } catch (callbackError) {
                    console.warn(
                        `${funcName} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,
                        callbackError), targetObject[funcName](...callArgs), funcMetadata.fallbackToNoCallback = !1, funcMetadata
                      .noCallback = !0, resolveCallback()
                  } else funcMetadata.noCallback ? (targetObject[funcName](...callArgs), resolveCallback()) : targetObject[funcName](...callArgs,
                    makeCallbackHandler({
                      resolve: resolveCallback,
                      reject: rejectCallback
                    }, funcMetadata))
                })
              },
              wrapProxyMethod = (namespaceName, targetFunction, wrapperFunction) => new Proxy(targetFunction, {
                apply(proxyTarget, thisArg, callArguments) {
                  return wrapperFunction.call(thisArg, namespaceName, ...callArguments)
                }
              }),
              hasOwnPropertyCall = Function.call.bind(Object.prototype.hasOwnProperty),
              wrapObject = (sourceObject, methodWrappers = {}, objectMetadata = {}) => {
                let localCache = Object.create(null),
                  proxyHandler = {
                    has(handlerTarget, propName) {
                      return propName in sourceObject || propName in localCache
                    },
                    get(handlerTarget, propName, receiver) {
                      if (propName in localCache) return localCache[propName];
                      if (!(propName in sourceObject)) return;
                      let propValue = sourceObject[propName];
                      if (typeof propValue == "function")
                        if (typeof methodWrappers[propName] == "function") propValue = wrapProxyMethod(sourceObject, sourceObject[propName], methodWrappers[
                          propName]);
                        else if (hasOwnPropertyCall(objectMetadata, propName)) {
                        let wrappedMethod = wrapAsyncFunction(propName, objectMetadata[propName]);
                        propValue = wrapProxyMethod(sourceObject, sourceObject[propName], wrappedMethod)
                      } else propValue = propValue.bind(sourceObject);
                      else if (typeof propValue == "object" && propValue !== null && (hasOwnPropertyCall(methodWrappers,
                          propName) || hasOwnPropertyCall(objectMetadata, propName))) propValue = wrapObject(propValue, methodWrappers[propName], objectMetadata[propName]);
                      else if (hasOwnPropertyCall(objectMetadata, "*")) propValue = wrapObject(propValue, methodWrappers[propName], objectMetadata["*"]);
                      else return Object.defineProperty(localCache, propName, {
                        configurable: !0,
                        enumerable: !0,
                        get() {
                          return sourceObject[propName]
                        },
                        set(incomingValue) {
                          sourceObject[propName] = incomingValue
                        }
                      }), propValue;
                      return localCache[propName] = propValue, propValue
                    },
                    set(handlerTarget, propName, newValue, setReceiver) {
                      return propName in localCache ? localCache[propName] = newValue : sourceObject[propName] = newValue, !0
                    },
                    defineProperty(handlerTarget, propName, propDescriptor) {
                      return Reflect.defineProperty(localCache, propName, propDescriptor)
                    },
                    deleteProperty(handlerTarget, propName) {
                      return Reflect.deleteProperty(localCache, propName)
                    }
                  },
                  proxyBase = Object.create(sourceObject);
                return new Proxy(proxyBase, proxyHandler)
              },
              makeEventWrapper = callbackWrapperMap => ({
                addListener(eventTarget, eventListener, ...extraArgs) {
                  eventTarget.addListener(callbackWrapperMap.get(eventListener), ...extraArgs)
                },
                hasListener(eventTarget, eventListener) {
                  return eventTarget.hasListener(callbackWrapperMap.get(eventListener))
                },
                removeListener(eventTarget, eventListener) {
                  eventTarget.removeListener(callbackWrapperMap.get(eventListener))
                }
              }),
              onRequestFinishedWrappers = new DefaultWeakMap(userCallback => typeof userCallback != "function" ? userCallback : function(requestDetails) {
                let wrappedRequest = wrapObject(requestDetails, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                userCallback(wrappedRequest)
              }),
              onMessageWrappers = new DefaultWeakMap(userListener => typeof userListener != "function" ? userListener : function(message, messageSender,
              sendResponse) {
                let didRespond = !1,
                  resolveHandled, handledPromise = new Promise(resolveHandledPromise => {
                    resolveHandled = function(responseValue) {
                      didRespond = !0, resolveHandledPromise(responseValue)
                    }
                  }),
                  listenerReturn;
                try {
                  listenerReturn = userListener(message, messageSender, resolveHandled)
                } catch (listenerError) {
                  listenerReturn = Promise.reject(listenerError)
                }
                let returnIsThenable = listenerReturn !== !0 && isThenable(listenerReturn);
                if (listenerReturn !== !0 && !returnIsThenable && !didRespond) return !1;
                let deliverResponse = resultPromise => {
                  resultPromise.then(replySuccessValue => {
                      sendResponse(replySuccessValue)
                    }, replyErrorValue => {
                      let errorMessage;
                      replyErrorValue && (replyErrorValue instanceof Error || typeof replyErrorValue.message ==
                          "string") ? errorMessage = replyErrorValue.message : errorMessage =
                        "An unexpected error occurred", sendResponse({
                          __mozWebExtensionPolyfillReject__: !0,
                          message: errorMessage
                        })
                    })
                    .catch(logError => {
                      console.error(
                        "Failed to send onMessage rejected reply", logError
                        )
                    })
                };
                return deliverResponse(returnIsThenable ? listenerReturn : handledPromise), !0
              }),
              handleCallbackResponse = ({
                reject: rejectCallback,
                resolve: resolveCallback
              }, responseMessage) => {
                extensionAPIs.runtime.lastError ? extensionAPIs.runtime.lastError.message === portClosedMessage ?
                  resolveCallback() : rejectCallback(new Error(extensionAPIs.runtime.lastError.message)) : responseMessage && responseMessage
                  .__mozWebExtensionPolyfillReject__ ? rejectCallback(new Error(responseMessage
                    .message)) : resolveCallback(responseMessage)
              },
              wrapSendMessage = (funcName, funcMetadata, apiObject, ...callArgs) => {
                if (callArgs.length < funcMetadata.minArgs) throw new Error(
                  `Expected at least ${funcMetadata.minArgs} ${pluralizeArgWord(funcMetadata.minArgs)} for ${funcName}(), got ${callArgs.length}`
                  );
                if (callArgs.length > funcMetadata.maxArgs) throw new Error(
                  `Expected at most ${funcMetadata.maxArgs} ${pluralizeArgWord(funcMetadata.maxArgs)} for ${funcName}(), got ${callArgs.length}`
                  );
                return new Promise((resolveCallback, rejectCallback) => {
                  let boundResponseHandler = handleCallbackResponse.bind(null, {
                    resolve: resolveCallback,
                    reject: rejectCallback
                  });
                  callArgs.push(boundResponseHandler), apiObject.sendMessage(...callArgs)
                })
              },
              staticWrappers = {
                devtools: {
                  network: {
                    onRequestFinished: makeEventWrapper(onRequestFinishedWrappers)
                  }
                },
                runtime: {
                  onMessage: makeEventWrapper(onMessageWrappers),
                  onMessageExternal: makeEventWrapper(onMessageWrappers),
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
              privacySettingMetadata = {
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
                "*": privacySettingMetadata
              },
              services: {
                "*": privacySettingMetadata
              },
              websites: {
                "*": privacySettingMetadata
              }
            }, wrapObject(extensionAPIs, staticWrappers, apiMetadata)
          };
        polyfillModule.exports = wrapAPIs(chrome)
      } else polyfillModule.exports = globalThis.browser
    })
});
var litGlobalScope = globalThis,
  supportsAdoptingStyleSheets = litGlobalScope.ShadowRoot && (litGlobalScope.ShadyCSS === void 0 || litGlobalScope.ShadyCSS.nativeShadow) &&
  "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet
  .prototype,
  cssConstructionToken = Symbol(),
  styleSheetCache = new WeakMap,
  CSSResult = class {
    constructor(cssTextValue, cssStrings, safeToken) {
      if (this._$cssResult$ = !0, safeToken !== cssConstructionToken) throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
        );
      this.cssText = cssTextValue, this.t = cssStrings
    }
    get styleSheet() {
      let cachedSheet = this.o,
        cssStrings = this.t;
      if (supportsAdoptingStyleSheets && cachedSheet === void 0) {
        let isSingleString = cssStrings !== void 0 && cssStrings.length === 1;
        isSingleString && (cachedSheet = styleSheetCache.get(cssStrings)), cachedSheet === void 0 && ((this.o = cachedSheet =
            new CSSStyleSheet)
          .replaceSync(this.cssText), isSingleString && styleSheetCache.set(cssStrings, cachedSheet))
      }
      return cachedSheet
    }
    toString() {
      return this.cssText
    }
  },
  unsafeCSS = cssValue => new CSSResult(typeof cssValue == "string" ? cssValue : cssValue + "", void 0, cssConstructionToken),
  cssTag = (cssStrings, ...interpolatedValues) => {
    let combinedCssText = cssStrings.length === 1 ? cssStrings[0] : interpolatedValues.reduce((accumulatedCss, interpolatedValue, stringIndex) => accumulatedCss + (cssResultOrNumber => {
      if (cssResultOrNumber._$cssResult$ === !0) return cssResultOrNumber.cssText;
      if (typeof cssResultOrNumber == "number") return cssResultOrNumber;
      throw Error(
        "Value passed to 'css' function must be a 'css' function result: " +
        cssResultOrNumber +
        ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
        )
    })(interpolatedValue) + cssStrings[stringIndex + 1], cssStrings[0]);
    return new CSSResult(combinedCssText, cssStrings, cssConstructionToken)
  },
  adoptStyles = (renderRoot, styles) => {
    if (supportsAdoptingStyleSheets) renderRoot.adoptedStyleSheets = styles.map(styleItem => styleItem instanceof CSSStyleSheet ? styleItem : styleItem
      .styleSheet);
    else
      for (let styleItem of styles) {
        let styleElement = document.createElement("style"),
          nonce = litGlobalScope.litNonce;
        nonce !== void 0 && styleElement.setAttribute("nonce", nonce), styleElement.textContent = styleItem.cssText, renderRoot
          .appendChild(styleElement)
      }
  },
  getCompatibleStyle = supportsAdoptingStyleSheets ? styleInput => styleInput : styleInput => styleInput instanceof CSSStyleSheet ? (styleSheet => {
    let cssTextValue = "";
    for (let cssRule of styleSheet.cssRules) cssTextValue += cssRule.cssText;
    return unsafeCSS(cssTextValue)
  })(styleInput) : styleInput;
var {
  is: objectIs,
  defineProperty: definePropertyRef,
  getOwnPropertyDescriptor: getOwnPropDescRef,
  getOwnPropertyNames: getOwnPropNamesRef,
  getOwnPropertySymbols: getOwnPropSymbolsRef,
  getPrototypeOf: getPrototypeOfRef
} = Object, reactiveElementGlobal = globalThis, reTrustedTypes = reactiveElementGlobal.trustedTypes, emptyScript = reTrustedTypes ? reTrustedTypes.emptyScript :
  "", reactiveElementPolyfillSupport = reactiveElementGlobal.reactiveElementPolyfillSupport, identityConverter = (identityValue, identityType) => identityValue, defaultConverter = {
    toAttribute(propertyValue, propertyType) {
      switch (propertyType) {
        case Boolean:
          propertyValue = propertyValue ? emptyScript : null;
          break;
        case Object:
        case Array:
          propertyValue = propertyValue == null ? propertyValue : JSON.stringify(propertyValue)
      }
      return propertyValue
    },
    fromAttribute(attributeValue, propertyType) {
      let convertedValue = attributeValue;
      switch (propertyType) {
        case Boolean:
          convertedValue = attributeValue !== null;
          break;
        case Number:
          convertedValue = attributeValue === null ? null : Number(attributeValue);
          break;
        case Object:
        case Array:
          try {
            convertedValue = JSON.parse(attributeValue)
          } catch {
            convertedValue = null
          }
      }
      return convertedValue
    }
  }, valueHasChanged = (newValue, oldValue) => !objectIs(newValue, oldValue), defaultPropertyDeclaration = {
    attribute: !0,
    type: String,
    converter: defaultConverter,
    reflect: !1,
    hasChanged: valueHasChanged
  };
Symbol.metadata ??= Symbol("metadata"), reactiveElementGlobal.litPropertyMetadata ??= new WeakMap;
var ReactiveElement = class extends HTMLElement {
  static addInitializer(initializer) {
    this._$Ei(), (this.l ??= [])
      .push(initializer)
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()]
  }
  static createProperty(propertyName, propertyOptions = defaultPropertyDeclaration) {
    if (propertyOptions.state && (propertyOptions.attribute = !1), this._$Ei(), this.elementProperties
      .set(propertyName, propertyOptions), !propertyOptions.noAccessor) {
      let privateStorageKey = Symbol(),
        propertyDescriptor = this.getPropertyDescriptor(propertyName, privateStorageKey, propertyOptions);
      propertyDescriptor !== void 0 && definePropertyRef(this.prototype, propertyName, propertyDescriptor)
    }
  }
  static getPropertyDescriptor(propertyName, privateStorageKey, propertyOptions) {
    let {
      get: propGetter,
      set: propSetter
    } = getOwnPropDescRef(this.prototype, propertyName) ?? {
      get() {
        return this[privateStorageKey]
      },
      set(incomingValue) {
        this[privateStorageKey] = incomingValue
      }
    };
    return {
      get() {
        return propGetter?.call(this)
      },
      set(incomingValue) {
        let previousValue = propGetter?.call(this);
        propSetter.call(this, incomingValue), this.requestUpdate(propertyName, previousValue, propertyOptions)
      },
      configurable: !0,
      enumerable: !0
    }
  }
  static getPropertyOptions(propertyName) {
    return this.elementProperties.get(propertyName) ?? defaultPropertyDeclaration
  }
  static _$Ei() {
    if (this.hasOwnProperty(identityConverter("elementProperties"))) return;
    let superConstructor = getPrototypeOfRef(this);
    superConstructor.finalize(), superConstructor.l !== void 0 && (this.l = [...superConstructor.l]), this
      .elementProperties = new Map(superConstructor.elementProperties)
  }
  static finalize() {
    if (this.hasOwnProperty(identityConverter("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(identityConverter(
        "properties"))) {
      let propertyDeclarations = this.properties,
        propertyKeys = [...getOwnPropNamesRef(propertyDeclarations), ...getOwnPropSymbolsRef(propertyDeclarations)];
      for (let propertyKey of propertyKeys) this.createProperty(propertyKey, propertyDeclarations[propertyKey])
    }
    let classMetadata = this[Symbol.metadata];
    if (classMetadata !== null) {
      let inheritedProperties = litPropertyMetadata.get(classMetadata);
      if (inheritedProperties !== void 0)
        for (let [inheritedPropKey, inheritedPropOptions] of inheritedProperties) this.elementProperties.set(inheritedPropKey, inheritedPropOptions)
    }
    this._$Eh = new Map;
    for (let [propertyKey, propertyOptions] of this.elementProperties) {
      let attributeName = this._$Eu(propertyKey, propertyOptions);
      attributeName !== void 0 && this._$Eh.set(attributeName, propertyKey)
    }
    this.elementStyles = this.finalizeStyles(this.styles)
  }
  static finalizeStyles(styleDeclarations) {
    let flattenedStyles = [];
    if (Array.isArray(styleDeclarations)) {
      let uniqueStyleSet = new Set(styleDeclarations.flat(1 / 0)
        .reverse());
      for (let styleItem of uniqueStyleSet) flattenedStyles.unshift(getCompatibleStyle(styleItem))
    } else styleDeclarations !== void 0 && flattenedStyles.push(getCompatibleStyle(styleDeclarations));
    return flattenedStyles
  }
  static _$Eu(propertyName, propertyOptions) {
    let attributeOption = propertyOptions.attribute;
    return attributeOption === !1 ? void 0 : typeof attributeOption == "string" ? attributeOption : typeof propertyName ==
      "string" ? propertyName.toLowerCase() : void 0
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this
      .hasUpdated = !1, this._$Em = null, this._$Ev()
  }
  _$Ev() {
    this._$ES = new Promise(resolveEnableUpdating => this.enableUpdating = resolveEnableUpdating), this._$AL =
      new Map, this._$E_(), this.requestUpdate(), this.constructor.l
      ?.forEach(initializer => initializer(this))
  }
  addController(controller) {
    (this._$EO ??= new Set)
    .add(controller), this.renderRoot !== void 0 && this.isConnected && controller
      .hostConnected?.()
  }
  removeController(controller) {
    this._$EO?.delete(controller)
  }
  _$E_() {
    let savedProperties = new Map,
      elementProperties = this.constructor.elementProperties;
    for (let propertyKey of elementProperties.keys()) this.hasOwnProperty(propertyKey) && (savedProperties.set(propertyKey, this[propertyKey]),
      delete this[propertyKey]);
    savedProperties.size > 0 && (this._$Ep = savedProperties)
  }
  createRenderRoot() {
    let renderRootNode = this.shadowRoot ?? this.attachShadow(this.constructor
      .shadowRootOptions);
    return adoptStyles(renderRootNode, this.constructor.elementStyles), renderRootNode
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0),
      this._$EO?.forEach(controller => controller.hostConnected?.())
  }
  enableUpdating(updateRequested) {}
  disconnectedCallback() {
    this._$EO?.forEach(controller => controller.hostDisconnected?.())
  }
  attributeChangedCallback(attributeName, oldAttrValue, newAttrValue) {
    this._$AK(attributeName, newAttrValue)
  }
  _$EC(propertyName, propertyValue) {
    let propertyOptions = this.constructor.elementProperties.get(propertyName),
      attributeName = this.constructor._$Eu(propertyName, propertyOptions);
    if (attributeName !== void 0 && propertyOptions.reflect === !0) {
      let reflectedAttrValue = (propertyOptions.converter?.toAttribute !== void 0 ? propertyOptions.converter : defaultConverter)
        .toAttribute(propertyValue, propertyOptions.type);
      this._$Em = propertyName, reflectedAttrValue == null ? this.removeAttribute(attributeName) : this
        .setAttribute(attributeName, reflectedAttrValue), this._$Em = null
    }
  }
  _$AK(attributeName, attributeValue) {
    let elementConstructor = this.constructor,
      propertyName = elementConstructor._$Eh.get(attributeName);
    if (propertyName !== void 0 && this._$Em !== propertyName) {
      let propertyOptions = elementConstructor.getPropertyOptions(propertyName),
        attributeConverter = typeof propertyOptions.converter == "function" ? {
          fromAttribute: propertyOptions.converter
        } : propertyOptions.converter?.fromAttribute !== void 0 ? propertyOptions.converter : defaultConverter;
      this._$Em = propertyName, this[propertyName] = attributeConverter.fromAttribute(attributeValue, propertyOptions.type), this._$Em = null
    }
  }
  requestUpdate(propertyName, oldValue, propertyOptions) {
    if (propertyName !== void 0) {
      if (propertyOptions ??= this.constructor.getPropertyOptions(propertyName), !(propertyOptions.hasChanged ??
          valueHasChanged)(this[propertyName], oldValue)) return;
      this.P(propertyName, oldValue, propertyOptions)
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET())
  }
  P(propertyName, newValue, propertyOptions) {
    this._$AL.has(propertyName) || this._$AL.set(propertyName, newValue), propertyOptions.reflect === !0 && this
      ._$Em !== propertyName && (this._$Ej ??= new Set)
      .add(propertyName)
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES
    } catch (updateError) {
      Promise.reject(updateError)
    }
    let updateCompletePromise = this.scheduleUpdate();
    return updateCompletePromise != null && await updateCompletePromise, !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (let [deferredPropKey, deferredPropValue] of this._$Ep) this[deferredPropKey] = deferredPropValue;
        this._$Ep = void 0
      }
      let elementProperties = this.constructor.elementProperties;
      if (elementProperties.size > 0)
        for (let [propertyKey, propertyOptions] of elementProperties) propertyOptions.wrapped !== !0 || this._$AL.has(propertyKey) || this[
          propertyKey] === void 0 || this.P(propertyKey, this[propertyKey], propertyOptions)
    }
    let shouldPerformUpdate = !1,
      changedProperties = this._$AL;
    try {
      shouldPerformUpdate = this.shouldUpdate(changedProperties), shouldPerformUpdate ? (this.willUpdate(changedProperties), this._$EO?.forEach(
        controller => controller.hostUpdate?.()), this.update(changedProperties)) : this._$EU()
    } catch (updateError) {
      throw shouldPerformUpdate = !1, this._$EU(), updateError
    }
    shouldPerformUpdate && this._$AE(changedProperties)
  }
  willUpdate(changedProperties) {}
  _$AE(changedProperties) {
    this._$EO?.forEach(controller => controller.hostUpdated?.()), this.hasUpdated || (this
      .hasUpdated = !0, this.firstUpdated(changedProperties)), this.updated(changedProperties)
  }
  _$EU() {
    this._$AL = new Map, this.isUpdatePending = !1
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$ES
  }
  shouldUpdate(changedProperties) {
    return !0
  }
  update(changedProperties) {
    this._$Ej &&= this._$Ej.forEach(reflectPropKey => this._$EC(reflectPropKey, this[reflectPropKey])), this._$EU()
  }
  updated(changedProperties) {}
  firstUpdated(changedProperties) {}
};
ReactiveElement.elementStyles = [], ReactiveElement.shadowRootOptions = {
    mode: "open"
  }, ReactiveElement[identityConverter("elementProperties")] = new Map, ReactiveElement[identityConverter("finalized")] = new Map, reactiveElementPolyfillSupport?.
({
    ReactiveElement: ReactiveElement
  }), (reactiveElementGlobal.reactiveElementVersions ??= [])
  .push("2.0.4");
var litHtmlGlobal = globalThis,
  litTrustedTypes = litHtmlGlobal.trustedTypes,
  trustedTypesPolicy = litTrustedTypes ? litTrustedTypes.createPolicy("lit-html", {
    createHTML: rawHtml => rawHtml
  }) : void 0,
  boundAttributeSuffix = "$lit$",
  markerText = `lit$${(Math.random()+"").slice(9)}$`,
  markerMatch = "?" + markerText,
  nodeMarker = `<${markerMatch}>`,
  documentRef = document,
  createMarkerComment = () => documentRef.createComment(""),
  isPrimitiveValue = candidateValue => candidateValue === null || typeof candidateValue != "object" && typeof candidateValue != "function",
  isArrayValue = Array.isArray,
  isIterableValue = candidateValue => isArrayValue(candidateValue) || typeof candidateValue?.[Symbol.iterator] == "function",
  whitespaceCharClass = `[ \t\n\f\r]`,
  textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  commentEndRegex = /-->/g,
  comment2EndRegex = />/g,
  tagEndRegex = RegExp(`>|${whitespaceCharClass}(?:([^\\s"'>=/]+)(${whitespaceCharClass}*=${whitespaceCharClass}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
  singleQuoteAttrEndRegex = /'/g,
  doubleQuoteAttrEndRegex = /"/g,
  rawTextElementRegex = /^(?:script|style|textarea|title)$/i,
  makeTemplateTag = templateResultType => (templateStrings, ...templateValues) => ({
    _$litType$: templateResultType,
    strings: templateStrings,
    values: templateValues
  }),
  htmlTag = makeTemplateTag(1),
  svgTag = makeTemplateTag(2),
  noChange = Symbol.for("lit-noChange"),
  nothing = Symbol.for("lit-nothing"),
  templateCache = new WeakMap,
  templateWalker = documentRef.createTreeWalker(documentRef, 129);

function trustFromTemplateString(templateStringArray, stringFromArray) {
  if (!Array.isArray(templateStringArray) || !templateStringArray.hasOwnProperty("raw")) throw Error(
    "invalid template strings array");
  return trustedTypesPolicy !== void 0 ? trustedTypesPolicy.createHTML(stringFromArray) : stringFromArray
}
var getTemplateHtml = (templateStrings, templateResultType) => {
    let lastStringIndex = templateStrings.length - 1,
      collectedAttrNames = [],
      rawTextEndRegex, htmlOutput = templateResultType === 2 ? "<svg>" : "",
      activeRegex = textEndRegex;
    for (let stringLoopIndex = 0; stringLoopIndex < lastStringIndex; stringLoopIndex++) {
      let currentString = templateStrings[stringLoopIndex],
        regexMatch, attributeName, attrNameEndIndex = -1,
        scanIndex = 0;
      for (; scanIndex < currentString.length && (activeRegex.lastIndex = scanIndex, attributeName = activeRegex.exec(currentString), attributeName !== null);) scanIndex =
        activeRegex.lastIndex, activeRegex === textEndRegex ? attributeName[1] === "!--" ? activeRegex = commentEndRegex : attributeName[1] !== void 0 ? activeRegex =
        comment2EndRegex : attributeName[2] !== void 0 ? (rawTextElementRegex.test(attributeName[2]) && (rawTextEndRegex = RegExp("</" + attributeName[2], "g")),
          activeRegex = tagEndRegex) : attributeName[3] !== void 0 && (activeRegex = tagEndRegex) : activeRegex === tagEndRegex ? attributeName[0] === ">" ? (activeRegex =
          rawTextEndRegex ?? textEndRegex, attrNameEndIndex = -1) : attributeName[1] === void 0 ? attrNameEndIndex = -2 : (attrNameEndIndex = activeRegex.lastIndex - attributeName[2]
          .length, regexMatch = attributeName[1], activeRegex = attributeName[3] === void 0 ? tagEndRegex : attributeName[3] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex
          ) : activeRegex === doubleQuoteAttrEndRegex || activeRegex === singleQuoteAttrEndRegex ? activeRegex = tagEndRegex : activeRegex === commentEndRegex || activeRegex === comment2EndRegex ? activeRegex = textEndRegex : (
          activeRegex = tagEndRegex, rawTextEndRegex = void 0);
      let selfCloseSpacer = activeRegex === tagEndRegex && templateStrings[stringLoopIndex + 1].startsWith("/>") ? " " : "";
      htmlOutput += activeRegex === textEndRegex ? currentString + nodeMarker : attrNameEndIndex >= 0 ? (collectedAttrNames.push(regexMatch), currentString.slice(0, attrNameEndIndex) + boundAttributeSuffix + currentString
        .slice(attrNameEndIndex) + markerText + selfCloseSpacer) : currentString + markerText + (attrNameEndIndex === -2 ? stringLoopIndex : selfCloseSpacer)
    }
    return [trustFromTemplateString(templateStrings, htmlOutput + (templateStrings[lastStringIndex] || "<?>") + (templateResultType === 2 ? "</svg>" : "")), collectedAttrNames]
  },
  Template = class TemplateClass {
    constructor({
      strings: templateStrings,
      _$litType$: templateResultType
    }, renderOptions) {
      let walkerNode;
      this.parts = [];
      let walkNodeIndex = 0,
        attrNameIndex = 0,
        partCount = templateStrings.length - 1,
        templateParts = this.parts,
        [generatedHtml, parsedAttrNames] = getTemplateHtml(templateStrings, templateResultType);
      if (this.el = TemplateClass.createElement(generatedHtml, renderOptions), templateWalker.currentNode = this.el.content,
        templateResultType === 2) {
        let firstChildNode = this.el.content.firstChild;
        firstChildNode.replaceWith(...firstChildNode.childNodes)
      }
      for (;
        (walkerNode = templateWalker.nextNode()) !== null && templateParts.length < partCount;) {
        if (walkerNode.nodeType === 1) {
          if (walkerNode.hasAttributes())
            for (let currentAttrName of walkerNode.getAttributeNames())
              if (currentAttrName.endsWith(boundAttributeSuffix)) {
                let expectedAttrName = parsedAttrNames[attrNameIndex++],
                  attributeValue = walkerNode.getAttribute(currentAttrName)
                  .split(markerText),
                  attrPrefixMatch = /([.?@])?(.*)/.exec(expectedAttrName);
                templateParts.push({
                  type: 1,
                  index: walkNodeIndex,
                  name: attrPrefixMatch[2],
                  strings: attributeValue,
                  ctor: attrPrefixMatch[1] === "." ? PropertyPart : attrPrefixMatch[1] === "?" ? BooleanAttributePart : attrPrefixMatch[1] ===
                    "@" ? EventPart : AttributePart
                }), walkerNode.removeAttribute(currentAttrName)
              } else currentAttrName.startsWith(markerText) && (templateParts.push({
                type: 6,
                index: walkNodeIndex
              }), walkerNode.removeAttribute(currentAttrName));
          if (rawTextElementRegex.test(walkerNode.tagName)) {
            let textNodeParts = walkerNode.textContent.split(markerText),
              textPartCount = textNodeParts.length - 1;
            if (textPartCount > 0) {
              walkerNode.textContent = litTrustedTypes ? litTrustedTypes.emptyScript : "";
              for (let textPartIndex = 0; textPartIndex < textPartCount; textPartIndex++) walkerNode.append(textNodeParts[textPartIndex], createMarkerComment()), templateWalker.nextNode(),
                templateParts.push({
                  type: 2,
                  index: ++walkNodeIndex
                });
              walkerNode.append(textNodeParts[textPartCount], createMarkerComment())
            }
          }
        } else if (walkerNode.nodeType === 8)
          if (walkerNode.data === markerMatch) templateParts.push({
            type: 2,
            index: walkNodeIndex
          });
          else {
            let nodePartIndex = -1;
            for (;
              (nodePartIndex = walkerNode.data.indexOf(markerText, nodePartIndex + 1)) !== -1;) templateParts.push({
              type: 7,
              index: walkNodeIndex
            }), nodePartIndex += markerText.length - 1
          } walkNodeIndex++
      }
    }
    static createElement(htmlOutput, createOptions) {
      let templateElement = documentRef.createElement("template");
      return templateElement.innerHTML = htmlOutput, templateElement
    }
  };

function resolveDirective(directivePart, directiveValue, directiveParent = directivePart, directiveAttrIndex) {
  if (directiveValue === noChange) return directiveValue;
  let existingDirective = directiveAttrIndex !== void 0 ? directiveParent._$Co?.[directiveAttrIndex] : directiveParent._$Cl,
    directiveClass = isPrimitiveValue(directiveValue) ? void 0 : directiveValue._$litDirective$;
  return existingDirective?.constructor !== directiveClass && (existingDirective?._$AO?.(!1), directiveClass === void 0 ? existingDirective = void 0 : (
      existingDirective = new directiveClass(directivePart), existingDirective._$AT(directivePart, directiveParent, directiveAttrIndex)), directiveAttrIndex !== void 0 ? (directiveParent._$Co ??= [])[directiveAttrIndex] = existingDirective :
    directiveParent._$Cl = existingDirective), existingDirective !== void 0 && (directiveValue = resolveDirective(directivePart, existingDirective._$AS(directivePart, directiveValue.values), existingDirective, directiveAttrIndex)), directiveValue
}
var TemplateInstance = class {
    constructor(template, parentPart) {
      this._$AV = [], this._$AN = void 0, this._$AD = template, this._$AM = parentPart
    }
    get parentNode() {
      return this._$AM.parentNode
    }
    get _$AU() {
      return this._$AM._$AU
    }
    u(cloneOptions) {
      let {
        el: {
          content: templateContent
        },
        parts: templatePartInfos
      } = this._$AD, clonedFragment = (cloneOptions?.creationScope ?? documentRef)
        .importNode(templateContent, !0);
      templateWalker.currentNode = clonedFragment;
      let currentNode = templateWalker.nextNode(),
        nodeIndex = 0,
        partIndex = 0,
        currentTemplatePart = templatePartInfos[0];
      for (; currentTemplatePart !== void 0;) {
        if (nodeIndex === currentTemplatePart.index) {
          let createdPart;
          currentTemplatePart.type === 2 ? createdPart = new ChildPart(currentNode, currentNode.nextSibling, this, cloneOptions) : currentTemplatePart.type ===
            1 ? createdPart = new currentTemplatePart.ctor(currentNode, currentTemplatePart.name, currentTemplatePart.strings, this, cloneOptions) : currentTemplatePart.type ===
            6 && (createdPart = new ElementPart(currentNode, this, cloneOptions)), this._$AV.push(createdPart), currentTemplatePart = templatePartInfos[++partIndex]
        }
        nodeIndex !== currentTemplatePart?.index && (currentNode = templateWalker.nextNode(), nodeIndex++)
      }
      return templateWalker.currentNode = documentRef, clonedFragment
    }
    p(newValues) {
      let valueIndex = 0;
      for (let instancePart of this._$AV) instancePart !== void 0 && (instancePart.strings !== void 0 ? (instancePart
        ._$AI(newValues, instancePart, valueIndex), valueIndex += instancePart.strings.length - 2) : instancePart._$AI(newValues[valueIndex])), valueIndex++
    }
  },
  ChildPart = class ChildPartClass {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv
    }
    constructor(startMarker, endMarker, parentPart, childRenderOptions) {
      this.type = 2, this._$AH = nothing, this._$AN = void 0, this._$AA = startMarker, this
        ._$AB = endMarker, this._$AM = parentPart, this.options = childRenderOptions, this._$Cv = childRenderOptions
        ?.isConnected ?? !0
    }
    get parentNode() {
      let parentNode = this._$AA.parentNode,
        parentPartRef = this._$AM;
      return parentPartRef !== void 0 && parentNode?.nodeType === 11 && (parentNode = parentPartRef.parentNode), parentNode
    }
    get startNode() {
      return this._$AA
    }
    get endNode() {
      return this._$AB
    }
    _$AI(newValue, directiveParent = this) {
      newValue = resolveDirective(this, newValue, directiveParent), isPrimitiveValue(newValue) ? newValue === nothing || newValue == null || newValue === "" ? (this
          ._$AH !== nothing && this._$AR(), this._$AH = nothing) : newValue !== this._$AH &&
        newValue !== noChange && this._(newValue) : newValue._$litType$ !== void 0 ? this.$(newValue) : newValue
        .nodeType !== void 0 ? this.T(newValue) : isIterableValue(newValue) ? this.k(newValue) : this._(newValue)
    }
    S(nodeToInsert) {
      return this._$AA.parentNode.insertBefore(nodeToInsert, this._$AB)
    }
    T(textValue) {
      this._$AH !== textValue && (this._$AR(), this._$AH = this.S(textValue))
    }
    _(domNodeValue) {
      this._$AH !== nothing && isPrimitiveValue(this._$AH) ? this._$AA.nextSibling.data = domNodeValue : this
        .T(documentRef.createTextNode(domNodeValue)), this._$AH = domNodeValue
    }
    $(templateResultValue) {
      let {
        values: resultValues,
        _$litType$: litTypeId
      } = templateResultValue, resolvedTemplate = typeof litTypeId == "number" ? this._$AC(templateResultValue) : (litTypeId.el === void 0 && (litTypeId
        .el = Template.createElement(trustFromTemplateString(litTypeId.h, litTypeId.h[0]), this.options)), litTypeId);
      if (this._$AH?._$AD === resolvedTemplate) this._$AH.p(resultValues);
      else {
        let templateInstance = new TemplateInstance(resolvedTemplate, this),
          instanceFragment = templateInstance.u(this.options);
        templateInstance.p(resultValues), this.T(instanceFragment), this._$AH = templateInstance
      }
    }
    _$AC(templateResultValue) {
      let cachedTemplate = templateCache.get(templateResultValue.strings);
      return cachedTemplate === void 0 && templateCache.set(templateResultValue.strings, cachedTemplate = new Template(templateResultValue)), cachedTemplate
    }
    k(iterableValue) {
      isArrayValue(this._$AH) || (this._$AH = [], this._$AR());
      let existingItemParts = this._$AH,
        itemPart, itemIndex = 0;
      for (let iterableItem of iterableValue) itemIndex === existingItemParts.length ? existingItemParts.push(itemPart = new ChildPartClass(this.S(createMarkerComment()), this.S(
        createMarkerComment()), this, this.options)) : itemPart = existingItemParts[itemIndex], itemPart._$AI(iterableItem), itemIndex++;
      itemIndex < existingItemParts.length && (this._$AR(itemPart && itemPart._$AB.nextSibling, itemIndex), existingItemParts.length = itemIndex)
    }
    _$AR(fromRemoveNode = this._$AA.nextSibling, directiveFromIndex) {
      for (this._$AP?.(!1, !0, directiveFromIndex); fromRemoveNode && fromRemoveNode !== this._$AB;) {
        let nextSiblingNode = fromRemoveNode.nextSibling;
        fromRemoveNode.remove(), fromRemoveNode = nextSiblingNode
      }
    }
    setConnected(isConnectedFlag) {
      this._$AM === void 0 && (this._$Cv = isConnectedFlag, this._$AP?.(isConnectedFlag))
    }
  },
  AttributePart = class {
    get tagName() {
      return this.element.tagName
    }
    get _$AU() {
      return this._$AM._$AU
    }
    constructor(hostElement, attributeName, partStrings, parentPart, attrRenderOptions) {
      this.type = 1, this._$AH = nothing, this._$AN = void 0, this.element = hostElement, this
        .name = attributeName, this._$AM = parentPart, this.options = attrRenderOptions, partStrings.length > 2 || partStrings[0] !==
        "" || partStrings[1] !== "" ? (this._$AH = Array(partStrings.length - 1)
          .fill(new String), this.strings = partStrings) : this._$AH = nothing
    }
    _$AI(newAttrValue, directiveParent = this, valuesStartIndex, noCommitFlag) {
      let attrStrings = this.strings,
        attrChanged = !1;
      if (attrStrings === void 0) newAttrValue = resolveDirective(this, newAttrValue, directiveParent, 0), attrChanged = !isPrimitiveValue(newAttrValue) || newAttrValue !== this._$AH &&
        newAttrValue !== noChange, attrChanged && (this._$AH = newAttrValue);
      else {
        let resolvedAttrValue = newAttrValue,
          anyPartChanged, resolvedPartValue;
        for (newAttrValue = attrStrings[0], anyPartChanged = 0; anyPartChanged < attrStrings.length - 1; anyPartChanged++) resolvedPartValue = resolveDirective(this, resolvedAttrValue[valuesStartIndex + anyPartChanged], directiveParent,
            anyPartChanged), resolvedPartValue === noChange && (resolvedPartValue = this._$AH[anyPartChanged]), attrChanged ||= !isPrimitiveValue(resolvedPartValue) || resolvedPartValue !== this._$AH[
            anyPartChanged], resolvedPartValue === nothing ? newAttrValue = nothing : newAttrValue !== nothing && (newAttrValue += (resolvedPartValue ?? "") + attrStrings[anyPartChanged + 1]), this
          ._$AH[anyPartChanged] = resolvedPartValue
      }
      attrChanged && !noCommitFlag && this.j(newAttrValue)
    }
    j(committedAttrValue) {
      committedAttrValue === nothing ? this.element.removeAttribute(this.name) : this.element
        .setAttribute(this.name, committedAttrValue ?? "")
    }
  },
  PropertyPart = class extends AttributePart {
    constructor() {
      super(...arguments), this.type = 3
    }
    j(committedPropValue) {
      this.element[this.name] = committedPropValue === nothing ? void 0 : committedPropValue
    }
  },
  BooleanAttributePart = class extends AttributePart {
    constructor() {
      super(...arguments), this.type = 4
    }
    j(committedBoolValue) {
      this.element.toggleAttribute(this.name, !!committedBoolValue && committedBoolValue !== nothing)
    }
  },
  EventPart = class extends AttributePart {
    constructor(hostElement, eventName, partStrings, parentPart, eventRenderOptions) {
      super(hostElement, eventName, partStrings, parentPart, eventRenderOptions), this.type = 5
    }
    _$AI(newListener, listenerDirectiveParent = this) {
      if ((newListener = resolveDirective(this, newListener, listenerDirectiveParent, 0) ?? nothing) === noChange) return;
      let oldListener = this._$AH,
        listenerOptionsChanged = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener
        .once || newListener.passive !== oldListener.passive,
        shouldAddListener = newListener !== nothing && (oldListener === nothing || listenerOptionsChanged);
      listenerOptionsChanged && this.element.removeEventListener(this.name, this, oldListener), shouldAddListener && this
        .element.addEventListener(this.name, this, newListener), this._$AH = newListener
    }
    handleEvent(domEvent) {
      typeof this._$AH == "function" ? this._$AH.call(this.options?.host ??
        this.element, domEvent) : this._$AH.handleEvent(domEvent)
    }
  },
  ElementPart = class {
    constructor(hostElement, parentPart, elementRenderOptions) {
      this.element = hostElement, this.type = 6, this._$AN = void 0, this._$AM = parentPart, this
        .options = elementRenderOptions
    }
    get _$AU() {
      return this._$AM._$AU
    }
    _$AI(elementDirectiveValue) {
      resolveDirective(this, elementDirectiveValue)
    }
  },
  internalLitHtmlApi = {
    P: boundAttributeSuffix,
    A: markerText,
    C: markerMatch,
    M: 1,
    L: getTemplateHtml,
    R: TemplateInstance,
    D: isIterableValue,
    V: resolveDirective,
    I: ChildPart,
    H: AttributePart,
    N: BooleanAttributePart,
    U: EventPart,
    B: PropertyPart,
    F: ElementPart
  },
  litHtmlPolyfillSupport = litHtmlGlobal.litHtmlPolyfillSupport;
litHtmlPolyfillSupport?.(Template, ChildPart), (litHtmlGlobal.litHtmlVersions ??= [])
  .push("3.1.2");
var renderTemplate = (templateValue, renderContainer, renderOptions) => {
  let partOwnerNode = renderOptions?.renderBefore ?? renderContainer,
    existingRootPart = partOwnerNode._$litPart$;
  if (existingRootPart === void 0) {
    let renderBeforeNode = renderOptions?.renderBefore ?? null;
    partOwnerNode._$litPart$ = existingRootPart = new ChildPart(renderContainer.insertBefore(createMarkerComment(), renderBeforeNode), renderBeforeNode, void 0, renderOptions ?? {})
  }
  return existingRootPart._$AI(templateValue), existingRootPart
};
var LitElement = class extends ReactiveElement {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0
  }
  createRenderRoot() {
    let litRenderRoot = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= litRenderRoot.firstChild, litRenderRoot
  }
  update(changedProperties) {
    let renderResult = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(changedProperties), this._$Do = renderTemplate(renderResult, this.renderRoot, this
        .renderOptions)
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0)
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1)
  }
  render() {
    return noChange
  }
};
LitElement._$litElement$ = !0, LitElement.finalized = !0, globalThis.litElementHydrateSupport?.
({
  LitElement: LitElement
});
var litElementPolyfillSupport = globalThis.litElementPolyfillSupport;
litElementPolyfillSupport?.({
  LitElement: LitElement
});
(globalThis.litElementVersions ??= [])
.push("4.0.4");
var componentBaseStyles = cssTag`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
var formControlHostStyles = cssTag`
  ${componentBaseStyles}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;
var connectedLocalizeElements = new Set,
  localeMutationObserver = new MutationObserver(updateLocalizedElements),
  translationsMap = new Map,
  documentDirection = document.documentElement.dir || "ltr",
  documentLanguage = document.documentElement.lang || navigator.language,
  fallbackTranslation;
localeMutationObserver.observe(document.documentElement, {
  attributes: !0,
  attributeFilter: ["dir", "lang"]
});

function registerTranslation(...translationsToRegister) {
  translationsToRegister.map(translationEntry => {
    let languageCode = translationEntry.$code.toLowerCase();
    translationsMap.has(languageCode) ? translationsMap.set(languageCode, Object.assign(Object.assign({}, translationsMap.get(languageCode)), translationEntry)) :
      translationsMap.set(languageCode, translationEntry), fallbackTranslation || (fallbackTranslation = translationEntry)
  }), updateLocalizedElements()
}

function updateLocalizedElements() {
  documentDirection = document.documentElement.dir || "ltr", documentLanguage = document.documentElement
    .lang || navigator.language, [...connectedLocalizeElements.keys()].map(localizedElement => {
      typeof localizedElement.requestUpdate == "function" && localizedElement.requestUpdate()
    })
}
var LocalizeControllerBase = class {
  constructor(hostElement) {
    this.host = hostElement, this.host.addController(this)
  }
  hostConnected() {
    connectedLocalizeElements.add(this.host)
  }
  hostDisconnected() {
    connectedLocalizeElements.delete(this.host)
  }
  dir() {
    return `${this.host.dir||documentDirection}`.toLowerCase()
  }
  lang() {
    return `${this.host.lang||documentLanguage}`.toLowerCase()
  }
  getTranslationData(localeString) {
    var regionRaw, regionResolved;
    let localeObject = new Intl.Locale(localeString.replace(/_/g, "-")),
      languageSubtag = localeObject?.language.toLowerCase(),
      regionSubtag = (regionResolved = (regionRaw = localeObject?.region) === null || regionRaw === void 0 ? void 0 : regionRaw
        .toLowerCase()) !== null && regionResolved !== void 0 ? regionResolved : "",
      regionTranslation = translationsMap.get(`${languageSubtag}-${regionSubtag}`),
      languageTranslation = translationsMap.get(languageSubtag);
    return {
      locale: localeObject,
      language: languageSubtag,
      region: regionSubtag,
      primary: regionTranslation,
      secondary: languageTranslation
    }
  }
  exists(translationKey, existsOptions) {
    var translationEntryRef;
    let {
      primary: primaryTranslation,
      secondary: secondaryTranslation
    } = this.getTranslationData((translationEntryRef = existsOptions.lang) !== null && translationEntryRef !== void 0 ? translationEntryRef :
      this.lang());
    return existsOptions = Object.assign({
      includeFallback: !1
    }, existsOptions), !!(primaryTranslation && primaryTranslation[translationKey] || secondaryTranslation && secondaryTranslation[translationKey] || existsOptions.includeFallback && fallbackTranslation && fallbackTranslation[translationKey])
  }
  term(translationKey, ...termArgs) {
    let {
      primary: primaryTranslation,
      secondary: secondaryTranslation
    } = this.getTranslationData(this.lang()), resolvedTerm;
    if (primaryTranslation && primaryTranslation[translationKey]) resolvedTerm = primaryTranslation[translationKey];
    else if (secondaryTranslation && secondaryTranslation[translationKey]) resolvedTerm = secondaryTranslation[translationKey];
    else if (fallbackTranslation && fallbackTranslation[translationKey]) resolvedTerm = fallbackTranslation[translationKey];
    else return console.error(`No translation found for: ${String(translationKey)}`),
      String(translationKey);
    return typeof resolvedTerm == "function" ? resolvedTerm(...termArgs) : resolvedTerm
  }
  date(dateValue, dateFormatOptions) {
    return dateValue = new Date(dateValue), new Intl.DateTimeFormat(this.lang(), dateFormatOptions)
      .format(dateValue)
  }
  number(numberValue, numberFormatOptions) {
    return numberValue = Number(numberValue), isNaN(numberValue) ? "" : new Intl.NumberFormat(this.lang(),
        numberFormatOptions)
      .format(numberValue)
  }
  relativeTime(relativeValue, relativeUnit, relativeFormatOptions) {
    return new Intl.RelativeTimeFormat(this.lang(), relativeFormatOptions)
      .format(relativeValue, relativeUnit)
  }
};
var englishTranslation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (slideNumber, totalSlides) => `Go to slide ${slideNumber} of ${totalSlides}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: selectedOptionCount => selectedOptionCount === 0 ? "No options selected" : selectedOptionCount === 1 ?
    "1 option selected" : `${selectedOptionCount} options selected`,
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: slideNumber => `Slide ${slideNumber}`,
  toggleColorFormat: "Toggle color format"
};
registerTranslation(englishTranslation);
var registeredEnglishTranslation = englishTranslation;
var LocalizeController = class extends LocalizeControllerBase {};
registerTranslation(registeredEnglishTranslation);
var definePropertyEsb = Object.defineProperty,
  defineProperties = Object.defineProperties,
  getOwnPropDescEsb = Object.getOwnPropertyDescriptor,
  getOwnPropDescriptors = Object.getOwnPropertyDescriptors,
  getOwnPropSymbolsEsb = Object.getOwnPropertySymbols,
  hasOwnPropertyEsb = Object.prototype.hasOwnProperty,
  propertyIsEnumerableEsb = Object.prototype.propertyIsEnumerable,
  wellKnownSymbol = (symbolName, symbolValue) => (symbolValue = Symbol[symbolName]) ? symbolValue : Symbol.for("Symbol." + symbolName),
  assignProperty = (assignTarget, assignKey, assignValue) => assignKey in assignTarget ? definePropertyEsb(assignTarget, assignKey, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: assignValue
  }) : assignTarget[assignKey] = assignValue,
  applySpread = (spreadTarget, spreadSource) => {
    for (var spreadKey in spreadSource || (spreadSource = {})) hasOwnPropertyEsb.call(spreadSource, spreadKey) && assignProperty(spreadTarget, spreadKey, spreadSource[spreadKey]);
    if (getOwnPropSymbolsEsb)
      for (var spreadKey of getOwnPropSymbolsEsb(spreadSource)) propertyIsEnumerableEsb.call(spreadSource, spreadKey) && assignProperty(spreadTarget, spreadKey, spreadSource[spreadKey]);
    return spreadTarget
  },
  copyPropDescriptors = (descTarget, descSource) => defineProperties(descTarget, getOwnPropDescriptors(descSource)),
  decorateClass = (decoratorList, decoratorTarget, decoratorKey, decoratorKind) => {
    for (var decoratorDescriptor = decoratorKind > 1 ? void 0 : decoratorKind ? getOwnPropDescEsb(decoratorTarget, decoratorKey) : decoratorTarget, decoratorIndex = decoratorList.length - 1, decoratorFn; decoratorIndex >=
      0; decoratorIndex--)(decoratorFn = decoratorList[decoratorIndex]) && (decoratorDescriptor = (decoratorKind ? decoratorFn(decoratorTarget, decoratorKey, decoratorDescriptor) : decoratorFn(decoratorDescriptor)) || decoratorDescriptor);
    return decoratorKind && decoratorDescriptor && definePropertyEsb(decoratorTarget, decoratorKey, decoratorDescriptor), decoratorDescriptor
  },
  asyncAwaitWrap = function(awaitedValue, isYield) {
    this[0] = awaitedValue, this[1] = isYield
  },
  forAwaitHelper = asyncIterable => {
    var iteratorFn = asyncIterable[wellKnownSymbol("asyncIterator")],
      usingSyncIterator = !1,
      makeIteratorMethod, wrappedIterator = {};
    return iteratorFn == null ? (iteratorFn = asyncIterable[wellKnownSymbol("iterator")](), makeIteratorMethod = iteratorMethodName => wrappedIterator[iteratorMethodName] = iteratorMethodArg => iteratorFn[iteratorMethodName](iteratorMethodArg)) :
      (iteratorFn = iteratorFn.call(asyncIterable), makeIteratorMethod = asyncMethodName => wrappedIterator[asyncMethodName] = asyncMethodArg => {
        if (usingSyncIterator) {
          if (usingSyncIterator = !1, asyncMethodName === "throw") throw asyncMethodArg;
          return asyncMethodArg
        }
        return usingSyncIterator = !0, {
          done: !1,
          value: new asyncAwaitWrap(new Promise(resolveSettled => {
            var iterationResult = iteratorFn[asyncMethodName](asyncMethodArg);
            if (!(iterationResult instanceof Object)) throw TypeError(
              "Object expected");
            resolveSettled(iterationResult)
          }), 1)
        }
      }), wrappedIterator[wellKnownSymbol("iterator")] = () => wrappedIterator, makeIteratorMethod("next"), "throw" in iteratorFn ? makeIteratorMethod("throw") : wrappedIterator
      .throw = throwValue => {
        throw throwValue
      }, "return" in iteratorFn && makeIteratorMethod("return"), wrappedIterator
  };
var standardPropertyOptions = {
    attribute: !0,
    type: String,
    converter: defaultConverter,
    reflect: !1,
    hasChanged: valueHasChanged
  },
  makePropertyDecorator = (propertyOptions = standardPropertyOptions, decoratedMember, decoratorContext) => {
    let {
      kind: decoratorKind,
      metadata: decoratorMetadata
    } = decoratorContext, metadataProperties = globalThis.litPropertyMetadata.get(decoratorMetadata);
    if (metadataProperties === void 0 && globalThis.litPropertyMetadata.set(decoratorMetadata, metadataProperties = new Map), metadataProperties
      .set(decoratorContext.name, propertyOptions), decoratorKind === "accessor") {
      let {
        name: propertyName
      } = decoratorContext;
      return {
        set(newAccessorValue) {
          let oldAccessorValue = decoratedMember.get.call(this);
          decoratedMember.set.call(this, newAccessorValue), this.requestUpdate(propertyName, oldAccessorValue, propertyOptions)
        },
        init(initialFieldValue) {
          return initialFieldValue !== void 0 && this.P(propertyName, void 0, propertyOptions), initialFieldValue
        }
      }
    }
    if (decoratorKind === "setter") {
      let {
        name: setterPropName
      } = decoratorContext;
      return function(newSetterValue) {
        let oldSetterValue = this[setterPropName];
        decoratedMember.call(this, newSetterValue), this.requestUpdate(setterPropName, oldSetterValue, propertyOptions)
      }
    }
    throw Error("Unsupported decorator location: " + decoratorKind)
  };

function property(propertyDeclaration) {
  return (decoratorTargetOrProto, decoratorContextOrKey) => typeof decoratorContextOrKey == "object" ? makePropertyDecorator(propertyDeclaration, decoratorTargetOrProto, decoratorContextOrKey) : ((legacyProto, legacyPropKey, legacyDescriptor) => {
    let alreadyHasDescriptor = legacyPropKey.hasOwnProperty(legacyDescriptor);
    return legacyPropKey.constructor.createProperty(legacyDescriptor, alreadyHasDescriptor ? {
      ...legacyProto,
      wrapped: !0
    } : legacyProto), alreadyHasDescriptor ? Object.getOwnPropertyDescriptor(legacyPropKey, legacyDescriptor) : void 0
  })(propertyDeclaration, decoratorTargetOrProto, decoratorContextOrKey)
}

function stateDecorator(stateOptions) {
  return property({
    ...stateOptions,
    state: !0,
    attribute: !1
  })
}
var defineReactiveDescriptor = (descTargetProto, descPropName, descObject) => (descObject.configurable = !0, descObject.enumerable = !0, Reflect
  .decorate && typeof descPropName != "object" && Object.defineProperty(descTargetProto, descPropName, descObject), descObject);

function queryDecorator(querySelectorString, cacheQueryResult) {
  return (queryTargetProto, queryPropKey, queryDescriptor) => {
    let queryGetter = queryHostElement => queryHostElement.renderRoot?.querySelector(querySelectorString) ?? null;
    if (cacheQueryResult) {
      let {
        get: queryGetterFn,
        set: querySetterFn
      } = typeof queryPropKey == "object" ? queryTargetProto : queryDescriptor ?? (() => {
        let cachedResultSymbol = Symbol();
        return {
          get() {
            return this[cachedResultSymbol]
          },
          set(queryCacheValue) {
            this[cachedResultSymbol] = queryCacheValue
          }
        }
      })();
      return defineReactiveDescriptor(queryTargetProto, queryPropKey, {
        get() {
          let queryResult = queryGetterFn.call(this);
          return queryResult === void 0 && (queryResult = queryGetter(this), (queryResult !== null || this
            .hasUpdated) && querySetterFn.call(this, queryResult)), queryResult
        }
      })
    }
    return defineReactiveDescriptor(queryTargetProto, queryPropKey, {
      get() {
        return queryGetter(this)
      }
    })
  }
}
var ShoelaceElement = class extends LitElement {
  constructor() {
    super(), Object.entries(this.constructor.dependencies)
      .forEach(([entryKey, entryValue]) => {
        this.constructor.define(entryKey, entryValue)
      })
  }
  emit(eventName, eventOptions) {
    let customEvent = new CustomEvent(eventName, applySpread({
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      detail: {}
    }, eventOptions));
    return this.dispatchEvent(customEvent), customEvent
  }
  static define(tagName, elementClass = this, defineOptions = {}) {
    let existingRegistration = customElements.get(tagName);
    if (!existingRegistration) {
      customElements.define(tagName, class extends elementClass {}, defineOptions);
      return
    }
    let versionSuffix = " (unknown version)",
      conflictVersionInfo = versionSuffix;
    "version" in elementClass && elementClass.version && (versionSuffix = " v" + elementClass.version), "version" in existingRegistration &&
      existingRegistration.version && (conflictVersionInfo = " v" + existingRegistration.version), !(versionSuffix && conflictVersionInfo && versionSuffix === conflictVersionInfo) && console
      .warn(
        `Attempted to register <${tagName}>${versionSuffix}, but <${tagName}>${conflictVersionInfo} has already been registered.`
        )
  }
};
ShoelaceElement.version = "2.13.1";
ShoelaceElement.dependencies = {};
decorateClass([property()], ShoelaceElement.prototype, "dir", 2);
decorateClass([property()], ShoelaceElement.prototype, "lang", 2);
var SpinnerElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.localize = new LocalizeController(this)
  }
  render() {
    return htmlTag`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `
  }
};
SpinnerElement.styles = formControlHostStyles;
var formCollectionsMap = new WeakMap,
  reportValidityOverrides = new WeakMap,
  checkValidityOverrides = new WeakMap,
  userInteractedElements = new WeakSet,
  interactionTrackers = new WeakMap,
  FormControlController = class {
    constructor(hostElement, controllerOptions) {
      this.handleFormData = formDataEvent => {
          let isDisabled = this.options.disabled(this.host),
            fieldName = this.options.name(this.host),
            fieldValue = this.options.value(this.host),
            isButtonElement = this.host.tagName.toLowerCase() === "sl-button";
          this.host.isConnected && !isDisabled && !isButtonElement && typeof fieldName == "string" && fieldName
            .length > 0 && typeof fieldValue < "u" && (Array.isArray(fieldValue) ? fieldValue.forEach(
              valueEntry => {
                formDataEvent.formData.append(fieldName, valueEntry.toString())
              }) : formDataEvent.formData.append(fieldName, fieldValue.toString()))
        }, this.handleFormSubmit = submitEvent => {
          var formControlList;
          let isDisabledOnSubmit = this.options.disabled(this.host),
            reportValidityFn = this.options.reportValidity;
          this.form && !this.form.noValidate && ((formControlList = formCollectionsMap.get(this.form)) ==
              null || formControlList.forEach(formControlItem => {
                this.setUserInteracted(formControlItem, !0)
              })), this.form && !this.form.noValidate && !isDisabledOnSubmit && !reportValidityFn(this
            .host) && (submitEvent.preventDefault(), submitEvent.stopImmediatePropagation())
        }, this.handleFormReset = () => {
          this.options.setValue(this.host, this.options.defaultValue(this
            .host)), this.setUserInteracted(this.host, !1), interactionTrackers.set(this
            .host, [])
        }, this.handleInteraction = interactionEvent => {
          let interactionState = interactionTrackers.get(this.host);
          interactionState.includes(interactionEvent.type) || interactionState.push(interactionEvent.type), interactionState.length === this.options
            .assumeInteractionOn.length && this.setUserInteracted(this.host, !
              0)
        }, this.checkFormValidity = () => {
          if (this.form && !this.form.noValidate) {
            let formElements = this.form.querySelectorAll("*");
            for (let formElementItem of formElements)
              if (typeof formElementItem.checkValidity == "function" && !formElementItem.checkValidity())
                return !1
          }
          return !0
        }, this.reportFormValidity = () => {
          if (this.form && !this.form.noValidate) {
            let formElements = this.form.querySelectorAll("*");
            for (let formElementItem of formElements)
              if (typeof formElementItem.reportValidity == "function" && !formElementItem
              .reportValidity()) return !1
          }
          return !0
        }, (this.host = hostElement)
        .addController(this), this.options = applySpread({
          form: controlElement => {
            let formIdAttribute = controlElement.form;
            if (formIdAttribute) {
              let controlRootNode = controlElement.getRootNode()
                .getElementById(formIdAttribute);
              if (controlRootNode) return controlRootNode
            }
            return controlElement.closest("form")
          },
          name: controlElement => controlElement.name,
          value: controlElement => controlElement.value,
          defaultValue: controlElement => controlElement.defaultValue,
          disabled: controlElement => {
            var disabledLookup;
            return (disabledLookup = controlElement.disabled) != null ? disabledLookup : !1
          },
          reportValidity: controlElement => typeof controlElement.reportValidity == "function" ? controlElement
            .reportValidity() : !0,
          checkValidity: controlElement => typeof controlElement.checkValidity == "function" ? controlElement
            .checkValidity() : !0,
          setValue: (controlElement, newControlValue) => controlElement.value = newControlValue,
          assumeInteractionOn: ["sl-input"]
        }, controllerOptions)
    }
    hostConnected() {
      let attachedForm = this.options.form(this.host);
      attachedForm && this.attachForm(attachedForm), interactionTrackers.set(this.host, []), this.options
        .assumeInteractionOn.forEach(interactionEventName => {
          this.host.addEventListener(interactionEventName, this.handleInteraction)
        })
    }
    hostDisconnected() {
      this.detachForm(), interactionTrackers.delete(this.host), this.options
        .assumeInteractionOn.forEach(interactionEventName => {
          this.host.removeEventListener(interactionEventName, this.handleInteraction)
        })
    }
    hostUpdated() {
      let attachedForm = this.options.form(this.host);
      attachedForm || this.detachForm(), attachedForm && this.form !== attachedForm && (this.detachForm(), this
        .attachForm(attachedForm)), this.host.hasUpdated && this.setValidity(this.host
        .validity.valid)
    }
    attachForm(formToAttach) {
      formToAttach ? (this.form = formToAttach, formCollectionsMap.has(this.form) ? formCollectionsMap.get(this.form)
          .add(this.host) : formCollectionsMap.set(this.form, new Set([this.host])), this.form
          .addEventListener("formdata", this.handleFormData), this.form
          .addEventListener("submit", this.handleFormSubmit), this.form
          .addEventListener("reset", this.handleFormReset), reportValidityOverrides.has(this
          .form) || (reportValidityOverrides.set(this.form, this.form.reportValidity), this.form
            .reportValidity = () => this.reportFormValidity()), checkValidityOverrides.has(this
            .form) || (checkValidityOverrides.set(this.form, this.form.checkValidity), this.form
            .checkValidity = () => this.checkFormValidity())) : this.form =
        void 0
    }
    detachForm() {
      if (!this.form) return;
      let formControlsSet = formCollectionsMap.get(this.form);
      formControlsSet && (formControlsSet.delete(this.host), formControlsSet.size <= 0 && (this.form
        .removeEventListener("formdata", this.handleFormData), this.form
        .removeEventListener("submit", this.handleFormSubmit), this.form
        .removeEventListener("reset", this.handleFormReset), reportValidityOverrides.has(this
          .form) && (this.form.reportValidity = reportValidityOverrides.get(this.form), reportValidityOverrides
          .delete(this.form)), checkValidityOverrides.has(this.form) && (this.form
          .checkValidity = checkValidityOverrides.get(this.form), checkValidityOverrides.delete(this.form)), this
        .form = void 0))
    }
    setUserInteracted(controlElement, interactedFlag) {
      interactedFlag ? userInteractedElements.add(controlElement) : userInteractedElements.delete(controlElement), controlElement.requestUpdate()
    }
    doAction(formAction, submitterElement) {
      if (this.form) {
        let hiddenSubmitButton = document.createElement("button");
        hiddenSubmitButton.type = formAction, hiddenSubmitButton.style.position = "absolute", hiddenSubmitButton.style.width = "0", hiddenSubmitButton
          .style.height = "0", hiddenSubmitButton.style.clipPath = "inset(50%)", hiddenSubmitButton.style
          .overflow = "hidden", hiddenSubmitButton.style.whiteSpace = "nowrap", submitterElement && (hiddenSubmitButton.name =
            submitterElement.name, hiddenSubmitButton.value = submitterElement.value, ["formaction", "formenctype",
              "formmethod", "formnovalidate", "formtarget"
            ].forEach(attributePair => {
              submitterElement.hasAttribute(attributePair) && hiddenSubmitButton.setAttribute(attributePair, submitterElement.getAttribute(attributePair))
            })), this.form.append(hiddenSubmitButton), hiddenSubmitButton.click(), hiddenSubmitButton.remove()
      }
    }
    getForm() {
      var clonedSubmitButton;
      return (clonedSubmitButton = this.form) != null ? clonedSubmitButton : null
    }
    reset(resetSubmitter) {
      this.doAction("reset", resetSubmitter)
    }
    submit(submitSubmitter) {
      this.doAction("submit", submitSubmitter)
    }
    setValidity(isValid) {
      let hostElement = this.host,
        hasInteracted = !!userInteractedElements.has(hostElement),
        isRequired = !!hostElement.required;
      hostElement.toggleAttribute("data-required", isRequired), hostElement.toggleAttribute(
          "data-optional", !isRequired), hostElement.toggleAttribute("data-invalid", !isValid), hostElement
        .toggleAttribute("data-valid", isValid), hostElement.toggleAttribute(
          "data-user-invalid", !isValid && hasInteracted), hostElement.toggleAttribute("data-user-valid",
          isValid && hasInteracted)
    }
    updateValidity() {
      let hostElement = this.host;
      this.setValidity(hostElement.validity.valid)
    }
    emitInvalidEvent(sourceEvent) {
      let invalidEvent = new CustomEvent("sl-invalid", {
        bubbles: !1,
        composed: !1,
        cancelable: !0,
        detail: {}
      });
      sourceEvent || invalidEvent.preventDefault(), this.host.dispatchEvent(invalidEvent) || sourceEvent
        ?.preventDefault()
    }
  },
  baseFormControlOptions = Object.freeze({
    badInput: !1,
    customError: !1,
    patternMismatch: !1,
    rangeOverflow: !1,
    rangeUnderflow: !1,
    stepMismatch: !1,
    tooLong: !1,
    tooShort: !1,
    typeMismatch: !1,
    valid: !0,
    valueMissing: !1
  }),
  formControlOptionsVariantA = Object.freeze(copyPropDescriptors(applySpread({}, baseFormControlOptions), {
    valid: !1,
    valueMissing: !0
  })),
  formControlOptionsVariantB = Object.freeze(copyPropDescriptors(applySpread({}, baseFormControlOptions), {
    valid: !1,
    customError: !0
  }));
var componentStyles1 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;
var SlotController = class {
  constructor(slotHostElement, ...slotNamesInit) {
    this.slotNames = [], this.handleSlotChange = slotChangeEvent => {
        let slotElement = slotChangeEvent.target;
        (this.slotNames.includes("[default]") && !slotElement.name || slotElement.name && this
          .slotNames.includes(slotElement.name)) && this.host.requestUpdate()
      }, (this.host = slotHostElement)
      .addController(this), this.slotNames = slotNamesInit
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some(childNode => {
      if (childNode.nodeType === childNode.TEXT_NODE && childNode.textContent.trim() !== "")
        return !0;
      if (childNode.nodeType === childNode.ELEMENT_NODE) {
        let nodeToCheck = childNode;
        if (nodeToCheck.tagName.toLowerCase() === "sl-visually-hidden") return !1;
        if (!nodeToCheck.hasAttribute("slot")) return !0
      }
      return !1
    })
  }
  hasNamedSlot(slotName) {
    return this.host.querySelector(`:scope > [slot="${slotName}"]`) !== null
  }
  test(mutationRecords) {
    return mutationRecords === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(mutationRecords)
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this
      .handleSlotChange)
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this
      .handleSlotChange)
  }
};

function getSlotTextContent(slotElement) {
  if (!slotElement) return "";
  let assignedNodes = slotElement.assignedNodes({
      flatten: !0
    }),
    collectedText = "";
  return [...assignedNodes].forEach(assignedNode => {
    assignedNode.nodeType === Node.TEXT_NODE && (collectedText += assignedNode.textContent)
  }), collectedText
}
var shoelaceBasePath = "";

function setBasePath(basePathValue) {
  shoelaceBasePath = basePathValue
}

function getBasePath(subPath = "") {
  if (!shoelaceBasePath) {
    let scriptElements = [...document.getElementsByTagName("script")],
      shoelaceScriptTag = scriptElements.find(scriptTag => scriptTag.hasAttribute("data-shoelace"));
    if (shoelaceScriptTag) setBasePath(shoelaceScriptTag.getAttribute("data-shoelace"));
    else {
      let matchedScriptTag = scriptElements.find(candidateScriptTag => /shoelace(\.min)?\.js($|\?)/.test(candidateScriptTag.src) ||
          /shoelace-autoloader(\.min)?\.js($|\?)/.test(candidateScriptTag.src)),
        detectedBasePath = "";
      matchedScriptTag && (detectedBasePath = matchedScriptTag.getAttribute("src")), setBasePath(detectedBasePath.split("/")
        .slice(0, -1)
        .join("/"))
    }
  }
  return shoelaceBasePath.replace(/\/$/, "") + (subPath ? `/${subPath.replace(/^\//,"")}` : "")
}
var defaultIconLibraryConfig = {
    name: "default",
    resolver: iconName => getBasePath(`assets/icons/${iconName}.svg`)
  },
  defaultIconLibraryRef = defaultIconLibraryConfig;
var systemIconDefinitions = {
    caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
    check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
    "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
    eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
    "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
    eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
    "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
    indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
    "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
    "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
    radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
    "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
    "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
    "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
  },
  systemIconLibraryConfig = {
    name: "system",
    resolver: iconName => iconName in systemIconDefinitions ?
      `data:image/svg+xml,${encodeURIComponent(systemIconDefinitions[iconName])}` : ""
  },
  systemIconLibraryRef = systemIconLibraryConfig;
var registeredIconLibraries = [defaultIconLibraryRef, systemIconLibraryRef],
  iconWatchers = [];

function registerIconWatcher(iconElement) {
  iconWatchers.push(iconElement)
}

function unregisterIconWatcher(iconElement) {
  iconWatchers = iconWatchers.filter(watcherElement => watcherElement !== iconElement)
}

function getIconLibrary(libraryName) {
  return registeredIconLibraries.find(iconLibrary => iconLibrary.name === libraryName)
}
var componentStyles2 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

function watchDecorator(watchedPropertyNames, watchOptions) {
  let resolvedWatchOptions = applySpread({
    waitUntilFirstUpdate: !1
  }, watchOptions);
  return (decoratorProto, decoratorPropName) => {
    let {
      update: originalUpdateMethod
    } = decoratorProto, watchedPropList = Array.isArray(watchedPropertyNames) ? watchedPropertyNames : [watchedPropertyNames];
    decoratorProto.update = function(changedPropsMap) {
      watchedPropList.forEach(watchedPropName => {
        let propKeyToWatch = watchedPropName;
        if (changedPropsMap.has(propKeyToWatch)) {
          let oldWatchedValue = changedPropsMap.get(propKeyToWatch),
            newWatchedValue = this[propKeyToWatch];
          oldWatchedValue !== newWatchedValue && (!resolvedWatchOptions.waitUntilFirstUpdate || this.hasUpdated) &&
            this[decoratorPropName](oldWatchedValue, newWatchedValue)
        }
      }), originalUpdateMethod.call(this, changedPropsMap)
    }
  }
}
var {
  I: watchInternalExport
} = internalLitHtmlApi;
var isTemplateResult = (candidateResult, expectedResultType) => expectedResultType === void 0 ? candidateResult?._$litType$ !== void 0 : candidateResult?._$litType$ ===
expectedResultType;
var isCompiledTemplateResult = candidateResult => candidateResult.strings === void 0;
var noopPartMarker = {},
  setChildPartValue = (childPart, childPartValue = noopPartMarker) => childPart._$AH = childPartValue;
var iconStateSymbolA = Symbol(),
  iconStateSymbolB = Symbol(),
  domParserInstance, iconCache = new Map,
  IconElement = class extends ShoelaceElement {
    constructor() {
      super(...arguments), this.initialRender = !1, this.svg = null, this
        .label = "", this.library = "default"
    }
    async resolveIcon(iconUrl, iconLibrary) {
      var fetchResult;
      let svgText;
      if (iconLibrary?.spriteSheet) return htmlTag`<svg part="svg">
        <use part="use" href="${iconUrl}"></use>
      </svg>`;
      try {
        if (svgText = await fetch(iconUrl, {
            mode: "cors"
          }), !svgText.ok) return svgText.status === 410 ? iconStateSymbolA : iconStateSymbolB
      } catch {
        return iconStateSymbolB
      }
      try {
        let wrapperDiv = document.createElement("div");
        wrapperDiv.innerHTML = await svgText.text();
        let svgElement = wrapperDiv.firstElementChild;
        if (((fetchResult = svgElement?.tagName) == null ? void 0 : fetchResult.toLowerCase()) !== "svg")
          return iconStateSymbolA;
        domParserInstance || (domParserInstance = new DOMParser);
        let parsedIconDocument = domParserInstance.parseFromString(svgElement.outerHTML, "text/html")
          .body.querySelector("svg");
        return parsedIconDocument ? (parsedIconDocument.part.add("svg"), document.adoptNode(parsedIconDocument)) : iconStateSymbolA
      } catch {
        return iconStateSymbolA
      }
    }
    connectedCallback() {
      super.connectedCallback(), registerIconWatcher(this)
    }
    firstUpdated() {
      this.initialRender = !0, this.setIcon()
    }
    disconnectedCallback() {
      super.disconnectedCallback(), unregisterIconWatcher(this)
    }
    getIconSource() {
      let iconLibrary = getIconLibrary(this.library);
      return this.name && iconLibrary ? {
        url: iconLibrary.resolver(this.name),
        fromLibrary: !0
      } : {
        url: this.src,
        fromLibrary: !1
      }
    }
    handleLabelChange() {
      typeof this.label == "string" && this.label.length > 0 ? (this
        .setAttribute("role", "img"), this.setAttribute("aria-label", this
          .label), this.removeAttribute("aria-hidden")) : (this
        .removeAttribute("role"), this.removeAttribute("aria-label"), this
        .setAttribute("aria-hidden", "true"))
    }
    async setIcon() {
      var previousIconSource;
      let {
        url: iconSourceUrl,
        fromLibrary: iconFromLibrary
      } = this.getIconSource(), resolvedIconLibrary = iconFromLibrary ? getIconLibrary(this.library) : void 0;
      if (!iconSourceUrl) {
        this.svg = null;
        return
      }
      let cachedIconRequest = iconCache.get(iconSourceUrl);
      if (cachedIconRequest || (cachedIconRequest = this.resolveIcon(iconSourceUrl, resolvedIconLibrary), iconCache.set(iconSourceUrl, cachedIconRequest)), !this
        .initialRender) return;
      let iconSvgContent = await cachedIconRequest;
      if (iconSvgContent === iconStateSymbolB && iconCache.delete(iconSourceUrl), iconSourceUrl === this.getIconSource()
        .url) {
        if (isTemplateResult(iconSvgContent)) {
          this.svg = iconSvgContent;
          return
        }
        switch (iconSvgContent) {
          case iconStateSymbolB:
          case iconStateSymbolA:
            this.svg = null, this.emit("sl-error");
            break;
          default:
            this.svg = iconSvgContent.cloneNode(!0), (previousIconSource = resolvedIconLibrary?.mutator) == null || previousIconSource.call(resolvedIconLibrary,
              this.svg), this.emit("sl-load")
        }
      }
    }
    render() {
      return this.svg
    }
  };
IconElement.styles = componentStyles2;
decorateClass([stateDecorator()], IconElement.prototype, "svg", 2);
decorateClass([property({
  reflect: !0
})], IconElement.prototype, "name", 2);
decorateClass([property()], IconElement.prototype, "src", 2);
decorateClass([property()], IconElement.prototype, "label", 2);
decorateClass([property({
  reflect: !0
})], IconElement.prototype, "library", 2);
decorateClass([watchDecorator("label")], IconElement.prototype, "handleLabelChange", 1);
decorateClass([watchDecorator(["name", "src", "library"])], IconElement.prototype, "setIcon", 1);
var partTypeConstants = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
  },
  makeDirective = directiveClass => (...directiveArgs) => ({
    _$litDirective$: directiveClass,
    values: directiveArgs
  }),
  DirectiveBase = class {
    constructor(partInfo) {}
    get _$AU() {
      return this._$AM._$AU
    }
    _$AT(directivePart, directiveParent, directiveAttrIndex) {
      this._$Ct = directivePart, this._$AM = directiveParent, this._$Ci = directiveAttrIndex
    }
    _$AS(directivePart, directiveProps) {
      return this.update(directivePart, directiveProps)
    }
    update(directivePart, directiveProps) {
      return this.render(...directiveProps)
    }
  };
var classMap = makeDirective(class extends DirectiveBase {
  constructor(partInfo) {
    if (super(partInfo), partInfo.type !== partTypeConstants.ATTRIBUTE || partInfo.name !== "class" || partInfo
      .strings?.length > 2) throw Error(
      "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
      )
  }
  render(classInfo) {
    return " " + Object.keys(classInfo)
      .filter(className => classInfo[className])
      .join(" ") + " "
  }
  update(classAttributePart, [classInfo]) {
    if (this.st === void 0) {
      this.st = new Set, classAttributePart.strings !== void 0 && (this.nt = new Set(classAttributePart
        .strings.join(" ")
        .split(/\s/)
        .filter(className => className !== "")));
      for (let activeClassName in classInfo) classInfo[activeClassName] && !this.nt?.has(activeClassName) && this.st.add(activeClassName);
      return this.render(classInfo)
    }
    let elementClassList = classAttributePart.element.classList;
    for (let previousClassName of this.st) previousClassName in classInfo || (elementClassList.remove(previousClassName), this.st.delete(previousClassName));
    for (let classNameKey in classInfo) {
      let shouldApplyClass = !!classInfo[classNameKey];
      shouldApplyClass === this.st.has(classNameKey) || this.nt?.has(classNameKey) || (shouldApplyClass ? (elementClassList.add(classNameKey), this.st
        .add(classNameKey)) : (elementClassList.remove(classNameKey), this.st.delete(classNameKey)))
    }
    return noChange
  }
});
var staticValueBrand = Symbol.for(""),
  getStaticValue = staticValue => {
    if (staticValue?.r === staticValueBrand) return staticValue?._$litStatic$
  };
var staticLiteral = (literalStrings, ...literalValues) => ({
    _$litStatic$: literalValues.reduce((accumulatedLiteral, literalValue, literalIndex) => accumulatedLiteral + (literalStringPart => {
      if (literalStringPart._$litStatic$ !== void 0) return literalStringPart._$litStatic$;
      throw Error(`Value passed to 'literal' function must be a 'literal' result: ${literalStringPart}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)
    })(literalValue) + literalStrings[literalIndex + 1], literalStrings[0]),
    r: staticValueBrand
  }),
  staticTemplateCache = new Map,
  withStatic = underlyingTag => (staticTagStrings, ...staticTagValues) => {
    let valueCount = staticTagValues.length,
      staticValueHolder, dynamicValueHolder, mergedStrings = [],
      mergedValues = [],
      currentStaticString, mergedStringIndex = 0,
      hasStaticValues = !1;
    for (; mergedStringIndex < valueCount;) {
      for (currentStaticString = staticTagStrings[mergedStringIndex]; mergedStringIndex < valueCount && (dynamicValueHolder = staticTagValues[mergedStringIndex], (staticValueHolder = getStaticValue(dynamicValueHolder)) !== void 0);) currentStaticString += staticValueHolder + staticTagStrings[++
        mergedStringIndex], hasStaticValues = !0;
      mergedStringIndex !== valueCount && mergedValues.push(dynamicValueHolder), mergedStrings.push(currentStaticString), mergedStringIndex++
    }
    if (mergedStringIndex === valueCount && mergedStrings.push(staticTagStrings[valueCount]), hasStaticValues) {
      let staticCacheKey = mergedStrings.join("$$lit$$");
      (staticTagStrings = staticTemplateCache.get(staticCacheKey)) === void 0 && (mergedStrings.raw = mergedStrings, staticTemplateCache.set(staticCacheKey, staticTagStrings = mergedStrings)), staticTagValues = mergedValues
    }
    return underlyingTag(staticTagStrings, ...staticTagValues)
  },
  staticHtmlTag = withStatic(htmlTag),
  staticSvgTag = withStatic(svgTag);
var ifDefined = maybeDefinedValue => maybeDefinedValue ?? nothing;
var ButtonElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.formControlController = new FormControlController(this, {
        assumeInteractionOn: ["click"]
      }), this.hasSlotController = new SlotController(this, "[default]", "prefix",
        "suffix"), this.localize = new LocalizeController(this), this.hasFocus = !1, this
      .invalid = !1, this.title = "", this.variant = "default", this.size =
      "medium", this.caret = !1, this.disabled = !1, this.loading = !1, this
      .outline = !1, this.pill = !1, this.circle = !1, this.type = "button",
      this.name = "", this.value = "", this.href = "", this.rel =
      "noreferrer noopener"
  }
  get validity() {
    return this.isButton() ? this.button.validity : baseFormControlOptions
  }
  get validationMessage() {
    return this.isButton() ? this.button.validationMessage : ""
  }
  firstUpdated() {
    this.isButton() && this.formControlController.updateValidity()
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur")
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus")
  }
  handleClick() {
    this.type === "submit" && this.formControlController.submit(this), this
      .type === "reset" && this.formControlController.reset(this)
  }
  handleInvalid(invalidEvent) {
    this.formControlController.setValidity(!1), this.formControlController
      .emitInvalidEvent(invalidEvent)
  }
  isButton() {
    return !this.href
  }
  isLink() {
    return !!this.href
  }
  handleDisabledChange() {
    this.isButton() && this.formControlController.setValidity(this.disabled)
  }
  click() {
    this.button.click()
  }
  focus(focusOptions) {
    this.button.focus(focusOptions)
  }
  blur() {
    this.button.blur()
  }
  checkValidity() {
    return this.isButton() ? this.button.checkValidity() : !0
  }
  getForm() {
    return this.formControlController.getForm()
  }
  reportValidity() {
    return this.isButton() ? this.button.reportValidity() : !0
  }
  setCustomValidity(validationMessage) {
    this.isButton() && (this.button.setCustomValidity(validationMessage), this
      .formControlController.updateValidity())
  }
  render() {
    let renderAsLink = this.isLink(),
      buttonTagLiteral = renderAsLink ? staticLiteral`a` : staticLiteral`button`;
    return staticHtmlTag`
      <${buttonTagLiteral}
        part="base"
        class=${classMap({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${ifDefined(renderAsLink?void 0:this.disabled)}
        type=${ifDefined(renderAsLink?void 0:this.type)}
        title=${this.title}
        name=${ifDefined(renderAsLink?void 0:this.name)}
        value=${ifDefined(renderAsLink?void 0:this.value)}
        href=${ifDefined(renderAsLink?this.href:void 0)}
        target=${ifDefined(renderAsLink?this.target:void 0)}
        download=${ifDefined(renderAsLink?this.download:void 0)}
        rel=${ifDefined(renderAsLink?this.rel:void 0)}
        role=${ifDefined(renderAsLink?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?staticHtmlTag` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?staticHtmlTag`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${buttonTagLiteral}>
    `
  }
};
ButtonElement.styles = componentStyles1;
ButtonElement.dependencies = {
  "sl-icon": IconElement,
  "sl-spinner": SpinnerElement
};
decorateClass([queryDecorator(".button")], ButtonElement.prototype, "button", 2);
decorateClass([stateDecorator()], ButtonElement.prototype, "hasFocus", 2);
decorateClass([stateDecorator()], ButtonElement.prototype, "invalid", 2);
decorateClass([property()], ButtonElement.prototype, "title", 2);
decorateClass([property({
  reflect: !0
})], ButtonElement.prototype, "variant", 2);
decorateClass([property({
  reflect: !0
})], ButtonElement.prototype, "size", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], ButtonElement.prototype, "caret", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], ButtonElement.prototype, "disabled", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], ButtonElement.prototype, "loading", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], ButtonElement.prototype, "outline", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], ButtonElement.prototype, "pill", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], ButtonElement.prototype, "circle", 2);
decorateClass([property()], ButtonElement.prototype, "type", 2);
decorateClass([property()], ButtonElement.prototype, "name", 2);
decorateClass([property()], ButtonElement.prototype, "value", 2);
decorateClass([property()], ButtonElement.prototype, "href", 2);
decorateClass([property()], ButtonElement.prototype, "target", 2);
decorateClass([property()], ButtonElement.prototype, "rel", 2);
decorateClass([property()], ButtonElement.prototype, "download", 2);
decorateClass([property()], ButtonElement.prototype, "form", 2);
decorateClass([property({
  attribute: "formaction"
})], ButtonElement.prototype, "formAction", 2);
decorateClass([property({
  attribute: "formenctype"
})], ButtonElement.prototype, "formEnctype", 2);
decorateClass([property({
  attribute: "formmethod"
})], ButtonElement.prototype, "formMethod", 2);
decorateClass([property({
  attribute: "formnovalidate",
  type: Boolean
})], ButtonElement.prototype, "formNoValidate", 2);
decorateClass([property({
  attribute: "formtarget"
})], ButtonElement.prototype, "formTarget", 2);
decorateClass([watchDecorator("disabled", {
  waitUntilFirstUpdate: !0
})], ButtonElement.prototype, "handleDisabledChange", 1);
ButtonElement.define("sl-button");
var componentStyles3 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;
var ButtonGroupElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.disableRole = !1, this.label = ""
  }
  handleFocus(focusEvent) {
    let focusedButton = findInnerButton(focusEvent.target);
    focusedButton?.classList.add("sl-button-group__button--focus")
  }
  handleBlur(blurEvent) {
    let blurredButton = findInnerButton(blurEvent.target);
    blurredButton?.classList.remove("sl-button-group__button--focus")
  }
  handleMouseOver(mouseOverEvent) {
    let hoveredButton = findInnerButton(mouseOverEvent.target);
    hoveredButton?.classList.add("sl-button-group__button--hover")
  }
  handleMouseOut(mouseOutEvent) {
    let mouseOutButton = findInnerButton(mouseOutEvent.target);
    mouseOutButton?.classList.remove("sl-button-group__button--hover")
  }
  handleSlotChange() {
    let slottedButtons = [...this.defaultSlot.assignedElements({
      flatten: !0
    })];
    slottedButtons.forEach(buttonElement => {
      let buttonIndex = slottedButtons.indexOf(buttonElement),
        innerButton = findInnerButton(buttonElement);
      innerButton && (innerButton.classList.add("sl-button-group__button"), innerButton.classList
        .toggle("sl-button-group__button--first", buttonIndex === 0), innerButton
        .classList.toggle("sl-button-group__button--inner", buttonIndex > 0 &&
          buttonIndex < slottedButtons.length - 1), innerButton.classList.toggle(
          "sl-button-group__button--last", buttonIndex === slottedButtons.length - 1), innerButton
        .classList.toggle("sl-button-group__button--radio", innerButton.tagName
          .toLowerCase() === "sl-radio-button"))
    })
  }
  render() {
    return htmlTag`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `
  }
};
ButtonGroupElement.styles = componentStyles3;
decorateClass([queryDecorator("slot")], ButtonGroupElement.prototype, "defaultSlot", 2);
decorateClass([stateDecorator()], ButtonGroupElement.prototype, "disableRole", 2);
decorateClass([property()], ButtonGroupElement.prototype, "label", 2);

function findInnerButton(buttonHost) {
  var shadowButton;
  let buttonSelector = "sl-button, sl-radio-button";
  return (shadowButton = buttonHost.closest(buttonSelector)) != null ? shadowButton : buttonHost.querySelector(buttonSelector)
}
ButtonGroupElement.define("sl-button-group");
IconElement.define("sl-icon");
var componentStyles4 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;
var IconButtonElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.hasFocus = !1, this.label = "", this
      .disabled = !1
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur")
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus")
  }
  handleClick(clickEvent) {
    this.disabled && (clickEvent.preventDefault(), clickEvent.stopPropagation())
  }
  click() {
    this.button.click()
  }
  focus(focusOptions) {
    this.button.focus(focusOptions)
  }
  blur() {
    this.button.blur()
  }
  render() {
    let renderAsLink = !!this.href,
      iconButtonTag = renderAsLink ? staticLiteral`a` : staticLiteral`button`;
    return staticHtmlTag`
      <${iconButtonTag}
        part="base"
        class=${classMap({"icon-button":!0,"icon-button--disabled":!renderAsLink&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${ifDefined(renderAsLink?void 0:this.disabled)}
        type=${ifDefined(renderAsLink?void 0:"button")}
        href=${ifDefined(renderAsLink?this.href:void 0)}
        target=${ifDefined(renderAsLink?this.target:void 0)}
        download=${ifDefined(renderAsLink?this.download:void 0)}
        rel=${ifDefined(renderAsLink&&this.target?"noreferrer noopener":void 0)}
        role=${ifDefined(renderAsLink?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${ifDefined(this.name)}
          library=${ifDefined(this.library)}
          src=${ifDefined(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${iconButtonTag}>
    `
  }
};
IconButtonElement.styles = componentStyles4;
IconButtonElement.dependencies = {
  "sl-icon": IconElement
};
decorateClass([queryDecorator(".icon-button")], IconButtonElement.prototype, "button", 2);
decorateClass([stateDecorator()], IconButtonElement.prototype, "hasFocus", 2);
decorateClass([property()], IconButtonElement.prototype, "name", 2);
decorateClass([property()], IconButtonElement.prototype, "library", 2);
decorateClass([property()], IconButtonElement.prototype, "src", 2);
decorateClass([property()], IconButtonElement.prototype, "href", 2);
decorateClass([property()], IconButtonElement.prototype, "target", 2);
decorateClass([property()], IconButtonElement.prototype, "download", 2);
decorateClass([property()], IconButtonElement.prototype, "label", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], IconButtonElement.prototype, "disabled", 2);
IconButtonElement.define("sl-icon-button");
var componentStyles5 = cssTag`
  ${componentBaseStyles}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;
var componentStyles6 = cssTag`
  ${componentBaseStyles}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;
var mathMin = Math.min,
  mathMax = Math.max,
  mathRound = Math.round,
  mathFloor = Math.floor,
  createCoords = coordValue => ({
    x: coordValue,
    y: coordValue
  }),
  oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  },
  oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };

function clampValue(minValue, clampInput, maxValue) {
  return mathMax(minValue, mathMin(clampInput, maxValue))
}

function evaluateOption(maybeFunction, functionParam) {
  return typeof maybeFunction == "function" ? maybeFunction(functionParam) : maybeFunction
}

function getSide(placement) {
  return placement.split("-")[0]
}

function getAlignment(placement) {
  return placement.split("-")[1]
}

function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x"
}

function getAxisLength(axis) {
  return axis === "y" ? "height" : "width"
}

function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x"
}

function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement))
}

function getAlignmentSides(placement, elementRects, rtlDirection) {
  rtlDirection === void 0 && (rtlDirection = !1);
  let alignment = getAlignment(placement),
    alignmentAxis = getAlignmentAxis(placement),
    axisLength = getAxisLength(alignmentAxis),
    preferredSide = alignmentAxis === "x" ? alignment === (rtlDirection ? "end" : "start") ? "right" : "left" : alignment ===
    "start" ? "bottom" : "top";
  return elementRects.reference[axisLength] > elementRects.floating[axisLength] && (preferredSide = getOppositePlacement(preferredSide)), [preferredSide, getOppositePlacement(preferredSide)]
}

function getExpandedPlacements(placement) {
  let oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)]
}

function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignmentMatch => oppositeAlignmentMap[alignmentMatch])
}

function getSideList(side, isStartAlignment, rtlDirection) {
  let leftRightSides = ["left", "right"],
    rightLeftSides = ["right", "left"],
    topBottomSides = ["top", "bottom"],
    bottomTopSides = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      return rtlDirection ? isStartAlignment ? rightLeftSides : leftRightSides : isStartAlignment ? leftRightSides : rightLeftSides;
    case "left":
    case "right":
      return isStartAlignment ? topBottomSides : bottomTopSides;
    default:
      return []
  }
}

function getOppositeAxisPlacements(placement, flipAlignment, direction, rtlDirection) {
  let alignment = getAlignment(placement),
    placementList = getSideList(getSide(placement), direction === "start", rtlDirection);
  return alignment && (placementList = placementList.map(sidePlacement => sidePlacement + "-" + alignment), flipAlignment && (placementList = placementList.concat(placementList.map(getOppositeAlignmentPlacement)))), placementList
}

function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, sideMatch => oppositeSideMap[sideMatch])
}

function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  }
}

function getPaddingObject(padding) {
  return typeof padding != "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  }
}

function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  }
}

function computeCoordsFromPlacement(rectsInfo, placement, rtlDirection) {
  let {
    reference: referenceRect,
    floating: floatingRect
  } = rectsInfo, sideAxis = getSideAxis(placement), alignmentAxis = getAlignmentAxis(placement), axisLength = getAxisLength(alignmentAxis), placementSide = getSide(placement), isVerticalAxis = sideAxis === "y", referenceCenterX = referenceRect.x + referenceRect
    .width / 2 - floatingRect.width / 2, referenceCenterY = referenceRect.y + referenceRect.height / 2 - floatingRect.height / 2, sideCoordValue = referenceRect[axisLength] /
    2 - floatingRect[axisLength] / 2, computedCoords;
  switch (placementSide) {
    case "top":
      computedCoords = {
        x: referenceCenterX,
        y: referenceRect.y - floatingRect.height
      };
      break;
    case "bottom":
      computedCoords = {
        x: referenceCenterX,
        y: referenceRect.y + referenceRect.height
      };
      break;
    case "right":
      computedCoords = {
        x: referenceRect.x + referenceRect.width,
        y: referenceCenterY
      };
      break;
    case "left":
      computedCoords = {
        x: referenceRect.x - floatingRect.width,
        y: referenceCenterY
      };
      break;
    default:
      computedCoords = {
        x: referenceRect.x,
        y: referenceRect.y
      }
  }
  switch (getAlignment(placement)) {
    case "start":
      computedCoords[alignmentAxis] -= sideCoordValue * (rtlDirection && isVerticalAxis ? -1 : 1);
      break;
    case "end":
      computedCoords[alignmentAxis] += sideCoordValue * (rtlDirection && isVerticalAxis ? -1 : 1);
      break
  }
  return computedCoords
}
var computePosition = async (referenceElement, floatingElement, positionConfig) => {
  let {
    placement: requestedPlacement = "bottom",
    strategy: positionStrategy = "absolute",
    middleware: middlewareList = [],
    platform: platform
  } = positionConfig, activeMiddleware = middlewareList.filter(Boolean), isRtl = await (platform.isRTL == null ? void 0 : platform
    .isRTL(floatingElement)), elementRects = await platform.getElementRects({
    reference: referenceElement,
    floating: floatingElement,
    strategy: positionStrategy
  }), {
    x: coordX,
    y: coordY
  } = computeCoordsFromPlacement(elementRects, requestedPlacement, isRtl), currentPlacement = requestedPlacement, middlewareData = {}, resetCount = 0;
  for (let middlewareIndex = 0; middlewareIndex < activeMiddleware.length; middlewareIndex++) {
    let {
      name: middlewareName,
      fn: middlewareFn
    } = activeMiddleware[middlewareIndex], {
      x: nextCoordX,
      y: nextCoordY,
      data: middlewareResultData,
      reset: resetInstruction
    } = await middlewareFn({
      x: coordX,
      y: coordY,
      initialPlacement: requestedPlacement,
      placement: currentPlacement,
      strategy: positionStrategy,
      middlewareData: middlewareData,
      rects: elementRects,
      platform: platform,
      elements: {
        reference: referenceElement,
        floating: floatingElement
      }
    });
    coordX = nextCoordX ?? coordX, coordY = nextCoordY ?? coordY, middlewareData = {
      ...middlewareData,
      [middlewareName]: {
        ...middlewareData[middlewareName],
        ...middlewareResultData
      }
    }, resetInstruction && resetCount <= 50 && (resetCount++, typeof resetInstruction == "object" && (resetInstruction.placement && (currentPlacement =
      resetInstruction.placement), resetInstruction.rects && (elementRects = resetInstruction.rects === !0 ? await platform
      .getElementRects({
        reference: referenceElement,
        floating: floatingElement,
        strategy: positionStrategy
      }) : resetInstruction.rects), {
      x: coordX,
      y: coordY
    } = computeCoordsFromPlacement(elementRects, currentPlacement, isRtl)), middlewareIndex = -1)
  }
  return {
    x: coordX,
    y: coordY,
    placement: currentPlacement,
    strategy: positionStrategy,
    middlewareData: middlewareData
  }
};
async function detectOverflow(overflowState, overflowOptions) {
  var tempOffsetParent;
  overflowOptions === void 0 && (overflowOptions = {});
  let {
    x: coordX,
    y: coordY,
    platform: platform,
    rects: elementRects,
    elements: floatingElements,
    strategy: positionStrategy
  } = overflowState, {
    boundary: boundary = "clippingAncestors",
    rootBoundary: rootBoundary = "viewport",
    elementContext: elementContext = "floating",
    altBoundary: altBoundary = !1,
    padding: paddingOption = 0
  } = evaluateOption(overflowOptions, overflowState), paddingObject = getPaddingObject(paddingOption), contextElement = floatingElements[altBoundary ? elementContext === "floating" ? "reference" :
    "floating" : elementContext], clippingRect = rectToClientRect(await platform.getClippingRect({
    element: (tempOffsetParent = await (platform.isElement == null ? void 0 : platform.isElement(
      contextElement))) == null || tempOffsetParent ? contextElement : contextElement.contextElement || await (platform
        .getDocumentElement == null ? void 0 : platform.getDocumentElement(floatingElements
          .floating)),
    boundary: boundary,
    rootBoundary: rootBoundary,
    strategy: positionStrategy
  })), contextElementRect = elementContext === "floating" ? {
    ...elementRects.floating,
    x: coordX,
    y: coordY
  } : elementRects.reference, offsetParentElement = await (platform.getOffsetParent == null ? void 0 : platform
    .getOffsetParent(floatingElements.floating)), offsetParentIsElement = await (platform.isElement == null ? void 0 :
    platform.isElement(offsetParentElement)) ? await (platform.getScale == null ? void 0 : platform.getScale(
  offsetParentElement)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, viewportRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ?
    await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: floatingElements,
      rect: contextElementRect,
      offsetParent: offsetParentElement,
      strategy: positionStrategy
    }) : contextElementRect);
  return {
    top: (clippingRect.top - viewportRect.top + paddingObject.top) / offsetParentIsElement.y,
    bottom: (viewportRect.bottom - clippingRect.bottom + paddingObject.bottom) / offsetParentIsElement.y,
    left: (clippingRect.left - viewportRect.left + paddingObject.left) / offsetParentIsElement.x,
    right: (viewportRect.right - clippingRect.right + paddingObject.right) / offsetParentIsElement.x
  }
}
var arrowMiddleware = arrowOptions => ({
  name: "arrow",
  options: arrowOptions,
  async fn(middlewareArgs) {
    let {
      x: coordX,
      y: coordY,
      placement: placement,
      rects: elementRects,
      platform: platform,
      elements: floatingElements,
      middlewareData: middlewareData
    } = middlewareArgs, {
      element: arrowElement,
      padding: arrowPadding = 0
    } = evaluateOption(arrowOptions, middlewareArgs) || {};
    if (arrowElement == null) return {};
    let paddingObject = getPaddingObject(arrowPadding),
      arrowCoords = {
        x: coordX,
        y: coordY
      },
      alignmentAxis = getAlignmentAxis(placement),
      axisLength = getAxisLength(alignmentAxis),
      arrowDimensions = await platform.getDimensions(arrowElement),
      isVerticalAxis = alignmentAxis === "y",
      minSideName = isVerticalAxis ? "top" : "left",
      maxSideName = isVerticalAxis ? "bottom" : "right",
      clientLengthProp = isVerticalAxis ? "clientHeight" : "clientWidth",
      endDiff = elementRects.reference[axisLength] + elementRects.reference[alignmentAxis] - arrowCoords[alignmentAxis] - elementRects.floating[axisLength],
      startDiff = arrowCoords[alignmentAxis] - elementRects.reference[alignmentAxis],
      arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(
        arrowElement)),
      clientLength = arrowOffsetParent ? arrowOffsetParent[clientLengthProp] : 0;
    (!clientLength || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) && (clientLength =
      floatingElements.floating[clientLengthProp] || elementRects.floating[axisLength]);
    let centerOffset = endDiff / 2 - startDiff / 2,
      maxPadding = clientLength / 2 - arrowDimensions[axisLength] / 2 - 1,
      minClampValue = mathMin(paddingObject[minSideName], maxPadding),
      maxClampValue = mathMin(paddingObject[maxSideName], maxPadding),
      clampMin = minClampValue,
      clampMax = clientLength - arrowDimensions[axisLength] - maxClampValue,
      centerCoord = clientLength / 2 - arrowDimensions[axisLength] / 2 + centerOffset,
      clampedCoord = clampValue(clampMin, centerCoord, clampMax),
      shouldOffsetAlignment = !middlewareData.arrow && getAlignment(placement) != null && centerCoord !== clampedCoord && elementRects.reference[axisLength] / 2 - (
        centerCoord < clampMin ? minClampValue : maxClampValue) - arrowDimensions[axisLength] / 2 < 0,
      alignmentOffsetValue = shouldOffsetAlignment ? centerCoord < clampMin ? centerCoord - clampMin : centerCoord - clampMax : 0;
    return {
      [alignmentAxis]: arrowCoords[alignmentAxis] + alignmentOffsetValue,
      data: {
        [alignmentAxis]: clampedCoord,
        centerOffset: centerCoord - clampedCoord - alignmentOffsetValue,
        ...shouldOffsetAlignment && {
          alignmentOffset: alignmentOffsetValue
        }
      },
      reset: shouldOffsetAlignment
    }
  }
});
var flipMiddleware = function(flipOptions) {
  return flipOptions === void 0 && (flipOptions = {}), {
    name: "flip",
    options: flipOptions,
    async fn(middlewareArgs) {
      var prevFlipData, prevOverflowData;
      let {
        placement: placement,
        middlewareData: middlewareData,
        rects: elementRects,
        initialPlacement: initialPlacement,
        platform: platform,
        elements: floatingElements
      } = middlewareArgs, {
        mainAxis: checkMainAxis = !0,
        crossAxis: checkCrossAxis = !0,
        fallbackPlacements: fallbackPlacements,
        fallbackStrategy: fallbackStrategy = "bestFit",
        fallbackAxisSideDirection: fallbackAxisSideDirection = "none",
        flipAlignment: flipAlignment = !0,
        ...restOverflowOptions
      } = evaluateOption(flipOptions, middlewareArgs);
      if ((prevFlipData = middlewareData.arrow) != null && prevFlipData.alignmentOffset) return {};
      let currentSide = getSide(placement),
        isBasePlacement = getSide(initialPlacement) === initialPlacement,
        isRtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floatingElements.floating)),
        fallbackList = fallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      !fallbackPlacements && fallbackAxisSideDirection !== "none" && fallbackList.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, isRtl));
      let allPlacements = [initialPlacement, ...fallbackList],
        overflowResult = await detectOverflow(middlewareArgs, restOverflowOptions),
        overflowsList = [],
        previousOverflows = ((prevOverflowData = middlewareData.flip) == null ? void 0 : prevOverflowData.overflows) || [];
      if (checkMainAxis && overflowsList.push(overflowResult[currentSide]), checkCrossAxis) {
        let overflowSides = getAlignmentSides(placement, elementRects, isRtl);
        overflowsList.push(overflowResult[overflowSides[0]], overflowResult[overflowSides[1]])
      }
      if (previousOverflows = [...previousOverflows, {
          placement: placement,
          overflows: overflowsList
        }], !overflowsList.every(overflowMeasurement => overflowMeasurement <= 0)) {
        var flipIndexHolder, nextPlacementHolder;
        let nextFlipIndex = (((flipIndexHolder = middlewareData.flip) == null ? void 0 : flipIndexHolder.index) || 0) + 1,
          nextPlacement = allPlacements[nextFlipIndex];
        if (nextPlacement) return {
          data: {
            index: nextFlipIndex,
            overflows: previousOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
        let resetPlacement = (nextPlacementHolder = previousOverflows.filter(placementOverflowEntry => placementOverflowEntry.overflows[0] <= 0)
            .sort((overflowEntryA, overflowEntryB) => overflowEntryA.overflows[1] - overflowEntryB.overflows[1])[0]) ==
          null ? void 0 : nextPlacementHolder.placement;
        if (!resetPlacement) switch (fallbackStrategy) {
          case "bestFit": {
            var placementScoreList;
            let chosenPlacement = (placementScoreList = previousOverflows.map(placementScoreEntry => [placementScoreEntry.placement, placementScoreEntry.overflows.filter(
                  positiveOverflow => positiveOverflow > 0)
                .reduce((overflowSumAcc, overflowSumItem) => overflowSumAcc + overflowSumItem, 0)
              ])
              .sort((scoreEntryA, scoreEntryB) => scoreEntryA[1] - scoreEntryB[1])[0]) == null ? void 0 : placementScoreList[
              0];
            chosenPlacement && (resetPlacement = chosenPlacement);
            break
          }
          case "initialPlacement":
            resetPlacement = initialPlacement;
            break
        }
        if (placement !== resetPlacement) return {
          reset: {
            placement: resetPlacement
          }
        }
      }
      return {}
    }
  }
};
async function convertOffsetToCoords(offsetState, offsetOptions) {
  let {
    placement: placement,
    platform: platform,
    elements: floatingElements
  } = offsetState, isRtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floatingElements.floating)), currentSide = getSide(
    placement), currentAlignment = getAlignment(placement), isVerticalSide = getSideAxis(placement) === "y", mainAxisMultiplier = ["left", "top"].includes(currentSide) ? -1 :
    1, crossAxisMultiplier = isRtl && isVerticalSide ? -1 : 1, resolvedOffset = evaluateOption(offsetOptions, offsetState), {
      mainAxis: mainAxisOffset,
      crossAxis: crossAxisOffset,
      alignmentAxis: alignmentAxisOffset
    } = typeof resolvedOffset == "number" ? {
      mainAxis: resolvedOffset,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...resolvedOffset
    };
  return currentAlignment && typeof alignmentAxisOffset == "number" && (crossAxisOffset = currentAlignment === "end" ? alignmentAxisOffset * -1 : alignmentAxisOffset), isVerticalSide ? {
    x: crossAxisOffset * crossAxisMultiplier,
    y: mainAxisOffset * mainAxisMultiplier
  } : {
    x: mainAxisOffset * mainAxisMultiplier,
    y: crossAxisOffset * crossAxisMultiplier
  }
}
var offsetMiddleware = function(offsetOptions) {
    return offsetOptions === void 0 && (offsetOptions = 0), {
      name: "offset",
      options: offsetOptions,
      async fn(middlewareArgs) {
        var diffCoords, diffPlacement;
        let {
          x: coordX,
          y: coordY,
          placement: currentPlacement,
          middlewareData: middlewareData
        } = middlewareArgs, offsetCoords = await convertOffsetToCoords(middlewareArgs, offsetOptions);
        return currentPlacement === ((diffCoords = middlewareData.offset) == null ? void 0 : diffCoords.placement) && (diffPlacement =
          middlewareData.arrow) != null && diffPlacement.alignmentOffset ? {} : {
          x: coordX + offsetCoords.x,
          y: coordY + offsetCoords.y,
          data: {
            ...offsetCoords,
            placement: currentPlacement
          }
        }
      }
    }
  },
  shiftMiddleware = function(shiftOptions) {
    return shiftOptions === void 0 && (shiftOptions = {}), {
      name: "shift",
      options: shiftOptions,
      async fn(middlewareArgs) {
        let {
          x: coordX,
          y: coordY,
          placement: currentPlacement
        } = middlewareArgs, {
          mainAxis: checkMainAxis = !0,
          crossAxis: checkCrossAxis = !1,
          limiter: shiftLimiter = {
            fn: limiterArgs => {
              let {
                x: limitedX,
                y: limitedY
              } = limiterArgs;
              return {
                x: limitedX,
                y: limitedY
              }
            }
          },
          ...detectOverflowOptions
        } = evaluateOption(shiftOptions, middlewareArgs), shiftCoords = {
          x: coordX,
          y: coordY
        }, overflowAmounts = await detectOverflow(middlewareArgs, detectOverflowOptions), mainAxisName = getSideAxis(getSide(currentPlacement)), crossAxisName = getOppositeAxis(mainAxisName), mainAxisCoord = shiftCoords[crossAxisName], crossAxisCoord = shiftCoords[
          mainAxisName];
        if (checkMainAxis) {
          let mainMinSideName = crossAxisName === "y" ? "top" : "left",
            mainMaxSideName = crossAxisName === "y" ? "bottom" : "right",
            clampedMainMin = mainAxisCoord + overflowAmounts[mainMinSideName],
            clampedMainMax = mainAxisCoord - overflowAmounts[mainMaxSideName];
          mainAxisCoord = clampValue(clampedMainMin, mainAxisCoord, clampedMainMax)
        }
        if (checkCrossAxis) {
          let crossMinSideName = mainAxisName === "y" ? "top" : "left",
            crossMaxSideName = mainAxisName === "y" ? "bottom" : "right",
            clampedCrossMin = crossAxisCoord + overflowAmounts[crossMinSideName],
            clampedCrossMax = crossAxisCoord - overflowAmounts[crossMaxSideName];
          crossAxisCoord = clampValue(clampedCrossMin, crossAxisCoord, clampedCrossMax)
        }
        let limitedShiftCoords = shiftLimiter.fn({
          ...middlewareArgs,
          [crossAxisName]: mainAxisCoord,
          [mainAxisName]: crossAxisCoord
        });
        return {
          ...limitedShiftCoords,
          data: {
            x: limitedShiftCoords.x - coordX,
            y: limitedShiftCoords.y - coordY
          }
        }
      }
    }
  };
var sizeMiddleware = function(sizeOptions) {
  return sizeOptions === void 0 && (sizeOptions = {}), {
    name: "size",
    options: sizeOptions,
    async fn(middlewareArgs) {
      let {
        placement: currentPlacement,
        rects: elementRects,
        platform: platform,
        elements: floatingElements
      } = middlewareArgs, {
        apply: applyCallback = () => {},
        ...detectOverflowOptions
      } = evaluateOption(sizeOptions, middlewareArgs), overflowAmounts = await detectOverflow(middlewareArgs, detectOverflowOptions), currentSide = getSide(currentPlacement), currentAlignment = getAlignment(currentPlacement), placementAxis = getSideAxis(
        currentPlacement) === "y", {
          width: floatingWidth,
          height: floatingHeight
        } = elementRects.floating, availableHeightProp, availableWidthProp;
      currentSide === "top" || currentSide === "bottom" ? (availableHeightProp = currentSide, availableWidthProp = currentAlignment === (await (platform.isRTL ==
          null ? void 0 : platform.isRTL(floatingElements.floating)) ? "start" : "end") ?
        "left" : "right") : (availableWidthProp = currentSide, availableHeightProp = currentAlignment === "end" ? "top" : "bottom");
      let computedAvailHeight = floatingHeight - overflowAmounts[availableHeightProp],
        computedAvailWidth = floatingWidth - overflowAmounts[availableWidthProp],
        noShiftApplied = !middlewareArgs.middlewareData.shift,
        finalAvailHeight = computedAvailHeight,
        finalAvailWidth = computedAvailWidth;
      if (placementAxis) {
        let widthMinusHorizOverflow = floatingWidth - overflowAmounts.left - overflowAmounts.right;
        finalAvailWidth = currentAlignment || noShiftApplied ? mathMin(computedAvailWidth, widthMinusHorizOverflow) : widthMinusHorizOverflow
      } else {
        let heightMinusVertOverflow = floatingHeight - overflowAmounts.top - overflowAmounts.bottom;
        finalAvailHeight = currentAlignment || noShiftApplied ? mathMin(computedAvailHeight, heightMinusVertOverflow) : heightMinusVertOverflow
      }
      if (noShiftApplied && !currentAlignment) {
        let overflowLeft = mathMax(overflowAmounts.left, 0),
          overflowRight = mathMax(overflowAmounts.right, 0),
          overflowTop = mathMax(overflowAmounts.top, 0),
          overflowBottom = mathMax(overflowAmounts.bottom, 0);
        placementAxis ? finalAvailWidth = floatingWidth - 2 * (overflowLeft !== 0 || overflowRight !== 0 ? overflowLeft + overflowRight : mathMax(overflowAmounts.left, overflowAmounts
          .right)) : finalAvailHeight = floatingHeight - 2 * (overflowTop !== 0 || overflowBottom !== 0 ? overflowTop + overflowBottom : mathMax(overflowAmounts.top, overflowAmounts
            .bottom))
      }
      await applyCallback({
        ...middlewareArgs,
        availableWidth: finalAvailWidth,
        availableHeight: finalAvailHeight
      });
      let floatingDimensions = await platform.getDimensions(floatingElements.floating);
      return floatingWidth !== floatingDimensions.width || floatingHeight !== floatingDimensions.height ? {
        reset: {
          rects: !0
        }
      } : {}
    }
  }
};

function getNodeName(node) {
  return isNode(node) ? (node.nodeName || "")
    .toLowerCase() : "#document"
}

function getWindow(node) {
  var nodeDocument;
  return (node == null || (nodeDocument = node.ownerDocument) == null ? void 0 : nodeDocument
    .defaultView) || window
}

function getDocumentElement(node) {
  var nodeDocument;
  return (nodeDocument = (isNode(node) ? node.ownerDocument : node.document) || window.document) ==
    null ? void 0 : nodeDocument.documentElement
}

function isNode(maybeNode) {
  return maybeNode instanceof Node || maybeNode instanceof getWindow(maybeNode)
    .Node
}

function isElement(maybeElement) {
  return maybeElement instanceof Element || maybeElement instanceof getWindow(maybeElement)
    .Element
}

function isHTMLElement(maybeHtmlElement) {
  return maybeHtmlElement instanceof HTMLElement || maybeHtmlElement instanceof getWindow(maybeHtmlElement)
    .HTMLElement
}

function isShadowRoot(maybeShadowRoot) {
  return typeof ShadowRoot > "u" ? !1 : maybeShadowRoot instanceof ShadowRoot ||
    maybeShadowRoot instanceof getWindow(maybeShadowRoot)
    .ShadowRoot
}

function isOverflowElement(element) {
  let {
    overflow: overflowStyle,
    overflowX: overflowXStyle,
    overflowY: overflowYStyle,
    display: displayStyle
  } = getComputedStyleForNode(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflowStyle + overflowYStyle + overflowXStyle) && !["inline",
    "contents"
  ].includes(displayStyle)
}

function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element))
}

function isContainingBlock(element) {
  let isWebkitBrowser = isWebkit(),
    computedStyle = getComputedStyleForNode(element);
  return computedStyle.transform !== "none" || computedStyle.perspective !== "none" || (computedStyle
    .containerType ? computedStyle.containerType !== "normal" : !1) || !isWebkitBrowser && (computedStyle
    .backdropFilter ? computedStyle.backdropFilter !== "none" : !1) || !isWebkitBrowser && (computedStyle.filter ? computedStyle
    .filter !== "none" : !1) || ["transform", "perspective", "filter"].some(
    willChangeProp => (computedStyle.willChange || "")
    .includes(willChangeProp)) || ["paint", "layout", "strict", "content"].some(containProp => (computedStyle
      .contain || "")
    .includes(containProp))
}

function getContainingBlock(element) {
  let currentParent = getParentNode(element);
  for (; isHTMLElement(currentParent) && !isLastTraversableNode(currentParent);) {
    if (isContainingBlock(currentParent)) return currentParent;
    currentParent = getParentNode(currentParent)
  }
  return null
}

function isWebkit() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports(
    "-webkit-backdrop-filter", "none")
}

function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node))
}

function getComputedStyleForNode(element) {
  return getWindow(element)
    .getComputedStyle(element)
}

function getNodeScroll(element) {
  return isElement(element) ? {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  } : {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  }
}

function getParentNode(node) {
  if (getNodeName(node) === "html") return node;
  let parentCandidate = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
  return isShadowRoot(parentCandidate) ? parentCandidate.host : parentCandidate
}

function getNearestOverflowAncestor(node) {
  let parentNode = getParentNode(node);
  return isLastTraversableNode(parentNode) ? node.ownerDocument ? node.ownerDocument.body : node.body : isHTMLElement(parentNode) && isOverflowElement(
    parentNode) ? parentNode : getNearestOverflowAncestor(parentNode)
}

function getOverflowAncestors(node, ancestorList, traverseIframes) {
  var ownerBodyRef;
  ancestorList === void 0 && (ancestorList = []), traverseIframes === void 0 && (traverseIframes = !0);
  let overflowAncestor = getNearestOverflowAncestor(node),
    isBodyAncestor = overflowAncestor === ((ownerBodyRef = node.ownerDocument) == null ? void 0 : ownerBodyRef.body),
    ancestorWindow = getWindow(overflowAncestor);
  return isBodyAncestor ? ancestorList.concat(ancestorWindow, ancestorWindow.visualViewport || [], isOverflowElement(overflowAncestor) ? overflowAncestor : [], ancestorWindow
    .frameElement && traverseIframes ? getOverflowAncestors(ancestorWindow.frameElement) : []) : ancestorList.concat(overflowAncestor, getOverflowAncestors(overflowAncestor, [], traverseIframes))
}

function getCssDimensions(element) {
  let computedStyle = getComputedStyleForNode(element),
    cssWidth = parseFloat(computedStyle.width) || 0,
    cssHeight = parseFloat(computedStyle.height) || 0,
    isHtmlElement = isHTMLElement(element),
    measuredWidth = isHtmlElement ? element.offsetWidth : cssWidth,
    measuredHeight = isHtmlElement ? element.offsetHeight : cssHeight,
    dimensionsMismatch = mathRound(cssWidth) !== measuredWidth || mathRound(cssHeight) !== measuredHeight;
  return dimensionsMismatch && (cssWidth = measuredWidth, cssHeight = measuredHeight), {
    width: cssWidth,
    height: cssHeight,
    $: dimensionsMismatch
  }
}

function unwrapElement(maybeVirtualElement) {
  return isElement(maybeVirtualElement) ? maybeVirtualElement : maybeVirtualElement.contextElement
}

function getScale(elementOrVirtual) {
  let scaleElement = unwrapElement(elementOrVirtual);
  if (!isHTMLElement(scaleElement)) return createCoords(1);
  let boundingRect = scaleElement.getBoundingClientRect(),
    {
      width: cssWidthDim,
      height: cssHeightDim,
      $: dimensionsInvalid
    } = getCssDimensions(scaleElement),
    scaleX = (dimensionsInvalid ? mathRound(boundingRect.width) : boundingRect.width) / cssWidthDim,
    scaleY = (dimensionsInvalid ? mathRound(boundingRect.height) : boundingRect.height) / cssHeightDim;
  return (!scaleX || !Number.isFinite(scaleX)) && (scaleX = 1), (!scaleY || !Number.isFinite(scaleY)) &&
    (scaleY = 1), {
      x: scaleX,
      y: scaleY
    }
}
var zeroVisualOffsets = createCoords(0);

function getVisualOffsets(element) {
  let elementWindow = getWindow(element);
  return !isWebkit() || !elementWindow.visualViewport ? zeroVisualOffsets : {
    x: elementWindow.visualViewport.offsetLeft,
    y: elementWindow.visualViewport.offsetTop
  }
}

function shouldAddVisualOffsets(element, isFixedStrategy, floatingOffsetParent) {
  return isFixedStrategy === void 0 && (isFixedStrategy = !1), !floatingOffsetParent || isFixedStrategy && floatingOffsetParent !== getWindow(element) ? !1 : isFixedStrategy
}

function getBoundingClientRectScaled(elementOrVirtual, includeScale, isFixedStrategy, offsetParentArg) {
  includeScale === void 0 && (includeScale = !1), isFixedStrategy === void 0 && (isFixedStrategy = !1);
  let clientRect = elementOrVirtual.getBoundingClientRect(),
    unwrappedElement = unwrapElement(elementOrVirtual),
    scaleCoords = createCoords(1);
  includeScale && (offsetParentArg ? isElement(offsetParentArg) && (scaleCoords = getScale(offsetParentArg)) : scaleCoords = getScale(elementOrVirtual));
  let visualOffsets = shouldAddVisualOffsets(unwrappedElement, isFixedStrategy, offsetParentArg) ? getVisualOffsets(unwrappedElement) : createCoords(0),
    adjustedLeft = (clientRect.left + visualOffsets.x) / scaleCoords.x,
    adjustedTop = (clientRect.top + visualOffsets.y) / scaleCoords.y,
    adjustedWidth = clientRect.width / scaleCoords.x,
    adjustedHeight = clientRect.height / scaleCoords.y;
  if (unwrappedElement) {
    let elementWindow = getWindow(unwrappedElement),
      offsetParentWindow = offsetParentArg && isElement(offsetParentArg) ? getWindow(offsetParentArg) : offsetParentArg,
      frameElement = elementWindow.frameElement;
    for (; frameElement && offsetParentArg && offsetParentWindow !== elementWindow;) {
      let frameScale = getScale(frameElement),
        frameRect = frameElement.getBoundingClientRect(),
        frameStyle = getComputedStyleForNode(frameElement),
        frameOffsetLeft = frameRect.left + (frameElement.clientLeft + parseFloat(frameStyle.paddingLeft)) * frameScale.x,
        frameOffsetTop = frameRect.top + (frameElement.clientTop + parseFloat(frameStyle.paddingTop)) * frameScale.y;
      adjustedLeft *= frameScale.x, adjustedTop *= frameScale.y, adjustedWidth *= frameScale.x, adjustedHeight *= frameScale.y, adjustedLeft += frameOffsetLeft, adjustedTop += frameOffsetTop, frameElement = getWindow(frameElement)
        .frameElement
    }
  }
  return rectToClientRect({
    width: adjustedWidth,
    height: adjustedHeight,
    x: adjustedLeft,
    y: adjustedTop
  })
}
var topLayerSelectors = [":popover-open", ":modal"];

function getTopLayerOffset(floatingElement) {
  let isTopLayer = !1,
    topLayerX = 0,
    topLayerY = 0;

  function collectTransformOffset(transformOwner) {
    try {
      isTopLayer = isTopLayer || floatingElement.matches(transformOwner)
    } catch {}
  }
  if (topLayerSelectors.forEach(topLayerSelector => {
      collectTransformOffset(topLayerSelector)
    }), isTopLayer) {
    let containingBlockElement = getContainingBlock(floatingElement);
    if (containingBlockElement) {
      let containingBlockRect = containingBlockElement.getBoundingClientRect();
      topLayerX = containingBlockRect.x, topLayerY = containingBlockRect.y
    }
  }
  return [isTopLayer, topLayerX, topLayerY]
}

function convertToViewportRelativeRect(conversionArgs) {
  let {
    elements: floatingElements,
    rect: rectToConvert,
    offsetParent: offsetParentNode,
    strategy: positionStrategy
  } = conversionArgs, docElement = getDocumentElement(offsetParentNode), [isTopLayerFloating] = floatingElements ? getTopLayerOffset(floatingElements.floating) : [!1];
  if (offsetParentNode === docElement || isTopLayerFloating) return rectToConvert;
  let convertedRect = {
      scrollLeft: 0,
      scrollTop: 0
    },
    scaleCoords = createCoords(1),
    scrollOffsetCoords = createCoords(0),
    offsetParentIsHtml = isHTMLElement(offsetParentNode);
  if ((offsetParentIsHtml || !offsetParentIsHtml && positionStrategy !== "fixed") && ((getNodeName(offsetParentNode) !== "body" || isOverflowElement(docElement)) && (convertedRect = getNodeScroll(offsetParentNode)),
      isHTMLElement(offsetParentNode))) {
    let offsetParentRect = getBoundingClientRectScaled(offsetParentNode);
    scaleCoords = getScale(offsetParentNode), scrollOffsetCoords.x = offsetParentRect.x + offsetParentNode.clientLeft, scrollOffsetCoords.y = offsetParentRect.y + offsetParentNode.clientTop
  }
  return {
    width: rectToConvert.width * scaleCoords.x,
    height: rectToConvert.height * scaleCoords.y,
    x: rectToConvert.x * scaleCoords.x - convertedRect.scrollLeft * scaleCoords.x + scrollOffsetCoords.x,
    y: rectToConvert.y * scaleCoords.y - convertedRect.scrollTop * scaleCoords.y + scrollOffsetCoords.y
  }
}

function computeScrollbarOffset(element) {
  return Array.from(element.getClientRects())
}

function getWindowScrollBarX(element) {
  return getBoundingClientRectScaled(getDocumentElement(element))
    .left + getNodeScroll(element)
    .scrollLeft
}

function getDocumentRect(element) {
  let docElement = getDocumentElement(element),
    nodeScroll = getNodeScroll(element),
    bodyElement = element.ownerDocument.body,
    documentWidth = mathMax(docElement.scrollWidth, docElement.clientWidth, bodyElement.scrollWidth, bodyElement.clientWidth),
    documentHeight = mathMax(docElement.scrollHeight, docElement.clientHeight, bodyElement.scrollHeight, bodyElement.clientHeight),
    documentRectLeft = -nodeScroll.scrollLeft + getWindowScrollBarX(element),
    documentRectTop = -nodeScroll.scrollTop;
  return getComputedStyleForNode(bodyElement)
    .direction === "rtl" && (documentRectLeft += mathMax(docElement.clientWidth, bodyElement.clientWidth) - documentWidth), {
      width: documentWidth,
      height: documentHeight,
      x: documentRectLeft,
      y: documentRectTop
    }
}

function getViewportRect(element, positionStrategy) {
  let elementWindow = getWindow(element),
    docElement = getDocumentElement(element),
    visualViewport = elementWindow.visualViewport,
    viewportWidth = docElement.clientWidth,
    viewportHeight = docElement.clientHeight,
    viewportOffsetX = 0,
    viewportOffsetY = 0;
  if (visualViewport) {
    viewportWidth = visualViewport.width, viewportHeight = visualViewport.height;
    let isWebkitBrowser = isWebkit();
    (!isWebkitBrowser || isWebkitBrowser && positionStrategy === "fixed") && (viewportOffsetX = visualViewport.offsetLeft, viewportOffsetY = visualViewport.offsetTop)
  }
  return {
    width: viewportWidth,
    height: viewportHeight,
    x: viewportOffsetX,
    y: viewportOffsetY
  }
}

function getInnerBoundingClientRect(element, positionStrategy) {
  let clientRect = getBoundingClientRectScaled(element, !0, positionStrategy === "fixed"),
    topInner = clientRect.top + element.clientTop,
    leftInner = clientRect.left + element.clientLeft,
    innerScaleCoords = isHTMLElement(element) ? getScale(element) : createCoords(1),
    innerWidth = element.clientWidth * innerScaleCoords.x,
    innerHeight = element.clientHeight * innerScaleCoords.y,
    scaledLeft = leftInner * innerScaleCoords.x,
    scaledTop = topInner * innerScaleCoords.y;
  return {
    width: innerWidth,
    height: innerHeight,
    x: scaledLeft,
    y: scaledTop
  }
}

function getClippingElementRect(element, clippingBoundary, positionStrategy) {
  let clippingRectResult;
  if (clippingBoundary === "viewport") clippingRectResult = getViewportRect(element, positionStrategy);
  else if (clippingBoundary === "document") clippingRectResult = getDocumentRect(getDocumentElement(element));
  else if (isElement(clippingBoundary)) clippingRectResult = getInnerBoundingClientRect(clippingBoundary, positionStrategy);
  else {
    let visualOffsets = getVisualOffsets(element);
    clippingRectResult = {
      ...clippingBoundary,
      x: clippingBoundary.x - visualOffsets.x,
      y: clippingBoundary.y - visualOffsets.y
    }
  }
  return rectToClientRect(clippingRectResult)
}

function getClippingRect(element, clippingOptions) {
  let parentNode = getParentNode(element);
  return parentNode === clippingOptions || !isElement(parentNode) || isLastTraversableNode(parentNode) ? !1 : getComputedStyleForNode(parentNode)
    .position === "fixed" || getClippingRect(parentNode, clippingOptions)
}

function getClippingAncestors(element, cacheMap) {
  let cachedAncestors = cacheMap.get(element);
  if (cachedAncestors) return cachedAncestors;
  let overflowAncestors = getOverflowAncestors(element, [], !1)
    .filter(ancestorCandidate => isElement(ancestorCandidate) && getNodeName(ancestorCandidate) !== "body"),
    currentContainingBlock = null,
    elementPosition = getComputedStyleForNode(element)
    .position === "fixed",
    currentNode = elementPosition ? getParentNode(element) : element;
  for (; isElement(currentNode) && !isLastTraversableNode(currentNode);) {
    let ancestorStyle = getComputedStyleForNode(currentNode),
      ancestorIsContainingBlock = isContainingBlock(currentNode);
    !ancestorIsContainingBlock && ancestorStyle.position === "fixed" && (currentContainingBlock = null), (elementPosition ? !ancestorIsContainingBlock && !currentContainingBlock : !ancestorIsContainingBlock && ancestorStyle
        .position === "static" && !!currentContainingBlock && ["absolute", "fixed"].includes(currentContainingBlock
          .position) || isOverflowElement(currentNode) && !ancestorIsContainingBlock && getClippingRect(element, currentNode)) ? overflowAncestors = overflowAncestors.filter(ancestorFilterItem => ancestorFilterItem !== currentNode) :
      currentContainingBlock = ancestorStyle, currentNode = getParentNode(currentNode)
  }
  return cacheMap.set(element, overflowAncestors), overflowAncestors
}

function platformGetClippingRect(clippingArgs) {
  let {
    element: element,
    boundary: boundary,
    rootBoundary: rootBoundary,
    strategy: positionStrategy
  } = clippingArgs, clippingRects = [...boundary === "clippingAncestors" ? getClippingAncestors(element, this._c) : [].concat(boundary), rootBoundary],
    firstClippingRect = clippingRects[0], mergedClippingRect = clippingRects.reduce((accumulatedRect, currentBoundaryRect) => {
      let boundaryRect = getClippingElementRect(element, currentBoundaryRect, positionStrategy);
      return accumulatedRect.top = mathMax(boundaryRect.top, accumulatedRect.top), accumulatedRect.right = mathMin(boundaryRect.right, accumulatedRect.right), accumulatedRect
        .bottom = mathMin(boundaryRect.bottom, accumulatedRect.bottom), accumulatedRect.left = mathMax(boundaryRect.left, accumulatedRect.left), accumulatedRect
    }, getClippingElementRect(element, firstClippingRect, positionStrategy));
  return {
    width: mergedClippingRect.right - mergedClippingRect.left,
    height: mergedClippingRect.bottom - mergedClippingRect.top,
    x: mergedClippingRect.left,
    y: mergedClippingRect.top
  }
}

function platformGetDimensions(element) {
  let {
    width: elementWidth,
    height: elementHeight
  } = getCssDimensions(element);
  return {
    width: elementWidth,
    height: elementHeight
  }
}

function getRectRelativeToOffsetParent(elementOrVirtual, offsetParentNode, positionStrategy, floatingElementArg) {
  let offsetParentIsHtml = isHTMLElement(offsetParentNode),
    docElement = getDocumentElement(offsetParentNode),
    isFixedStrategy = positionStrategy === "fixed",
    elementRect = getBoundingClientRectScaled(elementOrVirtual, !0, isFixedStrategy, offsetParentNode),
    scrollCoords = {
      scrollLeft: 0,
      scrollTop: 0
    },
    offsetParentCoords = createCoords(0);
  if (offsetParentIsHtml || !offsetParentIsHtml && !isFixedStrategy)
    if ((getNodeName(offsetParentNode) !== "body" || isOverflowElement(docElement)) && (scrollCoords = getNodeScroll(offsetParentNode)), offsetParentIsHtml) {
      let offsetParentRect = getBoundingClientRectScaled(offsetParentNode, !0, isFixedStrategy, offsetParentNode);
      offsetParentCoords.x = offsetParentRect.x + offsetParentNode.clientLeft, offsetParentCoords.y = offsetParentRect.y + offsetParentNode.clientTop
    } else docElement && (offsetParentCoords.x = getWindowScrollBarX(docElement));
  let relativeX = elementRect.left + scrollCoords.scrollLeft - offsetParentCoords.x,
    relativeY = elementRect.top + scrollCoords.scrollTop - offsetParentCoords.y,
    [topLayerFlag, topLayerX, topLayerY] = getTopLayerOffset(floatingElementArg);
  return topLayerFlag && (relativeX += topLayerX, relativeY += topLayerY, offsetParentIsHtml && (relativeX += offsetParentNode.clientLeft, relativeY += offsetParentNode.clientTop)), {
    x: relativeX,
    y: relativeY,
    width: elementRect.width,
    height: elementRect.height
  }
}

function getTrueOffsetParent(element, offsetParentPolyfill) {
  return !isHTMLElement(element) || getComputedStyleForNode(element)
    .position === "fixed" ? null : offsetParentPolyfill ? offsetParentPolyfill(element) : element.offsetParent
}

function getOffsetParent(element, offsetParentPolyfill) {
  let elementWindow = getWindow(element);
  if (!isHTMLElement(element)) return elementWindow;
  let offsetParentNode = getTrueOffsetParent(element, offsetParentPolyfill);
  for (; offsetParentNode && isTableElement(offsetParentNode) && getComputedStyleForNode(offsetParentNode)
    .position === "static";) offsetParentNode = getTrueOffsetParent(offsetParentNode, offsetParentPolyfill);
  return offsetParentNode && (getNodeName(offsetParentNode) === "html" || getNodeName(offsetParentNode) === "body" && getComputedStyleForNode(offsetParentNode)
    .position === "static" && !isContainingBlock(offsetParentNode)) ? elementWindow : offsetParentNode || getContainingBlock(element) || elementWindow
}
var platformGetElementRects = async function(rectsArgs) {
  let getOffsetParentFn = this.getOffsetParent || getOffsetParent,
    getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(rectsArgs.reference, await getOffsetParentFn(rectsArgs.floating), rectsArgs.strategy, rectsArgs.floating),
    floating: {
      x: 0,
      y: 0,
      ...await getDimensionsFn(rectsArgs.floating)
    }
  }
};

function isRtlElement(element) {
  return getComputedStyleForNode(element)
    .direction === "rtl"
}
var floatingUiPlatform = {
  convertOffsetParentRelativeRectToViewportRelativeRect: convertToViewportRelativeRect,
  getDocumentElement: getDocumentElement,
  getClippingRect: platformGetClippingRect,
  getOffsetParent: getOffsetParent,
  getElementRects: platformGetElementRects,
  getClientRects: computeScrollbarOffset,
  getDimensions: platformGetDimensions,
  getScale: getScale,
  isElement: isElement,
  isRTL: isRtlElement
};

function observeElementMove(element, onMoveCallback) {
  let intersectionObserver = null,
    cleanupFn, docElement = getDocumentElement(element);

  function cleanupObserver() {
    var currentObserver;
    clearTimeout(cleanupFn), (currentObserver = intersectionObserver) == null || currentObserver.disconnect(), intersectionObserver = null
  }

  function refreshObserver(isFirstCall, intersectionRatioArg) {
    isFirstCall === void 0 && (isFirstCall = !1), intersectionRatioArg === void 0 && (intersectionRatioArg = 1), cleanupObserver();
    let {
      left: rectLeft,
      top: rectTop,
      width: rectWidth,
      height: rectHeight
    } = element.getBoundingClientRect();
    if (isFirstCall || onMoveCallback(), !rectWidth || !rectHeight) return;
    let insetTop = mathFloor(rectTop),
      insetRight = mathFloor(docElement.clientWidth - (rectLeft + rectWidth)),
      insetBottom = mathFloor(docElement.clientHeight - (rectTop + rectHeight)),
      insetLeft = mathFloor(rectLeft),
      observerOptions = {
        rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
        threshold: mathMax(0, mathMin(1, intersectionRatioArg)) || 1
      },
      isFirstUpdate = !0;

    function handleIntersection(intersectionEntries) {
      let intersectionRatio = intersectionEntries[0].intersectionRatio;
      if (intersectionRatio !== intersectionRatioArg) {
        if (!isFirstUpdate) return refreshObserver();
        intersectionRatio ? refreshObserver(!1, intersectionRatio) : cleanupFn = setTimeout(() => {
          refreshObserver(!1, 1e-7)
        }, 100)
      }
      isFirstUpdate = !1
    }
    try {
      intersectionObserver = new IntersectionObserver(handleIntersection, {
        ...observerOptions,
        root: docElement.ownerDocument
      })
    } catch {
      intersectionObserver = new IntersectionObserver(handleIntersection, observerOptions)
    }
    intersectionObserver.observe(element)
  }
  return refreshObserver(!0), cleanupObserver
}

function autoUpdate(referenceElement, floatingElement, updateCallback, autoUpdateOptions) {
  autoUpdateOptions === void 0 && (autoUpdateOptions = {});
  let {
    ancestorScroll: observeAncestorScroll = !0,
    ancestorResize: observeAncestorResize = !0,
    elementResize: observeElementResize = typeof ResizeObserver == "function",
    layoutShift: observeLayoutShift = typeof IntersectionObserver == "function",
    animationFrame: useAnimationFrame = !1
  } = autoUpdateOptions, referenceEl = unwrapElement(referenceElement), scrollResizeAncestors = observeAncestorScroll || observeAncestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floatingElement)] : [];
  scrollResizeAncestors.forEach(ancestorNode => {
    observeAncestorScroll && ancestorNode.addEventListener("scroll", updateCallback, {
      passive: !0
    }), observeAncestorResize && ancestorNode.addEventListener("resize", updateCallback)
  });
  let layoutShiftCleanup = referenceEl && observeLayoutShift ? observeElementMove(referenceEl, updateCallback) : null,
    animationFrameId = -1,
    resizeObserver = null;
  observeElementResize && (resizeObserver = new ResizeObserver(resizeEntries => {
    let [firstResizeEntry] = resizeEntries;
    firstResizeEntry && firstResizeEntry.target === referenceEl && resizeObserver && (resizeObserver.unobserve(floatingElement), cancelAnimationFrame(animationFrameId),
      animationFrameId = requestAnimationFrame(() => {
        var resizeRafId;
        (resizeRafId = resizeObserver) == null || resizeRafId.observe(floatingElement)
      })), updateCallback()
  }), referenceEl && !useAnimationFrame && resizeObserver.observe(referenceEl), resizeObserver.observe(floatingElement));
  let previousRect, lastBoundingRect = useAnimationFrame ? getBoundingClientRectScaled(referenceElement) : null;
  useAnimationFrame && frameLoop();

  function frameLoop() {
    let currentBoundingRect = getBoundingClientRectScaled(referenceElement);
    lastBoundingRect && (currentBoundingRect.x !== lastBoundingRect.x || currentBoundingRect.y !== lastBoundingRect.y || currentBoundingRect.width !== lastBoundingRect.width || currentBoundingRect.height !== lastBoundingRect
      .height) && updateCallback(), lastBoundingRect = currentBoundingRect, previousRect = requestAnimationFrame(frameLoop)
  }
  return updateCallback(), () => {
    var moveCleanup;
    scrollResizeAncestors.forEach(ancestorNode => {
        observeAncestorScroll && ancestorNode.removeEventListener("scroll", updateCallback), observeAncestorResize && ancestorNode.removeEventListener(
          "resize", updateCallback)
      }), layoutShiftCleanup?.(), (moveCleanup = resizeObserver) == null || moveCleanup.disconnect(), resizeObserver = null, useAnimationFrame &&
      cancelAnimationFrame(previousRect)
  }
}
var shift = shiftMiddleware,
  flip = flipMiddleware,
  size = sizeMiddleware;
var arrow = arrowMiddleware;
var buildMiddlewareRegistry = (middlewareArgA, middlewareArgB, middlewareArgC) => {
  let middlewareMap = new Map,
    middlewareConfigA = {
      platform: floatingUiPlatform,
      ...middlewareArgC
    },
    middlewareConfigB = {
      ...middlewareConfigA.platform,
      _c: middlewareMap
    };
  return computePosition(middlewareArgA, middlewareArgB, {
    ...middlewareConfigA,
    platform: middlewareConfigB
  })
};

function offsetParentPredicate(element) {
  return findScrollableAncestor(element)
}

function getParentOrHost(node) {
  return node.assignedSlot ? node.assignedSlot : node.parentNode instanceof ShadowRoot ?
    node.parentNode.host : node.parentNode
}

function findScrollableAncestor(element) {
  for (let ancestorNode = element; ancestorNode; ancestorNode = getParentOrHost(ancestorNode))
    if (ancestorNode instanceof Element && getComputedStyle(ancestorNode)
      .display === "none") return null;
  for (let ancestorNode = getParentOrHost(element); ancestorNode; ancestorNode = getParentOrHost(ancestorNode)) {
    if (!(ancestorNode instanceof Element)) continue;
    let ancestorStyle = getComputedStyle(ancestorNode);
    if (ancestorStyle.display !== "contents" && (ancestorStyle.position !== "static" || ancestorStyle.filter !==
        "none" || ancestorNode.tagName === "BODY")) return ancestorNode
  }
  return null
}

function getElementRootNode(element) {
  return element !== null && typeof element == "object" && "getBoundingClientRect" in element
}
var PopupElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.active = !1, this.placement = "top", this
      .strategy = "absolute", this.distance = 0, this.skidding = 0, this
      .arrow = !1, this.arrowPlacement = "anchor", this.arrowPadding = 10,
      this.flip = !1, this.flipFallbackPlacements = "", this
      .flipFallbackStrategy = "best-fit", this.flipPadding = 0, this
      .shift = !1, this.shiftPadding = 0, this.autoSizePadding = 0, this
      .hoverBridge = !1, this.updateHoverBridge = () => {
        if (this.hoverBridge && this.anchorEl) {
          let anchorRect = this.anchorEl.getBoundingClientRect(),
            popupRect = this.popup.getBoundingClientRect(),
            isTopOrBottomPlacement = this.placement.includes("top") || this.placement.includes(
              "bottom"),
            hoverBridgeX1 = 0,
            hoverBridgeY1 = 0,
            hoverBridgeX2 = 0,
            hoverBridgeY2 = 0,
            hoverBridgeX3 = 0,
            hoverBridgeY3 = 0,
            hoverBridgeX4 = 0,
            hoverBridgeY4 = 0;
          isTopOrBottomPlacement ? anchorRect.top < popupRect.top ? (hoverBridgeX1 = anchorRect.left, hoverBridgeY1 = anchorRect.bottom, hoverBridgeX2 = anchorRect.right, hoverBridgeY2 = anchorRect
              .bottom, hoverBridgeX3 = popupRect.left, hoverBridgeY3 = popupRect.top, hoverBridgeX4 = popupRect.right, hoverBridgeY4 = popupRect.top) : (hoverBridgeX1 =
              popupRect.left, hoverBridgeY1 = popupRect.bottom, hoverBridgeX2 = popupRect.right, hoverBridgeY2 = popupRect.bottom, hoverBridgeX3 = anchorRect.left,
              hoverBridgeY3 = anchorRect.top, hoverBridgeX4 = anchorRect.right, hoverBridgeY4 = anchorRect.top) : anchorRect.left < popupRect.left ? (hoverBridgeX1 = anchorRect
              .right, hoverBridgeY1 = anchorRect.top, hoverBridgeX2 = popupRect.left, hoverBridgeY2 = popupRect.top, hoverBridgeX3 = anchorRect.right, hoverBridgeY3 = anchorRect
              .bottom, hoverBridgeX4 = popupRect.left, hoverBridgeY4 = popupRect.bottom) : (hoverBridgeX1 = popupRect.right, hoverBridgeY1 = popupRect.top,
              hoverBridgeX2 = anchorRect.left, hoverBridgeY2 = anchorRect.top, hoverBridgeX3 = popupRect.right, hoverBridgeY3 = popupRect.bottom, hoverBridgeX4 = anchorRect.left,
              hoverBridgeY4 = anchorRect.bottom), this.style.setProperty(
              "--hover-bridge-top-left-x", `${hoverBridgeX1}px`), this.style
            .setProperty("--hover-bridge-top-left-y", `${hoverBridgeY1}px`), this.style
            .setProperty("--hover-bridge-top-right-x", `${hoverBridgeX2}px`), this.style
            .setProperty("--hover-bridge-top-right-y", `${hoverBridgeY2}px`), this.style
            .setProperty("--hover-bridge-bottom-left-x", `${hoverBridgeX3}px`), this
            .style.setProperty("--hover-bridge-bottom-left-y", `${hoverBridgeY3}px`),
            this.style.setProperty("--hover-bridge-bottom-right-x",
              `${hoverBridgeX4}px`), this.style.setProperty(
              "--hover-bridge-bottom-right-y", `${hoverBridgeY4}px`)
        }
      }
  }
  async connectedCallback() {
    super.connectedCallback(), await this.updateComplete, this.start()
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stop()
  }
  async updated(changedProperties) {
    super.updated(changedProperties), changedProperties.has("active") && (this.active ? this.start() : this
        .stop()), changedProperties.has("anchor") && this.handleAnchorChange(), this
      .active && (await this.updateComplete, this.reposition())
  }
  async handleAnchorChange() {
    if (await this.stop(), this.anchor && typeof this.anchor == "string") {
      let popupRootNode = this.getRootNode();
      this.anchorEl = popupRootNode.getElementById(this.anchor)
    } else this.anchor instanceof Element || getElementRootNode(this.anchor) ? this
      .anchorEl = this.anchor : this.anchorEl = this.querySelector(
        '[slot="anchor"]');
    this.anchorEl instanceof HTMLSlotElement && (this.anchorEl = this
      .anchorEl.assignedElements({
        flatten: !0
      })[0]), this.anchorEl && this.start()
  }
  start() {
    this.anchorEl && (this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
      this.reposition()
    }))
  }
  async stop() {
    return new Promise(resolveReposition => {
      this.cleanup ? (this.cleanup(), this.cleanup = void 0, this
        .removeAttribute("data-current-placement"), this.style
        .removeProperty("--auto-size-available-width"), this.style
        .removeProperty("--auto-size-available-height"),
        requestAnimationFrame(() => resolveReposition())) : resolveReposition()
    })
  }
  reposition() {
    if (!this.active || !this.anchorEl) return;
    let middlewareStack = [offsetMiddleware({
      mainAxis: this.distance,
      crossAxis: this.skidding
    })];
    this.sync ? middlewareStack.push(size({
        apply: ({
          rects: middlewareRects
        }) => {
          let syncWidth = this.sync === "width" || this.sync === "both",
            syncHeight = this.sync === "height" || this.sync === "both";
          this.popup.style.width = syncWidth ? `${middlewareRects.reference.width}px` : "",
            this.popup.style.height = syncHeight ? `${middlewareRects.reference.height}px` :
            ""
        }
      })) : (this.popup.style.width = "", this.popup.style.height = ""),
      this.flip && middlewareStack.push(flip({
        boundary: this.flipBoundary,
        fallbackPlacements: this.flipFallbackPlacements,
        fallbackStrategy: this.flipFallbackStrategy === "best-fit" ?
          "bestFit" : "initialPlacement",
        padding: this.flipPadding
      })), this.shift && middlewareStack.push(shift({
        boundary: this.shiftBoundary,
        padding: this.shiftPadding
      })), this.autoSize ? middlewareStack.push(size({
        boundary: this.autoSizeBoundary,
        padding: this.autoSizePadding,
        apply: ({
          availableWidth: availableWidth,
          availableHeight: availableHeight
        }) => {
          this.autoSize === "vertical" || this.autoSize === "both" ?
            this.style.setProperty("--auto-size-available-height",
              `${availableHeight}px`) : this.style.removeProperty(
              "--auto-size-available-height"), this.autoSize ===
            "horizontal" || this.autoSize === "both" ? this.style
            .setProperty("--auto-size-available-width", `${availableWidth}px`) :
            this.style.removeProperty("--auto-size-available-width")
        }
      })) : (this.style.removeProperty("--auto-size-available-width"), this
        .style.removeProperty("--auto-size-available-height")), this
      .arrow && middlewareStack.push(arrow({
        element: this.arrowEl,
        padding: this.arrowPadding
      }));
    let getOffsetParentFn = this.strategy === "absolute" ? offsetParentElement => floatingUiPlatform.getOffsetParent(offsetParentElement, offsetParentPredicate) :
      floatingUiPlatform.getOffsetParent;
    buildMiddlewareRegistry(this.anchorEl, this.popup, {
        placement: this.placement,
        middleware: middlewareStack,
        strategy: this.strategy,
        platform: copyPropDescriptors(applySpread({}, floatingUiPlatform), {
          getOffsetParent: getOffsetParentFn
        })
      })
      .then(({
        x: computedX,
        y: computedY,
        middlewareData: middlewareData,
        placement: resolvedPlacement
      }) => {
        let hostStyle = getComputedStyle(this)
          .direction === "rtl",
          sideStyleMap = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right"
          } [resolvedPlacement.split("-")[0]];
        if (this.setAttribute("data-current-placement", resolvedPlacement), Object.assign(
            this.popup.style, {
              left: `${computedX}px`,
              top: `${computedY}px`
            }), this.arrow) {
          let arrowX = middlewareData.arrow.x,
            arrowY = middlewareData.arrow.y,
            arrowTopStyle = "",
            arrowRightStyle = "",
            arrowBottomStyle = "",
            arrowLeftStyle = "";
          if (this.arrowPlacement === "start") {
            let arrowXValue = typeof arrowX == "number" ?
              `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` :
              "";
            arrowTopStyle = typeof arrowY == "number" ?
              `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` :
              "", arrowRightStyle = hostStyle ? arrowXValue : "", arrowLeftStyle = hostStyle ? "" : arrowXValue
          } else if (this.arrowPlacement === "end") {
            let arrowYValue = typeof arrowX == "number" ?
              `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` :
              "";
            arrowRightStyle = hostStyle ? "" : arrowYValue, arrowLeftStyle = hostStyle ? arrowYValue : "", arrowBottomStyle = typeof arrowY == "number" ?
              `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` :
              ""
          } else this.arrowPlacement === "center" ? (arrowLeftStyle = typeof arrowX ==
            "number" ? "calc(50% - var(--arrow-size-diagonal))" : "",
            arrowTopStyle = typeof arrowY == "number" ?
            "calc(50% - var(--arrow-size-diagonal))" : "") : (arrowLeftStyle =
            typeof arrowX == "number" ? `${arrowX}px` : "", arrowTopStyle = typeof arrowY ==
            "number" ? `${arrowY}px` : "");
          Object.assign(this.arrowEl.style, {
            top: arrowTopStyle,
            right: arrowRightStyle,
            bottom: arrowBottomStyle,
            left: arrowLeftStyle,
            [sideStyleMap]: "calc(var(--arrow-size-diagonal) * -1)"
          })
        }
      }), requestAnimationFrame(() => this.updateHoverBridge()), this.emit(
        "sl-reposition")
  }
  render() {
    return htmlTag`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${classMap({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${classMap({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?htmlTag`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `
  }
};
PopupElement.styles = componentStyles6;
decorateClass([queryDecorator(".popup")], PopupElement.prototype, "popup", 2);
decorateClass([queryDecorator(".popup__arrow")], PopupElement.prototype, "arrowEl", 2);
decorateClass([property()], PopupElement.prototype, "anchor", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], PopupElement.prototype, "active", 2);
decorateClass([property({
  reflect: !0
})], PopupElement.prototype, "placement", 2);
decorateClass([property({
  reflect: !0
})], PopupElement.prototype, "strategy", 2);
decorateClass([property({
  type: Number
})], PopupElement.prototype, "distance", 2);
decorateClass([property({
  type: Number
})], PopupElement.prototype, "skidding", 2);
decorateClass([property({
  type: Boolean
})], PopupElement.prototype, "arrow", 2);
decorateClass([property({
  attribute: "arrow-placement"
})], PopupElement.prototype, "arrowPlacement", 2);
decorateClass([property({
  attribute: "arrow-padding",
  type: Number
})], PopupElement.prototype, "arrowPadding", 2);
decorateClass([property({
  type: Boolean
})], PopupElement.prototype, "flip", 2);
decorateClass([property({
  attribute: "flip-fallback-placements",
  converter: {
    fromAttribute: placementAttrString => placementAttrString.split(" ")
      .map(placementPart => placementPart.trim())
      .filter(placementPartFiltered => placementPartFiltered !== ""),
    toAttribute: placementArray => placementArray.join(" ")
  }
})], PopupElement.prototype, "flipFallbackPlacements", 2);
decorateClass([property({
  attribute: "flip-fallback-strategy"
})], PopupElement.prototype, "flipFallbackStrategy", 2);
decorateClass([property({
  type: Object
})], PopupElement.prototype, "flipBoundary", 2);
decorateClass([property({
  attribute: "flip-padding",
  type: Number
})], PopupElement.prototype, "flipPadding", 2);
decorateClass([property({
  type: Boolean
})], PopupElement.prototype, "shift", 2);
decorateClass([property({
  type: Object
})], PopupElement.prototype, "shiftBoundary", 2);
decorateClass([property({
  attribute: "shift-padding",
  type: Number
})], PopupElement.prototype, "shiftPadding", 2);
decorateClass([property({
  attribute: "auto-size"
})], PopupElement.prototype, "autoSize", 2);
decorateClass([property()], PopupElement.prototype, "sync", 2);
decorateClass([property({
  type: Object
})], PopupElement.prototype, "autoSizeBoundary", 2);
decorateClass([property({
  attribute: "auto-size-padding",
  type: Number
})], PopupElement.prototype, "autoSizePadding", 2);
decorateClass([property({
  attribute: "hover-bridge",
  type: Boolean
})], PopupElement.prototype, "hoverBridge", 2);
var defaultAnimations = new Map,
  elementAnimations = new WeakMap;

function normalizeAnimation(animationOrDefault) {
  return animationOrDefault ?? {
    keyframes: [],
    options: {
      duration: 0
    }
  }
}

function applyDirectionToAnimation(animationDefinition, textDirection) {
  return textDirection.toLowerCase() === "rtl" ? {
    keyframes: animationDefinition.rtlKeyframes || animationDefinition.keyframes,
    options: animationDefinition.options
  } : animationDefinition
}

function setDefaultAnimation(animationName, animationDefinition) {
  defaultAnimations.set(animationName, normalizeAnimation(animationDefinition))
}

function getAnimation(element, animationName, animationOptions) {
  let elementAnimationMap = elementAnimations.get(element);
  if (elementAnimationMap?.[animationName]) return applyDirectionToAnimation(elementAnimationMap[animationName], animationOptions.dir);
  let defaultAnimationDef = defaultAnimations.get(animationName);
  return defaultAnimationDef ? applyDirectionToAnimation(defaultAnimationDef, animationOptions.dir) : {
    keyframes: [],
    options: {
      duration: 0
    }
  }
}

function waitForEvent(eventTarget, eventName) {
  return new Promise(resolveEventPromise => {
    function onEventOnce(eventObject) {
      eventObject.target === eventTarget && (eventTarget.removeEventListener(eventName, onEventOnce), resolveEventPromise())
    }
    eventTarget.addEventListener(eventName, onEventOnce)
  })
}

function animateTo(element, keyframes, animationOptions) {
  return new Promise(resolveAnimationPromise => {
    if (animationOptions?.duration === 1 / 0) throw new Error(
      "Promise-based animations must be finite.");
    let animation = element.animate(keyframes, copyPropDescriptors(applySpread({}, animationOptions), {
      duration: prefersReducedMotion() ? 0 : animationOptions.duration
    }));
    animation.addEventListener("cancel", resolveAnimationPromise, {
      once: !0
    }), animation.addEventListener("finish", resolveAnimationPromise, {
      once: !0
    })
  })
}

function parseDuration(durationValue) {
  return durationValue = durationValue.toString()
    .toLowerCase(), durationValue.indexOf("ms") > -1 ? parseFloat(durationValue) : durationValue.indexOf("s") > -1 ?
    parseFloat(durationValue) * 1e3 : parseFloat(durationValue)
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches
}

function stopAnimations(element) {
  return Promise.all(element.getAnimations()
    .map(runningAnimation => new Promise(resolveCancelPromise => {
      runningAnimation.cancel(), requestAnimationFrame(resolveCancelPromise)
    })))
}

function shimKeyframesHeightAuto(keyframes, calculatedHeight) {
  return keyframes.map(keyframeStep => copyPropDescriptors(applySpread({}, keyframeStep), {
    height: keyframeStep.height === "auto" ? `${calculatedHeight}px` : keyframeStep.height
  }))
}
var TooltipElement = class extends ShoelaceElement {
  constructor() {
    super(), this.localize = new LocalizeController(this), this.content = "", this
      .placement = "top", this.disabled = !1, this.distance = 8, this
      .open = !1, this.skidding = 0, this.trigger = "hover focus", this
      .hoist = !1, this.handleBlur = () => {
        this.hasTrigger("focus") && this.hide()
      }, this.handleClick = () => {
        this.hasTrigger("click") && (this.open ? this.hide() : this.show())
      }, this.handleFocus = () => {
        this.hasTrigger("focus") && this.show()
      }, this.handleDocumentKeyDown = documentKeydownEvent => {
        documentKeydownEvent.key === "Escape" && (documentKeydownEvent.stopPropagation(), this.hide())
      }, this.handleMouseOver = () => {
        if (this.hasTrigger("hover")) {
          let showDuration = parseDuration(getComputedStyle(this)
            .getPropertyValue("--show-delay"));
          clearTimeout(this.hoverTimeout), this.hoverTimeout = window
            .setTimeout(() => this.show(), showDuration)
        }
      }, this.handleMouseOut = () => {
        if (this.hasTrigger("hover")) {
          let hideDuration = parseDuration(getComputedStyle(this)
            .getPropertyValue("--hide-delay"));
          clearTimeout(this.hoverTimeout), this.hoverTimeout = window
            .setTimeout(() => this.hide(), hideDuration)
        }
      }, this.addEventListener("blur", this.handleBlur, !0), this
      .addEventListener("focus", this.handleFocus, !0), this
      .addEventListener("click", this.handleClick), this.addEventListener(
        "mouseover", this.handleMouseOver), this.addEventListener(
        "mouseout", this.handleMouseOut)
  }
  disconnectedCallback() {
    var currentTriggerElement;
    (currentTriggerElement = this.closeWatcher) == null || currentTriggerElement.destroy(), document
      .removeEventListener("keydown", this.handleDocumentKeyDown)
  }
  firstUpdated() {
    this.body.hidden = !this.open, this.open && (this.popup.active = !0,
      this.popup.reposition())
  }
  hasTrigger(triggerType) {
    return this.trigger.split(" ")
      .includes(triggerType)
  }
  async handleOpenChange() {
    var showAnimationName, showAnimationDef;
    if (this.open) {
      if (this.disabled) return;
      this.emit("sl-show"), "CloseWatcher" in window ? ((showAnimationName = this
            .closeWatcher) == null || showAnimationName.destroy(), this.closeWatcher =
          new CloseWatcher, this.closeWatcher.onclose = () => {
            this.hide()
          }) : document.addEventListener("keydown", this
          .handleDocumentKeyDown), await stopAnimations(this.body), this.body.hidden = !
        1, this.popup.active = !0;
      let {
        keyframes: showKeyframes,
        options: showAnimationOptions
      } = getAnimation(this, "tooltip.show", {
        dir: this.localize.dir()
      });
      await animateTo(this.popup.popup, showKeyframes, showAnimationOptions), this.popup.reposition(), this.emit(
        "sl-after-show")
    } else {
      this.emit("sl-hide"), (showAnimationDef = this.closeWatcher) == null || showAnimationDef.destroy(),
        document.removeEventListener("keydown", this.handleDocumentKeyDown),
        await stopAnimations(this.body);
      let {
        keyframes: hideKeyframes,
        options: hideAnimationOptions
      } = getAnimation(this, "tooltip.hide", {
        dir: this.localize.dir()
      });
      await animateTo(this.popup.popup, hideKeyframes, hideAnimationOptions), this.popup.active = !1, this.body
        .hidden = !0, this.emit("sl-after-hide")
    }
  }
  async handleOptionsChange() {
    this.hasUpdated && (await this.updateComplete, this.popup.reposition())
  }
  handleDisabledChange() {
    this.disabled && this.open && this.hide()
  }
  async show() {
    if (!this.open) return this.open = !0, waitForEvent(this, "sl-after-show")
  }
  async hide() {
    if (this.open) return this.open = !1, waitForEvent(this, "sl-after-hide")
  }
  render() {
    return htmlTag`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${classMap({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `
  }
};
TooltipElement.styles = componentStyles5;
TooltipElement.dependencies = {
  "sl-popup": PopupElement
};
decorateClass([queryDecorator("slot:not([name])")], TooltipElement.prototype, "defaultSlot", 2);
decorateClass([queryDecorator(".tooltip__body")], TooltipElement.prototype, "body", 2);
decorateClass([queryDecorator("sl-popup")], TooltipElement.prototype, "popup", 2);
decorateClass([property()], TooltipElement.prototype, "content", 2);
decorateClass([property()], TooltipElement.prototype, "placement", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], TooltipElement.prototype, "disabled", 2);
decorateClass([property({
  type: Number
})], TooltipElement.prototype, "distance", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], TooltipElement.prototype, "open", 2);
decorateClass([property({
  type: Number
})], TooltipElement.prototype, "skidding", 2);
decorateClass([property()], TooltipElement.prototype, "trigger", 2);
decorateClass([property({
  type: Boolean
})], TooltipElement.prototype, "hoist", 2);
decorateClass([watchDecorator("open", {
  waitUntilFirstUpdate: !0
})], TooltipElement.prototype, "handleOpenChange", 1);
decorateClass([watchDecorator(["content", "distance", "hoist", "placement", "skidding"])], TooltipElement.prototype,
  "handleOptionsChange", 1);
decorateClass([watchDecorator("disabled")], TooltipElement.prototype, "handleDisabledChange", 1);
setDefaultAnimation("tooltip.show", {
  keyframes: [{
    opacity: 0,
    scale: .8
  }, {
    opacity: 1,
    scale: 1
  }],
  options: {
    duration: 150,
    easing: "ease"
  }
});
setDefaultAnimation("tooltip.hide", {
  keyframes: [{
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: .8
  }],
  options: {
    duration: 150,
    easing: "ease"
  }
});
TooltipElement.define("sl-tooltip");
var componentStyles7 = cssTag`
  ${componentBaseStyles}

  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`;
var DetailsElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.localize = new LocalizeController(this), this.open = !1, this
      .disabled = !1
  }
  firstUpdated() {
    this.body.style.height = this.open ? "auto" : "0", this.open && (this
      .details.open = !0), this.detailsObserver = new MutationObserver(
      mutationRecords => {
        for (let mutationRecord of mutationRecords) mutationRecord.type === "attributes" && mutationRecord.attributeName ===
          "open" && (this.details.open ? this.show() : this.hide())
      }), this.detailsObserver.observe(this.details, {
      attributes: !0
    })
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.detailsObserver.disconnect()
  }
  handleSummaryClick(summaryClickEvent) {
    summaryClickEvent.preventDefault(), this.disabled || (this.open ? this.hide() : this
      .show(), this.header.focus())
  }
  handleSummaryKeyDown(summaryKeydownEvent) {
    (summaryKeydownEvent.key === "Enter" || summaryKeydownEvent.key === " ") && (summaryKeydownEvent.preventDefault(), this.open ?
      this.hide() : this.show()), (summaryKeydownEvent.key === "ArrowUp" || summaryKeydownEvent.key ===
      "ArrowLeft") && (summaryKeydownEvent.preventDefault(), this.hide()), (summaryKeydownEvent.key ===
      "ArrowDown" || summaryKeydownEvent.key === "ArrowRight") && (summaryKeydownEvent.preventDefault(), this
      .show())
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.details.open = !0, this.emit("sl-show", {
          cancelable: !0
        })
        .defaultPrevented) {
        this.open = !1, this.details.open = !1;
        return
      }
      await stopAnimations(this.body);
      let {
        keyframes: expandKeyframes,
        options: expandAnimationOptions
      } = getAnimation(this, "details.show", {
        dir: this.localize.dir()
      });
      await animateTo(this.body, shimKeyframesHeightAuto(expandKeyframes, this.body.scrollHeight), expandAnimationOptions), this.body.style
        .height = "auto", this.emit("sl-after-show")
    } else {
      if (this.emit("sl-hide", {
          cancelable: !0
        })
        .defaultPrevented) {
        this.details.open = !0, this.open = !0;
        return
      }
      await stopAnimations(this.body);
      let {
        keyframes: collapseKeyframes,
        options: collapseAnimationOptions
      } = getAnimation(this, "details.hide", {
        dir: this.localize.dir()
      });
      await animateTo(this.body, shimKeyframesHeightAuto(collapseKeyframes, this.body.scrollHeight), collapseAnimationOptions), this.body.style
        .height = "auto", this.details.open = !1, this.emit("sl-after-hide")
    }
  }
  async show() {
    if (!(this.open || this.disabled)) return this.open = !0, waitForEvent(this,
      "sl-after-show")
  }
  async hide() {
    if (!(!this.open || this.disabled)) return this.open = !1, waitForEvent(this,
      "sl-after-hide")
  }
  render() {
    let isRtlDirection = this.localize.dir() === "rtl";
    return htmlTag`
      <details
        part="base"
        class=${classMap({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":isRtlDirection})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${isRtlDirection?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${isRtlDirection?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `
  }
};
DetailsElement.styles = componentStyles7;
DetailsElement.dependencies = {
  "sl-icon": IconElement
};
decorateClass([queryDecorator(".details")], DetailsElement.prototype, "details", 2);
decorateClass([queryDecorator(".details__header")], DetailsElement.prototype, "header", 2);
decorateClass([queryDecorator(".details__body")], DetailsElement.prototype, "body", 2);
decorateClass([queryDecorator(".details__expand-icon-slot")], DetailsElement.prototype, "expandIconSlot", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DetailsElement.prototype, "open", 2);
decorateClass([property()], DetailsElement.prototype, "summary", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DetailsElement.prototype, "disabled", 2);
decorateClass([watchDecorator("open", {
  waitUntilFirstUpdate: !0
})], DetailsElement.prototype, "handleOpenChange", 1);
setDefaultAnimation("details.show", {
  keyframes: [{
    height: "0",
    opacity: "0"
  }, {
    height: "auto",
    opacity: "1"
  }],
  options: {
    duration: 250,
    easing: "linear"
  }
});
setDefaultAnimation("details.hide", {
  keyframes: [{
    height: "auto",
    opacity: "1"
  }, {
    height: "0",
    opacity: "0"
  }],
  options: {
    duration: 250,
    easing: "linear"
  }
});
DetailsElement.define("sl-details");
var componentStyles8 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;
var TagElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.localize = new LocalizeController(this), this.variant =
      "neutral", this.size = "medium", this.pill = !1, this.removable = !1
  }
  handleRemoveClick() {
    this.emit("sl-remove")
  }
  render() {
    return htmlTag`
      <span
        part="base"
        class=${classMap({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?htmlTag`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `
  }
};
TagElement.styles = componentStyles8;
TagElement.dependencies = {
  "sl-icon-button": IconButtonElement
};
decorateClass([property({
  reflect: !0
})], TagElement.prototype, "variant", 2);
decorateClass([property({
  reflect: !0
})], TagElement.prototype, "size", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], TagElement.prototype, "pill", 2);
decorateClass([property({
  type: Boolean
})], TagElement.prototype, "removable", 2);
TagElement.define("sl-tag");
var componentStyles9 = cssTag`
  ${componentBaseStyles}

  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;
var MenuElement = class extends ShoelaceElement {
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "menu")
  }
  handleClick(clickEvent) {
    let menuItemRoles = ["menuitem", "menuitemcheckbox"],
      eventPath = clickEvent.composedPath()
      .find(pathElement => {
        var tempRoleAttr;
        return menuItemRoles.includes(((tempRoleAttr = pathElement?.getAttribute) == null ? void 0 : tempRoleAttr
          .call(pathElement, "role")) || "")
      });
    if (!eventPath) return;
    let targetMenuItem = eventPath;
    targetMenuItem.type === "checkbox" && (targetMenuItem.checked = !targetMenuItem.checked), this.emit(
      "sl-select", {
        detail: {
          item: targetMenuItem
        }
      })
  }
  handleKeyDown(keydownEvent) {
    if (keydownEvent.key === "Enter" || keydownEvent.key === " ") {
      let currentItem = this.getCurrentItem();
      keydownEvent.preventDefault(), keydownEvent.stopPropagation(), currentItem?.click()
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(keydownEvent.key)) {
      let allMenuItems = this.getAllItems(),
        currentItem = this.getCurrentItem(),
        currentIndex = currentItem ? allMenuItems.indexOf(currentItem) : 0;
      allMenuItems.length > 0 && (keydownEvent.preventDefault(), keydownEvent.stopPropagation(), keydownEvent.key ===
        "ArrowDown" ? currentIndex++ : keydownEvent.key === "ArrowUp" ? currentIndex-- : keydownEvent.key === "Home" ?
        currentIndex = 0 : keydownEvent.key === "End" && (currentIndex = allMenuItems.length - 1), currentIndex < 0 && (currentIndex = allMenuItems
          .length - 1), currentIndex > allMenuItems.length - 1 && (currentIndex = 0), this.setCurrentItem(
          allMenuItems[currentIndex]), allMenuItems[currentIndex].focus())
    }
  }
  handleMouseDown(mouseDownEvent) {
    let targetElement = mouseDownEvent.target;
    this.isMenuItem(targetElement) && this.setCurrentItem(targetElement)
  }
  handleSlotChange() {
    let allMenuItems = this.getAllItems();
    allMenuItems.length > 0 && this.setCurrentItem(allMenuItems[0])
  }
  isMenuItem(element) {
    var tempItemRole;
    return element.tagName.toLowerCase() === "sl-menu-item" || ["menuitem",
      "menuitemcheckbox", "menuitemradio"
    ].includes((tempItemRole = element.getAttribute("role")) != null ? tempItemRole : "")
  }
  getAllItems() {
    return [...this.defaultSlot.assignedElements({
      flatten: !0
    })].filter(menuItemCandidate => !(menuItemCandidate.inert || !this.isMenuItem(menuItemCandidate)))
  }
  getCurrentItem() {
    return this.getAllItems()
      .find(menuItemWithTabindex => menuItemWithTabindex.getAttribute("tabindex") === "0")
  }
  setCurrentItem(targetItem) {
    this.getAllItems()
      .forEach(menuItem => {
        menuItem.setAttribute("tabindex", menuItem === targetItem ? "0" : "-1")
      })
  }
  render() {
    return htmlTag`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `
  }
};
MenuElement.styles = componentStyles9;
decorateClass([queryDecorator("slot")], MenuElement.prototype, "defaultSlot", 2);
MenuElement.define("sl-menu");
var componentStyles10 = cssTag`
  ${componentBaseStyles}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;
var DividerElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.vertical = !1
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "separator")
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" :
      "horizontal")
  }
};
DividerElement.styles = componentStyles10;
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DividerElement.prototype, "vertical", 2);
decorateClass([watchDecorator("vertical")], DividerElement.prototype, "handleVerticalChange", 1);
DividerElement.define("sl-divider");
var FormatBytesElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.localize = new LocalizeController(this), this.value = 0, this
      .unit = "byte", this.display = "short"
  }
  render() {
    if (isNaN(this.value)) return "";
    let bitUnitPrefixes = ["", "kilo", "mega", "giga", "tera"],
      byteUnitPrefixes = ["", "kilo", "mega", "giga", "tera", "peta"],
      unitPrefixes = this.unit === "bit" ? bitUnitPrefixes : byteUnitPrefixes,
      prefixIndex = Math.max(0, Math.min(Math.floor(Math.log10(this.value) / 3), unitPrefixes
        .length - 1)),
      unitLabel = unitPrefixes[prefixIndex] + this.unit,
      scaledValue = parseFloat((this.value / Math.pow(1e3, prefixIndex))
        .toPrecision(3));
    return this.localize.number(scaledValue, {
      style: "unit",
      unit: unitLabel,
      unitDisplay: this.display
    })
  }
};
decorateClass([property({
  type: Number
})], FormatBytesElement.prototype, "value", 2);
decorateClass([property()], FormatBytesElement.prototype, "unit", 2);
decorateClass([property()], FormatBytesElement.prototype, "display", 2);
FormatBytesElement.define("sl-format-bytes");
var FormatNumberElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.localize = new LocalizeController(this), this.value = 0, this
      .type = "decimal", this.noGrouping = !1, this.currency = "USD", this
      .currencyDisplay = "symbol"
  }
  render() {
    return isNaN(this.value) ? "" : this.localize.number(this.value, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.noGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    })
  }
};
decorateClass([property({
  type: Number
})], FormatNumberElement.prototype, "value", 2);
decorateClass([property()], FormatNumberElement.prototype, "type", 2);
decorateClass([property({
  attribute: "no-grouping",
  type: Boolean
})], FormatNumberElement.prototype, "noGrouping", 2);
decorateClass([property()], FormatNumberElement.prototype, "currency", 2);
decorateClass([property({
  attribute: "currency-display"
})], FormatNumberElement.prototype, "currencyDisplay", 2);
decorateClass([property({
  attribute: "minimum-integer-digits",
  type: Number
})], FormatNumberElement.prototype, "minimumIntegerDigits", 2);
decorateClass([property({
  attribute: "minimum-fraction-digits",
  type: Number
})], FormatNumberElement.prototype, "minimumFractionDigits", 2);
decorateClass([property({
  attribute: "maximum-fraction-digits",
  type: Number
})], FormatNumberElement.prototype, "maximumFractionDigits", 2);
decorateClass([property({
  attribute: "minimum-significant-digits",
  type: Number
})], FormatNumberElement.prototype, "minimumSignificantDigits", 2);
decorateClass([property({
  attribute: "maximum-significant-digits",
  type: Number
})], FormatNumberElement.prototype, "maximumSignificantDigits", 2);
FormatNumberElement.define("sl-format-number");
var componentStyles11 = cssTag`
  ${componentBaseStyles}

  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`;
var importantKeyword = "important",
  importantSuffix = " !" + importantKeyword,
  styleMap = makeDirective(class extends DirectiveBase {
    constructor(partInfo) {
      if (super(partInfo), partInfo.type !== partTypeConstants.ATTRIBUTE || partInfo.name !== "style" || partInfo
        .strings?.length > 2) throw Error(
        "The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute."
        )
    }
    render(styleInfo) {
      return Object.keys(styleInfo)
        .reduce((accumulatedCss, stylePropertyName) => {
          let stylePropertyValue = styleInfo[stylePropertyName];
          return stylePropertyValue == null ? accumulatedCss : accumulatedCss +
            `${stylePropertyName=stylePropertyName.includes("-")?stylePropertyName:stylePropertyName.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${stylePropertyValue};`
        }, "")
    }
    update(styleAttributePart, [styleInfo]) {
      let {
        style: elementInlineStyle
      } = styleAttributePart.element;
      if (this.ft === void 0) return this.ft = new Set(Object.keys(styleInfo)), this
        .render(styleInfo);
      for (let previousStyleName of this.ft) styleInfo[previousStyleName] == null && (this.ft.delete(previousStyleName), previousStyleName.includes(
        "-") ? elementInlineStyle.removeProperty(previousStyleName) : elementInlineStyle[previousStyleName] = null);
      for (let styleName in styleInfo) {
        let styleValue = styleInfo[styleName];
        if (styleValue != null) {
          this.ft.add(styleName);
          let isImportantStyle = typeof styleValue == "string" && styleValue.endsWith(importantSuffix);
          styleName.includes("-") || isImportantStyle ? elementInlineStyle.setProperty(styleName, isImportantStyle ? styleValue.slice(0, -11) : styleValue,
            isImportantStyle ? importantKeyword : "") : elementInlineStyle[styleName] = styleValue
        }
      }
      return noChange
    }
  });
var ProgressBarElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.localize = new LocalizeController(this), this.value = 0, this
      .indeterminate = !1, this.label = ""
  }
  render() {
    return htmlTag`
      <div
        part="base"
        class=${classMap({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":this.localize.dir()==="rtl"})}
        role="progressbar"
        title=${ifDefined(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${styleMap({width:`${this.value}%`})}>
          ${this.indeterminate?"":htmlTag` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `
  }
};
ProgressBarElement.styles = componentStyles11;
decorateClass([property({
  type: Number,
  reflect: !0
})], ProgressBarElement.prototype, "value", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], ProgressBarElement.prototype, "indeterminate", 2);
decorateClass([property()], ProgressBarElement.prototype, "label", 2);
ProgressBarElement.define("sl-progress-bar");
var componentStyles12 = cssTag`
  ${componentBaseStyles}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`;
var toastStackElement = Object.assign(document.createElement("div"), {
    className: "sl-toast-stack"
  }),
  AlertElement = class extends ShoelaceElement {
    constructor() {
      super(...arguments), this.hasSlotController = new SlotController(this, "icon",
          "suffix"), this.localize = new LocalizeController(this), this.open = !1, this
        .closable = !1, this.variant = "primary", this.duration = 1 / 0
    }
    firstUpdated() {
      this.base.hidden = !this.open
    }
    restartAutoHide() {
      clearTimeout(this.autoHideTimeout), this.open && this.duration < 1 /
        0 && (this.autoHideTimeout = window.setTimeout(() => this.hide(), this
          .duration))
    }
    handleCloseClick() {
      this.hide()
    }
    handleMouseMove() {
      this.restartAutoHide()
    }
    async handleOpenChange() {
      if (this.open) {
        this.emit("sl-show"), this.duration < 1 / 0 && this.restartAutoHide(),
          await stopAnimations(this.base), this.base.hidden = !1;
        let {
          keyframes: showKeyframes,
          options: showAnimationOptions
        } = getAnimation(this, "alert.show", {
          dir: this.localize.dir()
        });
        await animateTo(this.base, showKeyframes, showAnimationOptions), this.emit("sl-after-show")
      } else {
        this.emit("sl-hide"), clearTimeout(this.autoHideTimeout), await stopAnimations(this
          .base);
        let {
          keyframes: hideKeyframes,
          options: hideAnimationOptions
        } = getAnimation(this, "alert.hide", {
          dir: this.localize.dir()
        });
        await animateTo(this.base, hideKeyframes, hideAnimationOptions), this.base.hidden = !0, this.emit(
          "sl-after-hide")
      }
    }
    handleDurationChange() {
      this.restartAutoHide()
    }
    async show() {
      if (!this.open) return this.open = !0, waitForEvent(this, "sl-after-show")
    }
    async hide() {
      if (this.open) return this.open = !1, waitForEvent(this, "sl-after-hide")
    }
    async toast() {
      return new Promise(resolveToastPromise => {
        toastStackElement.parentElement === null && document.body.append(toastStackElement), toastStackElement
          .appendChild(this), requestAnimationFrame(() => {
            this.clientWidth, this.show()
          }), this.addEventListener("sl-after-hide", () => {
            toastStackElement.removeChild(this), resolveToastPromise(), toastStackElement.querySelector("sl-alert") ===
              null && toastStackElement.remove()
          }, {
            once: !0
          })
      })
    }
    render() {
      return htmlTag`
      <div
        part="base"
        class=${classMap({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?htmlTag`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `
    }
  };
AlertElement.styles = componentStyles12;
AlertElement.dependencies = {
  "sl-icon-button": IconButtonElement
};
decorateClass([queryDecorator('[part~="base"]')], AlertElement.prototype, "base", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], AlertElement.prototype, "open", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], AlertElement.prototype, "closable", 2);
decorateClass([property({
  reflect: !0
})], AlertElement.prototype, "variant", 2);
decorateClass([property({
  type: Number
})], AlertElement.prototype, "duration", 2);
decorateClass([watchDecorator("open", {
  waitUntilFirstUpdate: !0
})], AlertElement.prototype, "handleOpenChange", 1);
decorateClass([watchDecorator("duration")], AlertElement.prototype, "handleDurationChange", 1);
setDefaultAnimation("alert.show", {
  keyframes: [{
    opacity: 0,
    scale: .8
  }, {
    opacity: 1,
    scale: 1
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("alert.hide", {
  keyframes: [{
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: .8
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
AlertElement.define("sl-alert");
var componentStyles13 = cssTag`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;
var componentStyles14 = cssTag`
  ${componentBaseStyles}
  ${componentStyles13}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;
var defaultValueDecorator = (trackedPropertyName = "value") => (elementPrototype, decoratedPropKey) => {
  let elementConstructor = elementPrototype.constructor,
    originalAttrChangedCallback = elementConstructor.prototype.attributeChangedCallback;
  elementConstructor.prototype.attributeChangedCallback = function(changedAttrName, oldAttrValue, newAttrValue) {
    var tempConverter;
    let propertyOptions = elementConstructor.getPropertyOptions(trackedPropertyName),
      attributeName = typeof propertyOptions.attribute == "string" ? propertyOptions.attribute : trackedPropertyName;
    if (changedAttrName === attributeName) {
      let attributeConverter = propertyOptions.converter || defaultConverter,
        fromAttributeFn = (typeof attributeConverter == "function" ? attributeConverter : (tempConverter = attributeConverter?.fromAttribute) != null ?
          tempConverter : defaultConverter.fromAttribute)(newAttrValue, propertyOptions.type);
      this[trackedPropertyName] !== fromAttributeFn && (this[decoratedPropKey] = fromAttributeFn)
    }
    originalAttrChangedCallback.call(this, changedAttrName, oldAttrValue, newAttrValue)
  }
};
var toggleAttributeDirective = makeDirective(class extends DirectiveBase {
  constructor(partInfo) {
    if (super(partInfo), partInfo.type !== partTypeConstants.PROPERTY && partInfo.type !== partTypeConstants.ATTRIBUTE && partInfo
      .type !== partTypeConstants.BOOLEAN_ATTRIBUTE) throw Error(
      "The `live` directive is not allowed on child or event bindings"
      );
    if (!isCompiledTemplateResult(partInfo)) throw Error(
      "`live` bindings can only contain a single expression")
  }
  render(directiveValue) {
    return directiveValue
  }
  update(boundAttributePart, [directiveValue]) {
    if (directiveValue === noChange || directiveValue === nothing) return directiveValue;
    let boundElement = boundAttributePart.element,
      boundAttributeName = boundAttributePart.name;
    if (boundAttributePart.type === partTypeConstants.PROPERTY) {
      if (directiveValue === boundElement[boundAttributeName]) return noChange
    } else if (boundAttributePart.type === partTypeConstants.BOOLEAN_ATTRIBUTE) {
      if (!!directiveValue === boundElement.hasAttribute(boundAttributeName)) return noChange
    } else if (boundAttributePart.type === partTypeConstants.ATTRIBUTE && boundElement.getAttribute(boundAttributeName) === directiveValue + "")
      return noChange;
    return setChildPartValue(boundAttributePart), directiveValue
  }
});
var TextareaElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.formControlController = new FormControlController(this, {
        assumeInteractionOn: ["sl-blur", "sl-input"]
      }), this.hasSlotController = new SlotController(this, "help-text", "label"), this
      .hasFocus = !1, this.title = "", this.name = "", this.value = "", this
      .size = "medium", this.filled = !1, this.label = "", this.helpText =
      "", this.placeholder = "", this.rows = 4, this.resize = "vertical",
      this.disabled = !1, this.readonly = !1, this.form = "", this
      .required = !1, this.spellcheck = !0, this.defaultValue = ""
  }
  get validity() {
    return this.input.validity
  }
  get validationMessage() {
    return this.input.validationMessage
  }
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver = new ResizeObserver(
    () => this.setTextareaHeight()), this.updateComplete.then(() => {
      this.setTextareaHeight(), this.resizeObserver.observe(this.input)
    })
  }
  firstUpdated() {
    this.formControlController.updateValidity()
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver.unobserve(this.input)
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur")
  }
  handleChange() {
    this.value = this.input.value, this.setTextareaHeight(), this.emit(
      "sl-change")
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus")
  }
  handleInput() {
    this.value = this.input.value, this.emit("sl-input")
  }
  handleInvalid(invalidEvent) {
    this.formControlController.setValidity(!1), this.formControlController
      .emitInvalidEvent(invalidEvent)
  }
  setTextareaHeight() {
    this.resize === "auto" ? (this.input.style.height = "auto", this.input
        .style.height = `${this.input.scrollHeight}px`) : this.input.style
      .height = void 0
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled)
  }
  handleRowsChange() {
    this.setTextareaHeight()
  }
  async handleValueChange() {
    await this.updateComplete, this.formControlController.updateValidity(),
      this.setTextareaHeight()
  }
  focus(focusOptions) {
    this.input.focus(focusOptions)
  }
  blur() {
    this.input.blur()
  }
  select() {
    this.input.select()
  }
  scrollPosition(scrollPositionValue) {
    if (scrollPositionValue) {
      typeof scrollPositionValue.top == "number" && (this.input.scrollTop = scrollPositionValue.top), typeof scrollPositionValue
        .left == "number" && (this.input.scrollLeft = scrollPositionValue.left);
      return
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    }
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection)
  }
  setRangeText(replacementText, rangeStart, rangeEnd, selectionMode = "preserve") {
    let effectiveRangeStart = rangeStart ?? this.input.selectionStart,
      effectiveRangeEnd = rangeEnd ?? this.input.selectionEnd;
    this.input.setRangeText(replacementText, effectiveRangeStart, effectiveRangeEnd, selectionMode), this.value !== this.input.value &&
      (this.value = this.input.value, this.setTextareaHeight())
  }
  checkValidity() {
    return this.input.checkValidity()
  }
  getForm() {
    return this.formControlController.getForm()
  }
  reportValidity() {
    return this.input.reportValidity()
  }
  setCustomValidity(validationMessage) {
    this.input.setCustomValidity(validationMessage), this.formControlController
      .updateValidity()
  }
  render() {
    let hasLabelSlot = this.hasSlotController.test("label"),
      hasHelpTextSlot = this.hasSlotController.test("help-text"),
      showLabel = this.label ? !0 : !!hasLabelSlot,
      showHelpText = this.helpText ? !0 : !!hasHelpTextSlot;
    return htmlTag`
      <div
        part="form-control"
        class=${classMap({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":showLabel,"form-control--has-help-text":showHelpText})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${showLabel?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${classMap({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${ifDefined(this.name)}
              .value=${toggleAttributeDirective(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${ifDefined(this.placeholder)}
              rows=${ifDefined(this.rows)}
              minlength=${ifDefined(this.minlength)}
              maxlength=${ifDefined(this.maxlength)}
              autocapitalize=${ifDefined(this.autocapitalize)}
              autocorrect=${ifDefined(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${ifDefined(this.spellcheck)}
              enterkeyhint=${ifDefined(this.enterkeyhint)}
              inputmode=${ifDefined(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${showHelpText?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `
  }
};
TextareaElement.styles = componentStyles14;
decorateClass([queryDecorator(".textarea__control")], TextareaElement.prototype, "input", 2);
decorateClass([stateDecorator()], TextareaElement.prototype, "hasFocus", 2);
decorateClass([property()], TextareaElement.prototype, "title", 2);
decorateClass([property()], TextareaElement.prototype, "name", 2);
decorateClass([property()], TextareaElement.prototype, "value", 2);
decorateClass([property({
  reflect: !0
})], TextareaElement.prototype, "size", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], TextareaElement.prototype, "filled", 2);
decorateClass([property()], TextareaElement.prototype, "label", 2);
decorateClass([property({
  attribute: "help-text"
})], TextareaElement.prototype, "helpText", 2);
decorateClass([property()], TextareaElement.prototype, "placeholder", 2);
decorateClass([property({
  type: Number
})], TextareaElement.prototype, "rows", 2);
decorateClass([property()], TextareaElement.prototype, "resize", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], TextareaElement.prototype, "disabled", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], TextareaElement.prototype, "readonly", 2);
decorateClass([property({
  reflect: !0
})], TextareaElement.prototype, "form", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], TextareaElement.prototype, "required", 2);
decorateClass([property({
  type: Number
})], TextareaElement.prototype, "minlength", 2);
decorateClass([property({
  type: Number
})], TextareaElement.prototype, "maxlength", 2);
decorateClass([property()], TextareaElement.prototype, "autocapitalize", 2);
decorateClass([property()], TextareaElement.prototype, "autocorrect", 2);
decorateClass([property()], TextareaElement.prototype, "autocomplete", 2);
decorateClass([property({
  type: Boolean
})], TextareaElement.prototype, "autofocus", 2);
decorateClass([property()], TextareaElement.prototype, "enterkeyhint", 2);
decorateClass([property({
  type: Boolean,
  converter: {
    fromAttribute: checkedAttrValue => !(!checkedAttrValue || checkedAttrValue === "false"),
    toAttribute: checkedBoolValue => checkedBoolValue ? "true" : "false"
  }
})], TextareaElement.prototype, "spellcheck", 2);
decorateClass([property()], TextareaElement.prototype, "inputmode", 2);
decorateClass([defaultValueDecorator()], TextareaElement.prototype, "defaultValue", 2);
decorateClass([watchDecorator("disabled", {
  waitUntilFirstUpdate: !0
})], TextareaElement.prototype, "handleDisabledChange", 1);
decorateClass([watchDecorator("rows", {
  waitUntilFirstUpdate: !0
})], TextareaElement.prototype, "handleRowsChange", 1);
decorateClass([watchDecorator("value", {
  waitUntilFirstUpdate: !0
})], TextareaElement.prototype, "handleValueChange", 1);
TextareaElement.define("sl-textarea");
var componentStyles15 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;
var computedStyleCache = new WeakMap;

function getCachedComputedStyle(element) {
  let cachedStyle = computedStyleCache.get(element);
  return cachedStyle || (cachedStyle = window.getComputedStyle(element, null), computedStyleCache.set(element, cachedStyle)), cachedStyle
}

function isElementVisible(element) {
  if (typeof element.checkVisibility == "function") return element.checkVisibility({
    checkOpacity: !1,
    checkVisibilityCSS: !0
  });
  let computedStyle = getCachedComputedStyle(element);
  return computedStyle.visibility !== "hidden" && computedStyle.display !== "none"
}

function isScrollableElement(element) {
  let computedStyle = getCachedComputedStyle(element),
    {
      overflowY: overflowYValue,
      overflowX: overflowXValue
    } = computedStyle;
  return overflowYValue === "scroll" || overflowXValue === "scroll" ? !0 : overflowYValue !== "auto" || overflowXValue !== "auto" ?
    !1 : element.scrollHeight > element.clientHeight && overflowYValue === "auto" || element.scrollWidth > element
    .clientWidth && overflowXValue === "auto"
}

function isElementTabbable(element) {
  let tagName = element.tagName.toLowerCase(),
    tabindexValue = Number(element.getAttribute("tabindex"));
  return element.hasAttribute("tabindex") && (isNaN(tabindexValue) || tabindexValue <= -1) || element.hasAttribute(
    "disabled") || element.closest("[inert]") || tagName === "input" && element.getAttribute(
    "type") === "radio" && !element.hasAttribute("checked") || !isElementVisible(element) ? !1 : (tagName ===
    "audio" || tagName === "video") && element.hasAttribute("controls") || element.hasAttribute(
    "tabindex") || element.hasAttribute("contenteditable") && element.getAttribute(
    "contenteditable") !== "false" || ["button", "input", "select",
    "textarea", "a", "audio", "video", "summary", "iframe"
  ].includes(tagName) ? !0 : isScrollableElement(element)
}

function getTabbableBoundary(rootElement) {
  var tempFirstTabbable, tempLastTabbable;
  let tabbableElements = getTabbableElements(rootElement),
    firstTabbable = (tempFirstTabbable = tabbableElements[0]) != null ? tempFirstTabbable : null,
    lastTabbable = (tempLastTabbable = tabbableElements[tabbableElements.length - 1]) != null ? tempLastTabbable : null;
  return {
    start: firstTabbable,
    end: lastTabbable
  }
}

function isTabbableInContext(element, contextRoot) {
  var tempCheckResult;
  return ((tempCheckResult = element.getRootNode({
    composed: !0
  })) == null ? void 0 : tempCheckResult.host) !== contextRoot
}

function getTabbableElements(rootElement) {
  let visitedNodes = new WeakMap,
    tabbableList = [];

  function traverseNode(currentNode) {
    if (currentNode instanceof Element) {
      if (currentNode.hasAttribute("inert") || currentNode.closest("[inert]") || visitedNodes.has(currentNode)) return;
      visitedNodes.set(currentNode, !0), !tabbableList.includes(currentNode) && isElementTabbable(currentNode) && tabbableList.push(currentNode),
        currentNode instanceof HTMLSlotElement && isTabbableInContext(currentNode, rootElement) && currentNode.assignedElements({
          flatten: !0
        })
        .forEach(slotAssignedElement => {
          traverseNode(slotAssignedElement)
        }), currentNode.shadowRoot !== null && currentNode.shadowRoot.mode === "open" && traverseNode(currentNode
          .shadowRoot)
    }
    for (let childElement of currentNode.children) traverseNode(childElement)
  }
  return traverseNode(rootElement), tabbableList.sort((tabbableA, tabbableB) => {
    let tabindexA = Number(tabbableA.getAttribute("tabindex")) || 0;
    return (Number(tabbableB.getAttribute("tabindex")) || 0) - tabindexA
  })
}
var DropdownElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.localize = new LocalizeController(this), this.open = !1, this
      .placement = "bottom-start", this.disabled = !1, this
      .stayOpenOnSelect = !1, this.distance = 0, this.skidding = 0, this
      .hoist = !1, this.handleKeyDown = keydownEvent => {
        this.open && keydownEvent.key === "Escape" && (keydownEvent.stopPropagation(), this
        .hide(), this.focusOnTrigger())
      }, this.handleDocumentKeyDown = documentKeydownEvent => {
        var tempKeyTarget;
        if (documentKeydownEvent.key === "Escape" && this.open && !this.closeWatcher) {
          documentKeydownEvent.stopPropagation(), this.focusOnTrigger(), this.hide();
          return
        }
        if (documentKeydownEvent.key === "Tab") {
          if (this.open && ((tempKeyTarget = document.activeElement) == null ? void 0 :
              tempKeyTarget.tagName.toLowerCase()) === "sl-menu-item") {
            documentKeydownEvent.preventDefault(), this.hide(), this.focusOnTrigger();
            return
          }
          setTimeout(() => {
            var tempContainingElement, tempActiveElement, tempComposedPath;
            let containingElement = ((tempContainingElement = this.containingElement) == null ? void 0 : tempContainingElement
                .getRootNode()) instanceof ShadowRoot ? (tempComposedPath = (tempActiveElement =
                  document.activeElement) == null ? void 0 : tempActiveElement
                .shadowRoot) == null ? void 0 : tempComposedPath.activeElement :
              document.activeElement;
            (!this.containingElement || containingElement?.closest(this
                .containingElement.tagName.toLowerCase()) !== this
              .containingElement) && this.hide()
          })
        }
      }, this.handleDocumentMouseDown = documentMouseDownEvent => {
        let eventPath = documentMouseDownEvent.composedPath();
        this.containingElement && !eventPath.includes(this.containingElement) &&
          this.hide()
      }, this.handlePanelSelect = panelSelectEvent => {
        let selectedItem = panelSelectEvent.target;
        !this.stayOpenOnSelect && selectedItem.tagName.toLowerCase() === "sl-menu" && (
          this.hide(), this.focusOnTrigger())
      }
  }
  connectedCallback() {
    super.connectedCallback(), this.containingElement || (this
      .containingElement = this)
  }
  firstUpdated() {
    this.panel.hidden = !this.open, this.open && (this.addOpenListeners(),
      this.popup.active = !0)
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeOpenListeners(), this.hide()
  }
  focusOnTrigger() {
    let triggerAssignedElements = this.trigger.assignedElements({
      flatten: !0
    })[0];
    typeof triggerAssignedElements?.focus == "function" && triggerAssignedElements.focus()
  }
  getMenu() {
    return this.panel.assignedElements({
        flatten: !0
      })
      .find(menuCandidate => menuCandidate.tagName.toLowerCase() === "sl-menu")
  }
  handleTriggerClick() {
    this.open ? this.hide() : (this.show(), this.focusOnTrigger())
  }
  async handleTriggerKeyDown(triggerKeydownEvent) {
    if ([" ", "Enter"].includes(triggerKeydownEvent.key)) {
      triggerKeydownEvent.preventDefault(), this.handleTriggerClick();
      return
    }
    let dropdownMenu = this.getMenu();
    if (dropdownMenu) {
      let menuItems = dropdownMenu.getAllItems(),
        firstMenuItem = menuItems[0],
        lastMenuItem = menuItems[menuItems.length - 1];
      ["ArrowDown", "ArrowUp", "Home", "End"].includes(triggerKeydownEvent.key) && (triggerKeydownEvent
        .preventDefault(), this.open || (this.show(), await this
          .updateComplete), menuItems.length > 0 && this.updateComplete.then(
      () => {
          (triggerKeydownEvent.key === "ArrowDown" || triggerKeydownEvent.key === "Home") && (dropdownMenu
            .setCurrentItem(firstMenuItem), firstMenuItem.focus()), (triggerKeydownEvent.key === "ArrowUp" || triggerKeydownEvent
            .key === "End") && (dropdownMenu.setCurrentItem(lastMenuItem), lastMenuItem.focus())
        }))
    }
  }
  handleTriggerKeyUp(triggerKeyupEvent) {
    triggerKeyupEvent.key === " " && triggerKeyupEvent.preventDefault()
  }
  handleTriggerSlotChange() {
    this.updateAccessibleTrigger()
  }
  updateAccessibleTrigger() {
    let triggerAssignedElements = this.trigger.assignedElements({
        flatten: !0
      })
      .find(triggerElement => getTabbableBoundary(triggerElement)
        .start),
      firstFocusableItem;
    if (triggerAssignedElements) {
      switch (triggerAssignedElements.tagName.toLowerCase()) {
        case "sl-button":
        case "sl-icon-button":
          firstFocusableItem = triggerAssignedElements.button;
          break;
        default:
          firstFocusableItem = triggerAssignedElements
      }
      firstFocusableItem.setAttribute("aria-haspopup", "true"), firstFocusableItem.setAttribute(
        "aria-expanded", this.open ? "true" : "false")
    }
  }
  async show() {
    if (!this.open) return this.open = !0, waitForEvent(this, "sl-after-show")
  }
  async hide() {
    if (this.open) return this.open = !1, waitForEvent(this, "sl-after-hide")
  }
  reposition() {
    this.popup.reposition()
  }
  addOpenListeners() {
    var tempAnchorRef;
    this.panel.addEventListener("sl-select", this.handlePanelSelect),
      "CloseWatcher" in window ? ((tempAnchorRef = this.closeWatcher) == null || tempAnchorRef
        .destroy(), this.closeWatcher = new CloseWatcher, this.closeWatcher
        .onclose = () => {
          this.hide(), this.focusOnTrigger()
        }) : this.panel.addEventListener("keydown", this.handleKeyDown),
      document.addEventListener("keydown", this.handleDocumentKeyDown),
      document.addEventListener("mousedown", this.handleDocumentMouseDown)
  }
  removeOpenListeners() {
    var tempPanelRef;
    this.panel && (this.panel.removeEventListener("sl-select", this
        .handlePanelSelect), this.panel.removeEventListener("keydown",
        this.handleKeyDown)), document.removeEventListener("keydown", this
        .handleDocumentKeyDown), document.removeEventListener("mousedown",
        this.handleDocumentMouseDown), (tempPanelRef = this.closeWatcher) == null || tempPanelRef
      .destroy()
  }
  async handleOpenChange() {
    if (this.disabled) {
      this.open = !1;
      return
    }
    if (this.updateAccessibleTrigger(), this.open) {
      this.emit("sl-show"), this.addOpenListeners(), await stopAnimations(this), this
        .panel.hidden = !1, this.popup.active = !0;
      let {
        keyframes: showKeyframes,
        options: showAnimationOptions
      } = getAnimation(this, "dropdown.show", {
        dir: this.localize.dir()
      });
      await animateTo(this.popup.popup, showKeyframes, showAnimationOptions), this.emit("sl-after-show")
    } else {
      this.emit("sl-hide"), this.removeOpenListeners(), await stopAnimations(this);
      let {
        keyframes: hideKeyframes,
        options: hideAnimationOptions
      } = getAnimation(this, "dropdown.hide", {
        dir: this.localize.dir()
      });
      await animateTo(this.popup.popup, hideKeyframes, hideAnimationOptions), this.panel.hidden = !0, this.popup
        .active = !1, this.emit("sl-after-hide")
    }
  }
  render() {
    return htmlTag`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        class=${classMap({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `
  }
};
DropdownElement.styles = componentStyles15;
DropdownElement.dependencies = {
  "sl-popup": PopupElement
};
decorateClass([queryDecorator(".dropdown")], DropdownElement.prototype, "popup", 2);
decorateClass([queryDecorator(".dropdown__trigger")], DropdownElement.prototype, "trigger", 2);
decorateClass([queryDecorator(".dropdown__panel")], DropdownElement.prototype, "panel", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DropdownElement.prototype, "open", 2);
decorateClass([property({
  reflect: !0
})], DropdownElement.prototype, "placement", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DropdownElement.prototype, "disabled", 2);
decorateClass([property({
  attribute: "stay-open-on-select",
  type: Boolean,
  reflect: !0
})], DropdownElement.prototype, "stayOpenOnSelect", 2);
decorateClass([property({
  attribute: !1
})], DropdownElement.prototype, "containingElement", 2);
decorateClass([property({
  type: Number
})], DropdownElement.prototype, "distance", 2);
decorateClass([property({
  type: Number
})], DropdownElement.prototype, "skidding", 2);
decorateClass([property({
  type: Boolean
})], DropdownElement.prototype, "hoist", 2);
decorateClass([watchDecorator("open", {
  waitUntilFirstUpdate: !0
})], DropdownElement.prototype, "handleOpenChange", 1);
setDefaultAnimation("dropdown.show", {
  keyframes: [{
    opacity: 0,
    scale: .9
  }, {
    opacity: 1,
    scale: 1
  }],
  options: {
    duration: 100,
    easing: "ease"
  }
});
setDefaultAnimation("dropdown.hide", {
  keyframes: [{
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: .9
  }],
  options: {
    duration: 100,
    easing: "ease"
  }
});
DropdownElement.define("sl-dropdown");
var componentStyles16 = cssTag`
  ${componentBaseStyles}

  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;
var notifyChildrenConnected = (parentDirective, isConnected) => {
    let disconnectableChildren = parentDirective._$AN;
    if (disconnectableChildren === void 0) return !1;
    for (let childDisconnectable of disconnectableChildren) childDisconnectable._$AO?.(isConnected, !1), notifyChildrenConnected(childDisconnectable, isConnected);
    return !0
  },
  removeFromParentDisconnectables = disconnectableChild => {
    let parentDisconnectable, childrenSet;
    do {
      if ((parentDisconnectable = disconnectableChild._$AM) === void 0) break;
      childrenSet = parentDisconnectable._$AN, childrenSet.delete(disconnectableChild), disconnectableChild = parentDisconnectable
    } while (childrenSet?.size === 0)
  },
  addToParentDisconnectables = disconnectableChild => {
    for (let parentDirective; parentDirective = disconnectableChild._$AM; disconnectableChild = parentDirective) {
      let parentChildrenSet = parentDirective._$AN;
      if (parentChildrenSet === void 0) parentDirective._$AN = parentChildrenSet = new Set;
      else if (parentChildrenSet.has(disconnectableChild)) break;
      parentChildrenSet.add(disconnectableChild), attachDisconnectableToPart(parentDirective)
    }
  };

function reparentDisconnectables(childPart) {
  this._$AN !== void 0 ? (removeFromParentDisconnectables(this), this._$AM = childPart, addToParentDisconnectables(this)) : this._$AM = childPart
}

function setChildrenConnected(isConnectedState, isClearingValue = !1, startChildIndex = 0) {
  let partValue = this._$AH,
    disconnectables = this._$AN;
  if (disconnectables !== void 0 && disconnectables.size !== 0)
    if (isClearingValue)
      if (Array.isArray(partValue))
        for (let childValueIndex = startChildIndex; childValueIndex < partValue.length; childValueIndex++) notifyChildrenConnected(partValue[childValueIndex], !1), removeFromParentDisconnectables(partValue[childValueIndex]);
      else partValue != null && (notifyChildrenConnected(partValue, !1), removeFromParentDisconnectables(partValue));
  else notifyChildrenConnected(this, isConnectedState)
}
var attachDisconnectableToPart = childPart => {
    childPart.type == partTypeConstants.CHILD && (childPart._$AP ??= setChildrenConnected, childPart._$AQ ??= reparentDisconnectables)
  },
  AsyncDirective = class extends DirectiveBase {
    constructor() {
      super(...arguments), this._$AN = void 0
    }
    _$AT(directivePart, directiveParent, attributeIndex) {
      super._$AT(directivePart, directiveParent, attributeIndex), addToParentDisconnectables(this), this.isConnected = directivePart._$AU
    }
    _$AO(isConnected, shouldRemoveFromParent = !0) {
      isConnected !== this.isConnected && (this.isConnected = isConnected, isConnected ? this.reconnected?.
      () : this.disconnected?.()), shouldRemoveFromParent && (notifyChildrenConnected(this, isConnected), removeFromParentDisconnectables(this))
    }
    setValue(newValue) {
      if (isCompiledTemplateResult(this._$Ct)) this._$Ct._$AI(newValue, this);
      else {
        let committedValues = [...this._$Ct._$AH];
        committedValues[this._$Ci] = newValue, this._$Ct._$AI(committedValues, this, 0)
      }
    }
    disconnected() {}
    reconnected() {}
  };
var makeRefState = () => new RefStore,
  RefStore = class {},
  refCallbackCache = new WeakMap,
  ref = makeDirective(class extends AsyncDirective {
    render(refValue) {
      return nothing
    }
    update(refElementPart, [refArg]) {
      let refChanged = refArg !== this.Y;
      return refChanged && this.Y !== void 0 && this.rt(void 0), (refChanged || this.lt !==
        this.ct) && (this.Y = refArg, this.ht = refElementPart.options?.host, this.rt(this
        .ct = refElementPart.element)), nothing
    }
    rt(refTargetElement) {
      if (typeof this.Y == "function") {
        let refContext = this.ht ?? globalThis,
          contextRefCache = refCallbackCache.get(refContext);
        contextRefCache === void 0 && (contextRefCache = new WeakMap, refCallbackCache.set(refContext, contextRefCache)), contextRefCache.get(this.Y) !==
          void 0 && this.Y.call(this.ht, void 0), contextRefCache.set(this.Y, refTargetElement), refTargetElement !==
          void 0 && this.Y.call(this.ht, refTargetElement)
      } else this.Y.value = refTargetElement
    }
    get lt() {
      return typeof this.Y == "function" ? refCallbackCache.get(this.ht ?? globalThis)
        ?.get(this.Y) : this.Y?.value
    }
    disconnected() {
      this.lt === this.ct && this.rt(void 0)
    }
    reconnected() {
      this.rt(this.ct)
    }
  });
var SubmenuController = class {
  constructor(hostElement, hostController, submenuConfig) {
    this.popupRef = makeRefState(), this.enableSubmenuTimer = -1, this.isConnected = !
      1, this.isPopupConnected = !1, this.skidding = 0, this
      .submenuOpenDelay = 100, this.handleMouseMove = mouseMoveEvent => {
        this.host.style.setProperty("--safe-triangle-cursor-x",
          `${mouseMoveEvent.clientX}px`), this.host.style.setProperty(
          "--safe-triangle-cursor-y", `${mouseMoveEvent.clientY}px`)
      }, this.handleMouseOver = () => {
        this.hasSlotController.test("submenu") && this.enableSubmenu()
      }, this.handleKeyDown = keydownEvent => {
        switch (keydownEvent.key) {
          case "Escape":
          case "Tab":
            this.disableSubmenu();
            break;
          case "ArrowLeft":
            keydownEvent.target !== this.host && (keydownEvent.preventDefault(), keydownEvent
              .stopPropagation(), this.host.focus(), this.disableSubmenu()
              );
            break;
          case "ArrowRight":
          case "Enter":
          case " ":
            this.handleSubmenuEntry(keydownEvent);
            break;
          default:
            break
        }
      }, this.handleClick = clickEvent => {
        var tempSubmenuItem;
        clickEvent.target === this.host ? (clickEvent.preventDefault(), clickEvent.stopPropagation()) :
          clickEvent.target instanceof Element && (clickEvent.target.tagName ===
            "sl-menu-item" || (tempSubmenuItem = clickEvent.target.role) != null && tempSubmenuItem.startsWith(
              "menuitem")) && this.disableSubmenu()
      }, this.handleFocusOut = focusOutEvent => {
        focusOutEvent.relatedTarget && focusOutEvent.relatedTarget instanceof Element && this.host
          .contains(focusOutEvent.relatedTarget) || this.disableSubmenu()
      }, this.handlePopupMouseover = popupMouseoverEvent => {
        popupMouseoverEvent.stopPropagation()
      }, this.handlePopupReposition = () => {
        let submenuSlot = this.host.renderRoot.querySelector("slot[name='submenu']"),
          submenuElements = submenuSlot?.assignedElements({
            flatten: !0
          })
          .filter(assignedSubmenuElement => assignedSubmenuElement.localName === "sl-menu")[0],
          isRtlDirection = this.localize.dir() === "rtl";
        if (!submenuElements) return;
        let {
          left: anchorLeft,
          top: anchorTop,
          width: anchorWidth,
          height: anchorHeight
        } = submenuElements.getBoundingClientRect();
        this.host.style.setProperty("--safe-triangle-submenu-start-x",
            `${isRtlDirection?anchorLeft+anchorWidth:anchorLeft}px`), this.host.style.setProperty(
            "--safe-triangle-submenu-start-y", `${anchorTop}px`), this.host.style
          .setProperty("--safe-triangle-submenu-end-x", `${isRtlDirection?anchorLeft+anchorWidth:anchorLeft}px`),
          this.host.style.setProperty("--safe-triangle-submenu-end-y",
            `${anchorTop+anchorHeight}px`)
      }, (this.host = hostElement)
      .addController(this), this.hasSlotController = hostController, this.localize = submenuConfig
  }
  hostConnected() {
    this.hasSlotController.test("submenu") && !this.host.disabled && this
      .addListeners()
  }
  hostDisconnected() {
    this.removeListeners()
  }
  hostUpdated() {
    this.hasSlotController.test("submenu") && !this.host.disabled ? (this
      .addListeners(), this.updateSkidding()) : this.removeListeners()
  }
  addListeners() {
    this.isConnected || (this.host.addEventListener("mousemove", this
        .handleMouseMove), this.host.addEventListener("mouseover", this
        .handleMouseOver), this.host.addEventListener("keydown", this
        .handleKeyDown), this.host.addEventListener("click", this
        .handleClick), this.host.addEventListener("focusout", this
        .handleFocusOut), this.isConnected = !0), this.isPopupConnected ||
      this.popupRef.value && (this.popupRef.value.addEventListener(
          "mouseover", this.handlePopupMouseover), this.popupRef.value
        .addEventListener("sl-reposition", this.handlePopupReposition), this
        .isPopupConnected = !0)
  }
  removeListeners() {
    this.isConnected && (this.host.removeEventListener("mousemove", this
        .handleMouseMove), this.host.removeEventListener("mouseover", this
        .handleMouseOver), this.host.removeEventListener("keydown", this
        .handleKeyDown), this.host.removeEventListener("click", this
        .handleClick), this.host.removeEventListener("focusout", this
        .handleFocusOut), this.isConnected = !1), this.isPopupConnected &&
      this.popupRef.value && (this.popupRef.value.removeEventListener(
          "mouseover", this.handlePopupMouseover), this.popupRef.value
        .removeEventListener("sl-reposition", this.handlePopupReposition),
        this.isPopupConnected = !1)
  }
  handleSubmenuEntry(submenuEntryEvent) {
    let submenuSlot = this.host.renderRoot.querySelector("slot[name='submenu']");
    if (!submenuSlot) {
      console.error(
        "Cannot activate a submenu if no corresponding menuitem can be found.",
        this);
      return
    }
    let submenuElement = null;
    for (let assignedSubmenuElement of submenuSlot.assignedElements())
      if (submenuElement = assignedSubmenuElement.querySelectorAll("sl-menu-item, [role^='menuitem']"), submenuElement
        .length !== 0) break;
    if (!(!submenuElement || submenuElement.length === 0)) {
      submenuElement[0].setAttribute("tabindex", "0");
      for (let submenuItemIndex = 1; submenuItemIndex !== submenuElement.length; ++submenuItemIndex) submenuElement[submenuItemIndex].setAttribute("tabindex",
        "-1");
      this.popupRef.value && (submenuEntryEvent.preventDefault(), submenuEntryEvent.stopPropagation(), this
        .popupRef.value.active ? submenuElement[0] instanceof HTMLElement && submenuElement[0]
        .focus() : (this.enableSubmenu(!1), this.host.updateComplete.then(
          () => {
            submenuElement[0] instanceof HTMLElement && submenuElement[0].focus()
          }), this.host.requestUpdate()))
    }
  }
  setSubmenuState(isSubmenuOpen) {
    this.popupRef.value && this.popupRef.value.active !== isSubmenuOpen && (this
      .popupRef.value.active = isSubmenuOpen, this.host.requestUpdate())
  }
  enableSubmenu(isSubmenuEnabled = !0) {
    isSubmenuEnabled ? this.enableSubmenuTimer = window.setTimeout(() => {
      this.setSubmenuState(!0)
    }, this.submenuOpenDelay) : this.setSubmenuState(!0)
  }
  disableSubmenu() {
    clearTimeout(this.enableSubmenuTimer), this.setSubmenuState(!1)
  }
  updateSkidding() {
    var tempSubmenuSlot;
    if (!((tempSubmenuSlot = this.host.parentElement) != null && tempSubmenuSlot.computedStyleMap))
      return;
    let parentStyleMap = this.host.parentElement.computedStyleMap(),
      verticalOffset = ["padding-top", "border-top-width", "margin-top"].reduce((accumulatedOffset,
      stylePropertyName) => {
        var tempStyleValue;
        let styleValue = (tempStyleValue = parentStyleMap.get(stylePropertyName)) != null ? tempStyleValue : new CSSUnitValue(0, "px"),
          pixelValue = (styleValue instanceof CSSUnitValue ? styleValue : new CSSUnitValue(0, "px"))
          .to("px");
        return accumulatedOffset - pixelValue.value
      }, 0);
    this.skidding = verticalOffset
  }
  isExpanded() {
    return this.popupRef.value ? this.popupRef.value.active : !1
  }
  renderSubmenu() {
    let isLtrDirection = this.localize.dir() === "ltr";
    return this.isConnected ? htmlTag`
      <sl-popup
        ${ref(this.popupRef)}
        placement=${isLtrDirection?"right-start":"left-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    ` : htmlTag` <slot name="submenu" hidden></slot> `
  }
};
var MenuItemElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.type = "normal", this.checked = !1, this
      .value = "", this.loading = !1, this.disabled = !1, this.localize =
      new LocalizeController(this), this.hasSlotController = new SlotController(this, "submenu"), this
      .submenuController = new SubmenuController(this, this.hasSlotController, this
        .localize), this.handleHostClick = hostClickEvent => {
        this.disabled && (hostClickEvent.preventDefault(), hostClickEvent.stopImmediatePropagation())
      }, this.handleMouseOver = mouseOverEvent => {
        this.focus(), mouseOverEvent.stopPropagation()
      }
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this
      .handleHostClick), this.addEventListener("mouseover", this
      .handleMouseOver)
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this
      .handleHostClick), this.removeEventListener("mouseover", this
      .handleMouseOver)
  }
  handleDefaultSlotChange() {
    let textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel > "u") {
      this.cachedTextLabel = textLabel;
      return
    }
    textLabel !== this.cachedTextLabel && (this.cachedTextLabel = textLabel, this.emit(
      "slotchange", {
        bubbles: !0,
        composed: !1,
        cancelable: !1
      }))
  }
  handleCheckedChange() {
    if (this.checked && this.type !== "checkbox") {
      this.checked = !1, console.error(
        'The checked attribute can only be used on menu items with type="checkbox"',
        this);
      return
    }
    this.type === "checkbox" ? this.setAttribute("aria-checked", this
      .checked ? "true" : "false") : this.removeAttribute("aria-checked")
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false")
  }
  handleTypeChange() {
    this.type === "checkbox" ? (this.setAttribute("role",
      "menuitemcheckbox"), this.setAttribute("aria-checked", this
      .checked ? "true" : "false")) : (this.setAttribute("role",
      "menuitem"), this.removeAttribute("aria-checked"))
  }
  getTextLabel() {
    return getSlotTextContent(this.defaultSlot)
  }
  isSubmenu() {
    return this.hasSlotController.test("submenu")
  }
  render() {
    let isRtlDirection = this.localize.dir() === "rtl",
      isSubmenuExpanded = this.submenuController.isExpanded();
    return htmlTag`
      <div
        id="anchor"
        part="base"
        class=${classMap({"menu-item":!0,"menu-item--rtl":isRtlDirection,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":isSubmenuExpanded})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!isSubmenuExpanded}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${isRtlDirection?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?htmlTag` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `
  }
};
MenuItemElement.styles = componentStyles16;
MenuItemElement.dependencies = {
  "sl-icon": IconElement,
  "sl-popup": PopupElement,
  "sl-spinner": SpinnerElement
};
decorateClass([queryDecorator("slot:not([name])")], MenuItemElement.prototype, "defaultSlot", 2);
decorateClass([queryDecorator(".menu-item")], MenuItemElement.prototype, "menuItem", 2);
decorateClass([property()], MenuItemElement.prototype, "type", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], MenuItemElement.prototype, "checked", 2);
decorateClass([property()], MenuItemElement.prototype, "value", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], MenuItemElement.prototype, "loading", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], MenuItemElement.prototype, "disabled", 2);
decorateClass([watchDecorator("checked")], MenuItemElement.prototype, "handleCheckedChange", 1);
decorateClass([watchDecorator("disabled")], MenuItemElement.prototype, "handleDisabledChange", 1);
decorateClass([watchDecorator("type")], MenuItemElement.prototype, "handleTypeChange", 1);
MenuItemElement.define("sl-menu-item");
var componentStyles17 = cssTag`
  ${componentBaseStyles}

  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;

function* activeElementsGenerator(startElement = document.activeElement) {
  startElement != null && (yield startElement, "shadowRoot" in startElement && startElement.shadowRoot && startElement.shadowRoot
    .mode !== "closed" && (yield* forAwaitHelper(activeElementsGenerator(startElement.shadowRoot.activeElement))))
}

function getDeepActiveElement() {
  return [...activeElementsGenerator()].pop()
}
var activeModalStack = [],
  Modal = class {
    constructor(modalHostElement) {
      this.tabDirection = "forward", this.handleFocusIn = () => {
        this.isActive() && this.checkFocus()
      }, this.handleKeyDown = keydownEvent => {
        var tempActiveElement;
        if (keydownEvent.key !== "Tab" || this.isExternalActivated || !this.isActive())
          return;
        let activeElement = getDeepActiveElement();
        if (this.previousFocus = activeElement, this.previousFocus && this
          .possiblyHasTabbableChildren(this.previousFocus)) return;
        keydownEvent.shiftKey ? this.tabDirection = "backward" : this.tabDirection =
          "forward";
        let tabbableElements = getTabbableElements(this.element),
          currentTabIndex = tabbableElements.findIndex(tabbableCandidate => tabbableCandidate === activeElement);
        this.previousFocus = this.currentFocus;
        let tabStep = this.tabDirection === "forward" ? 1 : -1;
        for (;;) {
          currentTabIndex + tabStep >= tabbableElements.length ? currentTabIndex = 0 : currentTabIndex + tabStep < 0 ? currentTabIndex = tabbableElements.length - 1 : currentTabIndex += tabStep,
            this.previousFocus = this.currentFocus;
          let currentTabbable = tabbableElements[currentTabIndex];
          if (this.tabDirection === "backward" && this.previousFocus && this
            .possiblyHasTabbableChildren(this.previousFocus) || currentTabbable && this
            .possiblyHasTabbableChildren(currentTabbable)) return;
          keydownEvent.preventDefault(), this.currentFocus = currentTabbable, (tempActiveElement = this
            .currentFocus) == null || tempActiveElement.focus({
              preventScroll: !1
            });
          let allActiveElements = [...activeElementsGenerator()];
          if (allActiveElements.includes(this.currentFocus) || !allActiveElements.includes(this
              .previousFocus)) break
        }
        setTimeout(() => this.checkFocus())
      }, this.handleKeyUp = () => {
        this.tabDirection = "forward"
      }, this.element = modalHostElement, this.elementsWithTabbableControls = ["iframe"]
    }
    activate() {
      activeModalStack.push(this.element), document.addEventListener("focusin", this
        .handleFocusIn), document.addEventListener("keydown", this
        .handleKeyDown), document.addEventListener("keyup", this
        .handleKeyUp)
    }
    deactivate() {
      activeModalStack = activeModalStack.filter(modalEntry => modalEntry !== this.element), this.currentFocus = null,
        document.removeEventListener("focusin", this.handleFocusIn), document
        .removeEventListener("keydown", this.handleKeyDown), document
        .removeEventListener("keyup", this.handleKeyUp)
    }
    isActive() {
      return activeModalStack[activeModalStack.length - 1] === this.element
    }
    activateExternal() {
      this.isExternalActivated = !0
    }
    deactivateExternal() {
      this.isExternalActivated = !1
    }
    checkFocus() {
      if (this.isActive() && !this.isExternalActivated) {
        let tabbableElements = getTabbableElements(this.element);
        if (!this.element.matches(":focus-within")) {
          let firstTabbable = tabbableElements[0],
            lastTabbable = tabbableElements[tabbableElements.length - 1],
            focusTarget = this.tabDirection === "forward" ? firstTabbable : lastTabbable;
          typeof focusTarget?.focus == "function" && (this.currentFocus = focusTarget, focusTarget.focus({
            preventScroll: !1
          }))
        }
      }
    }
    possiblyHasTabbableChildren(element) {
      return this.elementsWithTabbableControls.includes(element.tagName
      .toLowerCase()) || element.hasAttribute("controls")
    }
  };
var scrollLockSet = new Set;

function getScrollbarWidth() {
  let clientWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - clientWidth)
}

function lockBodyScrolling(lockingElement) {
  if (scrollLockSet.add(lockingElement), !document.body.classList.contains("sl-scroll-lock")) {
    let scrollbarWidth = getScrollbarWidth();
    document.body.classList.add("sl-scroll-lock"), document.body.style
      .setProperty("--sl-scroll-lock-size", `${scrollbarWidth}px`)
  }
}

function unlockBodyScrolling(lockingElement) {
  scrollLockSet.delete(lockingElement), scrollLockSet.size === 0 && (document.body.classList.remove(
    "sl-scroll-lock"), document.body.style.removeProperty(
    "--sl-scroll-lock-size"))
}

function capitalizeFirst(textInput) {
  return textInput.charAt(0)
    .toUpperCase() + textInput.slice(1)
}
var DrawerElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.hasSlotController = new SlotController(this, "footer"),
      this.localize = new LocalizeController(this), this.modal = new Modal(this), this.open = !
      1, this.label = "", this.placement = "end", this.contained = !1, this
      .noHeader = !1, this.handleDocumentKeyDown = documentKeydownEvent => {
        this.contained || documentKeydownEvent.key === "Escape" && this.modal.isActive() &&
          this.open && (documentKeydownEvent.stopImmediatePropagation(), this.requestClose(
            "keyboard"))
      }
  }
  firstUpdated() {
    this.drawer.hidden = !this.open, this.open && (this.addOpenListeners(),
      this.contained || (this.modal.activate(), lockBodyScrolling(this)))
  }
  disconnectedCallback() {
    var tempPanelSlot;
    super.disconnectedCallback(), unlockBodyScrolling(this), (tempPanelSlot = this.closeWatcher) ==
      null || tempPanelSlot.destroy()
  }
  requestClose(closeSource) {
    if (this.emit("sl-request-close", {
        cancelable: !0,
        detail: {
          source: closeSource
        }
      })
      .defaultPrevented) {
      let denyCloseAnimation = getAnimation(this, "drawer.denyClose", {
        dir: this.localize.dir()
      });
      animateTo(this.panel, denyCloseAnimation.keyframes, denyCloseAnimation.options);
      return
    }
    this.hide()
  }
  addOpenListeners() {
    var tempAutofocusElement;
    "CloseWatcher" in window ? ((tempAutofocusElement = this.closeWatcher) == null || tempAutofocusElement
        .destroy(), this.contained || (this.closeWatcher = new CloseWatcher,
          this.closeWatcher.onclose = () => this.requestClose("keyboard"))
        ) : document.addEventListener("keydown", this.handleDocumentKeyDown)
  }
  removeOpenListeners() {
    var tempAutofocusElement2;
    document.removeEventListener("keydown", this.handleDocumentKeyDown), (
      tempAutofocusElement2 = this.closeWatcher) == null || tempAutofocusElement2.destroy()
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show"), this.addOpenListeners(), this.originalTrigger =
        document.activeElement, this.contained || (this.modal.activate(),
          lockBodyScrolling(this));
      let autofocusElement = this.querySelector("[autofocus]");
      autofocusElement && autofocusElement.removeAttribute("autofocus"), await Promise.all([stopAnimations(this
        .drawer), stopAnimations(this.overlay)
      ]), this.drawer.hidden = !1, requestAnimationFrame(() => {
        this.emit("sl-initial-focus", {
            cancelable: !0
          })
          .defaultPrevented || (autofocusElement ? autofocusElement.focus({
            preventScroll: !0
          }) : this.panel.focus({
            preventScroll: !0
          })), autofocusElement && autofocusElement.setAttribute("autofocus", "")
      });
      let showAnimation = getAnimation(this, `drawer.show${capitalizeFirst(this.placement)}`, {
          dir: this.localize.dir()
        }),
        overlayShowAnimation = getAnimation(this, "drawer.overlay.show", {
          dir: this.localize.dir()
        });
      await Promise.all([animateTo(this.panel, showAnimation.keyframes, showAnimation.options), animateTo(this
        .overlay, overlayShowAnimation.keyframes, overlayShowAnimation.options)]), this.emit("sl-after-show")
    } else {
      this.emit("sl-hide"), this.removeOpenListeners(), this.contained || (
        this.modal.deactivate(), unlockBodyScrolling(this)), await Promise.all([stopAnimations(this
        .drawer), stopAnimations(this.overlay)]);
      let hideAnimation = getAnimation(this, `drawer.hide${capitalizeFirst(this.placement)}`, {
          dir: this.localize.dir()
        }),
        overlayHideAnimation = getAnimation(this, "drawer.overlay.hide", {
          dir: this.localize.dir()
        });
      await Promise.all([animateTo(this.overlay, overlayHideAnimation.keyframes, overlayHideAnimation.options)
          .then(() => {
            this.overlay.hidden = !0
          }), animateTo(this.panel, hideAnimation.keyframes, hideAnimation.options)
          .then(() => {
            this.panel.hidden = !0
          })
        ]), this.drawer.hidden = !0, this.overlay.hidden = !1, this.panel
        .hidden = !1;
      let originalTriggerElement = this.originalTrigger;
      typeof originalTriggerElement?.focus == "function" && setTimeout(() => originalTriggerElement.focus()), this
        .emit("sl-after-hide")
    }
  }
  handleNoModalChange() {
    this.open && !this.contained && (this.modal.activate(), lockBodyScrolling(this)), this
      .open && this.contained && (this.modal.deactivate(), unlockBodyScrolling(this))
  }
  async show() {
    if (!this.open) return this.open = !0, waitForEvent(this, "sl-after-show")
  }
  async hide() {
    if (this.open) return this.open = !1, waitForEvent(this, "sl-after-hide")
  }
  render() {
    return htmlTag`
      <div
        part="base"
        class=${classMap({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":this.localize.dir()==="rtl","drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${ifDefined(this.noHeader?this.label:void 0)}
          aria-labelledby=${ifDefined(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":htmlTag`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `
  }
};
DrawerElement.styles = componentStyles17;
DrawerElement.dependencies = {
  "sl-icon-button": IconButtonElement
};
decorateClass([queryDecorator(".drawer")], DrawerElement.prototype, "drawer", 2);
decorateClass([queryDecorator(".drawer__panel")], DrawerElement.prototype, "panel", 2);
decorateClass([queryDecorator(".drawer__overlay")], DrawerElement.prototype, "overlay", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DrawerElement.prototype, "open", 2);
decorateClass([property({
  reflect: !0
})], DrawerElement.prototype, "label", 2);
decorateClass([property({
  reflect: !0
})], DrawerElement.prototype, "placement", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DrawerElement.prototype, "contained", 2);
decorateClass([property({
  attribute: "no-header",
  type: Boolean,
  reflect: !0
})], DrawerElement.prototype, "noHeader", 2);
decorateClass([watchDecorator("open", {
  waitUntilFirstUpdate: !0
})], DrawerElement.prototype, "handleOpenChange", 1);
decorateClass([watchDecorator("contained", {
  waitUntilFirstUpdate: !0
})], DrawerElement.prototype, "handleNoModalChange", 1);
setDefaultAnimation("drawer.showTop", {
  keyframes: [{
    opacity: 0,
    translate: "0 -100%"
  }, {
    opacity: 1,
    translate: "0 0"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.hideTop", {
  keyframes: [{
    opacity: 1,
    translate: "0 0"
  }, {
    opacity: 0,
    translate: "0 -100%"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.showEnd", {
  keyframes: [{
    opacity: 0,
    translate: "100%"
  }, {
    opacity: 1,
    translate: "0"
  }],
  rtlKeyframes: [{
    opacity: 0,
    translate: "-100%"
  }, {
    opacity: 1,
    translate: "0"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.hideEnd", {
  keyframes: [{
    opacity: 1,
    translate: "0"
  }, {
    opacity: 0,
    translate: "100%"
  }],
  rtlKeyframes: [{
    opacity: 1,
    translate: "0"
  }, {
    opacity: 0,
    translate: "-100%"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.showBottom", {
  keyframes: [{
    opacity: 0,
    translate: "0 100%"
  }, {
    opacity: 1,
    translate: "0 0"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.hideBottom", {
  keyframes: [{
    opacity: 1,
    translate: "0 0"
  }, {
    opacity: 0,
    translate: "0 100%"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.showStart", {
  keyframes: [{
    opacity: 0,
    translate: "-100%"
  }, {
    opacity: 1,
    translate: "0"
  }],
  rtlKeyframes: [{
    opacity: 0,
    translate: "100%"
  }, {
    opacity: 1,
    translate: "0"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.hideStart", {
  keyframes: [{
    opacity: 1,
    translate: "0"
  }, {
    opacity: 0,
    translate: "-100%"
  }],
  rtlKeyframes: [{
    opacity: 1,
    translate: "0"
  }, {
    opacity: 0,
    translate: "100%"
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("drawer.denyClose", {
  keyframes: [{
    scale: 1
  }, {
    scale: 1.01
  }, {
    scale: 1
  }],
  options: {
    duration: 250
  }
});
setDefaultAnimation("drawer.overlay.show", {
  keyframes: [{
    opacity: 0
  }, {
    opacity: 1
  }],
  options: {
    duration: 250
  }
});
setDefaultAnimation("drawer.overlay.hide", {
  keyframes: [{
    opacity: 1
  }, {
    opacity: 0
  }],
  options: {
    duration: 250
  }
});
DrawerElement.define("sl-drawer");
var componentStyles18 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;
var BadgeElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.variant = "primary", this.pill = !1, this
      .pulse = !1
  }
  render() {
    return htmlTag`
      <span
        part="base"
        class=${classMap({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `
  }
};
BadgeElement.styles = componentStyles18;
decorateClass([property({
  reflect: !0
})], BadgeElement.prototype, "variant", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], BadgeElement.prototype, "pill", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], BadgeElement.prototype, "pulse", 2);
BadgeElement.define("sl-badge");
var componentStyles19 = cssTag`
  ${componentBaseStyles}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;
var DialogElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.hasSlotController = new SlotController(this, "footer"),
      this.localize = new LocalizeController(this), this.modal = new Modal(this), this.open = !
      1, this.label = "", this.noHeader = !1, this.handleDocumentKeyDown =
      mutationRecords => {
        mutationRecords.key === "Escape" && this.modal.isActive() && this.open && (mutationRecords
          .stopPropagation(), this.requestClose("keyboard"))
      }
  }
  firstUpdated() {
    this.dialog.hidden = !this.open, this.open && (this.addOpenListeners(),
      this.modal.activate(), lockBodyScrolling(this))
  }
  disconnectedCallback() {
    var tempPanelSlot;
    super.disconnectedCallback(), this.modal.deactivate(), unlockBodyScrolling(this), (tempPanelSlot =
      this.closeWatcher) == null || tempPanelSlot.destroy()
  }
  requestClose(closeSource) {
    if (this.emit("sl-request-close", {
        cancelable: !0,
        detail: {
          source: closeSource
        }
      })
      .defaultPrevented) {
      let denyCloseAnimation = getAnimation(this, "dialog.denyClose", {
        dir: this.localize.dir()
      });
      animateTo(this.panel, denyCloseAnimation.keyframes, denyCloseAnimation.options);
      return
    }
    this.hide()
  }
  addOpenListeners() {
    var tempAutofocusElement;
    "CloseWatcher" in window ? ((tempAutofocusElement = this.closeWatcher) == null || tempAutofocusElement
        .destroy(), this.closeWatcher = new CloseWatcher, this.closeWatcher
        .onclose = () => this.requestClose("keyboard")) : document
      .addEventListener("keydown", this.handleDocumentKeyDown)
  }
  removeOpenListeners() {
    var tempAutofocusElement2;
    (tempAutofocusElement2 = this.closeWatcher) == null || tempAutofocusElement2.destroy(), document
      .removeEventListener("keydown", this.handleDocumentKeyDown)
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show"), this.addOpenListeners(), this.originalTrigger =
        document.activeElement, this.modal.activate(), lockBodyScrolling(this);
      let autofocusElement = this.querySelector("[autofocus]");
      autofocusElement && autofocusElement.removeAttribute("autofocus"), await Promise.all([stopAnimations(this
        .dialog), stopAnimations(this.overlay)
      ]), this.dialog.hidden = !1, requestAnimationFrame(() => {
        this.emit("sl-initial-focus", {
            cancelable: !0
          })
          .defaultPrevented || (autofocusElement ? autofocusElement.focus({
            preventScroll: !0
          }) : this.panel.focus({
            preventScroll: !0
          })), autofocusElement && autofocusElement.setAttribute("autofocus", "")
      });
      let showAnimation = getAnimation(this, "dialog.show", {
          dir: this.localize.dir()
        }),
        overlayShowAnimation = getAnimation(this, "dialog.overlay.show", {
          dir: this.localize.dir()
        });
      await Promise.all([animateTo(this.panel, showAnimation.keyframes, showAnimation.options), animateTo(this
        .overlay, overlayShowAnimation.keyframes, overlayShowAnimation.options)]), this.emit("sl-after-show")
    } else {
      this.emit("sl-hide"), this.removeOpenListeners(), this.modal
        .deactivate(), await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      let hideAnimation = getAnimation(this, "dialog.hide", {
          dir: this.localize.dir()
        }),
        overlayHideAnimation = getAnimation(this, "dialog.overlay.hide", {
          dir: this.localize.dir()
        });
      await Promise.all([animateTo(this.overlay, overlayHideAnimation.keyframes, overlayHideAnimation.options)
          .then(() => {
            this.overlay.hidden = !0
          }), animateTo(this.panel, hideAnimation.keyframes, hideAnimation.options)
          .then(() => {
            this.panel.hidden = !0
          })
        ]), this.dialog.hidden = !0, this.overlay.hidden = !1, this.panel
        .hidden = !1, unlockBodyScrolling(this);
      let originalTriggerElement = this.originalTrigger;
      typeof originalTriggerElement?.focus == "function" && setTimeout(() => originalTriggerElement.focus()), this
        .emit("sl-after-hide")
    }
  }
  async show() {
    if (!this.open) return this.open = !0, waitForEvent(this, "sl-after-show")
  }
  async hide() {
    if (this.open) return this.open = !1, waitForEvent(this, "sl-after-hide")
  }
  render() {
    return htmlTag`
      <div
        part="base"
        class=${classMap({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${ifDefined(this.noHeader?this.label:void 0)}
          aria-labelledby=${ifDefined(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":htmlTag`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `
  }
};
DialogElement.styles = componentStyles19;
DialogElement.dependencies = {
  "sl-icon-button": IconButtonElement
};
decorateClass([queryDecorator(".dialog")], DialogElement.prototype, "dialog", 2);
decorateClass([queryDecorator(".dialog__panel")], DialogElement.prototype, "panel", 2);
decorateClass([queryDecorator(".dialog__overlay")], DialogElement.prototype, "overlay", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], DialogElement.prototype, "open", 2);
decorateClass([property({
  reflect: !0
})], DialogElement.prototype, "label", 2);
decorateClass([property({
  attribute: "no-header",
  type: Boolean,
  reflect: !0
})], DialogElement.prototype, "noHeader", 2);
decorateClass([watchDecorator("open", {
  waitUntilFirstUpdate: !0
})], DialogElement.prototype, "handleOpenChange", 1);
setDefaultAnimation("dialog.show", {
  keyframes: [{
    opacity: 0,
    scale: .8
  }, {
    opacity: 1,
    scale: 1
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("dialog.hide", {
  keyframes: [{
    opacity: 1,
    scale: 1
  }, {
    opacity: 0,
    scale: .8
  }],
  options: {
    duration: 250,
    easing: "ease"
  }
});
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{
    scale: 1
  }, {
    scale: 1.02
  }, {
    scale: 1
  }],
  options: {
    duration: 250
  }
});
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{
    opacity: 0
  }, {
    opacity: 1
  }],
  options: {
    duration: 250
  }
});
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{
    opacity: 1
  }, {
    opacity: 0
  }],
  options: {
    duration: 250
  }
});
DialogElement.define("sl-dialog");
var componentStyles20 = cssTag`
  ${componentBaseStyles}
  ${componentStyles13}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear:not(.input__clear--visible) {
    visibility: hidden;
  }

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;
var InputElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.formControlController = new FormControlController(this, {
        assumeInteractionOn: ["sl-blur", "sl-input"]
      }), this.hasSlotController = new SlotController(this, "help-text", "label"), this
      .localize = new LocalizeController(this), this.hasFocus = !1, this.title = "", this
      .__numberInput = Object.assign(document.createElement("input"), {
        type: "number"
      }), this.__dateInput = Object.assign(document.createElement(
      "input"), {
        type: "date"
      }), this.type = "text", this.name = "", this.value = "", this
      .defaultValue = "", this.size = "medium", this.filled = !1, this
      .pill = !1, this.label = "", this.helpText = "", this.clearable = !1,
      this.disabled = !1, this.placeholder = "", this.readonly = !1, this
      .passwordToggle = !1, this.passwordVisible = !1, this
      .noSpinButtons = !1, this.form = "", this.required = !1, this
      .spellcheck = !0
  }
  get valueAsDate() {
    var tempDateValue;
    return this.__dateInput.type = this.type, this.__dateInput.value = this
      .value, ((tempDateValue = this.input) == null ? void 0 : tempDateValue.valueAsDate) || this
      .__dateInput.valueAsDate
  }
  set valueAsDate(dateValue) {
    this.__dateInput.type = this.type, this.__dateInput.valueAsDate = dateValue,
      this.value = this.__dateInput.value
  }
  get valueAsNumber() {
    var tempNumberValue;
    return this.__numberInput.value = this.value, ((tempNumberValue = this.input) ==
      null ? void 0 : tempNumberValue.valueAsNumber) || this.__numberInput.valueAsNumber
  }
  set valueAsNumber(numberValue) {
    this.__numberInput.valueAsNumber = numberValue, this.value = this.__numberInput
      .value
  }
  get validity() {
    return this.input.validity
  }
  get validationMessage() {
    return this.input.validationMessage
  }
  firstUpdated() {
    this.formControlController.updateValidity()
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur")
  }
  handleChange() {
    this.value = this.input.value, this.emit("sl-change")
  }
  handleClearClick(clearClickEvent) {
    this.value = "", this.emit("sl-clear"), this.emit("sl-input"), this
      .emit("sl-change"), this.input.focus(), clearClickEvent.stopPropagation()
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus")
  }
  handleInput() {
    this.value = this.input.value, this.formControlController
      .updateValidity(), this.emit("sl-input")
  }
  handleInvalid(invalidEvent) {
    this.formControlController.setValidity(!1), this.formControlController
      .emitInvalidEvent(invalidEvent)
  }
  handleKeyDown(keydownEvent) {
    let hasModifierKey = keydownEvent.metaKey || keydownEvent.ctrlKey || keydownEvent.shiftKey || keydownEvent.altKey;
    keydownEvent.key === "Enter" && !hasModifierKey && setTimeout(() => {
      !keydownEvent.defaultPrevented && !keydownEvent.isComposing && this
        .formControlController.submit()
    })
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled)
  }
  handleStepChange() {
    this.input.step = String(this.step), this.formControlController
      .updateValidity()
  }
  async handleValueChange() {
    await this.updateComplete, this.formControlController.updateValidity()
  }
  focus(focusOptions) {
    this.input.focus(focusOptions)
  }
  blur() {
    this.input.blur()
  }
  select() {
    this.input.select()
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection)
  }
  setRangeText(replacementText, rangeStart, rangeEnd, selectionMode = "preserve") {
    let effectiveRangeStart = rangeStart ?? this.input.selectionStart,
      effectiveRangeEnd = rangeEnd ?? this.input.selectionEnd;
    this.input.setRangeText(replacementText, effectiveRangeStart, effectiveRangeEnd, selectionMode), this.value !== this.input.value &&
      (this.value = this.input.value)
  }
  showPicker() {
    "showPicker" in HTMLInputElement.prototype && this.input.showPicker()
  }
  stepUp() {
    this.input.stepUp(), this.value !== this.input.value && (this.value =
      this.input.value)
  }
  stepDown() {
    this.input.stepDown(), this.value !== this.input.value && (this.value =
      this.input.value)
  }
  checkValidity() {
    return this.input.checkValidity()
  }
  getForm() {
    return this.formControlController.getForm()
  }
  reportValidity() {
    return this.input.reportValidity()
  }
  setCustomValidity(validationMessage) {
    this.input.setCustomValidity(validationMessage), this.formControlController
      .updateValidity()
  }
  render() {
    let hasLabelSlot = this.hasSlotController.test("label"),
      hasHelpTextSlot = this.hasSlotController.test("help-text"),
      showLabel = this.label ? !0 : !!hasLabelSlot,
      showHelpText = this.helpText ? !0 : !!hasHelpTextSlot,
      showClearButton = this.clearable && !this.disabled && !this.readonly;

    // TRACE/UI BugFix: the `value` can be undefined.
    let hasClearableValue = showClearButton && (typeof this.value == "number"
      || (typeof this.value != "undefined" && this.value.length > 0)
    );

    return htmlTag`
      <div
        part="form-control"
        class=${classMap({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":showLabel,"form-control--has-help-text":showHelpText})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${showLabel?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${classMap({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${ifDefined(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${ifDefined(this.placeholder)}
              minlength=${ifDefined(this.minlength)}
              maxlength=${ifDefined(this.maxlength)}
              min=${ifDefined(this.min)}
              max=${ifDefined(this.max)}
              step=${ifDefined(this.step)}
              .value=${toggleAttributeDirective(this.value)}
              autocapitalize=${ifDefined(this.autocapitalize)}
              autocomplete=${ifDefined(this.autocomplete)}
              autocorrect=${ifDefined(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${ifDefined(this.pattern)}
              enterkeyhint=${ifDefined(this.enterkeyhint)}
              inputmode=${ifDefined(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${showClearButton?htmlTag`
                  <button
                    part="clear-button"
                    class=${classMap({input__clear:!0,"input__clear--visible":hasClearableValue})}
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?htmlTag`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?htmlTag`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:htmlTag`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${showHelpText?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `
  }
};
InputElement.styles = componentStyles20;
InputElement.dependencies = {
  "sl-icon": IconElement
};
decorateClass([queryDecorator(".input__control")], InputElement.prototype, "input", 2);
decorateClass([stateDecorator()], InputElement.prototype, "hasFocus", 2);
decorateClass([property()], InputElement.prototype, "title", 2);
decorateClass([property({
  reflect: !0
})], InputElement.prototype, "type", 2);
decorateClass([property()], InputElement.prototype, "name", 2);
decorateClass([property()], InputElement.prototype, "value", 2);
decorateClass([defaultValueDecorator()], InputElement.prototype, "defaultValue", 2);
decorateClass([property({
  reflect: !0
})], InputElement.prototype, "size", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], InputElement.prototype, "filled", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], InputElement.prototype, "pill", 2);
decorateClass([property()], InputElement.prototype, "label", 2);
decorateClass([property({
  attribute: "help-text"
})], InputElement.prototype, "helpText", 2);
decorateClass([property({
  type: Boolean
})], InputElement.prototype, "clearable", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], InputElement.prototype, "disabled", 2);
decorateClass([property()], InputElement.prototype, "placeholder", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], InputElement.prototype, "readonly", 2);
decorateClass([property({
  attribute: "password-toggle",
  type: Boolean
})], InputElement.prototype, "passwordToggle", 2);
decorateClass([property({
  attribute: "password-visible",
  type: Boolean
})], InputElement.prototype, "passwordVisible", 2);
decorateClass([property({
  attribute: "no-spin-buttons",
  type: Boolean
})], InputElement.prototype, "noSpinButtons", 2);
decorateClass([property({
  reflect: !0
})], InputElement.prototype, "form", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], InputElement.prototype, "required", 2);
decorateClass([property()], InputElement.prototype, "pattern", 2);
decorateClass([property({
  type: Number
})], InputElement.prototype, "minlength", 2);
decorateClass([property({
  type: Number
})], InputElement.prototype, "maxlength", 2);
decorateClass([property()], InputElement.prototype, "min", 2);
decorateClass([property()], InputElement.prototype, "max", 2);
decorateClass([property()], InputElement.prototype, "step", 2);
decorateClass([property()], InputElement.prototype, "autocapitalize", 2);
decorateClass([property()], InputElement.prototype, "autocorrect", 2);
decorateClass([property()], InputElement.prototype, "autocomplete", 2);
decorateClass([property({
  type: Boolean
})], InputElement.prototype, "autofocus", 2);
decorateClass([property()], InputElement.prototype, "enterkeyhint", 2);
decorateClass([property({
  type: Boolean,
  converter: {
    fromAttribute: checkedAttrValue => !(!checkedAttrValue || checkedAttrValue === "false"),
    toAttribute: checkedBoolValue => checkedBoolValue ? "true" : "false"
  }
})], InputElement.prototype, "spellcheck", 2);
decorateClass([property()], InputElement.prototype, "inputmode", 2);
decorateClass([watchDecorator("disabled", {
  waitUntilFirstUpdate: !0
})], InputElement.prototype, "handleDisabledChange", 1);
decorateClass([watchDecorator("step", {
  waitUntilFirstUpdate: !0
})], InputElement.prototype, "handleStepChange", 1);
decorateClass([watchDecorator("value", {
  waitUntilFirstUpdate: !0
})], InputElement.prototype, "handleValueChange", 1);
InputElement.define("sl-input");
var componentStyles21 = cssTag`
  ${componentBaseStyles}

  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;
var CheckboxElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.formControlController = new FormControlController(this, {
        value: checkboxControl => checkboxControl.checked ? checkboxControl.value || "on" : void 0,
        defaultValue: checkboxControl => checkboxControl.defaultChecked,
        setValue: (checkboxControl, checkedState) => checkboxControl.checked = checkedState
      }), this.hasFocus = !1, this.title = "", this.name = "", this.size =
      "medium", this.disabled = !1, this.checked = !1, this
      .indeterminate = !1, this.defaultChecked = !1, this.form = "", this
      .required = !1
  }
  get validity() {
    return this.input.validity
  }
  get validationMessage() {
    return this.input.validationMessage
  }
  firstUpdated() {
    this.formControlController.updateValidity()
  }
  handleClick() {
    this.checked = !this.checked, this.indeterminate = !1, this.emit(
      "sl-change")
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur")
  }
  handleInput() {
    this.emit("sl-input")
  }
  handleInvalid(invalidEvent) {
    this.formControlController.setValidity(!1), this.formControlController
      .emitInvalidEvent(invalidEvent)
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus")
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled)
  }
  handleStateChange() {
    this.input.checked = this.checked, this.input.indeterminate = this
      .indeterminate, this.formControlController.updateValidity()
  }
  click() {
    this.input.click()
  }
  focus(focusOptions) {
    this.input.focus(focusOptions)
  }
  blur() {
    this.input.blur()
  }
  checkValidity() {
    return this.input.checkValidity()
  }
  getForm() {
    return this.formControlController.getForm()
  }
  reportValidity() {
    return this.input.reportValidity()
  }
  setCustomValidity(validationMessage) {
    this.input.setCustomValidity(validationMessage), this.formControlController
      .updateValidity()
  }
  render() {
    return htmlTag`
      <label
        part="base"
        class=${classMap({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${ifDefined(this.value)}
          .indeterminate=${toggleAttributeDirective(this.indeterminate)}
          .checked=${toggleAttributeDirective(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span
          part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
          class="checkbox__control"
        >
          ${this.checked?htmlTag`
                <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
              `:""}
          ${!this.checked&&this.indeterminate?htmlTag`
                <sl-icon
                  part="indeterminate-icon"
                  class="checkbox__indeterminate-icon"
                  library="system"
                  name="indeterminate"
                ></sl-icon>
              `:""}
        </span>

        <div part="label" class="checkbox__label">
          <slot></slot>
        </div>
      </label>
    `
  }
};
CheckboxElement.styles = componentStyles21;
CheckboxElement.dependencies = {
  "sl-icon": IconElement
};
decorateClass([queryDecorator('input[type="checkbox"]')], CheckboxElement.prototype, "input", 2);
decorateClass([stateDecorator()], CheckboxElement.prototype, "hasFocus", 2);
decorateClass([property()], CheckboxElement.prototype, "title", 2);
decorateClass([property()], CheckboxElement.prototype, "name", 2);
decorateClass([property()], CheckboxElement.prototype, "value", 2);
decorateClass([property({
  reflect: !0
})], CheckboxElement.prototype, "size", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], CheckboxElement.prototype, "disabled", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], CheckboxElement.prototype, "checked", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], CheckboxElement.prototype, "indeterminate", 2);
decorateClass([defaultValueDecorator("checked")], CheckboxElement.prototype, "defaultChecked", 2);
decorateClass([property({
  reflect: !0
})], CheckboxElement.prototype, "form", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], CheckboxElement.prototype, "required", 2);
decorateClass([watchDecorator("disabled", {
  waitUntilFirstUpdate: !0
})], CheckboxElement.prototype, "handleDisabledChange", 1);
decorateClass([watchDecorator(["checked", "indeterminate"], {
  waitUntilFirstUpdate: !0
})], CheckboxElement.prototype, "handleStateChange", 1);
CheckboxElement.define("sl-checkbox");
SpinnerElement.define("sl-spinner");
var componentStyles22 = cssTag`
  ${componentBaseStyles}
  ${componentStyles13}

  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
var RadioGroupElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.formControlController = new FormControlController(this), this
      .hasSlotController = new SlotController(this, "help-text", "label"), this
      .customValidityMessage = "", this.hasButtonGroup = !1, this
      .errorMessage = "", this.defaultValue = "", this.label = "", this
      .helpText = "", this.name = "option", this.value = "", this.size =
      "medium", this.form = "", this.required = !1
  }
  get validity() {
    let isMissingRequired = this.required && !this.value;
    return this.customValidityMessage !== "" ? formControlOptionsVariantB : isMissingRequired ? formControlOptionsVariantA : baseFormControlOptions
  }
  get validationMessage() {
    let isMissingRequired = this.required && !this.value;
    return this.customValidityMessage !== "" ? this.customValidityMessage :
      isMissingRequired ? this.validationInput.validationMessage : ""
  }
  connectedCallback() {
    super.connectedCallback(), this.defaultValue = this.value
  }
  firstUpdated() {
    this.formControlController.updateValidity()
  }
  getAllRadios() {
    return [...this.querySelectorAll("sl-radio, sl-radio-button")]
  }
  handleRadioClick(radioClickEvent) {
    let clickedRadio = radioClickEvent.target.closest("sl-radio, sl-radio-button"),
      allRadios = this.getAllRadios(),
      previousValue = this.value;
    clickedRadio.disabled || (this.value = clickedRadio.value, allRadios.forEach(radioOption => radioOption.checked = radioOption ===
      clickedRadio), this.value !== previousValue && (this.emit("sl-change"), this.emit(
        "sl-input")))
  }
  handleKeyDown(keydownEvent) {
    var tempCheckedRadio;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(keydownEvent
        .key)) return;
    let enabledRadios = this.getAllRadios()
      .filter(radioOption => !radioOption.disabled),
      currentRadio = (tempCheckedRadio = enabledRadios.find(radioCandidate => radioCandidate.checked)) != null ? tempCheckedRadio : enabledRadios[0],
      keyNavigationStep = keydownEvent.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(keydownEvent.key) ? -
      1 : 1,
      previousValue = this.value,
      nextRadioIndex = enabledRadios.indexOf(currentRadio) + keyNavigationStep;
    nextRadioIndex < 0 && (nextRadioIndex = enabledRadios.length - 1), nextRadioIndex > enabledRadios.length - 1 && (nextRadioIndex = 0), this
      .getAllRadios()
      .forEach(radioOption => {
        radioOption.checked = !1, this.hasButtonGroup || (radioOption.tabIndex = -1)
      }), this.value = enabledRadios[nextRadioIndex].value, enabledRadios[nextRadioIndex].checked = !0, this.hasButtonGroup ?
      enabledRadios[nextRadioIndex].shadowRoot.querySelector("button")
      .focus() : (enabledRadios[nextRadioIndex].tabIndex = 0, enabledRadios[nextRadioIndex].focus()), this.value !== previousValue && (
        this.emit("sl-change"), this.emit("sl-input")), keydownEvent.preventDefault()
  }
  handleLabelClick() {
    let allRadios = this.getAllRadios(),
      checkedRadio = allRadios.find(radioCandidate => radioCandidate.checked) || allRadios[0];
    checkedRadio && checkedRadio.focus()
  }
  handleInvalid(invalidEvent) {
    this.formControlController.setValidity(!1), this.formControlController
      .emitInvalidEvent(invalidEvent)
  }
  async syncRadioElements() {
    var tempShadowRoot, tempFirstRadio;
    let allRadios = this.getAllRadios();
    if (await Promise.all(allRadios.map(async radioOption => {
        await radioOption.updateComplete, radioOption.checked = radioOption.value === this.value, radioOption
          .size = this.size
      })), this.hasButtonGroup = allRadios.some(radioOption => radioOption.tagName.toLowerCase() ===
        "sl-radio-button"), allRadios.length > 0 && !allRadios.some(radioOption => radioOption.checked))
      if (this.hasButtonGroup) {
        let firstRadioInput = (tempShadowRoot = allRadios[0].shadowRoot) == null ? void 0 : tempShadowRoot.querySelector(
          "button");
        firstRadioInput && (firstRadioInput.tabIndex = 0)
      } else allRadios[0].tabIndex = 0;
    if (this.hasButtonGroup) {
      let radioValidationInput = (tempFirstRadio = this.shadowRoot) == null ? void 0 : tempFirstRadio.querySelector(
        "sl-button-group");
      radioValidationInput && (radioValidationInput.disableRole = !0)
    }
  }
  syncRadios() {
    if (customElements.get("sl-radio") && customElements.get(
        "sl-radio-button")) {
      this.syncRadioElements();
      return
    }
    customElements.get("sl-radio") ? this.syncRadioElements() :
      customElements.whenDefined("sl-radio")
      .then(() => this.syncRadios()), customElements.get(
      "sl-radio-button") ? this.syncRadioElements() : customElements
      .whenDefined("sl-radio-button")
      .then(() => this.syncRadios())
  }
  updateCheckedRadio() {
    this.getAllRadios()
      .forEach(radioOption => radioOption.checked = radioOption.value === this.value), this
      .formControlController.setValidity(this.validity.valid)
  }
  handleSizeChange() {
    this.syncRadios()
  }
  handleValueChange() {
    this.hasUpdated && this.updateCheckedRadio()
  }
  checkValidity() {
    let isMissingRequired = this.required && !this.value,
      hasCustomValidity = this.customValidityMessage !== "";
    return isMissingRequired || hasCustomValidity ? (this.formControlController.emitInvalidEvent(), !1) : !0
  }
  getForm() {
    return this.formControlController.getForm()
  }
  reportValidity() {
    let isValidState = this.validity.valid;
    return this.errorMessage = this.customValidityMessage || isValidState ? "" : this
      .validationInput.validationMessage, this.formControlController
      .setValidity(isValidState), this.validationInput.hidden = !0, clearTimeout(this
        .validationTimeout), isValidState || (this.validationInput.hidden = !1, this
        .validationInput.reportValidity(), this.validationTimeout =
        setTimeout(() => this.validationInput.hidden = !0, 1e4)), isValidState
  }
  setCustomValidity(validationMessage = "") {
    this.customValidityMessage = validationMessage, this.errorMessage = validationMessage, this
      .validationInput.setCustomValidity(validationMessage), this.formControlController
      .updateValidity()
  }
  render() {
    let hasLabelSlot = this.hasSlotController.test("label"),
      hasHelpTextSlot = this.hasSlotController.test("help-text"),
      showLabel = this.label ? !0 : !!hasLabelSlot,
      showHelpText = this.helpText ? !0 : !!hasHelpTextSlot,
      defaultSlotTemplate = htmlTag`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;
    return htmlTag`
      <fieldset
        part="form-control"
        class=${classMap({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":!0,"form-control--has-label":showLabel,"form-control--has-help-text":showHelpText})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${showLabel?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?htmlTag`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${defaultSlotTemplate}
                </sl-button-group>
              `:defaultSlotTemplate}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${showHelpText?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `
  }
};
RadioGroupElement.styles = componentStyles22;
RadioGroupElement.dependencies = {
  "sl-button-group": ButtonGroupElement
};
decorateClass([queryDecorator("slot:not([name])")], RadioGroupElement.prototype, "defaultSlot", 2);
decorateClass([queryDecorator(".radio-group__validation-input")], RadioGroupElement.prototype, "validationInput", 2);
decorateClass([stateDecorator()], RadioGroupElement.prototype, "hasButtonGroup", 2);
decorateClass([stateDecorator()], RadioGroupElement.prototype, "errorMessage", 2);
decorateClass([stateDecorator()], RadioGroupElement.prototype, "defaultValue", 2);
decorateClass([property()], RadioGroupElement.prototype, "label", 2);
decorateClass([property({
  attribute: "help-text"
})], RadioGroupElement.prototype, "helpText", 2);
decorateClass([property()], RadioGroupElement.prototype, "name", 2);
decorateClass([property({
  reflect: !0
})], RadioGroupElement.prototype, "value", 2);
decorateClass([property({
  reflect: !0
})], RadioGroupElement.prototype, "size", 2);
decorateClass([property({
  reflect: !0
})], RadioGroupElement.prototype, "form", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], RadioGroupElement.prototype, "required", 2);
decorateClass([watchDecorator("size", {
  waitUntilFirstUpdate: !0
})], RadioGroupElement.prototype, "handleSizeChange", 1);
decorateClass([watchDecorator("value")], RadioGroupElement.prototype, "handleValueChange", 1);
RadioGroupElement.define("sl-radio-group");
var componentStyles23 = cssTag`
  ${componentStyles1}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`;
var RadioButtonElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.hasSlotController = new SlotController(this, "[default]",
        "prefix", "suffix"), this.hasFocus = !1, this.checked = !1, this
      .disabled = !1, this.size = "medium", this.pill = !1
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "presentation")
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur")
  }
  handleClick(clickEvent) {
    if (this.disabled) {
      clickEvent.preventDefault(), clickEvent.stopPropagation();
      return
    }
    this.checked = !0
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus")
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false")
  }
  focus(focusOptions) {
    this.input.focus(focusOptions)
  }
  blur() {
    this.input.blur()
  }
  render() {
    return staticHtmlTag`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${classMap({button:!0,"button--default":!0,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${ifDefined(this.value)}
          tabindex="${this.checked?"0":"-1"}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `
  }
};
RadioButtonElement.styles = componentStyles23;
decorateClass([queryDecorator(".button")], RadioButtonElement.prototype, "input", 2);
decorateClass([queryDecorator(".hidden-input")], RadioButtonElement.prototype, "hiddenInput", 2);
decorateClass([stateDecorator()], RadioButtonElement.prototype, "hasFocus", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], RadioButtonElement.prototype, "checked", 2);
decorateClass([property()], RadioButtonElement.prototype, "value", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], RadioButtonElement.prototype, "disabled", 2);
decorateClass([property({
  reflect: !0
})], RadioButtonElement.prototype, "size", 2);
decorateClass([property({
  type: Boolean,
  reflect: !0
})], RadioButtonElement.prototype, "pill", 2);
decorateClass([watchDecorator("disabled", {
  waitUntilFirstUpdate: !0
})], RadioButtonElement.prototype, "handleDisabledChange", 1);
RadioButtonElement.define("sl-radio-button");
var componentStyles24 = cssTag`
  ${componentBaseStyles}

  :host {
    display: block;
  }
`;
var iconFetchCache = new Map;

function fetchIconFile(iconUrl, corsMode = "cors") {
  let cachedIconRequest = iconFetchCache.get(iconUrl);
  if (cachedIconRequest !== void 0) return Promise.resolve(cachedIconRequest);
  let iconFetchPromise = fetch(iconUrl, {
      mode: corsMode
    })
    .then(async iconResponse => {
      let iconResult = {
        ok: iconResponse.ok,
        status: iconResponse.status,
        html: await iconResponse.text()
      };
      return iconFetchCache.set(iconUrl, iconResult), iconResult
    });
  return iconFetchCache.set(iconUrl, iconFetchPromise), iconFetchPromise
}
var IncludeElement = class extends ShoelaceElement {
  constructor() {
    super(...arguments), this.mode = "cors", this.allowScripts = !1
  }
  executeScript(scriptElement) {
    let newScriptElement = document.createElement("script");
    [...scriptElement.attributes].forEach(scriptAttribute => newScriptElement.setAttribute(scriptAttribute.name, scriptAttribute.value)), newScriptElement
      .textContent = scriptElement.textContent, scriptElement.parentNode.replaceChild(newScriptElement, scriptElement)
  }
  async handleSrcChange() {
    try {
      let sourceUrl = this.src,
        includeFetchResult = await fetchIconFile(sourceUrl, this.mode);
      if (sourceUrl !== this.src) return;
      if (!includeFetchResult.ok) {
        this.emit("sl-error", {
          detail: {
            status: includeFetchResult.status
          }
        });
        return
      }
      this.innerHTML = includeFetchResult.html, this.allowScripts && [...this
        .querySelectorAll("script")
      ].forEach(includedScriptElement => this.executeScript(includedScriptElement)), this.emit("sl-load")
    } catch {
      this.emit("sl-error", {
        detail: {
          status: -1
        }
      })
    }
  }
  render() {
    return htmlTag`<slot></slot>`
  }
};
IncludeElement.styles = componentStyles24;
decorateClass([property()], IncludeElement.prototype, "src", 2);
decorateClass([property()], IncludeElement.prototype, "mode", 2);
decorateClass([property({
  attribute: "allow-scripts",
  type: Boolean
})], IncludeElement.prototype, "allowScripts", 2);
decorateClass([watchDecorator("src")], IncludeElement.prototype, "handleSrcChange", 1);
IncludeElement.define("sl-include");
var browserPolyfill = toEsm(webextPolyfillModule(), 1);
function deepEqual(objectA, objectB) {
  if (objectA == null || objectB === null || objectB === void 0) return objectA === objectB;
  if (objectA.constructor !== objectB.constructor) return !1;
  if (objectA instanceof Function || objectA instanceof RegExp) return objectA === objectB;
  if (objectA === objectB || objectA.valueOf() === objectB.valueOf()) return !0;
  if (Array.isArray(objectA) && objectA.length !== objectB.length || objectA instanceof Date || !(
      objectA instanceof Object) || !(objectB instanceof Object)) return !1;
  let keysOfA = Object.keys(objectA),
    keysOfB = Object.keys(objectB)
    .every(keyFromB => keysOfA.indexOf(keyFromB) !== -1),
    allValuesEqual = keysOfA.every(keyFromA => deepEqual(objectA[keyFromA], objectB[keyFromA]));
  return keysOfB && allValuesEqual
}

export { setBasePath, browserPolyfill, deepEqual };
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
