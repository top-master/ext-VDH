/*
 * deep-equal: recursive deep-equality (a lodash isEqual dependency chain).
 * Extracted from the extension's content-libs.js bundle (no clean CDN UMD
 * build with a browser global exists for it); kept as-is and exposed as
 * window.__vdhDeepEqual so content-libs.js can load it as a vendored asset.
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
  var fnVar_wf = defineCommonjsModule((paramArg_h7, paramArg__y) => {
    "use strict";
    var localVar_wy = Object.prototype.toString;
    paramArg__y.exports = function(entryRef) {
      var resultRef = localVar_wy.call(entryRef),
        countRef = resultRef === "[object Arguments]";
      return countRef || (countRef = resultRef !== "[object Array]" && entryRef !== null &&
        typeof entryRef == "object" && typeof entryRef.length == "number" && entryRef
        .length >= 0 && localVar_wy.call(entryRef.callee) === "[object Function]"), countRef
    }
  });
  var fnVar_My = defineCommonjsModule((paramArg_b7, paramArg_Ny) => {
    "use strict";
    var localVar_Cy;
    Object.keys || (localVar_sa = Object.prototype.hasOwnProperty, localVar__f = Object
      .prototype.toString, localVar_ky = fnVar_wf(), localVar_kf = Object.prototype
      .propertyIsEnumerable, localVar_Ey = !localVar_kf.call({
        toString: null
      }, "toString"), localVar_Ty = localVar_kf.call(function() {}, "prototype"), localVar_ca = [
        "toString", "toLocaleString", "valueOf", "hasOwnProperty",
        "isPrototypeOf", "propertyIsEnumerable", "constructor"
      ], localVar_Ds = function(valueRef) {
        var entryRef = valueRef.constructor;
        return entryRef && entryRef.prototype === valueRef
      }, localVar_Sy = {
        $applicationCache: !0,
        $console: !0,
        $external: !0,
        $frame: !0,
        $frameElement: !0,
        $frames: !0,
        $innerHeight: !0,
        $innerWidth: !0,
        $onmozfullscreenchange: !0,
        $onmozfullscreenerror: !0,
        $outerHeight: !0,
        $outerWidth: !0,
        $pageXOffset: !0,
        $pageYOffset: !0,
        $parent: !0,
        $scrollLeft: !0,
        $scrollTop: !0,
        $scrollX: !0,
        $scrollY: !0,
        $self: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0,
        $window: !0
      }, localVar_Oy = function() {
        if (typeof window > "u") return !1;
        for (var valueRef in window) try {
          if (!localVar_Sy["$" + valueRef] && localVar_sa.call(window, valueRef) && window[valueRef] !==
            null && typeof window[valueRef] == "object") try {
            localVar_Ds(window[valueRef])
          } catch {
            return !0
          }
        } catch {
          return !0
        }
        return !1
      }(), localVar_Py = function(valueRef) {
        if (typeof window > "u" || !localVar_Oy) return localVar_Ds(valueRef);
        try {
          return localVar_Ds(valueRef)
        } catch {
          return !1
        }
      }, localVar_Cy = function(entryRef) {
        var resultRef = entryRef !== null && typeof entryRef == "object",
          countRef = localVar__f.call(entryRef) === "[object Function]",
          optionRef = localVar_ky(entryRef),
          indexRef = resultRef && localVar__f.call(entryRef) === "[object String]",
          accumulator = [];
        if (!resultRef && !countRef && !optionRef) throw new TypeError(
          "Object.keys called on a non-object");
        var listRef = localVar_Ty && countRef;
        if (indexRef && entryRef.length > 0 && !localVar_sa.call(entryRef, 0))
          for (var configRef = 0; configRef < entryRef.length; ++configRef) accumulator.push(String(configRef));
        if (optionRef && entryRef.length > 0)
          for (var unitRef = 0; unitRef < entryRef.length; ++unitRef) accumulator.push(String(unitRef));
        else
          for (var propRef in entryRef) !(listRef && propRef === "prototype") && localVar_sa.call(entryRef, propRef) &&
            accumulator.push(String(propRef));
        if (localVar_Ey)
          for (var funcRef = localVar_Py(entryRef), coordY = 0; coordY < localVar_ca.length; ++coordY) !(funcRef && localVar_ca[
            coordY] === "constructor") && localVar_sa.call(entryRef, localVar_ca[coordY]) && accumulator.push(localVar_ca[
            coordY]);
        return accumulator
      });
    var localVar_sa, localVar__f, localVar_ky, localVar_kf, localVar_Ey, localVar_Ty, localVar_ca, localVar_Ds, localVar_Sy, localVar_Oy, localVar_Py;
    paramArg_Ny.exports = localVar_Cy
  });
  var fnVar_zs = defineCommonjsModule((paramArg_v7, paramArg_Ry) => {
    "use strict";
    var localVar_c6 = Array.prototype.slice,
      localVar_u6 = fnVar_wf(),
      objHelper_Ay = Object.keys,
      localVar_Fs = objHelper_Ay ? function(entryRef) {
        return objHelper_Ay(entryRef)
      } : fnVar_My(),
      objHelper_jy = Object.keys;
    localVar_Fs.shim = function() {
      if (Object.keys) {
        var entryRef = function() {
          var resultRef = Object.keys(arguments);
          return resultRef && resultRef.length === arguments.length
        }(1, 2);
        entryRef || (Object.keys = function(countRef) {
          return localVar_u6(countRef) ? objHelper_jy(localVar_c6.call(countRef)) : objHelper_jy(countRef)
        })
      } else Object.keys = localVar_Fs;
      return Object.keys || localVar_Fs
    };
    paramArg_Ry.exports = localVar_Fs
  });
  var fnVar_ua = defineCommonjsModule((paramArg_y7, paramArg_Iy) => {
    "use strict";
    paramArg_Iy.exports = function() {
      if (typeof Symbol != "function" || typeof Object
        .getOwnPropertySymbols != "function") return !1;
      if (typeof Symbol.iterator == "symbol") return !0;
      var entryRef = {},
        resultRef = Symbol("test"),
        countRef = Object(resultRef);
      if (typeof resultRef == "string" || Object.prototype.toString.call(resultRef) !==
        "[object Symbol]" || Object.prototype.toString.call(countRef) !==
        "[object Symbol]") return !1;
      var optionRef = 42;
      entryRef[resultRef] = optionRef;
      for (resultRef in entryRef) return !1;
      if (typeof Object.keys == "function" && Object.keys(entryRef)
        .length !== 0 || typeof Object.getOwnPropertyNames ==
        "function" && Object.getOwnPropertyNames(entryRef)
        .length !== 0) return !1;
      var indexRef = Object.getOwnPropertySymbols(entryRef);
      if (indexRef.length !== 1 || indexRef[0] !== resultRef || !Object.prototype
        .propertyIsEnumerable.call(entryRef, resultRef)) return !1;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var accumulator = Object.getOwnPropertyDescriptor(entryRef, resultRef);
        if (accumulator.value !== optionRef || accumulator.enumerable !== !0) return !1
      }
      return !0
    }
  });
  var fnVar_Ls = defineCommonjsModule((paramArg_x7, paramArg_Fy) => {
    "use strict";
    var localVar_Dy = typeof Symbol < "u" && Symbol,
      localVar_d6 = fnVar_ua();
    paramArg_Fy.exports = function() {
      return typeof localVar_Dy != "function" || typeof Symbol != "function" ||
        typeof localVar_Dy("foo") != "symbol" || typeof Symbol("bar") !=
        "symbol" ? !1 : localVar_d6()
    }
  });
  var fnVar_$y = defineCommonjsModule((paramArg_w7, paramArg_Ly) => {
    "use strict";
    var lookupTable_zy = {
        foo: {}
      },
      localVar_p6 = Object;
    paramArg_Ly.exports = function() {
      return {
        __proto__: lookupTable_zy
      }.foo === lookupTable_zy.foo && !({
          __proto__: null
        }
        instanceof localVar_p6)
    }
  });
  var fnVar_Uy = defineCommonjsModule((paramArg__7, paramArg_By) => {
    "use strict";
    var strVar_f6 = "Function.prototype.bind called on incompatible ",
      localVar_m6 = Object.prototype.toString,
      localVar_g6 = Math.max,
      strVar_h6 = "[object Function]",
      fnVar_qy = function(entryRef, resultRef) {
        for (var countRef = [], optionRef = 0; optionRef < entryRef.length; optionRef += 1) countRef[optionRef] = entryRef[optionRef];
        for (var indexRef = 0; indexRef < resultRef.length; indexRef += 1) countRef[indexRef + entryRef.length] = resultRef[indexRef];
        return countRef
      },
      fnVar_b6 = function(entryRef, resultRef) {
        for (var countRef = [], optionRef = resultRef || 0, indexRef = 0; optionRef < entryRef.length; optionRef += 1, indexRef += 1)
          countRef[indexRef] = entryRef[optionRef];
        return countRef
      },
      fnVar_v6 = function(valueRef, entryRef) {
        for (var resultRef = "", countRef = 0; countRef < valueRef.length; countRef += 1) resultRef += valueRef[countRef], countRef + 1 < valueRef
          .length && (resultRef += entryRef);
        return resultRef
      };
    paramArg_By.exports = function(entryRef) {
      var resultRef = this;
      if (typeof resultRef != "function" || localVar_m6.apply(resultRef) !== strVar_h6)
      throw new TypeError(strVar_f6 + resultRef);
      for (var countRef = fnVar_b6(arguments, 1), optionRef, indexRef = function() {
          if (this instanceof optionRef) {
            var propRef = resultRef.apply(this, fnVar_qy(countRef, arguments));
            return Object(propRef) === propRef ? propRef : this
          }
          return resultRef.apply(entryRef, fnVar_qy(countRef, arguments))
        }, accumulator = localVar_g6(0, resultRef.length - countRef.length), listRef = [], configRef = 0; configRef < accumulator; configRef++) listRef[
        configRef] = "$" + configRef;
      if (optionRef = Function("binder", "return function (" + fnVar_v6(listRef, ",") +
          "){ return binder.apply(this,arguments); }")(indexRef), resultRef
        .prototype) {
        var unitRef = function() {};
        unitRef.prototype = resultRef.prototype, optionRef.prototype = new unitRef, unitRef.prototype =
          null
      }
      return optionRef
    }
  });
  var fnVar_$s = defineCommonjsModule((paramArg_k7, paramArg_Wy) => {
    "use strict";
    var localVar_y6 = fnVar_Uy();
    paramArg_Wy.exports = Function.prototype.bind || localVar_y6
  });
  var fnVar_Ef = defineCommonjsModule((paramArg_E7, paramArg_Hy) => {
    "use strict";
    var localVar_x6 = Function.prototype.call,
      localVar_w6 = Object.prototype.hasOwnProperty,
      localVar__6 = fnVar_$s();
    paramArg_Hy.exports = localVar__6.call(localVar_x6, localVar_w6)
  });
  var fnVar_ar = defineCommonjsModule((paramArg_T7, paramArg_Yy) => {
    "use strict";
    var localVar_Le, localVar_Qo = SyntaxError,
      localVar_Qy = Function,
      localVar_Go = TypeError,
      fnVar_Tf = function(valueRef) {
        try {
          return localVar_Qy('"use strict"; return (' + valueRef + ").constructor;")()
        } catch {}
      },
      objHelper_ro = Object.getOwnPropertyDescriptor;
    if (objHelper_ro) try {
      objHelper_ro({}, "")
    } catch {
      objHelper_ro = null
    }
    var fnVar_Sf = function() {
        throw new localVar_Go
      },
      localVar_k6 = objHelper_ro ? function() {
        try {
          return arguments.callee, fnVar_Sf
        } catch {
          try {
            return objHelper_ro(arguments, "callee")
              .get
          } catch {
            return fnVar_Sf
          }
        }
      }() : fnVar_Sf,
      localVar_Vo = fnVar_Ls()(),
      localVar_E6 = fnVar_$y()(),
      objHelper_Nt = Object.getPrototypeOf || (localVar_E6 ? function(valueRef) {
        return valueRef.__proto__
      } : null),
      lookupTable_Ko = {},
      localVar_T6 = typeof Uint8Array > "u" || !objHelper_Nt ? localVar_Le : objHelper_Nt(Uint8Array),
      lookupTable_no = {
        "%AggregateError%": typeof AggregateError > "u" ?
          localVar_Le : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer > "u" ? localVar_Le : ArrayBuffer,
        "%ArrayIteratorPrototype%": localVar_Vo && objHelper_Nt ? objHelper_Nt([][Symbol.iterator]
          ()) : localVar_Le,
        "%AsyncFromSyncIteratorPrototype%": localVar_Le,
        "%AsyncFunction%": lookupTable_Ko,
        "%AsyncGenerator%": lookupTable_Ko,
        "%AsyncGeneratorFunction%": lookupTable_Ko,
        "%AsyncIteratorPrototype%": lookupTable_Ko,
        "%Atomics%": typeof Atomics > "u" ? localVar_Le : Atomics,
        "%BigInt%": typeof BigInt > "u" ? localVar_Le : BigInt,
        "%BigInt64Array%": typeof BigInt64Array > "u" ?
          localVar_Le : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array > "u" ?
          localVar_Le : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView > "u" ? localVar_Le : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": Error,
        "%eval%": eval,
        "%EvalError%": EvalError,
        "%Float32Array%": typeof Float32Array > "u" ? localVar_Le : Float32Array,
        "%Float64Array%": typeof Float64Array > "u" ? localVar_Le : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ?
          localVar_Le : FinalizationRegistry,
        "%Function%": localVar_Qy,
        "%GeneratorFunction%": lookupTable_Ko,
        "%Int8Array%": typeof Int8Array > "u" ? localVar_Le : Int8Array,
        "%Int16Array%": typeof Int16Array > "u" ? localVar_Le : Int16Array,
        "%Int32Array%": typeof Int32Array > "u" ? localVar_Le : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": localVar_Vo && objHelper_Nt ? objHelper_Nt(objHelper_Nt([][Symbol.iterator]
          ())) : localVar_Le,
        "%JSON%": typeof JSON == "object" ? JSON : localVar_Le,
        "%Map%": typeof Map > "u" ? localVar_Le : Map,
        "%MapIteratorPrototype%": typeof Map > "u" || !localVar_Vo || !objHelper_Nt ?
          localVar_Le : objHelper_Nt(new Map()[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": Object,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise > "u" ? localVar_Le : Promise,
        "%Proxy%": typeof Proxy > "u" ? localVar_Le : Proxy,
        "%RangeError%": RangeError,
        "%ReferenceError%": ReferenceError,
        "%Reflect%": typeof Reflect > "u" ? localVar_Le : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set > "u" ? localVar_Le : Set,
        "%SetIteratorPrototype%": typeof Set > "u" || !localVar_Vo || !objHelper_Nt ?
          localVar_Le : objHelper_Nt(new Set()[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ?
          localVar_Le : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": localVar_Vo && objHelper_Nt ? objHelper_Nt("" [Symbol.iterator]
          ()) : localVar_Le,
        "%Symbol%": localVar_Vo ? Symbol : localVar_Le,
        "%SyntaxError%": localVar_Qo,
        "%ThrowTypeError%": localVar_k6,
        "%TypedArray%": localVar_T6,
        "%TypeError%": localVar_Go,
        "%Uint8Array%": typeof Uint8Array > "u" ? localVar_Le : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ?
          localVar_Le : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array > "u" ? localVar_Le : Uint16Array,
        "%Uint32Array%": typeof Uint32Array > "u" ? localVar_Le : Uint32Array,
        "%URIError%": URIError,
        "%WeakMap%": typeof WeakMap > "u" ? localVar_Le : WeakMap,
        "%WeakRef%": typeof WeakRef > "u" ? localVar_Le : WeakRef,
        "%WeakSet%": typeof WeakSet > "u" ? localVar_Le : WeakSet
      };
    if (objHelper_Nt) try {
      null.error
    } catch (valueRef) {
      fnVar_Vy = objHelper_Nt(objHelper_Nt(valueRef)), lookupTable_no["%Error.prototype%"] = fnVar_Vy
    }
    var fnVar_Vy, fnVar_S6 = function valueRef(entryRef) {
        var resultRef;
        if (entryRef === "%AsyncFunction%") resultRef = fnVar_Tf("async function () {}");
        else if (entryRef === "%GeneratorFunction%") resultRef = fnVar_Tf("function* () {}");
        else if (entryRef === "%AsyncGeneratorFunction%") resultRef = fnVar_Tf(
          "async function* () {}");
        else if (entryRef === "%AsyncGenerator%") {
          var countRef = valueRef("%AsyncGeneratorFunction%");
          countRef && (resultRef = countRef.prototype)
        } else if (entryRef === "%AsyncIteratorPrototype%") {
          var optionRef = valueRef("%AsyncGenerator%");
          optionRef && objHelper_Nt && (resultRef = objHelper_Nt(optionRef.prototype))
        }
        return lookupTable_no[entryRef] = resultRef, resultRef
      },
      lookupTable_Ky = {
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction",
          "prototype", "prototype"
        ],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype",
          "prototype"
        ],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer",
          "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray",
          "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      },
      localVar_da = fnVar_$s(),
      localVar_qs = fnVar_Ef(),
      localVar_O6 = localVar_da.call(Function.call, Array.prototype.concat),
      localVar_P6 = localVar_da.call(Function.apply, Array.prototype.splice),
      localVar_Gy = localVar_da.call(Function.call, String.prototype.replace),
      localVar_Bs = localVar_da.call(Function.call, String.prototype.slice),
      localVar_C6 = localVar_da.call(Function.call, RegExp.prototype.exec),
      localVar_N6 =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
      localVar_M6 = /\\(\\)?/g,
      fnVar_A6 = function(entryRef) {
        var resultRef = localVar_Bs(entryRef, 0, 1),
          countRef = localVar_Bs(entryRef, -1);
        if (resultRef === "%" && countRef !== "%") throw new localVar_Qo(
          "invalid intrinsic syntax, expected closing `%`");
        if (countRef === "%" && resultRef !== "%") throw new localVar_Qo(
          "invalid intrinsic syntax, expected opening `%`");
        var optionRef = [];
        return localVar_Gy(entryRef, localVar_N6, function(indexRef, accumulator, listRef, configRef) {
          optionRef[optionRef.length] = listRef ? localVar_Gy(configRef, localVar_M6, "$1") : accumulator || indexRef
        }), optionRef
      },
      fnVar_j6 = function(entryRef, resultRef) {
        var countRef = entryRef,
          optionRef;
        if (localVar_qs(lookupTable_Ky, countRef) && (optionRef = lookupTable_Ky[countRef], countRef = "%" + optionRef[0] + "%"), localVar_qs(lookupTable_no, countRef)) {
          var indexRef = lookupTable_no[countRef];
          if (indexRef === lookupTable_Ko && (indexRef = fnVar_S6(countRef)), typeof indexRef > "u" && !resultRef) throw new localVar_Go(
            "intrinsic " + entryRef +
            " exists, but is not available. Please file an issue!");
          return {
            alias: optionRef,
            name: countRef,
            value: indexRef
          }
        }
        throw new localVar_Qo("intrinsic " + entryRef + " does not exist!")
      };
    paramArg_Yy.exports = function(entryRef, resultRef) {
      if (typeof entryRef != "string" || entryRef.length === 0) throw new localVar_Go(
        "intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof resultRef != "boolean") throw new localVar_Go(
        '"allowMissing" argument must be a boolean');
      if (localVar_C6(/^%?[^%]*%?$/, entryRef) === null) throw new localVar_Qo(
        "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
        );
      var countRef = fnVar_A6(entryRef),
        optionRef = countRef.length > 0 ? countRef[0] : "",
        indexRef = fnVar_j6("%" + optionRef + "%", resultRef),
        accumulator = indexRef.name,
        listRef = indexRef.value,
        configRef = !1,
        unitRef = indexRef.alias;
      unitRef && (optionRef = unitRef[0], localVar_P6(countRef, localVar_O6([0, 1], unitRef)));
      for (var propRef = 1, funcRef = !0; propRef < countRef.length; propRef += 1) {
        var coordY = countRef[propRef],
          outputRef = localVar_Bs(coordY, 0, 1),
          labelRef = localVar_Bs(coordY, -1);
        if ((outputRef === '"' || outputRef === "'" || outputRef === "`" || labelRef === '"' || labelRef ===
            "'" || labelRef === "`") && outputRef !== labelRef) throw new localVar_Qo(
          "property names with quotes must have matching quotes");
        if ((coordY === "constructor" || !funcRef) && (configRef = !0), optionRef += "." + coordY, accumulator =
          "%" + optionRef + "%", localVar_qs(lookupTable_no, accumulator)) listRef = lookupTable_no[accumulator];
        else if (listRef != null) {
          if (!(coordY in listRef)) {
            if (!resultRef) throw new localVar_Go("base intrinsic for " + entryRef +
              " exists, but the property is not available.");
            return
          }
          if (objHelper_ro && propRef + 1 >= countRef.length) {
            var depthRef = objHelper_ro(listRef, coordY);
            funcRef = !!depthRef, funcRef && "get" in depthRef && !("originalValue" in depthRef.get) ?
              listRef = depthRef.get : listRef = listRef[coordY]
          } else funcRef = localVar_qs(listRef, coordY), listRef = listRef[coordY];
          funcRef && !configRef && (lookupTable_no[accumulator] = listRef)
        }
      }
      return listRef
    }
  });
  var fnVar_pa = defineCommonjsModule((paramArg_S7, paramArg_Xy) => {
    "use strict";
    var localVar_R6 = fnVar_ar(),
      objHelper_Of = localVar_R6("%Object.defineProperty%", !0),
      fnVar_Pf = function() {
        if (objHelper_Of) try {
          return objHelper_Of({}, "a", {
            value: 1
          }), !0
        } catch {
          return !1
        }
        return !1
      };
    fnVar_Pf.hasArrayLengthDefineBug = function() {
      if (!fnVar_Pf()) return null;
      try {
        return objHelper_Of([], "length", {
            value: 1
          })
          .length !== 1
      } catch {
        return !0
      }
    };
    paramArg_Xy.exports = fnVar_Pf
  });
  var fnVar_Ws = defineCommonjsModule((paramArg_O7, paramArg_Jy) => {
    "use strict";
    var localVar_I6 = fnVar_ar(),
      objHelper_Us = localVar_I6("%Object.getOwnPropertyDescriptor%", !0);
    if (objHelper_Us) try {
      objHelper_Us([], "length")
    } catch {
      objHelper_Us = null
    }
    paramArg_Jy.exports = objHelper_Us
  });
  var fnVar_Hs = defineCommonjsModule((paramArg_P7, paramArg_ex) => {
    "use strict";
    var localVar_D6 = fnVar_pa()(),
      localVar_Cf = fnVar_ar(),
      objHelper_fa = localVar_D6 && localVar_Cf("%Object.defineProperty%", !0);
    if (objHelper_fa) try {
      objHelper_fa({}, "a", {
        value: 1
      })
    } catch {
      objHelper_fa = !1
    }
    var localVar_F6 = localVar_Cf("%SyntaxError%"),
      localVar_Yo = localVar_Cf("%TypeError%"),
      localVar_Zy = fnVar_Ws();
    paramArg_ex.exports = function(entryRef, resultRef, countRef) {
      if (!entryRef || typeof entryRef != "object" && typeof entryRef != "function")
      throw new localVar_Yo("`obj` must be an object or a function`");
      if (typeof resultRef != "string" && typeof resultRef != "symbol") throw new localVar_Yo(
        "`property` must be a string or a symbol`");
      if (arguments.length > 3 && typeof arguments[3] != "boolean" &&
        arguments[3] !== null) throw new localVar_Yo(
        "`nonEnumerable`, if provided, must be a boolean or null");
      if (arguments.length > 4 && typeof arguments[4] != "boolean" &&
        arguments[4] !== null) throw new localVar_Yo(
        "`nonWritable`, if provided, must be a boolean or null");
      if (arguments.length > 5 && typeof arguments[5] != "boolean" &&
        arguments[5] !== null) throw new localVar_Yo(
        "`nonConfigurable`, if provided, must be a boolean or null");
      if (arguments.length > 6 && typeof arguments[6] != "boolean")
        throw new localVar_Yo("`loose`, if provided, must be a boolean");
      var optionRef = arguments.length > 3 ? arguments[3] : null,
        indexRef = arguments.length > 4 ? arguments[4] : null,
        accumulator = arguments.length > 5 ? arguments[5] : null,
        listRef = arguments.length > 6 ? arguments[6] : !1,
        configRef = !!localVar_Zy && localVar_Zy(entryRef, resultRef);
      if (objHelper_fa) objHelper_fa(entryRef, resultRef, {
        configurable: accumulator === null && configRef ? configRef.configurable : !accumulator,
        enumerable: optionRef === null && configRef ? configRef.enumerable : !optionRef,
        value: countRef,
        writable: indexRef === null && configRef ? configRef.writable : !indexRef
      });
      else if (listRef || !optionRef && !indexRef && !accumulator) entryRef[resultRef] = countRef;
      else throw new localVar_F6(
        "This environment does not support defining a property as non-configurable, non-writable, or non-enumerable."
        )
    }
  });
  var fnVar_Pn = defineCommonjsModule((paramArg_C7, paramArg_ox) => {
    "use strict";
    var localVar_z6 = fnVar_zs(),
      strVar_L6 = typeof Symbol == "function" && typeof Symbol("foo") ==
      "symbol",
      localVar_$6 = Object.prototype.toString,
      localVar_q6 = Array.prototype.concat,
      localVar_tx = fnVar_Hs(),
      fnVar_B6 = function(valueRef) {
        return typeof valueRef == "function" && localVar_$6.call(valueRef) ===
          "[object Function]"
      },
      localVar_rx = fnVar_pa()(),
      fnVar_U6 = function(valueRef, entryRef, resultRef, countRef) {
        if (entryRef in valueRef) {
          if (countRef === !0) {
            if (valueRef[entryRef] === resultRef) return
          } else if (!fnVar_B6(countRef) || !countRef()) return
        }
        localVar_rx ? localVar_tx(valueRef, entryRef, resultRef, !0) : localVar_tx(valueRef, entryRef, resultRef)
      },
      fnVar_nx = function(valueRef, entryRef) {
        var resultRef = arguments.length > 2 ? arguments[2] : {},
          countRef = localVar_z6(entryRef);
        strVar_L6 && (countRef = localVar_q6.call(countRef, Object.getOwnPropertySymbols(entryRef)));
        for (var optionRef = 0; optionRef < countRef.length; optionRef += 1) fnVar_U6(valueRef, countRef[optionRef], entryRef[countRef[optionRef]], resultRef[countRef[
          optionRef]])
      };
    fnVar_nx.supportsDescriptors = !!localVar_rx;
    paramArg_ox.exports = fnVar_nx
  });
  var fnVar_ux = defineCommonjsModule((paramArg_N7, paramArg_cx) => {
    "use strict";
    var localVar_sx = fnVar_ar(),
      localVar_ix = fnVar_Hs(),
      localVar_W6 = fnVar_pa()(),
      localVar_ax = fnVar_Ws(),
      localVar_lx = localVar_sx("%TypeError%"),
      localVar_H6 = localVar_sx("%Math.floor%");
    paramArg_cx.exports = function(entryRef, resultRef) {
      if (typeof entryRef != "function") throw new localVar_lx(
      "`fn` is not a function");
      if (typeof resultRef != "number" || resultRef < 0 || resultRef > 4294967295 || localVar_H6(resultRef) !==
        resultRef) throw new localVar_lx("`length` must be a positive 32-bit integer");
      var countRef = arguments.length > 2 && !!arguments[2],
        optionRef = !0,
        indexRef = !0;
      if ("length" in entryRef && localVar_ax) {
        var accumulator = localVar_ax(entryRef, "length");
        accumulator && !accumulator.configurable && (optionRef = !1), accumulator && !accumulator.writable && (indexRef = !1)
      }
      return (optionRef || indexRef || !countRef) && (localVar_W6 ? localVar_ix(entryRef, "length", resultRef, !0, !0) : localVar_ix(entryRef,
        "length", resultRef)), entryRef
    }
  });
  var fnVar_oo = defineCommonjsModule((paramArg_M7, paramArg_Vs) => {
    "use strict";
    var localVar_Nf = fnVar_$s(),
      localVar_Xo = fnVar_ar(),
      localVar_V6 = fnVar_ux(),
      localVar_K6 = localVar_Xo("%TypeError%"),
      localVar_px = localVar_Xo("%Function.prototype.apply%"),
      localVar_fx = localVar_Xo("%Function.prototype.call%"),
      localVar_mx = localVar_Xo("%Reflect.apply%", !0) || localVar_Nf.call(localVar_fx, localVar_px),
      objHelper_ma = localVar_Xo("%Object.defineProperty%", !0),
      localVar_G6 = localVar_Xo("%Math.max%");
    if (objHelper_ma) try {
      objHelper_ma({}, "a", {
        value: 1
      })
    } catch {
      objHelper_ma = null
    }
    paramArg_Vs.exports = function(entryRef) {
      if (typeof entryRef != "function") throw new localVar_K6(
      "a function is required");
      var resultRef = localVar_mx(localVar_Nf, localVar_fx, arguments);
      return localVar_V6(resultRef, 1 + localVar_G6(0, entryRef.length - (arguments.length - 1)), !0)
    };
    var fnVar_dx = function() {
      return localVar_mx(localVar_Nf, localVar_px, arguments)
    };
    objHelper_ma ? objHelper_ma(paramArg_Vs.exports, "apply", {
      value: fnVar_dx
    }) : paramArg_Vs.exports.apply = fnVar_dx
  });
  var fnVar_lr = defineCommonjsModule((paramArg_A7, paramArg_bx) => {
    "use strict";
    var localVar_gx = fnVar_ar(),
      localVar_hx = fnVar_oo(),
      localVar_Q6 = localVar_hx(localVar_gx("String.prototype.indexOf"));
    paramArg_bx.exports = function(entryRef, resultRef) {
      var countRef = localVar_gx(entryRef, !!resultRef);
      return typeof countRef == "function" && localVar_Q6(entryRef, ".prototype.") > -1 ? localVar_hx(
        countRef) : countRef
    }
  });
  var fnVar_Mf = defineCommonjsModule((paramArg_j7, paramArg__x) => {
    "use strict";
    var localVar_Y6 = fnVar_zs(),
      localVar_xx = fnVar_ua()(),
      localVar_wx = fnVar_lr(),
      localVar_vx = Object,
      localVar_X6 = localVar_wx("Array.prototype.push"),
      localVar_yx = localVar_wx("Object.prototype.propertyIsEnumerable"),
      objHelper_J6 = localVar_xx ? Object.getOwnPropertySymbols : null;
    paramArg__x.exports = function(entryRef, resultRef) {
      if (entryRef == null) throw new TypeError("target must be an object");
      var countRef = localVar_vx(entryRef);
      if (arguments.length === 1) return countRef;
      for (var optionRef = 1; optionRef < arguments.length; ++optionRef) {
        var indexRef = localVar_vx(arguments[optionRef]),
          accumulator = localVar_Y6(indexRef),
          listRef = localVar_xx && (Object.getOwnPropertySymbols || objHelper_J6);
        if (listRef)
          for (var configRef = listRef(indexRef), unitRef = 0; unitRef < configRef.length; ++unitRef) {
            var propRef = configRef[unitRef];
            localVar_yx(indexRef, propRef) && localVar_X6(accumulator, propRef)
          }
        for (var funcRef = 0; funcRef < accumulator.length; ++funcRef) {
          var coordY = accumulator[funcRef];
          if (localVar_yx(indexRef, coordY)) {
            var outputRef = indexRef[coordY];
            countRef[coordY] = outputRef
          }
        }
      }
      return countRef
    }
  });
  var fnVar_jf = defineCommonjsModule((paramArg_R7, paramArg_kx) => {
    "use strict";
    var localVar_Af = fnVar_Mf(),
      fnVar_Z6 = function() {
        if (!Object.assign) return !1;
        for (var valueRef = "abcdefghijklmnopqrst", entryRef = valueRef.split(""), resultRef = {}, countRef =
            0; countRef < entryRef.length; ++countRef) resultRef[entryRef[countRef]] = entryRef[countRef];
        var optionRef = Object.assign({}, resultRef),
          indexRef = "";
        for (var accumulator in optionRef) indexRef += accumulator;
        return valueRef !== indexRef
      },
      fnVar_eP = function() {
        if (!Object.assign || !Object.preventExtensions) return !1;
        var valueRef = Object.preventExtensions({
          1: 2
        });
        try {
          Object.assign(valueRef, "xy")
        } catch {
          return valueRef[1] === "y"
        }
        return !1
      };
    paramArg_kx.exports = function() {
      return !Object.assign || fnVar_Z6() || fnVar_eP() ? localVar_Af : Object.assign
    }
  });
  var fnVar_Tx = defineCommonjsModule((paramArg_I7, paramArg_Ex) => {
    "use strict";
    var localVar_tP = fnVar_Pn(),
      localVar_rP = fnVar_jf();
    paramArg_Ex.exports = function() {
      var entryRef = localVar_rP();
      return localVar_tP(Object, {
        assign: entryRef
      }, {
        assign: function() {
          return Object.assign !== entryRef
        }
      }), entryRef
    }
  });
  var fnVar_Cx = defineCommonjsModule((paramArg_D7, paramArg_Px) => {
    "use strict";
    var localVar_nP = fnVar_Pn(),
      localVar_oP = fnVar_oo(),
      localVar_iP = fnVar_Mf(),
      localVar_Sx = fnVar_jf(),
      localVar_aP = fnVar_Tx(),
      localVar_lP = localVar_oP.apply(localVar_Sx()),
      fnVar_Ox = function(entryRef, resultRef) {
        return localVar_lP(Object, arguments)
      };
    localVar_nP(fnVar_Ox, {
      getPolyfill: localVar_Sx,
      implementation: localVar_iP,
      shim: localVar_aP
    });
    paramArg_Px.exports = fnVar_Ox
  });
  var fnVar_Mx = defineCommonjsModule((paramArg_F7, paramArg_Nx) => {
    "use strict";
    var fnVar_ha = function() {
        return typeof

        function() {}.name == "string"
      },
      objHelper_ga = Object.getOwnPropertyDescriptor;
    if (objHelper_ga) try {
      objHelper_ga([], "length")
    } catch {
      objHelper_ga = null
    }
    fnVar_ha.functionsHaveConfigurableNames = function() {
      if (!fnVar_ha() || !objHelper_ga) return !1;
      var entryRef = objHelper_ga(function() {}, "name");
      return !!entryRef && !!entryRef.configurable
    };
    var localVar_sP = Function.prototype.bind;
    fnVar_ha.boundFunctionsHaveNames = function() {
      return fnVar_ha() && typeof localVar_sP == "function" && function() {}.bind()
        .name !== ""
    };
    paramArg_Nx.exports = fnVar_ha
  });
  var fnVar_Rx = defineCommonjsModule((paramArg_z7, paramArg_jx) => {
    "use strict";
    var localVar_Ax = fnVar_Hs(),
      localVar_cP = fnVar_pa()(),
      localVar_uP = fnVar_Mx()
      .functionsHaveConfigurableNames(),
      localVar_dP = TypeError;
    paramArg_jx.exports = function(entryRef, resultRef) {
      if (typeof entryRef != "function") throw new localVar_dP(
      "`fn` is not a function");
      var countRef = arguments.length > 2 && !!arguments[2];
      return (!countRef || localVar_uP) && (localVar_cP ? localVar_Ax(entryRef, "name", resultRef, !0, !0) : localVar_Ax(entryRef,
        "name", resultRef)), entryRef
    }
  });
  var fnVar_Rf = defineCommonjsModule((paramArg_L7, paramArg_Ix) => {
    "use strict";
    var localVar_pP = fnVar_Rx(),
      localVar_fP = Object,
      localVar_mP = TypeError;
    paramArg_Ix.exports = localVar_pP(function() {
      if (this != null && this !== localVar_fP(this)) throw new localVar_mP(
        "RegExp.prototype.flags getter called on non-object");
      var entryRef = "";
      return this.hasIndices && (entryRef += "d"), this.global && (entryRef += "g"),
        this.ignoreCase && (entryRef += "i"), this.multiline && (entryRef += "m"),
        this.dotAll && (entryRef += "s"), this.unicode && (entryRef += "u"), this
        .unicodeSets && (entryRef += "v"), this.sticky && (entryRef += "y"), entryRef
    }, "get flags", !0)
  });
  var fnVar_If = defineCommonjsModule((paramArg_$7, paramArg_Dx) => {
    "use strict";
    var localVar_gP = fnVar_Rf(),
      localVar_hP = fnVar_Pn()
      .supportsDescriptors,
      objHelper_bP = Object.getOwnPropertyDescriptor;
    paramArg_Dx.exports = function() {
      if (localVar_hP && /a/mig.flags === "gim") {
        var entryRef = objHelper_bP(RegExp.prototype, "flags");
        if (entryRef && typeof entryRef.get == "function" && typeof RegExp.prototype
          .dotAll == "boolean" && typeof RegExp.prototype.hasIndices ==
          "boolean") {
          var resultRef = "",
            countRef = {};
          if (Object.defineProperty(countRef, "hasIndices", {
              get: function() {
                resultRef += "d"
              }
            }), Object.defineProperty(countRef, "sticky", {
              get: function() {
                resultRef += "y"
              }
            }), resultRef === "dy") return entryRef.get
        }
      }
      return localVar_gP
    }
  });
  var fnVar_Lx = defineCommonjsModule((paramArg_q7, paramArg_zx) => {
    "use strict";
    var localVar_vP = fnVar_Pn()
      .supportsDescriptors,
      localVar_yP = fnVar_If(),
      objHelper_xP = Object.getOwnPropertyDescriptor,
      objHelper_wP = Object.defineProperty,
      localVar__P = TypeError,
      objHelper_Fx = Object.getPrototypeOf,
      localVar_kP = /a/;
    paramArg_zx.exports = function() {
      if (!localVar_vP || !objHelper_Fx) throw new localVar__P(
        "RegExp.prototype.flags requires a true ES5 environment that supports property descriptors"
        );
      var entryRef = localVar_yP(),
        resultRef = objHelper_Fx(localVar_kP),
        countRef = objHelper_xP(resultRef, "flags");
      return (!countRef || countRef.get !== entryRef) && objHelper_wP(resultRef, "flags", {
        configurable: !0,
        enumerable: !1,
        get: entryRef
      }), entryRef
    }
  });
  var fnVar_Ux = defineCommonjsModule((paramArg_B7, paramArg_Bx) => {
    "use strict";
    var localVar_EP = fnVar_Pn(),
      localVar_TP = fnVar_oo(),
      localVar_SP = fnVar_Rf(),
      localVar_$x = fnVar_If(),
      localVar_OP = fnVar_Lx(),
      localVar_qx = localVar_TP(localVar_$x());
    localVar_EP(localVar_qx, {
      getPolyfill: localVar_$x,
      implementation: localVar_SP,
      shim: localVar_OP
    });
    paramArg_Bx.exports = localVar_qx
  });
  var fnVar_Cn = defineCommonjsModule((paramArg_U7, paramArg_Wx) => {
    "use strict";
    var localVar_PP = fnVar_ua();
    paramArg_Wx.exports = function() {
      return localVar_PP() && !!Symbol.toStringTag
    }
  });
  var fnVar_Ff = defineCommonjsModule((paramArg_W7, paramArg_Vx) => {
    "use strict";
    var localVar_CP = fnVar_Cn()(),
      localVar_NP = fnVar_lr(),
      localVar_Df = localVar_NP("Object.prototype.toString"),
      fnVar_Ks = function(entryRef) {
        return localVar_CP && entryRef && typeof entryRef == "object" && Symbol.toStringTag in
          entryRef ? !1 : localVar_Df(entryRef) === "[object Arguments]"
      },
      fnVar_Hx = function(entryRef) {
        return fnVar_Ks(entryRef) ? !0 : entryRef !== null && typeof entryRef == "object" && typeof entryRef
          .length == "number" && entryRef.length >= 0 && localVar_Df(entryRef) !==
          "[object Array]" && localVar_Df(entryRef.callee) === "[object Function]"
      },
      fnVar_MP = function() {
        return fnVar_Ks(arguments)
      }();
    fnVar_Ks.isLegacyArguments = fnVar_Hx;
    paramArg_Vx.exports = fnVar_MP ? fnVar_Ks : fnVar_Hx
  });
  var fnVar_Kx = defineCommonjsModule(() => {});
  var fnVar_f1 = defineCommonjsModule((paramArg_K7, paramArg_p1) => {
    var strVar_Kf = typeof Map == "function" && Map.prototype,
      objHelper_zf = Object.getOwnPropertyDescriptor && strVar_Kf ? Object
      .getOwnPropertyDescriptor(Map.prototype, "size") : null,
      strVar_Qs = strVar_Kf && objHelper_zf && typeof objHelper_zf.get == "function" ? objHelper_zf.get : null,
      localVar_Gx = strVar_Kf && Map.prototype.forEach,
      strVar_Gf = typeof Set == "function" && Set.prototype,
      objHelper_Lf = Object.getOwnPropertyDescriptor && strVar_Gf ? Object
      .getOwnPropertyDescriptor(Set.prototype, "size") : null,
      strVar_Ys = strVar_Gf && objHelper_Lf && typeof objHelper_Lf.get == "function" ? objHelper_Lf.get : null,
      localVar_Qx = strVar_Gf && Set.prototype.forEach,
      strVar_AP = typeof WeakMap == "function" && WeakMap.prototype,
      localVar_va = strVar_AP ? WeakMap.prototype.has : null,
      strVar_jP = typeof WeakSet == "function" && WeakSet.prototype,
      localVar_ya = strVar_jP ? WeakSet.prototype.has : null,
      strVar_RP = typeof WeakRef == "function" && WeakRef.prototype,
      localVar_Yx = strVar_RP ? WeakRef.prototype.deref : null,
      localVar_IP = Boolean.prototype.valueOf,
      localVar_DP = Object.prototype.toString,
      localVar_FP = Function.prototype.toString,
      localVar_zP = String.prototype.match,
      localVar_Qf = String.prototype.slice,
      localVar_Mn = String.prototype.replace,
      localVar_LP = String.prototype.toUpperCase,
      localVar_Xx = String.prototype.toLowerCase,
      localVar_a1 = RegExp.prototype.test,
      localVar_Jx = Array.prototype.concat,
      localVar_zr = Array.prototype.join,
      localVar_$P = Array.prototype.slice,
      localVar_Zx = Math.floor,
      strVar_Bf = typeof BigInt == "function" ? BigInt.prototype.valueOf : null,
      objHelper_$f = Object.getOwnPropertySymbols,
      strVar_Uf = typeof Symbol == "function" && typeof Symbol.iterator ==
      "symbol" ? Symbol.prototype.toString : null,
      strVar_Jo = typeof Symbol == "function" && typeof Symbol.iterator ==
      "object",
      strVar_$t = typeof Symbol == "function" && Symbol.toStringTag && (
        typeof Symbol.toStringTag === strVar_Jo || !0) ? Symbol.toStringTag :
      null,
      localVar_l1 = Object.prototype.propertyIsEnumerable,
      strVar_e1 = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object
        .getPrototypeOf) || ([].__proto__ === Array.prototype ? function(
        valueRef) {
        return valueRef.__proto__
      } : null);

    function helperFn_t1(valueRef, entryRef) {
      if (valueRef === 1 / 0 || valueRef === -1 / 0 || valueRef !== valueRef || valueRef && valueRef > -1e3 && valueRef <
        1e3 || localVar_a1.call(/e/, entryRef)) return entryRef;
      var resultRef = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof valueRef == "number") {
        var countRef = valueRef < 0 ? -localVar_Zx(-valueRef) : localVar_Zx(valueRef);
        if (countRef !== valueRef) {
          var optionRef = String(countRef),
            indexRef = localVar_Qf.call(entryRef, optionRef.length + 1);
          return localVar_Mn.call(optionRef, resultRef, "$&_") + "." + localVar_Mn.call(localVar_Mn.call(indexRef,
            /([0-9]{3})/g, "$&_"), /_$/, "")
        }
      }
      return localVar_Mn.call(entryRef, resultRef, "$&_")
    }
    var localVar_Wf = fnVar_Kx(),
      localVar_r1 = localVar_Wf.custom,
      localVar_n1 = helperFn_c1(localVar_r1) ? localVar_r1 : null;
    paramArg_p1.exports = function valueRef(entryRef, resultRef, countRef, optionRef) {
      var indexRef = resultRef || {};
      if (helperFn_Nn(indexRef, "quoteStyle") && indexRef.quoteStyle !== "single" && indexRef
        .quoteStyle !== "double") throw new TypeError(
        'option "quoteStyle" must be "single" or "double"');
      if (helperFn_Nn(indexRef, "maxStringLength") && (typeof indexRef.maxStringLength ==
          "number" ? indexRef.maxStringLength < 0 && indexRef.maxStringLength !== 1 /
          0 : indexRef.maxStringLength !== null)) throw new TypeError(
        'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
        );
      var accumulator = helperFn_Nn(indexRef, "customInspect") ? indexRef.customInspect : !0;
      if (typeof accumulator != "boolean" && accumulator !== "symbol") throw new TypeError(
        "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
        );
      if (helperFn_Nn(indexRef, "indent") && indexRef.indent !== null && indexRef.indent !== "	" && !(
          parseInt(indexRef.indent, 10) === indexRef.indent && indexRef.indent > 0))
      throw new TypeError(
          'option "indent" must be "\\t", an integer > 0, or `null`');
      if (helperFn_Nn(indexRef, "numericSeparator") && typeof indexRef.numericSeparator !=
        "boolean") throw new TypeError(
        'option "numericSeparator", if provided, must be `true` or `false`'
        );
      var listRef = indexRef.numericSeparator;
      if (typeof entryRef > "u") return "undefined";
      if (entryRef === null) return "null";
      if (typeof entryRef == "boolean") return entryRef ? "true" : "false";
      if (typeof entryRef == "string") return helperFn_d1(entryRef, indexRef);
      if (typeof entryRef == "number") {
        if (entryRef === 0) return 1 / 0 / entryRef > 0 ? "0" : "-0";
        var configRef = String(entryRef);
        return listRef ? helperFn_t1(entryRef, configRef) : configRef
      }
      if (typeof entryRef == "bigint") {
        var unitRef = String(entryRef) + "n";
        return listRef ? helperFn_t1(entryRef, unitRef) : unitRef
      }
      var propRef = typeof indexRef.depth > "u" ? 5 : indexRef.depth;
      if (typeof countRef > "u" && (countRef = 0), countRef >= propRef && propRef > 0 && typeof entryRef ==
        "object") return helperFn_Hf(entryRef) ? "[Array]" : "[Object]";
      var funcRef = helperFn_oC(indexRef, countRef);
      if (typeof optionRef > "u") optionRef = [];
      else if (helperFn_u1(optionRef, entryRef) >= 0) return "[Circular]";

      function coordY(paramArg_ne, headerRef, paramArg_de) {
        if (headerRef && (optionRef = localVar_$P.call(optionRef), optionRef.push(headerRef)), paramArg_de) {
          var lookupTable_be = {
            depth: indexRef.depth
          };
          return helperFn_Nn(indexRef, "quoteStyle") && (lookupTable_be.quoteStyle = indexRef.quoteStyle),
            valueRef(paramArg_ne, lookupTable_be, countRef + 1, optionRef)
        }
        return valueRef(paramArg_ne, indexRef, countRef + 1, optionRef)
      }
      if (typeof entryRef == "function" && !helperFn_o1(entryRef)) {
        var outputRef = helperFn_QP(entryRef),
          labelRef = helperFn_Gs(entryRef, coordY);
        return "[Function" + (outputRef ? ": " + outputRef : " (anonymous)") + "]" + (labelRef
          .length > 0 ? " { " + localVar_zr.call(labelRef, ", ") + " }" : "")
      }
      if (helperFn_c1(entryRef)) {
        var depthRef = strVar_Jo ? localVar_Mn.call(String(entryRef), /^(Symbol\(.*\))_[^)]*$/,
          "$1") : strVar_Uf.call(entryRef);
        return typeof entryRef == "object" && !strVar_Jo ? helperFn_ba(depthRef) : depthRef
      }
      if (helperFn_tC(entryRef)) {
        for (var handleRef = "<" + localVar_Xx.call(String(entryRef.nodeName)), widthRef = entryRef
            .attributes || [], dataRef = 0; dataRef < widthRef.length; dataRef++) handleRef += " " + widthRef[dataRef]
          .name + "=" + helperFn_s1(helperFn_qP(widthRef[dataRef].value), "double", indexRef);
        return handleRef += ">", entryRef.childNodes && entryRef.childNodes.length && (handleRef +=
          "..."), handleRef += "</" + localVar_Xx.call(String(entryRef.nodeName)) + ">", handleRef
      }
      if (helperFn_Hf(entryRef)) {
        if (entryRef.length === 0) return "[]";
        var errorRef = helperFn_Gs(entryRef, coordY);
        return funcRef && !helperFn_nC(errorRef) ? "[" + helperFn_Vf(errorRef, funcRef) + "]" : "[ " + localVar_zr.call(errorRef,
          ", ") + " ]"
      }
      if (helperFn_UP(entryRef)) {
        var typeRef = helperFn_Gs(entryRef, coordY);
        return !("cause" in Error.prototype) && "cause" in entryRef && !localVar_l1
          .call(entryRef, "cause") ? "{ [" + String(entryRef) + "] " + localVar_zr.call(localVar_Jx
            .call("[cause]: " + coordY(entryRef.cause), typeRef), ", ") + " }" : typeRef
          .length === 0 ? "[" + String(entryRef) + "]" : "{ [" + String(entryRef) +
          "] " + localVar_zr.call(typeRef, ", ") + " }"
      }
      if (typeof entryRef == "object" && accumulator) {
        if (localVar_n1 && typeof entryRef[localVar_n1] == "function" && localVar_Wf) return localVar_Wf(entryRef, {
          depth: propRef - countRef
        });
        if (accumulator !== "symbol" && typeof entryRef.inspect == "function") return entryRef
          .inspect()
      }
      if (helperFn_YP(entryRef)) {
        var stateRef = [];
        return localVar_Gx && localVar_Gx.call(entryRef, function(paramArg_ne, headerRef) {
          stateRef.push(coordY(headerRef, entryRef, !0) + " => " + coordY(paramArg_ne, entryRef))
        }), helperFn_i1("Map", strVar_Qs.call(entryRef), stateRef, funcRef)
      }
      if (helperFn_ZP(entryRef)) {
        var classRef = [];
        return localVar_Qx && localVar_Qx.call(entryRef, function(paramArg_ne) {
          classRef.push(coordY(paramArg_ne, entryRef))
        }), helperFn_i1("Set", strVar_Ys.call(entryRef), classRef, funcRef)
      }
      if (helperFn_XP(entryRef)) return helperFn_qf("WeakMap");
      if (helperFn_eC(entryRef)) return helperFn_qf("WeakSet");
      if (helperFn_JP(entryRef)) return helperFn_qf("WeakRef");
      if (helperFn_HP(entryRef)) return helperFn_ba(coordY(Number(entryRef)));
      if (helperFn_KP(entryRef)) return helperFn_ba(coordY(strVar_Bf.call(entryRef)));
      if (helperFn_VP(entryRef)) return helperFn_ba(localVar_IP.call(entryRef));
      if (helperFn_WP(entryRef)) return helperFn_ba(coordY(String(entryRef)));
      if (typeof window < "u" && entryRef === window)
      return "{ [object Window] }";
      if (entryRef === global) return "{ [object globalThis] }";
      if (!helperFn_BP(entryRef) && !helperFn_o1(entryRef)) {
        var keyRef = helperFn_Gs(entryRef, coordY),
          nodeRef = strVar_e1 ? strVar_e1(entryRef) === Object.prototype : entryRef instanceof Object || entryRef
          .constructor === Object,
          innerIndex = entryRef instanceof Object ? "" : "null prototype",
          jsonRef = !nodeRef && strVar_$t && Object(entryRef) === entryRef && strVar_$t in entryRef ? localVar_Qf.call(helperFn_An(entryRef), 8,
            -1) : innerIndex ? "Object" : "",
          moduleRef = nodeRef || typeof entryRef.constructor != "function" ? "" : entryRef
          .constructor.name ? entryRef.constructor.name + " " : "",
          localVar_fe = moduleRef + (jsonRef || innerIndex ? "[" + localVar_zr.call(localVar_Jx.call([], jsonRef || [],
          innerIndex || []), ": ") + "] " : "");
        return keyRef.length === 0 ? localVar_fe + "{}" : funcRef ? localVar_fe + "{" + helperFn_Vf(keyRef, funcRef) +
          "}" : localVar_fe + "{ " + localVar_zr.call(keyRef, ", ") + " }"
      }
      return String(entryRef)
    };

    function helperFn_s1(valueRef, entryRef, resultRef) {
      var countRef = (resultRef.quoteStyle || entryRef) === "double" ? '"' : "'";
      return countRef + valueRef + countRef
    }

    function helperFn_qP(valueRef) {
      return localVar_Mn.call(String(valueRef), /"/g, "&quot;")
    }

    function helperFn_Hf(valueRef) {
      return helperFn_An(valueRef) === "[object Array]" && (!strVar_$t || !(typeof valueRef ==
        "object" && strVar_$t in valueRef))
    }

    function helperFn_BP(valueRef) {
      return helperFn_An(valueRef) === "[object Date]" && (!strVar_$t || !(typeof valueRef ==
        "object" && strVar_$t in valueRef))
    }

    function helperFn_o1(valueRef) {
      return helperFn_An(valueRef) === "[object RegExp]" && (!strVar_$t || !(typeof valueRef ==
        "object" && strVar_$t in valueRef))
    }

    function helperFn_UP(valueRef) {
      return helperFn_An(valueRef) === "[object Error]" && (!strVar_$t || !(typeof valueRef ==
        "object" && strVar_$t in valueRef))
    }

    function helperFn_WP(valueRef) {
      return helperFn_An(valueRef) === "[object String]" && (!strVar_$t || !(typeof valueRef ==
        "object" && strVar_$t in valueRef))
    }

    function helperFn_HP(valueRef) {
      return helperFn_An(valueRef) === "[object Number]" && (!strVar_$t || !(typeof valueRef ==
        "object" && strVar_$t in valueRef))
    }

    function helperFn_VP(valueRef) {
      return helperFn_An(valueRef) === "[object Boolean]" && (!strVar_$t || !(typeof valueRef ==
        "object" && strVar_$t in valueRef))
    }

    function helperFn_c1(valueRef) {
      if (strVar_Jo) return valueRef && typeof valueRef == "object" && valueRef instanceof Symbol;
      if (typeof valueRef == "symbol") return !0;
      if (!valueRef || typeof valueRef != "object" || !strVar_Uf) return !1;
      try {
        return strVar_Uf.call(valueRef), !0
      } catch {}
      return !1
    }

    function helperFn_KP(valueRef) {
      if (!valueRef || typeof valueRef != "object" || !strVar_Bf) return !1;
      try {
        return strVar_Bf.call(valueRef), !0
      } catch {}
      return !1
    }
    var localVar_GP = Object.prototype.hasOwnProperty || function(valueRef) {
      return valueRef in this
    };

    function helperFn_Nn(valueRef, entryRef) {
      return localVar_GP.call(valueRef, entryRef)
    }

    function helperFn_An(valueRef) {
      return localVar_DP.call(valueRef)
    }

    function helperFn_QP(valueRef) {
      if (valueRef.name) return valueRef.name;
      var entryRef = localVar_zP.call(localVar_FP.call(valueRef), /^function\s*([\w$]+)/);
      return entryRef ? entryRef[1] : null
    }

    function helperFn_u1(valueRef, entryRef) {
      if (valueRef.indexOf) return valueRef.indexOf(entryRef);
      for (var resultRef = 0, countRef = valueRef.length; resultRef < countRef; resultRef++)
        if (valueRef[resultRef] === entryRef) return resultRef;
      return -1
    }

    function helperFn_YP(valueRef) {
      if (!strVar_Qs || !valueRef || typeof valueRef != "object") return !1;
      try {
        strVar_Qs.call(valueRef);
        try {
          strVar_Ys.call(valueRef)
        } catch {
          return !0
        }
        return valueRef instanceof Map
      } catch {}
      return !1
    }

    function helperFn_XP(valueRef) {
      if (!localVar_va || !valueRef || typeof valueRef != "object") return !1;
      try {
        localVar_va.call(valueRef, localVar_va);
        try {
          localVar_ya.call(valueRef, localVar_ya)
        } catch {
          return !0
        }
        return valueRef instanceof WeakMap
      } catch {}
      return !1
    }

    function helperFn_JP(valueRef) {
      if (!localVar_Yx || !valueRef || typeof valueRef != "object") return !1;
      try {
        return localVar_Yx.call(valueRef), !0
      } catch {}
      return !1
    }

    function helperFn_ZP(valueRef) {
      if (!strVar_Ys || !valueRef || typeof valueRef != "object") return !1;
      try {
        strVar_Ys.call(valueRef);
        try {
          strVar_Qs.call(valueRef)
        } catch {
          return !0
        }
        return valueRef instanceof Set
      } catch {}
      return !1
    }

    function helperFn_eC(valueRef) {
      if (!localVar_ya || !valueRef || typeof valueRef != "object") return !1;
      try {
        localVar_ya.call(valueRef, localVar_ya);
        try {
          localVar_va.call(valueRef, localVar_va)
        } catch {
          return !0
        }
        return valueRef instanceof WeakSet
      } catch {}
      return !1
    }

    function helperFn_tC(valueRef) {
      return !valueRef || typeof valueRef != "object" ? !1 : typeof HTMLElement < "u" &&
        valueRef instanceof HTMLElement ? !0 : typeof valueRef.nodeName == "string" &&
        typeof valueRef.getAttribute == "function"
    }

    function helperFn_d1(valueRef, entryRef) {
      if (valueRef.length > entryRef.maxStringLength) {
        var resultRef = valueRef.length - entryRef.maxStringLength,
          countRef = "... " + resultRef + " more character" + (resultRef > 1 ? "s" : "");
        return helperFn_d1(localVar_Qf.call(valueRef, 0, entryRef.maxStringLength), entryRef) + countRef
      }
      var optionRef = localVar_Mn.call(localVar_Mn.call(valueRef, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, helperFn_rC);
      return helperFn_s1(optionRef, "single", entryRef)
    }

    function helperFn_rC(valueRef) {
      var entryRef = valueRef.charCodeAt(0),
        resultRef = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        } [entryRef];
      return resultRef ? "\\" + resultRef : "\\x" + (entryRef < 16 ? "0" : "") + localVar_LP.call(entryRef
        .toString(16))
    }

    function helperFn_ba(valueRef) {
      return "Object(" + valueRef + ")"
    }

    function helperFn_qf(valueRef) {
      return valueRef + " { ? }"
    }

    function helperFn_i1(valueRef, entryRef, resultRef, countRef) {
      var optionRef = countRef ? helperFn_Vf(resultRef, countRef) : localVar_zr.call(resultRef, ", ");
      return valueRef + " (" + entryRef + ") {" + optionRef + "}"
    }

    function helperFn_nC(valueRef) {
      for (var entryRef = 0; entryRef < valueRef.length; entryRef++)
        if (helperFn_u1(valueRef[entryRef], `
`) >= 0) return !1;
      return !0
    }

    function helperFn_oC(valueRef, entryRef) {
      var resultRef;
      if (valueRef.indent === "	") resultRef = "	";
      else if (typeof valueRef.indent == "number" && valueRef.indent > 0) resultRef = localVar_zr.call(
        Array(valueRef.indent + 1), " ");
      else return null;
      return {
        base: resultRef,
        prev: localVar_zr.call(Array(entryRef + 1), resultRef)
      }
    }

    function helperFn_Vf(valueRef, entryRef) {
      if (valueRef.length === 0) return "";
      var resultRef = `
` + entryRef.prev + entryRef.base;
      return resultRef + localVar_zr.call(valueRef, "," + resultRef) + `
` + entryRef.prev
    }

    function helperFn_Gs(valueRef, entryRef) {
      var resultRef = helperFn_Hf(valueRef),
        countRef = [];
      if (resultRef) {
        countRef.length = valueRef.length;
        for (var optionRef = 0; optionRef < valueRef.length; optionRef++) countRef[optionRef] = helperFn_Nn(valueRef, optionRef) ? entryRef(valueRef[optionRef], valueRef) :
          ""
      }
      var indexRef = typeof objHelper_$f == "function" ? objHelper_$f(valueRef) : [],
        accumulator;
      if (strVar_Jo) {
        accumulator = {};
        for (var listRef = 0; listRef < indexRef.length; listRef++) accumulator["$" + indexRef[listRef]] = indexRef[listRef]
      }
      for (var configRef in valueRef) helperFn_Nn(valueRef, configRef) && (resultRef && String(Number(configRef)) === configRef && configRef < valueRef
        .length || strVar_Jo && accumulator["$" + configRef] instanceof Symbol || (localVar_a1.call(
          /[^\w$]/, configRef) ? countRef.push(entryRef(configRef, valueRef) + ": " + entryRef(valueRef[configRef], valueRef)) : countRef.push(
          configRef + ": " + entryRef(valueRef[configRef], valueRef))));
      if (typeof objHelper_$f == "function")
        for (var unitRef = 0; unitRef < indexRef.length; unitRef++) localVar_l1.call(valueRef, indexRef[unitRef]) && countRef.push(
          "[" + entryRef(indexRef[unitRef]) + "]: " + entryRef(valueRef[indexRef[unitRef]], valueRef));
      return countRef
    }
  });
  var fnVar_Jf = defineCommonjsModule((paramArg_G7, paramArg_m1) => {
    "use strict";
    var localVar_Yf = fnVar_ar(),
      localVar_Zo = fnVar_lr(),
      localVar_iC = fnVar_f1(),
      localVar_aC = localVar_Yf("%TypeError%"),
      localVar_Xs = localVar_Yf("%WeakMap%", !0),
      localVar_Js = localVar_Yf("%Map%", !0),
      localVar_lC = localVar_Zo("WeakMap.prototype.get", !0),
      localVar_sC = localVar_Zo("WeakMap.prototype.set", !0),
      localVar_cC = localVar_Zo("WeakMap.prototype.has", !0),
      localVar_uC = localVar_Zo("Map.prototype.get", !0),
      localVar_dC = localVar_Zo("Map.prototype.set", !0),
      localVar_pC = localVar_Zo("Map.prototype.has", !0),
      fnVar_Xf = function(valueRef, entryRef) {
        for (var resultRef = valueRef, countRef;
          (countRef = resultRef.next) !== null; resultRef = countRef)
          if (countRef.key === entryRef) return resultRef.next = countRef.next, countRef.next = valueRef.next, valueRef
            .next = countRef, countRef
      },
      fnVar_fC = function(valueRef, entryRef) {
        var resultRef = fnVar_Xf(valueRef, entryRef);
        return resultRef && resultRef.value
      },
      fnVar_mC = function(valueRef, entryRef, resultRef) {
        var countRef = fnVar_Xf(valueRef, entryRef);
        countRef ? countRef.value = resultRef : valueRef.next = {
          key: entryRef,
          next: valueRef.next,
          value: resultRef
        }
      },
      fnVar_gC = function(valueRef, entryRef) {
        return !!fnVar_Xf(valueRef, entryRef)
      };
    paramArg_m1.exports = function() {
      var entryRef, resultRef, countRef, optionRef = {
        assert: function(indexRef) {
          if (!optionRef.has(indexRef)) throw new localVar_aC(
            "Side channel does not contain " + localVar_iC(indexRef))
        },
        get: function(indexRef) {
          if (localVar_Xs && indexRef && (typeof indexRef == "object" || typeof indexRef ==
              "function")) {
            if (entryRef) return localVar_lC(entryRef, indexRef)
          } else if (localVar_Js) {
            if (resultRef) return localVar_uC(resultRef, indexRef)
          } else if (countRef) return fnVar_fC(countRef, indexRef)
        },
        has: function(indexRef) {
          if (localVar_Xs && indexRef && (typeof indexRef == "object" || typeof indexRef ==
              "function")) {
            if (entryRef) return localVar_cC(entryRef, indexRef)
          } else if (localVar_Js) {
            if (resultRef) return localVar_pC(resultRef, indexRef)
          } else if (countRef) return fnVar_gC(countRef, indexRef);
          return !1
        },
        set: function(indexRef, accumulator) {
          localVar_Xs && indexRef && (typeof indexRef == "object" || typeof indexRef ==
              "function") ? (entryRef || (entryRef = new localVar_Xs), localVar_sC(entryRef, indexRef, accumulator)) : localVar_Js ?
            (resultRef || (resultRef = new localVar_Js), localVar_dC(resultRef, indexRef, accumulator)) : (countRef || (countRef = {
              key: {},
              next: null
            }), fnVar_mC(countRef, indexRef, accumulator))
        }
      };
      return optionRef
    }
  });
  var fnVar_h1 = defineCommonjsModule((paramArg_Q7, paramArg_g1) => {
    "use strict";
    var localVar_hC = fnVar_ar(),
      localVar_bC = fnVar_Ef(),
      localVar_xa = fnVar_Jf()(),
      localVar_rn = localVar_hC("%TypeError%"),
      lookupTable_Zf = {
        assert: function(valueRef, entryRef) {
          if (!valueRef || typeof valueRef != "object" && typeof valueRef != "function")
            throw new localVar_rn("`O` is not an object");
          if (typeof entryRef != "string") throw new localVar_rn(
            "`slot` must be a string");
          if (localVar_xa.assert(valueRef), !lookupTable_Zf.has(valueRef, entryRef)) throw new localVar_rn("`" + entryRef +
            "` is not present on `O`")
        },
        get: function(valueRef, entryRef) {
          if (!valueRef || typeof valueRef != "object" && typeof valueRef != "function")
            throw new localVar_rn("`O` is not an object");
          if (typeof entryRef != "string") throw new localVar_rn(
            "`slot` must be a string");
          var resultRef = localVar_xa.get(valueRef);
          return resultRef && resultRef["$" + entryRef]
        },
        has: function(valueRef, entryRef) {
          if (!valueRef || typeof valueRef != "object" && typeof valueRef != "function")
            throw new localVar_rn("`O` is not an object");
          if (typeof entryRef != "string") throw new localVar_rn(
            "`slot` must be a string");
          var resultRef = localVar_xa.get(valueRef);
          return !!resultRef && localVar_bC(resultRef, "$" + entryRef)
        },
        set: function(valueRef, entryRef, resultRef) {
          if (!valueRef || typeof valueRef != "object" && typeof valueRef != "function")
            throw new localVar_rn("`O` is not an object");
          if (typeof entryRef != "string") throw new localVar_rn(
            "`slot` must be a string");
          var countRef = localVar_xa.get(valueRef);
          countRef || (countRef = {}, localVar_xa.set(valueRef, countRef)), countRef["$" + entryRef] = resultRef
        }
      };
    Object.freeze && Object.freeze(lookupTable_Zf);
    paramArg_g1.exports = lookupTable_Zf
  });
  var fnVar_y1 = defineCommonjsModule((paramArg_Y7, paramArg_v1) => {
    "use strict";
    var localVar_wa = fnVar_h1(),
      localVar_vC = SyntaxError,
      strVar_b1 = typeof StopIteration == "object" ? StopIteration : null;
    paramArg_v1.exports = function(entryRef) {
      if (!strVar_b1) throw new localVar_vC("this environment lacks StopIteration");
      localVar_wa.set(entryRef, "[[Done]]", !1);
      var resultRef = {
        next: function() {
          var optionRef = localVar_wa.get(this, "[[Iterator]]"),
            indexRef = localVar_wa.get(optionRef, "[[Done]]");
          try {
            return {
              done: indexRef,
              value: indexRef ? void 0 : optionRef.next()
            }
          } catch (accumulator) {
            if (localVar_wa.set(optionRef, "[[Done]]", !0), accumulator !== strVar_b1) throw accumulator;
            return {
              done: !0,
              value: void 0
            }
          }
        }
      };
      return localVar_wa.set(resultRef, "[[Iterator]]", entryRef), resultRef
    }
  });
  var fnVar_em = defineCommonjsModule((paramArg_X7, paramArg_x1) => {
    var lookupTable_yC = {}.toString;
    paramArg_x1.exports = Array.isArray || function(valueRef) {
      return lookupTable_yC.call(valueRef) == "[object Array]"
    }
  });
  var fnVar_tm = defineCommonjsModule((paramArg_J7, paramArg_w1) => {
    "use strict";
    var localVar_xC = String.prototype.valueOf,
      fnVar_wC = function(entryRef) {
        try {
          return localVar_xC.call(entryRef), !0
        } catch {
          return !1
        }
      },
      localVar__C = Object.prototype.toString,
      strVar_kC = "[object String]",
      localVar_EC = fnVar_Cn()();
    paramArg_w1.exports = function(entryRef) {
      return typeof entryRef == "string" ? !0 : typeof entryRef != "object" ? !1 :
        localVar_EC ? fnVar_wC(entryRef) : localVar__C.call(entryRef) === strVar_kC
    }
  });
  var fnVar_nm = defineCommonjsModule((paramArg_Z7, paramArg_E1) => {
    "use strict";
    var strVar_rm = typeof Map == "function" && Map.prototype ? Map : null,
      strVar_TC = typeof Set == "function" && Set.prototype ? Set : null,
      localVar_Zs;
    strVar_rm || (localVar_Zs = function(entryRef) {
      return !1
    });
    var localVar_k1 = strVar_rm ? Map.prototype.has : null,
      localVar__1 = strVar_TC ? Set.prototype.has : null;
    !localVar_Zs && !localVar_k1 && (localVar_Zs = function(entryRef) {
      return !1
    });
    paramArg_E1.exports = localVar_Zs || function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      try {
        if (localVar_k1.call(entryRef), localVar__1) try {
          localVar__1.call(entryRef)
        } catch {
          return !0
        }
        return entryRef instanceof strVar_rm
      } catch {}
      return !1
    }
  });
  var fnVar_im = defineCommonjsModule((paramArg_ej, paramArg_O1) => {
    "use strict";
    var strVar_SC = typeof Map == "function" && Map.prototype ? Map : null,
      strVar_om = typeof Set == "function" && Set.prototype ? Set : null,
      localVar_ec;
    strVar_om || (localVar_ec = function(entryRef) {
      return !1
    });
    var localVar_T1 = strVar_SC ? Map.prototype.has : null,
      localVar_S1 = strVar_om ? Set.prototype.has : null;
    !localVar_ec && !localVar_S1 && (localVar_ec = function(entryRef) {
      return !1
    });
    paramArg_O1.exports = localVar_ec || function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      try {
        if (localVar_S1.call(entryRef), localVar_T1) try {
          localVar_T1.call(entryRef)
        } catch {
          return !0
        }
        return entryRef instanceof strVar_om
      } catch {}
      return !1
    }
  });
  var fnVar_L1 = defineCommonjsModule((paramArg_tj, paramArg_nc) => {
    "use strict";
    var localVar_P1 = fnVar_Ff(),
      localVar_C1 = fnVar_y1();
    fnVar_Ls()() || fnVar_ua()() ? (localVar_tc = Symbol.iterator, paramArg_nc.exports = function(entryRef) {
      if (entryRef != null && typeof entryRef[localVar_tc] < "u") return entryRef[localVar_tc]();
      if (localVar_P1(entryRef)) return Array.prototype[localVar_tc].call(entryRef)
    }) : (localVar_N1 = fnVar_em(), localVar_M1 = fnVar_tm(), localVar_am = fnVar_ar(), localVar_A1 = localVar_am("%Map%", !0), localVar_j1 =
      localVar_am("%Set%", !0), localVar_yr = fnVar_lr(), localVar_lm = localVar_yr("Array.prototype.push"), localVar_sm =
      localVar_yr("String.prototype.charCodeAt"), localVar_R1 = localVar_yr(
        "String.prototype.slice"), localVar_I1 = function(entryRef, resultRef) {
        var countRef = entryRef.length;
        if (resultRef + 1 >= countRef) return resultRef + 1;
        var optionRef = localVar_sm(entryRef, resultRef);
        if (optionRef < 55296 || optionRef > 56319) return resultRef + 1;
        var indexRef = localVar_sm(entryRef, resultRef + 1);
        return indexRef < 56320 || indexRef > 57343 ? resultRef + 1 : resultRef + 2
      }, localVar_rc = function(entryRef) {
        var resultRef = 0;
        return {
          next: function() {
            var optionRef = resultRef >= entryRef.length,
              indexRef;
            return optionRef || (indexRef = entryRef[resultRef], resultRef += 1), {
              done: optionRef,
              value: indexRef
            }
          }
        }
      }, localVar_cm = function(entryRef, resultRef) {
        if (localVar_N1(entryRef) || localVar_P1(entryRef)) return localVar_rc(entryRef);
        if (localVar_M1(entryRef)) {
          var countRef = 0;
          return {
            next: function() {
              var indexRef = localVar_I1(entryRef, countRef),
                accumulator = localVar_R1(entryRef, countRef, indexRef);
              return countRef = indexRef, {
                done: indexRef > entryRef.length,
                value: accumulator
              }
            }
          }
        }
        if (resultRef && typeof entryRef["_es6-shim iterator_"] < "u") return entryRef[
          "_es6-shim iterator_"]()
      }, !localVar_A1 && !localVar_j1 ? paramArg_nc.exports = function(entryRef) {
        if (entryRef != null) return localVar_cm(entryRef, !0)
      } : (localVar_D1 = fnVar_nm(), localVar_F1 = fnVar_im(), localVar_um = localVar_yr("Map.prototype.forEach", !0),
        localVar_dm = localVar_yr("Set.prototype.forEach", !0), (typeof process > "u" || !
          process.versions || !process.versions.node) && (localVar_pm = localVar_yr(
          "Map.prototype.iterator", !0), localVar_fm = localVar_yr(
          "Set.prototype.iterator", !0)), localVar_mm = localVar_yr(
          "Map.prototype.@@iterator", !0) || localVar_yr(
          "Map.prototype._es6-shim iterator_", !0), localVar_gm = localVar_yr(
          "Set.prototype.@@iterator", !0) || localVar_yr(
          "Set.prototype._es6-shim iterator_", !0), localVar_z1 = function(entryRef) {
          if (localVar_D1(entryRef)) {
            if (localVar_pm) return localVar_C1(localVar_pm(entryRef));
            if (localVar_mm) return localVar_mm(entryRef);
            if (localVar_um) {
              var resultRef = [];
              return localVar_um(entryRef, function(optionRef, indexRef) {
                localVar_lm(resultRef, [indexRef, optionRef])
              }), localVar_rc(resultRef)
            }
          }
          if (localVar_F1(entryRef)) {
            if (localVar_fm) return localVar_C1(localVar_fm(entryRef));
            if (localVar_gm) return localVar_gm(entryRef);
            if (localVar_dm) {
              var countRef = [];
              return localVar_dm(entryRef, function(optionRef) {
                localVar_lm(countRef, optionRef)
              }), localVar_rc(countRef)
            }
          }
        }, paramArg_nc.exports = function(entryRef) {
          return localVar_z1(entryRef) || localVar_cm(entryRef)
        }));
    var localVar_tc, localVar_N1, localVar_M1, localVar_am, localVar_A1, localVar_j1, localVar_yr, localVar_lm, localVar_sm, localVar_R1, localVar_I1, localVar_rc, localVar_cm, localVar_D1, localVar_F1, localVar_um,
      localVar_dm, localVar_pm, localVar_fm, localVar_mm, localVar_gm, localVar_z1
  });
  var fnVar_hm = defineCommonjsModule((paramArg_rj, paramArg_q1) => {
    "use strict";
    var fnVar_$1 = function(valueRef) {
      return valueRef !== valueRef
    };
    paramArg_q1.exports = function(entryRef, resultRef) {
      return entryRef === 0 && resultRef === 0 ? 1 / entryRef === 1 / resultRef : !!(entryRef === resultRef || fnVar_$1(
        entryRef) && fnVar_$1(resultRef))
    }
  });
  var fnVar_bm = defineCommonjsModule((paramArg_nj, paramArg_B1) => {
    "use strict";
    var localVar_OC = fnVar_hm();
    paramArg_B1.exports = function() {
      return typeof Object.is == "function" ? Object.is : localVar_OC
    }
  });
  var fnVar_W1 = defineCommonjsModule((paramArg_oj, paramArg_U1) => {
    "use strict";
    var localVar_PC = fnVar_bm(),
      localVar_CC = fnVar_Pn();
    paramArg_U1.exports = function() {
      var entryRef = localVar_PC();
      return localVar_CC(Object, {
        is: entryRef
      }, {
        is: function() {
          return Object.is !== entryRef
        }
      }), entryRef
    }
  });
  var fnVar_G1 = defineCommonjsModule((paramArg_ij, paramArg_K1) => {
    "use strict";
    var localVar_NC = fnVar_Pn(),
      localVar_MC = fnVar_oo(),
      localVar_AC = fnVar_hm(),
      localVar_H1 = fnVar_bm(),
      localVar_jC = fnVar_W1(),
      localVar_V1 = localVar_MC(localVar_H1(), Object);
    localVar_NC(localVar_V1, {
      getPolyfill: localVar_H1,
      implementation: localVar_AC,
      shim: localVar_jC
    });
    paramArg_K1.exports = localVar_V1
  });
  var fnVar_J1 = defineCommonjsModule((paramArg_aj, paramArg_X1) => {
    "use strict";
    var localVar_Y1 = Function.prototype.toString,
      strVar_ei = typeof Reflect == "object" && Reflect !== null && Reflect
      .apply,
      localVar_ym, localVar_oc;
    if (typeof strVar_ei == "function" && typeof Object.defineProperty ==
      "function") try {
      localVar_ym = Object.defineProperty({}, "length", {
        get: function() {
          throw localVar_oc
        }
      }), localVar_oc = {}, strVar_ei(function() {
        throw 42
      }, null, localVar_ym)
    } catch (valueRef) {
      valueRef !== localVar_oc && (strVar_ei = null)
    } else strVar_ei = null;
    var localVar_RC = /^\s*class\b/,
      fnVar_xm = function(entryRef) {
        try {
          var resultRef = localVar_Y1.call(entryRef);
          return localVar_RC.test(resultRef)
        } catch {
          return !1
        }
      },
      fnVar_vm = function(entryRef) {
        try {
          return fnVar_xm(entryRef) ? !1 : (localVar_Y1.call(entryRef), !0)
        } catch {
          return !1
        }
      },
      localVar_ic = Object.prototype.toString,
      strVar_IC = "[object Object]",
      strVar_DC = "[object Function]",
      strVar_FC = "[object GeneratorFunction]",
      strVar_zC = "[object HTMLAllCollection]",
      strVar_LC = "[object HTML document.all class]",
      strVar_$C = "[object HTMLCollection]",
      strVar_qC = typeof Symbol == "function" && !!Symbol.toStringTag,
      localVar_BC = !(0 in [, ]),
      fnVar_wm = function() {
        return !1
      };
    typeof document == "object" && (localVar_Q1 = document.all, localVar_ic.call(localVar_Q1) === localVar_ic
      .call(document.all) && (fnVar_wm = function(entryRef) {
        if ((localVar_BC || !entryRef) && (typeof entryRef > "u" || typeof entryRef == "object"))
          try {
            var resultRef = localVar_ic.call(entryRef);
            return (resultRef === strVar_zC || resultRef === strVar_LC || resultRef === strVar_$C || resultRef === strVar_IC) &&
              entryRef("") == null
          } catch {}
        return !1
      }));
    var localVar_Q1;
    paramArg_X1.exports = strVar_ei ? function(entryRef) {
      if (fnVar_wm(entryRef)) return !0;
      if (!entryRef || typeof entryRef != "function" && typeof entryRef != "object") return !
        1;
      try {
        strVar_ei(entryRef, null, localVar_ym)
      } catch (resultRef) {
        if (resultRef !== localVar_oc) return !1
      }
      return !fnVar_xm(entryRef) && fnVar_vm(entryRef)
    } : function(entryRef) {
      if (fnVar_wm(entryRef)) return !0;
      if (!entryRef || typeof entryRef != "function" && typeof entryRef != "object") return !
        1;
      if (strVar_qC) return fnVar_vm(entryRef);
      if (fnVar_xm(entryRef)) return !1;
      var resultRef = localVar_ic.call(entryRef);
      return resultRef !== strVar_DC && resultRef !== strVar_FC && !/^\[object HTML/.test(resultRef) ? !1 :
        fnVar_vm(entryRef)
    }
  });
  var fnVar_tw = defineCommonjsModule((paramArg_lj, paramArg_ew) => {
    "use strict";
    var localVar_UC = fnVar_J1(),
      localVar_WC = Object.prototype.toString,
      localVar_Z1 = Object.prototype.hasOwnProperty,
      fnVar_HC = function(entryRef, resultRef, countRef) {
        for (var optionRef = 0, indexRef = entryRef.length; optionRef < indexRef; optionRef++) localVar_Z1.call(entryRef, optionRef) && (countRef ==
          null ? resultRef(entryRef[optionRef], optionRef, entryRef) : resultRef.call(countRef, entryRef[optionRef], optionRef, entryRef))
      },
      fnVar_VC = function(entryRef, resultRef, countRef) {
        for (var optionRef = 0, indexRef = entryRef.length; optionRef < indexRef; optionRef++) countRef == null ? resultRef(entryRef.charAt(
          optionRef), optionRef, entryRef) : resultRef.call(countRef, entryRef.charAt(optionRef), optionRef, entryRef)
      },
      fnVar_KC = function(entryRef, resultRef, countRef) {
        for (var optionRef in entryRef) localVar_Z1.call(entryRef, optionRef) && (countRef == null ? resultRef(entryRef[optionRef], optionRef, entryRef) : resultRef
          .call(countRef, entryRef[optionRef], optionRef, entryRef))
      },
      fnVar_GC = function(entryRef, resultRef, countRef) {
        if (!localVar_UC(resultRef)) throw new TypeError("iterator must be a function");
        var optionRef;
        arguments.length >= 3 && (optionRef = countRef), localVar_WC.call(entryRef) ===
          "[object Array]" ? fnVar_HC(entryRef, resultRef, optionRef) : typeof entryRef == "string" ? fnVar_VC(entryRef, resultRef,
            optionRef) : fnVar_KC(entryRef, resultRef, optionRef)
      };
    paramArg_ew.exports = fnVar_GC
  });
  var fnVar_nw = defineCommonjsModule((paramArg_sj, paramArg_rw) => {
    "use strict";
    var listVar__m = ["BigInt64Array", "BigUint64Array", "Float32Array",
        "Float64Array", "Int16Array", "Int32Array", "Int8Array",
        "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray"
      ],
      localVar_QC = typeof globalThis > "u" ? global : globalThis;
    paramArg_rw.exports = function() {
      for (var entryRef = [], resultRef = 0; resultRef < listVar__m.length; resultRef++) typeof localVar_QC[listVar__m[resultRef]] ==
        "function" && (entryRef[entryRef.length] = listVar__m[resultRef]);
      return entryRef
    }
  });
  var fnVar_Om = defineCommonjsModule((paramArg_cj, paramArg_lw) => {
    "use strict";
    var localVar_lc = fnVar_tw(),
      localVar_YC = fnVar_nw(),
      localVar_ow = fnVar_oo(),
      localVar_Tm = fnVar_lr(),
      localVar_ac = fnVar_Ws(),
      localVar_XC = localVar_Tm("Object.prototype.toString"),
      localVar_aw = fnVar_Cn()(),
      localVar_iw = typeof globalThis > "u" ? global : globalThis,
      localVar_Em = localVar_YC(),
      localVar_Sm = localVar_Tm("String.prototype.slice"),
      objHelper_km = Object.getPrototypeOf,
      localVar_JC = localVar_Tm("Array.prototype.indexOf", !0) || function(entryRef, resultRef) {
        for (var countRef = 0; countRef < entryRef.length; countRef += 1)
          if (entryRef[countRef] === resultRef) return countRef;
        return -1
      },
      lookupTable_sc = {
        __proto__: null
      };
    localVar_aw && localVar_ac && objHelper_km ? localVar_lc(localVar_Em, function(valueRef) {
      var entryRef = new localVar_iw[valueRef];
      if (Symbol.toStringTag in entryRef) {
        var resultRef = objHelper_km(entryRef),
          countRef = localVar_ac(resultRef, Symbol.toStringTag);
        if (!countRef) {
          var optionRef = objHelper_km(resultRef);
          countRef = localVar_ac(optionRef, Symbol.toStringTag)
        }
        lookupTable_sc["$" + valueRef] = localVar_ow(countRef.get)
      }
    }) : localVar_lc(localVar_Em, function(valueRef) {
      var entryRef = new localVar_iw[valueRef],
        resultRef = entryRef.slice || entryRef.set;
      resultRef && (lookupTable_sc["$" + valueRef] = localVar_ow(resultRef))
    });
    var fnVar_ZC = function(entryRef) {
        var resultRef = !1;
        return localVar_lc(lookupTable_sc, function(countRef, optionRef) {
          if (!resultRef) try {
            "$" + countRef(entryRef) === optionRef && (resultRef = localVar_Sm(optionRef, 1))
          } catch {}
        }), resultRef
      },
      fnVar_eN = function(entryRef) {
        var resultRef = !1;
        return localVar_lc(lookupTable_sc, function(countRef, optionRef) {
          if (!resultRef) try {
            countRef(entryRef), resultRef = localVar_Sm(optionRef, 1)
          } catch {}
        }), resultRef
      };
    paramArg_lw.exports = function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      if (!localVar_aw) {
        var resultRef = localVar_Sm(localVar_XC(entryRef), 8, -1);
        return localVar_JC(localVar_Em, resultRef) > -1 ? resultRef : resultRef !== "Object" ? !1 : fnVar_eN(entryRef)
      }
      return localVar_ac ? fnVar_ZC(entryRef) : null
    }
  });
  var fnVar_cw = defineCommonjsModule((paramArg_uj, paramArg_sw) => {
    "use strict";
    var localVar_tN = fnVar_Om();
    paramArg_sw.exports = function(entryRef) {
      return !!localVar_tN(entryRef)
    }
  });
  var fnVar_Pm = defineCommonjsModule((paramArg_dj, paramArg_gw) => {
    "use strict";
    var localVar_rN = fnVar_oo(),
      localVar_nN = fnVar_lr(),
      localVar_mw = fnVar_ar(),
      localVar_oN = fnVar_cw(),
      localVar_uw = localVar_mw("ArrayBuffer", !0),
      localVar_dw = localVar_mw("Float32Array", !0),
      localVar_cc = localVar_nN("ArrayBuffer.prototype.byteLength", !0),
      localVar_pw = localVar_uw && !localVar_cc && new localVar_uw()
      .slice,
      localVar_fw = localVar_pw && localVar_rN(localVar_pw);
    paramArg_gw.exports = localVar_cc || localVar_fw ? function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      try {
        return localVar_cc ? localVar_cc(entryRef) : localVar_fw(entryRef, 0), !0
      } catch {
        return !1
      }
    } : localVar_dw ? function(entryRef) {
      try {
        return new localVar_dw(entryRef)
          .buffer === entryRef && !localVar_oN(entryRef)
      } catch (resultRef) {
        return typeof entryRef == "object" && resultRef.name === "RangeError"
      }
    } : function(entryRef) {
      return !1
    }
  });
  var fnVar_bw = defineCommonjsModule((paramArg_pj, paramArg_hw) => {
    "use strict";
    var localVar_iN = Date.prototype.getDay,
      fnVar_aN = function(entryRef) {
        try {
          return localVar_iN.call(entryRef), !0
        } catch {
          return !1
        }
      },
      localVar_lN = Object.prototype.toString,
      strVar_sN = "[object Date]",
      localVar_cN = fnVar_Cn()();
    paramArg_hw.exports = function(entryRef) {
      return typeof entryRef != "object" || entryRef === null ? !1 : localVar_cN ? fnVar_aN(entryRef) : localVar_lN
        .call(entryRef) === strVar_sN
    }
  });
  var fnVar__w = defineCommonjsModule((paramArg_fj, paramArg_ww) => {
    "use strict";
    var localVar_Cm = fnVar_lr(),
      localVar_vw = fnVar_Cn()(),
      localVar_yw, localVar_xw, localVar_Nm, localVar_Mm;
    localVar_vw && (localVar_yw = localVar_Cm("Object.prototype.hasOwnProperty"), localVar_xw = localVar_Cm(
      "RegExp.prototype.exec"), localVar_Nm = {}, localVar_uc = function() {
      throw localVar_Nm
    }, localVar_Mm = {
      toString: localVar_uc,
      valueOf: localVar_uc
    }, typeof Symbol.toPrimitive == "symbol" && (localVar_Mm[Symbol
      .toPrimitive] = localVar_uc));
    var localVar_uc, localVar_uN = localVar_Cm("Object.prototype.toString"),
      objHelper_dN = Object.getOwnPropertyDescriptor,
      strVar_pN = "[object RegExp]";
    paramArg_ww.exports = localVar_vw ? function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      var resultRef = objHelper_dN(entryRef, "lastIndex"),
        countRef = resultRef && localVar_yw(resultRef, "value");
      if (!countRef) return !1;
      try {
        localVar_xw(entryRef, localVar_Mm)
      } catch (optionRef) {
        return optionRef === localVar_Nm
      }
    } : function(entryRef) {
      return !entryRef || typeof entryRef != "object" && typeof entryRef != "function" ? !1 :
        localVar_uN(entryRef) === strVar_pN
    }
  });
  var fnVar_Tw = defineCommonjsModule((paramArg_mj, paramArg_Ew) => {
    "use strict";
    var localVar_fN = fnVar_lr(),
      localVar_kw = localVar_fN("SharedArrayBuffer.prototype.byteLength", !0);
    paramArg_Ew.exports = localVar_kw ? function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      try {
        return localVar_kw(entryRef), !0
      } catch {
        return !1
      }
    } : function(entryRef) {
      return !1
    }
  });
  var fnVar_Ow = defineCommonjsModule((paramArg_gj, paramArg_Sw) => {
    "use strict";
    var localVar_mN = Number.prototype.toString,
      fnVar_gN = function(entryRef) {
        try {
          return localVar_mN.call(entryRef), !0
        } catch {
          return !1
        }
      },
      localVar_hN = Object.prototype.toString,
      strVar_bN = "[object Number]",
      localVar_vN = fnVar_Cn()();
    paramArg_Sw.exports = function(entryRef) {
      return typeof entryRef == "number" ? !0 : typeof entryRef != "object" ? !1 :
        localVar_vN ? fnVar_gN(entryRef) : localVar_hN.call(entryRef) === strVar_bN
    }
  });
  var fnVar_Nw = defineCommonjsModule((paramArg_hj, paramArg_Cw) => {
    "use strict";
    var localVar_Pw = fnVar_lr(),
      localVar_yN = localVar_Pw("Boolean.prototype.toString"),
      localVar_xN = localVar_Pw("Object.prototype.toString"),
      fnVar_wN = function(entryRef) {
        try {
          return localVar_yN(entryRef), !0
        } catch {
          return !1
        }
      },
      strVar__N = "[object Boolean]",
      localVar_kN = fnVar_Cn()();
    paramArg_Cw.exports = function(entryRef) {
      return typeof entryRef == "boolean" ? !0 : entryRef === null || typeof entryRef !=
        "object" ? !1 : localVar_kN && Symbol.toStringTag in entryRef ? fnVar_wN(entryRef) : localVar_xN(
        entryRef) === strVar__N
    }
  });
  var fnVar_Rw = defineCommonjsModule((paramArg_bj, paramArg_Am) => {
    "use strict";
    var localVar_EN = Object.prototype.toString,
      localVar_TN = fnVar_Ls()();
    localVar_TN ? (localVar_Mw = Symbol.prototype.toString, localVar_Aw = /^Symbol\(.*\)$/, localVar_jw =
      function(entryRef) {
        return typeof entryRef.valueOf() != "symbol" ? !1 : localVar_Aw.test(localVar_Mw.call(entryRef))
      }, paramArg_Am.exports = function(entryRef) {
        if (typeof entryRef == "symbol") return !0;
        if (localVar_EN.call(entryRef) !== "[object Symbol]") return !1;
        try {
          return localVar_jw(entryRef)
        } catch {
          return !1
        }
      }) : paramArg_Am.exports = function(entryRef) {
      return !1
    };
    var localVar_Mw, localVar_Aw, localVar_jw
  });
  var fnVar_Fw = defineCommonjsModule((paramArg_vj, paramArg_Dw) => {
    "use strict";
    var localVar_Iw = typeof BigInt < "u" && BigInt;
    paramArg_Dw.exports = function() {
      return typeof localVar_Iw == "function" && typeof BigInt == "function" &&
        typeof localVar_Iw(42) == "bigint" && typeof BigInt(42) == "bigint"
    }
  });
  var fnVar_$w = defineCommonjsModule((paramArg_yj, paramArg_jm) => {
    "use strict";
    var localVar_SN = fnVar_Fw()();
    localVar_SN ? (localVar_zw = BigInt.prototype.valueOf, localVar_Lw = function(entryRef) {
      try {
        return localVar_zw.call(entryRef), !0
      } catch {}
      return !1
    }, paramArg_jm.exports = function(entryRef) {
      return entryRef === null || typeof entryRef > "u" || typeof entryRef == "boolean" ||
        typeof entryRef == "string" || typeof entryRef == "number" || typeof entryRef ==
        "symbol" || typeof entryRef == "function" ? !1 : typeof entryRef ==
        "bigint" ? !0 : localVar_Lw(entryRef)
    }) : paramArg_jm.exports = function(entryRef) {
      return !1
    };
    var localVar_zw, localVar_Lw
  });
  var fnVar_Bw = defineCommonjsModule((paramArg_xj, paramArg_qw) => {
    "use strict";
    var localVar_ON = fnVar_tm(),
      localVar_PN = fnVar_Ow(),
      localVar_CN = fnVar_Nw(),
      localVar_NN = fnVar_Rw(),
      localVar_MN = fnVar_$w();
    paramArg_qw.exports = function(entryRef) {
      if (entryRef == null || typeof entryRef != "object" && typeof entryRef != "function")
        return null;
      if (localVar_ON(entryRef)) return "String";
      if (localVar_PN(entryRef)) return "Number";
      if (localVar_CN(entryRef)) return "Boolean";
      if (localVar_NN(entryRef)) return "Symbol";
      if (localVar_MN(entryRef)) return "BigInt"
    }
  });
  var fnVar_Hw = defineCommonjsModule((paramArg_wj, paramArg_Ww) => {
    "use strict";
    var strVar_dc = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap :
      null,
      strVar_Uw = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet :
      null,
      localVar_pc;
    strVar_dc || (localVar_pc = function(entryRef) {
      return !1
    });
    var localVar_Im = strVar_dc ? strVar_dc.prototype.has : null,
      localVar_Rm = strVar_Uw ? strVar_Uw.prototype.has : null;
    !localVar_pc && !localVar_Im && (localVar_pc = function(entryRef) {
      return !1
    });
    paramArg_Ww.exports = localVar_pc || function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      try {
        if (localVar_Im.call(entryRef, localVar_Im), localVar_Rm) try {
          localVar_Rm.call(entryRef, localVar_Rm)
        } catch {
          return !0
        }
        return entryRef instanceof strVar_dc
      } catch {}
      return !1
    }
  });
  var fnVar_Kw = defineCommonjsModule((paramArg__j, paramArg_Fm) => {
    "use strict";
    var localVar_AN = fnVar_ar(),
      localVar_Vw = fnVar_lr(),
      localVar_jN = localVar_AN("%WeakSet%", !0),
      localVar_Dm = localVar_Vw("WeakSet.prototype.has", !0);
    localVar_Dm ? (localVar_fc = localVar_Vw("WeakMap.prototype.has", !0), paramArg_Fm.exports = function(entryRef) {
      if (!entryRef || typeof entryRef != "object") return !1;
      try {
        if (localVar_Dm(entryRef, localVar_Dm), localVar_fc) try {
          localVar_fc(entryRef, localVar_fc)
        } catch {
          return !0
        }
        return entryRef instanceof localVar_jN
      } catch {}
      return !1
    }) : paramArg_Fm.exports = function(entryRef) {
      return !1
    };
    var localVar_fc
  });
  var fnVar_Qw = defineCommonjsModule((paramArg_kj, paramArg_Gw) => {
    "use strict";
    var localVar_RN = fnVar_nm(),
      localVar_IN = fnVar_im(),
      localVar_DN = fnVar_Hw(),
      localVar_FN = fnVar_Kw();
    paramArg_Gw.exports = function(entryRef) {
      if (entryRef && typeof entryRef == "object") {
        if (localVar_RN(entryRef)) return "Map";
        if (localVar_IN(entryRef)) return "Set";
        if (localVar_DN(entryRef)) return "WeakMap";
        if (localVar_FN(entryRef)) return "WeakSet"
      }
      return !1
    }
  });
  var fnVar_Jw = defineCommonjsModule((paramArg_Ej, paramArg_Xw) => {
    "use strict";
    var localVar_zN = fnVar_lr(),
      localVar_Yw = localVar_zN("ArrayBuffer.prototype.byteLength", !0),
      localVar_LN = fnVar_Pm();
    paramArg_Xw.exports = function(entryRef) {
      return localVar_LN(entryRef) ? localVar_Yw ? localVar_Yw(entryRef) : entryRef.byteLength : NaN
    }
  });
  var fnVar_k_ = defineCommonjsModule((paramArg_Tj, paramArg___) => {
    "use strict";
    var localVar_y_ = fnVar_Cx(),
      localVar_Lr = fnVar_lr(),
      localVar_Zw = fnVar_Ux(),
      localVar_$N = fnVar_ar(),
      localVar_ti = fnVar_L1(),
      localVar_qN = fnVar_Jf(),
      localVar_e_ = fnVar_G1(),
      localVar_t_ = fnVar_Ff(),
      localVar_r_ = fnVar_em(),
      localVar_n_ = fnVar_Pm(),
      localVar_o_ = fnVar_bw(),
      localVar_i_ = fnVar__w(),
      localVar_a_ = fnVar_Tw(),
      localVar_l_ = fnVar_zs(),
      localVar_s_ = fnVar_Bw(),
      localVar_c_ = fnVar_Qw(),
      localVar_u_ = fnVar_Om(),
      localVar_d_ = fnVar_Jw(),
      localVar_p_ = localVar_Lr("SharedArrayBuffer.prototype.byteLength", !0),
      localVar_f_ = localVar_Lr("Date.prototype.getTime"),
      objHelper_zm = Object.getPrototypeOf,
      localVar_m_ = localVar_Lr("Object.prototype.toString"),
      localVar_gc = localVar_$N("%Set%", !0),
      localVar_Lm = localVar_Lr("Map.prototype.has", !0),
      localVar_hc = localVar_Lr("Map.prototype.get", !0),
      localVar_g_ = localVar_Lr("Map.prototype.size", !0),
      localVar_bc = localVar_Lr("Set.prototype.add", !0),
      localVar_x_ = localVar_Lr("Set.prototype.delete", !0),
      localVar_vc = localVar_Lr("Set.prototype.has", !0),
      localVar_mc = localVar_Lr("Set.prototype.size", !0);

    function helperFn_h_(valueRef, entryRef, resultRef, countRef) {
      for (var optionRef = localVar_ti(valueRef), indexRef;
        (indexRef = optionRef.next()) && !indexRef.done;)
        if (helperFn_Sr(entryRef, indexRef.value, resultRef, countRef)) return localVar_x_(valueRef, indexRef.value), !0;
      return !1
    }

    function helperFn_w_(valueRef) {
      if (typeof valueRef > "u") return null;
      if (typeof valueRef != "object") return typeof valueRef == "symbol" ? !1 :
        typeof valueRef == "string" || typeof valueRef == "number" ? +valueRef == +valueRef : !0
    }

    function helperFn_BN(valueRef, entryRef, resultRef, countRef, optionRef, indexRef) {
      var accumulator = helperFn_w_(resultRef);
      if (accumulator != null) return accumulator;
      var listRef = localVar_hc(entryRef, accumulator),
        configRef = localVar_y_({}, optionRef, {
          strict: !1
        });
      return typeof listRef > "u" && !localVar_Lm(entryRef, accumulator) || !helperFn_Sr(countRef, listRef, configRef, indexRef) ? !1 : !localVar_Lm(valueRef,
        accumulator) && helperFn_Sr(countRef, listRef, configRef, indexRef)
    }

    function helperFn_UN(valueRef, entryRef, resultRef) {
      var countRef = helperFn_w_(resultRef);
      return countRef ?? (localVar_vc(entryRef, countRef) && !localVar_vc(valueRef, countRef))
    }

    function helperFn_b_(valueRef, entryRef, resultRef, countRef, optionRef, indexRef) {
      for (var accumulator = localVar_ti(valueRef), listRef, configRef;
        (listRef = accumulator.next()) && !listRef.done;)
        if (configRef = listRef.value, helperFn_Sr(resultRef, configRef, optionRef, indexRef) && helperFn_Sr(countRef, localVar_hc(entryRef, configRef), optionRef, indexRef))
        return localVar_x_(valueRef, configRef), !0;
      return !1
    }

    function helperFn_Sr(valueRef, entryRef, resultRef, countRef) {
      var optionRef = resultRef || {};
      if (optionRef.strict ? localVar_e_(valueRef, entryRef) : valueRef === entryRef) return !0;
      var indexRef = localVar_s_(valueRef),
        accumulator = localVar_s_(entryRef);
      if (indexRef !== accumulator) return !1;
      if (!valueRef || !entryRef || typeof valueRef != "object" && typeof entryRef != "object")
      return optionRef.strict ? localVar_e_(valueRef, entryRef) : valueRef == entryRef;
      var listRef = countRef.has(valueRef),
        configRef = countRef.has(entryRef),
        unitRef;
      if (listRef && configRef) {
        if (countRef.get(valueRef) === countRef.get(entryRef)) return !0
      } else unitRef = {};
      return listRef || countRef.set(valueRef, unitRef), configRef || countRef.set(entryRef, unitRef), helperFn_VN(valueRef, entryRef, optionRef, countRef)
    }

    function helperFn_v_(valueRef) {
      return !valueRef || typeof valueRef != "object" || typeof valueRef.length != "number" ||
        typeof valueRef.copy != "function" || typeof valueRef.slice != "function" || valueRef
        .length > 0 && typeof valueRef[0] != "number" ? !1 : !!(valueRef.constructor &&
          valueRef.constructor.isBuffer && valueRef.constructor.isBuffer(valueRef))
    }

    function helperFn_WN(valueRef, entryRef, resultRef, countRef) {
      if (localVar_mc(valueRef) !== localVar_mc(entryRef)) return !1;
      for (var optionRef = localVar_ti(valueRef), indexRef = localVar_ti(entryRef), accumulator, listRef, configRef;
        (accumulator = optionRef.next()) && !accumulator.done;)
        if (accumulator.value && typeof accumulator.value == "object") configRef || (configRef = new localVar_gc), localVar_bc(
          configRef, accumulator.value);
        else if (!localVar_vc(entryRef, accumulator.value)) {
        if (resultRef.strict || !helperFn_UN(valueRef, entryRef, accumulator.value)) return !1;
        configRef || (configRef = new localVar_gc), localVar_bc(configRef, accumulator.value)
      }
      if (configRef) {
        for (;
          (listRef = indexRef.next()) && !listRef.done;)
          if (listRef.value && typeof listRef.value == "object") {
            if (!helperFn_h_(configRef, listRef.value, resultRef.strict, countRef)) return !1
          } else if (!resultRef.strict && !localVar_vc(valueRef, listRef.value) && !helperFn_h_(configRef, listRef.value, resultRef
            .strict, countRef)) return !1;
        return localVar_mc(configRef) === 0
      }
      return !0
    }

    function helperFn_HN(valueRef, entryRef, resultRef, countRef) {
      if (localVar_g_(valueRef) !== localVar_g_(entryRef)) return !1;
      for (var optionRef = localVar_ti(valueRef), indexRef = localVar_ti(entryRef), accumulator, listRef, configRef, unitRef, propRef, funcRef;
        (accumulator = optionRef.next()) && !accumulator.done;)
        if (unitRef = accumulator.value[0], propRef = accumulator.value[1], unitRef && typeof unitRef == "object")
          configRef || (configRef = new localVar_gc), localVar_bc(configRef, unitRef);
        else if (funcRef = localVar_hc(entryRef, unitRef), typeof funcRef > "u" && !localVar_Lm(entryRef, unitRef) || !helperFn_Sr(propRef, funcRef, resultRef,
          countRef)) {
        if (resultRef.strict || !helperFn_BN(valueRef, entryRef, unitRef, propRef, resultRef, countRef)) return !1;
        configRef || (configRef = new localVar_gc), localVar_bc(configRef, unitRef)
      }
      if (configRef) {
        for (;
          (listRef = indexRef.next()) && !listRef.done;)
          if (unitRef = listRef.value[0], funcRef = listRef.value[1], unitRef && typeof unitRef == "object") {
            if (!helperFn_b_(configRef, valueRef, unitRef, funcRef, resultRef, countRef)) return !1
          } else if (!resultRef.strict && (!valueRef.has(unitRef) || !helperFn_Sr(localVar_hc(valueRef, unitRef), funcRef, resultRef, countRef)) &&
          !helperFn_b_(configRef, valueRef, unitRef, funcRef, localVar_y_({}, resultRef, {
            strict: !1
          }), countRef)) return !1;
        return localVar_mc(configRef) === 0
      }
      return !0
    }

    function helperFn_VN(valueRef, entryRef, resultRef, countRef) {
      var optionRef, indexRef;
      if (typeof valueRef != typeof entryRef || valueRef == null || entryRef == null || localVar_m_(valueRef) !== localVar_m_(
          entryRef) || localVar_t_(valueRef) !== localVar_t_(entryRef)) return !1;
      var accumulator = localVar_r_(valueRef),
        listRef = localVar_r_(entryRef);
      if (accumulator !== listRef) return !1;
      var configRef = valueRef instanceof Error,
        unitRef = entryRef instanceof Error;
      if (configRef !== unitRef || (configRef || unitRef) && (valueRef.name !== entryRef.name || valueRef.message !== entryRef
          .message)) return !1;
      var propRef = localVar_i_(valueRef),
        funcRef = localVar_i_(entryRef);
      if (propRef !== funcRef || (propRef || funcRef) && (valueRef.source !== entryRef.source || localVar_Zw(valueRef) !== localVar_Zw(
          entryRef))) return !1;
      var coordY = localVar_o_(valueRef),
        outputRef = localVar_o_(entryRef);
      if (coordY !== outputRef || (coordY || outputRef) && localVar_f_(valueRef) !== localVar_f_(entryRef) || resultRef.strict && objHelper_zm && objHelper_zm(
          valueRef) !== objHelper_zm(entryRef)) return !1;
      var labelRef = localVar_u_(valueRef),
        depthRef = localVar_u_(entryRef);
      if (labelRef !== depthRef) return !1;
      if (labelRef || depthRef) {
        if (valueRef.length !== entryRef.length) return !1;
        for (optionRef = 0; optionRef < valueRef.length; optionRef++)
          if (valueRef[optionRef] !== entryRef[optionRef]) return !1;
        return !0
      }
      var handleRef = helperFn_v_(valueRef),
        widthRef = helperFn_v_(entryRef);
      if (handleRef !== widthRef) return !1;
      if (handleRef || widthRef) {
        if (valueRef.length !== entryRef.length) return !1;
        for (optionRef = 0; optionRef < valueRef.length; optionRef++)
          if (valueRef[optionRef] !== entryRef[optionRef]) return !1;
        return !0
      }
      var dataRef = localVar_n_(valueRef),
        errorRef = localVar_n_(entryRef);
      if (dataRef !== errorRef) return !1;
      if (dataRef || errorRef) return localVar_d_(valueRef) !== localVar_d_(entryRef) ? !1 : typeof Uint8Array ==
        "function" && helperFn_Sr(new Uint8Array(valueRef), new Uint8Array(entryRef), resultRef, countRef);
      var typeRef = localVar_a_(valueRef),
        stateRef = localVar_a_(entryRef);
      if (typeRef !== stateRef) return !1;
      if (typeRef || stateRef) return localVar_p_(valueRef) !== localVar_p_(entryRef) ? !1 : typeof Uint8Array ==
        "function" && helperFn_Sr(new Uint8Array(valueRef), new Uint8Array(entryRef), resultRef, countRef);
      if (typeof valueRef != typeof entryRef) return !1;
      var classRef = localVar_l_(valueRef),
        keyRef = localVar_l_(entryRef);
      if (classRef.length !== keyRef.length) return !1;
      for (classRef.sort(), keyRef.sort(), optionRef = classRef.length - 1; optionRef >= 0; optionRef--)
        if (classRef[optionRef] != keyRef[optionRef]) return !1;
      for (optionRef = classRef.length - 1; optionRef >= 0; optionRef--)
        if (indexRef = classRef[optionRef], !helperFn_Sr(valueRef[indexRef], entryRef[indexRef], resultRef, countRef)) return !1;
      var nodeRef = localVar_c_(valueRef),
        innerIndex = localVar_c_(entryRef);
      return nodeRef !== innerIndex ? !1 : nodeRef === "Set" || innerIndex === "Set" ? helperFn_WN(valueRef, entryRef, resultRef, countRef) :
        nodeRef === "Map" ? helperFn_HN(valueRef, entryRef, resultRef, countRef) : !0
    }
    paramArg___.exports = function(entryRef, resultRef, countRef) {
      return helperFn_Sr(entryRef, resultRef, countRef, localVar_qN())
    }
  });
  window.__vdhDeepEqual = fnVar_k_();
})();
