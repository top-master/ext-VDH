"use strict";
(() => {
  weh.is_safe.then(() => {
    function blacklistDomainsReducer(t = [], e) {
      switch (e.type) {
        case "SET_BLACKLIST_DATA":
          t = e.payload;
          break
      }
      return t
    }
    window.store = createStore(blacklistDomainsReducer), weh.rpc.call(
        "getBlacklist")
      .then(t => {
        window.store.dispatch({
          type: "SET_BLACKLIST_DATA",
          payload: t
        })
      });
    var ConnectedBlacklistEditor = connect((t, e) => ({
      domains: t || []
    }))(class BlacklistEditor extends React.Component {
      constructor(t) {
        super(t), this.state = {
          inputDomain: null
        }
      }
      createAddDomainHandler() {
        var t = this;
        return () => {
          t.setState({
            inputDomain: ""
          })
        }
      }
      createCancelInputHandler() {
        var t = this;
        return () => {
          t.setState({
            inputDomain: null
          })
        }
      }
      createInputKeyDownHandler() {
        var t = this;
        return e => {
          e.key == "Enter" ? t.createSubmitDomainHandler()() : e.key ==
            "Escape" && t.createCancelInputHandler()()
        }
      }
      createSubmitDomainHandler() {
        var t = this;
        return () => {
          t.state.inputDomain && weh.rpc.call("addToBlacklist", [t
              .state.inputDomain
            ])
            .then(() => weh.rpc.call("getBlacklist"))
            .then(e => {
              window.store.dispatch({
                type: "SET_BLACKLIST_DATA",
                payload: e
              }), t.setState({
                inputDomain: null
              })
            })
        }
      }
      createInputChangeHandler() {
        var t = this;
        return e => {
          t.setState({
            inputDomain: e.target.value
          })
        }
      }
      createRemoveDomainHandler(t) {
        var e = this;
        return () => {
          weh.rpc.call("removeFromBlacklist", [t])
            .then(() => weh.rpc.call("getBlacklist"))
            .then(n => {
              window.store.dispatch({
                type: "SET_BLACKLIST_DATA",
                payload: n
              })
            })
        }
      }
      render() {
        var t = this.props.domains.sort()
          .map(e => React.createElement("div", {
              key: e,
              className: "domain"
            }, React.createElement("div", null, e), React
            .createElement("div", {
              className: "delete",
              onClick: this.createRemoveDomainHandler(e)
            }, "X")));
        return React.createElement("div", {
          className: "blacklist"
        }, React.createElement("div", {
            className: "description"
          }, React.createElement("p", null, weh._(
            "blacklist_edit_descr")), this.state.inputDomain ===
          null && React.createElement("a", {
            href: "#",
            onClick: this.createAddDomainHandler()
          }, weh._("blacklist_add_domain")), this.state
          .inputDomain !== null && React.createElement("div", {
            className: "input-group"
          }, React.createElement("input", {
            value: this.state.inputDomain,
            onChange: this.createInputChangeHandler(),
            onKeyDown: this.createInputKeyDownHandler(),
            placeholder: weh._("blacklist_add_placeholder"),
            className: "form-control",
            type: "text"
          }), React.createElement("span", {
            className: "input-group-btn"
          }, React.createElement("button", {
            className: "btn btn-primary",
            onClick: this.createSubmitDomainHandler()
          }, weh._("ok"))), React.createElement("span", {
            className: "input-group-btn"
          }, React.createElement("button", {
            className: "btn",
            onClick: this.createCancelInputHandler()
          }, "X")))), React.createElement("div", {
            className: "list-column"
          }, this.props.domains.length == 0 && React
          .createElement("div", {
            className: "empty"
          }, weh._("blacklist_empty")), this.props.domains
          .length > 0 && React.createElement("div", {
            className: "list"
          }, t)))
      }
    });
    render(React.createElement(Provider, {
      store
    }, React.createElement("div", {
      className: "weh-shf"
    }, React.createElement("div", null, React.createElement(
      WehHeader, {
        title: weh._("blacklist")
      }), React.createElement("main", null, React.createElement(
      ConnectedBlacklistEditor, null))))), document.getElementById("root")),
      weh.setPageTitle(
      weh._("blacklist"))
  });
})();
