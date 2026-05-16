"use strict";

/** @typedef {import("./ui-types").BuildInfo} BuildInfo */
/** @typedef {import("./ui-types").BuildOptions} BuildOptions */
/** @typedef {import("./ui-types").EmptyProps} EmptyProps */
/** @typedef {import("./ui-types").FundingPageState} FundingPageState */
/** @typedef {import("./ui-types").PreferenceSnapshot} PreferenceSnapshot */
/** @typedef {import("./ui-types").VoidHandler} VoidHandler */

(() => {
  const cleanroomShared = globalThis.__cleanroomLinkGuard__;

  var createModuleLoader = (moduleFactory, cachedModule) => () =>
    (cachedModule ||
      moduleFactory(
        (cachedModule = {
          exports: {},
        }).exports,
        cachedModule,
      ),
    cachedModule.exports);

  var readBuildInfo = createModuleLoader((_exportsObject, moduleReference) => {
    moduleReference.exports = {
      prod: !0,
      channel: "stable",
      buildDate: "2024-10-15",
      buildOptions: {
        linuxlic: !1,
        noyt: !0,
        target: "google",
        browser: "chrome",
      },
    };
  });

  weh.is_safe.then(() => {
    /** @type {BuildOptions} */
    const buildOptions = readBuildInfo().buildOptions || {};

    class FundingPage extends React.Component {
      /**
       * @param {EmptyProps} props
       */
      constructor(props) {
        super(props);
        /** @type {FundingPageState} */
        this.state = {
          downloadCount: null,
          missingLocales: 0,
        };

        let missingLocalesCount = 0;
        try {
          missingLocalesCount =
            JSON.parse(weh._("__missingI18nTags") || "[]").length || 0;
        } catch {}

        weh.prefs.then(
          /** @param {PreferenceSnapshot} preferences */
          (preferences) => {
            this.setState({
              downloadCount: preferences.downloadCount || 0,
              missingLocales: missingLocalesCount,
            });

            preferences.on &&
              preferences.on("downloadCount", (_previousValue, nextValue) => {
                this.setState({
                  downloadCount: nextValue,
                  missingLocales: missingLocalesCount,
                });
              });
          },
        );
      }

      /**
       * @returns {VoidHandler}
       */
      createReviewHandler() {
        return () => {
          /** @type {?string} */
          let reviewUrl = null;

          if (buildOptions.browser == "firefox") {
            reviewUrl = cleanroomShared.getUrlValue("firefoxReviewUrl");
          } else if (buildOptions.browser == "chrome") {
            reviewUrl = cleanroomShared.getUrlValue("chromeReviewUrl");
          } else if (buildOptions.browser == "edge") {
            reviewUrl = cleanroomShared.getUrlValue("edgeReviewUrl");
          }

          if (reviewUrl) {
            weh.rpc.call("goto", reviewUrl);
          }
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createDonateHandler() {
        return () => {
          weh.rpc.call("goto", cleanroomShared.getUrlValue("donateUrl"));
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createTranslationHelpHandler() {
        return () => {
          weh.rpc.call(
            "goto",
            cleanroomShared.getUrlValue("translationDiscussionsUrl"),
          );
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createRemindLaterHandler() {
        return () => {
          weh.rpc.call("fundingLater").then(() => {
            weh.rpc.call("closePanel", weh.uiName);
          });
        };
      }

      render() {
        if (this.state.downloadCount === null) {
          return null;
        }

        return React.createElement(
          "div",
          {
            className: "funding",
          },
          React.createElement(WehHeader, {
            title: weh._("donate_vdh"),
          }),
          React.createElement(
            "main",
            null,
            React.createElement(
              "div",
              null,
              React.createElement("h1", null, weh._("congratulations")),
              React.createElement("br", null),
              React.createElement(
                "p",
                null,
                weh._("you_downloaded_n_videos", String(this.state.downloadCount)),
              ),
              React.createElement("p", null, weh._("req_donate")),
              buildOptions.browser == "firefox" &&
                React.createElement(
                  "p",
                  null,
                  React.createElement("span", null, weh._("req_review")),
                  "  ",
                  React.createElement(
                    "a",
                    {
                      onClick: this.createReviewHandler(),
                      href: "#",
                    },
                    weh._("req_review_link"),
                  ),
                ),
              buildOptions.browser == "chrome" &&
                React.createElement(
                  "p",
                  null,
                  React.createElement("span", null, weh._("chrome_req_review")),
                  "  ",
                  React.createElement(
                    "a",
                    {
                      onClick: this.createReviewHandler(),
                      href: "#",
                    },
                    weh._("req_review_link"),
                  ),
                ),
              buildOptions.browser == "edge" &&
                React.createElement(
                  "p",
                  null,
                  React.createElement("span", null, weh._("edge_req_review")),
                  "  ",
                  React.createElement(
                    "a",
                    {
                      onClick: this.createReviewHandler(),
                      href: "#",
                    },
                    weh._("req_review_link"),
                  ),
                ),
              this.state.missingLocales > 0 &&
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "span",
                    null,
                    weh._("req_locale", [
                      browser.i18n.getUILanguage(),
                      this.state.missingLocales,
                    ]),
                  ),
                  " ",
                  React.createElement(
                    "a",
                    {
                      onClick: this.createTranslationHelpHandler(),
                      href: "#",
                    },
                    weh._("help_translating"),
                  ),
                ),
              React.createElement(
                "div",
                {
                  className: "donate-big-button",
                  onClick: this.createDonateHandler(),
                },
                weh._("donate"),
              ),
            ),
          ),
          React.createElement(
            "footer",
            null,
            React.createElement(
              "div",
              {
                className: "btn-toolbar justify-content-end",
              },
              React.createElement(
                "div",
                {
                  className: "btn-group pull-right",
                },
                React.createElement(
                  "button",
                  {
                    className: "btn btn-outline-secondary",
                    onClick: this.createRemindLaterHandler(),
                  },
                  weh._("not_again_3months"),
                ),
                React.createElement(
                  "button",
                  {
                    className: "btn btn-success",
                    onClick: this.createDonateHandler(),
                  },
                  weh._("donate"),
                ),
              ),
            ),
          ),
        );
      }
    }

    render(
      React.createElement(
        "div",
        {
          className: "weh-shf",
        },
        React.createElement(FundingPage, null),
      ),
      document.getElementById("root"),
    );
    weh.setPageTitle(weh._("donate_vdh"));
  });
})();
