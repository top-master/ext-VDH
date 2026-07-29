/*
 * ts-results 3.3.0 - Rust-style Option/Result for TypeScript.
 * Upstream: https://github.com/vultix/ts-results (MIT), verified identical to
 * the copies esbuild inlined into every extension bundle. Vendored once here so
 * all bundles share a single copy (extensions cannot load it from a CDN); the
 * body is the extension's own already-beautified build, exposed as
 * globalThis.tsResults for classic scripts, ESM bundles, and the service worker.
 */
"use strict";
(() => {
  function describeValue(value) {
    var text = String(value);
    if (text === '[object Object]') {
      try {
        text = JSON.stringify(value);
      } catch {}
    }
    return text;
  }
  var NoneOption = (function () {
    function NoneCtor() {}
    NoneCtor.prototype.isSome = function () {
      return !1;
    };
    NoneCtor.prototype.isNone = function () {
      return !0;
    };
    NoneCtor.prototype[Symbol.iterator] = function () {
      return {
        next: function () {
          return {
            done: !0,
            value: void 0,
          };
        },
      };
    };
    NoneCtor.prototype.unwrapOr = function (defaultValue) {
      return defaultValue;
    };
    NoneCtor.prototype.expect = function (message) {
      throw new Error(''.concat(message));
    };
    NoneCtor.prototype.unwrap = function () {
      throw new Error('Tried to unwrap None');
    };
    NoneCtor.prototype.map = function (mapFn) {
      return this;
    };
    NoneCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return defaultValue;
    };
    NoneCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return defaultFn();
    };
    NoneCtor.prototype.or = function (alternative) {
      return alternative;
    };
    NoneCtor.prototype.orElse = function (alternativeFn) {
      return alternativeFn();
    };
    NoneCtor.prototype.andThen = function (mapFn) {
      return this;
    };
    NoneCtor.prototype.toResult = function (errorValue) {
      return err(errorValue);
    };
    NoneCtor.prototype.toString = function () {
      return 'None';
    };
    return NoneCtor;
  })();
  var noneValue = new NoneOption();
  Object.freeze(noneValue);
  var SomeOption = (function () {
    function SomeCtor(value) {
      if (!(this instanceof SomeCtor)) {
        return new SomeCtor(value);
      }
      this.value = value;
    }
    SomeCtor.prototype.isSome = function () {
      return !0;
    };
    SomeCtor.prototype.isNone = function () {
      return !1;
    };
    SomeCtor.prototype[Symbol.iterator] = function () {
      var iterable = Object(this.value);
      if (Symbol.iterator in iterable) {
        return iterable[Symbol.iterator]();
      } else {
        return {
          next: function () {
            return {
              done: !0,
              value: void 0,
            };
          },
        };
      }
    };
    SomeCtor.prototype.unwrapOr = function (defaultValue) {
      return this.value;
    };
    SomeCtor.prototype.expect = function (message) {
      return this.value;
    };
    SomeCtor.prototype.unwrap = function () {
      return this.value;
    };
    SomeCtor.prototype.map = function (mapFn) {
      return some(mapFn(this.value));
    };
    SomeCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return mapFn(this.value);
    };
    SomeCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return mapFn(this.value);
    };
    SomeCtor.prototype.or = function (alternative) {
      return this;
    };
    SomeCtor.prototype.orElse = function (alternativeFn) {
      return this;
    };
    SomeCtor.prototype.andThen = function (mapFn) {
      return mapFn(this.value);
    };
    SomeCtor.prototype.toResult = function (errorValue) {
      return makeOk(this.value);
    };
    SomeCtor.prototype.safeUnwrap = function () {
      return this.value;
    };
    SomeCtor.prototype.toString = function () {
      return 'Some('.concat(describeValue(this.value), ')');
    };
    SomeCtor.EMPTY = new SomeCtor(void 0);
    return SomeCtor;
  })();
  var some = SomeOption;
  var optionStatics;
  (function (optionNamespace) {
    function allOptions() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (
        var values = [], index = 0, options = args;
        index < options.length;
        index++
      ) {
        var option = options[index];
        if (option.isSome()) {
          values.push(option.value);
        } else {
          return option;
        }
      }
      return some(values);
    }
    optionNamespace.all = allOptions;
    function anyOption() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (var index = 0, options = args; index < options.length; index++) {
        var option = options[index];
        option.isSome();
        return option;
      }
      return noneValue;
    }
    optionNamespace.any = anyOption;
    function isOption(value) {
      return value instanceof some || value === noneValue;
    }
    optionNamespace.isOption = isOption;
  })(optionStatics || (optionStatics = {}));
  var ErrResult = (function () {
    function ErrCtor(error) {
      if (!(this instanceof ErrCtor)) {
        return new ErrCtor(error);
      }
      this.error = error;
      var stackLines = new Error().stack
        .split(
          `
  `,
        )
        .slice(2);
      if (
        stackLines
        && stackLines.length > 0
        && stackLines[0].includes('ErrImpl')
      ) {
        stackLines.shift();
      }
      this._stack = stackLines.join(`
  `);
    }
    ErrCtor.prototype.isOk = function () {
      return !1;
    };
    ErrCtor.prototype.isErr = function () {
      return !0;
    };
    ErrCtor.prototype[Symbol.iterator] = function () {
      return {
        next: function () {
          return {
            done: !0,
            value: void 0,
          };
        },
      };
    };
    ErrCtor.prototype.else = function (defaultValue) {
      return defaultValue;
    };
    ErrCtor.prototype.unwrapOr = function (defaultValue) {
      return defaultValue;
    };
    ErrCtor.prototype.expect = function (message) {
      throw new Error(
        ''
          .concat(message, ' - Error: ')
          .concat(
            describeValue(this.error),
            `
  `,
          )
          .concat(this._stack),
        {
          cause: this.error,
        },
      );
    };
    ErrCtor.prototype.expectErr = function (message) {
      return this.error;
    };
    ErrCtor.prototype.unwrap = function () {
      throw new Error(
        'Tried to unwrap Error: '
          .concat(
            describeValue(this.error),
            `
  `,
          )
          .concat(this._stack),
        {
          cause: this.error,
        },
      );
    };
    ErrCtor.prototype.unwrapErr = function () {
      return this.error;
    };
    ErrCtor.prototype.map = function (mapFn) {
      return this;
    };
    ErrCtor.prototype.andThen = function (mapFn) {
      return this;
    };
    ErrCtor.prototype.mapErr = function (errorMapFn) {
      return new err(errorMapFn(this.error));
    };
    ErrCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return defaultValue;
    };
    ErrCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return defaultFn(this.error);
    };
    ErrCtor.prototype.or = function (alternative) {
      return alternative;
    };
    ErrCtor.prototype.orElse = function (alternativeFn) {
      return alternativeFn(this.error);
    };
    ErrCtor.prototype.toOption = function () {
      return noneValue;
    };
    ErrCtor.prototype.toString = function () {
      return 'Err('.concat(describeValue(this.error), ')');
    };
    Object.defineProperty(ErrCtor.prototype, 'stack', {
      get: function () {
        return ''
          .concat(
            this,
            `
  `,
          )
          .concat(this._stack);
      },
      enumerable: !1,
      configurable: !0,
    });
    ErrCtor.prototype.toAsyncResult = function () {
      return new AsyncResult(this);
    };
    ErrCtor.EMPTY = new ErrCtor(void 0);
    return ErrCtor;
  })();
  var err = ErrResult;
  var OkResult = (function () {
    function OkCtor(value) {
      if (!(this instanceof OkCtor)) {
        return new OkCtor(value);
      }
      this.value = value;
    }
    OkCtor.prototype.isOk = function () {
      return !0;
    };
    OkCtor.prototype.isErr = function () {
      return !1;
    };
    OkCtor.prototype[Symbol.iterator] = function () {
      var iterable = Object(this.value);
      if (Symbol.iterator in iterable) {
        return iterable[Symbol.iterator]();
      } else {
        return {
          next: function () {
            return {
              done: !0,
              value: void 0,
            };
          },
        };
      }
    };
    OkCtor.prototype.else = function (defaultValue) {
      return this.value;
    };
    OkCtor.prototype.unwrapOr = function (defaultValue) {
      return this.value;
    };
    OkCtor.prototype.expect = function (message) {
      return this.value;
    };
    OkCtor.prototype.expectErr = function (message) {
      throw new Error(message);
    };
    OkCtor.prototype.unwrap = function () {
      return this.value;
    };
    OkCtor.prototype.unwrapErr = function () {
      throw new Error(
        'Tried to unwrap Ok: '.concat(describeValue(this.value)),
        {
          cause: this.value,
        },
      );
    };
    OkCtor.prototype.map = function (mapFn) {
      return new makeOk(mapFn(this.value));
    };
    OkCtor.prototype.andThen = function (mapFn) {
      return mapFn(this.value);
    };
    OkCtor.prototype.mapErr = function (errorMapFn) {
      return this;
    };
    OkCtor.prototype.mapOr = function (defaultValue, mapFn) {
      return mapFn(this.value);
    };
    OkCtor.prototype.mapOrElse = function (defaultFn, mapFn) {
      return mapFn(this.value);
    };
    OkCtor.prototype.or = function (alternative) {
      return this;
    };
    OkCtor.prototype.orElse = function (alternativeFn) {
      return this;
    };
    OkCtor.prototype.toOption = function () {
      return some(this.value);
    };
    OkCtor.prototype.safeUnwrap = function () {
      return this.value;
    };
    OkCtor.prototype.toString = function () {
      return 'Ok('.concat(describeValue(this.value), ')');
    };
    OkCtor.prototype.toAsyncResult = function () {
      return new AsyncResult(this);
    };
    OkCtor.EMPTY = new OkCtor(void 0);
    return OkCtor;
  })();
  var makeOk = OkResult;
  var resultStatics;
  (function (resultNamespace) {
    function allResults() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (
        var values = [], index = 0, results = args;
        index < results.length;
        index++
      ) {
        var result = results[index];
        if (result.isOk()) {
          values.push(result.value);
        } else {
          return result;
        }
      }
      return new makeOk(values);
    }
    resultNamespace.all = allResults;
    function anyResult() {
      for (
        var args = [], argIndex = 0;
        argIndex < arguments.length;
        argIndex++
      ) {
        args[argIndex] = arguments[argIndex];
      }
      for (
        var errors = [], index = 0, results = args;
        index < results.length;
        index++
      ) {
        var result = results[index];
        if (result.isOk()) {
          return result;
        }
        errors.push(result.error);
      }
      return new err(errors);
    }
    resultNamespace.any = anyResult;
    function wrap(operation) {
      try {
        return new makeOk(operation());
      } catch (error) {
        return new err(error);
      }
    }
    resultNamespace.wrap = wrap;
    function wrapAsync(operation) {
      try {
        return operation()
          .then(function (resolvedValue) {
            return new makeOk(resolvedValue);
          })
          .catch(function (error) {
            return new err(error);
          });
      } catch (error) {
        return Promise.resolve(new err(error));
      }
    }
    resultNamespace.wrapAsync = wrapAsync;
    function isResult(value) {
      return value instanceof err || value instanceof makeOk;
    }
    resultNamespace.isResult = isResult;
  })(resultStatics || (resultStatics = {}));
  var runAsync = function (thisArg, argsList, PromiseCtor, generatorFn) {
    function adopt(value) {
      if (value instanceof PromiseCtor) {
        return value;
      } else {
        return new PromiseCtor(function (resolve) {
          resolve(value);
        });
      }
    }
    return new (PromiseCtor || (PromiseCtor = Promise))(function (
      resolve,
      reject,
    ) {
      function fulfilled(value) {
        try {
          step(generatorFn.next(value));
        } catch (error) {
          reject(error);
        }
      }
      function rejected(reason) {
        try {
          step(generatorFn.throw(reason));
        } catch (error) {
          reject(error);
        }
      }
      function step(result) {
        if (result.done) {
          resolve(result.value);
        } else {
          adopt(result.value).then(fulfilled, rejected);
        }
      }
      step((generatorFn = generatorFn.apply(thisArg, argsList || [])).next());
    });
  };
  var runGenerator = function (thisArg, bodyFn) {
    var state = {
      label: 0,
      sent: function () {
        if (currentOp[0] & 1) {
          throw currentOp[1];
        }
        return currentOp[1];
      },
      trys: [],
      ops: [],
    };
    var executing;
    var pendingGenerator;
    var currentOp;
    var iterator;
    iterator = {
      next: makeVerb(0),
      throw: makeVerb(1),
      return: makeVerb(2),
    };
    if (typeof Symbol == 'function') {
      iterator[Symbol.iterator] = function () {
        return this;
      };
    }
    return iterator;
    function makeVerb(verbCode) {
      return function (sentValue) {
        return step([verbCode, sentValue]);
      };
    }
    function step(opEntry) {
      if (executing) {
        throw new TypeError('Generator is already executing.');
      }
      for (; iterator && ((iterator = 0), opEntry[0] && (state = 0)), state; ) {
        try {
          if (
            ((executing = 1),
            pendingGenerator
              && (currentOp =
                opEntry[0] & 2
                  ? pendingGenerator.return
                  : opEntry[0]
                    ? pendingGenerator.throw
                      || ((currentOp = pendingGenerator.return)
                        && currentOp.call(pendingGenerator),
                      0)
                    : pendingGenerator.next)
              && !(currentOp = currentOp.call(pendingGenerator, opEntry[1]))
                .done)
          ) {
            return currentOp;
          }
          switch (
            ((pendingGenerator = 0),
            currentOp && (opEntry = [opEntry[0] & 2, currentOp.value]),
            opEntry[0])
          ) {
            case 0:
            case 1:
              currentOp = opEntry;
              break;
            case 4:
              state.label++;
              return {
                value: opEntry[1],
                done: !1,
              };
            case 5:
              state.label++;
              pendingGenerator = opEntry[1];
              opEntry = [0];
              continue;
            case 7:
              opEntry = state.ops.pop();
              state.trys.pop();
              continue;
            default:
              if (
                ((currentOp = state.trys),
                !(currentOp =
                  currentOp.length > 0 && currentOp[currentOp.length - 1])
                  && (opEntry[0] === 6 || opEntry[0] === 2))
              ) {
                state = 0;
                continue;
              }
              if (
                opEntry[0] === 3
                && (!currentOp
                  || (opEntry[1] > currentOp[0] && opEntry[1] < currentOp[3]))
              ) {
                state.label = opEntry[1];
                break;
              }
              if (opEntry[0] === 6 && state.label < currentOp[1]) {
                state.label = currentOp[1];
                currentOp = opEntry;
                break;
              }
              if (currentOp && state.label < currentOp[2]) {
                state.label = currentOp[2];
                state.ops.push(opEntry);
                break;
              }
              if (currentOp[2]) {
                state.ops.pop();
              }
              state.trys.pop();
              continue;
          }
          opEntry = bodyFn.call(thisArg, state);
        } catch (error) {
          opEntry = [6, error];
          pendingGenerator = 0;
        } finally {
          executing = currentOp = 0;
        }
      }
      if (opEntry[0] & 5) {
        throw opEntry[1];
      }
      return {
        value: opEntry[0] ? opEntry[1] : void 0,
        done: !0,
      };
    }
  };
  var AsyncResult = (function () {
    function AsyncResultCtor(value) {
      this.promise = Promise.resolve(value);
    }
    AsyncResultCtor.prototype.andThen = function (mapFn) {
      var self = this;
      return this.thenInternal(function (result) {
        return runAsync(self, void 0, void 0, function () {
          var mapped;
          return runGenerator(this, function (genState) {
            if (result.isErr()) {
              return [2, result];
            } else {
              mapped = mapFn(result.value);
              return [
                2,
                mapped instanceof AsyncResultCtor ? mapped.promise : mapped,
              ];
            }
          });
        });
      });
    };
    AsyncResultCtor.prototype.map = function (mapFn) {
      var self = this;
      return this.thenInternal(function (result) {
        return runAsync(self, void 0, void 0, function () {
          var okCtor;
          return runGenerator(this, function (genState) {
            switch (genState.label) {
              case 0:
                if (result.isErr()) {
                  return [2, result];
                } else {
                  okCtor = makeOk;
                  return [4, mapFn(result.value)];
                }
              case 1:
                return [2, okCtor.apply(void 0, [genState.sent()])];
            }
          });
        });
      });
    };
    AsyncResultCtor.prototype.thenInternal = function (onResolve) {
      return new AsyncResultCtor(this.promise.then(onResolve));
    };
    return AsyncResultCtor;
  })();
  globalThis.tsResults = {
    Some: SomeOption,
    None: noneValue,
    Ok: OkResult,
    Err: ErrResult,
    Option: optionStatics,
    Result: resultStatics,
    AsyncResult: AsyncResult,
    describeValue: describeValue,
  };
})();
