import React from '../externals/react.js';
import { weh } from '../core/runtime.js';

const localVar_Oa = { default: React };
const localVar_kc = { default: weh };
const localVar_K4 = localVar_kc.default.browser.runtime.getManifest();

export const WehHeader = class extends localVar_Oa.default.Component {
  close() {
    localVar_kc.default.rpc.call('closePanel', localVar_kc.default.uiName);
  }
  render() {
    var entryRef;
    if (this.props.title) {
      entryRef = this.props.title;
    } else {
      entryRef = localVar_K4.name;
    }
    var resultRef = {
      backgroundImage:
        'url('
        + (this.props.image || '/content2/icons/stable-color.png')
        + ')',
    };
    return localVar_Oa.default.createElement(
      'header',
      {
        className: 'weh-header',
        style: resultRef,
      },
      localVar_Oa.default.createElement(
        'span',
        {
          className: 'weh-header-title',
        },
        entryRef,
      ),
      localVar_Oa.default.createElement(
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
