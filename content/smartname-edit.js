"use strict";
(() => {
  weh.is_safe.then(() => {
    function smartNameReducer(state = [], action) {
      switch (action.type) {
        case "SET_SMARTNAME_DATA":
          state = action.payload;
          break
      }
      return state
    }
    window.store = createStore(smartNameReducer);

    function loadRules() {
      return weh.rpc.call("getSmartNameRules")
        .then(rules => {
          window.store.dispatch({
            type: "SET_SMARTNAME_DATA",
            payload: rules
          })
        })
    }
    loadRules();
    var SmartNameEditor = connect((state, ownProps) => ({
      rules: state || []
    }))(class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          rule: null,
          newRule: !1,
          xpathClass: "",
          regexpClass: "",
          delayClass: "",
          domainClass: ""
        }
      }
      addRule() {
        var self = this;
        return () => {
          self.setState({
            rule: {
              domain: "",
              mode: "page-title",
              xpath: "",
              regexp: ".*",
              delay: 0
            },
            newRule: !0
          })
        }
      }
      cancelInput() {
        var self = this;
        return () => {
          self.setState({
            rule: null
          })
        }
      }
      removeRule(ruleKey) {
        var self = this;
        return event => {
          event.stopPropagation(), weh.rpc.call("removeFromSmartName",
              [ruleKey])
            .then(() => loadRules())
        }
      }
      editRule(ruleKey) {
        var self = this;
        return () => {
          self.setState({
            rule: Object.assign({}, self.props.rules[ruleKey]),
            newRule: !1
          })
        }
      }
      renderAll() {
        var ruleElements = Object.keys(this.props.rules)
          .sort()
          .map(ruleKey => React.createElement("div", {
              key: ruleKey,
              className: "domain",
              onClick: this.editRule(ruleKey)
            }, React.createElement("div", null, ruleKey), React
            .createElement("div", {
              className: "delete",
              onClick: this.removeRule(ruleKey)
            }, "X")));
        return React.createElement("div", {
          className: "all-rules"
        }, React.createElement("div", {
          className: "description"
        }, React.createElement("p", null, weh._(
          "smartname_edit_descr")), React.createElement("a", {
          href: "#",
          onClick: this.addRule()
        }, weh._("smartname_add_domain"))), React.createElement(
          "div", {
            className: "list-column"
          }, ruleElements.length == 0 && React.createElement("div", {
            className: "empty"
          }, weh._("smartname_empty")), ruleElements.length > 0 && React
          .createElement("div", {
            className: "list"
          }, ruleElements)))
      }
      saveRule() {
        var self = this;
        return () => {
          weh.rpc.call("addSmartNameRule", self.state.rule)
            .then(() => {
              loadRules()
            }), self.setState({
              rule: null
            })
        }
      }
      cancelRule() {
        var self = this;
        return () => {
          self.setState({
            rule: null
          })
        }
      }
      onChange(field) {
        var self = this;
        return event => {
          var value = event.target.value,
            update = {
              rule: {}
            },
            hasError = !1;
          switch (field) {
            case "mode":
              update.rule.mode = value;
              break;
            case "xpath":
              update.rule.xpath = value;
              try {
                document.evaluate(value, document, null, XPathResult
                  .STRING_TYPE, null), update.xpathClass = ""
              } catch {
                update.xpathClass = "error", hasError = !0
              }
              break;
            case "regexp":
              update.rule.regexp = value;
              try {
                new RegExp(value), update.regexpClass = ""
              } catch {
                update.regexpClass = "error", hasError = !0
              }
              break;
            case "domain":
              update.rule.domain = value, /^\S+\.\S+$/.test(value) ? update
                .domainClass = "" : update.domainClass = "error";
              break;
            case "delay":
              update.rule.delay = value, /^[0-9]+$/.test(value) ? update
                .delayClass = "" : update.delayClass = "error";
              break
          }
          update.rule = Object.assign({}, self.state.rule, update.rule), self
            .setState(Object.assign({}, self.state, update))
        }
      }
      renderRule() {
        return React.createElement("div", {
            className: "container edit-rule"
          }, React.createElement("div", {
            className: "form-group row"
          }, React.createElement("label", {
            className: "col-form-label col-sm-4"
          }, weh._("smartnamer_domain")), React.createElement(
            "input", {
              className: "form-control col-sm-8 " + this.state
                .domainClass,
              onChange: this.onChange("domain"),
              type: "text",
              value: this.state.rule.domain,
              disabled: !this.state.newRule
            })), React.createElement("div", {
            className: "form-group row"
          }, React.createElement("select", {
              className: "form-control col-sm-12",
              onChange: this.onChange("mode"),
              value: this.state.rule.mode
            }, React.createElement("option", {
              value: "header-url"
            }, weh._("smartnamer_get_name_from_header_url")),
            React.createElement("option", {
              value: "page-title"
            }, weh._("smartnamer_get_name_from_page_title")),
            React.createElement("option", {
              value: "page-content"
            }, weh._("smartnamer_get_name_from_page_content")),
            React.createElement("option", {
              value: "obfuscated"
            }, weh._("smartnamer_get_obfuscated_name")))), React
          .createElement("div", {
              className: "form-group row"
            }, React.createElement("label", {
              className: "col-form-label col-sm-12"
            }, weh._("smartnamer_xpath_expr")), React
            .createElement("textarea", {
              className: "form-control col-sm-12 " + this.state
                .xpathClass,
              rows: "2",
              onChange: this.onChange("xpath"),
              value: this.state.rule.xpath
            })), React.createElement("div", {
            className: "form-group row"
          }, React.createElement("label", {
            className: "col-form-label col-sm-6"
          }, weh._("smartnamer_regexp")), React.createElement(
            "input", {
              className: "form-control col-sm-6 " + this.state
                .regexpClass,
              onChange: this.onChange("regexp"),
              type: "text",
              value: this.state.rule.regexp
            })), React.createElement("div", {
            className: "form-group row"
          }, React.createElement("label", {
            className: "col-form-label col-sm-6"
          }, weh._("smartnamer_delay")), React.createElement(
            "input", {
              className: "form-control col-sm-6 " + this.state
                .delayClass,
              onChange: this.onChange("delay"),
              type: "text",
              value: this.state.rule.delay
            })))
      }
      render() {
        return React.createElement("div", {
            className: "weh-shf smartname"
          }, React.createElement(WehHeader, {
            title: weh._("smartnaming_rules")
          }), React.createElement("main", null, this.state.rule &&
            this.renderRule() || this.renderAll()), this.state
          .rule && React.createElement("footer", null, React
            .createElement("div", {
              className: "btn-toolbar float-right"
            }, React.createElement("div", {
              className: "btn-group"
            }, React.createElement("button", {
              type: "button",
              onClick: this.cancelRule(),
              className: "btn btn-outline-secondary"
            }, weh._("cancel")), React.createElement(
            "button", {
              type: "button",
              onClick: this.saveRule(),
              disabled: this.state.xpathClass || this.state
                .regexpClass || this.state.delayClass ||
                this.state.domainClass,
              className: "btn btn-primary"
            }, weh._(this.state.newRule &&
              "smartname_create_rule" ||
              "smartname_update_rule"))))))
      }
    });
    render(React.createElement(Provider, {
        store
      }, React.createElement(SmartNameEditor, null)), document.getElementById("root")),
      weh.setPageTitle(weh._("smartnaming_rules"))
  });
})();