"use strict";

/** @typedef {import("./ui-types").DownloadConvertEmbedProps} DownloadConvertEmbedProps */
/** @typedef {import("./ui-types").DownloadConvertEmbedState} DownloadConvertEmbedState */
/** @typedef {import("./ui-types").HitLike} HitLike */
/** @typedef {import("./ui-types").OutputConfigMap} OutputConfigMap */
/** @typedef {import("./ui-types").PreferenceSnapshot} PreferenceSnapshot */
/** @typedef {import("./ui-types").TextChangeEvent} TextChangeEvent */
/** @typedef {import("./ui-types").VoidHandler} VoidHandler */

(() => {
  weh.is_safe.then(async () => {
    /** @type {PreferenceSnapshot} */
    const preferences = await weh.prefs;
    const preferencesStore = createStore(
      combineReducers({
        prefs: preferences.reducer,
      }),
    );

    preferences.reduxDispatch(preferencesStore);

    let ConnectedDownloadConvertEmbed = connect(
      /**
       * @param {{ prefs: DownloadConvertEmbedProps["prefs"] }} storeState
       * @returns {Pick<DownloadConvertEmbedProps, "prefs" | "showSaveAs">}
       */
      (storeState) => ({
        prefs: storeState.prefs,
        showSaveAs: new URL(window.location.href).searchParams.get("nosaveas") != "1",
      }),
    )(class DownloadConvertEmbed extends React.Component {
      /**
       * @param {DownloadConvertEmbedProps} props
       */
      constructor(props) {
        super(props);
        /** @type {DownloadConvertEmbedState} */
        this.state = {
          outputConfig: preferences.dlconvLastOutput ?? "",
          outputConfigs: {},
          hit: null,
        };
      }

      /**
       * @returns {(event: TextChangeEvent) => void}
       */
      createOutputChangeHandler() {
        return (event) => {
          this.setState({
            outputConfig: event.target.value,
          });
        };
      }

      /**
       * @param {boolean} promptForSaveAs
       * @returns {VoidHandler}
       */
      createSaveHandler(promptForSaveAs) {
        return () => {
          if (!this.state.hit) {
            return;
          }

          weh.trigger({
            hitId: this.state.hit.id,
            outputConfigId: this.state.outputConfig,
            outputConfig: this.state.outputConfigs[this.state.outputConfig],
            prompt: promptForSaveAs,
          }).then(() => {
            if (this.props.closeWindow) {
              this.props.closeWindow();
            }
          });
        };
      }

      /**
       * @returns {VoidHandler}
       */
      createConfigureHandler() {
        return () => {
          weh.rpc.call("editConverterConfigs", this.state.outputConfig).then(() => {
            if (this.props.closeWindow) {
              this.props.closeWindow();
            }
          });
        };
      }

      componentWillMount() {
        const hitId = decodeURIComponent(new URL(document.URL).hash.substr(1));

        weh.rpc.call("getHit", hitId).then(
          /** @param {HitLike} hit */
          (hit) => {
            this.setState({
              hit,
            });
          },
        );

        weh.rpc.call("getOutputConfigs").then(
          /** @param {OutputConfigMap} outputConfigs */
          (outputConfigs) => {
            this.setState({
              outputConfigs,
            });
          },
        );
      }

      /**
       * @param {DownloadConvertEmbedProps} nextProps
       */
      componentWillReceiveProps(nextProps) {
        this.setState({
          outputConfig: nextProps.prefs.dlconvLastOutput || "",
        });
      }

      render() {
        /** @type {OutputConfigMap} */
        const selectableOutputConfigs = this.state.outputConfig
          ? this.state.outputConfigs
          : Object.assign({}, this.state.outputConfigs, {
              "": {
                title: weh._("select_output_config"),
              },
            });

        const outputOptions = Object.keys(selectableOutputConfigs)
          .sort()
          .map((outputConfigId) =>
            React.createElement(
              "option",
              {
                key: outputConfigId,
                value: outputConfigId,
              },
              selectableOutputConfigs[outputConfigId].title,
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
                  className: "dlconv",
                },
                React.createElement(
                  "div",
                  {
                    className: "explain",
                  },
                  React.createElement("h3", null, weh._("dlconv_download_and_convert")),
                  this.state.hit && React.createElement("p", null, this.state.hit.title),
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "select",
                    {
                      className: "form-control",
                      onChange: this.createOutputChangeHandler(),
                      value: this.state.outputConfig,
                    },
                    outputOptions,
                  ),
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "a",
                    {
                      onClick: this.createConfigureHandler(),
                      href: "#",
                    },
                    weh._("dlconv_output_details"),
                  ),
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
                  this.props.showSaveAs &&
                    React.createElement(
                      "button",
                      {
                        type: "button",
                        onClick: this.createSaveHandler(!0),
                        disabled: this.state.outputConfig == "",
                        className: "btn btn-outline-secondary",
                      },
                      weh._("save_as"),
                    ),
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      onClick: this.createSaveHandler(!1),
                      disabled: this.state.outputConfig == "",
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
    });

    render(
      React.createElement(
        Embedder,
        null,
        React.createElement(
          Provider,
          {
            store: preferencesStore,
          },
          React.createElement(ConnectedDownloadConvertEmbed, {
            closeWindow: () => weh.rpc.call("closePopup"),
          }),
        ),
      ),
      document.getElementById("root"),
    );
  });
})();
