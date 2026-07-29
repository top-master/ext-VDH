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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var sortableHocIndexModule = defineCommonjsModule((exports, module) => {
    "use strict";
    module.exports = window.__vdhSortableHOC; // de-vendored: loaded from content/vendor/
  });
  var sortableHoc = toEsm(sortableHocIndexModule());
  weh.is_safe.then(() => {
    function convRulesEditorInit(editorInitConfig = {
      rules: [],
      formats: {}
    }, editorInitArg) {
      switch (editorInitArg.type) {
        case "SET_CONVRULES_DATA":
          editorInitConfig = Object.assign({}, editorInitConfig, {
            rules: editorInitArg.payload
          });
          break;
        case "SET_FORMATS_DATA":
          editorInitConfig = Object.assign({}, editorInitConfig, {
            formats: editorInitArg.payload
          });
          break
      }
      return editorInitConfig
    }
    window.store = createStore(convRulesEditorInit);

    function loadRulesFn() {
      return weh.rpc.call("getConversionRules")
        .then(loadedRulesData => {
          window.store.dispatch({
            type: "SET_CONVRULES_DATA",
            payload: loadedRulesData
          })
        })
    }
    loadRulesFn();

    function saveRulesFn() {
      return weh.rpc.call("getOutputConfigs")
        .then(savedRulesResult => {
          window.store.dispatch({
            type: "SET_FORMATS_DATA",
            payload: savedRulesResult
          })
        })
    }
    saveRulesFn();
    var ConnectedRulesEditor = connect((mapStateToPropsState, mapStateToPropsOwnProps) => ({
      rules: mapStateToPropsState.rules || [],
      formats: mapStateToPropsState.formats || {}
    }))(class extends React.Component {
      constructor(constructorProps) {
        super(constructorProps), this.state = {
          rules: null,
          rule: null,
          newRule: !1
        }
      }
      componentWillReceiveProps(nextProps) {
        this.state.rules === null && this.setState({
          rules: nextProps.rules
        })
      }
      addRule() {
        var editorSelf1 = this;
        return () => {
          var ruleKey = "rule-" + Math.floor(Math.random() * 1e9);
          editorSelf1.setState({
            rule: {
              id: ruleKey,
              convert: !0,
              domain: null,
              extension: null,
              format: ""
            },
            newRule: !0
          })
        }
      }
      cancel() {
        var editorSelf2 = this;
        return () => {
          var newRuleTemplate = {
            rule: null
          };
          editorSelf2.state.rule || (newRuleTemplate.rules = editorSelf2.props.rules.slice(0)), editorSelf2
            .setState(newRuleTemplate)
        }
      }
      removeRule(removeRuleId) {
        var editorSelf3 = this;
        return removeRuleEvent => {
          removeRuleEvent.stopPropagation(), editorSelf3.state.rules.every((ruleEntry, ruleEntryIndex) => {
            if (ruleEntry.id === removeRuleId) {
              var rulesCopy = editorSelf3.state.rules.slice(0);
              return rulesCopy.splice(ruleEntryIndex, 1), editorSelf3.setState({
                rules: rulesCopy
              }), !1
            }
            return !0
          })
        }
      }
      editRule(editRuleId) {
        var editorSelf4 = this;
        return () => {
          editorSelf4.state.rules.every(editRuleEntry => editRuleEntry.id === editRuleId ? (editorSelf4.setState({
            rule: Object.assign({}, editRuleEntry),
            newRule: !1
          }), !1) : !0)
        }
      }
      renderAll() {
        var editorSelf5 = this;
        let SortableRuleElement = (0, sortableHoc.SortableElement)(sortableElementRenderProps => {
            var sortableElementValue = sortableElementRenderProps.value,
              ruleChildren = [];
            return sortableElementValue.convert ? ruleChildren.push(weh._("convrule_convert")) :
              ruleChildren.push(weh._("convrule_no_convert")), sortableElementValue.domain && ruleChildren
              .push(weh._("convrule_from_domain", [sortableElementValue.domain])), sortableElementValue
              .extension && ruleChildren.push(weh._("convrule_with_ext", [sortableElementValue
                .extension
              ])), ruleChildren.push(weh._("convrule_format", [editorSelf5.props
                .formats[sortableElementValue.format] && editorSelf5.props.formats[sortableElementValue
                  .format].title || "????"
              ])), React.createElement("li", {
                className: "domain li-no-style",
                onClick: editorSelf5.editRule(sortableElementValue.id)
              }, React.createElement("div", {
                className: "delete",
                onClick: editorSelf5.removeRule(sortableElementValue.id)
              }, "X"), ruleChildren.join(" - "))
          }),
          SortableRulesContainer = (0, sortableHoc.SortableContainer)(({
            items: sortableContainerItems
          }) => React.createElement("ul", {
            className: "list"
          }, sortableContainerItems.map((containerItem, containerItemIndex) => React.createElement(SortableRuleElement, {
            key: containerItem.id,
            index: containerItemIndex,
            value: containerItem
          })))),
          handleSortEndCallback = ({
            oldIndex: sortOldIndex,
            newIndex: sortNewIndex
          }) => {
            editorSelf5.setState({
              rules: (0, sortableHoc.arrayMove)(this.state.rules, sortOldIndex, sortNewIndex)
            })
          };
        return React.createElement("div", {
          className: "all-rules"
        }, React.createElement("div", {
          className: "description"
        }, React.createElement("p", null, weh._(
          "convrules_edit_descr")), React.createElement("a", {
          href: "#",
          onClick: this.addRule()
        }, weh._("convrules_add_rule"))), React.createElement(
          "div", {
            className: "list-column"
          }, (this.state.rules || [])
          .length == 0 && React.createElement("div", {
            className: "empty"
          }, weh._("convrules_empty")), (this.state.rules || [])
          .length > 0 && React.createElement(SortableRulesContainer, {
            items: this.state.rules || [],
            distance: 10,
            onSortEnd: handleSortEndCallback
          })))
      }
      saveRule() {
        var editorSelf6 = this;
        return () => {
          editorSelf6.state.rules.every((ruleIterEntry, ruleIterIndex) => {
            if (ruleIterEntry.id === editorSelf6.state.rule.id) {
              var rulesCopy2 = editorSelf6.state.rules.slice(0);
              return rulesCopy2[ruleIterIndex] = editorSelf6.state.rule, editorSelf6.setState({
                rule: null,
                rules: rulesCopy2
              }), !1
            }
            return !0
          }) && editorSelf6.setState({
            rule: null,
            rules: editorSelf6.state.rules.concat(editorSelf6.state.rule)
          })
        }
      }
      saveRules() {
        var editorSelf7 = this;
        return () => {
          weh.rpc.call("setConversionRules", editorSelf7.state.rules)
            .then(() => {
              loadRulesFn()
            })
        }
      }
      onChange(onChangeRuleId) {
        var editorSelf8 = this;
        return onChangeEvent => {
          var onChangeParsed;
          onChangeEvent.target.getAttribute("type") == "checkbox" ? onChangeParsed = onChangeEvent
            .target.checked : onChangeParsed = onChangeEvent.target.value;
          var onChangeUpdate = {
              rule: {}
            },
            onChangeFlag = !1;
          switch (onChangeRuleId) {
            case "convert":
              onChangeUpdate.rule.convert = onChangeParsed === "convert";
              break;
            case "enable-domain":
              onChangeUpdate.rule.domain = onChangeParsed ? "" : null;
              break;
            case "domain":
              onChangeUpdate.rule.domain = onChangeParsed;
              break;
            case "enable-extension":
              onChangeUpdate.rule.extension = onChangeParsed ? "" : null;
              break;
            case "extension":
              onChangeUpdate.rule.extension = onChangeParsed;
              break;
            case "format":
              onChangeUpdate.rule.format = onChangeParsed;
              break
          }
          onChangeUpdate.rule = Object.assign({}, editorSelf8.state.rule, onChangeUpdate.rule), editorSelf8
            .setState(Object.assign({}, editorSelf8.state, onChangeUpdate))
        }
      }
      renderRule() {
        var editorSelf9 = this,
          sortedFormatKeys = Object.keys(this.props.formats)
          .sort((formatSortA, formatSortB) => (formatSortA = editorSelf9.props.formats[formatSortA], formatSortB = editorSelf9.props
            .formats[formatSortB], formatSortA.title < formatSortB.title ? -1 : formatSortA.title > formatSortB
            .title ? 1 : 0))
          .map(formatOptionKey => React.createElement("option", {
            key: formatOptionKey,
            value: formatOptionKey
          }, editorSelf9.props.formats[formatOptionKey].title));
        return sortedFormatKeys.unshift(React.createElement("option", {
          key: "",
          value: ""
        }, weh._("select_output_config"))), React.createElement(
          "div", {
            className: "container edit-rule"
          }, React.createElement("form", null, React
            .createElement("div", {
              className: "form-group row"
            }, React.createElement("select", {
                className: "form-control col-sm-4",
                onChange: this.onChange("convert"),
                value: this.state.rule.convert && "convert" ||
                  "noconvert"
              }, React.createElement("option", {
                value: "convert"
              }, weh._("convrule_convert")), React
              .createElement("option", {
                value: "noconvert"
              }, weh._("convrule_no_convert")))), React
            .createElement("div", {
                className: "form-group row"
              }, React.createElement("input", {
                id: "from-domain",
                className: "form-control col-sm-1",
                type: "checkbox",
                checked: this.state.rule.domain !== null,
                onChange: this.onChange("enable-domain")
              }), React.createElement("label", {
                className: "col-form-label col-sm-4",
                htmlFor: "from-domain"
              }, weh._("convrule_domain")), this.state.rule
              .domain !== null && React.createElement("input", {
                className: "form-control col-sm-7",
                onChange: this.onChange("domain"),
                type: "text",
                value: this.state.rule.domain
              })), React.createElement("div", {
                className: "form-group row"
              }, React.createElement("input", {
                id: "with-ext",
                className: "form-control col-sm-1",
                type: "checkbox",
                checked: this.state.rule.extension !== null,
                onChange: this.onChange("enable-extension")
              }), React.createElement("label", {
                className: "col-form-label col-sm-4",
                htmlFor: "with-ext"
              }, weh._("convrule_extension")), this.state.rule
              .extension !== null && React.createElement(
              "input", {
                className: "form-control col-sm-7",
                onChange: this.onChange("extension"),
                type: "text",
                value: this.state.rule.extension
              })), React.createElement("div", {
                className: "form-group row"
              }, React.createElement("label", {
                className: "col-form-label col-sm-4"
              }, weh._("convrule_output_format")), React
              .createElement("select", {
                className: "form-control col-sm-7",
                onChange: this.onChange("format"),
                value: this.state.rule.format
              }, sortedFormatKeys), React.createElement("a", {
                className: "btn col-sm-1 refresh",
                title: weh._("convrule_refresh_formats"),
                onClick: saveRulesFn
              }, "\u21BB"))))
      }
      render() {
        return React.createElement("div", {
            className: "weh-shf convrules"
          }, React.createElement(WehHeader, {
            title: weh._("conversion_rules")
          }), React.createElement("main", null, this.state.rule &&
            this.renderRule() || this.renderAll()), React
          .createElement("footer", null, React.createElement(
            "div", {
              className: "btn-toolbar float-right"
            }, React.createElement("div", {
                className: "btn-group"
              }, React.createElement("button", {
                type: "button",
                onClick: this.cancel(),
                className: "btn btn-outline-secondary"
              }, weh._("cancel")), this.state.rule && React
              .createElement("button", {
                type: "button",
                onClick: this.saveRule(),
                disabled: this.state.rule.format.length === 0,
                className: "btn btn-primary"
              }, weh._(this.state.newRule &&
                "conversion_create_rule" ||
                "conversion_update_rule")), !this.state.rule &&
              React.createElement("button", {
                type: "button",
                onClick: this.saveRules(),
                disabled: deepEqual(this.props.rules, this
                  .state.rules),
                className: "btn btn-primary"
              }, weh._("save"))))))
      }
    });
    render(React.createElement(Provider, {
        store
      }, React.createElement(ConnectedRulesEditor, null)), document.getElementById("root")),
      weh.setPageTitle(weh._("conversion_rules"))
  });
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
*/