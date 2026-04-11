"use strict";

/** @typedef {import("./ui-types").AboutPageState} AboutPageState */
/** @typedef {import("./ui-types").EmptyProps} EmptyProps */
/** @typedef {import("./ui-types").ManifestLike} ManifestLike */
/** @typedef {import("./ui-types").VoidHandler} VoidHandler */

(() => {
  weh.is_safe.then(() => {
    class AboutPage extends React.Component {
      /**
       * @param {EmptyProps} props
       */
      constructor(props) {
        super(props);
        /** @type {AboutPageState} */
        this.state = {};
      }

      /**
       * @param {...string} rpcArguments
       * @returns {VoidHandler}
       */
      createCloseAfterRpcHandler(...rpcArguments) {
        return () => {
          weh.rpc.call(...rpcArguments).then(() => {
            close();
          });
        };
      }

      render() {
        /** @type {?string} */
        let alphaIntroText = null;
        /** @type {?string} */
        let firefoxExtraText = null;
        /** @type {ManifestLike} */
        const manifest = browser.runtime.getManifest();
        const manifestVersion = manifest.version_name || manifest.version || "";

        if (/a/.test(manifestVersion)) {
          alphaIntroText = weh._("about_alpha_intro");
          if (/^7\.0.*a/.test(manifestVersion) && weh.isBrowser("firefox")) {
            firefoxExtraText = weh._("about_alpha_extra7_fx");
          }
        } else if (/b/.test(manifestVersion)) {
          alphaIntroText = weh._("about_alpha_intro");
        }

        return React.createElement(
          "div",
          {
            className: "about-vdh",
          },
          alphaIntroText && React.createElement("p", null, alphaIntroText),
          firefoxExtraText && React.createElement("p", null, firefoxExtraText),
          React.createElement(
            "div",
            {
              className: "about-links",
            },
            React.createElement(
              "a",
              {
                href: "#",
                onClick: this.createCloseAfterRpcHandler("openForum"),
              },
              weh._("support_forum"),
            ),
            React.createElement(
              "a",
              {
                href: "#",
                onClick: this.createCloseAfterRpcHandler("openHomepage"),
              },
              weh._("homepage"),
            ),
          ),
          React.createElement(CopyButton, null),
          React.createElement(AddonInfoPanel, null),
          React.createElement(PlatformInfoPanel, null),
          React.createElement(CoAppInfoPanel, null),
          React.createElement(LicInfoPanel, null),
        );
      }
    }

    render(
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          React.createElement(WehHeader, {
            title: weh._("about_vdh"),
          }),
          React.createElement("main", null, React.createElement(AboutPage, null)),
        ),
      ),
      document.getElementById("root"),
    );
    weh.setPageTitle(weh._("about_vdh"));
  });
})();
