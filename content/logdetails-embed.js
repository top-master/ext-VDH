"use strict";

/** @typedef {import("./ui-types").EmptyProps} EmptyProps */
/** @typedef {import("./ui-types").LogDetailsEmbedState} LogDetailsEmbedState */
/** @typedef {import("./ui-types").LogEntryResponse} LogEntryResponse */

(() => {
  weh.is_safe.then(() => {
    class LogDetailsEmbed extends React.Component {
      /**
       * @param {EmptyProps} props
       */
      constructor(props) {
        super(props);
        /** @type {LogDetailsEmbedState} */
        this.state = {
          message: null,
          details: null,
        };

        const logEntryId = decodeURIComponent(new URL(document.URL).hash.substr(1));
        weh.rpc.call("getLogEntry", logEntryId).then(
          /** @param {LogEntryResponse} logEntry */
          (logEntry) => {
            this.setState({
              message: logEntry.message,
              details: logEntry.details,
            });
          },
        );
      }

      render() {
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
                  className: "log-details",
                },
                React.createElement(
                  "div",
                  {
                    className: "message",
                  },
                  this.state.message && React.createElement("h3", null, this.state.message),
                  this.state.details && React.createElement("pre", null, this.state.details),
                ),
              ),
            ),
          ),
        );
      }
    }

    render(
      React.createElement(Embedder, null, React.createElement(LogDetailsEmbed, null)),
      document.getElementById("root"),
    );
  });
})();
