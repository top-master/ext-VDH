import React from '../externals/react.js';
import { connect } from '../externals/react-redux.js';
import { bindActionCreators } from '../externals/redux.js';
import { weh } from '../core/runtime.js';

const localVar_qt = { default: React };
const localVar_Rn = { default: weh };
const localVar_Xr = connect;
const helperFn_gr = bindActionCreators;

export const WehPrefsControls = localVar_Xr(
  valueRef => ({
    flags: valueRef.prefs.flags || {},
  }),
  valueRef =>
    helperFn_gr(
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
  class extends localVar_qt.default.Component {
    render() {
      return this.props.render.call(this);
    }
  },
);
function helperFn_S5(valueRef) {
  let entryRef = localVar_Rn.default.unsafe_prefs;
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

export const listenPrefs = helperFn_S5;
