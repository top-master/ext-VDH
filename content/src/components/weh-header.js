import React from '../externals/react.js';
import { weh } from '../core/runtime.js';

const reactRef = { default: React };
const wehRef = { default: weh };
const manifest = wehRef.default.browser.runtime.getManifest();

export const WehHeader = class extends reactRef.default.Component {
  close() {
    wehRef.default.rpc.call('closePanel', wehRef.default.uiName);
  }
  render() {
    var entryRef;
    if (this.props.title) {
      entryRef = this.props.title;
    } else {
      entryRef = manifest.name;
    }
    var resultRef = {
      backgroundImage:
        'url('
        + (this.props.image || '/content2/icons/stable-color.png')
        + ')',
    };
    return reactRef.default.createElement(
      'header',
      {
        className: 'weh-header',
        style: resultRef,
      },
      reactRef.default.createElement(
        'span',
        {
          className: 'weh-header-title',
        },
        entryRef,
      ),
      reactRef.default.createElement(
        'span',
        {
          className: 'weh-header-close',
          style: {
            float: 'right',
          },
          onClick: this.close,
        },
        '⊗',
      ),
      this.props.children,
    );
  }
};
