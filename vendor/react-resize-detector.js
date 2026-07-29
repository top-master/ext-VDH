/*
 * react-resize-detector: a React component/HOC that reports element size changes.
 * Extracted from the extension's content-libs.js bundle (no clean CDN UMD
 * build with a browser global exists for it); kept as-is and exposed as
 * window.__vdhReactResizeDetector so content-libs.js can load it as a vendored asset.
 */
"use strict";
(() => {
  var objectCreate = Object.create;
  var defineProperty = Object.defineProperty;
  var getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var getOwnPropNames = Object.getOwnPropertyNames;
  var getPrototypeOf = Object.getPrototypeOf;
  var hasOwnPropertyRef = Object.prototype.hasOwnProperty;
  var defineCommonjsModule = (defineModule, cachedExports) => () => (cachedExports || defineModule((cachedExports = {
        exports: {}
      })
      .exports, cachedExports), cachedExports.exports);
  var defineExports = (targetObj, sourceObj) => {
      for (var exportKey in sourceObj) defineProperty(targetObj, exportKey, {
        get: sourceObj[exportKey],
        enumerable: !0
      })
    };
  var copyProps = (copyTarget, copyFrom, copyExcept, copyDesc) => {
      if (copyFrom && typeof copyFrom == "object" || typeof copyFrom == "function")
        for (let copyKey of getOwnPropNames(copyFrom)) !hasOwnPropertyRef.call(copyTarget, copyKey) && copyKey !== copyExcept && defineProperty(copyTarget, copyKey, {
          get: () => copyFrom[copyKey],
          enumerable: !(copyDesc = getOwnPropDesc(copyFrom, copyKey)) || copyDesc.enumerable
        });
      return copyTarget
    };
  var toEsm = (esmMod, esmIsNodeMode, esmTarget) => (esmTarget = esmMod != null ? objectCreate(getPrototypeOf(esmMod)) : {}, copyProps(esmIsNodeMode || !esmMod || !esmMod
    .__esModule ? defineProperty(esmTarget, "default", {
      value: esmMod,
      enumerable: !0
    }) : esmTarget, esmMod));
  var fnVar_wg = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.React; // de-vendored: React 16.14.0 loaded from content/vendor/react-v16.js
  });
  var fnVar_gt = defineCommonjsModule((paramArg_eM, paramArg__g) => {
    "use strict";
    paramArg__g.exports = fnVar_wg()
  });
  var fnVar_Xl = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.ReactDOM; // de-vendored: loaded from content/vendor/
  });
  var fnVar_yc = defineCommonjsModule((paramArg_Sj, paramArg_E_) => {
    function helperFn_KN(valueRef) {
      var entryRef = typeof valueRef;
      return valueRef != null && (entryRef == "object" || entryRef == "function")
    }
    paramArg_E_.exports = helperFn_KN
  });
  var fnVar_S_ = defineCommonjsModule((paramArg_Oj, paramArg_T_) => {
    var strVar_GN = typeof global == "object" && global && global.Object ===
      Object && global;
    paramArg_T_.exports = strVar_GN
  });
  var fnVar_Bm = defineCommonjsModule((paramArg_Pj, paramArg_O_) => {
    var localVar_QN = fnVar_S_(),
      strVar_YN = typeof self == "object" && self && self.Object === Object &&
      self,
      localVar_XN = localVar_QN || strVar_YN || Function("return this")();
    paramArg_O_.exports = localVar_XN
  });
  var fnVar_C_ = defineCommonjsModule((paramArg_Cj, paramArg_P_) => {
    var localVar_JN = fnVar_Bm(),
      fnVar_ZN = function() {
        return localVar_JN.Date.now()
      };
    paramArg_P_.exports = fnVar_ZN
  });
  var fnVar_M_ = defineCommonjsModule((paramArg_Nj, paramArg_N_) => {
    var localVar_e4 = /\s/;

    function helperFn_t4(valueRef) {
      for (var entryRef = valueRef.length; entryRef-- && localVar_e4.test(valueRef.charAt(entryRef)););
      return entryRef
    }
    paramArg_N_.exports = helperFn_t4
  });
  var fnVar_j_ = defineCommonjsModule((paramArg_Mj, paramArg_A_) => {
    var localVar_r4 = fnVar_M_(),
      localVar_n4 = /^\s+/;

    function helperFn_o4(valueRef) {
      return valueRef && valueRef.slice(0, localVar_r4(valueRef) + 1)
        .replace(localVar_n4, "")
    }
    paramArg_A_.exports = helperFn_o4
  });
  var fnVar_Um = defineCommonjsModule((paramArg_Aj, paramArg_R_) => {
    var localVar_i4 = fnVar_Bm(),
      localVar_a4 = localVar_i4.Symbol;
    paramArg_R_.exports = localVar_a4
  });
  var fnVar_z_ = defineCommonjsModule((paramArg_jj, paramArg_F_) => {
    var localVar_I_ = fnVar_Um(),
      localVar_D_ = Object.prototype,
      localVar_l4 = localVar_D_.hasOwnProperty,
      localVar_s4 = localVar_D_.toString,
      localVar_ka = localVar_I_ ? localVar_I_.toStringTag : void 0;

    function helperFn_c4(valueRef) {
      var entryRef = localVar_l4.call(valueRef, localVar_ka),
        resultRef = valueRef[localVar_ka];
      try {
        valueRef[localVar_ka] = void 0;
        var countRef = !0
      } catch {}
      var optionRef = localVar_s4.call(valueRef);
      return countRef && (entryRef ? valueRef[localVar_ka] = resultRef : delete valueRef[localVar_ka]), optionRef
    }
    paramArg_F_.exports = helperFn_c4
  });
  var fnVar_$_ = defineCommonjsModule((paramArg_Rj, paramArg_L_) => {
    var localVar_u4 = Object.prototype,
      localVar_d4 = localVar_u4.toString;

    function helperFn_p4(valueRef) {
      return localVar_d4.call(valueRef)
    }
    paramArg_L_.exports = helperFn_p4
  });
  var fnVar_W_ = defineCommonjsModule((paramArg_Ij, paramArg_U_) => {
    var localVar_q_ = fnVar_Um(),
      localVar_f4 = fnVar_z_(),
      localVar_m4 = fnVar_$_(),
      strVar_g4 = "[object Null]",
      strVar_h4 = "[object Undefined]",
      localVar_B_ = localVar_q_ ? localVar_q_.toStringTag : void 0;

    function helperFn_b4(valueRef) {
      return valueRef == null ? valueRef === void 0 ? strVar_h4 : strVar_g4 : localVar_B_ && localVar_B_ in Object(valueRef) ?
        localVar_f4(valueRef) : localVar_m4(valueRef)
    }
    paramArg_U_.exports = helperFn_b4
  });
  var fnVar_V_ = defineCommonjsModule((paramArg_Dj, paramArg_H_) => {
    function helperFn_v4(valueRef) {
      return valueRef != null && typeof valueRef == "object"
    }
    paramArg_H_.exports = helperFn_v4
  });
  var fnVar_G_ = defineCommonjsModule((paramArg_Fj, paramArg_K_) => {
    var localVar_y4 = fnVar_W_(),
      localVar_x4 = fnVar_V_(),
      strVar_w4 = "[object Symbol]";

    function helperFn__4(valueRef) {
      return typeof valueRef == "symbol" || localVar_x4(valueRef) && localVar_y4(valueRef) == strVar_w4
    }
    paramArg_K_.exports = helperFn__4
  });
  var fnVar_J_ = defineCommonjsModule((paramArg_zj, paramArg_X_) => {
    var localVar_k4 = fnVar_j_(),
      localVar_Q_ = fnVar_yc(),
      localVar_E4 = fnVar_G_(),
      localVar_Y_ = NaN,
      localVar_T4 = /^[-+]0x[0-9a-f]+$/i,
      localVar_S4 = /^0b[01]+$/i,
      localVar_O4 = /^0o[0-7]+$/i,
      localVar_P4 = parseInt;

    function helperFn_C4(valueRef) {
      if (typeof valueRef == "number") return valueRef;
      if (localVar_E4(valueRef)) return localVar_Y_;
      if (localVar_Q_(valueRef)) {
        var entryRef = typeof valueRef.valueOf == "function" ? valueRef.valueOf() : valueRef;
        valueRef = localVar_Q_(entryRef) ? entryRef + "" : entryRef
      }
      if (typeof valueRef != "string") return valueRef === 0 ? valueRef : +valueRef;
      valueRef = localVar_k4(valueRef);
      var resultRef = localVar_S4.test(valueRef);
      return resultRef || localVar_O4.test(valueRef) ? localVar_P4(valueRef.slice(2), resultRef ? 2 : 8) : localVar_T4.test(valueRef) ?
        localVar_Y_ : +valueRef
    }
    paramArg_X_.exports = helperFn_C4
  });
  var fnVar_Hm = defineCommonjsModule((paramArg_Lj, paramArg_e5) => {
    var localVar_N4 = fnVar_yc(),
      localVar_Wm = fnVar_C_(),
      localVar_Z_ = fnVar_J_(),
      strVar_M4 = "Expected a function",
      localVar_A4 = Math.max,
      localVar_j4 = Math.min;

    function helperFn_R4(valueRef, entryRef, resultRef) {
      var countRef, optionRef, indexRef, accumulator, listRef, configRef, unitRef = 0,
        propRef = !1,
        funcRef = !1,
        coordY = !0;
      if (typeof valueRef != "function") throw new TypeError(strVar_M4);
      entryRef = localVar_Z_(entryRef) || 0, localVar_N4(resultRef) && (propRef = !!resultRef.leading, funcRef = "maxWait" in resultRef, indexRef =
        funcRef ? localVar_A4(localVar_Z_(resultRef.maxWait) || 0, entryRef) : indexRef, coordY = "trailing" in resultRef ? !!resultRef
        .trailing : coordY);

      function outputRef(classRef) {
        var keyRef = countRef,
          nodeRef = optionRef;
        return countRef = optionRef = void 0, unitRef = classRef, accumulator = valueRef.apply(nodeRef, keyRef), accumulator
      }

      function labelRef(classRef) {
        return unitRef = classRef, listRef = setTimeout(widthRef, entryRef), propRef ? outputRef(classRef) : accumulator
      }

      function depthRef(classRef) {
        var keyRef = classRef - configRef,
          nodeRef = classRef - unitRef,
          innerIndex = entryRef - keyRef;
        return funcRef ? localVar_j4(innerIndex, indexRef - nodeRef) : innerIndex
      }

      function handleRef(classRef) {
        var keyRef = classRef - configRef,
          nodeRef = classRef - unitRef;
        return configRef === void 0 || keyRef >= entryRef || keyRef < 0 || funcRef && nodeRef >= indexRef
      }

      function widthRef() {
        var classRef = localVar_Wm();
        if (handleRef(classRef)) return dataRef(classRef);
        listRef = setTimeout(widthRef, depthRef(classRef))
      }

      function dataRef(classRef) {
        return listRef = void 0, coordY && countRef ? outputRef(classRef) : (countRef = optionRef = void 0, accumulator)
      }

      function errorRef() {
        listRef !== void 0 && clearTimeout(listRef), unitRef = 0, countRef = configRef = optionRef = listRef = void 0
      }

      function typeRef() {
        return listRef === void 0 ? accumulator : dataRef(localVar_Wm())
      }

      function stateRef() {
        var classRef = localVar_Wm(),
          keyRef = handleRef(classRef);
        if (countRef = arguments, optionRef = this, configRef = classRef, keyRef) {
          if (listRef === void 0) return labelRef(configRef);
          if (funcRef) return clearTimeout(listRef), listRef = setTimeout(widthRef, entryRef), outputRef(configRef)
        }
        return listRef === void 0 && (listRef = setTimeout(widthRef, entryRef)), accumulator
      }
      return stateRef.cancel = errorRef, stateRef.flush = typeRef, stateRef
    }
    paramArg_e5.exports = helperFn_R4
  });
  var fnVar_r5 = defineCommonjsModule((paramArg_$j, paramArg_t5) => {
    var localVar_I4 = fnVar_Hm(),
      localVar_D4 = fnVar_yc(),
      strVar_F4 = "Expected a function";

    function helperFn_z4(valueRef, entryRef, resultRef) {
      var countRef = !0,
        optionRef = !0;
      if (typeof valueRef != "function") throw new TypeError(strVar_F4);
      return localVar_D4(resultRef) && (countRef = "leading" in resultRef ? !!resultRef.leading : countRef, optionRef =
        "trailing" in resultRef ? !!resultRef.trailing : optionRef), localVar_I4(valueRef, entryRef, {
        leading: countRef,
        maxWait: entryRef,
        trailing: optionRef
      })
    }
    paramArg_t5.exports = helperFn_z4
  });
  var localVar_Mt = toEsm(fnVar_gt());
  var localVar_i5 = toEsm(fnVar_Xl());
  var localVar_a5 = toEsm(fnVar_Hm());
  var localVar_l5 = toEsm(fnVar_r5());
  var fnVar_Vm = function(valueRef, entryRef) {
      return fnVar_Vm = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(resultRef, countRef) {
        resultRef.__proto__ = countRef
      } || function(resultRef, countRef) {
        for (var optionRef in countRef) Object.prototype.hasOwnProperty.call(countRef, optionRef) && (resultRef[
          optionRef] = countRef[optionRef])
      }, fnVar_Vm(valueRef, entryRef)
    };
  function helperFn_L4(valueRef, entryRef) {
    if (typeof entryRef != "function" && entryRef !== null) throw new TypeError(
      "Class extends value " + String(entryRef) + " is not a constructor or null"
      );
    fnVar_Vm(valueRef, entryRef);

    function resultRef() {
      this.constructor = valueRef
    }
    valueRef.prototype = entryRef === null ? Object.create(entryRef) : (resultRef.prototype = entryRef.prototype,
      new resultRef)
  }
  function helperFn_$4(valueRef, entryRef) {
    var resultRef = {};
    for (var countRef in valueRef) Object.prototype.hasOwnProperty.call(valueRef, countRef) && entryRef.indexOf(
      countRef) < 0 && (resultRef[countRef] = valueRef[countRef]);
    if (valueRef != null && typeof Object.getOwnPropertySymbols == "function")
      for (var optionRef = 0, countRef = Object.getOwnPropertySymbols(valueRef); optionRef < countRef.length; optionRef++)
        entryRef.indexOf(countRef[optionRef]) < 0 && Object.prototype.propertyIsEnumerable.call(valueRef,
          countRef[optionRef]) && (resultRef[countRef[optionRef]] = valueRef[countRef[optionRef]]);
    return resultRef
  }
  var fnVar_q4 = function(valueRef, entryRef, resultRef, countRef) {
      switch (entryRef) {
        case "debounce":
          return (0, localVar_a5.default)(valueRef, resultRef, countRef);
        case "throttle":
          return (0, localVar_l5.default)(valueRef, resultRef, countRef);
        default:
          return valueRef
      }
    };
  var fnVar_n5 = function(valueRef) {
      return typeof valueRef == "function"
    };
  var fnVar_Ea = function() {
      return typeof window > "u"
    };
  var fnVar_o5 = function(valueRef) {
      return valueRef instanceof Element || valueRef instanceof HTMLDocument
    };
  var fnVar_xc = function(valueRef) {
      helperFn_L4(entryRef, valueRef);

      function entryRef(resultRef) {
        var countRef = valueRef.call(this, resultRef) || this;
        countRef.cancelHandler = function() {
          countRef.resizeHandler && countRef.resizeHandler.cancel && (countRef.resizeHandler
            .cancel(), countRef.resizeHandler = null)
        }, countRef.attachObserver = function() {
          var unitRef = countRef.props,
            propRef = unitRef.targetRef,
            funcRef = unitRef.observerOptions;
          if (!fnVar_Ea()) {
            propRef && propRef.current && (countRef.targetRef.current = propRef.current);
            var coordY = countRef.getElement();
            coordY && (countRef.observableElement && countRef.observableElement === coordY || (countRef
              .observableElement = coordY, countRef.resizeObserver.observe(coordY, funcRef)))
          }
        }, countRef.getElement = function() {
          var unitRef = countRef.props,
            propRef = unitRef.querySelector,
            funcRef = unitRef.targetDomEl;
          if (fnVar_Ea()) return null;
          if (propRef) return document.querySelector(propRef);
          if (funcRef && fnVar_o5(funcRef)) return funcRef;
          if (countRef.targetRef && fnVar_o5(countRef.targetRef.current)) return countRef.targetRef
            .current;
          var coordY = (0, localVar_i5.findDOMNode)(countRef);
          if (!coordY) return null;
          var outputRef = countRef.getRenderType();
          switch (outputRef) {
            case "renderProp":
              return coordY;
            case "childFunction":
              return coordY;
            case "child":
              return coordY;
            case "childArray":
              return coordY;
            default:
              return coordY.parentElement
          }
        }, countRef.createResizeHandler = function(unitRef) {
          var propRef = countRef.props,
            funcRef = propRef.handleWidth,
            coordY = funcRef === void 0 ? !0 : funcRef,
            outputRef = propRef.handleHeight,
            labelRef = outputRef === void 0 ? !0 : outputRef,
            depthRef = propRef.onResize;
          if (!(!coordY && !labelRef)) {
            var handleRef = function(widthRef) {
              var dataRef = widthRef.width,
                errorRef = widthRef.height;
              countRef.state.width === dataRef && countRef.state.height === errorRef || countRef.state
                .width === dataRef && !labelRef || countRef.state.height === errorRef && !coordY || (depthRef?.(
                  dataRef, errorRef), countRef.setState({
                  width: dataRef,
                  height: errorRef
                }))
            };
            unitRef.forEach(function(widthRef) {
              var dataRef = widthRef && widthRef.contentRect || {},
                errorRef = dataRef.width,
                typeRef = dataRef.height,
                stateRef = !countRef.skipOnMount && !fnVar_Ea();
              stateRef && handleRef({
                width: errorRef,
                height: typeRef
              }), countRef.skipOnMount = !1
            })
          }
        }, countRef.getRenderType = function() {
          var unitRef = countRef.props,
            propRef = unitRef.render,
            funcRef = unitRef.children;
          return fnVar_n5(propRef) ? "renderProp" : fnVar_n5(funcRef) ? "childFunction" : (0, localVar_Mt
              .isValidElement)(funcRef) ? "child" : Array.isArray(funcRef) ?
            "childArray" : "parent"
        };
        var optionRef = resultRef.skipOnMount,
          indexRef = resultRef.refreshMode,
          accumulator = resultRef.refreshRate,
          listRef = accumulator === void 0 ? 1e3 : accumulator,
          configRef = resultRef.refreshOptions;
        return countRef.state = {
            width: void 0,
            height: void 0
          }, countRef.sizeRef = {
            current: countRef.state
          }, countRef.skipOnMount = optionRef, countRef.targetRef = (0, localVar_Mt.createRef)(), countRef
          .observableElement = null, fnVar_Ea() || (countRef.resizeHandler = fnVar_q4(countRef
              .createResizeHandler, indexRef, listRef, configRef), countRef.resizeObserver = new window
            .ResizeObserver(countRef.resizeHandler)), countRef
      }
      return entryRef.prototype.componentDidMount = function() {
        this.attachObserver()
      }, entryRef.prototype.componentDidUpdate = function() {
        this.attachObserver(), this.sizeRef.current = this.state
      }, entryRef.prototype.componentWillUnmount = function() {
        fnVar_Ea() || (this.observableElement = null, this.resizeObserver
          .disconnect(), this.cancelHandler())
      }, entryRef.prototype.render = function() {
        var resultRef = this.props,
          countRef = resultRef.render,
          optionRef = resultRef.children,
          indexRef = resultRef.nodeType,
          accumulator = indexRef === void 0 ? "div" : indexRef,
          listRef = this.state,
          configRef = listRef.width,
          unitRef = listRef.height,
          propRef = {
            width: configRef,
            height: unitRef,
            targetRef: this.targetRef
          },
          funcRef = this.getRenderType();
        switch (funcRef) {
          case "renderProp":
            return countRef?.(propRef);
          case "childFunction": {
            var coordY = optionRef;
            return coordY?.(propRef)
          }
          case "child": {
            var outputRef = optionRef;
            if (outputRef.type && typeof outputRef.type == "string") {
              propRef.targetRef;
              var labelRef = helperFn_$4(propRef, ["targetRef"]);
              return (0, localVar_Mt.cloneElement)(outputRef, labelRef)
            }
            return (0, localVar_Mt.cloneElement)(outputRef, propRef)
          }
          case "childArray": {
            var depthRef = optionRef;
            return depthRef.map(function(handleRef) {
              return !!handleRef && (0, localVar_Mt.cloneElement)(handleRef, propRef)
            })
          }
          default:
            return localVar_Mt.default.createElement(accumulator, null)
        }
      }, entryRef
    }(localVar_Mt.PureComponent);
  window.__vdhReactResizeDetector = fnVar_xc;
})();
