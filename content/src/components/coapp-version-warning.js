import React from '../externals/react.js';
import { Tooltip } from '../tooltip/tooltip.tsx';

// Unique id per instance so each tooltip panel has its own aria target.
let nextWarningId = 1;

// A warning-sign icon shown next to a setting whose backing feature needs a
// newer CoApp than may be installed. On hover/focus it reveals a tooltip naming
// the required version; that version is passed through `version` and filled into
// the shared message. Reuses the vendored Tooltip (content/src/tooltip).
export const CoappVersionWarning = class extends React.Component {
  constructor(props) {
    super(props);
    this.id = 'coapp-version-warning-' + nextWarningId++;
  }
  render() {
    return React.createElement(
      Tooltip,
      {
        id: this.id,
        title:
          'This feature is only available in v'
          + this.props.version
          + ' of the CoApp.',
      },
      React.createElement(
        'span',
        {
          className: 'coapp-version-warning',
          'aria-describedby': this.id,
          role: 'img',
          'aria-label': 'CoApp version warning',
          tabIndex: 0,
        },
        '⚠',
      ),
    );
  }
};
