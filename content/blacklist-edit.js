"use strict";

/** @typedef {import("./ui-types").BlacklistAction} BlacklistAction */
/** @typedef {import("./ui-types").BlacklistEditorProps} BlacklistEditorProps */
/** @typedef {import("./ui-types").BlacklistEditorState} BlacklistEditorState */
/** @typedef {import("./ui-types").KeyboardEventLike} KeyboardEventLike */
/** @typedef {import("./ui-types").TextChangeEvent} TextChangeEvent */
/** @typedef {import("./ui-types").VoidHandler} VoidHandler */

(() => {
  weh.is_safe.then(() => {
    /**
     * @param {string[]} currentDomains
     * @param {BlacklistAction} action
     * @returns {string[]}
     */
    function blacklistDomainsReducer(currentDomains = [], action) {
      switch (action.type) {
        case "SET_BLACKLIST_DATA":
          return action.payload;
        default:
          return currentDomains;
      }
    }

    const blacklistStore = (window.store = createStore(blacklistDomainsReducer));
    weh.rpc.call("getBlacklist").then(
      /** @param {string[]} domains */
      (domains) => {
        blacklistStore.dispatch({
          type: "SET_BLACKLIST_DATA",
          payload: domains,
        });
      },
    );

    var ConnectedBlacklistEditor = connect(
      /**
       * @param {string[] | undefined} domains
       * @returns {BlacklistEditorProps}
       */
      (domains) => ({
        domains: domains || [],
      }),
    )(class BlacklistEditor extends React.Component {
      /**
       * @param {BlacklistEditorProps} props
       */
      constructor(props) {
        super(props);
        /** @type {BlacklistEditorState} */
        this.state = {
          inputDomain: null,
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createAddDomainHandler() {
        return () => {
          this.setState({
            inputDomain: "",
          });
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createCancelInputHandler() {
        return () => {
          this.setState({
            inputDomain: null,
          });
        };
      }

      /**
       * @returns {(event: KeyboardEventLike) => void}
       */
      createInputKeyDownHandler() {
        return (event) => {
          if (event.key == "Enter") {
            this.createSubmitDomainHandler()();
          } else if (event.key == "Escape") {
            this.createCancelInputHandler()();
          }
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createSubmitDomainHandler() {
        return () => {
          if (!this.state.inputDomain) {
            return;
          }

          weh.rpc
            .call("addToBlacklist", [this.state.inputDomain])
            .then(() => weh.rpc.call("getBlacklist"))
            .then(
              /** @param {string[]} domains */
              (domains) => {
                blacklistStore.dispatch({
                  type: "SET_BLACKLIST_DATA",
                  payload: domains,
                });
                this.setState({
                  inputDomain: null,
                });
              },
            );
        };
      }

      /**
       * @returns {(event: TextChangeEvent) => void}
       */
      createInputChangeHandler() {
        return (event) => {
          this.setState({
            inputDomain: event.target.value,
          });
        };
      }

      /**
       * @param {string} domain
       * @returns {VoidHandler}
       */
      createRemoveDomainHandler(domain) {
        return () => {
          weh.rpc
            .call("removeFromBlacklist", [domain])
            .then(() => weh.rpc.call("getBlacklist"))
            .then(
              /** @param {string[]} domains */
              (domains) => {
                blacklistStore.dispatch({
                  type: "SET_BLACKLIST_DATA",
                  payload: domains,
                });
              },
            );
        };
      }

      render() {
        const domainRows = [...this.props.domains]
          .sort()
          .map((domain) =>
            React.createElement(
              "div",
              {
                key: domain,
                className: "domain",
              },
              React.createElement("div", null, domain),
              React.createElement(
                "div",
                {
                  className: "delete",
                  onClick: this.createRemoveDomainHandler(domain),
                },
                "X",
              ),
            ),
          );

        return React.createElement(
          "div",
          {
            className: "blacklist",
          },
          React.createElement(
            "div",
            {
              className: "description",
            },
            React.createElement("p", null, weh._("blacklist_edit_descr")),
            this.state.inputDomain === null &&
              React.createElement(
                "a",
                {
                  href: "#",
                  onClick: this.createAddDomainHandler(),
                },
                weh._("blacklist_add_domain"),
              ),
            this.state.inputDomain !== null &&
              React.createElement(
                "div",
                {
                  className: "input-group",
                },
                React.createElement("input", {
                  value: this.state.inputDomain,
                  onChange: this.createInputChangeHandler(),
                  onKeyDown: this.createInputKeyDownHandler(),
                  placeholder: weh._("blacklist_add_placeholder"),
                  className: "form-control",
                  type: "text",
                }),
                React.createElement(
                  "span",
                  {
                    className: "input-group-btn",
                  },
                  React.createElement(
                    "button",
                    {
                      className: "btn btn-primary",
                      onClick: this.createSubmitDomainHandler(),
                    },
                    weh._("ok"),
                  ),
                ),
                React.createElement(
                  "span",
                  {
                    className: "input-group-btn",
                  },
                  React.createElement(
                    "button",
                    {
                      className: "btn",
                      onClick: this.createCancelInputHandler(),
                    },
                    "X",
                  ),
                ),
              ),
          ),
          React.createElement(
            "div",
            {
              className: "list-column",
            },
            this.props.domains.length == 0 &&
              React.createElement(
                "div",
                {
                  className: "empty",
                },
                weh._("blacklist_empty"),
              ),
            this.props.domains.length > 0 &&
              React.createElement(
                "div",
                {
                  className: "list",
                },
                domainRows,
              ),
          ),
        );
      }
    });

    render(
      React.createElement(
        Provider,
        {
          store: blacklistStore,
        },
        React.createElement(
          "div",
          {
            className: "weh-shf",
          },
          React.createElement(
            "div",
            null,
            React.createElement(WehHeader, {
              title: weh._("blacklist"),
            }),
            React.createElement(
              "main",
              null,
              React.createElement(ConnectedBlacklistEditor, null),
            ),
          ),
        ),
      ),
      document.getElementById("root"),
    );
    weh.setPageTitle(weh._("blacklist"));
  });
})();
