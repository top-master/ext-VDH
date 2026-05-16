"use strict";

/** @typedef {import("./ui-types").CheckboxChangeEvent} CheckboxChangeEvent */
/** @typedef {import("./ui-types").EmptyProps} EmptyProps */
/** @typedef {import("./ui-types").ExplainQrPageState} ExplainQrPageState */
/** @typedef {import("./ui-types").HitLike} HitLike */
/** @typedef {import("./ui-types").VoidHandler} VoidHandler */

(() => {
  const cleanroomShared = globalThis.__cleanroomLinkGuard__;

  class ExplainQrPage extends React.Component {
    /**
     * @param {EmptyProps} props
     */
    constructor(props) {
      super(props);
      /** @type {ExplainQrPageState} */
      this.state = {
        hit: {},
      };

      const hitId = decodeURIComponent(new URL(document.URL).hash.substr(1));
      weh.rpc.call("getHit", hitId).then(
        /** @param {HitLike} hit */
        (hit) => {
          this.setState({
            hit,
          });
        },
      );
    }

    /**
     * @returns {VoidHandler}
     */
    createOpenLicensingInfoHandler() {
      return () => {
        weh.rpc.call("goto", cleanroomShared.getUrlValue("licenseInfoUrl"));
      };
    }

    /**
     * @returns {VoidHandler}
     */
    createOpenConversionLicenseHandler() {
      return () => {
        weh.rpc.call("goto", cleanroomShared.getUrlValue("convertUrl"));
      };
    }

    /**
     * @param {CheckboxChangeEvent} event
     * @returns {Promise<void>}
     */
    async handleNotAgainChange(event) {
      (await weh.prefs).qrMessageNotAgain = event.target.checked;
    }

    render() {
      if (!this.state.hit.id) {
        return null;
      }

      return React.createElement(
        "div",
        {
          className: "explain-qr",
        },
        React.createElement(
          "div",
          {
            className: "qr-text",
          },
          weh._("file_generated", this.state.hit.localFilePath),
        ),
        React.createElement(
          "div",
          {
            className: "qr-text",
          },
          weh._("explain_qr1"),
        ),
        React.createElement(
          "div",
          {
            className: "qr-img",
          },
          React.createElement("img", {
            src: "images/qr-video.png",
          }),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              className: "btn-toolbar float-right",
            },
            React.createElement(
              "div",
              {
                className: "btn-group",
              },
              React.createElement(
                "button",
                {
                  className: "btn btn-outline-secondary",
                  onClick: this.createOpenLicensingInfoHandler(),
                },
                weh._("tell_me_more"),
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-outline-secondary",
                  onClick: this.createOpenConversionLicenseHandler(),
                },
                weh._("get_conversion_license"),
              ),
            ),
          ),
          React.createElement(
            "div",
            {
              className: "not-again",
            },
            React.createElement("input", {
              id: "checkbox1",
              type: "checkbox",
              onChange: this.handleNotAgainChange.bind(this),
            }),
            React.createElement(
              "label",
              {
                htmlFor: "checkbox1",
              },
              weh._("not_see_again"),
            ),
          ),
        ),
      );
    }
  }

  weh.is_safe.then(() => {
    render(
      React.createElement(
        "div",
        {
          className: "weh-shf",
        },
        React.createElement(
          "div",
          null,
          React.createElement(WehHeader, {
            title: weh._("about_qr"),
          }),
          React.createElement("main", null, React.createElement(ExplainQrPage, null)),
        ),
      ),
      document.getElementById("root"),
    );
    weh.setPageTitle(weh._("about_qr"));
  });
})();
