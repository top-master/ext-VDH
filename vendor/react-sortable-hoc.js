/*
 * react-sortable-hoc: drag-to-reorder React HOCs, with its lodash (sortBy/get/isEqual) + babel-helpers + invariant dependency chain.
 * Extracted from the extension's content-libs.js bundle (no clean CDN UMD
 * build with a browser global exists for it); kept as-is and exposed as
 * window.__vdhSortableHOC so content-libs.js can load it as a vendored asset.
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
  var copyProps = (targetObj, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function")
      for (let propKey of getOwnPropNames(from)) !hasOwnPropertyRef.call(targetObj, propKey) && propKey !== except && defineProperty(targetObj, propKey, {
        get: () => from[propKey],
        enumerable: !(desc = getOwnPropDesc(from, propKey)) || desc.enumerable
      });
    return targetObj
  };
  var toEsm = (moduleRef, isNodeMode, esmTarget) => (esmTarget = moduleRef != null ? objectCreate(getPrototypeOf(moduleRef)) : {}, copyProps(isNodeMode || !moduleRef || !moduleRef
    .__esModule ? defineProperty(esmTarget, "default", {
      value: moduleRef,
      enumerable: !0
    }) : esmTarget, moduleRef));
  var domVendorModule = defineCommonjsModule(domVendorExports => {
    "use strict";
    Object.defineProperty(domVendorExports, "__esModule", {
      value: !0
    });
    domVendorExports.arrayMove = moveArrayItem;
    domVendorExports.omit = omitKeys;
    domVendorExports.closest = findAncestor;
    domVendorExports.limit = clampToRange;
    domVendorExports.getElementMargin = getElementMargins;
    domVendorExports.provideDisplayName = formatDisplayName;

    function moveArrayItem(sourceArray, fromIndex, toIndex) {
      var resultArray = sourceArray.slice(0);
      if (toIndex >= resultArray.length)
        for (var padCounter = toIndex - resultArray.length; padCounter-- + 1;) resultArray.push(void 0);
      return resultArray.splice(toIndex, 0, resultArray.splice(fromIndex, 1)[0]), resultArray
    }

    function omitKeys(sourceObject) {
      for (var argCount = arguments.length, keysToOmit = Array(argCount > 1 ? argCount - 1 : 0), argIndex =
        1; argIndex < argCount; argIndex++) keysToOmit[argIndex - 1] = arguments[argIndex];
      return Object.keys(sourceObject)
        .reduce(function(accumulator, objectKey) {
          return keysToOmit.indexOf(objectKey) === -1 && (accumulator[objectKey] = sourceObject[objectKey]), accumulator
        }, {})
    }
    var eventsMap = domVendorExports.events = {
        start: ["touchstart", "mousedown"],
        move: ["touchmove", "mousemove"],
        end: ["touchend", "touchcancel", "mouseup"]
      },
      vendorPrefixFn = domVendorExports.vendorPrefix = function() {
        if (typeof window > "u" || typeof document > "u") return "";
        var computedStyleList = window.getComputedStyle(document.documentElement, "") || [
            "-moz-hidden-iframe"
          ],
          vendorPrefixMatch = (Array.prototype.slice.call(computedStyleList)
            .join("")
            .match(/-(moz|webkit|ms)-/) || computedStyleList.OLink === "" && ["", "o"])[
          1];
        switch (vendorPrefixMatch) {
          case "ms":
            return "ms";
          default:
            return vendorPrefixMatch && vendorPrefixMatch.length ? vendorPrefixMatch[0].toUpperCase() + vendorPrefixMatch.substr(1) : ""
        }
      }();

    function findAncestor(startElement, predicate) {
      for (; startElement;) {
        if (predicate(startElement)) return startElement;
        startElement = startElement.parentNode
      }
    }

    function clampToRange(minValue, maxValue, value) {
      return value < minValue ? minValue : value > maxValue ? maxValue : value
    }

    function parsePixelValue(cssValue) {
      return cssValue.substr(-2) === "px" ? parseFloat(cssValue) : 0
    }

    function getElementMargins(element) {
      var computedStyle = window.getComputedStyle(element);
      return {
        top: parsePixelValue(computedStyle.marginTop),
        right: parsePixelValue(computedStyle.marginRight),
        bottom: parsePixelValue(computedStyle.marginBottom),
        left: parsePixelValue(computedStyle.marginLeft)
      }
    }

    function formatDisplayName(prefix, component) {
      var componentName = component.displayName || component.name;
      return componentName ? prefix + "(" + componentName + ")" : prefix
    }
  });
  var reactEntryModule = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.React; // de-vendored: loaded from content/vendor/
  });
  var propTypesModule = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.PropTypes; // de-vendored: loaded from content/vendor/
  });
  var reactDomCheckDCEModule = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.ReactDOM; // de-vendored: loaded from content/vendor/
  });
  var invariantModule = defineCommonjsModule((invariantExports, invariantModuleRef) => {
    "use strict";
    var invariant = function(invariantCondition, invariantFormat, invariantArgA, invariantArgB, invariantArgC, invariantArgD, invariantArgE, invariantArgF) {
      if (!invariantCondition) {
        var invariantError;
        if (invariantFormat === void 0) invariantError = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        else {
          var invariantFormatArgs = [invariantArgA, invariantArgB, invariantArgC, invariantArgD, invariantArgE, invariantArgF],
            invariantArgIndex = 0;
          invariantError = new Error(invariantFormat.replace(/%s/g, function() {
            return invariantFormatArgs[invariantArgIndex++]
          })), invariantError.name = "Invariant Violation"
        }
        throw invariantError.framesToPop = 1, invariantError
      }
    };
    invariantModuleRef.exports = invariant
  });
  var listCacheClearModule = defineCommonjsModule((listCacheClearExports, listCacheClearModuleRef) => {
    function listCacheClear() {
      this.__data__ = [], this.size = 0
    }
    listCacheClearModuleRef.exports = listCacheClear
  });
  var eqModule = defineCommonjsModule((eqExports, eqModuleRef) => {
    function sameValueZeroEqual(eqValue, eqOther) {
      return eqValue === eqOther || eqValue !== eqValue && eqOther !== eqOther
    }
    eqModuleRef.exports = sameValueZeroEqual
  });
  var assocIndexOfModule = defineCommonjsModule((assocIndexOfExports, assocIndexOfModuleRef) => {
    var eqRef = eqModule();

    function assocIndexOf(assocArray, assocKey) {
      for (var assocIndex = assocArray.length; assocIndex--;)
        if (eqRef(assocArray[assocIndex][0], assocKey)) return assocIndex;
      return -1
    }
    assocIndexOfModuleRef.exports = assocIndexOf
  });
  var listCacheDeleteModule = defineCommonjsModule((listCacheDeleteExports, listCacheDeleteModuleRef) => {
    var assocIndexOfRefDelete = assocIndexOfModule(),
      arrayProto = Array.prototype,
      spliceRef = arrayProto.splice;

    function listCacheDelete(cacheDeleteKey) {
      var cacheDeleteData = this.__data__,
        cacheDeleteIndex = assocIndexOfRefDelete(cacheDeleteData, cacheDeleteKey);
      if (cacheDeleteIndex < 0) return !1;
      var cacheDeleteLastIndex = cacheDeleteData.length - 1;
      return cacheDeleteIndex == cacheDeleteLastIndex ? cacheDeleteData.pop() : spliceRef.call(cacheDeleteData, cacheDeleteIndex, 1), --this.size, !0
    }
    listCacheDeleteModuleRef.exports = listCacheDelete
  });
  var listCacheGetModule = defineCommonjsModule((listCacheGetExports, listCacheGetModuleRef) => {
    var assocIndexOfRefGet = assocIndexOfModule();

    function listCacheGet(cacheGetKey) {
      var cacheGetData = this.__data__,
        cacheGetIndex = assocIndexOfRefGet(cacheGetData, cacheGetKey);
      return cacheGetIndex < 0 ? void 0 : cacheGetData[cacheGetIndex][1]
    }
    listCacheGetModuleRef.exports = listCacheGet
  });
  var listCacheHasModule = defineCommonjsModule((listCacheHasExports, listCacheHasModuleRef) => {
    var assocIndexOfRefHas = assocIndexOfModule();

    function listCacheHas(cacheHasKey) {
      return assocIndexOfRefHas(this.__data__, cacheHasKey) > -1
    }
    listCacheHasModuleRef.exports = listCacheHas
  });
  var listCacheSetModule = defineCommonjsModule((listCacheSetExports, listCacheSetModuleRef) => {
    var assocIndexOfRefSet = assocIndexOfModule();

    function listCacheSet(cacheSetKey, cacheSetValue) {
      var cacheSetData = this.__data__,
        cacheSetIndex = assocIndexOfRefSet(cacheSetData, cacheSetKey);
      return cacheSetIndex < 0 ? (++this.size, cacheSetData.push([cacheSetKey, cacheSetValue])) : cacheSetData[cacheSetIndex][1] = cacheSetValue, this
    }
    listCacheSetModuleRef.exports = listCacheSet
  });
  var listCacheModule = defineCommonjsModule((listCacheExports, listCacheModuleRef) => {
    var listCacheClearRef = listCacheClearModule(),
      listCacheDeleteRef = listCacheDeleteModule(),
      listCacheGetRef = listCacheGetModule(),
      listCacheHasRef = listCacheHasModule(),
      listCacheSetRef = listCacheSetModule();

    function ListCache(listCacheEntries) {
      var listCacheIndex = -1,
        listCacheLength = listCacheEntries == null ? 0 : listCacheEntries.length;
      for (this.clear(); ++listCacheIndex < listCacheLength;) {
        var listCacheEntry = listCacheEntries[listCacheIndex];
        this.set(listCacheEntry[0], listCacheEntry[1])
      }
    }
    ListCache.prototype.clear = listCacheClearRef;
    ListCache.prototype.delete = listCacheDeleteRef;
    ListCache.prototype.get = listCacheGetRef;
    ListCache.prototype.has = listCacheHasRef;
    ListCache.prototype.set = listCacheSetRef;
    listCacheModuleRef.exports = ListCache
  });
  var stackClearModule = defineCommonjsModule((stackClearExports, stackClearModuleRef) => {
    var listCacheRef = listCacheModule();

    function stackClear() {
      this.__data__ = new listCacheRef, this.size = 0
    }
    stackClearModuleRef.exports = stackClear
  });
  var stackDeleteModule = defineCommonjsModule((stackDeleteExports, stackDeleteModuleRef) => {
    function stackDelete(stackDeleteKey) {
      var stackDeleteData = this.__data__,
        stackDeleteResult = stackDeleteData.delete(stackDeleteKey);
      return this.size = stackDeleteData.size, stackDeleteResult
    }
    stackDeleteModuleRef.exports = stackDelete
  });
  var stackGetModule = defineCommonjsModule((stackGetExports, stackGetModuleRef) => {
    function stackGet(stackGetKey) {
      return this.__data__.get(stackGetKey)
    }
    stackGetModuleRef.exports = stackGet
  });
  var stackHasModule = defineCommonjsModule((stackHasExports, stackHasModuleRef) => {
    function stackHas(stackHasKey) {
      return this.__data__.has(stackHasKey)
    }
    stackHasModuleRef.exports = stackHas
  });
  var freeGlobalModule = defineCommonjsModule((freeGlobalExports, freeGlobalModuleRef) => {
    var freeGlobal = typeof global == "object" && global && global.Object ===
      Object && global;
    freeGlobalModuleRef.exports = freeGlobal
  });
  var rootModule = defineCommonjsModule((rootExports, rootModuleRef) => {
    var freeGlobalRef = freeGlobalModule(),
      freeSelf = typeof self == "object" && self && self.Object === Object &&
      self,
      rootObject = freeGlobalRef || freeSelf || Function("return this")();
    rootModuleRef.exports = rootObject
  });
  var symbolModule = defineCommonjsModule((symbolExports, symbolModuleRef) => {
    var rootRefSymbol = rootModule(),
      symbolRef = rootRefSymbol.Symbol;
    symbolModuleRef.exports = symbolRef
  });
  var getRawTagModule = defineCommonjsModule((getRawTagExports, getRawTagModuleRef) => {
    var symbolForRawTag = symbolModule(),
      objectProtoRawTag = Object.prototype,
      hasOwnPropertyRawTag = objectProtoRawTag.hasOwnProperty,
      nativeToStringRawTag = objectProtoRawTag.toString,
      symbolToStringTagRawTag = symbolForRawTag ? symbolForRawTag.toStringTag : void 0;

    function getRawTag(rawTagValue) {
      var rawTagIsOwn = hasOwnPropertyRawTag.call(rawTagValue, symbolToStringTagRawTag),
        rawTagOriginal = rawTagValue[symbolToStringTagRawTag];
      try {
        rawTagValue[symbolToStringTagRawTag] = void 0;
        var rawTagUnmasked = !0
      } catch {}
      var rawTagResult = nativeToStringRawTag.call(rawTagValue);
      return rawTagUnmasked && (rawTagIsOwn ? rawTagValue[symbolToStringTagRawTag] = rawTagOriginal : delete rawTagValue[symbolToStringTagRawTag]), rawTagResult
    }
    getRawTagModuleRef.exports = getRawTag
  });
  var objectToStringModule = defineCommonjsModule((objectToStringExports, objectToStringModuleRef) => {
    var objectProtoToString = Object.prototype,
      nativeObjectToString = objectProtoToString.toString;

    function objectToString(objectToStringValue) {
      return nativeObjectToString.call(objectToStringValue)
    }
    objectToStringModuleRef.exports = objectToString
  });
  var baseGetTagModule = defineCommonjsModule((baseGetTagExports, baseGetTagModuleRef) => {
    var symbolForBaseGetTag = symbolModule(),
      getRawTagRef = getRawTagModule(),
      objectToStringRef = objectToStringModule(),
      nullTag = "[object Null]",
      undefinedTag = "[object Undefined]",
      symbolToStringTagBase = symbolForBaseGetTag ? symbolForBaseGetTag.toStringTag : void 0;

    function baseGetTag(baseGetTagValue) {
      return baseGetTagValue == null ? baseGetTagValue === void 0 ? undefinedTag : nullTag : symbolToStringTagBase && symbolToStringTagBase in Object(baseGetTagValue) ?
        getRawTagRef(baseGetTagValue) : objectToStringRef(baseGetTagValue)
    }
    baseGetTagModuleRef.exports = baseGetTag
  });
  var isObjectModule = defineCommonjsModule((isObjectExports, isObjectModuleRef) => {
    function isObject(isObjectValue) {
      var isObjectType = typeof isObjectValue;
      return isObjectValue != null && (isObjectType == "object" || isObjectType == "function")
    }
    isObjectModuleRef.exports = isObject
  });
  var isFunctionModule = defineCommonjsModule((isFunctionExports, isFunctionModuleRef) => {
    var baseGetTagRef = baseGetTagModule(),
      isObjectRef = isObjectModule(),
      asyncFunctionTag = "[object AsyncFunction]",
      functionTag = "[object Function]",
      generatorFunctionTag = "[object GeneratorFunction]",
      proxyTag = "[object Proxy]";

    function isFunction(isFunctionValue) {
      if (!isObjectRef(isFunctionValue)) return !1;
      var isFunctionTag = baseGetTagRef(isFunctionValue);
      return isFunctionTag == functionTag || isFunctionTag == generatorFunctionTag || isFunctionTag == asyncFunctionTag || isFunctionTag == proxyTag
    }
    isFunctionModuleRef.exports = isFunction
  });
  var coreJsDataModule = defineCommonjsModule((coreJsDataExports, coreJsDataModuleRef) => {
    var rootRefCoreJs = rootModule(),
      coreJsData = rootRefCoreJs["__core-js_shared__"];
    coreJsDataModuleRef.exports = coreJsData
  });
  var isMaskedModule = defineCommonjsModule((isMaskedExports, isMaskedModuleRef) => {
    var coreJsDataRef = coreJsDataModule(),
      maskSrcKey = function() {
        var maskUidMatch = /[^.]+$/.exec(coreJsDataRef && coreJsDataRef.keys && coreJsDataRef.keys.IE_PROTO || "");
        return maskUidMatch ? "Symbol(src)_1." + maskUidMatch : ""
      }();

    function isMasked(isMaskedFunc) {
      return !!maskSrcKey && maskSrcKey in isMaskedFunc
    }
    isMaskedModuleRef.exports = isMasked
  });
  var toSourceModule = defineCommonjsModule((toSourceExports, toSourceModuleRef) => {
    var funcProtoToSource = Function.prototype,
      functionToStringSource = funcProtoToSource.toString;

    function toSource(toSourceFunc) {
      if (toSourceFunc != null) {
        try {
          return functionToStringSource.call(toSourceFunc)
        } catch {}
        try {
          return toSourceFunc + ""
        } catch {}
      }
      return ""
    }
    toSourceModuleRef.exports = toSource
  });
  var baseIsNativeModule = defineCommonjsModule((baseIsNativeExports, baseIsNativeModuleRef) => {
    var isFunctionRef = isFunctionModule(),
      isMaskedRef = isMaskedModule(),
      isObjectRefNative = isObjectModule(),
      toSourceRef = toSourceModule(),
      reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reIsNative = /^\[object .+?Constructor\]$/,
      funcProtoNative = Function.prototype,
      objectProtoNative = Object.prototype,
      functionToStringNative = funcProtoNative.toString,
      hasOwnPropertyNative = objectProtoNative.hasOwnProperty,
      reIsNativePattern = RegExp("^" + functionToStringNative.call(hasOwnPropertyNative)
        .replace(reRegExpChar, "\\$&")
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?") + "$");

    function baseIsNative(baseIsNativeValue) {
      if (!isObjectRefNative(baseIsNativeValue) || isMaskedRef(baseIsNativeValue)) return !1;
      var baseIsNativePattern = isFunctionRef(baseIsNativeValue) ? reIsNativePattern : reIsNative;
      return baseIsNativePattern.test(toSourceRef(baseIsNativeValue))
    }
    baseIsNativeModuleRef.exports = baseIsNative
  });
  var getValueModule = defineCommonjsModule((getValueExports, getValueModuleRef) => {
    function getValue(getValueObject, getValueKey) {
      return getValueObject?.[getValueKey]
    }
    getValueModuleRef.exports = getValue
  });
  var getNativeModule = defineCommonjsModule((getNativeExports, getNativeModuleRef) => {
    var baseIsNativeRef = baseIsNativeModule(),
      getValueRef = getValueModule();

    function getNative(getNativeObject, getNativeKey) {
      var getNativeValue = getValueRef(getNativeObject, getNativeKey);
      return baseIsNativeRef(getNativeValue) ? getNativeValue : void 0
    }
    getNativeModuleRef.exports = getNative
  });
  var mapModule = defineCommonjsModule((mapExports, mapModuleRef) => {
    var getNativeRefMap = getNativeModule(),
      rootRefMap = rootModule(),
      MapReference = getNativeRefMap(rootRefMap, "Map");
    mapModuleRef.exports = MapReference
  });
  var nativeCreateModule = defineCommonjsModule((nativeCreateExports, nativeCreateModuleRef) => {
    var getNativeRefCreate = getNativeModule(),
      nativeCreate = getNativeRefCreate(Object, "create");
    nativeCreateModuleRef.exports = nativeCreate
  });
  var hashClearModule = defineCommonjsModule((hashClearExports, hashClearModuleRef) => {
    var nativeCreateRefClear = nativeCreateModule();

    function hashClear() {
      this.__data__ = nativeCreateRefClear ? nativeCreateRefClear(null) : {}, this.size = 0
    }
    hashClearModuleRef.exports = hashClear
  });
  var hashDeleteModule = defineCommonjsModule((hashDeleteExports, hashDeleteModuleRef) => {
    function hashDelete(hashDeleteKey) {
      var hashDeleteResult = this.has(hashDeleteKey) && delete this.__data__[hashDeleteKey];
      return this.size -= hashDeleteResult ? 1 : 0, hashDeleteResult
    }
    hashDeleteModuleRef.exports = hashDelete
  });
  var hashGetModule = defineCommonjsModule((hashGetExports, hashGetModuleRef) => {
    var nativeCreateRefGet = nativeCreateModule(),
      hashUndefinedGet = "__lodash_hash_undefined__",
      objectProtoHashGet = Object.prototype,
      hasOwnPropertyHashGet = objectProtoHashGet.hasOwnProperty;

    function hashGet(hashGetKey) {
      var hashGetData = this.__data__;
      if (nativeCreateRefGet) {
        var hashGetValue = hashGetData[hashGetKey];
        return hashGetValue === hashUndefinedGet ? void 0 : hashGetValue
      }
      return hasOwnPropertyHashGet.call(hashGetData, hashGetKey) ? hashGetData[hashGetKey] : void 0
    }
    hashGetModuleRef.exports = hashGet
  });
  var hashHasModule = defineCommonjsModule((hashHasExports, hashHasModuleRef) => {
    var nativeCreateRefHas = nativeCreateModule(),
      objectProtoHashHas = Object.prototype,
      hasOwnPropertyHashHas = objectProtoHashHas.hasOwnProperty;

    function hashHas(hashHasKey) {
      var hashHasData = this.__data__;
      return nativeCreateRefHas ? hashHasData[hashHasKey] !== void 0 : hasOwnPropertyHashHas.call(hashHasData, hashHasKey)
    }
    hashHasModuleRef.exports = hashHas
  });
  var hashSetModule = defineCommonjsModule((hashSetExports, hashSetModuleRef) => {
    var nativeCreateRefSet = nativeCreateModule(),
      hashUndefinedSet = "__lodash_hash_undefined__";

    function hashSet(hashSetKey, hashSetValue) {
      var hashSetData = this.__data__;
      return this.size += this.has(hashSetKey) ? 0 : 1, hashSetData[hashSetKey] = nativeCreateRefSet && hashSetValue === void 0 ?
        hashUndefinedSet : hashSetValue, this
    }
    hashSetModuleRef.exports = hashSet
  });
  var hashConstructorModule = defineCommonjsModule((hashConstructorExports, hashConstructorModuleRef) => {
    var hashClearRef = hashClearModule(),
      hashDeleteRef = hashDeleteModule(),
      hashGetRef = hashGetModule(),
      hashHasRef = hashHasModule(),
      hashSetRef = hashSetModule();

    function Hash(hashEntries) {
      var hashIndex = -1,
        hashLength = hashEntries == null ? 0 : hashEntries.length;
      for (this.clear(); ++hashIndex < hashLength;) {
        var hashEntry = hashEntries[hashIndex];
        this.set(hashEntry[0], hashEntry[1])
      }
    }
    Hash.prototype.clear = hashClearRef;
    Hash.prototype.delete = hashDeleteRef;
    Hash.prototype.get = hashGetRef;
    Hash.prototype.has = hashHasRef;
    Hash.prototype.set = hashSetRef;
    hashConstructorModuleRef.exports = Hash
  });
  var mapCacheClearModule = defineCommonjsModule((mapCacheClearExports, mapCacheClearModuleRef) => {
    var hashRef = hashConstructorModule(),
      listCacheRefMapClear = listCacheModule(),
      mapRefMapClear = mapModule();

    function mapCacheClear() {
      this.size = 0, this.__data__ = {
        hash: new hashRef,
        map: new(mapRefMapClear || listCacheRefMapClear),
        string: new hashRef
      }
    }
    mapCacheClearModuleRef.exports = mapCacheClear
  });
  var isKeyableModule = defineCommonjsModule((isKeyableExports, isKeyableModuleRef) => {
    function isKeyable(keyableValue) {
      var keyableType = typeof keyableValue;
      return keyableType == "string" || keyableType == "number" || keyableType == "symbol" || keyableType ==
        "boolean" ? keyableValue !== "__proto__" : keyableValue === null
    }
    isKeyableModuleRef.exports = isKeyable
  });
  var getMapDataModule = defineCommonjsModule((getMapDataExports, getMapDataModuleRef) => {
    var isKeyableRef = isKeyableModule();

    function getMapData(mapDataMap, mapDataKey) {
      var mapDataInternal = mapDataMap.__data__;
      return isKeyableRef(mapDataKey) ? mapDataInternal[typeof mapDataKey == "string" ? "string" : "hash"] : mapDataInternal.map
    }
    getMapDataModuleRef.exports = getMapData
  });
  var mapCacheDeleteModule = defineCommonjsModule((mapCacheDeleteExports, mapCacheDeleteModuleRef) => {
    var getMapDataRefDelete = getMapDataModule();

    function mapCacheDelete(mapDeleteKey) {
      var mapDeleteResult = getMapDataRefDelete(this, mapDeleteKey)
        .delete(mapDeleteKey);
      return this.size -= mapDeleteResult ? 1 : 0, mapDeleteResult
    }
    mapCacheDeleteModuleRef.exports = mapCacheDelete
  });
  var mapCacheGetModule = defineCommonjsModule((mapCacheGetExports, mapCacheGetModuleRef) => {
    var getMapDataRefGet = getMapDataModule();

    function mapCacheGet(mapGetKey) {
      return getMapDataRefGet(this, mapGetKey)
        .get(mapGetKey)
    }
    mapCacheGetModuleRef.exports = mapCacheGet
  });
  var mapCacheHasModule = defineCommonjsModule((mapCacheHasExports, mapCacheHasModuleRef) => {
    var getMapDataRefHas = getMapDataModule();

    function mapCacheHas(mapHasKey) {
      return getMapDataRefHas(this, mapHasKey)
        .has(mapHasKey)
    }
    mapCacheHasModuleRef.exports = mapCacheHas
  });
  var mapCacheSetModule = defineCommonjsModule((mapCacheSetExports, mapCacheSetModuleRef) => {
    var getMapDataRefSet = getMapDataModule();

    function mapCacheSet(mapSetKey, mapSetValue) {
      var mapSetData = getMapDataRefSet(this, mapSetKey),
        mapSetSize = mapSetData.size;
      return mapSetData.set(mapSetKey, mapSetValue), this.size += mapSetData.size == mapSetSize ? 0 : 1, this
    }
    mapCacheSetModuleRef.exports = mapCacheSet
  });
  var mapCacheModule = defineCommonjsModule((mapCacheExports, mapCacheModuleRef) => {
    var mapCacheClearRef = mapCacheClearModule(),
      mapCacheDeleteRef = mapCacheDeleteModule(),
      mapCacheGetRef = mapCacheGetModule(),
      mapCacheHasRef = mapCacheHasModule(),
      mapCacheSetRef = mapCacheSetModule();

    function MapCache(mapCacheEntries) {
      var mapCacheIndex = -1,
        mapCacheLength = mapCacheEntries == null ? 0 : mapCacheEntries.length;
      for (this.clear(); ++mapCacheIndex < mapCacheLength;) {
        var mapCacheEntry = mapCacheEntries[mapCacheIndex];
        this.set(mapCacheEntry[0], mapCacheEntry[1])
      }
    }
    MapCache.prototype.clear = mapCacheClearRef;
    MapCache.prototype.delete = mapCacheDeleteRef;
    MapCache.prototype.get = mapCacheGetRef;
    MapCache.prototype.has = mapCacheHasRef;
    MapCache.prototype.set = mapCacheSetRef;
    mapCacheModuleRef.exports = MapCache
  });
  var stackSetModule = defineCommonjsModule((stackSetExports, stackSetModuleRef) => {
    var listCacheRefStackSet = listCacheModule(),
      mapRefStackSet = mapModule(),
      mapCacheRef = mapCacheModule(),
      largeArraySize = 200;

    function stackSet(stackSetKey, stackSetValue) {
      var stackSetData = this.__data__;
      if (stackSetData instanceof listCacheRefStackSet) {
        var stackSetPairs = stackSetData.__data__;
        if (!mapRefStackSet || stackSetPairs.length < largeArraySize - 1) return stackSetPairs.push([stackSetKey, stackSetValue]), this
          .size = ++stackSetData.size, this;
        stackSetData = this.__data__ = new mapCacheRef(stackSetPairs)
      }
      return stackSetData.set(stackSetKey, stackSetValue), this.size = stackSetData.size, this
    }
    stackSetModuleRef.exports = stackSet
  });
  var stackModule = defineCommonjsModule((stackExports, stackModuleRef) => {
    var listCacheRefStack = listCacheModule(),
      stackClearRef = stackClearModule(),
      stackDeleteRef = stackDeleteModule(),
      stackGetRef = stackGetModule(),
      stackHasRef = stackHasModule(),
      stackSetRef = stackSetModule();

    function Stack(stackEntries) {
      var stackData = this.__data__ = new listCacheRefStack(stackEntries);
      this.size = stackData.size
    }
    Stack.prototype.clear = stackClearRef;
    Stack.prototype.delete = stackDeleteRef;
    Stack.prototype.get = stackGetRef;
    Stack.prototype.has = stackHasRef;
    Stack.prototype.set = stackSetRef;
    stackModuleRef.exports = Stack
  });
  var setCacheAddModule = defineCommonjsModule((setCacheAddExports, setCacheAddModuleRef) => {
    var hashUndefinedSetCache = "__lodash_hash_undefined__";

    function setCacheAdd(setCacheAddValue) {
      return this.__data__.set(setCacheAddValue, hashUndefinedSetCache), this
    }
    setCacheAddModuleRef.exports = setCacheAdd
  });
  var setCacheHasModule = defineCommonjsModule((setCacheHasExports, setCacheHasModuleRef) => {
    function setCacheHas(setCacheHasValue) {
      return this.__data__.has(setCacheHasValue)
    }
    setCacheHasModuleRef.exports = setCacheHas
  });
  var setCacheModule = defineCommonjsModule((setCacheExports, setCacheModuleRef) => {
    var mapCacheRefSetCache = mapCacheModule(),
      setCacheAddRef = setCacheAddModule(),
      setCacheHasRef = setCacheHasModule();

    function SetCache(setCacheValues) {
      var setCacheIndex = -1,
        setCacheLength = setCacheValues == null ? 0 : setCacheValues.length;
      for (this.__data__ = new mapCacheRefSetCache; ++setCacheIndex < setCacheLength;) this.add(setCacheValues[setCacheIndex])
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAddRef;
    SetCache.prototype.has = setCacheHasRef;
    setCacheModuleRef.exports = SetCache
  });
  var arraySomeModule = defineCommonjsModule((arraySomeExports, arraySomeModuleRef) => {
    function arraySome(arraySomeArray, arraySomePredicate) {
      for (var arraySomeIndex = -1, arraySomeLength = arraySomeArray == null ? 0 : arraySomeArray.length; ++arraySomeIndex < arraySomeLength;)
        if (arraySomePredicate(arraySomeArray[arraySomeIndex], arraySomeIndex, arraySomeArray)) return !0;
      return !1
    }
    arraySomeModuleRef.exports = arraySome
  });
  var cacheHasModule = defineCommonjsModule((cacheHasExports, cacheHasModuleRef) => {
    function cacheHas(cacheHasCache, cacheHasKey) {
      return cacheHasCache.has(cacheHasKey)
    }
    cacheHasModuleRef.exports = cacheHas
  });
  var equalArraysModule = defineCommonjsModule((equalArraysExports, equalArraysModuleRef) => {
    var setCacheRef = setCacheModule(),
      arraySomeRef = arraySomeModule(),
      cacheHasRef = cacheHasModule(),
      comparePartialFlag = 1,
      compareUnorderedFlag = 2;

    function equalArrays(arrayA, arrayB, equalArraysBitmask, equalArraysCustomizer, equalArraysEqualFunc, equalArraysStack) {
      var equalArraysIsPartial = equalArraysBitmask & comparePartialFlag,
        arrayALength = arrayA.length,
        arrayBLength = arrayB.length;
      if (arrayALength != arrayBLength && !(equalArraysIsPartial && arrayBLength > arrayALength)) return !1;
      var arrayAStacked = equalArraysStack.get(arrayA),
        arrayBStacked = equalArraysStack.get(arrayB);
      if (arrayAStacked && arrayBStacked) return arrayAStacked == arrayB && arrayBStacked == arrayA;
      var equalArraysIndex = -1,
        equalArraysResult = !0,
        equalArraysSeen = equalArraysBitmask & compareUnorderedFlag ? new setCacheRef : void 0;
      for (equalArraysStack.set(arrayA, arrayB), equalArraysStack.set(arrayB, arrayA); ++equalArraysIndex < arrayALength;) {
        var arrayAValue = arrayA[equalArraysIndex],
          arrayBValue = arrayB[equalArraysIndex];
        if (equalArraysCustomizer) var equalArraysCompared = equalArraysIsPartial ? equalArraysCustomizer(arrayBValue, arrayAValue, equalArraysIndex, arrayB, arrayA, equalArraysStack) : equalArraysCustomizer(arrayAValue, arrayBValue, equalArraysIndex, arrayA, arrayB, equalArraysStack);
        if (equalArraysCompared !== void 0) {
          if (equalArraysCompared) continue;
          equalArraysResult = !1;
          break
        }
        if (equalArraysSeen) {
          if (!arraySomeRef(arrayB, function(arraySomeOthValue, arraySomeOthIndex) {
              if (!cacheHasRef(equalArraysSeen, arraySomeOthIndex) && (arrayAValue === arraySomeOthValue || equalArraysEqualFunc(arrayAValue, arraySomeOthValue, equalArraysBitmask, equalArraysCustomizer, equalArraysStack))) return equalArraysSeen
                .push(arraySomeOthIndex)
            })) {
            equalArraysResult = !1;
            break
          }
        } else if (!(arrayAValue === arrayBValue || equalArraysEqualFunc(arrayAValue, arrayBValue, equalArraysBitmask, equalArraysCustomizer, equalArraysStack))) {
          equalArraysResult = !1;
          break
        }
      }
      return equalArraysStack.delete(arrayA), equalArraysStack.delete(arrayB), equalArraysResult
    }
    equalArraysModuleRef.exports = equalArrays
  });
  var uint8ArrayModule = defineCommonjsModule((uint8ArrayExports, uint8ArrayModuleRef) => {
    var rootRefUint8 = rootModule(),
      Uint8ArrayRef = rootRefUint8.Uint8Array;
    uint8ArrayModuleRef.exports = Uint8ArrayRef
  });
  var mapToArrayModule = defineCommonjsModule((mapToArrayExports, mapToArrayModuleRef) => {
    function mapToArray(mapToArrayMap) {
      var mapToArrayIndex = -1,
        mapToArrayResult = Array(mapToArrayMap.size);
      return mapToArrayMap.forEach(function(mapToArrayValue, mapToArrayKey) {
        mapToArrayResult[++mapToArrayIndex] = [mapToArrayKey, mapToArrayValue]
      }), mapToArrayResult
    }
    mapToArrayModuleRef.exports = mapToArray
  });
  var setToArrayModule = defineCommonjsModule((setToArrayExports, setToArrayModuleRef) => {
    function setToArray(setToArraySet) {
      var setToArrayIndex = -1,
        setToArrayResult = Array(setToArraySet.size);
      return setToArraySet.forEach(function(setToArrayValue) {
        setToArrayResult[++setToArrayIndex] = setToArrayValue
      }), setToArrayResult
    }
    setToArrayModuleRef.exports = setToArray
  });
  var equalByTagModule = defineCommonjsModule((equalByTagExports, equalByTagModuleRef) => {
    var symbolRefEqualByTag = symbolModule(),
      uint8ArrayRef = uint8ArrayModule(),
      eqRefEqualByTag = eqModule(),
      equalArraysRef = equalArraysModule(),
      mapToArrayRef = mapToArrayModule(),
      setToArrayRef = setToArrayModule(),
      comparePartialFlagTag = 1,
      compareUnorderedFlagTag = 2,
      booleanTag = "[object Boolean]",
      dateTag = "[object Date]",
      errorTag = "[object Error]",
      mapTag = "[object Map]",
      numberTag = "[object Number]",
      regexpTag = "[object RegExp]",
      setTag = "[object Set]",
      stringTag = "[object String]",
      symbolTag = "[object Symbol]",
      arrayBufferTag = "[object ArrayBuffer]",
      dataViewTag = "[object DataView]",
      symbolProtoEqualByTag = symbolRefEqualByTag ? symbolRefEqualByTag.prototype : void 0,
      symbolValueOf = symbolProtoEqualByTag ? symbolProtoEqualByTag.valueOf : void 0;

    function equalByTag(equalByTagObjectA, equalByTagObjectB, equalByTagTag, equalByTagBitmask, equalByTagCustomizer, equalByTagEqualFunc, equalByTagStack) {
      switch (equalByTagTag) {
        case dataViewTag:
          if (equalByTagObjectA.byteLength != equalByTagObjectB.byteLength || equalByTagObjectA.byteOffset != equalByTagObjectB
            .byteOffset) return !1;
          equalByTagObjectA = equalByTagObjectA.buffer, equalByTagObjectB = equalByTagObjectB.buffer;
        case arrayBufferTag:
          return !(equalByTagObjectA.byteLength != equalByTagObjectB.byteLength || !equalByTagEqualFunc(new uint8ArrayRef(equalByTagObjectA), new uint8ArrayRef(
            equalByTagObjectB)));
        case booleanTag:
        case dateTag:
        case numberTag:
          return eqRefEqualByTag(+equalByTagObjectA, +equalByTagObjectB);
        case errorTag:
          return equalByTagObjectA.name == equalByTagObjectB.name && equalByTagObjectA.message == equalByTagObjectB.message;
        case regexpTag:
        case stringTag:
          return equalByTagObjectA == equalByTagObjectB + "";
        case mapTag:
          var equalByTagConvert = mapToArrayRef;
        case setTag:
          var equalByTagIsPartial = equalByTagBitmask & comparePartialFlagTag;
          if (equalByTagConvert || (equalByTagConvert = setToArrayRef), equalByTagObjectA.size != equalByTagObjectB.size && !equalByTagIsPartial) return !1;
          var equalByTagStacked = equalByTagStack.get(equalByTagObjectA);
          if (equalByTagStacked) return equalByTagStacked == equalByTagObjectB;
          equalByTagBitmask |= compareUnorderedFlagTag, equalByTagStack.set(equalByTagObjectA, equalByTagObjectB);
          var equalByTagResult = equalArraysRef(equalByTagConvert(equalByTagObjectA), equalByTagConvert(equalByTagObjectB), equalByTagBitmask, equalByTagCustomizer, equalByTagEqualFunc, equalByTagStack);
          return equalByTagStack.delete(equalByTagObjectA), equalByTagResult;
        case symbolTag:
          if (symbolValueOf) return symbolValueOf.call(equalByTagObjectA) == symbolValueOf.call(equalByTagObjectB)
      }
      return !1
    }
    equalByTagModuleRef.exports = equalByTag
  });
  var arrayPushModule = defineCommonjsModule((arrayPushExports, arrayPushModuleRef) => {
    function arrayPush(arrayPushArray, arrayPushValues) {
      for (var arrayPushIndex = -1, arrayPushLength = arrayPushValues.length, arrayPushOffset = arrayPushArray.length; ++arrayPushIndex < arrayPushLength;) arrayPushArray[arrayPushOffset + arrayPushIndex] = arrayPushValues[
        arrayPushIndex];
      return arrayPushArray
    }
    arrayPushModuleRef.exports = arrayPush
  });
  var isArrayModule = defineCommonjsModule((isArrayExports, isArrayModuleRef) => {
    var isArray = Array.isArray;
    isArrayModuleRef.exports = isArray
  });
  var baseGetAllKeysModule = defineCommonjsModule((baseGetAllKeysExports, baseGetAllKeysModuleRef) => {
    var arrayPushRef = arrayPushModule(),
      isArrayRef = isArrayModule();

    function baseGetAllKeys(allKeysObject, allKeysFn, allKeysSymbolsFn) {
      var allKeysResult = allKeysFn(allKeysObject);
      return isArrayRef(allKeysObject) ? allKeysResult : arrayPushRef(allKeysResult, allKeysSymbolsFn(allKeysObject))
    }
    baseGetAllKeysModuleRef.exports = baseGetAllKeys
  });
  var arrayFilterModule = defineCommonjsModule((arrayFilterExports, arrayFilterModuleRef) => {
    function arrayFilter(filterArray, filterPredicate) {
      for (var filterIndex = -1, filterLength = filterArray == null ? 0 : filterArray.length, filterResultIndex = 0, filterResult = []; ++filterIndex <
        filterLength;) {
        var filterValue = filterArray[filterIndex];
        filterPredicate(filterValue, filterIndex, filterArray) && (filterResult[filterResultIndex++] = filterValue)
      }
      return filterResult
    }
    arrayFilterModuleRef.exports = arrayFilter
  });
  var stubArrayModule = defineCommonjsModule((stubArrayExports, stubArrayModuleRef) => {
    function stubArray() {
      return []
    }
    stubArrayModuleRef.exports = stubArray
  });
  var getSymbolsModule = defineCommonjsModule((getSymbolsExports, getSymbolsModuleRef) => {
    var arrayFilterRef = arrayFilterModule(),
      stubArrayRef = stubArrayModule(),
      objectProtoSymbols = Object.prototype,
      propertyIsEnumerableSymbols = objectProtoSymbols.propertyIsEnumerable,
      nativeGetSymbols = Object.getOwnPropertySymbols,
      getSymbols = nativeGetSymbols ? function(getSymbolsObject) {
        return getSymbolsObject == null ? [] : (getSymbolsObject = Object(getSymbolsObject), arrayFilterRef(nativeGetSymbols(getSymbolsObject), function(getSymbolsSymbol) {
          return propertyIsEnumerableSymbols.call(getSymbolsObject, getSymbolsSymbol)
        }))
      } : stubArrayRef;
    getSymbolsModuleRef.exports = getSymbols
  });
  var baseTimesModule = defineCommonjsModule((baseTimesExports, baseTimesModuleRef) => {
    function baseTimes(timesN, timesIteratee) {
      for (var timesIndex = -1, timesResult = Array(timesN); ++timesIndex < timesN;) timesResult[timesIndex] = timesIteratee(timesIndex);
      return timesResult
    }
    baseTimesModuleRef.exports = baseTimes
  });
  var isObjectLikeModule = defineCommonjsModule((isObjectLikeExports, isObjectLikeModuleRef) => {
    function isObjectLike(objectLikeValue) {
      return objectLikeValue != null && typeof objectLikeValue == "object"
    }
    isObjectLikeModuleRef.exports = isObjectLike
  });
  var baseIsArgumentsModule = defineCommonjsModule((baseIsArgumentsExports, baseIsArgumentsModuleRef) => {
    var baseGetTagRefArgs = baseGetTagModule(),
      isObjectLikeRefArgs = isObjectLikeModule(),
      argsTag = "[object Arguments]";

    function baseIsArguments(argumentsValue) {
      return isObjectLikeRefArgs(argumentsValue) && baseGetTagRefArgs(argumentsValue) == argsTag
    }
    baseIsArgumentsModuleRef.exports = baseIsArguments
  });
  var isArgumentsModule = defineCommonjsModule((isArgumentsExports, isArgumentsModuleRef) => {
    var baseIsArgumentsRef = baseIsArgumentsModule(),
      isObjectLikeRefArgs2 = isObjectLikeModule(),
      objectProtoArgs = Object.prototype,
      hasOwnPropertyArgs = objectProtoArgs.hasOwnProperty,
      propertyIsEnumerableArgs = objectProtoArgs.propertyIsEnumerable,
      isArguments = baseIsArgumentsRef(function() {
        return arguments
      }()) ? baseIsArgumentsRef : function(argumentsValue2) {
        return isObjectLikeRefArgs2(argumentsValue2) && hasOwnPropertyArgs.call(argumentsValue2, "callee") && !propertyIsEnumerableArgs.call(argumentsValue2, "callee")
      };
    isArgumentsModuleRef.exports = isArguments
  });
  var stubFalseModule = defineCommonjsModule((stubFalseExports, stubFalseModuleRef) => {
    function stubFalse() {
      return !1
    }
    stubFalseModuleRef.exports = stubFalse
  });
  var isBufferModule = defineCommonjsModule((isBufferExports, isBufferModuleRef) => {
    var rootRefBuffer = rootModule(),
      stubFalseRef = stubFalseModule(),
      freeExports = typeof isBufferExports == "object" && isBufferExports && !isBufferExports.nodeType && isBufferExports,
      freeModule = freeExports && typeof isBufferModuleRef == "object" && isBufferModuleRef && !isBufferModuleRef.nodeType && isBufferModuleRef,
      moduleExportsBuffer = freeModule && freeModule.exports === freeExports,
      bufferRef = moduleExportsBuffer ? rootRefBuffer.Buffer : void 0,
      nativeIsBuffer = bufferRef ? bufferRef.isBuffer : void 0,
      isBuffer = nativeIsBuffer || stubFalseRef;
    isBufferModuleRef.exports = isBuffer
  });
  var isIndexModule = defineCommonjsModule((isIndexExports, isIndexModuleRef) => {
    var maxSafeInteger = 9007199254740991,
      reIsUint = /^(?:0|[1-9]\d*)$/;

    function isIndex(isIndexValue, isIndexLength) {
      var isIndexType = typeof isIndexValue;
      return isIndexLength = isIndexLength ?? maxSafeInteger, !!isIndexLength && (isIndexType == "number" || isIndexType != "symbol" && reIsUint
        .test(isIndexValue)) && isIndexValue > -1 && isIndexValue % 1 == 0 && isIndexValue < isIndexLength
    }
    isIndexModuleRef.exports = isIndex
  });
  var isLengthModule = defineCommonjsModule((isLengthExports, isLengthModuleRef) => {
    var maxSafeIntegerLength = 9007199254740991;

    function isLength(isLengthValue) {
      return typeof isLengthValue == "number" && isLengthValue > -1 && isLengthValue % 1 == 0 && isLengthValue <= maxSafeIntegerLength
    }
    isLengthModuleRef.exports = isLength
  });
  var baseIsTypedArrayModule = defineCommonjsModule((baseIsTypedArrayExports, baseIsTypedArrayModuleRef) => {
    var baseGetTagRefTyped = baseGetTagModule(),
      isLengthRefTyped = isLengthModule(),
      isObjectLikeRefTyped = isObjectLikeModule(),
      argsTagTyped = "[object Arguments]",
      arrayTagTyped = "[object Array]",
      boolTagTyped = "[object Boolean]",
      dateTagTyped = "[object Date]",
      errorTagTyped = "[object Error]",
      funcTagTyped = "[object Function]",
      mapTagTyped = "[object Map]",
      numberTagTyped = "[object Number]",
      objectTagTyped = "[object Object]",
      regexpTagTyped = "[object RegExp]",
      setTagTyped = "[object Set]",
      stringTagTyped = "[object String]",
      weakMapTagTyped = "[object WeakMap]",
      arrayBufferTagTyped = "[object ArrayBuffer]",
      dataViewTagTyped = "[object DataView]",
      float32Tag = "[object Float32Array]",
      float64Tag = "[object Float64Array]",
      int8Tag = "[object Int8Array]",
      int16Tag = "[object Int16Array]",
      int32Tag = "[object Int32Array]",
      uint8TagTyped = "[object Uint8Array]",
      uint8ClampedTag = "[object Uint8ClampedArray]",
      uint16Tag = "[object Uint16Array]",
      uint32Tag = "[object Uint32Array]",
      typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8TagTyped] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[
      uint32Tag] = !0;
    typedArrayTags[argsTagTyped] = typedArrayTags[arrayTagTyped] = typedArrayTags[arrayBufferTagTyped] = typedArrayTags[boolTagTyped] = typedArrayTags[dataViewTagTyped] = typedArrayTags[dateTagTyped] = typedArrayTags[errorTagTyped] = typedArrayTags[funcTagTyped] = typedArrayTags[
      mapTagTyped] = typedArrayTags[numberTagTyped] = typedArrayTags[objectTagTyped] = typedArrayTags[regexpTagTyped] = typedArrayTags[setTagTyped] = typedArrayTags[stringTagTyped] = typedArrayTags[weakMapTagTyped] = !1;

    function baseIsTypedArray(typedArrayValue) {
      return isObjectLikeRefTyped(typedArrayValue) && isLengthRefTyped(typedArrayValue.length) && !!typedArrayTags[baseGetTagRefTyped(typedArrayValue)]
    }
    baseIsTypedArrayModuleRef.exports = baseIsTypedArray
  });
  var baseUnaryModule = defineCommonjsModule((baseUnaryExports, baseUnaryModuleRef) => {
    function baseUnary(baseUnaryFunc) {
      return function(baseUnaryValue) {
        return baseUnaryFunc(baseUnaryValue)
      }
    }
    baseUnaryModuleRef.exports = baseUnary
  });
  var nodeUtilModule = defineCommonjsModule((nodeUtilExports, nodeUtilModuleRef) => {
    var freeGlobalRefNode = freeGlobalModule(),
      freeExportsNode = typeof nodeUtilExports == "object" && nodeUtilExports && !nodeUtilExports.nodeType && nodeUtilExports,
      freeModuleNode = freeExportsNode && typeof nodeUtilModuleRef == "object" && nodeUtilModuleRef && !nodeUtilModuleRef.nodeType && nodeUtilModuleRef,
      moduleExportsNode = freeModuleNode && freeModuleNode.exports === freeExportsNode,
      freeProcess = moduleExportsNode && freeGlobalRefNode.process,
      nodeUtil = function() {
        try {
          var nodeUtilRequired = freeModuleNode && freeModuleNode.require && freeModuleNode.require("util")
            .types;
          return nodeUtilRequired || freeProcess && freeProcess.binding && freeProcess.binding("util")
        } catch {}
      }();
    nodeUtilModuleRef.exports = nodeUtil
  });
  var isTypedArrayModule = defineCommonjsModule((isTypedArrayExports, isTypedArrayModuleRef) => {
    var baseIsTypedArrayRef = baseIsTypedArrayModule(),
      baseUnaryRef = baseUnaryModule(),
      nodeUtilRef = nodeUtilModule(),
      nodeIsTypedArray = nodeUtilRef && nodeUtilRef.isTypedArray,
      isTypedArray = nodeIsTypedArray ? baseUnaryRef(nodeIsTypedArray) : baseIsTypedArrayRef;
    isTypedArrayModuleRef.exports = isTypedArray
  });
  var arrayLikeKeysModule = defineCommonjsModule((arrayLikeKeysExports, arrayLikeKeysModuleRef) => {
    var baseTimesRef = baseTimesModule(),
      isArgumentsRef = isArgumentsModule(),
      isArrayRefLike = isArrayModule(),
      isBufferRefLike = isBufferModule(),
      isIndexRef = isIndexModule(),
      isTypedArrayRefLike = isTypedArrayModule(),
      objectProtoArrayLike = Object.prototype,
      hasOwnPropertyArrayLike = objectProtoArrayLike.hasOwnProperty;

    function arrayLikeKeys(arrayLikeValue, arrayLikeInherited) {
      var isArrValue = isArrayRefLike(arrayLikeValue),
        isArgValue = !isArrValue && isArgumentsRef(arrayLikeValue),
        isBuffValue = !isArrValue && !isArgValue && isBufferRefLike(arrayLikeValue),
        isTypeValue = !isArrValue && !isArgValue && !isBuffValue && isTypedArrayRefLike(arrayLikeValue),
        skipIndexes = isArrValue || isArgValue || isBuffValue || isTypeValue,
        arrayLikeResult = skipIndexes ? baseTimesRef(arrayLikeValue.length, String) : [],
        arrayLikeLength = arrayLikeResult.length;
      for (var arrayLikeKey in arrayLikeValue)(arrayLikeInherited || hasOwnPropertyArrayLike.call(arrayLikeValue, arrayLikeKey)) && !(skipIndexes && (arrayLikeKey == "length" ||
        isBuffValue && (arrayLikeKey == "offset" || arrayLikeKey == "parent") || isTypeValue && (arrayLikeKey ==
          "buffer" || arrayLikeKey == "byteLength" || arrayLikeKey == "byteOffset") || isIndexRef(arrayLikeKey,
          arrayLikeLength))) && arrayLikeResult.push(arrayLikeKey);
      return arrayLikeResult
    }
    arrayLikeKeysModuleRef.exports = arrayLikeKeys
  });
  var isPrototypeModule = defineCommonjsModule((isPrototypeExports, isPrototypeModuleRef) => {
    var objectProtoIsProto = Object.prototype;

    function isPrototype(isPrototypeValue) {
      var isPrototypeCtor = isPrototypeValue && isPrototypeValue.constructor,
        isPrototypeProto = typeof isPrototypeCtor == "function" && isPrototypeCtor.prototype || objectProtoIsProto;
      return isPrototypeValue === isPrototypeProto
    }
    isPrototypeModuleRef.exports = isPrototype
  });
  var overArgModule = defineCommonjsModule((overArgExports, overArgModuleRef) => {
    function overArg(overArgFunc, overArgTransform) {
      return function(overArgValue) {
        return overArgFunc(overArgTransform(overArgValue))
      }
    }
    overArgModuleRef.exports = overArg
  });
  var nativeKeysModule = defineCommonjsModule((nativeKeysExports, nativeKeysModuleRef) => {
    var overArgRef = overArgModule(),
      nativeKeys = overArgRef(Object.keys, Object);
    nativeKeysModuleRef.exports = nativeKeys
  });
  var baseKeysModule = defineCommonjsModule((baseKeysExports, baseKeysModuleRef) => {
    var isPrototypeRef = isPrototypeModule(),
      nativeKeysRef = nativeKeysModule(),
      objectProtoBaseKeys = Object.prototype,
      hasOwnPropertyBaseKeys = objectProtoBaseKeys.hasOwnProperty;

    function baseKeys(baseKeysObject) {
      if (!isPrototypeRef(baseKeysObject)) return nativeKeysRef(baseKeysObject);
      var baseKeysResult = [];
      for (var baseKeysKey in Object(baseKeysObject)) hasOwnPropertyBaseKeys.call(baseKeysObject, baseKeysKey) && baseKeysKey != "constructor" && baseKeysResult
        .push(baseKeysKey);
      return baseKeysResult
    }
    baseKeysModuleRef.exports = baseKeys
  });
  var isArrayLikeModule = defineCommonjsModule((isArrayLikeExports, isArrayLikeModuleRef) => {
    var isFunctionRefLike = isFunctionModule(),
      isLengthRefLike = isLengthModule();

    function isArrayLike(isArrayLikeValue) {
      return isArrayLikeValue != null && isLengthRefLike(isArrayLikeValue.length) && !isFunctionRefLike(isArrayLikeValue)
    }
    isArrayLikeModuleRef.exports = isArrayLike
  });
  var keysModule = defineCommonjsModule((keysExports, keysModuleRef) => {
    var arrayLikeKeysRef = arrayLikeKeysModule(),
      baseKeysRef = baseKeysModule(),
      isArrayLikeRef = isArrayLikeModule();

    function keys(keysObject) {
      return isArrayLikeRef(keysObject) ? arrayLikeKeysRef(keysObject) : baseKeysRef(keysObject)
    }
    keysModuleRef.exports = keys
  });
  var getAllKeysModule = defineCommonjsModule((getAllKeysExports, getAllKeysModuleRef) => {
    var baseGetAllKeysRef = baseGetAllKeysModule(),
      getSymbolsRef = getSymbolsModule(),
      keysRef = keysModule();

    function getAllKeys(getAllKeysObject) {
      return baseGetAllKeysRef(getAllKeysObject, keysRef, getSymbolsRef)
    }
    getAllKeysModuleRef.exports = getAllKeys
  });
  var equalObjectsModule = defineCommonjsModule((equalObjectsExports, equalObjectsModuleRef) => {
    var getAllKeysRef = getAllKeysModule(),
      comparePartialFlagObj = 1,
      objectProtoEqualObjects = Object.prototype,
      hasOwnPropertyEqualObjects = objectProtoEqualObjects.hasOwnProperty;

    function equalObjects(objectA2, objectB2, equalObjectsBitmask, equalObjectsCustomizer, equalObjectsEqualFunc, equalObjectsStack) {
      var isPartialObj = equalObjectsBitmask & comparePartialFlagObj,
        objAProps = getAllKeysRef(objectA2),
        objAPropsLength = objAProps.length,
        objBProps = getAllKeysRef(objectB2),
        objBPropsLength = objBProps.length;
      if (objAPropsLength != objBPropsLength && !isPartialObj) return !1;
      for (var objIndex = objAPropsLength; objIndex--;) {
        var objKey = objAProps[objIndex];
        if (!(isPartialObj ? objKey in objectB2 : hasOwnPropertyEqualObjects.call(objectB2, objKey))) return !1
      }
      var objAStacked = equalObjectsStack.get(objectA2),
        objBStacked = equalObjectsStack.get(objectB2);
      if (objAStacked && objBStacked) return objAStacked == objectB2 && objBStacked == objectA2;
      var objResult = !0;
      equalObjectsStack.set(objectA2, objectB2), equalObjectsStack.set(objectB2, objectA2);
      for (var objSkipCtor = isPartialObj; ++objIndex < objAPropsLength;) {
        objKey = objAProps[objIndex];
        var objAValue = objectA2[objKey],
          objBValue = objectB2[objKey];
        if (equalObjectsCustomizer) var objCompared = isPartialObj ? equalObjectsCustomizer(objBValue, objAValue, objKey, objectB2, objectA2, equalObjectsStack) : equalObjectsCustomizer(objAValue, objBValue, objKey, objectA2, objectB2, equalObjectsStack);
        if (!(objCompared === void 0 ? objAValue === objBValue || equalObjectsEqualFunc(objAValue, objBValue, equalObjectsBitmask, equalObjectsCustomizer, equalObjectsStack) : objCompared)) {
          objResult = !1;
          break
        }
        objSkipCtor || (objSkipCtor = objKey == "constructor")
      }
      if (objResult && !objSkipCtor) {
        var objAConstructor = objectA2.constructor,
          objBConstructor = objectB2.constructor;
        objAConstructor != objBConstructor && "constructor" in objectA2 && "constructor" in objectB2 && !(
          typeof objAConstructor == "function" && objAConstructor instanceof objAConstructor && typeof objBConstructor ==
          "function" && objBConstructor instanceof objBConstructor) && (objResult = !1)
      }
      return equalObjectsStack.delete(objectA2), equalObjectsStack.delete(objectB2), objResult
    }
    equalObjectsModuleRef.exports = equalObjects
  });
  var dataViewModule = defineCommonjsModule((dataViewExports, dataViewModuleRef) => {
    var getNativeRefDataView = getNativeModule(),
      rootRefDataView = rootModule(),
      DataViewRef = getNativeRefDataView(rootRefDataView, "DataView");
    dataViewModuleRef.exports = DataViewRef
  });
  var promiseModule = defineCommonjsModule((promiseExports, promiseModuleRef) => {
    var getNativeRefPromise = getNativeModule(),
      rootRefPromise = rootModule(),
      PromiseRef = getNativeRefPromise(rootRefPromise, "Promise");
    promiseModuleRef.exports = PromiseRef
  });
  var setModule = defineCommonjsModule((setExports, setModuleRef) => {
    var getNativeRefSet = getNativeModule(),
      rootRefSet = rootModule(),
      SetRef = getNativeRefSet(rootRefSet, "Set");
    setModuleRef.exports = SetRef
  });
  var weakMapModule = defineCommonjsModule((weakMapExports, weakMapModuleRef) => {
    var getNativeRefWeakMap = getNativeModule(),
      rootRefWeakMap = rootModule(),
      WeakMapRef = getNativeRefWeakMap(rootRefWeakMap, "WeakMap");
    weakMapModuleRef.exports = WeakMapRef
  });
  var getTagModule = defineCommonjsModule((getTagExports, getTagModuleRef) => {
    var DataViewRef2 = dataViewModule(),
      MapRef2 = mapModule(),
      PromiseRef2 = promiseModule(),
      SetRef2 = setModule(),
      WeakMapRef2 = weakMapModule(),
      baseGetTagRefTag = baseGetTagModule(),
      toSourceRefTag = toSourceModule(),
      mapTagGetTag = "[object Map]",
      objectTagGetTag = "[object Object]",
      promiseTagGetTag = "[object Promise]",
      setTagGetTag = "[object Set]",
      weakMapTagGetTag = "[object WeakMap]",
      dataViewTagGetTag = "[object DataView]",
      dataViewCtorString = toSourceRefTag(DataViewRef2),
      mapCtorString = toSourceRefTag(MapRef2),
      promiseCtorString = toSourceRefTag(PromiseRef2),
      setCtorString = toSourceRefTag(SetRef2),
      weakMapCtorString = toSourceRefTag(WeakMapRef2),
      getTag = baseGetTagRefTag;
    (DataViewRef2 && getTag(new DataViewRef2(new ArrayBuffer(1))) != dataViewTagGetTag || MapRef2 && getTag(new MapRef2) !=
      mapTagGetTag || PromiseRef2 && getTag(PromiseRef2.resolve()) != promiseTagGetTag || SetRef2 && getTag(new SetRef2) != setTagGetTag ||
      WeakMapRef2 && getTag(new WeakMapRef2) != weakMapTagGetTag) && (getTag = function(getTagValue) {
      var getTagResult = baseGetTagRefTag(getTagValue),
        getTagCtor = getTagResult == objectTagGetTag ? getTagValue.constructor : void 0,
        getTagCtorString = getTagCtor ? toSourceRefTag(getTagCtor) : "";
      if (getTagCtorString) switch (getTagCtorString) {
        case dataViewCtorString:
          return dataViewTagGetTag;
        case mapCtorString:
          return mapTagGetTag;
        case promiseCtorString:
          return promiseTagGetTag;
        case setCtorString:
          return setTagGetTag;
        case weakMapCtorString:
          return weakMapTagGetTag
      }
      return getTagResult
    });
    getTagModuleRef.exports = getTag
  });
  var baseIsEqualDeepModule = defineCommonjsModule((baseIsEqualDeepExports, baseIsEqualDeepModuleRef) => {
    var stackRefDeep = stackModule(),
      equalArraysRefDeep = equalArraysModule(),
      equalByTagRefDeep = equalByTagModule(),
      equalObjectsRef = equalObjectsModule(),
      getTagRef = getTagModule(),
      isArrayRefDeep = isArrayModule(),
      isBufferRefDeep = isBufferModule(),
      isTypedArrayRefDeep = isTypedArrayModule(),
      comparePartialFlagDeep = 1,
      argsTagDeep = "[object Arguments]",
      arrayTagDeep = "[object Array]",
      objectTagDeep = "[object Object]",
      objectProtoDeep = Object.prototype,
      hasOwnPropertyDeep = objectProtoDeep.hasOwnProperty;

    function baseIsEqualDeep(deepObjectA, deepObjectB, deepBitmask, deepCustomizer, deepEqualFunc, deepStack) {
      var objIsArr = isArrayRefDeep(deepObjectA),
        othIsArr = isArrayRefDeep(deepObjectB),
        objDeepTag = objIsArr ? arrayTagDeep : getTagRef(deepObjectA),
        othDeepTag = othIsArr ? arrayTagDeep : getTagRef(deepObjectB);
      objDeepTag = objDeepTag == argsTagDeep ? objectTagDeep : objDeepTag, othDeepTag = othDeepTag == argsTagDeep ? objectTagDeep : othDeepTag;
      var objIsObj = objDeepTag == objectTagDeep,
        othIsObj = othDeepTag == objectTagDeep,
        isSameTag = objDeepTag == othDeepTag;
      if (isSameTag && isBufferRefDeep(deepObjectA)) {
        if (!isBufferRefDeep(deepObjectB)) return !1;
        objIsArr = !0, objIsObj = !1
      }
      if (isSameTag && !objIsObj) return deepStack || (deepStack = new stackRefDeep), objIsArr || isTypedArrayRefDeep(deepObjectA) ? equalArraysRefDeep(deepObjectA, deepObjectB, deepBitmask, deepCustomizer,
        deepEqualFunc, deepStack) : equalByTagRefDeep(deepObjectA, deepObjectB, objDeepTag, deepBitmask, deepCustomizer, deepEqualFunc, deepStack);
      if (!(deepBitmask & comparePartialFlagDeep)) {
        var objIsWrapped = objIsObj && hasOwnPropertyDeep.call(deepObjectA, "__wrapped__"),
          othIsWrapped = othIsObj && hasOwnPropertyDeep.call(deepObjectB, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? deepObjectA.value() : deepObjectA,
            othUnwrapped = othIsWrapped ? deepObjectB.value() : deepObjectB;
          return deepStack || (deepStack = new stackRefDeep), deepEqualFunc(objUnwrapped, othUnwrapped, deepBitmask, deepCustomizer, deepStack)
        }
      }
      return isSameTag ? (deepStack || (deepStack = new stackRefDeep), equalObjectsRef(deepObjectA, deepObjectB, deepBitmask, deepCustomizer, deepEqualFunc, deepStack)) : !1
    }
    baseIsEqualDeepModuleRef.exports = baseIsEqualDeep
  });
  var baseIsEqualModule = defineCommonjsModule((baseIsEqualExports, baseIsEqualModuleRef) => {
    var baseIsEqualDeepRef = baseIsEqualDeepModule(),
      isObjectLikeRefEqual = isObjectLikeModule();

    function baseIsEqual(baseIsEqualA, baseIsEqualB, baseIsEqualBitmask, baseIsEqualCustomizer, baseIsEqualStack) {
      return baseIsEqualA === baseIsEqualB ? !0 : baseIsEqualA == null || baseIsEqualB == null || !isObjectLikeRefEqual(baseIsEqualA) && !isObjectLikeRefEqual(baseIsEqualB) ?
        baseIsEqualA !== baseIsEqualA && baseIsEqualB !== baseIsEqualB : baseIsEqualDeepRef(baseIsEqualA, baseIsEqualB, baseIsEqualBitmask, baseIsEqualCustomizer, baseIsEqual, baseIsEqualStack)
    }
    baseIsEqualModuleRef.exports = baseIsEqual
  });
  var baseIsMatchModule = defineCommonjsModule((baseIsMatchExports, baseIsMatchModuleRef) => {
    var stackRefMatch = stackModule(),
      baseIsEqualRef = baseIsEqualModule(),
      comparePartialFlagMatch = 1,
      compareUnorderedFlagMatch = 2;

    function baseIsMatch(matchObject, matchSource, matchData, matchCustomizer) {
      var matchDataLength = matchData.length,
        matchIndex = matchDataLength,
        matchNoCustomizer = !matchCustomizer;
      if (matchObject == null) return !matchIndex;
      for (matchObject = Object(matchObject); matchDataLength--;) {
        var matchDataEntry = matchData[matchDataLength];
        if (matchNoCustomizer && matchDataEntry[2] ? matchDataEntry[1] !== matchObject[matchDataEntry[0]] : !(matchDataEntry[0] in matchObject)) return !1
      }
      for (; ++matchDataLength < matchIndex;) {
        matchDataEntry = matchData[matchDataLength];
        var matchKey = matchDataEntry[0],
          matchObjValue = matchObject[matchKey],
          matchSrcValue = matchDataEntry[1];
        if (matchNoCustomizer && matchDataEntry[2]) {
          if (matchObjValue === void 0 && !(matchKey in matchObject)) return !1
        } else {
          var matchStack = new stackRefMatch;
          if (matchCustomizer) var matchResult = matchCustomizer(matchObjValue, matchSrcValue, matchKey, matchObject, matchSource, matchStack);
          if (!(matchResult === void 0 ? baseIsEqualRef(matchSrcValue, matchObjValue, comparePartialFlagMatch | compareUnorderedFlagMatch, matchCustomizer, matchStack) : matchResult)) return !1
        }
      }
      return !0
    }
    baseIsMatchModuleRef.exports = baseIsMatch
  });
  var isStrictComparableModule = defineCommonjsModule((isStrictComparableExports, isStrictComparableModuleRef) => {
    var isObjectRefStrict = isObjectModule();

    function isStrictComparable(strictValue) {
      return strictValue === strictValue && !isObjectRefStrict(strictValue)
    }
    isStrictComparableModuleRef.exports = isStrictComparable
  });
  var getMatchDataModule = defineCommonjsModule((getMatchDataExports, getMatchDataModuleRef) => {
    var isStrictComparableRef = isStrictComparableModule(),
      keysRefMatch = keysModule();

    function getMatchData(matchDataObject) {
      for (var matchDataResult = keysRefMatch(matchDataObject), matchDataLength2 = matchDataResult.length; matchDataLength2--;) {
        var matchDataKey = matchDataResult[matchDataLength2],
          matchDataValue = matchDataObject[matchDataKey];
        matchDataResult[matchDataLength2] = [matchDataKey, matchDataValue, isStrictComparableRef(matchDataValue)]
      }
      return matchDataResult
    }
    getMatchDataModuleRef.exports = getMatchData
  });
  var matchesStrictComparableModule = defineCommonjsModule((matchesStrictComparableExports, matchesStrictComparableModuleRef) => {
    function matchesStrictComparable(strictKey, strictSrcValue) {
      return function(strictObject) {
        return strictObject == null ? !1 : strictObject[strictKey] === strictSrcValue && (strictSrcValue !== void 0 || strictKey in
          Object(strictObject))
      }
    }
    matchesStrictComparableModuleRef.exports = matchesStrictComparable
  });
  var matchesModule = defineCommonjsModule((matchesExports, matchesModuleRef) => {
    var baseIsMatchRef = baseIsMatchModule(),
      getMatchDataRef = getMatchDataModule(),
      matchesStrictComparableRef = matchesStrictComparableModule();

    function matches(matchesSource) {
      var matchesData = getMatchDataRef(matchesSource);
      return matchesData.length == 1 && matchesData[0][2] ? matchesStrictComparableRef(matchesData[0][0], matchesData[0][1]) : function(
      matchesObject) {
        return matchesObject === matchesSource || baseIsMatchRef(matchesObject, matchesSource, matchesData)
      }
    }
    matchesModuleRef.exports = matches
  });
  var isSymbolModule = defineCommonjsModule((isSymbolExports, isSymbolModuleRef) => {
    var baseGetTagRefSym = baseGetTagModule(),
      isObjectLikeRefSym = isObjectLikeModule(),
      symbolTagSym = "[object Symbol]";

    function isSymbol(isSymbolValue) {
      return typeof isSymbolValue == "symbol" || isObjectLikeRefSym(isSymbolValue) && baseGetTagRefSym(isSymbolValue) == symbolTagSym
    }
    isSymbolModuleRef.exports = isSymbol
  });
  var isKeyModule = defineCommonjsModule((isKeyExports, isKeyModuleRef) => {
    var isArrayRefKey = isArrayModule(),
      isSymbolRefKey = isSymbolModule(),
      reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

    function isKey(isKeyValue, isKeyObject) {
      if (isArrayRefKey(isKeyValue)) return !1;
      var isKeyType = typeof isKeyValue;
      return isKeyType == "number" || isKeyType == "symbol" || isKeyType == "boolean" || isKeyValue ==
        null || isSymbolRefKey(isKeyValue) ? !0 : reIsPlainProp.test(isKeyValue) || !reIsDeepProp.test(isKeyValue) || isKeyObject != null &&
        isKeyValue in Object(isKeyObject)
    }
    isKeyModuleRef.exports = isKey
  });
  var memoizeModule = defineCommonjsModule((memoizeExports, memoizeModuleRef) => {
    var mapCacheRefMemoize = mapCacheModule(),
      funcErrorText = "Expected a function";

    function memoize(memoizeFunc, memoizeResolver) {
      if (typeof memoizeFunc != "function" || memoizeResolver != null && typeof memoizeResolver != "function")
        throw new TypeError(funcErrorText);
      var memoized = function() {
        var memoizeArgs = arguments,
          memoizeKey = memoizeResolver ? memoizeResolver.apply(this, memoizeArgs) : memoizeArgs[0],
          memoizeCache = memoized.cache;
        if (memoizeCache.has(memoizeKey)) return memoizeCache.get(memoizeKey);
        var memoizeResult = memoizeFunc.apply(this, memoizeArgs);
        return memoized.cache = memoizeCache.set(memoizeKey, memoizeResult) || memoizeCache, memoizeResult
      };
      return memoized.cache = new(memoize.Cache || mapCacheRefMemoize), memoized
    }
    memoize.Cache = mapCacheRefMemoize;
    memoizeModuleRef.exports = memoize
  });
  var memoizeCappedModule = defineCommonjsModule((memoizeCappedExports, memoizeCappedModuleRef) => {
    var memoizeRef = memoizeModule(),
      maxMemoizeSize = 500;

    function memoizeCapped(memoizeCappedFunc) {
      var memoizeCappedResult = memoizeRef(memoizeCappedFunc, function(memoizeCappedKey) {
          return memoizeCappedCache.size === maxMemoizeSize && memoizeCappedCache.clear(), memoizeCappedKey
        }),
        memoizeCappedCache = memoizeCappedResult.cache;
      return memoizeCappedResult
    }
    memoizeCappedModuleRef.exports = memoizeCapped
  });
  var stringToPathModule = defineCommonjsModule((stringToPathExports, stringToPathModuleRef) => {
    var memoizeCappedRef = memoizeCappedModule(),
      rePropName =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      reEscapeChar = /\\(\\)?/g,
      stringToPath = memoizeCappedRef(function(stringToPathString) {
        var stringToPathResult = [];
        return stringToPathString.charCodeAt(0) === 46 && stringToPathResult.push(""), stringToPathString.replace(rePropName,
          function(pathMatch, pathNumber, pathQuote, pathSubstring) {
            stringToPathResult.push(pathQuote ? pathSubstring.replace(reEscapeChar, "$1") : pathNumber || pathMatch)
          }), stringToPathResult
      });
    stringToPathModuleRef.exports = stringToPath
  });
  var arrayMapModule = defineCommonjsModule((arrayMapExports, arrayMapModuleRef) => {
    function arrayMap(arrayMapArray, arrayMapIteratee) {
      for (var arrayMapIndex = -1, arrayMapLength = arrayMapArray == null ? 0 : arrayMapArray.length, arrayMapResult = Array(arrayMapLength); ++arrayMapIndex <
        arrayMapLength;) arrayMapResult[arrayMapIndex] = arrayMapIteratee(arrayMapArray[arrayMapIndex], arrayMapIndex, arrayMapArray);
      return arrayMapResult
    }
    arrayMapModuleRef.exports = arrayMap
  });
  var baseToStringModule = defineCommonjsModule((baseToStringExports, baseToStringModuleRef) => {
    var symbolRefBaseToString = symbolModule(),
      arrayMapRef = arrayMapModule(),
      isArrayRefStr = isArrayModule(),
      isSymbolRefStr = isSymbolModule(),
      infinityStr = 1 / 0,
      symbolProtoStr = symbolRefBaseToString ? symbolRefBaseToString.prototype : void 0,
      symbolToStringStr = symbolProtoStr ? symbolProtoStr.toString : void 0;

    function baseToString(baseToStringValue) {
      if (typeof baseToStringValue == "string") return baseToStringValue;
      if (isArrayRefStr(baseToStringValue)) return arrayMapRef(baseToStringValue, baseToString) + "";
      if (isSymbolRefStr(baseToStringValue)) return symbolToStringStr ? symbolToStringStr.call(baseToStringValue) : "";
      var baseToStringResult = baseToStringValue + "";
      return baseToStringResult == "0" && 1 / baseToStringValue == -infinityStr ? "-0" : baseToStringResult
    }
    baseToStringModuleRef.exports = baseToString
  });
  var toStringModule = defineCommonjsModule((toStringExports, toStringModuleRef) => {
    var baseToStringRef = baseToStringModule();

    function toString(toStringValue2) {
      return toStringValue2 == null ? "" : baseToStringRef(toStringValue2)
    }
    toStringModuleRef.exports = toString
  });
  var castPathModule = defineCommonjsModule((castPathExports, castPathModuleRef) => {
    var isArrayRefCast = isArrayModule(),
      isKeyRef = isKeyModule(),
      stringToPathRef = stringToPathModule(),
      toStringRefCast = toStringModule();

    function castPath(castPathValue, castPathObject) {
      return isArrayRefCast(castPathValue) ? castPathValue : isKeyRef(castPathValue, castPathObject) ? [castPathValue] : stringToPathRef(toStringRefCast(castPathValue))
    }
    castPathModuleRef.exports = castPath
  });
  var toKeyModule = defineCommonjsModule((toKeyExports, toKeyModuleRef) => {
    var isSymbolRefKey2 = isSymbolModule(),
      infinityKey = 1 / 0;

    function toKey(toKeyValue) {
      if (typeof toKeyValue == "string" || isSymbolRefKey2(toKeyValue)) return toKeyValue;
      var toKeyResult = toKeyValue + "";
      return toKeyResult == "0" && 1 / toKeyValue == -infinityKey ? "-0" : toKeyResult
    }
    toKeyModuleRef.exports = toKey
  });
  var baseGetModule = defineCommonjsModule((baseGetExports, baseGetModuleRef) => {
    var castPathRef = castPathModule(),
      toKeyRef = toKeyModule();

    function baseGet(baseGetObject, baseGetPath) {
      baseGetPath = castPathRef(baseGetPath, baseGetObject);
      for (var baseGetIndex = 0, baseGetLength = baseGetPath.length; baseGetObject != null && baseGetIndex < baseGetLength;) baseGetObject = baseGetObject[toKeyRef(baseGetPath[
      baseGetIndex++])];
      return baseGetIndex && baseGetIndex == baseGetLength ? baseGetObject : void 0
    }
    baseGetModuleRef.exports = baseGet
  });
  var getModule = defineCommonjsModule((getExports, getModuleRef) => {
    var baseGetRef = baseGetModule();

    function get(getObject, getPath, getDefaultValue) {
      var getResult = getObject == null ? void 0 : baseGetRef(getObject, getPath);
      return getResult === void 0 ? getDefaultValue : getResult
    }
    getModuleRef.exports = get
  });
  var baseHasInModule = defineCommonjsModule((baseHasInExports, baseHasInModuleRef) => {
    function baseHasIn(baseHasInObject, baseHasInKey) {
      return baseHasInObject != null && baseHasInKey in Object(baseHasInObject)
    }
    baseHasInModuleRef.exports = baseHasIn
  });
  var hasPathModule = defineCommonjsModule((hasPathExports, hasPathModuleRef) => {
    var castPathRefHas = castPathModule(),
      isArgumentsRefHas = isArgumentsModule(),
      isArrayRefHas = isArrayModule(),
      isIndexRefHas = isIndexModule(),
      isLengthRefHas = isLengthModule(),
      toKeyRefHas = toKeyModule();

    function hasPath(hasPathObject, hasPathPath, hasPathHasFunc) {
      hasPathPath = castPathRefHas(hasPathPath, hasPathObject);
      for (var hasPathIndex = -1, hasPathLength = hasPathPath.length, hasPathResult = !1; ++hasPathIndex < hasPathLength;) {
        var hasPathKey = toKeyRefHas(hasPathPath[hasPathIndex]);
        if (!(hasPathResult = hasPathObject != null && hasPathHasFunc(hasPathObject, hasPathKey))) break;
        hasPathObject = hasPathObject[hasPathKey]
      }
      return hasPathResult || ++hasPathIndex != hasPathLength ? hasPathResult : (hasPathLength = hasPathObject == null ? 0 : hasPathObject.length, !!hasPathLength && isLengthRefHas(
        hasPathLength) && isIndexRefHas(hasPathKey, hasPathLength) && (isArrayRefHas(hasPathObject) || isArgumentsRefHas(hasPathObject)))
    }
    hasPathModuleRef.exports = hasPath
  });
  var hasInModule = defineCommonjsModule((hasInExports, hasInModuleRef) => {
    var baseHasInRef = baseHasInModule(),
      hasPathRefIn = hasPathModule();

    function hasIn(hasInObject, hasInPath) {
      return hasInObject != null && hasPathRefIn(hasInObject, hasInPath, baseHasInRef)
    }
    hasInModuleRef.exports = hasIn
  });
  var baseMatchesPropertyModule = defineCommonjsModule((baseMatchesPropertyExports, baseMatchesPropertyModuleRef) => {
    var baseIsEqualRefProp = baseIsEqualModule(),
      getRef = getModule(),
      hasInRef = hasInModule(),
      isKeyRefProp = isKeyModule(),
      isStrictComparableRefProp = isStrictComparableModule(),
      matchesStrictComparableRefProp = matchesStrictComparableModule(),
      toKeyRefProp = toKeyModule(),
      comparePartialFlagProp = 1,
      compareUnorderedFlagProp = 2;

    function baseMatchesProperty(matchesPropertyPath, matchesPropertySrcValue) {
      return isKeyRefProp(matchesPropertyPath) && isStrictComparableRefProp(matchesPropertySrcValue) ? matchesStrictComparableRefProp(toKeyRefProp(matchesPropertyPath), matchesPropertySrcValue) : function(matchesPropertyObject) {
        var matchesPropertyValue = getRef(matchesPropertyObject, matchesPropertyPath);
        return matchesPropertyValue === void 0 && matchesPropertyValue === matchesPropertySrcValue ? hasInRef(matchesPropertyObject, matchesPropertyPath) : baseIsEqualRefProp(matchesPropertySrcValue, matchesPropertyValue, comparePartialFlagProp | compareUnorderedFlagProp)
      }
    }
    baseMatchesPropertyModuleRef.exports = baseMatchesProperty
  });
  var identityModule = defineCommonjsModule((identityExports, identityModuleRef) => {
    function identity(identityValue) {
      return identityValue
    }
    identityModuleRef.exports = identity
  });
  var basePropertyModule = defineCommonjsModule((basePropertyExports, basePropertyModuleRef) => {
    function baseProperty(basePropertyKey) {
      return function(basePropertyObject) {
        return basePropertyObject?.[basePropertyKey]
      }
    }
    basePropertyModuleRef.exports = baseProperty
  });
  var basePropertyDeepModule = defineCommonjsModule((basePropertyDeepExports, basePropertyDeepModuleRef) => {
    var baseGetRefDeep = baseGetModule();

    function basePropertyDeep(basePropertyDeepPath) {
      return function(basePropertyDeepObject) {
        return baseGetRefDeep(basePropertyDeepObject, basePropertyDeepPath)
      }
    }
    basePropertyDeepModuleRef.exports = basePropertyDeep
  });
  var propertyModule = defineCommonjsModule((propertyExports, propertyModuleRef) => {
    var basePropertyRef = basePropertyModule(),
      basePropertyDeepRef = basePropertyDeepModule(),
      isKeyRefProperty = isKeyModule(),
      toKeyRefProperty = toKeyModule();

    function property(propertyPath) {
      return isKeyRefProperty(propertyPath) ? basePropertyRef(toKeyRefProperty(propertyPath)) : basePropertyDeepRef(propertyPath)
    }
    propertyModuleRef.exports = property
  });
  var baseIterateeModule = defineCommonjsModule((baseIterateeExports, baseIterateeModuleRef) => {
    var matchesRef = matchesModule(),
      baseMatchesPropertyRef = baseMatchesPropertyModule(),
      identityRef = identityModule(),
      isArrayRefIteratee = isArrayModule(),
      propertyRef = propertyModule();

    function baseIteratee(baseIterateeValue) {
      return typeof baseIterateeValue == "function" ? baseIterateeValue : baseIterateeValue == null ? identityRef : typeof baseIterateeValue ==
        "object" ? isArrayRefIteratee(baseIterateeValue) ? baseMatchesPropertyRef(baseIterateeValue[0], baseIterateeValue[1]) : matchesRef(baseIterateeValue) : propertyRef(baseIterateeValue)
    }
    baseIterateeModuleRef.exports = baseIteratee
  });
  var createFindModule = defineCommonjsModule((createFindExports, createFindModuleRef) => {
    var baseIterateeRef = baseIterateeModule(),
      isArrayLikeRefFind = isArrayLikeModule(),
      keysRefFind = keysModule();

    function createFind(createFindEach) {
      return function(createFindCollection, createFindPredicate, createFindFromIndex) {
        var createFindIterable = Object(createFindCollection);
        if (!isArrayLikeRefFind(createFindCollection)) {
          var createFindIteratee = baseIterateeRef(createFindPredicate, 3);
          createFindCollection = keysRefFind(createFindCollection), createFindPredicate = function(createFindKey) {
            return createFindIteratee(createFindIterable[createFindKey], createFindKey, createFindIterable)
          }
        }
        var createFindResult = createFindEach(createFindCollection, createFindPredicate, createFindFromIndex);
        return createFindResult > -1 ? createFindIterable[createFindIteratee ? createFindCollection[createFindResult] : createFindResult] : void 0
      }
    }
    createFindModuleRef.exports = createFind
  });
  var baseFindIndexModule = defineCommonjsModule((baseFindIndexExports, baseFindIndexModuleRef) => {
    function baseFindIndex(findIndexArray, findIndexPredicate, findIndexFromIndex, findIndexFromRight) {
      for (var findIndexLength = findIndexArray.length, findIndexIndex = findIndexFromIndex + (findIndexFromRight ? 1 : -1); findIndexFromRight ? findIndexIndex-- : ++findIndexIndex < findIndexLength;)
        if (findIndexPredicate(findIndexArray[findIndexIndex], findIndexIndex, findIndexArray)) return findIndexIndex;
      return -1
    }
    baseFindIndexModuleRef.exports = baseFindIndex
  });
  var trimmedEndIndexModule = defineCommonjsModule((trimmedEndIndexExports, trimmedEndIndexModuleRef) => {
    var reWhitespace = /\s/;

    function trimmedEndIndex(trimmedEndValue) {
      for (var trimmedEndIndexVar = trimmedEndValue.length; trimmedEndIndexVar-- && reWhitespace.test(trimmedEndValue.charAt(trimmedEndIndexVar)););
      return trimmedEndIndexVar
    }
    trimmedEndIndexModuleRef.exports = trimmedEndIndex
  });
  var baseTrimModule = defineCommonjsModule((baseTrimExports, baseTrimModuleRef) => {
    var trimmedEndIndexRef = trimmedEndIndexModule(),
      reTrimStart = /^\s+/;

    function baseTrim(baseTrimValue) {
      return baseTrimValue && baseTrimValue.slice(0, trimmedEndIndexRef(baseTrimValue) + 1)
        .replace(reTrimStart, "")
    }
    baseTrimModuleRef.exports = baseTrim
  });
  var toNumberModule = defineCommonjsModule((toNumberExports, toNumberModuleRef) => {
    var baseTrimRef = baseTrimModule(),
      isObjectRefNum = isObjectModule(),
      isSymbolRefNum = isSymbolModule(),
      nanValue = NaN,
      reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
      reIsBinary = /^0b[01]+$/i,
      reIsOctal = /^0o[0-7]+$/i,
      freeParseInt = parseInt;

    function toNumber(toNumberValue) {
      if (typeof toNumberValue == "number") return toNumberValue;
      if (isSymbolRefNum(toNumberValue)) return nanValue;
      if (isObjectRefNum(toNumberValue)) {
        var toNumberOther = typeof toNumberValue.valueOf == "function" ? toNumberValue.valueOf() : toNumberValue;
        toNumberValue = isObjectRefNum(toNumberOther) ? toNumberOther + "" : toNumberOther
      }
      if (typeof toNumberValue != "string") return toNumberValue === 0 ? toNumberValue : +toNumberValue;
      toNumberValue = baseTrimRef(toNumberValue);
      var toNumberIsBinary = reIsBinary.test(toNumberValue);
      return toNumberIsBinary || reIsOctal.test(toNumberValue) ? freeParseInt(toNumberValue.slice(2), toNumberIsBinary ? 2 : 8) : reIsBadHex.test(toNumberValue) ?
        nanValue : +toNumberValue
    }
    toNumberModuleRef.exports = toNumber
  });
  var toFiniteModule = defineCommonjsModule((toFiniteExports, toFiniteModuleRef) => {
    var toNumberRef = toNumberModule(),
      infinityFinite = 1 / 0,
      maxInteger = 17976931348623157e292;

    function toFinite(toFiniteValue) {
      if (!toFiniteValue) return toFiniteValue === 0 ? toFiniteValue : 0;
      if (toFiniteValue = toNumberRef(toFiniteValue), toFiniteValue === infinityFinite || toFiniteValue === -infinityFinite) {
        var toFiniteSign = toFiniteValue < 0 ? -1 : 1;
        return toFiniteSign * maxInteger
      }
      return toFiniteValue === toFiniteValue ? toFiniteValue : 0
    }
    toFiniteModuleRef.exports = toFinite
  });
  var toIntegerModule = defineCommonjsModule((toIntegerExports, toIntegerModuleRef) => {
    var toFiniteRef = toFiniteModule();

    function toInteger(toIntegerValue) {
      var toIntegerResult = toFiniteRef(toIntegerValue),
        toIntegerRemainder = toIntegerResult % 1;
      return toIntegerResult === toIntegerResult ? toIntegerRemainder ? toIntegerResult - toIntegerRemainder : toIntegerResult : 0
    }
    toIntegerModuleRef.exports = toInteger
  });
  var findIndexModule = defineCommonjsModule((findIndexExports, findIndexModuleRef) => {
    var baseFindIndexRef = baseFindIndexModule(),
      baseIterateeRefFind = baseIterateeModule(),
      toIntegerRefFind = toIntegerModule(),
      mathMax = Math.max;

    function findIndex(findIndexArray2, findIndexPredicate2, findIndexFromIndex2) {
      var findIndexLength2 = findIndexArray2 == null ? 0 : findIndexArray2.length;
      if (!findIndexLength2) return -1;
      var findIndexStart = findIndexFromIndex2 == null ? 0 : toIntegerRefFind(findIndexFromIndex2);
      return findIndexStart < 0 && (findIndexStart = mathMax(findIndexLength2 + findIndexStart, 0)), baseFindIndexRef(findIndexArray2, baseIterateeRefFind(findIndexPredicate2, 3), findIndexStart)
    }
    findIndexModuleRef.exports = findIndex
  });
  var findModule = defineCommonjsModule((findExports, findModuleRef) => {
    var createFindRef = createFindModule(),
      findIndexRef = findIndexModule(),
      find = createFindRef(findIndexRef);
    findModuleRef.exports = find
  });
  var isFlattenableModule = defineCommonjsModule((isFlattenableExports, isFlattenableModuleRef) => {
    var symbolRefFlatten = symbolModule(),
      isArgumentsRefFlatten = isArgumentsModule(),
      isArrayRefFlatten = isArrayModule(),
      spreadableSymbol = symbolRefFlatten ? symbolRefFlatten.isConcatSpreadable : void 0;

    function isFlattenable(isFlattenableValue) {
      return isArrayRefFlatten(isFlattenableValue) || isArgumentsRefFlatten(isFlattenableValue) || !!(spreadableSymbol && isFlattenableValue && isFlattenableValue[spreadableSymbol])
    }
    isFlattenableModuleRef.exports = isFlattenable
  });
  var baseFlattenModule = defineCommonjsModule((baseFlattenExports, baseFlattenModuleRef) => {
    var arrayPushRefFlatten = arrayPushModule(),
      isFlattenableRef = isFlattenableModule();

    function baseFlatten(flattenArray, flattenDepth, flattenPredicate, flattenIsStrict, flattenResult) {
      var flattenIndex = -1,
        flattenLength = flattenArray.length;
      for (flattenPredicate || (flattenPredicate = isFlattenableRef), flattenResult || (flattenResult = []); ++flattenIndex < flattenLength;) {
        var flattenValue = flattenArray[flattenIndex];
        flattenDepth > 0 && flattenPredicate(flattenValue) ? flattenDepth > 1 ? baseFlatten(flattenValue, flattenDepth - 1, flattenPredicate, flattenIsStrict, flattenResult) : arrayPushRefFlatten(flattenResult, flattenValue) : flattenIsStrict || (
          flattenResult[flattenResult.length] = flattenValue)
      }
      return flattenResult
    }
    baseFlattenModuleRef.exports = baseFlatten
  });
  var createBaseForModule = defineCommonjsModule((createBaseForExports, createBaseForModuleRef) => {
    function createBaseFor(createBaseForFromRight) {
      return function(baseForObject, baseForIteratee, baseForKeysFunc) {
        for (var baseForIndex = -1, baseForObj = Object(baseForObject), baseForKeys = baseForKeysFunc(baseForObject), baseForLength = baseForKeys.length; baseForLength--;) {
          var baseForKey = baseForKeys[createBaseForFromRight ? baseForLength : ++baseForIndex];
          if (baseForIteratee(baseForObj[baseForKey], baseForKey, baseForObj) === !1) break
        }
        return baseForObject
      }
    }
    createBaseForModuleRef.exports = createBaseFor
  });
  var baseForModule = defineCommonjsModule((baseForExports, baseForModuleRef) => {
    var createBaseForRef = createBaseForModule(),
      baseFor = createBaseForRef();
    baseForModuleRef.exports = baseFor
  });
  var baseForOwnModule = defineCommonjsModule((baseForOwnExports, baseForOwnModuleRef) => {
    var baseForRef = baseForModule(),
      keysRefOwn = keysModule();

    function baseForOwn(baseForOwnObject, baseForOwnIteratee) {
      return baseForOwnObject && baseForRef(baseForOwnObject, baseForOwnIteratee, keysRefOwn)
    }
    baseForOwnModuleRef.exports = baseForOwn
  });
  var createBaseEachModule = defineCommonjsModule((createBaseEachExports, createBaseEachModuleRef) => {
    var isArrayLikeRefEach = isArrayLikeModule();

    function createBaseEach(createBaseEachFunc, createBaseEachFromRight) {
      return function(baseEachCollection, baseEachIteratee) {
        if (baseEachCollection == null) return baseEachCollection;
        if (!isArrayLikeRefEach(baseEachCollection)) return createBaseEachFunc(baseEachCollection, baseEachIteratee);
        for (var baseEachLength = baseEachCollection.length, baseEachIndex = createBaseEachFromRight ? baseEachLength : -1, baseEachIterable = Object(baseEachCollection);
          (createBaseEachFromRight ? baseEachIndex-- : ++baseEachIndex < baseEachLength) && baseEachIteratee(baseEachIterable[baseEachIndex], baseEachIndex, baseEachIterable) !== !1;);
        return baseEachCollection
      }
    }
    createBaseEachModuleRef.exports = createBaseEach
  });
  var baseEachModule = defineCommonjsModule((baseEachExports, baseEachModuleRef) => {
    var baseForOwnRef = baseForOwnModule(),
      createBaseEachRef = createBaseEachModule(),
      baseEach = createBaseEachRef(baseForOwnRef);
    baseEachModuleRef.exports = baseEach
  });
  var baseMapModule = defineCommonjsModule((baseMapExports, baseMapModuleRef) => {
    var baseEachRef = baseEachModule(),
      isArrayLikeRefMap = isArrayLikeModule();

    function baseMap(baseMapCollection, baseMapIteratee) {
      var baseMapIndex = -1,
        baseMapResult = isArrayLikeRefMap(baseMapCollection) ? Array(baseMapCollection.length) : [];
      return baseEachRef(baseMapCollection, function(baseMapValue, baseMapKey, baseMapColl) {
        baseMapResult[++baseMapIndex] = baseMapIteratee(baseMapValue, baseMapKey, baseMapColl)
      }), baseMapResult
    }
    baseMapModuleRef.exports = baseMap
  });
  var baseSortByModule = defineCommonjsModule((baseSortByExports, baseSortByModuleRef) => {
    function baseSortBy(sortByArray, sortByComparer) {
      var sortByLengthLocal = sortByArray.length;
      for (sortByArray.sort(sortByComparer); sortByLengthLocal--;) sortByArray[sortByLengthLocal] = sortByArray[sortByLengthLocal].value;
      return sortByArray
    }
    baseSortByModuleRef.exports = baseSortBy
  });
  var compareAscendingModule = defineCommonjsModule((compareAscendingExports, compareAscendingModuleRef) => {
    var isSymbolRefCompare = isSymbolModule();

    function compareAscending(compareAscValue, compareAscOther) {
      if (compareAscValue !== compareAscOther) {
        var valIsDefined = compareAscValue !== void 0,
          valIsNull = compareAscValue === null,
          valIsReflexive = compareAscValue === compareAscValue,
          valIsSymbol = isSymbolRefCompare(compareAscValue),
          othIsDefined = compareAscOther !== void 0,
          othIsNull = compareAscOther === null,
          othIsReflexive = compareAscOther === compareAscOther,
          othIsSymbol = isSymbolRefCompare(compareAscOther);
        if (!othIsNull && !othIsSymbol && !valIsSymbol && compareAscValue > compareAscOther || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull &&
          othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) return 1;
        if (!valIsNull && !valIsSymbol && !othIsSymbol && compareAscValue < compareAscOther || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull &&
          valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) return -1
      }
      return 0
    }
    compareAscendingModuleRef.exports = compareAscending
  });
  var compareMultipleModule = defineCommonjsModule((compareMultipleExports, compareMultipleModuleRef) => {
    var compareAscendingRef = compareAscendingModule();

    function compareMultiple(compareMultObject, compareMultOther, compareMultOrders) {
      for (var compareMultIndex = -1, objCriteria = compareMultObject.criteria, othCriteria = compareMultOther.criteria, criteriaLength = objCriteria.length, ordersLength = compareMultOrders
          .length; ++compareMultIndex < criteriaLength;) {
        var compareCriteriaResult = compareAscendingRef(objCriteria[compareMultIndex], othCriteria[compareMultIndex]);
        if (compareCriteriaResult) {
          if (compareMultIndex >= ordersLength) return compareCriteriaResult;
          var compareOrder = compareMultOrders[compareMultIndex];
          return compareCriteriaResult * (compareOrder == "desc" ? -1 : 1)
        }
      }
      return compareMultObject.index - compareMultOther.index
    }
    compareMultipleModuleRef.exports = compareMultiple
  });
  var baseOrderByModule = defineCommonjsModule((baseOrderByExports, baseOrderByModuleRef) => {
    var arrayMapRefOrder = arrayMapModule(),
      baseGetRefOrder = baseGetModule(),
      baseIterateeRefOrder = baseIterateeModule(),
      baseMapRef = baseMapModule(),
      baseSortByRef = baseSortByModule(),
      baseUnaryRefOrder = baseUnaryModule(),
      compareMultipleRef = compareMultipleModule(),
      identityRefOrder = identityModule(),
      isArrayRefOrder = isArrayModule();

    function baseOrderBy(orderByCollection, orderByIteratees, orderByOrders) {
      orderByIteratees.length ? orderByIteratees = arrayMapRefOrder(orderByIteratees, function(orderByIterateeMap) {
        return isArrayRefOrder(orderByIterateeMap) ? function(orderByPathFn) {
          return baseGetRefOrder(orderByPathFn, orderByIterateeMap.length === 1 ? orderByIterateeMap[0] : orderByIterateeMap)
        } : orderByIterateeMap
      }) : orderByIteratees = [identityRefOrder];
      var orderByIndex = -1;
      orderByIteratees = arrayMapRefOrder(orderByIteratees, baseUnaryRefOrder(baseIterateeRefOrder));
      var orderByMapped = baseMapRef(orderByCollection, function(orderByValue, orderByKey, orderByInnerColl) {
        var orderByCriteria = arrayMapRefOrder(orderByIteratees, function(orderBySingleIteratee) {
          return orderBySingleIteratee(orderByValue)
        });
        return {
          criteria: orderByCriteria,
          index: ++orderByIndex,
          value: orderByValue
        }
      });
      return baseSortByRef(orderByMapped, function(orderBySortA, orderBySortB) {
        return compareMultipleRef(orderBySortA, orderBySortB, orderByOrders)
      })
    }
    baseOrderByModuleRef.exports = baseOrderBy
  });
  var applyModule = defineCommonjsModule((applyExports, applyModuleRef) => {
    function apply(applyFunc, applyThisArg, applyArgs) {
      switch (applyArgs.length) {
        case 0:
          return applyFunc.call(applyThisArg);
        case 1:
          return applyFunc.call(applyThisArg, applyArgs[0]);
        case 2:
          return applyFunc.call(applyThisArg, applyArgs[0], applyArgs[1]);
        case 3:
          return applyFunc.call(applyThisArg, applyArgs[0], applyArgs[1], applyArgs[2])
      }
      return applyFunc.apply(applyThisArg, applyArgs)
    }
    applyModuleRef.exports = apply
  });
  var overRestModule = defineCommonjsModule((overRestExports, overRestModuleRef) => {
    var applyRef = applyModule(),
      mathMaxOverRest = Math.max;

    function overRest(overRestFunc, overRestStart, overRestTransform) {
      return overRestStart = mathMaxOverRest(overRestStart === void 0 ? overRestFunc.length - 1 : overRestStart, 0),
        function() {
          for (var overRestArgs = arguments, overRestIndex = -1, overRestLength = mathMaxOverRest(overRestArgs.length - overRestStart, 0), overRestArray =
              Array(overRestLength); ++overRestIndex < overRestLength;) overRestArray[overRestIndex] = overRestArgs[overRestStart + overRestIndex];
          overRestIndex = -1;
          for (var overRestOtherArgs = Array(overRestStart + 1); ++overRestIndex < overRestStart;) overRestOtherArgs[overRestIndex] = overRestArgs[overRestIndex];
          return overRestOtherArgs[overRestStart] = overRestTransform(overRestArray), applyRef(overRestFunc, this, overRestOtherArgs)
        }
    }
    overRestModuleRef.exports = overRest
  });
  var constantModule = defineCommonjsModule((constantExports, constantModuleRef) => {
    function constant(constantValue) {
      return function() {
        return constantValue
      }
    }
    constantModuleRef.exports = constant
  });
  var definePropertyLodashModule = defineCommonjsModule((definePropertyLodashExports, definePropertyLodashModuleRef) => {
    var getNativeRefDefine = getNativeModule(),
      nativeDefineProperty = function() {
        try {
          var nativeDefineTry = getNativeRefDefine(Object, "defineProperty");
          return nativeDefineTry({}, "", {}), nativeDefineTry
        } catch {}
      }();
    definePropertyLodashModuleRef.exports = nativeDefineProperty
  });
  var baseSetToStringModule = defineCommonjsModule((baseSetToStringExports, baseSetToStringModuleRef) => {
    var constantRef = constantModule(),
      definePropertyLodashRef = definePropertyLodashModule(),
      identityRefSet = identityModule(),
      baseSetToString = definePropertyLodashRef ? function(setToStringFunc, setToStringString) {
        return definePropertyLodashRef(setToStringFunc, "toString", {
          configurable: !0,
          enumerable: !1,
          value: constantRef(setToStringString),
          writable: !0
        })
      } : identityRefSet;
    baseSetToStringModuleRef.exports = baseSetToString
  });
  var shortOutModule = defineCommonjsModule((shortOutExports, shortOutModuleRef) => {
    var hotCount = 800,
      hotSpan = 16,
      nativeNow = Date.now;

    function shortOut(shortOutFunc) {
      var shortOutCount = 0,
        shortOutLastCalled = 0;
      return function() {
        var shortOutStamp = nativeNow(),
          shortOutRemaining = hotSpan - (shortOutStamp - shortOutLastCalled);
        if (shortOutLastCalled = shortOutStamp, shortOutRemaining > 0) {
          if (++shortOutCount >= hotCount) return arguments[0]
        } else shortOutCount = 0;
        return shortOutFunc.apply(void 0, arguments)
      }
    }
    shortOutModuleRef.exports = shortOut
  });
  var setToStringModule = defineCommonjsModule((setToStringModuleExports, setToStringModuleRef) => {
    var baseSetToStringRef = baseSetToStringModule(),
      shortOutRef = shortOutModule(),
      setToString = shortOutRef(baseSetToStringRef);
    setToStringModuleRef.exports = setToString
  });
  var baseRestModule = defineCommonjsModule((baseRestExports, baseRestModuleRef) => {
    var identityRefRest = identityModule(),
      overRestRef = overRestModule(),
      setToStringRef = setToStringModule();

    function baseRest(baseRestFunc, baseRestStart) {
      return setToStringRef(overRestRef(baseRestFunc, baseRestStart, identityRefRest), baseRestFunc + "")
    }
    baseRestModuleRef.exports = baseRest
  });
  var isIterateeCallModule = defineCommonjsModule((isIterateeCallExports, isIterateeCallModuleRef) => {
    var eqRefIteratee = eqModule(),
      isArrayLikeRefIteratee = isArrayLikeModule(),
      isIndexRefIteratee = isIndexModule(),
      isObjectRefIteratee = isObjectModule();

    function isIterateeCall(iterateeCallValue, iterateeCallIndex, iterateeCallObject) {
      if (!isObjectRefIteratee(iterateeCallObject)) return !1;
      var iterateeCallType = typeof iterateeCallIndex;
      return (iterateeCallType == "number" ? isArrayLikeRefIteratee(iterateeCallObject) && isIndexRefIteratee(iterateeCallIndex, iterateeCallObject.length) : iterateeCallType == "string" &&
        iterateeCallIndex in iterateeCallObject) ? eqRefIteratee(iterateeCallObject[iterateeCallIndex], iterateeCallValue) : !1
    }
    isIterateeCallModuleRef.exports = isIterateeCall
  });
  var sortByModule = defineCommonjsModule((sortByExports, sortByModuleRef) => {
    var baseFlattenRef = baseFlattenModule(),
      baseOrderByRef = baseOrderByModule(),
      baseRestRef = baseRestModule(),
      isIterateeCallRef = isIterateeCallModule(),
      sortBy = baseRestRef(function(sortByCollection, sortByIteratees) {
        if (sortByCollection == null) return [];
        var sortByArgsLength = sortByIteratees.length;
        return sortByArgsLength > 1 && isIterateeCallRef(sortByCollection, sortByIteratees[0], sortByIteratees[1]) ? sortByIteratees = [] : sortByArgsLength > 2 && isIterateeCallRef(sortByIteratees[0],
          sortByIteratees[1], sortByIteratees[2]) && (sortByIteratees = [sortByIteratees[0]]), baseOrderByRef(sortByCollection, baseFlattenRef(sortByIteratees, 1), [])
      });
    sortByModuleRef.exports = sortBy
  });
  var treeDataModule = defineCommonjsModule(treeDataExports => {
    "use strict";
    Object.defineProperty(treeDataExports, "__esModule", {
      value: !0
    });
    var createClass = function() {
        function defineProperties(definePropTarget, definePropList) {
          for (var definePropIndex = 0; definePropIndex < definePropList.length; definePropIndex++) {
            var definePropDescriptor = definePropList[definePropIndex];
            definePropDescriptor.enumerable = definePropDescriptor.enumerable || !1, definePropDescriptor.configurable = !0,
              "value" in definePropDescriptor && (definePropDescriptor.writable = !0), Object.defineProperty(definePropTarget,
                definePropDescriptor.key, definePropDescriptor)
          }
        }
        return function(createClassConstructor, createClassProtoProps, createClassStaticProps) {
          return createClassProtoProps && defineProperties(createClassConstructor.prototype, createClassProtoProps), createClassStaticProps && defineProperties(createClassConstructor, createClassStaticProps), createClassConstructor
        }
      }(),
      findRef = findModule(),
      findDefault = interopRequireDefault(findRef),
      sortByRefApp = sortByModule(),
      sortByDefault = interopRequireDefault(sortByRefApp);

    function interopRequireDefault(interopRequireModule) {
      return interopRequireModule && interopRequireModule.__esModule ? interopRequireModule : {
        default: interopRequireModule
      }
    }

    function walkNode(walkNodeA, walkNodeB) {
      if (!(walkNodeA instanceof walkNodeB)) throw new TypeError(
        "Cannot call a class as a function")
    }
    var treeIndexClass = function() {
      function treeIndexConstructor() {
        walkNode(this, treeIndexConstructor), this.refs = {}
      }
      return createClass(treeIndexConstructor, [{
        key: "add",
        value: function(treeGetIndexNode, treeGetIndexKey) {
          this.refs[treeGetIndexNode] || (this.refs[treeGetIndexNode] = []), this.refs[treeGetIndexNode]
            .push(treeGetIndexKey)
        }
      }, {
        key: "remove",
        value: function(treeSetIndexNode, treeSetIndexKey) {
          var treeIndexPosition = this.getIndex(treeSetIndexNode, treeSetIndexKey);
          treeIndexPosition !== -1 && this.refs[treeSetIndexNode].splice(treeIndexPosition, 1)
        }
      }, {
        key: "isActive",
        value: function() {
          return this.active
        }
      }, {
        key: "getActive",
        value: function() {
          var treeSelfRef = this;
          return (0, findDefault.default)(this.refs[this.active
            .collection], function(treeCollectionNode) {
            var treeNodeValue = treeCollectionNode.node;
            return treeNodeValue.sortableInfo.index == treeSelfRef.active.index
          })
        }
      }, {
        key: "getIndex",
        value: function(treeRemoveNode, treeRemoveKey) {
          return this.refs[treeRemoveNode].indexOf(treeRemoveKey)
        }
      }, {
        key: "getOrderedRefs",
        value: function() {
          var treeRefsArg = arguments.length > 0 && arguments[0] !==
            void 0 ? arguments[0] : this.active.collection;
          return (0, sortByDefault.default)(this.refs[treeRefsArg], function(treeRefNode) {
            var treeRefValue = treeRefNode.node;
            return treeRefValue.sortableInfo.index
          })
        }
      }]), treeIndexConstructor
    }();
    treeDataExports.default = treeIndexClass
  });
  var babelHelpersModule = defineCommonjsModule(babelHelpersExports => {
    "use strict";
    Object.defineProperty(babelHelpersExports, "__esModule", {
      value: !0
    });
    var objectAssignPolyfill = Object.assign || function(assignPolyfillTarget) {
        for (var assignPolyfillIndex = 1; assignPolyfillIndex < arguments.length; assignPolyfillIndex++) {
          var assignPolyfillSource = arguments[assignPolyfillIndex];
          for (var assignPolyfillKey in assignPolyfillSource) Object.prototype.hasOwnProperty.call(assignPolyfillSource, assignPolyfillKey) && (
            assignPolyfillTarget[assignPolyfillKey] = assignPolyfillSource[assignPolyfillKey])
        }
        return assignPolyfillTarget
      },
      slicedToArray = function() {
        function sliceIterator(sliceArr, sliceLimit) {
          var sliceResult = [],
            sliceNormalCompletion = !0,
            sliceDidError = !1,
            sliceErrorValue = void 0;
          try {
            for (var sliceIteratorObj = sliceArr[Symbol.iterator](), sliceStep; !(sliceNormalCompletion = (sliceStep = sliceIteratorObj.next())
                .done) && (sliceResult.push(sliceStep.value), !(sliceLimit && sliceResult.length === sliceLimit)); sliceNormalCompletion = !
              0);
          } catch (sliceCaughtError) {
            sliceDidError = !0, sliceErrorValue = sliceCaughtError
          } finally {
            try {
              !sliceNormalCompletion && sliceIteratorObj.return && sliceIteratorObj.return()
            } finally {
              if (sliceDidError) throw sliceErrorValue
            }
          }
          return sliceResult
        }
        return function(slicedArrArg, slicedLimitArg) {
          if (Array.isArray(slicedArrArg)) return slicedArrArg;
          if (Symbol.iterator in Object(slicedArrArg)) return sliceIterator(slicedArrArg, slicedLimitArg);
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance")
        }
      }(),
      createClass2 = function() {
        function defineProperties2(definePropTarget2, definePropList2) {
          for (var definePropIndex2 = 0; definePropIndex2 < definePropList2.length; definePropIndex2++) {
            var definePropDescriptor2 = definePropList2[definePropIndex2];
            definePropDescriptor2.enumerable = definePropDescriptor2.enumerable || !1, definePropDescriptor2.configurable = !0,
              "value" in definePropDescriptor2 && (definePropDescriptor2.writable = !0), Object.defineProperty(definePropTarget2,
                definePropDescriptor2.key, definePropDescriptor2)
          }
        }
        return function(createClass2Constructor, createClass2ProtoProps, createClass2StaticProps) {
          return createClass2ProtoProps && defineProperties2(createClass2Constructor.prototype, createClass2ProtoProps), createClass2StaticProps && defineProperties2(createClass2Constructor, createClass2StaticProps), createClass2Constructor
        }
      }();
    babelHelpersExports.default = draggableCoreFactory;
    var reactRuntime2 = reactEntryModule(),
      reactDefault = interopRequireDefault2(reactRuntime2),
      propTypesRuntime = propTypesModule(),
      PropTypes = interopRequireDefault2(propTypesRuntime),
      reactDomRuntime = reactDomCheckDCEModule(),
      invariantRuntime = invariantModule(),
      invariantDefault = interopRequireDefault2(invariantRuntime),
      treeDataRuntime = treeDataModule(),
      treeDataDefault = interopRequireDefault2(treeDataRuntime),
      domVendorRuntime = domVendorModule();

    function interopRequireDefault2(interopModuleArg) {
      return interopModuleArg && interopModuleArg.__esModule ? interopModuleArg : {
        default: interopModuleArg
      }
    }

    function toConsumableArray(consumableArray) {
      if (Array.isArray(consumableArray)) {
        for (var consumableIndex = 0, consumableResult = Array(consumableArray.length); consumableIndex < consumableArray.length; consumableIndex++) consumableResult[consumableIndex] = consumableArray[
          consumableIndex];
        return consumableResult
      } else return Array.from(consumableArray)
    }

    function classCallCheck(classCallInstance, classCallConstructor) {
      if (!(classCallInstance instanceof classCallConstructor)) throw new TypeError(
        "Cannot call a class as a function")
    }

    function possibleConstructorReturn(selfRef, callResult) {
      if (!selfRef) throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
      return callResult && (typeof callResult == "object" || typeof callResult == "function") ? callResult : selfRef
    }

    function inherits(subClass, superClass) {
      if (typeof superClass != "function" && superClass !== null) throw new TypeError(
        "Super expression must either be null or a function, not " +
        typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass
        .__proto__ = superClass)
    }

    function draggableCoreFactory(draggableCoreArg) {
      var draggableCoreClassVar, draggableCoreRefVar, draggableCoreOptions = arguments.length > 1 && arguments[1] !== void 0 ?
        arguments[1] : {
          withRef: !1
        };
      return draggableCoreRefVar = draggableCoreClassVar = function(draggableCoreConstructor) {
        inherits(DraggableCoreComponent, draggableCoreConstructor);

        function DraggableCoreComponent(draggableComponentProps) {
          classCallCheck(this, DraggableCoreComponent);
          var draggableComponentInstance = possibleConstructorReturn(this, (DraggableCoreComponent.__proto__ || Object.getPrototypeOf(DraggableCoreComponent))
            .call(this, draggableComponentProps));
          return draggableComponentInstance.handleStart = function(handleStartEvent) {
            var handleStartProps = draggableComponentInstance.props,
              startDistance = handleStartProps.distance,
              shouldCancelStartFn = handleStartProps.shouldCancelStart;
            if (handleStartEvent.button === 2 || shouldCancelStartFn(handleStartEvent)) return !1;
            draggableComponentInstance._touched = !0, draggableComponentInstance._pos = {
              x: handleStartEvent.pageX,
              y: handleStartEvent.pageY
            };
            var closestSortableNode = (0, domVendorRuntime.closest)(handleStartEvent.target, function(closestPredicateEl) {
              return closestPredicateEl.sortableInfo != null
            });
            if (closestSortableNode && closestSortableNode.sortableInfo && draggableComponentInstance.nodeIsChild(closestSortableNode) && !draggableComponentInstance.state
              .sorting) {
              var useDragHandleFlag = draggableComponentInstance.props.useDragHandle,
                sortableInfo = closestSortableNode.sortableInfo,
                sortableIndex = sortableInfo.index,
                sortableCollection = sortableInfo.collection;
              if (useDragHandleFlag && !(0, domVendorRuntime.closest)(handleStartEvent.target, function(dragHandlePredicateEl) {
                  return dragHandlePredicateEl.sortableHandle != null
                })) return;
              draggableComponentInstance.manager.active = {
                  index: sortableIndex,
                  collection: sortableCollection
                }, handleStartEvent.target.tagName.toLowerCase() === "a" && handleStartEvent
                .preventDefault(), startDistance || (draggableComponentInstance.props.pressDelay === 0 ? draggableComponentInstance
                  .handlePress(handleStartEvent) : draggableComponentInstance.pressTimer = setTimeout(
                    function() {
                      return draggableComponentInstance.handlePress(handleStartEvent)
                    }, draggableComponentInstance.props.pressDelay))
            }
          }, draggableComponentInstance.nodeIsChild = function(nodeIsChildNode) {
            return nodeIsChildNode.sortableInfo.manager === draggableComponentInstance.manager
          }, draggableComponentInstance.handleMove = function(handleMoveEvent) {
            var moveProps = draggableComponentInstance.props,
              moveDistance = moveProps.distance,
              movePressThreshold = moveProps.pressThreshold;
            if (!draggableComponentInstance.state.sorting && draggableComponentInstance._touched) {
              draggableComponentInstance._delta = {
                x: draggableComponentInstance._pos.x - handleMoveEvent.pageX,
                y: draggableComponentInstance._pos.y - handleMoveEvent.pageY
              };
              var moveDelta = Math.abs(draggableComponentInstance._delta.x) + Math.abs(draggableComponentInstance._delta.y);
              !moveDistance && (!movePressThreshold || movePressThreshold && moveDelta >= movePressThreshold) ? (clearTimeout(draggableComponentInstance
                  .cancelTimer), draggableComponentInstance.cancelTimer = setTimeout(draggableComponentInstance.cancel,
                    0)) : moveDistance && moveDelta >= moveDistance && draggableComponentInstance.manager.isActive() && draggableComponentInstance
                .handlePress(handleMoveEvent)
            }
          }, draggableComponentInstance.handleEnd = function() {
            var moveDistanceProp = draggableComponentInstance.props.distance;
            draggableComponentInstance._touched = !1, moveDistanceProp || draggableComponentInstance.cancel()
          }, draggableComponentInstance.cancel = function() {
            draggableComponentInstance.state.sorting || (clearTimeout(draggableComponentInstance.pressTimer), draggableComponentInstance.manager
              .active = null)
          }, draggableComponentInstance.handlePress = function(handlePressEvent) {
            var activeNode = draggableComponentInstance.manager.getActive();
            if (activeNode) {
              var pressProps = draggableComponentInstance.props,
                pressAxis = pressProps.axis,
                getHelperDimensionsFn = pressProps.getHelperDimensions,
                helperClass = pressProps.helperClass,
                hideSortableGhost = pressProps.hideSortableGhost,
                onSortStart = pressProps.onSortStart,
                useWindowAsScrollContainer = pressProps.useWindowAsScrollContainer,
                activeSortableNode = activeNode.node,
                activeCollection = activeNode.collection,
                activeIndex = activeSortableNode.sortableInfo.index,
                elementMargin = (0, domVendorRuntime.getElementMargin)(activeSortableNode),
                containerBoundingRect = draggableComponentInstance.container.getBoundingClientRect(),
                helperDimensions = getHelperDimensionsFn({
                  index: activeIndex,
                  node: activeSortableNode,
                  collection: activeCollection
                });
              draggableComponentInstance.node = activeSortableNode, draggableComponentInstance.margin = elementMargin, draggableComponentInstance.width = helperDimensions.width, draggableComponentInstance.height =
                helperDimensions.height, draggableComponentInstance.marginOffset = {
                  x: draggableComponentInstance.margin.left + draggableComponentInstance.margin.right,
                  y: Math.max(draggableComponentInstance.margin.top, draggableComponentInstance.margin.bottom)
                }, draggableComponentInstance.boundingClientRect = activeSortableNode.getBoundingClientRect(), draggableComponentInstance
                .containerBoundingRect = containerBoundingRect, draggableComponentInstance.index = activeIndex, draggableComponentInstance.newIndex =
                activeIndex, draggableComponentInstance.axis = {
                  x: pressAxis.indexOf("x") >= 0,
                  y: pressAxis.indexOf("y") >= 0
                }, draggableComponentInstance.offsetEdge = draggableComponentInstance.getEdgeOffset(activeSortableNode), draggableComponentInstance
                .initialOffset = draggableComponentInstance.getOffset(handlePressEvent), draggableComponentInstance.initialScroll = {
                  top: draggableComponentInstance.scrollContainer.scrollTop,
                  left: draggableComponentInstance.scrollContainer.scrollLeft
                }, draggableComponentInstance.initialWindowScroll = {
                  top: window.pageYOffset,
                  left: window.pageXOffset
                };
              var cloneInputs = activeSortableNode.querySelectorAll("input, textarea, select"),
                clonedHelper = activeSortableNode.cloneNode(!0),
                clonedFields = [].concat(toConsumableArray(clonedHelper.querySelectorAll(
                  "input, textarea, select")));
              if (clonedFields.forEach(function(clonedFieldEl, clonedFieldIndex) {
                  clonedFieldEl.type !== "file" && cloneInputs[clonedFieldIndex] && (clonedFieldEl.value = cloneInputs[clonedFieldIndex]
                    .value)
                }), draggableComponentInstance.helper = draggableComponentInstance.document.body.appendChild(clonedHelper), draggableComponentInstance
                .helper.style.position = "fixed", draggableComponentInstance.helper.style.top =
                draggableComponentInstance.boundingClientRect.top - elementMargin.top + "px", draggableComponentInstance.helper
                .style.left = draggableComponentInstance.boundingClientRect.left - elementMargin.left +
                "px", draggableComponentInstance.helper.style.width = draggableComponentInstance.width + "px", draggableComponentInstance.helper
                .style.height = draggableComponentInstance.height + "px", draggableComponentInstance.helper.style
                .boxSizing = "border-box", draggableComponentInstance.helper.style
                .pointerEvents = "none", hideSortableGhost && (draggableComponentInstance.sortableGhost = activeSortableNode, activeSortableNode
                  .style.visibility = "hidden", activeSortableNode.style.opacity = 0),
                draggableComponentInstance.minTranslate = {}, draggableComponentInstance.maxTranslate = {}, draggableComponentInstance.axis.x &&
                (draggableComponentInstance.minTranslate.x = (useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - draggableComponentInstance
                  .boundingClientRect.left - draggableComponentInstance.width / 2, draggableComponentInstance
                  .maxTranslate.x = (useWindowAsScrollContainer ? draggableComponentInstance.contentWindow.innerWidth :
                    containerBoundingRect.left + containerBoundingRect.width) - draggableComponentInstance.boundingClientRect.left - draggableComponentInstance
                  .width / 2), draggableComponentInstance.axis.y && (draggableComponentInstance.minTranslate.y = (useWindowAsScrollContainer ?
                    0 : containerBoundingRect.top) - draggableComponentInstance.boundingClientRect.top - draggableComponentInstance.height /
                  2, draggableComponentInstance.maxTranslate.y = (useWindowAsScrollContainer ? draggableComponentInstance.contentWindow
                    .innerHeight : containerBoundingRect.top + containerBoundingRect.height) - draggableComponentInstance
                  .boundingClientRect.top - draggableComponentInstance.height / 2), helperClass) {
                var animationFrameId;
                (animationFrameId = draggableComponentInstance.helper.classList)
                .add.apply(animationFrameId, toConsumableArray(helperClass.split(" ")))
              }
              draggableComponentInstance.listenerNode = handlePressEvent.touches ? activeSortableNode : draggableComponentInstance.contentWindow, domVendorRuntime
                .events.move.forEach(function(moveEventName) {
                  return draggableComponentInstance.listenerNode.addEventListener(moveEventName, draggableComponentInstance
                    .handleSortMove, !1)
                }), domVendorRuntime.events.end.forEach(function(endEventName) {
                  return draggableComponentInstance.listenerNode.addEventListener(endEventName, draggableComponentInstance
                    .handleSortEnd, !1)
                }), draggableComponentInstance.setState({
                  sorting: !0,
                  sortingIndex: activeIndex
                }), onSortStart && onSortStart({
                  node: activeSortableNode,
                  index: activeIndex,
                  collection: activeCollection
                }, handlePressEvent)
            }
          }, draggableComponentInstance.handleSortMove = function(handleSortMoveEvent) {
            var onSortMoveFn = draggableComponentInstance.props.onSortMove;
            handleSortMoveEvent.preventDefault(), draggableComponentInstance.updatePosition(handleSortMoveEvent), draggableComponentInstance.animateNodes(),
              draggableComponentInstance.autoscroll(), onSortMoveFn && onSortMoveFn(handleSortMoveEvent)
          }, draggableComponentInstance.handleSortEnd = function(handleSortEndEvent) {
            var sortEndProps = draggableComponentInstance.props,
              sortEndHideGhost = sortEndProps.hideSortableGhost,
              onSortEndFn = sortEndProps.onSortEnd,
              sortEndCollection = draggableComponentInstance.manager.active.collection;
            draggableComponentInstance.listenerNode && (domVendorRuntime.events.move.forEach(function(sortMoveEventName) {
                return draggableComponentInstance.listenerNode.removeEventListener(sortMoveEventName, draggableComponentInstance
                  .handleSortMove)
              }), domVendorRuntime.events.end.forEach(function(sortEndEventName) {
                return draggableComponentInstance.listenerNode.removeEventListener(sortEndEventName, draggableComponentInstance
                  .handleSortEnd)
              })), draggableComponentInstance.helper.parentNode.removeChild(draggableComponentInstance.helper), sortEndHideGhost && draggableComponentInstance
              .sortableGhost && (draggableComponentInstance.sortableGhost.style.visibility =
                "", draggableComponentInstance.sortableGhost.style.opacity = "");
            for (var orderedRefs = draggableComponentInstance.manager.refs[sortEndCollection], refIndex = 0, refCount = orderedRefs.length; refIndex <
              refCount; refIndex++) {
              var refItem = orderedRefs[refIndex],
                refNode = refItem.node;
              refItem.edgeOffset = null, refNode.style[domVendorRuntime.vendorPrefix +
                "Transform"] = "", refNode.style[domVendorRuntime.vendorPrefix +
                "TransitionDuration"] = ""
            }
            clearInterval(draggableComponentInstance.autoscrollInterval), draggableComponentInstance
              .autoscrollInterval = null, draggableComponentInstance.manager.active = null, draggableComponentInstance
              .setState({
                sorting: !1,
                sortingIndex: null
              }), typeof onSortEndFn == "function" && onSortEndFn({
                oldIndex: draggableComponentInstance.index,
                newIndex: draggableComponentInstance.newIndex,
                collection: sortEndCollection
              }, handleSortEndEvent), draggableComponentInstance._touched = !1
          }, draggableComponentInstance.autoscroll = function() {
            var currentTranslate = draggableComponentInstance.translate,
              nodeStyle = {
                x: 0,
                y: 0
              },
              oldStyle = {
                x: 1,
                y: 1
              },
              helperStyle = {
                x: 10,
                y: 10
              };
            currentTranslate.y >= draggableComponentInstance.maxTranslate.y - draggableComponentInstance.height / 2 ? (nodeStyle.y = 1, oldStyle.y = helperStyle
                .y * Math.abs((draggableComponentInstance.maxTranslate.y - draggableComponentInstance.height / 2 - currentTranslate
                  .y) / draggableComponentInstance.height)) : currentTranslate.x >= draggableComponentInstance.maxTranslate.x - draggableComponentInstance
              .width / 2 ? (nodeStyle.x = 1, oldStyle.x = helperStyle.x * Math.abs((draggableComponentInstance
                .maxTranslate.x - draggableComponentInstance.width / 2 - currentTranslate.x) / draggableComponentInstance.width)) : currentTranslate
              .y <= draggableComponentInstance.minTranslate.y + draggableComponentInstance.height / 2 ? (nodeStyle.y = -1, oldStyle.y =
                helperStyle.y * Math.abs((currentTranslate.y - draggableComponentInstance.height / 2 - draggableComponentInstance.minTranslate
                  .y) / draggableComponentInstance.height)) : currentTranslate.x <= draggableComponentInstance.minTranslate.x + draggableComponentInstance
              .width / 2 && (nodeStyle.x = -1, oldStyle.x = helperStyle.x * Math.abs((currentTranslate.x - draggableComponentInstance
                .width / 2 - draggableComponentInstance.minTranslate.x) / draggableComponentInstance.width)), draggableComponentInstance
              .autoscrollInterval && (clearInterval(draggableComponentInstance
                  .autoscrollInterval), draggableComponentInstance.autoscrollInterval = null, draggableComponentInstance
                .isAutoScrolling = !1), (nodeStyle.x !== 0 || nodeStyle.y !== 0) && (draggableComponentInstance
                .autoscrollInterval = setInterval(function() {
                  draggableComponentInstance.isAutoScrolling = !0;
                  var ghostStyle = {
                    left: 1 * oldStyle.x * nodeStyle.x,
                    top: 1 * oldStyle.y * nodeStyle.y
                  };
                  draggableComponentInstance.scrollContainer.scrollTop += ghostStyle.top, draggableComponentInstance
                    .scrollContainer.scrollLeft += ghostStyle.left, draggableComponentInstance
                    .translate.x += ghostStyle.left, draggableComponentInstance.translate.y += ghostStyle.top,
                    draggableComponentInstance.animateNodes()
                }, 5))
          }, draggableComponentInstance.manager = new treeDataDefault.default, draggableComponentInstance.events = {
            start: draggableComponentInstance.handleStart,
            move: draggableComponentInstance.handleMove,
            end: draggableComponentInstance.handleEnd
          }, (0, invariantDefault.default)(!(draggableComponentProps.distance && draggableComponentProps.pressDelay),
            "Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time."
            ), draggableComponentInstance.state = {}, draggableComponentInstance
        }
        return createClass2(DraggableCoreComponent, [{
          key: "getChildContext",
          value: function() {
            return {
              manager: this.manager
            }
          }
        }, {
          key: "componentDidMount",
          value: function() {
            var managerSelf1 = this,
              containerProps = this.props,
              getContainerFn = containerProps.getContainer,
              useWindowScroll = containerProps.useWindowAsScrollContainer,
              contentWindow = this.props.contentWindow || window;
            this.container = typeof getContainerFn == "function" ? getContainerFn(this
                .getWrappedInstance()) : (0, reactDomRuntime.findDOMNode)(
                this), this.document = this.container
              .ownerDocument || document, this.scrollContainer =
              useWindowScroll ? this.document.body : this.container, this
              .contentWindow = typeof contentWindow == "function" ? contentWindow() : contentWindow;
            var addEventHandler = function(eventGroupKey) {
              managerSelf1.events.hasOwnProperty(eventGroupKey) && domVendorRuntime.events[eventGroupKey]
                .forEach(function(eventNameAdd) {
                  return managerSelf1.container.addEventListener(eventNameAdd, managerSelf1
                    .events[eventGroupKey], !1)
                })
            };
            for (var eventGroupName in this.events) addEventHandler(eventGroupName)
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            var managerSelf2 = this,
              removeEventHandler = function(eventGroupKeyRemove) {
                managerSelf2.events.hasOwnProperty(eventGroupKeyRemove) && domVendorRuntime.events[eventGroupKeyRemove]
                  .forEach(function(eventNameRemove) {
                    return managerSelf2.container.removeEventListener(eventNameRemove,
                      managerSelf2.events[eventGroupKeyRemove])
                  })
              };
            for (var eventGroupNameRemove in this.events) removeEventHandler(eventGroupNameRemove)
          }
        }, {
          key: "getEdgeOffset",
          value: function(managerAddRef) {
            var managerAddOptions = arguments.length > 1 && arguments[1] !==
              void 0 ? arguments[1] : {
                top: 0,
                left: 0
              };
            if (managerAddRef) {
              var managerRefEntry = {
                top: managerAddOptions.top + managerAddRef.offsetTop,
                left: managerAddOptions.left + managerAddRef.offsetLeft
              };
              return managerAddRef.parentNode !== this.container ? this
                .getEdgeOffset(managerAddRef.parentNode, managerRefEntry) : managerRefEntry
            }
          }
        }, {
          key: "getOffset",
          value: function(managerRemoveRef) {
            return {
              x: managerRemoveRef.touches ? managerRemoveRef.touches[0].pageX : managerRemoveRef.pageX,
              y: managerRemoveRef.touches ? managerRemoveRef.touches[0].pageY : managerRemoveRef.pageY
            }
          }
        }, {
          key: "getLockPixelOffsets",
          value: function() {
            var lockOffsetOption = this.props.lockOffset;
            Array.isArray(lockOffsetOption) || (lockOffsetOption = [lockOffsetOption, lockOffsetOption]), (0, invariantDefault.default)(lockOffsetOption
              .length === 2,
              "lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given %s",
              lockOffsetOption);
            var lockOffsetValue = lockOffsetOption,
              lockOffsetPair = slicedToArray(lockOffsetValue, 2),
              lockOffsetMin = lockOffsetPair[0],
              lockOffsetMax = lockOffsetPair[1];
            return [this.getLockPixelOffset(lockOffsetMin), this
              .getLockPixelOffset(lockOffsetMax)
            ]
          }
        }, {
          key: "getLockPixelOffset",
          value: function(lockOffsetRaw) {
            var lockOffsetAmount = lockOffsetRaw,
              lockOffsetUnit = lockOffsetRaw,
              lockOffsetUnitDefault = "px";
            if (typeof lockOffsetRaw == "string") {
              var lockOffsetMatch = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffsetRaw);
              (0, invariantDefault.default)(lockOffsetMatch !== null,
                'lockOffset value should be a number or a string of a number followed by "px" or "%". Given %s',
                lockOffsetRaw), lockOffsetAmount = lockOffsetUnit = parseFloat(lockOffsetRaw), lockOffsetUnitDefault = lockOffsetMatch[1]
            }
            return (0, invariantDefault.default)(isFinite(lockOffsetAmount) && isFinite(lockOffsetUnit),
              "lockOffset value should be a finite. Given %s",
              lockOffsetRaw), lockOffsetUnitDefault === "%" && (lockOffsetAmount = lockOffsetAmount * this.width / 100, lockOffsetUnit =
              lockOffsetUnit * this.height / 100), {
              x: lockOffsetAmount,
              y: lockOffsetUnit
            }
          }
        }, {
          key: "updatePosition",
          value: function(getLockOffsetArg) {
            var lockProps = this.props,
              lockAxis = lockProps.lockAxis,
              lockToContainerEdges = lockProps.lockToContainerEdges,
              offsetPixels = this.getOffset(getLockOffsetArg),
              minTranslate = {
                x: offsetPixels.x - this.initialOffset.x,
                y: offsetPixels.y - this.initialOffset.y
              };
            if (minTranslate.y -= window.pageYOffset - this
              .initialWindowScroll.top, minTranslate.x -= window
              .pageXOffset - this.initialWindowScroll.left, this
              .translate = minTranslate, lockToContainerEdges) {
              var lockPixelOffsets = this.getLockPixelOffsets(),
                lockPixelPair = slicedToArray(lockPixelOffsets, 2),
                lockPixelMin = lockPixelPair[0],
                lockPixelMax = lockPixelPair[1],
                maxTranslate = {
                  x: this.width / 2 - lockPixelMin.x,
                  y: this.height / 2 - lockPixelMin.y
                },
                lockedTranslate = {
                  x: this.width / 2 - lockPixelMax.x,
                  y: this.height / 2 - lockPixelMax.y
                };
              minTranslate.x = (0, domVendorRuntime.limit)(this.minTranslate.x + maxTranslate.x, this
                .maxTranslate.x - lockedTranslate.x, minTranslate.x), minTranslate.y = (0, domVendorRuntime
                .limit)(this.minTranslate.y + maxTranslate.y, this
                .maxTranslate.y - lockedTranslate.y, minTranslate.y)
            }
            lockAxis === "x" ? minTranslate.y = 0 : lockAxis === "y" && (minTranslate.x = 0), this
              .helper.style[domVendorRuntime.vendorPrefix + "Transform"] =
              "translate3d(" + minTranslate.x + "px," + minTranslate.y + "px, 0)"
          }
        }, {
          key: "animateNodes",
          value: function() {
            var sortEndProps2 = this.props,
              transitionDuration = sortEndProps2.transitionDuration,
              hideSortableGhost2 = sortEndProps2.hideSortableGhost,
              orderedRefs2 = this.manager.getOrderedRefs(),
              resetStyle = {
                left: this.scrollContainer.scrollLeft - this
                  .initialScroll.left,
                top: this.scrollContainer.scrollTop - this
                  .initialScroll.top
              },
              transformStyle = {
                left: this.offsetEdge.left + this.translate.x +
                  resetStyle.left,
                top: this.offsetEdge.top + this.translate.y + resetStyle
                  .top
              },
              nodeTransformStyle = {
                top: window.pageYOffset - this
                  .initialWindowScroll.top,
                left: window.pageXOffset - this
                  .initialWindowScroll.left
              };
            this.newIndex = null;
            for (var refLoopIndex = 0, refLoopCount = orderedRefs2.length; refLoopIndex < refLoopCount; refLoopIndex++) {
              var refLoopNode = orderedRefs2[refLoopIndex].node,
                refLoopIndexNum = refLoopNode.sortableInfo.index,
                refNodeWidth = refLoopNode.offsetWidth,
                refNodeHeight = refLoopNode.offsetHeight,
                refNodeOffset = {
                  width: this.width > refNodeWidth ? refNodeWidth / 2 : this.width /
                    2,
                  height: this.height > refNodeHeight ? refNodeHeight / 2 : this
                    .height / 2
                },
                refNodeTranslate = {
                  x: 0,
                  y: 0
                },
                refEdgeOffset = orderedRefs2[refLoopIndex].edgeOffset;
              refEdgeOffset || (orderedRefs2[refLoopIndex].edgeOffset = refEdgeOffset = this.getEdgeOffset(
              refLoopNode));
              var nextRefEntry = refLoopIndex < orderedRefs2.length - 1 && orderedRefs2[refLoopIndex + 1],
                prevRefEntry = refLoopIndex > 0 && orderedRefs2[refLoopIndex - 1];
              if (nextRefEntry && !nextRefEntry.edgeOffset && (nextRefEntry.edgeOffset = this
                  .getEdgeOffset(nextRefEntry.node)), refLoopIndexNum === this.index) {
                hideSortableGhost2 && (this.sortableGhost = refLoopNode, refLoopNode.style
                  .visibility = "hidden", refLoopNode.style.opacity = 0);
                continue
              }
              transitionDuration && (refLoopNode.style[domVendorRuntime.vendorPrefix +
                  "TransitionDuration"] = transitionDuration + "ms"), this.axis
                .x ? this.axis.y ? refLoopIndexNum < this.index && (transformStyle.left + nodeTransformStyle
                  .left - refNodeOffset.width <= refEdgeOffset.left && transformStyle.top + nodeTransformStyle.top <=
                  refEdgeOffset.top + refNodeOffset.height || transformStyle.top + nodeTransformStyle.top + refNodeOffset
                  .height <= refEdgeOffset.top) ? (refNodeTranslate.x = this.width + this
                  .marginOffset.x, refEdgeOffset.left + refNodeTranslate.x > this
                  .containerBoundingRect.width - refNodeOffset.width && (refNodeTranslate
                    .x = nextRefEntry.edgeOffset.left - refEdgeOffset.left, refNodeTranslate.y = nextRefEntry
                    .edgeOffset.top - refEdgeOffset.top), this.newIndex ===
                  null && (this.newIndex = refLoopIndexNum)) : refLoopIndexNum > this
                .index && (transformStyle.left + nodeTransformStyle.left + refNodeOffset.width >= refEdgeOffset
                  .left && transformStyle.top + nodeTransformStyle.top + refNodeOffset.height >= refEdgeOffset.top ||
                  transformStyle.top + nodeTransformStyle.top + refNodeOffset.height >= refEdgeOffset.top + refNodeHeight) && (refNodeTranslate
                  .x = -(this.width + this.marginOffset.x), refEdgeOffset
                  .left + refNodeTranslate.x < this.containerBoundingRect
                  .left + refNodeOffset.width && (refNodeTranslate.x = prevRefEntry.edgeOffset.left -
                    refEdgeOffset.left, refNodeTranslate.y = prevRefEntry.edgeOffset.top - refEdgeOffset.top),
                  this.newIndex = refLoopIndexNum) : refLoopIndexNum > this.index && transformStyle
                .left + nodeTransformStyle.left + refNodeOffset.width >= refEdgeOffset.left ? (refNodeTranslate.x = -(
                    this.width + this.marginOffset.x), this
                  .newIndex = refLoopIndexNum) : refLoopIndexNum < this.index && transformStyle.left + nodeTransformStyle
                .left <= refEdgeOffset.left + refNodeOffset.width && (refNodeTranslate.x = this.width +
                  this.marginOffset.x, this.newIndex == null &&
                  (this.newIndex = refLoopIndexNum)) : this.axis.y && (refLoopIndexNum >
                  this.index && transformStyle.top + nodeTransformStyle.top + refNodeOffset.height >= refEdgeOffset
                  .top ? (refNodeTranslate.y = -(this.height + this
                    .marginOffset.y), this.newIndex = refLoopIndexNum) : refLoopIndexNum <
                  this.index && transformStyle.top + nodeTransformStyle.top <= refEdgeOffset.top + refNodeOffset
                  .height && (refNodeTranslate.y = this.height + this
                    .marginOffset.y, this.newIndex == null && (
                      this.newIndex = refLoopIndexNum))), refLoopNode.style[domVendorRuntime
                  .vendorPrefix + "Transform"] =
                "translate3d(" + refNodeTranslate.x + "px," + refNodeTranslate.y + "px,0)"
            }
            this.newIndex == null && (this.newIndex = this
              .index)
          }
        }, {
          key: "getWrappedInstance",
          value: function() {
            return (0, invariantDefault.default)(draggableCoreOptions.withRef,
              "To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call"
              ), this.refs.wrappedInstance
          }
        }, {
          key: "render",
          value: function() {
            var wrappedInstanceKey = draggableCoreOptions.withRef ? "wrappedInstance" : null;
            return reactDefault.default.createElement(draggableCoreArg, objectAssignPolyfill({
              ref: wrappedInstanceKey
            }, (0, domVendorRuntime.omit)(this.props, "contentWindow",
              "useWindowAsScrollContainer", "distance",
              "helperClass", "hideSortableGhost",
              "transitionDuration", "useDragHandle",
              "pressDelay", "pressThreshold",
              "shouldCancelStart", "onSortStart",
              "onSortMove", "onSortEnd", "axis",
              "lockAxis", "lockOffset",
              "lockToContainerEdges", "getContainer",
              "getHelperDimensions")))
          }
        }]), DraggableCoreComponent
      }(reactRuntime2.Component), draggableCoreClassVar.displayName = (0, domVendorRuntime.provideDisplayName)(
        "sortableList", draggableCoreArg), draggableCoreClassVar.defaultProps = {
        axis: "y",
        transitionDuration: 300,
        pressDelay: 0,
        pressThreshold: 5,
        distance: 0,
        useWindowAsScrollContainer: !1,
        hideSortableGhost: !0,
        shouldCancelStart: function(cancelStartEvent) {
          var interactiveElements = ["input", "textarea", "select", "option", "button"];
          if (interactiveElements.indexOf(cancelStartEvent.target.tagName.toLowerCase()) !== -1)
          return !0
        },
        lockToContainerEdges: !1,
        lockOffset: "50%",
        getHelperDimensions: function(helperDimensionsNode) {
          var helperDimNode = helperDimensionsNode.node;
          return {
            width: helperDimNode.offsetWidth,
            height: helperDimNode.offsetHeight
          }
        }
      }, draggableCoreClassVar.propTypes = {
        axis: PropTypes.default.oneOf(["x", "y", "xy"]),
        distance: PropTypes.default.number,
        lockAxis: PropTypes.default.string,
        helperClass: PropTypes.default.string,
        transitionDuration: PropTypes.default.number,
        contentWindow: PropTypes.default.any,
        onSortStart: PropTypes.default.func,
        onSortMove: PropTypes.default.func,
        onSortEnd: PropTypes.default.func,
        shouldCancelStart: PropTypes.default.func,
        pressDelay: PropTypes.default.number,
        useDragHandle: PropTypes.default.bool,
        useWindowAsScrollContainer: PropTypes.default.bool,
        hideSortableGhost: PropTypes.default.bool,
        lockToContainerEdges: PropTypes.default.bool,
        lockOffset: PropTypes.default.oneOfType([PropTypes.default.number, PropTypes.default
          .string, PropTypes.default.arrayOf(PropTypes.default.oneOfType([PropTypes.default
            .number, PropTypes.default.string
          ]))
        ]),
        getContainer: PropTypes.default.func,
        getHelperDimensions: PropTypes.default.func
      }, draggableCoreClassVar.childContextTypes = {
        manager: PropTypes.default.object.isRequired
      }, draggableCoreRefVar
    }
  });
  var sortableContainerModule = defineCommonjsModule(sortableContainerExports => {
    "use strict";
    Object.defineProperty(sortableContainerExports, "__esModule", {
      value: !0
    });
    var objectAssignPolyfill2 = Object.assign || function(assignTarget2) {
        for (var assignIndex2 = 1; assignIndex2 < arguments.length; assignIndex2++) {
          var assignSource2 = arguments[assignIndex2];
          for (var assignKey2 in assignSource2) Object.prototype.hasOwnProperty.call(assignSource2, assignKey2) && (
            assignTarget2[assignKey2] = assignSource2[assignKey2])
        }
        return assignTarget2
      },
      createClass3 = function() {
        function defineProperties3(definePropTarget3, definePropList3) {
          for (var definePropIndex3 = 0; definePropIndex3 < definePropList3.length; definePropIndex3++) {
            var definePropDescriptor3 = definePropList3[definePropIndex3];
            definePropDescriptor3.enumerable = definePropDescriptor3.enumerable || !1, definePropDescriptor3.configurable = !0,
              "value" in definePropDescriptor3 && (definePropDescriptor3.writable = !0), Object.defineProperty(definePropTarget3,
                definePropDescriptor3.key, definePropDescriptor3)
          }
        }
        return function(createClass3Constructor, createClass3ProtoProps, createClass3StaticProps) {
          return createClass3ProtoProps && defineProperties3(createClass3Constructor.prototype, createClass3ProtoProps), createClass3StaticProps && defineProperties3(createClass3Constructor, createClass3StaticProps), createClass3Constructor
        }
      }();
    sortableContainerExports.default = sortableContainerFactory;
    var reactRuntime3 = reactEntryModule(),
      reactDefault3 = interopRequireDefault3(reactRuntime3),
      propTypesRuntime2 = propTypesModule(),
      propTypesDefault2 = interopRequireDefault3(propTypesRuntime2),
      reactDomRuntime2 = reactDomCheckDCEModule(),
      invariantRuntime2 = invariantModule(),
      invariantDefault2 = interopRequireDefault3(invariantRuntime2),
      domVendorRuntime2 = domVendorModule();

    function interopRequireDefault3(interopModule3) {
      return interopModule3 && interopModule3.__esModule ? interopModule3 : {
        default: interopModule3
      }
    }

    function classCallCheck2(classCallInstance2, classCallConstructor2) {
      if (!(classCallInstance2 instanceof classCallConstructor2)) throw new TypeError(
        "Cannot call a class as a function")
    }

    function possibleConstructorReturn2(selfRef2, callResult2) {
      if (!selfRef2) throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
      return callResult2 && (typeof callResult2 == "object" || typeof callResult2 == "function") ? callResult2 : selfRef2
    }

    function inherits2(subClass2, superClass2) {
      if (typeof superClass2 != "function" && superClass2 !== null) throw new TypeError(
        "Super expression must either be null or a function, not " +
        typeof superClass2);
      subClass2.prototype = Object.create(superClass2 && superClass2.prototype, {
        constructor: {
          value: subClass2,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), superClass2 && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass2, superClass2) : subClass2
        .__proto__ = superClass2)
    }

    function sortableContainerFactory(sortableContainerArg) {
      var sortableContainerClassVar, sortableContainerRefVar, sortableContainerOptions = arguments.length > 1 && arguments[1] !== void 0 ?
        arguments[1] : {
          withRef: !1
        };
      return sortableContainerRefVar = sortableContainerClassVar = function(sortableContainerConstructor) {
        inherits2(SortableContainerComponent, sortableContainerConstructor);

        function SortableContainerComponent() {
          return classCallCheck2(this, SortableContainerComponent), possibleConstructorReturn2(this, (SortableContainerComponent.__proto__ || Object
              .getPrototypeOf(SortableContainerComponent))
            .apply(this, arguments))
        }
        return createClass3(SortableContainerComponent, [{
          key: "componentDidMount",
          value: function() {
            var managerProps = this.props,
              managerCollection = managerProps.collection,
              managerDisabled = managerProps.disabled,
              managerIndex = managerProps.index;
            managerDisabled || this.setDraggable(managerCollection, managerIndex)
          }
        }, {
          key: "componentWillReceiveProps",
          value: function(registerRefArg) {
            if (this.props.index !== registerRefArg.index && this.node && (
                this.node.sortableInfo.index = registerRefArg.index), this
              .props.disabled !== registerRefArg.disabled) {
              var registerCollection = registerRefArg.collection,
                registerDisabled = registerRefArg.disabled,
                registerIndex = registerRefArg.index;
              registerDisabled ? this.removeDraggable(registerCollection) : this.setDraggable(registerCollection,
                registerIndex)
            } else this.props.collection !== registerRefArg.collection && (
              this.removeDraggable(this.props.collection),
              this.setDraggable(registerRefArg.collection, registerRefArg.index))
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            var unregisterProps = this.props,
              unregisterCollection = unregisterProps.collection,
              unregisterDisabled = unregisterProps.disabled;
            unregisterDisabled || this.removeDraggable(unregisterCollection)
          }
        }, {
          key: "setDraggable",
          value: function(findRefArg, findRefEntry) {
            var findDomNodeRef = this.node = (0, reactDomRuntime2.findDOMNode)(this);
            findDomNodeRef.sortableInfo = {
              index: findRefEntry,
              collection: findRefArg,
              manager: this.context.manager
            }, this.ref = {
              node: findDomNodeRef
            }, this.context.manager.add(findRefArg, this.ref)
          }
        }, {
          key: "removeDraggable",
          value: function(sortableRenderArg) {
            this.context.manager.remove(sortableRenderArg, this.ref)
          }
        }, {
          key: "getWrappedInstance",
          value: function() {
            return (0, invariantDefault2.default)(sortableContainerOptions.withRef,
              "To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call"
              ), this.refs.wrappedInstance
          }
        }, {
          key: "render",
          value: function() {
            var wrappedInstanceKey2 = sortableContainerOptions.withRef ? "wrappedInstance" : null;
            return reactDefault3.default.createElement(sortableContainerArg, objectAssignPolyfill2({
              ref: wrappedInstanceKey2
            }, (0, domVendorRuntime2.omit)(this.props, "collection",
              "disabled", "index")))
          }
        }]), SortableContainerComponent
      }(reactRuntime3.Component), sortableContainerClassVar.displayName = (0, domVendorRuntime2.provideDisplayName)(
        "sortableElement", sortableContainerArg), sortableContainerClassVar.contextTypes = {
        manager: propTypesDefault2.default.object.isRequired
      }, sortableContainerClassVar.propTypes = {
        index: propTypesDefault2.default.number.isRequired,
        collection: propTypesDefault2.default.oneOfType([propTypesDefault2.default.number, propTypesDefault2.default
          .string
        ]),
        disabled: propTypesDefault2.default.bool
      }, sortableContainerClassVar.defaultProps = {
        collection: 0
      }, sortableContainerRefVar
    }
  });
  var sortableElementModule = defineCommonjsModule(sortableElementExports => {
    "use strict";
    Object.defineProperty(sortableElementExports, "__esModule", {
      value: !0
    });
    var objectAssignPolyfill3 = Object.assign || function(assignTarget3) {
        for (var assignIndex3 = 1; assignIndex3 < arguments.length; assignIndex3++) {
          var assignSource3 = arguments[assignIndex3];
          for (var assignKey3 in assignSource3) Object.prototype.hasOwnProperty.call(assignSource3, assignKey3) && (
            assignTarget3[assignKey3] = assignSource3[assignKey3])
        }
        return assignTarget3
      },
      createClass4 = function() {
        function defineProperties4(definePropTarget4, definePropList4) {
          for (var definePropIndex4 = 0; definePropIndex4 < definePropList4.length; definePropIndex4++) {
            var definePropDescriptor4 = definePropList4[definePropIndex4];
            definePropDescriptor4.enumerable = definePropDescriptor4.enumerable || !1, definePropDescriptor4.configurable = !0,
              "value" in definePropDescriptor4 && (definePropDescriptor4.writable = !0), Object.defineProperty(definePropTarget4,
                definePropDescriptor4.key, definePropDescriptor4)
          }
        }
        return function(createClass4Constructor, createClass4ProtoProps, createClass4StaticProps) {
          return createClass4ProtoProps && defineProperties4(createClass4Constructor.prototype, createClass4ProtoProps), createClass4StaticProps && defineProperties4(createClass4Constructor, createClass4StaticProps), createClass4Constructor
        }
      }();
    sortableElementExports.default = sortableElementFactory;
    var reactRuntime4 = reactEntryModule(),
      reactDefault4 = interopRequireDefault4(reactRuntime4),
      reactDomRuntime3 = reactDomCheckDCEModule(),
      invariantRuntime3 = invariantModule(),
      invariantDefault3 = interopRequireDefault4(invariantRuntime3),
      domVendorRuntime3 = domVendorModule();

    function interopRequireDefault4(interopModule4) {
      return interopModule4 && interopModule4.__esModule ? interopModule4 : {
        default: interopModule4
      }
    }

    function classCallCheck3(classCallInstance3, classCallConstructor3) {
      if (!(classCallInstance3 instanceof classCallConstructor3)) throw new TypeError(
        "Cannot call a class as a function")
    }

    function possibleConstructorReturn3(selfRef3, callResult3) {
      if (!selfRef3) throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
      return callResult3 && (typeof callResult3 == "object" || typeof callResult3 == "function") ? callResult3 : selfRef3
    }

    function inherits3(subClass3, superClass3) {
      if (typeof superClass3 != "function" && superClass3 !== null) throw new TypeError(
        "Super expression must either be null or a function, not " +
        typeof superClass3);
      subClass3.prototype = Object.create(superClass3 && superClass3.prototype, {
        constructor: {
          value: subClass3,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), superClass3 && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass3, superClass3) : subClass3
        .__proto__ = superClass3)
    }

    function sortableElementFactory(sortableElementArg) {
      var sortableElementClassVar, sortableElementRefVar, sortableElementOptions = arguments.length > 1 && arguments[1] !== void 0 ?
        arguments[1] : {
          withRef: !1
        };
      return sortableElementRefVar = sortableElementClassVar = function(sortableElementConstructor) {
        inherits3(SortableElementComponent, sortableElementConstructor);

        function SortableElementComponent() {
          return classCallCheck3(this, SortableElementComponent), possibleConstructorReturn3(this, (SortableElementComponent.__proto__ || Object
              .getPrototypeOf(SortableElementComponent))
            .apply(this, arguments))
        }
        return createClass4(SortableElementComponent, [{
          key: "componentDidMount",
          value: function() {
            var sortableElementNode = (0, reactDomRuntime3.findDOMNode)(this);
            sortableElementNode.sortableHandle = !0
          }
        }, {
          key: "getWrappedInstance",
          value: function() {
            return (0, invariantDefault3.default)(sortableElementOptions.withRef,
              "To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call"
              ), this.refs.wrappedInstance
          }
        }, {
          key: "render",
          value: function() {
            var wrappedInstanceKey3 = sortableElementOptions.withRef ? "wrappedInstance" : null;
            return reactDefault4.default.createElement(sortableElementArg, objectAssignPolyfill3({
              ref: wrappedInstanceKey3
            }, this.props))
          }
        }]), SortableElementComponent
      }(reactRuntime4.Component), sortableElementClassVar.displayName = (0, domVendorRuntime3.provideDisplayName)(
        "sortableHandle", sortableElementArg), sortableElementRefVar
    }
  });
  var sortableHocIndexModule = defineCommonjsModule(sortableHocExports => {
    "use strict";
    Object.defineProperty(sortableHocExports, "__esModule", {
      value: !0
    });
    sortableHocExports.arrayMove = sortableHocExports.sortableHandle = sortableHocExports.sortableElement = sortableHocExports
      .sortableContainer = sortableHocExports.SortableHandle = sortableHocExports.SortableElement = sortableHocExports
      .SortableContainer = void 0;
    var domVendorRuntime4 = domVendorModule();
    Object.defineProperty(sortableHocExports, "arrayMove", {
      enumerable: !0,
      get: function() {
        return domVendorRuntime4.arrayMove
      }
    });
    var babelHelpersRuntime = babelHelpersModule(),
      babelHelpersDefault = interopRequireDefault5(babelHelpersRuntime),
      sortableContainerRuntime = sortableContainerModule(),
      sortableContainerDefault = interopRequireDefault5(sortableContainerRuntime),
      sortableElementRuntime = sortableElementModule(),
      sortableElementDefault = interopRequireDefault5(sortableElementRuntime);

    function interopRequireDefault5(interopModule5) {
      return interopModule5 && interopModule5.__esModule ? interopModule5 : {
        default: interopModule5
      }
    }
    sortableHocExports.SortableContainer = babelHelpersDefault.default;
    sortableHocExports.SortableElement = sortableContainerDefault.default;
    sortableHocExports.SortableHandle = sortableElementDefault.default;
    sortableHocExports.sortableContainer = babelHelpersDefault.default;
    sortableHocExports.sortableElement = sortableContainerDefault.default;
    sortableHocExports.sortableHandle = sortableElementDefault.default
  });
  window.__vdhSortableHOC = sortableHocIndexModule();
})();
