'use strict';

/** @typedef {import("./ui-types").EmptyProps} EmptyProps */
/** @typedef {import("./ui-types").LogDetailsEmbedState} LogDetailsEmbedState */
/** @typedef {import("./ui-types").LogEntryResponse} LogEntryResponse */
(() => {
  /**
   * The details view renders into a <pre>, so it needs text. Details are
   * normally a string (the error stack, carrying the injected context block),
   * but render anything else as pretty JSON rather than blanking the view.
   *
   * @param {unknown} details
   * @returns {string | null}
   */
  function formatLogDetails(details) {
    if (details === null || details === void 0 || details === '') {
      return null;
    }
    if (typeof details == 'string') {
      return details;
    }
    try {
      return JSON.stringify(details, null, 2);
    } catch {
      return String(details);
    }
  }

  /**
   * What the copy button puts on the clipboard. An error stack already opens
   * with the message line - don't duplicate it there, the UI title is enough.
   *
   * @param {string | null} message
   * @param {string | null} details
   * @returns {string}
   */
  function clipboardText(message, details) {
    if (details && message && details.includes(message)) {
      return details;
    }
    return [message, details].filter(Boolean).join('\n\n');
  }

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
          copied: false,
        };
        const logEntryId = decodeURIComponent(
          new URL(document.URL).hash.substr(1),
        );
        weh.rpc.call('getLogEntry', logEntryId).then(
          /** @param {LogEntryResponse} logEntry */
          logEntry => {
            this.setState({
              message: logEntry.message,
              details: formatLogDetails(logEntry.details),
            });
          },
        );
      }
      copyToClipboard() {
        const text = clipboardText(this.state.message, this.state.details);
        navigator.clipboard.writeText(text).then(() => {
          this.setState({ copied: true });
          setTimeout(() => this.setState({ copied: false }), 2000);
        });
      }
      renderCopyButton() {
        // clipboard body + clip glyph, plus a check mark once copied
        // (Bootstrap Icons "clipboard"/"clipboard-check", MIT).
        const iconPaths = [
          'M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z',
          'M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z',
        ];
        if (this.state.copied) {
          iconPaths.push(
            'M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z',
          );
        }
        return React.createElement(
          'button',
          {
            className: 'btn btn-outline-secondary copy-details',
            type: 'button',
            title: this.state.copied ? 'Copied' : 'Copy',
            onClick: () => this.copyToClipboard(),
          },
          React.createElement(
            'svg',
            {
              width: 14,
              height: 14,
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              'aria-hidden': 'true',
            },
            iconPaths.map((pathData, pathIndex) =>
              React.createElement('path', { key: pathIndex, d: pathData }),
            ),
          ),
        );
      }
      render() {
        return React.createElement(
          'div',
          {
            // log-details-embed scopes the override that disables <main>'s own
            // scrollbar (the shell gives main overflow-y:auto) - the details
            // <pre> is the only scroller in this embed.
            className: 'weh-shf embeddable log-details-embed',
          },
          React.createElement(
            'div',
            null,
            React.createElement(
              'main',
              null,
              React.createElement(
                'div',
                {
                  className: 'log-details',
                },
                React.createElement(
                  'div',
                  {
                    className: 'message',
                  },
                  this.state.message
                    && React.createElement(
                      'div',
                      {
                        className: 'message-header',
                      },
                      React.createElement('h3', null, this.state.message),
                      this.renderCopyButton(),
                    ),
                  this.state.details
                    && React.createElement('pre', null, this.state.details),
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
        React.createElement(LogDetailsEmbed, null),
      ),
      document.getElementById('root'),
    );
  });
})();
