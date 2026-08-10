// The weh ("web extension helpers") runtime is a verbatim vendored copy of the
// upstream framework under ../weh/ (see ../weh/README.md); these three modules
// are the content-page side of it. weh-content pulls in weh-rpc/weh-prefs/weh-i18n
// itself, so only the three with external consumers here are imported.
import wehCoreModule from '../weh/weh.js';
import wehRpcModule from '../weh/weh-rpc.js';
import wehContentModule from '../weh/weh-content.js';
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
  var defineExports = (targetObj, sourceObj) => {
    for (var exportKey in sourceObj) {
      defineProperty(targetObj, exportKey, {
        get: sourceObj[exportKey],
        enumerable: !0,
      });
    }
  };
  var copyProps = (copyTarget, copyFrom, copyExcept, copyDesc) => {
    if (
      (copyFrom && typeof copyFrom == 'object')
      || typeof copyFrom == 'function'
    ) {
      for (let copyKey of getOwnPropNames(copyFrom)) {
        if (
          !hasOwnPropertyRef.call(copyTarget, copyKey)
          && copyKey !== copyExcept
        ) {
          defineProperty(copyTarget, copyKey, {
            get: () => copyFrom[copyKey],
            enumerable:
              !(copyDesc = getOwnPropDesc(copyFrom, copyKey))
              || copyDesc.enumerable,
          });
        }
      }
    }
    return copyTarget;
  };
  var toEsm = (esmMod, esmIsNodeMode, esmTarget) => (
    (esmTarget = esmMod != null ? objectCreate(getPrototypeOf(esmMod)) : {}),
    copyProps(
      esmIsNodeMode || !esmMod || !esmMod.__esModule
        ? defineProperty(esmTarget, 'default', {
            value: esmMod,
            enumerable: !0,
          })
        : esmTarget,
      esmMod,
    )
  );
  var fnVar_wg = defineCommonjsModule((exports, module) => {
    'use strict';

    module.exports = window.React; // de-vendored: React 16.14.0 loaded from content/vendor/react-v16.js
  });
  var fnVar_gt = defineCommonjsModule((paramArg_eM, paramArg__g) => {
    'use strict';

    paramArg__g.exports = fnVar_wg();
  });
  var fnVar_Xl = defineCommonjsModule((exports, module) => {
    'use strict';

    module.exports = window.ReactDOM; // de-vendored: loaded from content/vendor/
  });
  var fnVar_kn = defineCommonjsModule((exports, module) => {
    'use strict';

    module.exports = window.PropTypes; // de-vendored: loaded from content/vendor/
  });
  var fnVar_E0 = defineCommonjsModule((exports, module) => {
    'use strict';

    module.exports = window.reduxLogger; // de-vendored: loaded from content/vendor/
  });
  var fnVar_T0 = defineCommonjsModule((exports, module) => {
    'use strict';

    module.exports = window.classNames; // de-vendored: loaded from content/vendor/
  });
  var fnVar_k_ = defineCommonjsModule((exports, module) => {
    'use strict';

    module.exports = window.__vdhDeepEqual; // de-vendored: loaded from content/vendor/
  });
  var fnVar_qm = defineCommonjsModule((exports, module) => {
    'use strict';

    module.exports = window.__vdhReactJson; // de-vendored: loaded from content/vendor/
  });
  var fnVar_wc = defineCommonjsModule((exports, module) => {
    module.exports = wehCoreModule;
  });
  var fnVar_Qm = defineCommonjsModule((exports, module) => {
    module.exports = wehRpcModule;
  });
  var fnVar_jn = defineCommonjsModule((exports, module) => {
    module.exports = wehContentModule;
  });
  var localVar_A5 = toEsm(fnVar_gt());
  var localVar_j5 = toEsm(fnVar_Xl());
  function helperFn_Hi(valueRef, entryRef) {
    helperFn_Hi = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (countRef, optionRef) {
          countRef.__proto__ = optionRef;
          return countRef;
        };
    return helperFn_Hi(valueRef, entryRef);
  }
  var localVar_Do = toEsm(fnVar_gt());
  var localVar_Rr = toEsm(fnVar_kn());
  var localVar_Ki = localVar_Rr.default.shape({
    trySubscribe: localVar_Rr.default.func.isRequired,
    tryUnsubscribe: localVar_Rr.default.func.isRequired,
    notifyNestedSubs: localVar_Rr.default.func.isRequired,
    isSubscribed: localVar_Rr.default.func.isRequired,
  });
  var localVar_Gi = localVar_Rr.default.shape({
    subscribe: localVar_Rr.default.func.isRequired,
    dispatch: localVar_Rr.default.func.isRequired,
    getState: localVar_Rr.default.func.isRequired,
  });
  var localVar_vM = typeof localVar_Do.default.forwardRef < 'u';
  var localVar_Qd = window.ReactRedux.Provider;
  function helperFn_Ir() {
    helperFn_Ir = Object.assign
      ? Object.assign.bind()
      : function (valueRef) {
          for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
            var resultRef = arguments[entryRef];
            for (var countRef in resultRef) {
              if (Object.prototype.hasOwnProperty.call(resultRef, countRef)) {
                valueRef[countRef] = resultRef[countRef];
              }
            }
          }
          return valueRef;
        };
    return helperFn_Ir.apply(this, arguments);
  }
  var localVar_Fo = toEsm(fnVar_gt());
  var localVar_rp = null;
  var lookupTable_e0 = {
    notify: function () {},
  };
  function helperFn_g3() {
    var valueRef = [];
    var entryRef = [];
    return {
      clear: function () {
        entryRef = localVar_rp;
        valueRef = localVar_rp;
      },
      notify: function () {
        for (
          var countRef = (valueRef = entryRef), optionRef = 0;
          optionRef < countRef.length;
          optionRef++
        ) {
          countRef[optionRef]();
        }
      },
      get: function () {
        return entryRef;
      },
      subscribe: function (countRef) {
        var optionRef = !0;
        if (entryRef === valueRef) {
          entryRef = valueRef.slice();
        }
        entryRef.push(countRef);
        return function () {
          if (!(!optionRef || valueRef === localVar_rp)) {
            optionRef = !1;
            if (entryRef === valueRef) {
              entryRef = valueRef.slice();
            }
            entryRef.splice(entryRef.indexOf(countRef), 1);
          }
        };
      },
    };
  }
  var fnVar_t0 = (function () {
    function valueRef(resultRef, countRef, optionRef) {
      this.store = resultRef;
      this.parentSub = countRef;
      this.onStateChange = optionRef;
      this.unsubscribe = null;
      this.listeners = lookupTable_e0;
    }
    var entryRef = valueRef.prototype;
    entryRef.addNestedSub = function (countRef) {
      this.trySubscribe();
      return this.listeners.subscribe(countRef);
    };
    entryRef.notifyNestedSubs = function () {
      this.listeners.notify();
    };
    entryRef.isSubscribed = function () {
      return !!this.unsubscribe;
    };
    entryRef.trySubscribe = function () {
      if (!this.unsubscribe) {
        this.unsubscribe = this.parentSub
          ? this.parentSub.addNestedSub(this.onStateChange)
          : this.store.subscribe(this.onStateChange);
        this.listeners = helperFn_g3();
      }
    };
    entryRef.tryUnsubscribe = function () {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
        this.listeners.clear();
        this.listeners = lookupTable_e0;
      }
    };
    return valueRef;
  })();
  var localVar_h3 = typeof localVar_Fo.default.forwardRef < 'u';
  var lookupTable_v3 = {};
  var localVar_x3 = Object.prototype.hasOwnProperty;
  var strVar_w3 =
    typeof global == 'object' && global && global.Object === Object && global;
  var localVar_a0 = strVar_w3;
  var strVar__3 =
    typeof self == 'object' && self && self.Object === Object && self;
  var localVar_k3 = localVar_a0 || strVar__3 || Function('return this')();
  var localVar_l0 = localVar_k3;
  var localVar_E3 = localVar_l0.Symbol;
  var localVar_zo = localVar_E3;
  var localVar_s0 = Object.prototype;
  var localVar_T3 = localVar_s0.hasOwnProperty;
  var localVar_S3 = localVar_s0.toString;
  var localVar_Yi = localVar_zo ? localVar_zo.toStringTag : void 0;
  function helperFn_O3(valueRef) {
    var entryRef = localVar_T3.call(valueRef, localVar_Yi);
    var resultRef = valueRef[localVar_Yi];
    try {
      valueRef[localVar_Yi] = void 0;
      var countRef = !0;
    } catch {}
    var optionRef = localVar_S3.call(valueRef);
    if (countRef) {
      if (entryRef) {
        valueRef[localVar_Yi] = resultRef;
      } else {
        delete valueRef[localVar_Yi];
      }
    }
    return optionRef;
  }
  var localVar_c0 = helperFn_O3;
  var localVar_P3 = Object.prototype;
  var localVar_C3 = localVar_P3.toString;
  function helperFn_N3(valueRef) {
    return localVar_C3.call(valueRef);
  }
  var localVar_u0 = helperFn_N3;
  var strVar_M3 = '[object Null]';
  var strVar_A3 = '[object Undefined]';
  var localVar_d0 = localVar_zo ? localVar_zo.toStringTag : void 0;
  function helperFn_j3(valueRef) {
    if (valueRef == null) {
      if (valueRef === void 0) {
        return strVar_A3;
      } else {
        return strVar_M3;
      }
    } else {
      if (localVar_d0 && localVar_d0 in Object(valueRef)) {
        return localVar_c0(valueRef);
      } else {
        return localVar_u0(valueRef);
      }
    }
  }
  var localVar_p0 = helperFn_j3;
  function helperFn_R3(valueRef, entryRef) {
    return function (resultRef) {
      return valueRef(entryRef(resultRef));
    };
  }
  var localVar_f0 = helperFn_R3;
  var objHelper_I3 = localVar_f0(Object.getPrototypeOf, Object);
  var localVar_m0 = objHelper_I3;
  function helperFn_D3(valueRef) {
    return valueRef != null && typeof valueRef == 'object';
  }
  var localVar_g0 = helperFn_D3;
  var strVar_F3 = '[object Object]';
  var localVar_z3 = Function.prototype;
  var localVar_L3 = Object.prototype;
  var localVar_h0 = localVar_z3.toString;
  var localVar_$3 = localVar_L3.hasOwnProperty;
  var localVar_q3 = localVar_h0.call(Object);
  function helperFn_B3(valueRef) {
    if (!localVar_g0(valueRef) || localVar_p0(valueRef) != strVar_F3) {
      return !1;
    }
    var entryRef = localVar_m0(valueRef);
    if (entryRef === null) {
      return !0;
    }
    var resultRef =
      localVar_$3.call(entryRef, 'constructor') && entryRef.constructor;
    return (
      typeof resultRef == 'function'
      && resultRef instanceof resultRef
      && localVar_h0.call(resultRef) == localVar_q3
    );
  }
  var localVar_b0 = helperFn_B3;
  function helperFn_np(valueRef) {
    var entryRef;
    var resultRef = valueRef.Symbol;
    if (typeof resultRef == 'function') {
      if (resultRef.observable) {
        entryRef = resultRef.observable;
      } else {
        entryRef = resultRef('observable');
        resultRef.observable = entryRef;
      }
    } else {
      entryRef = '@@observable';
    }
    return entryRef;
  }
  var localVar_Lo;
  if (typeof self < 'u') {
    localVar_Lo = self;
  } else {
    if (typeof window < 'u') {
      localVar_Lo = window;
    } else {
      if (typeof global < 'u') {
        localVar_Lo = global;
      } else {
        if (typeof module < 'u') {
          localVar_Lo = module;
        } else {
          localVar_Lo = Function('return this')();
        }
      }
    }
  }
  var localVar_U3 = helperFn_np(localVar_Lo);
  var localVar_op = localVar_U3;
  var lookupTable_Xi = {
    INIT: '@@redux/INIT',
  };
  function helperFn_Ji(valueRef, entryRef, resultRef) {
    return window.Redux.createStore.apply(this, arguments); // de-vendored
  }
  function helperFn_ds(valueRef) {
    return window.Redux.combineReducers.apply(this, arguments); // de-vendored
  }
  function helperFn_gr(valueRef, entryRef) {
    return window.Redux.bindActionCreators.apply(this, arguments); // de-vendored
  }
  var objHelper_V3 =
    Object.assign
    || function (valueRef) {
      for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
        var resultRef = arguments[entryRef];
        for (var countRef in resultRef) {
          if (Object.prototype.hasOwnProperty.call(resultRef, countRef)) {
            valueRef[countRef] = resultRef[countRef];
          }
        }
      }
      return valueRef;
    };
  function helperFn_fs() {
    return window.Redux.applyMiddleware.apply(this, arguments); // de-vendored
  }
  function helperFn_Zi(valueRef) {
    return function (resultRef, countRef) {
      var optionRef = valueRef(resultRef, countRef);
      function indexRef() {
        return optionRef;
      }
      indexRef.dependsOnOwnProps = !1;
      return indexRef;
    };
  }
  function helperFn_y0(valueRef) {
    if (
      valueRef.dependsOnOwnProps !== null
      && valueRef.dependsOnOwnProps !== void 0
    ) {
      return !!valueRef.dependsOnOwnProps;
    } else {
      return valueRef.length !== 1;
    }
  }
  function helperFn_ms(valueRef, entryRef) {
    return function (countRef, optionRef) {
      var indexRef = optionRef.displayName;
      var accumulator = function (configRef, unitRef) {
        if (accumulator.dependsOnOwnProps) {
          return accumulator.mapToProps(configRef, unitRef);
        } else {
          return accumulator.mapToProps(configRef);
        }
      };
      accumulator.dependsOnOwnProps = !0;
      accumulator.mapToProps = function (configRef, unitRef) {
        accumulator.mapToProps = valueRef;
        accumulator.dependsOnOwnProps = helperFn_y0(valueRef);
        var propRef = accumulator(configRef, unitRef);
        if (typeof propRef == 'function') {
          accumulator.mapToProps = propRef;
          accumulator.dependsOnOwnProps = helperFn_y0(propRef);
          propRef = accumulator(configRef, unitRef);
        }
        return propRef;
      };
      return accumulator;
    };
  }
  function helperFn_K3(valueRef) {
    if (typeof valueRef == 'function') {
      return helperFn_ms(valueRef, 'mapDispatchToProps');
    } else {
      return void 0;
    }
  }
  function helperFn_G3(valueRef) {
    if (valueRef) {
      return void 0;
    } else {
      return helperFn_Zi(function (entryRef) {
        return {
          dispatch: entryRef,
        };
      });
    }
  }
  function helperFn_Q3(valueRef) {
    if (valueRef && typeof valueRef == 'object') {
      return helperFn_Zi(function (entryRef) {
        return helperFn_gr(valueRef, entryRef);
      });
    } else {
      return void 0;
    }
  }
  var listVar_x0 = [helperFn_K3, helperFn_G3, helperFn_Q3];
  function helperFn_Y3(valueRef) {
    if (typeof valueRef == 'function') {
      return helperFn_ms(valueRef, 'mapStateToProps');
    } else {
      return void 0;
    }
  }
  function helperFn_X3(valueRef) {
    if (valueRef) {
      return void 0;
    } else {
      return helperFn_Zi(function () {
        return {};
      });
    }
  }
  var listVar_w0 = [helperFn_Y3, helperFn_X3];
  function helperFn_J3(valueRef, entryRef, resultRef) {
    return helperFn_Ir({}, resultRef, valueRef, entryRef);
  }
  function helperFn_Z3(valueRef) {
    return function (resultRef, countRef) {
      var optionRef = countRef.displayName;
      var indexRef = countRef.pure;
      var accumulator = countRef.areMergedPropsEqual;
      var listRef = !1;
      var configRef;
      return function (propRef, funcRef, coordY) {
        var outputRef = valueRef(propRef, funcRef, coordY);
        if (listRef) {
          if (!indexRef || !accumulator(outputRef, configRef)) {
            configRef = outputRef;
          }
        } else {
          listRef = !0;
          configRef = outputRef;
        }
        return configRef;
      };
    };
  }
  function helperFn_eE(valueRef) {
    if (typeof valueRef == 'function') {
      return helperFn_Z3(valueRef);
    } else {
      return void 0;
    }
  }
  function helperFn_tE(valueRef) {
    if (valueRef) {
      return void 0;
    } else {
      return function () {
        return helperFn_J3;
      };
    }
  }
  var listVar__0 = [helperFn_eE, helperFn_tE];
  var localVar_Xr = window.ReactRedux.connect;
  var localVar_R5 = toEsm(fnVar_E0());
  var localVar_I5 = toEsm(fnVar_k_());
  var localVar_D5 = toEsm(fnVar_qm());
  var fnVar_Vm = function (valueRef, entryRef) {
    fnVar_Vm =
      Object.setPrototypeOf
      || ({
        __proto__: [],
      } instanceof Array
        && function (resultRef, countRef) {
          resultRef.__proto__ = countRef;
        })
      || function (resultRef, countRef) {
        for (var optionRef in countRef) {
          if (Object.prototype.hasOwnProperty.call(countRef, optionRef)) {
            resultRef[optionRef] = countRef[optionRef];
          }
        }
      };
    return fnVar_Vm(valueRef, entryRef);
  };
  var fnVar_xc = window.__vdhReactResizeDetector;
  var localVar_qt = toEsm(fnVar_gt());
  var localVar_Rn = toEsm(fnVar_jn());
  function helperFn_k5(valueRef, entryRef) {
    if (!valueRef) {
      valueRef = {
        values: localVar_Rn.default.unsafe_prefs.getAll(),
        current: localVar_Rn.default.unsafe_prefs.getAll(),
        specs: localVar_Rn.default.unsafe_prefs.getSpecs(),
        flags: {},
      };
      valueRef.flags = resultRef();
    }
    function resultRef() {
      var countRef = {
        isModified: !1,
        isDefault: !0,
        isValid: !0,
      };
      Object.keys(valueRef.specs || {}).forEach(optionRef => {
        var indexRef = (valueRef.specs || {})[optionRef];
        var accumulator = valueRef.current[optionRef];
        if (indexRef) {
          if (indexRef.defaultValue !== accumulator) {
            countRef.isDefault = !1;
          }
          if (accumulator !== valueRef.values[optionRef]) {
            countRef.isModified = !0;
          }
          if (
            !localVar_Rn.default.unsafe_prefs.isValid(optionRef, accumulator)
          ) {
            countRef.isValid = !1;
          }
        }
      });
      return countRef;
    }
    switch (entryRef.type) {
      case 'PREFS_UPDATED':
        valueRef = Object.assign({}, valueRef, {
          values: Object.assign({}, valueRef.values, entryRef.payload),
          current: Object.assign({}, entryRef.payload, valueRef.current),
        });
        valueRef.flags = resultRef();
        break;
      case 'PREFS_SPECS_UPDATED':
        valueRef = Object.assign({}, valueRef, {
          specs: Object.assign({}, valueRef.specs, entryRef.payload),
        });
        valueRef.flags = resultRef();
        break;
      case 'PREF_UPDATE':
        if (
          valueRef.current[entryRef.payload.prefName] != entryRef.payload.value
        ) {
          valueRef = Object.assign({}, valueRef);
          valueRef.current = Object.assign({}, valueRef.current);
          valueRef.current[entryRef.payload.prefName] = entryRef.payload.value;
          valueRef.flags = resultRef();
        }
        break;
      case 'PREFS_RESET':
        valueRef = Object.assign({}, valueRef);
        Object.keys(valueRef.specs || {}).forEach(countRef => {
          var optionRef = (valueRef.specs || {})[countRef];
          if (optionRef) {
            valueRef.current[countRef] = optionRef.defaultValue;
          }
        });
        valueRef.flags = resultRef();
        break;
      case 'PREFS_CANCEL':
        valueRef = Object.assign({}, valueRef);
        Object.keys(valueRef.specs || {}).forEach(countRef => {
          valueRef.current[countRef] = valueRef.values[countRef];
        });
        valueRef.flags = resultRef();
        break;
      case 'PREFS_SAVE':
        localVar_Rn.default.unsafe_prefs.assign(valueRef.current);
        break;
    }
    return valueRef;
  }
  var localVar_ri = toEsm(fnVar_wc());
  var listVar_O5 = [
    '__MSG_appDesc_',
    'Bytes',
    'GB',
    'KB',
    'MB',
    'about',
    'about_alpha_extra7_fx',
    'about_alpha_intro',
    'about_beta_intro',
    'about_chrome_licenses',
    'about_qr',
    'about_vdh',
    'action_abort_description',
    'action_abort_title',
    'action_as_default',
    'action_avplay_description',
    'action_avplay_title',
    'action_blacklist_description',
    'action_blacklist_title',
    'action_bulkdownload_description',
    'action_bulkdownload_title',
    'action_bulkdownloadconvert_description',
    'action_bulkdownloadconvert_title',
    'action_copyurl_description',
    'action_copyurl_title',
    'action_deletehit_description',
    'action_deletehit_title',
    'action_details_description',
    'action_details_title',
    'action_download_description',
    'action_download_title',
    'action_downloadaudio_description',
    'action_downloadaudio_title',
    'action_downloadconvert_description',
    'action_downloadconvert_title',
    'action_openlocalcontainer_description',
    'action_openlocalcontainer_title',
    'action_openlocalfile_description',
    'action_openlocalfile_title',
    'action_pin_description',
    'action_pin_title',
    'action_quickdownload_description',
    'action_quickdownload_title',
    'action_quickdownloadaudio_description',
    'action_quickdownloadaudio_title',
    'action_quicksidedownload_description',
    'action_quicksidedownload_title',
    'action_sidedownload_description',
    'action_sidedownload_title',
    'action_sidedownloadconvert_description',
    'action_sidedownloadconvert_title',
    'action_stop_description',
    'action_stop_title',
    'adaptative',
    'add_to_blacklist',
    'add_to_blacklist_help',
    'advanced',
    'aggregating',
    'analyze_page',
    'appDesc',
    'appName',
    'appearance',
    'audio_only',
    'behavior',
    'blacklist',
    'blacklist_add_domain',
    'blacklist_add_placeholder',
    'blacklist_edit_descr',
    'blacklist_empty',
    'browser_info',
    'browser_locale',
    'build_options',
    'built_on',
    'bulk_in_progress',
    'bulk_n_videos',
    'cancel',
    'change',
    'chrome_basic_mode',
    'chrome_inapp_descr_premium_lifetime',
    'chrome_inapp_descr_premium_monthly',
    'chrome_inapp_descr_premium_yearly',
    'chrome_inapp_no_subs',
    'chrome_inapp_not_avail',
    'chrome_inapp_premium_lifetime',
    'chrome_inapp_premium_monthly',
    'chrome_inapp_premium_yearly',
    'chrome_install_firefox',
    'chrome_install_fx_vdh',
    'chrome_license_webstore_accepted',
    'chrome_licensing',
    'chrome_noyt_text',
    'chrome_noyt_text2',
    'chrome_noyt_text3',
    'chrome_premium_audio',
    'chrome_premium_check_error',
    'chrome_premium_hls',
    'chrome_premium_mode',
    'chrome_premium_need_sign',
    'chrome_premium_not_signed',
    'chrome_premium_recheck',
    'chrome_premium_required',
    'chrome_premium_source',
    'chrome_product_intro',
    'chrome_req_review',
    'chrome_signing_in',
    'chrome_verif_premium',
    'chrome_verif_premium_error',
    'chrome_warning_yt',
    'clear',
    'clear_hits',
    'clear_logs',
    'coapp',
    'coapp_error',
    'coapp_found',
    'coapp_help',
    'coapp_install',
    'coapp_installed',
    'coapp_latest_version',
    'coapp_not_installed',
    'coapp_outdated',
    'coapp_outofdate',
    'coapp_outofdate_text',
    'coapp_path',
    'coapp_recheck',
    'coapp_required',
    'coapp_required_text',
    'coapp_shell',
    'coapp_unchecked',
    'coapp_update',
    'collecting',
    'confirmation_required',
    'congratulations',
    'continue',
    'convconf_2passes',
    'convconf_ac',
    'convconf_acnone',
    'convconf_acodec',
    'convconf_aspect',
    'convconf_audiobitrate',
    'convconf_audiofreq',
    'convconf_audioonly',
    'convconf_bitrate',
    'convconf_container',
    'convconf_duplicate',
    'convconf_ext',
    'convconf_extra',
    'convconf_level',
    'convconf_mono',
    'convconf_new',
    'convconf_preset',
    'convconf_profilev',
    'convconf_rate',
    'convconf_readonly',
    'convconf_remove',
    'convconf_reset',
    'convconf_reset_confirm',
    'convconf_save',
    'convconf_size',
    'convconf_stereo',
    'convconf_target',
    'convconf_tune',
    'convconf_vcodec',
    'convconf_videobitrate',
    'conversion_create_rule',
    'conversion_outputs',
    'conversion_rules',
    'conversion_update_rule',
    'convert',
    'convert_local_files',
    'converter_needed_aggregate',
    'converter_needed_aggregate_why',
    'converter_needs_reg',
    'converter_queued',
    'converter_reg_audio',
    'converting',
    'convrule_convert',
    'convrule_domain',
    'convrule_extension',
    'convrule_format',
    'convrule_from_domain',
    'convrule_no_convert',
    'convrule_output_format',
    'convrule_refresh_formats',
    'convrule_with_ext',
    'convrules_add_rule',
    'convrules_edit_descr',
    'convrules_empty',
    'copy_of',
    'copy_settings_info_to_clipboard',
    'copy_settings_info_to_clipboard_success',
    'corrupted_media_file',
    'create',
    'custom_output',
    'dash_streaming',
    'default',
    'details_parenthesis',
    'dev_build',
    'dialog_audio_impossible',
    'dialog_audio_impossible_title',
    'directory_not_exist',
    'directory_not_exist_body',
    'dlconv_download_and_convert',
    'dlconv_output_details',
    'donate',
    'donate_vdh',
    'download_error',
    'download_method',
    'download_method_not_again',
    'download_modes1',
    'download_modes2',
    'download_with_browser',
    'download_with_coapp',
    'downloading',
    'edge_req_review',
    'error',
    'error_not_directory',
    'errors',
    'exit_natmsgsh',
    'explain_qr1',
    'explain_qr2',
    'export',
    'failed_aggregating',
    'failed_converting',
    'failed_getting_info',
    'failed_opening_directory',
    'failed_playing_file',
    'file_dialog_date',
    'file_dialog_name',
    'file_dialog_size',
    'file_generated',
    'file_ready',
    'finalizing',
    'from_domain',
    'gallery',
    'gallery_files_types',
    'gallery_from_domain',
    'gallery_links_from_domain',
    'general',
    'get_conversion_license',
    'help_translating',
    'hit_details',
    'hit_go_to_tab',
    'hls_streaming',
    'homepage',
    'import',
    'import_invalid_format',
    'in_current_tab',
    'in_other_tab',
    'lic_mismatch1',
    'lic_mismatch2',
    'lic_not_needed_linux',
    'lic_status_accepted',
    'lic_status_blocked',
    'lic_status_error',
    'lic_status_locked',
    'lic_status_mismatch',
    'lic_status_nocoapp',
    'lic_status_unneeded',
    'lic_status_unset',
    'lic_status_unverified',
    'lic_status_verifying',
    'license',
    'license_key',
    'licensing',
    'live_stream',
    'logs',
    'media',
    'merge_error',
    'merge_local_files',
    'more',
    'mup_best_video_quality',
    'mup_ignore_low_quality',
    'mup_ignore_low_quality_help',
    'mup_ignored_containers',
    'mup_ignored_video_codecs',
    'mup_lowest_video_quality',
    'mup_max_variants',
    'mup_max_variants_help',
    'mup_page_title',
    'mup_prefer_60fps',
    'mup_prefered_container',
    'mup_prefered_video_codecs',
    'mup_reset',
    'mup_saved',
    'network_error_no_response',
    'network_error_status',
    'new_sub_directory',
    'next',
    'no',
    'no_audio_in_file',
    'no_coapp_license_unverified',
    'no_license_registered',
    'no_media_current_tab',
    'no_media_to_process',
    'no_media_to_process_descr',
    'no_such_hit',
    'no_validate_without_coapp',
    'no_video_in_file',
    'not_again_3months',
    'not_see_again',
    'number_type',
    'ok',
    'orphan',
    'output_configuration',
    'overwrite_file',
    'per_month',
    'per_year',
    'pinned',
    'platform',
    'platform_info',
    'powered_by_weh',
    'preferences',
    'prod_build',
    'quality_medium',
    'quality_small',
    'queued',
    'recheck_license',
    'register_converter',
    'register_existing_license',
    'registered_email',
    'registered_key',
    'reload_addon',
    'reload_addon_confirm',
    'req_donate',
    'req_locale',
    'req_review',
    'req_review_link',
    'reset_settings',
    'running',
    'save',
    'save_as',
    'save_file_as',
    'select_audio_file_to_merge',
    'select_files_to_convert',
    'select_output_config',
    'select_output_directory',
    'select_video_file_to_merge',
    'selected_media',
    'settings',
    'smartname_add_domain',
    'smartname_create_rule',
    'smartname_define',
    'smartname_edit_descr',
    'smartname_empty',
    'smartname_update_rule',
    'smartnamer_delay',
    'smartnamer_domain',
    'smartnamer_get_name_from_header_url',
    'smartnamer_get_name_from_page_content',
    'smartnamer_get_name_from_page_title',
    'smartnamer_get_obfuscated_name',
    'smartnamer_regexp',
    'smartnamer_selected_text',
    'smartnamer_xpath_expr',
    'smartnaming_rule',
    'smartnaming_rules',
    'sub_directory_name',
    'support_forum',
    'supported_sites',
    'tbsn_quality_hd',
    'tbsn_quality_sd',
    'tell_me_more',
    'title',
    'translation',
    'up',
    'validate_license',
    'variants_list_adp',
    'variants_list_full',
    'vdh_notification',
    'version',
    'video_only',
    'video_qualities',
    'weh_prefs_alertDialogType_option_panel',
    'weh_prefs_alertDialogType_option_tab',
    'weh_prefs_coappDownloads_option_ask',
    'weh_prefs_coappDownloads_option_browser',
    'weh_prefs_coappDownloads_option_coapp',
    'weh_prefs_dashOnAdp_option_audio',
    'weh_prefs_dashOnAdp_option_audio_video',
    'weh_prefs_dashOnAdp_option_video',
    'weh_prefs_description_adpHide',
    'weh_prefs_description_alertDialogType',
    'weh_prefs_description_autoPin',
    'weh_prefs_description_avplayEnabled',
    'weh_prefs_description_blacklistEnabled',
    'weh_prefs_description_bulkEnabled',
    'weh_prefs_description_checkCoappOnStartup',
    'weh_prefs_description_chunkedCoappDataRequests',
    'weh_prefs_description_chunkedCoappManifestsRequests',
    'weh_prefs_description_chunksConcurrentDownloads',
    'weh_prefs_description_chunksEnabled',
    'weh_prefs_description_chunksPrefetchCount',
    'weh_prefs_description_coappDownloads',
    'weh_prefs_description_coappIdleExit',
    'weh_prefs_description_coappRestartDelay',
    'weh_prefs_description_coappUseProxy',
    'weh_prefs_description_contentRedirectEnabled',
    'weh_prefs_description_contextMenuEnabled',
    'weh_prefs_description_convertControlledMax',
    'weh_prefs_description_converterAggregTuneH264',
    'weh_prefs_description_converterKeepTmpFiles',
    'weh_prefs_description_converterThreads',
    'weh_prefs_description_dashEnabled',
    'weh_prefs_description_dashHideM4s',
    'weh_prefs_description_dashOnAdp',
    'weh_prefs_description_dialogAutoClose',
    'weh_prefs_description_downloadControlledMax',
    'weh_prefs_description_downloadRetries',
    'weh_prefs_description_downloadRetryDelay',
    'weh_prefs_description_downloadStreamControlledMax',
    'weh_prefs_description_fileDialogType',
    'weh_prefs_description_galleryNaming',
    'weh_prefs_description_hitsGotoTab',
    'weh_prefs_description_hlsDownloadAsM2ts',
    'weh_prefs_description_hlsEnabled',
    'weh_prefs_description_hlsEndTimeout',
    'weh_prefs_description_hlsRememberPrevLiveChunks',
    'weh_prefs_description_iconActivation',
    'weh_prefs_description_iconBadge',
    'weh_prefs_description_ignoreProtectedVariants',
    'weh_prefs_description_lastDownloadDirectory',
    'weh_prefs_description_mediaExtensions',
    'weh_prefs_description_medialinkAutoDetect',
    'weh_prefs_description_medialinkExtensions',
    'weh_prefs_description_medialinkMaxHits',
    'weh_prefs_description_medialinkMinFilesPerGroup',
    'weh_prefs_description_medialinkMinImgSize',
    'weh_prefs_description_medialinkScanImages',
    'weh_prefs_description_medialinkScanLinks',
    'weh_prefs_description_mediaweightMinSize',
    'weh_prefs_description_mediaweightThreshold',
    'weh_prefs_description_monitorNetworkRequests',
    'weh_prefs_description_mpegtsHideTs',
    'weh_prefs_description_networkFilterOut',
    'weh_prefs_description_networkProbe',
    'weh_prefs_description_noPrivateNotification',
    'weh_prefs_description_notifyReady',
    'weh_prefs_description_orphanExpiration',
    'weh_prefs_description_qualitiesMaxVariants',
    'weh_prefs_description_rememberLastDir',
    'weh_prefs_description_smartnamerFnameMaxlen',
    'weh_prefs_description_smartnamerFnameSpaces',
    'weh_prefs_description_tbsnEnabled',
    'weh_prefs_description_titleMode',
    'weh_prefs_description_toolsMenuEnabled',
    'weh_prefs_description_use_native_filepicker',
    'weh_prefs_fileDialogType_option_panel',
    'weh_prefs_fileDialogType_option_tab',
    'weh_prefs_galleryNaming_option_index_url',
    'weh_prefs_galleryNaming_option_type_index',
    'weh_prefs_galleryNaming_option_url',
    'weh_prefs_iconActivation_option_anytab',
    'weh_prefs_iconActivation_option_currenttab',
    'weh_prefs_iconBadge_option_activetab',
    'weh_prefs_iconBadge_option_anytab',
    'weh_prefs_iconBadge_option_mixed',
    'weh_prefs_iconBadge_option_none',
    'weh_prefs_iconBadge_option_pinned',
    'weh_prefs_iconBadge_option_tasks',
    'weh_prefs_label_adpHide',
    'weh_prefs_label_alertDialogType',
    'weh_prefs_label_autoPin',
    'weh_prefs_label_avplayEnabled',
    'weh_prefs_label_blacklistEnabled',
    'weh_prefs_label_bulkEnabled',
    'weh_prefs_label_checkCoappOnStartup',
    'weh_prefs_label_chunkedCoappDataRequests',
    'weh_prefs_label_chunkedCoappManifestsRequests',
    'weh_prefs_label_chunksConcurrentDownloads',
    'weh_prefs_label_chunksEnabled',
    'weh_prefs_label_chunksPrefetchCount',
    'weh_prefs_label_coappDownloads',
    'weh_prefs_label_coappIdleExit',
    'weh_prefs_label_coappRestartDelay',
    'weh_prefs_label_coappUseProxy',
    'weh_prefs_label_contentRedirectEnabled',
    'weh_prefs_label_contextMenuEnabled',
    'weh_prefs_label_convertControlledMax',
    'weh_prefs_label_converterAggregTuneH264',
    'weh_prefs_label_converterKeepTmpFiles',
    'weh_prefs_label_converterThreads',
    'weh_prefs_label_dashEnabled',
    'weh_prefs_label_dashHideM4s',
    'weh_prefs_label_dashOnAdp',
    'weh_prefs_label_dialogAutoClose',
    'weh_prefs_label_downloadControlledMax',
    'weh_prefs_label_downloadRetries',
    'weh_prefs_label_downloadRetryDelay',
    'weh_prefs_label_downloadStreamControlledMax',
    'weh_prefs_label_fileDialogType',
    'weh_prefs_label_galleryNaming',
    'weh_prefs_label_hitsGotoTab',
    'weh_prefs_label_hlsDownloadAsM2ts',
    'weh_prefs_label_hlsEnabled',
    'weh_prefs_label_hlsEndTimeout',
    'weh_prefs_label_hlsRememberPrevLiveChunks',
    'weh_prefs_label_iconActivation',
    'weh_prefs_label_iconBadge',
    'weh_prefs_label_ignoreProtectedVariants',
    'weh_prefs_label_lastDownloadDirectory',
    'weh_prefs_label_mediaExtensions',
    'weh_prefs_label_medialinkAutoDetect',
    'weh_prefs_label_medialinkExtensions',
    'weh_prefs_label_medialinkMaxHits',
    'weh_prefs_label_medialinkMinFilesPerGroup',
    'weh_prefs_label_medialinkMinImgSize',
    'weh_prefs_label_medialinkScanImages',
    'weh_prefs_label_medialinkScanLinks',
    'weh_prefs_label_mediaweightMinSize',
    'weh_prefs_label_mediaweightThreshold',
    'weh_prefs_label_monitorNetworkRequests',
    'weh_prefs_label_mpegtsHideTs',
    'weh_prefs_label_networkFilterOut',
    'weh_prefs_label_networkProbe',
    'weh_prefs_label_noPrivateNotification',
    'weh_prefs_label_notifyReady',
    'weh_prefs_label_orphanExpiration',
    'weh_prefs_label_qualitiesMaxVariants',
    'weh_prefs_label_rememberLastDir',
    'weh_prefs_label_smartnamerFnameMaxlen',
    'weh_prefs_label_smartnamerFnameSpaces',
    'weh_prefs_label_tbsnEnabled',
    'weh_prefs_label_tbvwsExtractionMethod',
    'weh_prefs_label_titleMode',
    'weh_prefs_label_toolsMenuEnabled',
    'weh_prefs_label_use_native_filepicker',
    'weh_prefs_smartnamerFnameSpaces_option_hyphen',
    'weh_prefs_smartnamerFnameSpaces_option_keep',
    'weh_prefs_smartnamerFnameSpaces_option_remove',
    'weh_prefs_smartnamerFnameSpaces_option_underscore',
    'weh_prefs_titleMode_option_left',
    'weh_prefs_titleMode_option_multiline',
    'weh_prefs_titleMode_option_right',
    'yes',
    'you_downloaded_n_videos',
    'v9_yes',
    'v9_no',
    'v9_error',
    'v9_no_media_current_tab',
    'v9_no_media_to_process_descr',
    'v9_coapp_required',
    'v9_coapp_required_text',
    'v9_coapp_help',
    'v9_coapp_installed',
    'v9_coapp_recheck',
    'v9_coapp_outdated',
    'v9_dialog_audio_impossible_title',
    'v9_dialog_audio_impossible',
    'v9_converter_needs_reg',
    'v9_get_conversion_license',
    'v9_converter_reg_audio',
    'v9_chrome_premium_required',
    'v9_chrome_premium_hls',
    'v9_chrome_warning_yt',
    'v9_chrome_noyt_text3',
    'v9_chrome_noyt_text2',
    'v9_about_qr',
    'v9_explain_qr1',
    'v9_not_see_again',
    'v9_tell_me_more',
    'v9_settings',
    'v9_copy_settings_info_to_clipboard',
    'v9_coapp_unchecked',
    'v9_coapp_update',
    'v9_coapp_not_installed',
    'v9_coapp_install',
    'v9_no_validate_without_coapp',
    'v9_lic_status_verifying',
    'v9_weh_prefs_label_downloadControlledMax',
    'v9_mup_max_variants',
    'v9_weh_prefs_description_contextMenuEnabled',
    'v9_vdh_notification',
    'v9_file_ready',
    'v9_lic_status_unset',
    'v9_lic_status_blocked',
    'v9_lic_status_locked2',
    'v9_lic_mismatch2',
    'v9_lic_status_accepted',
    'v9_no_license_registered',
    'v9_panel_view_show_all_tabs',
    'v9_panel_view_show_low_quality',
    'v9_panel_view_sort_status',
    'v9_panel_view_sort_reverse',
    'v9_panel_view_clean',
    'v9_panel_view_clean_all',
    'v9_panel_view_open_settings',
    'v9_panel_downloadable_variant_no_details',
    'v9_panel_variant_menu_prefer_quality',
    'v9_panel_variant_menu_prefer_format',
    'v9_panel_downloaded_retry_tooltip',
    'v9_panel_downloaded_delete_file_tooltip',
    'v9_panel_downloaded_show_dir_tooltip',
    'v9_panel_downloading_stop',
    'v9_panel_error_report_button2',
    'v9_panel_error_reported_button',
    'v9_panel_error_unknown_description',
    'v9_panel_error_coapp_failure_title',
    'v9_panel_error_coapp_failure_description',
    'v9_panel_footer_show_in_sidebar_tooltip',
    'v9_panel_footer_show_in_popup_tooltip',
    'v9_panel_footer_clean_tooltip',
    'v9_panel_footer_clean_all_tooltip',
    'v9_panel_footer_convert_local_tooltip',
    'v9_panel_error_nocoapp_button_install',
    'v9_panel_error_coapp_too_old_button_udpate',
    'v9_short_help',
    'v9_settings_button_reset',
    'v9_settings_button_import',
    'v9_settings_button_export',
    'v9_settings_button_reload',
    'v9_settings_download_directory',
    'v9_settings_download_directory_change',
    'v9_settings_variants_title',
    'v9_settings_variants_clear',
    'v9_settings_checkbox_force_inbrowser',
    'v9_settings_checkbox_notification',
    'v9_settings_checkbox_notification_incognito',
    'v9_settings_checkbox_thumbnail_in_notification',
    'v9_settings_checkbox_forget_on_close',
    'v9_settings_checkbox_view_convert_local',
    'v9_settings_checkbox_use_wide_ui',
    'v9_settings_checkbox_use_legacy_ui',
    'v9_settings_license_placeholder',
    'v9_settings_license_check',
    'v9_settings_license_get',
    'v9_settings_theme_title',
    'v9_settings_theme_system',
    'v9_settings_theme_light',
    'v9_settings_theme_dark',
    'v9_badge_new',
    'v9_panel_download_button_label',
    'v9_panel_download_as_button_label',
    'v9_panel_download_audio_button_label',
    'v9_panel_copy_url_button_label',
    'v9_panel_view_hide_downloaded',
    'v9_user_message_auto_hide_downloaded',
    'v9_checkbox_remember_action',
    'v9_menu_item_download_and_convert',
    'v9_menu_item_details',
    'v9_menu_item_smartnaming',
    'v9_menu_item_blacklist',
    'v9_menu_item_blacklist_media',
    'v9_menu_item_blacklist_page',
    'v9_menu_item_blacklist_domain',
    'v9_blacklist_glob',
    'v9_smartnaming_title',
    'v9_smartnaming_reset_for',
    'v9_smartnaming_save_for',
    'v9_smartnaming_reset_for_all',
    'v9_smartnaming_save_for_all',
    'v9_smartnaming_template',
    'v9_smartnaming_max_length',
    'v9_smartnaming_selector',
    'v9_smartnaming_result',
    'v9_smartnaming_test',
    'v9_filepicker_select_file',
    'v9_filepicker_select_download_dir',
    'v9_reset',
    'v9_save',
    'v9_user_message_no_incognito_title',
    'v9_user_message_no_incognito_body',
    'v9_user_message_no_incognito_open_settings',
    'v9_yt_bulk_detected',
    'v9_yt_bulk_detected_trigger',
    'v9_user_message_one_hundred_downloads',
    'v9_user_message_one_hundred_downloads_body',
    'v9_user_message_one_hundred_downloads_leave_review',
    'v9_user_message_one_hundred_downloads_never_show_again',
    'v9_panel_footer_show_history_tooltip',
    'v9_history_page_title',
    'v9_history_button_clear',
    'v9_history_button_start_recording',
    'v9_history_button_stop_recording',
    'v9_history_no_recording_description',
    'v9_history_no_recording_description_safe',
    'v9_history_no_entries',
    'v9_history_input_search',
    'v9_settings_history_limit',
    'v9_date_today',
    'v9_date_yesterday',
    'v9_date_x_days_ago',
    'v9_date_long_ago',
  ];
  var lookupTable_G4 = {
    keys: listVar_O5,
    custom: {},
    modified: {},
  };
  function helperFn_C5(valueRef = lookupTable_G4, entryRef) {
    switch (entryRef.type) {
      case 'UPDATE_STRING':
        valueRef = Object.assign({}, valueRef, {
          modified: Object.assign({}, valueRef.modified),
        });
        if (
          valueRef.custom[entryRef.payload.key] === entryRef.payload.value
          || (typeof valueRef.custom[entryRef.payload.key] > 'u'
            && entryRef.payload.value.trim() === '')
        ) {
          delete valueRef.modified[entryRef.payload.key];
        } else {
          valueRef.modified[entryRef.payload.key] = entryRef.payload.value;
        }
        break;
      case 'SAVE':
        valueRef = Object.assign({}, valueRef, {
          custom: Object.assign({}, valueRef.custom, valueRef.modified),
          modified: {},
        });
        var resultRef = {};
        Object.keys(valueRef.custom).forEach(countRef => {
          resultRef[countRef] = {
            message: valueRef.custom[countRef],
          };
        });
        localVar_ri.browser.storage.local.set({
          wehI18nCustom: resultRef,
        });
        break;
      case 'CANCEL':
        valueRef = Object.assign({}, valueRef, {
          modified: {},
        });
        break;
      case 'IMPORT':
        valueRef = Object.assign({}, valueRef, {
          modified: entryRef.payload,
        });
        break;
      case 'RESET':
        valueRef = Object.assign({}, valueRef, {
          modified: {},
          custom: {},
        });
        break;
      case 'RESTORE':
        var resultRef = {};
        Object.keys(entryRef.payload).forEach(countRef => {
          resultRef[countRef] = entryRef.payload[countRef].message;
        });
        valueRef = Object.assign({}, valueRef, {
          custom: resultRef,
          modified: {},
        });
        break;
    }
    return valueRef;
  }
  var localVar_og = toEsm(fnVar_Qm());
  var localVar_ig = toEsm(fnVar_jn());
  window.React = localVar_A5.default;
  window.render = localVar_j5.render;
  window.Provider = localVar_Qd;
  window.connect = localVar_Xr;
  window.applyMiddleware = helperFn_fs;
  window.createStore = helperFn_Ji;
  window.combineReducers = helperFn_ds;
  window.bindActionCreators = helperFn_gr;
  window.logger = localVar_R5.default;
  window.deepEqual = localVar_I5.default;
  window.ReactJson = localVar_D5.default;
  window.ReactResizeDetector = fnVar_xc;
  window.prefsSettingsReducer = helperFn_k5;
  window.translateReducer = helperFn_C5;
  window.weh = localVar_ig.default;
  // reactstrap is now an external vendor script (window.Reactstrap, loaded from
  // /vendor/reactstrap.js); fan its components out onto window like before.
  Object.keys(window.Reactstrap || {}).forEach(valueRef => {
    window[valueRef] = window.Reactstrap[valueRef];
  });
  window.browser = localVar_ig.default.browser;
export const weh = localVar_ig.default;
export const wehRpc = localVar_og.default;
