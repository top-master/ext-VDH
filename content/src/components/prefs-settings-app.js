import React from '../externals/react.js';

const reactRef = { default: React };

export const PrefsSettingsApp = class extends reactRef.default.Component {
  render() {
    return reactRef.default.createElement(
      'form',
      {
        className: 'weh-shf',
        noValidate: !0,
        onSubmit: entryRef => entryRef.preventDefault(),
      },
      reactRef.default.createElement('div', null, this.props.children),
    );
  }
};
