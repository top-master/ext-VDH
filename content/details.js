"use strict";

/** @typedef {import("./ui-types").DetailsAction} DetailsAction */
/** @typedef {import("./ui-types").DetailsStoreState} DetailsStoreState */
/** @typedef {import("./ui-types").DetailsValueRowProps} DetailsValueRowProps */
/** @typedef {import("./ui-types").EmptyProps} EmptyProps */
/** @typedef {import("./ui-types").HitDetailsProps} HitDetailsProps */
/** @typedef {import("./ui-types").HitLike} HitLike */

(() => {
  weh.is_safe.then(() => {
    /**
     * @param {DetailsStoreState} currentState
     * @param {DetailsAction} action
     * @returns {DetailsStoreState}
     */
    function detailsStateReducer(currentState = { hit: null }, action) {
      if (action.type == "setHit") {
        return {
          hit: action.payload,
        };
      }

      if (action.type == "setError") {
        return {
          error: action.payload,
          hit: null,
        };
      }

      return currentState;
    }

    const detailsStore = createStore(detailsStateReducer);
    const hitId = decodeURIComponent(new URL(document.URL).hash.substr(1));

    weh.rpc
      .call("getHit", hitId)
      .then(
        /** @param {HitLike | null} hit */
        (hit) => {
          if (hit) {
            detailsStore.dispatch({
              type: "setHit",
              payload: hit,
            });
          } else {
            detailsStore.dispatch({
              type: "setError",
              payload: weh._("no_such_hit"),
            });
          }
        },
      )
      .catch(
        /** @param {{ message?: string }} error */
        (error) => {
          detailsStore.dispatch({
            type: "setError",
            payload: error.message || "Unknown error",
          });
        },
      );

    class DetailsValueRow extends React.Component {
      /**
       * @param {DetailsValueRowProps} props
       */
      constructor(props) {
        super(props);
      }

      renderFieldValue() {
        if (this.props.name == "thumbnailUrl" || this.props.name == "thumbnail") {
          return React.createElement(
            "div",
            null,
            React.createElement("img", {
              src: this.props.value,
            }),
            React.createElement("br", null),
            React.createElement(
              "div",
              {
                className: "details-value",
              },
              this.props.value,
            ),
          );
        }

        if (this.props.value === null) {
          return React.createElement(
            "div",
            null,
            React.createElement("em", null, "null"),
          );
        }

        if (typeof this.props.value == "object") {
          return React.createElement(ReactJson, {
            src: this.props.value,
            name: null,
            collapsed: !0,
            enableClipboard: !1,
            collapseStringsAfterLength: 64,
            displayDataTypes: !1,
            displayObjectSize: !1,
            style: {
              display: "inline-block",
            },
          });
        }

        return React.createElement(
          "div",
          {
            className: "details-value",
          },
          String(this.props.value),
        );
      }

      render() {
        return React.createElement(
          "tr",
          null,
          React.createElement("td", null, this.props.name),
          React.createElement("td", null, this.renderFieldValue()),
        );
      }
    }

    var ConnectedHitDetailsTable = connect(
      /**
       * @param {DetailsStoreState} storeState
       * @returns {HitDetailsProps}
       */
      (storeState) => ({
        hit: storeState.hit,
        error: storeState.error,
      }),
    )(class HitDetailsTable extends React.Component {
      /**
       * @param {HitDetailsProps} props
       */
      constructor(props) {
        super(props);
      }

      renderLoadError() {
        return React.createElement(
          "div",
          {
            className: "details",
          },
          this.props.error,
        );
      }

      render() {
        if (this.props.error) {
          return this.renderLoadError();
        }

        if (!this.props.hit) {
          return null;
        }

        const fieldRows = Object.keys(this.props.hit)
          .sort()
          .map((fieldName) =>
            React.createElement(DetailsValueRow, {
              key: fieldName,
              name: fieldName,
              value: this.props.hit[fieldName],
            }),
          );

        return React.createElement(
          "table",
          {
            className: "details",
          },
          React.createElement("tbody", null, fieldRows),
        );
      }
    });

    render(
      React.createElement(
        Provider,
        {
          store: detailsStore,
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
              title: weh._("hit_details"),
            }),
            React.createElement(
              "main",
              null,
              React.createElement(ConnectedHitDetailsTable, null),
            ),
          ),
        ),
      ),
      document.getElementById("root"),
    );
    weh.setPageTitle(weh._("hit_details"));
  });
})();
