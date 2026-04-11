"use strict";

/** @typedef {import("./ui-types").BlacklistEmbedProps} BlacklistEmbedProps */
/** @typedef {import("./ui-types").BlacklistEmbedState} BlacklistEmbedState */
/** @typedef {import("./ui-types").CheckboxChangeEvent} CheckboxChangeEvent */
/** @typedef {import("./ui-types").VoidHandler} VoidHandler */

(() => {
  weh.is_safe.then(() => {
    class BlacklistEmbed extends React.Component {
      /**
       * @param {BlacklistEmbedProps} props
       */
      constructor(props) {
        super(props);
        /** @type {BlacklistEmbedState} */
        this.state = {
          domains: {},
        };
      }

      /**
       * @param {string} domain
       * @returns {(event: CheckboxChangeEvent) => void}
       */
      createDomainToggleHandler(domain) {
        return (event) => {
          this.setState({
            domains: Object.assign({}, this.state.domains, {
              [domain]: event.target.checked,
            }),
          });
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createSaveHandler() {
        return () => {
          const selectedDomains = Object.keys(this.state.domains).filter(
            (domain) => this.state.domains[domain],
          );

          weh.rpc.call("addToBlacklist", selectedDomains).then(() => {
            if (this.props.closeWindow) {
              this.props.closeWindow();
            }
          });
        };
      }

      /**
       * @returns {boolean}
       */
      hasSelectedDomains() {
        return Object.keys(this.state.domains).some(
          (domain) => this.state.domains[domain],
        );
      }

      componentWillMount() {
        const hitId = decodeURIComponent(new URL(document.URL).hash.substr(1));

        weh.rpc.call("domainsFromHitId", hitId).then(
          /** @param {string[]} domains */
          (domains) => {
            /** @type {BlacklistEmbedState["domains"]} */
            const availableDomains = {};
            domains.forEach((domain) => {
              availableDomains[domain] = !1;
            });

            this.setState({
              domains: availableDomains,
            });
          },
        );
      }

      render() {
        const domainOptions = Object.keys(this.state.domains)
          .sort()
          .map((domain) =>
            React.createElement(
              "div",
              {
                key: domain,
              },
              React.createElement("input", {
                type: "checkbox",
                id: "id-" + domain,
                value: this.state.domains[domain],
                onChange: this.createDomainToggleHandler(domain),
              }),
              React.createElement(
                "label",
                {
                  htmlFor: "id-" + domain,
                  title: domain,
                },
                domain,
              ),
            ),
          );

        return React.createElement(
          "div",
          {
            className: "weh-shf embeddable",
          },
          React.createElement(
            "div",
            null,
            React.createElement(
              "main",
              null,
              React.createElement(
                "div",
                {
                  className: "blacklist",
                },
                React.createElement(
                  "div",
                  {
                    className: "explain",
                  },
                  React.createElement("h3", null, weh._("add_to_blacklist")),
                  React.createElement("p", null, weh._("add_to_blacklist_help")),
                ),
                React.createElement(
                  "div",
                  {
                    className: "domains",
                  },
                  domainOptions,
                ),
              ),
            ),
            React.createElement(
              "footer",
              null,
              React.createElement(
                "div",
                {
                  className: "btn-toolbar justify-content-between",
                },
                React.createElement("div", null),
                React.createElement(
                  "div",
                  {
                    className: "btn-group pull-right",
                  },
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      disabled: !this.hasSelectedDomains(),
                      onClick: this.createSaveHandler(),
                      className: "btn btn-outline-primary",
                    },
                    weh._("save"),
                  ),
                ),
              ),
            ),
          ),
        );
      }
    }

    render(
      React.createElement(
        Embedder,
        null,
        React.createElement(BlacklistEmbed, {
          closeWindow: () => weh.rpc.call("closePopup"),
        }),
      ),
      document.getElementById("root"),
    );
  });
})();
