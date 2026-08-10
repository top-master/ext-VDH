import React from '../externals/react.js';

const localVar_qt = { default: React };

export const PrefsSettingsApp = class extends localVar_qt.default.Component {
  render() {
    return localVar_qt.default.createElement(
      'form',
      {
        className: 'weh-shf',
        noValidate: !0,
        onSubmit: entryRef => entryRef.preventDefault(),
      },
      localVar_qt.default.createElement('div', null, this.props.children),
    );
  }
};
