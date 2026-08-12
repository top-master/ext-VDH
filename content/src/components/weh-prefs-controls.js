import React from '../externals/react.js';
import { connect } from '../externals/react-redux.js';
import { bindActionCreators } from '../externals/redux.js';
import { weh } from '../core/runtime.js';

const reactRef = { default: React };
const wehRef = { default: weh };

export const WehPrefsControls = connect(
  valueRef => ({
    flags: valueRef.prefs.flags || {},
  }),
  valueRef =>
    bindActionCreators(
      {
        save: () => ({
          type: 'PREFS_SAVE',
        }),
        reset: () => ({
          type: 'PREFS_RESET',
        }),
        cancel: () => ({
          type: 'PREFS_CANCEL',
        }),
      },
      valueRef,
    ),
)(
  class extends reactRef.default.Component {
    render() {
      return this.props.render.call(this);
    }
  },
);
function listenPrefsImpl(valueRef) {
  let entryRef = wehRef.default.unsafe_prefs;
  entryRef.on(
    '',
    {
      pack: !0,
    },
    resultRef => {
      valueRef.dispatch({
        type: 'PREFS_UPDATED',
        payload: resultRef,
      });
    },
  );
  entryRef.on(
    '',
    {
      pack: !0,
      specs: !0,
    },
    resultRef => {
      valueRef.dispatch({
        type: 'PREFS_SPECS_UPDATED',
        payload: resultRef,
      });
    },
  );
}

export const listenPrefs = listenPrefsImpl;
