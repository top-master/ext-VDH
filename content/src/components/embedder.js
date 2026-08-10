import React from '../externals/react.js';
import ReactResizeDetector from '../externals/react-resize-detector.js';

// Wraps embedded content and reports its height to the parent frame.
export class Embedder extends React.Component {
  _onResize(...entryRef) {
    parent.postMessage('height ' + (entryRef[1] + 0), '*');
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(ReactResizeDetector, {
        handleHeight: !0,
        onResize: this._onResize.bind(this),
      }),
      this.props.children,
    );
  }
}
