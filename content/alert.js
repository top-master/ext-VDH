"use strict";

/** @typedef {import("./ui-types").AlertDialogButtonConfig} AlertDialogButtonConfig */
/** @typedef {import("./ui-types").AlertDialogData} AlertDialogData */
/** @typedef {import("./ui-types").AlertDialogState} AlertDialogState */
/** @typedef {import("./ui-types").AlertStoreAction} AlertStoreAction */
/** @typedef {import("./ui-types").AlertStoreState} AlertStoreState */
/** @typedef {import("./ui-types").CheckboxChangeEvent} CheckboxChangeEvent */
/** @typedef {import("./ui-types").VoidHandler} VoidHandler */

(() => {
  weh.is_safe.then(() => {
    /**
     * @param {AlertStoreState} currentState
     * @param {AlertStoreAction} action
     * @returns {AlertStoreState}
     */
    function alertStateReducer(currentState = {}, action) {
      switch (action.type) {
        case "SET_WEH_DATA":
          if (action.payload.bodyClass) {
            document.body.className = action.payload.bodyClass;
          }
          return Object.assign({}, currentState, {
            wehData: action.payload,
          });
        default:
          return currentState;
      }
    }

    const alertStore = createStore(alertStateReducer);
    weh.rpc.listen({
      /**
       * @param {AlertDialogData} wehInitData
       */
      wehInitData: (wehInitData) => {
        alertStore.dispatch({
          type: "SET_WEH_DATA",
          payload: wehInitData,
        });
      },
    });

    var ConnectedAlertDialog = connect(
      /**
       * @param {AlertStoreState} storeState
       * @returns {AlertDialogData}
       */
      (storeState) => storeState.wehData || {},
    )(class AlertDialog extends React.Component {
      /**
       * @param {AlertDialogData} props
       */
      constructor(props) {
        super(props);
        /** @type {AlertDialogState} */
        this.state = {
          notAgain: !1,
        };
      }

      /**
       * @returns {(width: number, height: number) => void}
       */
      createResizeHandler() {
        return (_width, height) => {
          if (!this.props.autoResize) {
            return;
          }

          if (this.updateTimer) {
            clearTimeout(this.updateTimer);
          }

          this.updateHeightTimer = setTimeout(() => {
            this.updateHeightTimer = null;
            weh.rpc.call(
              "updateLastFocusedWindowHeight",
              height || this.rootElement.clientHeight,
              document.body.clientHeight,
            );
          });
        };
      }

      /**
       * @param {boolean | undefined} shouldClosePanel
       * @param {Record<string, unknown> | null | undefined} triggerPayload
       * @param {string | null | undefined} rpcMethod
       * @param {...unknown} rpcArgs
       * @returns {VoidHandler}
       */
      createButtonClickHandler(shouldClosePanel, triggerPayload, rpcMethod, ...rpcArgs) {
        return () => {
          if (triggerPayload) {
            weh.trigger(
              Object.assign(
                {
                  notAgain: this.state.notAgain,
                },
                triggerPayload,
              ),
            );
          }

          if (rpcMethod) {
            weh.rpc.call(rpcMethod, ...rpcArgs);
          }

          if (shouldClosePanel) {
            weh.rpc.call("closePanel", weh.uiName);
          }
        };
      }

      /**
       * @returns {(event: CheckboxChangeEvent) => void}
       */
      createNotAgainChangeHandler() {
        return (event) => {
          this.setState({
            notAgain: event.target.checked,
          });
        };
      }

      render() {
        const buttonElements = (this.props.buttons || []).map(
          /** @param {AlertDialogButtonConfig} buttonConfig */
          (buttonConfig) => {
            const resolvedButtonConfig = Object.assign(
              {
                close: !0,
                rpcMethod: null,
                rpcArgs: [],
              },
              buttonConfig,
            );

            return React.createElement(
              "button",
              {
                key: resolvedButtonConfig.text,
                onClick: this.createButtonClickHandler(
                  resolvedButtonConfig.close,
                  resolvedButtonConfig.trigger,
                  resolvedButtonConfig.rpcMethod,
                  ...resolvedButtonConfig.rpcArgs,
                ),
                className: "btn " + (resolvedButtonConfig.className || ""),
              },
              resolvedButtonConfig.text,
            );
          },
        );

        const textContent = Array.isArray(this.props.text)
          ? this.props.text.map((textLine) =>
              React.createElement(
                "p",
                {
                  key: textLine,
                },
                textLine,
              ),
            )
          : this.props.text || null;

        return React.createElement(
          "div",
          {
            className: "alert-dialog",
            ref: (rootElement) => {
              this.rootElement = rootElement;
            },
          },
          React.createElement(WehHeader, {
            title: this.props.title || "",
          }),
          React.createElement(
            "main",
            {
              className: "alert-dialog-content",
            },
            textContent &&
              React.createElement(
                "div",
                {
                  className: this.props.centered ? "centered" : "",
                },
                textContent,
              ),
          ),
          React.createElement(
            "footer",
            null,
            React.createElement(
              "div",
              null,
              this.props.notAgain &&
                React.createElement(
                  "div",
                  {
                    className: "not-again",
                  },
                  React.createElement("input", {
                    type: "checkbox",
                    onChange: this.createNotAgainChangeHandler(),
                    value: this.state.notAgain,
                    id: "not-again",
                  }),
                  React.createElement(
                    "label",
                    {
                      htmlFor: "not-again",
                    },
                    this.props.notAgain,
                  ),
                ),
              this.props.buttons &&
                React.createElement(
                  "div",
                  {
                    className: "btn btn-toolbar float-right",
                  },
                  buttonElements,
                ),
            ),
          ),
          React.createElement(ReactResizeDetector, {
            handleHeight: !0,
            onResize: this.createResizeHandler(),
          }),
        );
      }
    });

    render(
      React.createElement(
        "div",
        {
          className: "weh-shf auto-height",
        },
        React.createElement(
          Provider,
          {
            store: alertStore,
          },
          React.createElement(ConnectedAlertDialog, null),
        ),
      ),
      document.getElementById("root"),
    );
  });
})();
