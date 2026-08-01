'use strict';

// Clean-room config (globalThis.extConfig): single-source brand + upstream-URL
// guards. Loaded first so its i18n.getMessage and URL guards are in place before
// any app code runs.
importScripts('../cleanroom-shared.js');

// De-vendored: the webextension-polyfill ships as vendor/browser-polyfill.js
// and is loaded here (service workers use importScripts, not <script>). It sets
// globalThis.browser, which the bundle's polyfill module returns below.
importScripts('../vendor/browser-polyfill.js');
importScripts('../vendor/ts-results.js');

(() => {
  var objectCreate = Object.create;
  var defineProperty = Object.defineProperty;
  var getOwnPropDescriptor = Object.getOwnPropertyDescriptor;
  var getOwnPropNames = Object.getOwnPropertyNames;
  var getPrototypeOf = Object.getPrototypeOf;
  var hasOwnPropertyRef = Object.prototype.hasOwnProperty;
  var globalDebugLevel = 3;
  var defineLazyModule = (initModule, cachedModule) => () => (
    initModule && (cachedModule = initModule((initModule = 0))),
    cachedModule
  );
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
  var defineExports = (targetObject, getters) => {
    for (var exportName in getters) {
      defineProperty(targetObject, exportName, {
        get: getters[exportName],
        enumerable: !0,
      });
    }
  };
  var copyProperties = (
    targetObject,
    sourceObject,
    excludedKey,
    propDescriptor,
  ) => {
    if (
      (sourceObject && typeof sourceObject == 'object')
      || typeof sourceObject == 'function'
    ) {
      for (let propName of getOwnPropNames(sourceObject)) {
        if (
          !hasOwnPropertyRef.call(targetObject, propName)
          && propName !== excludedKey
        ) {
          defineProperty(targetObject, propName, {
            get: () => sourceObject[propName],
            enumerable:
              !(propDescriptor = getOwnPropDescriptor(sourceObject, propName))
              || propDescriptor.enumerable,
          });
        }
      }
    }
    return targetObject;
  };
  var toEsm = (moduleExports, targetObject, protoHolder) => (
    (protoHolder =
      moduleExports != null ? objectCreate(getPrototypeOf(moduleExports)) : {}),
    copyProperties(
      targetObject || !moduleExports || !moduleExports.__esModule
        ? defineProperty(protoHolder, 'default', {
            value: moduleExports,
            enumerable: !0,
          })
        : protoHolder,
      moduleExports,
    )
  );
  var toCommonjs = moduleExports =>
    copyProperties(
      defineProperty({}, '__esModule', {
        value: !0,
      }),
      moduleExports,
    );
  var requireEmptySideEffect = defineCommonjsModule(() => {
    'use strict';
  });
  var requirePolyfill = defineCommonjsModule((exports, module) => {
    'use strict';
    module.exports = globalThis.browser; // de-vendored: loaded from vendor/
  });
  var requireWehCore = defineCommonjsModule((browserExports, browserModule) => {
    'use strict';

    browserModule.exports.browser = requirePolyfill();
    var browserType;
    if (typeof browser > 'u' && typeof chrome < 'u' && chrome.runtime) {
      if (/\bOPR\//.test(navigator.userAgent)) {
        browserType = 'opera';
      } else {
        browserType = 'chrome';
      }
    } else {
      if (/\bEdge\//.test(navigator.userAgent)) {
        browserType = 'edge';
      } else {
        browserType = 'firefox';
      }
    }
    browserModule.exports.browserType = browserType;
    if (typeof browserModule.exports.browser.action > 'u') {
      browserModule.exports.browser.action =
        browserModule.exports.browser.browserAction;
    }
    browserModule.exports.isBrowser = (...browserNames) => {
      for (let index = 0; index < browserNames.length; index++) {
        if (browserNames[index] == browserModule.exports.browserType) {
          return !0;
        }
      }
      return !1;
    };
    browserModule.exports.error = error => {
      // Collapsed title is just the first line of the message; expanding the
      // group shows the full stack, which now carries the injected details.
      console.groupCollapsed(
        String((error && error.message) || error).split('\n')[0],
      );
      if (error.stack) {
        console.error(error.stack);
      }
      console.groupEnd();
    };
  });
  // Shared: attach open-ended, structured context to an error and render it as a
  // block injected between the error's message and its stack frames, so a
  // one-line message stays the title while expanding reveals the full context.
  // Callers pass whatever they have (host, method, request, response, ...); the
  // set is open-ended and merges across calls. Re-decorating replaces the block.
  var errorDetailsStart = '  ----- details -----';
  var errorDetailsEnd = '  --------------------';
  function injectErrorDetails(error, details) {
    if (!error || typeof error != 'object' || !details) {
      return error;
    }
    error.details = Object.assign({}, error.details, details);
    let blockLines = [errorDetailsStart];
    for (let key of Object.keys(error.details)) {
      let value = error.details[key];
      let rendered;
      try {
        rendered = JSON.stringify(value);
      } catch {
        rendered = String(value);
      }
      if (typeof rendered == 'undefined') {
        rendered = String(value);
      }
      blockLines.push('  ' + key + ': ' + rendered);
    }
    blockLines.push(errorDetailsEnd);
    let stackText =
      typeof error.stack == 'string'
        ? error.stack
        : String(error.message || '');
    let cleaned = [];
    let inOldBlock = false;
    for (let line of stackText.split('\n')) {
      if (line == errorDetailsStart) {
        inOldBlock = true;
        continue;
      }
      if (inOldBlock) {
        if (line == errorDetailsEnd) {
          inOldBlock = false;
        }
        continue;
      }
      cleaned.push(line);
    }
    let frameIndex = cleaned.findIndex(line => /^\s*at\s/.test(line));
    if (frameIndex < 0) {
      frameIndex = cleaned.length;
    }
    error.stack = [
      ...cleaned.slice(0, frameIndex),
      ...blockLines,
      ...cleaned.slice(frameIndex),
    ].join('\n');
    return error;
  }
  var requireRpc = defineCommonjsModule((rpcExports, rpcModule) => {
    'use strict';

    var Rpc = class {
      replyId = 0;
      replies = {};
      listeners = {};
      hook = this.nullHook;
      debugLevel = 0;
      useTarget = false;
      logger = console;
      posts = {};
      constructor() {
        this.debugLevel = globalDebugLevel;
      }
      setPost(peerOrPostFn, postFn) {
        if (typeof peerOrPostFn == 'string') {
          this.posts[peerOrPostFn] = postFn;
        } else {
          this.post = peerOrPostFn;
        }
      }
      setUseTarget(useTarget) {
        this.useTarget = useTarget;
      }
      setDebugLevel(debugLevel) {
        this.debugLevel = debugLevel;
      }
      setHook(hook) {
        let self = this;
        let startTime = Date.now();
        function now() {
          if (typeof window < 'u' && typeof window.performance < 'u') {
            return window.performance.now();
          } else {
            return Date.now() - startTime;
          }
        }
        if (hook) {
          this.hook = event => {
            event.timestamp = now();
            try {
              hook(event);
            } catch (hookError) {
              self.logger.warn('Hoor error', hookError);
            }
          };
        } else {
          this.hook = this.nullHook;
        }
      }
      nullHook() {}
      call() {
        let self = this;
        let postFn;
        let peer;
        let method;
        let args;
        let argsArray = Array.prototype.slice.call(arguments);
        if (typeof argsArray[0] == 'function') {
          postFn = argsArray.shift();
        }
        if (self.useTarget) {
          [peer, method, ...args] = argsArray;
        } else {
          [method, ...args] = argsArray;
        }
        return new Promise(function (resolve, reject) {
          let requestId = ++self.replyId;
          if (self.debugLevel >= 2) {
            self.logger.info('rpc #' + requestId, 'call =>', method, args);
          }
          self.hook({
            type: 'call',
            callee: peer,
            rid: requestId,
            method: method,
            args: args,
          });
          self.replies[requestId] = {
            resolve: resolve,
            reject: reject,
            peer: peer,
            method: method,
            args: args,
          };
          let post =
            postFn || (self.useTarget && self.posts[peer]) || self.post;
          if (self.useTarget) {
            post(peer, {
              type: 'weh#rpc',
              _request: requestId,
              _method: method,
              _args: [...args],
            });
          } else {
            post({
              type: 'weh#rpc',
              _request: requestId,
              _method: method,
              _args: [...args],
            });
          }
        });
      }
      /**
       * Same as {@link #call}, however, will not produce any error log in case
       * of the receiving end not being prepared yet or not having that
       * called-method yet.
       *
       * It simply redirects to {@link #call} and pipes the rejection through a
       * `catch`. That catch diagnoses the reason: it swallows ONLY the
       * "receiver not ready" case - `receive()` rejecting an unregistered method
       * with the remote error `Method <name> is not a function` (which happens
       * while a just-opened UI has connected but not yet installed its rpc
       * listeners) - and rethrows every unrelated error (network, serialization,
       * or a genuine error thrown by the remote method) so real failures still
       * surface.
       *
       * @example
       * // The service worker pushes progress to the 'main' popup. If the popup
       * // only just opened - connected before weh.is_safe registered its
       * // handlers - the 'progress' method is not there yet, so skip quietly
       * // instead of leaking "Method progress is not a function".
       * storeRpc.callOptional('main', 'progress', reduxStore.getState().progress);
       */
      callOptional() {
        return this.call.apply(this, arguments).catch(error => {
          if (
            error
            && typeof error.remoteError == 'string'
            && /^Method .+ is not a function$/.test(error.remoteError)
          ) {
            // The receiver is not ready yet, which is expected, so stay quiet.
            return undefined;
          }
          // The failure is unrelated, so forward it.
          throw error;
        });
      }
      receive(message, sendReply, caller) {
        let self = this;
        if (message._request) {
          Promise.resolve()
            .then(() => {
              let listener = self.listeners[message._method];
              if (typeof listener !== 'function') {
                throw new Error(
                  'Method ' + message._method + ' is not a function',
                );
              }
              if (self.debugLevel >= 2) {
                self.logger.info(
                  'rpc #' + message._request,
                  'serve <= ',
                  message._method,
                  message._args,
                );
              }
              self.hook({
                type: 'call',
                caller: caller,
                rid: message._request,
                method: message._method,
                args: message._args,
              });
              return Promise.resolve(listener.apply(null, message._args))
                .then(result => {
                  self.hook({
                    type: 'reply',
                    caller: caller,
                    rid: message._request,
                    result: result,
                  });
                  return result;
                })
                .catch(error => {
                  self.hook({
                    type: 'reply',
                    caller: caller,
                    rid: message._request,
                    error: error.message,
                  });
                  throw error;
                });
            })
            .then(result => {
              if (self.debugLevel >= 2) {
                self.logger.info(
                  'rpc #' + message._request,
                  'serve => ',
                  result,
                );
              }
              sendReply({
                type: 'weh#rpc',
                _reply: message._request,
                _result: result,
              });
            })
            .catch(error => {
              if (self.debugLevel >= 1) {
                self.logger.info(
                  'rpc #' + message._request,
                  'serve => !',
                  error.message,
                );
              }
              sendReply({
                type: 'weh#rpc',
                _reply: message._request,
                _error: error.message,
              });
            });
        } else if (message._reply) {
          let pending = self.replies[message._reply];
          delete self.replies[message._reply];
          if (!pending) {
            self.logger.error('Missing reply handler');
          } else if (message._error) {
            if (self.debugLevel >= 1) {
              self.logger.info(
                'rpc #' + message._reply,
                'call <= !',
                message._error,
              );
            }
            self.hook({
              type: 'reply',
              callee: pending.peer,
              rid: message._reply,
              error: message._error,
            });
            // Wrap the remote error with the call that produced it - the bare
            // remote message (e.g. "Exit code: 1") is meaningless on its own.
            let rpcContext =
              'RPC call '
              + JSON.stringify(pending.method)
              + (pending.peer ? ' to ' + JSON.stringify(pending.peer) : '')
              + ' failed';
            let rpcError = new Error(rpcContext + ': ' + message._error);
            rpcError.rpcMethod = pending.method;
            rpcError.rpcPeer = pending.peer;
            rpcError.rpcArgs = pending.args;
            rpcError.remoteError = message._error;
            // Inject the full call context (for a CoApp call: the native host,
            // the method, the request payload - url/headers/fields - and the
            // response) between the message and the stack frames.
            injectErrorDetails(rpcError, {
              host: pending.peer,
              method: pending.method,
              request: pending.args,
              response: message._error,
            });
            pending.reject(rpcError);
          } else {
            if (self.debugLevel >= 2) {
              self.logger.info(
                'rpc #' + message._reply,
                'call <= ',
                message._result,
              );
            }
            self.hook({
              type: 'reply',
              callee: pending.peer,
              rid: message._reply,
              result: message._result,
            });
            pending.resolve(message._result);
          }
        }
      }
      listen(listeners) {
        Object.assign(this.listeners, listeners);
      }
    };
    rpcModule.exports = new Rpc();
  });
  var requireI18n = defineCommonjsModule((i18nExports, i18nModule) => {
    'use strict';

    var { browser: browser } = requireWehCore();
    var customStrings = {};
    var placeholderRegex = new RegExp('\\$[a-zA-Z]*([0-9]+)\\$', 'g');
    var customStringsLoaded = !1;
    var customStringsReady = browser.storage.local
      .get('wehI18nCustom')
      .then(stored => {
        customStringsLoaded = !0;
        let custom = stored.wehI18nCustom;
        if (custom) {
          Object.assign(customStrings, custom);
        }
      });
    function getMessage(messageName, substitutions) {
      if (
        (customStringsLoaded
          || console.warn(
            'Using `weh._` before custom strings were loaded:',
            messageName,
          ),
        /-/.test(messageName))
      ) {
        let normalizedName = messageName.replace(/-/g, '_');
        console.warn(
          'Wrong i18n message name. Should it be',
          normalizedName,
          'instead of',
          messageName,
          '?',
        );
        messageName = normalizedName;
      }
      let customString = customStrings[messageName];
      if (
        (substitutions
          && !Array.isArray(substitutions)
          && (substitutions = [substitutions]),
        customString && customString.message.length > 0)
      ) {
        return (customString.message || '').replace(
          placeholderRegex,
          placeholder => {
            let match = placeholderRegex.exec(placeholder);
            return (
              (match && substitutions && substitutions[parseInt(match[1]) - 1])
              || '??'
            );
          },
        );
      }
      try {
        if (substitutions) {
          return browser.i18n.getMessage(messageName, substitutions);
        } else {
          return browser.i18n.getMessage(messageName);
        }
      } catch {
        return '';
      }
    }
    i18nModule.exports = {
      getMessage: getMessage,
      custom_strings_ready: customStringsReady,
    };
  });
  var requireAppTab = defineCommonjsModule((appTabExports, appTabModule) => {
    'use strict';

    var browserModule = requireWehCore();
    var rpc = requireRpc();
    var browser = browserModule.browser;
    var openPanels = {};
    var tabToPanel = {};
    function focusExistingTab(url, options) {
      let found = !1;
      return new Promise(function (resolve, reject) {
        return browser.tabs.query({}).then(function (tabs) {
          tabs.forEach(function (tab) {
            if (tab.url === url) {
              browser.tabs.update(tab.id, {
                active: !0,
              });
              browser.windows?.update(tab.windowId, {
                focused: !0,
              });
              found = !0;
            }
          });
          resolve(found);
        });
      });
    }
    function openAppTab(panelName, options) {
      return new Promise((resolve, reject) => {
        let panelUrl = browser.runtime.getURL(
          options.url + '?panel=' + panelName,
        );
        focusExistingTab(panelUrl)
          .then(function (alreadyFocused) {
            if (!alreadyFocused) {
              return browser.tabs
                .create({
                  url: panelUrl,
                })
                .then(function (tab) {
                  browserModule.__declareAppTab(panelName, {
                    tab: tab.id,
                    initData: options.initData,
                  });
                  openPanels[panelName] = {
                    type: 'tab',
                    tabId: tab.id,
                  };
                  tabToPanel[tab.id] = panelName;
                });
            }
          })
          .then(resolve)
          .catch(reject);
      });
    }
    function openPopupWindow(panelName, options) {
      return new Promise((resolve, reject) => {
        let panelUrl = browser.runtime.getURL(
          options.url + '?panel=' + panelName,
        );
        browser.windows
          .getCurrent()
          .then(currentWindow => {
            let windowWidth = options.width || 500;
            let windowHeight = options.height || 400;
            let windowOptions = {
              url: panelUrl,
              width: windowWidth,
              height: windowHeight,
              type: 'popup',
              left: Math.round(
                (currentWindow.width - windowWidth) / 2 + currentWindow.left,
              ),
              top: Math.round(
                (currentWindow.height - windowHeight) / 2 + currentWindow.top,
              ),
            };
            if (browserModule.isBrowser('chrome', 'opera')) {
              windowOptions.focused = !0;
            }
            return browser.windows
              .create(windowOptions)
              .then(
                createdWindow => (
                  (openPanels[panelName] = {
                    type: 'window',
                    windowId: createdWindow.id,
                  }),
                  Promise.all([
                    createdWindow,
                    browser.windows.update(createdWindow.id, {
                      focused: !0,
                    }),
                  ])
                ),
              )
              .then(([createdWindow]) => {
                Promise.resolve()
                  .then(() => {
                    if (!(options.initData && options.initData.autoResize)) {
                      return browser.windows
                        .update(createdWindow.id, {
                          height: createdWindow.height + 1,
                        })
                        .then(() =>
                          browser.windows.update(createdWindow.id, {
                            height: createdWindow.height - 1,
                          }),
                        );
                    }
                  })
                  .then(() => {
                    let tabOpenedPromise = new Promise(
                      (resolveTab, rejectTab) => {
                        let openTimeoutId;
                        function onTabCreated(createdTab) {
                          if (createdTab.windowId == createdWindow.id) {
                            clearTimeout(openTimeoutId);
                            browser.tabs.onCreated.removeListener(onTabCreated);
                            resolveTab(createdTab);
                          }
                        }
                        openTimeoutId = setTimeout(() => {
                          browser.tabs.onCreated.removeListener(onTabCreated);
                          rejectTab(new Error('Tab did not open'));
                        }, 5e3);
                        browser.tabs.onCreated.addListener(onTabCreated);
                      },
                    );
                    let existingTabPromise = browser.tabs
                      .query({
                        windowId: createdWindow.id,
                      })
                      .then(
                        queriedTabs =>
                          new Promise(
                            (resolveExistingTab, rejectExistingTab) => {
                              if (queriedTabs.length > 0) {
                                resolveExistingTab(queriedTabs[0]);
                              }
                            },
                          ),
                      );
                    return Promise.race([tabOpenedPromise, existingTabPromise]);
                  })
                  .then(openedTab =>
                    openedTab.status == 'loading'
                      ? new Promise((resolveComplete, rejectComplete) => {
                          let completeTimeoutId;
                          function onTabUpdated(
                            updatedTabId,
                            changeInfo,
                            updatedTab,
                          ) {
                            if (
                              updatedTabId == openedTab.id
                              && updatedTab.status == 'complete'
                            ) {
                              clearTimeout(completeTimeoutId);
                              browser.tabs.onUpdated.removeListener(
                                onTabUpdated,
                              );
                              resolveComplete(updatedTab);
                            }
                          }
                          completeTimeoutId = setTimeout(() => {
                            browser.tabs.onUpdated.removeListener(onTabUpdated);
                            rejectComplete(new Error('Tab did not complete'));
                          }, 6e4);
                          browser.tabs.onUpdated.addListener(onTabUpdated);
                        })
                      : openedTab,
                  )
                  .then(readyTab => {
                    browserModule.__declareAppTab(panelName, {
                      tab: readyTab.id,
                      initData: options.initData,
                    });
                    tabToPanel[readyTab.id] = panelName;
                  })
                  .then(resolve)
                  .catch(reject);
                function onWindowFocusChanged(focusedWindowId) {
                  if (
                    focusedWindowId != createdWindow.id
                    && options.autoClose
                  ) {
                    browser.windows.getCurrent().then(activeWindow => {
                      if (activeWindow.id != createdWindow.id) {
                        browser.windows.remove(createdWindow.id).then(
                          () => {},
                          () => {},
                        );
                      }
                    });
                  }
                }
                function onWindowRemoved(removedWindowId) {
                  if (removedWindowId == createdWindow.id) {
                    browser.windows.onFocusChanged?.removeListener(
                      onWindowFocusChanged,
                    );
                    browser.windows.onFocusChanged?.removeListener(
                      onWindowRemoved,
                    );
                  }
                }
                browser.windows.onFocusChanged?.addListener(
                  onWindowFocusChanged,
                );
                browser.windows.onRemoved?.addListener(onWindowRemoved);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    }
    function openPanelWindow(panelName, options) {
      return new Promise((resolve, reject) => {
        let panelUrl = browser.runtime.getURL(
          options.url + '?panel=' + panelName,
        );
        focusExistingTab(panelUrl)
          .then(alreadyFocused => {
            if (!alreadyFocused) {
              return openPopupWindow(panelName, options);
            }
          })
          .then(resolve)
          .catch(reject);
      });
    }
    function openPanel(panelName, options) {
      switch (options.type) {
        case 'panel':
          return openPanelWindow(panelName, options);
        case 'tab':
        default:
          return openAppTab(panelName, options);
      }
    }
    browser.tabs.onRemoved.addListener(tabId => {
      browserModule.__closeByTab(tabId);
      let panelName = tabToPanel[tabId];
      if (panelName) {
        delete tabToPanel[tabId];
        delete openPanels[panelName];
      }
    });
    function closePanel(panelName) {
      let entry = openPanels[panelName];
      if (entry && entry.type == 'tab') {
        browser.tabs.remove(entry.tabId);
      } else {
        if (entry && entry.type == 'window') {
          browser.windows.remove(entry.windowId);
        } else {
          rpc.call(panelName, 'close');
        }
      }
    }
    function isPanelOpen(panelName) {
      return !!openPanels[panelName];
    }
    appTabModule.exports = {
      open: openPanel,
      close: closePanel,
      isOpen: isPanelOpen,
    };
  });
  var requirePrefsLib = defineCommonjsModule((prefsExports, prefsModule) => {
    'use strict';

    var getMessage = requireI18n().getMessage;
    var reservedKeys = {};
    function WehPrefs() {
      this.$specs = {};
      this.$values = null;
      if (!this.$values) {
        this.$values = {};
      }
      this.$listeners = {};
    }
    WehPrefs.prototype = {
      notify: function (key, value, oldValue, specsFlag) {
        let self = this;
        let keyParts = key.split('.');
        let prefixes = [];
        for (let partCount = keyParts.length; partCount >= 0; partCount--) {
          prefixes.push(keyParts.slice(0, partCount).join('.'));
        }
        prefixes.forEach(function (prefix) {
          let listeners = self.$listeners[prefix];
          if (listeners) {
            listeners.forEach(function (listener) {
              if (listener.specs == specsFlag) {
                if (listener.pack) {
                  listener.pack[key] = value;
                  if (typeof listener.old[key] > 'u') {
                    listener.old[key] = oldValue;
                  }
                  if (listener.timer) {
                    clearTimeout(listener.timer);
                  }
                  listener.timer = setTimeout(function () {
                    delete listener.timer;
                    let packData = listener.pack;
                    let oldData = listener.old;
                    listener.pack = {};
                    listener.old = {};
                    try {
                      listener.callback(packData, oldData);
                    } catch {}
                  }, 0);
                } else {
                  try {
                    listener.callback(key, value, oldValue);
                  } catch {}
                }
              }
            });
          }
        });
      },
      forceNotify: function (includeSpecs) {
        if (typeof includeSpecs > 'u') {
          includeSpecs = !1;
        }
        let self = this;
        Object.keys(self.$specs).forEach(key => {
          self.notify(key, self.$values[key], self.$values[key], includeSpecs);
        });
      },
      declare: function (specsInput) {
        let self = this;
        if (!Array.isArray(specsInput)) {
          specsInput = Object.keys(specsInput).map(function (specKey) {
            let spec = specsInput[specKey];
            spec.name = specKey;
            return spec;
          });
        }
        specsInput.forEach(function (spec) {
          if (reservedKeys[spec.name]) {
            throw new Error('Forbidden prefs key ' + spec.name);
          }
          let sanitizedName;
          if (spec.hidden) {
            spec.label = spec.name;
            spec.description = '';
          } else {
            sanitizedName = spec.name.replace(/[^0-9a-zA-Z_]/g, '_');
            spec.label =
              spec.label
              || getMessage('weh_prefs_label_' + sanitizedName)
              || spec.name;
            spec.description =
              spec.description
              || getMessage('weh_prefs_description_' + sanitizedName)
              || '';
          }
          if (spec.type == 'choice') {
            spec.choices = (spec.choices || []).map(function (choice) {
              if (typeof choice == 'object') {
                return choice;
              }
              if (spec.hidden) {
                return {
                  value: choice,
                  name: choice,
                };
              }
              {
                let sanitizedOption = choice.replace(/[^0-9a-zA-Z_]/g, '_');
                return {
                  value: choice,
                  name:
                    getMessage(
                      'weh_prefs_'
                        + sanitizedName
                        + '_option_'
                        + sanitizedOption,
                    ) || choice,
                };
              }
            });
          }
          let existingValue = null;
          if (!self.$specs[spec.name]) {
            (function (specName) {
              if (typeof self[spec.name] < 'u') {
                existingValue = self[spec.name];
              }
              Object.defineProperty(self, specName, {
                set: function (newValue) {
                  let oldValue = self.$values[specName];
                  if (oldValue !== newValue) {
                    self.$values[specName] = newValue;
                    self.notify(specName, newValue, oldValue, !1);
                  }
                },
                get: function () {
                  if (self.$values[specName] !== void 0) {
                    return self.$values[specName];
                  } else {
                    return (
                      (self.$specs[specName]
                        && self.$specs[specName].defaultValue)
                      || void 0
                    );
                  }
                },
              });
            })(spec.name);
          }
          let oldSpec = self.$specs[spec.name];
          self.$specs[spec.name] = spec;
          if (existingValue !== null) {
            self.$values[spec.name] = existingValue;
          } else {
            if (typeof self.$values[spec.name] > 'u') {
              self.$values[spec.name] = spec.defaultValue;
            }
          }
          self.notify(spec.name, spec, oldSpec, !0);
        });
      },
      on: function () {
        let eventKey = '';
        let options = {};
        let argIndex = 0;
        if (typeof arguments[argIndex] == 'string') {
          eventKey = arguments[argIndex++];
        }
        if (typeof arguments[argIndex] == 'object') {
          options = arguments[argIndex++];
        }
        let callback = arguments[argIndex];
        let isPacked = !!options.pack;
        if (!this.$listeners[eventKey]) {
          this.$listeners[eventKey] = [];
        }
        let listener = {
          callback: callback,
          specs: !!options.specs,
        };
        if (isPacked) {
          listener.pack = {};
          listener.old = {};
        }
        this.$listeners[eventKey].push(listener);
      },
      off: function () {
        let eventKey = '';
        let argIndex = 0;
        if (typeof arguments[argIndex] == 'string') {
          eventKey = arguments[argIndex++];
        }
        let callback = arguments[argIndex];
        let listeners = this.$listeners[eventKey];
        if (listeners) {
          for (let index = listeners.length - 1; index >= 0; index--) {
            if (!callback || listeners[index] == callback) {
              listeners.splice(index, 1);
            }
          }
        }
      },
      getAll: function () {
        return Object.assign({}, this.$values);
      },
      getSpecs: function () {
        return Object.assign({}, this.$specs);
      },
      assign: function (source) {
        for (let propName in source) {
          if (source.hasOwnProperty(propName)) {
            this[propName] = source[propName];
          }
        }
      },
      isValid: function (key, value) {
        let spec = this.$specs[key];
        if (spec) {
          switch (spec.type) {
            case 'string':
              if (spec.regexp && !new RegExp(spec.regexp).test(value)) {
                return !1;
              }
              break;
            case 'integer':
              if (!/^-?[0-9]+$/.test(value) || isNaN(parseInt(value))) {
                return !1;
              }
            case 'float':
              if (
                (spec.type == 'float'
                  && (!/^-?[0-9]+(\.[0-9]+)?|(\.[0-9]+)$/.test(value)
                    || isNaN(parseFloat(value))))
                || (typeof spec.minimum < 'u' && value < spec.minimum)
                || (typeof spec.maximum < 'u' && value > spec.maximum)
              ) {
                return !1;
              }
              break;
            case 'choice':
              {
                let isMatch = !1;
                if (
                  ((spec.choices || []).forEach(choice => {
                    if (value == choice.value) {
                      isMatch = !0;
                    }
                  }),
                  !isMatch)
                ) {
                  return !1;
                }
              }
              break;
          }
          return !0;
        }
      },
      reducer: function (state = {}, action) {
        switch (action.type) {
          case 'weh.SET_PREFS':
            state = Object.assign({}, state, action.payload);
            break;
        }
        return state;
      },
      reduxDispatch(store) {
        this.on(
          '',
          {
            pack: !0,
          },
          pack => {
            store.dispatch({
              type: 'weh.SET_PREFS',
              payload: pack,
            });
          },
        );
      },
    };
    var prefs = new WehPrefs();
    for (let propName in prefs) {
      if (prefs.hasOwnProperty(propName)) {
        reservedKeys[propName] = !0;
      }
    }
    prefsModule.exports = prefs;
  });
  var requireDefaultPrefs = defineCommonjsModule(
    (defaultPrefsExports, defaultPrefsModule) => {
      'use strict';

      defaultPrefsModule.exports = [
        {
          name: 'networkProbe',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'titleMode',
          type: 'choice',
          defaultValue: 'right',
          choices: ['right', 'left', 'multiline'],
        },
        {
          name: 'iconActivation',
          type: 'choice',
          defaultValue: 'currenttab',
          choices: ['currenttab', 'anytab'],
        },
        {
          name: 'iconBadge',
          type: 'choice',
          defaultValue: 'tasks',
          choices: ['none', 'tasks', 'activetab', 'anytab', 'pinned', 'mixed'],
        },
        {
          name: 'hitsGotoTab',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'default-action-0',
          type: 'string',
          defaultValue: 'quickdownload',
          hidden: !0,
        },
        {
          name: 'default-action-1',
          type: 'string',
          defaultValue: 'openlocalfile',
          hidden: !0,
        },
        {
          name: 'default-action-2',
          type: 'string',
          defaultValue: 'abort',
          hidden: !0,
        },
        {
          name: 'smartnamerFnameSpaces',
          type: 'choice',
          defaultValue: 'keep',
          choices: ['keep', 'remove', 'hyphen', 'underscore'],
        },
        {
          name: 'smartnamerFnameMaxlen',
          type: 'integer',
          defaultValue: 64,
          minimum: 12,
          maximum: 256,
        },
        {
          name: 'downloadControlledMax',
          type: 'integer',
          defaultValue: 6,
          minimum: 0,
        },
        {
          name: 'downloadStreamControlledMax',
          type: 'integer',
          defaultValue: 6,
          minimum: 0,
        },
        {
          name: 'autoPin',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'mediaExtensions',
          type: 'string',
          defaultValue:
            'flv|ram|mpg|mpeg|avi|rm|wmv|mov|asf|mp3|rar|movie|divx|rbs|mp4|mpeg4',
        },
        {
          name: 'dashHideM4s',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'mpegtsHideTs',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'orphanExpiration',
          type: 'integer',
          defaultValue: 60,
          minimum: 0,
        },
        {
          name: 'chunksEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'hlsEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'dashEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'dashOnAdp',
          type: 'choice',
          defaultValue: 'audio_video',
          choices: ['audio', 'video', 'audio_video'],
        },
        {
          name: 'hlsDownloadAsM2ts',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'networkFilterOut',
          type: 'string',
          defaultValue:
            '/frag\\\\([0-9]+\\\\)/|[&\\\\?]range=[0-9]+-[0-9]+|/silverlight/',
        },
        {
          name: 'mediaweightThreshold',
          type: 'integer',
          defaultValue: 2097152,
        },
        {
          name: 'mediaweightMinSize',
          type: 'integer',
          defaultValue: 8192,
        },
        {
          name: 'tbvwsEnabled',
          type: 'boolean',
          defaultValue: !0,
          hidden: !0,
        },
        {
          name: 'converterThreads',
          type: 'string',
          defaultValue: 'auto',
        },
        {
          name: 'converterAggregTuneH264',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'notifyReady',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'noPrivateNotification',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'avplayEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'blacklistEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'chunksConcurrentDownloads',
          type: 'integer',
          defaultValue: 4,
        },
        {
          name: 'chunksPrefetchCount',
          type: 'integer',
          defaultValue: 4,
        },
        {
          name: 'downloadRetries',
          type: 'integer',
          defaultValue: 3,
        },
        {
          name: 'downloadRetryDelay',
          type: 'integer',
          defaultValue: 1e3,
        },
        {
          name: 'mpegtsSaveRaw',
          type: 'boolean',
          defaultValue: !1,
          hidden: !0,
        },
        {
          name: 'mpegtsSaveRawStreams',
          type: 'boolean',
          defaultValue: !1,
          hidden: !0,
        },
        {
          name: 'mpegtsEndsOnSeenChunk',
          type: 'boolean',
          defaultValue: !0,
          hidden: !0,
        },
        {
          name: 'converterKeepTmpFiles',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'backgroundReduxLogger',
          type: 'boolean',
          defaultValue: !1,
          hidden: !0,
        },
        {
          name: 'dlconvLastOutput',
          type: 'string',
          defaultValue: '',
          hidden: !0,
        },
        {
          name: 'qrMessageNotAgain',
          type: 'boolean',
          defaultValue: !1,
          hidden: !0,
        },
        {
          name: 'coappShellEnabled',
          type: 'boolean',
          defaultValue: !1,
          hidden: !0,
        },
        {
          name: 'downloadCount',
          type: 'integer',
          defaultValue: 0,
          hidden: !0,
        },
        {
          name: 'donateNotAgainExpire',
          type: 'integer',
          defaultValue: 0,
          hidden: !0,
        },
        {
          name: 'popupHeightLeftOver',
          type: 'integer',
          defaultValue: 100,
          hidden: !0,
        },
        {
          name: 'coappDownloads',
          type: 'choice',
          defaultValue: 'ask',
          choices: ['ask', 'coapp', 'browser'],
        },
        {
          name: 'lastDownloadDirectory',
          type: 'string',
          defaultValue: 'dwhelper',
        },
        {
          name: 'fileDialogType',
          type: 'choice',
          defaultValue: 'tab',
          choices: ['tab', 'panel'],
        },
        {
          name: 'alertDialogType',
          type: 'choice',
          defaultValue: 'tab',
          choices: ['tab', 'panel'],
        },
        {
          name: 'monitorNetworkRequests',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'chunkedCoappManifestsRequests',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'chunkedCoappDataRequests',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'coappRestartDelay',
          type: 'integer',
          defaultValue: 1e3,
        },
        {
          name: 'rememberLastDir',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'coappIdleExit',
          type: 'integer',
          defaultValue: 6e4,
        },
        {
          name: 'dialogAutoClose',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'convertControlledMax',
          type: 'integer',
          defaultValue: 1,
        },
        {
          name: 'checkCoappOnStartup',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'coappUseProxy',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'downloadCompleteDelay',
          type: 'integer',
          defaultValue: 1e3,
        },
        {
          name: 'contentRedirectEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'contextMenuEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'toolsMenuEnabled',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'medialinkExtensions',
          type: 'string',
          defaultValue: 'jpg|jpeg|gif|png|mpg|mpeg|avi|rm|wmv|mov|flv|mp3|mp4',
        },
        {
          name: 'medialinkMaxHits',
          type: 'integer',
          defaultValue: 50,
        },
        {
          name: 'medialinkMinFilesPerGroup',
          type: 'integer',
          defaultValue: 6,
        },
        {
          name: 'medialinkMinImgSize',
          type: 'integer',
          defaultValue: 80,
        },
        {
          name: 'medialinkAutoDetect',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'medialinkScanImages',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'medialinkScanLinks',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'bulkEnabled',
          type: 'boolean',
          defaultValue: !0,
        },
        {
          name: 'tbvwsGrabDelay',
          type: 'integer',
          defaultValue: 2e3,
        },
        {
          name: 'forcedCoappVersion',
          type: 'string',
          regexp: '^$|^\\d+\\.\\d+\\.\\d+$',
          defaultValue: '',
        },
        {
          name: 'lastHlsDownload',
          type: 'integer',
          defaultValue: 0,
          hidden: !0,
        },
        {
          name: 'galleryNaming',
          type: 'choice',
          choices: ['type-index', 'url', 'index-url'],
          defaultValue: 'type-index',
        },
        {
          name: 'hlsRememberPrevLiveChunks',
          type: 'boolean',
          defaultValue: !1,
        },
        {
          name: 'hlsEndTimeout',
          type: 'integer',
          defaultValue: 20,
        },
        {
          name: 'tbvwsExtractionMethod',
          type: 'choice',
          choices: [
            'page_android_ios_tvep',
            'page_ios_android_tvep',
            'android_ios_tvep_page',
            'ios_android_tvep_page',
            'page_tvep_android_ios',
            'android_ios_tvep',
            'page',
            'android',
            'tvep',
            'ios',
          ],
          defaultValue: 'page_android_ios_tvep',
        },
        {
          name: 'hitUpdateFloodProtect',
          type: 'integer',
          defaultValue: 100,
          hidden: !0,
        },
        {
          name: 'use_native_filepicker',
          type: 'boolean',
          defaultValue: !1,
        },
      ];
    },
  );
  var requireWeh = defineCommonjsModule((wehBgExports, wehBgModule) => {
    'use strict';

    var weh = requireWehCore();
    var browser = weh.browser;
    var appContents = {};
    var waiters = {};
    weh.rpc = requireRpc();
    weh.rpc.setUseTarget(!0);
    weh.rpc.setPost((uiName, message) => {
      let content = appContents[uiName];
      if (content && content.port) {
        content.port.postMessage(message);
      }
    });
    weh.rpc.listen({
      appStarted: arg => {},
      appReady: arg => {},
      closePanel: uiName => {
        weh.ui.close(uiName);
      },
    });
    browser.runtime.onConnect.addListener(port => {
      if (/^weh:(.*?):(.*)/.exec(port.name)) {
        port.onMessage.addListener(message => {
          if (
            typeof message._method < 'u'
            && (message._method === 'appStarted'
              || message._method === 'appReady')
          ) {
            let uiName = (message._args[0] && message._args[0].uiName) || null;
            let content = appContents[uiName] || {
              ready: !1,
            };
            if (
              ((appContents[uiName] = content),
              Object.assign(content, message._args[0], {
                port: port,
              }),
              message._method == 'appReady')
            ) {
              content.ready = !0;
              if (content.initData) {
                setTimeout(() =>
                  weh.rpc.call(uiName, 'wehInitData', content.initData),
                );
              }
              let waiter = waiters[uiName];
              if (waiter && waiter.timer) {
                clearTimeout(waiter.timer);
              }
            }
            port._weh_app = uiName;
          }
          weh.rpc.receive(message, port.postMessage.bind(port), port._weh_app);
        });
        port.onDisconnect.addListener(() => {
          let uiName = port._weh_app;
          if (uiName) {
            delete appContents[uiName];
            let waiter = waiters[uiName];
            if (waiter) {
              if (waiter.timer) {
                clearTimeout(waiter.timer);
              }
              delete waiters[uiName];
              waiter.reject(new Error('Disconnected waiting for ' + uiName));
            }
          }
        });
      }
    });
    weh.__declareAppTab = function (uiName, data) {
      if (!appContents[uiName]) {
        appContents[uiName] = {};
      }
      Object.assign(appContents[uiName], data);
    };
    weh.__closeByTab = function (tabId) {
      Object.keys(appContents).forEach(uiName => {
        if (appContents[uiName].tab === tabId) {
          delete appContents[uiName];
          let waiter = waiters[uiName];
          if (waiter) {
            if (waiter.timer) {
              clearTimeout(waiter.timer);
            }
            delete waiters[uiName];
            waiter.reject(new Error('Disconnected waiting for ' + uiName));
          }
        }
      });
    };
    weh._ = requireI18n().getMessage;
    weh.ui = requireAppTab();
    weh.openedContents = () => Object.keys(appContents);
    function hashString(str) {
      let hash = 0;
      let charCode;
      if (str.length === 0) {
        return hash;
      }
      for (let index = 0; index < str.length; index++) {
        charCode = str.charCodeAt(index);
        hash = (hash << 5) - hash + charCode;
        hash = hash & hash;
      }
      return hash;
    }
    function serializePrefs(prefsObj) {
      return JSON.stringify(
        Object.keys(prefsObj)
          .sort()
          .map(function (key) {
            return {
              name: key,
              value: prefsObj[key],
            };
          }),
      );
    }
    var lastPrefsHash = 0;
    weh.unsafe_prefs = requirePrefsLib();
    weh.prefs = browser.storage.local
      .get('weh-prefs')
      .then(stored => {
        let prefs = weh.unsafe_prefs;
        let savedPrefs = stored['weh-prefs'] || {};
        prefs.assign(savedPrefs);
        prefs.on(
          '',
          {
            pack: !0,
          },
          function (pack, previous) {
            Object.assign(savedPrefs, pack);
            let serialized = serializePrefs(savedPrefs);
            let hash = hashString(serialized);
            if (hash != lastPrefsHash) {
              lastPrefsHash = hash;
              browser.storage.local.set({
                'weh-prefs': savedPrefs,
              });
            }
            Object.keys(appContents).forEach(uiName => {
              weh.rpc.call(uiName, 'setPrefs', pack);
            });
          },
        );
        prefs.declare(requireDefaultPrefs());
        return prefs;
      })
      .catch(error => {
        console.error('web-background error:', error);
      });
    weh.wait = (uiName, options = {}) => {
      let existingWaiter = waiters[uiName];
      if (existingWaiter) {
        if (existingWaiter.timer) {
          clearTimeout(existingWaiter.timer);
        }
        delete waiters[uiName];
        existingWaiter.reject(new Error('Waiter for ' + uiName + ' overriden'));
      }
      return new Promise((resolve, reject) => {
        waiters[uiName] = {
          resolve: resolve,
          reject: reject,
          timer: setTimeout(() => {
            delete waiters[uiName];
            reject(new Error('Waiter for ' + uiName + ' timed out'));
          }, options.timeout || 6e4),
        };
      });
    };
    weh.rpc.listen({
      prefsGetAll: async () => (await weh.prefs).getAll(),
      prefsGetSpecs: async () => (await weh.prefs).getSpecs(),
      prefsSet: async newPrefs => (await weh.prefs).assign(newPrefs),
      trigger: (uiName, value) => {
        let waiter = waiters[uiName];
        if (!waiter) {
          throw new Error('No waiter for', uiName);
        }
        if (waiter.timer) {
          clearTimeout(waiter.timer);
          delete waiter.timer;
        }
        delete waiters[uiName];
        waiter.resolve(value);
      },
    });
    wehBgModule.exports = weh;
  });
  var requireBuildInfo = defineCommonjsModule(
    (buildInfoExports, buildInfoModule) => {
      buildInfoModule.exports = {
        prod: !0,
        channel: 'stable',
        buildDate: '2024-10-15',
        buildOptions: {
          linuxlic: !1,
          noyt: !0,
          target: 'google',
          browser: 'chrome',
        },
      };
    },
  );
  var requireInspect = defineCommonjsModule((inspectExports, inspectModule) => {
    'use strict';

    var wehModule = requireWehCore();
    var rpc = requireRpc();
    var prefs = requirePrefsLib();
    var browser = wehModule.browser;
    var inspectorId = null;
    var inspect = null;
    var inspected = !1;
    if (browser.runtime.onMessageExternal) {
      browser.runtime.onMessageExternal.addListener(
        function (message, sender, sendResponse) {
          switch (message.type) {
            case 'weh#inspect-ping':
              inspectorId = sender.id;
              sendResponse({
                type: 'weh#inspect-pong',
                version: 1,
                manifest: browser.runtime.getManifest(),
              });
              break;
            case 'weh#inspect':
              inspectorId = sender.id;
              inspected = message.inspected;
              if (inspected) {
                rpc.setHook(hookMessage => {
                  if (inspected && inspectorId) {
                    browser.runtime
                      .sendMessage(inspectorId, {
                        type: 'weh#inspect-message',
                        message: hookMessage,
                      })
                      .catch(error => {
                        console.info('Error sending message', error);
                        inspected = !1;
                      });
                  }
                });
              } else {
                rpc.setHook(null);
              }
              sendResponse({
                type: 'weh#inspect',
                version: 1,
                inspected: inspected,
              });
              break;
            case 'weh#get-prefs':
              inspectorId = sender.id;
              sendResponse({
                type: 'weh#prefs',
                prefs: prefs.getAll(),
                specs: prefs.getSpecs(),
              });
              break;
            case 'weh#set-pref':
              prefs[message.pref] = message.value;
              sendResponse(!0);
              break;
          }
        },
      );
      inspect = {
        send: () => {
          console.info('TODO implement inspect.send');
        },
      };
    }
    inspectModule.exports = inspect;
  });
  var originReferrerNs = {};
  defineExports(originReferrerNs, {
    removeOriginAndReferrerSetterForUrl: () =>
      removeOriginAndReferrerSetterForUrl,
    setOriginAndReferrerSetterForUrl: () => setOriginAndReferrerSetterForUrl,
  });
  async function setOriginAndReferrerSetterForUrl(url, origin, referer) {
    if (!(!origin && !referer)) {
      if (headerSetterIsMv3) {
        let headerRules = [];
        if (origin) {
          headerRules.push({
            operation: 'set',
            header: 'origin',
            value: origin,
          });
        }
        if (referer) {
          headerRules.push({
            operation: 'set',
            header: 'referer',
            value: referer,
          });
        }
        let ruleId = nextHeaderRuleId++;
        let rule = {
          id: ruleId,
          priority: 1,
          action: {
            type: 'modifyHeaders',
            requestHeaders: headerRules,
          },
          condition: {
            urlFilter: url,
            resourceTypes: ['xmlhttprequest'],
          },
        };
        headerSessionRuleIds.set(url, [ruleId]);
        try {
          await headerBrowser.declarativeNetRequest.updateSessionRules({
            addRules: [rule],
          });
        } catch {}
      } else {
        let headerListener = details => {
          let headers = details.requestHeaders.filter(
            header => header.name != 'origin' && header.name != 'referer',
          );
          if (origin) {
            headers.push({
              name: 'origin',
              value: origin,
            });
          }
          if (referer) {
            headers.push({
              name: 'referer',
              value: referer,
            });
          }
          return {
            requestHeaders: headers,
          };
        };
        headerListeners.set(url, headerListener);
        headerBrowser.webRequest.onBeforeSendHeaders.addListener(
          headerListener,
          {
            urls: [url],
          },
          ['blocking', 'requestHeaders'],
        );
      }
    }
  }
  async function removeOriginAndReferrerSetterForUrl(url) {
    if (headerSetterIsMv3) {
      let ruleIds = headerSessionRuleIds.get(url);
      if (ruleIds) {
        headerSessionRuleIds.delete(url);
        await headerBrowser.declarativeNetRequest.updateSessionRules({
          removeRuleIds: ruleIds,
        });
      }
    } else {
      let headerListener = headerListeners.get(url);
      if (headerListener) {
        headerListeners.delete(headerListener);
        headerBrowser.webRequest.onBeforeSendHeaders.removeListener(
          headerListener,
        );
      }
    }
  }
  var headerBrowser;
  var headerListeners;
  var headerSessionRuleIds;
  var nextHeaderRuleId;
  var headerSetterIsMv3;
  var initOriginReferrer = defineLazyModule(() => {
    'use strict';

    ({ browser: headerBrowser } = requireWeh());
    headerListeners = new Map();
    headerSessionRuleIds = new Map();
    nextHeaderRuleId = 1;
    headerSetterIsMv3 =
      headerBrowser.runtime.getManifest().manifest_version >= 3;
  });
  var coreUtilNs = {};
  defineExports(coreUtilNs, {
    Cache: () => Cache,
    Concurrent: () => Concurrent,
    DetailsError: () => DetailsError,
    VDHError: () => VDHError,
    arrayEquals: () => arrayEquals,
    bufferToHex: () => bufferToHex,
    executeScriptWithGlobal: () => executeScriptWithGlobal,
    fromByteArray: () => fromByteArray,
    generateRandomString: () => generateRandomString,
    gotoOrOpenTab: () => gotoOrOpenTab,
    gotoTab: () => gotoTab,
    hash: () => hash,
    hashHex: () => hashHex,
    headerSubsSalt: () => headerSubsSalt,
    isMinimumVersion: () => isMinimumVersion,
    request: () => request,
    toByteArray: () => toByteArray,
  });
  function hash(str) {
    let hashValue = 0;
    let index;
    let charCode;
    let length;
    if (str.length === 0) {
      return hashValue;
    }
    for (index = 0, length = str.length; index < length; index++) {
      charCode = str.charCodeAt(index);
      hashValue = (hashValue << 5) - hashValue + charCode;
      hashValue |= 0;
    }
    return hashValue;
  }
  function hashHex(str) {
    return Math.abs(hash(str)).toString(16);
  }
  function gotoTab(url) {
    return utilBrowser.tabs
      .query({
        url: url,
      })
      .then(tabs =>
        tabs.length > 0
          ? (utilBrowser.tabs.update(tabs[0].id, {
              active: !0,
            }),
            utilBrowser.windows.update(tabs[0].windowId, {
              focused: !0,
            }),
            !0)
          : !1,
      );
  }
  function gotoOrOpenTab(url, callback = null) {
    let attempts = 0;
    function tryOpen() {
      return utilBrowser.windows
        .getLastFocused({
          windowTypes: ['normal'],
        })
        .then(lastWindow =>
          lastWindow.type != 'normal'
            ? ++attempts < 20
              ? new Promise((resolve, reject) => {
                  setTimeout(() => tryOpen(), 100);
                })
              : new Promise((resolveWin, rejectWin) => {
                  utilBrowser.windows
                    .getAll({
                      windowTypes: ['normal'],
                    })
                    .then(allWindows => {
                      if (
                        allWindows.every(win =>
                          win.type == 'normal' ? (resolveWin(win.id), !1) : !0,
                        )
                      ) {
                        throw new Error('No normal window to open tab');
                      }
                    });
                })
            : lastWindow.id,
        )
        .then(windowId => {
          let activeTabId = null;
          if (windowId) {
            return utilBrowser.tabs
              .query({
                active: !0,
                lastFocusedWindow: !0,
              })
              .then(
                activeTabs => (
                  activeTabs.length > 0 && (activeTabId = activeTabs[0].id),
                  new Promise((resolveNewTab, rejectNewTab) => {
                    let pendingTabId = null;
                    let onTabUpdated = (tabId, changeInfo, tab) => {
                      if (
                        tabId == pendingTabId
                        && changeInfo.status === 'complete'
                      ) {
                        utilBrowser.tabs.onUpdated.removeListener(onTabUpdated);
                        resolveNewTab(tab);
                      }
                    };
                    utilBrowser.tabs.onUpdated.addListener(onTabUpdated);
                    utilBrowser.tabs
                      .create({
                        url: url,
                        windowId: windowId,
                      })
                      .then(createdTab => {
                        if (createdTab.status === 'complete') {
                          utilBrowser.tabs.onUpdated.removeListener(
                            onTabUpdated,
                          );
                          resolveNewTab(createdTab);
                        } else {
                          pendingTabId = createdTab.id;
                        }
                      });
                  }).then(completedTab => {
                    if (activeTabId && callback) {
                      callback(completedTab.id, activeTabId);
                    }
                  })
                ),
              );
          }
        });
    }
    return gotoTab(url).then(alreadyOpen =>
      alreadyOpen ? Promise.resolve() : tryOpen(),
    );
  }
  function arrayEquals(arrayA, arrayB) {
    if (arrayA.length !== arrayB.length) {
      return !1;
    }
    for (let index = 0, length = arrayA.length; index < length; index++) {
      if (arrayA[index] !== arrayB[index]) {
        return !1;
      }
    }
    return !0;
  }
  function generateRandomString(length) {
    let bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    let result = '';
    for (let index = 0; index < bytes.length; index++) {
      result += ('0' + bytes[index].toString(16)).slice(-2);
    }
    return result.substring(0, length);
  }
  async function request(options) {
    let credentials = 'include';
    if (options.anonymous) {
      credentials = 'omit';
    }
    let url = options.url;
    let method = options.method || 'GET';
    let referrer = '';
    let headers = new Headers();
    if (options.headers) {
      if (options.headers instanceof Array) {
        for (let header of options.headers) {
          headers.append(header.name, header.value);
        }
      } else {
        headers = new Headers(options.headers);
      }
      if (headers.has('referer')) {
        referrer = headers.get('referer');
      }
      if (headers.has('referrer')) {
        referrer = headers.get('referrer');
      }
      for (let forbidden of forbiddenRequestHeaders) {
        headers.delete(forbidden);
      }
    }
    let body;
    if (options.contentJSON) {
      body = JSON.stringify(options.contentJSON);
    } else {
      if (options.content) {
        body = options.content;
      }
    }
    await setHeadersForUrl(url, headers.get('origin'), referrer);
    let response;
    try {
      response = await fetch(url, {
        referrer: referrer,
        method: method,
        headers: headers,
        body: body,
        credentials: credentials,
      });
    } finally {
      await clearHeadersForUrl(url);
    }
    return response;
  }
  function bufferToHex(buffer) {
    let parts = [];
    let view = new DataView(buffer);
    for (let offset = 0; offset < view.byteLength; offset += 4) {
      let hex = view.getUint32(offset).toString(16);
      let pad = '00000000';
      let padded = (pad + hex).slice(-pad.length);
      parts.push(padded);
    }
    return parts.join('');
  }
  function Concurrent(...args) {
    let limiter = new ConcurrentLimiter(...args);
    return limiter.callFn().bind(limiter);
  }
  function isMinimumVersion(current = '0.0.0', minimum) {
    let currentParts = current.split('.').map(part => parseInt(part));
    let minimumParts = minimum.split('.').map(part => parseInt(part));
    for (let index = 0; index < currentParts.length; index++) {
      if (
        typeof minimumParts[index] > 'u'
        || currentParts[index] > minimumParts[index]
      ) {
        return !0;
      }
      if (currentParts[index] < minimumParts[index]) {
        return !1;
      }
    }
    return !0;
  }
  async function executeScriptWithGlobal(target, globalObj, file) {
    let isObject = value => value && typeof value == 'object';
    let deepClone = value => JSON.parse(JSON.stringify(value));
    if (!isObject(globalObj)) {
      throw new Error('global argument is not an object');
    }
    globalObj = deepClone(globalObj);
    let injection = {
      target: target,
      func: value => {
        Object.assign(window, value);
      },
      args: [globalObj],
    };
    await utilBrowser.scripting.executeScript(injection);
    injection = {
      target: target,
      files: [file],
    };
    await utilBrowser.scripting.executeScript(injection);
  }
  var wehApi;
  var utilBrowser;
  var setHeadersForUrl;
  var clearHeadersForUrl;
  var toByteArray;
  var fromByteArray;
  var forbiddenRequestHeaders;
  var headerSubsSalt;
  var Cache;
  var ConcurrentLimiter;
  var VdhBaseError;
  var VDHError;
  var DetailsError;
  var initCoreUtil = defineLazyModule(() => {
    'use strict';

    wehApi = requireWeh();
    utilBrowser = wehApi.browser;
    ({
      setOriginAndReferrerSetterForUrl: setHeadersForUrl,
      removeOriginAndReferrerSetterForUrl: clearHeadersForUrl,
    } = (initOriginReferrer(), toCommonjs(originReferrerNs)));
    ({ toByteArray: toByteArray, fromByteArray: fromByteArray } = (() => {
      let idx;
      let base64Alphabet =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let base64Chars = [];
      for (idx = 0; idx < base64Alphabet.length; idx++) {
        base64Chars[idx] = base64Alphabet[idx];
      }
      let revLookup = [];
      for (idx = 0; idx < base64Alphabet.length; ++idx) {
        revLookup[base64Alphabet.charCodeAt(idx)] = idx;
      }
      revLookup[45] = 62;
      revLookup[95] = 63;
      let ByteArrayType = typeof Uint8Array < 'u' ? Uint8Array : Array;
      function lookupValue(char) {
        let value = revLookup[char.charCodeAt(0)];
        if (value !== void 0) {
          return value;
        } else {
          return -1;
        }
      }
      function decodeBase64(b64Str) {
        let srcIndex;
        let groupIndex;
        let mainChunkLen;
        let chunk;
        let padding;
        let bytes;
        if (b64Str.length % 4 > 0) {
          throw new Error('Invalid string. Length must be a multiple of 4');
        }
        let b64Len = b64Str.length;
        padding =
          b64Str.charAt(b64Len - 2) === '='
            ? 2
            : b64Str.charAt(b64Len - 1) === '='
              ? 1
              : 0;
        bytes = new ByteArrayType((b64Str.length * 3) / 4 - padding);
        mainChunkLen = padding > 0 ? b64Str.length - 4 : b64Str.length;
        let writePos = 0;
        function pushByte(byteVal) {
          bytes[writePos++] = byteVal;
        }
        for (
          srcIndex = 0, groupIndex = 0;
          srcIndex < mainChunkLen;
          srcIndex += 4, groupIndex += 3
        ) {
          chunk =
            (lookupValue(b64Str.charAt(srcIndex)) << 18)
            | (lookupValue(b64Str.charAt(srcIndex + 1)) << 12)
            | (lookupValue(b64Str.charAt(srcIndex + 2)) << 6)
            | lookupValue(b64Str.charAt(srcIndex + 3));
          pushByte(((chunk & 16711680) >>> 16) >>> 0);
          pushByte(((chunk & 65280) >>> 8) >>> 0);
          pushByte((chunk & 255) >>> 0);
        }
        if (padding === 2) {
          chunk =
            (lookupValue(b64Str.charAt(srcIndex)) << 2)
            | ((lookupValue(b64Str.charAt(srcIndex + 1)) >>> 4) >>> 0);
          pushByte(chunk & 255);
        } else {
          if (padding === 1) {
            chunk =
              (lookupValue(b64Str.charAt(srcIndex)) << 10)
              | (lookupValue(b64Str.charAt(srcIndex + 1)) << 4)
              | ((lookupValue(b64Str.charAt(srcIndex + 2)) >>> 2) >>> 0);
            pushByte(((chunk >>> 8) >>> 0) & 255);
            pushByte(chunk & 255);
          }
        }
        return bytes;
      }
      function encodeByte(index) {
        return base64Chars[index];
      }
      function tripletToBase64(num) {
        return (
          encodeByte(((num >>> 18) >>> 0) & 63)
          + encodeByte(((num >>> 12) >>> 0) & 63)
          + encodeByte(((num >>> 6) >>> 0) & 63)
          + encodeByte(num & 63)
        );
      }
      function encodeChunk(bytes, start, end) {
        let triplet;
        let output = [];
        for (let pos = start; pos < end; pos += 3) {
          triplet = (bytes[pos] << 16) + (bytes[pos + 1] << 8) + bytes[pos + 2];
          output.push(tripletToBase64(triplet));
        }
        return output.join('');
      }
      function encodeBase64(bytes) {
        let offset;
        let extraBytes = bytes.length % 3;
        let tail = '';
        let parts = [];
        let temp;
        let mainLen;
        let chunkSize = 16383;
        for (
          offset = 0, mainLen = bytes.length - extraBytes;
          offset < mainLen;
          offset += chunkSize
        ) {
          parts.push(
            encodeChunk(
              bytes,
              offset,
              offset + chunkSize > mainLen ? mainLen : offset + chunkSize,
            ),
          );
        }
        switch (extraBytes) {
          case 1:
            temp = bytes[bytes.length - 1];
            tail += encodeByte((temp >>> 2) >>> 0);
            tail += encodeByte((temp << 4) & 63);
            tail += '==';
            break;
          case 2:
            temp = (bytes[bytes.length - 2] << 8) + bytes[bytes.length - 1];
            tail += encodeByte((temp >>> 10) >>> 0);
            tail += encodeByte(((temp >>> 4) >>> 0) & 63);
            tail += encodeByte((temp << 2) & 63);
            tail += '=';
            break;
          default:
            break;
        }
        parts.push(tail);
        return parts.join('');
      }
      return {
        toByteArray: decodeBase64,
        fromByteArray: encodeBase64,
      };
    })());
    forbiddenRequestHeaders = [
      'Accept-Charset',
      'Accept-Encoding',
      'Access-Control-Request-Headers',
      'Access-Control-Request-Method',
      'Connection',
      'Content-Length',
      'Cookie',
      'Cookie2',
      'Date',
      'DNT',
      'Expect',
      'Host',
      'Keep-Alive',
      'Referer',
      'TE',
      'Trailer',
      'Transfer-Encoding',
      'Upgrade',
      'Via',
      'x-chrome-uma-enabled',
      'x-client-data',
    ];
    headerSubsSalt = generateRandomString(8);
    Cache = class {
      constructor(getFn, setFn) {
        this.getFn = getFn;
        this.setFn = setFn;
        this.callbacks = [];
        this.queried = !1;
        this.value = void 0;
      }
      get() {
        let self = this;
        return () =>
          typeof self.value < 'u'
            ? Promise.resolve(self.value)
            : new Promise((resolve, reject) => {
                if (
                  (self.callbacks.push({
                    resolve: resolve,
                    reject: reject,
                  }),
                  !self.queried)
                ) {
                  self.queried = !0;
                  try {
                    Promise.resolve(self.getFn())
                      .then(value => {
                        for (self.value = value; self.callbacks.length; ) {
                          self.callbacks.shift().resolve(value);
                        }
                      })
                      .catch(error => {
                        for (; self.callbacks.length; ) {
                          self.callbacks.shift().reject(error);
                        }
                      });
                  } catch (error) {
                    for (self.queried = !1; self.callbacks.length; ) {
                      self.callbacks.shift().reject(error);
                    }
                  }
                }
              });
      }
      set(value) {
        if (!this.setFn) {
          return Promise.reject(new Error('Value is read-only'));
        }
        if (typeof value > 'u') {
          return Promise.reject(new Error('Cannot set undefined value'));
        }
        for (this.value = value; this.callbacks.length; ) {
          this.callbacks.shift().resolve();
        }
        this.setFn(value);
        return Promise.resolve();
      }
    };
    ConcurrentLimiter = class {
      constructor(maxFn = 1) {
        this.maxFn = maxFn;
        this.pendings = [];
        this.count = 0;
      }
      async getMax() {
        if (typeof this.maxFn == 'function') {
          return this.maxFn();
        } else {
          return this.maxFn;
        }
      }
      callFn() {
        let self = this;
        return (task, onCancel) =>
          self.getMax().then(max =>
            self.count < max
              ? self.doCall(task)
              : new Promise((resolve, reject) => {
                  let runTask = () =>
                    Promise.resolve(task()).then(resolve).catch(reject);
                  self.pendings.push(runTask);
                  if (onCancel) {
                    onCancel(
                      cancelValue => {
                        let taskIndex = self.pendings.indexOf(runTask);
                        if (taskIndex >= 0) {
                          self.pendings.splice(taskIndex, 1);
                          resolve(cancelValue);
                        }
                      },
                      rejectValue => {
                        let taskIndex = self.pendings.indexOf(runTask);
                        if (taskIndex >= 0) {
                          self.pendings.splice(taskIndex, 1);
                          reject(rejectValue);
                        }
                      },
                    );
                  }
                }),
          );
      }
      attempt() {
        if (this.pendings.length > 0) {
          let self = this;
          self.getMax().then(max => {
            if (self.count < max) {
              self.doCall(self.pendings.shift());
            }
          });
        }
      }
      doCall(task) {
        let self = this;
        this.count++;
        return Promise.resolve(task())
          .then(result => (self.count--, self.attempt(), result))
          .catch(error => {
            throw (self.count--, self.attempt(), error);
          });
      }
    };
    VdhBaseError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace == 'function') {
          Error.captureStackTrace(this, this.constructor);
        } else {
          this.stack = new Error(message).stack;
        }
      }
    };
    VDHError = class extends VdhBaseError {
      constructor(message, props) {
        super(message);
        Object.assign(this, props);
      }
    };
    DetailsError = class extends VDHError {
      constructor(message, details) {
        super(message, {
          _details: details,
        });
      }
      get details() {
        return this._details;
      }
      toString() {
        return `${this.message}: ${this._details}`;
      }
    };
  });
  var downloadsNs = {};
  defineExports(downloadsNs, {
    Downloads: () => Downloads,
  });
  var Downloads;
  var initDownloadsLib = defineLazyModule(() => {
    'use strict';

    Downloads = class {
      constructor(coapp) {
        this.coapp = coapp;
      }
      download(options) {
        return this.coapp.call('downloads.download', options);
      }
      search(query) {
        return this.coapp.call('downloads.search', query);
      }
      cancel(downloadId) {
        return this.coapp.call('downloads.cancel', downloadId);
      }
    };
  });
  var getTypeTag;
  var isString;
  var initTypeTagHelpers = defineLazyModule(() => {
    getTypeTag = value => Object.prototype.toString.call(value).slice(8, -1);
    isString = value => typeof value == 'string' || value instanceof String;
  });
  var SEMVER_RADIX;
  var numericIdent;
  var alphanumericIdent;
  var preReleaseIdent;
  var preReleasePattern;
  var buildIdent;
  var buildPattern;
  var semverPattern;
  var positiveIntRegex;
  var looseVersionRegex;
  var strictVersionRegex;
  var isValidSemVer;
  var parseIdent;
  var compareSemVer;
  var parseSemVer;
  var compareSemVerAsync;
  var isValidSemVerAsync;
  var parseSemVerAsync;
  var semverPromises;
  var initSemverParser = defineLazyModule(() => {
    initTypeTagHelpers();
    SEMVER_RADIX = 10;
    numericIdent = '0|[1-9]\\d*';
    alphanumericIdent = '\\d*[A-Z-][A-Z\\d-]*';
    preReleaseIdent = `(?:${alphanumericIdent}|${numericIdent})`;
    preReleasePattern = `${preReleaseIdent}(?:\\.${preReleaseIdent})*`;
    buildIdent = `(?:${alphanumericIdent}|\\d+)`;
    buildPattern = `${buildIdent}(?:\\.${buildIdent})*`;
    semverPattern = `((?:${numericIdent})(?:\\.(?:${numericIdent})){2})(?:-(${preReleasePattern}))?(?:\\+(${buildPattern}))?`;
    positiveIntRegex = new RegExp(`^(?:${numericIdent})$`);
    looseVersionRegex = new RegExp(`^v?${semverPattern}$`, 'i');
    strictVersionRegex = new RegExp(`^${semverPattern}$`, 'i');
    isValidSemVer = (version, loose = !1) => {
      if (!isString(version)) {
        throw new TypeError(`Expected String but got ${getTypeTag(version)}.`);
      }
      return (loose ? strictVersionRegex : looseVersionRegex).test(version);
    };
    parseIdent = (identifier, loose = !1) => {
      if (!isString(identifier)) {
        throw new TypeError(
          `Expected String but got ${getTypeTag(identifier)}.`,
        );
      }
      if (!(loose || positiveIntRegex.test(identifier))) {
        throw new Error(`${identifier} is not a stringified positive integer.`);
      }
      let parsed;
      if (positiveIntRegex.test(identifier)) {
        if (
          ((parsed = parseInt(identifier, SEMVER_RADIX)),
          !Number.isSafeInteger(parsed))
        ) {
          throw new RangeError(`${parsed} exceeds ${Number.MAX_SAFE_INTEGER}.`);
        }
      } else {
        parsed = identifier;
      }
      return parsed;
    };
    compareSemVer = (versionA, versionB, loose = !1) => {
      if (!isString(versionA)) {
        throw new TypeError(`Expected String but got ${getTypeTag(versionA)}.`);
      }
      if (!isString(versionB)) {
        throw new TypeError(`Expected String but got ${getTypeTag(versionB)}.`);
      }
      if (!isValidSemVer(versionA, !!loose)) {
        throw new Error(`${versionA} is not valid version string.`);
      }
      if (!isValidSemVer(versionB, !!loose)) {
        throw new Error(`${versionB} is not valid version string.`);
      }
      let result;
      if (versionA === versionB) {
        result = 0;
      } else {
        let regex = loose ? strictVersionRegex : looseVersionRegex;
        let [, coreA, preA] = versionA.match(regex);
        let [, coreB, preB] = versionB.match(regex);
        let [majorA, minorA, patchA] = coreA
          .split('.')
          .map(part => parseIdent(part));
        let [majorB, minorB, patchB] = coreB
          .split('.')
          .map(part => parseIdent(part));
        if (majorA > majorB) {
          result = 1;
        } else if (majorA < majorB) {
          result = -1;
        } else if (minorA > minorB) {
          result = 1;
        } else if (minorA < minorB) {
          result = -1;
        } else if (patchA > patchB) {
          result = 1;
        } else if (patchA < patchB) {
          result = -1;
        } else if (preA === preB) {
          result = 0;
        } else if (!preA && preB) {
          result = 1;
        } else if (preA && !preB) {
          result = -1;
        } else {
          let preAParts = preA.split('.').map(part => parseIdent(part, !0));
          let preBParts = preB.split('.').map(part => parseIdent(part, !0));
          let maxLen = Math.max(preAParts.length, preBParts.length);
          let idx = 0;
          for (; idx < maxLen; ) {
            let partA = preAParts[idx];
            let partB = preBParts[idx];
            if (
              ((partA && !partB) || (isString(partA) && Number.isInteger(partB))
                ? (result = 1)
                : (!partA && partB)
                    || (Number.isInteger(partA) && isString(partB))
                  ? (result = -1)
                  : partA !== partB && isString(partA) && isString(partB)
                    ? (result = partA.localeCompare(partB))
                    : Number.isInteger(partA)
                      && Number.isInteger(partB)
                      && (partA > partB
                        ? (result = 1)
                        : partA < partB && (result = -1)),
              Number.isInteger(result))
            ) {
              break;
            }
            idx++;
          }
        }
      }
      return result;
    };
    parseSemVer = (version, loose = !1) => {
      if (!isString(version)) {
        throw new TypeError(`Expected String but got ${getTypeTag(version)}.`);
      }
      let matches = isValidSemVer(version, !!loose);
      let major;
      let minor;
      let patch;
      let pre;
      let build;
      if (matches) {
        let regex = loose ? strictVersionRegex : looseVersionRegex;
        let [, core, preStr, buildStr] = version.match(regex);
        [major, minor, patch] = core.split('.').map(part => parseIdent(part));
        if (preStr) {
          pre = preStr.split('.').map(part => parseIdent(part, !0));
        }
        if (buildStr) {
          build = buildStr.split('.').map(part => parseIdent(part, !0));
        }
      }
      return {
        version: version,
        matches: matches,
        major: major,
        minor: minor,
        patch: patch,
        pre: pre,
        build: build,
      };
    };
    compareSemVerAsync = async (versionA, versionB, loose = !1) =>
      compareSemVer(versionA, versionB, loose);
    isValidSemVerAsync = async (version, loose = !1) =>
      isValidSemVer(version, loose);
    parseSemVerAsync = async (version, loose = !1) =>
      parseSemVer(version, loose);
    semverPromises = {
      compareSemVer: compareSemVerAsync,
      isValidSemVer: isValidSemVerAsync,
      parseSemVer: parseSemVerAsync,
    };
  });
  var semverNs = {};
  defineExports(semverNs, {
    compareSemVer: () => compareSemVer,
    isValidSemVer: () => isValidSemVer,
    parseSemVer: () => parseSemVer,
    promises: () => semverPromises,
  });
  var initSemver = defineLazyModule(() => {
    initSemverParser();
  });
  var requireCoappClient = defineCommonjsModule((coappExports, coappModule) => {
    'use strict';

    var wehModule = requireWehCore();
    var browser = wehModule.browser;
    var rpc = requireRpc();
    var EventNotifier = class {
      constructor() {
        this.listeners = [];
      }
      addListener(listener) {
        this.listeners.push(listener);
      }
      removeListener(listener) {
        this.listeners = this.listeners.filter(
          existing => listener !== existing,
        );
      }
      removeAllListeners() {
        this.listeners = [];
      }
      notify(...args) {
        this.listeners.forEach(listener => {
          try {
            listener(...args);
          } catch (error) {
            console.warn(error);
          }
        });
      }
    };
    var CALL_ADDON_TO_APP = 1;
    var CALL_APP_TO_ADDON = 2;
    var CoApp = class {
      constructor(appId, options = {}) {
        this.appId = appId;
        this.name = options.name || appId;
        this.appPort = null;
        this.pendingCalls = [];
        this.runningCalls = [];
        this.state = 'idle';
        this.postFn = this.post.bind(this);
        this.postMessageFn = this.postMessage.bind(this);
        this.onAppNotFound = new EventNotifier();
        this.onAppNotFoundCheck = new EventNotifier();
        this.onCallCount = new EventNotifier();
        this.appStatus = 'unknown';
        this.app2AddonCallCount = 0;
        this.addon2AppCallCount = 0;
      }
      post(peer, message) {
        this.appPort.postMessage(message);
      }
      postMessage(message) {
        this.appPort.postMessage(message);
      }
      updateCallCount(direction, delta) {
        switch (direction) {
          case CALL_APP_TO_ADDON:
            this.app2AddonCallCount += delta;
            break;
          case CALL_ADDON_TO_APP:
            this.addon2AppCallCount += delta;
            break;
        }
        this.onCallCount.notify(
          this.addon2AppCallCount,
          this.app2AddonCallCount,
        );
      }
      close() {
        if (this.appPort) {
          try {
            this.appPort.disconnect();
            this.cleanup();
          } catch {}
        }
      }
      call(...params) {
        return this.callCatchAppNotFound(null, ...params);
      }
      callCatchAppNotFound(onNotFound, ...params) {
        let self = this;
        function flushPending(error) {
          let pendingCall;
          while ((pendingCall = self.pendingCalls.shift())) {
            if (error) {
              pendingCall.reject(error);
            } else {
              self.runningCalls.push(pendingCall);
              let call = pendingCall;
              rpc
                .call(self.postFn, self.name, ...pendingCall.params)
                .then(result => {
                  self.runningCalls.splice(self.runningCalls.indexOf(call), 1);
                  return result;
                })
                .then(call.resolve)
                .catch(callError => {
                  self.runningCalls.splice(self.runningCalls.indexOf(call), 1);
                  call.reject(callError);
                });
            }
          }
        }
        if (
          onNotFound
          && (self.appStatus == 'unknown' || self.appStatus == 'checking')
        ) {
          self.onAppNotFoundCheck.addListener(onNotFound);
        }
        self.updateCallCount(CALL_ADDON_TO_APP, 1);
        switch (this.state) {
          case 'running':
            return new Promise((resolve, reject) => {
              let call = {
                resolve: resolve,
                reject: reject,
                params: [...params],
              };
              self.runningCalls.push(call);
              rpc
                .call(self.postFn, self.name, ...params)
                .then(result => {
                  self.runningCalls.splice(self.runningCalls.indexOf(call), 1);
                  return result;
                })
                .then(call.resolve)
                .catch(callError => {
                  self.runningCalls.splice(self.runningCalls.indexOf(call), 1);
                  call.reject(callError);
                });
            })
              .then(result => {
                self.updateCallCount(CALL_ADDON_TO_APP, -1);
                return result;
              })
              .catch(callError => {
                self.updateCallCount(CALL_ADDON_TO_APP, -1);
                throw callError;
              });
          case 'idle':
            self.state = 'pending';
            return new Promise((resolve, reject) => {
              self.pendingCalls.push({
                resolve: resolve,
                reject: reject,
                params: [...params],
              });
              let port = browser.runtime.connectNative(self.appId);
              self.appStatus = 'checking';
              self.appPort = port;
              port.onMessage.addListener(message => {
                if (self.appStatus == 'checking') {
                  self.appStatus = 'ok';
                  self.onAppNotFoundCheck.removeAllListeners();
                }
                rpc.receive(message, self.postMessageFn, self.name);
              });
              port.onDisconnect.addListener(() => {
                flushPending(new Error('Disconnected'));
                self.cleanup();
                if (self.appStatus == 'checking' && !onNotFound) {
                  self.onAppNotFound.notify(
                    (self.appPort && self.appPort.error)
                      || browser.runtime.lastError,
                  );
                }
              });
              self.state = 'running';
              flushPending();
            })
              .then(result => {
                self.updateCallCount(CALL_ADDON_TO_APP, -1);
                return result;
              })
              .catch(callError => {
                self.updateCallCount(CALL_ADDON_TO_APP, -1);
                throw callError;
              });
          case 'pending':
            return new Promise((resolve, reject) => {
              self.pendingCalls.push({
                resolve: resolve,
                reject: reject,
                params: [...params],
              });
            })
              .then(result => {
                self.updateCallCount(CALL_ADDON_TO_APP, -1);
                return result;
              })
              .catch(callError => {
                self.updateCallCount(CALL_ADDON_TO_APP, -1);
                throw callError;
              });
        }
      }
      listen(handlers) {
        let self = this;
        let wrapped = {};
        Object.keys(handlers).forEach(method => {
          wrapped[method] = (...args) => (
            self.updateCallCount(CALL_APP_TO_ADDON, 1),
            Promise.resolve(handlers[method](...args))
              .then(
                result => (self.updateCallCount(CALL_APP_TO_ADDON, -1), result),
              )
              .catch(handlerError => {
                throw (
                  self.updateCallCount(CALL_APP_TO_ADDON, -1),
                  handlerError
                );
              })
          );
        });
        return rpc.listen(wrapped);
      }
      cleanup() {
        let self = this;
        if (self.appStatus == 'checking') {
          self.onAppNotFoundCheck.notify(
            (self.appPort && self.appPort.error) || browser.runtime.lastError,
          );
          self.onAppNotFoundCheck.removeAllListeners();
        }
        let call;
        for (; (call = self.runningCalls.shift()); ) {
          call.reject(new Error('Native port disconnected'));
        }
        self.state = 'idle';
        self.appStatus = 'unknown';
        self.appPort = null;
      }
    };
    coappModule.exports = function (...args) {
      return new CoApp(...args);
    };
  });
  var ResultNone;
  var resultSome;
  var OptionNs;
  var initOption = defineLazyModule(() => {
    ResultNone = globalThis.tsResults.None;
    resultSome = globalThis.tsResults.Some;
    OptionNs = globalThis.tsResults.Option;
  });
  var resultErr;
  var resultOk;
  var ResultNs;
  var initResult = defineLazyModule(() => {
    resultErr = globalThis.tsResults.Err;
    resultOk = globalThis.tsResults.Ok;
    ResultNs = globalThis.tsResults.Result;
  });
  var initAsyncResult = defineLazyModule(() => {});
  var initTsResults = defineLazyModule(() => {
    initAsyncResult();
    initResult();
    initOption();
  });
  var initTsResultsIndex = defineLazyModule(() => {
    'use strict';

    initTsResults();
  });
  var initIterTools = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
  });
  function mixinIteratorMethods(generatorClass) {
    Object.assign(generatorClass.prototype, {
      find: function (predicate) {
        for (let item of this) {
          if (predicate(item)) {
            return resultSome(item);
          }
        }
        return ResultNone;
      },
      count: function (predicate) {
        return this.reduce((acc, item) => (predicate(item) && acc++, acc), 0);
      },
      reduce: function (reducer, initial) {
        let acc = initial;
        for (let item of this) {
          acc = reducer(acc, item);
        }
        return acc;
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
      map: function (mapper) {
        return this.filterMap(item => resultSome(mapper(item)));
      },
      filter: function (predicate) {
        return this.filterMap(item =>
          predicate(item) ? resultSome(item) : ResultNone,
        );
      },
      enumerate: function () {
        let self = this;
        return mixinIteratorMethods(function* () {
          let index = 0;
          for (let item of self) {
            yield [index, item];
            index++;
          }
        })();
      },
      filterMap: function (mapper) {
        let self = this;
        return mixinIteratorMethods(function* () {
          for (let item of self) {
            let mapped = mapper(item);
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
    return generatorClass;
  }
  var initAsIterPolyfill = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initIterTools();
    if (!Array.prototype.as_iter) {
      Array.prototype.as_iter = function () {
        let self = this;
        return mixinIteratorMethods(function* () {
          for (let item of self) {
            yield item;
          }
        })();
      };
    }
    if (!Set.prototype.as_iter) {
      Set.prototype.as_iter = function () {
        let self = this;
        return mixinIteratorMethods(function* () {
          for (let item of self) {
            yield item;
          }
        })();
      };
    }
    if (!Map.prototype.as_iter) {
      Map.prototype.as_iter = function () {
        let self = this;
        return mixinIteratorMethods(function* () {
          for (let item of self) {
            yield item;
          }
        })();
      };
    }
  });
  function makeVideoCodec(codecName) {
    return videoCodecTable[codecName];
  }
  function makeAudioCodec(codecName) {
    return audioCodecTable[codecName];
  }
  function videoCodecByName(value) {
    if (typeof value == 'string' && value in videoCodecTable) {
      return resultSome(value);
    } else {
      return ResultNone;
    }
  }
  var neverMatchRegex;
  var videoCodecTable;
  var audioCodecTable;
  var iterVideoCodecs;
  var iterAudioCodecs;
  var initCodecs = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initAsIterPolyfill();
    initIterTools();
    neverMatchRegex = /.^/;
    videoCodecTable = {
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
    audioCodecTable = {
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
    iterVideoCodecs = mixinIteratorMethods(function* () {
      for (let key of Object.keys(videoCodecTable)) {
        yield videoCodecTable[key];
      }
    });
    iterAudioCodecs = mixinIteratorMethods(function* () {
      for (let key of Object.keys(audioCodecTable)) {
        yield audioCodecTable[key];
      }
    });
  });
  function tryContainerByName(value) {
    if (typeof value == 'string' && value in containerTable) {
      return resultSome(value);
    } else {
      return ResultNone;
    }
  }
  function containerForExtension(extension) {
    for (let container of iterContainers()) {
      let scope =
        container.supported_video_codecs.length == 0 ? 'audio_only' : 'whole';
      if (container.extension === extension) {
        return resultSome([container, scope]);
      }
      if (
        container.audio_only_extension
        && container.audio_only_extension === extension
      ) {
        return resultSome([container, 'audio_only']);
      }
      if (container.other_extensions) {
        for (let otherExt of container.other_extensions) {
          if (otherExt == extension) {
            return resultSome([container, scope]);
          }
        }
      }
    }
    return ResultNone;
  }
  function containerByName(name) {
    return containerTable[name];
  }
  var containerTable;
  var iterContainerNames;
  var iterContainers;
  var initContainers = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initAsIterPolyfill();
    initCodecs();
    initIterTools();
    containerTable = {
      Mp4: {
        name: 'Mp4',
        extension: 'mp4',
        audio_only_extension: 'mp3',
        defacto_codecs: {
          audio: ResultNone,
          video: ResultNone,
        },
        supported_video_codecs: [
          'H264',
          'H265',
          'Av1',
          'MP4V',
          'MPEG2',
          'unknown',
        ],
        supported_audio_codecs: ['Opus', 'MP3', 'FLAC', 'AAC', 'unknown'],
        mimetype: /(?:x-)?mp4/i,
      },
      Mkv: {
        name: 'Mkv',
        extension: 'mkv',
        audio_only_extension: 'mp3',
        defacto_codecs: {
          audio: ResultNone,
          video: ResultNone,
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
          audio: ResultNone,
          video: ResultNone,
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
          audio: ResultNone,
          video: ResultNone,
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
          audio: resultSome('MP3'),
          video: resultSome('H264'),
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
          audio: ResultNone,
          video: ResultNone,
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
          audio: ResultNone,
          video: ResultNone,
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
          audio: resultSome('AAC'),
          video: ResultNone,
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
          audio: resultSome('FLAC'),
          video: ResultNone,
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
          audio: resultSome('MP3'),
          video: resultSome('H264'),
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
          audio: ResultNone,
          video: ResultNone,
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
          audio: resultSome('Wav'),
          video: ResultNone,
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
          audio: ResultNone,
          video: ResultNone,
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
          audio: ResultNone,
          video: ResultNone,
        },
        supported_video_codecs: ['MPEG1', 'MPEG2'],
        supported_audio_codecs: [],
        mimetype: /(?:x-)?mov/i,
      },
    };
    iterContainerNames = mixinIteratorMethods(function* () {
      for (let key of Object.keys(containerTable)) {
        yield key;
      }
    });
    iterContainers = mixinIteratorMethods(function* () {
      for (let name of iterContainerNames()) {
        yield containerTable[name];
      }
    });
  });
  function compareAvCodecs(codecsA, codecsB) {
    let hasAudioA = !!codecsA.audio;
    let hasAudioB = !!codecsB.audio;
    let hasVideoA = !!codecsA.video;
    let hasVideoB = !!codecsB.video;
    return hasAudioA === hasAudioB && hasVideoA && hasVideoB;
  }
  function matchAudioVideo(codecs, audioFn, videoFn) {
    if (codecs.audio && codecs.video) {
      return {
        audio: audioFn(codecs.audio),
        video: videoFn(codecs.video),
      };
    }
    if (codecs.video) {
      return {
        video: videoFn(codecs.video),
        audio: !1,
      };
    }
    if (codecs.audio) {
      return {
        audio: audioFn(codecs.audio),
        video: !1,
      };
    }
    throw 'unreachable';
  }
  var initProtocolTypes = defineLazyModule(() => {
    'use strict';
  });
  function qualityLessThan(qualityA, qualityB) {
    let numA = parseInt(qualityA);
    let numB = parseInt(qualityB);
    return numA < numB;
  }
  function qualityGreaterThan(qualityA, qualityB) {
    let numA = parseInt(qualityA);
    let numB = parseInt(qualityB);
    return numA > numB;
  }
  function preferredQualityFrom(list) {
    for (let quality of iterQualityIds()) {
      if (list.includes(quality)) {
        return resultSome(quality);
      }
    }
    return ResultNone;
  }
  function qualityLabelForHeight(height) {
    let heights = iterQualityIds()
      .map(quality => parseInt(quality))
      .toArray();
    heights.sort((heightA, heightB) => heightA - heightB);
    heights.reverse();
    for (let threshold of heights) {
      if (height >= threshold) {
        return threshold.toString();
      }
    }
    return DEFAULT_QUALITY_ID;
  }
  function qualityById(value) {
    if (typeof value == 'string') {
      return iterQualityIds().find(quality => quality == value);
    }
    if (typeof value == 'number') {
      let str = value.toString();
      return qualityById(str);
    }
    return ResultNone;
  }
  var DEFAULT_QUALITY_ID;
  var qualityTable;
  var iterQualityIds;
  var iterQualities;
  var initQualities = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initAsIterPolyfill();
    initIterTools();
    DEFAULT_QUALITY_ID = '240';
    qualityTable = {
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
    iterQualityIds = mixinIteratorMethods(function* () {
      for (let key of Object.keys(qualityTable)) {
        yield key;
      }
    });
    iterQualities = mixinIteratorMethods(function* () {
      for (let key of iterQualityIds()) {
        yield qualityTable[key];
      }
    });
  });
  function unknownVideoTrack() {
    return {
      codec: makeVideoCodec('unknown'),
      fps: ResultNone,
      dimensions: ResultNone,
      quality: ResultNone,
      bitrate: ResultNone,
    };
  }
  function unknownAudioTrack() {
    return {
      codec: makeAudioCodec('unknown'),
      bitrate: ResultNone,
    };
  }
  function compareFormats(formatA, formatB, config) {
    if (formatA.protocol === 'hls' && formatB.protocol != 'hls') {
      return -1;
    }
    if (
      (formatB.protocol === 'hls' && formatA.protocol != 'hls')
      || (formatA.protocol === 'non-adaptative'
        && formatB.protocol != 'non-adaptative')
    ) {
      return 1;
    }
    if (
      formatB.protocol === 'non-adaptative'
      && formatA.protocol != 'non-adaptative'
    ) {
      return -1;
    }
    if (formatA.container.name != formatB.container.name) {
      if (formatA.container.name == config.container) {
        return -1;
      }
      if (formatB.container.name == config.container) {
        return 1;
      }
      let ignoredA = config.ignored_containers.includes(formatA.container.name);
      let ignoredB = config.ignored_containers.includes(formatB.container.name);
      if (!ignoredA && ignoredB) {
        return -1;
      }
      if (ignoredA && !ignoredB) {
        return 1;
      }
    }
    if (!compareAvCodecs(formatA.av, formatB.av)) {
      if (formatA.av.audio && formatA.av.video) {
        return -1;
      }
      if (formatB.av.audio && formatB.av.video) {
        return 1;
      }
      if (formatA.av.video) {
        return -1;
      }
      if (formatB.av.video) {
        return 1;
      }
    }
    if (formatA.duration && formatB.duration) {
      if (formatA.duration > formatB.duration) {
        return -1;
      }
      if (formatB.duration > formatA.duration) {
        return 1;
      }
    }
    if (formatA.av.video && formatB.av.video) {
      let videoA = formatA.av.video;
      let videoB = formatB.av.video;
      if (videoA.codec.name != videoB.codec.name) {
        if (videoA.codec.name == config.video_codec) {
          return -1;
        }
        if (videoB.codec.name == config.video_codec) {
          return 1;
        }
        let ignoredCodecA = config.ignored_video_codecs.includes(
          videoA.codec.name,
        );
        let ignoredCodecB = config.ignored_video_codecs.includes(
          videoB.codec.name,
        );
        if (!ignoredCodecA && ignoredCodecB) {
          return -1;
        }
        if (ignoredCodecA && !ignoredCodecB) {
          return 1;
        }
      }
      if (videoA.quality.isSome()) {
        if (videoB.quality.isNone()) {
          return -1;
        }
        let qualityA = videoA.quality.unwrap();
        let qualityB = videoB.quality.unwrap();
        if (qualityA != qualityB) {
          if (qualityA == config.prefered_video_quality) {
            return -1;
          }
          if (qualityB == config.prefered_video_quality) {
            return 1;
          }
          let isOutOfRange = quality =>
            qualityGreaterThan(quality, config.best_video_quality)
            || qualityLessThan(quality, config.lowest_video_quality);
          let outA = isOutOfRange(qualityA);
          let outB = isOutOfRange(qualityB);
          if (!outA && outB) {
            return -1;
          }
          if (outA && !outB) {
            return 1;
          }
          if (qualityGreaterThan(qualityA, qualityB)) {
            return -1;
          }
          if (qualityGreaterThan(qualityB, qualityA)) {
            return 1;
          }
        }
      }
      if (videoA.dimensions.isSome()) {
        if (videoB.dimensions.isNone()) {
          return -1;
        }
        let dimsA = videoA.dimensions.unwrap();
        let dimsB = videoB.dimensions.unwrap();
        if (dimsA.height > dimsB.height) {
          return -1;
        }
        if (dimsB.height > dimsA.height) {
          return 1;
        }
      }
      if (videoA.bitrate.isSome()) {
        if (videoB.bitrate.isNone()) {
          return -1;
        }
        let bitrateA = videoA.bitrate.unwrap();
        let bitrateB = videoB.bitrate.unwrap();
        if (bitrateA > bitrateB) {
          return -1;
        }
        if (bitrateB > bitrateA) {
          return 1;
        }
      }
      if (videoA.fps.isSome()) {
        if (videoB.fps.isNone()) {
          return -1;
        }
        let fpsA = videoA.fps.unwrap();
        let fpsB = videoB.fps.unwrap();
        if (fpsA != fpsB) {
          if (
            (fpsA == 60 && config.prefer_60fps)
            || (fpsB == 60 && config.prefer_60fps)
            || fpsA > fpsB
          ) {
            return -1;
          }
          if (fpsB > fpsA) {
            return 1;
          }
        }
      }
    }
    return 0;
  }
  function mergeCoreMedia(source, override) {
    let merged = {
      ...override,
    };
    if (merged.duration === 'unknown') {
      merged.duration = source.duration;
    }
    if (!merged.av.audio) {
      merged.av.audio = source.av.audio;
    }
    if (!merged.av.video) {
      merged.av.video = source.av.video;
    }
    if (source.av.audio && merged.av.audio) {
      if (merged.av.audio.codec.name == 'unknown') {
        merged.av.audio.codec = source.av.audio.codec;
      }
      if (merged.av.audio.bitrate.isNone()) {
        merged.av.audio.bitrate = source.av.audio.bitrate;
      }
    }
    if (source.av.video && merged.av.video) {
      if (merged.av.video.codec.name == 'unknown') {
        merged.av.video.codec = source.av.video.codec;
      }
      if (merged.av.video.quality.isNone()) {
        merged.av.video.quality = source.av.video.quality;
      }
      if (merged.av.video.dimensions.isNone()) {
        merged.av.video.dimensions = source.av.video.dimensions;
      }
      if (merged.av.video.fps.isNone()) {
        merged.av.video.fps = source.av.video.fps;
      }
      if (merged.av.video.bitrate.isNone()) {
        merged.av.video.bitrate = source.av.video.bitrate;
      }
    }
    return merged;
  }
  var initMediaCommon = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initContainers();
    initCodecs();
    initProtocolTypes();
    initQualities();
    initIterTools();
  });
  var hitSerializeKeys;
  var hitCoreKeys;
  var hitGroupKeys;
  var hitUrlKeys;
  var initHitSerializerTables = defineLazyModule(() => {
    'use strict';

    hitSerializeKeys = Object.keys({
      // TODO(thumbnails): Static review of changes after 01f84f4 found no edits in the
      // active `content2/panel.js` renderer, but this legacy serialized-hit whitelist still
      // exposes only `thumbnail` / `thumbnailUrl`. The background hit model also uses
      // `thumbnailUrl2` as the resolved fallback, and newer downloadable UIs consume
      // `thumbnail_url`, so any legacy screen driven by `getSerializedHits()` can silently
      // lose thumbnails because this serializer drops the populated fallback field.
      id: 1,
      actions: 1,
      status: 1,
      raw_bitrate: 1,
      operation: 1,
      description: 1,
      opStartDate: 1,
      descrPrefix: 1,
      title: 1,
      topUrl: 1,
      thumbnail: 1,
      thumbnailUrl: 1,
      size: 1,
      duration: 1,
      quality: 1,
      bitrate: 1,
      length: 1,
      mediaDomain: 1,
      type: 1,
      extension: 1,
      originalExt: 1,
    });
    hitCoreKeys = Object.keys({
      id: 1,
      type: 1,
      originalExt: 1,
      running: 1,
      localFilePath: 1,
      localDirectory: 1,
      extension: 1,
      extensions: 1,
      baseJs: 1,
      chunked: 1,
      proxy: 1,
      isPrivate: 1,
      possibleContentRedirect: 1,
      urls: 1,
      masterManifest: 1,
      audioMediaManifest: 1,
      videoMediaManifest: 1,
      headers: 1,
      title: 1,
      referrer: 1,
      convert: 1,
      baseUrl: 1,
      mpd_url: 1,
      mpd_video_id: 1,
      mpd_audio_id: 1,
      gallery_urls: 1,
      bulk_ids: 1,
      bulk: 1,
      tabId: 1,
    });
    hitGroupKeys = Object.keys({
      group: 1,
    });
    hitUrlKeys = [
      'url',
      'videoUrl',
      'audioUrl',
      'topUrl',
      'pageUrl',
      'mediaManifest',
      'mediaDomain',
    ];
  });
  function filterHitsForDisplay(hits, domains, minLength) {
    return new Map(
      [...hits.entries()]
        .filter(
          ([, hit]) =>
            !domains.some(domain =>
              hitUrlKeys.some(field => {
                if (field in hit) {
                  let value = hit[field];
                  if (typeof value == 'string') {
                    try {
                      let hostParts = new URL(value).hostname
                        .split('.')
                        .reverse();
                      for (
                        let partIdx = 0;
                        partIdx < hostParts.length;
                        partIdx++
                      ) {
                        if (hostParts[partIdx] != domain[partIdx]) {
                          return !1;
                        }
                      }
                      return !0;
                    } catch {}
                  }
                }
                return !1;
              }),
            ),
        )
        .filter(([, hit]) =>
          hit.status == 'running'
            ? !0
            : !(typeof hit.length == 'number' && hit.length < minLength),
        ),
    );
  }
  function groupHitsForDisplay(hits, config) {
    let groups = new Map();
    for (let hit of hits.values()) {
      let groupKey = hit.group ?? hit.id;
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey).push(hit);
    }
    let groupList = [...groups.values()];
    for (let group of groupList) {
      group.sort((hitA, hitB) =>
        !hitA.core_media || !hitB.core_media
          ? (console.warn('No core_media for hit'), 0)
          : compareFormats(hitA.core_media, hitB.core_media, config),
      );
    }
    groupList.sort((groupA, groupB) => {
      let builderA = groupA[0]?.core_media?.builder;
      let builderB = groupB[0]?.core_media?.builder;
      if (builderA === builderB) {
        return 0;
      } else {
        if (builderA === 'HTTPMedia') {
          return 1;
        } else {
          if (builderB === 'HTTPMedia') {
            return -1;
          } else {
            if (builderA === 'RawHls') {
              return 1;
            } else {
              if (builderB === 'RawHls' || builderA === 'Hls') {
                return -1;
              } else {
                if (builderB === 'Hls') {
                  return 1;
                } else {
                  if (builderA === 'MPD') {
                    return -1;
                  } else {
                    if (builderB === 'MPD') {
                      return 1;
                    } else {
                      return 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    let isLowQuality = group => {
      let isActive = group[0]?.status == 'active';
      let isAdaptive =
        group[0]?.core_media?.builder === 'Hls'
        || group[0]?.core_media?.builder === 'JsonMPD'
        || group[0]?.core_media?.builder === 'MPD';
      return isActive && isAdaptive;
    };
    let allActive = group => group.every(hit => hit.status == 'active');
    if (config.ignore_low_quality_hits && groupList.some(isLowQuality)) {
      groupList = groupList.filter(group => {
        let all = allActive(group);
        let low = isLowQuality(group);
        return !(all && !low);
      });
    }
    return groupList.map(group =>
      group
        .map(hit => {
          let serialized = {};
          for (let field of hitSerializeKeys) {
            serialized[field] = hit[field];
          }
          for (let field of hitCoreKeys) {
            serialized[field] = hit[field];
          }
          for (let field of hitGroupKeys) {
            serialized[field] = hit[field];
          }
          return serialized;
        })
        .slice(0, config.max_variants),
    );
  }
  var initHitSerializer = defineLazyModule(() => {
    'use strict';

    initMediaCommon();
    initHitSerializerTables();
  });
  var isStringProp;
  var isNumberProp;
  var initObjGuards = defineLazyModule(() => {
    'use strict';

    isStringProp = (obj, key) => typeof obj[key] == 'string';
    isNumberProp = (obj, key) => typeof obj[key] == 'number';
  });
  function serializeHitValue(value) {
    try {
      if (isStringProp(value, '__serializer_tag')) {
        if (value.__serializer_tag === 'primitive') {
          return resultOk(value.__serializer_value);
        }
        if (value.__serializer_tag === 'regex') {
          let regex = new RegExp(value.__serializer_value);
          return resultOk(regex);
        } else if (value.__serializer_tag === 'array') {
          let items = [];
          for (let element of value.__serializer_value) {
            let decoded = serializeHitValue(element);
            if (decoded.isErr()) {
              return decoded;
            }
            items.push(decoded.unwrap());
          }
          return resultOk(items);
        } else if (value.__serializer_tag === 'map') {
          let entries = [];
          for (let element of value.__serializer_value) {
            let decoded = serializeHitValue(element);
            if (decoded.isErr()) {
              return decoded;
            }
            entries.push(decoded.unwrap());
          }
          return resultOk(new Map(entries));
        } else if (value.__serializer_tag === 'set') {
          let items = [];
          for (let element of value.__serializer_value) {
            let decoded = serializeHitValue(element);
            if (decoded.isErr()) {
              return decoded;
            }
            items.push(decoded.unwrap());
          }
          return resultOk(new Set(items));
        } else if (value.__serializer_tag === 'result_ok') {
          let inner = value.__serializer_value;
          let decoded = serializeHitValue(inner);
          if (decoded.isErr()) {
            return decoded;
          } else {
            return resultOk(resultOk(decoded.unwrap()));
          }
        } else if (value.__serializer_tag === 'result_err') {
          let inner = value.__serializer_value;
          let decoded = serializeHitValue(inner);
          if (decoded.isErr()) {
            return decoded;
          } else {
            return resultOk(resultErr(decoded.unwrap()));
          }
        } else if (value.__serializer_tag === 'option_some') {
          let inner = value.__serializer_value;
          let decoded = serializeHitValue(inner);
          if (decoded.isErr()) {
            return decoded;
          } else {
            return resultOk(resultSome(decoded.unwrap()));
          }
        } else if (value.__serializer_tag === 'option_none') {
          return resultOk(ResultNone);
        }
      }
      let type = typeof value;
      if (
        type === 'string'
        || type === 'number'
        || type === 'boolean'
        || type === 'undefined'
        || Array.isArray(value)
        || value == null
      ) {
        return resultErr('This object was not serialized with Serialize');
      }
      let result = {};
      for (let key of Object.keys(value)) {
        if (typeof key == 'string') {
          let decoded = serializeHitValue(value[key]);
          if (decoded.isErr()) {
            return decoded;
          }
          result[key] = decoded.unwrap();
        }
      }
      return resultOk(result);
    } catch {
      return resultErr('Failed to inspect object. Not JSON?');
    }
  }
  function serializePrimitiveValue(value) {
    let type = typeof value;
    if (
      type === 'string'
      || type === 'number'
      || type === 'boolean'
      || type === 'undefined'
      || value == null
    ) {
      return resultOk({
        __serializer_tag: 'primitive',
        __serializer_value: value,
      });
    }
    if (value instanceof RegExp) {
      return resultOk({
        __serializer_tag: 'regex',
        __serializer_value: value.source,
      });
    }
    if (Array.isArray(value)) {
      let encoded = value.map(item => serializePrimitiveValue(item));
      let firstErr = encoded.as_iter().find(res => res.isErr());
      if (firstErr.isSome()) {
        return firstErr.unwrap();
      }
      let values = encoded
        .as_iter()
        .map(res => res.unwrap())
        .toArray();
      return resultOk({
        __serializer_tag: 'array',
        __serializer_value: values,
      });
    } else if (value instanceof Map) {
      let encoded = [...value.entries()].map(item =>
        serializePrimitiveValue(item),
      );
      let firstErr = encoded.as_iter().find(res => res.isErr());
      if (firstErr.isSome()) {
        return firstErr.unwrap();
      }
      let values = encoded
        .as_iter()
        .map(res => res.unwrap())
        .toArray();
      return resultOk({
        __serializer_tag: 'map',
        __serializer_value: values,
      });
    } else if (value instanceof Set) {
      let encoded = [...value.values()].map(item =>
        serializePrimitiveValue(item),
      );
      let firstErr = encoded.as_iter().find(res => res.isErr());
      if (firstErr.isSome()) {
        return firstErr.unwrap();
      }
      let values = encoded
        .as_iter()
        .map(res => res.unwrap())
        .toArray();
      return resultOk({
        __serializer_tag: 'set',
        __serializer_value: values,
      });
    } else if (ResultNs.isResult(value)) {
      if (value.isOk()) {
        let inner = value.unwrap();
        let encoded = serializePrimitiveValue(inner);
        if (encoded.isErr()) {
          return encoded;
        } else {
          return resultOk({
            __serializer_tag: 'result_ok',
            __serializer_value: encoded.unwrap(),
          });
        }
      } else {
        let inner = value.unwrapErr();
        let encoded = serializePrimitiveValue(inner);
        if (encoded.isErr()) {
          return encoded;
        } else {
          return resultOk({
            __serializer_tag: 'result_err',
            __serializer_value: encoded.unwrap(),
          });
        }
      }
    } else if (OptionNs.isOption(value)) {
      if (value.isSome()) {
        let inner = value.unwrap();
        let encoded = serializePrimitiveValue(inner);
        if (encoded.isErr()) {
          return encoded;
        } else {
          return resultOk({
            __serializer_tag: 'option_some',
            __serializer_value: encoded.unwrap(),
          });
        }
      } else {
        return resultOk({
          __serializer_tag: 'option_none',
        });
      }
    } else if (type === 'object') {
      let result = {};
      let obj = value;
      for (let key of Object.keys(value)) {
        let val = obj[key];
        let encoded = serializePrimitiveValue(val);
        if (encoded.isErr()) {
          continue;
        }
        let unwrapped = encoded.unwrap();
        result[key] = unwrapped;
      }
      return resultOk(result);
    } else {
      return resultErr('Unsupported value');
    }
  }
  function typeTagOf(value) {
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
      return value.map(typeTagOf);
    }
    if (value instanceof Map) {
      return [...value.values()].map(typeTagOf);
    }
    if (value instanceof Set) {
      return [...value.values()].map(typeTagOf);
    }
    if (ResultNs.isResult(value)) {
      if (value.isOk()) {
        return typeTagOf(value.unwrap());
      } else {
        return typeTagOf(value.unwrapErr());
      }
    }
    if (OptionNs.isOption(value)) {
      if (value.isSome()) {
        return typeTagOf(value.unwrap());
      } else {
        return 'None';
      }
    }
    if (typeof value == 'object') {
      let result = {};
      let obj = value;
      for (let key of Object.keys(value)) {
        let val = obj[key];
        result[key] = typeTagOf(val);
      }
      return result;
    } else {
      return '???';
    }
  }
  var initMediaUserPrefsDefaults = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initObjGuards();
    initIterTools();
  });
  function defaultMediaUserPrefs() {
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
  function serializeSettingValue(value) {
    return serializePrimitiveValue(value).unwrap();
  }
  function deserializeSettingValue(serialized) {
    let parsed = serializeHitValue(serialized).unwrapOr({});
    let defaults = defaultMediaUserPrefs();
    let container = tryContainerByName(parsed.container).unwrapOr(
      defaults.container,
    );
    let videoCodec = videoCodecByName(parsed.video_codec).unwrapOr(
      defaults.video_codec,
    );
    let bestQuality = qualityById(parsed.best_video_quality).unwrapOr(
      defaults.best_video_quality,
    );
    let lowestQuality = qualityById(parsed.lowest_video_quality).unwrapOr(
      defaults.lowest_video_quality,
    );
    let preferredQuality;
    if ('prefered_video_quality' in parsed) {
      let parsedQuality = qualityById(parsed.prefered_video_quality);
      if (parsedQuality.isSome()) {
        preferredQuality = parsedQuality.unwrap();
      }
    }
    let maxVariants = defaults.max_variants;
    if (typeof parsed.max_variants == 'number') {
      let value = parsed.max_variants;
      if (Number.isInteger(value) && value <= 11 && value > 0) {
        maxVariants = value;
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
      for (let name of parsed.ignored_containers) {
        let matchedContainer = tryContainerByName(name);
        if (matchedContainer.isSome()) {
          ignoredContainers.push(matchedContainer.unwrap());
        }
      }
    }
    let ignoredCodecs = [];
    if (Array.isArray(parsed.ignored_video_codecs)) {
      for (let name of parsed.ignored_video_codecs) {
        let matchedCodec = videoCodecByName(name);
        if (matchedCodec.isSome()) {
          ignoredCodecs.push(matchedCodec.unwrap());
        }
      }
    }
    let config = {
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
      config.prefered_video_quality = preferredQuality;
    }
    return config;
  }
  var initMediaUserPrefsStore = defineLazyModule(() => {
    'use strict';

    initMediaUserPrefsDefaults();
    initContainers();
    initCodecs();
    initQualities();
    initIterTools();
  });
  var defaultViewOptions;
  var initPanelDefaults = defineLazyModule(() => {
    'use strict';

    defaultViewOptions = {
      all_tabs: !1,
      low_quality: !1,
      sort_by_status: !0,
      sort_reverse: !1,
      show_button_clean: !0,
      show_button_clean_all: !1,
      show_button_convert_local: !1,
      hide_downloaded: !1,
    };
  });
  function defaultNamingConfig() {
    return {
      template: '%title',
      max_length: 64,
    };
  }
  async function selectVariantByRule(info, rule) {
    let firstVariant = info.variants.values().next().value;
    let title = info.page_title;
    let hostname = new URL(info.page_url).hostname;
    let domain = hostname.replace(/\.com$|\.net$|\.org$/, '');
    let filename =
      new URL(firstVariant.manifest_url).pathname.split('/').pop() || 'none';
    let selectorText = '';
    if (
      (title.length < 4
        ? (title = domain)
        : title.length < 8 && (title += '-' + domain),
      filename.includes('.'))
    ) {
      let parts = filename.split('.');
      parts.pop();
      filename = parts.join('.');
    }
    if (!rule) {
      let rules = await getSetting(settingSmartnaming);
      rule = rules.get(hostname) || rules.get('*');
      if (!rule) {
        console.error("Missing '*' rule");
        rule = defaultNamingConfig();
      }
    }
    try {
      if (rule.selector && info.tab_id != 'none') {
        let target = {
          tabId: info.tab_id,
        };
        selectorText = (
          await storagePolyfill.default.scripting.executeScript({
            target: target,
            world: storagePolyfill.default.scripting.ExecutionWorld.MAIN,
            args: [rule.selector],
            func: sel => document.querySelector(sel)?.textContent,
          })
        )[0]?.result;
      }
    } catch {}
    let result = rule.template
      .replaceAll('%title', title)
      .replaceAll('%hostname', domain)
      .replaceAll('%pathname', filename)
      .replaceAll('%selector', selectorText);
    if (result.length < 3) {
      result = domain;
    }
    return result
      .trim()
      .normalize('NFD')
      .replace(/\./gu, ' ')
      .replace(/[^\p{L}\p{N}\-\s]/gu, '')
      .replace(/-+/gu, '-')
      .replace(/\s+/gu, ' ')
      .substring(0, rule.max_length);
  }
  var storagePolyfill;
  var initSettingsBrowser = defineLazyModule(() => {
    'use strict';

    storagePolyfill = toEsm(requirePolyfill(), 1);
    initSettings();
  });
  function looseEquals(valueA, valueB) {
    if (valueA == null || valueB === null || valueB === void 0) {
      return valueA === valueB;
    }
    if (valueA.constructor !== valueB.constructor) {
      return !1;
    }
    if (valueA instanceof Function || valueA instanceof RegExp) {
      return valueA === valueB;
    }
    if (valueA === valueB || valueA.valueOf() === valueB.valueOf()) {
      return !0;
    }
    if (
      (Array.isArray(valueA) && valueA.length !== valueB.length)
      || valueA instanceof Date
      || !(valueA instanceof Object)
      || !(valueB instanceof Object)
    ) {
      return !1;
    }
    let keysA = Object.keys(valueA);
    let sameKeys = Object.keys(valueB).every(key => keysA.indexOf(key) !== -1);
    let sameValues = keysA.every(key => looseEquals(valueA[key], valueB[key]));
    return sameKeys && sameValues;
  }
  var initSettingsHooks = defineLazyModule(() => {
    'use strict';
  });
  async function setSetting(setting, value) {
    let stored = value;
    if (setting.hooks) {
      stored = setting.hooks.setter(value);
    }
    await settingsStorage.storage[setting.where].set({
      [setting.name]: stored,
    });
  }
  async function getSetting(setting) {
    let stored = await settingsStorage.storage[setting.where].get(setting.name);
    if (setting.name in stored) {
      let value = stored[setting.name];
      if (setting.hooks) {
        return setting.hooks.getter(value, setting);
      } else {
        return value;
      }
    }
    return setting.default();
  }
  function onSettingChangedDebounced(setting, callback) {
    onSettingChanged(setting, change => {
      if (setting.delayed_on_change) {
        console.warn('on_changed triggered too often');
      } else {
        setting.delayed_on_change = setTimeout(async () => {
          delete setting.delayed_on_change;
          let value = await getSetting(setting);
          callback(value);
        }, 400);
      }
    });
  }
  function onSettingChanged(setting, callback) {
    settingsStorage.storage[setting.where].onChanged.addListener(changes => {
      let change = changes[setting.name];
      if (change) {
        if (looseEquals(change.oldValue, change.newValue)) {
          return;
        }
        if (typeof change.newValue > 'u') {
          callback(setting.default());
        } else {
          if (setting.hooks) {
            callback(setting.hooks.getter(change.newValue, setting));
          } else {
            callback(change.newValue);
          }
        }
      }
    });
  }
  async function firstRunInit() {
    if (!(await getSetting(settingHasMigratedFromV8))) {
      await setSetting(settingHasMigratedFromV8, !0);
      let prefs = await settingsStorage.storage.local.get('weh-prefs');
      if ('weh-prefs' in prefs) {
        let wehPrefs = prefs['weh-prefs'];
        if (
          ('default-action-0' in wehPrefs
            && wehPrefs['default-action-0'] == 'copyurl'
            && (await setSetting(settingDefaultAction, 'copy')),
          'lastDownloadDirectory' in wehPrefs)
        ) {
          let dir = wehPrefs.lastDownloadDirectory;
          await setSetting(settingDownloadDirectory, dir);
        }
      }
    }
  }
  var settingsStorage;
  var settingHasMigratedFromV8;
  var settingHttpMediaDownloadStrategy;
  var settingDebuggerEnabled;
  var settingDebuggerLogs;
  var settingUseSidebar;
  var settingLastAdvancedDownload;
  var settingDownloadDirectory;
  var settingConcurrentDownloadsMax;
  var settingShowThumbnailInNotification;
  var settingShowSuccessNotification;
  var settingShowSuccessNotificationForIncognito;
  var settingViewOptions;
  var settingShowContextMenu;
  var settingForgetMediaOnTabClose;
  var settingDefaultAction;
  var settingYtWarning;
  var settingUseLegacyUi;
  var settingNeverShowNoIncognitoMsgAgain;
  var settingAutoHideDownloadedMessageShown;
  var settingValidLicenseMessageShown;
  var settingSuccessfulDl;
  var settingNeverShowSuccessfulDlMessage;
  var settingRecordDownloadHistory;
  var settingHistoryLimitInDays;
  var settingSessionViewOptions;
  var settingLicense;
  var settingBlacklist;
  var settingLastDownloadDirectory;
  var settingMediaUserPref;
  var settingDownloadHistory;
  var settingSmartnaming;
  var settingServiceDatabase;
  var initSettings = defineLazyModule(() => {
    'use strict';

    settingsStorage = toEsm(requirePolyfill(), 1);
    initMediaUserPrefsStore();
    initMediaUserPrefsDefaults();
    initPanelDefaults();
    initSettingsBrowser();
    initSettingsHooks();
    initTsResultsIndex();
    settingHasMigratedFromV8 = {
      name: 'has_migrated_from_v8',
      default: () => !1,
      where: 'local',
    };
    settingHttpMediaDownloadStrategy = {
      name: 'http_media_download_strategy',
      default: () => 'coapp',
      where: 'local',
    };
    settingDebuggerEnabled = {
      name: 'debugger_enabled',
      default: () => !1,
      where: 'local',
    };
    settingDebuggerLogs = {
      name: 'debugger_logs',
      default: () => [],
      where: 'session',
    };
    settingUseSidebar = {
      name: 'use_sidebar',
      default: () => !1,
      where: 'local',
    };
    settingLastAdvancedDownload = {
      name: 'last_advanced_download',
      default: () => 0,
      where: 'local',
    };
    settingDownloadDirectory = {
      name: 'download_directory',
      default: () => 'dwhelper',
      where: 'local',
    };
    settingConcurrentDownloadsMax = {
      name: 'concurrent_downloads_max',
      default: () => 6,
      where: 'local',
    };
    settingShowThumbnailInNotification = {
      name: 'show_thumbnail_in_notification',
      default: () => !0,
      where: 'local',
    };
    settingShowSuccessNotification = {
      name: 'show_success_notification',
      default: () => !0,
      where: 'local',
    };
    settingShowSuccessNotificationForIncognito = {
      name: 'show_success_notification_for_icognito',
      default: () => !1,
      where: 'local',
    };
    settingViewOptions = {
      name: 'view_options',
      default: () => structuredClone(defaultViewOptions),
      where: 'local',
    };
    settingShowContextMenu = {
      name: 'show_context_menu',
      default: () => !0,
      where: 'local',
    };
    settingForgetMediaOnTabClose = {
      name: 'forget_media_on_tab_close',
      default: () => !0,
      where: 'local',
    };
    settingDefaultAction = {
      name: 'default_action',
      default: () => 'download',
      where: 'local',
    };
    settingYtWarning = {
      name: 'yt_warning',
      default: () => !0,
      where: 'local',
    };
    settingUseLegacyUi = {
      name: 'use_legacy_ui',
      default: () => !0,
      where: 'local',
    };
    settingNeverShowNoIncognitoMsgAgain = {
      name: 'never_show_no_incognito_msg_again',
      default: () => !1,
      where: 'local',
    };
    settingAutoHideDownloadedMessageShown = {
      name: 'auto_hide_downloaded_message_has_been_displayed',
      default: () => !0,
      where: 'local',
    };
    settingValidLicenseMessageShown = {
      name: 'valid_license_message_has_been_displayed',
      default: () => !1,
      where: 'local',
    };
    settingSuccessfulDl = {
      name: 'successfull_dl',
      default: () => 0,
      where: 'local',
    };
    settingNeverShowSuccessfulDlMessage = {
      name: 'never_show_successfull_dl_message',
      default: () => !1,
      where: 'local',
    };
    settingRecordDownloadHistory = {
      name: 'record_download_history',
      default: () => !1,
      where: 'local',
    };
    settingHistoryLimitInDays = {
      name: 'history_limit_in_days',
      default: () => 30,
      where: 'local',
    };
    settingSessionViewOptions = {
      name: 'view_options',
      default: () => ({}),
      where: 'session',
    };
    settingLicense = {
      name: 'license',
      default: () => '',
      where: 'local',
      hooks: {
        setter: () => {
          throw 'License handled by V8 but setter called';
        },
        getter: value => value,
      },
    };
    settingBlacklist = {
      name: 'blacklist',
      default: () => [],
      where: 'local',
      hooks: {
        setter: value => value.filter(item => item.length > 0),
        getter: value => value,
      },
    };
    settingLastDownloadDirectory = {
      name: 'last_download_directory',
      default: () => ResultNone,
      where: 'local',
      hooks: {
        setter: value => serializePrimitiveValue(value).unwrap(),
        getter: (value, setting) =>
          serializeHitValue(value).unwrapOr(setting.default()),
      },
    };
    settingMediaUserPref = {
      name: 'media_user_pref',
      where: 'local',
      default: () => defaultMediaUserPrefs(),
      hooks: {
        setter: value => serializeSettingValue(value),
        getter: value => deserializeSettingValue(value),
      },
    };
    settingDownloadHistory = {
      name: 'download_history',
      where: 'local',
      default: () => new Map(),
      hooks: {
        setter: value => serializePrimitiveValue(value).unwrap(),
        getter: (value, setting) =>
          serializeHitValue(value).unwrapOr(setting.default()),
      },
    };
    settingSmartnaming = {
      name: 'smartnaming',
      where: 'local',
      default: () => new Map([['*', defaultNamingConfig()]]),
      hooks: {
        setter: value => serializePrimitiveValue(value).unwrap(),
        getter: (value, setting) =>
          serializeHitValue(value).unwrapOr(setting.default()),
      },
    };
    settingServiceDatabase = {
      name: 'database',
      where: 'session',
      default: () => ({
        yt_bulk: ResultNone,
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
        setter: value => serializePrimitiveValue(value).unwrap(),
        getter: (value, setting) =>
          serializeHitValue(value).unwrapOr(setting.default()),
      },
    };
  });
  var requireFreeGlobal = defineCommonjsModule(
    (freeGlobalExports, freeGlobalModule) => {
      var freeGlobal =
        typeof global == 'object'
        && global
        && global.Object === Object
        && global;
      freeGlobalModule.exports = freeGlobal;
    },
  );
  var requireRoot = defineCommonjsModule((rootExports, rootModule) => {
    var freeGlobal = requireFreeGlobal();
    var freeSelf =
      typeof self == 'object' && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function('return this')();
    rootModule.exports = root;
  });
  var requireSymbolRef = defineCommonjsModule((symbolExports, symbolModule) => {
    var root = requireRoot();
    var rootSymbol = root.Symbol;
    symbolModule.exports = rootSymbol;
  });
  var requireGetRawTag = defineCommonjsModule(
    (getRawTagExports, getRawTagModule) => {
      var symbolRef = requireSymbolRef();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = symbolRef ? symbolRef.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag);
        var tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = !0;
        } catch {}
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      getRawTagModule.exports = getRawTag;
    },
  );
  var requireObjectToString = defineCommonjsModule(
    (objectToStringExports, objectToStringModule) => {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      objectToStringModule.exports = objectToString;
    },
  );
  var requireBaseGetTag = defineCommonjsModule(
    (baseGetTagExports, baseGetTagModule) => {
      var symbolRef = requireSymbolRef();
      var getRawTag = requireGetRawTag();
      var objectToString = requireObjectToString();
      var nullTag = '[object Null]';
      var undefinedTag = '[object Undefined]';
      var symToStringTag = symbolRef ? symbolRef.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          if (value === void 0) {
            return undefinedTag;
          } else {
            return nullTag;
          }
        } else {
          if (symToStringTag && symToStringTag in Object(value)) {
            return getRawTag(value);
          } else {
            return objectToString(value);
          }
        }
      }
      baseGetTagModule.exports = baseGetTag;
    },
  );
  var requireOverArg = defineCommonjsModule((overArgExports, overArgModule) => {
    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    overArgModule.exports = overArg;
  });
  var requireGetPrototype = defineCommonjsModule(
    (getPrototypeExports, getPrototypeModule) => {
      var overArg = requireOverArg();
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      getPrototypeModule.exports = getPrototype;
    },
  );
  var requireIsObjectLike = defineCommonjsModule(
    (isObjectLikeExports, isObjectLikeModule) => {
      function isObjectLike(value) {
        return value != null && typeof value == 'object';
      }
      isObjectLikeModule.exports = isObjectLike;
    },
  );
  var requireIsPlainObject = defineCommonjsModule(
    (isPlainObjectExports, isPlainObjectModule) => {
      var baseGetTag = requireBaseGetTag();
      var getPrototype = requireGetPrototype();
      var isObjectLike = requireIsObjectLike();
      var objectTag = '[object Object]';
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectCtorString = funcToString.call(Object);
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return !1;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return !0;
        }
        var Ctor =
          hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return (
          typeof Ctor == 'function'
          && Ctor instanceof Ctor
          && funcToString.call(Ctor) == objectCtorString
        );
      }
      isPlainObjectModule.exports = isPlainObject;
    },
  );
  var requireObservablePonyfill = defineCommonjsModule(observableExports => {
    'use strict';

    Object.defineProperty(observableExports, '__esModule', {
      value: !0,
    });
    observableExports.default = symbolObservablePonyfill;
    function symbolObservablePonyfill(root) {
      var result;
      var SymbolCtor = root.Symbol;
      if (typeof SymbolCtor == 'function') {
        if (SymbolCtor.observable) {
          result = SymbolCtor.observable;
        } else {
          result = SymbolCtor('observable');
          SymbolCtor.observable = result;
        }
      } else {
        result = '@@observable';
      }
      return result;
    }
  });
  var requireSymbolObservable = defineCommonjsModule(
    (observableDefaultExports, observableDefaultModule) => {
      'use strict';

      Object.defineProperty(observableDefaultExports, '__esModule', {
        value: !0,
      });
      var ponyfillModule = requireObservablePonyfill();
      var ponyfill = interopRequireDefault(ponyfillModule);
      function interopRequireDefault(mod) {
        if (mod && mod.__esModule) {
          return mod;
        } else {
          return {
            default: mod,
          };
        }
      }
      var root;
      if (typeof self < 'u') {
        root = self;
      } else {
        if (typeof window < 'u') {
          root = window;
        } else {
          if (typeof global < 'u') {
            root = global;
          } else {
            if (typeof observableDefaultModule < 'u') {
              root = observableDefaultModule;
            } else {
              root = Function('return this')();
            }
          }
        }
      }
      var result = (0, ponyfill.default)(root);
      observableDefaultExports.default = result;
    },
  );
  var requireCreateStore = defineCommonjsModule(reduxExports => {
    'use strict';

    reduxExports.__esModule = !0;
    reduxExports.ActionTypes = void 0;
    reduxExports.default = createStore;
    var isPlainObjectModule = requireIsPlainObject();
    var isPlainObject = interopRequireDefault(isPlainObjectModule);
    var symbolObservableModule = requireSymbolObservable();
    var symbolObservable = interopRequireDefault(symbolObservableModule);
    function interopRequireDefault(mod) {
      if (mod && mod.__esModule) {
        return mod;
      } else {
        return {
          default: mod,
        };
      }
    }
    var ActionTypes = (reduxExports.ActionTypes = {
      INIT: '@@redux/INIT',
    });
    function createStore(reducer, preloadedState, enhancer) {
      var store;
      if (
        (typeof preloadedState == 'function'
          && typeof enhancer > 'u'
          && ((enhancer = preloadedState), (preloadedState = void 0)),
        typeof enhancer < 'u')
      ) {
        if (typeof enhancer != 'function') {
          throw new Error('Expected the enhancer to be a function.');
        }
        return enhancer(createStore)(reducer, preloadedState);
      }
      if (typeof reducer != 'function') {
        throw new Error('Expected the reducer to be a function.');
      }
      var currentReducer = reducer;
      var currentState = preloadedState;
      var currentListeners = [];
      var nextListeners = currentListeners;
      var isDispatching = !1;
      function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
          nextListeners = currentListeners.slice();
        }
      }
      function getState() {
        return currentState;
      }
      function subscribe(listener) {
        if (typeof listener != 'function') {
          throw new Error('Expected listener to be a function.');
        }
        var isSubscribed = !0;
        ensureCanMutateNextListeners();
        nextListeners.push(listener);
        return function () {
          if (isSubscribed) {
            isSubscribed = !1;
            ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
          }
        };
      }
      function dispatch(action) {
        if (!(0, isPlainObject.default)(action)) {
          throw new Error(
            'Actions must be plain objects. Use custom middleware for async actions.',
          );
        }
        if (typeof action.type > 'u') {
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?',
          );
        }
        if (isDispatching) {
          throw new Error('Reducers may not dispatch actions.');
        }
        try {
          isDispatching = !0;
          currentState = currentReducer(currentState, action);
        } finally {
          isDispatching = !1;
        }
        for (
          var listeners = (currentListeners = nextListeners), listenerIndex = 0;
          listenerIndex < listeners.length;
          listenerIndex++
        ) {
          var listener = listeners[listenerIndex];
          listener();
        }
        return action;
      }
      function replaceReducer(nextReducer) {
        if (typeof nextReducer != 'function') {
          throw new Error('Expected the nextReducer to be a function.');
        }
        currentReducer = nextReducer;
        dispatch({
          type: ActionTypes.INIT,
        });
      }
      function observable() {
        var outerObservable;
        var outerSubscribe = subscribe;
        outerObservable = {
          subscribe: function (observer) {
            if (typeof observer != 'object') {
              throw new TypeError('Expected the observer to be an object.');
            }
            function observeState() {
              if (observer.next) {
                observer.next(getState());
              }
            }
            observeState();
            var unsubscribe = outerSubscribe(observeState);
            return {
              unsubscribe: unsubscribe,
            };
          },
        };
        outerObservable[symbolObservable.default] = function () {
          return this;
        };
        return outerObservable;
      }
      dispatch({
        type: ActionTypes.INIT,
      });
      store = {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        replaceReducer: replaceReducer,
      };
      store[symbolObservable.default] = observable;
      return store;
    }
  });
  var requireReduxWarning = defineCommonjsModule(warningExports => {
    'use strict';

    warningExports.__esModule = !0;
    warningExports.default = warning;
    function warning(message) {
      if (typeof console < 'u' && typeof console.error == 'function') {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch {}
    }
  });
  var requireCombineReducers = defineCommonjsModule(combineReducersExports => {
    'use strict';

    combineReducersExports.__esModule = !0;
    combineReducersExports.default = combineReducers;
    var reduxModule = requireCreateStore();
    var isPlainObjectModule = requireIsPlainObject();
    var isPlainObject = interopRequireDefault(isPlainObjectModule);
    var warningModule = requireReduxWarning();
    var warning = interopRequireDefault(warningModule);
    function interopRequireDefault(mod) {
      if (mod && mod.__esModule) {
        return mod;
      } else {
        return {
          default: mod,
        };
      }
    }
    function getUndefinedStateErrorMessage(key, action) {
      var actionType = action && action.type;
      var actionDescription =
        (actionType && '"' + actionType.toString() + '"') || 'an action';
      return (
        'Given action '
        + actionDescription
        + ', reducer "'
        + key
        + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
      );
    }
    function assertReducerShape(reducers) {
      Object.keys(reducers).forEach(function (key) {
        var reducer = reducers[key];
        var initialState = reducer(void 0, {
          type: reduxModule.ActionTypes.INIT,
        });
        if (typeof initialState > 'u') {
          throw new Error(
            'Reducer "'
              + key
              + `" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`,
          );
        }
        var randomType =
          '@@redux/PROBE_UNKNOWN_ACTION_'
          + Math.random().toString(36).substring(7).split('').join('.');
        if (
          typeof reducer(void 0, {
            type: randomType,
          }) > 'u'
        ) {
          throw new Error(
            'Reducer "'
              + key
              + '" returned undefined when probed with a random type. '
              + ("Don't try to handle "
                + reduxModule.ActionTypes.INIT
                + ' or other actions in "redux/*" ')
              + 'namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.',
          );
        }
      });
    }
    function combineReducers(reducers) {
      for (
        var reducerKeys = Object.keys(reducers), finalReducers = {}, index = 0;
        index < reducerKeys.length;
        index++
      ) {
        var key = reducerKeys[index];
        if (typeof reducers[key] == 'function') {
          finalReducers[key] = reducers[key];
        }
      }
      var finalReducerKeys = Object.keys(finalReducers);
      var unexpectedKeyCache = void 0;
      var shapeAssertionError = void 0;
      try {
        assertReducerShape(finalReducers);
      } catch (assertError) {
        shapeAssertionError = assertError;
      }
      return function () {
        var state =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var action = arguments[1];
        if (shapeAssertionError) {
          throw shapeAssertionError;
        }
        if (0) {
          var warningMessage;
        }
        for (
          var hasChanged = !1, nextState = {}, keyIndex = 0;
          keyIndex < finalReducerKeys.length;
          keyIndex++
        ) {
          var key = finalReducerKeys[keyIndex];
          var reducer = finalReducers[key];
          var previousStateForKey = state[key];
          var nextStateForKey = reducer(previousStateForKey, action);
          if (typeof nextStateForKey > 'u') {
            var errorMessage = getUndefinedStateErrorMessage(key, action);
            throw new Error(errorMessage);
          }
          nextState[key] = nextStateForKey;
          hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        if (hasChanged) {
          return nextState;
        } else {
          return state;
        }
      };
    }
  });
  var requireBindActionCreators = defineCommonjsModule(
    bindActionCreatorsExports => {
      'use strict';

      bindActionCreatorsExports.__esModule = !0;
      bindActionCreatorsExports.default = bindActionCreators;
      function bindActionCreator(actionCreator, dispatch) {
        return function () {
          return dispatch(actionCreator.apply(void 0, arguments));
        };
      }
      function bindActionCreators(actionCreators, dispatch) {
        if (typeof actionCreators == 'function') {
          return bindActionCreator(actionCreators, dispatch);
        }
        if (typeof actionCreators != 'object' || actionCreators === null) {
          throw new Error(
            'bindActionCreators expected an object or a function, instead received '
              + (actionCreators === null ? 'null' : typeof actionCreators)
              + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?',
          );
        }
        for (
          var keys = Object.keys(actionCreators),
            boundActionCreators = {},
            index = 0;
          index < keys.length;
          index++
        ) {
          var key = keys[index];
          var actionCreator = actionCreators[key];
          if (typeof actionCreator == 'function') {
            boundActionCreators[key] = bindActionCreator(
              actionCreator,
              dispatch,
            );
          }
        }
        return boundActionCreators;
      }
    },
  );
  var requireCompose = defineCommonjsModule(composeExports => {
    'use strict';

    composeExports.__esModule = !0;
    composeExports.default = compose;
    function compose() {
      for (
        var argCount = arguments.length, funcs = Array(argCount), argIndex = 0;
        argIndex < argCount;
        argIndex++
      ) {
        funcs[argIndex] = arguments[argIndex];
      }
      if (funcs.length === 0) {
        return function (arg) {
          return arg;
        };
      } else {
        if (funcs.length === 1) {
          return funcs[0];
        } else {
          return funcs.reduce(function (outerFn, innerFn) {
            return function () {
              return outerFn(innerFn.apply(void 0, arguments));
            };
          });
        }
      }
    }
  });
  var requireApplyMiddleware = defineCommonjsModule(applyMiddlewareExports => {
    'use strict';

    applyMiddlewareExports.__esModule = !0;
    var objectAssign =
      Object.assign
      || function (target) {
        for (var argIndex = 1; argIndex < arguments.length; argIndex++) {
          var source = arguments[argIndex];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    applyMiddlewareExports.default = applyMiddleware;
    var composeModule = requireCompose();
    var compose = interopRequireDefault(composeModule);
    function interopRequireDefault(mod) {
      if (mod && mod.__esModule) {
        return mod;
      } else {
        return {
          default: mod,
        };
      }
    }
    function applyMiddleware() {
      for (
        var argCount = arguments.length,
          middlewares = Array(argCount),
          argIndex = 0;
        argIndex < argCount;
        argIndex++
      ) {
        middlewares[argIndex] = arguments[argIndex];
      }
      return function (createStore) {
        return function (reducer, preloadedState, enhancer) {
          var store = createStore(reducer, preloadedState, enhancer);
          var dispatch = store.dispatch;
          var chain = [];
          var middlewareAPI = {
            getState: store.getState,
            dispatch: function (action) {
              return dispatch(action);
            },
          };
          chain = middlewares.map(function (middleware) {
            return middleware(middlewareAPI);
          });
          dispatch = compose.default.apply(void 0, chain)(store.dispatch);
          return objectAssign({}, store, {
            dispatch: dispatch,
          });
        };
      };
    }
  });
  var requireRedux = defineCommonjsModule(reduxIndexExports => {
    'use strict';

    reduxIndexExports.__esModule = !0;
    reduxIndexExports.compose =
      reduxIndexExports.applyMiddleware =
      reduxIndexExports.bindActionCreators =
      reduxIndexExports.combineReducers =
      reduxIndexExports.createStore =
        void 0;
    var createStoreModule = requireCreateStore();
    var createStore = interopRequireDefault(createStoreModule);
    var combineReducersModule = requireCombineReducers();
    var combineReducers = interopRequireDefault(combineReducersModule);
    var bindActionCreatorsModule = requireBindActionCreators();
    var bindActionCreators = interopRequireDefault(bindActionCreatorsModule);
    var applyMiddlewareModule = requireApplyMiddleware();
    var applyMiddleware = interopRequireDefault(applyMiddlewareModule);
    var composeModule = requireCompose();
    var compose = interopRequireDefault(composeModule);
    var warningModule = requireReduxWarning();
    var warning = interopRequireDefault(warningModule);
    function interopRequireDefault(mod) {
      if (mod && mod.__esModule) {
        return mod;
      } else {
        return {
          default: mod,
        };
      }
    }
    reduxIndexExports.createStore = createStore.default;
    reduxIndexExports.combineReducers = combineReducers.default;
    reduxIndexExports.bindActionCreators = bindActionCreators.default;
    reduxIndexExports.applyMiddleware = applyMiddleware.default;
    reduxIndexExports.compose = compose.default;
  });
  var requireReduxLogger = defineCommonjsModule(
    (reduxLoggerCjsExports, reduxLoggerCjsModule) => {
      (function (globalScope, factory) {
        if (
          typeof reduxLoggerCjsExports == 'object'
          && typeof reduxLoggerCjsModule < 'u'
        ) {
          factory(reduxLoggerCjsExports);
        } else {
          if (typeof define == 'function' && define.amd) {
            define(['exports'], factory);
          } else {
            factory((globalScope.reduxLogger = globalScope.reduxLogger || {}));
          }
        }
      })(reduxLoggerCjsExports, function (reduxLoggerExports) {
        'use strict';

        function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          });
        }
        function Diff(kind, path) {
          Object.defineProperty(this, 'kind', {
            value: kind,
            enumerable: !0,
          });
          if (path && path.length) {
            Object.defineProperty(this, 'path', {
              value: path,
              enumerable: !0,
            });
          }
        }
        function DiffEdit(path, origin, value) {
          DiffEdit.super_.call(this, 'E', path);
          Object.defineProperty(this, 'lhs', {
            value: origin,
            enumerable: !0,
          });
          Object.defineProperty(this, 'rhs', {
            value: value,
            enumerable: !0,
          });
        }
        function DiffNew(path, value) {
          DiffNew.super_.call(this, 'N', path);
          Object.defineProperty(this, 'rhs', {
            value: value,
            enumerable: !0,
          });
        }
        function DiffDeleted(path, value) {
          DiffDeleted.super_.call(this, 'D', path);
          Object.defineProperty(this, 'lhs', {
            value: value,
            enumerable: !0,
          });
        }
        function DiffArray(path, index, item) {
          DiffArray.super_.call(this, 'A', path);
          Object.defineProperty(this, 'index', {
            value: index,
            enumerable: !0,
          });
          Object.defineProperty(this, 'item', {
            value: item,
            enumerable: !0,
          });
        }
        function arrayRemove(arr, from, endIndex) {
          var rest = arr.slice((endIndex || from) + 1 || arr.length);
          arr.length = from < 0 ? arr.length + from : from;
          arr.push.apply(arr, rest);
          return arr;
        }
        function realTypeOf(subject) {
          var type = typeof subject > 'u' ? 'undefined' : getTypeof(subject);
          if (type !== 'object') {
            return type;
          } else {
            if (subject === Math) {
              return 'math';
            } else {
              if (subject === null) {
                return 'null';
              } else {
                if (Array.isArray(subject)) {
                  return 'array';
                } else {
                  if (
                    Object.prototype.toString.call(subject) === '[object Date]'
                  ) {
                    return 'date';
                  } else {
                    if (
                      typeof subject.toString == 'function'
                      && /^\/.*\//.test(subject.toString())
                    ) {
                      return 'regexp';
                    } else {
                      return 'object';
                    }
                  }
                }
              }
            }
          }
        }
        function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
          path = path || [];
          stack = stack || [];
          var currentPath = path.slice(0);
          if (typeof key < 'u') {
            if (prefilter) {
              if (
                typeof prefilter == 'function'
                && prefilter(currentPath, key)
              ) {
                return;
              }
              if (
                (typeof prefilter > 'u' ? 'undefined' : getTypeof(prefilter))
                === 'object'
              ) {
                if (
                  prefilter.prefilter
                  && prefilter.prefilter(currentPath, key)
                ) {
                  return;
                }
                if (prefilter.normalize) {
                  var normalized = prefilter.normalize(
                    currentPath,
                    key,
                    lhs,
                    rhs,
                  );
                  if (normalized) {
                    lhs = normalized[0];
                    rhs = normalized[1];
                  }
                }
              }
            }
            currentPath.push(key);
          }
          if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
            lhs = lhs.toString();
            rhs = rhs.toString();
          }
          var ltype = typeof lhs > 'u' ? 'undefined' : getTypeof(lhs);
          var rtype = typeof rhs > 'u' ? 'undefined' : getTypeof(rhs);
          var ldefined =
            ltype !== 'undefined'
            || (stack
              && stack[stack.length - 1].lhs
              && stack[stack.length - 1].lhs.hasOwnProperty(key));
          var rdefined =
            rtype !== 'undefined'
            || (stack
              && stack[stack.length - 1].rhs
              && stack[stack.length - 1].rhs.hasOwnProperty(key));
          if (!ldefined && rdefined) {
            changes(new DiffNew(currentPath, rhs));
          } else if (!rdefined && ldefined) {
            changes(new DiffDeleted(currentPath, lhs));
          } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
            changes(new DiffEdit(currentPath, lhs, rhs));
          } else if (realTypeOf(lhs) === 'date' && lhs - rhs !== 0) {
            changes(new DiffEdit(currentPath, lhs, rhs));
          } else if (ltype === 'object' && lhs !== null && rhs !== null) {
            if (
              stack.filter(function (stackItem) {
                return stackItem.lhs === lhs;
              }).length
            ) {
              if (lhs !== rhs) {
                changes(new DiffEdit(currentPath, lhs, rhs));
              }
            } else {
              if (
                (stack.push({
                  lhs: lhs,
                  rhs: rhs,
                }),
                Array.isArray(lhs))
              ) {
                var index;
                for (lhs.length, index = 0; index < lhs.length; index++) {
                  if (index >= rhs.length) {
                    changes(
                      new DiffArray(
                        currentPath,
                        index,
                        new DiffDeleted(void 0, lhs[index]),
                      ),
                    );
                  } else {
                    deepDiff(
                      lhs[index],
                      rhs[index],
                      changes,
                      prefilter,
                      currentPath,
                      index,
                      stack,
                    );
                  }
                }
                for (; index < rhs.length; ) {
                  changes(
                    new DiffArray(
                      currentPath,
                      index,
                      new DiffNew(void 0, rhs[index++]),
                    ),
                  );
                }
              } else {
                var leftKeys = Object.keys(lhs);
                var rightKeys = Object.keys(rhs);
                leftKeys.forEach(function (leftKey, keyIndex) {
                  var rightIndex = rightKeys.indexOf(leftKey);
                  if (rightIndex >= 0) {
                    deepDiff(
                      lhs[leftKey],
                      rhs[leftKey],
                      changes,
                      prefilter,
                      currentPath,
                      leftKey,
                      stack,
                    );
                    rightKeys = arrayRemove(rightKeys, rightIndex);
                  } else {
                    deepDiff(
                      lhs[leftKey],
                      void 0,
                      changes,
                      prefilter,
                      currentPath,
                      leftKey,
                      stack,
                    );
                  }
                });
                rightKeys.forEach(function (rightKey) {
                  deepDiff(
                    void 0,
                    rhs[rightKey],
                    changes,
                    prefilter,
                    currentPath,
                    rightKey,
                    stack,
                  );
                });
              }
              stack.length = stack.length - 1;
            }
          } else {
            if (lhs !== rhs) {
              if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
                changes(new DiffEdit(currentPath, lhs, rhs));
              }
            }
          }
        }
        function accumulateDiff(lhs, rhs, prefilter, accum) {
          accum = accum || [];
          deepDiff(
            lhs,
            rhs,
            function (diff) {
              if (diff) {
                accum.push(diff);
              }
            },
            prefilter,
          );
          if (accum.length) {
            return accum;
          } else {
            return void 0;
          }
        }
        function applyArrayChange(arr, index, change) {
          if (change.path && change.path.length) {
            var itemIndex;
            var node = arr[index];
            var last = change.path.length - 1;
            for (itemIndex = 0; itemIndex < last; itemIndex++) {
              node = node[change.path[itemIndex]];
            }
            switch (change.kind) {
              case 'A':
                applyArrayChange(
                  node[change.path[itemIndex]],
                  change.index,
                  change.item,
                );
                break;
              case 'D':
                delete node[change.path[itemIndex]];
                break;
              case 'E':
              case 'N':
                node[change.path[itemIndex]] = change.rhs;
            }
          } else {
            switch (change.kind) {
              case 'A':
                applyArrayChange(arr[index], change.index, change.item);
                break;
              case 'D':
                arr = arrayRemove(arr, index);
                break;
              case 'E':
              case 'N':
                arr[index] = change.rhs;
            }
          }
          return arr;
        }
        function applyChange(target, source, change) {
          if (target && source && change && change.kind) {
            for (
              var node = target,
                pathIndex = -1,
                last = change.path ? change.path.length - 1 : 0;
              ++pathIndex < last;
            ) {
              if (typeof node[change.path[pathIndex]] > 'u') {
                node[change.path[pathIndex]] =
                  typeof change.path[pathIndex] == 'number' ? [] : {};
              }
              node = node[change.path[pathIndex]];
            }
            switch (change.kind) {
              case 'A':
                applyArrayChange(
                  change.path ? node[change.path[pathIndex]] : node,
                  change.index,
                  change.item,
                );
                break;
              case 'D':
                delete node[change.path[pathIndex]];
                break;
              case 'E':
              case 'N':
                node[change.path[pathIndex]] = change.rhs;
            }
          }
        }
        function revertArrayChange(arr, index, change) {
          if (change.path && change.path.length) {
            var itemIndex;
            var node = arr[index];
            var last = change.path.length - 1;
            for (itemIndex = 0; itemIndex < last; itemIndex++) {
              node = node[change.path[itemIndex]];
            }
            switch (change.kind) {
              case 'A':
                revertArrayChange(
                  node[change.path[itemIndex]],
                  change.index,
                  change.item,
                );
                break;
              case 'D':
                node[change.path[itemIndex]] = change.lhs;
                break;
              case 'E':
                node[change.path[itemIndex]] = change.lhs;
                break;
              case 'N':
                delete node[change.path[itemIndex]];
            }
          } else {
            switch (change.kind) {
              case 'A':
                revertArrayChange(arr[index], change.index, change.item);
                break;
              case 'D':
                arr[index] = change.lhs;
                break;
              case 'E':
                arr[index] = change.lhs;
                break;
              case 'N':
                arr = arrayRemove(arr, index);
            }
          }
          return arr;
        }
        function revertChange(target, source, change) {
          if (target && source && change && change.kind) {
            var pathIndex;
            var last;
            var node = target;
            for (
              last = change.path.length - 1, pathIndex = 0;
              pathIndex < last;
              pathIndex++
            ) {
              if (typeof node[change.path[pathIndex]] > 'u') {
                node[change.path[pathIndex]] = {};
              }
              node = node[change.path[pathIndex]];
            }
            switch (change.kind) {
              case 'A':
                revertArrayChange(
                  node[change.path[pathIndex]],
                  change.index,
                  change.item,
                );
                break;
              case 'D':
                node[change.path[pathIndex]] = change.lhs;
                break;
              case 'E':
                node[change.path[pathIndex]] = change.lhs;
                break;
              case 'N':
                delete node[change.path[pathIndex]];
            }
          }
        }
        function applyDiff(target, source, filter) {
          if (target && source) {
            var onChange = function (change) {
              if (!(filter && !filter(target, source, change))) {
                applyChange(target, source, change);
              }
            };
            deepDiff(target, source, onChange);
          }
        }
        function diffStyle(kind) {
          return 'color: ' + diffDictionary[kind].color + '; font-weight: bold';
        }
        function renderDiff(diff) {
          var kind = diff.kind;
          var path = diff.path;
          var lhs = diff.lhs;
          var rhs = diff.rhs;
          var index = diff.index;
          var item = diff.item;
          switch (kind) {
            case 'E':
              return [path.join('.'), lhs, '\u2192', rhs];
            case 'N':
              return [path.join('.'), rhs];
            case 'D':
              return [path.join('.')];
            case 'A':
              return [path.join('.') + '[' + index + ']', item];
            default:
              return [];
          }
        }
        function diffLogger(prevState, newState, logger, isCollapsed) {
          var diffs = accumulateDiff(prevState, newState);
          try {
            if (isCollapsed) {
              logger.groupCollapsed('diff');
            } else {
              logger.group('diff');
            }
          } catch {
            logger.log('diff');
          }
          if (diffs) {
            diffs.forEach(function (diff) {
              var kind = diff.kind;
              var output = renderDiff(diff);
              logger.log.apply(
                logger,
                ['%c ' + diffDictionary[kind].text, diffStyle(kind)].concat(
                  toArray(output),
                ),
              );
            });
          } else {
            logger.log('\u2014\u2014 no diff \u2014\u2014');
          }
          try {
            logger.groupEnd();
          } catch {
            logger.log('\u2014\u2014 diff end \u2014\u2014 ');
          }
        }
        function resolveTransform(transform, action, args, key) {
          switch (typeof transform > 'u' ? 'undefined' : getTypeof(transform)) {
            case 'object':
              if (typeof transform[key] == 'function') {
                return transform[key].apply(transform, toArray(args));
              } else {
                return transform[key];
              }
            case 'function':
              return transform(action);
            default:
              return transform;
          }
        }
        function defaultTitleFormatter(options) {
          var timestamp = options.timestamp;
          var duration = options.duration;
          return function (action, time, took) {
            var parts = ['action'];
            parts.push('%c' + String(action.type));
            if (timestamp) {
              parts.push('%c@ ' + time);
            }
            if (duration) {
              parts.push('%c(in ' + took.toFixed(2) + ' ms)');
            }
            return parts.join(' ');
          };
        }
        function printBuffer(buffer, options) {
          var logger = options.logger;
          var actionTransformer = options.actionTransformer;
          var titleFormatterOption = options.titleFormatter;
          var titleFormatterFn =
            titleFormatterOption === void 0
              ? defaultTitleFormatter(options)
              : titleFormatterOption;
          var collapsed = options.collapsed;
          var colors = options.colors;
          var level = options.level;
          var diff = options.diff;
          var isUsingDefaultFormatter = typeof options.titleFormatter > 'u';
          buffer.forEach(function (logEntry, index) {
            var started = logEntry.started;
            var startedTime = logEntry.startedTime;
            var action = logEntry.action;
            var prevState = logEntry.prevState;
            var error = logEntry.error;
            var took = logEntry.took;
            var nextState = logEntry.nextState;
            var nextEntry = buffer[index + 1];
            if (nextEntry) {
              nextState = nextEntry.prevState;
              took = nextEntry.started - started;
            }
            var formattedAction = actionTransformer(action);
            var isCollapsed =
              typeof collapsed == 'function'
                ? collapsed(
                    function () {
                      return nextState;
                    },
                    action,
                    logEntry,
                  )
                : collapsed;
            var formattedTime = formatTime(startedTime);
            var titleCSS = colors.title
              ? 'color: ' + colors.title(formattedAction) + ';'
              : '';
            var headerCSS = ['color: gray; font-weight: lighter;'];
            headerCSS.push(titleCSS);
            if (options.timestamp) {
              headerCSS.push('color: gray; font-weight: lighter;');
            }
            if (options.duration) {
              headerCSS.push('color: gray; font-weight: lighter;');
            }
            var titleText = titleFormatterFn(
              formattedAction,
              formattedTime,
              took,
            );
            try {
              if (isCollapsed) {
                if (colors.title && isUsingDefaultFormatter) {
                  logger.groupCollapsed.apply(
                    logger,
                    ['%c ' + titleText].concat(headerCSS),
                  );
                } else {
                  logger.groupCollapsed(titleText);
                }
              } else {
                if (colors.title && isUsingDefaultFormatter) {
                  logger.group.apply(
                    logger,
                    ['%c ' + titleText].concat(headerCSS),
                  );
                } else {
                  logger.group(titleText);
                }
              }
            } catch {
              logger.log(titleText);
            }
            var prevStateLevel = resolveTransform(
              level,
              formattedAction,
              [prevState],
              'prevState',
            );
            var actionLevel = resolveTransform(
              level,
              formattedAction,
              [formattedAction],
              'action',
            );
            var errorLevel = resolveTransform(
              level,
              formattedAction,
              [error, prevState],
              'error',
            );
            var nextStateLevel = resolveTransform(
              level,
              formattedAction,
              [nextState],
              'nextState',
            );
            if (prevStateLevel) {
              if (colors.prevState) {
                var prevStateCSS =
                  'color: '
                  + colors.prevState(prevState)
                  + '; font-weight: bold';
                logger[prevStateLevel](
                  '%c prev state',
                  prevStateCSS,
                  prevState,
                );
              } else {
                logger[prevStateLevel]('prev state', prevState);
              }
            }
            if (actionLevel) {
              if (colors.action) {
                var actionCSS =
                  'color: '
                  + colors.action(formattedAction)
                  + '; font-weight: bold';
                logger[actionLevel](
                  '%c action    ',
                  actionCSS,
                  formattedAction,
                );
              } else {
                logger[actionLevel]('action    ', formattedAction);
              }
            }
            if (error && errorLevel) {
              if (colors.error) {
                var errorCSS =
                  'color: '
                  + colors.error(error, prevState)
                  + '; font-weight: bold;';
                logger[errorLevel]('%c error     ', errorCSS, error);
              } else {
                logger[errorLevel]('error     ', error);
              }
            }
            if (nextStateLevel) {
              if (colors.nextState) {
                var nextStateCSS =
                  'color: '
                  + colors.nextState(nextState)
                  + '; font-weight: bold';
                logger[nextStateLevel](
                  '%c next state',
                  nextStateCSS,
                  nextState,
                );
              } else {
                logger[nextStateLevel]('next state', nextState);
              }
            }
            if (diff) {
              diffLogger(prevState, nextState, logger, isCollapsed);
            }
            try {
              logger.groupEnd();
            } catch {
              logger.log('\u2014\u2014 log end \u2014\u2014');
            }
          });
        }
        function createLogger() {
          var inOptions =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var options = Object.assign({}, defaultOptions, inOptions);
          var logger = options.logger;
          var stateTransformer = options.stateTransformer;
          var errorTransformer = options.errorTransformer;
          var predicate = options.predicate;
          var logErrors = options.logErrors;
          var diffPredicate = options.diffPredicate;
          if (typeof logger > 'u') {
            return function () {
              return function (next) {
                return function (action) {
                  return next(action);
                };
              };
            };
          }
          if (inOptions.getState && inOptions.dispatch) {
            console.error(`[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:
// Logger with default options
import { logger } from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
// Or you can create your own logger with custom options http://bit.ly/redux-logger-options
import createLogger from 'redux-logger'
const logger = createLogger({
  // ...options
});
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
`);
            return function () {
              return function (next) {
                return function (action) {
                  return next(action);
                };
              };
            };
          }
          var logBuffer = [];
          return function (store) {
            var getState = store.getState;
            return function (next) {
              return function (action) {
                if (
                  typeof predicate == 'function'
                  && !predicate(getState, action)
                ) {
                  return next(action);
                }
                var logEntry = {};
                logBuffer.push(logEntry);
                logEntry.started = timer.now();
                logEntry.startedTime = new Date();
                logEntry.prevState = stateTransformer(getState());
                logEntry.action = action;
                var returnedValue = void 0;
                if (logErrors) {
                  try {
                    returnedValue = next(action);
                  } catch (error) {
                    logEntry.error = errorTransformer(error);
                  }
                } else {
                  returnedValue = next(action);
                }
                logEntry.took = timer.now() - logEntry.started;
                logEntry.nextState = stateTransformer(getState());
                var shouldDiff =
                  options.diff && typeof diffPredicate == 'function'
                    ? diffPredicate(getState, action)
                    : options.diff;
                if (
                  (printBuffer(
                    logBuffer,
                    Object.assign({}, options, {
                      diff: shouldDiff,
                    }),
                  ),
                  (logBuffer.length = 0),
                  logEntry.error)
                ) {
                  throw logEntry.error;
                }
                return returnedValue;
              };
            };
          };
        }
        var root;
        var previousDeepDiff;
        var repeat = function (char, times) {
          return new Array(times + 1).join(char);
        };
        var padZero = function (num, length) {
          return repeat('0', length - num.toString().length) + num;
        };
        var formatTime = function (date) {
          return (
            padZero(date.getHours(), 2)
            + ':'
            + padZero(date.getMinutes(), 2)
            + ':'
            + padZero(date.getSeconds(), 2)
            + '.'
            + padZero(date.getMilliseconds(), 3)
          );
        };
        var timer =
          typeof performance < 'u'
          && performance !== null
          && typeof performance.now == 'function'
            ? performance
            : Date;
        var getTypeof =
          typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
            ? function (subject) {
                return typeof subject;
              }
            : function (subject) {
                if (
                  subject
                  && typeof Symbol == 'function'
                  && subject.constructor === Symbol
                  && subject !== Symbol.prototype
                ) {
                  return 'symbol';
                } else {
                  return typeof subject;
                }
              };
        var toArray = function (iterable) {
          if (Array.isArray(iterable)) {
            for (
              var itemIndex = 0, arr = Array(iterable.length);
              itemIndex < iterable.length;
              itemIndex++
            ) {
              arr[itemIndex] = iterable[itemIndex];
            }
            return arr;
          }
          return Array.from(iterable);
        };
        var conflictResolvers = [];
        root =
          (typeof global > 'u' ? 'undefined' : getTypeof(global)) === 'object'
          && global
            ? global
            : typeof window < 'u'
              ? window
              : {};
        previousDeepDiff = root.DeepDiff;
        if (previousDeepDiff) {
          conflictResolvers.push(function () {
            if (
              typeof previousDeepDiff < 'u'
              && root.DeepDiff === accumulateDiff
            ) {
              root.DeepDiff = previousDeepDiff;
              previousDeepDiff = void 0;
            }
          });
        }
        inherits(DiffEdit, Diff);
        inherits(DiffNew, Diff);
        inherits(DiffDeleted, Diff);
        inherits(DiffArray, Diff);
        Object.defineProperties(accumulateDiff, {
          diff: {
            value: accumulateDiff,
            enumerable: !0,
          },
          observableDiff: {
            value: deepDiff,
            enumerable: !0,
          },
          applyDiff: {
            value: applyDiff,
            enumerable: !0,
          },
          applyChange: {
            value: applyChange,
            enumerable: !0,
          },
          revertChange: {
            value: revertChange,
            enumerable: !0,
          },
          isConflict: {
            value: function () {
              return typeof previousDeepDiff < 'u';
            },
            enumerable: !0,
          },
          noConflict: {
            value: function () {
              if (conflictResolvers) {
                conflictResolvers.forEach(function (resolver) {
                  resolver();
                });
                conflictResolvers = null;
              }
              return accumulateDiff;
            },
            enumerable: !0,
          },
        });
        var diffDictionary = {
          E: {
            color: '#2196F3',
            text: 'CHANGED:',
          },
          N: {
            color: '#4CAF50',
            text: 'ADDED:',
          },
          D: {
            color: '#F44336',
            text: 'DELETED:',
          },
          A: {
            color: '#2196F3',
            text: 'ARRAY:',
          },
        };
        var defaultOptions = {
          level: 'log',
          logger: console,
          logErrors: !0,
          collapsed: void 0,
          predicate: void 0,
          duration: !1,
          timestamp: !0,
          stateTransformer: function (state) {
            return state;
          },
          actionTransformer: function (action) {
            return action;
          },
          errorTransformer: function (error) {
            return error;
          },
          colors: {
            title: function () {
              return 'inherit';
            },
            prevState: function () {
              return '#9E9E9E';
            },
            action: function () {
              return '#03A9F4';
            },
            nextState: function () {
              return '#4CAF50';
            },
            error: function () {
              return '#F20404';
            },
          },
          diff: !1,
          diffPredicate: void 0,
          transformer: void 0,
        };
        var defaultLogger = function () {
          var inOptions =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var dispatch = inOptions.dispatch;
          var getState = inOptions.getState;
          if (typeof dispatch == 'function' || typeof getState == 'function') {
            return createLogger()({
              dispatch: dispatch,
              getState: getState,
            });
          } else {
            return void console.error(`
[redux-logger v3] BREAKING CHANGE
[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.
[redux-logger v3] Change
[redux-logger v3] import createLogger from 'redux-logger'
[redux-logger v3] to
[redux-logger v3] import { createLogger } from 'redux-logger'
`);
          }
        };
        reduxLoggerExports.defaults = defaultOptions;
        reduxLoggerExports.createLogger = createLogger;
        reduxLoggerExports.logger = defaultLogger;
        reduxLoggerExports.default = defaultLogger;
        Object.defineProperty(reduxLoggerExports, '__esModule', {
          value: !0,
        });
      });
    },
  );
  var requireObjectPath = defineCommonjsModule(
    (objectPathCjsExports, objectPathCjsModule) => {
      (function (globalScope, moduleFactory) {
        'use strict';

        if (
          typeof objectPathCjsModule == 'object'
          && typeof objectPathCjsModule.exports == 'object'
        ) {
          objectPathCjsModule.exports = moduleFactory();
        } else {
          if (typeof define == 'function' && define.amd) {
            define([], moduleFactory);
          } else {
            globalScope.objectPath = moduleFactory();
          }
        }
      })(objectPathCjsExports, function () {
        'use strict';

        var objectToString = Object.prototype.toString;
        function hasOwnProperty(obj, key) {
          if (obj == null) {
            return !1;
          } else {
            return Object.prototype.hasOwnProperty.call(obj, key);
          }
        }
        function isEmpty(value) {
          if (!value || (isArray(value) && value.length === 0)) {
            return !0;
          }
          if (typeof value != 'string') {
            for (var key in value) {
              if (hasOwnProperty(value, key)) {
                return !1;
              }
            }
            return !0;
          }
          return !1;
        }
        function toStr(obj) {
          return objectToString.call(obj);
        }
        function isObject(value) {
          return typeof value == 'object' && toStr(value) === '[object Object]';
        }
        var isArray =
          Array.isArray
          || function (value) {
            return objectToString.call(value) === '[object Array]';
          };
        function isBoolean(value) {
          return (
            typeof value == 'boolean' || toStr(value) === '[object Boolean]'
          );
        }
        function getKey(key) {
          var parsed = parseInt(key);
          if (parsed.toString() === key) {
            return parsed;
          } else {
            return key;
          }
        }
        function factory(options) {
          options = options || {};
          var objectPath = function (obj) {
            return Object.keys(objectPath).reduce(function (bound, key) {
              if (!(key === 'create')) {
                if (typeof objectPath[key] == 'function') {
                  bound[key] = objectPath[key].bind(objectPath, obj);
                }
              }
              return bound;
            }, {});
          };
          var hasShallowProperty;
          if (options.includeInheritedProps) {
            hasShallowProperty = function () {
              return !0;
            };
          } else {
            hasShallowProperty = function (obj, key) {
              return (
                (typeof key == 'number' && Array.isArray(obj))
                || hasOwnProperty(obj, key)
              );
            };
          }
          function getShallowProperty(obj, key) {
            if (hasShallowProperty(obj, key)) {
              return obj[key];
            }
          }
          var getProperty;
          if (options.includeInheritedProps) {
            getProperty = function (obj, key) {
              if (typeof key != 'string' && typeof key != 'number') {
                key = String(key);
              }
              var value = getShallowProperty(obj, key);
              if (
                key === '__proto__'
                || key === 'prototype'
                || (key === 'constructor' && typeof value == 'function')
              ) {
                throw new Error(
                  "For security reasons, object's magic properties cannot be set",
                );
              }
              return value;
            };
          } else {
            getProperty = function (obj, key) {
              return getShallowProperty(obj, key);
            };
          }
          function set(obj, path, value, doNotReplace) {
            if (
              (typeof path == 'number' && (path = [path]),
              !path || path.length === 0)
            ) {
              return obj;
            }
            if (typeof path == 'string') {
              return set(obj, path.split('.').map(getKey), value, doNotReplace);
            }
            var key = path[0];
            var currentValue = getProperty(obj, key);
            if (path.length === 1) {
              if (currentValue === void 0 || !doNotReplace) {
                obj[key] = value;
              }
              return currentValue;
            } else {
              if (currentValue === void 0) {
                if (typeof path[1] == 'number') {
                  obj[key] = [];
                } else {
                  obj[key] = {};
                }
              }
              return set(obj[key], path.slice(1), value, doNotReplace);
            }
          }
          objectPath.has = function (obj, path) {
            if (
              (typeof path == 'number'
                ? (path = [path])
                : typeof path == 'string' && (path = path.split('.')),
              !path || path.length === 0)
            ) {
              return !!obj;
            }
            for (var keyIndex = 0; keyIndex < path.length; keyIndex++) {
              var key = getKey(path[keyIndex]);
              if (
                (typeof key == 'number' && isArray(obj) && key < obj.length)
                || (options.includeInheritedProps
                  ? key in Object(obj)
                  : hasOwnProperty(obj, key))
              ) {
                obj = obj[key];
              } else {
                return !1;
              }
            }
            return !0;
          };
          objectPath.ensureExists = function (obj, path, value) {
            return set(obj, path, value, !0);
          };
          objectPath.set = function (obj, path, value, doNotReplace) {
            return set(obj, path, value, doNotReplace);
          };
          objectPath.insert = function (obj, path, value, insertIndex) {
            var arr = objectPath.get(obj, path);
            insertIndex = ~~insertIndex;
            if (!isArray(arr)) {
              arr = [];
              objectPath.set(obj, path, arr);
            }
            arr.splice(insertIndex, 0, value);
          };
          objectPath.empty = function (obj, path) {
            if (!isEmpty(path) && obj != null) {
              var value;
              var key;
              if ((value = objectPath.get(obj, path))) {
                if (typeof value == 'string') {
                  return objectPath.set(obj, path, '');
                }
                if (isBoolean(value)) {
                  return objectPath.set(obj, path, !1);
                }
                if (typeof value == 'number') {
                  return objectPath.set(obj, path, 0);
                }
                if (isArray(value)) {
                  value.length = 0;
                } else if (isObject(value)) {
                  for (key in value) {
                    if (hasShallowProperty(value, key)) {
                      delete value[key];
                    }
                  }
                } else {
                  return objectPath.set(obj, path, null);
                }
              }
            }
          };
          objectPath.push = function (obj, path) {
            var arr = objectPath.get(obj, path);
            if (!isArray(arr)) {
              arr = [];
              objectPath.set(obj, path, arr);
            }
            arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
          };
          objectPath.coalesce = function (obj, paths, defaultValue) {
            for (
              var value, pathIndex = 0, len = paths.length;
              pathIndex < len;
              pathIndex++
            ) {
              if ((value = objectPath.get(obj, paths[pathIndex])) !== void 0) {
                return value;
              }
            }
            return defaultValue;
          };
          objectPath.get = function (obj, path, defaultValue) {
            if (
              (typeof path == 'number' && (path = [path]),
              !path || path.length === 0)
            ) {
              return obj;
            }
            if (obj == null) {
              return defaultValue;
            }
            if (typeof path == 'string') {
              return objectPath.get(obj, path.split('.'), defaultValue);
            }
            var key = getKey(path[0]);
            var value = getProperty(obj, key);
            if (value === void 0) {
              return defaultValue;
            } else {
              if (path.length === 1) {
                return value;
              } else {
                return objectPath.get(obj[key], path.slice(1), defaultValue);
              }
            }
          };
          objectPath.del = function (obj, path) {
            if (
              (typeof path == 'number' && (path = [path]),
              obj == null || isEmpty(path))
            ) {
              return obj;
            }
            if (typeof path == 'string') {
              return objectPath.del(obj, path.split('.'));
            }
            var key = getKey(path[0]);
            if ((getProperty(obj, key), !hasShallowProperty(obj, key))) {
              return obj;
            }
            if (path.length === 1) {
              if (isArray(obj)) {
                obj.splice(key, 1);
              } else {
                delete obj[key];
              }
            } else {
              return objectPath.del(obj[key], path.slice(1));
            }
            return obj;
          };
          return objectPath;
        }
        var objectPathInstance = factory();
        objectPathInstance.create = factory;
        objectPathInstance.withInheritedProps = factory({
          includeInheritedProps: !0,
        });
        return objectPathInstance;
      });
    },
  );
  var requireReduxWatch = defineCommonjsModule((watchExports, watchModule) => {
    'use strict';

    var objectPathGet = requireObjectPath().get;
    function defaultCompare(valueA, valueB) {
      return valueA === valueB;
    }
    function watch(getObject, path, compare) {
      compare = compare || defaultCompare;
      var currentValue = objectPathGet(getObject(), path);
      return function (callback) {
        return function () {
          var newValue = objectPathGet(getObject(), path);
          if (!compare(currentValue, newValue)) {
            var oldValue = currentValue;
            currentValue = newValue;
            callback(newValue, oldValue, path);
          }
        };
      };
    }
    watchModule.exports = watch;
  });
  var errorReportingNs = {};
  defineExports(errorReportingNs, {
    clear: () => clear,
    error: () => error,
    getEntry: () => getEntry,
    log: () => appLog,
    logDetails: () => logDetails,
    reducer: () => reducer,
  });
  function reducer(state = [], action) {
    switch (action.type) {
      case 'log.new':
        state = state.concat([
          Object.assign(
            {
              key: ++logKeyCounter,
            },
            action.payload,
          ),
        ]);
        break;
      case 'log.clear':
        state = [];
        break;
    }
    return state;
  }
  // Log-entry details must be text (the details view renders them into a <pre>);
  // accept strings as-is and render anything else (e.g. the structured
  // error.details object) as pretty JSON so it never blanks the view.
  function logDetailsText(value) {
    if (typeof value == 'string' || value === null || value === void 0) {
      return value || void 0;
    }
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  function appLog(entry, type = 'log') {
    if (entry instanceof Error) {
      let location = '';
      if (entry.fileName && entry.lineNumber) {
        location = entry.fileName + ':' + entry.lineNumber;
        if (location.columnNumber) {
          location += ':' + entry.columnNumber;
        }
        location += `
`;
      }
      if (entry.stack) {
        location += entry.stack;
      }
      entry = {
        // For errors the stack is the fullest text: injectErrorDetails() renders
        // the structured details between the message and the frames, so prefer
        // it over the raw details object.
        message: entry.message,
        details: location || logDetailsText(entry.details) || void 0,
        videoTitle: entry.videoTitle || void 0,
      };
    } else {
      if (typeof entry == 'string') {
        entry = {
          message: entry,
        };
      } else {
        entry = {
          message: entry.message || '' + entry,
          details: logDetailsText(entry.details) || void 0,
        };
      }
    }
    logStore.dispatch(
      'log.new',
      Object.assign(entry, {
        type: type,
      }),
    );
  }
  function error(entry) {
    appLog(entry, 'error');
  }
  function clear() {
    logStore.dispatch('log.clear');
  }
  function logDetails(key) {
    logWeh.rpc.call(
      'main',
      'embed',
      logBrowser.runtime.getURL(
        'content/logdetails-embed.html?panel=logdetails#'
          + encodeURIComponent(key),
      ),
    );
  }
  function getEntry(key) {
    let found = null;
    if (
      (logStore.getLogs().forEach(entry => {
        if (entry.key == key) {
          found = entry;
        }
      }),
      found)
    ) {
      return found;
    }
    throw new Error('Log entry not found');
  }
  var logWeh;
  var logBrowser;
  var logStore;
  var logKeyCounter;
  var initAppLog = defineLazyModule(() => {
    'use strict';

    logWeh = requireWeh();
    logBrowser = logWeh.browser;
    logStore = (initStore(), toCommonjs(storeNs));
    logKeyCounter = 0;
    logWeh.rpc.listen({
      clearLogs: clear,
      logDetails: logDetails,
      getLogEntry: getEntry,
    });
  });
  var requireHttpStatusCodeType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireOnError = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.THROW_THE_ERROR = void 0;
    exports.THROW_THE_ERROR = error => {
      throw error;
    };
  });
  var requireOnErrorIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireOnError(), exports);
  });
  var requireHttpStatusCodeFrom = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.httpStatusCodeFrom = void 0;
    var numericAssertions = requireHttpStatusCodeIndex();
    var throwModule = requireOnErrorIndex();
    function httpStatusCodeFrom(value, onError = throwModule.THROW_THE_ERROR) {
      numericAssertions.mustBeHttpStatusCode(value, onError);
      return value;
    }
    exports.httpStatusCodeFrom = httpStatusCodeFrom;
  });
  var requireIsHttpStatusCode = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.isHttpStatusCode = void 0;
    function isHttpStatusCode(value) {
      return value >= 100 && value <= 599;
    }
    exports.isHttpStatusCode = isHttpStatusCode;
  });
  var requireAppErrorClass = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.AppError = void 0;
    var AppError = class extends Error {
      constructor(details) {
        super(details.detail);
        this.details = details;
        this.name = this.details.packageName + '/' + this.details.errorName;
      }
    };
    exports.AppError = AppError;
  });
  var requireErValueObject = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.ValueObject = void 0;
    var ValueObject = class {
      constructor(value) {
        this.value = value;
      }
      valueOf() {
        return this.value;
      }
      isValue() {
        return !0;
      }
    };
    exports.ValueObject = ValueObject;
  });
  var requireStructuredProblemReport = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.StructuredProblemReport = void 0;
    var valueObjectModule = requireErValueObject();
    var StructuredProblemReport = class StructuredProblemReport
      extends valueObjectModule.ValueObject
    {
      static from(value) {
        return new StructuredProblemReport(value);
      }
      get detail() {
        return this.value.template.detail;
      }
      get errorId() {
        var errorId;
        if ((errorId = this.value.errorId) !== null && errorId !== void 0) {
          return errorId;
        } else {
          return null;
        }
      }
      get errorName() {
        return this.value.template.errorName;
      }
      get extra() {
        return this.value.extra;
      }
      get fqErrorName() {
        return this.packageName + '/' + this.errorName;
      }
      get packageName() {
        return this.value.template.packageName;
      }
      get status() {
        return this.value.template.status;
      }
      get template() {
        return this.value.template;
      }
    };
    exports.StructuredProblemReport = StructuredProblemReport;
  });
  var requirePackageErrorTable = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.ERROR_TABLE =
      exports.PackageErrorTable =
      exports.PACKAGE_NAME =
        void 0;
    exports.PACKAGE_NAME = '@ganbarodigital/ts-lib-error-reporting/lib/v1';
    var PackageErrorTable = class {
      constructor() {
        this['http-status-code-out-of-range'] = {
          packageName: exports.PACKAGE_NAME,
          errorName: 'http-status-code-out-of-range',
          detail: 'input falls outside the range of a valid HTTP status code',
          status: 422,
        };
        this['invalid-package-name'] = {
          packageName: exports.PACKAGE_NAME,
          errorName: 'invalid-package-name',
          detail: "package name does not meet spec 'isPackageName()'",
          status: 422,
        };
        this['not-an-integer'] = {
          packageName: exports.PACKAGE_NAME,
          errorName: 'not-an-integer',
          detail: 'input must be an integer; was a float',
          status: 422,
        };
        this['not-implemented'] = {
          packageName: exports.PACKAGE_NAME,
          errorName: 'not-implemented',
          detail: 'this function or feature has not been implemented',
          status: 500,
        };
        this['unreachable-code'] = {
          packageName: exports.PACKAGE_NAME,
          errorName: 'unreachable-code',
          status: 500,
          detail: 'this code should never execute',
        };
      }
    };
    exports.PackageErrorTable = PackageErrorTable;
    exports.ERROR_TABLE = new PackageErrorTable();
  });
  var requireHttpStatusCodeOutOfRange = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.HttpStatusCodeOutOfRangeError = void 0;
    var appErrorModule = requireAppErrorClass();
    var sprModule = requireStructuredProblemReport();
    var errorTableModule = requirePackageErrorTable();
    var HttpStatusCodeOutOfRangeError = class extends appErrorModule.AppError {
      constructor(params) {
        let report = {
          template:
            errorTableModule.ERROR_TABLE['http-status-code-out-of-range'],
          errorId: params.errorId,
          extra: {
            public: params.public,
          },
        };
        super(sprModule.StructuredProblemReport.from(report));
      }
    };
    exports.HttpStatusCodeOutOfRangeError = HttpStatusCodeOutOfRangeError;
  });
  var requireNotAnInteger = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.NotAnIntegerError = void 0;
    var appErrorModule = requireAppErrorClass();
    var sprModule = requireStructuredProblemReport();
    var errorTableModule = requirePackageErrorTable();
    var NotAnIntegerError = class extends appErrorModule.AppError {
      constructor(params) {
        let report = {
          template: errorTableModule.ERROR_TABLE['not-an-integer'],
          errorId: params.errorId,
          extra: {
            public: params.public,
          },
        };
        super(sprModule.StructuredProblemReport.from(report));
      }
    };
    exports.NotAnIntegerError = NotAnIntegerError;
  });
  var requireMustBeHttpStatusCode = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.mustBeHttpStatusCode = void 0;
    var httpStatusModule = requireHttpStatusCodeIndex();
    var outOfRangeModule = requireHttpStatusCodeOutOfRange();
    var notIntegerModule = requireNotAnInteger();
    var throwModule = requireOnErrorIndex();
    function mustBeHttpStatusCode(
      value,
      onError = throwModule.THROW_THE_ERROR,
    ) {
      if (value >>> 0 !== value) {
        onError(
          new notIntegerModule.NotAnIntegerError({
            public: {
              input: value,
            },
          }),
        );
      }
      if (!httpStatusModule.isHttpStatusCode(value)) {
        onError(
          new outOfRangeModule.HttpStatusCodeOutOfRangeError({
            public: {
              input: value,
            },
          }),
        );
      }
    }
    exports.mustBeHttpStatusCode = mustBeHttpStatusCode;
  });
  var requireHttpStatusCodeIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireHttpStatusCodeType(), exports);
    exportStar(requireHttpStatusCodeFrom(), exports);
    exportStar(requireIsHttpStatusCode(), exports);
    exportStar(requireMustBeHttpStatusCode(), exports);
  });
  var requireErHttpStatusCodes = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    var httpStatusModule = requireHttpStatusCodeIndex();
    Object.defineProperty(exports, 'isHttpStatusCode', {
      enumerable: !0,
      get: function () {
        return httpStatusModule.isHttpStatusCode;
      },
    });
    Object.defineProperty(exports, 'mustBeHttpStatusCode', {
      enumerable: !0,
      get: function () {
        return httpStatusModule.mustBeHttpStatusCode;
      },
    });
    Object.defineProperty(exports, 'httpStatusCodeFrom', {
      enumerable: !0,
      get: function () {
        return httpStatusModule.httpStatusCodeFrom;
      },
    });
  });
  var requireErHttpStatusCodesIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireErHttpStatusCodes(), exports);
  });
  var requireAnyAppError = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireAppErrorParams = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireAppErrorIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireAppErrorClass(), exports);
    exportStar(requireAnyAppError(), exports);
    exportStar(requireAppErrorParams(), exports);
  });
  var requireErrorTableType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireErrorTableIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireErrorTableType(), exports);
  });
  var requireErrorTableTemplateType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireErrorTableTemplateIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireErrorTableTemplateType(), exports);
  });
  var requireInvalidPackageName = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.InvalidPackageNameError = void 0;
    var appErrorModule = requireAppErrorClass();
    var sprModule = requireStructuredProblemReport();
    var errorTableModule = requirePackageErrorTable();
    var InvalidPackageNameError = class extends appErrorModule.AppError {
      constructor(params) {
        let report = {
          template: errorTableModule.ERROR_TABLE['invalid-package-name'],
          errorId: params.errorId,
          extra: {
            public: params.public,
          },
        };
        super(sprModule.StructuredProblemReport.from(report));
      }
    };
    exports.InvalidPackageNameError = InvalidPackageNameError;
  });
  var requireNotImplemented = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.NotImplementedError = void 0;
    var appErrorModule = requireAppErrorClass();
    var sprModule = requireStructuredProblemReport();
    var errorTableModule = requirePackageErrorTable();
    var NotImplementedError = class extends appErrorModule.AppError {
      constructor(params = {}) {
        let report = {
          template: errorTableModule.ERROR_TABLE['not-implemented'],
          errorId: params.errorId,
        };
        super(sprModule.StructuredProblemReport.from(report));
      }
    };
    exports.NotImplementedError = NotImplementedError;
  });
  var requireUnreachableCode = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.UnreachableCodeError = void 0;
    var appErrorModule = requireAppErrorClass();
    var sprModule = requireStructuredProblemReport();
    var errorTableModule = requirePackageErrorTable();
    var UnreachableCodeError = class extends appErrorModule.AppError {
      constructor(params) {
        let report = {
          template: errorTableModule.ERROR_TABLE['unreachable-code'],
          errorId: params.errorId,
          extra: {
            logsOnly: params.logsOnly,
          },
        };
        super(sprModule.StructuredProblemReport.from(report));
      }
    };
    exports.UnreachableCodeError = UnreachableCodeError;
  });
  var requireErrorsIndex = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    var outOfRangeModule = requireHttpStatusCodeOutOfRange();
    Object.defineProperty(exports, 'HttpStatusCodeOutOfRangeError', {
      enumerable: !0,
      get: function () {
        return outOfRangeModule.HttpStatusCodeOutOfRangeError;
      },
    });
    var invalidPackageNameModule = requireInvalidPackageName();
    Object.defineProperty(exports, 'InvalidPackageNameError', {
      enumerable: !0,
      get: function () {
        return invalidPackageNameModule.InvalidPackageNameError;
      },
    });
    var notIntegerModule = requireNotAnInteger();
    Object.defineProperty(exports, 'NotAnIntegerError', {
      enumerable: !0,
      get: function () {
        return notIntegerModule.NotAnIntegerError;
      },
    });
    var notImplementedModule = requireNotImplemented();
    Object.defineProperty(exports, 'NotImplementedError', {
      enumerable: !0,
      get: function () {
        return notImplementedModule.NotImplementedError;
      },
    });
    var unreachableCodeModule = requireUnreachableCode();
    Object.defineProperty(exports, 'UnreachableCodeError', {
      enumerable: !0,
      get: function () {
        return unreachableCodeModule.UnreachableCodeError;
      },
    });
  });
  var requireAllExtraData = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireExtraDataTemplate = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireExtraLogsOnlyData = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireExtraPublicData = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireNoExtraDataTemplate = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireExtraDataIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireAllExtraData(), exports);
    exportStar(requireExtraDataTemplate(), exports);
    exportStar(requireExtraLogsOnlyData(), exports);
    exportStar(requireExtraPublicData(), exports);
    exportStar(requireNoExtraDataTemplate(), exports);
  });
  var requireExtractReasonFromCaught = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.extractReasonFromCaught = exports.DEFAULT_ERROR_REASON = void 0;
    exports.DEFAULT_ERROR_REASON = 'no error information available';
    function extractReasonFromCaught(caught, { stackTrace = !1 } = {}) {
      let reason = exports.DEFAULT_ERROR_REASON;
      if (caught instanceof Error) {
        if (stackTrace && caught.stack) {
          reason = caught.stack;
        } else {
          reason = caught.toString();
        }
        return reason;
      } else {
        if (
          !(
            caught === null
            || caught === void 0
            || (typeof caught == 'number' && isNaN(caught))
            || typeof caught == 'boolean'
          )
        ) {
          if (
            caught.toString !== void 0
            && typeof caught.toString == 'function'
            && caught.toString !== Object.prototype.toString
          ) {
            reason = caught.toString();
          }
        }
        return reason;
      }
    }
    exports.extractReasonFromCaught = extractReasonFromCaught;
  });
  var requireExtractStackFromCaught = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.extractStackFromCaught = void 0;
    function extractStackFromCaught(caught) {
      if (caught instanceof Error) {
        return caught.stack.substring(
          caught.stack.indexOf(`
`) + 1,
        );
      } else {
        return '';
      }
    }
    exports.extractStackFromCaught = extractStackFromCaught;
  });
  var requireHelpersIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireExtractReasonFromCaught(), exports);
    exportStar(requireExtractStackFromCaught(), exports);
  });
  var requireSprDataWithExtra = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireSprDataNoExtra = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireSprIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireStructuredProblemReport(), exports);
    exportStar(requireSprDataWithExtra(), exports);
    exportStar(requireSprDataNoExtra(), exports);
  });
  var requireErrorReporting = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireAppErrorIndex(), exports);
    exportStar(requireErrorTableIndex(), exports);
    exportStar(requireErrorTableTemplateIndex(), exports);
    exportStar(requireErrorsIndex(), exports);
    exportStar(requireExtraDataIndex(), exports);
    exportStar(requireHelpersIndex(), exports);
    exportStar(requireOnErrorIndex(), exports);
    exportStar(requireSprIndex(), exports);
  });
  var requirePackagenameErrorTable = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    var errorTableModule = requirePackageErrorTable();
    Object.defineProperty(exports, 'PackageErrorTable', {
      enumerable: !0,
      get: function () {
        return errorTableModule.PackageErrorTable;
      },
    });
    var errorsModule = requireErrorReporting();
    Object.defineProperty(exports, 'InvalidPackageNameError', {
      enumerable: !0,
      get: function () {
        return errorsModule.InvalidPackageNameError;
      },
    });
  });
  var requirePackageNameType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireIsPackageNameData = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.isPackageNameData = exports.PackageNameDataRegex = void 0;
    exports.PackageNameDataRegex = new RegExp(
      '^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]+(/[A-Za-z0-9-~][A-Za-z0-9-._~]+)*$',
    );
    function isPackageNameData(value) {
      return exports.PackageNameDataRegex.test(value);
    }
    exports.isPackageNameData = isPackageNameData;
  });
  var requireMustBePackageNameData = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.mustBePackageNameData = void 0;
    var errorsModule = requireErrorsIndex();
    var throwModule = requireOnError();
    var packageNameDataModule = requireIsPackageNameData();
    function mustBePackageNameData(
      value,
      onError = throwModule.THROW_THE_ERROR,
    ) {
      if (!packageNameDataModule.isPackageNameData(value)) {
        onError(
          new errorsModule.InvalidPackageNameError({
            public: {
              packageName: value,
            },
          }),
        );
      }
    }
    exports.mustBePackageNameData = mustBePackageNameData;
  });
  var requirePackageNameFrom = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.packageNameFrom = void 0;
    var throwModule = requireOnErrorIndex();
    var mustBeModule = requireMustBePackageNameData();
    function packageNameFrom(value, onError = throwModule.THROW_THE_ERROR) {
      mustBeModule.mustBePackageNameData(value, onError);
      return value;
    }
    exports.packageNameFrom = packageNameFrom;
  });
  var requirePackageNameIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requirePackageNameType(), exports);
    exportStar(requireIsPackageNameData(), exports);
    exportStar(requireMustBePackageNameData(), exports);
    exportStar(requirePackageNameFrom(), exports);
  });
  var requirePackagenamePkg = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requirePackageNameIndex(), exports);
  });
  var requirePackagename = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requirePackagenameErrorTable(), exports);
    exportStar(requirePackagenamePkg(), exports);
  });
  var requireMtErrorTable = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.ERROR_TABLE = exports.PackageErrorTable = void 0;
    var httpStatusModule = requireErHttpStatusCodesIndex();
    var packageNameModule = requirePackagename();
    var packageName = packageNameModule.packageNameFrom(
      '@ganbarodigital/ts-lib-mediatypes',
    );
    var PackageErrorTable = class {
      constructor() {
        this['mediatypematchregex-is-broken'] = {
          packageName: packageName,
          errorName: 'mediatypematchregex-is-broken',
          detail:
            'the MediaTypeMatchRegex no longer returns the expected named groups',
          status: httpStatusModule.httpStatusCodeFrom(500),
        };
        this['not-a-content-type'] = {
          packageName: packageName,
          errorName: 'not-a-content-type',
          detail:
            'the given string does not have the structure of a ContentType',
          status: httpStatusModule.httpStatusCodeFrom(422),
        };
        this['not-a-media-type'] = {
          packageName: packageName,
          errorName: 'not-a-media-type',
          detail: 'the given string does not have the structure of a MediaType',
          status: httpStatusModule.httpStatusCodeFrom(422),
        };
        this['unexpected-content-type'] = {
          packageName: packageName,
          errorName: 'unexpected-content-type',
          detail:
            'the given MediaType does not match any of the expected content types',
          status: httpStatusModule.httpStatusCodeFrom(422),
        };
      }
    };
    exports.PackageErrorTable = PackageErrorTable;
    exports.ERROR_TABLE = new PackageErrorTable();
  });
  var requireNotAContentType = defineCommonjsModule(notAContentTypeExports => {
    'use strict';

    Object.defineProperty(notAContentTypeExports, '__esModule', {
      value: !0,
    });
    notAContentTypeExports.NotAContentTypeError = void 0;
    var errorReportingModule = requireErrorReporting();
    var mtErrorsModule = requireMtErrors();
    var NotAContentTypeErrorClass = class
      extends errorReportingModule.AppError
    {
      constructor(errorParams) {
        let reportData = {
          template: mtErrorsModule.ERROR_TABLE['not-a-content-type'],
          errorId: errorParams.errorId,
          extra: {
            public: errorParams.public,
          },
        };
        super(errorReportingModule.StructuredProblemReport.from(reportData));
      }
    };
    notAContentTypeExports.NotAContentTypeError = NotAContentTypeErrorClass;
  });
  var requireNotAMediaType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.NotAMediaTypeError = void 0;
    var errorsModule = requireErrorReporting();
    var errorTableModule = requireMtErrors();
    var NotAMediaTypeError = class extends errorsModule.AppError {
      constructor(params) {
        let report = {
          template: errorTableModule.ERROR_TABLE['not-a-media-type'],
          errorId: params.errorId,
          extra: {
            public: params.public,
          },
        };
        super(errorsModule.StructuredProblemReport.from(report));
      }
    };
    exports.NotAMediaTypeError = NotAMediaTypeError;
  });
  var requireMediaTypeMatchRegexIsBroken = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.MediaTypeMatchRegexIsBrokenError = void 0;
    var errorsModule = requireErrorReporting();
    var errorTableModule = requireMtErrorTable();
    var MediaTypeMatchRegexIsBrokenError = class extends errorsModule.AppError {
      constructor(params) {
        let report = {
          template:
            errorTableModule.ERROR_TABLE['mediatypematchregex-is-broken'],
          errorId: params.errorId,
          extra: null,
        };
        super(errorsModule.StructuredProblemReport.from(report));
      }
    };
    exports.MediaTypeMatchRegexIsBrokenError = MediaTypeMatchRegexIsBrokenError;
  });
  var requireUnexpectedContentType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.UnexpectedContentTypeError = void 0;
    var errorsModule = requireErrorReporting();
    var errorTableModule = requireMtErrors();
    var UnexpectedContentTypeError = class extends errorsModule.AppError {
      constructor(params) {
        let report = {
          template: errorTableModule.ERROR_TABLE['unexpected-content-type'],
          errorId: params.errorId,
          extra: {
            public: params.public,
          },
        };
        super(errorsModule.StructuredProblemReport.from(report));
      }
    };
    exports.UnexpectedContentTypeError = UnexpectedContentTypeError;
  });
  var requireMtErrors = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    var errorTableModule = requireMtErrorTable();
    Object.defineProperty(exports, 'ERROR_TABLE', {
      enumerable: !0,
      get: function () {
        return errorTableModule.ERROR_TABLE;
      },
    });
    var notAContentTypeModule = requireNotAContentType();
    Object.defineProperty(exports, 'NotAContentTypeError', {
      enumerable: !0,
      get: function () {
        return notAContentTypeModule.NotAContentTypeError;
      },
    });
    var notAMediaTypeModule = requireNotAMediaType();
    Object.defineProperty(exports, 'NotAMediaTypeError', {
      enumerable: !0,
      get: function () {
        return notAMediaTypeModule.NotAMediaTypeError;
      },
    });
    var regexBrokenModule = requireMediaTypeMatchRegexIsBroken();
    Object.defineProperty(exports, 'MediaTypeMatchRegexIsBrokenError', {
      enumerable: !0,
      get: function () {
        return regexBrokenModule.MediaTypeMatchRegexIsBrokenError;
      },
    });
    var unexpectedContentTypeModule = requireUnexpectedContentType();
    Object.defineProperty(exports, 'UnexpectedContentTypeError', {
      enumerable: !0,
      get: function () {
        return unexpectedContentTypeModule.UnexpectedContentTypeError;
      },
    });
  });
  var requireMediaTypeParts = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireMtRegexes = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.MediaTypeParamRegex =
      exports.MediaTypeMatchRegex =
      exports.ContentTypeMatchRegex =
        void 0;
    exports.ContentTypeMatchRegex =
      /^(?<contentType>(?<type>[A-Za-z0-9][-\w!#$&^]*)\/((?<tree>[A-Za-z0-9][\w\d-!#$&^]*)\.){0,1}(?<subtype>[^+()<>@,;:\\/"[\]?=+]+)(\+(?<suffix>[\w\d]+)){0,1})$/;
    exports.MediaTypeMatchRegex =
      /^(?<contentType>(?<type>[A-Za-z0-9][-\w!#$&^]*)\/((?<tree>[A-Za-z0-9][\w\d-!#$&^]*)\.){0,1}(?<subtype>[^+()<>@,;:\\/"[\]?=+]+)(\+(?<suffix>[\w\d]+)){0,1})(;[\s]+(?<parameter>[\w\d]+=([^+()<>@,;:\\/"[\]?=]+|"[^"]*\")))*$/;
    exports.MediaTypeParamRegex =
      /(;[\s]+((?<parameterName>[\w\d]+)=((?<parameterValueA>[^+()<>@,;:\\/"[\]?=+]+)|"(?<parameterValueB>[^"]*)")))/g;
  });
  var requireIsContentType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.isContentType = void 0;
    var regexModule = requireMtRegexes();
    function isContentType(value) {
      return regexModule.ContentTypeMatchRegex.test(value);
    }
    exports.isContentType = isContentType;
  });
  var requireMustBeContentType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.mustBeContentType = void 0;
    var throwModule = requireErrorReporting();
    var errorsModule = requireMtErrors();
    var isContentTypeModule = requireIsContentType();
    function mustBeContentType(value, onError = throwModule.THROW_THE_ERROR) {
      if (!isContentTypeModule.isContentType(value)) {
        onError(
          new errorsModule.NotAContentTypeError({
            public: {
              input: value,
            },
          }),
        );
      }
    }
    exports.mustBeContentType = mustBeContentType;
  });
  var requireContentTypeFrom = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports._contentTypeFrom = exports.contentTypeFrom = void 0;
    var throwModule = requireErrorReporting();
    var mustBeModule = requireMustBeContentType();
    exports.contentTypeFrom = _contentTypeFrom.bind(null, value =>
      value.toLowerCase(),
    );
    function _contentTypeFrom(
      transform,
      input,
      onError = throwModule.THROW_THE_ERROR,
    ) {
      mustBeModule.mustBeContentType(input, onError);
      return transform(input);
    }
    exports._contentTypeFrom = _contentTypeFrom;
  });
  var requireContentTypeFromMediaType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports._contentTypeFromMediaType = exports.contentTypeFromMediaType =
      void 0;
    var throwModule = requireErrorReporting();
    var errorsModule = requireMtErrors();
    var regexModule = requireMtRegexes();
    var regexBrokenModule = requireMediaTypeMatchRegexIsBroken();
    var contentTypeModule = requireContentTypeFrom();
    exports.contentTypeFromMediaType = _contentTypeFromMediaType.bind(
      null,
      regexModule.MediaTypeMatchRegex,
      value => value.toLowerCase(),
    );
    function _contentTypeFromMediaType(
      regex,
      transform,
      input,
      onError = throwModule.THROW_THE_ERROR,
    ) {
      let inputStr = input.valueOf();
      let match = regex.exec(inputStr);
      if (match === null) {
        throw onError(
          new errorsModule.NotAMediaTypeError({
            public: {
              input: inputStr,
            },
          }),
        );
      }
      if (match.groups === void 0) {
        throw onError(
          new regexBrokenModule.MediaTypeMatchRegexIsBrokenError({}),
        );
      }
      return contentTypeModule._contentTypeFrom(
        transform,
        match.groups.contentType,
      );
    }
    exports._contentTypeFromMediaType = _contentTypeFromMediaType;
  });
  var requireContentTypeIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireMediaTypeParts(), exports);
    var contentTypeFromModule = requireContentTypeFrom();
    Object.defineProperty(exports, 'contentTypeFrom', {
      enumerable: !0,
      get: function () {
        return contentTypeFromModule.contentTypeFrom;
      },
    });
    var contentTypeFromMediaTypeModule = requireContentTypeFromMediaType();
    Object.defineProperty(exports, 'contentTypeFromMediaType', {
      enumerable: !0,
      get: function () {
        return contentTypeFromMediaTypeModule.contentTypeFromMediaType;
      },
    });
    exportStar(requireIsContentType(), exports);
    exportStar(requireMustBeContentType(), exports);
  });
  var requireIsMediaType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.isMediaType = void 0;
    var regexModule = requireMtRegexes();
    function isMediaType(value) {
      return regexModule.MediaTypeMatchRegex.test(value);
    }
    exports.isMediaType = isMediaType;
  });
  var requireMediaTypeData = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireResolveToContentType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.resolveToContentType = void 0;
    var mediaTypeModule = requireMediaTypeIndex();
    var contentTypeModule = requireContentTypeIndex();
    function resolveToContentType(value) {
      if (value instanceof mediaTypeModule.MediaType) {
        return contentTypeModule.contentTypeFromMediaType(value);
      } else {
        return value;
      }
    }
    exports.resolveToContentType = resolveToContentType;
  });
  var requireResolveToMediaType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.resolveToMediaType = void 0;
    var mediaTypeModule = requireMediaTypeIndex();
    function resolveToMediaType(value) {
      if (value instanceof mediaTypeModule.MediaType) {
        return value;
      } else {
        return new mediaTypeModule.MediaType(value);
      }
    }
    exports.resolveToMediaType = resolveToMediaType;
  });
  var requireContentTypePkg = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireMediaTypeData(), exports);
    exportStar(requireResolveToContentType(), exports);
    exportStar(requireResolveToMediaType(), exports);
  });
  var requireMatchesContentType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.matchesContentType = void 0;
    var contentTypeModule = requireContentTypePkg();
    function matchesContentType(value, list) {
      let resolved = contentTypeModule.resolveToContentType(value);
      return list.some(item => {
        let itemResolved = contentTypeModule.resolveToContentType(item);
        return resolved === itemResolved;
      });
    }
    exports.matchesContentType = matchesContentType;
  });
  var requireMustBeMediaType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.mustBeMediaType = void 0;
    var throwModule = requireErrorReporting();
    var errorsModule = requireMtErrors();
    var isMediaTypeModule = requireIsMediaType();
    function mustBeMediaType(value, onError = throwModule.THROW_THE_ERROR) {
      if (!isMediaTypeModule.isMediaType(value)) {
        onError(
          new errorsModule.NotAMediaTypeError({
            public: {
              input: value,
            },
          }),
        );
      }
    }
    exports.mustBeMediaType = mustBeMediaType;
  });
  var requireMustMatchContentType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.mustMatchContentType = void 0;
    var throwModule = requireErrorReporting();
    var errorsModule = requireUnexpectedContentType();
    var matchesModule = requireMatchesContentType();
    var contentTypeModule = requireContentTypePkg();
    function mustMatchContentType(
      value,
      list,
      onError = throwModule.THROW_THE_ERROR,
    ) {
      if (matchesModule.matchesContentType(value, list)) {
        return;
      }
      let resolvedList = list.map(item =>
        contentTypeModule.resolveToContentType(item),
      );
      onError(
        new errorsModule.UnexpectedContentTypeError({
          public: {
            input: contentTypeModule.resolveToContentType(value),
            required: {
              anyOf: resolvedList,
            },
          },
        }),
      );
    }
    exports.mustMatchContentType = mustMatchContentType;
  });
  var requireDataCoercion = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireDataGuard = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireEntityType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireEntityObject = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.EntityObject = void 0;
    var EntityObject = class {
      constructor(value) {
        this.value = value;
      }
      valueOf() {
        return this.value;
      }
      isEntity() {
        return !0;
      }
    };
    exports.EntityObject = EntityObject;
  });
  var requireTypeGuard = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireValueType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireValueObjectType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireErInternalTypes = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireValueType(), exports);
    exportStar(requireValueObjectType(), exports);
    exportStar(requireErValueObject(), exports);
  });
  var requireVoTypesIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireDataCoercion(), exports);
    exportStar(requireDataGuard(), exports);
    exportStar(requireEntityType(), exports);
    exportStar(requireEntityObject(), exports);
    exportStar(requireTypeGuard(), exports);
    var valueObjectModule = requireErInternalTypes();
    Object.defineProperty(exports, 'ValueObject', {
      enumerable: !0,
      get: function () {
        return valueObjectModule.ValueObject;
      },
    });
  });
  var requireRefinedType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.RefinedType = void 0;
    var valueObjectModule = requireVoTypesIndex();
    var RefinedType = class extends valueObjectModule.ValueObject {
      constructor(value, mustBe, onError) {
        mustBe(value, onError);
        super(value);
      }
    };
    exports.RefinedType = RefinedType;
  });
  var requireRefinedPrimitive = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.RefinedPrimitive = void 0;
    var refinedTypeModule = requireRefinedType();
    var RefinedPrimitive = class extends refinedTypeModule.RefinedType {};
    exports.RefinedPrimitive = RefinedPrimitive;
  });
  var requireRefinedNumber = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.RefinedNumber = void 0;
    var refinedPrimitiveModule = requireRefinedPrimitive();
    var RefinedNumber = class extends refinedPrimitiveModule.RefinedPrimitive {
      [Symbol.toPrimitive](hint) {
        if (hint === 'string') {
          return this.value.toString();
        } else {
          return this.value;
        }
      }
    };
    exports.RefinedNumber = RefinedNumber;
  });
  var requireRefinedString = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.RefinedString = void 0;
    var refinedPrimitiveModule = requireRefinedPrimitive();
    var RefinedString = class extends refinedPrimitiveModule.RefinedPrimitive {
      [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
          return null;
        } else {
          return this.value;
        }
      }
    };
    exports.RefinedString = RefinedString;
  });
  var requireVoRefinement = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireRefinedNumber(), exports);
    exportStar(requireRefinedPrimitive(), exports);
    exportStar(requireRefinedString(), exports);
    exportStar(requireRefinedType(), exports);
  });
  var requireRefinedFactoryTypes = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireMakeRefinedTypeFactory = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.makeRefinedTypeFactory = void 0;
    var throwModule = requireOnError();
    exports.makeRefinedTypeFactory =
      (mustBe, onError = throwModule.THROW_THE_ERROR) =>
      (value, onErrorArg = onError) => (mustBe(value, onErrorArg), value);
  });
  var requireMakeRefinedTypeFactoryWithFormatter = defineCommonjsModule(
    exports => {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: !0,
      });
      exports.makeRefinedTypeFactoryWithFormatter = void 0;
      var throwModule = requireOnError();
      exports.makeRefinedTypeFactoryWithFormatter =
        (mustBe, format, onError = throwModule.THROW_THE_ERROR) =>
        (value, onErrorArg = onError) => (
          mustBe(value, onErrorArg),
          format(value)
        );
    },
  );
  var requireRefinedFormatterTypes = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireVoFactories = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireRefinedFactoryTypes(), exports);
    exportStar(requireMakeRefinedTypeFactory(), exports);
    exportStar(requireMakeRefinedTypeFactoryWithFormatter(), exports);
    exportStar(requireRefinedFormatterTypes(), exports);
  });
  var requireVoNominals = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireVoFactories(), exports);
  });
  var requireValueObjects = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireVoRefinement(), exports);
    exportStar(requireVoNominals(), exports);
    exportStar(requireVoTypesIndex(), exports);
  });
  var requireParseContentType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports._parseContentType = exports.parseContentType = void 0;
    var throwModule = requireErrorReporting();
    var errorsModule = requireMtErrors();
    var regexModule = requireMtRegexes();
    var contentTypeModule = requireContentTypeFrom();
    exports.parseContentType = _parseContentType.bind(
      null,
      regexModule.MediaTypeMatchRegex,
      value => value.toLowerCase(),
    );
    function _parseContentType(
      regex,
      transform,
      input,
      onError = throwModule.THROW_THE_ERROR,
    ) {
      let match = regex.exec(input);
      if (match === null) {
        throw onError(
          new errorsModule.NotAMediaTypeError({
            public: {
              input: input,
            },
          }),
        );
      }
      if (match.groups === void 0) {
        throw onError(new errorsModule.MediaTypeMatchRegexIsBrokenError({}));
      }
      return contentTypeModule._contentTypeFrom(
        transform,
        match.groups.contentType,
      );
    }
    exports._parseContentType = _parseContentType;
  });
  var requireParseMediaType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.parseMediaTypeUnbound = exports.parseMediaType = void 0;
    var throwModule = requireErrorReporting();
    var errorsModule = requireMtErrors();
    var regexBrokenModule = requireMediaTypeMatchRegexIsBroken();
    var regexModule = requireMtRegexes();
    exports.parseMediaType = parseMediaTypeUnbound.bind(
      null,
      regexModule.MediaTypeMatchRegex,
      regexModule.MediaTypeParamRegex,
    );
    function parseMediaTypeUnbound(
      regex,
      paramRegex,
      input,
      onError = throwModule.THROW_THE_ERROR,
      normalize = value => value.toLocaleLowerCase(),
    ) {
      let match = regex.exec(input);
      if (match === null) {
        throw onError(
          new errorsModule.NotAMediaTypeError({
            public: {
              input: input,
            },
          }),
        );
      }
      if (match.groups === void 0) {
        throw onError(
          new regexBrokenModule.MediaTypeMatchRegexIsBrokenError({}),
        );
      }
      let result = {
        type: normalize(match.groups.type),
        subtype: normalize(match.groups.subtype),
      };
      if (match.groups.tree) {
        result.tree = normalize(match.groups.tree);
      }
      if (match.groups.suffix) {
        result.suffix = normalize(match.groups.suffix);
      }
      let paramMatch = paramRegex.exec(input);
      if (paramMatch !== null) {
        for (
          result.parameters = {};
          paramMatch !== null && paramMatch.groups !== void 0;
        ) {
          let paramName = normalize(paramMatch.groups.parameterName);
          result.parameters[paramName] =
            paramMatch.groups.parameterValueA
            || paramMatch.groups.parameterValueB;
          paramMatch = paramRegex.exec(input);
        }
      }
      return result;
    }
    exports.parseMediaTypeUnbound = parseMediaTypeUnbound;
  });
  var requireMediaTypeClass = defineCommonjsModule(exports => {
    'use strict';

    var classPrivateFieldGet =
      (exports && exports.__classPrivateFieldGet)
      || function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return privateMap.get(receiver);
      };
    var classPrivateFieldSet =
      (exports && exports.__classPrivateFieldSet)
      || function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError('attempted to set private field on non-instance');
        }
        privateMap.set(receiver, value);
        return value;
      };
    var contentTypeCache;
    var parsedCache;
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.MediaType = void 0;
    var throwModule = requireErrorReporting();
    var refinedStringModule = requireValueObjects();
    var mustBeModule = requireMustBeMediaType();
    var parseContentTypeModule = requireParseContentType();
    var parseMediaTypeModule = requireParseMediaType();
    var MediaType = class MediaType extends refinedStringModule.RefinedString {
      constructor(value, onError = throwModule.THROW_THE_ERROR) {
        super(value, mustBeModule.mustBeMediaType, onError);
        contentTypeCache.set(this, void 0);
        parsedCache.set(this, void 0);
      }
      static from(value, onError = throwModule.THROW_THE_ERROR) {
        return new MediaType(value, onError);
      }
      getContentType() {
        if (!classPrivateFieldGet(this, contentTypeCache)) {
          classPrivateFieldSet(
            this,
            contentTypeCache,
            parseContentTypeModule.parseContentType(this.valueOf()),
          );
        }
        return classPrivateFieldGet(this, contentTypeCache);
      }
      parse() {
        if (!classPrivateFieldGet(this, parsedCache)) {
          classPrivateFieldSet(
            this,
            parsedCache,
            parseMediaTypeModule.parseMediaType(
              this.value,
              throwModule.THROW_THE_ERROR,
            ),
          );
        }
        return classPrivateFieldGet(this, parsedCache);
      }
    };
    exports.MediaType = MediaType;
    contentTypeCache = new WeakMap();
    parsedCache = new WeakMap();
  });
  var requireMediaTypeFrom = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exports.mediaTypeFrom = void 0;
    var mediaTypeModule = requireMediaTypeClass();
    exports.mediaTypeFrom = mediaTypeModule.MediaType.from;
  });
  var requireMediaTypeType = defineCommonjsModule(exports => {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
  });
  var requireMediaTypeIndex = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireIsMediaType(), exports);
    exportStar(requireMatchesContentType(), exports);
    exportStar(requireMustBeMediaType(), exports);
    exportStar(requireMustMatchContentType(), exports);
    exportStar(requireMediaTypeFrom(), exports);
    exportStar(requireMediaTypeClass(), exports);
    exportStar(requireMediaTypeType(), exports);
    exportStar(requireParseContentType(), exports);
    exportStar(requireParseMediaType(), exports);
  });
  var requireMediatypes = defineCommonjsModule(exports => {
    'use strict';

    var createBinding =
      (exports && exports.__createBinding)
      || (Object.create
        ? function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            Object.defineProperty(target, destKey, {
              enumerable: !0,
              get: function () {
                return source[key];
              },
            });
          }
        : function (target, source, key, destKey) {
            if (destKey === void 0) {
              destKey = key;
            }
            target[destKey] = source[key];
          });
    var exportStar =
      (exports && exports.__exportStar)
      || function (source, target) {
        for (var key in source) {
          if (key !== 'default' && !target.hasOwnProperty(key)) {
            createBinding(target, source, key);
          }
        }
      };
    Object.defineProperty(exports, '__esModule', {
      value: !0,
    });
    exportStar(requireMtErrors(), exports);
    exportStar(requireContentTypeIndex(), exports);
    exportStar(requireMediaTypeIndex(), exports);
    exportStar(requireContentTypePkg(), exports);
  });
  function parseCodecs(codecStr, container, hint) {
    let defaultAudio = container.andThen(cont => cont.defacto_codecs.audio);
    let defaultVideo = container.andThen(cont => cont.defacto_codecs.video);
    let codecParts = codecStr.split(',');
    if (codecParts.length > 1) {
      let videoA = iterVideoCodecs().find(codec =>
        codec.mimetype.test(codecParts[0]),
      );
      let videoB = iterVideoCodecs().find(codec =>
        codec.mimetype.test(codecParts[1]),
      );
      let audioA = iterAudioCodecs().find(codec =>
        codec.mimetype.test(codecParts[0]),
      );
      let audioB = iterAudioCodecs().find(codec =>
        codec.mimetype.test(codecParts[1]),
      );
      let audioFallback = defaultAudio.unwrapOr('unknown');
      let videoFallback = defaultVideo.unwrapOr('unknown');
      return {
        audio: audioA
          .or(audioB)
          .map(codec => codec.name)
          .unwrapOr(audioFallback),
        video: videoA
          .or(videoB)
          .map(codec => codec.name)
          .unwrapOr(videoFallback),
      };
    } else {
      let videoCodec = iterVideoCodecs()
        .find(codec => codec.mimetype.test(codecParts[0]))
        .map(codec => codec.name);
      let audioCodec = iterAudioCodecs()
        .find(codec => codec.mimetype.test(codecParts[0]))
        .map(codec => codec.name);
      if (audioCodec.isSome()) {
        return {
          video: !1,
          audio: audioCodec.unwrap(),
        };
      } else {
        if (videoCodec.isSome()) {
          return {
            video: videoCodec.unwrap(),
            audio: !1,
          };
        } else {
          if (hint.map(kind => kind === 'audio').unwrapOr(!1)) {
            return {
              video: !1,
              audio: audioCodec.or(defaultAudio).unwrapOr('unknown'),
            };
          } else {
            return {
              video: videoCodec.or(defaultVideo).unwrapOr('unknown'),
              audio: !1,
            };
          }
        }
      }
    }
  }
  function parseMimeType(mimeType) {
    let parsed;
    try {
      parsed = (0, mediatypesEsm.mediaTypeFrom)(mimeType).parse();
    } catch (err) {
      return resultErr('parse error:' + err);
    }
    let typeHint = ResultNone;
    if (parsed.type == 'video') {
      typeHint = resultSome('video');
    }
    if (parsed.type == 'audio') {
      typeHint = resultSome('audio');
    }
    let container = iterContainers().find(cont =>
      cont.mimetype.test(parsed.subtype),
    );
    if (container.isNone()) {
      return resultErr(`Unknown container (parsed from ${parsed.subtype})`);
    }
    let codecs = parsed.parameters?.codecs ?? '';
    let avCodecs = parseCodecs(codecs, container, typeHint);
    let containerObj = container.unwrap();
    return resultOk({
      container: containerObj.name,
      av_codecs: avCodecs,
    });
  }
  var mediatypesEsm;
  var initMediaTypeSupport = defineLazyModule(() => {
    'use strict';

    mediatypesEsm = toEsm(requireMediatypes(), 1);
    initTsResultsIndex();
    initContainers();
    initCodecs();
    initIterTools();
  });
  function parseYoutubeFormat(format, protocol) {
    if (!isStringProp(format, 'mimeType')) {
      return resultErr('Missing mimeType');
    }
    let parseResult = parseMimeType(format.mimeType);
    if (parseResult.isErr()) {
      return parseResult;
    }
    let parsed = parseResult.unwrap();
    let container = containerByName(parsed.container);
    let duration = 'unknown';
    if (isStringProp(format, 'approxDurationMs')) {
      let durationSec = parseInt(format.approxDurationMs) / 1e3;
      if (durationSec) {
        duration = durationSec;
      }
    }
    let bitrate = ResultNone;
    if (isNumberProp(format, 'bitrate')) {
      bitrate = resultSome(format.bitrate);
    }
    let avTracks = matchAudioVideo(
      parsed.av_codecs,
      audioCodecName => ({
        codec: makeAudioCodec(audioCodecName),
        bitrate: bitrate,
      }),
      videoCodecName => {
        let codec = makeVideoCodec(videoCodecName);
        let fps = ResultNone;
        let dimensions = ResultNone;
        let quality = ResultNone;
        if (isNumberProp(format, 'fps')) {
          fps = resultSome(format.fps);
        }
        if (isNumberProp(format, 'width') && isNumberProp(format, 'height')) {
          dimensions = resultSome({
            height: format.height,
            width: format.width,
          });
        }
        if (isStringProp(format, 'qualityLabel')) {
          quality = preferredQualityFrom(format.qualityLabel);
        }
        if (quality.isNone() && dimensions.isSome()) {
          quality = resultSome(
            qualityLabelForHeight(dimensions.unwrap().height),
          );
        }
        return {
          codec: codec,
          bitrate: bitrate,
          fps: fps,
          dimensions: dimensions,
          quality: quality,
        };
      },
    );
    return resultOk({
      builder: 'YoutubeFormat',
      protocol: protocol,
      content_length: ResultNone,
      duration: duration,
      container: container,
      av: avTracks,
    });
  }
  var initFormatParsing = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initMediaTypeSupport();
    initCodecs();
    initContainers();
    initObjGuards();
    initProtocolTypes();
    initQualities();
  });
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
  var initMessageFormattingTypes = defineLazyModule(() => {
    'use strict';
  });
  function formatI18nMessage(key, substitutions, customStrings) {
    let fallback = () => (
      console.error(`Requesting unknown i18n string ${key}`),
      key
    );
    substitutions = substitutions.map(sub => sub.toString()).map(escapeHtml);
    try {
      if (key in customStrings) {
        let message = customStrings[key];
        let index = 1;
        for (
          let substitutionIndex = 0;
          substitutionIndex < substitutions.length;
          substitutionIndex++
        ) {
          message = message.replace(
            `$${index}`,
            substitutions[substitutionIndex],
          );
        }
        return message;
      } else {
        let message = messagePolyfill.default.i18n.getMessage(
          key,
          substitutions,
        );
        return message || fallback();
      }
    } catch {
      return fallback();
    }
  }
  var messagePolyfill;
  var initMessageFormatting = defineLazyModule(() => {
    'use strict';

    messagePolyfill = toEsm(requirePolyfill(), 1);
    initMessageFormattingTypes();
  });
  function renderIconImage(instructions, cache) {
    let { size, spread, radius, greyed, channel } = instructions;
    let cacheKey = JSON.stringify({
      instructions: instructions,
    });
    let cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    let ctx = new OffscreenCanvas(size, size).getContext('2d');
    ctx.lineCap = 'round';
    let centerX = size / 2 - 5;
    let centerY = size / 2;
    let offsetX = spread * Math.sin(Math.PI / 6);
    let offsetY = spread * Math.cos(Math.PI / 6);
    let drawCircle = (alpha, circleX, circleY, fillStyle, circleRadius) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI, !1);
      ctx.fillStyle = fillStyle;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };
    let gradientBlue = ctx.createLinearGradient(
      size,
      size * 0.5,
      size * 0.5,
      size * 0.5,
    );
    gradientBlue.addColorStop(0.1652, '#A6DEEF');
    gradientBlue.addColorStop(0.3949, '#6CC5F0');
    gradientBlue.addColorStop(0.8805, '#355BAA');
    let gradientYellow = ctx.createLinearGradient(
      size * 0.3,
      size * 0.25,
      size * 0.6,
      size * 0.6,
    );
    gradientYellow.addColorStop(0, '#FFF200');
    gradientYellow.addColorStop(1, '#FFCE07');
    let gradientRed = ctx.createLinearGradient(
      size * 0.5,
      size * 0.5,
      size * 0.5,
      size,
    );
    gradientRed.addColorStop(0, '#EC223B');
    gradientRed.addColorStop(0.2577, '#E42339');
    gradientRed.addColorStop(0.492, '#D42634');
    gradientRed.addColorStop(0.7172, '#BD292C');
    gradientRed.addColorStop(0.9354, '#9E2B22');
    gradientRed.addColorStop(1, '#942B1F');
    let ringDelta = 0.2;
    let outlineColor = '#666';
    if (
      (channel == 'beta' && (outlineColor = 'green'),
      channel == 'dev' && (outlineColor = '#F06'),
      drawCircle(
        1,
        centerX + spread,
        centerY,
        outlineColor,
        radius * (1 + ringDelta),
      ),
      drawCircle(
        1,
        centerX - offsetX,
        centerY - offsetY,
        outlineColor,
        radius * (1 + ringDelta),
      ),
      drawCircle(
        1,
        centerX - offsetX,
        centerY + offsetY,
        outlineColor,
        radius * (1 + ringDelta),
      ),
      (ctx.globalCompositeOperation = 'destination-out'),
      drawCircle(
        1,
        centerX + spread,
        centerY,
        '#FFF',
        radius * (1 - ringDelta),
      ),
      drawCircle(
        1,
        centerX - offsetX,
        centerY - offsetY,
        '#FFF',
        radius * (1 - ringDelta),
      ),
      drawCircle(
        1,
        centerX - offsetX,
        centerY + offsetY,
        '#FFF',
        radius * (1 - ringDelta),
      ),
      (ctx.globalCompositeOperation = 'source-over'),
      !greyed)
    ) {
      drawCircle(1, centerX + spread, centerY, 'white', radius);
      drawCircle(1, centerX - offsetX, centerY - offsetY, 'white', radius);
      drawCircle(1, centerX - offsetX, centerY + offsetY, 'white', radius);
      drawCircle(1, centerX + spread, centerY, gradientBlue, radius);
      drawCircle(
        0.9,
        centerX - offsetX,
        centerY - offsetY,
        gradientYellow,
        radius,
      );
      drawCircle(
        0.85,
        centerX - offsetX,
        centerY + offsetY,
        gradientRed,
        radius,
      );
    } else {
      let greyGradient = ctx.createLinearGradient(0, 0, size, size);
      greyGradient.addColorStop(0, '#333');
      greyGradient.addColorStop(1, '#CCC');
      drawCircle(1, centerX + spread, centerY, 'white', radius);
      drawCircle(1, centerX - offsetX, centerY - offsetY, 'white', radius);
      drawCircle(1, centerX - offsetX, centerY + offsetY, 'white', radius);
      drawCircle(0.2, centerX + spread, centerY, greyGradient, radius);
      drawCircle(
        0.2,
        centerX - offsetX,
        centerY - offsetY,
        greyGradient,
        radius,
      );
      drawCircle(
        0.2,
        centerX - offsetX,
        centerY + offsetY,
        greyGradient,
        radius,
      );
    }
    let imageData = ctx.getImageData(0, 0, size, size);
    cache.set(cacheKey, imageData);
    return imageData;
  }
  var initIconRendering = defineLazyModule(() => {
    'use strict';
  });
  var BUILD_CHANNEL;
  var BUILD_TARGET;
  var initBuildTarget = defineLazyModule(() => {
    BUILD_CHANNEL = 'stable';
    BUILD_TARGET = 'google';
  });
  function resetBrowserAction() {
    if (BUILD_TARGET == 'mozilla') {
      actionPolyfill.default.browserAction.setPopup({
        popup: '/content/popup.html?panel=main',
      });
      actionPolyfill.default.sidebarAction.setPanel({
        panel: null,
      });
    } else {
      chrome.action.setPopup({
        popup: '/content/popup.html?panel=main',
      });
      if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
        chrome.sidePanel.setOptions({
          enabled: !1,
        });
        chrome.sidePanel.setPanelBehavior({
          openPanelOnActionClick: !1,
        });
      }
    }
  }
  function setPopupEnabled(enabled) {
    if (BUILD_TARGET == 'mozilla') {
      actionPolyfill.default.browserAction.setPopup({
        popup: '/content2/popup.html',
      });
    } else {
      chrome.action.setPopup({
        popup: '/content2/popup.html',
      });
    }
    applySidebarMode(enabled, 0, !1);
  }
  function applySidebarMode(enabled, windowId, doOpen) {
    let isMozilla = BUILD_TARGET == 'mozilla';
    if (
      !isMozilla
      && (chrome.sidePanel && chrome.sidePanel.setPanelBehavior
        ? (chrome.sidePanel.setOptions({
            enabled: enabled,
          }),
          chrome.sidePanel.setPanelBehavior({
            openPanelOnActionClick: enabled,
          }))
        : (enabled = !1),
      doOpen)
    ) {
      if (enabled) {
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
    if (isMozilla && !enabled) {
      actionPolyfill.default.browserAction.setPopup({
        popup: '/content2/popup.html',
      });
      actionPolyfill.default.sidebarAction.setPanel({
        panel: null,
      });
      if (doOpen) {
        actionPolyfill.default.sidebarAction.close();
      }
    }
    if (isMozilla && enabled) {
      actionPolyfill.default.browserAction.setPopup({
        popup: null,
      });
      actionPolyfill.default.sidebarAction.setPanel({
        panel: '/content2/sidebar.html',
      });
      if (doOpen) {
        actionPolyfill.default.sidebarAction.open();
      }
    }
  }
  var actionPolyfill;
  var initBrowserAction = defineLazyModule(() => {
    'use strict';

    actionPolyfill = toEsm(requirePolyfill(), 1);
    initBuildTarget();
  });
  function formatDuration(seconds) {
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    let secs = Math.round(seconds);
    let hoursStr = ('0' + hours + ':').slice(-3);
    let minutesStr = ('0' + minutes + ':').slice(-3);
    let secsStr = ('0' + secs).slice(-2);
    if (hoursStr == '00:') {
      hoursStr = '';
    }
    return hoursStr + minutesStr + secsStr;
  }
  var initMessageFormattingIndex = defineLazyModule(() => {
    'use strict';

    initMessageFormatting();
  });
  function hashToHex(str, seed = 0) {
    let hashLow = 3735928559 ^ seed;
    let hashHigh = 1103547991 ^ seed;
    for (let charIndex = 0, charCode; charIndex < str.length; charIndex++) {
      charCode = str.charCodeAt(charIndex);
      hashLow = Math.imul(hashLow ^ charCode, 2654435761);
      hashHigh = Math.imul(hashHigh ^ charCode, 1597334677);
    }
    hashLow = Math.imul(hashLow ^ (hashLow >>> 16), 2246822507);
    hashLow ^= Math.imul(hashHigh ^ (hashHigh >>> 13), 3266489909);
    hashHigh = Math.imul(hashHigh ^ (hashHigh >>> 16), 2246822507);
    hashHigh ^= Math.imul(hashLow ^ (hashLow >>> 13), 3266489909);
    return 4294967296 * (2097151 & hashHigh) + (hashLow >>> 0);
  }
  var initHitTypes = defineLazyModule(() => {
    'use strict';
  });
  var siteHandlers;
  var initSiteHandlers = defineLazyModule(() => {
    'use strict';

    initMediaCommon();
    siteHandlers = [
      {
        mutateDownloadable: downloadable => {
          if (downloadable.page_url.includes('missav.com')) {
            downloadable.headers.push({
              name: 'Pragma',
              value: 'no-cache',
            });
          }
        },
      },
      {
        mutateDownloadable: downloadable => {
          if (downloadable.page_url.includes('://himado.in/')) {
            for (let variant of downloadable.variants.values()) {
              if (variant.manifest_url.endsWith('audio.mp3')) {
                variant.core_media.av.video = unknownVideoTrack();
                downloadable.is_low_quality = !1;
              }
            }
          }
        },
      },
      {
        canHandleHLS: (url, contentType, extra) =>
          !!(
            url.includes('/api/playlist/master/')
            && contentType.includes('text')
          ),
      },
      {
        canHandleHLS: (url, contentType, extra) =>
          !!(
            url.includes('hls2.vcdnx.com')
            && !url.includes('?ts=')
            && contentType.includes('text')
          ),
      },
    ];
  });
  var dialogNs = {};
  defineExports(dialogNs, {
    alert: () => alert,
    dialog: () => dialog,
    fileDialog: () => fileDialog,
    saveAs: () => saveAs,
    selectConvertFiles: () => selectConvertFiles,
    selectDirectory: () => selectDirectory,
    selectMergeAudioFile: () => selectMergeAudioFile,
    selectMergeVideoFile: () => selectMergeVideoFile,
  });
  async function checkNativeFilepicker() {
    let minVersion = '2.0.17';
    if ((await dialogWeh.prefs).use_native_filepicker) {
      let { status, info } = await dialogCoapp.check();
      if (status) {
        let version = info.version;
        if (dialogUtil.isMinimumVersion(version, minVersion)) {
          return !0;
        }
      }
    }
    return !1;
  }
  function dialog(options) {
    let chain = Promise.resolve();
    if (options.type === 'tab') {
      chain = chain.then(() =>
        dialogBrowser.tabs
          .query({
            active: !0,
            lastFocusedWindow: !0,
          })
          .then(tabs => {
            if (tabs.length > 0) {
              dialogTransientTab.setTransientTab('<next-tab>', tabs[0].id);
            }
          }),
      );
    }
    let dialogName = 'dialog' + ++dialogCounter;
    chain = chain
      .then(() => {
        dialogWeh.ui.open(dialogName, options);
      })
      .then(() => dialogWeh.wait(dialogName));
    chain.__dialogName = dialogName;
    return chain;
  }
  async function alert(options) {
    let initData = {
      autoResize: !0,
    };
    let prefs = await dialogWeh.prefs;
    if (prefs.alertDialogType == 'tab') {
      initData = {
        bodyClass: 'dialog-in-tab',
        autoResize: !1,
      };
    }
    return dialog({
      url: 'content/alert.html',
      type: prefs.alertDialogType,
      height: options.height || 200,
      autoClose: prefs.dialogAutoClose,
      initData: Object.assign(initData, options),
    });
  }
  async function fileDialog(options) {
    let prefs = await dialogWeh.prefs;
    let dialogPromise = dialog({
      type: prefs.fileDialogType,
      url: 'content/file-dialog.html',
      height: 500,
      width: 750,
      autoClose: prefs.dialogAutoClose,
      initData: Object.assign(
        {
          filename: null,
          directory: null,
          uniqueFilename: !0,
          titleText: '',
          noSizeColumn: !1,
          dirOnly: !1,
          upDir: !0,
          editFileInput: !0,
          readonlyDir: !1,
          showDir: !0,
          okText: 'OK',
          confirmOverwrite: !1,
          newDir: !1,
          createDir: !0,
        },
        options,
      ),
    });
    return dialogPromise
      .then(result => (dialogWeh.ui.close(dialogPromise.__dialogName), result))
      .catch(result => (dialogWeh.ui.close(dialogPromise.__dialogName), null));
  }
  async function saveAs(filename, directory, extra = {}) {
    let title = dialogWeh._('save_file_as');
    if (await checkNativeFilepicker()) {
      let lines = (
        await dialogCoapp.call(
          'filepicker',
          'save_file',
          directory,
          title,
          filename,
        )
      ).split(`
`);
      let savedPath = lines[0];
      let savedDir = lines[1];
      if (savedPath && directory) {
        return {
          filePath: savedPath,
          directory: savedDir,
        };
      } else {
        return null;
      }
    }
    return fileDialog(
      Object.assign(
        {
          filename: filename,
          directory: directory,
          uniqueFilename: !0,
          titleText: title,
          noSizeColumn: !1,
          dirOnly: !1,
          upDir: !0,
          editFileInput: !0,
          readonlyDir: !1,
          showDir: !0,
          okText: dialogWeh._('save'),
          confirmOverwrite: !0,
          newDir: !0,
          createDir: !0,
        },
        extra,
      ),
    );
  }
  async function selectDirectory(directory, extra = {}) {
    let title = dialogWeh._('weh_prefs_label_lastDownloadDirectory');
    if (await checkNativeFilepicker()) {
      return {
        directory: (
          await dialogCoapp.call('filepicker', 'pick_folder', '~', title)
        ).split(`
`)[0],
      };
    } else {
      return fileDialog(
        Object.assign(
          {
            directory: directory,
            uniqueFilename: !1,
            titleText: title,
            noSizeColumn: !0,
            dirOnly: !0,
            upDir: !0,
            editFileInput: !1,
            readonlyDir: !0,
            showDir: !1,
            okText: dialogWeh._('ok'),
            confirmOverwrite: !1,
            newDir: !0,
            createDir: !1,
          },
          extra,
        ),
      );
    }
  }
  function selectConvertFiles(directory, extra = {}) {
    return fileDialog(
      Object.assign(
        {
          directory: directory,
          uniqueFilename: !1,
          titleText: dialogWeh._('select_files_to_convert'),
          noSizeColumn: !1,
          dirOnly: !1,
          upDir: !0,
          readonlyDir: !0,
          editFileInput: !1,
          showDir: !1,
          okText: dialogWeh._('convert'),
          confirmOverwrite: !1,
          newDir: !1,
          createDir: !1,
          selectMultiple: !0,
          outputConfigs: !0,
        },
        extra,
      ),
    );
  }
  function selectMergeVideoFile(directory, extra = {}) {
    return fileDialog(
      Object.assign(
        {
          directory: directory,
          uniqueFilename: !1,
          titleText: dialogWeh._('select_video_file_to_merge'),
          noSizeColumn: !1,
          dirOnly: !1,
          upDir: !0,
          readonlyDir: !0,
          editFileInput: !1,
          showDir: !1,
          okText: dialogWeh._('next'),
          confirmOverwrite: !1,
          newDir: !1,
          createDir: !1,
          selectMultiple: !1,
          outputConfigs: !1,
        },
        extra,
      ),
    );
  }
  function selectMergeAudioFile(directory, extra = {}) {
    return fileDialog(
      Object.assign(
        {
          directory: directory,
          uniqueFilename: !1,
          titleText: dialogWeh._('select_audio_file_to_merge'),
          noSizeColumn: !1,
          dirOnly: !1,
          upDir: !0,
          readonlyDir: !0,
          editFileInput: !1,
          showDir: !1,
          okText: dialogWeh._('next'),
          confirmOverwrite: !1,
          newDir: !1,
          createDir: !1,
          selectMultiple: !1,
          outputConfigs: !1,
        },
        extra,
      ),
    );
  }
  var dialogWeh;
  var dialogBrowser;
  var dialogTransientTab;
  var dialogCoapp;
  var dialogUtil;
  var dialogCounter;
  var initDialogs = defineLazyModule(() => {
    'use strict';

    dialogWeh = requireWeh();
    dialogBrowser = dialogWeh.browser;
    dialogTransientTab = (initTabTracker(), toCommonjs(tabTrackerNs));
    dialogCoapp = (initCoapp(), toCommonjs(coappNs));
    dialogUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    dialogCounter = 0;
    dialogWeh.rpc.listen({
      alert: alert,
      selectDirectory: selectDirectory,
    });
  });
  var licenseNs = {};
  defineExports(licenseNs, {
    alertAudioNeedsReg: () => alertAudioNeedsReg,
    checkLicense: () => checkLicense,
    setLicense: () => setLicense,
    validateLicense: () => validateLicense,
  });
  function capitalize(str) {
    return (str && str.substring(0, 1).toUpperCase() + str.substring(1)) || '';
  }
  function computeSignature(license, salt) {
    let data = new TextEncoder('utf-8').encode(
      salt + license.key + license.email,
    );
    return crypto.subtle
      .digest('SHA-256', data)
      .then(hash => licenseUtil.bufferToHex(hash));
  }
  async function validateLicense(key) {
    let coappStatus = await licenseCoapp.check();
    if (!coappStatus.status) {
      return {
        key: key,
        last: Date.now(),
        status: 'nocoapp',
      };
    }
    let home = coappStatus.info.home;
    let response;
    try {
      response = await licenseUtil.request({
        url: globalThis.extConfig.getUrlValue('licenseCheckUrl'),
        content: 'key=' + encodeURIComponent(key) + '&product=converthelper',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      });
    } catch {
      throw new Error(licenseWeh._('network_error_no_response'));
    }
    if (!response.ok) {
      throw new Error(
        licenseWeh._(
          'network_error_status',
          response.status + ' ' + response.statusText,
        ),
      );
    }
    let json = await response.json();
    let result = {
      key: key,
      last: Date.now(),
      remoteStatus: json.status,
      status: json.status,
      name: json.name,
      email: json.email,
    };
    let browserExt = capitalize(browserTarget);
    if (
      ((json.target == 'fx' || json.target == 'firefox')
      && browserTarget != 'firefox'
        ? ((result.status = 'mismatch'),
          (result.brExt = browserExt),
          (result.brLicense = 'Firefox'))
        : json.target == 'edge' && browserTarget != 'edge'
          ? ((result.status = 'mismatch'),
            (result.brExt = browserExt),
            (result.brLicense = 'Edge'))
          : (json.target == 'crx' || json.target == 'chrome')
            && browserTarget != 'chrome'
            && ((result.status = 'mismatch'),
            (result.brExt = browserExt),
            (result.brLicense = 'Chrome')),
      (result.status = 'accepted'),
      true)
    ) {
      let signature = await computeSignature(result, home);
      result.sign = signature;
    }
    await licenseCache.set(result);
    return result;
  }
  function checkLicense() {
    return new Promise((resolve, reject) => {
      licenseBrowser.runtime
        .getPlatformInfo()
        .then(platformInfo => {
          if (platformInfo.os == 'linux' && !linuxLicense) {
            return resolve({
              status: 'unneeded',
            });
          }
          licensePromise()
            .then(license => {
              if (license === null) {
                return resolve({
                  status: 'unset',
                });
              }
              let result = {
                status: 'unset',
              };
              if (
                (license.email && (result.email = license.email),
                license.key && (result.key = license.key),
                license.name && (result.name = license.name),
                license.status == 'mismatch')
              ) {
                result.status = 'mismatch';
                result.brLicense = license.brLicense;
                result.brExt = license.brExt;
                return resolve(result);
              }
              licenseCoapp
                .check()
                .then(coappStatus =>
                  coappStatus.status
                    ? computeSignature(license, coappStatus.info.home)
                    : ((result.status = 'nocoapp'), resolve(result), null),
                )
                .then(signature => {
                  if (signature) {
                    if (!license.remoteStatus && result.key) {
                      return new Promise((innerResolve, innerReject) => {
                        validateLicense(result.key)
                          .then(validated => {
                            license = validated;
                            innerResolve(signature);
                          })
                          .catch(err => {
                            innerReject(err);
                          });
                      });
                    } else {
                      return signature;
                    }
                  }
                })
                .then(signature => {
                  // Was:
                  // ```
                  // o && (
                  //   i.remoteStatus == "accepted"
                  //   && o === i.sign
                  //     ? n.status = "accepted"
                  //     : i.remoteStatus == "blocked"
                  //       ? n.status = "blocked"
                  //       : i.remoteStatus == "locked"
                  //         && (n.status = "locked")
                  //   , e(n)
                  // )
                  // ```
                  if (reject) {
                    result.status = 'accepted';
                    resolve(result);
                  }
                })
                .catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  function setLicense(license) {
    return licenseCache.set(license);
  }
  function alertAudioNeedsReg() {
    dialogModule.alert({
      title: licenseWeh._('converter_needs_reg'),
      text: licenseWeh._('converter_reg_audio'),
      buttons: [
        {
          text: licenseWeh._('get_conversion_license'),
          className: 'btn-success',
          rpcMethod: 'goto',
          rpcArgs: [
            globalThis.extConfig.getUrlValue('convertUrl')
              + (browserTarget
                ? '?browser=' + encodeURIComponent(browserTarget)
                : ''),
          ],
        },
      ],
    });
  }
  var licenseWeh;
  var licenseBrowser;
  var licenseCoapp;
  var licenseUtil;
  var dialogModule;
  var browserTarget;
  var linuxLicense;
  var licenseCache;
  var licensePromise;
  var initLicense = defineLazyModule(() => {
    'use strict';

    licenseWeh = requireWeh();
    licenseBrowser = licenseWeh.browser;
    licenseCoapp = (initCoapp(), toCommonjs(coappNs));
    licenseUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    dialogModule = (initDialogs(), toCommonjs(dialogNs));
    ({ browser: browserTarget, linuxlic: linuxLicense } =
      requireBuildInfo().buildOptions);
    licenseCache = new licenseUtil.Cache(
      () =>
        licenseBrowser.storage.local
          .get('license')
          .then(stored => stored.license || null),
      license =>
        licenseBrowser.storage.local.set({
          license: license,
        }),
    );
    licensePromise = licenseCache.get();
    licenseWeh.rpc.listen({
      checkLicense: checkLicense,
      validateLicense: validateLicense,
      setLicense: setLicense,
    });
  });
  var converterPlaceholderGif;
  var initConverterAssets = defineLazyModule(() => {
    'use strict';

    converterPlaceholderGif =
      'R0lGODlhNgE2AaEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAA2ATYBAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1KrVAshqt9yu9wsOi8dZCDncO4PN6rb7Td7A5/Q5m56u3+v8/lfuFygIsAeXh/cwqMgHuOjoVvh2aJf4aHnWeKn5V4m4w9i5KbqVOToaCckD6mDaSqjhaoraNmkYGntZivs4q1YrebvrqCus2IupqhdcPEjMHHgcl+zZ8MwLa70YPfabypptjL3WTXr1IuaDLs45zW7Oot7u5ayVjvbeEv95n6Gv448PBUAcAykUtHEw4IiENBhGszdOYQqHMih+i7gPo0T+ExZhdGTw0UXIjRhGwuNXEuU/lSQXsiT40mBMhDNbejC5AucBnRNr2uTAU6DPh+Tq/SQR9ERQh7mWlbvo7oImp76olrHah2i/oU2hzsNKD5pXYGO5bFNW9mlKjQu6VuM6FGvWtFXpXrU7F2/YV3hXvWWrYKnbtmj/RiV8Te+6r30Lg4QLWKYluUwhDwO7uMtZao8jIxA8ubFlxoa1Yd7qeWdoxazXJu5MqTVs07KxjA5XO3Bc0Zx19/Z9GDjt0pozm6X8O0Hl1BGm8g6u/Haz065Jz8ZN/Hhuya8Rx86u9vr07ROWXyavmvnm5Om/iw/vffh7o6ihf14Nnn5+ZPv+71bHPp9/AebV317r2YKeAX7FZ51t3TGoXX8LQghfBebJR6F+A3LT114TClfcc2QVaFyF0T0IYoQbMsRhfRimaOJ9KJ5onwQXApihgDlKI6GHju144IgDGoice0AWWWMALf43HokieuMkkzG29yKNDcJY14Y+skdliBL+iKWOFkoniFZf+rSkVPgNiaSQR7ro5YpcKkhmljvyJaVYCSq55pt5imkljmHiKSdzaTp4XpSFIqgoolcG2iSbT6o4KKGOCgrplHTOKGOSZi7q5qBBxlnplkaK2iaUkv5paaVgZqrhnYNdGqmfoKpqK62a8slpl5S62ueYvW7q6ayowvn+K6x+fCprsNxV2emj0WI6bbLl1bksdbfWKmyiq25rZ67dSutrmdo2O+yotJwL7KnKtvosqe0y+i263uqqZ6PzhvoukZOGe+yZ6aa67p7G9ltirPviGjC4+aqZ7o3cIozsrgdXa7EwptIr7rsfUsyqugCD7HC2FT/cMcYoN4wvoCqbrK/HF9vo7Mvw2vyxzf5m5KlcO9fLctA3gNZzDEQXHbPO7JKcw9HyDr1bjwm7XK7CTAtNk3pLZ420llPfXDXVxJI79tNck80sTFp3+HXaV799ttk0r+1R1F6fLDavxWILdkN2p1yD03I3x7fbSsszuOGB/11q21uH3bfeaFf+xDjci9N9d8iPl20t5BB1DbjfmN/5c+iSJ54UR5UfzvPkbOMducQZj57P6p4XlbfPjhtcOO6REwxO77yrJ7vVOAdfMKvIJw+05ZzPvjfxy8MM8fSvst489qYXb/3I13Y/5+mdP2/87cNHDz7H46bP/PbCJ22+wOyPLzL7ipOfN/ex8z0/6Av3fz/xQQ9t+qtf+jbWv/y9L3vxYyD+Eug6+UEwgAXcnADL90AI0g949rNgBc9HQA3yR3kiVKD0Toi+EKKwhLQ7CuHQlDqpuXCGqoOh7V7YQhrqEIdJOhQIfLjDIMKub0C8SQyFGMQiZrCGOUSiE5f4Opfc8IlCVOL+BTHoISpqMV6Ds2IWtwhG3clQik0MIw2t6MWv/c6MT0TjEUnHxjhCjohvbJwc/7UyLg4wcZQr4xVzh0cewY+Hrigd1i7nP48hkGHOMyCBqqfCROZkimkMpBcFJ4vdDXIGmNwVBwXpQEfmbG4p5KPRKNlJ6pnuk49s2f78qBRUyvJehyRkKwzZyD5Kco6LbF8tRXk9UkYygueY5S4zGMwH9tJcsAugLokJxyEm84/LzOP3SrnBU/qxkhJkpPbWd0tNhvKZphwjJKnVQFe6sWbInCYToSVMaIIzmyS04bCcU7eBRVEE3DynN9s5J3wWU5/mDEE/1cmimf2xlSchaOb++FlHmdmTlsdzZwkUuo13ylOP3gOou+Y4SqE4NJpkPKYjWbnOkRqUnbakpz9ditCJwnOhIY2lShV50YhW1FAKFahIWJrRnE6RlShNKFA1OrFrmlSMJeUXSJPp09rdFGdIhek8O0pTqGK0qtaMZzlf6snWOTWdQzjoL2taxWnqVAVmbSRak6jWoWpzm/xbqxVqaleR0nWFY3UiXuWaz71i05da/Css52pS/bX1KIZdKmI3+k2JHlYijYUsIhNbV8AqpLJfbVoqX/nRNsZ1sgMV7DD7ikTOWhVqxkSdRaOwWLJyFItqLAZRi0paiLZ2tVQV6vRua8m8frGZauSqNYD+203CXtayyiyub5eH3JLFVq+YNS1zgclS1TJzJbsNa0F/2L3o2gu1j+3sL5mq299aEruORcpnh9vU4In3f1glp3lzuc+VWm++klVf3O4bWaVeF7f3HC1Flwtg2Qo4wS3NBn936l8E81bBXp1wg4+7XgIPWJzpnWlWearZn/KVflvdUzVBOd4uCte4oD1tUitM29qGL6TT5eQCU6xcGANSmjPWaoilOlgslniTJ76kj3MLZBfv8cUXXiOPQ+tRstXYvkuuclebbNMDPxXESG5okE2oZSyzWLtYnXJ5rQxmD1uwyIo1apcnOWI0M3S2Tq4nlD/cwxU/17VxvrIzZXz+Zxrr2b19TjM6bSxTBuN5pmR+RpY3TGguVxcXD95yLB6t6DGjN6YF7rF692xhTKu4u6fIcHCPymHWSvq6tjV1cksNau+KeNWKbvWrhbxfFvuOjqQWRaWjHM5Yx7i0ee71Jn696GBHGtLxHV+NbS1d9qo51f919mej2l8lY1jYO551sa2rbBzLGdrNHra3pXztnhoYeaKWNaeh3OgW8/nLdRY3rguNYjh3OtA3PquxjYxvM9sZ3uuet7YNHep4nzSwYVa4B/tNZ4DTW+BgvbLDQWjwWhecxK/tMKM3LmcK/vuDt+62fvcdYQo3F+MJB/m978xtVWY74xzH959LLu/+msN82R/3NL1FDu4crxznZ96uvREe8ocHvb5t/nHEBe3zg+c86U/+ObKpDeGeU/rqJs4vTokLdpxDfeuurni97fhQV+Iy64cm99HPjt/v9jbsZpd2X91OX3Ov0utz1xzd3z72S3OdyHznJdZ1PHVYSzfez/73pq9qcn/vQsOofSvh5W74v0M+8b4+ddTJ23XMQ1HzdLb7P5PNZNS7+7yFH73fX7/4Iwu+7Gp3rujFTHq2MxnvM2/50jHY+N9z/tie53f41tz6ha69J28OsMqDynMWFrLokd/8zdMOXulPnvpwLz3yb89m7R8/5u1+OavzKv7tMzzTSp90e2OfftD+R3/11v8+9j8Q/9kTm/0sp3/fPZ5/2KZvzBZK1zZmAZh6uqaAoXd/RoSAnbd+oQZ07keAefeAp1d+1ed9DEhSAHiB0wZXEdNxe5d7Dvh+mwVUljdOh9cBgwZbKTiCrFeCLeh074BRKkiCsOeBendGMDh+l6eDJ1eB+HCDMRh3QZh9JxgQRfiDKziDQFGD5sCEOweEdbeAbDSFKYd788eD9RdHWSh/ToiE+BeFVwCGGGh/Vkh+cnSGQnd9asiFGmhpE3SATQiHBZhrVUeHMYeDtdd/2zZwexiHc0aGNkd5CVh87FaHVDiGzxdegKZBGUiIJih1pmd07yaI5SZzSVj+iYd4iZsnfZLYh164SY+ohwkkika4gaWYh4GIiouohVBoiIl4aJYIiJo4iTQ4i2KHarz4aYM4iquIh794h57VfJTIf1Xoh8pzhdylhEKYjGJYjKDYjMb4jJwYjTk4jRFXjWpzjYX4jc+3fE3WfYj3OUOIjRKYhstoduW4hc6IjuAYj+LIgtCHi+eYjdCojhzIjurUjao2j7oYjkN3j7ZXkIizj4MoiQtpkDsoh8w3kLIYkcJlgGuIkP7HVmVIkA7pjspnkWKVkAepkP+4YCEpeWFGTdyXi7a4iSWJke8IeBCXkb0Ifyj5ePJIc594hBy5kp7oZzeJjDrnYS4YkyP+p37M+JE12YkRiIi+aJPJN46qN0LSqI9NqZS1CJQCKXUXt39YSYtW2YFVaX61SJQWmG9Pd5TtSJJziIFl2Xtu6JMtiXgd2X5DqZEs+ZBSSXxDtJbA5oZuqXtw+ZU66ZJdWJjDx5VUCYrq9nlC6ZWsKIK7iIsCyJaOaZmEaY5xOXxviIlt53JI95N/KJcbKYOuuHufiZiq6Ig+aHV8yJjGN3GqSZpvOZXuc4x+iZl6uZmaGZVtOJYmaZaBV3mZxYi2iZIkN5mvGYtNV5wnaZeSyZPKOZwBJ5spOZi/SXXAKJ1tSZyxWJdkKZNBmUlE951g6ZzgCZ1iCYHRVp65OYH+zxmbrViUF9iXuomc86l/+ImA9emboNlBTvmA/MmaW2mKVxmAAhqZ8UmMwfmBdCmaK8mc0HWd6Yegx9mdigig+5mU+nmZ2Dk/mql9FQqfBCqfDPqBIoqeCiqhGXqgG2qircmi42mg+VefVOah/umgTPmS1qmM6bijDPmgSRB8MHpuwOmjN7qbRzCkS9mVP4qiHZqXNmqYq3mbnOllTKqY1baj93ml+XikOGqlWjqls+l81OWlOAmlSWoES5qTYyqRAfmmbQqmSMCmaSqlOTqSQUqn77WOX4qnIjmMEalp9QiY9Kijc8qPAHl+6TmAZyqeSBqmEral4WmmNNqnwqimjWjHoTLajiwUqZmZqP/3ovnZmQB0qYf5qR4Zo4rXqSWUqu+pcYlmqqc4qz2KqaUZlrTpaJCYiZlKilmaeTPKqqX6oacKqrYarJs6rIvpqsYKk7iqqaM6fbRarKGKqs6aUpHIq69orccKrK6nrOvZqiL0qu3pptnaq3ekruvKru3qru8Kr/Eqr/NKr/Vqr/eKr/mqr/vKr/3qr/8KsAErsANLsPZaAAA7';
  });
  var coappSideNs = {};
  defineExports(coappSideNs, {
    convert2: () => convert2,
    convert3: () => convert3,
    defaultOutputConfigs: () => defaultOutputConfigs,
    getCodecs: () => getCodecs,
    getFormats: () => getFormats,
    getOutputConfigs: () => getOutputConfigs,
    info: () => info,
    makeUniqueFileName: () => makeUniqueFileName,
    open: () => open,
    play: () => play,
    resetOutputConfigs: () => resetOutputConfigs,
    setOutputConfigs: () => setOutputConfigs,
    sideDownload: () => sideDownload,
    sideDownloadAbort: () => sideDownloadAbort,
    sideDownloadMPD: () => sideDownloadMPD,
    updateHit: () => updateHit,
  });
  function updateHit(hit) {
    console.warn('TODO converter.updateHit');
  }
  function stripBrotliEncoding(headers) {
    (headers || []).forEach(header => {
      if (header.name == 'Accept-Encoding') {
        header.value = header.value
          .split(',')
          .map(enc => enc.trim())
          .filter(enc => enc != 'br')
          .join(', ');
      }
    });
  }
  // The coapp's json probe runs ffprobe with `-v quiet` (through v2.0.19), which
  // silences stderr - so a failed probe rejects with just "Exit code: N" and no
  // reason. When that happens, re-probe without the json flags (that path keeps
  // stderr) to recover ffprobe's message, and attach it to the error so it
  // reaches the log Details. Self-deactivating: a coapp that already returns
  // stderr won't match the bare-exit-code test, so no second probe is made.
  function coappGaveNoReason(probeError) {
    let remote = (probeError && probeError.remoteError) || '';
    return /^Exit code: \d+\s*$/.test(String(remote).trim());
  }
  function extractFfprobeReason(text) {
    let lines = String(text || '')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .filter(line => !/^Exit code:/.test(line))
      .filter(
        line =>
          !/^(ffprobe|ffmpeg) version /.test(line)
          && !/^built with /.test(line)
          && !/^configuration:/.test(line)
          && !/^lib[a-z]+ +[0-9]/.test(line),
      );
    return lines.slice(-3).join('\n');
  }
  function diagnoseProbeFailure(probeError, url, headers) {
    if (!coappGaveNoReason(probeError)) {
      return Promise.resolve(probeError);
    }
    return converterCoapp
      .call('probe', url, !1, headers)
      .then(() => probeError)
      .catch(verboseError => {
        let reason = extractFfprobeReason(
          (verboseError && verboseError.remoteError)
            || (verboseError && verboseError.message)
            || '',
        );
        if (reason) {
          injectErrorDetails(probeError, { reason: reason });
        }
        return probeError;
      });
  }
  function info(url, parse = !1, headers = []) {
    stripBrotliEncoding(headers);
    if (converterDebug) {
      console.log('probe', url, parse, headers);
    }
    let result = converterCoapp.call('probe', url, parse, headers);
    if (parse) {
      return result.then(
        text => {
          try {
            return JSON.parse(text);
          } catch (jsonError) {
            // The ffprobe JSON output can be invalid (for example an unescaped
            // character in a stream or format tag), which would otherwise abort
            // the whole download. Callers only read format.duration, so recover
            // it from the non-JSON probe instead of failing.
            appLog(
              'probe returned malformed JSON, recovering duration: '
                + jsonError.message,
              'warning',
            );
            return info(url, !1, headers).then(basicInfo => ({
              format: { duration: basicInfo && basicInfo.duration },
              streams: [],
            }));
          }
        },
        probeError =>
          diagnoseProbeFailure(probeError, url, headers).then(() => {
            throw probeError;
          }),
      );
    } else {
      return result;
    }
  }
  function play(url) {
    return converterCoapp.call('play', url);
  }
  function open(path) {
    return converterCoapp.call('open', path);
  }
  function makeUniqueFileName(name) {
    return converterCoapp.call('makeUniqueFileName', name);
  }
  async function convert3(input, output, onProgress, onStart) {
    let args = ['-i', input, '-y', output];
    let progressId = ++progressIdCounter;
    convertProgressHandlers[progressId] = onProgress;
    let startId = ++startIdCounter;
    convertStartHandlers[startId] = onStart;
    try {
      let result = await converterCoapp.call('convert', args, {
        progressTime: '' + progressId,
        startHandler: '' + startId,
      });
      if (result.exitCode != 0) {
        throw (
          converterDebug
            && (console.warn('exitCode|convert3', result.exitCode),
            console.warn(result.stderr)),
          new converterUtil.DetailsError('Convert3 error: ', result.stderr)
        );
      }
      return output;
    } finally {
      delete progressId[progressId];
      delete convertStartHandlers[startId];
    }
  }
  async function convert2(input, output, configName, onProgress, onStart) {
    let args = [];
    args.push('-i', input);
    let config = defaultOutputConfigs[configName];
    for (let paramName in config.params) {
      let paramValue = config.params[paramName];
      if (
        paramValue !== null
        && (typeof paramValue != 'string' || paramValue.length > 0)
      ) {
        args.push('-' + paramName);
        args.push('' + paramValue);
      }
    }
    if (config.extra) {
      let extraArgs = /^\s*(.*?)\s*$/.exec(config.extra)[1].split(/\s+/);
      for (let part of extraArgs) {
        args.push(part);
      }
    }
    if ((config.audioonly && args.push('-vn'), !output)) {
      let parts = input.split('.');
      if (parts[parts.length - 1] == config.ext) {
        parts[parts.length - 2] += '-converted';
      }
      parts[parts.length - 1] = config.ext;
      output = parts.join('.');
    }
    args.push('-y', output);
    let progressId = ++progressIdCounter;
    convertProgressHandlers[progressId] = onProgress;
    let startId = ++startIdCounter;
    convertStartHandlers[startId] = onStart;
    try {
      let result = await converterCoapp.call('convert', args, {
        progressTime: '' + progressId,
        startHandler: '' + startId,
      });
      if (result.exitCode != 0) {
        throw (
          converterDebug
            && (console.warn('exitCode|convert2', result.exitCode),
            console.warn(result.stderr)),
          new converterUtil.DetailsError('Convert2 error: ', result.stderr)
        );
      }
      return output;
    } finally {
      delete progressId[progressId];
      delete convertStartHandlers[startId];
    }
  }
  function setOutputConfigs(configs) {
    return outputConfigsCache.set(
      Object.assign({}, defaultOutputConfigs, configs),
    );
  }
  function resetOutputConfigs() {
    return getOutputConfigs().then(configs => {
      let copy = Object.assign({}, configs);
      Object.keys(copy).forEach(key => {
        if (!copy[key].readonly) {
          delete copy[key];
        }
      });
      return outputConfigsCache.set(copy);
    });
  }
  function getFormats() {
    return converterCoapp.call('formats');
  }
  function getCodecs() {
    return converterCoapp.call('codecs');
  }
  function dispatchConvertProgress(progressId, time, extra) {
    let handler = convertProgressHandlers[progressId];
    if (handler) {
      handler(time, extra);
    }
  }
  function sideDownloadAbort(ffmpegPid) {
    return converterCoapp.call('abortConvert', ffmpegPid);
  }
  async function sideDownloadMPD(url, videoTrack, audioTrack, options) {
    let ffmpegArgs = [];
    let shellArgs = [];
    stripBrotliEncoding(options.headers);
    if (options.headers && options.headers.length) {
      ffmpegArgs.push('-headers');
      ffmpegArgs.push(
        options.headers.map(header => header.name + ': ' + header.value)
          .join(`\r
`),
      );
      shellArgs.push('-headers');
      shellArgs.push(
        "$'"
          + options.headers
            .map(header => `${header.name}: ${header.value}\\r\\n`)
            .join('')
          + "'",
      );
    }
    ffmpegArgs.push('-analyzeduration', '10M');
    shellArgs.push('-analyzeduration', '10M');
    ffmpegArgs.push('-i', url);
    shellArgs.push('-i', `'${url}'`);
    if (videoTrack) {
      ffmpegArgs.push('-map', `0:${videoTrack}`);
      shellArgs.push('-map', `0:${videoTrack}`);
    }
    if (audioTrack) {
      ffmpegArgs.push('-map', `0:${audioTrack}`);
      shellArgs.push('-map', `0:${audioTrack}`);
    }
    if (videoTrack) {
      ffmpegArgs.push('-codec', 'copy');
      shellArgs.push('-codec', 'copy');
    }
    ffmpegArgs.push('-y');
    ffmpegArgs.push(options.filePath);
    shellArgs.push('-y');
    shellArgs.push(options.filePath);
    let progressId = ++progressIdCounter;
    convertProgressHandlers[progressId] = options.on_progress;
    let startId = ++startIdCounter;
    convertStartHandlers[startId] = options.on_start;
    if (converterDebug) {
      console.log(shellArgs.join(' '));
    }
    try {
      let result = await converterCoapp.call('convert', ffmpegArgs, {
        progressTime: '' + progressId,
        startHandler: '' + startId,
      });
      if (result.exitCode != 0) {
        throw (
          converterDebug
            && (console.warn('exitCode|sideDownloadMPD', result.exitCode),
            console.warn(result.stderr)),
          new converterUtil.DetailsError('SideDownload error: ', result.stderr)
        );
      }
    } finally {
      delete progressId[progressId];
      delete convertStartHandlers[startId];
    }
  }
  async function sideDownload(videoUrl, audioUrl, options, forceHls = !1) {
    let ffmpegArgs = [];
    let shellArgs = [];
    let qrPath;
    if (options.qr_code_needed) {
      let { path, fd: tmpGifFd } = await converterCoapp.call('tmp.file', {
        prefix: 'vdh-wm-',
        postfix: '.gif',
      });
      await converterCoapp.call('fs.write2', tmpGifFd, converterPlaceholderGif);
      await converterCoapp.call('fs.close', tmpGifFd);
      qrPath = path;
    }
    if (
      (ffmpegArgs.push('-analyzeduration', '10M'),
      shellArgs.push('-analyzeduration', '10M'),
      options.qr_code_needed
        || (ffmpegArgs.push('-reconnect', '1'),
        shellArgs.push('-reconnect', '1'),
        ffmpegArgs.push('-icy', '0'),
        shellArgs.push('-icy', '0')),
      options.qr_code_needed
        && (ffmpegArgs.push('-i', qrPath), shellArgs.push('-i', qrPath)),
      options.headers && options.headers.length > 0)
    ) {
      stripBrotliEncoding(options.headers);
      let headerStr = options.headers
        .map(
          header => `${header.name}: ${header.value}\r
`,
        )
        .join('');
      ffmpegArgs.push('-headers');
      ffmpegArgs.push(headerStr);
      shellArgs.push('-headers');
      shellArgs.push(
        "$'"
          + options.headers
            .map(header => `${header.name}: ${header.value}\\r\\n`)
            .join('')
          + "'",
      );
    }
    if (
      (forceHls && (ffmpegArgs.push('-f', 'hls'), shellArgs.push('-f', 'hls')),
      videoUrl
        && (ffmpegArgs.push('-i', videoUrl),
        shellArgs.push('-i', `'${videoUrl}'`)),
      audioUrl
        && (ffmpegArgs.push('-i', audioUrl),
        shellArgs.push('-i', `'${audioUrl}'`)),
      options.qr_code_needed && videoUrl)
    ) {
      ffmpegArgs.push(
        '-filter_complex',
        '[0][1]scale2ref=w=oh*mdar:h=ih*0.4[logo][video];[video][logo]overlay=5:H-h-5',
      );
      shellArgs.push(
        '-filter_complex',
        '[0][1]scale2ref=w=oh*mdar:h=ih*0.4[logo][video];[video][logo]overlay=5:H-h-5',
      );
      let videoCodec = 'h264';
      if (options.filePath.endsWith('webm')) {
        videoCodec = 'libvpx-vp9';
      }
      ffmpegArgs.push(...`-c:v ${videoCodec} -preset superfast`.split(' '));
      shellArgs.push(...`-c:v ${videoCodec} -preset superfast`.split(' '));
    } else {
      if (options.merge) {
        ffmpegArgs.push('-map', '0:v:0', '-map', '1:a:0');
        shellArgs.push('-map', '0:v:0', '-map', '1:a:0');
      }
      if (videoUrl) {
        ffmpegArgs.push('-c', 'copy');
        shellArgs.push('-c', 'copy');
      }
    }
    ffmpegArgs.push('-y', options.filePath);
    shellArgs.push('-y', options.filePath);
    if (converterDebug) {
      console.log(shellArgs.join(' '));
    }
    let progressId = ++progressIdCounter;
    convertProgressHandlers[progressId] = options.on_progress;
    let startId = ++startIdCounter;
    convertStartHandlers[startId] = options.on_start;
    try {
      let result = await converterCoapp.call('convert', ffmpegArgs, {
        progressTime: '' + progressId,
        startHandler: '' + startId,
      });
      if (result.exitCode != 0) {
        if (
          (converterDebug
            && (console.warn('exitCode|sideDownload', result.exitCode),
            console.warn(result.stderr)),
          !forceHls)
        ) {
          console.warn('Re-trying with forceHls');
          return sideDownload(videoUrl, audioUrl, options, !0);
        }
        throw new converterUtil.DetailsError(
          'SideDownload error: ',
          result.stderr,
        );
      }
    } finally {
      if (qrPath) {
        try {
          await converterCoapp.call('fs.unlink', qrPath);
        } catch {}
      }
      delete progressId[progressId];
      delete convertStartHandlers[startId];
    }
  }
  function dispatchConvertStart(startId, arg) {
    let handler = convertStartHandlers[startId];
    if (handler) {
      try {
        handler(arg);
      } catch (err) {
        console.error('start handler error', err);
      }
    }
  }
  var converterWeh;
  var converterBrowser;
  var converterCoapp;
  var converterUtil;
  var converterDebug;
  var defaultOutputConfigs;
  var progressIdCounter;
  var convertProgressHandlers;
  var startIdCounter;
  var convertStartHandlers;
  var outputConfigsCache;
  var getOutputConfigs;
  var initConverter = defineLazyModule(() => {
    'use strict';

    initConverterAssets();
    converterWeh = requireWeh();
    converterBrowser = converterWeh.browser;
    converterCoapp = (initCoapp(), toCommonjs(coappNs));
    converterUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    converterDebug = !requireBuildInfo().prod;
    progressIdCounter = 0;
    convertProgressHandlers = {};
    startIdCounter = 0;
    convertStartHandlers = {};
    outputConfigsCache = new converterUtil.Cache(
      () =>
        converterBrowser.storage.local
          .get('outputConfigs')
          .then(stored => stored.outputConfigs || defaultOutputConfigs),
      configs =>
        converterBrowser.storage.local.set({
          outputConfigs: configs,
        }),
    );
    getOutputConfigs = outputConfigsCache.get();
    converterWeh.rpc.listen({
      getOutputConfigs: getOutputConfigs,
      setOutputConfigs: setOutputConfigs,
      resetOutputConfigs: resetOutputConfigs,
      editConverterConfigs: panelId => {
        converterWeh.ui.open('convoutput' + (panelId ? '#' + panelId : ''), {
          type: 'tab',
          url: 'content/convoutput.html',
        });
      },
      getFormats: getFormats,
      getCodecs: getCodecs,
      convertStartNotification: dispatchConvertStart,
    });
    converterCoapp.listen({
      convertOutput: dispatchConvertProgress,
    });
    defaultOutputConfigs = {
      'e6587753-4ca5-4d2e-b7ba-beaf1e7f191c': {
        title: 'Re-encoded MP4 (h264/aac)',
        ext: 'mp4',
        params: {
          'c:a': 'aac',
          f: 'mp4',
          'c:v': 'h264',
        },
        audioonly: !1,
        readonly: !0,
      },
      '249a7d34-3640-4ac3-8300-13827811d2cf': {
        title: 'MPEG (mpeg1+mp2)',
        ext: 'mpg',
        params: {
          'c:a': 'mp2',
          f: 'mpeg',
          r: 24,
          'c:v': 'mpeg1video',
        },
        extra: '-mbd rd -trellis 2 -cmp 2 -subcmp 2 -g 100',
        audioonly: !1,
        readonly: !0,
      },
      '6de4f5ce-8cfe-4f0f-8246-bacb7b0d7624': {
        title: 'WMV 500Kb (Windows Media Player)',
        ext: 'wmv',
        params: {
          'c:a': 'wmav2',
          f: 'asf',
          'c:v': 'wmv2',
          'b:v': '500k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '21a19146-e116-4460-8356-a8eab9cf61ce': {
        title: 'WMV 1Mb (Windows Media Player)',
        ext: 'wmv',
        params: {
          'c:a': 'wmav2',
          f: 'asf',
          'c:v': 'wmv2',
          'b:v': '1000k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '933b1b41-6862-4ce0-9605-10fa5e4b310c': {
        title: 'WMV 2Mb (Windows Media Player)',
        ext: 'wmv',
        params: {
          'c:a': 'wmav2',
          f: 'asf',
          'c:v': 'wmv2',
          'b:v': '2000k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '90195ab2-d891-443c-a164-8f0953ec8975': {
        title: 'WMV 4Mb (Windows Media Player)',
        ext: 'wmv',
        params: {
          'c:a': 'wmav2',
          f: 'asf',
          'c:v': 'wmv2',
          'b:v': '4000k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '3a4cc0a6-6eb0-4cff-90fb-fdf8eb6a9571': {
        title: 'AVI 500Kb (mpeg4/mp3)',
        ext: 'avi',
        params: {
          'c:a': 'mp3',
          f: 'avi',
          'c:v': 'mpeg4',
          'b:v': '500k',
          'b:a': '128k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      'ebdbb895-7a1e-43e2-bef4-be6e62cb8507': {
        title: 'AVI 1Mb (mpeg4/mp3)',
        ext: 'avi',
        params: {
          'c:a': 'mp3',
          f: 'avi',
          'c:v': 'mpeg4',
          'b:v': '1000k',
          'b:a': '128k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '0b6280d3-f8f2-4cb6-8235-a5a4b91488f7': {
        title: 'AVI 2Mb (mpeg4/mp3)',
        ext: 'avi',
        params: {
          'c:a': 'mp3',
          f: 'avi',
          'c:v': 'mpeg4',
          'b:v': '2000k',
          'b:a': '128k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '9ea8a22b-5738-4d0f-8494-3037ec568191': {
        title: 'AVI 4Mb (mpeg4/mp3)',
        ext: 'avi',
        params: {
          'c:a': 'mp3',
          f: 'avi',
          'c:v': 'mpeg4',
          'b:v': '4000k',
          'b:a': '128k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '4174b9dd-c2a0-409d-801d-c84f96be0b76': {
        title: 'MP3',
        ext: 'mp3',
        params: {
          'b:a': '128k',
          'c:a': 'mp3',
          f: 'mp3',
        },
        extra: null,
        audioonly: !0,
        readonly: !0,
      },
      '05cb6b27-9167-4d83-833d-218a107d0376': {
        title: 'MP3 HQ',
        ext: 'mp3',
        params: {
          'b:a': '256k',
          'c:a': 'mp3',
          f: 'mp3',
        },
        extra: null,
        audioonly: !0,
        readonly: !0,
      },
      '69397f64-54f2-4ee4-b47a-b4fc42ee2ec1': {
        title: 'MP4 500Kb',
        ext: 'mp4',
        params: {
          'c:v': 'mpeg4',
          'c:a': 'aac',
          f: 'mp4',
          'b:v': '500k',
          'b:a': '128k',
          ac: 2,
        },
        extra: '-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300',
        audioonly: !1,
        readonly: !0,
      },
      '16044db3-3b75-4155-b549-c0ba19c18887': {
        title: 'MP4 1Mb',
        ext: 'mp4',
        params: {
          'c:v': 'mpeg4',
          'c:a': 'aac',
          f: 'mp4',
          'b:v': '1000k',
          'b:a': '128k',
          ac: 2,
        },
        extra: '-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300',
        audioonly: !1,
        readonly: !0,
      },
      'b5535083-bf16-4ae0-a21f-7c637ce0617f': {
        title: 'MP4 2Mb',
        ext: 'mp4',
        params: {
          'c:v': 'mpeg4',
          'c:a': 'aac',
          f: 'mp4',
          'b:v': '2000k',
          'b:a': '128k',
          ac: 2,
        },
        extra: '-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300',
        audioonly: !1,
        readonly: !0,
      },
      'dfbed97f-46c9-4db8-b5d1-4d19901bc236': {
        title: 'MP4 4Mb',
        ext: 'mp4',
        params: {
          'c:v': 'mpeg4',
          'c:a': 'aac',
          f: 'mp4',
          'b:v': '4000k',
          'b:a': '128k',
          ac: 2,
        },
        extra: '-mbd rd -flags +mv4+aic -trellis 2 -cmp 2 -subcmp 2 -g 300',
        audioonly: !1,
        readonly: !0,
      },
      '912806c1-6c43-44ad-ac6e-05f105bade55': {
        title: 'iPhone',
        ext: 'm4v',
        params: {
          'c:v': 'mpeg4',
          'c:a': 'aac',
          s: '480x320',
          'b:v': '800k',
          f: 'mp4',
          r: '24',
          'b:a': '128k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '2416dcbf-146d-4ca4-b948-f6f702fb043c': {
        title: 'iPod',
        ext: 'm4v',
        params: {
          'c:v': 'mpeg4',
          'c:a': 'aac',
          s: '320x240',
          'b:v': '500k',
          f: 'mp4',
          r: '24',
          'b:a': '128k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '42fb9cf9-94f9-45c1-954f-1c5879f3d372': {
        title: 'Galaxy Tab',
        ext: 'mp4',
        params: {
          'c:a': 'aac',
          'b:a': '160k',
          ac: '2',
          'c:v': 'h264',
          f: 'mp4',
        },
        extra: '-crf 22',
        audioonly: !1,
        readonly: !0,
      },
      'edf545c2-88fc-4354-b91d-83e2f31d3c14': {
        title: 'MOV (QuickTime player)',
        ext: 'mov',
        params: {
          f: 'mov',
          'c:v': 'h264',
          preset: 'fast',
          'profile:v': 'baseline',
          'c:a': 'aac',
          'b:a': '128k',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      'f31ac68e-db3b-4b17-95d7-04456cbc3c26': {
        title: 'Mobile 3GP (Qcif)',
        ext: '3gp',
        params: {
          f: '3gp',
          'c:v': 'h263',
          'c:a': 'aac',
          'b:a': '12k',
          s: '176x144',
          'b:v': '64k',
          ar: '8000',
          r: '24',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '85cd71a0-fb61-45a4-9fed-6f2e6e405bc3': {
        title: 'MPEG-2 DVD (PAL)',
        ext: 'mpeg',
        params: {
          f: 'mpeg2video',
          target: 'pal-dvd',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
      '47b9b2eb-8fd4-4e10-8993-f7d467ed1928': {
        title: 'MPEG-2 DVD (NTSC)',
        ext: 'mpeg',
        params: {
          f: 'mpeg2video',
          target: 'ntsc-dvd',
        },
        extra: null,
        audioonly: !1,
        readonly: !0,
      },
    };
  });
  async function performServiceDownload(
    pending,
    queue,
    request,
    {
      audio_only: audioOnly,
      ask_for_destination: askForDestination,
      convert_to: convertTo,
    },
    onProgress,
  ) {
    let variant = request.downloadable.variants.get(request.variant_id);
    let coreMedia = variant.core_media;
    let startTime = Date.now();
    let isYoutube = !1;
    {
      let pageUrl = request.downloadable.page_url;
      let manifestUrl = variant.manifest_url;
      if (
        ((pageUrl.includes('youtube.')
          || manifestUrl.includes('youtube.')
          || pageUrl.includes('googlevideo.')
          || manifestUrl.includes('googlevideo.'))
          && (isYoutube = !0),
        isYoutube && BUILD_TARGET == 'google')
      ) {
        return resultErr({
          error: 'noyt',
          id: 'noyt',
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
    }
    let coappOk;
    let coappVersion;
    {
      let { status, info } = await serviceCoapp.check();
      coappOk = status;
      if (coappOk) {
        coappVersion = info.version;
      }
    }
    let strategy;
    if (coreMedia.builder == 'YoutubeBulk') {
      strategy = 'youtube_bulk';
    } else if (coreMedia.builder == 'Hls') {
      strategy = 'hls';
    } else if (coreMedia.builder == 'RawHls') {
      strategy = 'hls';
    } else if (coreMedia.builder == 'MPD') {
      strategy = 'mpd';
    } else if (coreMedia.builder == 'HTTPMedia') {
      let strategyPref = await getSetting(settingHttpMediaDownloadStrategy);
      if (strategyPref == 'ask') {
        strategyPref = 'coapp';
      }
      if (!coappOk || strategyPref == 'inbrowser') {
        strategy = 'file_inbrowser';
      } else {
        strategy = 'file_coapp';
      }
    } else if (coreMedia.builder == 'YoutubeFormat') {
      strategy = 'youtube_format';
    } else if (coreMedia.builder == 'LocalFile') {
      strategy = 'convert_local';
    } else {
      if (coreMedia.builder == 'JsonMPD') {
        throw new Error(
          'No download strategy for builder: ' + coreMedia.builder,
        );
      }
      if (coreMedia.builder == 'Test') {
        throw new Error(
          'No download strategy for builder: ' + coreMedia.builder,
        );
      }
      coreMedia.builder;
    }
    if (
      audioOnly
      && strategy != 'hls'
      && strategy != 'mpd'
      && strategy != 'file_coapp'
      && strategy != 'youtube_bulk'
    ) {
      return resultErr({
        error: 'cant_download_audio',
        id: 'cant_download_audio',
        downloadable_id: request.downloadable.id,
        report_status: 'unreported',
      });
    }
    if (askForDestination && !coappOk) {
      return resultErr({
        error: 'nocoapp',
        id: 'nocoapp',
        downloadable_id: request.downloadable.id,
        report_status: 'unreported',
      });
    }
    if (strategy != 'file_inbrowser') {
      if (!coappOk) {
        return resultErr({
          error: 'nocoapp',
          id: 'nocoapp',
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
      let minVersion = serviceSmartname;
      if (!serviceUtil.isMinimumVersion(coappVersion, minVersion)) {
        try {
          await serviceCoapp.call('quit');
        } catch {}
        await new Promise(resolve => setTimeout(resolve, 2e3));
        let { status: recheckStatus, info: recheckInfo } =
          await serviceCoapp.check();
        if (
          !recheckStatus
          || !serviceUtil.isMinimumVersion(recheckInfo.version, minVersion)
        ) {
          serviceCoapp.call('quit');
          return resultErr({
            error: 'coapp_too_old',
            id: 'coapp_too_old',
            downloadable_id: request.downloadable.id,
            report_status: 'unreported',
          });
        }
        coappVersion = recheckInfo.version;
      }
    }
    let needQr = !1;
    {
      let licenseOk = !1;
      {
        let { status: licenseStatus } = await serviceLicense.checkLicense();
        licenseOk =
          ((licenseStatus = 'accepted'), true) || licenseStatus == 'unneeded';
      }
      if (!licenseOk) {
        let isGoogle = BUILD_TARGET == 'google';
        let isMozilla = BUILD_TARGET == 'mozilla';
        let isMicrosoft = BUILD_TARGET == 'microsoft';
        let limitMs = 120 * 60 * 1e3;
        let lastDownloadTime = await getSetting(settingLastAdvancedDownload);
        let sinceLastDownload = startTime - lastDownloadTime;
        if (convertTo) {
          return resultErr({
            error: 'invalid_license',
            id: 'invalid_license',
            downloadable_id: request.downloadable.id,
            report_status: 'unreported',
          });
        }
        if (
          audioOnly
          && (strategy == 'mpd' || strategy == 'hls' || isYoutube)
        ) {
          return resultErr({
            error: 'invalid_license_for_audio',
            id: 'invalid_license_for_audio',
            downloadable_id: request.downloadable.id,
            report_status: 'unreported',
          });
        }
        if (
          (isGoogle || isMicrosoft)
          && (strategy == 'mpd' || strategy == 'hls' || isYoutube)
          && sinceLastDownload < limitMs
        ) {
          return resultErr({
            error: 'download_limit',
            id: 'download_limit',
            downloadable_id: request.downloadable.id,
            report_status: 'unreported',
          });
        }
        if (isMozilla && isYoutube && !audioOnly) {
          needQr = !0;
        }
      }
    }
    let baseName;
    let extension;
    if (
      ((extension = coreMedia.container.extension),
      (audioOnly || !coreMedia.av.video)
        && (extension = coreMedia.container.audio_only_extension),
      convertTo && (extension = containerByName(convertTo).extension),
      (baseName = await selectVariantByRule(request.downloadable)),
      (baseName = `${baseName}.${extension}`),
      strategy == 'youtube_bulk',
      strategy == 'file_inbrowser')
    ) {
      let downloadOptions = {
        url: '',
        saveAs: askForDestination,
        filename: baseName,
      };
      if (BUILD_TARGET == 'mozilla') {
        downloadOptions.incognito = request.downloadable.incognito;
      }
      if (variant.sources.video) {
        downloadOptions.url = variant.sources.video;
      } else {
        downloadOptions.url = variant.sources.audio;
      }
      let downloadId =
        await servicePolyfill.default.downloads.download(downloadOptions);
      pending.set(request.downloadable.id, {
        inbrowser: downloadId,
      });
      let receivedBytes = 0;
      let loopStart = Date.now();
      for (;;) {
        let items = await servicePolyfill.default.downloads.search({
          id: downloadId,
        });
        if (items.length > 0) {
          let item = items[0];
          let delta = item.bytesReceived - receivedBytes;
          receivedBytes = item.bytesReceived;
          let progress = item.bytesReceived / item.totalBytes;
          if (
            (onProgress({
              bitrate_bs: delta,
              progress: progress,
              duration_since_start: Date.now() - loopStart,
            }),
            item.error)
          ) {
            console.error('No download item found');
            break;
          }
          if (item.state == 'complete') {
            break;
          }
        } else {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 1e3));
      }
      return resultOk({
        inbrowser: !0,
        download_id: downloadId,
        filename: baseName,
      });
    }
    let downloadDir = await getSetting(settingDownloadDirectory);
    let filePath;
    if (askForDestination) {
      let lastDir = await getSetting(settingLastDownloadDirectory);
      if (lastDir.isNone()) {
        if (downloadDir === 'dwhelper') {
          downloadDir = '~/dwhelper';
        }
      } else {
        downloadDir = lastDir.unwrap();
      }
      let pickerResult = await serviceCoapp.call(
        'filepicker',
        'save_file',
        downloadDir,
        'Download media as',
        baseName,
      );
      let lines = pickerResult.split(`
`);
      if (
        ((filePath = lines[0]),
        (downloadDir = lines[1]),
        await setSetting(settingLastDownloadDirectory, resultSome(downloadDir)),
        (baseName = lines[2]),
        !filePath || !downloadDir || !baseName)
      ) {
        return resultErr({
          error: 'filepicker_error',
          details: 'no files selected. ' + pickerResult,
          id: 'filepicker_error',
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
      if (!filePath.endsWith(extension)) {
        filePath += '.' + extension;
        baseName += '.' + extension;
      }
    } else {
      downloadDir = await serviceFunding(downloadDir);
      {
        let uniqueResult = await serviceCoapp.call(
          'makeUniqueFileName',
          downloadDir,
          baseName,
        );
        filePath = uniqueResult.filePath;
        baseName = uniqueResult.fileName;
      }
      downloadDir = await serviceFunding(downloadDir);
    }
    {
      let maxConcurrent = await getSetting(settingConcurrentDownloadsMax);
      if (pending.size >= maxConcurrent) {
        for (queue.push(request.downloadable.id); ; ) {
          if (
            (await new Promise(resolve => setTimeout(resolve, 2e3)),
            pending.size < maxConcurrent && queue[0] == request.downloadable.id)
          ) {
            queue.shift();
            break;
          }
        }
      }
      pending.set(request.downloadable.id, {});
    }
    let lastSize = 0;
    let startClock = Date.now();
    let reportClock = Date.now();
    let onDownloadProgress = (currentTime, progressData) => {
      let totalSize = parseFloat(progressData.total_size);
      let elapsedSec = (Date.now() - startClock) / 1e3;
      let bitrate = ~~((totalSize - lastSize) / elapsedSec);
      let progress = 'unknown';
      if (typeof coreMedia.duration == 'number') {
        if (currentTime < 0) {
          currentTime = 0;
        }
        let ratio = currentTime / coreMedia.duration;
        if (ratio >= 0 && ratio < 1) {
          progress = ratio;
        }
      } else if (variant.core_media.content_length.isSome()) {
        let contentLength = variant.core_media.content_length.unwrap();
        if (contentLength > 0) {
          progress = progressData.total_size / contentLength;
        }
      }
      onProgress({
        bitrate_bs: bitrate,
        progress: progress,
        duration_since_start: Date.now() - reportClock,
      });
    };
    let onDownloadStart = pid => {
      pending.set(request.downloadable.id, {
        ffmpeg_pid: pid,
      });
      onProgress('starting');
    };
    if (strategy == 'hls') {
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needQr,
        headers: request.downloadable.headers,
        on_progress: onDownloadProgress,
        on_start: onDownloadStart,
      };
      try {
        if (audioOnly || !coreMedia.av.video) {
          let sourceUrl = variant.sources.audio || variant.sources.video;
          await serviceConverter.sideDownload(null, sourceUrl, sideOptions);
        } else {
          if (variant.sources.audio && variant.sources.video) {
            await serviceConverter.sideDownload(
              variant.sources.video,
              variant.sources.audio,
              sideOptions,
            );
          } else {
            if (variant.sources.video) {
              await serviceConverter.sideDownload(
                variant.sources.video,
                null,
                sideOptions,
              );
            } else {
              await serviceConverter.sideDownload(
                null,
                variant.sources.audio,
                sideOptions,
              );
            }
          }
        }
      } catch (err) {
        return resultErr({
          error: 'coapp_failure',
          details: err.toString(),
          id: `coapp_failure_${crypto.randomUUID()}`,
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
    }
    if (strategy == 'mpd') {
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needQr,
        headers: request.downloadable.headers,
        on_progress: onDownloadProgress,
        on_start: onDownloadStart,
      };
      try {
        if (audioOnly) {
          let sourceUrl = variant.sources.audio || variant.sources.video;
          await serviceConverter.sideDownloadMPD(
            variant.manifest_url,
            null,
            sourceUrl,
            sideOptions,
          );
        } else {
          if (variant.sources.audio && variant.sources.video) {
            await serviceConverter.sideDownloadMPD(
              variant.manifest_url,
              variant.sources.video,
              variant.sources.audio,
              sideOptions,
            );
          } else {
            if (variant.sources.video) {
              await serviceConverter.sideDownloadMPD(
                variant.manifest_url,
                variant.sources.video,
                null,
                sideOptions,
              );
            } else {
              await serviceConverter.sideDownloadMPD(
                variant.manifest_url,
                null,
                variant.sources.audio,
                sideOptions,
              );
            }
          }
        }
      } catch (err) {
        return resultErr({
          error: 'coapp_failure',
          details: err.toString(),
          id: `coapp_failure_${crypto.randomUUID()}`,
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
    }
    if (strategy == 'convert_local') {
      let inputPath = variant.manifest_url.replace('file://', '');
      let parts = inputPath.split('.');
      parts.pop();
      parts.push(extension);
      let outputPath = parts.join('.');
      try {
        await serviceConverter.convert3(
          inputPath,
          outputPath,
          onDownloadProgress,
          onDownloadStart,
        );
      } catch (err) {
        return resultErr({
          error: 'coapp_failure',
          details: err.toString(),
          id: `coapp_failure_${crypto.randomUUID()}`,
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
    }
    if (strategy == 'file_coapp') {
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needQr,
        headers: request.downloadable.headers,
        on_progress: onDownloadProgress,
        on_start: onDownloadStart,
      };
      try {
        if (audioOnly) {
          await serviceConverter.sideDownload(
            null,
            variant.manifest_url,
            sideOptions,
          );
        } else {
          await serviceConverter.sideDownload(
            variant.manifest_url,
            null,
            sideOptions,
          );
        }
      } catch (err) {
        return resultErr({
          error: 'coapp_failure',
          details: err.toString(),
          id: `coapp_failure_${crypto.randomUUID()}`,
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
    }
    if (strategy == 'youtube_format') {
      if (!variant.base_js) {
        return resultErr({
          error: 'unknown',
          details: 'Missing BaseJS',
          id: `unknown_${crypto.randomUUID()}`,
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
      let audioURL;
      let videoURL;
      if (variant.sources.video) {
        videoURL = new URL(variant.sources.video);
      } else {
        return resultErr({
          error: 'unknown',
          details: 'Missing Video from YoutubeFormat',
          id: `unknown_${crypto.randomUUID()}`,
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
      if (variant.sources.audio) {
        audioURL = new URL(variant.sources.audio);
      }
      let nParam = videoURL.searchParams.get('n');
      let decodedN;
      if (nParam) {
        decodedN = await serviceCoapp.call(
          'vm.run',
          `((a) => {${variant.base_js}})('${nParam}')`,
        );
        videoURL.searchParams.set('n', decodedN);
      }
      if (audioURL) {
        audioURL.searchParams.set('n', decodedN);
      }
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needQr,
        headers: request.downloadable.headers,
        on_progress: onDownloadProgress,
        on_start: onDownloadStart,
      };
      try {
        if (audioOnly) {
          let url = (audioURL || videoURL).href;
          await serviceConverter.sideDownload(null, url, sideOptions);
        } else {
          if (audioURL && videoURL) {
            await serviceConverter.sideDownload(
              videoURL.href,
              audioURL.href,
              sideOptions,
            );
          } else {
            await serviceConverter.sideDownload(
              videoURL.href,
              null,
              sideOptions,
            );
          }
        }
      } catch (err) {
        return resultErr({
          error: 'coapp_failure',
          details: err.toString(),
          id: `coapp_failure_${crypto.randomUUID()}`,
          downloadable_id: request.downloadable.id,
          report_status: 'unreported',
        });
      }
    }
    let showNotification;
    if (
      (request.downloadable.incognito
        ? (showNotification = await getSetting(
            settingShowSuccessNotificationForIncognito,
          ))
        : (showNotification = await getSetting(settingShowSuccessNotification)),
      showNotification)
    ) {
      let showThumbnail = await getSetting(settingShowThumbnailInNotification);
      let thumbnailUrl = request.downloadable.thumbnail_url;
      if (thumbnailUrl == '/content/images/no-thumbnail.png') {
        thumbnailUrl = servicePolyfill.default.runtime.getURL(thumbnailUrl);
      }
      let customStrings = await getSetting(settingSessionViewOptions);
      let notification = {
        type: 'basic',
        title: formatI18nMessage('v9_vdh_notification', [], customStrings),
        message: formatI18nMessage('v9_file_ready', [baseName], customStrings),
      };
      if (showThumbnail) {
        notification.iconUrl = thumbnailUrl;
      }
      servicePolyfill.default.notifications.create(
        request.downloadable.id,
        notification,
      );
    }
    {
      let downloadCount = await getSetting(settingLastAdvancedDownload);
      if (downloadCount < 2) {
        await setSetting(settingLastAdvancedDownload, downloadCount + 1);
      } else {
        await setSetting(settingLastAdvancedDownload, startTime);
      }
    }
    return resultOk({
      inbrowser: !1,
      filepath: filePath,
      filename: baseName,
      filedir: downloadDir,
      qrcode: needQr,
    });
  }
  async function runServiceDownload(
    pending,
    queue,
    request,
    options,
    onProgress,
  ) {
    try {
      let result = await performServiceDownload(
        pending,
        queue,
        request,
        options,
        onProgress,
      );
      pending.delete(request.downloadable.id);
      return result;
    } catch (err) {
      pending.delete(request.downloadable.id);
      return resultErr({
        error: 'unknown',
        details: err.toString(),
        id: `unknown_${crypto.randomUUID()}`,
        downloadable_id: request.downloadable.id,
        report_status: 'unreported',
      });
    }
  }
  async function cancelServiceDownload(entry) {
    if (entry.inbrowser) {
      servicePolyfill.default.downloads.cancel(entry.inbrowser);
    }
    if (entry.ffmpeg_pid) {
      serviceCoapp.call('abortConvert', entry.ffmpeg_pid);
    }
  }
  var servicePolyfill;
  var serviceCoapp;
  var serviceUtil;
  var serviceLicense;
  var serviceConverter;
  var serviceSmartname;
  var serviceFunding;
  var initServiceDownloads = defineLazyModule(() => {
    'use strict';

    initBuildTarget();
    initMessageFormatting();
    initTsResultsIndex();
    servicePolyfill = toEsm(requirePolyfill(), 1);
    initContainers();
    initSettingsBrowser();
    initSettings();
    serviceCoapp = (initCoapp(), toCommonjs(coappNs));
    serviceUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    serviceLicense = (initLicense(), toCommonjs(licenseNs));
    serviceConverter = (initConverter(), toCommonjs(coappSideNs));
    serviceSmartname = '2.0.19';
    serviceFunding = async dir => {
      try {
        dir = await serviceCoapp.call('path.homeJoin', dir);
        await serviceCoapp.call('fs.mkdirp', dir);
      } catch (err) {
        console.error('mkdir error', err, dir);
      }
      return dir;
    };
  });
  function hasHitsForCurrentTab(state, viewOptions) {
    for (let entry of state.downloadable.values()) {
      if (entry.tab_id == state.current_tab_id) {
        return !0;
      }
    }
    for (let entry of state.downloading.values()) {
      if (entry.downloadable.tab_id == state.current_tab_id) {
        return !0;
      }
    }
    if (!viewOptions.hide_downloaded) {
      for (let entry of state.downloaded.values()) {
        if (entry.downloadable.tab_id == state.current_tab_id) {
          return !0;
        }
      }
    }
    return !1;
  }
  function findCurrentTabDownloadable(state, viewOptions) {
    let entries = collectDownloadableViews(state, viewOptions);
    for (let [entryId, info] of entries) {
      if (
        info.reach === 'downloadable'
        && info.is_visible
        && info.is_current_tab
      ) {
        return resultSome(entryId);
      }
    }
    return ResultNone;
  }
  function collectDownloadableViews(state, viewOptions) {
    let byTab = new Map();
    let downloadableEntries = [];
    {
      for (let downloadable of state.downloadable.values()) {
        if (!byTab.has(downloadable.tab_id)) {
          byTab.set(downloadable.tab_id, {
            downloadables: [],
            filter_out_low_quality: !1,
          });
        }
        let tabGroup = byTab.get(downloadable.tab_id);
        tabGroup.downloadables.push(downloadable);
        if (!downloadable.is_low_quality) {
          tabGroup.filter_out_low_quality = !0;
        }
      }
      for (let item of [
        ...state.downloading.values(),
        ...state.downloaded.values(),
      ]) {
        let tabGroup = byTab.get(item.downloadable.tab_id);
        if (tabGroup && !item.downloadable.is_low_quality) {
          tabGroup.filter_out_low_quality = !0;
        }
      }
      for (let [tabId, tabGroup] of byTab.entries()) {
        let isCurrentTab = tabId == state.current_tab_id;
        let isVisible = isCurrentTab || tabId == 'none' || viewOptions.all_tabs;
        for (let downloadable of tabGroup.downloadables) {
          let entry = {
            order: 0,
            is_current_tab: isCurrentTab,
            id: downloadable.id,
            timestamp: downloadable.timestamp,
            reach: 'downloadable',
            is_visible: isVisible,
          };
          if (
            tabGroup.filter_out_low_quality
            && downloadable.is_low_quality
            && !viewOptions.low_quality
          ) {
            entry.is_visible = !1;
          }
          downloadableEntries.push([downloadable, entry]);
        }
      }
    }
    let downloadingEntries = [...state.downloading.values()].map(item => [
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
    let downloadedEntries = [...state.downloaded.values()].map(item => [
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
    let allEntries;
    {
      let byTimestamp = ([, metaA], [, metaB]) =>
        metaB.timestamp - metaA.timestamp;
      if (viewOptions.sort_by_status) {
        downloadableEntries.sort(byTimestamp);
        downloadingEntries.sort(byTimestamp);
        downloadedEntries.sort(byTimestamp);
        allEntries = [
          ...downloadableEntries,
          ...downloadingEntries,
          ...downloadedEntries,
        ];
      } else {
        allEntries = [
          ...downloadableEntries,
          ...downloadingEntries,
          ...downloadedEntries,
        ];
        allEntries.sort(byTimestamp);
      }
      if (viewOptions.sort_reverse) {
        allEntries.reverse();
      }
    }
    let visibleOrder = 0;
    for (let entry of allEntries) {
      if (entry[1].is_visible) {
        entry[1].order = visibleOrder++;
      }
    }
    return allEntries;
  }
  var initDownloadableViews = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
  });
  async function persistServiceLogs() {
    serviceLogsTimer = void 0;
    let logs = [
      ...(await getSetting(settingDebuggerLogs)),
      ...serviceLogBuffer,
    ].slice(-500);
    await setSetting(settingDebuggerLogs, logs);
    serviceLogBuffer.length = 0;
  }
  function addLogEntry(message) {
    if (debugLoggingEnabled) {
      serviceLogBuffer.push({
        timestamp: Date.now(),
        message: message,
      });
      if (!serviceLogsTimer) {
        serviceLogsTimer = setTimeout(persistServiceLogs, 500);
      }
    }
  }
  function broadcastToUi(msg) {
    mainBrowser.default.runtime.sendMessage(msg).catch(err => {});
  }
  function sendToTab(tabId, msg) {
    mainBrowser.default.tabs.sendMessage(tabId, msg).catch(err => {});
  }
  async function notifyDownloadComplete(result, downloadable) {
    if (!result.inbrowser && (await getSetting(settingRecordDownloadHistory))) {
      let now = Date.now();
      let record = {
        download_result: structuredClone(result),
        page_url: downloadable.page_url,
        timestamp: now,
      };
      let history = await getSetting(settingDownloadHistory);
      history.set(downloadable.id, record);
      {
        let maxAge =
          (await getSetting(settingHistoryLimitInDays)) * 1e3 * 60 * 60 * 24;
        for (let [entryId, entry] of history.entries()) {
          if (now - entry.timestamp > maxAge) {
            history.delete(entryId);
          }
        }
      }
      await setSetting(settingDownloadHistory, history);
    }
  }
  async function syncContextMenus(state) {
    if (!(await getSetting(settingShowContextMenu))) {
      mainBrowser.default.contextMenus.update('vdh-top', {
        visible: !1,
      });
      return;
    }
    mainBrowser.default.contextMenus.update('vdh-top', {
      visible: !0,
    });
    let items = [];
    if (state.downloadable.size > 0) {
      let viewOptions = await getSetting(settingViewOptions);
      let entries = collectDownloadableViews(state, viewOptions);
      for (let [item, info] of entries) {
        if (info.reach != 'downloadable' || !info.is_visible) {
          continue;
        }
        let downloadable = item;
        items.push({
          title: downloadable.title,
          enabled: !1,
        });
        for (let variant of downloadable.variants.values()) {
          let label =
            variant.core_media.container.name
            + ' - '
            + variant.core_media.builder;
          if (
            variant.core_media.av.video
            && variant.core_media.av.video.dimensions.isSome()
          ) {
            let dims = variant.core_media.av.video.dimensions.unwrap();
            label +=
              ' - ' + dims.width.toString() + 'x' + dims.height.toString();
          }
          if (typeof variant.core_media.duration == 'number') {
            label += ' - ' + formatDuration(variant.core_media.duration);
          }
          items.push({
            title: label,
            enabled: !0,
            onclick: () => {
              let request = {
                downloadable_id: downloadable.id,
                variant_id: variant.id,
                audio_only: !1,
                ask_for_destination: !1,
                convert_to: void 0,
              };
              handleDownloadMessage(state, request);
            },
          });
        }
      }
    }
    if (items.length == 0) {
      items.push({
        title: 'no media',
        enabled: !1,
      });
    }
    for (let menuIndex = 0; menuIndex < MAX_CONTEXT_MENU_ITEMS; menuIndex++) {
      if (menuIndex < items.length) {
        mainBrowser.default.contextMenus.update('vdh-sub-' + menuIndex, {
          ...items[menuIndex],
          visible: !0,
        });
      } else {
        mainBrowser.default.contextMenus.update('vdh-sub-' + menuIndex, {
          visible: !1,
        });
      }
    }
    mainBrowser.default.contextMenus.update('vdh-blacklist', {
      onclick: () => {
        mainBrowser.default.tabs.create({
          url: '/content2/blacklist.html',
        });
      },
    });
    mainBrowser.default.contextMenus.update('vdh-smartnaming', {
      onclick: async () => {
        let viewOptions = await getSetting(settingViewOptions);
        let currentDownloadable = findCurrentTabDownloadable(
          state,
          viewOptions,
        );
        if (currentDownloadable.isSome()) {
          let downloadableId = currentDownloadable.unwrap().id;
          mainBrowser.default.tabs.create({
            url: `/content2/smartnaming_editor.html?id=${downloadableId}`,
          });
        }
      },
    });
  }
  async function refreshActionIcon(state) {
    let viewOptions = await getSetting(settingViewOptions);
    let iconInstructions = {
      size: 150,
      radius: 40,
      spread: 30,
      greyed: !hasHitsForCurrentTab(state, viewOptions),
      channel: BUILD_CHANNEL,
    };
    if (state.download_errors.size > 0) {
      mainBrowser.default.action.setBadgeText({
        text: state.download_errors.size.toString(),
      });
      mainBrowser.default.action.setBadgeBackgroundColor({
        color: [255, 0, 0, 190],
      });
      try {
        mainBrowser.default.action.setBadgeTextColor({
          color: 'white',
        });
      } catch (ignored) {}
    } else if (state.downloading.size > 0) {
      mainBrowser.default.action.setBadgeText({
        text: state.downloading.size.toString(),
      });
      mainBrowser.default.action.setBadgeBackgroundColor({
        color: '#0284c7',
      });
      try {
        mainBrowser.default.action.setBadgeTextColor({
          color: 'white',
        });
      } catch (ignored) {}
    } else {
      mainBrowser.default.action.setBadgeText({
        text: '',
      });
    }
    let imageData = renderIconImage(iconInstructions, iconImageCache);
    mainBrowser.default.action.setIcon({
      imageData: imageData,
    });
  }
  function persistLogState(state) {
    if (statePersistTimer) {
      clearTimeout(statePersistTimer);
      statePersistTimer = void 0;
    }
    setSetting(settingServiceDatabase, state);
    refreshActionIcon(state);
    syncContextMenus(state);
  }
  function scheduleLogPersist(state) {
    if (typeof statePersistTimer > 'u') {
      statePersistTimer = setTimeout(() => {
        statePersistTimer = void 0;
        persistLogState(state);
      }, 200);
    }
  }
  async function publishDownloadable(downloadable, autoDownload) {
    if (!serviceDb) {
      return;
    }
    if (downloadable.is_low_quality) {
      let hitCount = pageHitCounts.get(downloadable.page_url) ?? 0;
      if (hitCount > 30) {
        return;
      }
      pageHitCounts.set(downloadable.page_url, hitCount + 1);
    }
    for (let handler of siteHandlers) {
      if (handler.mutateDownloadable) {
        handler.mutateDownloadable(downloadable);
      }
    }
    let variants = [...downloadable.variants.values()];
    for (let pattern of urlFilterRegexes) {
      if (
        downloadable.page_url.match(pattern)
        || variants[0].manifest_url.match(pattern)
      ) {
        return;
      }
    }
    if (
      serviceDb.downloadable.has(downloadable.id)
      || serviceDb.downloading.has(downloadable.id)
      || serviceDb.downloaded.has(downloadable.id)
    ) {
      return;
    }
    let byContainer = new Map();
    for (let variant of variants) {
      let containerName = variant.core_media.container.name;
      if (!byContainer.has(containerName)) {
        byContainer.set(containerName, []);
      }
      byContainer.get(containerName).push(variant);
    }
    let prefs = await getSetting(settingMediaUserPref);
    let groups = [...byContainer.values()];
    groups.sort((groupA, groupB) => {
      let firstA = groupA[0];
      let firstB = groupB[0];
      return compareFormats(firstA.core_media, firstB.core_media, prefs);
    });
    downloadable.variants = new Map();
    for (let group of groups) {
      group.sort((variantA, variantB) =>
        compareFormats(variantA.core_media, variantB.core_media, prefs),
      );
      group = group.slice(0, prefs.max_variants);
      for (let variant of group) {
        downloadable.variants.set(variant.id, variant);
      }
    }
    if (
      (serviceDb.downloadable.set(downloadable.id, downloadable), autoDownload)
    ) {
      let firstVariantId = downloadable.variants.values().next().value.id;
      handleDownloadMessage(serviceDb, {
        downloadable_id: downloadable.id,
        variant_id: firstVariantId,
        audio_only: !1,
        ask_for_destination: !1,
        convert_to: void 0,
      });
    }
    scheduleLogPersist(serviceDb);
  }
  async function refreshLicenseStatus(state, key) {
    state.license_status = {
      checking: !0,
    };
    persistLogState(state);
    let result;
    if (
      (!key || key.length == 0
        ? (result = await mainLicense.checkLicense())
        : (result = await mainLicense.validateLicense(key)),
      ((result.status = 'accepted'), true)
        ? ((state.license_status = {
            accepted: !0,
            email: result.email,
            key: result.key,
          }),
          !(await getSetting(settingValidLicenseMessageShown))
            && (state.user_messages.add('license_now_valid'),
            await setSetting(settingValidLicenseMessageShown, !0)),
          state.download_errors.delete('invalid_license'),
          state.download_errors.delete('invalid_license_for_audio'),
          state.download_errors.delete('download_limit'))
        : state.user_messages.delete('license_now_valid'),
      result.status == 'invalid'
        && (state.license_status = {
          invalid: !0,
          key: result.key,
        }),
      result.status == 'unneeded'
        && (state.license_status = {
          unneeded: !0,
        }),
      result.status == 'nocoapp'
        && (state.license_status = {
          nocoapp: !0,
        }),
      result.status == 'mismatch')
    ) {
      let brExt = result.brExt;
      let brLicense = result.brLicense;
      state.license_status = {
        mismatch: !0,
        key: result.key,
        other_browser: brLicense,
        this_browser: brExt,
      };
    }
    if (result.status == 'unset') {
      state.license_status = {
        unset: !0,
      };
    }
    if (result.status == 'blocked') {
      state.license_status = {
        blocked: !0,
        key: result.key,
      };
    }
    if (result.status == 'locked') {
      state.license_status = {
        locked: !0,
        key: result.key,
      };
    }
    scheduleLogPersist(state);
  }
  async function refreshCoappStatus(state, delay) {
    let prevStatus = structuredClone(state.coapp_status);
    state.coapp_status = 'checking';
    persistLogState(state);
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, 1e3));
    }
    let { status, info, error } = await mainCoapp.check();
    if (status) {
      let newVersion;
      if (compareSemVer(info.version, REQUIRED_COAPP_VERSION) < 0) {
        newVersion = REQUIRED_COAPP_VERSION;
      } else {
        newVersion = !1;
      }
      state.download_errors.delete('nocoapp');
      state.coapp_status = {
        found: !0,
        path: info.binary,
        version: info.version,
        new_version: newVersion,
      };
    } else {
      state.coapp_status = {
        found: !1,
        error: error,
      };
    }
    if (
      prevStatus != 'checking'
      && prevStatus.found != state.coapp_status.found
    ) {
      refreshLicenseStatus(state);
    } else {
      scheduleLogPersist(state);
    }
  }
  async function handleDownloadMessage(state, request) {
    addLogEntry('Service:HandleDownloadMessage');
    let downloadableId = request.downloadable_id;
    let variantId = request.variant_id;
    let downloadable = state.downloadable.get(downloadableId);
    if (!downloadable) {
      addLogEntry('DB inconsistency');
      console.error('DB inconsistency', downloadable, downloadableId);
      return;
    }
    state.downloadable.delete(downloadableId);
    let downloadingEntry = {
      downloadable: downloadable,
      variant_id: variantId,
      progress: 'queued',
    };
    state.downloading.set(downloadableId, downloadingEntry);
    persistLogState(state);
    addLogEntry('downloading set - to call do_download');
    let result = await runServiceDownload(
      serviceActiveDownloads,
      serviceDownloadQueue,
      downloadingEntry,
      request,
      progress => {
        if (
          typeof progress != 'string'
          && typeof progress.progress == 'number'
          && (progress.progress > 1 || progress.progress < 0)
        ) {
          progress.progress = 'unknown';
        }
        downloadingEntry.progress = progress;
        broadcastToUi({
          progress_changed: {
            progress: progress,
            downloadable_id: downloadableId,
          },
        });
        refreshActionIcon(state);
      },
    );
    if ((state.downloading.delete(downloadableId), result.isOk())) {
      let count = await getSetting(settingSuccessfulDl);
      await setSetting(settingSuccessfulDl, count + 1);
      if (count > 100) {
        await setSetting(settingSuccessfulDl, 0);
        if (!(await getSetting(settingNeverShowSuccessfulDlMessage))) {
          state.user_messages.add('one_hundred_downloads');
        }
      }
      let downloadResult = result.unwrap();
      let qrEnabled = await getSetting(settingYtWarning);
      if (!downloadResult.inbrowser && downloadResult.qrcode && qrEnabled) {
        let qrError = {
          id: 'qrcode',
          downloadable_id: downloadableId,
          error: 'qrcode',
          report_status: 'unreported',
        };
        state.download_errors.set(qrError.id, qrError);
      }
      if (!(await getSetting(settingAutoHideDownloadedMessageShown))) {
        state.user_messages.add('auto_hide_downloaded');
        setSetting(settingAutoHideDownloadedMessageShown, !0);
      }
      let downloadedEntry = {
        downloadable: downloadable,
        variant_id: variantId,
        download_result: downloadResult,
      };
      state.downloaded.set(downloadableId, downloadedEntry);
      await notifyDownloadComplete(downloadResult, downloadable);
    } else {
      state.downloadable.set(downloadable.id, downloadable);
      let err = result.unwrapErr();
      if (!(err.error == 'filepicker_error')) {
        state.download_errors.set(err.id, err);
      }
    }
    persistLogState(state);
  }
  async function serviceStartListeners(state) {
    addLogEntry('StartListeners');
    mainBrowser.default.commands.onCommand.addListener(async command => {
      if (command == 'default-action') {
        let viewOptions = await getSetting(settingViewOptions);
        let currentDownloadable = findCurrentTabDownloadable(
          state,
          viewOptions,
        );
        if (currentDownloadable.isNone()) {
          return;
        }
        let action = await getSetting(settingDefaultAction);
        let downloadable = currentDownloadable.unwrap();
        let variant = downloadable.variants.values().next().value;
        if (action == 'copy') {
          if (BUILD_TARGET == 'mozilla') {
            navigator.clipboard.writeText(variant.to_copy);
          } else {
            mainBrowser.default.scripting.executeScript({
              target: {
                tabId: downloadable.tab_id,
              },
              func: text => navigator.clipboard.writeText(text),
              args: [variant.to_copy],
            });
          }
        } else {
          let request = {
            downloadable_id: downloadable.id,
            variant_id: variant.id,
            audio_only: action == 'download_audio',
            ask_for_destination: action == 'download_as',
            convert_to: void 0,
          };
          handleDownloadMessage(state, request);
        }
      }
    });
    mainBrowser.default.browserAction?.onClicked?.addListener(() => {
      if (sidebarEnabled) {
        mainBrowser.default.sidebarAction.toggle();
      } else {
        mainBrowser.default.browserAction.openPopup();
      }
    });
    mainBrowser.default.runtime.onSuspend.addListener(() => {
      addLogEntry('OnSuspend');
      mainCoapp.call('quit');
    });
    mainBrowser.default.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if ('url' in changeInfo) {
        let now = Date.now();
        for (let downloadable of state.downloadable.values()) {
          if (
            downloadable.tab_id == tabId
            && now - downloadable.timestamp > 2e3
          ) {
            state.downloadable.delete(downloadable.id);
            pageHitCounts.delete(downloadable.page_url);
            scheduleLogPersist(state);
          }
        }
      }
    });
    mainBrowser.default.tabs.onActivated.addListener(activeInfo => {
      state.current_tab_id = activeInfo.tabId;
      state.current_window_id = activeInfo.windowId;
      persistLogState(state);
    });
    mainBrowser.default.windows.onFocusChanged.addListener(async windowId => {
      let activeTab = (
        await mainBrowser.default.tabs.query({
          active: !0,
          currentWindow: !0,
        })
      )[0];
      if (activeTab) {
        state.current_tab_id = activeTab.id ?? -1;
        state.current_window_id = activeTab.windowId ?? -1;
        persistLogState(state);
      }
    });
    mainBrowser.default.tabs.onRemoved.addListener(async tabId => {
      let changed = !1;
      if (
        (state.yt_bulk.isSome()
          && state.yt_bulk.unwrap().tab_id == tabId
          && ((changed = !0),
          (state.yt_bulk = ResultNone),
          state.user_messages.delete('yt_bulk_detected')),
        await getSetting(settingForgetMediaOnTabClose))
      ) {
        for (let downloadable of state.downloadable.values()) {
          if (downloadable.tab_id == tabId) {
            state.downloadable.delete(downloadable.id);
            changed = !0;
          }
        }
      }
      if (changed) {
        persistLogState(state);
      }
    });
    mainBrowser.default.runtime.onMessage.addListener(
      async (message, sender) => {
        let isDebuggerLog =
          typeof message == 'object' && 'debugger_new_logs' in message;
        isDebuggerLog =
          isDebuggerLog
          || (typeof message == 'string' && message == 'debugger_request_logs');
        if (!isDebuggerLog) {
          addLogEntry(`Service:onMessage - ${JSON.stringify(message)}`);
        }
        let msg = message;
        if (typeof msg == 'string') {
          if (
            (msg == 'request_license_status'
              && sender.tab?.id
              && sendToTab(sender.tab.id, {
                license_status: state.license_status,
              }),
            msg == 'select_download_directory')
          ) {
            let customStrings = await getSetting(settingSessionViewOptions);
            let prompt = formatI18nMessage(
              'v9_filepicker_select_download_dir',
              [],
              customStrings,
            );
            let dir = (
              await mainCoapp.call('filepicker', 'pick_folder', '~', prompt)
            ).split(`
`)[0];
            if (typeof dir == 'string' && dir.length > 0) {
              setSetting(settingDownloadDirectory, dir);
            }
            return;
          }
          if (
            (msg == 'incognito_check'
              && ((await mainBrowser.default.extension.isAllowedIncognitoAccess())
                ? state.user_messages.delete('no_incognito')
                : (await getSetting(settingNeverShowNoIncognitoMsgAgain))
                  || (await setSetting(settingNeverShowNoIncognitoMsgAgain, !0),
                  state.user_messages.add('no_incognito'),
                  scheduleLogPersist(state))),
            msg == 'leave_review'
              && (state.user_messages.delete('one_hundred_downloads'),
              BUILD_TARGET == 'mozilla'
                ? mainBrowser.default.tabs.create({
                    url: 'https://addons.mozilla.org/firefox/addon/video-downloadhelper',
                  })
                : BUILD_TARGET == 'google'
                  ? mainBrowser.default.tabs.create({
                      url: 'https://chrome.google.com/webstore/detail/video-downloadhelper/lmjnegcaeklhafolokijcfjliaokphfk',
                    })
                  : BUILD_TARGET == 'microsoft'
                    && mainBrowser.default.tabs.create({
                      url: 'https://microsoftedge.microsoft.com/addons/detail/video-downloadhelper/jmkaglaafmhbcpleggkmaliipiilhldn',
                    }),
              persistLogState(state)),
            msg == 'never_ask_for_review'
              && (state.user_messages.delete('one_hundred_downloads'),
              await setSetting(settingNeverShowSuccessfulDlMessage, !0),
              persistLogState(state)),
            msg == 'bulk_download'
              && (state.user_messages.delete('yt_bulk_detected'),
              state.yt_bulk.isSome()))
          ) {
            let ytBulk = state.yt_bulk.unwrap();
            for (let videoId of ytBulk.ids) {
              let bulkUrl = `https://www.youtube.com/watch?v=${videoId}&vdh-bulk=1`;
              let tab = await mainBrowser.default.tabs.create({
                url: bulkUrl,
                active: !1,
              });
              mainBrowser.default.tabs
                .update(tab.id, {
                  muted: !0,
                })
                .then(async () => {
                  for (let attempt = 0; attempt < 30; attempt++) {
                    await new Promise(resolve => setTimeout(resolve, 2e3));
                    for (let downloadItem of state.downloading.values()) {
                      if (downloadItem.downloadable.tab_id == tab.id) {
                        mainBrowser.default.tabs.remove(tab.id);
                      }
                    }
                  }
                });
            }
          }
        } else {
          if ('yt_selection' in msg && BUILD_TARGET != 'google') {
            let tabId = sender.tab?.id;
            if (tabId) {
              state.yt_bulk = resultSome({
                ids: msg.yt_selection,
                tab_id: tabId,
              });
              state.user_messages.add('yt_bulk_detected');
              scheduleLogPersist(state);
            }
            return;
          }
          if ('coapp_check' in msg) {
            refreshCoappStatus(state, msg.coapp_check);
            return;
          }
          if ('rm_error' in msg) {
            state.download_errors.delete(msg.rm_error);
            persistLogState(state);
            return;
          }
          if ('rm_user_message' in msg) {
            state.user_messages.delete(msg.rm_user_message);
            persistLogState(state);
            return;
          }
          if ('clean' in msg) {
            let alsoDownloaded = msg.clean;
            state.downloadable.clear();
            if (alsoDownloaded) {
              state.downloaded.clear();
            }
            persistLogState(state);
            return;
          }
          if ('license_check' in msg) {
            refreshLicenseStatus(state, msg.license_check);
            return;
          }
          if ('report_error' in msg) {
            let errorId = msg.report_error;
            let errorEntry = state.download_errors.get(errorId);
            if (errorEntry && errorEntry.details) {
              errorEntry.report_status = 'reporting';
              persistLogState(state);
              try {
                let platformInfo =
                  await mainBrowser.default.runtime.getPlatformInfo();
                let manifest = mainBrowser.default.runtime.getManifest();
                let version = manifest.version_name ?? manifest.version;
                let downloadable = state.downloadable.get(
                  errorEntry.downloadable_id,
                );
                if (downloadable) {
                  let serialized = typeTagOf(downloadable);
                  delete serialized.headers;
                  let reportBody = {
                    'vdh-bug-report': !0,
                    dable: serialized,
                    channel: BUILD_CHANNEL,
                    target: BUILD_TARGET,
                    ua: navigator.userAgent,
                    platform: {
                      arg: platformInfo.arch,
                      os: platformInfo.os,
                    },
                    version: version,
                    lang: mainBrowser.default.i18n.getUILanguage(),
                    details: errorEntry.details,
                  };
                  await fetch(
                    globalThis.extConfig.getUrlValue('reportsApiUrl'),
                    {
                      method: 'POST',
                      cache: 'no-cache',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      redirect: 'follow',
                      referrerPolicy: 'no-referrer',
                      body: JSON.stringify(reportBody),
                    },
                  );
                }
                errorEntry.report_status = 'reported';
              } catch {
                errorEntry.report_status = 'reported';
              }
              scheduleLogPersist(state);
            }
          }
          if ('forget' in msg) {
            let forgetId = msg.forget;
            let forgotten =
              state.downloadable.get(forgetId)
              || state.downloaded.get(forgetId)?.downloadable;
            if (
              (state.downloadable.delete(forgetId),
              state.downloaded.delete(forgetId),
              forgotten
                && !forgotten.is_low_quality
                && !(await getSetting(settingViewOptions)).low_quality)
            ) {
              for (let other of state.downloadable.values()) {
                if (forgotten.tab_id == other.tab_id && other.is_low_quality) {
                  state.downloadable.delete(other.id);
                }
              }
            }
            persistLogState(state);
          }
          if ('stop' in msg) {
            let stopId = msg.stop;
            let pendingEntry = serviceActiveDownloads.get(stopId);
            let downloadingEntry = state.downloading.get(stopId);
            if (!pendingEntry || !downloadingEntry) {
              addLogEntry("Can't find abordable download");
              return;
            }
            cancelServiceDownload(pendingEntry);
            downloadingEntry.progress = 'stopping';
            broadcastToUi({
              progress_changed: {
                progress: downloadingEntry.progress,
                downloadable_id: stopId,
              },
            });
          }
          if ('retry' in msg) {
            let retryId = msg.retry;
            let clonedDownloadable = {
              ...state.downloaded.get(retryId).downloadable,
            };
            clonedDownloadable.timestamp = Date.now();
            clonedDownloadable.id = `downloadable_${crypto.randomUUID()}`;
            clonedDownloadable.tab_id = 'none';
            clonedDownloadable.is_low_quality = !1;
            await publishDownloadable(clonedDownloadable);
            persistLogState(state);
          }
          if ('convert_local_to' in msg) {
            let convertTo = msg.convert_local_to;
            let customStrings = await getSetting(settingSessionViewOptions);
            let prompt = formatI18nMessage(
              'v9_filepicker_select_file',
              [],
              customStrings,
            );
            let pickLines = (
              await mainCoapp.call('filepicker', 'pick_file', '~', prompt)
            ).split(`
`);
            let filePath = pickLines[0];
            if (filePath) {
              let fileName = pickLines[2];
              let downloadableId = `downloadable_${hashToHex(filePath)}`;
              let variantId = `variant_${hashToHex(filePath)}`;
              let ext = filePath.split('.').pop();
              let containerResult = containerForExtension(ext);
              if (containerResult.isSome()) {
                let [container, scope] = containerResult.unwrap();
                let coreMedia = {
                  content_length: ResultNone,
                  builder: 'LocalFile',
                  protocol: 'unknown',
                  duration: 'unknown',
                  container: container,
                  av: {
                    audio: !1,
                    video: unknownVideoTrack(),
                  },
                };
                let variant = {
                  id: variantId,
                  manifest_url: 'file://' + filePath,
                  core_media: coreMedia,
                  sources: {
                    audio: !1,
                    video: 'file://' + filePath,
                  },
                  to_copy: filePath,
                };
                let downloadable = {
                  id: downloadableId,
                  tab_id: 'none',
                  timestamp: Date.now(),
                  incognito: !1,
                  page_url: 'about:blank',
                  page_title: fileName,
                  title: fileName,
                  favicon_url: 'about:blank',
                  thumbnail_url: '/content/images/no-thumbnail.png',
                  headers: [],
                  is_low_quality: !1,
                  variants: new Map([[variantId, variant]]),
                };
                state.downloadable.set(downloadableId, downloadable);
                let request = {
                  downloadable_id: downloadableId,
                  variant_id: variantId,
                  audio_only: scope == 'audio_only',
                  ask_for_destination: !1,
                  convert_to: convertTo,
                };
                await handleDownloadMessage(state, request);
              }
            }
          }
          if ('rm' in msg) {
            let rmId = msg.rm;
            let result = state.downloaded.get(rmId).download_result;
            if (result.inbrowser) {
              await mainBrowser.default.downloads.removeFile(
                result.download_id,
              );
              await mainBrowser.default.downloads.erase({
                id: result.download_id,
              });
            } else {
              mainCoapp.call('fs.unlink', result.filepath);
            }
            state.downloaded.delete(rmId);
            persistLogState(state);
            let history = await getSetting(settingDownloadHistory);
            history.delete(rmId);
            await setSetting(settingDownloadHistory, history);
          }
          if ('play' in msg) {
            let playId = msg.play;
            let result = state.downloaded.get(playId).download_result;
            if (!result.inbrowser) {
              mainCoapp.call('open', result.filepath);
            }
          }
          if ('show_dir' in msg) {
            let showId = msg.show_dir;
            let result = state.downloaded.get(showId).download_result;
            if (result.inbrowser) {
              mainBrowser.default.downloads.show(result.download_id);
            } else {
              mainCoapp.call('open', result.filedir);
            }
          }
          if ('download' in msg) {
            let request = msg.download;
            await handleDownloadMessage(state, request);
          }
        }
      },
    );
  }
  async function registerContextMenus(state) {
    await mainBrowser.default.contextMenus.removeAll();
    let create = props =>
      new Promise(resolve =>
        mainBrowser.default.contextMenus.create(props, resolve),
      );
    await create({
      id: 'vdh-top',
      title: globalThis.extConfig.getLiteralValue('productName'),
      contexts: ['page'],
    });
    for (let menuIndex = 0; menuIndex < MAX_CONTEXT_MENU_ITEMS; menuIndex++) {
      await create({
        parentId: 'vdh-top',
        title: '---',
        id: 'vdh-sub-' + menuIndex,
      });
    }
    await create({
      parentId: 'vdh-top',
      id: 'vdh-separator',
      type: 'separator',
    });
    let customStrings = await getSetting(settingSessionViewOptions);
    await create({
      parentId: 'vdh-top',
      id: 'vdh-blacklist',
      title: formatI18nMessage('v9_menu_item_blacklist', [], customStrings),
    });
    await create({
      parentId: 'vdh-top',
      id: 'vdh-smartnaming',
      title: formatI18nMessage('v9_menu_item_smartnaming', [], customStrings),
    });
    onSettingChanged(settingShowContextMenu, () => syncContextMenus(state));
    onSettingChanged(settingViewOptions, () => {
      refreshActionIcon(state);
      syncContextMenus(state);
    });
  }
  function pruneExpiredDownloadables() {
    if (!serviceDb) {
      return;
    }
    let now = Date.now();
    for (let downloadable of serviceDb.downloadable.values()) {
      if (now - downloadable.timestamp > DOWNLOADABLE_TTL_MS) {
        serviceDb.downloadable.delete(downloadable.id);
        scheduleLogPersist(serviceDb);
      }
    }
  }
  function compileUrlFilters(patterns) {
    patterns = [
      'https://www.youtube.com/s/search/audio/*.mp3',
      'https://*.xvideos-cdn.com/videos/videopreview/*.mp4',
      'https://*.phncdn.com/videos/*.webm*',
      'https://ev-ph.rdtcdn.com/videos/*.mp4*',
      'https://ev-ph.ypncdn.com/videos/*.mp4*',
      'https://thumb-*.xhcdn.com/*',
      'https://*.sacdnssedge.com/*',
      ...patterns,
    ];
    urlFilterRegexes = [];
    for (let pattern of patterns) {
      if (pattern.length != 0) {
        pattern = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
        pattern = pattern.replaceAll('*', '.*');
        try {
          urlFilterRegexes.push(new RegExp(pattern));
        } catch {
          addLogEntry('Failed to compile regex: ' + pattern);
        }
      }
    }
  }
  function setSidebarEnabled(useSidebar) {
    sidebarEnabled = useSidebar;
    applySidebarMode(sidebarEnabled, serviceDb.current_window_id, !1);
  }
  async function setupRuntimeMessaging() {
    debugLoggingEnabled = await getSetting(settingDebuggerEnabled);
    mainBrowser.default.runtime.onMessage.addListener(
      async (message, sender) => {
        let msg = message;
        if (typeof msg == 'string') {
          if (msg == 'debugger_toggle') {
            let enabled = await getSetting(settingDebuggerEnabled);
            setSetting(settingDebuggerEnabled, !enabled);
          } else if (msg == 'debugger_restart_addon') {
            mainBrowser.default.runtime.reload();
          } else if (msg == 'debugger_request_logs' && sender.tab?.id) {
            let enabled = await getSetting(settingDebuggerEnabled);
            let logsText = '';
            if (!enabled) {
              logsText = 'debugger disabled';
            } else if (!debugLoggingEnabled) {
              logsText = 'restart required';
            } else if (serviceDb) {
              let lastErrorStr =
                mainBrowser.default.runtime.lastError?.toString()
                || '(lastError empty)';
              let serialized = typeTagOf(serviceDb);
              if (
                'license_status' in serialized
                && serialized.license_status
                && typeof serialized.license_status == 'object'
              ) {
                if ('key' in serialized.license_status) {
                  delete serialized.license_status.key;
                }
                if ('email' in serialized.license_status) {
                  delete serialized.license_status.email;
                }
              }
              let stateJson = JSON.stringify(serialized, null, 2);
              let logsStr = (await getSetting(settingDebuggerLogs))
                .sort((entryA, entryB) => entryA.timestamp - entryB.timestamp)
                .map(entry => `${entry.timestamp} : ${entry.message}`).join(`
`);
              logsText =
                lastErrorStr
                + `
`
                + logsStr
                + `
`
                + stateJson;
            }
            mainBrowser.default.tabs.sendMessage(sender.tab.id, {
              all_logs: logsText,
            });
          }
        } else {
          if ('debugger_new_logs' in msg) {
            serviceLogBuffer.push(...msg.debugger_new_logs);
            persistServiceLogs();
          }
        }
      },
    );
  }
  var mainBrowser;
  var REQUIRED_COAPP_VERSION;
  var MAX_CONTEXT_MENU_ITEMS;
  var DOWNLOADABLE_TTL_MS;
  var mainCoapp;
  var mainLicense;
  var serviceLogBuffer;
  var debugLoggingEnabled;
  var serviceLogsTimer;
  var serviceActiveDownloads;
  var serviceDownloadQueue;
  var iconImageCache;
  var sidebarEnabled;
  var statePersistTimer;
  var urlFilterRegexes;
  var pageHitCounts;
  var serviceDb;
  var initMain = defineLazyModule(() => {
    'use strict';

    mainBrowser = toEsm(requirePolyfill(), 1);
    initContainers();
    initMediaCommon();
    initMessageFormatting();
    initIconRendering();
    initAsIterPolyfill();
    initBrowserAction();
    initSemver();
    initMessageFormattingIndex();
    initTsResultsIndex();
    initBuildTarget();
    initHitTypes();
    initMediaUserPrefsDefaults();
    initSiteHandlers();
    initSettings();
    initServiceDownloads();
    initDownloadableViews();
    REQUIRED_COAPP_VERSION = '2.0.19';
    MAX_CONTEXT_MENU_ITEMS = 30;
    DOWNLOADABLE_TTL_MS = 30 * 60 * 1e3;
    mainCoapp = (initCoapp(), toCommonjs(coappNs));
    mainLicense = (initLicense(), toCommonjs(licenseNs));
    serviceLogBuffer = [];
    debugLoggingEnabled = !0;
    serviceActiveDownloads = new Map();
    serviceDownloadQueue = [];
    iconImageCache = new Map();
    sidebarEnabled = !1;
    urlFilterRegexes = [];
    pageHitCounts = new Map();
    (async () => {
      try {
        await setupRuntimeMessaging();
        addLogEntry('Main()');
        try {
          await firstRunInit();
        } catch (err) {
          addLogEntry('Main() - storage_migrate failed - ' + err.toString());
        }
        let useSidebar = await getSetting(settingUseSidebar);
        let legacyUiActive = !1;
        try {
          let useLegacyUi = await getSetting(settingUseLegacyUi);
          if (
            (onSettingChangedDebounced(settingUseLegacyUi, () =>
              mainBrowser.default.runtime.reload(),
            ),
            useLegacyUi)
          ) {
            resetBrowserAction();
            legacyUiActive = !0;
          } else {
            setPopupEnabled(useSidebar);
          }
        } catch (err) {
          addLogEntry('Main() - handle legacy UI failed - ' + err.toString());
          setPopupEnabled(useSidebar);
          addLogEntry('Main() - fallback to UseNewUI');
        }
        let database = await getSetting(settingServiceDatabase);
        serviceDb = database;
        try {
          await registerContextMenus(database);
        } catch (err) {
          addLogEntry(
            'Main() - RegisterContextMenus failed - ' + err.toString(),
          );
        }
        serviceStartListeners(database);
        refreshCoappStatus(database, !1);
        refreshLicenseStatus(database);
        try {
          if (!legacyUiActive) {
            setSidebarEnabled(useSidebar);
          }
        } catch (err) {
          addLogEntry('Main() - OnSidebarChanged failed - ' + err.toString());
        }
        if (!legacyUiActive) {
          onSettingChanged(settingUseSidebar, setSidebarEnabled);
        }
        try {
          compileUrlFilters(await getSetting(settingBlacklist));
        } catch (err) {
          addLogEntry('Main() - CompileBlacklist failed - ' + err.toString());
        }
        onSettingChanged(settingBlacklist, compileUrlFilters);
        onSettingChanged(settingLicense, () => refreshLicenseStatus(database));
        try {
          let activeTab = (
            await mainBrowser.default.tabs.query({
              active: !0,
              currentWindow: !0,
            })
          )[0];
          if (activeTab) {
            database.current_tab_id = activeTab.id ?? -1;
            database.current_window_id = activeTab.windowId ?? -1;
          }
        } catch (err) {
          addLogEntry(
            'Main() - Getting initial tab failed - ' + err.toString(),
          );
        }
        setInterval(pruneExpiredDownloadables, 60 * 1e3);
        scheduleLogPersist(database);
        addLogEntry('Main() - End');
      } catch (err) {
        addLogEntry('Main() - Failed - ' + err.toString());
      }
    })();
  });
  var smartnameNs = {};
  defineExports(smartnameNs, {
    defineInPage: () => defineInPage,
    getFilenameFromTitle: () => getFilenameFromTitleImpl,
    getSpecs: () => getSpecs,
    set: () => setSmartnameSpecs,
  });
  async function saveSmartname() {
    let data = await smartnameStorage;
    await smartnameBrowser.storage.local.set({
      smartname: data,
    });
  }
  async function setSmartnameSpecs(data) {
    smartnameStorage = Promise.resolve(data);
    saveSmartname();
  }
  async function defineInPage() {
    let tabs = await smartnameBrowser.tabs.query({
      active: !0,
      currentWindow: !0,
    });
    if (tabs.length === 0) {
      throw new Error("Can't find current tab");
    }
    smartnameUtil.executeScriptWithGlobal(
      {
        tabId: tabs[0].id,
      },
      {},
      '/injected/smartname.js',
    );
  }
  async function getSpecs(rawUrl) {
    let specs = await smartnameStorage;
    // TRACE/background BugFix: better URL parsing.
    let url;
    try {
      url = new URL(rawUrl);
    } catch (error) {
      throw new Exception('Failed to parse URL: ' + rawUrl);
    }
    let hostParts = url.hostname.split('.');
    for (let index = 0; index < hostParts.length - 1; index++) {
      let spec = specs[hostParts.slice(index).join('.')];
      if (spec) {
        return spec;
      }
    }
    return null;
  }
  // TRACE/background: better handling for file names,
  // this is only called if legacy-UI mode is enabled.
  async function getFilenameFromTitleImpl(title) {
    var type =
      arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    var spaceReplacements = {
      keep: ' ',
      remove: '',
      hyphen: '-',
      underscore: '_',
    };
    let prefs = await smartnameWeh.prefs;

    // Removes special characters.
    if (type) {
      type = type.replace(invalidFilenameCharsRegex, '');
      type = type.replace(
        multiSpaceRegex,
        spaceReplacements[prefs.smartnamerFnameSpaces],
      );
    }
    title = title.replace(invalidFilenameCharsRegex, '');
    title = title.replace(
      multiSpaceRegex,
      spaceReplacements[prefs.smartnamerFnameSpaces],
    );

    // Removes too-verbose words.
    title = title.replace(
      new RegExp('Watch|Anime|Online|Free|English', 'ig'),
      '',
    );
    title = title.replace(
      new RegExp('Aniwave|Gogoanime|pahe|kickass', 'ig'),
      '',
    );
    title = title.replace(/Subbed/gi, '');
    title = title.replace(/^(.*)\s?at(_|-|\s).*$/gi, '\$1');

    // Replaces required words.
    title = title.replace(/(\d)(st|nd|th|rd).Season/gi, 's\$1');
    title = title.replace(/Final(-|_|\s)*Season(?!(-|_|\s)*\d)/gi, 's-final');
    title = title.replace(/Season(-|_|\s)*/gi, 's-');
    title = title.replace(/Part(?![a-z])(-|_|\s)*/gi, 'p-');
    title = title.replace(/Act(?![a-z])(\.|-|_|\s)*/gi, 'act-');
    title = title.replace(/Episode(-|_|\s)*/gi, 'ep-');
    title = title.replace(/Ep(?![a-z])(\.|-|_|\s)*/gi, 'ep-');

    // Removes whitespaces.
    title = title.replace(/(\s|--|__)+/gi, ' ');
    title = title.trim();
    title = title.replace(/(-|_|\s)+$/gi, '');

    // Replaces numbering style to dash.
    title = title.replace(/\b(s|p|ep)(\s|_|\.)?(\d)/gi, '\$1-\$3');

    // Loads max length.
    var maxLen = prefs.smartnamerFnameMaxlen;
    // Remembers to cut more if we have type (file-extension).
    if (type) {
      maxLen -= type.length + 1;
    }
    // Cuts title down to max-length.
    if (title.length > maxLen) {
      // But try to keep episode/season number as suffix.
      var epPos = title.search(/\bep-\d/gi);
      var seasonPos = title.search(/\bs-\d/gi);
      var partPos = title.search(/\bp-\d/gi);
      if (epPos < 0) {
        epPos = title.length;
      }
      if (seasonPos < 0) {
        seasonPos = title.length;
      }
      if (partPos < 0) {
        partPos = title.length;
      }
      var suffix = title.substr(Math.min(epPos, seasonPos, partPos)) || '';

      // Remembers to cut more if suffix is valid.
      maxLen -= suffix.length;
      // Remembers to cut more if `maxLen` causes cutting word in half
      // (just being verbose, else would use "\b" instead of "(?=\w)").
      var isWordCut = title.substr(maxLen).search(/^((?=\w)(?!_))+\w/g) == 0;

      // Actual cutting.
      title = title.substr(0, maxLen);
      if (isWordCut) {
        // Then cut remains of that word as well.
        title = title.replace(/\s*-*_*\b.\b$/g, '');
      }
      title = title.trim();
      // Finally, suffix with episode number.
      if (suffix.length > 0) {
        title = title + ' ' + suffix;
      }
    }

    // Suffixes title with file-extension (if known).
    if (type) {
      return title + '.' + type;
    }
    return title;
  }
  var smartnameWeh;
  var smartnameUtil;
  var smartnameBrowser;
  var smartnameStorage;
  var invalidFilenameCharsRegex;
  var multiSpaceRegex;
  var initSmartname = defineLazyModule(() => {
    'use strict';

    smartnameWeh = requireWeh();
    smartnameUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    smartnameBrowser = smartnameWeh.browser;
    smartnameStorage = smartnameBrowser.storage.local
      .get({
        smartname: {},
      })
      .then(stored => stored.smartname);
    invalidFilenameCharsRegex = new RegExp(
      '[/?<>\\:*|":]|[\0-\x80-\x9F]|\\\\',
      'g',
    );
    multiSpaceRegex = new RegExp(' +', 'g');
    smartnameWeh.rpc.listen({
      openSmartNameDefiner: async () => {
        let panel = await smartnameWeh.ui.open('smartname-definer', {
          url: 'content/smartname-define.html',
          type: 'panel',
          width: 600,
          height: 400,
        });
        await smartnameWeh.wait('smartname-definer');
        return panel;
      },
      closeSmartNameDefiner: () => smartnameWeh.ui.close('smartname-definer'),
      closedSmartNameDefiner: uiName => smartnameWeh.rpc.call(uiName, 'close'),
      setSmartNameData: data =>
        smartnameWeh.rpc.call('smartname-definer', 'setData', data),
      evaluateSmartName: (uiName, expr) =>
        smartnameWeh.rpc.call(uiName, 'evaluate', expr),
      addSmartNameRule: async rule => {
        let rules = await smartnameStorage;
        rules[rule.domain] = rule;
        saveSmartname();
      },
      selectSmartNameXPath: (uiName, xpath) =>
        smartnameWeh.rpc.call(uiName, 'select', xpath),
      setSmartName: async data => {
        smartnameStorage = Promise.resolve({});
        saveSmartname();
      },
      getSmartNameRules: async () => smartnameStorage,
      editSmartName: () => {
        smartnameWeh.ui.open('smartname-edit', {
          type: 'tab',
          url: 'content/smartname-edit.html',
        });
      },
      removeFromSmartName: async domain => {
        let rules = await smartnameStorage;
        delete rules[domain];
        saveSmartname();
      },
    });
  });
  var requireFxpUtil = defineCommonjsModule(exports => {
    'use strict';

    var nameStartChar =
      ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    var nameChar =
      nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
    var nameRegexStr = '[' + nameStartChar + '][' + nameChar + ']*';
    var nameRegex = new RegExp('^' + nameRegexStr + '$');
    var getAllMatches = function (str, regex) {
      let matches = [];
      let match = regex.exec(str);
      for (; match; ) {
        let group = [];
        group.startIndex = regex.lastIndex - match[0].length;
        let len = match.length;
        for (let matchIndex = 0; matchIndex < len; matchIndex++) {
          group.push(match[matchIndex]);
        }
        matches.push(group);
        match = regex.exec(str);
      }
      return matches;
    };
    var isName = function (name) {
      let match = nameRegex.exec(name);
      return !(match === null || typeof match > 'u');
    };
    exports.isExist = function (value) {
      return typeof value < 'u';
    };
    exports.isEmptyObject = function (obj) {
      return Object.keys(obj).length === 0;
    };
    exports.merge = function (target, source, mode) {
      if (source) {
        let keys = Object.keys(source);
        let len = keys.length;
        for (let keyIndex = 0; keyIndex < len; keyIndex++) {
          if (mode === 'strict') {
            target[keys[keyIndex]] = [source[keys[keyIndex]]];
          } else {
            target[keys[keyIndex]] = source[keys[keyIndex]];
          }
        }
      }
    };
    exports.getValue = function (value) {
      if (exports.isExist(value)) {
        return value;
      } else {
        return '';
      }
    };
    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexStr;
  });
  var requireFxpValidator = defineCommonjsModule(exports => {
    'use strict';

    var util = requireFxpUtil();
    var defaultOptions = {
      allowBooleanAttributes: !1,
      unpairedTags: [],
    };
    exports.validate = function (xmlData, options) {
      options = Object.assign({}, defaultOptions, options);
      let tags = [];
      let tagFound = !1;
      let reachedRoot = !1;
      if (xmlData[0] === '\uFEFF') {
        xmlData = xmlData.substr(1);
      }
      for (let pos = 0; pos < xmlData.length; pos++) {
        if (xmlData[pos] === '<' && xmlData[pos + 1] === '?') {
          if (((pos += 2), (pos = readPI(xmlData, pos)), pos.err)) {
            return pos;
          }
        } else if (xmlData[pos] === '<') {
          let tagStartPos = pos;
          if ((pos++, xmlData[pos] === '!')) {
            pos = readSpecialTag(xmlData, pos);
            continue;
          } else {
            let isClosingTag = !1;
            if (xmlData[pos] === '/') {
              isClosingTag = !0;
              pos++;
            }
            let tagName = '';
            for (
              ;
              pos < xmlData.length
              && xmlData[pos] !== '>'
              && xmlData[pos] !== ' '
              && xmlData[pos] !== '	'
              && xmlData[pos]
                !== `
`
              && xmlData[pos] !== '\r';
              pos++
            ) {
              tagName += xmlData[pos];
            }
            if (
              ((tagName = tagName.trim()),
              tagName[tagName.length - 1] === '/'
                && ((tagName = tagName.substring(0, tagName.length - 1)),
                pos--),
              !validateTagName(tagName))
            ) {
              let errorMsg;
              if (tagName.trim().length === 0) {
                errorMsg = "Invalid space after '<'.";
              } else {
                errorMsg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject(
                'InvalidTag',
                errorMsg,
                getLineNumberForPosition(xmlData, pos),
              );
            }
            let attrResult = readAttributeStr(xmlData, pos);
            if (attrResult === !1) {
              return getErrorObject(
                'InvalidAttr',
                "Attributes for '" + tagName + "' have open quote.",
                getLineNumberForPosition(xmlData, pos),
              );
            }
            let attrStr = attrResult.value;
            if (
              ((pos = attrResult.index), attrStr[attrStr.length - 1] === '/')
            ) {
              let selfCloseStart = pos - attrStr.length;
              attrStr = attrStr.substring(0, attrStr.length - 1);
              let attrValidation = validateAttributeString(attrStr, options);
              if (attrValidation === !0) {
                tagFound = !0;
              } else {
                return getErrorObject(
                  attrValidation.err.code,
                  attrValidation.err.msg,
                  getLineNumberForPosition(
                    xmlData,
                    selfCloseStart + attrValidation.err.line,
                  ),
                );
              }
            } else if (isClosingTag) {
              if (attrResult.tagClosed) {
                if (attrStr.trim().length > 0) {
                  return getErrorObject(
                    'InvalidTag',
                    "Closing tag '"
                      + tagName
                      + "' can't have attributes or invalid starting.",
                    getLineNumberForPosition(xmlData, tagStartPos),
                  );
                }
                {
                  let openedTag = tags.pop();
                  if (tagName !== openedTag.tagName) {
                    let openPos = getLineNumberForPosition(
                      xmlData,
                      openedTag.tagStartPos,
                    );
                    return getErrorObject(
                      'InvalidTag',
                      "Expected closing tag '"
                        + openedTag.tagName
                        + "' (opened in line "
                        + openPos.line
                        + ', col '
                        + openPos.col
                        + ") instead of closing tag '"
                        + tagName
                        + "'.",
                      getLineNumberForPosition(xmlData, tagStartPos),
                    );
                  }
                  if (tags.length == 0) {
                    reachedRoot = !0;
                  }
                }
              } else {
                return getErrorObject(
                  'InvalidTag',
                  "Closing tag '" + tagName + "' doesn't have proper closing.",
                  getLineNumberForPosition(xmlData, pos),
                );
              }
            } else {
              let attrValidation = validateAttributeString(attrStr, options);
              if (attrValidation !== !0) {
                return getErrorObject(
                  attrValidation.err.code,
                  attrValidation.err.msg,
                  getLineNumberForPosition(
                    xmlData,
                    pos - attrStr.length + attrValidation.err.line,
                  ),
                );
              }
              if (reachedRoot === !0) {
                return getErrorObject(
                  'InvalidXml',
                  'Multiple possible root nodes found.',
                  getLineNumberForPosition(xmlData, pos),
                );
              }
              if (!(options.unpairedTags.indexOf(tagName) !== -1)) {
                tags.push({
                  tagName: tagName,
                  tagStartPos: tagStartPos,
                });
              }
              tagFound = !0;
            }
            for (pos++; pos < xmlData.length; pos++) {
              if (xmlData[pos] === '<') {
                if (xmlData[pos + 1] === '!') {
                  pos++;
                  pos = readSpecialTag(xmlData, pos);
                  continue;
                } else if (xmlData[pos + 1] === '?') {
                  if (((pos = readPI(xmlData, ++pos)), pos.err)) {
                    return pos;
                  }
                } else {
                  break;
                }
              } else if (xmlData[pos] === '&') {
                let ampEnd = validateAmpersand(xmlData, pos);
                if (ampEnd == -1) {
                  return getErrorObject(
                    'InvalidChar',
                    "char '&' is not expected.",
                    getLineNumberForPosition(xmlData, pos),
                  );
                }
                pos = ampEnd;
              } else if (reachedRoot === !0 && !isWhitespace(xmlData[pos])) {
                return getErrorObject(
                  'InvalidXml',
                  'Extra text at the end',
                  getLineNumberForPosition(xmlData, pos),
                );
              }
            }
            if (xmlData[pos] === '<') {
              pos--;
            }
          }
        } else {
          if (isWhitespace(xmlData[pos])) {
            continue;
          }
          return getErrorObject(
            'InvalidChar',
            "char '" + xmlData[pos] + "' is not expected.",
            getLineNumberForPosition(xmlData, pos),
          );
        }
      }
      if (tagFound) {
        if (tags.length == 1) {
          return getErrorObject(
            'InvalidTag',
            "Unclosed tag '" + tags[0].tagName + "'.",
            getLineNumberForPosition(xmlData, tags[0].tagStartPos),
          );
        }
        if (tags.length > 0) {
          return getErrorObject(
            'InvalidXml',
            "Invalid '"
              + JSON.stringify(
                tags.map(tag => tag.tagName),
                null,
                4,
              ).replace(/\r?\n/g, '')
              + "' found.",
            {
              line: 1,
              col: 1,
            },
          );
        }
      } else {
        return getErrorObject('InvalidXml', 'Start tag expected.', 1);
      }
      return !0;
    };
    function isWhitespace(char) {
      return (
        char === ' '
        || char === '	'
        || char
          === `
`
        || char === '\r'
      );
    }
    function readPI(xmlData, startIndex) {
      let start = startIndex;
      for (; startIndex < xmlData.length; startIndex++) {
        if (xmlData[startIndex] == '?' || xmlData[startIndex] == ' ') {
          let processingInstruction = xmlData.substr(start, startIndex - start);
          if (startIndex > 5 && processingInstruction === 'xml') {
            return getErrorObject(
              'InvalidXml',
              'XML declaration allowed only at the start of the document.',
              getLineNumberForPosition(xmlData, startIndex),
            );
          }
          if (xmlData[startIndex] == '?' && xmlData[startIndex + 1] == '>') {
            startIndex++;
            break;
          } else {
            continue;
          }
        }
      }
      return startIndex;
    }
    function readSpecialTag(xmlData, startIndex) {
      if (
        xmlData.length > startIndex + 5
        && xmlData[startIndex + 1] === '-'
        && xmlData[startIndex + 2] === '-'
      ) {
        for (startIndex += 3; startIndex < xmlData.length; startIndex++) {
          if (
            xmlData[startIndex] === '-'
            && xmlData[startIndex + 1] === '-'
            && xmlData[startIndex + 2] === '>'
          ) {
            startIndex += 2;
            break;
          }
        }
      } else if (
        xmlData.length > startIndex + 8
        && xmlData[startIndex + 1] === 'D'
        && xmlData[startIndex + 2] === 'O'
        && xmlData[startIndex + 3] === 'C'
        && xmlData[startIndex + 4] === 'T'
        && xmlData[startIndex + 5] === 'Y'
        && xmlData[startIndex + 6] === 'P'
        && xmlData[startIndex + 7] === 'E'
      ) {
        let angleBracketsLevel = 1;
        for (startIndex += 8; startIndex < xmlData.length; startIndex++) {
          if (xmlData[startIndex] === '<') {
            angleBracketsLevel++;
          } else if (
            xmlData[startIndex] === '>'
            && (angleBracketsLevel--, angleBracketsLevel === 0)
          ) {
            break;
          }
        }
      } else if (
        xmlData.length > startIndex + 9
        && xmlData[startIndex + 1] === '['
        && xmlData[startIndex + 2] === 'C'
        && xmlData[startIndex + 3] === 'D'
        && xmlData[startIndex + 4] === 'A'
        && xmlData[startIndex + 5] === 'T'
        && xmlData[startIndex + 6] === 'A'
        && xmlData[startIndex + 7] === '['
      ) {
        for (startIndex += 8; startIndex < xmlData.length; startIndex++) {
          if (
            xmlData[startIndex] === ']'
            && xmlData[startIndex + 1] === ']'
            && xmlData[startIndex + 2] === '>'
          ) {
            startIndex += 2;
            break;
          }
        }
      }
      return startIndex;
    }
    var doubleQuote = '"';
    var singleQuote = "'";
    function readAttributeStr(xmlData, startIndex) {
      let attrStr = '';
      let startChar = '';
      let tagClosed = !1;
      for (; startIndex < xmlData.length; startIndex++) {
        if (
          xmlData[startIndex] === doubleQuote
          || xmlData[startIndex] === singleQuote
        ) {
          if (startChar === '') {
            startChar = xmlData[startIndex];
          } else {
            if (!(startChar !== xmlData[startIndex])) {
              startChar = '';
            }
          }
        } else if (xmlData[startIndex] === '>' && startChar === '') {
          tagClosed = !0;
          break;
        }
        attrStr += xmlData[startIndex];
      }
      if (startChar !== '') {
        return !1;
      } else {
        return {
          value: attrStr,
          index: startIndex,
          tagClosed: tagClosed,
        };
      }
    }
    var validAttrStrRegxp = new RegExp(
      `(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,
      'g',
    );
    function validateAttributeString(attrStr, options) {
      let matches = util.getAllMatches(attrStr, validAttrStrRegxp);
      let attrNames = {};
      for (let index = 0; index < matches.length; index++) {
        if (matches[index][1].length === 0) {
          return getErrorObject(
            'InvalidAttr',
            "Attribute '" + matches[index][2] + "' has no space in starting.",
            getPositionFromMatch(matches[index]),
          );
        }
        if (matches[index][3] !== void 0 && matches[index][4] === void 0) {
          return getErrorObject(
            'InvalidAttr',
            "Attribute '" + matches[index][2] + "' is without value.",
            getPositionFromMatch(matches[index]),
          );
        }
        if (matches[index][3] === void 0 && !options.allowBooleanAttributes) {
          return getErrorObject(
            'InvalidAttr',
            "boolean attribute '" + matches[index][2] + "' is not allowed.",
            getPositionFromMatch(matches[index]),
          );
        }
        let attrName = matches[index][2];
        if (!validateAttrName(attrName)) {
          return getErrorObject(
            'InvalidAttr',
            "Attribute '" + attrName + "' is an invalid name.",
            getPositionFromMatch(matches[index]),
          );
        }
        if (!attrNames.hasOwnProperty(attrName)) {
          attrNames[attrName] = 1;
        } else {
          return getErrorObject(
            'InvalidAttr',
            "Attribute '" + attrName + "' is repeated.",
            getPositionFromMatch(matches[index]),
          );
        }
      }
      return !0;
    }
    function validateNumericEntity(xmlData, startIndex) {
      let regex = /\d/;
      for (
        xmlData[startIndex] === 'x' && (startIndex++, (regex = /[\da-fA-F]/));
        startIndex < xmlData.length;
        startIndex++
      ) {
        if (xmlData[startIndex] === ';') {
          return startIndex;
        }
        if (!xmlData[startIndex].match(regex)) {
          break;
        }
      }
      return -1;
    }
    function validateAmpersand(xmlData, startIndex) {
      if ((startIndex++, xmlData[startIndex] === ';')) {
        return -1;
      }
      if (xmlData[startIndex] === '#') {
        startIndex++;
        return validateNumericEntity(xmlData, startIndex);
      }
      let count = 0;
      for (; startIndex < xmlData.length; startIndex++, count++) {
        if (!(xmlData[startIndex].match(/\w/) && count < 20)) {
          if (xmlData[startIndex] === ';') {
            break;
          }
          return -1;
        }
      }
      return startIndex;
    }
    function getErrorObject(code, message, lineNumber) {
      return {
        err: {
          code: code,
          msg: message,
          line: lineNumber.line || lineNumber,
          col: lineNumber.col,
        },
      };
    }
    function validateAttrName(attrName) {
      return util.isName(attrName);
    }
    function validateTagName(tagName) {
      return util.isName(tagName);
    }
    function getLineNumberForPosition(xmlData, index) {
      let lines = xmlData.substring(0, index).split(/\r?\n/);
      return {
        line: lines.length,
        col: lines[lines.length - 1].length + 1,
      };
    }
    function getPositionFromMatch(match) {
      return match.startIndex + match[1].length;
    }
  });
  var requireFxpOptionsBuilder = defineCommonjsModule(exports => {
    var defaultOptions = {
      preserveOrder: !1,
      attributeNamePrefix: '@_',
      attributesGroupName: !1,
      textNodeName: '#text',
      ignoreAttributes: !0,
      removeNSPrefix: !1,
      allowBooleanAttributes: !1,
      parseTagValue: !0,
      parseAttributeValue: !1,
      trimValues: !0,
      cdataPropName: !1,
      numberParseOptions: {
        hex: !0,
        leadingZeros: !0,
        eNotation: !0,
      },
      tagValueProcessor: function (tagName, val) {
        return val;
      },
      attributeValueProcessor: function (attrName, val) {
        return val;
      },
      stopNodes: [],
      alwaysCreateTextNode: !1,
      isArray: () => !1,
      commentPropName: !1,
      unpairedTags: [],
      processEntities: !0,
      htmlEntities: !1,
      ignoreDeclaration: !1,
      ignorePiTags: !1,
      transformTagName: !1,
      transformAttributeName: !1,
      updateTag: function (tagName, jPath, attrs) {
        return tagName;
      },
    };
    var buildOptions = function (options) {
      return Object.assign({}, defaultOptions, options);
    };
    exports.buildOptions = buildOptions;
    exports.defaultOptions = defaultOptions;
  });
  var requireXmlNode = defineCommonjsModule((xmlNodeExports, xmlNodeModule) => {
    'use strict';

    var XmlNode = class {
      constructor(tagname) {
        this.tagname = tagname;
        this.child = [];
        this[':@'] = {};
      }
      add(key, value) {
        if (key === '__proto__') {
          key = '#__proto__';
        }
        this.child.push({
          [key]: value,
        });
      }
      addChild(childNode) {
        if (childNode.tagname === '__proto__') {
          childNode.tagname = '#__proto__';
        }
        if (childNode[':@'] && Object.keys(childNode[':@']).length > 0) {
          this.child.push({
            [childNode.tagname]: childNode.child,
            ':@': childNode[':@'],
          });
        } else {
          this.child.push({
            [childNode.tagname]: childNode.child,
          });
        }
      }
    };
    xmlNodeModule.exports = XmlNode;
  });
  var requireDocTypeReader = defineCommonjsModule(
    (docTypeExports, docTypeModule) => {
      var util = requireFxpUtil();
      function readDocType(xmlData, startIndex) {
        let entities = {};
        if (
          xmlData[startIndex + 3] === 'O'
          && xmlData[startIndex + 4] === 'C'
          && xmlData[startIndex + 5] === 'T'
          && xmlData[startIndex + 6] === 'Y'
          && xmlData[startIndex + 7] === 'P'
          && xmlData[startIndex + 8] === 'E'
        ) {
          startIndex = startIndex + 9;
          let angleBracketsLevel = 1;
          let hasBody = !1;
          let comment = !1;
          let exp = '';
          for (; startIndex < xmlData.length; startIndex++) {
            if (xmlData[startIndex] === '<' && !comment) {
              if (hasBody && isEntity(xmlData, startIndex)) {
                startIndex += 7;
                [entityName, val, startIndex] = readEntityExp(
                  xmlData,
                  startIndex + 1,
                );
                if (val.indexOf('&') === -1) {
                  entities[validateEntityName(entityName)] = {
                    regx: RegExp(`&${entityName};`, 'g'),
                    val,
                  };
                }
              } else if (hasBody && isElement(xmlData, startIndex)) {
                startIndex += 8;
              } else if (hasBody && isAttlist(xmlData, startIndex)) {
                startIndex += 8;
              } else if (hasBody && isNotation(xmlData, startIndex)) {
                startIndex += 9;
              } else if (isComment) {
                comment = !0;
              } else {
                throw new Error('Invalid DOCTYPE');
              }
              angleBracketsLevel++;
              exp = '';
            } else if (xmlData[startIndex] === '>') {
              if (
                (comment
                  ? xmlData[startIndex - 1] === '-'
                    && xmlData[startIndex - 2] === '-'
                    && ((comment = !1), angleBracketsLevel--)
                  : angleBracketsLevel--,
                angleBracketsLevel === 0)
              ) {
                break;
              }
            } else {
              if (xmlData[startIndex] === '[') {
                hasBody = !0;
              } else {
                exp += xmlData[startIndex];
              }
            }
          }
          if (angleBracketsLevel !== 0) {
            throw new Error('Unclosed DOCTYPE');
          }
        } else {
          throw new Error('Invalid Tag instead of DOCTYPE');
        }
        return {
          entities: entities,
          i: startIndex,
        };
      }
      function readEntityExp(xmlData, startIndex) {
        let entityName = '';
        for (
          ;
          startIndex < xmlData.length
          && xmlData[startIndex] !== "'"
          && xmlData[startIndex] !== '"';
          startIndex++
        ) {
          entityName += xmlData[startIndex];
        }
        if (
          ((entityName = entityName.trim()), entityName.indexOf(' ') !== -1)
        ) {
          throw new Error('External entites are not supported');
        }
        let quote = xmlData[startIndex++];
        let val = '';
        for (
          ;
          startIndex < xmlData.length && xmlData[startIndex] !== quote;
          startIndex++
        ) {
          val += xmlData[startIndex];
        }
        return [entityName, val, startIndex];
      }
      function isComment(xmlData, startIndex) {
        return (
          xmlData[startIndex + 1] === '!'
          && xmlData[startIndex + 2] === '-'
          && xmlData[startIndex + 3] === '-'
        );
      }
      function isEntity(xmlData, startIndex) {
        return (
          xmlData[startIndex + 1] === '!'
          && xmlData[startIndex + 2] === 'E'
          && xmlData[startIndex + 3] === 'N'
          && xmlData[startIndex + 4] === 'T'
          && xmlData[startIndex + 5] === 'I'
          && xmlData[startIndex + 6] === 'T'
          && xmlData[startIndex + 7] === 'Y'
        );
      }
      function isElement(xmlData, startIndex) {
        return (
          xmlData[startIndex + 1] === '!'
          && xmlData[startIndex + 2] === 'E'
          && xmlData[startIndex + 3] === 'L'
          && xmlData[startIndex + 4] === 'E'
          && xmlData[startIndex + 5] === 'M'
          && xmlData[startIndex + 6] === 'E'
          && xmlData[startIndex + 7] === 'N'
          && xmlData[startIndex + 8] === 'T'
        );
      }
      function isAttlist(xmlData, startIndex) {
        return (
          xmlData[startIndex + 1] === '!'
          && xmlData[startIndex + 2] === 'A'
          && xmlData[startIndex + 3] === 'T'
          && xmlData[startIndex + 4] === 'T'
          && xmlData[startIndex + 5] === 'L'
          && xmlData[startIndex + 6] === 'I'
          && xmlData[startIndex + 7] === 'S'
          && xmlData[startIndex + 8] === 'T'
        );
      }
      function isNotation(xmlData, startIndex) {
        return (
          xmlData[startIndex + 1] === '!'
          && xmlData[startIndex + 2] === 'N'
          && xmlData[startIndex + 3] === 'O'
          && xmlData[startIndex + 4] === 'T'
          && xmlData[startIndex + 5] === 'A'
          && xmlData[startIndex + 6] === 'T'
          && xmlData[startIndex + 7] === 'I'
          && xmlData[startIndex + 8] === 'O'
          && xmlData[startIndex + 9] === 'N'
        );
      }
      function validateEntityName(name) {
        if (util.isName(name)) {
          return name;
        }
        throw new Error(`Invalid entity name ${name}`);
      }
      docTypeModule.exports = readDocType;
    },
  );
  var requireStrnum = defineCommonjsModule(
    (toNumberExports, toNumberModule) => {
      var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
      var numRegex =
        /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
      if (!Number.parseInt && window.parseInt) {
        Number.parseInt = window.parseInt;
      }
      if (!Number.parseFloat && window.parseFloat) {
        Number.parseFloat = window.parseFloat;
      }
      var consider = {
        hex: !0,
        leadingZeros: !0,
        decimalPoint: '.',
        eNotation: !0,
      };
      function toNumber(str, options = {}) {
        if (
          ((options = Object.assign({}, consider, options)),
          !str || typeof str != 'string')
        ) {
          return str;
        }
        let trimmedStr = str.trim();
        if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) {
          return str;
        }
        if (options.hex && hexRegex.test(trimmedStr)) {
          return Number.parseInt(trimmedStr, 16);
        }
        {
          let match = numRegex.exec(trimmedStr);
          if (match) {
            let sign = match[1];
            let leadingZeros = match[2];
            let trimmedNum = trimZeros(match[3]);
            let eNotation = match[4] || match[6];
            if (
              !options.leadingZeros
              && leadingZeros.length > 0
              && sign
              && trimmedStr[2] !== '.'
            ) {
              return str;
            }
            if (
              !options.leadingZeros
              && leadingZeros.length > 0
              && !sign
              && trimmedStr[1] !== '.'
            ) {
              return str;
            }
            {
              let num = Number(trimmedStr);
              let numStr = '' + num;
              if (numStr.search(/[eE]/) !== -1 || eNotation) {
                if (options.eNotation) {
                  return num;
                } else {
                  return str;
                }
              } else {
                if (trimmedStr.indexOf('.') !== -1) {
                  if (
                    (numStr === '0' && trimmedNum === '')
                    || numStr === trimmedNum
                    || (sign && numStr === '-' + trimmedNum)
                  ) {
                    return num;
                  } else {
                    return str;
                  }
                } else {
                  if (leadingZeros) {
                    if (trimmedNum === numStr || sign + trimmedNum === numStr) {
                      return num;
                    } else {
                      return str;
                    }
                  } else {
                    if (trimmedStr === numStr || trimmedStr === sign + numStr) {
                      return num;
                    } else {
                      return str;
                    }
                  }
                }
              }
            }
          } else {
            return str;
          }
        }
      }
      function trimZeros(numStr) {
        if (numStr && numStr.indexOf('.') !== -1) {
          numStr = numStr.replace(/0+$/, '');
          if (numStr === '.') {
            numStr = '0';
          } else {
            if (numStr[0] === '.') {
              numStr = '0' + numStr;
            } else {
              if (numStr[numStr.length - 1] === '.') {
                numStr = numStr.substr(0, numStr.length - 1);
              }
            }
          }
        }
        return numStr;
      }
      toNumberModule.exports = toNumber;
    },
  );
  var requireOrderedObjParser = defineCommonjsModule(
    (orderedParserExports, orderedParserModule) => {
      'use strict';

      var util = requireFxpUtil();
      var XmlNode = requireXmlNode();
      var readDocType = requireDocTypeReader();
      var toNumber = requireStrnum();
      var tagsRegex =
        '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'.replace(
          /NAME/g,
          util.nameRegexp,
        );
      var OrderedObjParser = class {
        constructor(options) {
          this.options = options;
          this.currentNode = null;
          this.tagsNodeStack = [];
          this.docTypeEntities = {};
          this.lastEntities = {
            apos: {
              regex: /&(apos|#39|#x27);/g,
              val: "'",
            },
            gt: {
              regex: /&(gt|#62|#x3E);/g,
              val: '>',
            },
            lt: {
              regex: /&(lt|#60|#x3C);/g,
              val: '<',
            },
            quot: {
              regex: /&(quot|#34|#x22);/g,
              val: '"',
            },
          };
          this.ampEntity = {
            regex: /&(amp|#38|#x26);/g,
            val: '&',
          };
          this.htmlEntities = {
            space: {
              regex: /&(nbsp|#160);/g,
              val: ' ',
            },
            cent: {
              regex: /&(cent|#162);/g,
              val: '\xA2',
            },
            pound: {
              regex: /&(pound|#163);/g,
              val: '\xA3',
            },
            yen: {
              regex: /&(yen|#165);/g,
              val: '\xA5',
            },
            euro: {
              regex: /&(euro|#8364);/g,
              val: '\u20AC',
            },
            copyright: {
              regex: /&(copy|#169);/g,
              val: '\xA9',
            },
            reg: {
              regex: /&(reg|#174);/g,
              val: '\xAE',
            },
            inr: {
              regex: /&(inr|#8377);/g,
              val: '\u20B9',
            },
          };
          this.addExternalEntities = addExternalEntities;
          this.parseXml = parseXml;
          this.parseTextData = parseTextData;
          this.resolveNameSpace = resolveNameSpace;
          this.buildAttributesMap = buildAttributesMap;
          this.isItStopNode = isItStopNode;
          this.replaceEntitiesValue = replaceEntitiesValue;
          this.readStopNodeData = readStopNodeData;
          this.saveTextToParentTag = saveTextToParentTag;
          this.addChild = addChild;
        }
      };
      function addExternalEntities(externalEntities) {
        let entityKeys = Object.keys(externalEntities);
        for (
          let entityIndex = 0;
          entityIndex < entityKeys.length;
          entityIndex++
        ) {
          let entityName = entityKeys[entityIndex];
          this.lastEntities[entityName] = {
            regex: new RegExp('&' + entityName + ';', 'g'),
            val: externalEntities[entityName],
          };
        }
      }
      function parseTextData(
        val,
        tagName,
        jPath,
        dontTrim,
        hasAttributes,
        isLeafNode,
        escapeEntities,
      ) {
        if (
          val !== void 0
          && (this.options.trimValues && !dontTrim && (val = val.trim()),
          val.length > 0)
        ) {
          if (!escapeEntities) {
            val = this.replaceEntitiesValue(val);
          }
          let newval = this.options.tagValueProcessor(
            tagName,
            val,
            jPath,
            hasAttributes,
            isLeafNode,
          );
          if (newval == null) {
            return val;
          } else {
            if (typeof newval != typeof val || newval !== val) {
              return newval;
            } else {
              if (this.options.trimValues) {
                return parseValue(
                  val,
                  this.options.parseTagValue,
                  this.options.numberParseOptions,
                );
              } else {
                if (val.trim() === val) {
                  return parseValue(
                    val,
                    this.options.parseTagValue,
                    this.options.numberParseOptions,
                  );
                } else {
                  return val;
                }
              }
            }
          }
        }
      }
      function resolveNameSpace(tagName) {
        if (this.options.removeNSPrefix) {
          let parts = tagName.split(':');
          let prefix = tagName.charAt(0) === '/' ? '/' : '';
          if (parts[0] === 'xmlns') {
            return '';
          }
          if (parts.length === 2) {
            tagName = prefix + parts[1];
          }
        }
        return tagName;
      }
      var attrsRegx = new RegExp(
        `([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,
        'gm',
      );
      function buildAttributesMap(attrStr, jPath, tagName) {
        if (!this.options.ignoreAttributes && typeof attrStr == 'string') {
          let matches = util.getAllMatches(attrStr, attrsRegx);
          let len = matches.length;
          let attrs = {};
          for (let itemIndex = 0; itemIndex < len; itemIndex++) {
            let attrName = this.resolveNameSpace(matches[itemIndex][1]);
            let attrVal = matches[itemIndex][4];
            let aggregatedName = this.options.attributeNamePrefix + attrName;
            if (attrName.length) {
              if (
                (this.options.transformAttributeName
                  && (aggregatedName =
                    this.options.transformAttributeName(aggregatedName)),
                aggregatedName === '__proto__'
                  && (aggregatedName = '#__proto__'),
                attrVal !== void 0)
              ) {
                if (this.options.trimValues) {
                  attrVal = attrVal.trim();
                }
                attrVal = this.replaceEntitiesValue(attrVal);
                let newVal = this.options.attributeValueProcessor(
                  attrName,
                  attrVal,
                  jPath,
                );
                if (newVal == null) {
                  attrs[aggregatedName] = attrVal;
                } else {
                  if (typeof newVal != typeof attrVal || newVal !== attrVal) {
                    attrs[aggregatedName] = newVal;
                  } else {
                    attrs[aggregatedName] = parseValue(
                      attrVal,
                      this.options.parseAttributeValue,
                      this.options.numberParseOptions,
                    );
                  }
                }
              } else {
                if (this.options.allowBooleanAttributes) {
                  attrs[aggregatedName] = !0;
                }
              }
            }
          }
          if (!Object.keys(attrs).length) {
            return;
          }
          if (this.options.attributesGroupName) {
            let groupedAttrs = {};
            groupedAttrs[this.options.attributesGroupName] = attrs;
            return groupedAttrs;
          }
          return attrs;
        }
      }
      var parseXml = function (xmlData) {
        xmlData = xmlData.replace(
          /\r\n?/g,
          `
`,
        );
        let xmlObj = new XmlNode('!xml');
        let currentNode = xmlObj;
        let textData = '';
        let jPath = '';
        for (let charIndex = 0; charIndex < xmlData.length; charIndex++) {
          if (xmlData[charIndex] === '<') {
            if (xmlData[charIndex + 1] === '/') {
              let closeIndex = findClosingIndex(
                xmlData,
                '>',
                charIndex,
                'Closing Tag is not closed.',
              );
              let tagName = xmlData.substring(charIndex + 2, closeIndex).trim();
              if (this.options.removeNSPrefix) {
                let colonIndex = tagName.indexOf(':');
                if (colonIndex !== -1) {
                  tagName = tagName.substr(colonIndex + 1);
                }
              }
              if (this.options.transformTagName) {
                tagName = this.options.transformTagName(tagName);
              }
              if (currentNode) {
                textData = this.saveTextToParentTag(
                  textData,
                  currentNode,
                  jPath,
                );
              }
              let lastTagName = jPath.substring(jPath.lastIndexOf('.') + 1);
              if (
                tagName
                && this.options.unpairedTags.indexOf(tagName) !== -1
              ) {
                throw new Error(
                  `Unpaired tag can not be used as closing tag: </${tagName}>`,
                );
              }
              let lastTagPos = 0;
              if (
                lastTagName
                && this.options.unpairedTags.indexOf(lastTagName) !== -1
              ) {
                lastTagPos = jPath.lastIndexOf('.', jPath.lastIndexOf('.') - 1);
                this.tagsNodeStack.pop();
              } else {
                lastTagPos = jPath.lastIndexOf('.');
              }
              jPath = jPath.substring(0, lastTagPos);
              currentNode = this.tagsNodeStack.pop();
              textData = '';
              charIndex = closeIndex;
            } else if (xmlData[charIndex + 1] === '?') {
              let tagData = readTagExp(xmlData, charIndex, !1, '?>');
              if (!tagData) {
                throw new Error('Pi Tag is not closed.');
              }
              if (
                ((textData = this.saveTextToParentTag(
                  textData,
                  currentNode,
                  jPath,
                )),
                !(
                  (this.options.ignoreDeclaration && tagData.tagName === '?xml')
                  || this.options.ignorePiTags
                ))
              ) {
                let childNode = new XmlNode(tagData.tagName);
                childNode.add(this.options.textNodeName, '');
                if (
                  tagData.tagName !== tagData.tagExp
                  && tagData.attrExpPresent
                ) {
                  childNode[':@'] = this.buildAttributesMap(
                    tagData.tagExp,
                    jPath,
                    tagData.tagName,
                  );
                }
                this.addChild(currentNode, childNode, jPath);
              }
              charIndex = tagData.closeIndex + 1;
            } else if (xmlData.substr(charIndex + 1, 3) === '!--') {
              let endIndex = findClosingIndex(
                xmlData,
                '-->',
                charIndex + 4,
                'Comment is not closed.',
              );
              if (this.options.commentPropName) {
                let comment = xmlData.substring(charIndex + 4, endIndex - 2);
                textData = this.saveTextToParentTag(
                  textData,
                  currentNode,
                  jPath,
                );
                currentNode.add(this.options.commentPropName, [
                  {
                    [this.options.textNodeName]: comment,
                  },
                ]);
              }
              charIndex = endIndex;
            } else if (xmlData.substr(charIndex + 1, 2) === '!D') {
              let result = readDocType(xmlData, charIndex);
              this.docTypeEntities = result.entities;
              charIndex = result.i;
            } else if (xmlData.substr(charIndex + 1, 2) === '![') {
              let closeIndex =
                findClosingIndex(
                  xmlData,
                  ']]>',
                  charIndex,
                  'CDATA is not closed.',
                ) - 2;
              let tagExp = xmlData.substring(charIndex + 9, closeIndex);
              if (
                ((textData = this.saveTextToParentTag(
                  textData,
                  currentNode,
                  jPath,
                )),
                this.options.cdataPropName)
              ) {
                currentNode.add(this.options.cdataPropName, [
                  {
                    [this.options.textNodeName]: tagExp,
                  },
                ]);
              } else {
                let val = this.parseTextData(
                  tagExp,
                  currentNode.tagname,
                  jPath,
                  !0,
                  !1,
                  !0,
                );
                if (val == null) {
                  val = '';
                }
                currentNode.add(this.options.textNodeName, val);
              }
              charIndex = closeIndex + 2;
            } else {
              let tagData = readTagExp(
                xmlData,
                charIndex,
                this.options.removeNSPrefix,
              );
              let tagName = tagData.tagName;
              let rawTagName = tagData.rawTagName;
              let tagExp = tagData.tagExp;
              let attrExpPresent = tagData.attrExpPresent;
              let closeIndex = tagData.closeIndex;
              if (this.options.transformTagName) {
                tagName = this.options.transformTagName(tagName);
              }
              if (currentNode && textData && currentNode.tagname !== '!xml') {
                textData = this.saveTextToParentTag(
                  textData,
                  currentNode,
                  jPath,
                  !1,
                );
              }
              let lastTag = currentNode;
              if (
                (lastTag
                  && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1
                  && ((currentNode = this.tagsNodeStack.pop()),
                  (jPath = jPath.substring(0, jPath.lastIndexOf('.')))),
                tagName !== xmlObj.tagname
                  && (jPath += jPath ? '.' + tagName : tagName),
                this.isItStopNode(this.options.stopNodes, jPath, tagName))
              ) {
                let stopNodeContent = '';
                if (
                  tagExp.length > 0
                  && tagExp.lastIndexOf('/') === tagExp.length - 1
                ) {
                  charIndex = tagData.closeIndex;
                } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                  charIndex = tagData.closeIndex;
                } else {
                  let stopNodeResult = this.readStopNodeData(
                    xmlData,
                    rawTagName,
                    closeIndex + 1,
                  );
                  if (!stopNodeResult) {
                    throw new Error(`Unexpected end of ${rawTagName}`);
                  }
                  charIndex = stopNodeResult.i;
                  stopNodeContent = stopNodeResult.tagContent;
                }
                let childNode = new XmlNode(tagName);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[':@'] = this.buildAttributesMap(
                    tagExp,
                    jPath,
                    tagName,
                  );
                }
                if (stopNodeContent) {
                  stopNodeContent = this.parseTextData(
                    stopNodeContent,
                    tagName,
                    jPath,
                    !0,
                    attrExpPresent,
                    !0,
                    !0,
                  );
                }
                jPath = jPath.substr(0, jPath.lastIndexOf('.'));
                childNode.add(this.options.textNodeName, stopNodeContent);
                this.addChild(currentNode, childNode, jPath);
              } else {
                if (
                  tagExp.length > 0
                  && tagExp.lastIndexOf('/') === tagExp.length - 1
                ) {
                  if (tagName[tagName.length - 1] === '/') {
                    tagName = tagName.substr(0, tagName.length - 1);
                    jPath = jPath.substr(0, jPath.length - 1);
                    tagExp = tagName;
                  } else {
                    tagExp = tagExp.substr(0, tagExp.length - 1);
                  }
                  if (this.options.transformTagName) {
                    tagName = this.options.transformTagName(tagName);
                  }
                  let childNode = new XmlNode(tagName);
                  if (tagName !== tagExp && attrExpPresent) {
                    childNode[':@'] = this.buildAttributesMap(
                      tagExp,
                      jPath,
                      tagName,
                    );
                  }
                  this.addChild(currentNode, childNode, jPath);
                  jPath = jPath.substr(0, jPath.lastIndexOf('.'));
                } else {
                  let childNode = new XmlNode(tagName);
                  this.tagsNodeStack.push(currentNode);
                  if (tagName !== tagExp && attrExpPresent) {
                    childNode[':@'] = this.buildAttributesMap(
                      tagExp,
                      jPath,
                      tagName,
                    );
                  }
                  this.addChild(currentNode, childNode, jPath);
                  currentNode = childNode;
                }
                textData = '';
                charIndex = closeIndex;
              }
            }
          } else {
            textData += xmlData[charIndex];
          }
        }
        return xmlObj.child;
      };
      function addChild(currentNode, childNode, jPath) {
        let result = this.options.updateTag(
          childNode.tagname,
          jPath,
          childNode[':@'],
        );
        if (!(result === !1)) {
          if (typeof result == 'string') {
            childNode.tagname = result;
          }
          currentNode.addChild(childNode);
        }
      }
      var replaceEntitiesValue = function (val) {
        if (this.options.processEntities) {
          for (let entityName in this.docTypeEntities) {
            let entity = this.docTypeEntities[entityName];
            val = val.replace(entity.regx, entity.val);
          }
          for (let entityName in this.lastEntities) {
            let entity = this.lastEntities[entityName];
            val = val.replace(entity.regex, entity.val);
          }
          if (this.options.htmlEntities) {
            for (let entityName in this.htmlEntities) {
              let entity = this.htmlEntities[entityName];
              val = val.replace(entity.regex, entity.val);
            }
          }
          val = val.replace(this.ampEntity.regex, this.ampEntity.val);
        }
        return val;
      };
      function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
        if (textData) {
          if (isLeafNode === void 0) {
            isLeafNode = Object.keys(currentNode.child).length === 0;
          }
          textData = this.parseTextData(
            textData,
            currentNode.tagname,
            jPath,
            !1,
            currentNode[':@']
              ? Object.keys(currentNode[':@']).length !== 0
              : !1,
            isLeafNode,
          );
          if (textData !== void 0 && textData !== '') {
            currentNode.add(this.options.textNodeName, textData);
          }
          textData = '';
        }
        return textData;
      }
      function isItStopNode(stopNodes, jPath, currentTagName) {
        let allNodesExp = '*.' + currentTagName;
        for (let stopNodePath in stopNodes) {
          let stopNodePExp = stopNodes[stopNodePath];
          if (allNodesExp === stopNodePExp || jPath === stopNodePExp) {
            return !0;
          }
        }
        return !1;
      }
      function tagExpWithClosingIndex(xmlData, startIndex, closingChar = '>') {
        let attrBoundary;
        let tagExp = '';
        for (let index = startIndex; index < xmlData.length; index++) {
          let currentChar = xmlData[index];
          if (attrBoundary) {
            if (currentChar === attrBoundary) {
              attrBoundary = '';
            }
          } else if (currentChar === '"' || currentChar === "'") {
            attrBoundary = currentChar;
          } else if (currentChar === closingChar[0]) {
            if (closingChar[1]) {
              if (xmlData[index + 1] === closingChar[1]) {
                return {
                  data: tagExp,
                  index: index,
                };
              }
            } else {
              return {
                data: tagExp,
                index: index,
              };
            }
          } else {
            if (currentChar === '	') {
              currentChar = ' ';
            }
          }
          tagExp += currentChar;
        }
      }
      function findClosingIndex(xmlData, str, startIndex, errMsg) {
        let closingIndex = xmlData.indexOf(str, startIndex);
        if (closingIndex === -1) {
          throw new Error(errMsg);
        }
        return closingIndex + str.length - 1;
      }
      function readTagExp(
        xmlData,
        startIndex,
        removeNSPrefix,
        closingChar = '>',
      ) {
        let result = tagExpWithClosingIndex(
          xmlData,
          startIndex + 1,
          closingChar,
        );
        if (!result) {
          return;
        }
        let tagExp = result.data;
        let closeIndex = result.index;
        let separatorIndex = tagExp.search(/\s/);
        let tagName = tagExp;
        let attrExpPresent = !0;
        if (separatorIndex !== -1) {
          tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, '');
          tagExp = tagExp.substr(separatorIndex + 1);
        }
        let rawTagName = tagName;
        if (removeNSPrefix) {
          let colonIndex = tagName.indexOf(':');
          if (colonIndex !== -1) {
            tagName = tagName.substr(colonIndex + 1);
            attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
          }
        }
        return {
          tagName: tagName,
          tagExp: tagExp,
          closeIndex: closeIndex,
          attrExpPresent: attrExpPresent,
          rawTagName: rawTagName,
        };
      }
      function readStopNodeData(xmlData, tagName, fromIndex) {
        let startIndex = fromIndex;
        let openTagCount = 1;
        for (; fromIndex < xmlData.length; fromIndex++) {
          if (xmlData[fromIndex] === '<') {
            if (xmlData[fromIndex + 1] === '/') {
              let closeIndex = findClosingIndex(
                xmlData,
                '>',
                fromIndex,
                `${tagName} is not closed`,
              );
              if (
                xmlData.substring(fromIndex + 2, closeIndex).trim() === tagName
                && (openTagCount--, openTagCount === 0)
              ) {
                return {
                  tagContent: xmlData.substring(startIndex, fromIndex),
                  i: closeIndex,
                };
              }
              fromIndex = closeIndex;
            } else if (xmlData[fromIndex + 1] === '?') {
              fromIndex = findClosingIndex(
                xmlData,
                '?>',
                fromIndex + 1,
                'StopNode is not closed.',
              );
            } else if (xmlData.substr(fromIndex + 1, 3) === '!--') {
              fromIndex = findClosingIndex(
                xmlData,
                '-->',
                fromIndex + 3,
                'StopNode is not closed.',
              );
            } else if (xmlData.substr(fromIndex + 1, 2) === '![') {
              fromIndex =
                findClosingIndex(
                  xmlData,
                  ']]>',
                  fromIndex,
                  'StopNode is not closed.',
                ) - 2;
            } else {
              let tagData = readTagExp(xmlData, fromIndex, '>');
              if (tagData) {
                if (
                  (tagData && tagData.tagName) === tagName
                  && tagData.tagExp[tagData.tagExp.length - 1] !== '/'
                ) {
                  openTagCount++;
                }
                fromIndex = tagData.closeIndex;
              }
            }
          }
        }
      }
      function parseValue(val, shouldParse, options) {
        if (shouldParse && typeof val == 'string') {
          let trimmed = val.trim();
          if (trimmed === 'true') {
            return !0;
          } else {
            if (trimmed === 'false') {
              return !1;
            } else {
              return toNumber(val, options);
            }
          }
        } else {
          if (util.isExist(val)) {
            return val;
          } else {
            return '';
          }
        }
      }
      orderedParserModule.exports = OrderedObjParser;
    },
  );
  var requireNode2Json = defineCommonjsModule(exports => {
    'use strict';

    function prettify(node, options) {
      return compress(node, options);
    }
    function compress(nodeArray, options, parentJPath) {
      let textValue;
      let result = {};
      for (let nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex++) {
        let node = nodeArray[nodeIndex];
        let property = getPropName(node);
        let newJpath = '';
        if (
          (parentJPath === void 0
            ? (newJpath = property)
            : (newJpath = parentJPath + '.' + property),
          property === options.textNodeName)
        ) {
          if (textValue === void 0) {
            textValue = node[property];
          } else {
            textValue += '' + node[property];
          }
        } else {
          if (property === void 0) {
            continue;
          }
          if (node[property]) {
            let val = compress(node[property], options, newJpath);
            let isLeaf = isLeafTag(val, options);
            if (node[':@']) {
              assignAttributes(val, node[':@'], newJpath, options);
            } else {
              if (
                Object.keys(val).length === 1
                && val[options.textNodeName] !== void 0
                && !options.alwaysCreateTextNode
              ) {
                val = val[options.textNodeName];
              } else {
                if (Object.keys(val).length === 0) {
                  if (options.alwaysCreateTextNode) {
                    val[options.textNodeName] = '';
                  } else {
                    val = '';
                  }
                }
              }
            }
            if (
              result[property] !== void 0
              && result.hasOwnProperty(property)
            ) {
              if (!Array.isArray(result[property])) {
                result[property] = [result[property]];
              }
              result[property].push(val);
            } else {
              if (options.isArray(property, newJpath, isLeaf)) {
                result[property] = [val];
              } else {
                result[property] = val;
              }
            }
          }
        }
      }
      if (typeof textValue == 'string') {
        if (textValue.length > 0) {
          result[options.textNodeName] = textValue;
        }
      } else {
        if (textValue !== void 0) {
          result[options.textNodeName] = textValue;
        }
      }
      return result;
    }
    function getPropName(node) {
      let keys = Object.keys(node);
      for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        let key = keys[keyIndex];
        if (key !== ':@') {
          return key;
        }
      }
    }
    function assignAttributes(node, attrs, jpath, options) {
      if (attrs) {
        let keys = Object.keys(attrs);
        let len = keys.length;
        for (let itemIndex = 0; itemIndex < len; itemIndex++) {
          let attrName = keys[itemIndex];
          if (options.isArray(attrName, jpath + '.' + attrName, !0, !0)) {
            node[attrName] = [attrs[attrName]];
          } else {
            node[attrName] = attrs[attrName];
          }
        }
      }
    }
    function isLeafTag(node, options) {
      let { textNodeName } = options;
      let keyCount = Object.keys(node).length;
      return !!(
        keyCount === 0
        || (keyCount === 1
          && (node[textNodeName]
            || typeof node[textNodeName] == 'boolean'
            || node[textNodeName] === 0))
      );
    }
    exports.prettify = prettify;
  });
  var requireXmlParser = defineCommonjsModule(
    (xmlParserExports, xmlParserModule) => {
      var { buildOptions } = requireFxpOptionsBuilder();
      var OrderedObjParserClass = requireOrderedObjParser();
      var { prettify } = requireNode2Json();
      var validator = requireFxpValidator();
      var XMLParser = class {
        constructor(options) {
          this.externalEntities = {};
          this.options = buildOptions(options);
        }
        parse(xmlData, validationOption) {
          if (typeof xmlData != 'string') {
            if (xmlData.toString) {
              xmlData = xmlData.toString();
            } else {
              throw new Error(
                'XML data is accepted in String or Bytes[] form.',
              );
            }
          }
          if (validationOption) {
            if (validationOption === !0) {
              validationOption = {};
            }
            let validationResult = validator.validate(
              xmlData,
              validationOption,
            );
            if (validationResult !== !0) {
              throw Error(
                `${validationResult.err.msg}:${validationResult.err.line}:${validationResult.err.col}`,
              );
            }
          }
          let orderedObjParser = new OrderedObjParserClass(this.options);
          orderedObjParser.addExternalEntities(this.externalEntities);
          let orderedResult = orderedObjParser.parseXml(xmlData);
          if (this.options.preserveOrder || orderedResult === void 0) {
            return orderedResult;
          } else {
            return prettify(orderedResult, this.options);
          }
        }
        addEntity(key, value) {
          if (value.indexOf('&') !== -1) {
            throw new Error("Entity value can't have '&'");
          }
          if (key.indexOf('&') !== -1 || key.indexOf(';') !== -1) {
            throw new Error(
              "An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'",
            );
          }
          if (value === '&') {
            throw new Error("An entity with value '&' is not permitted");
          }
          this.externalEntities[key] = value;
        }
      };
      xmlParserModule.exports = XMLParser;
    },
  );
  var requireOrderedJs2Xml = defineCommonjsModule(
    (builderExports, builderModule) => {
      var newLine = `
`;
      function toXml(node, options) {
        let indentation = '';
        if (options.format && options.indentBy.length > 0) {
          indentation = newLine;
        }
        return arrToStr(node, options, '', indentation);
      }
      function arrToStr(arr, options, jPath, indentation) {
        let xmlStr = '';
        let isPrevTag = !1;
        for (let itemIndex = 0; itemIndex < arr.length; itemIndex++) {
          let tagObj = arr[itemIndex];
          let tagName = propName(tagObj);
          if (tagName === void 0) {
            continue;
          }
          let newJPath = '';
          if (
            (jPath.length === 0
              ? (newJPath = tagName)
              : (newJPath = `${jPath}.${tagName}`),
            tagName === options.textNodeName)
          ) {
            let tagText = tagObj[tagName];
            if (!isStopNode(newJPath, options)) {
              tagText = options.tagValueProcessor(tagName, tagText);
              tagText = replaceEntitiesValue(tagText, options);
            }
            if (isPrevTag) {
              xmlStr += indentation;
            }
            xmlStr += tagText;
            isPrevTag = !1;
            continue;
          } else if (tagName === options.cdataPropName) {
            if (isPrevTag) {
              xmlStr += indentation;
            }
            xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
            isPrevTag = !1;
            continue;
          } else if (tagName === options.commentPropName) {
            xmlStr +=
              indentation
              + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
            isPrevTag = !0;
            continue;
          } else if (tagName[0] === '?') {
            let piAttrStr = attrToStr(tagObj[':@'], options);
            let piIndent = tagName === '?xml' ? '' : indentation;
            let piVal = tagObj[tagName][0][options.textNodeName];
            piVal = piVal.length !== 0 ? ' ' + piVal : '';
            xmlStr += piIndent + `<${tagName}${piVal}${piAttrStr}?>`;
            isPrevTag = !0;
            continue;
          }
          let newIndentation = indentation;
          if (newIndentation !== '') {
            newIndentation += options.indentBy;
          }
          let attrStr = attrToStr(tagObj[':@'], options);
          let tagStart = indentation + `<${tagName}${attrStr}`;
          let childStr = arrToStr(
            tagObj[tagName],
            options,
            newJPath,
            newIndentation,
          );
          if (options.unpairedTags.indexOf(tagName) !== -1) {
            if (options.suppressUnpairedNode) {
              xmlStr += tagStart + '>';
            } else {
              xmlStr += tagStart + '/>';
            }
          } else {
            if (
              (!childStr || childStr.length === 0)
              && options.suppressEmptyNode
            ) {
              xmlStr += tagStart + '/>';
            } else {
              if (childStr && childStr.endsWith('>')) {
                xmlStr += tagStart + `>${childStr}${indentation}</${tagName}>`;
              } else {
                xmlStr += tagStart + '>';
                if (
                  childStr
                  && indentation !== ''
                  && (childStr.includes('/>') || childStr.includes('</'))
                ) {
                  xmlStr +=
                    indentation + options.indentBy + childStr + indentation;
                } else {
                  xmlStr += childStr;
                }
                xmlStr += `</${tagName}>`;
              }
            }
          }
          isPrevTag = !0;
        }
        return xmlStr;
      }
      function propName(tagObj) {
        let keys = Object.keys(tagObj);
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
          let key = keys[keyIndex];
          if (tagObj.hasOwnProperty(key) && key !== ':@') {
            return key;
          }
        }
      }
      function attrToStr(attrMap, options) {
        let attrStr = '';
        if (attrMap && !options.ignoreAttributes) {
          for (let attr in attrMap) {
            if (!attrMap.hasOwnProperty(attr)) {
              continue;
            }
            let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
            attrVal = replaceEntitiesValue(attrVal, options);
            if (attrVal === !0 && options.suppressBooleanAttributes) {
              attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
            } else {
              attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
            }
          }
        }
        return attrStr;
      }
      function isStopNode(jPath, options) {
        jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
        let tagName = jPath.substr(jPath.lastIndexOf('.') + 1);
        for (let stopNode in options.stopNodes) {
          if (
            options.stopNodes[stopNode] === jPath
            || options.stopNodes[stopNode] === '*.' + tagName
          ) {
            return !0;
          }
        }
        return !1;
      }
      function replaceEntitiesValue(textValue, options) {
        if (textValue && textValue.length > 0 && options.processEntities) {
          for (
            let entityIndex = 0;
            entityIndex < options.entities.length;
            entityIndex++
          ) {
            let entity = options.entities[entityIndex];
            textValue = textValue.replace(entity.regex, entity.val);
          }
        }
        return textValue;
      }
      builderModule.exports = toXml;
    },
  );
  var requireXmlBuilder = defineCommonjsModule(
    (builderClassExports, builderClassModule) => {
      'use strict';

      var orderedToXml = requireOrderedJs2Xml();
      var defaultOptions = {
        attributeNamePrefix: '@_',
        attributesGroupName: !1,
        textNodeName: '#text',
        ignoreAttributes: !0,
        cdataPropName: !1,
        format: !1,
        indentBy: '  ',
        suppressEmptyNode: !1,
        suppressUnpairedNode: !0,
        suppressBooleanAttributes: !0,
        tagValueProcessor: function (tagName, val) {
          return val;
        },
        attributeValueProcessor: function (attrName, val) {
          return val;
        },
        preserveOrder: !1,
        commentPropName: !1,
        unpairedTags: [],
        entities: [
          {
            regex: new RegExp('&', 'g'),
            val: '&amp;',
          },
          {
            regex: new RegExp('>', 'g'),
            val: '&gt;',
          },
          {
            regex: new RegExp('<', 'g'),
            val: '&lt;',
          },
          {
            regex: new RegExp("'", 'g'),
            val: '&apos;',
          },
          {
            regex: new RegExp('"', 'g'),
            val: '&quot;',
          },
        ],
        processEntities: !0,
        stopNodes: [],
        oneListGroup: !1,
      };
      function XMLBuilder(options) {
        this.options = Object.assign({}, defaultOptions, options);
        if (this.options.ignoreAttributes || this.options.attributesGroupName) {
          this.isAttribute = function () {
            return !1;
          };
        } else {
          this.attrPrefixLen = this.options.attributeNamePrefix.length;
          this.isAttribute = isAttribute;
        }
        this.processTextOrObjNode = processTextOrObjNode;
        if (this.options.format) {
          this.indentate = indentate;
          this.tagEndChar = `>
`;
          this.newLine = `
`;
        } else {
          this.indentate = function () {
            return '';
          };
          this.tagEndChar = '>';
          this.newLine = '';
        }
      }
      XMLBuilder.prototype.build = function (jObj) {
        if (this.options.preserveOrder) {
          return orderedToXml(jObj, this.options);
        } else {
          if (
            Array.isArray(jObj)
            && this.options.arrayNodeName
            && this.options.arrayNodeName.length > 1
          ) {
            jObj = {
              [this.options.arrayNodeName]: jObj,
            };
          }
          return this.j2x(jObj, 0).val;
        }
      };
      XMLBuilder.prototype.j2x = function (jObj, level) {
        let attrStr = '';
        let val = '';
        for (let key in jObj) {
          if (Object.prototype.hasOwnProperty.call(jObj, key)) {
            if (typeof jObj[key] > 'u') {
              if (this.isAttribute(key)) {
                val += '';
              }
            } else if (jObj[key] === null) {
              if (this.isAttribute(key)) {
                val += '';
              } else {
                if (key[0] === '?') {
                  val +=
                    this.indentate(level) + '<' + key + '?' + this.tagEndChar;
                } else {
                  val +=
                    this.indentate(level) + '<' + key + '/' + this.tagEndChar;
                }
              }
            } else if (jObj[key] instanceof Date) {
              val += this.buildTextValNode(jObj[key], key, '', level);
            } else if (typeof jObj[key] != 'object') {
              let attr = this.isAttribute(key);
              if (attr) {
                attrStr += this.buildAttrPairStr(attr, '' + jObj[key]);
              } else if (key === this.options.textNodeName) {
                let processed = this.options.tagValueProcessor(
                  key,
                  '' + jObj[key],
                );
                val += this.replaceEntitiesValue(processed);
              } else {
                val += this.buildTextValNode(jObj[key], key, '', level);
              }
            } else if (Array.isArray(jObj[key])) {
              let arrLen = jObj[key].length;
              let arrStr = '';
              for (let idx = 0; idx < arrLen; idx++) {
                let item = jObj[key][idx];
                if (!(typeof item > 'u')) {
                  if (item === null) {
                    if (key[0] === '?') {
                      val +=
                        this.indentate(level)
                        + '<'
                        + key
                        + '?'
                        + this.tagEndChar;
                    } else {
                      val +=
                        this.indentate(level)
                        + '<'
                        + key
                        + '/'
                        + this.tagEndChar;
                    }
                  } else {
                    if (typeof item == 'object') {
                      if (this.options.oneListGroup) {
                        arrStr += this.j2x(item, level + 1).val;
                      } else {
                        arrStr += this.processTextOrObjNode(item, key, level);
                      }
                    } else {
                      arrStr += this.buildTextValNode(item, key, '', level);
                    }
                  }
                }
              }
              if (this.options.oneListGroup) {
                arrStr = this.buildObjectNode(arrStr, key, '', level);
              }
              val += arrStr;
            } else if (
              this.options.attributesGroupName
              && key === this.options.attributesGroupName
            ) {
              let attrKeys = Object.keys(jObj[key]);
              let attrCount = attrKeys.length;
              for (let idx = 0; idx < attrCount; idx++) {
                attrStr += this.buildAttrPairStr(
                  attrKeys[idx],
                  '' + jObj[key][attrKeys[idx]],
                );
              }
            } else {
              val += this.processTextOrObjNode(jObj[key], key, level);
            }
          }
        }
        return {
          attrStr: attrStr,
          val: val,
        };
      };
      XMLBuilder.prototype.buildAttrPairStr = function (attrName, val) {
        val = this.options.attributeValueProcessor(attrName, '' + val);
        val = this.replaceEntitiesValue(val);
        if (this.options.suppressBooleanAttributes && val === 'true') {
          return ' ' + attrName;
        } else {
          return ' ' + attrName + '="' + val + '"';
        }
      };
      function processTextOrObjNode(node, tagName, level) {
        let result = this.j2x(node, level + 1);
        if (
          node[this.options.textNodeName] !== void 0
          && Object.keys(node).length === 1
        ) {
          return this.buildTextValNode(
            node[this.options.textNodeName],
            tagName,
            result.attrStr,
            level,
          );
        } else {
          return this.buildObjectNode(
            result.val,
            tagName,
            result.attrStr,
            level,
          );
        }
      }
      XMLBuilder.prototype.buildObjectNode = function (
        val,
        tagName,
        attrStr,
        level,
      ) {
        if (val === '') {
          if (tagName[0] === '?') {
            return (
              this.indentate(level)
              + '<'
              + tagName
              + attrStr
              + '?'
              + this.tagEndChar
            );
          } else {
            return (
              this.indentate(level)
              + '<'
              + tagName
              + attrStr
              + this.closeTag(tagName)
              + this.tagEndChar
            );
          }
        }
        {
          let closeTag = '</' + tagName + this.tagEndChar;
          let piMarker = '';
          if (tagName[0] === '?') {
            piMarker = '?';
            closeTag = '';
          }
          if ((attrStr || attrStr === '') && val.indexOf('<') === -1) {
            return (
              this.indentate(level)
              + '<'
              + tagName
              + attrStr
              + piMarker
              + '>'
              + val
              + closeTag
            );
          } else {
            if (
              this.options.commentPropName !== !1
              && tagName === this.options.commentPropName
              && piMarker.length === 0
            ) {
              return this.indentate(level) + `<!--${val}-->` + this.newLine;
            } else {
              return (
                this.indentate(level)
                + '<'
                + tagName
                + attrStr
                + piMarker
                + this.tagEndChar
                + val
                + this.indentate(level)
                + closeTag
              );
            }
          }
        }
      };
      XMLBuilder.prototype.closeTag = function (tagName) {
        let closeTag = '';
        if (this.options.unpairedTags.indexOf(tagName) !== -1) {
          if (!this.options.suppressUnpairedNode) {
            closeTag = '/';
          }
        } else {
          if (this.options.suppressEmptyNode) {
            closeTag = '/';
          } else {
            closeTag = `></${tagName}`;
          }
        }
        return closeTag;
      };
      XMLBuilder.prototype.buildTextValNode = function (
        val,
        tagName,
        attrStr,
        level,
      ) {
        if (
          this.options.cdataPropName !== !1
          && tagName === this.options.cdataPropName
        ) {
          return this.indentate(level) + `<![CDATA[${val}]]>` + this.newLine;
        }
        if (
          this.options.commentPropName !== !1
          && tagName === this.options.commentPropName
        ) {
          return this.indentate(level) + `<!--${val}-->` + this.newLine;
        }
        if (tagName[0] === '?') {
          return (
            this.indentate(level)
            + '<'
            + tagName
            + attrStr
            + '?'
            + this.tagEndChar
          );
        }
        {
          let processed = this.options.tagValueProcessor(tagName, val);
          processed = this.replaceEntitiesValue(processed);
          if (processed === '') {
            return (
              this.indentate(level)
              + '<'
              + tagName
              + attrStr
              + this.closeTag(tagName)
              + this.tagEndChar
            );
          } else {
            return (
              this.indentate(level)
              + '<'
              + tagName
              + attrStr
              + '>'
              + processed
              + '</'
              + tagName
              + this.tagEndChar
            );
          }
        }
      };
      XMLBuilder.prototype.replaceEntitiesValue = function (textValue) {
        if (textValue && textValue.length > 0 && this.options.processEntities) {
          for (
            let entityIndex = 0;
            entityIndex < this.options.entities.length;
            entityIndex++
          ) {
            let entity = this.options.entities[entityIndex];
            textValue = textValue.replace(entity.regex, entity.val);
          }
        }
        return textValue;
      };
      function indentate(level) {
        return this.options.indentBy.repeat(level);
      }
      function isAttribute(name) {
        if (
          name.startsWith(this.options.attributeNamePrefix)
          && name !== this.options.textNodeName
        ) {
          return name.substr(this.attrPrefixLen);
        } else {
          return !1;
        }
      }
      builderClassModule.exports = XMLBuilder;
    },
  );
  var requireFxp = defineCommonjsModule((fxpExports, fxpModule) => {
    'use strict';

    var validatorModule = requireFxpValidator();
    var parserModule = requireXmlParser();
    var builderModule = requireXmlBuilder();
    fxpModule.exports = {
      XMLParser: parserModule,
      XMLValidator: validatorModule,
      XMLBuilder: builderModule,
    };
  });
  function parseMpdManifest(mpdXml) {
    let parsed = new fxpEsm.XMLParser({
      attributesGroupName: '@_',
      ignoreDeclaration: !0,
      parseAttributeValue: !0,
      ignoreAttributes: !1,
      removeNSPrefix: !0,
      trimValues: !0,
      isArray: name => name === 'adaptationset' || name === 'representation',
      transformTagName: name => name.toLowerCase(),
      transformAttributeName: name => name.toLowerCase(),
    }).parse(mpdXml);
    let adaptationSets = parsed.mpd?.period?.adaptationset;
    if (!Array.isArray(adaptationSets)) {
      return resultErr('Invalid MPD XML');
    }
    let duration = 'unknown';
    {
      let durationStr = parsed.mpd?.['@_']?.['@_mediapresentationduration'];
      if (typeof durationStr == 'string') {
        let secondsRegex = /\d+(\.\d+)?S/;
        let minutesRegex = /\d+M/;
        let secondsMatch = secondsRegex.exec(durationStr);
        let minutesMatch = minutesRegex.exec(durationStr);
        if (secondsMatch || minutesMatch) {
          duration = 0;
          if (secondsMatch && secondsMatch.length > 0) {
            duration = parseFloat(secondsMatch[0]);
          }
          if (minutesMatch && minutesMatch.length > 0) {
            duration += 60 * (parseFloat(minutesMatch[0]) || 0);
          }
        }
      }
    }
    let variantCounter = 0;
    let results = [];
    for (let adaptationSet of adaptationSets) {
      let propSources = [adaptationSet];
      if (
        'contentcomponent' in adaptationSet
        && '@_' in adaptationSet.contentcomponent
      ) {
        propSources.push(adaptationSet.contentcomponent);
      }
      if (
        'segmenttemplate' in adaptationSet
        && '@_' in adaptationSet.segmenttemplate
      ) {
        propSources.push(adaptationSet.segmenttemplate);
      }
      let commonProps = {
        bitrate: ResultNone,
        content_type: void 0,
        mime_type: void 0,
        codecs: void 0,
        width: void 0,
        height: void 0,
        framerate: ResultNone,
      };
      let collectProps = (sources, base) => {
        let props = {
          ...base,
        };
        for (let source of sources) {
          let attrs = source['@_'] ?? [];
          for (let attrKey of Object.keys(attrs)) {
            if (attrKey === '@_bandwidth') {
              let attrVal = attrs['@_bandwidth'];
              if (typeof attrVal == 'number') {
                props.bitrate = resultSome(attrVal);
              }
            }
            if (attrKey === '@_contenttype') {
              let attrVal = attrs['@_contenttype'];
              if (typeof attrVal == 'string') {
                props.content_type = attrVal;
              }
            }
            if (attrKey === '@_mimetype') {
              let attrVal = attrs['@_mimetype'];
              if (typeof attrVal == 'string') {
                props.mime_type = attrVal;
              }
            }
            if (attrKey === '@_codecs') {
              let attrVal = attrs['@_codecs'];
              if (typeof attrVal == 'string') {
                props.codecs = attrVal;
              }
            }
            if (attrKey === '@_width') {
              let attrVal = attrs['@_width'];
              if (typeof attrVal == 'number') {
                props.width = attrVal;
              }
            }
            if (attrKey === '@_height') {
              let attrVal = attrs['@_height'];
              if (typeof attrVal == 'number') {
                props.height = attrVal;
              }
            }
            if (attrKey === '@_framerate') {
              let attrVal = attrs['@_framerate'];
              if (typeof attrVal == 'number') {
                props.framerate = resultSome(attrVal);
              }
            }
          }
        }
        return props;
      };
      commonProps = collectProps(propSources, commonProps);
      let representations = adaptationSet.representation;
      if (!Array.isArray(representations)) {
        break;
      }
      for (let representation of representations) {
        let variantId = variantCounter.toString();
        variantCounter++;
        let props = collectProps([representation], commonProps);
        let { codecs, mime_type, bitrate, width, height, framerate } = props;
        let parseResult = resultErr('Invalid mimetype/codecs');
        if (typeof mime_type == 'string' && typeof codecs == 'string') {
          let mimeCodec = `${mime_type}; codecs="${codecs}"`;
          parseResult = parseMimeType(mimeCodec);
        }
        if (parseResult.isErr()) {
          console.warn('Failed to parse mimetype from', mime_type, codecs);
          continue;
        }
        let { av_codecs, container } = parseResult.unwrap();
        let avTracks = matchAudioVideo(
          av_codecs,
          audioCodecName => ({
            codec: makeAudioCodec(audioCodecName),
            bitrate: bitrate,
          }),
          videoCodecName => {
            let codec = makeVideoCodec(videoCodecName);
            let fps = framerate;
            let dimensions = ResultNone;
            let quality = ResultNone;
            if (typeof width == 'number' && typeof height == 'number') {
              quality = resultSome(qualityLabelForHeight(height));
              dimensions = resultSome({
                width: width,
                height: height,
              });
            }
            return {
              codec: codec,
              bitrate: bitrate,
              fps: fps,
              dimensions: dimensions,
              quality: quality,
            };
          },
        );
        let coreMedia = {
          builder: 'MPD',
          protocol: 'dash',
          content_length: ResultNone,
          duration: duration,
          container: containerByName(container),
          av: avTracks,
        };
        results.push([coreMedia, variantId]);
      }
    }
    return resultOk(results);
  }
  var fxpEsm;
  var initMpdParser = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initMediaTypeSupport();
    initCodecs();
    initContainers();
    initProtocolTypes();
    initObjGuards();
    fxpEsm = toEsm(requireFxp(), 1);
    initQualities();
    initIterTools();
  });
  function vimeoThumbFrom(config, hit) {
    let thumb = config.video?.thumbs?.['640'] || config.video?.thumbs?.base;
    if (thumb) {
      hit.thumbnailUrl2 = thumb.toString();
    }
    let hlsCdns = config.request?.files?.hls?.cdns;
    let defaultCdn = config.request?.files?.hls?.default_cdn;
    if (defaultCdn in hlsCdns) {
      new MasterHLSProbe(hlsCdns[defaultCdn].url, []).onHitDataAvailable(hit);
      return;
    }
    let dashCdns = config.request?.files?.dash?.cdns;
    if (hlsCdns) {
      for (let cdnKey in hlsCdns) {
        let url = hlsCdns[cdnKey]?.url;
        if (url) {
          new MasterHLSProbe(url, []).onHitDataAvailable(hit);
        }
      }
    }
    if (dashCdns) {
      for (let cdnKey in dashCdns) {
        let url = dashCdns[cdnKey]?.url.replace('master.json', 'master.mpd');
        if (url) {
          new MPDProbe(url, []).onHitDataAvailable(hit);
        }
      }
    }
  }
  var httpProbeUtil;
  var httpProbeBrowser;
  var VimeoPlayerProbe;
  var VimeoConfigProbe;
  var initHttpProbes = defineLazyModule(() => {
    'use strict';

    initProbes();
    httpProbeUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    httpProbeBrowser = requireWeh().browser;
    VimeoPlayerProbe = class {
      constructor(url, headers) {}
      static canHandle(url, contentType, headers) {
        return !!(
          url.startsWith('https://player.vimeo.com/video/')
          && contentType == 'text/html; charset=utf-8'
        );
      }
      async onHitDataAvailable(hit) {
        let target = {
          tabId: hit.tabId,
        };
        if (hit.frameId) {
          target.frameIds = [hit.frameId];
        }
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            let result = await httpProbeBrowser.scripting.executeScript({
              target: target,
              world: httpProbeBrowser.scripting.ExecutionWorld.MAIN,
              func: () =>
                window.playerConfig ?? window.wrappedJSObject?.playerConfig,
            });
            if (result[0]?.result) {
              vimeoThumbFrom(result[0].result, hit);
              return;
            }
          } catch {}
          await new Promise(resolve => setTimeout(resolve, 2e3));
        }
        console.warn("Couldn't get vimeo player config");
      }
    };
    VimeoConfigProbe = class {
      constructor(configUrl, headers) {
        this.headers = headers;
        this.config_url = configUrl;
      }
      static canHandle(url, contentType, headers) {
        let originHeader = headers.find(header => header.name == 'Origin');
        if (
          originHeader?.value?.includes('vimeo.com')
          || originHeader?.value?.includes('vhx.tv')
        ) {
          return url.includes('config?');
        } else {
          return !1;
        }
      }
      async onHitDataAvailable(hit) {
        let response = await httpProbeUtil.request({
          url: this.config_url,
          headers: this.headers,
        });
        if (!response.ok) {
          console.warn('Failed to fetch Vimeo Config content');
          return;
        }
        let config = await response.json();
        vimeoThumbFrom(config, hit);
      }
    };
  });
  var M3u8EventTarget;
  var initM3u8EventTarget = defineLazyModule(() => {
    M3u8EventTarget = (function () {
      function EventTargetCtor() {
        this.listeners = {};
      }
      var proto = EventTargetCtor.prototype;
      proto.on = function (type, listener) {
        if (!this.listeners[type]) {
          this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
      };
      proto.off = function (type, listener) {
        if (!this.listeners[type]) {
          return !1;
        }
        var index = this.listeners[type].indexOf(listener);
        this.listeners[type] = this.listeners[type].slice(0);
        this.listeners[type].splice(index, 1);
        return index > -1;
      };
      proto.trigger = function (type) {
        var listeners = this.listeners[type];
        if (listeners) {
          if (arguments.length === 2) {
            for (
              var len = listeners.length, listenerIndex = 0;
              listenerIndex < len;
              ++listenerIndex
            ) {
              listeners[listenerIndex].call(this, arguments[1]);
            }
          } else {
            for (
              var args = Array.prototype.slice.call(arguments, 1),
                len = listeners.length,
                listenerIndex = 0;
              listenerIndex < len;
              ++listenerIndex
            ) {
              listeners[listenerIndex].apply(this, args);
            }
          }
        }
      };
      proto.dispose = function () {
        this.listeners = {};
      };
      proto.pipe = function (dest) {
        this.on('data', function (data) {
          dest.push(data);
        });
      };
      return EventTargetCtor;
    })();
  });
  function objectAssignInto() {
    objectAssignInto = Object.assign
      ? Object.assign.bind()
      : function (target) {
          for (var argIndex = 1; argIndex < arguments.length; argIndex++) {
            var source = arguments[argIndex];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
    return objectAssignInto.apply(this, arguments);
  }
  var initM3u8Types = defineLazyModule(() => {});
  var requireGlobalObject = defineCommonjsModule(
    (globalExports, globalModule) => {
      var globalObj;
      if (typeof window < 'u') {
        globalObj = window;
      } else {
        if (typeof global < 'u') {
          globalObj = global;
        } else {
          if (typeof self < 'u') {
            globalObj = self;
          } else {
            globalObj = {};
          }
        }
      }
      globalModule.exports = globalObj;
    },
  );
  function base64ToBytes(str) {
    for (
      var binary = atobCompat(str),
        bytes = new Uint8Array(binary.length),
        index = 0;
      index < binary.length;
      index++
    ) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }
  var m3u8GlobalEsm;
  var atobCompat;
  var initM3u8Base64 = defineLazyModule(() => {
    m3u8GlobalEsm = toEsm(requireGlobalObject());
    atobCompat = function (str) {
      if (m3u8GlobalEsm.default.atob) {
        return m3u8GlobalEsm.default.atob(str);
      } else {
        return Buffer.from(str, 'base64').toString('binary');
      }
    };
  });
  var M3u8LineStream;
  var TAB_CHAR;
  var parseByterange;
  var makeAttrSplitRegex;
  var parseAttributes;
  var M3u8ParseStream;
  var camelCaseTagName;
  var camelCaseKeys;
  var applyHoldBackRules;
  var M3u8Parser;
  var initM3u8Parser = defineLazyModule(() => {
    initM3u8EventTarget();
    initM3u8Types();
    initM3u8Base64();
    M3u8LineStream = class extends M3u8EventTarget {
      constructor() {
        super();
        this.buffer = '';
      }
      push(chunk) {
        let newlineIndex;
        for (
          this.buffer += chunk,
            newlineIndex = this.buffer.indexOf(`
`);
          newlineIndex > -1;
          newlineIndex = this.buffer.indexOf(`
`)
        ) {
          this.trigger('data', this.buffer.substring(0, newlineIndex));
          this.buffer = this.buffer.substring(newlineIndex + 1);
        }
      }
    };
    TAB_CHAR = '	';
    parseByterange = function (byterangeString) {
      let match = /([0-9.]*)?@?([0-9.]*)?/.exec(byterangeString || '');
      let result = {};
      if (match[1]) {
        result.length = parseInt(match[1], 10);
      }
      if (match[2]) {
        result.offset = parseInt(match[2], 10);
      }
      return result;
    };
    makeAttrSplitRegex = function () {
      let keyValuePattern = '(?:' + '[^=]*' + ')=(?:' + '"[^"]*"|[^,]*' + ')';
      return new RegExp('(?:^|,)(' + keyValuePattern + ')');
    };
    parseAttributes = function (attributeString) {
      let attributes = {};
      if (!attributeString) {
        return attributes;
      }
      let pairs = attributeString.split(makeAttrSplitRegex());
      let index = pairs.length;
      let keyValue;
      for (; index--; ) {
        if (pairs[index] !== '') {
          keyValue = /([^=]*)=(.*)/.exec(pairs[index]).slice(1);
          keyValue[0] = keyValue[0].replace(/^\s+|\s+$/g, '');
          keyValue[1] = keyValue[1].replace(/^\s+|\s+$/g, '');
          keyValue[1] = keyValue[1].replace(/^['"](.*)['"]$/g, '$1');
          attributes[keyValue[0]] = keyValue[1];
        }
      }
      return attributes;
    };
    M3u8ParseStream = class extends M3u8EventTarget {
      constructor() {
        super();
        this.customParsers = [];
        this.tagMappers = [];
      }
      push(rawLine) {
        let match;
        let tagEntry;
        if (((rawLine = rawLine.trim()), rawLine.length === 0)) {
          return;
        }
        if (rawLine[0] !== '#') {
          this.trigger('data', {
            type: 'uri',
            uri: rawLine,
          });
          return;
        }
        this.tagMappers
          .reduce(
            (mappedLines, tagMapper) => {
              let mapped = tagMapper(rawLine);
              if (mapped === rawLine) {
                return mappedLines;
              } else {
                return mappedLines.concat([mapped]);
              }
            },
            [rawLine],
          )
          .forEach(line => {
            for (
              let parserIndex = 0;
              parserIndex < this.customParsers.length;
              parserIndex++
            ) {
              if (this.customParsers[parserIndex].call(this, line)) {
                return;
              }
            }
            if (line.indexOf('#EXT') !== 0) {
              this.trigger('data', {
                type: 'comment',
                text: line.slice(1),
              });
              return;
            }
            if (
              ((line = line.replace('\r', '')),
              (match = /^#EXTM3U/.exec(line)),
              match)
            ) {
              this.trigger('data', {
                type: 'tag',
                tagType: 'm3u',
              });
              return;
            }
            if (((match = /^#EXTINF:([0-9\.]*)?,?(.*)?$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'inf',
              };
              if (match[1]) {
                tagEntry.duration = parseFloat(match[1]);
              }
              if (match[2]) {
                tagEntry.title = match[2];
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-TARGETDURATION:([0-9.]*)?/.exec(line)), match)
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'targetduration',
              };
              if (match[1]) {
                tagEntry.duration = parseInt(match[1], 10);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-VERSION:([0-9.]*)?/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'version',
              };
              if (match[1]) {
                tagEntry.version = parseInt(match[1], 10);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-MEDIA-SEQUENCE:(\-?[0-9.]*)?/.exec(line)),
              match)
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'media-sequence',
              };
              if (match[1]) {
                tagEntry.number = parseInt(match[1], 10);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-DISCONTINUITY-SEQUENCE:(\-?[0-9.]*)?/.exec(
                line,
              )),
              match)
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'discontinuity-sequence',
              };
              if (match[1]) {
                tagEntry.number = parseInt(match[1], 10);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-PLAYLIST-TYPE:(.*)?$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'playlist-type',
              };
              if (match[1]) {
                tagEntry.playlistType = match[1];
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-BYTERANGE:(.*)?$/.exec(line)), match)) {
              tagEntry = objectAssignInto(parseByterange(match[1]), {
                type: 'tag',
                tagType: 'byterange',
              });
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-ALLOW-CACHE:(YES|NO)?/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'allow-cache',
              };
              if (match[1]) {
                tagEntry.allowed = !/NO/.test(match[1]);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-MAP:(.*)$/.exec(line)), match)) {
              if (
                ((tagEntry = {
                  type: 'tag',
                  tagType: 'map',
                }),
                match[1])
              ) {
                let mapAttrs = parseAttributes(match[1]);
                if (mapAttrs.URI) {
                  tagEntry.uri = mapAttrs.URI;
                }
                if (mapAttrs.BYTERANGE) {
                  tagEntry.byterange = parseByterange(mapAttrs.BYTERANGE);
                }
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-STREAM-INF:(.*)$/.exec(line)), match)) {
              if (
                ((tagEntry = {
                  type: 'tag',
                  tagType: 'stream-inf',
                }),
                match[1])
              ) {
                if (
                  ((tagEntry.attributes = parseAttributes(match[1])),
                  tagEntry.attributes.RESOLUTION)
                ) {
                  let resolutionParts =
                    tagEntry.attributes.RESOLUTION.split('x');
                  let resolution = {};
                  if (resolutionParts[0]) {
                    resolution.width = parseInt(resolutionParts[0], 10);
                  }
                  if (resolutionParts[1]) {
                    resolution.height = parseInt(resolutionParts[1], 10);
                  }
                  tagEntry.attributes.RESOLUTION = resolution;
                }
                if (tagEntry.attributes.BANDWIDTH) {
                  tagEntry.attributes.BANDWIDTH = parseInt(
                    tagEntry.attributes.BANDWIDTH,
                    10,
                  );
                }
                if (tagEntry.attributes['FRAME-RATE']) {
                  tagEntry.attributes['FRAME-RATE'] = parseFloat(
                    tagEntry.attributes['FRAME-RATE'],
                  );
                }
                if (tagEntry.attributes['PROGRAM-ID']) {
                  tagEntry.attributes['PROGRAM-ID'] = parseInt(
                    tagEntry.attributes['PROGRAM-ID'],
                    10,
                  );
                }
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-MEDIA:(.*)$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'media',
              };
              if (match[1]) {
                tagEntry.attributes = parseAttributes(match[1]);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-ENDLIST/.exec(line)), match)) {
              this.trigger('data', {
                type: 'tag',
                tagType: 'endlist',
              });
              return;
            }
            if (((match = /^#EXT-X-DISCONTINUITY/.exec(line)), match)) {
              this.trigger('data', {
                type: 'tag',
                tagType: 'discontinuity',
              });
              return;
            }
            if (
              ((match = /^#EXT-X-PROGRAM-DATE-TIME:(.*)$/.exec(line)), match)
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'program-date-time',
              };
              if (match[1]) {
                tagEntry.dateTimeString = match[1];
                tagEntry.dateTimeObject = new Date(match[1]);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-KEY:(.*)$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'key',
              };
              if (match[1]) {
                tagEntry.attributes = parseAttributes(match[1]);
                if (tagEntry.attributes.IV) {
                  if (
                    tagEntry.attributes.IV.substring(0, 2).toLowerCase()
                    === '0x'
                  ) {
                    tagEntry.attributes.IV =
                      tagEntry.attributes.IV.substring(2);
                  }
                  tagEntry.attributes.IV =
                    tagEntry.attributes.IV.match(/.{8}/g);
                  tagEntry.attributes.IV[0] = parseInt(
                    tagEntry.attributes.IV[0],
                    16,
                  );
                  tagEntry.attributes.IV[1] = parseInt(
                    tagEntry.attributes.IV[1],
                    16,
                  );
                  tagEntry.attributes.IV[2] = parseInt(
                    tagEntry.attributes.IV[2],
                    16,
                  );
                  tagEntry.attributes.IV[3] = parseInt(
                    tagEntry.attributes.IV[3],
                    16,
                  );
                  tagEntry.attributes.IV = new Uint32Array(
                    tagEntry.attributes.IV,
                  );
                }
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-START:(.*)$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'start',
              };
              if (match[1]) {
                tagEntry.attributes = parseAttributes(match[1]);
                tagEntry.attributes['TIME-OFFSET'] = parseFloat(
                  tagEntry.attributes['TIME-OFFSET'],
                );
                tagEntry.attributes.PRECISE = /YES/.test(
                  tagEntry.attributes.PRECISE,
                );
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-CUE-OUT-CONT:(.*)?$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'cue-out-cont',
              };
              if (match[1]) {
                tagEntry.data = match[1];
              } else {
                tagEntry.data = '';
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-CUE-OUT:(.*)?$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'cue-out',
              };
              if (match[1]) {
                tagEntry.data = match[1];
              } else {
                tagEntry.data = '';
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-CUE-IN:(.*)?$/.exec(line)), match)) {
              tagEntry = {
                type: 'tag',
                tagType: 'cue-in',
              };
              if (match[1]) {
                tagEntry.data = match[1];
              } else {
                tagEntry.data = '';
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-SKIP:(.*)$/.exec(line)), match && match[1])
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'skip',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              if (tagEntry.attributes.hasOwnProperty('SKIPPED-SEGMENTS')) {
                tagEntry.attributes['SKIPPED-SEGMENTS'] = parseInt(
                  tagEntry.attributes['SKIPPED-SEGMENTS'],
                  10,
                );
              }
              if (
                tagEntry.attributes.hasOwnProperty(
                  'RECENTLY-REMOVED-DATERANGES',
                )
              ) {
                tagEntry.attributes['RECENTLY-REMOVED-DATERANGES'] =
                  tagEntry.attributes['RECENTLY-REMOVED-DATERANGES'].split(
                    TAB_CHAR,
                  );
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-PART:(.*)$/.exec(line)), match && match[1])
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'part',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              ['DURATION'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = parseFloat(
                    tagEntry.attributes[attrName],
                  );
                }
              });
              ['INDEPENDENT', 'GAP'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = /YES/.test(
                    tagEntry.attributes[attrName],
                  );
                }
              });
              if (tagEntry.attributes.hasOwnProperty('BYTERANGE')) {
                tagEntry.attributes.byterange = parseByterange(
                  tagEntry.attributes.BYTERANGE,
                );
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-SERVER-CONTROL:(.*)$/.exec(line)),
              match && match[1])
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'server-control',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              ['CAN-SKIP-UNTIL', 'PART-HOLD-BACK', 'HOLD-BACK'].forEach(
                function (attrName) {
                  if (tagEntry.attributes.hasOwnProperty(attrName)) {
                    tagEntry.attributes[attrName] = parseFloat(
                      tagEntry.attributes[attrName],
                    );
                  }
                },
              );
              ['CAN-SKIP-DATERANGES', 'CAN-BLOCK-RELOAD'].forEach(
                function (attrName) {
                  if (tagEntry.attributes.hasOwnProperty(attrName)) {
                    tagEntry.attributes[attrName] = /YES/.test(
                      tagEntry.attributes[attrName],
                    );
                  }
                },
              );
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-PART-INF:(.*)$/.exec(line)), match && match[1])
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'part-inf',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              ['PART-TARGET'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = parseFloat(
                    tagEntry.attributes[attrName],
                  );
                }
              });
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-PRELOAD-HINT:(.*)$/.exec(line)),
              match && match[1])
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'preload-hint',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              ['BYTERANGE-START', 'BYTERANGE-LENGTH'].forEach(
                function (attrName) {
                  if (tagEntry.attributes.hasOwnProperty(attrName)) {
                    tagEntry.attributes[attrName] = parseInt(
                      tagEntry.attributes[attrName],
                      10,
                    );
                    let byterangeKey =
                      attrName === 'BYTERANGE-LENGTH' ? 'length' : 'offset';
                    tagEntry.attributes.byterange =
                      tagEntry.attributes.byterange || {};
                    tagEntry.attributes.byterange[byterangeKey] =
                      tagEntry.attributes[attrName];
                    delete tagEntry.attributes[attrName];
                  }
                },
              );
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-RENDITION-REPORT:(.*)$/.exec(line)),
              match && match[1])
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'rendition-report',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              ['LAST-MSN', 'LAST-PART'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = parseInt(
                    tagEntry.attributes[attrName],
                    10,
                  );
                }
              });
              this.trigger('data', tagEntry);
              return;
            }
            if (
              ((match = /^#EXT-X-DATERANGE:(.*)$/.exec(line)),
              match && match[1])
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'daterange',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              ['ID', 'CLASS'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = String(
                    tagEntry.attributes[attrName],
                  );
                }
              });
              ['START-DATE', 'END-DATE'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = new Date(
                    tagEntry.attributes[attrName],
                  );
                }
              });
              ['DURATION', 'PLANNED-DURATION'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = parseFloat(
                    tagEntry.attributes[attrName],
                  );
                }
              });
              ['END-ON-NEXT'].forEach(function (attrName) {
                if (tagEntry.attributes.hasOwnProperty(attrName)) {
                  tagEntry.attributes[attrName] = /YES/i.test(
                    tagEntry.attributes[attrName],
                  );
                }
              });
              ['SCTE35-CMD', ' SCTE35-OUT', 'SCTE35-IN'].forEach(
                function (attrName) {
                  if (tagEntry.attributes.hasOwnProperty(attrName)) {
                    tagEntry.attributes[attrName] =
                      tagEntry.attributes[attrName].toString(16);
                  }
                },
              );
              let customTagPattern = /^X-([A-Z]+-)+[A-Z]+$/;
              for (let attrName in tagEntry.attributes) {
                if (!customTagPattern.test(attrName)) {
                  continue;
                }
                let isHex = /[0-9A-Fa-f]{6}/g.test(
                  tagEntry.attributes[attrName],
                );
                let isNumeric = /^\d+(\.\d+)?$/.test(
                  tagEntry.attributes[attrName],
                );
                tagEntry.attributes[attrName] = isHex
                  ? tagEntry.attributes[attrName].toString(16)
                  : isNumeric
                    ? parseFloat(tagEntry.attributes[attrName])
                    : String(tagEntry.attributes[attrName]);
              }
              this.trigger('data', tagEntry);
              return;
            }
            if (((match = /^#EXT-X-INDEPENDENT-SEGMENTS/.exec(line)), match)) {
              this.trigger('data', {
                type: 'tag',
                tagType: 'independent-segments',
              });
              return;
            }
            if (
              ((match = /^#EXT-X-CONTENT-STEERING:(.*)$/.exec(line)), match)
            ) {
              tagEntry = {
                type: 'tag',
                tagType: 'content-steering',
              };
              tagEntry.attributes = parseAttributes(match[1]);
              this.trigger('data', tagEntry);
              return;
            }
            this.trigger('data', {
              type: 'tag',
              data: line.slice(4),
            });
          });
      }
      addParser({
        expression: expression,
        customType: customType,
        dataParser: dataParser,
        segment: segment,
      }) {
        if (typeof dataParser != 'function') {
          dataParser = line => line;
        }
        this.customParsers.push(line => {
          if (expression.exec(line)) {
            this.trigger('data', {
              type: 'custom',
              data: dataParser(line),
              customType: customType,
              segment: segment,
            });
            return !0;
          }
        });
      }
      addTagMapper({ expression: expression, map: map }) {
        let mapper = line => (expression.test(line) ? map(line) : line);
        this.tagMappers.push(mapper);
      }
    };
    camelCaseTagName = kebabName =>
      kebabName
        .toLowerCase()
        .replace(/-(\w)/g, match => match[1].toUpperCase());
    camelCaseKeys = function (source) {
      let camelCased = {};
      Object.keys(source).forEach(function (key) {
        camelCased[camelCaseTagName(key)] = source[key];
      });
      return camelCased;
    };
    applyHoldBackRules = function (manifest) {
      let {
        serverControl: serverControl,
        targetDuration: targetDuration,
        partTargetDuration: partTargetDuration,
      } = manifest;
      if (!serverControl) {
        return;
      }
      let tagName = '#EXT-X-SERVER-CONTROL';
      let holdBackKey = 'holdBack';
      let partHoldBackKey = 'partHoldBack';
      let holdBackDefault = targetDuration && targetDuration * 3;
      let partHoldBackMin = partTargetDuration && partTargetDuration * 2;
      if (targetDuration && !serverControl.hasOwnProperty(holdBackKey)) {
        serverControl[holdBackKey] = holdBackDefault;
        this.trigger('info', {
          message: `${tagName} defaulting HOLD-BACK to targetDuration * 3 (${holdBackDefault}).`,
        });
      }
      if (holdBackDefault && serverControl[holdBackKey] < holdBackDefault) {
        this.trigger('warn', {
          message: `${tagName} clamping HOLD-BACK (${serverControl[holdBackKey]}) to targetDuration * 3 (${holdBackDefault})`,
        });
        serverControl[holdBackKey] = holdBackDefault;
      }
      if (
        partTargetDuration
        && !serverControl.hasOwnProperty(partHoldBackKey)
      ) {
        serverControl[partHoldBackKey] = partTargetDuration * 3;
        this.trigger('info', {
          message: `${tagName} defaulting PART-HOLD-BACK to partTargetDuration * 3 (${serverControl[partHoldBackKey]}).`,
        });
      }
      if (
        partTargetDuration
        && serverControl[partHoldBackKey] < partHoldBackMin
      ) {
        this.trigger('warn', {
          message: `${tagName} clamping PART-HOLD-BACK (${serverControl[partHoldBackKey]}) to partTargetDuration * 2 (${partHoldBackMin}).`,
        });
        serverControl[partHoldBackKey] = partHoldBackMin;
      }
    };
    M3u8Parser = class extends M3u8EventTarget {
      constructor() {
        super();
        this.lineStream = new M3u8LineStream();
        this.parseStream = new M3u8ParseStream();
        this.lineStream.pipe(this.parseStream);
        this.lastProgramDateTime = null;
        let self = this;
        let entries = [];
        let currentEntry = {};
        let currentMap;
        let currentKey;
        let sawPart = !1;
        let noop = function () {};
        let mediaGroupDefaults = {
          AUDIO: {},
          VIDEO: {},
          'CLOSED-CAPTIONS': {},
          SUBTITLES: {},
        };
        let widevineSystemId = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed';
        let timeline = 0;
        this.manifest = {
          allowCache: !0,
          discontinuityStarts: [],
          dateRanges: [],
          segments: [],
        };
        let byterangeOffset = 0;
        let partByterangeOffset = 0;
        let dateRangesById = {};
        this.on('end', () => {
          if (
            !(
              currentEntry.uri
              || (!currentEntry.parts && !currentEntry.preloadHints)
            )
          ) {
            if (!currentEntry.map && currentMap) {
              currentEntry.map = currentMap;
            }
            if (!currentEntry.key && currentKey) {
              currentEntry.key = currentKey;
            }
            if (!currentEntry.timeline && typeof timeline == 'number') {
              currentEntry.timeline = timeline;
            }
            this.manifest.preloadSegment = currentEntry;
          }
        });
        this.parseStream.on('data', function (event) {
          let mediaGroup;
          let mediaItem;
          ({
            tag() {
              (
                ({
                  version() {
                    if (event.version) {
                      this.manifest.version = event.version;
                    }
                  },
                  'allow-cache'() {
                    this.manifest.allowCache = event.allowed;
                    if (!('allowed' in event)) {
                      this.trigger('info', {
                        message: 'defaulting allowCache to YES',
                      });
                      this.manifest.allowCache = !0;
                    }
                  },
                  byterange() {
                    let byterange = {};
                    if ('length' in event) {
                      currentEntry.byterange = byterange;
                      byterange.length = event.length;
                      if (!('offset' in event)) {
                        event.offset = byterangeOffset;
                      }
                    }
                    if ('offset' in event) {
                      currentEntry.byterange = byterange;
                      byterange.offset = event.offset;
                    }
                    byterangeOffset = byterange.offset + byterange.length;
                  },
                  endlist() {
                    this.manifest.endList = !0;
                  },
                  inf() {
                    if (!('mediaSequence' in this.manifest)) {
                      this.manifest.mediaSequence = 0;
                      this.trigger('info', {
                        message: 'defaulting media sequence to zero',
                      });
                    }
                    if (!('discontinuitySequence' in this.manifest)) {
                      this.manifest.discontinuitySequence = 0;
                      this.trigger('info', {
                        message: 'defaulting discontinuity sequence to zero',
                      });
                    }
                    if (event.title) {
                      currentEntry.title = event.title;
                    }
                    if (event.duration > 0) {
                      currentEntry.duration = event.duration;
                    }
                    if (event.duration === 0) {
                      currentEntry.duration = 0.01;
                      this.trigger('info', {
                        message:
                          'updating zero segment duration to a small value',
                      });
                    }
                    this.manifest.segments = entries;
                  },
                  key() {
                    if (!event.attributes) {
                      this.trigger('warn', {
                        message:
                          'ignoring key declaration without attribute list',
                      });
                      return;
                    }
                    if (event.attributes.METHOD === 'NONE') {
                      currentKey = null;
                      return;
                    }
                    if (!event.attributes.URI) {
                      this.trigger('warn', {
                        message: 'ignoring key declaration without URI',
                      });
                      return;
                    }
                    if (
                      event.attributes.KEYFORMAT
                      === 'com.apple.streamingkeydelivery'
                    ) {
                      this.manifest.contentProtection =
                        this.manifest.contentProtection || {};
                      this.manifest.contentProtection['com.apple.fps.1_0'] = {
                        attributes: event.attributes,
                      };
                      return;
                    }
                    if (
                      event.attributes.KEYFORMAT === 'com.microsoft.playready'
                    ) {
                      this.manifest.contentProtection =
                        this.manifest.contentProtection || {};
                      this.manifest.contentProtection[
                        'com.microsoft.playready'
                      ] = {
                        uri: event.attributes.URI,
                      };
                      return;
                    }
                    if (event.attributes.KEYFORMAT === widevineSystemId) {
                      if (
                        [
                          'SAMPLE-AES',
                          'SAMPLE-AES-CTR',
                          'SAMPLE-AES-CENC',
                        ].indexOf(event.attributes.METHOD) === -1
                      ) {
                        this.trigger('warn', {
                          message: 'invalid key method provided for Widevine',
                        });
                        return;
                      }
                      if (
                        (event.attributes.METHOD === 'SAMPLE-AES-CENC'
                          && this.trigger('warn', {
                            message:
                              'SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead',
                          }),
                        event.attributes.URI.substring(0, 23)
                          !== 'data:text/plain;base64,')
                      ) {
                        this.trigger('warn', {
                          message: 'invalid key URI provided for Widevine',
                        });
                        return;
                      }
                      if (
                        !(
                          event.attributes.KEYID
                          && event.attributes.KEYID.substring(0, 2) === '0x'
                        )
                      ) {
                        this.trigger('warn', {
                          message: 'invalid key ID provided for Widevine',
                        });
                        return;
                      }
                      this.manifest.contentProtection =
                        this.manifest.contentProtection || {};
                      this.manifest.contentProtection['com.widevine.alpha'] = {
                        attributes: {
                          schemeIdUri: event.attributes.KEYFORMAT,
                          keyId: event.attributes.KEYID.substring(2),
                        },
                        pssh: base64ToBytes(event.attributes.URI.split(',')[1]),
                      };
                      return;
                    }
                    if (!event.attributes.METHOD) {
                      this.trigger('warn', {
                        message: 'defaulting key method to AES-128',
                      });
                    }
                    currentKey = {
                      method: event.attributes.METHOD || 'AES-128',
                      uri: event.attributes.URI,
                    };
                    if (typeof event.attributes.IV < 'u') {
                      currentKey.iv = event.attributes.IV;
                    }
                  },
                  'media-sequence'() {
                    if (!isFinite(event.number)) {
                      this.trigger('warn', {
                        message:
                          'ignoring invalid media sequence: ' + event.number,
                      });
                      return;
                    }
                    this.manifest.mediaSequence = event.number;
                  },
                  'discontinuity-sequence'() {
                    if (!isFinite(event.number)) {
                      this.trigger('warn', {
                        message:
                          'ignoring invalid discontinuity sequence: '
                          + event.number,
                      });
                      return;
                    }
                    this.manifest.discontinuitySequence = event.number;
                    timeline = event.number;
                  },
                  'playlist-type'() {
                    if (!/VOD|EVENT/.test(event.playlistType)) {
                      this.trigger('warn', {
                        message:
                          'ignoring unknown playlist type: ' + event.playlist,
                      });
                      return;
                    }
                    this.manifest.playlistType = event.playlistType;
                  },
                  map() {
                    currentMap = {};
                    if (event.uri) {
                      currentMap.uri = event.uri;
                    }
                    if (event.byterange) {
                      currentMap.byterange = event.byterange;
                    }
                    if (currentKey) {
                      currentMap.key = currentKey;
                    }
                  },
                  'stream-inf'() {
                    if (
                      ((this.manifest.playlists = entries),
                      (this.manifest.mediaGroups =
                        this.manifest.mediaGroups || mediaGroupDefaults),
                      !event.attributes)
                    ) {
                      this.trigger('warn', {
                        message: 'ignoring empty stream-inf attributes',
                      });
                      return;
                    }
                    if (!currentEntry.attributes) {
                      currentEntry.attributes = {};
                    }
                    objectAssignInto(currentEntry.attributes, event.attributes);
                  },
                  media() {
                    if (
                      ((this.manifest.mediaGroups =
                        this.manifest.mediaGroups || mediaGroupDefaults),
                      !(
                        event.attributes
                        && event.attributes.TYPE
                        && event.attributes['GROUP-ID']
                        && event.attributes.NAME
                      ))
                    ) {
                      this.trigger('warn', {
                        message: 'ignoring incomplete or missing media group',
                      });
                      return;
                    }
                    let groupMap =
                      this.manifest.mediaGroups[event.attributes.TYPE];
                    groupMap[event.attributes['GROUP-ID']] =
                      groupMap[event.attributes['GROUP-ID']] || {};
                    mediaGroup = groupMap[event.attributes['GROUP-ID']];
                    mediaItem = {
                      default: /yes/i.test(event.attributes.DEFAULT),
                    };
                    if (mediaItem.default) {
                      mediaItem.autoselect = !0;
                    } else {
                      mediaItem.autoselect = /yes/i.test(
                        event.attributes.AUTOSELECT,
                      );
                    }
                    if (event.attributes.LANGUAGE) {
                      mediaItem.language = event.attributes.LANGUAGE;
                    }
                    if (event.attributes.URI) {
                      mediaItem.uri = event.attributes.URI;
                    }
                    if (event.attributes['INSTREAM-ID']) {
                      mediaItem.instreamId = event.attributes['INSTREAM-ID'];
                    }
                    if (event.attributes.CHARACTERISTICS) {
                      mediaItem.characteristics =
                        event.attributes.CHARACTERISTICS;
                    }
                    if (event.attributes.FORCED) {
                      mediaItem.forced = /yes/i.test(event.attributes.FORCED);
                    }
                    mediaGroup[event.attributes.NAME] = mediaItem;
                  },
                  discontinuity() {
                    timeline += 1;
                    currentEntry.discontinuity = !0;
                    this.manifest.discontinuityStarts.push(entries.length);
                  },
                  'program-date-time'() {
                    if (typeof this.manifest.dateTimeString > 'u') {
                      this.manifest.dateTimeString = event.dateTimeString;
                      this.manifest.dateTimeObject = event.dateTimeObject;
                    }
                    currentEntry.dateTimeString = event.dateTimeString;
                    currentEntry.dateTimeObject = event.dateTimeObject;
                    let { lastProgramDateTime: prevProgramDateTime } = this;
                    this.lastProgramDateTime = new Date(
                      event.dateTimeString,
                    ).getTime();
                    if (prevProgramDateTime === null) {
                      this.manifest.segments.reduceRight(
                        (nextProgramDateTime, segment) => (
                          (segment.programDateTime =
                            nextProgramDateTime - segment.duration * 1e3),
                          segment.programDateTime
                        ),
                        this.lastProgramDateTime,
                      );
                    }
                  },
                  targetduration() {
                    if (!isFinite(event.duration) || event.duration < 0) {
                      this.trigger('warn', {
                        message:
                          'ignoring invalid target duration: ' + event.duration,
                      });
                      return;
                    }
                    this.manifest.targetDuration = event.duration;
                    applyHoldBackRules.call(this, this.manifest);
                  },
                  start() {
                    if (
                      !event.attributes
                      || isNaN(event.attributes['TIME-OFFSET'])
                    ) {
                      this.trigger('warn', {
                        message:
                          'ignoring start declaration without appropriate attribute list',
                      });
                      return;
                    }
                    this.manifest.start = {
                      timeOffset: event.attributes['TIME-OFFSET'],
                      precise: event.attributes.PRECISE,
                    };
                  },
                  'cue-out'() {
                    currentEntry.cueOut = event.data;
                  },
                  'cue-out-cont'() {
                    currentEntry.cueOutCont = event.data;
                  },
                  'cue-in'() {
                    currentEntry.cueIn = event.data;
                  },
                  skip() {
                    this.manifest.skip = camelCaseKeys(event.attributes);
                    this.warnOnMissingAttributes_(
                      '#EXT-X-SKIP',
                      event.attributes,
                      ['SKIPPED-SEGMENTS'],
                    );
                  },
                  part() {
                    sawPart = !0;
                    let segmentIndex = this.manifest.segments.length;
                    let part = camelCaseKeys(event.attributes);
                    currentEntry.parts = currentEntry.parts || [];
                    currentEntry.parts.push(part);
                    if (part.byterange) {
                      if (!part.byterange.hasOwnProperty('offset')) {
                        part.byterange.offset = partByterangeOffset;
                      }
                      partByterangeOffset =
                        part.byterange.offset + part.byterange.length;
                    }
                    let partIndex = currentEntry.parts.length - 1;
                    this.warnOnMissingAttributes_(
                      `#EXT-X-PART #${partIndex} for segment #${segmentIndex}`,
                      event.attributes,
                      ['URI', 'DURATION'],
                    );
                    if (this.manifest.renditionReports) {
                      this.manifest.renditionReports.forEach(
                        (report, reportIndex) => {
                          if (!report.hasOwnProperty('lastPart')) {
                            this.trigger('warn', {
                              message: `#EXT-X-RENDITION-REPORT #${reportIndex} lacks required attribute(s): LAST-PART`,
                            });
                          }
                        },
                      );
                    }
                  },
                  'server-control'() {
                    let serverControl = (this.manifest.serverControl =
                      camelCaseKeys(event.attributes));
                    if (!serverControl.hasOwnProperty('canBlockReload')) {
                      serverControl.canBlockReload = !1;
                      this.trigger('info', {
                        message:
                          '#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false',
                      });
                    }
                    applyHoldBackRules.call(this, this.manifest);
                    if (
                      serverControl.canSkipDateranges
                      && !serverControl.hasOwnProperty('canSkipUntil')
                    ) {
                      this.trigger('warn', {
                        message:
                          '#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set',
                      });
                    }
                  },
                  'preload-hint'() {
                    let segmentIndex = this.manifest.segments.length;
                    let hint = camelCaseKeys(event.attributes);
                    let isPart = hint.type && hint.type === 'PART';
                    currentEntry.preloadHints = currentEntry.preloadHints || [];
                    currentEntry.preloadHints.push(hint);
                    if (hint.byterange) {
                      if (!hint.byterange.hasOwnProperty('offset')) {
                        hint.byterange.offset = isPart
                          ? partByterangeOffset
                          : 0;
                        if (isPart) {
                          partByterangeOffset =
                            hint.byterange.offset + hint.byterange.length;
                        }
                      }
                    }
                    let hintIndex = currentEntry.preloadHints.length - 1;
                    if (
                      (this.warnOnMissingAttributes_(
                        `#EXT-X-PRELOAD-HINT #${hintIndex} for segment #${segmentIndex}`,
                        event.attributes,
                        ['TYPE', 'URI'],
                      ),
                      !!hint.type)
                    ) {
                      for (
                        let otherIndex = 0;
                        otherIndex < currentEntry.preloadHints.length - 1;
                        otherIndex++
                      ) {
                        let otherHint = currentEntry.preloadHints[otherIndex];
                        if (otherHint.type && otherHint.type === hint.type) {
                          this.trigger('warn', {
                            message: `#EXT-X-PRELOAD-HINT #${hintIndex} for segment #${segmentIndex} has the same TYPE ${hint.type} as preload hint #${otherIndex}`,
                          });
                        }
                      }
                    }
                  },
                  'rendition-report'() {
                    let report = camelCaseKeys(event.attributes);
                    this.manifest.renditionReports =
                      this.manifest.renditionReports || [];
                    this.manifest.renditionReports.push(report);
                    let reportIndex = this.manifest.renditionReports.length - 1;
                    let requiredAttrs = ['LAST-MSN', 'URI'];
                    if (sawPart) {
                      requiredAttrs.push('LAST-PART');
                    }
                    this.warnOnMissingAttributes_(
                      `#EXT-X-RENDITION-REPORT #${reportIndex}`,
                      event.attributes,
                      requiredAttrs,
                    );
                  },
                  'part-inf'() {
                    this.manifest.partInf = camelCaseKeys(event.attributes);
                    this.warnOnMissingAttributes_(
                      '#EXT-X-PART-INF',
                      event.attributes,
                      ['PART-TARGET'],
                    );
                    if (this.manifest.partInf.partTarget) {
                      this.manifest.partTargetDuration =
                        this.manifest.partInf.partTarget;
                    }
                    applyHoldBackRules.call(this, this.manifest);
                  },
                  daterange() {
                    this.manifest.dateRanges.push(
                      camelCaseKeys(event.attributes),
                    );
                    let dateRangeIndex = this.manifest.dateRanges.length - 1;
                    this.warnOnMissingAttributes_(
                      `#EXT-X-DATERANGE #${dateRangeIndex}`,
                      event.attributes,
                      ['ID', 'START-DATE'],
                    );
                    let dateRange = this.manifest.dateRanges[dateRangeIndex];
                    if (
                      dateRange.endDate
                      && dateRange.startDate
                      && new Date(dateRange.endDate)
                        < new Date(dateRange.startDate)
                    ) {
                      this.trigger('warn', {
                        message:
                          'EXT-X-DATERANGE END-DATE must be equal to or later than the value of the START-DATE',
                      });
                    }
                    if (dateRange.duration && dateRange.duration < 0) {
                      this.trigger('warn', {
                        message:
                          'EXT-X-DATERANGE DURATION must not be negative',
                      });
                    }
                    if (
                      dateRange.plannedDuration
                      && dateRange.plannedDuration < 0
                    ) {
                      this.trigger('warn', {
                        message:
                          'EXT-X-DATERANGE PLANNED-DURATION must not be negative',
                      });
                    }
                    let endOnNext = !!dateRange.endOnNext;
                    if (
                      (endOnNext
                        && !dateRange.class
                        && this.trigger('warn', {
                          message:
                            'EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must have a CLASS attribute',
                        }),
                      endOnNext
                        && (dateRange.duration || dateRange.endDate)
                        && this.trigger('warn', {
                          message:
                            'EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must not contain DURATION or END-DATE attributes',
                        }),
                      dateRange.duration && dateRange.endDate)
                    ) {
                      let endDateMs =
                        dateRange.startDate.getTime()
                        + dateRange.duration * 1e3;
                      this.manifest.dateRanges[dateRangeIndex].endDate =
                        new Date(endDateMs);
                    }
                    if (!dateRangesById[dateRange.id]) {
                      dateRangesById[dateRange.id] = dateRange;
                    } else {
                      for (let attrKey in dateRangesById[dateRange.id]) {
                        if (
                          dateRange[attrKey]
                          && JSON.stringify(
                            dateRangesById[dateRange.id][attrKey],
                          ) !== JSON.stringify(dateRange[attrKey])
                        ) {
                          this.trigger('warn', {
                            message:
                              'EXT-X-DATERANGE tags with the same ID in a playlist must have the same attributes values',
                          });
                          break;
                        }
                      }
                      let existingIndex = this.manifest.dateRanges.findIndex(
                        candidate => candidate.id === dateRange.id,
                      );
                      this.manifest.dateRanges[existingIndex] =
                        objectAssignInto(
                          this.manifest.dateRanges[existingIndex],
                          dateRange,
                        );
                      dateRangesById[dateRange.id] = objectAssignInto(
                        dateRangesById[dateRange.id],
                        dateRange,
                      );
                      this.manifest.dateRanges.pop();
                    }
                  },
                  'independent-segments'() {
                    this.manifest.independentSegments = !0;
                  },
                  'content-steering'() {
                    this.manifest.contentSteering = camelCaseKeys(
                      event.attributes,
                    );
                    this.warnOnMissingAttributes_(
                      '#EXT-X-CONTENT-STEERING',
                      event.attributes,
                      ['SERVER-URI'],
                    );
                  },
                })[event.tagType] || noop
              ).call(self);
            },
            uri() {
              currentEntry.uri = event.uri;
              entries.push(currentEntry);
              if (
                this.manifest.targetDuration
                && !('duration' in currentEntry)
              ) {
                this.trigger('warn', {
                  message: 'defaulting segment duration to the target duration',
                });
                currentEntry.duration = this.manifest.targetDuration;
              }
              if (currentKey) {
                currentEntry.key = currentKey;
              }
              currentEntry.timeline = timeline;
              if (currentMap) {
                currentEntry.map = currentMap;
              }
              partByterangeOffset = 0;
              if (this.lastProgramDateTime !== null) {
                currentEntry.programDateTime = this.lastProgramDateTime;
                this.lastProgramDateTime += currentEntry.duration * 1e3;
              }
              currentEntry = {};
            },
            comment() {},
            custom() {
              if (event.segment) {
                currentEntry.custom = currentEntry.custom || {};
                currentEntry.custom[event.customType] = event.data;
              } else {
                this.manifest.custom = this.manifest.custom || {};
                this.manifest.custom[event.customType] = event.data;
              }
            },
          })[event.type].call(self);
        });
      }
      warnOnMissingAttributes_(context, attributes, required) {
        let missing = [];
        required.forEach(function (attrName) {
          if (!attributes.hasOwnProperty(attrName)) {
            missing.push(attrName);
          }
        });
        if (missing.length) {
          this.trigger('warn', {
            message: `${context} lacks required attribute(s): ${missing.join(', ')}`,
          });
        }
      }
      push(chunk) {
        this.lineStream.push(chunk);
      }
      end() {
        this.lineStream.push(`
`);
        if (
          this.manifest.dateRanges.length
          && this.lastProgramDateTime === null
        ) {
          this.trigger('warn', {
            message:
              'A playlist with EXT-X-DATERANGE tag must contain atleast one EXT-X-PROGRAM-DATE-TIME tag',
          });
        }
        this.lastProgramDateTime = null;
        this.trigger('end');
      }
      addParser(options) {
        this.parseStream.addParser(options);
      }
      addTagMapper(options) {
        this.parseStream.addTagMapper(options);
      }
    };
  });
  function parseHlsSegmentDurations(hlsText) {
    let manifest = null;
    try {
      let parser = new M3u8Parser();
      parser.push(hlsText);
      parser.end();
      manifest = parser.manifest;
    } catch {}
    if (!manifest || !Array.isArray(manifest.segments)) {
      return resultErr('Parsing error');
    }
    if (
      manifest.segments.some(segment => typeof segment.duration != 'number')
    ) {
      return resultErr('Missing duration');
    }
    let totalDuration = manifest.segments.reduce(
      (total, segment) => (
        typeof segment.duration == 'number' && (total += segment.duration),
        total
      ),
      0,
    );
    return resultOk(totalDuration);
  }
  function probeRawHls(hlsText, url) {
    let duration = parseHlsSegmentDurations(hlsText).unwrapOr('unknown');
    let avTracks;
    if (url.includes('.mp3')) {
      avTracks = {
        video: !1,
        audio: {
          codec: makeAudioCodec('MP3'),
          bitrate: ResultNone,
        },
      };
    } else {
      avTracks = {
        audio: !1,
        video: {
          codec: makeVideoCodec('H264'),
          fps: ResultNone,
          dimensions: ResultNone,
          quality: ResultNone,
          bitrate: ResultNone,
        },
      };
    }
    return resultOk({
      builder: 'RawHls',
      protocol: 'hls',
      content_length: ResultNone,
      duration: duration,
      container: containerByName('Mp4'),
      av: avTracks,
    });
  }
  function probeMasterHls(hlsText, baseUrl) {
    let manifest = null;
    try {
      let parser = new M3u8Parser();
      parser.push(hlsText);
      parser.end();
      manifest = parser.manifest;
    } catch {}
    if (!manifest || !manifest.playlists) {
      return resultErr('Parsing error');
    }
    let playlists = manifest.playlists;
    let audioGroups = manifest.mediaGroups.AUDIO;
    return resultOk(
      playlists.map(({ uri: playlistUri, attributes: attributes }) => {
        let resolvedUri = new URL(playlistUri, baseUrl).href;
        let audioUri = ResultNone;
        if (attributes.AUDIO && audioGroups) {
          let audioTrackUri = audioGroups[attributes.AUDIO]?.Default?.uri;
          if (!audioTrackUri) {
            for (let groupKey of Object.keys(
              audioGroups[attributes.AUDIO] ?? {},
            )) {
              if (
                ((audioTrackUri =
                  audioGroups[attributes.AUDIO]?.[groupKey]?.uri),
                audioTrackUri)
              ) {
                break;
              }
            }
          }
          if (audioTrackUri) {
            audioUri = resultSome(new URL(audioTrackUri, baseUrl).href);
          }
        }
        let codecs = {
          audio: !1,
          video: 'unknown',
        };
        if (attributes.CODECS) {
          codecs = parseCodecs(attributes.CODECS, ResultNone, ResultNone);
        }
        let avTracks = matchAudioVideo(
          codecs,
          audioCodec => ({
            codec: makeAudioCodec(audioCodec),
            bitrate: ResultNone,
          }),
          videoCodec => {
            let fps = ResultNone;
            let dimensions = ResultNone;
            let quality = ResultNone;
            let bitrate = ResultNone;
            if (attributes.BANDWIDTH) {
              bitrate = resultSome(attributes.BANDWIDTH);
            }
            if (attributes['FRAME-RATE']) {
              fps = resultSome(attributes['FRAME-RATE']);
            }
            if (attributes.RESOLUTION) {
              dimensions = resultSome(attributes.RESOLUTION);
              quality = resultSome(
                qualityLabelForHeight(attributes.RESOLUTION.height),
              );
            }
            return {
              codec: makeVideoCodec(videoCodec),
              bitrate: bitrate,
              fps: fps,
              dimensions: dimensions,
              quality: quality,
            };
          },
        );
        let sources = audioUri.isSome()
          ? {
              audio: audioUri.unwrap(),
              video: resolvedUri,
            }
          : avTracks.video
            ? {
                audio: !1,
                video: resolvedUri,
              }
            : {
                video: !1,
                audio: resolvedUri,
              };
        let containers = [
          containerByName('Mp4'),
          containerByName('WebM'),
          containerByName('Mkv'),
        ];
        containers = containers.filter(support => {
          if (avTracks.video && avTracks.audio) {
            let audioCodecName = avTracks.audio.codec.name;
            let videoCodecName = avTracks.video.codec.name;
            let videoSupported = !!support.supported_video_codecs.find(
              codec => codec == videoCodecName,
            );
            let audioSupported = !!support.supported_audio_codecs.find(
              codec => codec == audioCodecName,
            );
            return videoSupported && audioSupported;
          } else if (avTracks.video) {
            let videoCodecName = avTracks.video.codec.name;
            return !!support.supported_video_codecs.find(
              codec => codec == videoCodecName,
            );
          } else if (avTracks.audio) {
            let audioCodecName = avTracks.audio.codec.name;
            return !!support.supported_audio_codecs.find(
              codec => codec == audioCodecName,
            );
          }
          return !1;
        });
        let container = containers[0] ?? containerByName('Mkv');
        return [
          {
            builder: 'Hls',
            protocol: 'hls',
            content_length: ResultNone,
            duration: 'unknown',
            av: avTracks,
            container: container,
          },
          sources,
        ];
      }),
    );
  }
  var initHlsParsing = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initMediaTypeSupport();
    initCodecs();
    initQualities();
    initProtocolTypes();
    initContainers();
    initM3u8Parser();
    initIterTools();
  });
  var probesNs = {};
  defineExports(probesNs, {
    FireProbeForHTTPMedia: () => FireProbeForHTTPMedia,
    MPDProbe: () => MPDProbe,
    MasterHLSProbe: () => MasterHLSProbe,
    MaybeCreateProbeFromNetworkRequest: () =>
      MaybeCreateProbeFromNetworkRequest,
  });
  function pickBestAudioTracks(entries) {
    let bestAudio = null;
    let hasVideo = !1;
    for (let [media, trackId] of entries) {
      if (media.av.video === !1) {
        let bitrate = media.av.audio.bitrate.unwrapOr(0);
        if (bestAudio) {
          if (bestAudio.bitrate < bitrate) {
            bestAudio = {
              id: trackId,
              bitrate: bitrate,
              audio: media.av.audio,
            };
          }
        } else {
          bestAudio = {
            id: trackId,
            bitrate: bitrate,
            audio: media.av.audio,
          };
        }
      } else {
        hasVideo = !0;
      }
    }
    if (!hasVideo || !bestAudio) {
      return entries.map(([media, trackId]) => [media, trackId, ResultNone]);
    } else {
      return entries
        .filter(([media, trackId]) => !!media.av.video)
        .map(([media, trackId]) => {
          let audioId = ResultNone;
          if (media.av.audio === !1) {
            media.av = {
              audio: {
                ...bestAudio.audio,
              },
              video: media.av.video,
            };
            audioId = resultSome(bestAudio.id);
          }
          return [media, trackId, audioId];
        });
    }
  }
  function buildHitBase(probe, media) {
    let hit = {
      bulk: probe.bulk,
      originalId: probe.originalId,
      isPrivate: probe.isPrivate,
      tabId: probe.tabId,
      title: probe.title,
      topUrl: probe.topUrl,
      pageTitle: probe.pageTitle,
      pageUrl: probe.pageUrl,
      thumbnailUrl: probe.thumbnailUrl,
      thumbnailUrl2: probe.thumbnailUrl2,
      headers: probe.headers,
      extension: media.av.video
        ? media.container.extension
        : media.container.audio_only_extension,
      core_media: media,
    };
    if (
      media.av.video
      && (media.av.video.bitrate.isSome()
        && (hit.bitrate = media.av.video.bitrate.unwrap()),
      media.av.video.dimensions.isSome())
    ) {
      let dimensions = media.av.video.dimensions.unwrap();
      hit.size = `${dimensions.width}x${dimensions.height}`;
    }
    if (media.duration != 'unknown' && typeof media.duration == 'number') {
      hit.duration = media.duration;
    }
    return hit;
  }
  function FireProbeForHTTPMedia(probe) {
    let variants = new Map();
    let variant = {
      core_media: probe.core_media,
      manifest_url: probe.url,
      to_copy: probe.url,
      sources: {
        video: probe.url,
        audio: !1,
      },
      id: `variant_${crypto.randomUUID()}`,
    };
    variants.set(variant.id, variant);
    let downloadable = {
      is_low_quality: !0,
      timestamp: Date.now(),
      incognito: probe.isPrivate,
      tab_id: probe.tabId,
      page_url: probe.topUrl,
      page_title: probe.pageTitle,
      headers: probe.headers,
      id: `downloadable_${hashToHex(probe.url + probe.tabId)}`,
      title: probe.title,
      favicon_url: new URL(probe.topUrl).origin + '/favicon.ico',
      variants: variants,
      thumbnail_url: probe.thumbnailUrl2,
    };
    publishDownloadable(downloadable);
  }
  function MaybeCreateProbeFromNetworkRequest(request, contentType, headers) {
    if (request.method != 'GET') {
      return [];
    }
    if (!Array.isArray(headers)) {
      headers = [];
    }
    contentType = contentType?.toLowerCase() ?? '';
    let probes = [];
    if (VimeoPlayerProbe.canHandle(request.url, contentType, headers)) {
      probes.push(new VimeoPlayerProbe(request.url, headers));
    }
    if (VimeoConfigProbe.canHandle(request.url, contentType, headers)) {
      probes.push(new VimeoConfigProbe(request.url, headers));
    }
    if (MasterHLSProbe.canHandle(request.url, contentType, headers)) {
      probes.push(new MasterHLSProbe(request.url, headers));
    }
    if (MPDProbe.canHandle(request.url, contentType, headers)) {
      probes.push(new MPDProbe(request.url, headers));
    }
    return probes;
  }
  var probesWeh;
  var probesStore;
  var probeUtil;
  var MPDProbe;
  var MasterHLSProbe;
  var initProbes = defineLazyModule(() => {
    'use strict';

    initTsResultsIndex();
    initMpdParser();
    initMain();
    initProtocolTypes();
    initHttpProbes();
    initHitTypes();
    initSiteHandlers();
    initHlsParsing();
    probesWeh = requireWeh();
    probesStore = (initStore(), toCommonjs(storeNs));
    probeUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    MPDProbe = class {
      constructor(mpdUrl, headers) {
        this.mpd_url = mpdUrl;
        this.headers = headers;
      }
      static canHandle(url, contentType, headers) {
        if (contentType.includes('application/dash+xml')) {
          return !0;
        }
        try {
          if (new URL(url).pathname.endsWith('.mpd')) {
            return !0;
          }
        } catch {}
        return !1;
      }
      async onHitDataAvailable(probe) {
        let response = await probeUtil.request({
          url: this.mpd_url,
          headers: this.headers,
        });
        if (!response.ok) {
          console.warn('Failed to fetch MPD content');
          return;
        }
        let mpdText = await response.text();
        let parsed = parseMpdManifest(mpdText);
        if (parsed.isErr()) {
          console.error('Failed to parse MPD', parsed.unwrapErr());
          return;
        }
        let tracks = pickBestAudioTracks(parsed.unwrap());
        let downloadable = {
          is_low_quality: !1,
          timestamp: Date.now(),
          incognito: probe.isPrivate,
          tab_id: probe.tabId,
          page_url: probe.topUrl,
          page_title: probe.pageTitle,
          headers: probe.headers,
          id: `downloadable_${hashToHex(this.mpd_url + probe.tabId)}`,
          title: probe.title,
          favicon_url: new URL(probe.topUrl).origin + '/favicon.ico',
          variants: new Map(),
          thumbnail_url: probe.thumbnailUrl2,
        };
        for (let [media, videoId, audioId] of tracks) {
          let hit = {
            ...buildHitBase(probe, media),
            id: 'dash:' + probeUtil.hashHex(videoId),
            descrPrefix: probesWeh._('dash_streaming'),
            chunked: 'dash-adp',
            group: 'grp-' + probeUtil.hashHex(this.mpd_url),
            mpd_url: this.mpd_url,
          };
          if (media.av.video !== !1) {
            hit.mpd_video_id = videoId;
            let variant = {
              core_media: media,
              to_copy: this.mpd_url,
              manifest_url: this.mpd_url,
              sources: {
                video: videoId,
                audio: !1,
              },
              id: `variant_${crypto.randomUUID()}`,
            };
            if (
              (media.av.video.bitrate.isSome()
                && (hit.bitrate = media.av.video.bitrate.unwrap()),
              audioId.isSome()
                && ((hit.mpd_audio_id = audioId.unwrap()),
                (variant.sources.audio = hit.mpd_audio_id)),
              media.av.video.dimensions.isSome())
            ) {
              let dimensions = media.av.video.dimensions.unwrap();
              hit.size = `${dimensions.width}x${dimensions.height}`;
            }
            if (
              media.duration != 'unknown'
              && typeof media.duration == 'number'
            ) {
              hit.duration = media.duration;
            }
            downloadable.variants.set(variant.id, variant);
            probesStore.dispatch('hit.new', hit);
          } else {
            hit.mpd_audio_id = videoId;
            if (media.av.audio.bitrate.isSome()) {
              hit.bitrate = media.av.audio.bitrate.unwrap();
            }
            if (
              media.duration != 'unknown'
              && typeof media.duration == 'number'
            ) {
              hit.duration = media.duration;
            }
            probesStore.dispatch('hit.new', hit);
          }
        }
        publishDownloadable(downloadable);
      }
    };
    MasterHLSProbe = class {
      constructor(m3u8Url, headers) {
        this.m3u8_url = m3u8Url;
        this.headers = headers;
      }
      static canHandle(url, contentType, headers) {
        if (url.includes('.m3u8') || contentType.includes('mpegurl')) {
          return !0;
        }
        for (let handler of siteHandlers) {
          if (
            handler.canHandleHLS
            && handler.canHandleHLS(url, contentType, headers)
          ) {
            return !0;
          }
        }
        return !1;
      }
      async onHitDataAvailable(probe) {
        let response = await probeUtil.request({
          url: this.m3u8_url,
          headers: this.headers,
        });
        if (!response.ok) {
          console.warn('Failed to fetch M3U8 content');
          return;
        }
        let m3u8Text = await response.text();
        let masterResult = probeMasterHls(m3u8Text, this.m3u8_url);
        if (masterResult.isErr()) {
          let rawResult = probeRawHls(m3u8Text, this.m3u8_url);
          if (rawResult.isErr()) {
            console.warn("can't parse M3U8");
            return;
          }
          let media = rawResult.unwrap();
          let hit = {
            ...buildHitBase(probe, media),
            id: 'rawhls:' + probeUtil.hashHex(this.m3u8_url),
            descrPrefix: probesWeh._('hls_streaming'),
            chunked: 'hls',
            group: 'grp-' + probeUtil.hashHex(this.m3u8_url),
            mediaManifest: this.m3u8_url,
          };
          probesStore.dispatch('hit.new', hit);
          let variants = new Map();
          let variant = {
            core_media: media,
            to_copy: this.m3u8_url,
            manifest_url: this.m3u8_url,
            sources: matchAudioVideo(
              media.av,
              codec => this.m3u8_url,
              codec => this.m3u8_url,
            ),
            id: `variant_${crypto.randomUUID()}`,
          };
          variants.set(variant.id, variant);
          let downloadable = {
            is_low_quality: !0,
            timestamp: Date.now(),
            incognito: probe.isPrivate,
            tab_id: probe.tabId,
            page_url: probe.topUrl,
            page_title: probe.pageTitle,
            headers: probe.headers,
            id: `downloadable_${hashToHex(this.m3u8_url + probe.tabId)}`,
            title: probe.title,
            favicon_url: new URL(probe.topUrl).origin + '/favicon.ico',
            variants: variants,
            thumbnail_url: probe.thumbnailUrl2,
          };
          downloadable.variants.set(variant.id, variant);
          publishDownloadable(downloadable);
          return;
        }
        let playlists = masterResult.unwrap();
        {
          let firstVideoSource = playlists
            .as_iter()
            .find(([, sources]) => !!sources.video)
            .map(([, sources]) => sources.video);
          if (firstVideoSource.isSome()) {
            let videoUri = firstVideoSource.unwrap();
            let mediaResponse = await probeUtil.request({
              url: videoUri,
              headers: this.headers,
            });
            if (!mediaResponse.ok) {
              console.warn('Failed to fetch M3U8 content');
              return;
            }
            let mediaText = await mediaResponse.text();
            let durationResult = parseHlsSegmentDurations(mediaText);
            if (durationResult.isOk()) {
              for (let [media] of playlists) {
                media.duration = durationResult.unwrap();
              }
            }
          }
        }
        let downloadable = {
          is_low_quality: !1,
          timestamp: Date.now(),
          incognito: probe.isPrivate,
          tab_id: probe.tabId,
          page_url: probe.topUrl,
          page_title: probe.pageTitle,
          headers: probe.headers,
          id: `downloadable_${hashToHex(this.m3u8_url + probe.tabId)}`,
          title: probe.title,
          favicon_url: new URL(probe.topUrl).origin + '/favicon.ico',
          variants: new Map(),
          thumbnail_url: probe.thumbnailUrl2,
        };
        for (let [media, sources] of playlists) {
          let hitBase = buildHitBase(probe, media);
          let hashInput = '';
          if (sources.audio) {
            hashInput += sources.audio;
          }
          if (sources.video) {
            hashInput += sources.video;
          }
          let hit = {
            ...hitBase,
            id: 'hls:' + probeUtil.hashHex(hashInput),
            descrPrefix: probesWeh._('hls_streaming'),
            chunked: 'hls',
            group:
              'grp-' + probeUtil.hashHex(this.m3u8_url + media.container.name),
            masterManifest: this.m3u8_url,
          };
          let primarySource = sources.video || sources.audio;
          let variant = {
            core_media: media,
            to_copy: primarySource,
            manifest_url: this.m3u8_url,
            sources: sources,
            id: `variant_${crypto.randomUUID()}`,
          };
          downloadable.variants.set(variant.id, variant);
          if (!sources.audio && sources.video) {
            hit.mediaManifest = sources.video;
          } else {
            if (!sources.video && sources.audio) {
              hit.mediaManifest = sources.audio;
            } else {
              if (sources.video && sources.audio) {
                hit.audioMediaManifest = sources.audio;
                hit.videoMediaManifest = sources.video;
              }
            }
          }
          probesStore.dispatch('hit.new', hit);
        }
        publishDownloadable(downloadable, probe.bulk);
      }
    };
  });
  var tbvwsNs = {};
  defineExports(tbvwsNs, {
    default: () => tbvwsDefault,
    forbidden: () => tbvwsForbidden,
    matchHit: () => tbvwsMatchHit,
  });
  async function buildTbvwsDownloadable(request) {
    let thumbnail =
      request.thumbnailUrl
      && request.videoDetails.thumbnail?.thumbnails[0]?.url;
    let hitBase = {
      id: 'tbvws:' + request.videoId,
      group: 'tbvws:' + request.videoId,
      isPrivate: request.isPrivate,
      tabId: request.tabId,
      title: request.title,
      from: 'tbvws',
      videoId: request.videoId,
      topUrl: request.topUrl,
      pageTitle: request.pageTitle,
      pageUrl: request.pageUrl,
      thumbnailUrl: thumbnail,
      thumbnailUrl2: thumbnail ?? '/content/images/no-thumbnail.png',
      duration: parseInt(request.videoDetails.lengthSeconds) || void 0,
      headers: [],
      baseJs: request.baseJs,
      bulk: request.bulk,
    };
    if (request.hlsManifestUrl) {
      new TbvwsMasterHlsProbe(request.hlsManifestUrl, {}).onHitDataAvailable(
        hitBase,
      );
      return;
    }
    let adaptiveFormats = request.adaptiveFormats;
    let formats = request.formats;
    let adaptiveParsed = adaptiveFormats
      .as_iter()
      .filter(format => typeof format.url == 'string')
      .map(format => ({
        result: parseYoutubeFormat(format, 'dash'),
        json: format,
      }))
      .toArray();
    let formatsParsed = formats
      .as_iter()
      .filter(format => typeof format.url == 'string')
      .map(format => ({
        result: parseYoutubeFormat(format, 'non-adaptative'),
        json: format,
      }))
      .toArray();
    let allParsed = [...adaptiveParsed, ...formatsParsed];
    allParsed.forEach(({ result: result, json: json }) => {
      if (result.isErr()) {
        console.warn('tbvws JSON parsing error', result.unwrapErr(), json);
      }
    });
    let parsedMedia = allParsed
      .as_iter()
      .filterMap(({ result: result, json: json }) =>
        result.toOption().map(coreMedia => ({
          core_media: coreMedia,
          url: json.url,
        })),
      )
      .toArray();
    let combined = parsedMedia
      .as_iter()
      .filter(({ core_media: media }) => !!media.av.audio && !!media.av.video)
      .map(entry => entry)
      .toArray();
    let videoOnly = parsedMedia
      .as_iter()
      .filter(({ core_media: media }) => !media.av.audio)
      .map(entry => entry)
      .toArray();
    let audioOnly = parsedMedia
      .as_iter()
      .filter(({ core_media: media }) => !media.av.video)
      .map(entry => entry)
      .sort((entryA, entryB) => {
        if (entryA.core_media.av.audio && entryB.core_media.av.audio) {
          let bitrateA = entryA.core_media.av.audio.bitrate.unwrapOr(0);
          let bitrateB = entryB.core_media.av.audio.bitrate.unwrapOr(0);
          return bitrateA - bitrateB;
        } else {
          throw 'unreachable';
        }
      });
    let merged = [];
    for (let videoEntry of videoOnly) {
      let matchingAudio = audioOnly
        .as_iter()
        .filter(
          audioCandidate =>
            audioCandidate.core_media.container.name
            == videoEntry.core_media.container.name,
        )
        .toArray();
      if (matchingAudio.length > 0) {
        let matchedAudio = matchingAudio[0];
        let mergedEntry = {
          ...videoEntry,
          core_media: {
            ...videoEntry.core_media,
            av: {
              video: videoEntry.core_media.av.video,
              audio: matchedAudio.core_media.av.audio,
            },
          },
          videoUrl: videoEntry.url,
          audioUrl: matchedAudio.url,
        };
        delete mergedEntry.url;
        merged.push(mergedEntry);
      }
    }
    let variants = new Map();
    let hits = [...combined, ...merged]
      .as_iter()
      .map(({ core_media: media, ...rest }) => {
        let video = media.av.video;
        let hit = {
          ...hitBase,
          ...rest,
          extension: media.container.extension,
          videoCodec: video.codec.name,
          audioCodec: media.av.audio.codec.name,
          core_media: media,
        };
        if (
          (video.quality.isSome()
            && (hit.quality = video.quality.unwrap() + 'p'),
          video.fps.isSome() && (hit.fps = video.fps.unwrap()),
          video.dimensions.isSome())
        ) {
          let dimensions = video.dimensions.unwrap();
          hit.size = `${dimensions.width}x${dimensions.height}`;
        }
        {
          let sources;
          let manifestUrl;
          let toCopy;
          if (rest.videoUrl && rest.audioUrl) {
            toCopy = manifestUrl = rest.videoUrl;
            sources = {
              video: rest.videoUrl,
              audio: rest.audioUrl,
            };
          } else {
            if (rest.videoUrl) {
              toCopy = manifestUrl = rest.videoUrl;
              sources = {
                video: rest.videoUrl,
                audio: !1,
              };
            } else {
              if (rest.audioUrl) {
                toCopy = manifestUrl = rest.audioUrl;
                sources = {
                  video: !1,
                  audio: rest.audioUrl,
                };
              } else {
                toCopy = manifestUrl = rest.url || 'unreachable';
                sources = {
                  video: rest.url || 'unreachable',
                  audio: !1,
                };
              }
            }
          }
          let variant = {
            core_media: media,
            id: `variant_${crypto.randomUUID()}`,
            manifest_url: manifestUrl,
            sources: sources,
            to_copy: toCopy,
          };
          if (hitBase.baseJs) {
            variant.base_js = hitBase.baseJs;
          }
          variants.set(variant.id, variant);
        }
        return hit;
      })
      .toArray();
    {
      let downloadable = {
        is_low_quality: !1,
        timestamp: Date.now(),
        incognito: hitBase.isPrivate,
        tab_id: hitBase.tabId,
        page_url: hitBase.topUrl,
        page_title: hitBase.pageTitle,
        headers: hitBase.headers,
        id: `downloadable_${hashToHex(hitBase.topUrl + hitBase.tabId)}`,
        title: hitBase.title,
        favicon_url: new URL(hitBase.topUrl).origin + '/favicon.ico',
        variants: variants,
        thumbnail_url: hitBase.thumbnailUrl2,
      };
      publishDownloadable(downloadable);
    }
    hits.forEach(hit => {
      tbvwsStore.dispatch('hit.new', hit);
    });
  }
  function coappSupportsChallenge() {
    return (
      tbvwsCoapp.isProbablyAvailable() && tbvwsCoapp.isAtLeastVersion('2.0.0')
    );
  }
  function tbvwsMatchHit(hit) {
    return ![
      hit.url,
      hit.audioUrl,
      hit.videoUrl,
      hit.pageUrl,
      hit.topUrl,
    ].every(url =>
      url ? !youtubeUrlRegex.test(url) && !googlevideoRegex.test(url) : !0,
    );
  }
  async function tbvwsForbidden() {
    let text1 = tbvwsWeh._('chrome_noyt_text');
    let hash1 = tbvwsUtil.hash(text1);
    let text3 = tbvwsWeh._('chrome_noyt_text3');
    let hash3 = tbvwsUtil.hash(text3);
    let chosenText = text3;
    if (hash3 == -1960581238 && hash1 != -1126813505) {
      chosenText = text1;
    }
    try {
      switch (
        (
          await tbvwsDialog.alert({
            title: tbvwsWeh._('chrome_warning_yt'),
            text: [chosenText, tbvwsWeh._('chrome_noyt_text2')],
            height: 400,
            buttons: [
              {
                text: tbvwsWeh._('chrome_install_firefox'),
                className: 'btn-outline-secondary',
                close: !0,
                trigger: {
                  what: 'installFirefox',
                },
              },
              {
                text: tbvwsWeh._('chrome_install_fx_vdh'),
                className: 'btn-outline-primary',
                close: !0,
                trigger: {
                  what: 'vdhForFirefox',
                },
              },
            ],
          })
        ).what
      ) {
        case 'installFirefox':
          return tbvwsTabNav.gotoOrOpenTab('https://getfirefox.com/');
        case 'vdhForFirefox':
          return tbvwsTabNav.gotoOrOpenTab(
            'https://addons.mozilla.org/firefox/addon/video-downloadhelper/',
          );
      }
    } catch (err) {
      console.error('tbvws error', err);
    }
  }
  var tbvwsWeh;
  var tbvwsBrowser;
  var tbvwsStore;
  var tbvwsSmartname;
  var tbvwsUtil;
  var tbvwsTabNav;
  var tbvwsDialog;
  var tbvwsCoapp;
  var TbvwsMasterHlsProbe;
  var YOUTUBE_HOST_SUBSTR;
  var youtubePageRegex;
  var googlevideoRegex;
  var youtubeUrlRegex;
  var tbvwsDefault;
  var initTbvws = defineLazyModule(() => {
    'use strict';

    initFormatParsing();
    initMain();
    initHitTypes();
    tbvwsWeh = requireWeh();
    tbvwsBrowser = tbvwsWeh.browser;
    tbvwsStore = (initStore(), toCommonjs(storeNs));
    tbvwsSmartname = (initSmartname(), toCommonjs(smartnameNs));
    tbvwsUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    tbvwsTabNav = (initTabTracker(), toCommonjs(tabTrackerNs));
    tbvwsDialog = (initDialogs(), toCommonjs(dialogNs));
    tbvwsCoapp = (initCoapp(), toCommonjs(coappNs));
    ({ MasterHLSProbe: TbvwsMasterHlsProbe } =
      (initProbes(), toCommonjs(probesNs)));
    YOUTUBE_HOST_SUBSTR = 'youtube';
    youtubePageRegex = new RegExp(
      '^https?://([^/]*\\.)?youtube(?:\\-nocookie)?(\\.co)?.([^./]+)/',
    );
    googlevideoRegex = new RegExp('^https?://([^/]*.)?googlevideo\\.');
    youtubeUrlRegex = new RegExp(
      '^https?://([^/]*\\.)?youtube(\\.co)?.([^./]+)/.*',
    );
    tbvwsWeh.rpc.listen({
      tbvwsDetectedVideo: async detectedVideo => {
        try {
          await buildTbvwsDownloadable(detectedVideo);
        } catch (err) {
          console.error('error: detectedVideo', err);
        }
      },
    });
    tbvwsBrowser.webNavigation.onCompleted.addListener(
      async function (nav) {
        let prefs = await tbvwsWeh.prefs;
        let scriptTarget = {
          tabId: nav.tabId,
          frameIds: [nav.frameId],
        };
        if (youtubePageRegex.test(nav.url)) {
          try {
            let tab = await tbvwsBrowser.tabs.get(nav.tabId);
            tbvwsUtil.executeScriptWithGlobal(
              scriptTarget,
              {
                _$vdhData: {
                  ...scriptTarget,
                  isPrivate: !1,
                },
                _$vdhSmartNameSpecs: await tbvwsSmartname.getSpecs(nav.url),
                _$vdhTopUrl: tab.url,
                _$vdhExtractMethod: prefs.tbvwsExtractionMethod,
                _$vdhSupportChallenge: coappSupportsChallenge(),
              },
              '/injected/tbvws.js',
            );
          } catch (err) {
            console.error('Cannot find tab', err);
          }
        }
        if (prefs.bulkEnabled && youtubeUrlRegex.test(nav.url)) {
          try {
            let tab = await tbvwsBrowser.tabs.get(nav.tabId);
            tbvwsUtil.executeScriptWithGlobal(
              scriptTarget,
              {
                _$vdhTopUrl: tab.url,
              },
              '/injected/tbvws-bulk.js',
            );
          } catch (err) {
            console.error('error: could not inject bulk script', err);
          }
        }
      },
      {
        url: [
          {
            hostContains: YOUTUBE_HOST_SUBSTR,
          },
        ],
      },
    );
    tbvwsDefault = {
      matchHit: tbvwsMatchHit,
      forbidden: tbvwsForbidden,
    };
  });
  var youtubeBulkNs = {};
  defineExports(youtubeBulkNs, {
    BulkDownload: () => BulkDownload,
  });
  async function BulkDownload(request, downloadContext) {
    let openedTabs = new Set();
    for (let videoId of request.bulk_ids) {
      let watchUrl = `https://www.${BULK_YOUTUBE_HOST}.com/watch?v=${videoId}&vdh-bulk=1`;
      let tab = await bulkBrowser.tabs.create({
        url: watchUrl,
        active: !1,
      });
      await bulkBrowser.tabs.update(tab.id, {
        muted: !0,
      });
      openedTabs.add(tab.id);
    }
    for (let attempt = 0; attempt < 60; attempt++) {
      let hits = await bulkStore.getSerializedHits();
      for (let hitEntry of hits) {
        let hit = hitEntry[0];
        for (let tabId of openedTabs) {
          let tabMatches = hit.tabId == tabId;
          let hasMaster = !!hit.masterManifest;
          let isMp4 = hit.extension == 'mp4';
          if (tabMatches && hasMaster && isMp4) {
            openedTabs.delete(hit.tabId);
            bulkActions.execute(downloadContext, hit.id);
            bulkBrowser.tabs.remove(hit.tabId);
            break;
          }
        }
      }
      if (openedTabs.size == 0) {
        console.log('All hits were found and downloaded');
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1e3));
    }
  }
  var bulkWeh;
  var bulkBrowser;
  var bulkStore;
  var bulkActions;
  var BULK_YOUTUBE_HOST;
  var initYoutubeBulk = defineLazyModule(() => {
    'use strict';

    initContainers();
    initMediaCommon();
    initTsResultsIndex();
    bulkWeh = requireWeh();
    bulkBrowser = bulkWeh.browser;
    bulkStore = (initStore(), toCommonjs(storeNs));
    bulkActions = (initActions(), toCommonjs(actionsNs));
    BULK_YOUTUBE_HOST = 'youtube';
    bulkWeh.rpc.listen({
      tbvwsSelectedIds: selection => {
        let staleIds = [];
        let { flat: flatHits } = bulkStore.getHits();
        for (let hit of flatHits.values()) {
          if (
            hit.from == 'tbvws-bulk'
            && hit.topUrl == selection.topUrl
            && !hit.running
          ) {
            staleIds.push(hit.id);
          }
        }
        if (
          (staleIds.length > 0 && bulkStore.dispatch('hit.delete', staleIds),
          selection.ids.length > 0)
        ) {
          let bulkId = 'tbvws-bulk:' + Math.floor(Math.random() * 1e9);
          let bulkHit = {
            id: bulkId,
            group: bulkId,
            title: bulkWeh._('selected_media'),
            descrPrefix: bulkWeh._('bulk_n_videos', '' + selection.ids.length),
            from: 'tbvws-bulk',
            bulk_ids: selection.ids,
            pageUrl: selection.pageUrl,
            topUrl: selection.topUrl,
            thumbnailUrl: bulkBrowser.runtime.getURL(
              '/content/images/tbvws.png',
            ),
            core_media: {
              content_length: ResultNone,
              builder: 'YoutubeBulk',
              protocol: 'unknown',
              duration: 'unknown',
              container: containerByName('Mp4'),
              av: unknownVideoTrack(),
            },
          };
          bulkStore.dispatch('hit.new', bulkHit);
        }
      },
    });
  });
  var requireFunding = defineCommonjsModule((fundingExports, fundingModule) => {
    'use strict';

    var weh = requireWeh();
    var licenseModule = (initLicense(), toCommonjs(licenseNs));
    async function maybePromptFunding(downloadCount) {
      let prefs = await weh.prefs;
      if (!(Math.round(Date.now() / 1e3) < prefs.donateNotAgainExpire)) {
        licenseModule.checkLicense().then(license => {
          if (!(license && ((license.status = 'accepted'), true))) {
            weh.ui.open('funding', {
              type: prefs.alertDialogType,
              url: 'content/funding.html',
              height: 550,
            });
          }
        });
      }
    }
    fundingModule.exports.newDownload = async function () {
      let prefs = await weh.prefs;
      let count = prefs.downloadCount;
      count++;
      prefs.downloadCount = count;
      if (count > 0 && count % 100 == 0) {
        maybePromptFunding(count);
      }
    };
    weh.rpc.listen({
      fundingLater: async () => {
        let prefs = await weh.prefs;
        prefs.donateNotAgainExpire =
          Math.round(Date.now() / 1e3) + 60 * 60 * 24 * 30;
      },
    });
  });
  async function performDownload(
    hit,
    autoSave,
    conversionTarget,
    audioOnly,
    activeDownloads,
    downloadQueue,
  ) {
    let prefs = await downloadWeh.prefs;
    let needsConversion = !!conversionTarget;
    let startTime = Date.now();
    let forbidden = !1;
    if (
      ((forbidden = downloadTbvws.matchHit(hit)),
      downloadBuildOptions.noyt && forbidden)
    ) {
      downloadTbvws.forbidden();
      return;
    }
    downloadHitsStore.update(hit.id, {
      operation: 'queued',
    });
    let coappAvailable;
    let coappVersion;
    {
      let { status: status, info: info } = await downloadCoapp.check();
      coappAvailable = status;
      if (coappAvailable) {
        coappVersion = info.version;
      }
    }
    let strategy;
    {
      if (hit.gallery_urls) {
        strategy = 'gallery';
      } else if (hit.core_media.builder == 'YoutubeBulk') {
        strategy = 'youtube_bulk';
      } else if (hit.core_media.builder == 'Hls') {
        strategy = 'hls';
      } else if (hit.core_media.builder == 'RawHls') {
        strategy = 'hls';
      } else if (hit.core_media.builder == 'MPD') {
        strategy = 'mpd';
      } else if (hit.core_media.builder == 'HTTPMedia') {
        let coappMode = prefs.coappDownloads;
        if (coappAvailable && coappMode == 'ask') {
          let choice = await askDownloadMethod();
          coappMode = choice.mode;
          if (choice.notAgain) {
            prefs.coappDownloads = coappMode;
          }
        }
        if (coappMode == 'browser' || (!coappAvailable && !needsConversion)) {
          strategy = 'file_inbrowser';
        } else {
          strategy = 'file_coapp';
        }
      } else {
        if (hit.core_media.builder == 'YoutubeFormat') {
          strategy = 'youtube_format';
        }
      }
      if (!strategy) {
        throw new Error(
          'No download strategy for builder: ' + hit.core_media.builder,
        );
      }
    }
    if (
      audioOnly
      && strategy != 'hls'
      && strategy != 'mpd'
      && strategy != 'file_coapp'
      && strategy != 'youtube_bulk'
    ) {
      downloadDialog.alert({
        title: downloadWeh._('dialog_audio_impossible_title'),
        text: downloadWeh._('dialog_audio_impossible'),
      });
      return;
    }
    if (strategy != 'file_inbrowser' && strategy != 'gallery') {
      if (!coappAvailable) {
        downloadDialog.alert({
          title: downloadWeh._('coapp_required'),
          text: downloadWeh._('coapp_required_text'),
          buttons: [
            {
              text: downloadWeh._('coapp_install'),
              className: 'btn-success',
              rpcMethod: 'installCoApp',
            },
          ],
        });
        return;
      }
      let minVersion = MIN_COAPP_VERSION;
      if (
        (strategy == 'mpd' && (minVersion = MIN_COAPP_VERSION_MPD),
        !downloadUtil.isMinimumVersion(coappVersion, minVersion))
      ) {
        try {
          await downloadCoapp.call('quit');
        } catch {}
        await new Promise(resolve => setTimeout(resolve, 2e3));
        let { status: status, info: info } = await downloadCoapp.check();
        if (
          !status
          || !downloadUtil.isMinimumVersion(info.version, minVersion)
        ) {
          downloadCoapp.call('quit');
          downloadDialog.alert({
            title: downloadWeh._('coapp_outofdate'),
            text: downloadWeh._('coapp_outofdate_text', [
              info.version,
              minVersion,
            ]),
            buttons: [
              {
                text: downloadWeh._('coapp_update'),
                className: 'btn-success',
                rpcMethod: 'installCoApp',
              },
            ],
          });
          return;
        }
        coappVersion = info.version;
      }
    }
    let needsQr = !1;
    {
      let licensed = !1;
      {
        let { status: status } = await downloadLicense.checkLicense();
        licensed = ((status = 'accepted'), true) || status == 'unneeded';
      }
      if (!licensed) {
        let isGoogle = downloadBuildOptions.target == 'google';
        let isMozilla = downloadBuildOptions.target == 'mozilla';
        let isMicrosoft = downloadBuildOptions.target == 'microsoft';
        let limitMinutes = 120;
        let limitMs = limitMinutes * 60 * 1e3;
        let lastConvertTime = await getSetting(settingLastAdvancedDownload);
        let elapsed = startTime - lastConvertTime;
        let convertUrl = globalThis.extConfig.getUrlValue('convertUrl');
        if (
          audioOnly
          && (strategy == 'mpd' || strategy == 'hls' || forbidden)
        ) {
          downloadDialog.alert({
            title: downloadWeh._('chrome_premium_required'),
            text: downloadWeh._('converter_reg_audio'),
            buttons: [
              {
                text: downloadWeh._('continue'),
                className: 'btn-success',
                rpcMethod: 'goto',
                rpcArgs: [convertUrl],
              },
            ],
          });
          return;
        }
        if (needsConversion) {
          downloadDialog.alert({
            title: downloadWeh._('chrome_premium_required'),
            text: downloadWeh._('converter_needs_reg'),
            buttons: [
              {
                text: downloadWeh._('continue'),
                className: 'btn-success',
                rpcMethod: 'goto',
                rpcArgs: [convertUrl],
              },
            ],
          });
          return;
        }
        if (
          (isGoogle || isMicrosoft || needsConversion)
          && (strategy == 'mpd' || strategy == 'hls' || forbidden)
          && elapsed < limitMs
        ) {
          downloadDialog.alert({
            title: downloadWeh._('chrome_premium_required'),
            text: downloadWeh._('chrome_premium_hls', [limitMinutes]),
            buttons: [
              {
                text: downloadWeh._('continue'),
                className: 'btn-success',
                rpcMethod: 'goto',
                rpcArgs: [convertUrl],
              },
            ],
          });
          return;
        }
        if (isMozilla && forbidden && !audioOnly) {
          needsQr = !0;
        }
      }
    }
    let filename;
    let extension;
    {
      extension = hit.core_media.container.extension;
      if (audioOnly || !hit.core_media.av.video) {
        extension = hit.core_media.container.audio_only_extension;
      }
      let rawTitle = hit.title ?? 'video';
      filename = await downloadSmartname.getFilenameFromTitle(
        rawTitle,
        extension,
      );
    }
    if (strategy == 'gallery') {
      for (let galleryUrl of hit.gallery_urls) {
        let downloadOptions = {
          url: new URL(galleryUrl, hit.topUrl).href,
        };
        downloadBrowser.downloads.download(downloadOptions);
      }
      return;
    }
    if (strategy == 'youtube_bulk') {
      downloadBulk.BulkDownload(
        hit,
        audioOnly ? 'quickdownloadaudio' : 'quickdownload',
      );
      return;
    }
    if (strategy == 'file_inbrowser') {
      downloadHitsStore.updateRunning(hit.id, 1);
      downloadHitsStore.update(hit.id, {
        operation: 'downloading',
        opStartDate: Date.now(),
      });
      downloadHitsStore.updateProgress(hit.id, 0);
      let downloadOptions = {
        url: hit.url,
        saveAs: !autoSave,
        filename: filename,
      };
      if (downloadBuildOptions.target == 'mozilla') {
        downloadOptions.incognito = hit.isPrivate;
      }
      let downloadId =
        await downloadBrowser.downloads.download(downloadOptions);
      activeDownloads.set(hit.id, {
        inbrowser: downloadId,
      });
      let lastBytes = 0;
      for (;;) {
        let items = await downloadBrowser.downloads.search({
          id: downloadId,
        });
        if (items.length > 0) {
          let item = items[0];
          let bytesDelta = item.bytesReceived - lastBytes;
          lastBytes = item.bytesReceived;
          let fraction = item.bytesReceived / item.totalBytes;
          if (
            (downloadHitsStore.update(hit.id, {
              raw_bitrate: bytesDelta,
            }),
            downloadHitsStore.updateProgress(hit.id, 100 * fraction),
            item.error)
          ) {
            reportDownloadError('No download item found');
            break;
          }
          if (item.state == 'complete') {
            break;
          }
        } else {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 1e3));
      }
      return 'inbrowser';
    }
    let filePath;
    let directory = prefs.lastDownloadDirectory;
    {
      if (((directory = await resolveDownloadDir(directory)), autoSave)) {
        filePath = (
          await downloadCoapp.call('makeUniqueFileName', directory, filename)
        ).filePath;
      } else {
        let result = await downloadDialog.saveAs(filename, directory);
        if (result) {
          filePath = result.filePath;
          if (!filePath.endsWith(`.${extension}`)) {
            filePath += `.${extension}`;
          }
          directory = result.directory;
        } else {
          return;
        }
      }
      directory = await resolveDownloadDir(directory);
      if (prefs.rememberLastDir) {
        prefs.lastDownloadDirectory = directory;
      }
    }
    if (
      (downloadHitsStore.updateRunning(hit.id, 1),
      activeDownloads.size >= prefs.downloadControlledMax)
    ) {
      for (downloadQueue.push(hit.id); ; ) {
        if (
          (await new Promise(resolve => setTimeout(resolve, 2e3)),
          activeDownloads.size < prefs.downloadControlledMax
            && downloadQueue[0] == hit.id)
        ) {
          downloadQueue.shift();
          break;
        }
      }
    }
    activeDownloads.set(hit.id, {});
    downloadHitsStore.update(hit.id, {
      operation: 'downloading',
      opStartDate: Date.now(),
    });
    downloadHitsStore.updateProgress(hit.id, 1);
    let duration = 0;
    let onProgress = (received, stats) => {
      let bitrate = 1024 * (parseFloat(stats.bitrate) ?? 0);
      if (
        (bitrate > 0
          && downloadHitsStore.update(hit.id, {
            raw_bitrate: bitrate,
          }),
        received < 0 && (received = 0),
        duration > 0)
      ) {
        let percent = Math.floor((100 * received) / duration);
        if (percent > 100) {
          percent = 1 / 0;
        }
        downloadHitsStore.updateProgress(hit.id, percent);
      }
    };
    let onStart = pid =>
      activeDownloads.set(hit.id, {
        ffmpeg_pid: pid,
      });
    if (strategy == 'hls') {
      let hitData = hit;
      let manifestUrl =
        hitData.mediaManifest
        ?? hitData.videoMediaManifest
        ?? hitData.audioMediaManifest;
      let mediaInfo = await downloadConverter.info(
        manifestUrl,
        !0,
        hit.headers,
      );
      duration = parseFloat(mediaInfo.format?.duration);
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needsQr,
        headers: hit.headers,
        on_progress: onProgress,
        on_start: onStart,
      };
      if (audioOnly || !hit.core_media.av.video) {
        await downloadConverter.sideDownload(
          null,
          hitData.audioMediaManifest ?? hitData.mediaManifest,
          sideOptions,
        );
      } else {
        if (hitData.mediaManifest) {
          await downloadConverter.sideDownload(
            hitData.mediaManifest,
            null,
            sideOptions,
          );
        } else {
          await downloadConverter.sideDownload(
            hitData.videoMediaManifest,
            hitData.audioMediaManifest,
            sideOptions,
          );
        }
      }
    }
    if (strategy == 'mpd') {
      let hitData = hit;
      let mediaInfo = await downloadConverter.info(
        hitData.mpd_url,
        !0,
        hit.headers,
      );
      duration = parseFloat(mediaInfo.format?.duration);
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needsQr,
        headers: hitData.headers,
        on_progress: onProgress,
        on_start: onStart,
      };
      if (audioOnly) {
        await downloadConverter.sideDownloadMPD(
          hitData.mpd_url,
          null,
          hitData.mpd_audio_id,
          sideOptions,
        );
      } else {
        await downloadConverter.sideDownloadMPD(
          hitData.mpd_url,
          hitData.mpd_video_id,
          hitData.mpd_audio_id,
          sideOptions,
        );
      }
    }
    if (strategy == 'file_coapp') {
      if (duration == 0) {
        let mediaInfo = await downloadConverter.info(hit.url, !0, hit.headers);
        duration = parseFloat(mediaInfo.format?.duration);
      }
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needsQr,
        headers: hit.headers,
        on_progress: onProgress,
        on_start: onStart,
      };
      if (audioOnly) {
        await downloadConverter.sideDownload(null, hit.url, sideOptions);
      } else {
        await downloadConverter.sideDownload(hit.url, null, sideOptions);
      }
    }
    if (strategy == 'youtube_format') {
      if (!hit.baseJs) {
        throw new Error('baseJs expected');
      }
      let audioUrlObj;
      let videoUrlObj;
      if (hit.videoUrl || hit.url) {
        let videoUrlStr = hit.videoUrl ?? hit.url;
        videoUrlObj = new URL(videoUrlStr);
      } else {
        console.warn('unconsistent hit');
        return;
      }
      if (hit.audioUrl) {
        audioUrlObj = new URL(hit.audioUrl);
      }
      let nParam = videoUrlObj.searchParams.get('n');
      let transformedN;
      if (nParam) {
        transformedN = await downloadCoapp.call(
          'vm.run',
          `((a) => {${hit.baseJs}})('${nParam}')`,
        );
        videoUrlObj.searchParams.set('n', transformedN);
      }
      if (audioUrlObj) {
        audioUrlObj.searchParams.set('n', transformedN);
      }
      let mediaInfo = await downloadConverter.info(
        videoUrlObj.href,
        !0,
        hit.headers,
      );
      duration = parseFloat(mediaInfo.format?.duration);
      let sideOptions = {
        filePath: filePath,
        qr_code_needed: needsQr,
        headers: hit.headers,
        on_progress: onProgress,
        on_start: onStart,
      };
      if (audioUrlObj) {
        await downloadConverter.sideDownload(
          videoUrlObj.href,
          audioUrlObj.href,
          sideOptions,
        );
      } else {
        await downloadConverter.sideDownload(
          videoUrlObj.href,
          null,
          sideOptions,
        );
      }
    }
    if (needsConversion) {
      let onConvProgress = (received, stats) => {
        if (received < 0) {
          received = 0;
        }
        downloadHitsStore.update(hit.id, {
          raw_bitrate: 1024 * (parseFloat(stats.bitrate) ?? 0),
        });
        if (duration > 0) {
          downloadHitsStore.updateProgress(
            hit.id,
            Math.floor((100 * received) / duration),
          );
        }
      };
      let onConvStart = pid =>
        activeDownloads.set(hit.id, {
          ffmpeg_pid: pid,
        });
      downloadHitsStore.update(hit.id, {
        operation: 'converting',
        opStartDate: Date.now(),
      });
      let convertedPath = await downloadConverter.convert2(
        filePath,
        null,
        conversionTarget,
        onConvProgress,
        onConvStart,
      );
      if (!prefs.converterKeepTmpFiles) {
        try {
          await downloadCoapp.call('fs.unlink', filePath);
          filePath = convertedPath;
        } catch {}
      }
    }
    if (needsQr && !prefs.qrMessageNotAgain && !hit.bulk) {
      downloadWeh.ui.open('explainqr#' + encodeURIComponent(hit.id), {
        type: prefs.alertDialogType,
        url: 'content/explain-qr.html',
      });
    }
    downloadHitsStore.update(hit.id, {
      localFilePath: filePath,
    });
    downloadHitsStore.update(hit.id, {
      localDirectory: directory,
    });
    await setSetting(settingLastAdvancedDownload, startTime);
    return filePath;
  }
  async function downloadAndNotify(
    hit,
    autoSave,
    conversionTarget,
    audioOnly,
    activeDownloads,
    downloadQueue,
  ) {
    let prefs = await downloadWeh.prefs;
    let result;
    try {
      if (
        ((result = await performDownload(
          hit,
          autoSave,
          conversionTarget,
          audioOnly,
          activeDownloads,
          downloadQueue,
        )),
        result && (await downloadFunding.newDownload(), prefs.notifyReady))
      ) {
        let message = downloadWeh._(
          'file_ready',
          result == 'inbrowser' ? hit.title : result,
        );
        if (!(hit.isPrivate && prefs.noPrivateNotification)) {
          downloadBrowser.notifications.create(hit.id, {
            type: 'basic',
            title: downloadWeh._('vdh_notification'),
            iconUrl: downloadBrowser.runtime.getURL(
              `/content2/icons/${downloadBuildOptions.channel}-color.png`,
            ),
            message: message,
          });
        }
      }
    } catch (error) {
      console.error(error);
      reportDownloadError(error);
    } finally {
      activeDownloads.delete(hit.id);
      downloadHitsStore.updateRunning(hit.id, -1);
      downloadHitsStore.updateProgress(hit.id, null);
      downloadHitsStore.update(hit.id, {
        operation: null,
      });
    }
    return result;
  }
  var reportDownloadError;
  var downloadWeh;
  var downloadTbvws;
  var downloadBulk;
  var downloadBuildOptions;
  var downloadHitsStore;
  var downloadCoapp;
  var downloadDialog;
  var downloadUtil;
  var downloadLicense;
  var downloadBrowser;
  var downloadSmartname;
  var downloadConverter;
  var downloadFunding;
  var MIN_COAPP_VERSION;
  var MIN_COAPP_VERSION_MPD;
  var resolveDownloadDir;
  var askDownloadMethod;
  var initDownloader = defineLazyModule(() => {
    'use strict';

    initSettings();
    ({ error: reportDownloadError } =
      (initAppLog(), toCommonjs(errorReportingNs)));
    downloadWeh = requireWeh();
    downloadTbvws = (initTbvws(), toCommonjs(tbvwsNs));
    downloadBulk = (initYoutubeBulk(), toCommonjs(youtubeBulkNs));
    downloadBuildOptions = requireBuildInfo().buildOptions;
    downloadHitsStore = (initHitsStore(), toCommonjs(hitsStoreNs));
    downloadCoapp = (initCoapp(), toCommonjs(coappNs));
    downloadDialog = (initDialogs(), toCommonjs(dialogNs));
    downloadUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    downloadLicense = (initLicense(), toCommonjs(licenseNs));
    downloadBrowser = downloadWeh.browser;
    downloadSmartname = (initSmartname(), toCommonjs(smartnameNs));
    downloadConverter = (initConverter(), toCommonjs(coappSideNs));
    downloadFunding = requireFunding();
    MIN_COAPP_VERSION = '2.0.9';
    MIN_COAPP_VERSION_MPD = '2.0.13';
    resolveDownloadDir = async dir => {
      try {
        dir = await downloadCoapp.call('path.homeJoin', dir);
        await downloadCoapp.call('fs.mkdirp', dir);
      } catch (err) {
        console.error('mkdir error', err, dir);
      }
      return dir;
    };
    askDownloadMethod = () =>
      downloadDialog.alert({
        title: downloadWeh._('download_method'),
        text: [
          downloadWeh._('download_modes1'),
          downloadWeh._('download_modes2'),
        ],
        height: 350,
        buttons: [
          {
            text: downloadWeh._('download_with_browser'),
            className: 'btn-primary',
            close: !0,
            trigger: {
              mode: 'browser',
            },
          },
          {
            text: downloadWeh._('download_with_coapp'),
            className: 'btn-success',
            close: !0,
            trigger: {
              mode: 'coapp',
            },
          },
        ],
        notAgain: downloadWeh._('download_method_not_again'),
      });
  });
  var actionsNs = {};
  defineExports(actionsNs, {
    availableActions: () => availableActions,
    describeAll: () => describeAll,
    execute: () => execute,
    execute_default: () => executeDefault,
  });
  async function availableActions(hitId) {
    let hit = actionsStore.getHit(hitId);
    if (!hit) {
      return [];
    }
    let baseActions = ['details', 'copyurl'];
    let isDownloading = hit.operation == 'downloading';
    let isConverting = hit.operation == 'converting';
    let hasLocalFile = !!hit.localFilePath;
    let hasAudio = !!hit.core_media?.av.audio;
    let isBulk = hit.core_media?.builder == 'YoutubeBulk';
    let actions = [];
    let defaultAction = '';
    if (actionsActiveDownloads.has(hit.id)) {
      defaultAction = 'abort';
      actions = ['abort', ...baseActions];
    } else {
      if (hasLocalFile) {
        defaultAction = (await actionsWeh.prefs)['default-action-1'];
        if (actionsCoapp.isDegradedVersion()) {
          actions = ['deletehit', ...baseActions];
        } else {
          actions = [
            'openlocalfile',
            'openlocalcontainer',
            'deletehit',
            ...baseActions,
          ];
        }
      } else {
        if (!isConverting && !isDownloading) {
          defaultAction = (await actionsWeh.prefs)['default-action-0'];
          actions = ['quickdownload', 'download'];
          actions = [...actions, 'quickdownloadaudio', 'downloadaudio'];
          actions = [
            ...actions,
            'downloadconvert',
            'blacklist',
            'deletehit',
            ...baseActions,
          ];
        } else {
          defaultAction = 'copyurl';
          actions = baseActions;
        }
      }
    }
    return actions.sort((actionA, actionB) =>
      actionA == actionB
        ? 0
        : actionA == defaultAction
          ? -1
          : actionB == defaultAction
            ? 1
            : 0,
    );
  }
  function openDetails(hit) {
    actionsWeh.ui.open('details#' + encodeURIComponent(hit.id), {
      type: 'tab',
      url: 'content/details.html',
    });
  }
  async function copyHitUrl(hit) {
    let url;
    if (
      hit.core_media?.builder == 'Hls'
      || hit.core_media?.builder == 'RawHls'
    ) {
      let hitData = hit;
      url =
        hitData.videoMediaManifest
        ?? hitData.audioMediaManifest
        ?? hitData.mediaManifest
        ?? hitData.masterManifest;
    } else {
      if (hit.core_media?.builder == 'MPD') {
        url = hit.mpd_url;
      } else {
        if (hit.core_media?.builder == 'HTTPMedia') {
          url = hit.url;
        }
      }
    }
    if (url) {
      try {
        actionsRpc.call('main', 'copyToClipboard', url);
      } catch {}
      try {
        await navigator.clipboard.writeText(url);
      } catch {}
      try {
        await actionsBrowser.scripting.executeScript({
          target: {
            tabId: hit.tabId,
          },
          func: text => navigator.clipboard.writeText(text),
          args: [url],
        });
      } catch {}
    }
  }
  async function deleteHit(hit) {
    actionsStore.dispatch('hit.delete', hit.id);
  }
  async function openLocalFile(hit) {
    if ('localFilePath' in hit) {
      await actionsConverter.open(hit.localFilePath);
    }
  }
  async function openLocalContainer(hit) {
    if ('localDirectory' in hit) {
      await actionsConverter.open(hit.localDirectory);
    }
  }
  async function abortDownload(hit) {
    let entry = actionsActiveDownloads.get(hit.id);
    if (!entry) {
      throw new Error('Attempt to abord non-downloading hit');
    }
    if (entry.inbrowser) {
      actionsBrowser.downloads.cancel(hit.id);
    }
    if (entry.ffmpeg_pid) {
      await actionsCoapp.call('abortConvert', entry.ffmpeg_pid);
    }
  }
  async function downloadConvert(hit) {
    let prefs = await actionsWeh.prefs;
    let panelId = 'dlconv#' + hit.id;
    await actionsWeh.rpc.call(
      'main',
      'embed',
      actionsBrowser.runtime.getURL(
        'content/dlconv-embed.html?panel=' + panelId,
      ),
    );
    let { outputConfigId: outputConfigId } = await actionsWeh.wait(panelId);
    prefs.dlconvLastOutput = outputConfigId;
    return await downloadAndNotify(
      hit,
      !0,
      outputConfigId,
      !1,
      actionsActiveDownloads,
      actionsDownloadQueue,
    );
  }
  async function blacklistHit(hit) {
    let embedUrl =
      'content/blacklist-embed.html?panel=blacklist#'
      + encodeURIComponent(hit.id);
    await actionsRpc.call(
      'main',
      'embed',
      actionsBrowser.runtime.getURL(embedUrl),
    );
  }
  async function mergeLocalFiles() {
    {
      let { status: status, info: info } = await actionsCoapp.check();
      if (!status) {
        actionsDialog.alert({
          title: actionsWeh._('coapp_required'),
          text: actionsWeh._('coapp_required_text'),
          buttons: [
            {
              text: actionsWeh._('coapp_install'),
              className: 'btn-success',
              rpcMethod: 'installCoApp',
            },
          ],
        });
        return;
      }
      let version = info.version;
      if (!actionsUtil.isMinimumVersion(version, MERGE_MIN_COAPP_VERSION)) {
        try {
          await actionsCoapp.call('quit');
        } catch {}
        await new Promise(resolve => setTimeout(resolve, 2e3));
        let { status: status2, info: info2 } = await actionsCoapp.check();
        if (
          !status2
          || !actionsUtil.isMinimumVersion(
            info2.version,
            MERGE_MIN_COAPP_VERSION,
          )
        ) {
          actionsCoapp.call('quit');
          actionsDialog.alert({
            title: actionsWeh._('coapp_outofdate'),
            text: actionsWeh._('coapp_outofdate_text', [
              info2.version,
              MERGE_MIN_COAPP_VERSION,
            ]),
            buttons: [
              {
                text: actionsWeh._('coapp_update'),
                className: 'btn-success',
                rpcMethod: 'installCoApp',
              },
            ],
          });
          return;
        }
      }
    }
    {
      let { status: licenseStatus } = await actionsLicense.checkLicense();
      if (
        !(((licenseStatus = 'accepted'), true) || licenseStatus == 'unneeded')
      ) {
        actionsDialog.alert({
          title: actionsWeh._('converter_needs_reg'),
          buttons: [
            {
              text: actionsWeh._('get_conversion_license'),
              className: 'btn-success',
              rpcMethod: 'goto',
              rpcArgs: [globalThis.extConfig.getUrlValue('convertUrl')],
            },
          ],
        });
        return;
      }
    }
    actionsWeh.ui.close('main');
    let videoPath;
    let audioPath;
    let outputPath;
    let outputDir;
    {
      let pickResult = await actionsCoapp.call(
        'filepicker',
        'pick_file',
        '~/dwhelper',
        'Video file',
      );
      let lines = pickResult.split(`
`);
      videoPath = lines[0];
      let videoDisplayPath = lines[2];
      if (!videoPath) {
        return;
      }
      let nameParts = videoDisplayPath.split('.');
      let ext = nameParts.pop();
      let combinedName = nameParts.join('.') + '-combined.' + ext;
      if (
        ((pickResult = await actionsCoapp.call(
          'filepicker',
          'pick_file',
          '~/dwhelper',
          'Audio file',
        )),
        (lines = pickResult.split(`
`)),
        (audioPath = lines[0]),
        !audioPath
          || ((pickResult = await actionsCoapp.call(
            'filepicker',
            'save_file',
            '~/dwhelper',
            'Save as\u2026',
            combinedName,
          )),
          (lines = pickResult.split(`
`)),
          (outputPath = lines[0]),
          (outputDir = lines[1]),
          !outputPath || !outputDir))
      ) {
        return;
      }
    }
    let mergeHit = {
      id: outputPath,
      group: outputPath,
      operation: 'converting',
      status: 'inactive',
      opStartDate: Date.now(),
      descrPrefix: 'merge',
      title: outputPath,
    };
    actionsStore.dispatch('hit.new', mergeHit);
    let onProgress = (received, stats) => {
      if (received < 0) {
        received = 0;
      }
      try {
        actionsHitsStore.update(mergeHit.id, {
          raw_bitrate: 1024 * parseFloat(stats.bitrate),
        });
      } catch {}
    };
    let onStart = pid =>
      actionsActiveDownloads.set(mergeHit.id, {
        ffmpeg_pid: pid,
      });
    try {
      actionsHitsStore.updateRunning(mergeHit.id, 1);
      actionsHitsStore.update(mergeHit.id, {
        localFilePath: outputPath,
      });
      actionsHitsStore.update(mergeHit.id, {
        localDirectory: outputDir,
      });
      await actionsConverter.sideDownload(videoPath, audioPath, {
        filePath: outputPath,
        merge: !0,
        on_progress: onProgress,
        on_start: onStart,
      });
    } catch (error) {
      console.error(error);
      reportActionError(error);
    } finally {
      actionsActiveDownloads.delete(mergeHit.id);
      actionsHitsStore.updateRunning(mergeHit.id, -1);
      actionsHitsStore.update(mergeHit.id, {
        operation: null,
      });
    }
  }
  async function convertLocalFiles() {
    {
      let { status: status } = await actionsCoapp.check();
      if (!status) {
        actionsDialog.alert({
          title: actionsWeh._('coapp_required'),
          text: actionsWeh._('coapp_required_text'),
          buttons: [
            {
              text: actionsWeh._('coapp_install'),
              className: 'btn-success',
              rpcMethod: 'installCoApp',
            },
          ],
        });
        return;
      }
    }
    {
      let { status: licenseStatus } = await actionsLicense.checkLicense();
      if (
        !(((licenseStatus = 'accepted'), true) || licenseStatus == 'unneeded')
      ) {
        actionsDialog.alert({
          title: actionsWeh._('converter_needs_reg'),
          buttons: [
            {
              text: actionsWeh._('get_conversion_license'),
              className: 'btn-success',
              rpcMethod: 'goto',
              rpcArgs: [globalThis.extConfig.getUrlValue('convertUrl')],
            },
          ],
        });
        return;
      }
    }
    actionsWeh.ui.close('main');
    let prefs = await actionsWeh.prefs;
    let selection = await actionsDialog.selectConvertFiles(
      prefs.lastDownloadDirectory || 'dwhelper',
    );
    if (!selection) {
      return;
    }
    let selectedFiles = selection.selected;
    let outputConfigId = selection.outputConfig;
    let directory = selection.directory;
    prefs.dlconvLastOutput = outputConfigId;
    let savePath = null;
    if (selectedFiles.length == 1) {
      let outputConfig = actionsConverter.defaultOutputConfigs[outputConfigId];
      let nameParts = selectedFiles[0].split('.');
      nameParts[nameParts.length - 1] = outputConfig.ext;
      savePath = nameParts.join('.');
      let saveResult = await actionsDialog.saveAs(savePath, directory);
      if (saveResult) {
        savePath = saveResult.filePath;
        if (!savePath.endsWith(`.${outputConfig.ext}`)) {
          savePath += `.${outputConfig.ext}`;
        }
      } else {
        return;
      }
    }
    for (let file of selectedFiles) {
      file = await actionsCoapp.call('path.homeJoin', directory, file);
      let mediaInfo = await actionsConverter.info(file, !0);
      let duration = parseFloat(mediaInfo.format?.duration);
      let convertHit = {
        id: file,
        group: file,
        operation: 'converting',
        status: 'inactive',
        opStartDate: Date.now(),
        descrPrefix: 'local convert',
        title: file,
      };
      actionsStore.dispatch('hit.new', convertHit);
      let onProgress = (received, stats) => {
        if (received < 0) {
          received = 0;
        }
        try {
          actionsHitsStore.update(convertHit.id, {
            raw_bitrate: 1024 * parseFloat(stats.bitrate),
          });
        } catch {}
        if (duration > 0) {
          actionsHitsStore.updateProgress(
            convertHit.id,
            Math.floor((100 * received) / duration),
          );
        }
      };
      let onStart = pid =>
        actionsActiveDownloads.set(convertHit.id, {
          ffmpeg_pid: pid,
        });
      try {
        actionsHitsStore.updateRunning(convertHit.id, 1);
        actionsHitsStore.update(convertHit.id, {
          localFilePath: file,
        });
        actionsHitsStore.update(convertHit.id, {
          localDirectory: directory,
        });
        file = await actionsConverter.convert2(
          file,
          savePath,
          outputConfigId,
          onProgress,
          onStart,
        );
      } finally {
        actionsActiveDownloads.delete(convertHit.id);
        actionsHitsStore.updateRunning(convertHit.id, -1);
        actionsHitsStore.update(convertHit.id, {
          operation: null,
        });
      }
    }
  }
  function execute(action, hitId) {
    let hit = actionsStore.getHit(hitId);
    let isRunning = !!hit.running;
    let hasLocalFile = !!hit.localFilePath;
    let isIdle = !isRunning && !hasLocalFile;
    let handled = !0;
    try {
      if ((action == 'details' && openDetails(hit), action == 'copyurl')) {
        copyHitUrl(hit);
      } else {
        if (!isRunning && action == 'deletehit') {
          deleteHit(hit);
          return handled;
        }
        if (isIdle) {
          if (
            (action == 'download'
              && downloadAndNotify(
                hit,
                !1,
                null,
                !1,
                actionsActiveDownloads,
                actionsDownloadQueue,
              ),
            action == 'quickdownload'
              && downloadAndNotify(
                hit,
                !0,
                null,
                !1,
                actionsActiveDownloads,
                actionsDownloadQueue,
              ),
            action == 'downloadaudio'
              && downloadAndNotify(
                hit,
                !1,
                null,
                !0,
                actionsActiveDownloads,
                actionsDownloadQueue,
              ),
            action == 'quickdownloadaudio'
              && downloadAndNotify(
                hit,
                !0,
                null,
                !0,
                actionsActiveDownloads,
                actionsDownloadQueue,
              ),
            action == 'downloadconvert')
          ) {
            downloadConvert(hit);
            return handled;
          }
          if (action == 'blacklist') {
            blacklistHit(hit);
            return handled;
          }
        } else {
          if (isRunning && action == 'abort') {
            abortDownload(hit);
            return handled;
          }
          if (hasLocalFile) {
            if (action == 'openlocalfile') {
              openLocalFile(hit);
            }
            if (action == 'openlocalcontainer') {
              openLocalContainer(hit);
            }
          }
        }
      }
    } catch (error) {
      reportActionError(error);
      return handled;
    }
    return !handled;
  }
  async function executeDefault(hitId) {
    let actions = await availableActions(hitId);
    if (actions.length > 0) {
      return execute(actions[0], hitId);
    } else {
      return !1;
    }
  }
  function describeAll() {
    return {
      abort: {
        name: 'abort',
        title: actionsWeh._('action_abort_title'),
        description: actionsWeh._('action_abort_description'),
        icon: 'images/icon-action-abort-64.png',
        icon18: 'images/icon-action-abort-64.png',
        catPriority: 2,
      },
      download: {
        name: 'download',
        title: actionsWeh._('action_download_title'),
        description: actionsWeh._('action_download_description'),
        icon: 'images/icon-action-download-64.png',
        icon18: 'images/icon-action-download-64.png',
        catPriority: 0,
      },
      quickdownload: {
        name: 'quickdownload',
        title: actionsWeh._('action_quickdownload_title'),
        description: actionsWeh._('action_quickdownload_description'),
        icon: 'images/icon-action-quick-download2-64.png',
        icon18: 'images/icon-action-quick-download2-64.png',
        catPriority: 0,
      },
      downloadaudio: {
        name: 'downloadaudio',
        title: actionsWeh._('action_downloadaudio_title'),
        description: actionsWeh._('action_downloadaudio_description'),
        icon: 'images/icon-action-download-only-sound-64.png',
        icon18: 'images/icon-action-download-only-sound-64.png',
        catPriority: 0,
      },
      quickdownloadaudio: {
        name: 'quickdownloadaudio',
        title: actionsWeh._('action_quickdownloadaudio_title'),
        description: actionsWeh._('action_quickdownloadaudio_description'),
        icon: 'images/icon-action-quick-download-only-sound-64.png',
        icon18: 'images/icon-action-quick-download-only-sound-64.png',
        catPriority: 0,
      },
      downloadconvert: {
        name: 'downloadconvert',
        title: actionsWeh._('action_downloadconvert_title'),
        description: actionsWeh._('action_downloadconvert_description'),
        icon: 'images/icon-action-download-convert-64.png',
        icon18: 'images/icon-action-download-convert-64.png',
        catPriority: 0,
      },
      details: {
        name: 'details',
        title: actionsWeh._('action_details_title'),
        description: actionsWeh._('action_details_description'),
        icon: 'images/icon-action-details-64.png',
        icon18: 'images/icon-action-details-64.png',
        catPriority: 0,
      },
      copyurl: {
        name: 'copyurl',
        title: actionsWeh._('action_copyurl_title'),
        description: actionsWeh._('action_copyurl_description'),
        icon: 'images/icon-action-copy-link-64.png',
        icon18: 'images/icon-action-copy-link-64.png',
        catPriority: 0,
      },
      deletehit: {
        name: 'deletehit',
        title: actionsWeh._('action_deletehit_title'),
        description: actionsWeh._('action_deletehit_description'),
        icon: 'images/icon-action-delete-64.png',
        icon18: 'images/icon-action-delete-64.png',
        catPriority: 0,
      },
      pin: {
        name: 'pin',
        title: actionsWeh._('action_pin_title'),
        description: actionsWeh._('action_pin_description'),
        icon: 'images/icon-action-pin-64.png',
        icon18: 'images/icon-action-pin-64.png',
        catPriority: 0,
      },
      blacklist: {
        name: 'blacklist',
        title: actionsWeh._('action_blacklist_title'),
        description: actionsWeh._('action_blacklist_description'),
        icon: 'images/icon-action-blacklist-64.png',
        icon18: 'images/icon-action-blacklist-64.png',
        catPriority: 0,
      },
      openlocalfile: {
        name: 'openlocalfile',
        title: actionsWeh._('action_openlocalfile_title'),
        description: actionsWeh._('action_openlocalfile_description'),
        icon: 'images/icon-action-play-64.png',
        icon18: 'images/icon-action-play-64.png',
        catPriority: 1,
      },
      openlocalcontainer: {
        name: 'openlocalcontainer',
        title: actionsWeh._('action_openlocalcontainer_title'),
        description: actionsWeh._('action_openlocalcontainer_description'),
        icon: 'images/icon-action-open-dir-64.png',
        icon18: 'images/icon-action-open-dir-64.png',
        catPriority: 1,
      },
    };
  }
  var reportActionError;
  var actionsCoapp;
  var actionsWeh;
  var actionsRpc;
  var actionsStore;
  var actionsConverter;
  var actionsDialog;
  var actionsLicense;
  var actionsBrowser;
  var actionsHitsStore;
  var actionsUtil;
  var actionsActiveDownloads;
  var actionsDownloadQueue;
  var MERGE_MIN_COAPP_VERSION;
  var initActions = defineLazyModule(() => {
    'use strict';

    initDownloader();
    ({ error: reportActionError } =
      (initAppLog(), toCommonjs(errorReportingNs)));
    actionsCoapp = (initCoapp(), toCommonjs(coappNs));
    actionsWeh = requireWeh();
    actionsRpc = requireRpc();
    actionsStore = (initStore(), toCommonjs(storeNs));
    actionsConverter = (initConverter(), toCommonjs(coappSideNs));
    actionsDialog = (initDialogs(), toCommonjs(dialogNs));
    actionsLicense = (initLicense(), toCommonjs(licenseNs));
    actionsBrowser = actionsWeh.browser;
    actionsHitsStore = (initHitsStore(), toCommonjs(hitsStoreNs));
    actionsUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    actionsActiveDownloads = new Map();
    actionsDownloadQueue = [];
    MERGE_MIN_COAPP_VERSION = '2.0.17';
    actionsRpc.listen({
      convertLocal: convertLocalFiles,
      mergeLocal: mergeLocalFiles,
    });
  });
  var hitsStoreNs = {};
  defineExports(hitsStoreNs, {
    clearHits: () => clearHits,
    create: () => createHit,
    progressReducer: () => progressReducer,
    reducer: () => hitsReducer,
    setHitOperation: () => setHitOperation,
    update: () => update,
    updateOriginal: () => updateOriginal,
    updateProgress: () => updateProgress,
    updateRunning: () => updateRunning,
  });
  function progressReducer(state = {}, action) {
    let current;
    switch (action.type) {
      case 'hit.progress':
        current = state[action.payload.id];
        if (current !== action.payload.progress) {
          state = Object.assign({}, state, {
            [action.payload.id]: action.payload.progress,
          });
        }
        break;
      case 'hit.clear-progress':
        current = state[action.payload];
        if (typeof current < 'u') {
          state = Object.assign({}, state);
          delete state[action.payload];
        }
        break;
    }
    return state;
  }
  function computeHitStatus(hit) {
    let status = hit.status;
    let { url: currentUrl, urls: currentUrls } = hitsTabTracker.current();
    if (hit.status == 'running') {
      return 'running';
    } else {
      if (hit.status == 'active' && hit.topUrl != currentUrl) {
        if (hit.topUrl in currentUrls) {
          status = 'inactive';
        } else {
          status = 'orphan';
        }
      } else {
        if (hit.status == 'inactive' && !(hit.topUrl in currentUrls)) {
          status = 'orphan';
        } else {
          if (
            (hit.status == 'inactive' || hit.status == 'orphan')
            && hit.topUrl == currentUrl
          ) {
            status = 'active';
          }
        }
      }
      if (status == 'orphan' && hit.pinned) {
        status = 'pinned';
      }
      return status;
    }
  }
  function createHit(hit) {
    hitsStoreApi.dispatch('hit.new', hit);
  }
  function update(hitId, changes = {}) {
    hitsStoreApi.dispatch('hit.update', {
      id: hitId,
      changes: changes,
    });
  }
  function updateRunning(hitId, runningDelta) {
    hitsStoreApi.dispatch('hit.updateRunning', {
      id: hitId,
      runningDelta: runningDelta,
    });
  }
  function updateOriginal(hitId, changes = {}) {
    hitsStoreApi.dispatch('hit.updateOriginal', {
      id: hitId,
      changes: changes,
    });
  }
  function updateProgress(hitId, progress) {
    if (progress === null) {
      hitsStoreApi.dispatch('hit.clear-progress', hitId);
    } else {
      hitsStoreApi.dispatch('hit.progress', {
        id: hitId,
        progress: progress,
      });
    }
  }
  function setHitOperation(hitId, operation) {
    let hit = hitsStoreApi.getHit(hitId);
    if (hit && hit.operation !== operation) {
      update(hitId, {
        operation: operation,
      });
    }
  }
  function clearHits(scope) {
    let ids = [];
    let { flat: flatHits } = hitsStoreApi.getHits();
    for (let hit of flatHits.values()) {
      if (
        (scope == 'all' && hit.status != 'running' && hit.status != 'pinned')
        || (scope == 'pinned' && hit.status == 'pinned')
        || (scope == 'inactive' && hit.status == 'inactive')
        || (scope == 'orphans' && hit.status == 'orphan')
      ) {
        ids.push(hit.id);
      }
    }
    hitsStoreApi.dispatch('hit.delete', ids);
  }
  function hitsReducer(state, action) {
    if (!state) {
      state = {
        flat: new Map(),
      };
    }
    let flat = state.flat;
    function applyUpdate(hit, changes = {}) {
      if (!hit.referrer && changes.pageUrl) {
        changes.referrer = changes.pageUrl;
      }
      let coreMedia = changes.core_media ?? hit.core_media;
      if (hit.core_media && changes.core_media) {
        coreMedia = mergeCoreMedia(hit.core_media, changes.core_media);
      }
      let wasNotOrphan = hit.status != 'orphan';
      if (
        ((hit = {
          ...hit,
          ...changes,
          core_media: coreMedia,
        }),
        (hit = {
          ...hit,
          status: computeHitStatus(hit),
        }),
        hit.status == 'orphan' && wasNotOrphan)
      ) {
        let now = Date.now();
        let expiration = hitsWeh.unsafe_prefs.orphanExpiration * 1e3;
        hit.orphanT0 = now;
        hit.orphanT = now + expiration;
        setTimeout(
          () => hitsStoreApi.dispatch('hit.orphanTimeout', hit.id),
          expiration + 100,
        );
      }
      return hit;
    }
    switch (action.type) {
      case 'hit.new':
        {
          if (flat.size > 1e4) {
            console.error(
              'Hit DB is reaching limit. Something is wrong. Abording.',
            );
            return {
              flat: flat,
            };
          }
          let payload = action.payload;
          payload.created = new Date().getTime();
          let existing = flat.get(payload.id) ?? {};
          if (existing.status == 'running') {
            return {
              flat: flat,
            };
          }
          existing.status = 'active';
          let resultHit = applyUpdate(existing, payload);
          if (!resultHit.core_media) {
            console.trace('Missing core_media');
          }
          flat.set(resultHit.id, resultHit);
        }
        break;
      case 'hits.urlUpdated':
        for (let hitId of flat.keys()) {
          flat.set(hitId, applyUpdate(flat.get(hitId)));
        }
        break;
      case 'hit.update':
        {
          let { id: ids, changes: changes } = action.payload;
          if (!Array.isArray(ids)) {
            ids = [ids];
          }
          for (let hitId of ids) {
            let hit = flat.get(hitId);
            if (hit) {
              let updated = applyUpdate(hit, changes);
              flat.set(updated.id, updated);
            } else {
              console.trace('unknown hit');
            }
          }
        }
        break;
      case 'hit.updateRunning':
        {
          let { id: hitId, runningDelta: runningDelta } = action.payload;
          let hit = flat.get(hitId);
          if (hit) {
            let running = hit.running ?? 0;
            let changes = {
              running: running + runningDelta,
            };
            if (running == 0) {
              changes.status = 'running';
            }
            if (changes.running <= 0) {
              changes.running = 0;
              changes.status = 'active';
            }
            flat.set(hitId, applyUpdate(hit, changes));
          } else {
            console.trace('unknown hit');
          }
        }
        break;
      case 'hit.updateOriginal':
        {
          let { id: hitId, changes: changes } = action.payload;
          for (let hit of flat.values()) {
            if (hitId === hit.id || hitId === hit.originalId) {
              flat.set(hit.id, applyUpdate(hit, changes));
            }
          }
        }
        break;
      case 'hit.delete':
        {
          let ids = action.payload;
          if (!Array.isArray(ids)) {
            ids = [ids];
          }
          for (let hitId of ids) {
            flat.delete(hitId);
          }
        }
        break;
      case 'hit.orphanTimeout':
        {
          let hitId = action.payload;
          let hit = flat.get(hitId);
          if (
            hit
            && hit.status == 'orphan'
            && !isNaN(hit.orphanT)
            && Date.now() > hit.orphanT
          ) {
            let ids = action.payload;
            if (!Array.isArray(ids)) {
              ids = [ids];
            }
            for (let delId of ids) {
              flat.delete(delId);
            }
          }
        }
        break;
      case 'blacklist-changed':
        break;
      default:
        if (
          !action.type.startsWith('@@redux')
          && action.type != 'hit.clear-progress'
          && action.type != 'log.new'
          && action.type != 'log.clear'
          && action.type != 'hit.progress'
        ) {
          console.trace('Unexpected action:', action.type);
        }
        return state;
    }
    return {
      flat: flat,
    };
  }
  var hitsWeh;
  var hitsRpc;
  var hitsActions;
  var hitsStoreApi;
  var hitsTabTracker;
  var initHitsStore = defineLazyModule(() => {
    'use strict';

    initMediaCommon();
    hitsWeh = requireWeh();
    hitsRpc = requireRpc();
    hitsActions = (initActions(), toCommonjs(actionsNs));
    hitsStoreApi = (initStore(), toCommonjs(storeNs));
    hitsTabTracker = (initTabTracker(), toCommonjs(tabTrackerNs));
    hitsRpc.listen({
      actionCommand: (action, hitId) => hitsActions.execute(action, hitId),
      clearHits: clearHits,
    });
  });
  var blacklistNs = {};
  defineExports(blacklistNs, {
    checkHitBlacklisted: () => checkHitBlacklisted,
    set: () => setBlacklist,
  });
  async function writeBlacklistStorage() {
    try {
      await blacklistBrowser.storage.local.set({
        blacklist: await blacklistPromise,
      });
    } catch {
      console.error('Cannot write blacklist storage');
    }
  }
  function domainsFromUrl(url) {
    let domains = [];
    let match = /^https?:\/\/([^\/:]+)/.exec(url);
    if (match) {
      if (ipv4Regex.test(match[1])) {
        domains.push(match[1]);
      } else {
        let parts = match[1].split('.');
        for (; parts.length > 1 && (parts[0] != 'co' || parts.length > 2); ) {
          domains.push(parts.join('.'));
          parts.shift();
        }
      }
    }
    return domains;
  }
  function domainsFromHit(hit) {
    let domains = [];
    if (hit.url) {
      domains = domains.concat(domainsFromUrl(hit.url));
    }
    if (hit.audioUrl) {
      domains = domains.concat(domainsFromUrl(hit.audioUrl));
    }
    if (hit.videoUrl) {
      domains = domains.concat(domainsFromUrl(hit.videoUrl));
    }
    if (hit.topUrl) {
      domains = domains.concat(domainsFromUrl(hit.topUrl));
    }
    if (hit.pageUrl) {
      domains = domains.concat(domainsFromUrl(hit.pageUrl));
    }
    let domainSet = {};
    domains.forEach(function (domain) {
      domainSet[domain] = 1;
    });
    return domainSet;
  }
  function sortDomains(domainSet) {
    let keys = Object.keys(domainSet);
    keys.sort(function (domainA, domainB) {
      let partsA = domainA.split('.').reverse();
      let partsB = domainB.split('.').reverse();
      for (;;) {
        if (partsA.length && !partsB.length) {
          return -1;
        }
        if (!partsA.length && partsB.length) {
          return 1;
        }
        if (!partsA.length && !partsB.length) {
          return 0;
        }
        let partA = partsA.shift();
        let partB = partsB.shift();
        if (partA != partB) {
          if (partA < partB) {
            return -1;
          } else {
            return 1;
          }
        }
      }
    });
    return keys;
  }
  function sortedDomainsFromHit(hit) {
    let domainSet = domainsFromHit(hit);
    return sortDomains(domainSet);
  }
  function checkHitBlacklisted(hit) {
    if (!blacklistWeh.unsafe_prefs.blacklistEnabled) {
      return !1;
    }
    let domainSet = domainsFromHit(hit);
    for (let domain in domainSet) {
      if (blacklistCache[domain]) {
        return !0;
      }
    }
    return !1;
  }
  async function addBlacklistDomains(domains) {
    let blacklist = await blacklistPromise;
    domains.forEach(domain => {
      blacklist[domain] = !0;
    });
    await writeBlacklistStorage();
    blacklistStore.dispatch('blacklist-changed');
  }
  async function removeBlacklistDomains(domains) {
    let blacklist = await blacklistPromise;
    domains.forEach(domain => {
      delete blacklist[domain];
    });
    await writeBlacklistStorage();
  }
  async function setBlacklist(blacklist) {
    blacklistPromise = Promise.resolve(blacklist || {});
    await writeBlacklistStorage();
  }
  var blacklistWeh;
  var blacklistBrowser;
  var blacklistStore;
  var ipv4Regex;
  var blacklistCache;
  var blacklistPromise;
  var initBlacklist = defineLazyModule(() => {
    'use strict';

    blacklistWeh = requireWeh();
    blacklistBrowser = blacklistWeh.browser;
    blacklistStore = (initStore(), toCommonjs(storeNs));
    ipv4Regex = new RegExp(
      '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    );
    blacklistPromise = (async () => {
      try {
        let stored = (
          await blacklistBrowser.storage.local.get({
            blacklist: {},
          })
        ).blacklist;
        blacklistCache = stored;
        return stored;
      } catch {
        console.error('Cannot read blacklist storage');
        return;
      }
    })();
    blacklistWeh.rpc.listen({
      domainsFromHitId: hitId => {
        let hit = blacklistStore.getHit(hitId);
        return (hit && sortedDomainsFromHit(hit)) || [];
      },
      addToBlacklist: addBlacklistDomains,
      removeFromBlacklist: removeBlacklistDomains,
      setBlacklist: async blacklist => {
        await setBlacklist(blacklist);
      },
      getBlacklist: async () => {
        let blacklist = await blacklistPromise;
        return Object.keys(blacklist).filter(domain => !!blacklist[domain]);
      },
      editBlacklist: () => {
        blacklistWeh.ui.open('blacklist-edit', {
          type: 'tab',
          url: 'content/blacklist-edit.html',
        });
      },
    });
  });
  var convrulesNs = {};
  defineExports(convrulesNs, {
    outputConfigForHit: () => outputConfigForHit,
    set: () => setConversionRules,
  });
  async function setConversionRules(rules) {
    conversionRulesPromise = Promise.resolve(rules);
    await convrulesBrowser.storage.local.set({
      convrules: rules,
    });
  }
  async function outputConfigForHit(hit) {
    let rules = await conversionRulesPromise;
    let topUrl = (hit.url || hit.videoUrl || hit.audioUrl) && hit.topUrl;
    if (!topUrl) {
      return null;
    }
    let hostname = new URL(topUrl).hostname;
    let domainSuffixes = [];
    let hostParts = hostname.split('.');
    for (let partIndex = 0; partIndex < hostParts.length - 1; partIndex++) {
      domainSuffixes.push(hostParts.slice(partIndex).join('.'));
    }
    let matchedRule = null;
    if (
      rules.every(rule => {
        let matches = !0;
        if (rule.extension && hit.extension !== rule.extension) {
          matches = !1;
        }
        if (matches && rule.domain) {
          matches = !domainSuffixes.every(suffix => suffix !== rule.domain);
        }
        if (matches) {
          matchedRule = rule;
        }
        return !matches;
      })
      || !matchedRule.convert
    ) {
      return null;
    } else {
      return (
        (await convrulesConverter.getOutputConfigs())[matchedRule.format]
        || null
      );
    }
  }
  var convrulesWeh;
  var convrulesBrowser;
  var convrulesConverter;
  var conversionRulesPromise;
  var initConversionRules = defineLazyModule(() => {
    'use strict';

    convrulesWeh = requireWeh();
    convrulesBrowser = convrulesWeh.browser;
    convrulesConverter = (initConverter(), toCommonjs(coappSideNs));
    conversionRulesPromise = convrulesBrowser.storage.local
      .get({
        convrules: [],
      })
      .then(stored => stored.convrules);
    convrulesWeh.rpc.listen({
      editConversionRules: () => {
        convrulesWeh.ui.open('convrules-edit', {
          type: 'tab',
          url: 'content/convrules-edit.html',
        });
      },
      getConversionRules: () => conversionRulesPromise,
      setConversionRules: rules => setConversionRules(rules),
    });
  });
  var storeNs = {};
  defineExports(storeNs, {
    closePopup: () => closePopup,
    dispatch: () => storeDispatch,
    getHit: () => getHit,
    getHits: () => getHits,
    getLogs: () => getLogs,
    getMainData: () => getMainData,
    getSerializedHits: () => getSerializedHits,
  });
  function getHits() {
    return reduxStore.getState().hits;
  }
  function getHit(hitId) {
    return getHits().flat.get(hitId);
  }
  function getLogs() {
    return reduxStore.getState().logs;
  }
  async function getVisibleHits() {
    let { flat: flat } = getHits();
    let minSize = (await storeWeh.prefs).mediaweightMinSize;
    let stored = await storeBrowser.storage.local.get({
      blacklist: {},
    });
    let blacklistDomains = Object.keys(stored.blacklist).map(domain =>
      domain.split('.').reverse(),
    );
    return filterHitsForDisplay(flat, blacklistDomains, minSize);
  }
  async function getSerializedHits() {
    let sortConfig = await getSetting(settingMediaUserPref);
    let hits = await getVisibleHits();
    let serialized = groupHitsForDisplay(hits, sortConfig);
    for (let group of serialized) {
      for (let hit of group) {
        hit.actions = await storeActions.availableActions(hit.id);
      }
    }
    return serialized;
  }
  async function updateBadgeAndIcon() {
    if (!(await legacyUiSetting)) {
      return;
    }
    let activeCount = 0;
    let anyTabCount = 0;
    let pinnedCount = 0;
    let runningCount = 0;
    let hits = await getVisibleHits();
    for (let hit of hits.values()) {
      switch (hit.status) {
        case 'running':
          runningCount++;
          break;
        case 'active':
          activeCount++;
          anyTabCount++;
          break;
        case 'inactive':
          anyTabCount++;
          break;
        case 'pinned':
          pinnedCount++;
          break;
      }
    }
    let prefs = await storeWeh.prefs;
    let isGrey = !1;
    if (
      anyTabCount == 0
      || (prefs.iconActivation == 'currenttab' && activeCount == 0)
    ) {
      isGrey = !0;
    }
    storeBrowser.action.setIcon({
      path: `/content2/icons/${storeBuildInfo.channel}-${isGrey ? 'grey' : 'color'}.png`,
    });
    let badgeText = '';
    let badgeColor = '#000';
    switch (prefs.iconBadge) {
      case 'tasks':
        badgeColor = '#00f';
        badgeText = runningCount || '';
        break;
      case 'activetab':
        badgeColor = '#080';
        badgeText = activeCount || '';
        break;
      case 'anytab':
        badgeColor = '#b59e32';
        badgeText = anyTabCount || '';
        break;
      case 'pinned':
        badgeColor = '#000';
        badgeText = pinnedCount || '';
        break;
      case 'mixed':
        if (pinnedCount > 0) {
          badgeColor = '#000';
          badgeText = pinnedCount;
        } else {
          if (runningCount > 0) {
            badgeColor = '#00f';
            badgeText = runningCount;
          } else {
            if (activeCount > 0) {
              badgeColor = '#080';
              badgeText = activeCount;
            } else {
              if (anyTabCount > 0) {
                badgeColor = '#b59e32';
                badgeText = anyTabCount;
              }
            }
          }
        }
    }
    let errorLogs = reduxStore
      .getState()
      .logs.filter(log => log.type === 'error');
    if (errorLogs.length > 0) {
      badgeText = errorLogs.length;
      badgeColor = '#f44';
    }
    storeBrowser.action.setBadgeText({
      text: '' + badgeText,
    });
    storeBrowser.action.setBadgeBackgroundColor({
      color: badgeColor,
    });
  }
  function storeDispatch(type, payload) {
    reduxStore.dispatch({
      type: type,
      payload: payload,
    });
  }
  async function getMainData() {
    return {
      hits: await getSerializedHits(),
      actions: storeActions.describeAll(),
      logs: reduxStore.getState().logs,
      progress: reduxStore.getState().progress,
    };
  }
  async function closePopup() {
    return storeRpc.call('main', 'close');
  }
  async function exportSettings() {
    let keys = [
      'blacklist',
      'license',
      MEDIA_USER_PREFS_KEY,
      'convrules',
      'outputConfigs',
      'smartname',
    ];
    let prefs = await storeWeh.prefs;
    return storeBrowser.storage.local.get(keys).then(stored => {
      let settings = Object.assign(
        {
          blacklist: {},
          license: null,
          conversionRules: [],
          outputConfigs: {},
        },
        stored,
        {
          'weh-prefs': prefs.getAll(),
        },
      );
      let json = JSON.stringify(settings, null, 4);
      let dataUrl;
      if (storeWeh.isBrowser('firefox')) {
        let blob = new Blob([json], {
          type: 'text/json;charset=utf-8',
        });
        dataUrl = URL.createObjectURL(blob);
      } else {
        dataUrl = 'data:,' + json;
      }
      storeBrowser.downloads.download({
        url: dataUrl,
        filename: 'vdh-settings.json',
        saveAs: !0,
        conflictAction: 'uniquify',
      });
    });
  }
  async function importSettings(settings) {
    if (settings.convrules) {
      await storeConvrules.set(settings.convrules);
    }
    if (settings.outputConfigs) {
      storeConverter.setOutputConfigs(settings.outputConfigs);
    }
    if (settings.license) {
      storeLicense.setLicense(settings.license);
    }
    if (settings.blacklist) {
      await storeBlacklist.set(settings.blacklist);
    }
    if (MEDIA_USER_PREFS_KEY in settings) {
      await setSetting(settingMediaUserPref, settings[MEDIA_USER_PREFS_KEY]);
    }
    if (settings.smartname) {
      await storeSmartname.set(settings.smartname);
    }
    return settings['weh-prefs'] || {};
  }
  function reloadAddon() {
    storeBrowser.runtime.reload();
  }
  var createStoreFn;
  var combineReducersFn;
  var applyMiddlewareFn;
  var createLoggerFn;
  var makeWatcher;
  var storeBuildInfo;
  var storeWeh;
  var storeRpc;
  var storeHitsStore;
  var storeActions;
  var storeAppLog;
  var storeConverter;
  var storeLicense;
  var storeSidePanel;
  var storeBlacklist;
  var storeSmartname;
  var storeConvrules;
  var legacyUiSetting;
  var storeMiddlewares;
  var storeBrowser;
  var reduxStore;
  var watchHitsState;
  var watchProgressState;
  var watchLogsState;
  var hitsUpdateTimer;
  var MEDIA_USER_PREFS_KEY;
  var initStore = defineLazyModule(() => {
    'use strict';

    initHitSerializer();
    initSettings();
    ({
      createStore: createStoreFn,
      combineReducers: combineReducersFn,
      applyMiddleware: applyMiddlewareFn,
    } = requireRedux());
    ({ createLogger: createLoggerFn } = requireReduxLogger());
    makeWatcher = requireReduxWatch();
    storeBuildInfo = requireBuildInfo();
    storeWeh = requireWeh();
    storeRpc = requireRpc();
    storeHitsStore = (initHitsStore(), toCommonjs(hitsStoreNs));
    storeActions = (initActions(), toCommonjs(actionsNs));
    storeAppLog = (initAppLog(), toCommonjs(errorReportingNs));
    storeConverter = (initConverter(), toCommonjs(coappSideNs));
    storeLicense = (initLicense(), toCommonjs(licenseNs));
    storeSidePanel = void 0;
    storeBlacklist = (initBlacklist(), toCommonjs(blacklistNs));
    storeSmartname = (initSmartname(), toCommonjs(smartnameNs));
    storeConvrules = (initConversionRules(), toCommonjs(convrulesNs));
    initTabTracker();
    legacyUiSetting = getSetting(settingUseLegacyUi);
    storeMiddlewares = [];
    storeWeh.prefs.then(prefs => {
      if (prefs.backgroundReduxLogger) {
        storeMiddlewares.push(
          createLoggerFn({
            collapsed: (getState, action, logEntry) => !0,
          }),
        );
      }
    });
    storeBrowser = storeWeh.browser;
    reduxStore = createStoreFn(
      combineReducersFn({
        hits: storeHitsStore.reducer,
        progress: storeHitsStore.progressReducer,
        logs: storeAppLog.reducer,
      }),
      applyMiddlewareFn(...storeMiddlewares),
    );
    watchHitsState = makeWatcher(reduxStore.getState, 'hits');
    watchProgressState = makeWatcher(reduxStore.getState, 'progress');
    watchLogsState = makeWatcher(reduxStore.getState, 'logs');
    hitsUpdateTimer = null;
    reduxStore.subscribe(
      watchHitsState(async () => {
        if (hitsUpdateTimer || !(await legacyUiSetting)) {
          return;
        }
        let floodDelay = (await storeWeh.prefs).hitUpdateFloodProtect;
        hitsUpdateTimer = setTimeout(async () => {
          hitsUpdateTimer = null;
          let hits = await getSerializedHits();
          try {
            if (storeWeh.openedContents().indexOf('main') >= 0) {
              storeRpc.callOptional('main', 'hits', hits);
            }
            storeSidePanel?.updateHits(hits);
            updateBadgeAndIcon();
          } catch (err) {
            console.error(err);
          }
        }, floodDelay);
      }),
    );
    reduxStore.subscribe(
      watchProgressState(() => {
        storeRpc.callOptional(
          'main',
          'progress',
          reduxStore.getState().progress,
        );
      }),
    );
    reduxStore.subscribe(
      watchLogsState(() => {
        storeRpc.callOptional('main', 'logs', reduxStore.getState().logs);
        try {
          updateBadgeAndIcon();
        } catch (err) {
          console.error(err);
        }
      }),
    );
    storeRpc.listen({
      getHit: hitId => getHit(hitId),
      getMainData: getMainData,
      hitPageData: pageData => {
        storeHitsStore.updateOriginal(pageData.id, pageData.data);
      },
      closePopup: closePopup,
      closePanel: panelId => storeWeh.ui.close(panelId),
    });
    updateBadgeAndIcon();
    MEDIA_USER_PREFS_KEY = 'media_user_pref';
    storeWeh.rpc.listen({
      exportSettings: exportSettings,
      importSettings: importSettings,
      reloadAddon: reloadAddon,
    });
  });
  var tabTrackerNs = {};
  defineExports(tabTrackerNs, {
    current: () => currentTabInfo,
    gotoOrOpenTab: () => tabTrackerGoto,
    setTransientTab: () => setTransientTab,
    update: () => scheduleTabUpdate,
  });
  function currentTabInfo() {
    return {
      url: currentTabUrl,
      urls: openTabUrls,
    };
  }
  function refreshActiveTabInfo() {
    tabRefreshTimer = null;
    getFocusedActiveTab().then(activeTab => {
      if (activeTab) {
        currentTabUrl = activeTab.url;
        tabBrowser.tabs.query({}).then(tabs => {
          openTabUrls = {};
          for (let tabIndex in tabs) {
            openTabUrls[tabs[tabIndex].url] = 1;
          }
          tabStore.dispatch('hits.urlUpdated', {
            url: currentTabUrl,
            urls: openTabUrls,
          });
        });
      }
    });
  }
  function scheduleTabUpdate() {
    if (tabRefreshTimer) {
      clearTimeout(tabRefreshTimer);
    }
    tabRefreshTimer = setTimeout(refreshActiveTabInfo, 50);
  }
  function setTransientTab(marker, tabId) {
    transientMarker = marker;
    transientTabId = tabId;
  }
  function handleTabRemoved(removedTabId) {
    if (transientMarker === removedTabId && transientTabId) {
      tabBrowser.tabs.update(transientTabId, {
        active: !0,
      });
    }
    transientMarker = null;
    transientTabId = null;
    scheduleTabUpdate();
  }
  function handleTabActivated({ tabId: tabId, _windowId: _windowId }) {
    if (tabId !== transientMarker) {
      transientMarker = null;
      transientTabId = null;
    }
    scheduleTabUpdate();
  }
  function handleTabCreated(tab) {
    if (transientMarker === '<next-tab>') {
      transientMarker = tab.id;
    }
  }
  function tabTrackerGoto(url) {
    transientMarker = null;
    transientTabId = null;
    return tabUtil.gotoOrOpenTab(url, setTransientTab);
  }
  var tabWeh;
  var tabBrowser;
  var tabStore;
  var tabUtil;
  var tabRefreshTimer;
  var getFocusedActiveTab;
  var currentTabUrl;
  var openTabUrls;
  var transientMarker;
  var transientTabId;
  var initTabTracker = defineLazyModule(() => {
    'use strict';

    tabWeh = requireWeh();
    tabBrowser = tabWeh.browser;
    tabStore = (initStore(), toCommonjs(storeNs));
    tabUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    tabRefreshTimer = null;
    getFocusedActiveTab = async () => {
      try {
        let lastWindow = await tabBrowser.windows.getLastFocused({
          populate: !0,
        });
        if (lastWindow.focused) {
          let activeTabs = lastWindow.tabs.filter(tab => tab.active);
          if (activeTabs.length) {
            return activeTabs[0];
          } else {
            return null;
          }
        } else {
          return null;
        }
      } catch {
        return null;
      }
    };
    currentTabUrl = 'about:blank';
    openTabUrls = {};
    transientMarker = null;
    transientTabId = null;
    tabBrowser.windows?.onFocusChanged?.addListener(scheduleTabUpdate);
    tabBrowser.windows?.onRemoved?.addListener(scheduleTabUpdate);
    tabBrowser.tabs.onActivated.addListener(handleTabActivated);
    tabBrowser.tabs.onRemoved.addListener(handleTabRemoved);
    tabBrowser.tabs.onUpdated.addListener(scheduleTabUpdate);
    tabBrowser.tabs.onCreated.addListener(handleTabCreated);
  });
  var coappNs = {};
  defineExports(coappNs, {
    call: () => coappCall,
    check: () => coappCheck,
    downloads: () => downloads,
    gotoInstall: () => gotoInstall,
    isAtLeastVersion: () => isAtLeastVersion,
    isDegradedVersion: () => isDegradedVersion,
    isProbablyAvailable: () => isProbablyAvailable,
    listen: () => coappListen,
    request: () => coappRequest,
    requestBinary: () => coappRequestBinary,
  });
  function gotoInstall() {
    installGate(async () => {
      let prefs = await coappWeh.prefs;
      let installUrl = globalThis.extConfig.getUrlValue('installCoappUrl', {
        channel: coappChannel,
      });
      if (prefs.forcedCoappVersion) {
        installUrl += '&version=' + prefs.forcedCoappVersion;
      }
      return coappTabNav.gotoOrOpenTab(installUrl);
    });
  }
  function coappCall(...args) {
    return coappConnection.call(...args);
  }
  function coappListen(...args) {
    return coappConnection.listen(...args);
  }
  function coappQueryInfo() {
    return new Promise((resolve, reject) => {
      let settled = !1;
      coappConnection
        .callCatchAppNotFound(notFoundErr => {
          coappOnline = !1;
          settled = !0;
          resolve({
            status: !1,
            error: notFoundErr.message,
          });
        }, 'info')
        .then(info => {
          coappOnline = !0;
          coappKnownVersion = info.version;
          coappDegraded = info.target?.node == 10;
          resolve({
            status: !0,
            info: info,
          });
        })
        .catch(err => {
          coappOnline = !1;
          if (!settled) {
            // Not the "app not found" path (that resolves above via
            // callCatchAppNotFound): the native host connected but the info
            // request itself failed. So the CoApp is installed - it just did not
            // answer correctly, usually an outdated or broken CoApp. Say so,
            // instead of reporting it as missing with a bare remote message.
            resolve({
              status: !1,
              connected: !0,
              error:
                'The CoApp is installed but its info request failed: '
                + ((err && err.message) || String(err))
                + '. Try updating or reinstalling the CoApp.',
            });
          }
        });
    });
  }
  function coappCheck() {
    return checkGate(() => coappQueryInfo());
  }
  function isProbablyAvailable() {
    return coappOnline;
  }
  function isDegradedVersion() {
    return !!coappDegraded;
  }
  function isAtLeastVersion(version) {
    if (coappKnownVersion) {
      return coappCompareSemVer(coappKnownVersion, version) >= 0;
    }
    throw new Error('Coapp no available');
  }
  function coappRequest(url, options) {
    return new Promise((resolve, reject) => {
      let chunks = [];
      function handleChunk(chunk) {
        if ((chunks.push(chunk.data), !chunk.more)) {
          return resolve(chunks.join(''));
        }
        coappConnection
          .call('requestExtra', chunk.id)
          .then(next => {
            handleChunk(next);
          })
          .catch(reject);
      }
      coappConnection
        .call('request', url, options)
        .then(chunk => ((coappOnline = !0), chunk))
        .then(handleChunk)
        .catch(reject);
    });
  }
  function coappRequestBinary(url, options) {
    return new Promise((resolve, reject) => {
      let totalLength = 0;
      let chunks = [];
      function handleChunk(chunk) {
        if (
          (chunk.data
            && chunk.data.data
            && ((totalLength += chunk.data.data.length),
            chunks.push(new Uint8Array(chunk.data.data))),
          !chunk.more)
        ) {
          let combined = new Uint8Array(totalLength);
          let offset = 0;
          chunks.forEach(part => {
            combined.set(part, offset);
            offset += part.length;
          });
          return resolve(combined);
        }
        coappConnection
          .call('requestExtra', chunk.id)
          .then(next => {
            setTimeout(() => {
              handleChunk(next);
            });
          })
          .catch(reject);
      }
      coappConnection
        .call('requestBinary', url, options)
        .then(first => ((coappOnline = !0), first))
        .then(handleChunk)
        .catch(reject);
    });
  }
  var coappWeh;
  var coappUtil;
  var coappDownloadsLib;
  var coappCompareSemVer;
  var coappConnection;
  var coappTabNav;
  var installGate;
  var checkGate;
  var coappChannel;
  var coappIdleTimer;
  var coappOnline;
  var coappKnownVersion;
  var coappDegraded;
  var downloads;
  var initCoapp = defineLazyModule(() => {
    'use strict';

    coappWeh = requireWeh();
    coappUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    coappDownloadsLib = (initDownloadsLib(), toCommonjs(downloadsNs));
    ({ compareSemVer: coappCompareSemVer } =
      (initSemver(), toCommonjs(semverNs)));
    coappConnection = requireCoappClient()('net.downloadhelper.coapp');
    coappTabNav = (initTabTracker(), toCommonjs(tabTrackerNs));
    installGate = coappUtil.Concurrent();
    checkGate = coappUtil.Concurrent();
    ({ channel: coappChannel } = requireBuildInfo());
    coappIdleTimer = null;
    coappConnection.onAppNotFound.addListener(() => {
      gotoInstall();
    });
    coappConnection.onCallCount.addListener(async (addonCount, appCount) => {
      let prefs = await coappWeh.prefs;
      if (coappIdleTimer) {
        clearTimeout(coappIdleTimer);
        coappIdleTimer = null;
      }
      if (addonCount === 0 && appCount === 0 && prefs.coappIdleExit) {
        coappIdleTimer = setTimeout(() => {
          coappIdleTimer = null;
          coappConnection.close();
        }, prefs.coappIdleExit);
      }
    });
    downloads = new coappDownloadsLib.Downloads(coappConnection);
    coappWeh.prefs.then(prefs => {
      if (prefs.checkCoappOnStartup) {
        coappCheck();
      }
    });
    coappWeh.rpc.listen({
      coappProxy: coappCall,
      checkCoApp: coappCheck,
      installCoApp: gotoInstall,
    });
  });
  var proxyHeadersNs = {};
  defineExports(proxyHeadersNs, {
    getProxyHeaders: () => getProxyHeaders,
  });
  async function loadMediaExtensionSet() {
    let prefs = await probeWeh.prefs;
    let extensionSet = {};
    prefs.mediaExtensions.split('|').forEach(function (ext) {
      extensionSet[ext] = 1;
    });
    return extensionSet;
  }
  async function compileNetworkFilterRegex() {
    let filterPattern = (await probeWeh.prefs).networkFilterOut;
    if (filterPattern) {
      try {
        return new RegExp(filterPattern, 'i');
      } catch {
        console.warn('networkFilterOut preference is not a valid regex');
        return;
      }
    }
  }
  function startHeadersProbe() {
    probeBrowser.webRequest.onHeadersReceived.addListener(
      handleHeadersReceived,
      {
        urls: ['<all_urls>'],
      },
      ['responseHeaders'],
    );
  }
  function stopHeadersProbe() {
    probeBrowser.webRequest.onHeadersReceived.removeListener(
      handleHeadersReceived,
    );
  }
  function startRequestMonitor() {
    monitoredRequestHeaders = {};
    probeBrowser.webRequest.onSendHeaders.addListener(
      handleSendHeaders,
      {
        urls: ['<all_urls>'],
      },
      sendHeadersExtraInfo,
    );
    probeBrowser.webRequest.onErrorOccurred.addListener(handleRequestError, {
      urls: ['<all_urls>'],
    });
  }
  function stopRequestMonitor() {
    probeBrowser.webRequest.onSendHeaders.removeListener(handleSendHeaders);
    probeBrowser.webRequest.onErrorOccurred.removeListener(handleRequestError);
    monitoredRequestHeaders = null;
  }
  function resolveProxyHeaders(details) {
    let pending = proxyHeaderWaiters[details.url];
    if (pending) {
      clearTimeout(pending.timer);
      delete proxyHeaderWaiters[details.url];
      let headers = details.requestHeaders.filter(
        header => typeof skippedHeaderNames[header.name.toLowerCase()] > 'u',
      );
      pending.handlers.forEach(handler => {
        handler.resolve({
          proxy: details.proxyInfo,
          headers: headers,
        });
      });
    }
  }
  function getProxyHeaders(url) {
    function onTimeout() {
      let entry = proxyHeaderWaiters[url];
      if (entry) {
        entry.handlers.forEach(handler => {
          handler.reject(new Error('timeout monitoring proxyHeaders'));
        });
        delete proxyHeaderWaiters[url];
      }
    }
    let entry = proxyHeaderWaiters[url];
    if (entry) {
      clearTimeout(entry.timer);
    } else {
      entry = proxyHeaderWaiters[url] = {
        handlers: [],
      };
    }
    return new Promise((resolve, reject) => {
      entry.handlers.push({
        resolve: resolve,
        reject: reject,
      });
      entry.timer = setTimeout(onTimeout, 3e4);
      fetch(url, {
        method: 'HEAD',
        credentials: 'include',
      });
    });
  }
  var probeWeh;
  var netProbeStore;
  var netProbeHits;
  var netProbeUtil;
  var netProbeSmartname;
  var makeProbesForRequest;
  var fireHttpMediaProbe;
  var probeBrowser;
  var contentRangeRegex;
  var avMimeRegex;
  var dispositionFilenameRegex;
  var urlFilenameRegex;
  var urlExtensionRegex;
  var ytOtfRegex;
  var ptrackingRegex;
  var ytDoodleRegex;
  var tumblrVideoRegex;
  var soundcloudRegex;
  var skippedHeaderNames;
  var mediaExtensionSetPromise;
  var filterOutRegexPromise;
  var handleHeadersReceived;
  var monitoredRequestTypes;
  var monitoredRequestHeaders;
  var handleSendHeaders;
  var handleRequestError;
  var sendHeadersExtraInfo;
  var proxyHeaderWaiters;
  var initNetworkProbe = defineLazyModule(() => {
    'use strict';

    initMediaTypeSupport();
    initTsResultsIndex();
    initProtocolTypes();
    initContainers();
    initCodecs();
    initMediaCommon();
    probeWeh = requireWeh();
    netProbeStore = (initStore(), toCommonjs(storeNs));
    netProbeHits = (initHitsStore(), toCommonjs(hitsStoreNs));
    netProbeUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    netProbeSmartname = (initSmartname(), toCommonjs(smartnameNs));
    ({
      MaybeCreateProbeFromNetworkRequest: makeProbesForRequest,
      FireProbeForHTTPMedia: fireHttpMediaProbe,
    } = (initProbes(), toCommonjs(probesNs)));
    probeBrowser = probeWeh.browser;
    contentRangeRegex = new RegExp('^bytes [0-9]+-[0-9]+/([0-9]+)$');
    avMimeRegex = new RegExp('^(audio|video)/(?:x-)?([^; ]+)');
    dispositionFilenameRegex = new RegExp(
      'filename\\s*=\\s*"\\s*([^"]+?)\\s*"',
    );
    urlFilenameRegex = new RegExp(
      '/([^/]+?)(?:\\.([a-z0-9]{1,5}))?(?:\\?|#|$)',
      'i',
    );
    urlExtensionRegex = new RegExp('\\.([a-z0-9]{1,5})(?:\\?|#|$)', 'i');
    ytOtfRegex = new RegExp('\\bsource=yt_otf\\b');
    ptrackingRegex = new RegExp('/ptracking\\b');
    ytDoodleRegex = new RegExp('^https://www.gstatic.com/youtube/doodle\\b');
    tumblrVideoRegex = new RegExp(
      '^(https?)://v[^\\/]*\\.tumblr\\.com/(tumblr_[0-9a-zA-Z_]+)\\.(?:mp4|mov)',
    );
    soundcloudRegex = new RegExp('^https://soundcloud.com/');
    skippedHeaderNames = {
      host: !0,
      range: !0,
      'content-length': !0,
    };
    mediaExtensionSetPromise = loadMediaExtensionSet();
    probeWeh.prefs.then(prefs =>
      prefs.on('mediaExtensions', () => {
        mediaExtensionSetPromise = loadMediaExtensionSet();
      }),
    );
    filterOutRegexPromise = compileNetworkFilterRegex();
    probeWeh.prefs.then(prefs =>
      prefs.on('networkFilterOut', () => {
        filterOutRegexPromise = compileNetworkFilterRegex();
      }),
    );
    handleHeadersReceived = async details => {
      let prefs = await probeWeh.prefs;
      let requestHeaders;
      if (
        (monitoredRequestHeaders
          && ((requestHeaders = monitoredRequestHeaders[details.requestId]),
          requestHeaders && delete monitoredRequestHeaders[details.requestId]),
        details.tabId < 0 && !details.initiator?.startsWith('http'))
      ) {
        return;
      }
      let filterRegex = await filterOutRegexPromise;
      if (
        ytOtfRegex.test(details.url)
        || ptrackingRegex.test(details.url)
        || ytDoodleRegex.test(details.url)
        || (filterRegex && filterRegex.test(details.url))
      ) {
        return;
      }
      function emitProbe(probes, force) {
        if (
          !force
          && ((!mimeMatch && isNaN(contentLength) && !extMatch)
            || (!mimeMatch
              && !extMatch
              && (isNaN(contentLength)
                || prefs.mediaweightThreshold === 0
                || contentLength < prefs.mediaweightThreshold))
            || (mimeMatch && mimeMatch[2].toLowerCase() == 'ms-asf'))
        ) {
          return;
        }
        let hit = {
          id: 'network-probe:' + netProbeUtil.hashHex(details.url),
          status: 'active',
          url: details.url,
          tabId: details.tabId,
          frameId: details.frameId,
          fromCache: !0,
          referrer: referrer,
        };
        if (!isNaN(contentLength) && !probes) {
          hit.length = contentLength;
        }
        if (
          details.proxyInfo
          && details.proxyInfo.type.substr(0, 4) == 'http'
        ) {
          hit.proxy = details.proxyInfo;
        }
        let contentDisposition = headers['content-disposition'];
        if (contentDisposition) {
          let dispositionMatch =
            dispositionFilenameRegex.exec(contentDisposition);
          if (dispositionMatch && dispositionMatch[1]) {
            hit.headerFilename = dispositionMatch[1];
          }
        }
        let urlMatch = urlFilenameRegex.exec(details.url);
        if (urlMatch) {
          hit.urlFilename = urlMatch[1];
        }
        hit.title =
          hit.headerFilename || hit.urlFilename || probeWeh._('media');
        let tumblrMatch = tumblrVideoRegex.exec(details.url);
        if (tumblrMatch) {
          hit.thumbnailUrl =
            tumblrMatch[1]
            + '://media.tumblr.com/'
            + tumblrMatch[2]
            + '_frame1.jpg';
        }
        if (extMatch) {
          hit.type = 'video';
          hit.extension = extMatch[1];
        } else {
          if (mimeMatch) {
            hit.type = mimeMatch[1];
            hit.extension = mimeMatch[2];
          } else {
            hit.extension = extension;
          }
        }
        hit.headers =
          (requestHeaders
            && requestHeaders.filter(
              header =>
                typeof skippedHeaderNames[header.name.toLowerCase()] > 'u',
            ))
          || [];
        async function resolveWithTab(tab) {
          for (; tab.status != 'complete'; ) {
            await new Promise(resolve => setTimeout(resolve, 500));
            tab = await probeBrowser.tabs.get(tab.id);
          }
          if (tab) {
            hit.tabId = tab.id;
            hit.topUrl = tab.url;
            hit.isPrivate = tab.incognito;
            hit.pageTitle = tab.title;
            hit.title =
              hit.headerFilename
              || tab.title
              || hit.urlFilename
              || probeWeh._('media');
            let specs = await netProbeSmartname.getSpecs(tab.url);
            if (specs) {
              specs.headerFilename = hit.headerFilename;
              specs.urlFilename = hit.urlFilename;
            }
            {
              let scriptResults;
              try {
                scriptResults = await probeBrowser.scripting.executeScript({
                  target: {
                    tabId: tab.id,
                  },
                  func: () => {
                    let selectors = [
                      {
                        sel: "meta[property='og:image:secure_url']",
                        attr: 'content',
                      },
                      {
                        sel: "meta[property='og:image']",
                        attr: 'content',
                      },
                      {
                        sel: "link[as='image']",
                        attr: 'href',
                      },
                      {
                        sel: "link[rel='thumbnail']",
                        attr: 'href',
                      },
                      {
                        sel: "link[rel='image_src']",
                        attr: 'href',
                      },
                      {
                        sel: "meta[property='twitter:image']",
                        attr: 'content',
                      },
                      {
                        sel: 'video',
                        attr: 'poster',
                      },
                      {
                        sel: '#vp-preview',
                        attr: 'data-thumb',
                      },
                    ];
                    for (let selector of selectors) {
                      let elements = document.querySelectorAll(selector.sel);
                      for (let element of elements) {
                        let attrValue = element.getAttribute(selector.attr);
                        if (typeof attrValue == 'string') {
                          try {
                            return new URL(attrValue, window.location.href)
                              .href;
                          } catch {}
                        }
                      }
                    }
                    return null;
                  },
                });
              } catch {}
              if (typeof scriptResults?.[0]?.result == 'string') {
                hit.thumbnailUrl2 = scriptResults[0].result;
              } else {
                hit.thumbnailUrl2 = '/content/images/no-thumbnail.png';
              }
            }
            if (probes) {
              hit.originalId = hit.id;
              for (let probe of probes) {
                await probe.onHitDataAvailable(hit);
              }
            }
            if (hit.frameId >= 0) {
              netProbeUtil
                .executeScriptWithGlobal(
                  {
                    tabId: tab.id,
                  },
                  {
                    _$vdhHitId: hit.id,
                    _$vdhSmartNameSpecs: specs,
                  },
                  '/injected/pagedata.js',
                )
                .catch(err => {
                  probeBrowser.webNavigation
                    .getFrame({
                      tabId: tab.id,
                      frameId: hit.frameId,
                    })
                    .then(frame => {
                      if (frame) {
                        console.warn('pagedata execution error', err.message);
                        netProbeHits.updateOriginal(hit.id, {
                          title: tab.title || hit.title,
                          pageUrl: frame.url,
                          topUrl: tab.url,
                        });
                      }
                    });
                });
            }
          }
          if (!probes) {
            hit.group = hit.id;
            let coreMediaOpt = ResultNone;
            let baseMedia = {
              builder: 'HTTPMedia',
              protocol: 'non-adaptative',
              duration: 'unknown',
              content_length: ResultNone,
            };
            if (hit.length) {
              baseMedia.content_length = resultSome(hit.length);
            }
            {
              if (contentType) {
                let parseResult = parseMimeType(contentType);
                if (parseResult.isErr()) {
                  console.warn("Couldn't not parse mimetype", contentType);
                } else {
                  let { container: container, av_codecs: av_codecs } =
                    parseResult.unwrap();
                  coreMediaOpt = resultSome({
                    ...baseMedia,
                    container: containerByName(container),
                    av: matchAudioVideo(
                      av_codecs,
                      audioCodec => ({
                        codec: makeAudioCodec(audioCodec),
                        bitrate: ResultNone,
                      }),
                      videoCodec => ({
                        codec: makeVideoCodec(videoCodec),
                        fps: ResultNone,
                        dimensions: ResultNone,
                        quality: ResultNone,
                        bitrate: ResultNone,
                      }),
                    ),
                  });
                }
              }
              let extForLookup =
                extMatch?.[1] || hit.headerFilename?.split('.').pop() || '';
              if (coreMediaOpt.isNone()) {
                coreMediaOpt = containerForExtension(extForLookup).map(
                  ([container, kind]) => {
                    let isAudioOnly = kind == 'audio_only';
                    return {
                      ...baseMedia,
                      container: container,
                      av: {
                        audio: isAudioOnly ? unknownAudioTrack() : !1,
                        video: isAudioOnly ? !1 : unknownVideoTrack(),
                      },
                    };
                  },
                );
              }
            }
            if (coreMediaOpt.isSome()) {
              hit.core_media = coreMediaOpt.unwrap();
              fireHttpMediaProbe(hit);
              netProbeStore.dispatch('hit.new', hit);
            }
          }
        }
        if (details.tabId > 0) {
          probeBrowser.tabs.get(details.tabId).then(resolveWithTab);
        } else {
          if (probes && details.initiator?.startsWith('http')) {
            probeBrowser.tabs
              .query({
                url: details.initiator + '/*',
              })
              .then(async tabs => {
                for (let tab of tabs) {
                  await resolveWithTab(tab);
                }
              });
          }
        }
      }
      let headers = {};
      (details.responseHeaders || []).forEach(header => {
        headers[header.name.toLowerCase()] = header.value;
      });
      let contentType = headers['content-type'];
      let mimeMatch = avMimeRegex.exec(contentType);
      let contentLength = parseInt(headers['content-length']);
      if (isNaN(contentLength)) {
        let contentRange = headers['content-range'];
        if (contentRange) {
          let rangeMatch = contentRangeRegex.exec(contentRange);
          if (rangeMatch) {
            contentLength = parseInt(rangeMatch[1]);
          }
        }
      }
      let extMatch = urlExtensionRegex.exec(details.url);
      let extension = null;
      let mediaExtensions = await mediaExtensionSetPromise;
      if (extMatch) {
        if (
          ((extension = extMatch[1].toLowerCase()),
          (extension == 'm4s' && prefs.dashHideM4s)
            || (extension == 'ts' && prefs.mpegtsHideTs))
        ) {
          return;
        }
        if (
          !containerForExtension(extMatch[1]).isSome()
          && !mediaExtensions[extMatch[1]]
        ) {
          extMatch = null;
        }
      }
      let referrer = details.originUrl || details.documentUrl || void 0;
      if (
        soundcloudRegex.test(referrer)
        && contentLength < 1e6
        && contentType == 'audio/mpeg'
      ) {
        return;
      }
      let probes = makeProbesForRequest(details, contentType, requestHeaders);
      if (probes.length > 0) {
        try {
          emitProbe(probes, !0, referrer, requestHeaders, details);
        } catch (err) {
          console.error('Uncaught PostHook error:', err);
        }
      } else {
        let isAvMime =
          mimeMatch && (mimeMatch[1] == 'audio' || mimeMatch[1] == 'video');
        let isLargeMedia =
          !isNaN(contentLength)
          && prefs.mediaweightThreshold > 0
          && contentLength >= prefs.mediaweightThreshold;
        emitProbe(null, isAvMime || isLargeMedia);
      }
    };
    monitoredRequestTypes = [
      'main_frame',
      'sub_frame',
      'xmlhttprequest',
      'object',
      'media',
    ];
    if (probeWeh.browserType == 'firefox') {
      monitoredRequestTypes.push('object_subrequest');
    }
    probeWeh.prefs.then(prefs => {
      if (prefs.networkProbe) {
        startHeadersProbe();
      }
      if (prefs.monitorNetworkRequests) {
        startRequestMonitor();
      }
      prefs.on('networkProbe', (name, enabled) => {
        if (enabled) {
          startHeadersProbe();
        } else {
          stopHeadersProbe();
        }
      });
      prefs.on('monitorNetworkRequests', (name, enabled) => {
        if (enabled) {
          startRequestMonitor();
        } else {
          stopRequestMonitor();
        }
      });
    });
    monitoredRequestHeaders = null;
    handleSendHeaders = details => {
      resolveProxyHeaders(details);
      if (monitoredRequestHeaders) {
        monitoredRequestHeaders[details.requestId] = details.requestHeaders;
      }
    };
    handleRequestError = details => {
      resolveProxyHeaders(details);
      if (monitoredRequestHeaders) {
        delete monitoredRequestHeaders[details.requestId];
      }
    };
    sendHeadersExtraInfo = ['requestHeaders'];
    if (probeBrowser.runtime.getManifest().manifest_version >= 3) {
      sendHeadersExtraInfo.push('extraHeaders');
    }
    proxyHeaderWaiters = {};
  });
  var galleryNs = {};
  defineExports(galleryNs, {
    analyzePage: () => analyzePage,
  });
  async function getActiveTabTarget() {
    let tabs = await galleryBrowser.tabs.query({
      active: !0,
      currentWindow: !0,
    });
    if (tabs.length === 0) {
      throw new Error("Can't find current tab");
    }
    return {
      tabId: tabs[0].id,
    };
  }
  async function analyzePage(tabId) {
    let target;
    if (tabId) {
      target = {
        tabId: tabId,
      };
    } else {
      target = await getActiveTabTarget();
    }
    await galleryBrowser.scripting.insertCSS({
      target: target,
      css: galleryMaskCssBase,
    });
    let prefs = await galleryWeh.prefs;
    await galleryUtil.executeScriptWithGlobal(
      target,
      {
        _$vdhParams: {
          extensions: prefs.medialinkExtensions,
          maxHits: prefs.medialinkMaxHits,
          minFilesPerGroup: prefs.medialinkMinFilesPerGroup,
          minImgSize: prefs.medialinkMinImgSize,
          scanImages: prefs.medialinkScanImages,
          scanLinks: prefs.medialinkScanLinks,
        },
      },
      '/injected/gallery.js',
    );
  }
  function galleryMaskCss(className) {
    return '.vdh-mask.' + className + ' { display: block; }';
  }
  var galleryWeh;
  var galleryBrowser;
  var galleryStore;
  var galleryUtil;
  var galleryProxyHeaders;
  var galleryMaskCssBase;
  var initGallery = defineLazyModule(() => {
    'use strict';

    galleryWeh = requireWeh();
    galleryBrowser = galleryWeh.browser;
    galleryStore = (initStore(), toCommonjs(storeNs));
    galleryUtil = (initCoreUtil(), toCommonjs(coreUtilNs));
    galleryProxyHeaders = (initNetworkProbe(), toCommonjs(proxyHeadersNs));
    galleryMaskCssBase =
      '.vdh-mask { position: absolute; display: none; background-color: rgba(255,0,0,0.5); z-index: 2147483647; }';
    galleryWeh.rpc.listen({
      analyzePage: () => {
        analyzePage();
      },
      galleryGroups: message => {
        Object.keys(message.groups).forEach(groupKey => {
          let group = message.groups[groupKey];
          let title = '??';
          let hostname = '??';
          try {
            hostname = new URL(group.baseUrl).hostname;
          } catch (err) {
            console.warn('Uncaught URL error', err);
          }
          switch (group.type) {
            case 'image':
              title = galleryWeh._('gallery_from_domain', hostname);
              break;
            case 'link':
              title = galleryWeh._('gallery_links_from_domain', hostname);
              break;
          }
          let description;
          if (group.extensions) {
            let extensions = Object.keys(group.extensions);
            extensions.sort(
              (extA, extB) => group.extensions[extA] - group.extensions[extB],
            );
            let typeLabels = [];
            extensions.forEach(ext => {
              let label = galleryWeh._('number_type', [
                '' + group.extensions[ext],
                ext.toUpperCase(),
              ]);
              typeLabels.push(label);
            });
            description = galleryWeh._(
              'gallery_files_types',
              (typeLabels.length > 0 && typeLabels.join(', '))
                || '' + group.urls.length,
            );
          }
          let hitId =
            'gallery:' + galleryUtil.hashHex(message.pageUrl) + ':' + groupKey;
          galleryStore.dispatch(
            'hit.new',
            Object.assign({}, group, {
              gallery_urls: group.urls,
              id: hitId,
              topUrl: message.pageUrl,
              title: title,
              description: description,
              mouseTrack: !0,
            }),
          );
          galleryProxyHeaders.getProxyHeaders(message.pageUrl).then(headers => {
            galleryStore.dispatch('hit.update', {
              id: hitId,
              changes: headers,
            });
          });
        });
      },
      galleryHighlight: async className => {
        galleryBrowser.scripting.insertCSS({
          target: await getActiveTabTarget(),
          css: galleryMaskCss(className),
        });
      },
      galleryUnhighlight: async className => {
        galleryBrowser.scripting.removeCSS({
          target: await getActiveTabTarget(),
          css: galleryMaskCss(className),
        });
      },
    });
    galleryBrowser.tabs.onUpdated.addListener(
      async (tabId, changeInfo, tab) => {
        let prefs = await galleryWeh.prefs;
        if (changeInfo.status === 'complete' && prefs.medialinkAutoDetect) {
          analyzePage(tabId);
        }
      },
    );
  });
  requireEmptySideEffect();
  var appStartup = (async () => {
    let weh = requireWeh();
    let browser = weh.browser;
    let build = requireBuildInfo();
    if (!build.prod) {
      console.info(
        '=========== started',
        new Date().toLocaleTimeString(),
        '==========',
      );
    }
    requireInspect();
    initCoapp();
    initLicense();
    initNetworkProbe();
    initGallery();
    initConversionRules();
    let tabTracker = (initTabTracker(), toCommonjs(tabTrackerNs));
    weh.rpc.listen({
      openSettings: () => {
        weh.ui.open('settings', {
          type: 'tab',
          url: 'content/settings.html',
        });
        weh.ui.close('main');
      },
      openTranslation: () => {
        weh.ui.open('translation', {
          type: 'tab',
          url: 'content/translation.html',
        });
        weh.ui.close('main');
      },
      openSites: () =>
        tabTracker.gotoOrOpenTab(globalThis.extConfig.getUrlValue('sitesUrl')),
      openForum: () =>
        tabTracker.gotoOrOpenTab(
          globalThis.extConfig.getUrlValue('communityDiscussionsUrl'),
        ),
      openHomepage: () =>
        tabTracker.gotoOrOpenTab(
          globalThis.extConfig.getUrlValue('rootWebsiteUrl'),
        ),
      openTranslationForum: () =>
        tabTracker.gotoOrOpenTab(
          globalThis.extConfig.getUrlValue('translationDiscussionsUrl'),
        ),
      openWeh: () => tabTracker.gotoOrOpenTab('https://github.com/mi-g/weh'),
      openAbout: () => {
        weh.ui.open('about', {
          type: 'panel',
          url: 'content/about.html',
        });
        weh.ui.close('main');
      },
      openCoapp: () => {
        weh.ui.open('coappShell', {
          type: 'tab',
          url: 'content/coapp-shell.html',
        });
        weh.ui.close('main');
      },
      goto: url => tabTracker.gotoOrOpenTab(url),
      getBuild: () => build,
      updateLastFocusedWindowHeight: (desiredHeight, contentHeight) => {
        browser.windows.getLastFocused().then(win => {
          if (win) {
            desiredHeight = Math.floor(desiredHeight);
            contentHeight = Math.floor(contentHeight);
            let chromeHeight = Math.floor(win.height) - contentHeight;
            browser.windows.update(win.id, {
              height: desiredHeight + chromeHeight,
            });
          }
        });
      },
      editMediaUserPrefs: () => {
        weh.ui.open('media-user-prefs-edit', {
          type: 'tab',
          url: 'content/media-user-prefs-edit.html',
        });
      },
    });
    return installDetails => {
      let manifest = browser.runtime.getManifest();
      let channel = build.channel;
      let target = build.buildOptions.target;
      let currentVersion = manifest.version.split('.').slice(0, 2).join('.');
      if (installDetails.reason == 'install') {
        tabTracker.gotoOrOpenTab(
          'https://github.com/top-master/ext-VDH/blob/master/README.md',
        );
      } else if (installDetails.reason == 'update') {
        let previousVersion = installDetails.previousVersion
          .split('.')
          .slice(0, 2)
          .join('.');
        if (currentVersion != previousVersion) {
          tabTracker.gotoOrOpenTab(
            'https://github.com/top-master/ext-VDH/releases',
          );
        }
      }
    };
  })();
  (chrome || browser).runtime.onInstalled.addListener(async installDetails => {
    (await appStartup)(installDetails);
  });
})();
/*! Bundled license information:

semver-parser/index.js:
  (*!
   * SemVer Parser
   *
   * @license MIT
   * @copyright asamuzaK (Kazz)
   * @see {@link https://github.com/asamuzaK/semverParser/blob/master/LICENSE}
   * @see {@link https://semver.org/ Semantic Versioning 2.0.0}
   *)

m3u8-parser/dist/m3u8-parser.es.js:
  (*! @name m3u8-parser @version 7.1.0 @license Apache-2.0 *)
*/
