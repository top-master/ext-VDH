"use strict";
(() => {
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
    defineExports = (targetObj, sourceObj) => {
      for (var exportKey in sourceObj) defineProperty(targetObj, exportKey, {
        get: sourceObj[exportKey],
        enumerable: !0
      })
    },
    copyProps = (copyTarget, copyFrom, copyExcept, copyDesc) => {
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
  
  
  var fnVar_kn = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.PropTypes; // de-vendored: loaded from content/vendor/
  });
  
  
  
  
  var fnVar_E0 = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.reduxLogger; // de-vendored: loaded from content/vendor/
  });
  var fnVar_T0 = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.classNames; // de-vendored: loaded from content/vendor/
  });
  var fnVar_N0 = defineCommonjsModule((paramArg_s7, paramArg_C0) => {
    var strVar_aE = "[object AsyncFunction]",
      strVar_lE = "[object Function]",
      strVar_sE = "[object GeneratorFunction]",
      strVar_cE = "[object Null]",
      strVar_uE = "[object Proxy]",
      strVar_dE = "[object Undefined]",
      strVar_pE = typeof global == "object" && global && global.Object ===
      Object && global,
      strVar_fE = typeof self == "object" && self && self.Object === Object &&
      self,
      localVar_mE = strVar_pE || strVar_fE || Function("return this")(),
      localVar_O0 = Object.prototype,
      localVar_gE = localVar_O0.hasOwnProperty,
      localVar_P0 = localVar_O0.toString,
      localVar_S0 = localVar_mE.Symbol,
      localVar_eo = localVar_S0 ? localVar_S0.toStringTag : void 0;

    function helperFn_hE(valueRef) {
      return valueRef == null ? valueRef === void 0 ? strVar_dE : strVar_cE : localVar_eo && localVar_eo in Object(valueRef) ?
        helperFn_bE(valueRef) : helperFn_vE(valueRef)
    }

    function helperFn_bE(valueRef) {
      var entryRef = localVar_gE.call(valueRef, localVar_eo),
        resultRef = valueRef[localVar_eo];
      try {
        valueRef[localVar_eo] = void 0;
        var countRef = !0
      } catch {}
      var optionRef = localVar_P0.call(valueRef);
      return countRef && (entryRef ? valueRef[localVar_eo] = resultRef : delete valueRef[localVar_eo]), optionRef
    }

    function helperFn_vE(valueRef) {
      return localVar_P0.call(valueRef)
    }

    function helperFn_yE(valueRef) {
      if (!helperFn_xE(valueRef)) return !1;
      var entryRef = helperFn_hE(valueRef);
      return entryRef == strVar_lE || entryRef == strVar_sE || entryRef == strVar_aE || entryRef == strVar_uE
    }

    function helperFn_xE(valueRef) {
      var entryRef = typeof valueRef;
      return valueRef != null && (entryRef == "object" || entryRef == "function")
    }
    paramArg_C0.exports = helperFn_yE
  });
  var fnVar_A0 = defineCommonjsModule((paramArg_c7, paramArg_M0) => {
    function helperFn_wE(valueRef) {
      var entryRef = typeof valueRef;
      return !!valueRef && (entryRef == "object" || entryRef == "function")
    }
    paramArg_M0.exports = helperFn_wE
  });
  var fnVar_I0 = defineCommonjsModule(paramArg_lp => {
    "use strict";
    Object.defineProperty(paramArg_lp, "__esModule", {
      value: !0
    });
    var fnVar__E = function() {
        function valueRef(entryRef, resultRef) {
          for (var countRef = 0; countRef < resultRef.length; countRef++) {
            var optionRef = resultRef[countRef];
            optionRef.enumerable = optionRef.enumerable || !1, optionRef.configurable = !0,
              "value" in optionRef && (optionRef.writable = !0), Object.defineProperty(entryRef,
                optionRef.key, optionRef)
          }
        }
        return function(entryRef, resultRef, countRef) {
          return resultRef && valueRef(entryRef.prototype, resultRef), countRef && valueRef(entryRef, countRef), entryRef
        }
      }(),
      localVar_j0 = fnVar_gt(),
      localVar_kE = fnVar_kn(),
      localVar_to = helperFn_EE(localVar_kE);

    function helperFn_EE(valueRef) {
      return valueRef && valueRef.__esModule ? valueRef : {
        default: valueRef
      }
    }

    function helperFn_TE(valueRef, entryRef) {
      var resultRef = {};
      for (var countRef in valueRef) entryRef.indexOf(countRef) >= 0 || Object.prototype
        .hasOwnProperty.call(valueRef, countRef) && (resultRef[countRef] = valueRef[countRef]);
      return resultRef
    }

    function helperFn_SE(valueRef, entryRef) {
      if (!(valueRef instanceof entryRef)) throw new TypeError(
        "Cannot call a class as a function")
    }

    function helperFn_R0(valueRef, entryRef) {
      if (!valueRef) throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
      return entryRef && (typeof entryRef == "object" || typeof entryRef == "function") ? entryRef : valueRef
    }

    function helperFn_OE(valueRef, entryRef) {
      if (typeof entryRef != "function" && entryRef !== null) throw new TypeError(
        "Super expression must either be null or a function, not " +
        typeof entryRef);
      valueRef.prototype = Object.create(entryRef && entryRef.prototype, {
        constructor: {
          value: valueRef,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), entryRef && (Object.setPrototypeOf ? Object.setPrototypeOf(valueRef, entryRef) : valueRef
        .__proto__ = entryRef)
    }
    var fnVar_bs = function(valueRef) {
      helperFn_OE(entryRef, valueRef);

      function entryRef() {
        var resultRef, countRef, optionRef, indexRef;
        helperFn_SE(this, entryRef);
        for (var accumulator = arguments.length, listRef = Array(accumulator), configRef = 0; configRef < accumulator; configRef++)
          listRef[configRef] = arguments[configRef];
        return indexRef = (countRef = (optionRef = helperFn_R0(this, (resultRef = entryRef.__proto__ || Object
              .getPrototypeOf(entryRef))
            .call.apply(resultRef, [this].concat(listRef))), optionRef), optionRef._setTargetNode =
          function(unitRef) {
            optionRef._targetNode = unitRef
          }, optionRef._getTargetNode = function() {
            return optionRef._targetNode
          }, countRef), helperFn_R0(optionRef, indexRef)
      }
      return fnVar__E(entryRef, [{
        key: "getChildContext",
        value: function() {
          return {
            popperManager: {
              setTargetNode: this._setTargetNode,
              getTargetNode: this._getTargetNode
            }
          }
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.tag,
            indexRef = countRef.children,
            accumulator = helperFn_TE(countRef, ["tag", "children"]);
          return optionRef !== !1 ? (0, localVar_j0.createElement)(optionRef, accumulator, indexRef) : indexRef
        }
      }]), entryRef
    }(localVar_j0.Component);
    fnVar_bs.childContextTypes = {
      popperManager: localVar_to.default.object.isRequired
    };
    fnVar_bs.propTypes = {
      tag: localVar_to.default.oneOfType([localVar_to.default.string, localVar_to.default.bool]),
      children: localVar_to.default.oneOfType([localVar_to.default.node, localVar_to.default.func])
    };
    fnVar_bs.defaultProps = {
      tag: "div"
    };
    paramArg_lp.default = fnVar_bs
  });
  var fnVar_D0 = defineCommonjsModule(paramArg_cp => {
    "use strict";
    Object.defineProperty(paramArg_cp, "__esModule", {
      value: !0
    });
    var objHelper_PE = Object.assign || function(valueRef) {
        for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
          var resultRef = arguments[entryRef];
          for (var countRef in resultRef) Object.prototype.hasOwnProperty.call(resultRef, countRef) && (
            valueRef[countRef] = resultRef[countRef])
        }
        return valueRef
      },
      localVar_CE = fnVar_gt(),
      localVar_NE = fnVar_kn(),
      localVar_En = helperFn_ME(localVar_NE);

    function helperFn_ME(valueRef) {
      return valueRef && valueRef.__esModule ? valueRef : {
        default: valueRef
      }
    }

    function helperFn_AE(valueRef, entryRef) {
      var resultRef = {};
      for (var countRef in valueRef) entryRef.indexOf(countRef) >= 0 || Object.prototype
        .hasOwnProperty.call(valueRef, countRef) && (resultRef[countRef] = valueRef[countRef]);
      return resultRef
    }
    var fnVar_sp = function(entryRef, resultRef) {
      var countRef = entryRef.component,
        optionRef = countRef === void 0 ? "div" : countRef,
        indexRef = entryRef.innerRef,
        accumulator = entryRef.children,
        listRef = helperFn_AE(entryRef, ["component", "innerRef", "children"]),
        configRef = resultRef.popperManager,
        unitRef = function(outputRef) {
          configRef.setTargetNode(outputRef), typeof indexRef == "function" && indexRef(outputRef)
        };
      if (typeof accumulator == "function") {
        var propRef = {
          ref: unitRef
        };
        return accumulator({
          targetProps: propRef,
          restProps: listRef
        })
      }
      var funcRef = objHelper_PE({}, listRef);
      return typeof optionRef == "string" ? funcRef.ref = unitRef : funcRef.innerRef = unitRef, (0, localVar_CE
        .createElement)(optionRef, funcRef, accumulator)
    };
    fnVar_sp.contextTypes = {
      popperManager: localVar_En.default.object.isRequired
    };
    fnVar_sp.propTypes = {
      component: localVar_En.default.oneOfType([localVar_En.default.node, localVar_En.default
        .func]),
      innerRef: localVar_En.default.func,
      children: localVar_En.default.oneOfType([localVar_En.default.node, localVar_En.default.func])
    };
    paramArg_cp.default = fnVar_sp
  });
  var fnVar_F0 = defineCommonjsModule((paramArg_up, paramArg_dp) => {
    (function(valueRef, entryRef) {
      typeof paramArg_up == "object" && typeof paramArg_dp < "u" ? paramArg_dp.exports = entryRef() :
        typeof define == "function" && define.amd ? define(entryRef) : valueRef
        .Popper = entryRef()
    })(paramArg_up, function() {
      "use strict";
      var valueRef = typeof window < "u" && typeof document < "u" &&
        typeof navigator < "u",
        entryRef = function() {
          for (var groupRef = ["Edge", "Trident", "Firefox"], promiseRef = 0; promiseRef < groupRef
            .length; promiseRef += 1)
            if (valueRef && navigator.userAgent.indexOf(groupRef[promiseRef]) >= 0) return 1;
          return 0
        }();

      function resultRef(groupRef) {
        var promiseRef = !1;
        return function() {
          promiseRef || (promiseRef = !0, window.Promise.resolve()
            .then(function() {
              promiseRef = !1, groupRef()
            }))
        }
      }

      function countRef(groupRef) {
        var promiseRef = !1;
        return function() {
          promiseRef || (promiseRef = !0, setTimeout(function() {
            promiseRef = !1, groupRef()
          }, entryRef))
        }
      }
      var optionRef = valueRef && window.Promise,
        indexRef = optionRef ? resultRef : countRef;

      function accumulator(groupRef) {
        var promiseRef = {};
        return groupRef && promiseRef.toString.call(groupRef) === "[object Function]"
      }

      function listRef(groupRef, promiseRef) {
        if (groupRef.nodeType !== 1) return [];
        var alphaRef = groupRef.ownerDocument.defaultView,
          factoryRef = alphaRef.getComputedStyle(groupRef, null);
        return promiseRef ? factoryRef[promiseRef] : factoryRef
      }

      function configRef(groupRef) {
        return groupRef.nodeName === "HTML" ? groupRef : groupRef.parentNode || groupRef.host
      }

      function unitRef(groupRef) {
        if (!groupRef) return document.body;
        switch (groupRef.nodeName) {
          case "HTML":
          case "BODY":
            return groupRef.ownerDocument.body;
          case "#document":
            return groupRef.body
        }
        var promiseRef = listRef(groupRef),
          alphaRef = promiseRef.overflow,
          factoryRef = promiseRef.overflowX,
          axisXRef = promiseRef.overflowY;
        return /(auto|scroll|overlay)/.test(alphaRef + axisXRef + factoryRef) ? groupRef : unitRef(configRef(groupRef))
      }

      function propRef(groupRef) {
        return groupRef && groupRef.referenceNode ? groupRef.referenceNode : groupRef
      }
      var funcRef = valueRef && !!(window.MSInputMethodContext && document
          .documentMode),
        coordY = valueRef && /MSIE 10/.test(navigator.userAgent);

      function outputRef(groupRef) {
        return groupRef === 11 ? funcRef : groupRef === 10 ? coordY : funcRef || coordY
      }

      function labelRef(groupRef) {
        if (!groupRef) return document.documentElement;
        for (var promiseRef = outputRef(10) ? document.body : null, alphaRef = groupRef.offsetParent ||
            null; alphaRef === promiseRef && groupRef.nextElementSibling;) alphaRef = (groupRef = groupRef
            .nextElementSibling)
          .offsetParent;
        var factoryRef = alphaRef && alphaRef.nodeName;
        return !factoryRef || factoryRef === "BODY" || factoryRef === "HTML" ? groupRef ? groupRef.ownerDocument
          .documentElement : document.documentElement : ["TH", "TD",
            "TABLE"
          ].indexOf(alphaRef.nodeName) !== -1 && listRef(alphaRef, "position") ===
          "static" ? labelRef(alphaRef) : alphaRef
      }

      function depthRef(groupRef) {
        var promiseRef = groupRef.nodeName;
        return promiseRef === "BODY" ? !1 : promiseRef === "HTML" || labelRef(groupRef
          .firstElementChild) === groupRef
      }

      function handleRef(groupRef) {
        return groupRef.parentNode !== null ? handleRef(groupRef.parentNode) : groupRef
      }

      function widthRef(groupRef, promiseRef) {
        if (!groupRef || !groupRef.nodeType || !promiseRef || !promiseRef.nodeType) return document
          .documentElement;
        var alphaRef = groupRef.compareDocumentPosition(promiseRef) & Node
          .DOCUMENT_POSITION_FOLLOWING,
          factoryRef = alphaRef ? groupRef : promiseRef,
          axisXRef = alphaRef ? promiseRef : groupRef,
          gammaRef = document.createRange();
        gammaRef.setStart(factoryRef, 0), gammaRef.setEnd(axisXRef, 0);
        var localVar_re = gammaRef.commonAncestorContainer;
        if (groupRef !== localVar_re && promiseRef !== localVar_re || factoryRef.contains(axisXRef)) return depthRef(localVar_re) ? localVar_re :
          labelRef(localVar_re);
        var localVar_le = handleRef(groupRef);
        return localVar_le.host ? widthRef(localVar_le.host, promiseRef) : widthRef(groupRef, handleRef(promiseRef)
          .host)
      }

      function dataRef(groupRef) {
        var promiseRef = arguments.length > 1 && arguments[1] !== void 0 ?
          arguments[1] : "top",
          alphaRef = promiseRef === "top" ? "scrollTop" : "scrollLeft",
          factoryRef = groupRef.nodeName;
        if (factoryRef === "BODY" || factoryRef === "HTML") {
          var axisXRef = groupRef.ownerDocument.documentElement,
            gammaRef = groupRef.ownerDocument.scrollingElement || axisXRef;
          return gammaRef[alphaRef]
        }
        return groupRef[alphaRef]
      }

      function errorRef(groupRef, promiseRef) {
        var alphaRef = arguments.length > 2 && arguments[2] !== void 0 ?
          arguments[2] : !1,
          factoryRef = dataRef(promiseRef, "top"),
          axisXRef = dataRef(promiseRef, "left"),
          gammaRef = alphaRef ? -1 : 1;
        return groupRef.top += factoryRef * gammaRef, groupRef.bottom += factoryRef * gammaRef, groupRef.left += axisXRef * gammaRef, groupRef
          .right += axisXRef * gammaRef, groupRef
      }

      function typeRef(groupRef, promiseRef) {
        var alphaRef = promiseRef === "x" ? "Left" : "Top",
          factoryRef = alphaRef === "Left" ? "Right" : "Bottom";
        return parseFloat(groupRef["border" + alphaRef + "Width"]) + parseFloat(groupRef[
          "border" + factoryRef + "Width"])
      }

      function stateRef(groupRef, promiseRef, alphaRef, factoryRef) {
        return Math.max(promiseRef["offset" + groupRef], promiseRef["scroll" + groupRef], alphaRef["client" +
          groupRef], alphaRef["offset" + groupRef], alphaRef["scroll" + groupRef], outputRef(10) ? parseInt(alphaRef[
          "offset" + groupRef]) + parseInt(factoryRef["margin" + (groupRef === "Height" ?
          "Top" : "Left")]) + parseInt(factoryRef["margin" + (groupRef ===
          "Height" ? "Bottom" : "Right")]) : 0)
      }

      function classRef(groupRef) {
        var promiseRef = groupRef.body,
          alphaRef = groupRef.documentElement,
          factoryRef = outputRef(10) && getComputedStyle(alphaRef);
        return {
          height: stateRef("Height", promiseRef, alphaRef, factoryRef),
          width: stateRef("Width", promiseRef, alphaRef, factoryRef)
        }
      }
      var keyRef = function(groupRef, promiseRef) {
          if (!(groupRef instanceof promiseRef)) throw new TypeError(
            "Cannot call a class as a function")
        },
        nodeRef = function() {
          function groupRef(promiseRef, alphaRef) {
            for (var factoryRef = 0; factoryRef < alphaRef.length; factoryRef++) {
              var axisXRef = alphaRef[factoryRef];
              axisXRef.enumerable = axisXRef.enumerable || !1, axisXRef.configurable = !0,
                "value" in axisXRef && (axisXRef.writable = !0), Object
                .defineProperty(promiseRef, axisXRef.key, axisXRef)
            }
          }
          return function(promiseRef, alphaRef, factoryRef) {
            return alphaRef && groupRef(promiseRef.prototype, alphaRef), factoryRef && groupRef(promiseRef, factoryRef), promiseRef
          }
        }(),
        innerIndex = function(groupRef, promiseRef, alphaRef) {
          return promiseRef in groupRef ? Object.defineProperty(groupRef, promiseRef, {
            value: alphaRef,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : groupRef[promiseRef] = alphaRef, groupRef
        },
        jsonRef = Object.assign || function(groupRef) {
          for (var promiseRef = 1; promiseRef < arguments.length; promiseRef++) {
            var alphaRef = arguments[promiseRef];
            for (var factoryRef in alphaRef) Object.prototype.hasOwnProperty.call(alphaRef,
              factoryRef) && (groupRef[factoryRef] = alphaRef[factoryRef])
          }
          return groupRef
        };

      function moduleRef(groupRef) {
        return jsonRef({}, groupRef, {
          right: groupRef.left + groupRef.width,
          bottom: groupRef.top + groupRef.height
        })
      }

      function helperFn_fe(groupRef) {
        var promiseRef = {};
        try {
          if (outputRef(10)) {
            promiseRef = groupRef.getBoundingClientRect();
            var alphaRef = dataRef(groupRef, "top"),
              factoryRef = dataRef(groupRef, "left");
            promiseRef.top += alphaRef, promiseRef.left += factoryRef, promiseRef.bottom += alphaRef, promiseRef.right += factoryRef
          } else promiseRef = groupRef.getBoundingClientRect()
        } catch {}
        var axisXRef = {
            left: promiseRef.left,
            top: promiseRef.top,
            width: promiseRef.right - promiseRef.left,
            height: promiseRef.bottom - promiseRef.top
          },
          gammaRef = groupRef.nodeName === "HTML" ? classRef(groupRef.ownerDocument) : {},
          localVar_re = gammaRef.width || groupRef.clientWidth || axisXRef.width,
          localVar_le = gammaRef.height || groupRef.clientHeight || axisXRef.height,
          localVar_pe = groupRef.offsetWidth - localVar_re,
          localVar_Ee = groupRef.offsetHeight - localVar_le;
        if (localVar_pe || localVar_Ee) {
          var localVar_Se = listRef(groupRef);
          localVar_pe -= typeRef(localVar_Se, "x"), localVar_Ee -= typeRef(localVar_Se, "y"), axisXRef.width -= localVar_pe, axisXRef.height -=
            localVar_Ee
        }
        return moduleRef(axisXRef)
      }

      function helperFn_ne(groupRef, promiseRef) {
        var alphaRef = arguments.length > 2 && arguments[2] !== void 0 ?
          arguments[2] : !1,
          factoryRef = outputRef(10),
          axisXRef = promiseRef.nodeName === "HTML",
          gammaRef = helperFn_fe(groupRef),
          localVar_re = helperFn_fe(promiseRef),
          localVar_le = unitRef(groupRef),
          localVar_pe = listRef(promiseRef),
          localVar_Ee = parseFloat(localVar_pe.borderTopWidth),
          localVar_Se = parseFloat(localVar_pe.borderLeftWidth);
        alphaRef && axisXRef && (localVar_re.top = Math.max(localVar_re.top, 0), localVar_re.left = Math.max(localVar_re
          .left, 0));
        var localVar_we = moduleRef({
          top: gammaRef.top - localVar_re.top - localVar_Ee,
          left: gammaRef.left - localVar_re.left - localVar_Se,
          width: gammaRef.width,
          height: gammaRef.height
        });
        if (localVar_we.marginTop = 0, localVar_we.marginLeft = 0, !factoryRef && axisXRef) {
          var localVar_Pe = parseFloat(localVar_pe.marginTop),
            boolFlag = parseFloat(localVar_pe.marginLeft);
          localVar_we.top -= localVar_Ee - localVar_Pe, localVar_we.bottom -= localVar_Ee - localVar_Pe, localVar_we.left -= localVar_Se - boolFlag, localVar_we
            .right -= localVar_Se - boolFlag, localVar_we.marginTop = localVar_Pe, localVar_we.marginLeft = boolFlag
        }
        return (factoryRef && !alphaRef ? promiseRef.contains(localVar_le) : promiseRef === localVar_le && localVar_le.nodeName !==
          "BODY") && (localVar_we = errorRef(localVar_we, promiseRef)), localVar_we
      }

      function headerRef(groupRef) {
        var promiseRef = arguments.length > 1 && arguments[1] !== void 0 ?
          arguments[1] : !1,
          alphaRef = groupRef.ownerDocument.documentElement,
          factoryRef = helperFn_ne(groupRef, alphaRef),
          axisXRef = Math.max(alphaRef.clientWidth, window.innerWidth || 0),
          gammaRef = Math.max(alphaRef.clientHeight, window.innerHeight || 0),
          localVar_re = promiseRef ? 0 : dataRef(alphaRef),
          localVar_le = promiseRef ? 0 : dataRef(alphaRef, "left"),
          lookupTable_pe = {
            top: localVar_re - factoryRef.top + factoryRef.marginTop,
            left: localVar_le - factoryRef.left + factoryRef.marginLeft,
            width: axisXRef,
            height: gammaRef
          };
        return moduleRef(lookupTable_pe)
      }

      function helperFn_de(groupRef) {
        var promiseRef = groupRef.nodeName;
        if (promiseRef === "BODY" || promiseRef === "HTML") return !1;
        if (listRef(groupRef, "position") === "fixed") return !0;
        var alphaRef = configRef(groupRef);
        return alphaRef ? helperFn_de(alphaRef) : !1
      }

      function helperFn_be(groupRef) {
        if (!groupRef || !groupRef.parentElement || outputRef()) return document
          .documentElement;
        for (var promiseRef = groupRef.parentElement; promiseRef && listRef(promiseRef, "transform") ===
          "none";) promiseRef = promiseRef.parentElement;
        return promiseRef || document.documentElement
      }

      function helperFn_ye(groupRef, promiseRef, alphaRef, factoryRef) {
        var axisXRef = arguments.length > 4 && arguments[4] !== void 0 ?
          arguments[4] : !1,
          gammaRef = {
            top: 0,
            left: 0
          },
          localVar_re = axisXRef ? helperFn_be(groupRef) : widthRef(groupRef, propRef(promiseRef));
        if (factoryRef === "viewport") gammaRef = headerRef(localVar_re, axisXRef);
        else {
          var localVar_le = void 0;
          factoryRef === "scrollParent" ? (localVar_le = unitRef(configRef(promiseRef)), localVar_le.nodeName ===
              "BODY" && (localVar_le = groupRef.ownerDocument.documentElement)) : factoryRef ===
            "window" ? localVar_le = groupRef.ownerDocument.documentElement : localVar_le = factoryRef;
          var localVar_pe = helperFn_ne(localVar_le, localVar_re, axisXRef);
          if (localVar_le.nodeName === "HTML" && !helperFn_de(localVar_re)) {
            var localVar_Ee = classRef(groupRef.ownerDocument),
              localVar_Se = localVar_Ee.height,
              localVar_we = localVar_Ee.width;
            gammaRef.top += localVar_pe.top - localVar_pe.marginTop, gammaRef.bottom = localVar_Se + localVar_pe.top, gammaRef
              .left += localVar_pe.left - localVar_pe.marginLeft, gammaRef.right = localVar_we + localVar_pe.left
          } else gammaRef = localVar_pe
        }
        alphaRef = alphaRef || 0;
        var strVar_Pe = typeof alphaRef == "number";
        return gammaRef.left += strVar_Pe ? alphaRef : alphaRef.left || 0, gammaRef.top += strVar_Pe ? alphaRef : alphaRef
          .top || 0, gammaRef.right -= strVar_Pe ? alphaRef : alphaRef.right || 0, gammaRef.bottom -= strVar_Pe ?
          alphaRef : alphaRef.bottom || 0, gammaRef
      }

      function helperFn_ue(groupRef) {
        var promiseRef = groupRef.width,
          alphaRef = groupRef.height;
        return promiseRef * alphaRef
      }

      function refObject(groupRef, promiseRef, alphaRef, factoryRef, axisXRef) {
        var gammaRef = arguments.length > 5 && arguments[5] !== void 0 ?
          arguments[5] : 0;
        if (groupRef.indexOf("auto") === -1) return groupRef;
        var localVar_re = helperFn_ye(alphaRef, factoryRef, gammaRef, axisXRef),
          lookupTable_le = {
            top: {
              width: localVar_re.width,
              height: promiseRef.top - localVar_re.top
            },
            right: {
              width: localVar_re.right - promiseRef.right,
              height: localVar_re.height
            },
            bottom: {
              width: localVar_re.width,
              height: localVar_re.bottom - promiseRef.bottom
            },
            left: {
              width: promiseRef.left - localVar_re.left,
              height: localVar_re.height
            }
          },
          objHelper_pe = Object.keys(lookupTable_le)
          .map(function(paramArg_Pe) {
            return jsonRef({
              key: paramArg_Pe
            }, lookupTable_le[paramArg_Pe], {
              area: helperFn_ue(lookupTable_le[paramArg_Pe])
            })
          })
          .sort(function(paramArg_Pe, boolFlag) {
            return boolFlag.area - paramArg_Pe.area
          }),
          localVar_Ee = objHelper_pe.filter(function(paramArg_Pe) {
            var boolFlag = paramArg_Pe.width,
              coordX = paramArg_Pe.height;
            return boolFlag >= alphaRef.clientWidth && coordX >= alphaRef.clientHeight
          }),
          localVar_Se = localVar_Ee.length > 0 ? localVar_Ee[0].key : objHelper_pe[0].key,
          localVar_we = groupRef.split("-")[1];
        return localVar_Se + (localVar_we ? "-" + localVar_we : "")
      }

      function userRef(groupRef, promiseRef, alphaRef) {
        var factoryRef = arguments.length > 3 && arguments[3] !== void 0 ?
          arguments[3] : null,
          axisXRef = factoryRef ? helperFn_be(promiseRef) : widthRef(promiseRef, propRef(alphaRef));
        return helperFn_ne(alphaRef, axisXRef, factoryRef)
      }

      function renamed_$(groupRef) {
        var promiseRef = groupRef.ownerDocument.defaultView,
          alphaRef = promiseRef.getComputedStyle(groupRef),
          factoryRef = parseFloat(alphaRef.marginTop || 0) + parseFloat(alphaRef
            .marginBottom || 0),
          axisXRef = parseFloat(alphaRef.marginLeft || 0) + parseFloat(alphaRef
            .marginRight || 0),
          gammaRef = {
            width: groupRef.offsetWidth + axisXRef,
            height: groupRef.offsetHeight + factoryRef
          };
        return gammaRef
      }

      function helperFn_te(groupRef) {
        var promiseRef = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom"
        };
        return groupRef.replace(/left|right|bottom|top/g, function(alphaRef) {
          return promiseRef[alphaRef]
        })
      }

      function helperFn_ge(groupRef, promiseRef, alphaRef) {
        alphaRef = alphaRef.split("-")[0];
        var factoryRef = renamed_$(groupRef),
          axisXRef = {
            width: factoryRef.width,
            height: factoryRef.height
          },
          gammaRef = ["right", "left"].indexOf(alphaRef) !== -1,
          localVar_re = gammaRef ? "top" : "left",
          localVar_le = gammaRef ? "left" : "top",
          localVar_pe = gammaRef ? "height" : "width",
          localVar_Ee = gammaRef ? "width" : "height";
        return axisXRef[localVar_re] = promiseRef[localVar_re] + promiseRef[localVar_pe] / 2 - factoryRef[localVar_pe] / 2, alphaRef === localVar_le ? axisXRef[localVar_le] =
          promiseRef[localVar_le] - factoryRef[localVar_Ee] : axisXRef[localVar_le] = promiseRef[helperFn_te(localVar_le)], axisXRef
      }

      function helperFn_xe(groupRef, promiseRef) {
        return Array.prototype.find ? groupRef.find(promiseRef) : groupRef.filter(promiseRef)[0]
      }

      function helperFn_Te(groupRef, promiseRef, alphaRef) {
        if (Array.prototype.findIndex) return groupRef.findIndex(function(axisXRef) {
          return axisXRef[promiseRef] === alphaRef
        });
        var factoryRef = helperFn_xe(groupRef, function(axisXRef) {
          return axisXRef[promiseRef] === alphaRef
        });
        return groupRef.indexOf(factoryRef)
      }

      function helperFn_ve(groupRef, promiseRef, alphaRef) {
        var factoryRef = alphaRef === void 0 ? groupRef : groupRef.slice(0, helperFn_Te(groupRef, "name", alphaRef));
        return factoryRef.forEach(function(axisXRef) {
          axisXRef.function && console.warn(
            "`modifier.function` is deprecated, use `modifier.fn`!"
            );
          var gammaRef = axisXRef.function || axisXRef.fn;
          axisXRef.enabled && accumulator(gammaRef) && (promiseRef.offsets.popper = moduleRef(promiseRef.offsets
            .popper), promiseRef.offsets.reference = moduleRef(promiseRef.offsets
            .reference), promiseRef = gammaRef(promiseRef, axisXRef))
        }), promiseRef
      }

      function helperFn_ze() {
        if (!this.state.isDestroyed) {
          var groupRef = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: !1,
            offsets: {}
          };
          groupRef.offsets.reference = userRef(this.state, this.popper, this
              .reference, this.options.positionFixed), groupRef.placement = refObject(
              this.options.placement, groupRef.offsets.reference, this.popper,
              this.reference, this.options.modifiers.flip
              .boundariesElement, this.options.modifiers.flip.padding),
            groupRef.originalPlacement = groupRef.placement, groupRef.positionFixed = this
            .options.positionFixed, groupRef.offsets.popper = helperFn_ge(this.popper, groupRef
              .offsets.reference, groupRef.placement), groupRef.offsets.popper
            .position = this.options.positionFixed ? "fixed" :
            "absolute", groupRef = helperFn_ve(this.modifiers, groupRef), this.state
            .isCreated ? this.options.onUpdate(groupRef) : (this.state
              .isCreated = !0, this.options.onCreate(groupRef))
        }
      }

      function helperFn_Ge(groupRef, promiseRef) {
        return groupRef.some(function(alphaRef) {
          var factoryRef = alphaRef.name,
            axisXRef = alphaRef.enabled;
          return axisXRef && factoryRef === promiseRef
        })
      }

      function helperFn_Xe(groupRef) {
        for (var promiseRef = [!1, "ms", "Webkit", "Moz", "O"], alphaRef = groupRef.charAt(0)
            .toUpperCase() + groupRef.slice(1), factoryRef = 0; factoryRef < promiseRef.length; factoryRef++) {
          var axisXRef = promiseRef[factoryRef],
            gammaRef = axisXRef ? "" + axisXRef + alphaRef : groupRef;
          if (typeof document.body.style[gammaRef] < "u") return gammaRef
        }
        return null
      }

      function helperFn_Ze() {
        return this.state.isDestroyed = !0, helperFn_Ge(this.modifiers,
            "applyStyle") && (this.popper.removeAttribute(
            "x-placement"), this.popper.style.position = "", this.popper
            .style.top = "", this.popper.style.left = "", this.popper
            .style.right = "", this.popper.style.bottom = "", this
            .popper.style.willChange = "", this.popper.style[helperFn_Xe(
              "transform")] = ""), this.disableEventListeners(), this
          .options.removeOnDestroy && this.popper.parentNode
          .removeChild(this.popper), this
      }

      function helperFn_ot(groupRef) {
        var promiseRef = groupRef.ownerDocument;
        return promiseRef ? promiseRef.defaultView : window
      }

      function helperFn_Ie(groupRef, promiseRef, alphaRef, factoryRef) {
        var axisXRef = groupRef.nodeName === "BODY",
          gammaRef = axisXRef ? groupRef.ownerDocument.defaultView : groupRef;
        gammaRef.addEventListener(promiseRef, alphaRef, {
          passive: !0
        }), axisXRef || helperFn_Ie(unitRef(gammaRef.parentNode), promiseRef, alphaRef, factoryRef), factoryRef.push(gammaRef)
      }

      function helperFn_kt(groupRef, promiseRef, alphaRef, factoryRef) {
        alphaRef.updateBound = factoryRef, helperFn_ot(groupRef)
          .addEventListener("resize", alphaRef.updateBound, {
            passive: !0
          });
        var axisXRef = unitRef(groupRef);
        return helperFn_Ie(axisXRef, "scroll", alphaRef.updateBound, alphaRef.scrollParents), alphaRef
          .scrollElement = axisXRef, alphaRef.eventsEnabled = !0, alphaRef
      }

      function helperFn_ct() {
        this.state.eventsEnabled || (this.state = helperFn_kt(this.reference,
          this.options, this.state, this.scheduleUpdate))
      }

      function helperFn_Ue(groupRef, promiseRef) {
        return helperFn_ot(groupRef)
          .removeEventListener("resize", promiseRef.updateBound), promiseRef.scrollParents
          .forEach(function(alphaRef) {
            alphaRef.removeEventListener("scroll", promiseRef.updateBound)
          }), promiseRef.updateBound = null, promiseRef.scrollParents = [], promiseRef
          .scrollElement = null, promiseRef.eventsEnabled = !1, promiseRef
      }

      function helperFn_Bt() {
        this.state.eventsEnabled && (cancelAnimationFrame(this
          .scheduleUpdate), this.state = helperFn_Ue(this.reference, this
          .state))
      }

      function helperFn_Et(groupRef) {
        return groupRef !== "" && !isNaN(parseFloat(groupRef)) && isFinite(groupRef)
      }

      function helperFn_Tt(groupRef, promiseRef) {
        Object.keys(promiseRef)
          .forEach(function(alphaRef) {
            var factoryRef = "";
            ["width", "height", "top", "right", "bottom", "left"]
            .indexOf(alphaRef) !== -1 && helperFn_Et(promiseRef[alphaRef]) && (factoryRef = "px"), groupRef.style[alphaRef] =
              promiseRef[alphaRef] + factoryRef
          })
      }

      function helperFn_Ut(groupRef, promiseRef) {
        Object.keys(promiseRef)
          .forEach(function(alphaRef) {
            var factoryRef = promiseRef[alphaRef];
            factoryRef !== !1 ? groupRef.setAttribute(alphaRef, promiseRef[alphaRef]) : groupRef.removeAttribute(alphaRef)
          })
      }

      function helperFn_et(groupRef) {
        return helperFn_Tt(groupRef.instance.popper, groupRef.styles), helperFn_Ut(groupRef.instance.popper, groupRef
            .attributes), groupRef.arrowElement && Object.keys(groupRef.arrowStyles)
          .length && helperFn_Tt(groupRef.arrowElement, groupRef.arrowStyles), groupRef
      }

      function helperFn_at(groupRef, promiseRef, alphaRef, factoryRef, axisXRef) {
        var gammaRef = userRef(axisXRef, promiseRef, groupRef, alphaRef.positionFixed),
          localVar_re = refObject(alphaRef.placement, gammaRef, promiseRef, groupRef, alphaRef.modifiers.flip
            .boundariesElement, alphaRef.modifiers.flip.padding);
        return promiseRef.setAttribute("x-placement", localVar_re), helperFn_Tt(promiseRef, {
          position: alphaRef.positionFixed ? "fixed" : "absolute"
        }), alphaRef
      }

      function helperFn_sr(groupRef, promiseRef) {
        var alphaRef = groupRef.offsets,
          factoryRef = alphaRef.popper,
          axisXRef = alphaRef.reference,
          gammaRef = Math.round,
          localVar_re = Math.floor,
          fnVar_le = function(renamed__) {
            return renamed__
          },
          localVar_pe = gammaRef(axisXRef.width),
          localVar_Ee = gammaRef(factoryRef.width),
          listVar_Se = ["left", "right"].indexOf(groupRef.placement) !== -1,
          localVar_we = groupRef.placement.indexOf("-") !== -1,
          localVar_Pe = localVar_pe % 2 === localVar_Ee % 2,
          boolFlag = localVar_pe % 2 === 1 && localVar_Ee % 2 === 1,
          coordX = promiseRef ? listVar_Se || localVar_we || localVar_Pe ? gammaRef : localVar_re : fnVar_le,
          mapRef = promiseRef ? gammaRef : fnVar_le;
        return {
          left: coordX(boolFlag && !localVar_we && promiseRef ? factoryRef.left - 1 : factoryRef.left),
          top: mapRef(factoryRef.top),
          bottom: mapRef(factoryRef.bottom),
          right: coordX(factoryRef.right)
        }
      }
      var axisYRef = valueRef && /Firefox/i.test(navigator.userAgent);

      function betaRef(groupRef, promiseRef) {
        var alphaRef = promiseRef.x,
          factoryRef = promiseRef.y,
          axisXRef = groupRef.offsets.popper,
          gammaRef = helperFn_xe(groupRef.instance.modifiers, function(kindRef) {
            return kindRef.name === "applyStyle"
          })
          .gpuAcceleration;
        gammaRef !== void 0 && console.warn(
          "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
          );
        var localVar_re = gammaRef !== void 0 ? gammaRef : promiseRef.gpuAcceleration,
          localVar_le = labelRef(groupRef.instance.popper),
          localVar_pe = helperFn_fe(localVar_le),
          lookupTable_Ee = {
            position: axisXRef.position
          },
          localVar_Se = helperFn_sr(groupRef, window.devicePixelRatio < 2 || !axisYRef),
          strVar_we = alphaRef === "bottom" ? "top" : "bottom",
          strVar_Pe = factoryRef === "right" ? "left" : "right",
          boolFlag = helperFn_Xe("transform"),
          coordX = void 0,
          mapRef = void 0;
        if (strVar_we === "bottom" ? localVar_le.nodeName === "HTML" ? mapRef = -localVar_le
          .clientHeight + localVar_Se.bottom : mapRef = -localVar_pe.height + localVar_Se.bottom : mapRef =
          localVar_Se.top, strVar_Pe === "right" ? localVar_le.nodeName === "HTML" ? coordX = -localVar_le
          .clientWidth + localVar_Se.right : coordX = -localVar_pe.width + localVar_Se.right : coordX = localVar_Se
          .left, localVar_re && boolFlag) lookupTable_Ee[boolFlag] = "translate3d(" + coordX + "px, " + mapRef +
          "px, 0)", lookupTable_Ee[strVar_we] = 0, lookupTable_Ee[strVar_Pe] = 0, lookupTable_Ee.willChange = "transform";
        else {
          var variantRef = strVar_we === "bottom" ? -1 : 1,
            renamed__ = strVar_Pe === "right" ? -1 : 1;
          lookupTable_Ee[strVar_we] = mapRef * variantRef, lookupTable_Ee[strVar_Pe] = coordX * renamed__, lookupTable_Ee.willChange = strVar_we + ", " + strVar_Pe
        }
        var deltaRef = {
          "x-placement": groupRef.placement
        };
        return groupRef.attributes = jsonRef({}, deltaRef, groupRef.attributes), groupRef.styles = jsonRef({},
          lookupTable_Ee, groupRef.styles), groupRef.arrowStyles = jsonRef({}, groupRef.offsets.arrow, groupRef
          .arrowStyles), groupRef
      }

      function queueRef(groupRef, promiseRef, alphaRef) {
        var factoryRef = helperFn_xe(groupRef, function(paramArg_le) {
            var localVar_pe = paramArg_le.name;
            return localVar_pe === promiseRef
          }),
          axisXRef = !!factoryRef && groupRef.some(function(paramArg_le) {
            return paramArg_le.name === alphaRef && paramArg_le.enabled && paramArg_le.order < factoryRef.order
          });
        if (!axisXRef) {
          var gammaRef = "`" + promiseRef + "`",
            strVar_re = "`" + alphaRef + "`";
          console.warn(strVar_re + " modifier is required by " + gammaRef +
            " modifier in order to work, be sure to include it before " +
            gammaRef + "!")
        }
        return axisXRef
      }

      function quantRef(groupRef, promiseRef) {
        var alphaRef;
        if (!queueRef(groupRef.instance.modifiers, "arrow", "keepTogether")) return groupRef;
        var factoryRef = promiseRef.element;
        if (typeof factoryRef == "string") {
          if (factoryRef = groupRef.instance.popper.querySelector(factoryRef), !factoryRef) return groupRef
        } else if (!groupRef.instance.popper.contains(factoryRef)) return console.warn(
          "WARNING: `arrow.element` must be child of its popper element!"
          ), groupRef;
        var axisXRef = groupRef.placement.split("-")[0],
          gammaRef = groupRef.offsets,
          localVar_re = gammaRef.popper,
          localVar_le = gammaRef.reference,
          listVar_pe = ["left", "right"].indexOf(axisXRef) !== -1,
          localVar_Ee = listVar_pe ? "height" : "width",
          localVar_Se = listVar_pe ? "Top" : "Left",
          localVar_we = localVar_Se.toLowerCase(),
          localVar_Pe = listVar_pe ? "left" : "top",
          boolFlag = listVar_pe ? "bottom" : "right",
          coordX = renamed_$(factoryRef)[localVar_Ee];
        localVar_le[boolFlag] - coordX < localVar_re[localVar_we] && (groupRef.offsets.popper[localVar_we] -= localVar_re[localVar_we] - (localVar_le[boolFlag] -
          coordX)), localVar_le[localVar_we] + coordX > localVar_re[boolFlag] && (groupRef.offsets.popper[localVar_we] += localVar_le[localVar_we] +
          coordX - localVar_re[boolFlag]), groupRef.offsets.popper = moduleRef(groupRef.offsets.popper);
        var mapRef = localVar_le[localVar_we] + localVar_le[localVar_Ee] / 2 - coordX / 2,
          variantRef = listRef(groupRef.instance.popper),
          renamed__ = parseFloat(variantRef["margin" + localVar_Se]),
          deltaRef = parseFloat(variantRef["border" + localVar_Se + "Width"]),
          kindRef = mapRef - groupRef.offsets.popper[localVar_we] - renamed__ - deltaRef;
        return kindRef = Math.max(Math.min(localVar_re[localVar_Ee] - coordX, kindRef), 0), groupRef
          .arrowElement = factoryRef, groupRef.offsets.arrow = (alphaRef = {}, innerIndex(alphaRef, localVar_we, Math
            .round(kindRef)), innerIndex(alphaRef, localVar_Pe, ""), alphaRef), groupRef
      }

      function helperFn_ce(groupRef) {
        return groupRef === "end" ? "start" : groupRef === "start" ? "end" : groupRef
      }
      var listVar_me = ["auto-start", "auto", "auto-end", "top-start", "top",
          "top-end", "right-start", "right", "right-end", "bottom-end",
          "bottom", "bottom-start", "left-end", "left", "left-start"
        ],
        localVar_Oe = listVar_me.slice(3);

      function helperFn_Ne(groupRef) {
        var promiseRef = arguments.length > 1 && arguments[1] !== void 0 ?
          arguments[1] : !1,
          alphaRef = localVar_Oe.indexOf(groupRef),
          factoryRef = localVar_Oe.slice(alphaRef + 1)
          .concat(localVar_Oe.slice(0, alphaRef));
        return promiseRef ? factoryRef.reverse() : factoryRef
      }
      var lookupTable_$e = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise"
      };

      function helperFn_tt(groupRef, promiseRef) {
        if (helperFn_Ge(groupRef.instance.modifiers, "inner") || groupRef.flipped && groupRef
          .placement === groupRef.originalPlacement) return groupRef;
        var alphaRef = helperFn_ye(groupRef.instance.popper, groupRef.instance.reference, promiseRef.padding, promiseRef
            .boundariesElement, groupRef.positionFixed),
          factoryRef = groupRef.placement.split("-")[0],
          axisXRef = helperFn_te(factoryRef),
          gammaRef = groupRef.placement.split("-")[1] || "",
          listVar_re = [];
        switch (promiseRef.behavior) {
          case lookupTable_$e.FLIP:
            listVar_re = [factoryRef, axisXRef];
            break;
          case lookupTable_$e.CLOCKWISE:
            listVar_re = helperFn_Ne(factoryRef);
            break;
          case lookupTable_$e.COUNTERCLOCKWISE:
            listVar_re = helperFn_Ne(factoryRef, !0);
            break;
          default:
            listVar_re = promiseRef.behavior
        }
        return listVar_re.forEach(function(paramArg_le, paramArg_pe) {
          if (factoryRef !== paramArg_le || listVar_re.length === paramArg_pe + 1) return groupRef;
          factoryRef = groupRef.placement.split("-")[0], axisXRef = helperFn_te(factoryRef);
          var localVar_Ee = groupRef.offsets.popper,
            localVar_Se = groupRef.offsets.reference,
            localVar_we = Math.floor,
            strVar_Pe = factoryRef === "left" && localVar_we(localVar_Ee.right) > localVar_we(localVar_Se.left) || factoryRef ===
            "right" && localVar_we(localVar_Ee.left) < localVar_we(localVar_Se.right) || factoryRef === "top" &&
            localVar_we(localVar_Ee.bottom) > localVar_we(localVar_Se.top) || factoryRef === "bottom" && localVar_we(localVar_Ee
              .top) < localVar_we(localVar_Se.bottom),
            boolFlag = localVar_we(localVar_Ee.left) < localVar_we(alphaRef.left),
            coordX = localVar_we(localVar_Ee.right) > localVar_we(alphaRef.right),
            mapRef = localVar_we(localVar_Ee.top) < localVar_we(alphaRef.top),
            variantRef = localVar_we(localVar_Ee.bottom) > localVar_we(alphaRef.bottom),
            renamed__ = factoryRef === "left" && boolFlag || factoryRef === "right" && coordX || factoryRef ===
            "top" && mapRef || factoryRef === "bottom" && variantRef,
            deltaRef = ["top", "bottom"].indexOf(factoryRef) !== -1,
            kindRef = !!promiseRef.flipVariations && (deltaRef && gammaRef === "start" && boolFlag ||
              deltaRef && gammaRef === "end" && coordX || !deltaRef && gammaRef === "start" && mapRef || !
              deltaRef && gammaRef === "end" && variantRef),
            valueRefU = !!promiseRef.flipVariationsByContent && (deltaRef && gammaRef ===
              "start" && coordX || deltaRef && gammaRef === "end" && boolFlag || !deltaRef && gammaRef ===
              "start" && variantRef || !deltaRef && gammaRef === "end" && mapRef),
            iterRef = kindRef || valueRefU;
          (strVar_Pe || renamed__ || iterRef) && (groupRef.flipped = !0, (strVar_Pe || renamed__) && (factoryRef = listVar_re[
            paramArg_pe + 1]), iterRef && (gammaRef = helperFn_ce(gammaRef)), groupRef.placement = factoryRef + (gammaRef ?
            "-" + gammaRef : ""), groupRef.offsets.popper = jsonRef({}, groupRef.offsets
            .popper, helperFn_ge(groupRef.instance.popper, groupRef.offsets.reference, groupRef
              .placement)), groupRef = helperFn_ve(groupRef.instance.modifiers, groupRef,
            "flip"))
        }), groupRef
      }

      function helperFn_Je(groupRef) {
        var promiseRef = groupRef.offsets,
          alphaRef = promiseRef.popper,
          factoryRef = promiseRef.reference,
          axisXRef = groupRef.placement.split("-")[0],
          gammaRef = Math.floor,
          listVar_re = ["top", "bottom"].indexOf(axisXRef) !== -1,
          localVar_le = listVar_re ? "right" : "bottom",
          localVar_pe = listVar_re ? "left" : "top",
          localVar_Ee = listVar_re ? "width" : "height";
        return alphaRef[localVar_le] < gammaRef(factoryRef[localVar_pe]) && (groupRef.offsets.popper[localVar_pe] = gammaRef(factoryRef[localVar_pe]) - alphaRef[
            localVar_Ee]), alphaRef[localVar_pe] > gammaRef(factoryRef[localVar_le]) && (groupRef.offsets.popper[localVar_pe] = gammaRef(factoryRef[localVar_le])),
          groupRef
      }

      function helperFn_ut(groupRef, promiseRef, alphaRef, factoryRef) {
        var axisXRef = groupRef.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
          gammaRef = +axisXRef[1],
          localVar_re = axisXRef[2];
        if (!gammaRef) return groupRef;
        if (localVar_re.indexOf("%") === 0) {
          var localVar_le = void 0;
          switch (localVar_re) {
            case "%p":
              localVar_le = alphaRef;
              break;
            case "%":
            case "%r":
            default:
              localVar_le = factoryRef
          }
          var localVar_pe = moduleRef(localVar_le);
          return localVar_pe[promiseRef] / 100 * gammaRef
        } else if (localVar_re === "vh" || localVar_re === "vw") {
          var localVar_Ee = void 0;
          return localVar_re === "vh" ? localVar_Ee = Math.max(document.documentElement
            .clientHeight, window.innerHeight || 0) : localVar_Ee = Math.max(
            document.documentElement.clientWidth, window.innerWidth ||
            0), localVar_Ee / 100 * gammaRef
        } else return gammaRef
      }

      function helperFn_rt(groupRef, promiseRef, alphaRef, factoryRef) {
        var axisXRef = [0, 0],
          gammaRef = ["right", "left"].indexOf(factoryRef) !== -1,
          localVar_re = groupRef.split(/(\+|\-)/)
          .map(function(paramArg_Se) {
            return paramArg_Se.trim()
          }),
          localVar_le = localVar_re.indexOf(helperFn_xe(localVar_re, function(paramArg_Se) {
            return paramArg_Se.search(/,|\s/) !== -1
          }));
        localVar_re[localVar_le] && localVar_re[localVar_le].indexOf(",") === -1 && console.warn(
          "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
          );
        var localVar_pe = /\s*,\s*|\s+/,
          localVar_Ee = localVar_le !== -1 ? [localVar_re.slice(0, localVar_le)
            .concat([localVar_re[localVar_le].split(localVar_pe)[0]]), [localVar_re[localVar_le].split(localVar_pe)[1]]
            .concat(localVar_re.slice(localVar_le + 1))
          ] : [localVar_re];
        return localVar_Ee = localVar_Ee.map(function(paramArg_Se, paramArg_we) {
          var numVar_Pe = (paramArg_we === 1 ? !gammaRef : gammaRef) ? "height" : "width",
            boolFlag = !1;
          return paramArg_Se.reduce(function(coordX, mapRef) {
              return coordX[coordX.length - 1] === "" && ["+", "-"].indexOf(
                  mapRef) !== -1 ? (coordX[coordX.length - 1] = mapRef, boolFlag = !0, coordX) :
                boolFlag ? (coordX[coordX.length - 1] += mapRef, boolFlag = !1, coordX) : coordX.concat(
                  mapRef)
            }, [])
            .map(function(coordX) {
              return helperFn_ut(coordX, numVar_Pe, promiseRef, alphaRef)
            })
        }), localVar_Ee.forEach(function(paramArg_Se, paramArg_we) {
          paramArg_Se.forEach(function(paramArg_Pe, boolFlag) {
            helperFn_Et(paramArg_Pe) && (axisXRef[paramArg_we] += paramArg_Pe * (paramArg_Se[boolFlag - 1] === "-" ? -1 :
              1))
          })
        }), axisXRef
      }

      function helperFn_Rt(groupRef, promiseRef) {
        var alphaRef = promiseRef.offset,
          factoryRef = groupRef.placement,
          axisXRef = groupRef.offsets,
          gammaRef = axisXRef.popper,
          localVar_re = axisXRef.reference,
          localVar_le = factoryRef.split("-")[0],
          localVar_pe = void 0;
        return helperFn_Et(+alphaRef) ? localVar_pe = [+alphaRef, 0] : localVar_pe = helperFn_rt(alphaRef, gammaRef, localVar_re, localVar_le), localVar_le ===
          "left" ? (gammaRef.top += localVar_pe[0], gammaRef.left -= localVar_pe[1]) : localVar_le === "right" ?
          (gammaRef.top += localVar_pe[0], gammaRef.left += localVar_pe[1]) : localVar_le === "top" ? (gammaRef.left +=
            localVar_pe[0], gammaRef.top -= localVar_pe[1]) : localVar_le === "bottom" && (gammaRef.left += localVar_pe[
            0], gammaRef.top += localVar_pe[1]), groupRef.popper = gammaRef, groupRef
      }

      function helperFn_Wt(groupRef, promiseRef) {
        var alphaRef = promiseRef.boundariesElement || labelRef(groupRef.instance.popper);
        groupRef.instance.reference === alphaRef && (alphaRef = labelRef(alphaRef));
        var factoryRef = helperFn_Xe("transform"),
          axisXRef = groupRef.instance.popper.style,
          gammaRef = axisXRef.top,
          localVar_re = axisXRef.left,
          localVar_le = axisXRef[factoryRef];
        axisXRef.top = "", axisXRef.left = "", axisXRef[factoryRef] = "";
        var localVar_pe = helperFn_ye(groupRef.instance.popper, groupRef.instance.reference, promiseRef.padding,
          alphaRef, groupRef.positionFixed);
        axisXRef.top = gammaRef, axisXRef.left = localVar_re, axisXRef[factoryRef] = localVar_le, promiseRef.boundaries = localVar_pe;
        var localVar_Ee = promiseRef.priority,
          localVar_Se = groupRef.offsets.popper,
          lookupTable_we = {
            primary: function(boolFlag) {
              var coordX = localVar_Se[boolFlag];
              return localVar_Se[boolFlag] < localVar_pe[boolFlag] && !promiseRef.escapeWithReference && (coordX =
                Math.max(localVar_Se[boolFlag], localVar_pe[boolFlag])), innerIndex({}, boolFlag, coordX)
            },
            secondary: function(boolFlag) {
              var coordX = boolFlag === "right" ? "left" : "top",
                mapRef = localVar_Se[coordX];
              return localVar_Se[boolFlag] > localVar_pe[boolFlag] && !promiseRef.escapeWithReference && (mapRef =
                Math.min(localVar_Se[coordX], localVar_pe[boolFlag] - (boolFlag === "right" ? localVar_Se.width :
                  localVar_Se.height))), innerIndex({}, coordX, mapRef)
            }
          };
        return localVar_Ee.forEach(function(paramArg_Pe) {
          var boolFlag = ["left", "top"].indexOf(paramArg_Pe) !== -1 ? "primary" :
            "secondary";
          localVar_Se = jsonRef({}, localVar_Se, lookupTable_we[boolFlag](paramArg_Pe))
        }), groupRef.offsets.popper = localVar_Se, groupRef
      }

      function helperFn_cr(groupRef) {
        var promiseRef = groupRef.placement,
          alphaRef = promiseRef.split("-")[0],
          factoryRef = promiseRef.split("-")[1];
        if (factoryRef) {
          var axisXRef = groupRef.offsets,
            gammaRef = axisXRef.reference,
            localVar_re = axisXRef.popper,
            listVar_le = ["bottom", "top"].indexOf(alphaRef) !== -1,
            localVar_pe = listVar_le ? "left" : "top",
            localVar_Ee = listVar_le ? "width" : "height",
            lookupTable_Se = {
              start: innerIndex({}, localVar_pe, gammaRef[localVar_pe]),
              end: innerIndex({}, localVar_pe, gammaRef[localVar_pe] + gammaRef[localVar_Ee] - localVar_re[localVar_Ee])
            };
          groupRef.offsets.popper = jsonRef({}, localVar_re, lookupTable_Se[factoryRef])
        }
        return groupRef
      }

      function helperFn_Gt(groupRef) {
        if (!queueRef(groupRef.instance.modifiers, "hide", "preventOverflow"))
        return groupRef;
        var promiseRef = groupRef.offsets.reference,
          alphaRef = helperFn_xe(groupRef.instance.modifiers, function(factoryRef) {
            return factoryRef.name === "preventOverflow"
          })
          .boundaries;
        if (promiseRef.bottom < alphaRef.top || promiseRef.left > alphaRef.right || promiseRef.top > alphaRef.bottom ||
          promiseRef.right < alphaRef.left) {
          if (groupRef.hide === !0) return groupRef;
          groupRef.hide = !0, groupRef.attributes["x-out-of-boundaries"] = ""
        } else {
          if (groupRef.hide === !1) return groupRef;
          groupRef.hide = !1, groupRef.attributes["x-out-of-boundaries"] = !1
        }
        return groupRef
      }

      function helperFn_dt(groupRef) {
        var promiseRef = groupRef.placement,
          alphaRef = promiseRef.split("-")[0],
          factoryRef = groupRef.offsets,
          axisXRef = factoryRef.popper,
          gammaRef = factoryRef.reference,
          listVar_re = ["left", "right"].indexOf(alphaRef) !== -1,
          listVar_le = ["top", "left"].indexOf(alphaRef) === -1;
        return axisXRef[listVar_re ? "left" : "top"] = gammaRef[alphaRef] - (listVar_le ? axisXRef[listVar_re ? "width" :
            "height"] : 0), groupRef.placement = helperFn_te(promiseRef), groupRef.offsets.popper = moduleRef(
          axisXRef), groupRef
      }
      var lookupTable_Fe = {
          shift: {
            order: 100,
            enabled: !0,
            fn: helperFn_cr
          },
          offset: {
            order: 200,
            enabled: !0,
            fn: helperFn_Rt,
            offset: 0
          },
          preventOverflow: {
            order: 300,
            enabled: !0,
            fn: helperFn_Wt,
            priority: ["left", "right", "top", "bottom"],
            padding: 5,
            boundariesElement: "scrollParent"
          },
          keepTogether: {
            order: 400,
            enabled: !0,
            fn: helperFn_Je
          },
          arrow: {
            order: 500,
            enabled: !0,
            fn: quantRef,
            element: "[x-arrow]"
          },
          flip: {
            order: 600,
            enabled: !0,
            fn: helperFn_tt,
            behavior: "flip",
            padding: 5,
            boundariesElement: "viewport",
            flipVariations: !1,
            flipVariationsByContent: !1
          },
          inner: {
            order: 700,
            enabled: !1,
            fn: helperFn_dt
          },
          hide: {
            order: 800,
            enabled: !0,
            fn: helperFn_Gt
          },
          computeStyle: {
            order: 850,
            enabled: !0,
            fn: betaRef,
            gpuAcceleration: !0,
            x: "bottom",
            y: "right"
          },
          applyStyle: {
            order: 900,
            enabled: !0,
            fn: helperFn_et,
            onLoad: helperFn_at,
            gpuAcceleration: void 0
          }
        },
        lookupTable_xt = {
          placement: "bottom",
          positionFixed: !1,
          eventsEnabled: !0,
          removeOnDestroy: !1,
          onCreate: function() {},
          onUpdate: function() {},
          modifiers: lookupTable_Fe
        },
        fnVar_mt = function() {
          function groupRef(promiseRef, alphaRef) {
            var factoryRef = this,
              axisXRef = arguments.length > 2 && arguments[2] !== void 0 ?
              arguments[2] : {};
            keyRef(this, groupRef), this.scheduleUpdate = function() {
                return requestAnimationFrame(factoryRef.update)
              }, this.update = indexRef(this.update.bind(this)), this.options =
              jsonRef({}, groupRef.Defaults, axisXRef), this.state = {
                isDestroyed: !1,
                isCreated: !1,
                scrollParents: []
              }, this.reference = promiseRef && promiseRef.jquery ? promiseRef[0] : promiseRef, this
              .popper = alphaRef && alphaRef.jquery ? alphaRef[0] : alphaRef, this.options
              .modifiers = {}, Object.keys(jsonRef({}, groupRef.Defaults.modifiers, axisXRef
                .modifiers))
              .forEach(function(paramArg_re) {
                factoryRef.options.modifiers[paramArg_re] = jsonRef({}, groupRef.Defaults.modifiers[
                  paramArg_re] || {}, axisXRef.modifiers ? axisXRef.modifiers[paramArg_re] : {})
              }), this.modifiers = Object.keys(this.options.modifiers)
              .map(function(paramArg_re) {
                return jsonRef({
                  name: paramArg_re
                }, factoryRef.options.modifiers[paramArg_re])
              })
              .sort(function(paramArg_re, paramArg_le) {
                return paramArg_re.order - paramArg_le.order
              }), this.modifiers.forEach(function(paramArg_re) {
                paramArg_re.enabled && accumulator(paramArg_re.onLoad) && paramArg_re.onLoad(factoryRef.reference, factoryRef
                  .popper, factoryRef.options, paramArg_re, factoryRef.state)
              }), this.update();
            var gammaRef = this.options.eventsEnabled;
            gammaRef && this.enableEventListeners(), this.state.eventsEnabled =
              gammaRef
          }
          return nodeRef(groupRef, [{
            key: "update",
            value: function() {
              return helperFn_ze.call(this)
            }
          }, {
            key: "destroy",
            value: function() {
              return helperFn_Ze.call(this)
            }
          }, {
            key: "enableEventListeners",
            value: function() {
              return helperFn_ct.call(this)
            }
          }, {
            key: "disableEventListeners",
            value: function() {
              return helperFn_Bt.call(this)
            }
          }]), groupRef
        }();
      return fnVar_mt.Utils = (typeof window < "u" ? window : global)
        .PopperUtils, fnVar_mt.placements = listVar_me, fnVar_mt.Defaults = lookupTable_xt, fnVar_mt
    })
  });
  var fnVar_B0 = defineCommonjsModule(paramArg_pp => {
    "use strict";
    Object.defineProperty(paramArg_pp, "__esModule", {
      value: !0
    });
    var objHelper_vs = Object.assign || function(valueRef) {
        for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
          var resultRef = arguments[entryRef];
          for (var countRef in resultRef) Object.prototype.hasOwnProperty.call(resultRef, countRef) && (
            valueRef[countRef] = resultRef[countRef])
        }
        return valueRef
      },
      fnVar_jE = function() {
        function valueRef(entryRef, resultRef) {
          for (var countRef = 0; countRef < resultRef.length; countRef++) {
            var optionRef = resultRef[countRef];
            optionRef.enumerable = optionRef.enumerable || !1, optionRef.configurable = !0,
              "value" in optionRef && (optionRef.writable = !0), Object.defineProperty(entryRef,
                optionRef.key, optionRef)
          }
        }
        return function(entryRef, resultRef, countRef) {
          return resultRef && valueRef(entryRef.prototype, resultRef), countRef && valueRef(entryRef, countRef), entryRef
        }
      }(),
      localVar_z0 = fnVar_gt(),
      localVar_RE = fnVar_kn(),
      localVar_hr = helperFn_q0(localVar_RE),
      localVar_IE = fnVar_F0(),
      localVar_$0 = helperFn_q0(localVar_IE);

    function helperFn_q0(valueRef) {
      return valueRef && valueRef.__esModule ? valueRef : {
        default: valueRef
      }
    }

    function helperFn_DE(valueRef, entryRef) {
      var resultRef = {};
      for (var countRef in valueRef) entryRef.indexOf(countRef) >= 0 || Object.prototype
        .hasOwnProperty.call(valueRef, countRef) && (resultRef[countRef] = valueRef[countRef]);
      return resultRef
    }

    function helperFn_FE(valueRef, entryRef) {
      if (!(valueRef instanceof entryRef)) throw new TypeError(
        "Cannot call a class as a function")
    }

    function helperFn_L0(valueRef, entryRef) {
      if (!valueRef) throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
      return entryRef && (typeof entryRef == "object" || typeof entryRef == "function") ? entryRef : valueRef
    }

    function helperFn_zE(valueRef, entryRef) {
      if (typeof entryRef != "function" && entryRef !== null) throw new TypeError(
        "Super expression must either be null or a function, not " +
        typeof entryRef);
      valueRef.prototype = Object.create(entryRef && entryRef.prototype, {
        constructor: {
          value: valueRef,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), entryRef && (Object.setPrototypeOf ? Object.setPrototypeOf(valueRef, entryRef) : valueRef
        .__proto__ = entryRef)
    }
    var fnVar_ea = function(valueRef) {
      helperFn_zE(entryRef, valueRef);

      function entryRef() {
        var resultRef, countRef, optionRef, indexRef;
        helperFn_FE(this, entryRef);
        for (var accumulator = arguments.length, listRef = Array(accumulator), configRef = 0; configRef < accumulator; configRef++)
          listRef[configRef] = arguments[configRef];
        return indexRef = (countRef = (optionRef = helperFn_L0(this, (resultRef = entryRef.__proto__ || Object
              .getPrototypeOf(entryRef))
            .call.apply(resultRef, [this].concat(listRef))), optionRef), optionRef.state = {}, optionRef
          ._setArrowNode = function(unitRef) {
            optionRef._arrowNode = unitRef
          }, optionRef._getTargetNode = function() {
            return optionRef.context.popperManager.getTargetNode()
          }, optionRef._getOffsets = function(unitRef) {
            return Object.keys(unitRef.offsets)
              .map(function(propRef) {
                return unitRef.offsets[propRef]
              })
          }, optionRef._isDataDirty = function(unitRef) {
            return optionRef.state.data ? JSON.stringify(optionRef._getOffsets(optionRef.state
              .data)) !== JSON.stringify(optionRef._getOffsets(unitRef)) : !0
          }, optionRef._updateStateModifier = {
            enabled: !0,
            order: 900,
            fn: function(propRef) {
              return optionRef._isDataDirty(propRef) && optionRef.setState({
                data: propRef
              }), propRef
            }
          }, optionRef._getPopperStyle = function() {
            var unitRef = optionRef.state.data;
            return !optionRef._popper || !unitRef ? {
              position: "absolute",
              pointerEvents: "none",
              opacity: 0
            } : objHelper_vs({
              position: unitRef.offsets.popper.position
            }, unitRef.styles)
          }, optionRef._getPopperPlacement = function() {
            return optionRef.state.data ? optionRef.state.data.placement : void 0
          }, optionRef._getPopperHide = function() {
            return optionRef.state.data && optionRef.state.data.hide ? "" : void 0
          }, optionRef._getArrowStyle = function() {
            if (!optionRef.state.data || !optionRef.state.data.offsets.arrow)
              return {};
            var unitRef = optionRef.state.data.offsets.arrow,
              propRef = unitRef.top,
              funcRef = unitRef.left;
            return {
              top: propRef,
              left: funcRef
            }
          }, optionRef._handlePopperRef = function(unitRef) {
            optionRef._popperNode = unitRef, unitRef ? optionRef._createPopper() : optionRef
              ._destroyPopper(), optionRef.props.innerRef && optionRef.props.innerRef(
                unitRef)
          }, optionRef._scheduleUpdate = function() {
            optionRef._popper && optionRef._popper.scheduleUpdate()
          }, countRef), helperFn_L0(optionRef, indexRef)
      }
      return fnVar_jE(entryRef, [{
        key: "getChildContext",
        value: function() {
          return {
            popper: {
              setArrowNode: this._setArrowNode,
              getArrowStyle: this._getArrowStyle
            }
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function(countRef) {
          (countRef.placement !== this.props.placement || countRef
            .eventsEnabled !== this.props.eventsEnabled) && (
            this._destroyPopper(), this._createPopper()), countRef
            .children !== this.props.children && this
            ._scheduleUpdate()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this._destroyPopper()
        }
      }, {
        key: "_createPopper",
        value: function() {
          var countRef = this,
            optionRef = this.props,
            indexRef = optionRef.placement,
            accumulator = optionRef.eventsEnabled,
            listRef = objHelper_vs({}, this.props.modifiers, {
              applyStyle: {
                enabled: !1
              },
              updateState: this._updateStateModifier
            });
          this._arrowNode && (listRef.arrow = {
            element: this._arrowNode
          }), this._popper = new localVar_$0.default(this
            ._getTargetNode(), this._popperNode, {
              placement: indexRef,
              eventsEnabled: accumulator,
              modifiers: listRef
            }), setTimeout(function() {
            return countRef._scheduleUpdate()
          })
        }
      }, {
        key: "_destroyPopper",
        value: function() {
          this._popper && this._popper.destroy()
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.component,
            indexRef = countRef.innerRef,
            accumulator = countRef.placement,
            listRef = countRef.eventsEnabled,
            configRef = countRef.modifiers,
            unitRef = countRef.children,
            propRef = helperFn_DE(countRef, ["component", "innerRef", "placement",
              "eventsEnabled", "modifiers", "children"
            ]),
            funcRef = this._getPopperStyle(),
            coordY = this._getPopperPlacement(),
            outputRef = this._getPopperHide();
          if (typeof unitRef == "function") {
            var labelRef = {
              ref: this._handlePopperRef,
              style: funcRef,
              "data-placement": coordY,
              "data-x-out-of-boundaries": outputRef
            };
            return unitRef({
              popperProps: labelRef,
              restProps: propRef,
              scheduleUpdate: this._scheduleUpdate
            })
          }
          var depthRef = objHelper_vs({}, propRef, {
            style: objHelper_vs({}, propRef.style, funcRef),
            "data-placement": coordY,
            "data-x-out-of-boundaries": outputRef
          });
          return typeof optionRef == "string" ? depthRef.ref = this
            ._handlePopperRef : depthRef.innerRef = this
            ._handlePopperRef, (0, localVar_z0.createElement)(optionRef, depthRef, unitRef)
        }
      }]), entryRef
    }(localVar_z0.Component);
    fnVar_ea.contextTypes = {
      popperManager: localVar_hr.default.object.isRequired
    };
    fnVar_ea.childContextTypes = {
      popper: localVar_hr.default.object.isRequired
    };
    fnVar_ea.propTypes = {
      component: localVar_hr.default.oneOfType([localVar_hr.default.node, localVar_hr.default
        .func]),
      innerRef: localVar_hr.default.func,
      placement: localVar_hr.default.oneOf(localVar_$0.default.placements),
      eventsEnabled: localVar_hr.default.bool,
      modifiers: localVar_hr.default.object,
      children: localVar_hr.default.oneOfType([localVar_hr.default.node, localVar_hr.default.func])
    };
    fnVar_ea.defaultProps = {
      component: "div",
      placement: "bottom",
      eventsEnabled: !0,
      modifiers: {}
    };
    paramArg_pp.default = fnVar_ea
  });
  var fnVar_W0 = defineCommonjsModule(paramArg_mp => {
    "use strict";
    Object.defineProperty(paramArg_mp, "__esModule", {
      value: !0
    });
    var objHelper_U0 = Object.assign || function(valueRef) {
        for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
          var resultRef = arguments[entryRef];
          for (var countRef in resultRef) Object.prototype.hasOwnProperty.call(resultRef, countRef) && (
            valueRef[countRef] = resultRef[countRef])
        }
        return valueRef
      },
      localVar_LE = fnVar_gt(),
      localVar_$E = fnVar_kn(),
      localVar_Tn = helperFn_qE(localVar_$E);

    function helperFn_qE(valueRef) {
      return valueRef && valueRef.__esModule ? valueRef : {
        default: valueRef
      }
    }

    function helperFn_BE(valueRef, entryRef) {
      var resultRef = {};
      for (var countRef in valueRef) entryRef.indexOf(countRef) >= 0 || Object.prototype
        .hasOwnProperty.call(valueRef, countRef) && (resultRef[countRef] = valueRef[countRef]);
      return resultRef
    }
    var fnVar_fp = function(entryRef, resultRef) {
      var countRef = entryRef.component,
        optionRef = countRef === void 0 ? "span" : countRef,
        indexRef = entryRef.innerRef,
        accumulator = entryRef.children,
        listRef = helperFn_BE(entryRef, ["component", "innerRef", "children"]),
        configRef = resultRef.popper,
        unitRef = function(labelRef) {
          configRef.setArrowNode(labelRef), typeof indexRef == "function" && indexRef(labelRef)
        },
        propRef = configRef.getArrowStyle();
      if (typeof accumulator == "function") {
        var funcRef = {
          ref: unitRef,
          style: propRef
        };
        return accumulator({
          arrowProps: funcRef,
          restProps: listRef
        })
      }
      var coordY = objHelper_U0({}, listRef, {
        style: objHelper_U0({}, propRef, listRef.style)
      });
      return typeof optionRef == "string" ? coordY.ref = unitRef : coordY.innerRef = unitRef, (0, localVar_LE
        .createElement)(optionRef, coordY, accumulator)
    };
    fnVar_fp.contextTypes = {
      popper: localVar_Tn.default.object.isRequired
    };
    fnVar_fp.propTypes = {
      component: localVar_Tn.default.oneOfType([localVar_Tn.default.node, localVar_Tn.default
        .func]),
      innerRef: localVar_Tn.default.func,
      children: localVar_Tn.default.oneOfType([localVar_Tn.default.node, localVar_Tn.default.func])
    };
    paramArg_mp.default = fnVar_fp
  });
  var fnVar_H0 = defineCommonjsModule(paramArg_Dr => {
    "use strict";
    Object.defineProperty(paramArg_Dr, "__esModule", {
      value: !0
    });
    paramArg_Dr.Arrow = paramArg_Dr.Popper = paramArg_Dr.Target = paramArg_Dr.Manager = void 0;
    var localVar_UE = fnVar_I0(),
      localVar_WE = helperFn_ys(localVar_UE),
      localVar_HE = fnVar_D0(),
      localVar_VE = helperFn_ys(localVar_HE),
      localVar_KE = fnVar_B0(),
      localVar_GE = helperFn_ys(localVar_KE),
      localVar_QE = fnVar_W0(),
      localVar_YE = helperFn_ys(localVar_QE);

    function helperFn_ys(valueRef) {
      return valueRef && valueRef.__esModule ? valueRef : {
        default: valueRef
      }
    }
    paramArg_Dr.Manager = localVar_WE.default;
    paramArg_Dr.Target = localVar_VE.default;
    paramArg_Dr.Popper = localVar_GE.default;
    paramArg_Dr.Arrow = localVar_YE.default
  });
  var fnVar_Q0 = defineCommonjsModule((paramArg_g7, paramArg_G0) => {
    var localVar_V0 = NaN,
      strVar_XE = "[object Symbol]",
      localVar_JE = /^\s+|\s+$/g,
      localVar_ZE = /^[-+]0x[0-9a-f]+$/i,
      localVar_eT = /^0b[01]+$/i,
      localVar_tT = /^0o[0-7]+$/i,
      localVar_rT = parseInt,
      localVar_nT = Object.prototype,
      localVar_oT = localVar_nT.toString;

    function helperFn_K0(valueRef) {
      var entryRef = typeof valueRef;
      return !!valueRef && (entryRef == "object" || entryRef == "function")
    }

    function helperFn_iT(valueRef) {
      return !!valueRef && typeof valueRef == "object"
    }

    function helperFn_aT(valueRef) {
      return typeof valueRef == "symbol" || helperFn_iT(valueRef) && localVar_oT.call(valueRef) == strVar_XE
    }

    function helperFn_lT(valueRef) {
      if (typeof valueRef == "number") return valueRef;
      if (helperFn_aT(valueRef)) return localVar_V0;
      if (helperFn_K0(valueRef)) {
        var entryRef = typeof valueRef.valueOf == "function" ? valueRef.valueOf() : valueRef;
        valueRef = helperFn_K0(entryRef) ? entryRef + "" : entryRef
      }
      if (typeof valueRef != "string") return valueRef === 0 ? valueRef : +valueRef;
      valueRef = valueRef.replace(localVar_JE, "");
      var resultRef = localVar_eT.test(valueRef);
      return resultRef || localVar_tT.test(valueRef) ? localVar_rT(valueRef.slice(2), resultRef ? 2 : 8) : localVar_ZE.test(valueRef) ?
        localVar_V0 : +valueRef
    }
    paramArg_G0.exports = helperFn_lT
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var fnVar_k_ = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.__vdhDeepEqual; // de-vendored: loaded from content/vendor/
  });
  var fnVar_qm = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.__vdhReactJson; // de-vendored: loaded from content/vendor/
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var fnVar_c5 = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.browser; // de-vendored: loaded from content/vendor/
  });
  var fnVar_wc = defineCommonjsModule((paramArg_Vj, paramArg_nn) => {
    "use strict";
    paramArg_nn.exports.browser = fnVar_c5();
    var localVar_Ta;
    typeof browser > "u" && typeof chrome < "u" && chrome.runtime ?
      /\bOPR\//.test(navigator.userAgent) ? localVar_Ta = "opera" : localVar_Ta = "chrome" :
      /\bEdge\//.test(navigator.userAgent) ? localVar_Ta = "edge" : localVar_Ta = "firefox",
      paramArg_nn.exports.browserType = localVar_Ta, typeof paramArg_nn.exports.browser.action >
      "u" && (paramArg_nn.exports.browser.action = paramArg_nn.exports.browser
        .browserAction), paramArg_nn.exports.isBrowser = (...valueRef) => {
        for (let entryRef = 0; entryRef < valueRef.length; entryRef++)
          if (valueRef[entryRef] == paramArg_nn.exports.browserType) return !0;
        return !1
      }, paramArg_nn.exports.error = valueRef => {
        console.groupCollapsed(valueRef.message), valueRef.stack && console.error(valueRef
          .stack), console.groupEnd()
      }
  });
  var fnVar_Qm = defineCommonjsModule((paramArg_Kj, paramArg_u5) => {
    "use strict";
    var localVar_Gm = class {
      constructor() {
        this.replyId = 0, this.replies = {}, this.listeners = {}, this
          .hook = this.nullHook, this.debugLevel = 0, this
          .useTarget = !1, this.logger = console, this.posts = {}
      }
      setPost(entryRef, resultRef) {
        typeof entryRef == "string" ? this.posts[entryRef] = resultRef : this.post = entryRef
      }
      setUseTarget(entryRef) {
        this.useTarget = entryRef
      }
      setDebugLevel(entryRef) {
        this.debugLevel = entryRef
      }
      setHook(entryRef) {
        let resultRef = this,
          countRef = Date.now();

        function optionRef() {
          return typeof window < "u" && typeof window.performance <
            "u" ? window.performance.now() : Date.now() - countRef
        }
        entryRef ? this.hook = indexRef => {
          indexRef.timestamp = optionRef();
          try {
            entryRef(indexRef)
          } catch (accumulator) {
            resultRef.logger.warn("Hoor error", accumulator)
          }
        } : this.hook = this.nullHook
      }
      nullHook() {}
      call() {
        let entryRef = this,
          resultRef, countRef, optionRef, indexRef, accumulator = Array.prototype.slice.call(arguments);
        return typeof accumulator[0] == "function" && (resultRef = accumulator.shift()), entryRef
          .useTarget ? [countRef, optionRef, ...indexRef] = accumulator : [optionRef, ...indexRef] = accumulator, new Promise(
            function(listRef, configRef) {
              let unitRef = ++entryRef.replyId;
              entryRef.debugLevel >= 2 && entryRef.logger.info("rpc #" + unitRef,
                "call =>", optionRef, indexRef), entryRef.hook({
                type: "call",
                callee: countRef,
                rid: unitRef,
                method: optionRef,
                args: indexRef
              }), entryRef.replies[unitRef] = {
                resolve: listRef,
                reject: configRef,
                peer: countRef
              };
              let propRef = resultRef || entryRef.useTarget && entryRef.posts[countRef] || entryRef.post;
              entryRef.useTarget ? propRef(countRef, {
                type: "weh#rpc",
                _request: unitRef,
                _method: optionRef,
                _args: [...indexRef]
              }) : propRef({
                type: "weh#rpc",
                _request: unitRef,
                _method: optionRef,
                _args: [...indexRef]
              })
            })
      }
      receive(entryRef, resultRef, countRef) {
        let optionRef = this;
        if (entryRef._request) Promise.resolve()
          .then(() => {
            let indexRef = optionRef.listeners[entryRef._method];
            if (typeof indexRef == "function") return optionRef.debugLevel >= 2 &&
              optionRef.logger.info("rpc #" + entryRef._request, "serve <= ", entryRef
                ._method, entryRef._args), optionRef.hook({
                type: "call",
                caller: countRef,
                rid: entryRef._request,
                method: entryRef._method,
                args: entryRef._args
              }), Promise.resolve(indexRef.apply(null, entryRef._args))
              .then(accumulator => (optionRef.hook({
                type: "reply",
                caller: countRef,
                rid: entryRef._request,
                result: accumulator
              }), accumulator))
              .catch(accumulator => {
                throw optionRef.hook({
                  type: "reply",
                  caller: countRef,
                  rid: entryRef._request,
                  error: accumulator.message
                }), accumulator
              });
            throw new Error("Method " + entryRef._method +
              " is not a function")
          })
          .then(indexRef => {
            optionRef.debugLevel >= 2 && optionRef.logger.info("rpc #" + entryRef._request,
              "serve => ", indexRef), resultRef({
              type: "weh#rpc",
              _reply: entryRef._request,
              _result: indexRef
            })
          })
          .catch(indexRef => {
            optionRef.debugLevel >= 1 && optionRef.logger.info("rpc #" + entryRef._request,
              "serve => !", indexRef.message), resultRef({
              type: "weh#rpc",
              _reply: entryRef._request,
              _error: indexRef.message
            })
          });
        else if (entryRef._reply) {
          let indexRef = optionRef.replies[entryRef._reply];
          delete optionRef.replies[entryRef._reply], indexRef ? entryRef._error ? (optionRef.debugLevel >=
            1 && optionRef.logger.info("rpc #" + entryRef._reply, "call <= !", entryRef
              ._error), optionRef.hook({
              type: "reply",
              callee: indexRef.peer,
              rid: entryRef._reply,
              error: entryRef._error
            }), indexRef.reject(new Error(entryRef._error))) : (optionRef.debugLevel >=
            2 && optionRef.logger.info("rpc #" + entryRef._reply, "call <= ", entryRef
              ._result), optionRef.hook({
              type: "reply",
              callee: indexRef.peer,
              rid: entryRef._reply,
              result: entryRef._result
            }), indexRef.resolve(entryRef._result)) : optionRef.logger.error(
            "Missing reply handler")
        }
      }
      listen(entryRef) {
        Object.assign(this.listeners, entryRef)
      }
    };
    paramArg_u5.exports = new localVar_Gm
  });
  var fnVar_Xm = defineCommonjsModule((paramArg_Gj, paramArg_m5) => {
    "use strict";
    var {
      browser: localVar_Ym
    } = fnVar_wc(), lookupTable_p5 = {}, lookupTable_d5 = new RegExp("\\$[a-zA-Z]*([0-9]+)\\$", "g"),
      localVar_f5 = !1, localVar_B4 = localVar_Ym.storage.local.get("wehI18nCustom")
      .then(valueRef => {
        localVar_f5 = !0;
        let entryRef = valueRef.wehI18nCustom;
        entryRef && Object.assign(lookupTable_p5, entryRef)
      });

    function helperFn_U4(valueRef, entryRef) {
      if (localVar_f5 || console.warn(
          "Using `weh._` before custom strings were loaded:", valueRef), /-/
        .test(valueRef)) {
        let countRef = valueRef.replace(/-/g, "_");
        console.warn("Wrong i18n message name. Should it be", countRef,
          "instead of", valueRef, "?"), valueRef = countRef
      }
      let resultRef = lookupTable_p5[valueRef];
      if (entryRef && !Array.isArray(entryRef) && (entryRef = [entryRef]), resultRef && resultRef.message.length > 0)
        return (resultRef.message || "")
          .replace(lookupTable_d5, countRef => {
            let optionRef = lookupTable_d5.exec(countRef);
            return optionRef && entryRef && entryRef[parseInt(optionRef[1]) - 1] || "??"
          });
      try {
        return entryRef ? localVar_Ym.i18n.getMessage(valueRef, entryRef) : localVar_Ym.i18n.getMessage(valueRef)
      } catch {
        return ""
      }
    }
    paramArg_m5.exports = {
      getMessage: helperFn_U4,
      custom_strings_ready: localVar_B4
    }
  });
  var fnVar_v5 = defineCommonjsModule((paramArg_Qj, paramArg_b5) => {
    "use strict";
    var localVar_Jm = fnVar_Xm()
      .getMessage,
      lookupTable_g5 = {};

    function helperFn_h5() {
      this.$specs = {}, this.$values = null, this.$values || (this
        .$values = {}), this.$listeners = {}
    }
    helperFn_h5.prototype = {
      notify: function(valueRef, entryRef, resultRef, countRef) {
        let optionRef = this,
          indexRef = valueRef.split("."),
          accumulator = [];
        for (let listRef = indexRef.length; listRef >= 0; listRef--) accumulator.push(indexRef.slice(0, listRef)
          .join("."));
        accumulator.forEach(function(listRef) {
          let configRef = optionRef.$listeners[listRef];
          configRef && configRef.forEach(function(unitRef) {
            if (unitRef.specs == countRef)
              if (unitRef.pack) unitRef.pack[valueRef] = entryRef, typeof unitRef.old[valueRef] >
                "u" && (unitRef.old[valueRef] = resultRef), unitRef.timer &&
                clearTimeout(unitRef.timer), unitRef.timer = setTimeout(
                  function() {
                    delete unitRef.timer;
                    let propRef = unitRef.pack,
                      funcRef = unitRef.old;
                    unitRef.pack = {}, unitRef.old = {};
                    try {
                      unitRef.callback(propRef, funcRef)
                    } catch {}
                  }, 0);
              else try {
                unitRef.callback(valueRef, entryRef, resultRef)
              } catch {}
          })
        })
      },
      forceNotify: function(valueRef) {
        typeof valueRef > "u" && (valueRef = !1);
        let entryRef = this;
        Object.keys(entryRef.$specs)
          .forEach(resultRef => {
            entryRef.notify(resultRef, entryRef.$values[resultRef], entryRef.$values[resultRef], valueRef)
          })
      },
      declare: function(valueRef) {
        let entryRef = this;
        Array.isArray(valueRef) || (valueRef = Object.keys(valueRef)
          .map(function(resultRef) {
            let countRef = valueRef[resultRef];
            return countRef.name = resultRef, countRef
          })), valueRef.forEach(function(resultRef) {
          if (lookupTable_g5[resultRef.name]) throw new Error("Forbidden prefs key " +
            resultRef.name);
          let countRef;
          resultRef.hidden ? (resultRef.label = resultRef.name, resultRef.description = "") : (countRef =
              resultRef.name.replace(/[^0-9a-zA-Z_]/g, "_"), resultRef.label = resultRef
              .label || localVar_Jm("weh_prefs_label_" + countRef) || resultRef.name, resultRef
              .description = resultRef.description || localVar_Jm(
                "weh_prefs_description_" + countRef) || ""), resultRef.type ==
            "choice" && (resultRef.choices = (resultRef.choices || [])
              .map(function(accumulator) {
                if (typeof accumulator == "object") return accumulator;
                if (resultRef.hidden) return {
                  value: accumulator,
                  name: accumulator
                };
                {
                  let listRef = accumulator.replace(/[^0-9a-zA-Z_]/g, "_");
                  return {
                    value: accumulator,
                    name: localVar_Jm("weh_prefs_" + countRef + "_option_" +
                      listRef) || accumulator
                  }
                }
              }));
          let optionRef = null;
          entryRef.$specs[resultRef.name] || function(accumulator) {
            typeof entryRef[resultRef.name] < "u" && (optionRef = entryRef[resultRef.name]), Object
              .defineProperty(entryRef, accumulator, {
                set: function(listRef) {
                  let configRef = entryRef.$values[accumulator];
                  configRef !== listRef && (entryRef.$values[accumulator] = listRef, entryRef.notify(accumulator,
                    listRef, configRef, !1))
                },
                get: function() {
                  return entryRef.$values[accumulator] !== void 0 ? entryRef
                    .$values[accumulator] : entryRef.$specs[accumulator] && entryRef.$specs[accumulator]
                    .defaultValue || void 0
                }
              })
          }(resultRef.name);
          let indexRef = entryRef.$specs[resultRef.name];
          entryRef.$specs[resultRef.name] = resultRef, optionRef !== null ? entryRef.$values[resultRef.name] =
            optionRef : typeof entryRef.$values[resultRef.name] > "u" && (entryRef.$values[resultRef
              .name] = resultRef.defaultValue), entryRef.notify(resultRef.name, resultRef, indexRef, !0)
        })
      },
      on: function() {
        let valueRef = "",
          entryRef = {},
          resultRef = 0;
        typeof arguments[resultRef] == "string" && (valueRef = arguments[resultRef++]),
          typeof arguments[resultRef] == "object" && (entryRef = arguments[resultRef++]);
        let countRef = arguments[resultRef],
          optionRef = !!entryRef.pack;
        this.$listeners[valueRef] || (this.$listeners[valueRef] = []);
        let indexRef = {
          callback: countRef,
          specs: !!entryRef.specs
        };
        optionRef && (indexRef.pack = {}, indexRef.old = {}), this.$listeners[valueRef].push(indexRef)
      },
      off: function() {
        let valueRef = "",
          entryRef = 0;
        typeof arguments[entryRef] == "string" && (valueRef = arguments[entryRef++]);
        let resultRef = arguments[entryRef],
          countRef = this.$listeners[valueRef];
        if (countRef)
          for (let optionRef = countRef.length - 1; optionRef >= 0; optionRef--)(!resultRef || countRef[optionRef] == resultRef) &&
            countRef.splice(optionRef, 1)
      },
      getAll: function() {
        return Object.assign({}, this.$values)
      },
      getSpecs: function() {
        return Object.assign({}, this.$specs)
      },
      assign: function(valueRef) {
        for (let entryRef in valueRef) valueRef.hasOwnProperty(entryRef) && (this[entryRef] = valueRef[entryRef])
      },
      isValid: function(valueRef, entryRef) {
        let resultRef = this.$specs[valueRef];
        if (resultRef) {
          switch (resultRef.type) {
            case "string":
              if (resultRef.regexp && !new RegExp(resultRef.regexp)
                .test(entryRef)) return !1;
              break;
            case "integer":
              if (!/^-?[0-9]+$/.test(entryRef) || isNaN(parseInt(entryRef)))
              return !1;
            case "float":
              if (resultRef.type == "float" && (!
                  /^-?[0-9]+(\.[0-9]+)?|(\.[0-9]+)$/.test(entryRef) || isNaN(
                    parseFloat(entryRef))) || typeof resultRef.minimum < "u" && entryRef < resultRef
                .minimum || typeof resultRef.maximum < "u" && entryRef > resultRef.maximum)
                return !1;
              break;
            case "choice": {
              let countRef = !1;
              if ((resultRef.choices || [])
                .forEach(optionRef => {
                  entryRef == optionRef.value && (countRef = !0)
                }), !countRef) return !1
            }
            break
          }
          return !0
        }
      },
      reducer: function(valueRef = {}, entryRef) {
        switch (entryRef.type) {
          case "weh.SET_PREFS":
            valueRef = Object.assign({}, valueRef, entryRef.payload);
            break
        }
        return valueRef
      },
      reduxDispatch(valueRef) {
        this.on("", {
          pack: !0
        }, entryRef => {
          valueRef.dispatch({
            type: "weh.SET_PREFS",
            payload: entryRef
          })
        })
      }
    };
    var localVar_Zm = new helperFn_h5;
    for (let valueRef in localVar_Zm) localVar_Zm.hasOwnProperty(valueRef) && (lookupTable_g5[valueRef] = !0);
    paramArg_b5.exports = localVar_Zm
  });
  var fnVar_jn = defineCommonjsModule((paramArg_Yj, paramArg__5) => {
    "use strict";
    var localVar_He = fnVar_wc(),
      localVar_rg = localVar_He.browser,
      localVar_w5 = typeof _wehPanelName < "u" && {
        panel: _wehPanelName
      } || function() {
        let valueRef = /^([^\?]*)(?:\?(.*))?$/.exec(window.location.href),
          entryRef = {};
        return valueRef[2] && valueRef[2].split("&")
          .forEach(function(resultRef) {
            let countRef = resultRef.split("=");
            entryRef[countRef[0]] = decodeURIComponent(countRef[1])
          }), entryRef
      }();
    if (!localVar_w5.panel) throw new Error("Panel name not defined in URL");
    localVar_He.uiName = localVar_w5.panel, localVar_He.rpc = fnVar_Qm(), localVar_He.rpc.listen({
      close: () => {
        window.close()
      }
    });
    var localVar_Sa = localVar_rg.runtime.connect({
      name: "weh:" + localVar_rg.runtime.id + ":" + localVar_He.uiName
    });
    localVar_He.rpc.setPost(localVar_Sa.postMessage.bind(localVar_Sa)), localVar_Sa.onMessage.addListener(
    valueRef => {
      localVar_He.rpc.receive(valueRef, localVar_Sa.postMessage.bind(localVar_Sa))
    });
    var fnVar_W4 = new Promise((valueRef, entryRef) => {
      window.addEventListener("DOMContentLoaded", valueRef)
    });
    localVar_He.unsafe_prefs = fnVar_v5(), localVar_He.prefs = (async () => {
      let valueRef = localVar_He.unsafe_prefs,
        entryRef = (await localVar_rg.storage.local.get("weh-prefs"))[
        "weh-prefs"] || {};
      valueRef.assign(entryRef), valueRef.on("", {
        pack: !0
      }, (optionRef, indexRef) => {
        localVar_He.rpc.call("prefsSet", optionRef)
      }), localVar_He.rpc.listen({
        setPrefs: optionRef => {}
      });
      let resultRef = await localVar_He.rpc.call("prefsGetSpecs");
      valueRef.declare(resultRef);
      let countRef = await localVar_He.rpc.call("prefsGetAll");
      return valueRef.assign(countRef), valueRef.forceNotify(!1), valueRef
    })();
    var localVar_eg = !1,
      localVar_tg, localVar_y5 = !1,
      localVar_x5 = fnVar_Xm();
    localVar_He._ = localVar_x5.getMessage, localVar_He.is_safe = (async () => {
      await fnVar_W4, await localVar_He.prefs, await localVar_x5.custom_strings_ready,
        await localVar_He.rpc.call("appStarted", {
          uiName: localVar_He.uiName
        }), await localVar_He.rpc.call("appReady", {
          uiName: localVar_He.uiName
        }), localVar_y5 = !0;
      try {
        if (localVar_eg) {
          let valueRef = localVar_tg;
          localVar_tg = void 0, localVar_eg = !1, localVar_He.doTrigger(valueRef)
        }
      } catch (valueRef) {
        console.error("app not ready:", valueRef)
      }
    })(), localVar_He.doTrigger = function(valueRef) {
      return localVar_He.rpc.call("trigger", localVar_He.uiName, valueRef)
        .catch(() => {})
    }, localVar_He.trigger = function(valueRef) {
      if (localVar_y5) return localVar_He.doTrigger(valueRef);
      localVar_tg = valueRef, localVar_eg = !0
    }, localVar_He.copyToClipboard = function(valueRef, entryRef) {
      entryRef = entryRef || "text/plain", document.oncopy = function(resultRef) {
        resultRef.clipboardData.setData(entryRef, valueRef), resultRef.preventDefault()
      }, document.execCommand("Copy", !1, null)
    }, localVar_He.setPageTitle = function(valueRef) {
      let entryRef = document.querySelector("head title");
      if (!entryRef) entryRef = document.createElement("title"), document.head
        .appendChild(entryRef);
      else
        for (; entryRef.firstChild;) entryRef.removeChild(entryRef.firstChild);
      entryRef.appendChild(document.createTextNode(valueRef))
    }, paramArg__5.exports = localVar_He
  });
  var localVar_A5 = toEsm(fnVar_gt()),
    localVar_j5 = toEsm(fnVar_Xl());

  function helperFn_Hi(valueRef, entryRef) {
    return helperFn_Hi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() :
      function(countRef, optionRef) {
        return countRef.__proto__ = optionRef, countRef
      }, helperFn_Hi(valueRef, entryRef)
  }

  
  var localVar_Do = toEsm(fnVar_gt());
  var localVar_Rr = toEsm(fnVar_kn()),
    localVar_Ki = localVar_Rr.default.shape({
      trySubscribe: localVar_Rr.default.func.isRequired,
      tryUnsubscribe: localVar_Rr.default.func.isRequired,
      notifyNestedSubs: localVar_Rr.default.func.isRequired,
      isSubscribed: localVar_Rr.default.func.isRequired
    }),
    localVar_Gi = localVar_Rr.default.shape({
      subscribe: localVar_Rr.default.func.isRequired,
      dispatch: localVar_Rr.default.func.isRequired,
      getState: localVar_Rr.default.func.isRequired
    });
  var localVar_vM = typeof localVar_Do.default.forwardRef < "u";

  
  var localVar_Qd = window.ReactRedux.Provider;

  

  function helperFn_Ir() {
    return helperFn_Ir = Object.assign ? Object.assign.bind() : function(valueRef) {
      for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
        var resultRef = arguments[entryRef];
        for (var countRef in resultRef) Object.prototype.hasOwnProperty.call(resultRef, countRef) && (valueRef[
          countRef] = resultRef[countRef])
      }
      return valueRef
    }, helperFn_Ir.apply(this, arguments)
  }

  
  var localVar_Fo = toEsm(fnVar_gt());
  var localVar_rp = null,
    lookupTable_e0 = {
      notify: function() {}
    };

  function helperFn_g3() {
    var valueRef = [],
      entryRef = [];
    return {
      clear: function() {
        entryRef = localVar_rp, valueRef = localVar_rp
      },
      notify: function() {
        for (var countRef = valueRef = entryRef, optionRef = 0; optionRef < countRef.length; optionRef++) countRef[optionRef]()
      },
      get: function() {
        return entryRef
      },
      subscribe: function(countRef) {
        var optionRef = !0;
        return entryRef === valueRef && (entryRef = valueRef.slice()), entryRef.push(countRef),
          function() {
            !optionRef || valueRef === localVar_rp || (optionRef = !1, entryRef === valueRef && (entryRef = valueRef.slice()), entryRef.splice(
              entryRef.indexOf(countRef), 1))
          }
      }
    }
  }
  var fnVar_t0 = function() {
    function valueRef(resultRef, countRef, optionRef) {
      this.store = resultRef, this.parentSub = countRef, this.onStateChange = optionRef, this
        .unsubscribe = null, this.listeners = lookupTable_e0
    }
    var entryRef = valueRef.prototype;
    return entryRef.addNestedSub = function(countRef) {
      return this.trySubscribe(), this.listeners.subscribe(countRef)
    }, entryRef.notifyNestedSubs = function() {
      this.listeners.notify()
    }, entryRef.isSubscribed = function() {
      return !!this.unsubscribe
    }, entryRef.trySubscribe = function() {
      this.unsubscribe || (this.unsubscribe = this.parentSub ? this
        .parentSub.addNestedSub(this.onStateChange) : this.store
        .subscribe(this.onStateChange), this.listeners = helperFn_g3())
    }, entryRef.tryUnsubscribe = function() {
      this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null,
        this.listeners.clear(), this.listeners = lookupTable_e0)
    }, valueRef
  }();
  var localVar_h3 = typeof localVar_Fo.default.forwardRef < "u",
    lookupTable_v3 = {};

  

  

  
  var localVar_x3 = Object.prototype.hasOwnProperty;

  

  
  var strVar_w3 = typeof global == "object" && global && global.Object === Object &&
    global,
    localVar_a0 = strVar_w3;
  var strVar__3 = typeof self == "object" && self && self.Object === Object && self,
    localVar_k3 = localVar_a0 || strVar__3 || Function("return this")(),
    localVar_l0 = localVar_k3;
  var localVar_E3 = localVar_l0.Symbol,
    localVar_zo = localVar_E3;
  var localVar_s0 = Object.prototype,
    localVar_T3 = localVar_s0.hasOwnProperty,
    localVar_S3 = localVar_s0.toString,
    localVar_Yi = localVar_zo ? localVar_zo.toStringTag : void 0;

  function helperFn_O3(valueRef) {
    var entryRef = localVar_T3.call(valueRef, localVar_Yi),
      resultRef = valueRef[localVar_Yi];
    try {
      valueRef[localVar_Yi] = void 0;
      var countRef = !0
    } catch {}
    var optionRef = localVar_S3.call(valueRef);
    return countRef && (entryRef ? valueRef[localVar_Yi] = resultRef : delete valueRef[localVar_Yi]), optionRef
  }
  var localVar_c0 = helperFn_O3;
  var localVar_P3 = Object.prototype,
    localVar_C3 = localVar_P3.toString;

  function helperFn_N3(valueRef) {
    return localVar_C3.call(valueRef)
  }
  var localVar_u0 = helperFn_N3;
  var strVar_M3 = "[object Null]",
    strVar_A3 = "[object Undefined]",
    localVar_d0 = localVar_zo ? localVar_zo.toStringTag : void 0;

  function helperFn_j3(valueRef) {
    return valueRef == null ? valueRef === void 0 ? strVar_A3 : strVar_M3 : localVar_d0 && localVar_d0 in Object(valueRef) ? localVar_c0(
      valueRef) : localVar_u0(valueRef)
  }
  var localVar_p0 = helperFn_j3;

  function helperFn_R3(valueRef, entryRef) {
    return function(resultRef) {
      return valueRef(entryRef(resultRef))
    }
  }
  var localVar_f0 = helperFn_R3;
  var objHelper_I3 = localVar_f0(Object.getPrototypeOf, Object),
    localVar_m0 = objHelper_I3;

  function helperFn_D3(valueRef) {
    return valueRef != null && typeof valueRef == "object"
  }
  var localVar_g0 = helperFn_D3;
  var strVar_F3 = "[object Object]",
    localVar_z3 = Function.prototype,
    localVar_L3 = Object.prototype,
    localVar_h0 = localVar_z3.toString,
    localVar_$3 = localVar_L3.hasOwnProperty,
    localVar_q3 = localVar_h0.call(Object);

  function helperFn_B3(valueRef) {
    if (!localVar_g0(valueRef) || localVar_p0(valueRef) != strVar_F3) return !1;
    var entryRef = localVar_m0(valueRef);
    if (entryRef === null) return !0;
    var resultRef = localVar_$3.call(entryRef, "constructor") && entryRef.constructor;
    return typeof resultRef == "function" && resultRef instanceof resultRef && localVar_h0.call(resultRef) == localVar_q3
  }
  var localVar_b0 = helperFn_B3;

  function helperFn_np(valueRef) {
    var entryRef, resultRef = valueRef.Symbol;
    return typeof resultRef == "function" ? resultRef.observable ? entryRef = resultRef.observable : (entryRef = resultRef(
      "observable"), resultRef.observable = entryRef) : entryRef = "@@observable", entryRef
  }
  var localVar_Lo;
  typeof self < "u" ? localVar_Lo = self : typeof window < "u" ? localVar_Lo = window :
    typeof global < "u" ? localVar_Lo = global : typeof module < "u" ? localVar_Lo = module :
    localVar_Lo = Function("return this")();
  var localVar_U3 = helperFn_np(localVar_Lo),
    localVar_op = localVar_U3;
  var lookupTable_Xi = {
    INIT: "@@redux/INIT"
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

  
  var objHelper_V3 = Object.assign || function(valueRef) {
    for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
      var resultRef = arguments[entryRef];
      for (var countRef in resultRef) Object.prototype.hasOwnProperty.call(resultRef, countRef) && (valueRef[countRef] =
        resultRef[countRef])
    }
    return valueRef
  };

  function helperFn_fs() {
    return window.Redux.applyMiddleware.apply(this, arguments); // de-vendored
  }

  function helperFn_Zi(valueRef) {
    return function(resultRef, countRef) {
      var optionRef = valueRef(resultRef, countRef);

      function indexRef() {
        return optionRef
      }
      return indexRef.dependsOnOwnProps = !1, indexRef
    }
  }

  function helperFn_y0(valueRef) {
    return valueRef.dependsOnOwnProps !== null && valueRef.dependsOnOwnProps !== void 0 ? !!
      valueRef.dependsOnOwnProps : valueRef.length !== 1
  }

  function helperFn_ms(valueRef, entryRef) {
    return function(countRef, optionRef) {
      var indexRef = optionRef.displayName,
        accumulator = function(configRef, unitRef) {
          return accumulator.dependsOnOwnProps ? accumulator.mapToProps(configRef, unitRef) : accumulator.mapToProps(configRef)
        };
      return accumulator.dependsOnOwnProps = !0, accumulator.mapToProps = function(configRef, unitRef) {
        accumulator.mapToProps = valueRef, accumulator.dependsOnOwnProps = helperFn_y0(valueRef);
        var propRef = accumulator(configRef, unitRef);
        return typeof propRef == "function" && (accumulator.mapToProps = propRef, accumulator
          .dependsOnOwnProps = helperFn_y0(propRef), propRef = accumulator(configRef, unitRef)), propRef
      }, accumulator
    }
  }

  function helperFn_K3(valueRef) {
    return typeof valueRef == "function" ? helperFn_ms(valueRef, "mapDispatchToProps") : void 0
  }

  function helperFn_G3(valueRef) {
    return valueRef ? void 0 : helperFn_Zi(function(entryRef) {
      return {
        dispatch: entryRef
      }
    })
  }

  function helperFn_Q3(valueRef) {
    return valueRef && typeof valueRef == "object" ? helperFn_Zi(function(entryRef) {
      return helperFn_gr(valueRef, entryRef)
    }) : void 0
  }
  var listVar_x0 = [helperFn_K3, helperFn_G3, helperFn_Q3];

  function helperFn_Y3(valueRef) {
    return typeof valueRef == "function" ? helperFn_ms(valueRef, "mapStateToProps") : void 0
  }

  function helperFn_X3(valueRef) {
    return valueRef ? void 0 : helperFn_Zi(function() {
      return {}
    })
  }
  var listVar_w0 = [helperFn_Y3, helperFn_X3];

  function helperFn_J3(valueRef, entryRef, resultRef) {
    return helperFn_Ir({}, resultRef, valueRef, entryRef)
  }

  function helperFn_Z3(valueRef) {
    return function(resultRef, countRef) {
      var optionRef = countRef.displayName,
        indexRef = countRef.pure,
        accumulator = countRef.areMergedPropsEqual,
        listRef = !1,
        configRef;
      return function(propRef, funcRef, coordY) {
        var outputRef = valueRef(propRef, funcRef, coordY);
        return listRef ? (!indexRef || !accumulator(outputRef, configRef)) && (configRef = outputRef) : (listRef = !0, configRef = outputRef), configRef
      }
    }
  }

  function helperFn_eE(valueRef) {
    return typeof valueRef == "function" ? helperFn_Z3(valueRef) : void 0
  }

  function helperFn_tE(valueRef) {
    return valueRef ? void 0 : function() {
      return helperFn_J3
    }
  }
  var listVar__0 = [helperFn_eE, helperFn_tE];

  

  

  

  

  

  
  var localVar_Xr = window.ReactRedux.connect;
  var localVar_R5 = toEsm(fnVar_E0());
  var lookupTable_Is = {};
  defineExports(lookupTable_Is, {
    Alert: () => helperFn_Rs,
    Badge: () => fnVar_Rp,
    Breadcrumb: () => fnVar_Cp,
    BreadcrumbItem: () => fnVar_Np,
    Button: () => fnVar_aa,
    ButtonDropdown: () => fnVar_Mp,
    ButtonGroup: () => fnVar_Ap,
    ButtonToolbar: () => fnVar_jp,
    Card: () => fnVar_Ip,
    CardBlock: () => helperFn_wS,
    CardBody: () => fnVar_Os,
    CardColumns: () => fnVar_zp,
    CardDeck: () => fnVar_Fp,
    CardFooter: () => fnVar_$p,
    CardGroup: () => fnVar_Dp,
    CardHeader: () => fnVar_qp,
    CardImg: () => fnVar_Bp,
    CardImgOverlay: () => fnVar_Up,
    CardLink: () => fnVar_Lp,
    CardSubtitle: () => fnVar_Kp,
    CardText: () => fnVar_Gp,
    CardTitle: () => fnVar_Qp,
    Carousel: () => fnVar_la,
    CarouselCaption: () => fnVar_Hp,
    CarouselControl: () => fnVar__s,
    CarouselIndicators: () => fnVar_Wp,
    CarouselItem: () => fnVar_Wo,
    Col: () => fnVar__p,
    Collapse: () => fnVar_bf,
    Container: () => fnVar_xp,
    Dropdown: () => fnVar_On,
    DropdownItem: () => fnVar_Es,
    DropdownMenu: () => fnVar_Ts,
    DropdownToggle: () => fnVar_Ss,
    Fade: () => helperFn_Tr,
    Form: () => fnVar_af,
    FormFeedback: () => fnVar_lf,
    FormGroup: () => fnVar_sf,
    FormText: () => fnVar_cf,
    Input: () => fnVar_uf,
    InputGroup: () => fnVar_df,
    InputGroupAddon: () => fnVar_ia,
    InputGroupButton: () => fnVar_hy,
    InputGroupButtonDropdown: () => fnVar_by,
    InputGroupText: () => fnVar_Ms,
    Jumbotron: () => fnVar_hf,
    Label: () => fnVar_pf,
    ListGroup: () => fnVar_of,
    ListGroupItem: () => fnVar_vf,
    ListGroupItemHeading: () => fnVar_yf,
    ListGroupItemText: () => fnVar_xf,
    Media: () => fnVar_vy,
    Modal: () => fnVar_Zp,
    ModalBody: () => fnVar_tf,
    ModalFooter: () => fnVar_rf,
    ModalHeader: () => fnVar_ef,
    Nav: () => fnVar_Sp,
    NavDropdown: () => helperFn_RT,
    NavItem: () => fnVar_Op,
    NavLink: () => fnVar_Pp,
    Navbar: () => fnVar_kp,
    NavbarBrand: () => fnVar_Ep,
    NavbarToggler: () => fnVar_Tp,
    Pagination: () => fnVar_ff,
    PaginationItem: () => fnVar_mf,
    PaginationLink: () => fnVar_gf,
    Popover: () => fnVar_Xp,
    PopoverBody: () => fnVar_Cs,
    PopoverContent: () => helperFn_GS,
    PopoverHeader: () => fnVar_Ps,
    PopoverTitle: () => helperFn_HS,
    PopperContent: () => fnVar_Ho,
    PopperTargetHelper: () => fnVar_Yp,
    Progress: () => fnVar_Jp,
    Row: () => fnVar_wp,
    TabContent: () => fnVar_As,
    TabPane: () => helperFn_js,
    Table: () => fnVar_nf,
    Tooltip: () => fnVar_Ns,
    UncontrolledAlert: () => fnVar_i6,
    UncontrolledButtonDropdown: () => fnVar_a6,
    UncontrolledCarousel: () => fnVar_Vp,
    UncontrolledDropdown: () => fnVar_xy,
    UncontrolledNavDropdown: () => fnVar_l6,
    UncontrolledTooltip: () => fnVar_s6,
    Util: () => localVar_cT
  });
  var widthRefU = toEsm(fnVar_gt()),
    stringRef = toEsm(fnVar_kn()),
    localVar_se = toEsm(fnVar_T0()),
    localVar_ty = toEsm(fnVar_N0()),
    localVar_hp = toEsm(fnVar_A0()),
    localVar_qo = toEsm(fnVar_Xl()),
    localVar_Jr = toEsm(fnVar_H0()),
    localVar_gp = toEsm(fnVar_Q0());

  function helperFn_ry() {
    var valueRef = document.createElement("div");
    valueRef.style.position = "absolute", valueRef.style.top = "-9999px", valueRef.style.width =
      "50px", valueRef.style.height = "50px", valueRef.style.overflow = "scroll", document
      .body.appendChild(valueRef);
    var entryRef = valueRef.offsetWidth - valueRef.clientWidth;
    return document.body.removeChild(valueRef), entryRef
  }

  function helperFn_bp(valueRef) {
    document.body.style.paddingRight = valueRef > 0 ? valueRef + "px" : null
  }

  function helperFn_ny() {
    return document.body.clientWidth < window.innerWidth
  }

  function helperFn_oy() {
    var valueRef = window.getComputedStyle(document.body, null);
    return parseInt(valueRef && valueRef.getPropertyValue("padding-right") || 0, 10)
  }

  function helperFn_iy() {
    var valueRef = helperFn_ry(),
      entryRef = document.querySelectorAll(
        ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],
      resultRef = entryRef ? parseInt(entryRef.style.paddingRight || 0, 10) : 0;
    helperFn_ny() && helperFn_bp(resultRef + valueRef)
  }
  var localVar_ay = void 0;

  function helperFn_sT(valueRef) {
    localVar_ay = valueRef
  }

  function helperFn_oe() {
    var valueRef = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] :
      "",
      entryRef = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : localVar_ay;
    return entryRef ? valueRef.split(" ")
      .map(function(resultRef) {
        return entryRef[resultRef] || resultRef
      })
      .join(" ") : valueRef
  }

  function helperFn_Zr(valueRef, entryRef) {
    var resultRef = {};
    return Object.keys(valueRef)
      .forEach(function(countRef) {
        entryRef.indexOf(countRef) === -1 && (resultRef[countRef] = valueRef[countRef])
      }), resultRef
  }

  function helperFn_vp(valueRef, entryRef) {
    for (var resultRef = Array.isArray(entryRef) ? entryRef : [entryRef], countRef = resultRef.length, optionRef = void 0,
        indexRef = {}; countRef > 0;) countRef -= 1, optionRef = resultRef[countRef], indexRef[optionRef] = valueRef[optionRef];
    return indexRef
  }
  var lookupTable_Y0 = {};

  function helperFn_en(valueRef) {
    lookupTable_Y0[valueRef] || (typeof console < "u" && console.error(valueRef), lookupTable_Y0[valueRef] = !0)
  }

  function helperFn_vr(valueRef, entryRef) {
    return function(countRef, optionRef, indexRef) {
      countRef[optionRef] !== null && typeof countRef[optionRef] < "u" && helperFn_en('"' + optionRef + '" property of "' +
        indexRef + `" has been deprecated.
` + entryRef);
      for (var accumulator = arguments.length, listRef = Array(accumulator > 3 ? accumulator - 3 : 0), configRef =
        3; configRef < accumulator; configRef++) listRef[configRef - 3] = arguments[configRef];
      return valueRef.apply(void 0, [countRef, optionRef, indexRef].concat(listRef))
    }
  }

  function helperFn_Sn(valueRef, entryRef, resultRef) {
    if (!(valueRef[entryRef] instanceof Element)) return new Error("Invalid prop `" + entryRef +
      "` supplied to `" + resultRef +
      "`. Expected prop to be an instance of Element. Validation failed.")
  }

  function helperFn_Bo(valueRef) {
    if ((0, localVar_ty.default)(valueRef)) return valueRef();
    if (typeof valueRef == "string" && document) {
      var entryRef = document.querySelector(valueRef);
      if (entryRef === null && (entryRef = document.querySelector("#" + valueRef)), entryRef === null)
        throw new Error("The target '" + valueRef +
          "' could not be identified in the dom, tip: check spelling");
      return entryRef
    }
    return valueRef
  }
  var lookupTable_Uo = {
      Fade: 150,
      Collapse: 350,
      Modal: 300,
      Carousel: 600
    },
    listVar_oa = ["in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit",
      "timeout", "onEnter", "onEntering", "onEntered", "onExit", "onExiting",
      "onExited"
    ],
    lookupTable_Fr = {
      ENTERING: "entering",
      ENTERED: "entered",
      EXITING: "exiting",
      EXITED: "exited"
    },
    lookupTable_br = {
      esc: 27,
      space: 32,
      tab: 9,
      up: 38,
      down: 40
    },
    listVar_yp = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end",
      "right-start", "right", "right-end", "bottom-end", "bottom",
      "bottom-start", "left-end", "left", "left-start"
    ],
    localVar_ly = !!(typeof window < "u" && window.document && window.document
      .createElement),
    localVar_cT = Object.freeze({
      getScrollbarWidth: helperFn_ry,
      setScrollbarWidth: helperFn_bp,
      isBodyOverflowing: helperFn_ny,
      getOriginalBodyPadding: helperFn_oy,
      conditionallyUpdateScrollbar: helperFn_iy,
      setGlobalCssModule: helperFn_sT,
      mapToCssModules: helperFn_oe,
      omit: helperFn_Zr,
      pick: helperFn_vp,
      warnOnce: helperFn_en,
      deprecated: helperFn_vr,
      DOMElement: helperFn_Sn,
      getTarget: helperFn_Bo,
      TransitionTimeouts: lookupTable_Uo,
      TransitionPropTypeKeys: listVar_oa,
      TransitionStatuses: lookupTable_Fr,
      keyCodes: lookupTable_br,
      PopperPlacements: listVar_yp,
      canUseDOM: localVar_ly
    }),
    strVar_ws = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ?
    function(valueRef) {
      return typeof valueRef
    } : function(valueRef) {
      return valueRef && typeof Symbol == "function" && valueRef.constructor === Symbol &&
        valueRef !== Symbol.prototype ? "symbol" : typeof valueRef
    },
    fnVar_ht = function(valueRef, entryRef) {
      if (!(valueRef instanceof entryRef)) throw new TypeError(
        "Cannot call a class as a function")
    },
    fnVar_bt = function() {
      function valueRef(entryRef, resultRef) {
        for (var countRef = 0; countRef < resultRef.length; countRef++) {
          var optionRef = resultRef[countRef];
          optionRef.enumerable = optionRef.enumerable || !1, optionRef.configurable = !0, "value" in
            optionRef && (optionRef.writable = !0), Object.defineProperty(entryRef, optionRef.key, optionRef)
        }
      }
      return function(entryRef, resultRef, countRef) {
        return resultRef && valueRef(entryRef.prototype, resultRef), countRef && valueRef(entryRef, countRef), entryRef
      }
    }(),
    fnVar_st = function(valueRef, entryRef, resultRef) {
      return entryRef in valueRef ? Object.defineProperty(valueRef, entryRef, {
        value: resultRef,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : valueRef[entryRef] = resultRef, valueRef
    },
    objHelper_ie = Object.assign || function(valueRef) {
      for (var entryRef = 1; entryRef < arguments.length; entryRef++) {
        var resultRef = arguments[entryRef];
        for (var countRef in resultRef) Object.prototype.hasOwnProperty.call(resultRef, countRef) && (valueRef[countRef] =
          resultRef[countRef])
      }
      return valueRef
    },
    fnVar_vt = function(valueRef, entryRef) {
      if (typeof entryRef != "function" && entryRef !== null) throw new TypeError(
        "Super expression must either be null or a function, not " +
        typeof entryRef);
      valueRef.prototype = Object.create(entryRef && entryRef.prototype, {
        constructor: {
          value: valueRef,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), entryRef && (Object.setPrototypeOf ? Object.setPrototypeOf(valueRef, entryRef) : valueRef
        .__proto__ = entryRef)
    },
    fnVar_he = function(valueRef, entryRef) {
      var resultRef = {};
      for (var countRef in valueRef) entryRef.indexOf(countRef) >= 0 || Object.prototype.hasOwnProperty
        .call(valueRef, countRef) && (resultRef[countRef] = valueRef[countRef]);
      return resultRef
    },
    fnVar_yt = function(valueRef, entryRef) {
      if (!valueRef) throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
      return entryRef && (typeof entryRef == "object" || typeof entryRef == "function") ? entryRef : valueRef
    },
    lookupTable_uT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      fluid: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_dT = {
      tag: "div"
    },
    fnVar_xp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.fluid,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "fluid", "tag"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "container-fluid" : "container"), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_xp.propTypes = lookupTable_uT;
  fnVar_xp.defaultProps = lookupTable_dT;
  var lookupTable_pT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      noGutters: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_fT = {
      tag: "div"
    },
    fnVar_wp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.noGutters,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "noGutters", "tag"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "no-gutters" : null, "row"), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_wp.propTypes = lookupTable_pT;
  fnVar_wp.defaultProps = lookupTable_fT;
  var listVar_mT = ["xs", "sm", "md", "lg", "xl"],
    localVar_xs = stringRef.default.oneOfType([stringRef.default.number, stringRef.default.string]),
    localVar_ta = stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.number, stringRef.default
      .string, stringRef.default.shape({
        size: stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.number, stringRef
          .default.string
        ]),
        push: helperFn_vr(localVar_xs, 'Please use the prop "order"'),
        pull: helperFn_vr(localVar_xs, 'Please use the prop "order"'),
        order: localVar_xs,
        offset: localVar_xs
      })
    ]),
    lookupTable_gT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      xs: localVar_ta,
      sm: localVar_ta,
      md: localVar_ta,
      lg: localVar_ta,
      xl: localVar_ta,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      widths: stringRef.default.array
    },
    lookupTable_hT = {
      tag: "div",
      widths: listVar_mT
    },
    fnVar_X0 = function(entryRef, resultRef, countRef) {
      return countRef === !0 || countRef === "" ? entryRef ? "col" : "col-" + resultRef : countRef === "auto" ?
        entryRef ? "col-auto" : "col-" + resultRef + "-auto" : entryRef ? "col-" + countRef : "col-" + resultRef +
        "-" + countRef
    },
    fnVar__p = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.widths,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "widths", "tag"]),
        listRef = [];
      optionRef.forEach(function(unitRef, propRef) {
        var funcRef = entryRef[unitRef];
        if (delete accumulator[unitRef], !(!funcRef && funcRef !== "")) {
          var coordY = !propRef;
          if ((0, localVar_hp.default)(funcRef)) {
            var outputRef, labelRef = coordY ? "-" : "-" + unitRef + "-",
              depthRef = fnVar_X0(coordY, unitRef, funcRef.size);
            listRef.push(helperFn_oe((0, localVar_se.default)((outputRef = {}, fnVar_st(outputRef, depthRef, funcRef.size || funcRef
              .size === ""), fnVar_st(outputRef, "order" + labelRef + funcRef.order, funcRef
              .order || funcRef.order === 0), fnVar_st(outputRef, "offset" + labelRef + funcRef
              .offset, funcRef.offset || funcRef.offset === 0), outputRef)), countRef))
          } else {
            var handleRef = fnVar_X0(coordY, unitRef, funcRef);
            listRef.push(handleRef)
          }
        }
      }), listRef.length || listRef.push("col");
      var configRef = helperFn_oe((0, localVar_se.default)(resultRef, listRef), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: configRef
      }))
    };
  fnVar__p.propTypes = lookupTable_gT;
  fnVar__p.defaultProps = lookupTable_hT;
  var lookupTable_bT = {
      light: stringRef.default.bool,
      dark: stringRef.default.bool,
      inverse: helperFn_vr(stringRef.default.bool, 'Please use the prop "dark"'),
      full: stringRef.default.bool,
      fixed: stringRef.default.string,
      sticky: stringRef.default.string,
      color: stringRef.default.string,
      role: stringRef.default.string,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      toggleable: helperFn_vr(stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.string]),
        'Please use the prop "expand"'),
      expand: stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.string])
    },
    lookupTable_vT = {
      tag: "nav",
      expand: !1
    },
    fnVar_yT = function(entryRef) {
      return entryRef === !1 ? !1 : entryRef === !0 || entryRef === "xs" ? "navbar-expand" :
        "navbar-expand-" + entryRef
    },
    lookupTable_xT = {
      xs: "sm",
      sm: "md",
      md: "lg",
      lg: "xl"
    },
    fnVar_wT = function(entryRef) {
      return entryRef === void 0 || entryRef === "xl" ? !1 : entryRef === !1 ? "navbar-expand" :
        "navbar-expand-" + (entryRef === !0 ? "sm" : lookupTable_xT[entryRef] || entryRef)
    },
    fnVar_kp = function(entryRef) {
      var resultRef, countRef = entryRef.toggleable,
        optionRef = entryRef.expand,
        indexRef = entryRef.className,
        accumulator = entryRef.cssModule,
        listRef = entryRef.light,
        configRef = entryRef.dark,
        unitRef = entryRef.inverse,
        propRef = entryRef.fixed,
        funcRef = entryRef.sticky,
        coordY = entryRef.color,
        outputRef = entryRef.tag,
        labelRef = fnVar_he(entryRef, ["toggleable", "expand", "className", "cssModule", "light",
          "dark", "inverse", "fixed", "sticky", "color", "tag"
        ]),
        depthRef = helperFn_oe((0, localVar_se.default)(indexRef, "navbar", fnVar_yT(optionRef) || fnVar_wT(countRef), (resultRef = {
          "navbar-light": listRef,
          "navbar-dark": unitRef || configRef
        }, fnVar_st(resultRef, "bg-" + coordY, coordY), fnVar_st(resultRef, "fixed-" + propRef, propRef), fnVar_st(resultRef,
          "sticky-" + funcRef, funcRef), resultRef)), accumulator);
      return widthRefU.default.createElement(outputRef, objHelper_ie({}, labelRef, {
        className: depthRef
      }))
    };
  fnVar_kp.propTypes = lookupTable_bT;
  fnVar_kp.defaultProps = lookupTable_vT;
  var lookupTable__T = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_kT = {
      tag: "a"
    },
    fnVar_Ep = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "navbar-brand"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Ep.propTypes = lookupTable__T;
  fnVar_Ep.defaultProps = lookupTable_kT;
  var lookupTable_ET = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      type: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      children: stringRef.default.node
    },
    lookupTable_TT = {
      tag: "button",
      type: "button"
    },
    fnVar_Tp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.children,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "children", "tag"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, "navbar-toggler"), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: listRef
      }), optionRef || widthRefU.default.createElement("span", {
        className: helperFn_oe("navbar-toggler-icon", countRef)
      }))
    };
  fnVar_Tp.propTypes = lookupTable_ET;
  fnVar_Tp.defaultProps = lookupTable_TT;
  var lookupTable_ST = {
      tabs: stringRef.default.bool,
      pills: stringRef.default.bool,
      vertical: stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.string]),
      horizontal: stringRef.default.string,
      justified: stringRef.default.bool,
      fill: stringRef.default.bool,
      navbar: stringRef.default.bool,
      card: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_OT = {
      tag: "ul",
      vertical: !1
    },
    fnVar_PT = function(entryRef) {
      return entryRef === !1 ? !1 : entryRef === !0 || entryRef === "xs" ? "flex-column" :
        "flex-" + entryRef + "-column"
    },
    fnVar_Sp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tabs,
        indexRef = entryRef.pills,
        accumulator = entryRef.vertical,
        listRef = entryRef.horizontal,
        configRef = entryRef.justified,
        unitRef = entryRef.fill,
        propRef = entryRef.navbar,
        funcRef = entryRef.card,
        coordY = entryRef.tag,
        outputRef = fnVar_he(entryRef, ["className", "cssModule", "tabs", "pills", "vertical",
          "horizontal", "justified", "fill", "navbar", "card", "tag"
        ]),
        labelRef = helperFn_oe((0, localVar_se.default)(resultRef, propRef ? "navbar-nav" : "nav", listRef ?
          "justify-content-" + listRef : !1, fnVar_PT(accumulator), {
            "nav-tabs": optionRef,
            "card-header-tabs": funcRef && optionRef,
            "nav-pills": indexRef,
            "card-header-pills": funcRef && indexRef,
            "nav-justified": configRef,
            "nav-fill": unitRef
          }), countRef);
      return widthRefU.default.createElement(coordY, objHelper_ie({}, outputRef, {
        className: labelRef
      }))
    };
  fnVar_Sp.propTypes = lookupTable_ST;
  fnVar_Sp.defaultProps = lookupTable_OT;
  var lookupTable_CT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      active: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_NT = {
      tag: "li"
    },
    fnVar_Op = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.active,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "active", "tag"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, "nav-item", optionRef ? "active" : !1), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_Op.propTypes = lookupTable_CT;
  fnVar_Op.defaultProps = lookupTable_NT;
  var lookupTable_MT = {
      disabled: stringRef.default.bool,
      dropup: helperFn_vr(stringRef.default.bool,
        'Please use the prop "direction" with the value "up".'),
      direction: stringRef.default.oneOf(["up", "down", "left", "right"]),
      group: stringRef.default.bool,
      isOpen: stringRef.default.bool,
      nav: stringRef.default.bool,
      active: stringRef.default.bool,
      addonType: stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.oneOf([
        "prepend", "append"
      ])]),
      size: stringRef.default.string,
      tag: stringRef.default.string,
      toggle: stringRef.default.func,
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      inNavbar: stringRef.default.bool
    },
    lookupTable_AT = {
      isOpen: !1,
      direction: "down",
      nav: !1,
      active: !1,
      addonType: !1,
      inNavbar: !1
    },
    lookupTable_jT = {
      toggle: stringRef.default.func.isRequired,
      isOpen: stringRef.default.bool.isRequired,
      direction: stringRef.default.oneOf(["up", "down", "left", "right"])
        .isRequired,
      inNavbar: stringRef.default.bool.isRequired
    },
    fnVar_On = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.addEvents = countRef.addEvents.bind(countRef), countRef.handleDocumentClick = countRef
          .handleDocumentClick.bind(countRef), countRef.handleKeyDown = countRef.handleKeyDown
          .bind(countRef), countRef.removeEvents = countRef.removeEvents.bind(countRef), countRef.toggle = countRef
          .toggle.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "getChildContext",
        value: function() {
          return {
            toggle: this.props.toggle,
            isOpen: this.props.isOpen,
            direction: this.props.direction === "down" && this.props
              .dropup ? "up" : this.props.direction,
            inNavbar: this.props.inNavbar
          }
        }
      }, {
        key: "componentDidMount",
        value: function() {
          this.handleProps()
        }
      }, {
        key: "componentDidUpdate",
        value: function(countRef) {
          this.props.isOpen !== countRef.isOpen && this.handleProps()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.removeEvents()
        }
      }, {
        key: "getContainer",
        value: function() {
          return localVar_qo.default.findDOMNode(this)
        }
      }, {
        key: "addEvents",
        value: function() {
          var countRef = this;
          ["click", "touchstart", "keyup"].forEach(function(optionRef) {
            return document.addEventListener(optionRef, countRef
              .handleDocumentClick, !0)
          })
        }
      }, {
        key: "removeEvents",
        value: function() {
          var countRef = this;
          ["click", "touchstart", "keyup"].forEach(function(optionRef) {
            return document.removeEventListener(optionRef, countRef
              .handleDocumentClick, !0)
          })
        }
      }, {
        key: "handleDocumentClick",
        value: function(countRef) {
          if (!(countRef && (countRef.which === 3 || countRef.type === "keyup" && countRef
              .which !== lookupTable_br.tab))) {
            var optionRef = this.getContainer();
            optionRef.contains(countRef.target) && optionRef !== countRef.target && (countRef.type !==
              "keyup" || countRef.which === lookupTable_br.tab) || this.toggle(countRef)
          }
        }
      }, {
        key: "handleKeyDown",
        value: function(countRef) {
          if (!([lookupTable_br.esc, lookupTable_br.up, lookupTable_br.down, lookupTable_br.space].indexOf(countRef
              .which) === -1 || /button/i.test(countRef.target.tagName) && countRef
              .which === lookupTable_br.space || /input|textarea/i.test(countRef.target
                .tagName)) && (countRef.preventDefault(), !this.props
              .disabled)) {
            var optionRef = this.getContainer();
            if (countRef.which === lookupTable_br.space && this.props.isOpen && optionRef !== countRef
              .target && countRef.target.click(), countRef.which === lookupTable_br.esc || !this
              .props.isOpen) {
              this.toggle(countRef), optionRef.querySelector("[aria-expanded]")
                .focus();
              return
            }
            var indexRef = helperFn_oe("dropdown-menu", this.props.cssModule),
              accumulator = helperFn_oe("dropdown-item", this.props.cssModule),
              listRef = helperFn_oe("disabled", this.props.cssModule),
              configRef = optionRef.querySelectorAll("." + indexRef + " ." + accumulator + ":not(." +
                listRef + ")");
            if (configRef.length) {
              for (var unitRef = -1, propRef = 0; propRef < configRef.length; propRef += 1)
                if (configRef[propRef] === countRef.target) {
                  unitRef = propRef;
                  break
                } countRef.which === lookupTable_br.up && unitRef > 0 && (unitRef -= 1), countRef.which ===
                lookupTable_br.down && unitRef < configRef.length - 1 && (unitRef += 1), unitRef < 0 && (unitRef =
                  0), configRef[unitRef].focus()
            }
          }
        }
      }, {
        key: "handleProps",
        value: function() {
          this.props.isOpen ? this.addEvents() : this.removeEvents()
        }
      }, {
        key: "toggle",
        value: function(countRef) {
          return this.props.disabled ? countRef && countRef.preventDefault() : this
            .props.toggle(countRef)
        }
      }, {
        key: "render",
        value: function() {
          var countRef, optionRef = helperFn_Zr(this.props, ["toggle", "disabled", "inNavbar",
              "direction"
            ]),
            indexRef = optionRef.className,
            accumulator = optionRef.cssModule,
            listRef = optionRef.dropup,
            configRef = optionRef.isOpen,
            unitRef = optionRef.group,
            propRef = optionRef.size,
            funcRef = optionRef.nav,
            coordY = optionRef.active,
            outputRef = optionRef.addonType,
            labelRef = fnVar_he(optionRef, ["className", "cssModule", "dropup", "isOpen",
              "group", "size", "nav", "active", "addonType"
            ]),
            depthRef = this.props.direction === "down" && listRef ? "up" : this
            .props.direction;
          labelRef.tag = labelRef.tag || (funcRef ? "li" : "div");
          var handleRef = helperFn_oe((0, localVar_se.default)(indexRef, depthRef !== "down" && "drop" + depthRef,
            funcRef && coordY ? "active" : !1, (countRef = {}, fnVar_st(countRef,
              "input-group-" + outputRef, outputRef), fnVar_st(countRef, "btn-group", unitRef), fnVar_st(
              countRef, "btn-group-" + propRef, !!propRef), fnVar_st(countRef, "dropdown", !unitRef &&
              !outputRef), fnVar_st(countRef, "show", configRef), fnVar_st(countRef, "nav-item", funcRef), countRef)), accumulator);
          return widthRefU.default.createElement(localVar_Jr.Manager, objHelper_ie({}, labelRef, {
            className: handleRef,
            onKeyDown: this.handleKeyDown
          }))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_On.propTypes = lookupTable_MT;
  fnVar_On.defaultProps = lookupTable_AT;
  fnVar_On.childContextTypes = lookupTable_jT;

  function helperFn_RT(valueRef) {
    return helperFn_en(`The "NavDropdown" component has been deprecated.
Please use component "Dropdown" with nav prop.`), widthRefU.default.createElement(fnVar_On,
      objHelper_ie({
        nav: !0
      }, valueRef))
  }
  var lookupTable_IT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      innerRef: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      disabled: stringRef.default.bool,
      active: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      onClick: stringRef.default.func,
      href: stringRef.default.any
    },
    lookupTable_DT = {
      tag: "a"
    },
    fnVar_Pp = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.onClick = countRef.onClick.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "onClick",
        value: function(countRef) {
          if (this.props.disabled) {
            countRef.preventDefault();
            return
          }
          this.props.href === "#" && countRef.preventDefault(), this.props
            .onClick && this.props.onClick(countRef)
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.className,
            indexRef = countRef.cssModule,
            accumulator = countRef.active,
            listRef = countRef.tag,
            configRef = countRef.innerRef,
            unitRef = fnVar_he(countRef, ["className", "cssModule", "active", "tag",
              "innerRef"
            ]),
            propRef = helperFn_oe((0, localVar_se.default)(optionRef, "nav-link", {
              disabled: unitRef.disabled,
              active: accumulator
            }), indexRef);
          return widthRefU.default.createElement(listRef, objHelper_ie({}, unitRef, {
            ref: configRef,
            onClick: this.onClick,
            className: propRef
          }))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_Pp.propTypes = lookupTable_IT;
  fnVar_Pp.defaultProps = lookupTable_DT;
  var lookupTable_FT = {
      tag: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_zT = {
      tag: "ol"
    },
    fnVar_Cp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "breadcrumb"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Cp.propTypes = lookupTable_FT;
  fnVar_Cp.defaultProps = lookupTable_zT;
  var lookupTable_LT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      active: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_$T = {
      tag: "li"
    },
    fnVar_Np = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.active,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "active", "tag"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "active" : !1, "breadcrumb-item"), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_Np.propTypes = lookupTable_LT;
  fnVar_Np.defaultProps = lookupTable_$T;
  var lookupTable_qT = {
      active: stringRef.default.bool,
      block: stringRef.default.bool,
      color: stringRef.default.string,
      disabled: stringRef.default.bool,
      outline: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      innerRef: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      onClick: stringRef.default.func,
      size: stringRef.default.string,
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_BT = {
      color: "secondary",
      tag: "button"
    },
    fnVar_aa = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.onClick = countRef.onClick.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "onClick",
        value: function(countRef) {
          if (this.props.disabled) {
            countRef.preventDefault();
            return
          }
          this.props.onClick && this.props.onClick(countRef)
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.active,
            indexRef = countRef.block,
            accumulator = countRef.className,
            listRef = countRef.cssModule,
            configRef = countRef.color,
            unitRef = countRef.outline,
            propRef = countRef.size,
            funcRef = countRef.tag,
            coordY = countRef.innerRef,
            outputRef = fnVar_he(countRef, ["active", "block", "className", "cssModule",
              "color", "outline", "size", "tag", "innerRef"
            ]),
            labelRef = helperFn_oe((0, localVar_se.default)(accumulator, "btn", "btn" + (unitRef ? "-outline" :
                "") + "-" + configRef, propRef ? "btn-" + propRef : !1, indexRef ?
              "btn-block" : !1, {
                active: optionRef,
                disabled: this.props.disabled
              }), listRef);
          return outputRef.href && funcRef === "button" && (funcRef = "a"), widthRefU.default
            .createElement(funcRef, objHelper_ie({
              type: funcRef === "button" && outputRef.onClick ?
                "button" : void 0
            }, outputRef, {
              className: labelRef,
              ref: coordY,
              onClick: this.onClick
            }))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_aa.propTypes = lookupTable_qT;
  fnVar_aa.defaultProps = lookupTable_BT;
  var lookupTable_UT = {
      children: stringRef.default.node
    },
    fnVar_Mp = function(entryRef) {
      return widthRefU.default.createElement(fnVar_On, objHelper_ie({
        group: !0
      }, entryRef))
    };
  fnVar_Mp.propTypes = lookupTable_UT;
  var lookupTable_WT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      "aria-label": stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      role: stringRef.default.string,
      size: stringRef.default.string,
      vertical: stringRef.default.bool
    },
    lookupTable_HT = {
      tag: "div",
      role: "group"
    },
    fnVar_Ap = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.size,
        indexRef = entryRef.vertical,
        accumulator = entryRef.tag,
        listRef = fnVar_he(entryRef, ["className", "cssModule", "size", "vertical", "tag"]),
        configRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "btn-group-" + optionRef : !1, indexRef ?
          "btn-group-vertical" : "btn-group"), countRef);
      return widthRefU.default.createElement(accumulator, objHelper_ie({}, listRef, {
        className: configRef
      }))
    };
  fnVar_Ap.propTypes = lookupTable_WT;
  fnVar_Ap.defaultProps = lookupTable_HT;
  var lookupTable_VT = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      "aria-label": stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      role: stringRef.default.string
    },
    lookupTable_KT = {
      tag: "div",
      role: "toolbar"
    },
    fnVar_jp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "btn-toolbar"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_jp.propTypes = lookupTable_VT;
  fnVar_jp.defaultProps = lookupTable_KT;
  var lookupTable_GT = {
      children: stringRef.default.node,
      active: stringRef.default.bool,
      disabled: stringRef.default.bool,
      divider: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      header: stringRef.default.bool,
      onClick: stringRef.default.func,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      toggle: stringRef.default.bool
    },
    lookupTable_QT = {
      toggle: stringRef.default.func
    },
    lookupTable_YT = {
      tag: "button",
      toggle: !0
    },
    fnVar_Es = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.onClick = countRef.onClick.bind(countRef), countRef.getTabIndex = countRef.getTabIndex
          .bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "onClick",
        value: function(countRef) {
          if (this.props.disabled || this.props.header || this.props
            .divider) {
            countRef.preventDefault();
            return
          }
          this.props.onClick && this.props.onClick(countRef), this.props
            .toggle && this.context.toggle(countRef)
        }
      }, {
        key: "getTabIndex",
        value: function() {
          return this.props.disabled || this.props.header || this
            .props.divider ? "-1" : "0"
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this.getTabIndex(),
            optionRef = helperFn_Zr(this.props, ["toggle"]),
            indexRef = optionRef.className,
            accumulator = optionRef.cssModule,
            listRef = optionRef.divider,
            configRef = optionRef.tag,
            unitRef = optionRef.header,
            propRef = optionRef.active,
            funcRef = fnVar_he(optionRef, ["className", "cssModule", "divider", "tag",
              "header", "active"
            ]),
            coordY = helperFn_oe((0, localVar_se.default)(indexRef, {
              disabled: funcRef.disabled,
              "dropdown-item": !listRef && !unitRef,
              active: propRef,
              "dropdown-header": unitRef,
              "dropdown-divider": listRef
            }), accumulator);
          return configRef === "button" && (unitRef ? configRef = "h6" : listRef ? configRef = "div" : funcRef
            .href && (configRef = "a")), widthRefU.default.createElement(configRef, objHelper_ie({
            type: configRef === "button" && (funcRef.onClick || this.props
              .toggle) ? "button" : void 0
          }, funcRef, {
            tabIndex: countRef,
            className: coordY,
            onClick: this.onClick
          }))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_Es.propTypes = lookupTable_GT;
  fnVar_Es.defaultProps = lookupTable_YT;
  fnVar_Es.contextTypes = lookupTable_QT;
  var lookupTable_XT = {
      tag: stringRef.default.string,
      children: stringRef.default.node.isRequired,
      right: stringRef.default.bool,
      flip: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_JT = {
      tag: "div",
      flip: !0
    },
    lookupTable_ZT = {
      isOpen: stringRef.default.bool.isRequired,
      direction: stringRef.default.oneOf(["up", "down", "left", "right"])
        .isRequired,
      inNavbar: stringRef.default.bool.isRequired
    },
    lookupTable_eS = {
      flip: {
        enabled: !1
      }
    },
    lookupTable_tS = {
      up: "top",
      left: "left",
      right: "right",
      down: "bottom"
    },
    fnVar_Ts = function(entryRef, resultRef) {
      var countRef = entryRef.className,
        optionRef = entryRef.cssModule,
        indexRef = entryRef.right,
        accumulator = entryRef.tag,
        listRef = entryRef.flip,
        configRef = fnVar_he(entryRef, ["className", "cssModule", "right", "tag", "flip"]),
        unitRef = helperFn_oe((0, localVar_se.default)(countRef, "dropdown-menu", {
          "dropdown-menu-right": indexRef,
          show: resultRef.isOpen
        }), optionRef),
        propRef = accumulator;
      if (resultRef.isOpen && !resultRef.inNavbar) {
        propRef = localVar_Jr.Popper;
        var funcRef = lookupTable_tS[resultRef.direction] || "bottom",
          coordY = indexRef ? "end" : "start";
        configRef.placement = funcRef + "-" + coordY, configRef.component = accumulator, configRef.modifiers = listRef ? void 0 :
          lookupTable_eS
      }
      return widthRefU.default.createElement(propRef, objHelper_ie({
        tabIndex: "-1",
        role: "menu"
      }, configRef, {
        "aria-hidden": !resultRef.isOpen,
        className: unitRef
      }))
    };
  fnVar_Ts.propTypes = lookupTable_XT;
  fnVar_Ts.defaultProps = lookupTable_JT;
  fnVar_Ts.contextTypes = lookupTable_ZT;
  var lookupTable_rS = {
      caret: stringRef.default.bool,
      color: stringRef.default.string,
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      disabled: stringRef.default.bool,
      onClick: stringRef.default.func,
      "aria-haspopup": stringRef.default.bool,
      split: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      nav: stringRef.default.bool
    },
    lookupTable_nS = {
      "aria-haspopup": !0,
      color: "secondary"
    },
    lookupTable_oS = {
      isOpen: stringRef.default.bool.isRequired,
      toggle: stringRef.default.func.isRequired,
      inNavbar: stringRef.default.bool.isRequired
    },
    fnVar_Ss = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.onClick = countRef.onClick.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "onClick",
        value: function(countRef) {
          if (this.props.disabled) {
            countRef.preventDefault();
            return
          }
          this.props.nav && !this.props.tag && countRef.preventDefault(),
            this.props.onClick && this.props.onClick(countRef), this.context
            .toggle(countRef)
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.className,
            indexRef = countRef.color,
            accumulator = countRef.cssModule,
            listRef = countRef.caret,
            configRef = countRef.split,
            unitRef = countRef.nav,
            propRef = countRef.tag,
            funcRef = fnVar_he(countRef, ["className", "color", "cssModule", "caret",
              "split", "nav", "tag"
            ]),
            coordY = funcRef["aria-label"] || "Toggle Dropdown",
            outputRef = helperFn_oe((0, localVar_se.default)(optionRef, {
              "dropdown-toggle": listRef || configRef,
              "dropdown-toggle-split": configRef,
              "nav-link": unitRef
            }), accumulator),
            labelRef = funcRef.children || widthRefU.default.createElement("span", {
              className: "sr-only"
            }, coordY),
            depthRef = void 0;
          return unitRef && !propRef ? (depthRef = "a", funcRef.href = "#") : propRef ? depthRef = propRef : (depthRef =
              fnVar_aa, funcRef.color = indexRef, funcRef.cssModule = accumulator), this.context
            .inNavbar ? widthRefU.default.createElement(depthRef, objHelper_ie({}, funcRef, {
              className: outputRef,
              onClick: this.onClick,
              "aria-expanded": this.context.isOpen,
              children: labelRef
            })) : widthRefU.default.createElement(localVar_Jr.Target, objHelper_ie({}, funcRef, {
              className: outputRef,
              component: depthRef,
              onClick: this.onClick,
              "aria-expanded": this.context.isOpen,
              children: labelRef
            }))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_Ss.propTypes = lookupTable_rS;
  fnVar_Ss.defaultProps = lookupTable_nS;
  fnVar_Ss.contextTypes = lookupTable_oS;

  function helperFn_sy(valueRef) {
    return valueRef && valueRef.__esModule && Object.prototype.hasOwnProperty.call(valueRef,
      "default") ? valueRef.default : valueRef
  }

  function helperFn_cy(valueRef, entryRef) {
    return entryRef = {
      exports: {}
    }, valueRef(entryRef, entryRef.exports), entryRef.exports
  }
  var localVar_iS = helperFn_cy(function(valueRef, entryRef) {
    "use strict";
    entryRef.__esModule = !0, entryRef.classNamesShape = entryRef.timeoutsShape = void 0, entryRef
      .transitionTimeout = optionRef;
    var resultRef = countRef(stringRef.default);

    function countRef(listRef) {
      return listRef && listRef.__esModule ? listRef : {
        default: listRef
      }
    }

    function optionRef(listRef) {
      var configRef = "transition" + listRef + "Timeout",
        unitRef = "transition" + listRef;
      return function(propRef) {
        if (propRef[unitRef]) {
          if (propRef[configRef] == null) return new Error(configRef +
            " wasn't supplied to CSSTransitionGroup: this can cause unreliable animations and won't be supported in a future version of React. See https://fb.me/react-animation-transition-group-timeout for more information."
            );
          if (typeof propRef[configRef] != "number") return new Error(configRef +
            " must be a number (in milliseconds)")
        }
        return null
      }
    }
    var indexRef = entryRef.timeoutsShape = resultRef.default.oneOfType([resultRef.default.number, resultRef
        .default.shape({
          enter: resultRef.default.number,
          exit: resultRef.default.number
        })
        .isRequired
      ]),
      accumulator = entryRef.classNamesShape = resultRef.default.oneOfType([resultRef.default.string, resultRef
        .default.shape({
          enter: resultRef.default.string,
          exit: resultRef.default.string,
          active: resultRef.default.string
        }), resultRef.default.shape({
          enter: resultRef.default.string,
          enterActive: resultRef.default.string,
          exit: resultRef.default.string,
          exitActive: resultRef.default.string
        })
      ])
  });
  helperFn_sy(localVar_iS);
  var localVar_aS = helperFn_cy(function(valueRef, entryRef) {
      "use strict";
      entryRef.__esModule = !0, entryRef.EXITING = entryRef.ENTERED = entryRef.ENTERING = entryRef.EXITED = entryRef
        .UNMOUNTED = void 0;
      var resultRef = accumulator(stringRef.default),
        countRef = indexRef(widthRefU.default),
        optionRef = indexRef(localVar_qo.default);

      function indexRef(dataRef) {
        return dataRef && dataRef.__esModule ? dataRef : {
          default: dataRef
        }
      }

      function accumulator(dataRef) {
        if (dataRef && dataRef.__esModule) return dataRef;
        var errorRef = {};
        if (dataRef != null)
          for (var typeRef in dataRef) Object.prototype.hasOwnProperty.call(dataRef, typeRef) && (errorRef[
            typeRef] = dataRef[typeRef]);
        return errorRef.default = dataRef, errorRef
      }

      function listRef(dataRef, errorRef) {
        var typeRef = {};
        for (var stateRef in dataRef) errorRef.indexOf(stateRef) >= 0 || Object.prototype
          .hasOwnProperty.call(dataRef, stateRef) && (typeRef[stateRef] = dataRef[stateRef]);
        return typeRef
      }

      function configRef(dataRef, errorRef) {
        if (!(dataRef instanceof errorRef)) throw new TypeError(
          "Cannot call a class as a function")
      }

      function unitRef(dataRef, errorRef) {
        if (!dataRef) throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called");
        return errorRef && ((typeof errorRef > "u" ? "undefined" : strVar_ws(errorRef)) === "object" ||
          typeof errorRef == "function") ? errorRef : dataRef
      }

      function propRef(dataRef, errorRef) {
        if (typeof errorRef != "function" && errorRef !== null) throw new TypeError(
          "Super expression must either be null or a function, not " + (
            typeof errorRef > "u" ? "undefined" : strVar_ws(errorRef)));
        dataRef.prototype = Object.create(errorRef && errorRef.prototype, {
          constructor: {
            value: dataRef,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), errorRef && (Object.setPrototypeOf ? Object.setPrototypeOf(dataRef, errorRef) : dataRef
          .__proto__ = errorRef)
      }
      var funcRef = entryRef.UNMOUNTED = "unmounted",
        coordY = entryRef.EXITED = "exited",
        outputRef = entryRef.ENTERING = "entering",
        labelRef = entryRef.ENTERED = "entered",
        depthRef = entryRef.EXITING = "exiting",
        handleRef = function(dataRef) {
          propRef(errorRef, dataRef);

          function errorRef(typeRef, stateRef) {
            configRef(this, errorRef);
            var classRef = unitRef(this, dataRef.call(this, typeRef, stateRef)),
              keyRef = stateRef.transitionGroup,
              nodeRef = keyRef && !keyRef.isMounting ? typeRef.enter : typeRef.appear,
              innerIndex = void 0;
            return classRef.nextStatus = null, typeRef.in ? nodeRef ? (innerIndex = coordY, classRef.nextStatus =
              outputRef) : innerIndex = labelRef : typeRef.unmountOnExit || typeRef.mountOnEnter ? innerIndex = funcRef : innerIndex =
              coordY, classRef.state = {
                status: innerIndex
              }, classRef.nextCallback = null, classRef
          }
          return errorRef.prototype.getChildContext = function() {
            return {
              transitionGroup: null
            }
          }, errorRef.prototype.componentDidMount = function() {
            this.updateStatus(!0)
          }, errorRef.prototype.componentWillReceiveProps = function(stateRef) {
            var classRef = this.pendingState || this.state,
              keyRef = classRef.status;
            stateRef.in ? (keyRef === funcRef && this.setState({
              status: coordY
            }), keyRef !== outputRef && keyRef !== labelRef && (this.nextStatus = outputRef)) : (keyRef ===
              outputRef || keyRef === labelRef) && (this.nextStatus = depthRef)
          }, errorRef.prototype.componentDidUpdate = function() {
            this.updateStatus()
          }, errorRef.prototype.componentWillUnmount = function() {
            this.cancelNextCallback()
          }, errorRef.prototype.getTimeouts = function() {
            var stateRef = this.props.timeout,
              classRef = void 0,
              keyRef = void 0,
              nodeRef = void 0;
            return classRef = keyRef = nodeRef = stateRef, stateRef != null && typeof stateRef != "number" && (
              classRef = stateRef.exit, keyRef = stateRef.enter, nodeRef = stateRef.appear), {
              exit: classRef,
              enter: keyRef,
              appear: nodeRef
            }
          }, errorRef.prototype.updateStatus = function() {
            var stateRef = arguments.length > 0 && arguments[0] !== void 0 ?
              arguments[0] : !1,
              classRef = this.nextStatus;
            if (classRef !== null) {
              this.nextStatus = null, this.cancelNextCallback();
              var keyRef = optionRef.default.findDOMNode(this);
              classRef === outputRef ? this.performEnter(keyRef, stateRef) : this.performExit(keyRef)
            } else this.props.unmountOnExit && this.state.status === coordY &&
              this.setState({
                status: funcRef
              })
          }, errorRef.prototype.performEnter = function(stateRef, classRef) {
            var keyRef = this,
              nodeRef = this.props.enter,
              innerIndex = this.context.transitionGroup ? this.context
              .transitionGroup.isMounting : classRef,
              jsonRef = this.getTimeouts();
            if (!classRef && !nodeRef) {
              this.safeSetState({
                status: labelRef
              }, function() {
                keyRef.props.onEntered(stateRef)
              });
              return
            }
            this.props.onEnter(stateRef, innerIndex), this.safeSetState({
              status: outputRef
            }, function() {
              keyRef.props.onEntering(stateRef, innerIndex), keyRef.onTransitionEnd(stateRef, jsonRef.enter,
                function() {
                  keyRef.safeSetState({
                    status: labelRef
                  }, function() {
                    keyRef.props.onEntered(stateRef, innerIndex)
                  })
                })
            })
          }, errorRef.prototype.performExit = function(stateRef) {
            var classRef = this,
              keyRef = this.props.exit,
              nodeRef = this.getTimeouts();
            if (!keyRef) {
              this.safeSetState({
                status: coordY
              }, function() {
                classRef.props.onExited(stateRef)
              });
              return
            }
            this.props.onExit(stateRef), this.safeSetState({
              status: depthRef
            }, function() {
              classRef.props.onExiting(stateRef), classRef.onTransitionEnd(stateRef, nodeRef.exit,
                function() {
                  classRef.safeSetState({
                    status: coordY
                  }, function() {
                    classRef.props.onExited(stateRef)
                  })
                })
            })
          }, errorRef.prototype.cancelNextCallback = function() {
            this.nextCallback !== null && (this.nextCallback.cancel(),
              this.nextCallback = null)
          }, errorRef.prototype.safeSetState = function(stateRef, classRef) {
            var keyRef = this;
            this.pendingState = stateRef, classRef = this.setNextCallback(classRef), this
              .setState(stateRef, function() {
                keyRef.pendingState = null, classRef()
              })
          }, errorRef.prototype.setNextCallback = function(stateRef) {
            var classRef = this,
              keyRef = !0;
            return this.nextCallback = function(nodeRef) {
              keyRef && (keyRef = !1, classRef.nextCallback = null, stateRef(nodeRef))
            }, this.nextCallback.cancel = function() {
              keyRef = !1
            }, this.nextCallback
          }, errorRef.prototype.onTransitionEnd = function(stateRef, classRef, keyRef) {
            this.setNextCallback(keyRef), stateRef ? (this.props.addEndListener &&
              this.props.addEndListener(stateRef, this.nextCallback), classRef !=
              null && setTimeout(this.nextCallback, classRef)) : setTimeout(
              this.nextCallback, 0)
          }, errorRef.prototype.render = function() {
            var stateRef = this.state.status;
            if (stateRef === funcRef) return null;
            var classRef = this.props,
              keyRef = classRef.children,
              nodeRef = listRef(classRef, ["children"]);
            if (delete nodeRef.in, delete nodeRef.mountOnEnter, delete nodeRef
              .unmountOnExit, delete nodeRef.appear, delete nodeRef.enter, delete nodeRef
              .exit, delete nodeRef.timeout, delete nodeRef.addEndListener, delete nodeRef
              .onEnter, delete nodeRef.onEntering, delete nodeRef.onEntered, delete nodeRef
              .onExit, delete nodeRef.onExiting, delete nodeRef.onExited, typeof keyRef ==
              "function") return keyRef(stateRef, nodeRef);
            var innerIndex = countRef.default.Children.only(keyRef);
            return countRef.default.cloneElement(innerIndex, nodeRef)
          }, errorRef
        }(countRef.default.Component);
      handleRef.contextTypes = {
        transitionGroup: resultRef.object
      }, handleRef.childContextTypes = {
        transitionGroup: function() {}
      }, handleRef.propTypes = {};

      function widthRef() {}
      handleRef.defaultProps = {
          in: !1,
          mountOnEnter: !1,
          unmountOnExit: !1,
          appear: !1,
          enter: !0,
          exit: !0,
          onEnter: widthRef,
          onEntering: widthRef,
          onEntered: widthRef,
          onExit: widthRef,
          onExiting: widthRef,
          onExited: widthRef
        }, handleRef.UNMOUNTED = 0, handleRef.EXITED = 1, handleRef.ENTERING = 2, handleRef.ENTERED = 3, handleRef
        .EXITING = 4, entryRef.default = handleRef
    }),
    localVar_tn = helperFn_sy(localVar_aS),
    localVar_lS = objHelper_ie({}, localVar_tn.propTypes, {
      children: stringRef.default.oneOfType([stringRef.default.arrayOf(stringRef.default.node), stringRef
        .default.node
      ]),
      tag: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func]),
      baseClass: stringRef.default.string,
      baseClassActive: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    }),
    localVar_sS = objHelper_ie({}, localVar_tn.defaultProps, {
      tag: "div",
      baseClass: "fade",
      baseClassActive: "show",
      timeout: lookupTable_Uo.Fade,
      appear: !0,
      enter: !0,
      exit: !0,
      in: !0
    });

  function helperFn_Tr(valueRef) {
    var entryRef = valueRef.tag,
      resultRef = valueRef.baseClass,
      countRef = valueRef.baseClassActive,
      optionRef = valueRef.className,
      indexRef = valueRef.cssModule,
      accumulator = valueRef.children,
      listRef = fnVar_he(valueRef, ["tag", "baseClass", "baseClassActive", "className",
        "cssModule", "children"
      ]),
      configRef = helperFn_vp(listRef, listVar_oa),
      unitRef = helperFn_Zr(listRef, listVar_oa);
    return widthRefU.default.createElement(localVar_tn, configRef, function(propRef) {
      var funcRef = propRef === "entered",
        coordY = helperFn_oe((0, localVar_se.default)(optionRef, resultRef, funcRef && countRef), indexRef);
      return widthRefU.default.createElement(entryRef, objHelper_ie({
        className: coordY
      }, unitRef), accumulator)
    })
  }
  helperFn_Tr.propTypes = localVar_lS;
  helperFn_Tr.defaultProps = localVar_sS;
  var lookupTable_cS = {
      color: stringRef.default.string,
      pill: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_uS = {
      color: "secondary",
      pill: !1,
      tag: "span"
    },
    fnVar_Rp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.color,
        indexRef = entryRef.pill,
        accumulator = entryRef.tag,
        listRef = fnVar_he(entryRef, ["className", "cssModule", "color", "pill", "tag"]),
        configRef = helperFn_oe((0, localVar_se.default)(resultRef, "badge", "badge-" + optionRef, indexRef ? "badge-pill" : !
          1), countRef);
      return listRef.href && accumulator === "span" && (accumulator = "a"), widthRefU.default.createElement(accumulator,
        objHelper_ie({}, listRef, {
          className: configRef
        }))
    };
  fnVar_Rp.propTypes = lookupTable_cS;
  fnVar_Rp.defaultProps = lookupTable_uS;
  var lookupTable_dS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      inverse: stringRef.default.bool,
      color: stringRef.default.string,
      block: helperFn_vr(stringRef.default.bool, 'Please use the props "body"'),
      body: stringRef.default.bool,
      outline: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_pS = {
      tag: "div"
    },
    fnVar_Ip = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.color,
        indexRef = entryRef.block,
        accumulator = entryRef.body,
        listRef = entryRef.inverse,
        configRef = entryRef.outline,
        unitRef = entryRef.tag,
        propRef = fnVar_he(entryRef, ["className", "cssModule", "color", "block", "body",
          "inverse", "outline", "tag"
        ]),
        funcRef = helperFn_oe((0, localVar_se.default)(resultRef, "card", listRef ? "text-white" : !1, indexRef || accumulator ?
          "card-body" : !1, optionRef ? (configRef ? "border" : "bg") + "-" + optionRef : !1), countRef);
      return widthRefU.default.createElement(unitRef, objHelper_ie({}, propRef, {
        className: funcRef
      }))
    };
  fnVar_Ip.propTypes = lookupTable_dS;
  fnVar_Ip.defaultProps = lookupTable_pS;
  var lookupTable_fS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_mS = {
      tag: "div"
    },
    fnVar_Dp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-group"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Dp.propTypes = lookupTable_fS;
  fnVar_Dp.defaultProps = lookupTable_mS;
  var lookupTable_gS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_hS = {
      tag: "div"
    },
    fnVar_Fp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-deck"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Fp.propTypes = lookupTable_gS;
  fnVar_Fp.defaultProps = lookupTable_hS;
  var lookupTable_bS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_vS = {
      tag: "div"
    },
    fnVar_zp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-columns"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_zp.propTypes = lookupTable_bS;
  fnVar_zp.defaultProps = lookupTable_vS;
  var lookupTable_yS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_xS = {
      tag: "div"
    },
    fnVar_Os = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-body"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Os.propTypes = lookupTable_yS;
  fnVar_Os.defaultProps = lookupTable_xS;

  function helperFn_wS(valueRef) {
    return helperFn_en(`The "CardBlock" component has been deprecated.
Please use component "CardBody".`), widthRefU.default.createElement(fnVar_Os, valueRef)
  }
  var lookupTable__S = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      innerRef: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_kS = {
      tag: "a"
    },
    fnVar_Lp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = entryRef.innerRef,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "tag", "innerRef"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, "card-link"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, accumulator, {
        ref: indexRef,
        className: listRef
      }))
    };
  fnVar_Lp.propTypes = lookupTable__S;
  fnVar_Lp.defaultProps = lookupTable_kS;
  var lookupTable_ES = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_TS = {
      tag: "div"
    },
    fnVar_$p = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-footer"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_$p.propTypes = lookupTable_ES;
  fnVar_$p.defaultProps = lookupTable_TS;
  var lookupTable_SS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_OS = {
      tag: "div"
    },
    fnVar_qp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-header"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_qp.propTypes = lookupTable_SS;
  fnVar_qp.defaultProps = lookupTable_OS;
  var lookupTable_PS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      top: stringRef.default.bool,
      bottom: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_CS = {
      tag: "img"
    },
    fnVar_Bp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.top,
        indexRef = entryRef.bottom,
        accumulator = entryRef.tag,
        listRef = fnVar_he(entryRef, ["className", "cssModule", "top", "bottom", "tag"]),
        configRef = "card-img";
      optionRef && (configRef = "card-img-top"), indexRef && (configRef = "card-img-bottom");
      var unitRef = helperFn_oe((0, localVar_se.default)(resultRef, configRef), countRef);
      return widthRefU.default.createElement(accumulator, objHelper_ie({}, listRef, {
        className: unitRef
      }))
    };
  fnVar_Bp.propTypes = lookupTable_PS;
  fnVar_Bp.defaultProps = lookupTable_CS;
  var lookupTable_NS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_MS = {
      tag: "div"
    },
    fnVar_Up = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-img-overlay"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Up.propTypes = lookupTable_NS;
  fnVar_Up.defaultProps = lookupTable_MS;
  var fnVar_Wo = function(valueRef) {
    fnVar_vt(entryRef, valueRef);

    function entryRef(resultRef) {
      fnVar_ht(this, entryRef);
      var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
        .call(this, resultRef));
      return countRef.state = {
          startAnimation: !1
        }, countRef.onEnter = countRef.onEnter.bind(countRef), countRef.onEntering = countRef.onEntering.bind(
          countRef), countRef.onExit = countRef.onExit.bind(countRef), countRef.onExiting = countRef.onExiting.bind(
        countRef), countRef.onExited = countRef.onExited.bind(countRef), countRef
    }
    return fnVar_bt(entryRef, [{
      key: "onEnter",
      value: function(countRef, optionRef) {
        this.setState({
          startAnimation: !1
        }), this.props.onEnter(countRef, optionRef)
      }
    }, {
      key: "onEntering",
      value: function(countRef, optionRef) {
        var indexRef = countRef.offsetHeight;
        return this.setState({
          startAnimation: !0
        }), this.props.onEntering(countRef, optionRef), indexRef
      }
    }, {
      key: "onExit",
      value: function(countRef) {
        this.setState({
          startAnimation: !1
        }), this.props.onExit(countRef)
      }
    }, {
      key: "onExiting",
      value: function(countRef) {
        this.setState({
            startAnimation: !0
          }), countRef.dispatchEvent(new CustomEvent("slide.bs.carousel")),
          this.props.onExiting(countRef)
      }
    }, {
      key: "onExited",
      value: function(countRef) {
        countRef.dispatchEvent(new CustomEvent("slid.bs.carousel")), this
          .props.onExited(countRef)
      }
    }, {
      key: "render",
      value: function() {
        var countRef = this,
          optionRef = this.props,
          indexRef = optionRef.in,
          accumulator = optionRef.children,
          listRef = optionRef.cssModule,
          configRef = optionRef.slide,
          unitRef = optionRef.tag,
          propRef = optionRef.className,
          funcRef = fnVar_he(optionRef, ["in", "children", "cssModule", "slide", "tag",
            "className"
          ]);
        return widthRefU.default.createElement(localVar_tn, objHelper_ie({}, funcRef, {
          enter: configRef,
          exit: configRef,
          in: indexRef,
          onEnter: this.onEnter,
          onEntering: this.onEntering,
          onExit: this.onExit,
          onExiting: this.onExiting,
          onExited: this.onExited
        }), function(coordY) {
          var outputRef = countRef.context.direction,
            labelRef = coordY === lookupTable_Fr.ENTERED || coordY === lookupTable_Fr.EXITING,
            depthRef = (coordY === lookupTable_Fr.ENTERING || coordY === lookupTable_Fr.EXITING) && countRef
            .state.startAnimation && (outputRef === "right" ?
              "carousel-item-left" : "carousel-item-right"),
            handleRef = coordY === lookupTable_Fr.ENTERING && (outputRef === "right" ?
              "carousel-item-next" : "carousel-item-prev"),
            widthRef = helperFn_oe((0, localVar_se.default)(propRef, "carousel-item", labelRef &&
              "active", depthRef, handleRef), listRef);
          return widthRefU.default.createElement(unitRef, {
            className: widthRef
          }, accumulator)
        })
      }
    }]), entryRef
  }(widthRefU.default.Component);
  fnVar_Wo.propTypes = objHelper_ie({}, localVar_tn.propTypes, {
    tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
    in: stringRef.default.bool,
    cssModule: stringRef.default.object,
    children: stringRef.default.node,
    slide: stringRef.default.bool,
    className: stringRef.default.string
  });
  fnVar_Wo.defaultProps = objHelper_ie({}, localVar_tn.defaultProps, {
    tag: "div",
    timeout: lookupTable_Uo.Carousel,
    slide: !0
  });
  fnVar_Wo.contextTypes = {
    direction: stringRef.default.string
  };
  var fnVar_la = function(valueRef) {
    fnVar_vt(entryRef, valueRef);

    function entryRef(resultRef) {
      fnVar_ht(this, entryRef);
      var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
        .call(this, resultRef));
      return countRef.handleKeyPress = countRef.handleKeyPress.bind(countRef), countRef.renderItems = countRef
        .renderItems.bind(countRef), countRef.hoverStart = countRef.hoverStart.bind(countRef), countRef
        .hoverEnd = countRef.hoverEnd.bind(countRef), countRef.state = {
          direction: "right",
          indicatorClicked: !1
        }, countRef
    }
    return fnVar_bt(entryRef, [{
      key: "getChildContext",
      value: function() {
        return {
          direction: this.state.direction
        }
      }
    }, {
      key: "componentDidMount",
      value: function() {
        this.props.ride === "carousel" && this.setInterval(),
          document.addEventListener("keyup", this.handleKeyPress)
      }
    }, {
      key: "componentWillReceiveProps",
      value: function(countRef) {
        this.setInterval(countRef), this.props.activeIndex + 1 === countRef
          .activeIndex ? this.setState({
            direction: "right"
          }) : this.props.activeIndex - 1 === countRef.activeIndex ? this
          .setState({
            direction: "left"
          }) : this.props.activeIndex > countRef.activeIndex ? this
          .setState({
            direction: this.state.indicatorClicked ?
              "left" : "right"
          }) : this.props.activeIndex !== countRef.activeIndex && this
          .setState({
            direction: this.state.indicatorClicked ?
              "right" : "left"
          }), this.setState({
            indicatorClicked: !1
          })
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.clearInterval(), document.removeEventListener("keyup",
          this.handleKeyPress)
      }
    }, {
      key: "setInterval",
      value: function(resultRef) {
        function countRef() {
          return resultRef.apply(this, arguments)
        }
        return countRef.toString = function() {
          return resultRef.toString()
        }, countRef
      }(function() {
        var resultRef = arguments.length > 0 && arguments[0] !== void 0 ?
          arguments[0] : this.props;
        this.clearInterval(), resultRef.interval && (this.cycleInterval =
          setInterval(function() {
            resultRef.next()
          }, parseInt(resultRef.interval, 10)))
      })
    }, {
      key: "clearInterval",
      value: function(resultRef) {
        function countRef() {
          return resultRef.apply(this, arguments)
        }
        return countRef.toString = function() {
          return resultRef.toString()
        }, countRef
      }(function() {
        clearInterval(this.cycleInterval)
      })
    }, {
      key: "hoverStart",
      value: function() {
        if (this.props.pause === "hover" && this.clearInterval(),
          this.props.mouseEnter) {
          var countRef;
          (countRef = this.props)
          .mouseEnter.apply(countRef, arguments)
        }
      }
    }, {
      key: "hoverEnd",
      value: function() {
        if (this.props.pause === "hover" && this.setInterval(), this
          .props.mouseLeave) {
          var countRef;
          (countRef = this.props)
          .mouseLeave.apply(countRef, arguments)
        }
      }
    }, {
      key: "handleKeyPress",
      value: function(countRef) {
        this.props.keyboard && (countRef.keyCode === 37 ? this.props
          .previous() : countRef.keyCode === 39 && this.props.next())
      }
    }, {
      key: "renderItems",
      value: function(countRef, optionRef) {
        var indexRef = this,
          accumulator = this.props.slide;
        return widthRefU.default.createElement("div", {
          role: "listbox",
          className: optionRef
        }, countRef.map(function(listRef, configRef) {
          var unitRef = configRef === indexRef.props.activeIndex;
          return widthRefU.default.cloneElement(listRef, {
            in: unitRef,
            slide: accumulator
          })
        }))
      }
    }, {
      key: "render",
      value: function() {
        var countRef = this,
          optionRef = this.props,
          indexRef = optionRef.children,
          accumulator = optionRef.cssModule,
          listRef = optionRef.slide,
          configRef = optionRef.className,
          unitRef = helperFn_oe((0, localVar_se.default)(configRef, "carousel", listRef && "slide"), accumulator),
          propRef = helperFn_oe((0, localVar_se.default)("carousel-inner"), accumulator),
          funcRef = indexRef.every(function(stateRef) {
            return stateRef.type === fnVar_Wo
          });
        if (funcRef) return widthRefU.default.createElement("div", {
          className: unitRef,
          onMouseEnter: this.hoverStart,
          onMouseLeave: this.hoverEnd
        }, this.renderItems(indexRef, propRef));
        if (indexRef[0] instanceof Array) {
          var coordY = indexRef[0],
            outputRef = indexRef[1],
            labelRef = indexRef[2];
          return widthRefU.default.createElement("div", {
            className: unitRef,
            onMouseEnter: this.hoverStart,
            onMouseLeave: this.hoverEnd
          }, this.renderItems(coordY, propRef), outputRef, labelRef)
        }
        var depthRef = indexRef[0],
          handleRef = function(classRef) {
            typeof depthRef.props.onClickHandler == "function" && countRef
              .setState({
                indicatorClicked: !0
              }, function() {
                return depthRef.props.onClickHandler(classRef)
              })
          },
          widthRef = widthRefU.default.cloneElement(depthRef, {
            onClickHandler: handleRef
          }),
          dataRef = indexRef[1],
          errorRef = indexRef[2],
          typeRef = indexRef[3];
        return widthRefU.default.createElement("div", {
          className: unitRef,
          onMouseEnter: this.hoverStart,
          onMouseLeave: this.hoverEnd
        }, widthRef, this.renderItems(dataRef, propRef), errorRef, typeRef)
      }
    }]), entryRef
  }(widthRefU.default.Component);
  fnVar_la.propTypes = {
    activeIndex: stringRef.default.number,
    next: stringRef.default.func.isRequired,
    previous: stringRef.default.func.isRequired,
    keyboard: stringRef.default.bool,
    pause: stringRef.default.oneOf(["hover", !1]),
    ride: stringRef.default.oneOf(["carousel"]),
    interval: stringRef.default.oneOfType([stringRef.default.number, stringRef.default.string, stringRef
      .default.bool
    ]),
    children: stringRef.default.array,
    mouseEnter: stringRef.default.func,
    mouseLeave: stringRef.default.func,
    slide: stringRef.default.bool,
    cssModule: stringRef.default.object,
    className: stringRef.default.string
  };
  fnVar_la.defaultProps = {
    interval: 5e3,
    pause: "hover",
    keyboard: !0,
    slide: !0
  };
  fnVar_la.childContextTypes = {
    direction: stringRef.default.string
  };
  var fnVar__s = function(entryRef) {
    var resultRef = entryRef.direction,
      countRef = entryRef.onClickHandler,
      optionRef = entryRef.cssModule,
      indexRef = entryRef.directionText,
      accumulator = entryRef.className,
      listRef = helperFn_oe((0, localVar_se.default)(accumulator, "carousel-control-" + resultRef), optionRef),
      configRef = helperFn_oe((0, localVar_se.default)("carousel-control-" + resultRef + "-icon"), optionRef),
      unitRef = helperFn_oe((0, localVar_se.default)("sr-only"), optionRef);
    return widthRefU.default.createElement("a", {
      className: listRef,
      role: "button",
      tabIndex: "0",
      onClick: function(funcRef) {
        funcRef.preventDefault(), countRef()
      }
    }, widthRefU.default.createElement("span", {
      className: configRef,
      "aria-hidden": "true"
    }), widthRefU.default.createElement("span", {
      className: unitRef
    }, indexRef || resultRef))
  };
  fnVar__s.propTypes = {
    direction: stringRef.default.oneOf(["prev", "next"])
      .isRequired,
    onClickHandler: stringRef.default.func.isRequired,
    cssModule: stringRef.default.object,
    directionText: stringRef.default.string,
    className: stringRef.default.string
  };
  var fnVar_Wp = function(entryRef) {
    var resultRef = entryRef.items,
      countRef = entryRef.activeIndex,
      optionRef = entryRef.cssModule,
      indexRef = entryRef.onClickHandler,
      accumulator = entryRef.className,
      listRef = helperFn_oe((0, localVar_se.default)(accumulator, "carousel-indicators"), optionRef),
      configRef = resultRef.map(function(unitRef, propRef) {
        var funcRef = helperFn_oe((0, localVar_se.default)({
          active: countRef === propRef
        }), optionRef);
        return widthRefU.default.createElement("li", {
          key: "" + (unitRef.key || unitRef.src) + unitRef.caption + unitRef.altText,
          onClick: function(outputRef) {
            outputRef.preventDefault(), indexRef(propRef)
          },
          className: funcRef
        })
      });
    return widthRefU.default.createElement("ol", {
      className: listRef
    }, configRef)
  };
  fnVar_Wp.propTypes = {
    items: stringRef.default.array.isRequired,
    activeIndex: stringRef.default.number.isRequired,
    cssModule: stringRef.default.object,
    onClickHandler: stringRef.default.func.isRequired,
    className: stringRef.default.string
  };
  var fnVar_Hp = function(entryRef) {
    var resultRef = entryRef.captionHeader,
      countRef = entryRef.captionText,
      optionRef = entryRef.cssModule,
      indexRef = entryRef.className,
      accumulator = helperFn_oe((0, localVar_se.default)(indexRef, "carousel-caption", "d-none", "d-md-block"),
        optionRef);
    return widthRefU.default.createElement("div", {
      className: accumulator
    }, widthRefU.default.createElement("h3", null, resultRef), widthRefU.default.createElement(
      "p", null, countRef))
  };
  fnVar_Hp.propTypes = {
    captionHeader: stringRef.default.string,
    captionText: stringRef.default.string.isRequired,
    cssModule: stringRef.default.object,
    className: stringRef.default.string
  };
  var lookupTable_AS = {
      items: stringRef.default.array.isRequired,
      indicators: stringRef.default.bool,
      controls: stringRef.default.bool,
      autoPlay: stringRef.default.bool,
      activeIndex: stringRef.default.number,
      next: stringRef.default.func,
      previous: stringRef.default.func,
      goToIndex: stringRef.default.func
    },
    fnVar_Vp = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.animating = !1, countRef.state = {
            activeIndex: 0
          }, countRef.next = countRef.next.bind(countRef), countRef.previous = countRef.previous.bind(countRef), countRef
          .goToIndex = countRef.goToIndex.bind(countRef), countRef.onExiting = countRef.onExiting.bind(countRef),
          countRef.onExited = countRef.onExited.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "onExiting",
        value: function() {
          this.animating = !0
        }
      }, {
        key: "onExited",
        value: function() {
          this.animating = !1
        }
      }, {
        key: "next",
        value: function() {
          if (!this.animating) {
            var countRef = this.state.activeIndex === this.props.items
              .length - 1 ? 0 : this.state.activeIndex + 1;
            this.setState({
              activeIndex: countRef
            })
          }
        }
      }, {
        key: "previous",
        value: function() {
          if (!this.animating) {
            var countRef = this.state.activeIndex === 0 ? this.props.items
              .length - 1 : this.state.activeIndex - 1;
            this.setState({
              activeIndex: countRef
            })
          }
        }
      }, {
        key: "goToIndex",
        value: function(countRef) {
          this.animating || this.setState({
            activeIndex: countRef
          })
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this,
            optionRef = this.props,
            indexRef = optionRef.autoPlay,
            accumulator = optionRef.indicators,
            listRef = optionRef.controls,
            configRef = optionRef.items,
            unitRef = optionRef.goToIndex,
            propRef = fnVar_he(optionRef, ["autoPlay", "indicators", "controls", "items",
              "goToIndex"
            ]),
            funcRef = this.state.activeIndex,
            coordY = configRef.map(function(outputRef) {
              return widthRefU.default.createElement(fnVar_Wo, {
                onExiting: countRef.onExiting,
                onExited: countRef.onExited,
                key: outputRef.src
              }, widthRefU.default.createElement("img", {
                src: outputRef.src,
                alt: outputRef.altText
              }), widthRefU.default.createElement(fnVar_Hp, {
                captionText: outputRef.caption,
                captionHeader: outputRef.caption
              }))
            });
          return widthRefU.default.createElement(fnVar_la, objHelper_ie({
            activeIndex: funcRef,
            next: this.next,
            previous: this.previous,
            ride: indexRef ? "carousel" : void 0
          }, propRef), accumulator && widthRefU.default.createElement(fnVar_Wp, {
            items: configRef,
            activeIndex: propRef.activeIndex || funcRef,
            onClickHandler: unitRef || this.goToIndex
          }), coordY, listRef && widthRefU.default.createElement(fnVar__s, {
            direction: "prev",
            directionText: "Previous",
            onClickHandler: propRef.previous || this.previous
          }), listRef && widthRefU.default.createElement(fnVar__s, {
            direction: "next",
            directionText: "Next",
            onClickHandler: propRef.next || this.next
          }))
        }
      }]), entryRef
    }(widthRefU.Component);
  fnVar_Vp.propTypes = lookupTable_AS;
  fnVar_Vp.defaultProps = {
    controls: !0,
    indicators: !0,
    autoPlay: !0
  };
  var lookupTable_jS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_RS = {
      tag: "h6"
    },
    fnVar_Kp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-subtitle"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Kp.propTypes = lookupTable_jS;
  fnVar_Kp.defaultProps = lookupTable_RS;
  var lookupTable_IS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_DS = {
      tag: "p"
    },
    fnVar_Gp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-text"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Gp.propTypes = lookupTable_IS;
  fnVar_Gp.defaultProps = lookupTable_DS;
  var lookupTable_FS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_zS = {
      tag: "h5"
    },
    fnVar_Qp = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "card-title"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Qp.propTypes = lookupTable_FS;
  fnVar_Qp.defaultProps = lookupTable_zS;
  var lookupTable_LS = {
      children: stringRef.default.node.isRequired,
      className: stringRef.default.string,
      placement: stringRef.default.string,
      placementPrefix: stringRef.default.string,
      hideArrow: stringRef.default.bool,
      tag: stringRef.default.string,
      isOpen: stringRef.default.bool.isRequired,
      cssModule: stringRef.default.object,
      offset: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.number]),
      fallbackPlacement: stringRef.default.oneOfType([stringRef.default.string, stringRef.default
        .array
      ]),
      flip: stringRef.default.bool,
      container: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func, helperFn_Sn]),
      target: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func, helperFn_Sn])
        .isRequired,
      modifiers: stringRef.default.object
    },
    lookupTable_$S = {
      placement: "auto",
      hideArrow: !1,
      isOpen: !1,
      offset: 0,
      fallbackPlacement: "flip",
      flip: !0,
      container: "body",
      modifiers: {}
    },
    lookupTable_qS = {
      popperManager: stringRef.default.object.isRequired
    },
    fnVar_Ho = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.handlePlacementChange = countRef.handlePlacementChange.bind(countRef), countRef
          .setTargetNode = countRef.setTargetNode.bind(countRef), countRef.getTargetNode = countRef
          .getTargetNode.bind(countRef), countRef.state = {}, countRef
      }
      return fnVar_bt(entryRef, [{
        key: "getChildContext",
        value: function() {
          return {
            popperManager: {
              setTargetNode: this.setTargetNode,
              getTargetNode: this.getTargetNode
            }
          }
        }
      }, {
        key: "componentDidMount",
        value: function() {
          this.handleProps()
        }
      }, {
        key: "componentDidUpdate",
        value: function(countRef) {
          this.props.isOpen !== countRef.isOpen ? this.handleProps() : this
            ._element && this.renderIntoSubtree()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.hide()
        }
      }, {
        key: "setTargetNode",
        value: function(countRef) {
          this.targetNode = countRef
        }
      }, {
        key: "getTargetNode",
        value: function() {
          return this.targetNode
        }
      }, {
        key: "getContainerNode",
        value: function() {
          return helperFn_Bo(this.props.container)
        }
      }, {
        key: "handlePlacementChange",
        value: function(countRef) {
          return this.state.placement !== countRef.placement && this
            .setState({
              placement: countRef.placement
            }), countRef
        }
      }, {
        key: "handleProps",
        value: function() {
          this.props.container !== "inline" && (this.props.isOpen ?
            this.show() : this.hide())
        }
      }, {
        key: "hide",
        value: function() {
          this._element && (this.getContainerNode()
            .removeChild(this._element), localVar_qo.default
            .unmountComponentAtNode(this._element), this._element =
            null)
        }
      }, {
        key: "show",
        value: function() {
          this._element = document.createElement("div"), this
            .getContainerNode()
            .appendChild(this._element), this.renderIntoSubtree(),
            this._element.childNodes && this._element.childNodes[0] &&
            this._element.childNodes[0].focus && this._element
            .childNodes[0].focus()
        }
      }, {
        key: "renderIntoSubtree",
        value: function() {
          localVar_qo.default.unstable_renderSubtreeIntoContainer(this, this
            .renderChildren(), this._element)
        }
      }, {
        key: "renderChildren",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.cssModule,
            indexRef = countRef.children,
            accumulator = countRef.isOpen,
            listRef = countRef.flip,
            configRef = countRef.target,
            unitRef = countRef.offset,
            propRef = countRef.fallbackPlacement,
            funcRef = countRef.placementPrefix,
            coordY = countRef.hideArrow,
            outputRef = countRef.className,
            labelRef = countRef.tag,
            depthRef = countRef.container,
            handleRef = countRef.modifiers,
            widthRef = fnVar_he(countRef, ["cssModule", "children", "isOpen", "flip",
              "target", "offset", "fallbackPlacement",
              "placementPrefix", "hideArrow", "className", "tag",
              "container", "modifiers"
            ]),
            dataRef = helperFn_oe("arrow", optionRef),
            errorRef = (this.state.placement || widthRef.placement)
            .split("-")[0],
            typeRef = helperFn_oe((0, localVar_se.default)(outputRef, funcRef ? funcRef + "-" + errorRef : errorRef), this.props
              .cssModule),
            stateRef = objHelper_ie({
              offset: {
                offset: unitRef
              },
              flip: {
                enabled: listRef,
                behavior: propRef
              },
              update: {
                enabled: !0,
                order: 950,
                fn: this.handlePlacementChange
              }
            }, handleRef);
          return widthRefU.default.createElement(localVar_Jr.Popper, objHelper_ie({
            modifiers: stateRef
          }, widthRef, {
            component: labelRef,
            className: typeRef
          }), indexRef, !coordY && widthRefU.default.createElement(localVar_Jr.Arrow, {
            className: dataRef
          }))
        }
      }, {
        key: "render",
        value: function() {
          return this.setTargetNode(helperFn_Bo(this.props.target)), this.props
            .container === "inline" && this.props.isOpen ? this
            .renderChildren() : null
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_Ho.propTypes = lookupTable_LS;
  fnVar_Ho.defaultProps = lookupTable_$S;
  fnVar_Ho.childContextTypes = lookupTable_qS;
  var fnVar_Yp = function(entryRef, resultRef) {
    return resultRef.popperManager.setTargetNode(helperFn_Bo(entryRef.target)), null
  };
  fnVar_Yp.contextTypes = {
    popperManager: stringRef.default.object.isRequired
  };
  fnVar_Yp.propTypes = {
    target: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func, helperFn_Sn])
      .isRequired
  };
  var lookupTable_uy = {
      placement: stringRef.default.oneOf(listVar_yp),
      target: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func, helperFn_Sn])
        .isRequired,
      container: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func, helperFn_Sn]),
      isOpen: stringRef.default.bool,
      disabled: stringRef.default.bool,
      hideArrow: stringRef.default.bool,
      className: stringRef.default.string,
      innerClassName: stringRef.default.string,
      placementPrefix: stringRef.default.string,
      cssModule: stringRef.default.object,
      toggle: stringRef.default.func,
      delay: stringRef.default.oneOfType([stringRef.default.shape({
        show: stringRef.default.number,
        hide: stringRef.default.number
      }), stringRef.default.number]),
      modifiers: stringRef.default.object
    },
    lookupTable_dy = {
      show: 0,
      hide: 0
    },
    lookupTable_BS = {
      isOpen: !1,
      hideArrow: !1,
      placement: "right",
      placementPrefix: "bs-popover",
      delay: lookupTable_dy,
      toggle: function() {}
    },
    fnVar_Xp = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.addTargetEvents = countRef.addTargetEvents.bind(countRef), countRef
          .handleDocumentClick = countRef.handleDocumentClick.bind(countRef), countRef
          .removeTargetEvents = countRef.removeTargetEvents.bind(countRef), countRef.getRef = countRef
          .getRef.bind(countRef), countRef.toggle = countRef.toggle.bind(countRef), countRef.show = countRef.show.bind(
            countRef), countRef.hide = countRef.hide.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "componentDidMount",
        value: function() {
          this._target = helperFn_Bo(this.props.target), this.handleProps()
        }
      }, {
        key: "componentDidUpdate",
        value: function() {
          this.handleProps()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.clearShowTimeout(), this.clearHideTimeout(), this
            .removeTargetEvents()
        }
      }, {
        key: "getRef",
        value: function(countRef) {
          this._popover = countRef
        }
      }, {
        key: "getDelay",
        value: function(countRef) {
          var optionRef = this.props.delay;
          return (typeof optionRef > "u" ? "undefined" : strVar_ws(optionRef)) === "object" ?
            isNaN(optionRef[countRef]) ? lookupTable_dy[countRef] : optionRef[countRef] : optionRef
        }
      }, {
        key: "handleProps",
        value: function() {
          this.props.isOpen ? this.show() : this.hide()
        }
      }, {
        key: "show",
        value: function() {
          this.clearHideTimeout(), this.addTargetEvents(), this.props
            .isOpen || (this.clearShowTimeout(), this._showTimeout =
              setTimeout(this.toggle, this.getDelay("show")))
        }
      }, {
        key: "hide",
        value: function() {
          this.clearShowTimeout(), this.removeTargetEvents(), this
            .props.isOpen && (this.clearHideTimeout(), this
              ._hideTimeout = setTimeout(this.toggle, this.getDelay(
                "hide")))
        }
      }, {
        key: "clearShowTimeout",
        value: function() {
          clearTimeout(this._showTimeout), this._showTimeout = void 0
        }
      }, {
        key: "clearHideTimeout",
        value: function() {
          clearTimeout(this._hideTimeout), this._hideTimeout = void 0
        }
      }, {
        key: "handleDocumentClick",
        value: function(countRef) {
          countRef.target !== this._target && !this._target.contains(countRef
            .target) && countRef.target !== this._popover && !(this
            ._popover && this._popover.contains(countRef.target)) && (this
            ._hideTimeout && this.clearHideTimeout(), this.props
            .isOpen && this.toggle(countRef))
        }
      }, {
        key: "addTargetEvents",
        value: function() {
          var countRef = this;
          ["click", "touchstart"].forEach(function(optionRef) {
            return document.addEventListener(optionRef, countRef
              .handleDocumentClick, !0)
          })
        }
      }, {
        key: "removeTargetEvents",
        value: function() {
          var countRef = this;
          ["click", "touchstart"].forEach(function(optionRef) {
            return document.removeEventListener(optionRef, countRef
              .handleDocumentClick, !0)
          })
        }
      }, {
        key: "toggle",
        value: function(countRef) {
          return this.props.disabled ? countRef && countRef.preventDefault() : this
            .props.toggle(countRef)
        }
      }, {
        key: "render",
        value: function() {
          if (!this.props.isOpen) return null;
          var countRef = helperFn_Zr(this.props, Object.keys(lookupTable_uy)),
            optionRef = helperFn_oe((0, localVar_se.default)("popover-inner", this.props
              .innerClassName), this.props.cssModule),
            indexRef = helperFn_oe((0, localVar_se.default)("popover", "show", this.props
              .className), this.props.cssModule);
          return widthRefU.default.createElement(fnVar_Ho, {
            className: indexRef,
            target: this.props.target,
            isOpen: this.props.isOpen,
            hideArrow: this.props.hideArrow,
            placement: this.props.placement,
            placementPrefix: this.props.placementPrefix,
            container: this.props.container,
            modifiers: this.props.modifiers
          }, widthRefU.default.createElement("div", objHelper_ie({}, countRef, {
            className: optionRef,
            ref: this.getRef
          })))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_Xp.propTypes = lookupTable_uy;
  fnVar_Xp.defaultProps = lookupTable_BS;
  var lookupTable_US = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_WS = {
      tag: "h3"
    },
    fnVar_Ps = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "popover-header"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Ps.propTypes = lookupTable_US;
  fnVar_Ps.defaultProps = lookupTable_WS;

  function helperFn_HS(valueRef) {
    return helperFn_en(`The "PopoverTitle" component has been deprecated.
Please use component "PopoverHeader".`), widthRefU.default.createElement(fnVar_Ps, valueRef)
  }
  var lookupTable_VS = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_KS = {
      tag: "div"
    },
    fnVar_Cs = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "popover-body"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Cs.propTypes = lookupTable_VS;
  fnVar_Cs.defaultProps = lookupTable_KS;

  function helperFn_GS(valueRef) {
    return helperFn_en(`The "PopoverContent" component has been deprecated.
Please use component "PopoverBody".`), widthRefU.default.createElement(fnVar_Cs, valueRef)
  }
  var lookupTable_QS = {
      children: stringRef.default.node,
      bar: stringRef.default.bool,
      multi: stringRef.default.bool,
      tag: stringRef.default.string,
      value: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.number]),
      max: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.number]),
      animated: stringRef.default.bool,
      striped: stringRef.default.bool,
      color: stringRef.default.string,
      className: stringRef.default.string,
      barClassName: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_YS = {
      tag: "div",
      value: 0,
      max: 100
    },
    fnVar_Jp = function(entryRef) {
      var resultRef = entryRef.children,
        countRef = entryRef.className,
        optionRef = entryRef.barClassName,
        indexRef = entryRef.cssModule,
        accumulator = entryRef.value,
        listRef = entryRef.max,
        configRef = entryRef.animated,
        unitRef = entryRef.striped,
        propRef = entryRef.color,
        funcRef = entryRef.bar,
        coordY = entryRef.multi,
        outputRef = entryRef.tag,
        labelRef = fnVar_he(entryRef, ["children", "className", "barClassName", "cssModule",
          "value", "max", "animated", "striped", "color", "bar", "multi",
          "tag"
        ]),
        depthRef = (0, localVar_gp.default)(accumulator) / (0, localVar_gp.default)(listRef) * 100,
        handleRef = helperFn_oe((0, localVar_se.default)(countRef, "progress"), indexRef),
        widthRef = helperFn_oe((0, localVar_se.default)("progress-bar", funcRef && countRef || optionRef, configRef ?
          "progress-bar-animated" : null, propRef ? "bg-" + propRef : null, unitRef || configRef ?
          "progress-bar-striped" : null), indexRef),
        dataRef = coordY ? resultRef : widthRefU.default.createElement("div", {
          className: widthRef,
          style: {
            width: depthRef + "%"
          },
          role: "progressbar",
          "aria-valuenow": accumulator,
          "aria-valuemin": "0",
          "aria-valuemax": listRef,
          children: resultRef
        });
      return funcRef ? dataRef : widthRefU.default.createElement(outputRef, objHelper_ie({}, labelRef, {
        className: handleRef,
        children: dataRef
      }))
    };
  fnVar_Jp.propTypes = lookupTable_QS;
  fnVar_Jp.defaultProps = lookupTable_YS;
  var lookupTable_XS = {
      children: stringRef.default.node.isRequired,
      node: stringRef.default.any
    },
    fnVar_py = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef() {
        return fnVar_ht(this, entryRef), fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .apply(this, arguments))
      }
      return fnVar_bt(entryRef, [{
        key: "componentWillUnmount",
        value: function() {
          this.defaultNode && document.body.removeChild(this
            .defaultNode), this.defaultNode = null
        }
      }, {
        key: "render",
        value: function() {
          return localVar_ly ? (!this.props.node && !this.defaultNode && (this
              .defaultNode = document.createElement("div"), document
              .body.appendChild(this.defaultNode)), localVar_qo.default
            .createPortal(this.props.children, this.props.node ||
              this.defaultNode)) : null
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_py.propTypes = lookupTable_XS;

  function helperFn_ks() {}
  var localVar_J0 = stringRef.default.shape(helperFn_Tr.propTypes),
    lookupTable_fy = {
      isOpen: stringRef.default.bool,
      autoFocus: stringRef.default.bool,
      centered: stringRef.default.bool,
      size: stringRef.default.string,
      toggle: stringRef.default.func,
      keyboard: stringRef.default.bool,
      role: stringRef.default.string,
      labelledBy: stringRef.default.string,
      backdrop: stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.oneOf([
        "static"])]),
      onEnter: stringRef.default.func,
      onExit: stringRef.default.func,
      onOpened: stringRef.default.func,
      onClosed: stringRef.default.func,
      children: stringRef.default.node,
      className: stringRef.default.string,
      wrapClassName: stringRef.default.string,
      modalClassName: stringRef.default.string,
      backdropClassName: stringRef.default.string,
      contentClassName: stringRef.default.string,
      external: stringRef.default.node,
      fade: stringRef.default.bool,
      cssModule: stringRef.default.object,
      zIndex: stringRef.default.oneOfType([stringRef.default.number, stringRef.default.string]),
      backdropTransition: localVar_J0,
      modalTransition: localVar_J0
    },
    objHelper_JS = Object.keys(lookupTable_fy),
    lookupTable_ZS = {
      isOpen: !1,
      autoFocus: !0,
      centered: !1,
      role: "dialog",
      backdrop: !0,
      keyboard: !0,
      zIndex: 1050,
      fade: !0,
      onOpened: helperFn_ks,
      onClosed: helperFn_ks,
      modalTransition: {
        timeout: lookupTable_Uo.Modal
      },
      backdropTransition: {
        mountOnEnter: !0,
        timeout: lookupTable_Uo.Fade
      }
    },
    fnVar_Zp = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef._element = null, countRef._originalBodyPadding = null, countRef
          .handleBackdropClick = countRef.handleBackdropClick.bind(countRef), countRef
          .handleEscape = countRef.handleEscape.bind(countRef), countRef.onOpened = countRef.onOpened
          .bind(countRef), countRef.onClosed = countRef.onClosed.bind(countRef), countRef.state = {
            isOpen: resultRef.isOpen
          }, resultRef.isOpen && countRef.init(), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "componentDidMount",
        value: function() {
          this.props.onEnter && this.props.onEnter(), this.state
            .isOpen && this.props.autoFocus && this.setFocus(), this
            ._isMounted = !0
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(countRef) {
          countRef.isOpen && !this.props.isOpen && this.setState({
            isOpen: countRef.isOpen
          })
        }
      }, {
        key: "componentWillUpdate",
        value: function(countRef, optionRef) {
          optionRef.isOpen && !this.state.isOpen && this.init()
        }
      }, {
        key: "componentDidUpdate",
        value: function(countRef, optionRef) {
          this.props.autoFocus && this.state.isOpen && !optionRef.isOpen &&
            this.setFocus()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.props.onExit && this.props.onExit(), this.state
            .isOpen && this.destroy(), this._isMounted = !1
        }
      }, {
        key: "onOpened",
        value: function(countRef, optionRef) {
          this.props.onOpened(), (this.props.modalTransition
            .onEntered || helperFn_ks)(countRef, optionRef)
        }
      }, {
        key: "onClosed",
        value: function(countRef) {
          this.props.onClosed(), (this.props.modalTransition
              .onExited || helperFn_ks)(countRef), this.destroy(), this._isMounted &&
            this.setState({
              isOpen: !1
            })
        }
      }, {
        key: "setFocus",
        value: function() {
          this._dialog && this._dialog.parentNode && typeof this
            ._dialog.parentNode.focus == "function" && this._dialog
            .parentNode.focus()
        }
      }, {
        key: "handleBackdropClick",
        value: function(countRef) {
          if (countRef.stopPropagation(), !(!this.props.isOpen || this.props
              .backdrop !== !0)) {
            var optionRef = this._dialog;
            countRef.target && !optionRef.contains(countRef.target) && this.props.toggle &&
              this.props.toggle(countRef)
          }
        }
      }, {
        key: "handleEscape",
        value: function(countRef) {
          this.props.isOpen && this.props.keyboard && countRef.keyCode ===
            27 && this.props.toggle && this.props.toggle(countRef)
        }
      }, {
        key: "init",
        value: function() {
          this._element = document.createElement("div"), this._element
            .setAttribute("tabindex", "-1"), this._element.style
            .position = "relative", this._element.style.zIndex = this
            .props.zIndex, this._originalBodyPadding = helperFn_oy(), helperFn_iy(),
            document.body.appendChild(this._element), this
            .bodyClassAdded || (document.body.className = (0, localVar_se
              .default)(document.body.className, helperFn_oe("modal-open",
              this.props.cssModule)), this.bodyClassAdded = !0)
        }
      }, {
        key: "destroy",
        value: function() {
          if (this._element && (document.body.removeChild(this
              ._element), this._element = null), this
            .bodyClassAdded) {
            var countRef = helperFn_oe("modal-open", this.props.cssModule),
              optionRef = new RegExp("(^| )" + countRef + "( |$)");
            document.body.className = document.body.className.replace(
                optionRef, " ")
              .trim(), this.bodyClassAdded = !1
          }
          helperFn_bp(this._originalBodyPadding)
        }
      }, {
        key: "renderModalDialog",
        value: function() {
          var countRef, optionRef = this,
            indexRef = helperFn_Zr(this.props, objHelper_JS),
            accumulator = "modal-dialog";
          return widthRefU.default.createElement("div", objHelper_ie({}, indexRef, {
            className: helperFn_oe((0, localVar_se.default)(accumulator, this.props
                .className, (countRef = {}, fnVar_st(countRef, "modal-" + this
                  .props.size, this.props.size), fnVar_st(countRef, accumulator +
                  "-centered", this.props.centered), countRef)), this
              .props.cssModule),
            role: "document",
            ref: function(configRef) {
              optionRef._dialog = configRef
            }
          }), widthRefU.default.createElement("div", {
            className: helperFn_oe((0, localVar_se.default)("modal-content", this
                .props.contentClassName), this.props
              .cssModule)
          }, this.props.children))
        }
      }, {
        key: "render",
        value: function() {
          if (this.state.isOpen) {
            var countRef = this.props,
              optionRef = countRef.wrapClassName,
              indexRef = countRef.modalClassName,
              accumulator = countRef.backdropClassName,
              listRef = countRef.cssModule,
              configRef = countRef.isOpen,
              unitRef = countRef.backdrop,
              propRef = countRef.role,
              funcRef = countRef.labelledBy,
              coordY = countRef.external,
              outputRef = {
                onClick: this.handleBackdropClick,
                onKeyUp: this.handleEscape,
                style: {
                  display: "block"
                },
                "aria-labelledby": funcRef,
                role: propRef,
                tabIndex: "-1"
              },
              labelRef = this.props.fade,
              depthRef = objHelper_ie({}, helperFn_Tr.defaultProps, this.props
              .modalTransition, {
                baseClass: labelRef ? this.props.modalTransition
                  .baseClass : "",
                timeout: labelRef ? this.props.modalTransition.timeout : 0
              }),
              handleRef = objHelper_ie({}, helperFn_Tr.defaultProps, this.props
                .backdropTransition, {
                  baseClass: labelRef ? this.props.backdropTransition
                    .baseClass : "",
                  timeout: labelRef ? this.props.backdropTransition
                    .timeout : 0
                });
            return widthRefU.default.createElement(fnVar_py, {
              node: this._element
            }, widthRefU.default.createElement("div", {
                className: helperFn_oe(optionRef)
              }, widthRefU.default.createElement(helperFn_Tr, objHelper_ie({}, outputRef, depthRef, {
                in: configRef,
                onEntered: this.onOpened,
                onExited: this.onClosed,
                cssModule: listRef,
                className: helperFn_oe((0, localVar_se.default)("modal", indexRef), listRef)
              }), coordY, this.renderModalDialog()), widthRefU.default
              .createElement(helperFn_Tr, objHelper_ie({}, handleRef, {
                in: configRef && !!unitRef,
                cssModule: listRef,
                className: helperFn_oe((0, localVar_se.default)(
                  "modal-backdrop", accumulator), listRef)
              }))))
          }
          return null
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_Zp.propTypes = lookupTable_fy;
  fnVar_Zp.defaultProps = lookupTable_ZS;
  var lookupTable_eO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      wrapTag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      toggle: stringRef.default.func,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      children: stringRef.default.node,
      closeAriaLabel: stringRef.default.string
    },
    lookupTable_tO = {
      tag: "h5",
      wrapTag: "div",
      closeAriaLabel: "Close"
    },
    fnVar_ef = function(entryRef) {
      var resultRef = void 0,
        countRef = entryRef.className,
        optionRef = entryRef.cssModule,
        indexRef = entryRef.children,
        accumulator = entryRef.toggle,
        listRef = entryRef.tag,
        configRef = entryRef.wrapTag,
        unitRef = entryRef.closeAriaLabel,
        propRef = fnVar_he(entryRef, ["className", "cssModule", "children", "toggle", "tag",
          "wrapTag", "closeAriaLabel"
        ]),
        funcRef = helperFn_oe((0, localVar_se.default)(countRef, "modal-header"), optionRef);
      return accumulator && (resultRef = widthRefU.default.createElement("button", {
        type: "button",
        onClick: accumulator,
        className: helperFn_oe("close", optionRef),
        "aria-label": unitRef
      }, widthRefU.default.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7"))), widthRefU.default.createElement(configRef, objHelper_ie({}, propRef, {
        className: funcRef
      }), widthRefU.default.createElement(listRef, {
        className: helperFn_oe("modal-title", optionRef)
      }, indexRef), resultRef)
    };
  fnVar_ef.propTypes = lookupTable_eO;
  fnVar_ef.defaultProps = lookupTable_tO;
  var lookupTable_rO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_nO = {
      tag: "div"
    },
    fnVar_tf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "modal-body"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_tf.propTypes = lookupTable_rO;
  fnVar_tf.defaultProps = lookupTable_nO;
  var lookupTable_oO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_iO = {
      tag: "div"
    },
    fnVar_rf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "modal-footer"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_rf.propTypes = lookupTable_oO;
  fnVar_rf.defaultProps = lookupTable_iO;
  var lookupTable_my = {
      placement: stringRef.default.oneOf(listVar_yp),
      target: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func, helperFn_Sn])
        .isRequired,
      container: stringRef.default.oneOfType([stringRef.default.string, stringRef.default.func, helperFn_Sn]),
      isOpen: stringRef.default.bool,
      disabled: stringRef.default.bool,
      hideArrow: stringRef.default.bool,
      className: stringRef.default.string,
      innerClassName: stringRef.default.string,
      cssModule: stringRef.default.object,
      toggle: stringRef.default.func,
      autohide: stringRef.default.bool,
      placementPrefix: stringRef.default.string,
      delay: stringRef.default.oneOfType([stringRef.default.shape({
        show: stringRef.default.number,
        hide: stringRef.default.number
      }), stringRef.default.number]),
      modifiers: stringRef.default.object
    },
    lookupTable_gy = {
      show: 0,
      hide: 250
    },
    lookupTable_aO = {
      isOpen: !1,
      hideArrow: !1,
      placement: "top",
      placementPrefix: "bs-tooltip",
      delay: lookupTable_gy,
      autohide: !0,
      toggle: function() {}
    },
    fnVar_Ns = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.addTargetEvents = countRef.addTargetEvents.bind(countRef), countRef
          .handleDocumentClick = countRef.handleDocumentClick.bind(countRef), countRef
          .removeTargetEvents = countRef.removeTargetEvents.bind(countRef), countRef.toggle = countRef
          .toggle.bind(countRef), countRef.onMouseOverTooltip = countRef.onMouseOverTooltip.bind(
          countRef), countRef.onMouseLeaveTooltip = countRef.onMouseLeaveTooltip.bind(countRef), countRef
          .onMouseOverTooltipContent = countRef.onMouseOverTooltipContent.bind(countRef), countRef
          .onMouseLeaveTooltipContent = countRef.onMouseLeaveTooltipContent.bind(countRef),
          countRef.show = countRef.show.bind(countRef), countRef.hide = countRef.hide.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "componentDidMount",
        value: function() {
          this._target = helperFn_Bo(this.props.target), this.addTargetEvents()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.removeTargetEvents()
        }
      }, {
        key: "onMouseOverTooltip",
        value: function() {
          this._hideTimeout && this.clearHideTimeout(), this
            ._showTimeout = setTimeout(this.show, this.getDelay(
              "show"))
        }
      }, {
        key: "onMouseLeaveTooltip",
        value: function() {
          this._showTimeout && this.clearShowTimeout(), this
            ._hideTimeout = setTimeout(this.hide, this.getDelay(
              "hide"))
        }
      }, {
        key: "onMouseOverTooltipContent",
        value: function() {
          this.props.autohide || this._hideTimeout && this
            .clearHideTimeout()
        }
      }, {
        key: "onMouseLeaveTooltipContent",
        value: function() {
          this.props.autohide || (this._showTimeout && this
            .clearShowTimeout(), this._hideTimeout = setTimeout(this
              .hide, this.getDelay("hide")))
        }
      }, {
        key: "getDelay",
        value: function(countRef) {
          var optionRef = this.props.delay;
          return (typeof optionRef > "u" ? "undefined" : strVar_ws(optionRef)) === "object" ?
            isNaN(optionRef[countRef]) ? lookupTable_gy[countRef] : optionRef[countRef] : optionRef
        }
      }, {
        key: "show",
        value: function() {
          this.props.isOpen || (this.clearShowTimeout(), this
          .toggle())
        }
      }, {
        key: "hide",
        value: function() {
          this.props.isOpen && (this.clearHideTimeout(), this
          .toggle())
        }
      }, {
        key: "clearShowTimeout",
        value: function() {
          clearTimeout(this._showTimeout), this._showTimeout = void 0
        }
      }, {
        key: "clearHideTimeout",
        value: function() {
          clearTimeout(this._hideTimeout), this._hideTimeout = void 0
        }
      }, {
        key: "handleDocumentClick",
        value: function(countRef) {
          (countRef.target === this._target || this._target.contains(countRef
            .target)) && (this._hideTimeout && this
          .clearHideTimeout(), this.props.isOpen || this.toggle())
        }
      }, {
        key: "addTargetEvents",
        value: function() {
          var countRef = this;
          this._target.addEventListener("mouseover", this
            .onMouseOverTooltip, !0), this._target.addEventListener(
            "mouseout", this.onMouseLeaveTooltip, !0), ["click",
            "touchstart"
          ].forEach(function(optionRef) {
            return document.addEventListener(optionRef, countRef
              .handleDocumentClick, !0)
          })
        }
      }, {
        key: "removeTargetEvents",
        value: function() {
          var countRef = this;
          this._target.removeEventListener("mouseover", this
              .onMouseOverTooltip, !0), this._target
            .removeEventListener("mouseout", this.onMouseLeaveTooltip,
              !0), ["click", "touchstart"].forEach(function(optionRef) {
              return document.removeEventListener(optionRef, countRef
                .handleDocumentClick, !0)
            })
        }
      }, {
        key: "toggle",
        value: function(countRef) {
          return this.props.disabled ? countRef && countRef.preventDefault() : this
            .props.toggle()
        }
      }, {
        key: "render",
        value: function() {
          if (!this.props.isOpen) return null;
          var countRef = helperFn_Zr(this.props, Object.keys(lookupTable_my)),
            optionRef = helperFn_oe((0, localVar_se.default)("tooltip-inner", this.props
              .innerClassName), this.props.cssModule),
            indexRef = helperFn_oe((0, localVar_se.default)("tooltip", "show", this.props
              .className), this.props.cssModule);
          return widthRefU.default.createElement(fnVar_Ho, {
            className: indexRef,
            target: this.props.target,
            isOpen: this.props.isOpen,
            hideArrow: this.props.hideArrow,
            placement: this.props.placement,
            placementPrefix: this.props.placementPrefix,
            container: this.props.container,
            modifiers: this.props.modifiers
          }, widthRefU.default.createElement("div", objHelper_ie({}, countRef, {
            className: optionRef,
            onMouseOver: this.onMouseOverTooltipContent,
            onMouseLeave: this.onMouseLeaveTooltipContent
          })))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_Ns.propTypes = lookupTable_my;
  fnVar_Ns.defaultProps = lookupTable_aO;
  var lookupTable_lO = {
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      size: stringRef.default.string,
      bordered: stringRef.default.bool,
      striped: stringRef.default.bool,
      inverse: helperFn_vr(stringRef.default.bool, 'Please use the prop "dark"'),
      dark: stringRef.default.bool,
      hover: stringRef.default.bool,
      responsive: stringRef.default.oneOfType([stringRef.default.bool, stringRef.default.string]),
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      responsiveTag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string])
    },
    lookupTable_sO = {
      tag: "table",
      responsiveTag: "div"
    },
    fnVar_nf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.size,
        indexRef = entryRef.bordered,
        accumulator = entryRef.striped,
        listRef = entryRef.inverse,
        configRef = entryRef.dark,
        unitRef = entryRef.hover,
        propRef = entryRef.responsive,
        funcRef = entryRef.tag,
        coordY = entryRef.responsiveTag,
        outputRef = fnVar_he(entryRef, ["className", "cssModule", "size", "bordered", "striped",
          "inverse", "dark", "hover", "responsive", "tag", "responsiveTag"
        ]),
        labelRef = helperFn_oe((0, localVar_se.default)(resultRef, "table", optionRef ? "table-" + optionRef : !1, indexRef ?
          "table-bordered" : !1, accumulator ? "table-striped" : !1, configRef || listRef ?
          "table-dark" : !1, unitRef ? "table-hover" : !1), countRef),
        depthRef = widthRefU.default.createElement(funcRef, objHelper_ie({}, outputRef, {
          className: labelRef
        }));
      if (propRef) {
        var handleRef = propRef === !0 ? "table-responsive" : "table-responsive-" + propRef;
        return widthRefU.default.createElement(coordY, {
          className: handleRef
        }, depthRef)
      }
      return depthRef
    };
  fnVar_nf.propTypes = lookupTable_lO;
  fnVar_nf.defaultProps = lookupTable_sO;
  var lookupTable_cO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      flush: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_uO = {
      tag: "ul"
    },
    fnVar_of = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = entryRef.flush,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "tag", "flush"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, "list-group", indexRef ? "list-group-flush" : !1),
          countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_of.propTypes = lookupTable_cO;
  fnVar_of.defaultProps = lookupTable_uO;
  var lookupTable_dO = {
      children: stringRef.default.node,
      inline: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      innerRef: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_pO = {
      tag: "form"
    },
    fnVar_af = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.inline,
        indexRef = entryRef.tag,
        accumulator = entryRef.innerRef,
        listRef = fnVar_he(entryRef, ["className", "cssModule", "inline", "tag", "innerRef"]),
        configRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "form-inline" : !1), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, listRef, {
        ref: accumulator,
        className: configRef
      }))
    };
  fnVar_af.propTypes = lookupTable_dO;
  fnVar_af.defaultProps = lookupTable_pO;
  var lookupTable_fO = {
      children: stringRef.default.node,
      tag: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      valid: stringRef.default.bool
    },
    lookupTable_mO = {
      tag: "div",
      valid: void 0
    },
    fnVar_lf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.valid,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "valid", "tag"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "valid-feedback" : "invalid-feedback"),
          countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_lf.propTypes = lookupTable_fO;
  fnVar_lf.defaultProps = lookupTable_mO;
  var lookupTable_gO = {
      children: stringRef.default.node,
      row: stringRef.default.bool,
      check: stringRef.default.bool,
      inline: stringRef.default.bool,
      disabled: stringRef.default.bool,
      tag: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_hO = {
      tag: "div"
    },
    fnVar_sf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.row,
        indexRef = entryRef.disabled,
        accumulator = entryRef.check,
        listRef = entryRef.inline,
        configRef = entryRef.tag,
        unitRef = fnVar_he(entryRef, ["className", "cssModule", "row", "disabled", "check",
          "inline", "tag"
        ]),
        propRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "row" : !1, accumulator ? "form-check" :
          "form-group", accumulator && listRef ? "form-check-inline" : !1, accumulator && indexRef ?
          "disabled" : !1), countRef);
      return widthRefU.default.createElement(configRef, objHelper_ie({}, unitRef, {
        className: propRef
      }))
    };
  fnVar_sf.propTypes = lookupTable_gO;
  fnVar_sf.defaultProps = lookupTable_hO;
  var lookupTable_bO = {
      children: stringRef.default.node,
      inline: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      color: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_vO = {
      tag: "small",
      color: "muted"
    },
    fnVar_cf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.inline,
        indexRef = entryRef.color,
        accumulator = entryRef.tag,
        listRef = fnVar_he(entryRef, ["className", "cssModule", "inline", "color", "tag"]),
        configRef = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? !1 : "form-text", indexRef ? "text-" + indexRef : !1),
          countRef);
      return widthRefU.default.createElement(accumulator, objHelper_ie({}, listRef, {
        className: configRef
      }))
    };
  fnVar_cf.propTypes = lookupTable_bO;
  fnVar_cf.defaultProps = lookupTable_vO;
  var lookupTable_yO = {
      children: stringRef.default.node,
      type: stringRef.default.string,
      size: stringRef.default.string,
      bsSize: stringRef.default.string,
      state: helperFn_vr(stringRef.default.string,
          'Please use the props "valid" and "invalid" to indicate the state.'
          ),
      valid: stringRef.default.bool,
      invalid: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      innerRef: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      static: helperFn_vr(stringRef.default.bool, 'Please use the prop "plaintext"'),
      plaintext: stringRef.default.bool,
      addon: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_xO = {
      type: "text"
    },
    fnVar_uf = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef() {
        return fnVar_ht(this, entryRef), fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .apply(this, arguments))
      }
      return fnVar_bt(entryRef, [{
        key: "render",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.className,
            indexRef = countRef.cssModule,
            accumulator = countRef.type,
            listRef = countRef.bsSize,
            configRef = countRef.state,
            unitRef = countRef.valid,
            propRef = countRef.invalid,
            funcRef = countRef.tag,
            coordY = countRef.addon,
            outputRef = countRef.static,
            labelRef = countRef.plaintext,
            depthRef = countRef.innerRef,
            handleRef = fnVar_he(countRef, ["className", "cssModule", "type", "bsSize",
              "state", "valid", "invalid", "tag", "addon", "static",
              "plaintext", "innerRef"
            ]),
            widthRef = ["radio", "checkbox"].indexOf(accumulator) > -1,
            dataRef = new RegExp("\\D", "g"),
            errorRef = accumulator === "file",
            typeRef = accumulator === "textarea",
            stateRef = accumulator === "select",
            classRef = funcRef || (stateRef || typeRef ? accumulator : "input"),
            keyRef = "form-control";
          labelRef || outputRef ? (keyRef = keyRef + "-plaintext", classRef = funcRef || "p") : errorRef ? keyRef = keyRef +
            "-file" : widthRef && (coordY ? keyRef = null : keyRef = "form-check-input"),
            configRef && typeof unitRef > "u" && typeof propRef > "u" && (configRef === "danger" ?
              propRef = !0 : configRef === "success" && (unitRef = !0)), handleRef.size && dataRef.test(
              handleRef.size) && (helperFn_en(
              `Please use the prop "bsSize" instead of the "size" to bootstrap's input sizing.`
              ), listRef = handleRef.size, delete handleRef.size);
          var nodeRef = helperFn_oe((0, localVar_se.default)(optionRef, propRef && "is-invalid", unitRef &&
            "is-valid", listRef ? "form-control-" + listRef : !1, keyRef), indexRef);
          return (classRef === "input" || typeof funcRef != "string") && (handleRef.type =
            accumulator), widthRefU.default.createElement(classRef, objHelper_ie({}, handleRef, {
            ref: depthRef,
            className: nodeRef
          }))
        }
      }]), entryRef
    }(widthRefU.default.Component);
  fnVar_uf.propTypes = lookupTable_yO;
  fnVar_uf.defaultProps = lookupTable_xO;
  var lookupTable_wO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      size: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable__O = {
      tag: "div"
    },
    fnVar_df = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = entryRef.size,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "tag", "size"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, "input-group", indexRef ? "input-group-" + indexRef :
          null), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_df.propTypes = lookupTable_wO;
  fnVar_df.defaultProps = lookupTable__O;
  var lookupTable_kO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_EO = {
      tag: "span"
    },
    fnVar_Ms = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "input-group-text"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_Ms.propTypes = lookupTable_kO;
  fnVar_Ms.defaultProps = lookupTable_EO;
  var lookupTable_TO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      addonType: stringRef.default.oneOf(["prepend", "append"])
        .isRequired,
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_SO = {
      tag: "div"
    },
    fnVar_ia = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = entryRef.addonType,
        accumulator = entryRef.children,
        listRef = fnVar_he(entryRef, ["className", "cssModule", "tag", "addonType", "children"]),
        configRef = helperFn_oe((0, localVar_se.default)(resultRef, "input-group-" + indexRef), countRef);
      return typeof accumulator == "string" ? widthRefU.default.createElement(optionRef, objHelper_ie({}, listRef, {
        className: configRef
      }), widthRefU.default.createElement(fnVar_Ms, {
        children: accumulator
      })) : widthRefU.default.createElement(optionRef, objHelper_ie({}, listRef, {
        className: configRef,
        children: accumulator
      }))
    };
  fnVar_ia.propTypes = lookupTable_TO;
  fnVar_ia.defaultProps = lookupTable_SO;
  var lookupTable_OO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      addonType: stringRef.default.oneOf(["prepend", "append"])
        .isRequired,
      children: stringRef.default.node,
      groupClassName: stringRef.default.string,
      groupAttributes: stringRef.default.object,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    fnVar_hy = function(entryRef) {
      helperFn_en(`The "InputGroupButton" component has been deprecated.
Please use component "InputGroupAddon".`);
      var resultRef = entryRef.children,
        countRef = entryRef.groupClassName,
        optionRef = entryRef.groupAttributes,
        indexRef = fnVar_he(entryRef, ["children", "groupClassName", "groupAttributes"]);
      if (typeof resultRef == "string") {
        var accumulator = indexRef.cssModule,
          listRef = indexRef.tag,
          configRef = indexRef.addonType,
          unitRef = fnVar_he(indexRef, ["cssModule", "tag", "addonType"]),
          propRef = objHelper_ie({}, optionRef, {
            cssModule: accumulator,
            tag: listRef,
            addonType: configRef
          });
        return widthRefU.default.createElement(fnVar_ia, objHelper_ie({}, propRef, {
          className: countRef
        }), widthRefU.default.createElement(fnVar_aa, objHelper_ie({}, unitRef, {
          children: resultRef
        })))
      }
      return widthRefU.default.createElement(fnVar_ia, objHelper_ie({}, entryRef, {
        children: resultRef
      }))
    };
  fnVar_hy.propTypes = lookupTable_OO;
  var lookupTable_PO = {
      addonType: stringRef.default.oneOf(["prepend", "append"])
        .isRequired,
      children: stringRef.default.node
    },
    fnVar_by = function(entryRef) {
      return widthRefU.default.createElement(fnVar_On, entryRef)
    };
  fnVar_by.propTypes = lookupTable_PO;
  var listVar_CO = ["xs", "sm", "md", "lg", "xl"],
    localVar_ra = stringRef.default.oneOfType([stringRef.default.number, stringRef.default.string]),
    localVar_na = stringRef.default.oneOfType([stringRef.default.string, stringRef.default.number, stringRef.default
      .shape({
        size: localVar_ra,
        push: helperFn_vr(localVar_ra, 'Please use the prop "order"'),
        pull: helperFn_vr(localVar_ra, 'Please use the prop "order"'),
        order: localVar_ra,
        offset: localVar_ra
      })
    ]),
    lookupTable_NO = {
      children: stringRef.default.node,
      hidden: stringRef.default.bool,
      check: stringRef.default.bool,
      size: stringRef.default.string,
      for: stringRef.default.string,
      tag: stringRef.default.string,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      xs: localVar_na,
      sm: localVar_na,
      md: localVar_na,
      lg: localVar_na,
      xl: localVar_na,
      widths: stringRef.default.array
    },
    lookupTable_MO = {
      tag: "label",
      widths: listVar_CO
    },
    fnVar_Z0 = function(entryRef, resultRef, countRef) {
      return countRef === !0 || countRef === "" ? entryRef ? "col" : "col-" + resultRef : countRef === "auto" ?
        entryRef ? "col-auto" : "col-" + resultRef + "-auto" : entryRef ? "col-" + countRef : "col-" + resultRef +
        "-" + countRef
    },
    fnVar_pf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.hidden,
        indexRef = entryRef.widths,
        accumulator = entryRef.tag,
        listRef = entryRef.check,
        configRef = entryRef.size,
        unitRef = entryRef.for,
        propRef = fnVar_he(entryRef, ["className", "cssModule", "hidden", "widths", "tag",
          "check", "size", "for"
        ]),
        funcRef = [];
      indexRef.forEach(function(outputRef, labelRef) {
        var depthRef = entryRef[outputRef];
        if (delete propRef[outputRef], !(!depthRef && depthRef !== "")) {
          var handleRef = !labelRef,
            widthRef = void 0;
          if ((0, localVar_hp.default)(depthRef)) {
            var dataRef, errorRef = handleRef ? "-" : "-" + outputRef + "-";
            widthRef = fnVar_Z0(handleRef, outputRef, depthRef.size), funcRef.push(helperFn_oe((0, localVar_se.default)((dataRef = {}, fnVar_st(dataRef,
              widthRef, depthRef.size || depthRef.size === ""), fnVar_st(dataRef, "order" + errorRef + depthRef
              .order, depthRef.order || depthRef.order === 0), fnVar_st(dataRef,
              "offset" + errorRef + depthRef.offset, depthRef.offset || depthRef.offset ===
              0), dataRef))), countRef)
          } else widthRef = fnVar_Z0(handleRef, outputRef, depthRef), funcRef.push(widthRef)
        }
      });
      var coordY = helperFn_oe((0, localVar_se.default)(resultRef, optionRef ? "sr-only" : !1, listRef ?
        "form-check-label" : !1, configRef ? "col-form-label-" + configRef : !1, funcRef, funcRef
        .length ? "col-form-label" : !1), countRef);
      return widthRefU.default.createElement(accumulator, objHelper_ie({
        htmlFor: unitRef
      }, propRef, {
        className: coordY
      }))
    };
  fnVar_pf.propTypes = lookupTable_NO;
  fnVar_pf.defaultProps = lookupTable_MO;
  var lookupTable_AO = {
      body: stringRef.default.bool,
      bottom: stringRef.default.bool,
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      heading: stringRef.default.bool,
      left: stringRef.default.bool,
      list: stringRef.default.bool,
      middle: stringRef.default.bool,
      object: stringRef.default.bool,
      right: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      top: stringRef.default.bool
    },
    fnVar_vy = function(entryRef) {
      var resultRef = entryRef.body,
        countRef = entryRef.bottom,
        optionRef = entryRef.className,
        indexRef = entryRef.cssModule,
        accumulator = entryRef.heading,
        listRef = entryRef.left,
        configRef = entryRef.list,
        unitRef = entryRef.middle,
        propRef = entryRef.object,
        funcRef = entryRef.right,
        coordY = entryRef.tag,
        outputRef = entryRef.top,
        labelRef = fnVar_he(entryRef, ["body", "bottom", "className", "cssModule", "heading",
          "left", "list", "middle", "object", "right", "tag", "top"
        ]),
        depthRef = void 0;
      accumulator ? depthRef = "h4" : listRef || funcRef ? depthRef = "a" : propRef ? depthRef = "img" : configRef ? depthRef = "ul" : depthRef =
        "div";
      var handleRef = coordY || depthRef,
        widthRef = helperFn_oe((0, localVar_se.default)(optionRef, {
          "media-body": resultRef,
          "media-heading": accumulator,
          "media-left": listRef,
          "media-right": funcRef,
          "media-top": outputRef,
          "media-bottom": countRef,
          "media-middle": unitRef,
          "media-object": propRef,
          "media-list": configRef,
          media: !resultRef && !accumulator && !listRef && !funcRef && !outputRef && !countRef && !unitRef && !propRef && !configRef
        }), indexRef);
      return widthRefU.default.createElement(handleRef, objHelper_ie({}, labelRef, {
        className: widthRef
      }))
    };
  fnVar_vy.propTypes = lookupTable_AO;
  var lookupTable_jO = {
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      size: stringRef.default.string,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string])
    },
    lookupTable_RO = {
      tag: "ul"
    },
    fnVar_ff = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.size,
        indexRef = entryRef.tag,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "size", "tag"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, "pagination", fnVar_st({}, "pagination-" + optionRef, !!
          optionRef)), countRef);
      return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_ff.propTypes = lookupTable_jO;
  fnVar_ff.defaultProps = lookupTable_RO;
  var lookupTable_IO = {
      active: stringRef.default.bool,
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      disabled: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string])
    },
    lookupTable_DO = {
      tag: "li"
    },
    fnVar_mf = function(entryRef) {
      var resultRef = entryRef.active,
        countRef = entryRef.className,
        optionRef = entryRef.cssModule,
        indexRef = entryRef.disabled,
        accumulator = entryRef.tag,
        listRef = fnVar_he(entryRef, ["active", "className", "cssModule", "disabled", "tag"]),
        configRef = helperFn_oe((0, localVar_se.default)(countRef, "page-item", {
          active: resultRef,
          disabled: indexRef
        }), optionRef);
      return widthRefU.default.createElement(accumulator, objHelper_ie({}, listRef, {
        className: configRef
      }))
    };
  fnVar_mf.propTypes = lookupTable_IO;
  fnVar_mf.defaultProps = lookupTable_DO;
  var lookupTable_FO = {
      "aria-label": stringRef.default.string,
      children: stringRef.default.node,
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      next: stringRef.default.bool,
      previous: stringRef.default.bool,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string])
    },
    lookupTable_zO = {
      tag: "a"
    },
    fnVar_gf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.next,
        indexRef = entryRef.previous,
        accumulator = entryRef.tag,
        listRef = fnVar_he(entryRef, ["className", "cssModule", "next", "previous", "tag"]),
        configRef = helperFn_oe((0, localVar_se.default)(resultRef, "page-link"), countRef),
        unitRef = void 0;
      indexRef ? unitRef = "Previous" : optionRef && (unitRef = "Next");
      var propRef = entryRef["aria-label"] || unitRef,
        funcRef = void 0;
      indexRef ? funcRef = "\xAB" : optionRef && (funcRef = "\xBB");
      var coordY = entryRef.children;
      return coordY && Array.isArray(coordY) && coordY.length === 0 && (coordY = null), (indexRef ||
        optionRef) && (coordY = [widthRefU.default.createElement("span", {
          "aria-hidden": "true",
          key: "caret"
        }, coordY || funcRef), widthRefU.default.createElement("span", {
          className: "sr-only",
          key: "sr"
        }, propRef)]), widthRefU.default.createElement(accumulator, objHelper_ie({}, listRef, {
          className: configRef,
          "aria-label": propRef
        }), coordY)
    };
  fnVar_gf.propTypes = lookupTable_FO;
  fnVar_gf.defaultProps = lookupTable_zO;
  var lookupTable_yy = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      activeTab: stringRef.default.any,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_LO = {
      tag: "div"
    },
    lookupTable_$O = {
      activeTabId: stringRef.default.any
    },
    fnVar_As = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.state = {
          activeTab: countRef.props.activeTab
        }, countRef
      }
      return fnVar_bt(entryRef, [{
        key: "getChildContext",
        value: function() {
          return {
            activeTabId: this.state.activeTab
          }
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(countRef) {
          this.state.activeTab !== countRef.activeTab && this.setState({
            activeTab: countRef.activeTab
          })
        }
      }, {
        key: "render",
        value: function() {
          var countRef = this.props,
            optionRef = countRef.className,
            indexRef = countRef.cssModule,
            accumulator = countRef.tag,
            listRef = helperFn_Zr(this.props, Object.keys(lookupTable_yy)),
            configRef = helperFn_oe((0, localVar_se.default)("tab-content", optionRef), indexRef);
          return widthRefU.default.createElement(accumulator, objHelper_ie({}, listRef, {
            className: configRef
          }))
        }
      }]), entryRef
    }(widthRefU.Component);
  fnVar_As.propTypes = lookupTable_yy;
  fnVar_As.defaultProps = lookupTable_LO;
  fnVar_As.childContextTypes = lookupTable_$O;
  var lookupTable_qO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.string,
      cssModule: stringRef.default.object,
      tabId: stringRef.default.any
    },
    lookupTable_BO = {
      tag: "div"
    },
    lookupTable_UO = {
      activeTabId: stringRef.default.any
    };

  function helperFn_js(valueRef, entryRef) {
    var resultRef = valueRef.className,
      countRef = valueRef.cssModule,
      optionRef = valueRef.tabId,
      indexRef = valueRef.tag,
      accumulator = fnVar_he(valueRef, ["className", "cssModule", "tabId", "tag"]),
      listRef = helperFn_oe((0, localVar_se.default)("tab-pane", resultRef, {
        active: optionRef === entryRef.activeTabId
      }), countRef);
    return widthRefU.default.createElement(indexRef, objHelper_ie({}, accumulator, {
      className: listRef
    }))
  }
  helperFn_js.propTypes = lookupTable_qO;
  helperFn_js.defaultProps = lookupTable_BO;
  helperFn_js.contextTypes = lookupTable_UO;
  var lookupTable_WO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      fluid: stringRef.default.bool,
      className: stringRef.default.string,
      cssModule: stringRef.default.object
    },
    lookupTable_HO = {
      tag: "div"
    },
    fnVar_hf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = entryRef.fluid,
        accumulator = fnVar_he(entryRef, ["className", "cssModule", "tag", "fluid"]),
        listRef = helperFn_oe((0, localVar_se.default)(resultRef, "jumbotron", indexRef ? "jumbotron-fluid" : !1),
        countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, accumulator, {
        className: listRef
      }))
    };
  fnVar_hf.propTypes = lookupTable_WO;
  fnVar_hf.defaultProps = lookupTable_HO;
  var lookupTable_VO = {
      children: stringRef.default.node,
      className: stringRef.default.string,
      closeClassName: stringRef.default.string,
      closeAriaLabel: stringRef.default.string,
      cssModule: stringRef.default.object,
      color: stringRef.default.string,
      isOpen: stringRef.default.bool,
      toggle: stringRef.default.func,
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      transition: stringRef.default.shape(helperFn_Tr.propTypes)
    },
    lookupTable_KO = {
      color: "success",
      isOpen: !0,
      tag: "div",
      closeAriaLabel: "Close",
      transition: objHelper_ie({}, helperFn_Tr.defaultProps, {
        unmountOnExit: !0
      })
    };

  function helperFn_Rs(valueRef) {
    var entryRef = valueRef.className,
      resultRef = valueRef.closeClassName,
      countRef = valueRef.closeAriaLabel,
      optionRef = valueRef.cssModule,
      indexRef = valueRef.tag,
      accumulator = valueRef.color,
      listRef = valueRef.isOpen,
      configRef = valueRef.toggle,
      unitRef = valueRef.children,
      propRef = valueRef.transition,
      funcRef = fnVar_he(valueRef, ["className", "closeClassName", "closeAriaLabel", "cssModule",
        "tag", "color", "isOpen", "toggle", "children", "transition"
      ]),
      coordY = helperFn_oe((0, localVar_se.default)(entryRef, "alert", "alert-" + accumulator, {
        "alert-dismissible": configRef
      }), optionRef),
      outputRef = helperFn_oe((0, localVar_se.default)("close", resultRef), optionRef);
    return widthRefU.default.createElement(helperFn_Tr, objHelper_ie({}, funcRef, propRef, {
      tag: indexRef,
      className: coordY,
      in: listRef,
      role: "alert"
    }), configRef ? widthRefU.default.createElement("button", {
      type: "button",
      className: outputRef,
      "aria-label": countRef,
      onClick: configRef
    }, widthRefU.default.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7")) : null, unitRef)
  }
  helperFn_Rs.propTypes = lookupTable_VO;
  helperFn_Rs.defaultProps = lookupTable_KO;
  var localVar_$o, localVar_GO = objHelper_ie({}, localVar_tn.propTypes, {
      isOpen: stringRef.default.bool,
      children: stringRef.default.oneOfType([stringRef.default.arrayOf(stringRef.default.node), stringRef
        .default.node
      ]),
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.node,
      navbar: stringRef.default.bool,
      cssModule: stringRef.default.object
    }),
    localVar_QO = objHelper_ie({}, localVar_tn.defaultProps, {
      isOpen: !1,
      appear: !1,
      enter: !0,
      exit: !0,
      tag: "div",
      timeout: lookupTable_Uo.Collapse
    }),
    lookupTable_YO = (localVar_$o = {}, fnVar_st(localVar_$o, lookupTable_Fr.ENTERING, "collapsing"), fnVar_st(localVar_$o, lookupTable_Fr.ENTERED,
      "collapse show"), fnVar_st(localVar_$o, lookupTable_Fr.EXITING, "collapsing"), fnVar_st(localVar_$o, lookupTable_Fr.EXITED,
      "collapse"), localVar_$o);

  function helperFn_XO(valueRef) {
    return lookupTable_YO[valueRef] || "collapse"
  }

  function helperFn_ey(valueRef) {
    return valueRef.scrollHeight
  }
  var fnVar_bf = function(valueRef) {
    fnVar_vt(entryRef, valueRef);

    function entryRef(resultRef) {
      fnVar_ht(this, entryRef);
      var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
        .call(this, resultRef));
      return countRef.state = {
          height: null
        }, ["onEntering", "onEntered", "onExit", "onExiting", "onExited"]
        .forEach(function(optionRef) {
          countRef[optionRef] = countRef[optionRef].bind(countRef)
        }), countRef
    }
    return fnVar_bt(entryRef, [{
      key: "onEntering",
      value: function(countRef, optionRef) {
        this.setState({
          height: helperFn_ey(countRef)
        }), this.props.onEntering(countRef, optionRef)
      }
    }, {
      key: "onEntered",
      value: function(countRef, optionRef) {
        this.setState({
          height: null
        }), this.props.onEntered(countRef, optionRef)
      }
    }, {
      key: "onExit",
      value: function(countRef) {
        this.setState({
          height: helperFn_ey(countRef)
        }), this.props.onExit(countRef)
      }
    }, {
      key: "onExiting",
      value: function(countRef) {
        var optionRef = countRef.offsetHeight;
        this.setState({
          height: 0
        }), this.props.onExiting(countRef)
      }
    }, {
      key: "onExited",
      value: function(countRef) {
        this.setState({
          height: null
        }), this.props.onExited(countRef)
      }
    }, {
      key: "render",
      value: function() {
        var countRef = this.props,
          optionRef = countRef.tag,
          indexRef = countRef.isOpen,
          accumulator = countRef.className,
          listRef = countRef.navbar,
          configRef = countRef.cssModule,
          unitRef = countRef.children,
          propRef = fnVar_he(countRef, ["tag", "isOpen", "className", "navbar",
            "cssModule", "children"
          ]),
          funcRef = this.state.height,
          coordY = helperFn_vp(propRef, listVar_oa),
          outputRef = helperFn_Zr(propRef, listVar_oa);
        return widthRefU.default.createElement(localVar_tn, objHelper_ie({}, coordY, {
          in: indexRef,
          onEntering: this.onEntering,
          onEntered: this.onEntered,
          onExit: this.onExit,
          onExiting: this.onExiting,
          onExited: this.onExited
        }), function(labelRef) {
          var depthRef = helperFn_XO(labelRef),
            handleRef = helperFn_oe((0, localVar_se.default)(accumulator, depthRef, listRef &&
              "navbar-collapse"), configRef),
            widthRef = funcRef === null ? null : {
              height: funcRef
            };
          return widthRefU.default.createElement(optionRef, objHelper_ie({}, outputRef, {
            style: objHelper_ie({}, outputRef.style, widthRef),
            className: handleRef
          }), unitRef)
        })
      }
    }]), entryRef
  }(widthRefU.Component);
  fnVar_bf.propTypes = localVar_GO;
  fnVar_bf.defaultProps = localVar_QO;
  var lookupTable_JO = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      active: stringRef.default.bool,
      disabled: stringRef.default.bool,
      color: stringRef.default.string,
      action: stringRef.default.bool,
      className: stringRef.default.any,
      cssModule: stringRef.default.object
    },
    lookupTable_ZO = {
      tag: "li"
    },
    fnVar_e6 = function(entryRef) {
      entryRef.preventDefault()
    },
    fnVar_vf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = entryRef.active,
        accumulator = entryRef.disabled,
        listRef = entryRef.action,
        configRef = entryRef.color,
        unitRef = fnVar_he(entryRef, ["className", "cssModule", "tag", "active", "disabled",
          "action", "color"
        ]),
        propRef = helperFn_oe((0, localVar_se.default)(resultRef, indexRef ? "active" : !1, accumulator ? "disabled" : !1, listRef ?
          "list-group-item-action" : !1, configRef ? "list-group-item-" + configRef : !1,
          "list-group-item"), countRef);
      return accumulator && (unitRef.onClick = fnVar_e6), widthRefU.default.createElement(optionRef, objHelper_ie({}, unitRef, {
        className: propRef
      }))
    };
  fnVar_vf.propTypes = lookupTable_JO;
  fnVar_vf.defaultProps = lookupTable_ZO;
  var lookupTable_t6 = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.any,
      cssModule: stringRef.default.object
    },
    lookupTable_r6 = {
      tag: "h5"
    },
    fnVar_yf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "list-group-item-heading"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_yf.propTypes = lookupTable_t6;
  fnVar_yf.defaultProps = lookupTable_r6;
  var lookupTable_n6 = {
      tag: stringRef.default.oneOfType([stringRef.default.func, stringRef.default.string]),
      className: stringRef.default.any,
      cssModule: stringRef.default.object
    },
    lookupTable_o6 = {
      tag: "p"
    },
    fnVar_xf = function(entryRef) {
      var resultRef = entryRef.className,
        countRef = entryRef.cssModule,
        optionRef = entryRef.tag,
        indexRef = fnVar_he(entryRef, ["className", "cssModule", "tag"]),
        accumulator = helperFn_oe((0, localVar_se.default)(resultRef, "list-group-item-text"), countRef);
      return widthRefU.default.createElement(optionRef, objHelper_ie({}, indexRef, {
        className: accumulator
      }))
    };
  fnVar_xf.propTypes = lookupTable_n6;
  fnVar_xf.defaultProps = lookupTable_o6;
  var fnVar_i6 = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.state = {
          isOpen: !0
        }, countRef.toggle = countRef.toggle.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "toggle",
        value: function() {
          this.setState({
            isOpen: !this.state.isOpen
          })
        }
      }, {
        key: "render",
        value: function() {
          return widthRefU.default.createElement(helperFn_Rs, objHelper_ie({
            isOpen: this.state.isOpen,
            toggle: this.toggle
          }, this.props))
        }
      }]), entryRef
    }(widthRefU.Component),
    fnVar_a6 = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.state = {
          isOpen: !1
        }, countRef.toggle = countRef.toggle.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "toggle",
        value: function() {
          this.setState({
            isOpen: !this.state.isOpen
          })
        }
      }, {
        key: "render",
        value: function() {
          return widthRefU.default.createElement(fnVar_Mp, objHelper_ie({
            isOpen: this.state.isOpen,
            toggle: this.toggle
          }, this.props))
        }
      }]), entryRef
    }(widthRefU.Component),
    fnVar_xy = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.state = {
          isOpen: !1
        }, countRef.toggle = countRef.toggle.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "toggle",
        value: function() {
          this.setState({
            isOpen: !this.state.isOpen
          })
        }
      }, {
        key: "render",
        value: function() {
          return widthRefU.default.createElement(fnVar_On, objHelper_ie({
            isOpen: this.state.isOpen,
            toggle: this.toggle
          }, this.props))
        }
      }]), entryRef
    }(widthRefU.Component),
    fnVar_l6 = function(entryRef) {
      return helperFn_en(`The "UncontrolledNavDropdown" component has been deprecated.
Please use component "UncontrolledDropdown" with nav prop.`), widthRefU.default
        .createElement(fnVar_xy, objHelper_ie({
          nav: !0
        }, entryRef))
    },
    fnVar_s6 = function(valueRef) {
      fnVar_vt(entryRef, valueRef);

      function entryRef(resultRef) {
        fnVar_ht(this, entryRef);
        var countRef = fnVar_yt(this, (entryRef.__proto__ || Object.getPrototypeOf(entryRef))
          .call(this, resultRef));
        return countRef.state = {
          isOpen: !1
        }, countRef.toggle = countRef.toggle.bind(countRef), countRef
      }
      return fnVar_bt(entryRef, [{
        key: "toggle",
        value: function() {
          this.setState({
            isOpen: !this.state.isOpen
          })
        }
      }, {
        key: "render",
        value: function() {
          return widthRefU.default.createElement(fnVar_Ns, objHelper_ie({
            isOpen: this.state.isOpen,
            toggle: this.toggle
          }, this.props))
        }
      }]), entryRef
    }(widthRefU.Component);
  var localVar_I5 = toEsm(fnVar_k_()),
    localVar_D5 = toEsm(fnVar_qm());
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

  

  
  var fnVar_xc = window.__vdhReactResizeDetector;
  var localVar_qt = toEsm(fnVar_gt());
  var localVar_Rn = toEsm(fnVar_jn());

  function helperFn_k5(valueRef, entryRef) {
    valueRef || (valueRef = {
      values: localVar_Rn.default.unsafe_prefs.getAll(),
      current: localVar_Rn.default.unsafe_prefs.getAll(),
      specs: localVar_Rn.default.unsafe_prefs.getSpecs(),
      flags: {}
    }, valueRef.flags = resultRef());

    function resultRef() {
      var countRef = {
        isModified: !1,
        isDefault: !0,
        isValid: !0
      };
      return Object.keys(valueRef.specs || {})
        .forEach(optionRef => {
          var indexRef = (valueRef.specs || {})[optionRef],
            accumulator = valueRef.current[optionRef];
          indexRef && (indexRef.defaultValue !== accumulator && (countRef.isDefault = !1), accumulator !== valueRef.values[
            optionRef] && (countRef.isModified = !0), localVar_Rn.default.unsafe_prefs.isValid(
            optionRef, accumulator) || (countRef.isValid = !1))
        }), countRef
    }
    switch (entryRef.type) {
      case "PREFS_UPDATED":
        valueRef = Object.assign({}, valueRef, {
          values: Object.assign({}, valueRef.values, entryRef.payload),
          current: Object.assign({}, entryRef.payload, valueRef.current)
        }), valueRef.flags = resultRef();
        break;
      case "PREFS_SPECS_UPDATED":
        valueRef = Object.assign({}, valueRef, {
          specs: Object.assign({}, valueRef.specs, entryRef.payload)
        }), valueRef.flags = resultRef();
        break;
      case "PREF_UPDATE":
        valueRef.current[entryRef.payload.prefName] != entryRef.payload.value && (valueRef = Object
          .assign({}, valueRef), valueRef.current = Object.assign({}, valueRef.current), valueRef
          .current[entryRef.payload.prefName] = entryRef.payload.value, valueRef.flags = resultRef());
        break;
      case "PREFS_RESET":
        valueRef = Object.assign({}, valueRef), Object.keys(valueRef.specs || {})
          .forEach(countRef => {
            var optionRef = (valueRef.specs || {})[countRef];
            optionRef && (valueRef.current[countRef] = optionRef.defaultValue)
          }), valueRef.flags = resultRef();
        break;
      case "PREFS_CANCEL":
        valueRef = Object.assign({}, valueRef), Object.keys(valueRef.specs || {})
          .forEach(countRef => {
            valueRef.current[countRef] = valueRef.values[countRef]
          }), valueRef.flags = resultRef();
        break;
      case "PREFS_SAVE":
        localVar_Rn.default.unsafe_prefs.assign(valueRef.current);
        break
    }
    return valueRef
  }
  var localVar__c = class extends localVar_qt.default.Component {
      render() {
        return localVar_qt.default.createElement("form", {
          className: "weh-shf",
          noValidate: !0,
          onSubmit: entryRef => entryRef.preventDefault()
        }, localVar_qt.default.createElement("div", null, this.props.children))
      }
    },
    numVar_H4 = 1,
    fnVar_E5 = localVar_Xr((valueRef, entryRef) => ({
      initialValue: valueRef.prefs.values[entryRef.prefName] || "",
      value: valueRef.prefs.current[entryRef.prefName] || "",
      spec: valueRef.prefs.specs[entryRef.prefName] || {}
    }), valueRef => helperFn_gr({
      updateCurrentPref: (entryRef, resultRef) => ({
        type: "PREF_UPDATE",
        payload: {
          prefName: entryRef,
          value: resultRef
        }
      })
    }, valueRef))(class extends localVar_qt.default.Component {
      constructor(valueRef) {
        super(valueRef), this.state = {
            value: this.props.value || "",
            spec: this.props.spec
          }, this.paramIndex = numVar_H4++, this.handleChange = this.handleChange
          .bind(this)
      }
      componentWillReceiveProps(valueRef) {
        this.setState({
          value: valueRef.value || "",
          spec: valueRef.spec
        })
      }
      handleChange(valueRef) {
        var entryRef = this.state.spec.type == "boolean" ? valueRef.target.checked : valueRef
          .target.value;
        this.setState({
            value: entryRef
          }), this.state.spec.type == "integer" && (entryRef = parseInt(entryRef)), this
          .state.spec.type == "float" && (entryRef = parseFloat(entryRef)), this.props
          .updateCurrentPref(this.props.prefName, entryRef)
      }
      setCustomValue(valueRef) {
        var entryRef = {
          target: {}
        };
        this.state.spec.type == "boolean" ? entryRef.target.checked = valueRef : entryRef
          .target.value = valueRef, this.handleChange(entryRef)
      }
      isValid(valueRef) {
        var entryRef = this.state.spec;
        return arguments.length === 0 && (valueRef = this.state.value), entryRef ? localVar_Rn
          .default.unsafe_prefs.isValid(this.props.prefName, valueRef) : !1
      }
      formGroupClass() {
        return this.isValid() ? this.state.value != this.props
          .initialValue ? "has-success" : this.state.value != this.state
          .spec.defaultValue ? "has-warning" : "" : "has-danger"
      }
      getInputWidth() {
        switch (this.state.spec.type) {
          case "string":
            return this.state.spec.width || "20em";
          case "integer":
          case "float":
            return this.state.spec.width || "8em";
          case "boolean":
            return "34px";
          case "choice":
            return this.state.spec.width || "12em"
        }
      }
      renderInput() {
        switch (this.state.spec.type) {
          case "string":
          case "integer":
          case "float":
            return localVar_qt.default.createElement("input", {
              className: "form-control",
              value: this.state.value,
              onChange: this.handleChange,
              maxLength: this.state.spec.maxLength || -1,
              id: "weh-param-" + this.paramIndex,
              type: "text",
              style: {
                width: this.getInputWidth()
              }
            });
          case "boolean":
            return localVar_qt.default.createElement("div", null, localVar_qt.default
              .createElement("input", {
                className: "form-control",
                checked: this.state.value,
                onChange: this.handleChange,
                id: "weh-param-" + this.paramIndex,
                type: "checkbox",
                style: {
                  width: "34px"
                }
              }));
          case "choice":
            var valueRef = (this.state.spec.choices || [])
              .map(entryRef => localVar_qt.default.createElement("option", {
                key: entryRef.value,
                value: entryRef.value
              }, entryRef.name));
            return valueRef.length === 0 ? !1 : localVar_qt.default.createElement(
              "select", {
                value: this.state.value,
                onChange: this.handleChange,
                className: "form-control",
                id: "weh-param-" + this.paramIndex,
                style: {
                  width: this.getInputWidth()
                }
              }, valueRef)
        }
      }
      render() {
        return localVar_qt.default.createElement("div", {
          className: "form-group row " + this.formGroupClass()
        }, localVar_qt.default.createElement("label", {
          className: "col-3 col-form-label",
          htmlFor: "weh-param-" + this.paramIndex
        }, this.state.spec.label), localVar_qt.default.createElement("div", {
            className: "col-8"
          }, this.props.renderInput && this.props.renderInput.call(
            this) || this.renderInput(), this.state.spec
          .description && localVar_qt.default.createElement("div", {
            className: "form-text"
          }, localVar_qt.default.createElement("em", null, this.state.spec
            .description))))
      }
    }),
    fnVar_T5 = localVar_Xr(valueRef => ({
      flags: valueRef.prefs.flags || {}
    }), valueRef => helperFn_gr({
      save: () => ({
        type: "PREFS_SAVE"
      }),
      reset: () => ({
        type: "PREFS_RESET"
      }),
      cancel: () => ({
        type: "PREFS_CANCEL"
      })
    }, valueRef))(class extends localVar_qt.default.Component {
      render() {
        return this.props.render.call(this)
      }
    });

  function helperFn_S5(valueRef) {
    let entryRef = localVar_Rn.default.unsafe_prefs;
    entryRef.on("", {
      pack: !0
    }, resultRef => {
      valueRef.dispatch({
        type: "PREFS_UPDATED",
        payload: resultRef
      })
    }), entryRef.on("", {
      pack: !0,
      specs: !0
    }, resultRef => {
      valueRef.dispatch({
        type: "PREFS_SPECS_UPDATED",
        payload: resultRef
      })
    })
  }
  var localVar_ri = toEsm(fnVar_wc()),
    localVar_Be = toEsm(fnVar_gt());
  var listVar_O5 = ["__MSG_appDesc_", "Bytes", "GB", "KB", "MB", "about",
    "about_alpha_extra7_fx", "about_alpha_intro", "about_beta_intro",
    "about_chrome_licenses", "about_qr", "about_vdh",
    "action_abort_description", "action_abort_title", "action_as_default",
    "action_avplay_description", "action_avplay_title",
    "action_blacklist_description", "action_blacklist_title",
    "action_bulkdownload_description", "action_bulkdownload_title",
    "action_bulkdownloadconvert_description",
    "action_bulkdownloadconvert_title", "action_copyurl_description",
    "action_copyurl_title", "action_deletehit_description",
    "action_deletehit_title", "action_details_description",
    "action_details_title", "action_download_description",
    "action_download_title", "action_downloadaudio_description",
    "action_downloadaudio_title", "action_downloadconvert_description",
    "action_downloadconvert_title", "action_openlocalcontainer_description",
    "action_openlocalcontainer_title", "action_openlocalfile_description",
    "action_openlocalfile_title", "action_pin_description",
    "action_pin_title", "action_quickdownload_description",
    "action_quickdownload_title", "action_quickdownloadaudio_description",
    "action_quickdownloadaudio_title",
    "action_quicksidedownload_description",
    "action_quicksidedownload_title", "action_sidedownload_description",
    "action_sidedownload_title", "action_sidedownloadconvert_description",
    "action_sidedownloadconvert_title", "action_stop_description",
    "action_stop_title", "adaptative", "add_to_blacklist",
    "add_to_blacklist_help", "advanced", "aggregating", "analyze_page",
    "appDesc", "appName", "appearance", "audio_only", "behavior",
    "blacklist", "blacklist_add_domain", "blacklist_add_placeholder",
    "blacklist_edit_descr", "blacklist_empty", "browser_info",
    "browser_locale", "build_options", "built_on", "bulk_in_progress",
    "bulk_n_videos", "cancel", "change", "chrome_basic_mode",
    "chrome_inapp_descr_premium_lifetime",
    "chrome_inapp_descr_premium_monthly",
    "chrome_inapp_descr_premium_yearly", "chrome_inapp_no_subs",
    "chrome_inapp_not_avail", "chrome_inapp_premium_lifetime",
    "chrome_inapp_premium_monthly", "chrome_inapp_premium_yearly",
    "chrome_install_firefox", "chrome_install_fx_vdh",
    "chrome_license_webstore_accepted", "chrome_licensing",
    "chrome_noyt_text", "chrome_noyt_text2", "chrome_noyt_text3",
    "chrome_premium_audio", "chrome_premium_check_error",
    "chrome_premium_hls", "chrome_premium_mode", "chrome_premium_need_sign",
    "chrome_premium_not_signed", "chrome_premium_recheck",
    "chrome_premium_required", "chrome_premium_source",
    "chrome_product_intro", "chrome_req_review", "chrome_signing_in",
    "chrome_verif_premium", "chrome_verif_premium_error",
    "chrome_warning_yt", "clear", "clear_hits", "clear_logs", "coapp",
    "coapp_error", "coapp_found", "coapp_help", "coapp_install",
    "coapp_installed", "coapp_latest_version", "coapp_not_installed",
    "coapp_outdated", "coapp_outofdate", "coapp_outofdate_text",
    "coapp_path", "coapp_recheck", "coapp_required", "coapp_required_text",
    "coapp_shell", "coapp_unchecked", "coapp_update", "collecting",
    "confirmation_required", "congratulations", "continue",
    "convconf_2passes", "convconf_ac", "convconf_acnone", "convconf_acodec",
    "convconf_aspect", "convconf_audiobitrate", "convconf_audiofreq",
    "convconf_audioonly", "convconf_bitrate", "convconf_container",
    "convconf_duplicate", "convconf_ext", "convconf_extra",
    "convconf_level", "convconf_mono", "convconf_new", "convconf_preset",
    "convconf_profilev", "convconf_rate", "convconf_readonly",
    "convconf_remove", "convconf_reset", "convconf_reset_confirm",
    "convconf_save", "convconf_size", "convconf_stereo", "convconf_target",
    "convconf_tune", "convconf_vcodec", "convconf_videobitrate",
    "conversion_create_rule", "conversion_outputs", "conversion_rules",
    "conversion_update_rule", "convert", "convert_local_files",
    "converter_needed_aggregate", "converter_needed_aggregate_why",
    "converter_needs_reg", "converter_queued", "converter_reg_audio",
    "converting", "convrule_convert", "convrule_domain",
    "convrule_extension", "convrule_format", "convrule_from_domain",
    "convrule_no_convert", "convrule_output_format",
    "convrule_refresh_formats", "convrule_with_ext", "convrules_add_rule",
    "convrules_edit_descr", "convrules_empty", "copy_of",
    "copy_settings_info_to_clipboard",
    "copy_settings_info_to_clipboard_success", "corrupted_media_file",
    "create", "custom_output", "dash_streaming", "default",
    "details_parenthesis", "dev_build", "dialog_audio_impossible",
    "dialog_audio_impossible_title", "directory_not_exist",
    "directory_not_exist_body", "dlconv_download_and_convert",
    "dlconv_output_details", "donate", "donate_vdh", "download_error",
    "download_method", "download_method_not_again", "download_modes1",
    "download_modes2", "download_with_browser", "download_with_coapp",
    "downloading", "edge_req_review", "error", "error_not_directory",
    "errors", "exit_natmsgsh", "explain_qr1", "explain_qr2", "export",
    "failed_aggregating", "failed_converting", "failed_getting_info",
    "failed_opening_directory", "failed_playing_file", "file_dialog_date",
    "file_dialog_name", "file_dialog_size", "file_generated", "file_ready",
    "finalizing", "from_domain", "gallery", "gallery_files_types",
    "gallery_from_domain", "gallery_links_from_domain", "general",
    "get_conversion_license", "help_translating", "hit_details",
    "hit_go_to_tab", "hls_streaming", "homepage", "import",
    "import_invalid_format", "in_current_tab", "in_other_tab",
    "lic_mismatch1", "lic_mismatch2", "lic_not_needed_linux",
    "lic_status_accepted", "lic_status_blocked", "lic_status_error",
    "lic_status_locked", "lic_status_mismatch", "lic_status_nocoapp",
    "lic_status_unneeded", "lic_status_unset", "lic_status_unverified",
    "lic_status_verifying", "license", "license_key", "licensing",
    "live_stream", "logs", "media", "merge_error", "merge_local_files",
    "more", "mup_best_video_quality", "mup_ignore_low_quality",
    "mup_ignore_low_quality_help", "mup_ignored_containers",
    "mup_ignored_video_codecs", "mup_lowest_video_quality",
    "mup_max_variants", "mup_max_variants_help", "mup_page_title",
    "mup_prefer_60fps", "mup_prefered_container",
    "mup_prefered_video_codecs", "mup_reset", "mup_saved",
    "network_error_no_response", "network_error_status",
    "new_sub_directory", "next", "no", "no_audio_in_file",
    "no_coapp_license_unverified", "no_license_registered",
    "no_media_current_tab", "no_media_to_process",
    "no_media_to_process_descr", "no_such_hit", "no_validate_without_coapp",
    "no_video_in_file", "not_again_3months", "not_see_again", "number_type",
    "ok", "orphan", "output_configuration", "overwrite_file", "per_month",
    "per_year", "pinned", "platform", "platform_info", "powered_by_weh",
    "preferences", "prod_build", "quality_medium", "quality_small",
    "queued", "recheck_license", "register_converter",
    "register_existing_license", "registered_email", "registered_key",
    "reload_addon", "reload_addon_confirm", "req_donate", "req_locale",
    "req_review", "req_review_link", "reset_settings", "running", "save",
    "save_as", "save_file_as", "select_audio_file_to_merge",
    "select_files_to_convert", "select_output_config",
    "select_output_directory", "select_video_file_to_merge",
    "selected_media", "settings", "smartname_add_domain",
    "smartname_create_rule", "smartname_define", "smartname_edit_descr",
    "smartname_empty", "smartname_update_rule", "smartnamer_delay",
    "smartnamer_domain", "smartnamer_get_name_from_header_url",
    "smartnamer_get_name_from_page_content",
    "smartnamer_get_name_from_page_title", "smartnamer_get_obfuscated_name",
    "smartnamer_regexp", "smartnamer_selected_text",
    "smartnamer_xpath_expr", "smartnaming_rule", "smartnaming_rules",
    "sub_directory_name", "support_forum", "supported_sites",
    "tbsn_quality_hd", "tbsn_quality_sd", "tell_me_more", "title",
    "translation", "up", "validate_license", "variants_list_adp",
    "variants_list_full", "vdh_notification", "version", "video_only",
    "video_qualities", "weh_prefs_alertDialogType_option_panel",
    "weh_prefs_alertDialogType_option_tab",
    "weh_prefs_coappDownloads_option_ask",
    "weh_prefs_coappDownloads_option_browser",
    "weh_prefs_coappDownloads_option_coapp",
    "weh_prefs_dashOnAdp_option_audio",
    "weh_prefs_dashOnAdp_option_audio_video",
    "weh_prefs_dashOnAdp_option_video", "weh_prefs_description_adpHide",
    "weh_prefs_description_alertDialogType",
    "weh_prefs_description_autoPin", "weh_prefs_description_avplayEnabled",
    "weh_prefs_description_blacklistEnabled",
    "weh_prefs_description_bulkEnabled",
    "weh_prefs_description_checkCoappOnStartup",
    "weh_prefs_description_chunkedCoappDataRequests",
    "weh_prefs_description_chunkedCoappManifestsRequests",
    "weh_prefs_description_chunksConcurrentDownloads",
    "weh_prefs_description_chunksEnabled",
    "weh_prefs_description_chunksPrefetchCount",
    "weh_prefs_description_coappDownloads",
    "weh_prefs_description_coappIdleExit",
    "weh_prefs_description_coappRestartDelay",
    "weh_prefs_description_coappUseProxy",
    "weh_prefs_description_contentRedirectEnabled",
    "weh_prefs_description_contextMenuEnabled",
    "weh_prefs_description_convertControlledMax",
    "weh_prefs_description_converterAggregTuneH264",
    "weh_prefs_description_converterKeepTmpFiles",
    "weh_prefs_description_converterThreads",
    "weh_prefs_description_dashEnabled",
    "weh_prefs_description_dashHideM4s", "weh_prefs_description_dashOnAdp",
    "weh_prefs_description_dialogAutoClose",
    "weh_prefs_description_downloadControlledMax",
    "weh_prefs_description_downloadRetries",
    "weh_prefs_description_downloadRetryDelay",
    "weh_prefs_description_downloadStreamControlledMax",
    "weh_prefs_description_fileDialogType",
    "weh_prefs_description_galleryNaming",
    "weh_prefs_description_hitsGotoTab",
    "weh_prefs_description_hlsDownloadAsM2ts",
    "weh_prefs_description_hlsEnabled",
    "weh_prefs_description_hlsEndTimeout",
    "weh_prefs_description_hlsRememberPrevLiveChunks",
    "weh_prefs_description_iconActivation",
    "weh_prefs_description_iconBadge",
    "weh_prefs_description_ignoreProtectedVariants",
    "weh_prefs_description_lastDownloadDirectory",
    "weh_prefs_description_mediaExtensions",
    "weh_prefs_description_medialinkAutoDetect",
    "weh_prefs_description_medialinkExtensions",
    "weh_prefs_description_medialinkMaxHits",
    "weh_prefs_description_medialinkMinFilesPerGroup",
    "weh_prefs_description_medialinkMinImgSize",
    "weh_prefs_description_medialinkScanImages",
    "weh_prefs_description_medialinkScanLinks",
    "weh_prefs_description_mediaweightMinSize",
    "weh_prefs_description_mediaweightThreshold",
    "weh_prefs_description_monitorNetworkRequests",
    "weh_prefs_description_mpegtsHideTs",
    "weh_prefs_description_networkFilterOut",
    "weh_prefs_description_networkProbe",
    "weh_prefs_description_noPrivateNotification",
    "weh_prefs_description_notifyReady",
    "weh_prefs_description_orphanExpiration",
    "weh_prefs_description_qualitiesMaxVariants",
    "weh_prefs_description_rememberLastDir",
    "weh_prefs_description_smartnamerFnameMaxlen",
    "weh_prefs_description_smartnamerFnameSpaces",
    "weh_prefs_description_tbsnEnabled", "weh_prefs_description_titleMode",
    "weh_prefs_description_toolsMenuEnabled",
    "weh_prefs_description_use_native_filepicker",
    "weh_prefs_fileDialogType_option_panel",
    "weh_prefs_fileDialogType_option_tab",
    "weh_prefs_galleryNaming_option_index_url",
    "weh_prefs_galleryNaming_option_type_index",
    "weh_prefs_galleryNaming_option_url",
    "weh_prefs_iconActivation_option_anytab",
    "weh_prefs_iconActivation_option_currenttab",
    "weh_prefs_iconBadge_option_activetab",
    "weh_prefs_iconBadge_option_anytab", "weh_prefs_iconBadge_option_mixed",
    "weh_prefs_iconBadge_option_none", "weh_prefs_iconBadge_option_pinned",
    "weh_prefs_iconBadge_option_tasks", "weh_prefs_label_adpHide",
    "weh_prefs_label_alertDialogType", "weh_prefs_label_autoPin",
    "weh_prefs_label_avplayEnabled", "weh_prefs_label_blacklistEnabled",
    "weh_prefs_label_bulkEnabled", "weh_prefs_label_checkCoappOnStartup",
    "weh_prefs_label_chunkedCoappDataRequests",
    "weh_prefs_label_chunkedCoappManifestsRequests",
    "weh_prefs_label_chunksConcurrentDownloads",
    "weh_prefs_label_chunksEnabled", "weh_prefs_label_chunksPrefetchCount",
    "weh_prefs_label_coappDownloads", "weh_prefs_label_coappIdleExit",
    "weh_prefs_label_coappRestartDelay", "weh_prefs_label_coappUseProxy",
    "weh_prefs_label_contentRedirectEnabled",
    "weh_prefs_label_contextMenuEnabled",
    "weh_prefs_label_convertControlledMax",
    "weh_prefs_label_converterAggregTuneH264",
    "weh_prefs_label_converterKeepTmpFiles",
    "weh_prefs_label_converterThreads", "weh_prefs_label_dashEnabled",
    "weh_prefs_label_dashHideM4s", "weh_prefs_label_dashOnAdp",
    "weh_prefs_label_dialogAutoClose",
    "weh_prefs_label_downloadControlledMax",
    "weh_prefs_label_downloadRetries", "weh_prefs_label_downloadRetryDelay",
    "weh_prefs_label_downloadStreamControlledMax",
    "weh_prefs_label_fileDialogType", "weh_prefs_label_galleryNaming",
    "weh_prefs_label_hitsGotoTab", "weh_prefs_label_hlsDownloadAsM2ts",
    "weh_prefs_label_hlsEnabled", "weh_prefs_label_hlsEndTimeout",
    "weh_prefs_label_hlsRememberPrevLiveChunks",
    "weh_prefs_label_iconActivation", "weh_prefs_label_iconBadge",
    "weh_prefs_label_ignoreProtectedVariants",
    "weh_prefs_label_lastDownloadDirectory",
    "weh_prefs_label_mediaExtensions",
    "weh_prefs_label_medialinkAutoDetect",
    "weh_prefs_label_medialinkExtensions",
    "weh_prefs_label_medialinkMaxHits",
    "weh_prefs_label_medialinkMinFilesPerGroup",
    "weh_prefs_label_medialinkMinImgSize",
    "weh_prefs_label_medialinkScanImages",
    "weh_prefs_label_medialinkScanLinks",
    "weh_prefs_label_mediaweightMinSize",
    "weh_prefs_label_mediaweightThreshold",
    "weh_prefs_label_monitorNetworkRequests",
    "weh_prefs_label_mpegtsHideTs", "weh_prefs_label_networkFilterOut",
    "weh_prefs_label_networkProbe", "weh_prefs_label_noPrivateNotification",
    "weh_prefs_label_notifyReady", "weh_prefs_label_orphanExpiration",
    "weh_prefs_label_qualitiesMaxVariants",
    "weh_prefs_label_rememberLastDir",
    "weh_prefs_label_smartnamerFnameMaxlen",
    "weh_prefs_label_smartnamerFnameSpaces", "weh_prefs_label_tbsnEnabled",
    "weh_prefs_label_tbvwsExtractionMethod", "weh_prefs_label_titleMode",
    "weh_prefs_label_toolsMenuEnabled",
    "weh_prefs_label_use_native_filepicker",
    "weh_prefs_smartnamerFnameSpaces_option_hyphen",
    "weh_prefs_smartnamerFnameSpaces_option_keep",
    "weh_prefs_smartnamerFnameSpaces_option_remove",
    "weh_prefs_smartnamerFnameSpaces_option_underscore",
    "weh_prefs_titleMode_option_left",
    "weh_prefs_titleMode_option_multiline",
    "weh_prefs_titleMode_option_right", "yes", "you_downloaded_n_videos",
    "v9_yes", "v9_no", "v9_error", "v9_no_media_current_tab",
    "v9_no_media_to_process_descr", "v9_coapp_required",
    "v9_coapp_required_text", "v9_coapp_help", "v9_coapp_installed",
    "v9_coapp_recheck", "v9_coapp_outdated",
    "v9_dialog_audio_impossible_title", "v9_dialog_audio_impossible",
    "v9_converter_needs_reg", "v9_get_conversion_license",
    "v9_converter_reg_audio", "v9_chrome_premium_required",
    "v9_chrome_premium_hls", "v9_chrome_warning_yt", "v9_chrome_noyt_text3",
    "v9_chrome_noyt_text2", "v9_about_qr", "v9_explain_qr1",
    "v9_not_see_again", "v9_tell_me_more", "v9_settings",
    "v9_copy_settings_info_to_clipboard", "v9_coapp_unchecked",
    "v9_coapp_update", "v9_coapp_not_installed", "v9_coapp_install",
    "v9_no_validate_without_coapp", "v9_lic_status_verifying",
    "v9_weh_prefs_label_downloadControlledMax", "v9_mup_max_variants",
    "v9_weh_prefs_description_contextMenuEnabled", "v9_vdh_notification",
    "v9_file_ready", "v9_lic_status_unset", "v9_lic_status_blocked",
    "v9_lic_status_locked2", "v9_lic_mismatch2", "v9_lic_status_accepted",
    "v9_no_license_registered", "v9_panel_view_show_all_tabs",
    "v9_panel_view_show_low_quality", "v9_panel_view_sort_status",
    "v9_panel_view_sort_reverse", "v9_panel_view_clean",
    "v9_panel_view_clean_all", "v9_panel_view_open_settings",
    "v9_panel_downloadable_variant_no_details",
    "v9_panel_variant_menu_prefer_quality",
    "v9_panel_variant_menu_prefer_format",
    "v9_panel_downloaded_retry_tooltip",
    "v9_panel_downloaded_delete_file_tooltip",
    "v9_panel_downloaded_show_dir_tooltip", "v9_panel_downloading_stop",
    "v9_panel_error_report_button2", "v9_panel_error_reported_button",
    "v9_panel_error_unknown_description",
    "v9_panel_error_coapp_failure_title",
    "v9_panel_error_coapp_failure_description",
    "v9_panel_footer_show_in_sidebar_tooltip",
    "v9_panel_footer_show_in_popup_tooltip",
    "v9_panel_footer_clean_tooltip", "v9_panel_footer_clean_all_tooltip",
    "v9_panel_footer_convert_local_tooltip",
    "v9_panel_error_nocoapp_button_install",
    "v9_panel_error_coapp_too_old_button_udpate", "v9_short_help",
    "v9_settings_button_reset", "v9_settings_button_import",
    "v9_settings_button_export", "v9_settings_button_reload",
    "v9_settings_download_directory",
    "v9_settings_download_directory_change", "v9_settings_variants_title",
    "v9_settings_variants_clear", "v9_settings_checkbox_force_inbrowser",
    "v9_settings_checkbox_notification",
    "v9_settings_checkbox_notification_incognito",
    "v9_settings_checkbox_thumbnail_in_notification",
    "v9_settings_checkbox_forget_on_close",
    "v9_settings_checkbox_view_convert_local",
    "v9_settings_checkbox_use_wide_ui",
    "v9_settings_checkbox_use_legacy_ui", "v9_settings_license_placeholder",
    "v9_settings_license_check", "v9_settings_license_get",
    "v9_settings_theme_title", "v9_settings_theme_system",
    "v9_settings_theme_light", "v9_settings_theme_dark", "v9_badge_new",
    "v9_panel_download_button_label", "v9_panel_download_as_button_label",
    "v9_panel_download_audio_button_label",
    "v9_panel_copy_url_button_label", "v9_panel_view_hide_downloaded",
    "v9_user_message_auto_hide_downloaded", "v9_checkbox_remember_action",
    "v9_menu_item_download_and_convert", "v9_menu_item_details",
    "v9_menu_item_smartnaming", "v9_menu_item_blacklist",
    "v9_menu_item_blacklist_media", "v9_menu_item_blacklist_page",
    "v9_menu_item_blacklist_domain", "v9_blacklist_glob",
    "v9_smartnaming_title", "v9_smartnaming_reset_for",
    "v9_smartnaming_save_for", "v9_smartnaming_reset_for_all",
    "v9_smartnaming_save_for_all", "v9_smartnaming_template",
    "v9_smartnaming_max_length", "v9_smartnaming_selector",
    "v9_smartnaming_result", "v9_smartnaming_test",
    "v9_filepicker_select_file", "v9_filepicker_select_download_dir",
    "v9_reset", "v9_save", "v9_user_message_no_incognito_title",
    "v9_user_message_no_incognito_body",
    "v9_user_message_no_incognito_open_settings", "v9_yt_bulk_detected",
    "v9_yt_bulk_detected_trigger", "v9_user_message_one_hundred_downloads",
    "v9_user_message_one_hundred_downloads_body",
    "v9_user_message_one_hundred_downloads_leave_review",
    "v9_user_message_one_hundred_downloads_never_show_again",
    "v9_panel_footer_show_history_tooltip", "v9_history_page_title",
    "v9_history_button_clear", "v9_history_button_start_recording",
    "v9_history_button_stop_recording",
    "v9_history_no_recording_description",
    "v9_history_no_recording_description_safe", "v9_history_no_entries",
    "v9_history_input_search", "v9_settings_history_limit", "v9_date_today",
    "v9_date_yesterday", "v9_date_x_days_ago", "v9_date_long_ago"
  ];
  var localVar_Oa = toEsm(fnVar_gt());
  var localVar_kc = toEsm(fnVar_jn()),
    localVar_K4 = localVar_kc.default.browser.runtime.getManifest(),
    localVar_io = class extends localVar_Oa.default.Component {
      close() {
        localVar_kc.default.rpc.call("closePanel", localVar_kc.default.uiName)
      }
      render() {
        var entryRef;
        this.props.title ? entryRef = this.props.title : entryRef = localVar_K4.name;
        var resultRef = {
          backgroundImage: "url(" + (this.props.image ||
            "/content2/icons/stable-color.png") + ")"
        };
        return localVar_Oa.default.createElement("header", {
          className: "weh-header",
          style: resultRef
        }, localVar_Oa.default.createElement("span", {
          className: "weh-header-title"
        }, entryRef), localVar_Oa.default.createElement("span", {
          className: "weh-header-close",
          style: {
            float: "right"
          },
          onClick: this.close
        }, "\u2297"), this.props.children)
      }
    };
  var localVar_P5 = !0,
    lookupTable_G4 = {
      keys: listVar_O5,
      custom: {},
      modified: {}
    };

  function helperFn_C5(valueRef = lookupTable_G4, entryRef) {
    switch (entryRef.type) {
      case "UPDATE_STRING":
        valueRef = Object.assign({}, valueRef, {
            modified: Object.assign({}, valueRef.modified)
          }), valueRef.custom[entryRef.payload.key] === entryRef.payload.value || typeof valueRef.custom[entryRef
            .payload.key] > "u" && entryRef.payload.value.trim() === "" ? delete valueRef
          .modified[entryRef.payload.key] : valueRef.modified[entryRef.payload.key] = entryRef.payload
          .value;
        break;
      case "SAVE":
        valueRef = Object.assign({}, valueRef, {
          custom: Object.assign({}, valueRef.custom, valueRef.modified),
          modified: {}
        });
        var resultRef = {};
        Object.keys(valueRef.custom)
          .forEach(countRef => {
            resultRef[countRef] = {
              message: valueRef.custom[countRef]
            }
          }), localVar_ri.browser.storage.local.set({
            wehI18nCustom: resultRef
          });
        break;
      case "CANCEL":
        valueRef = Object.assign({}, valueRef, {
          modified: {}
        });
        break;
      case "IMPORT":
        valueRef = Object.assign({}, valueRef, {
          modified: entryRef.payload
        });
        break;
      case "RESET":
        valueRef = Object.assign({}, valueRef, {
          modified: {},
          custom: {}
        });
        break;
      case "RESTORE":
        var resultRef = {};
        Object.keys(entryRef.payload)
          .forEach(countRef => {
            resultRef[countRef] = entryRef.payload[countRef].message
          }), valueRef = Object.assign({}, valueRef, {
            custom: resultRef,
            modified: {}
          });
        break
    }
    return valueRef
  }

  function helperFn_Q4(valueRef) {
    var entryRef = !0;
    for (var resultRef in valueRef)
      if (valueRef.hasOwnProperty(resultRef)) {
        entryRef = !1;
        break
      } return entryRef
  }
  var fnVar_N5 = localVar_Xr(valueRef => ({
      keys: valueRef.translate.keys || [],
      custom: valueRef.translate.custom,
      isModified: !helperFn_Q4(valueRef.translate.modified),
      modified: valueRef.translate.modified
    }), valueRef => helperFn_gr({
      save: () => ({
        type: "SAVE"
      }),
      cancel: () => ({
        type: "CANCEL"
      }),
      import: entryRef => ({
        type: "IMPORT",
        payload: entryRef
      }),
      reset: entryRef => ({
        type: "RESET"
      }),
      restore: entryRef => ({
        type: "RESTORE",
        payload: entryRef
      })
    }, valueRef))(class extends localVar_Be.default.Component {
      constructor(valueRef) {
        super(valueRef), this.state = {
          search: "",
          filter: valueRef.missingTags && valueRef.missingTags.length > 0 &&
            "missing" || "all"
        };
        var entryRef = 4;
        this.argPlaceHolders = new Array(entryRef)
          .fill("")
          .map((resultRef, countRef) => ""), this.handleSearchChange = this
          .handleSearchChange.bind(this), this.searchFilter = this
          .searchFilter.bind(this), this.fileInputChange = this
          .fileInputChange.bind(this)
      }
      componentWillMount(valueRef) {
        var entryRef = this;
        localVar_P5 && (localVar_P5 = !1, localVar_ri.browser.storage.local.get("wehI18nCustom")
          .then(resultRef => {
            let countRef = resultRef.wehI18nCustom;
            countRef && entryRef.props.restore(countRef)
          }))
      }
      handleSearchChange(valueRef) {
        var entryRef = valueRef.target.value;
        this.setState({
          search: entryRef
        })
      }
      searchFilter() {
        var valueRef = this;
        return entryRef => {
          entryRef = entryRef.toLowerCase();
          var resultRef = valueRef.state.search.toLowerCase()
            .trim();
          if (resultRef.length === 0 || typeof valueRef.props.modified[entryRef] < "u" || entryRef
            .indexOf(resultRef) >= 0 || valueRef.props.custom[entryRef] && valueRef.props.custom[entryRef]
            .toLowerCase()
            .indexOf(resultRef) >= 0 || valueRef.props.modified[entryRef] && valueRef.props.modified[
              entryRef].toLowerCase()
            .indexOf(resultRef) >= 0) return !0;
          var countRef = localVar_ri.browser.i18n.getMessage(entryRef, valueRef.argPlaceHolders)
            .toLowerCase();
          return countRef.indexOf(resultRef) >= 0
        }
      }
      typeFilter() {
        var valueRef = this;
        return entryRef => valueRef.state.filter != "missing" || !valueRef.props.missingTags ||
          valueRef.props.missingTags.length == 0 || valueRef.props.missingTags.indexOf(
            entryRef) >= 0
      }
      changedFilter() {
        var valueRef = this;
        return entryRef => {
          valueRef.setState({
            filter: entryRef.target.value
          })
        }
      }
      reset() {
        var valueRef = this;
        return () => {
          this.props.reset()
        }
      }
      import() {
        var valueRef = this;
        return () => {
          valueRef.fileInput.click()
        }
      }
      fileInputChange(valueRef) {
        var entryRef = this,
          resultRef = entryRef.fileInput.files[0];
        if (resultRef) {
          var countRef = new FileReader;
          countRef.onload = optionRef => {
            try {
              var indexRef = JSON.parse(optionRef.target.result);
              entryRef.props.import(indexRef)
            } catch (accumulator) {
              alert("File " + resultRef.name + ": Invalid format " + accumulator.message)
            }
          }, countRef.readAsText(resultRef)
        }
      }
      setFileInput(valueRef) {
        var entryRef = this;
        return resultRef => {
          resultRef && resultRef.removeEventListener("change", entryRef.fileInputChange), entryRef
            .fileInput = resultRef, resultRef && resultRef.addEventListener("change", entryRef
              .fileInputChange)
        }
      }
      export () {
        var valueRef = this;
        return () => {
          var entryRef = Object.assign({}, valueRef.props.custom, valueRef.props.modified),
            resultRef = new Blob([JSON.stringify(entryRef, null, 4)]);
          localVar_ri.browser.downloads.download({
            url: window.URL.createObjectURL(resultRef),
            filename: "messages.json",
            saveAs: !0,
            conflictAction: "uniquify"
          })
        }
      }
      render() {
        var valueRef = this.props.keys.filter(this.searchFilter())
          .filter(this.typeFilter())
          .sort()
          .map(entryRef => localVar_Be.default.createElement(fnVar_Y4, {
            key: entryRef,
            keyName: entryRef
          }));
        return localVar_Be.default.createElement("form", {
            className: "weh-shf",
            onChange: this.handleChange,
            role: "form"
          }, localVar_Be.default.createElement(localVar_io, null, localVar_Be.default
            .createElement("div", {
                className: "col-sm-4 float-sm-right",
                style: {
                  display: "inline-flex",
                  marginTop: "2px"
                }
              }, localVar_Be.default.createElement("input", {
                className: "form-control",
                onChange: this.handleSearchChange,
                placeholder: "Filter...",
                type: "text",
                value: this.state.search
              }), "\xA0", this.props.missingTags && this.props
              .missingTags.length > 0 && localVar_Be.default.createElement(
                "select", {
                  className: "form-control",
                  value: this.state.filter,
                  onChange: this.changedFilter()
                }, localVar_Be.default.createElement("option", {
                  value: "all"
                }, "All strings"), localVar_Be.default.createElement("option", {
                  value: "missing"
                }, "Missing strings")))), localVar_Be.default.createElement(
            "main", null, localVar_Be.default.createElement("div", {
              className: "container"
            }, localVar_Be.default.createElement("section", null, valueRef))), localVar_Be
          .default.createElement("footer", null, localVar_Be.default
            .createElement("div", {
              style: {
                display: "none"
              }
            }, localVar_Be.default.createElement("input", {
              type: "file",
              accept: "application/json",
              ref: this.setFileInput()
            })), this.props.footerExtra && localVar_Be.default.createElement(
              "div", {
                className: "form-control translation-footer-extra"
              }, this.props.footerExtra), localVar_Be.default.createElement(
              "div", {
                className: "btn-toolbar justify-content-end"
              }, localVar_Be.default.createElement("div", {
                className: "btn-group pull-right"
              }, localVar_Be.default.createElement("button", {
                type: "button",
                onClick: this.import(),
                className: "btn"
              }, "Import"), localVar_Be.default.createElement("button", {
                type: "button",
                onClick: this.export(),
                className: "btn"
              }, "Export"), localVar_Be.default.createElement("button", {
                type: "button",
                className: "btn btn-danger",
                onClick: this.reset()
              }, "Reset"), localVar_Be.default.createElement("button", {
                type: "button",
                onClick: this.props.cancel,
                className: "btn " + (this.props.isModified ? "" :
                  "disabled")
              }, "Cancel"), localVar_Be.default.createElement("button", {
                type: "button",
                onClick: this.props.save,
                className: "btn btn-primary " + (this.props
                  .isModified ? "" : "disabled")
              }, "Save")))))
      }
    }),
    fnVar_Y4 = localVar_Xr((valueRef, entryRef) => {
      var resultRef = valueRef.translate.custom[entryRef.keyName],
        countRef = resultRef;
      return typeof valueRef.translate.modified[entryRef.keyName] < "u" && (countRef = valueRef
        .translate.modified[entryRef.keyName]), {
        value: countRef || "",
        orgValue: resultRef || ""
      }
    }, valueRef => helperFn_gr({
      updateString: (entryRef, resultRef) => ({
        type: "UPDATE_STRING",
        payload: {
          key: entryRef,
          value: resultRef
        }
      })
    }, valueRef))(class extends localVar_Be.default.Component {
      constructor(valueRef) {
        super(valueRef), this.state = {
          value: this.props.value || "",
          orgValue: this.props.orgValue || ""
        };
        var entryRef = 4,
          resultRef = new Array(entryRef)
          .fill("")
          .map((countRef, optionRef) => "$ARG" + (optionRef + 1) + "$");
        this.defaultString = localVar_ri.browser.i18n.getMessage(this.props
            .keyName, resultRef), this.handleChange = this.handleChange.bind(
          this), this.formClass = this.formClass.bind(this)
      }
      componentWillReceiveProps(valueRef) {
        this.setState({
          value: valueRef.value || "",
          orgValue: valueRef.orgValue || ""
        })
      }
      formClass(valueRef = "") {
        return this.state.value !== this.state.orgValue ? valueRef + "success" :
          this.state.value !== "" ? valueRef + "warning" : ""
      }
      handleChange(valueRef) {
        var entryRef = valueRef.target.value;
        this.setState({
          value: entryRef
        }), this.props.updateString(this.props.keyName, entryRef)
      }
      render() {
        return localVar_Be.default.createElement("div", {
          className: "form-group row " + this.formClass("has-")
        }, localVar_Be.default.createElement("label", {
          className: "col-4 col-form-label",
          htmlFor: "weh-" + this.props.keyName,
          title: this.props.keyName
        }, this.props.keyName), localVar_Be.default.createElement("div", {
          className: "col-8"
        }, localVar_Be.default.createElement("input", {
          className: "form-control",
          onChange: this.handleChange,
          value: this.state.value,
          type: "text",
          id: "weh-" + this.props.keyName
        }), localVar_Be.default.createElement("div", {
          className: "form-text"
        }, localVar_Be.default.createElement("em", null, this
          .defaultString))))
      }
    });
  var localVar_Ec = toEsm(fnVar_gt());
  var localVar_Tc = class extends localVar_Ec.default.Component {
      _onResize(...entryRef) {
        parent.postMessage("height " + (entryRef[1] + 0), "*")
      }
      render() {
        return localVar_Ec.default.createElement("div", null, localVar_Ec.default
          .createElement(fnVar_xc, {
            handleHeight: !0,
            onResize: this._onResize.bind(this)
          }), this.props.children)
      }
    };
  var localVar_ng = toEsm(fnVar_gt()),
    localVar_Sc = class extends localVar_ng.default.Component {
      constructor(entryRef) {
        super(entryRef), this.receiveMessage = this.receiveMessage.bind(this), this
          .heightRe = new RegExp("^height (\\d+)"), this.state = {
            height: "auto"
          }
      }
      receiveMessage(entryRef) {
        var resultRef = entryRef.message || entryRef.data,
          countRef = this.heightRe.exec(resultRef);
        countRef && this.setState({
          height: Math.min(580, parseInt(countRef[1])) + "px"
        })
      }
      componentDidMount() {
        window.addEventListener("message", this.receiveMessage)
      }
      componentWillUnmount() {
        window.removeEventListener("message", this.receiveMessage)
      }
      render() {
        return localVar_ng.default.createElement("iframe", {
          className: this.props.className,
          style: {
            height: this.state.height,
            borderTop: 0,
            borderBottom: 0
          },
          src: this.props.src
        })
      }
    };
  var localVar_ao = toEsm(fnVar_gt()),
    localVar_Oc = class extends localVar_ao.default.Component {
      constructor(entryRef) {
        super(entryRef), this.state = {
          isOpen: !1
        }, this.close = this.close.bind(this)
      }
      componentWillReceiveProps(entryRef) {
        this.setState({
          modalData: entryRef.modalData
        })
      }
      close() {
        this.props.close(), this.setState({
          modalData: null
        })
      }
      render() {
        if (!this.props.modalData) return null;
        var entryRef = (this.props.modalData.buttons || [])
          .map(resultRef => localVar_ao.default.createElement(Button, {
            key: resultRef.text,
            color: resultRef.color || "primary",
            onClick: resultRef.click || (() => {})
          }, resultRef.text || "OK"));
        return localVar_ao.default.createElement(Modal, {
            isOpen: !!this.state.modalData,
            toggle: this.close,
            className: this.props.className
          }, localVar_ao.default.createElement(ModalHeader, {
            toggle: this.close
          }, this.props.modalData.title || ""), localVar_ao.default.createElement(
            ModalBody, null, this.props.modalData.body), localVar_ao.default
          .createElement(ModalFooter, null, entryRef))
      }
    };
  var localVar__t = toEsm(fnVar_gt()),
    localVar_M5 = toEsm(fnVar_qm());
  var localVar_og = toEsm(fnVar_Qm()),
    localVar_Pc = class extends localVar__t.default.Component {
      constructor(entryRef) {
        super(entryRef), this.state = {
            className: "",
            method: null,
            args: null,
            items: []
          }, this.itemIndex = 0, this.history = [], this.historyIndex = 0,
          this.handleChange = this.handleChange.bind(this), this
          .handleKeyDown = this.handleKeyDown.bind(this), this.clear = this
          .clear.bind(this)
      }
      resetInput() {
        this.input.value = "", this.setState({
          className: "",
          method: null,
          args: null
        })
      }
      clear() {
        this.setState({
          items: []
        })
      }
      handleChange(entryRef) {
        var resultRef = this.input.value.trim(),
          countRef = "",
          optionRef = null,
          indexRef = null;
        if (resultRef.length) {
          countRef = "syntax-error";
          var accumulator = /^\s*([^\s\(\)]+)\s*\((.*)\)\s*$/.exec(resultRef);
          if (accumulator) {
            var listRef = "[" + accumulator[2] + "]";
            try {
              indexRef = JSON.parse(listRef), optionRef = accumulator[1], countRef = "syntax-ok"
            } catch {}
          }
        }
        this.setState({
          className: countRef,
          method: optionRef,
          args: indexRef
        })
      }
      addItem(entryRef) {
        entryRef = Object.assign({}, entryRef, {
          key: ++this.itemIndex
        }), this.setState({
          items: this.state.items.concat([entryRef])
        })
      }
      handleKeyDown(entryRef) {
        var resultRef = this;
        if (entryRef.keyCode == 13 && this.state.method && (this.history.push({
              method: this.state.method,
              args: this.state.args
            }), this.historyIndex = this.history.push(), this.addItem({
              type: "call",
              method: this.state.method,
              args: this.state.args
            }), localVar_og.default.call(this.props.proxyFnName, this.state.method,
              ...this.state.args)
            .then(countRef => {
              console.info("result", countRef), resultRef.addItem({
                type: "result",
                result: countRef
              })
            })
            .catch(countRef => {
              console.info("error", countRef), resultRef.addItem({
                type: "error",
                error: countRef
              })
            }), this.resetInput()), entryRef.keyCode == 38 && this.historyIndex >
          0) {
          let countRef = this.history[--this.historyIndex];
          this.setState({
            method: countRef.method,
            args: countRef.args,
            className: "syntax-ok"
          }), this.input.value = this.entryString(countRef)
        }
        if (entryRef.keyCode == 40 && this.historyIndex < this.history.length) {
          let countRef = this.history[++this.historyIndex];
          countRef ? (this.setState({
            method: countRef.method,
            args: countRef.args,
            className: "syntax-ok"
          }), this.input.value = this.entryString(countRef)) : this.resetInput()
        }
      }
      entryString(entryRef) {
        return entryRef.method + "(" + entryRef.args.map(resultRef => JSON.stringify(resultRef))
          .join(", ") + ")"
      }
      scrollToBottom() {
        this.itemsEnd.scrollIntoView({
          behavior: "smooth"
        })
      }
      componentDidMount() {
        this.scrollToBottom()
      }
      componentDidUpdate() {
        this.scrollToBottom()
      }
      renderJson(entryRef) {
        switch (typeof entryRef) {
          case "undefined":
            return localVar__t.default.createElement("div", {
              className: "react-json-view scalar-view"
            }, localVar__t.default.createElement("em", null,
              "no explicit return value"));
          case "number":
          case "string":
          case "boolean":
            return localVar__t.default.createElement("div", {
              className: "react-json-view scalar-view"
            }, JSON.stringify(entryRef))
        }
        return localVar__t.default.createElement(localVar_M5.default, {
          src: entryRef,
          name: null,
          collapsed: !0,
          enableClipboard: !1,
          collapseStringsAfterLength: 64,
          displayDataTypes: !1,
          displayObjectSize: !1,
          style: {
            display: "inline-block"
          }
        })
      }
      render() {
        var entryRef = this,
          resultRef = this.state.items.map(countRef => localVar__t.default.createElement("div", {
              key: countRef.key,
              className: "natmsgsh-item"
            }, countRef.type == "call" && localVar__t.default.createElement("div", {
              className: "natmsgsh-call"
            }, entryRef.entryString(countRef)), countRef.type == "result" && localVar__t.default
            .createElement("div", {
              className: "natmsgsh-return"
            }, localVar__t.default.createElement("span", {
              className: "natmsgsh-ret-marker",
              dangerouslySetInnerHTML: {
                __html: "&rArr;"
              }
            }), entryRef.renderJson(countRef.result)), countRef.type == "error" && localVar__t.default
            .createElement("div", {
              className: "natmsgsh-error"
            }, localVar__t.default.createElement("span", {
              className: "natmsgsh-ret-marker",
              dangerouslySetInnerHTML: {
                __html: "&rArr;"
              }
            }), countRef.error.message)));
        return localVar__t.default.createElement("div", {
          className: "natmsgsh"
        }, localVar__t.default.createElement("div", {
          className: "natmsgsh-result"
        }, resultRef, localVar__t.default.createElement("div", {
          style: {
            float: "left",
            clear: "both"
          },
          ref: countRef => {
            this.itemsEnd = countRef
          }
        })), localVar__t.default.createElement("div", {
            className: "natmsgsh-input"
          }, localVar__t.default.createElement("input", {
            ref: countRef => this.input = countRef,
            className: this.state.className,
            onChange: this.handleChange,
            placeholder: "RPC call as: method(arg1,arg2)",
            onKeyDown: this.handleKeyDown,
            type: "text"
          }), localVar__t.default.createElement("button", {
            className: "btn btn-outline-secondary",
            onClick: () => {
              localVar_og.default.call(this.props.proxyFnName, "quit")
            }
          }, this.props.exitAppText || "Exit app"), localVar__t.default
          .createElement("button", {
            className: "btn btn-outline-secondary",
            onClick: this.clear
          }, this.props.clearText || "Clear")))
      }
    };
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
  window.PrefsSettingsApp = localVar__c;
  window.WehParam = fnVar_E5;
  window.WehPrefsControls = fnVar_T5;
  window.listenPrefs = helperFn_S5;
  window.translateReducer = helperFn_C5;
  window.WehTranslationForm = fnVar_N5;
  window.WehHeader = localVar_io;
  window.Embedder = localVar_Tc;
  window.Embedded = localVar_Sc;
  window.VDHModal = localVar_Oc;
  window.NativeMessagingShell = localVar_Pc;
  window.weh = localVar_ig.default;
  Object.keys(lookupTable_Is)
    .forEach(valueRef => {
      window[valueRef] = lookupTable_Is[valueRef]
    });
  window.browser = localVar_ig.default.browser;
})();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

react/cjs/react.production.min.js:
  (** @license React v16.14.0
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (** @license React v0.19.1
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (** @license React v16.14.0
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.production.min.js:
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

popper.js/dist/umd/popper.js:
  (**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *)
*/