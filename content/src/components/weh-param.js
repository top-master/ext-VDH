import React from '../externals/react.js';
import { connect } from '../externals/react-redux.js';
import { bindActionCreators } from '../externals/redux.js';
import { weh } from '../core/runtime.js';
import { ComboBox } from './combo-box.js';

// Aliases so the mangled class body (kept verbatim) resolves to the module imports.
const localVar_qt = { default: React };
const localVar_Rn = { default: weh };
const localVar_Xr = connect;
const helperFn_gr = bindActionCreators;
let numVar_H4 = 1;

export const WehParam = localVar_Xr(
  (valueRef, entryRef) => ({
    initialValue: valueRef.prefs.values[entryRef.prefName] || '',
    value: valueRef.prefs.current[entryRef.prefName] || '',
    spec: valueRef.prefs.specs[entryRef.prefName] || {},
  }),
  valueRef =>
    helperFn_gr(
      {
        updateCurrentPref: (entryRef, resultRef) => ({
          type: 'PREF_UPDATE',
          payload: {
            prefName: entryRef,
            value: resultRef,
          },
        }),
      },
      valueRef,
    ),
)(
  class extends localVar_qt.default.Component {
    constructor(valueRef) {
      super(valueRef);
      this.state = {
        value: this.props.value || '',
        spec: this.props.spec,
      };
      this.paramIndex = numVar_H4++;
      this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(valueRef) {
      this.setState({
        value: valueRef.value || '',
        spec: valueRef.spec,
      });
    }
    handleChange(valueRef) {
      var entryRef =
        this.state.spec.type == 'boolean'
          ? valueRef.target.checked
          : valueRef.target.value;
      this.setState({
        value: entryRef,
      });
      if (this.state.spec.type == 'integer') {
        entryRef = parseInt(entryRef);
      }
      if (this.state.spec.type == 'float') {
        entryRef = parseFloat(entryRef);
      }
      this.props.updateCurrentPref(this.props.prefName, entryRef);
    }
    setCustomValue(valueRef) {
      var entryRef = {
        target: {},
      };
      if (this.state.spec.type == 'boolean') {
        entryRef.target.checked = valueRef;
      } else {
        entryRef.target.value = valueRef;
      }
      this.handleChange(entryRef);
    }
    isValid(valueRef) {
      var entryRef = this.state.spec;
      if (arguments.length === 0) {
        valueRef = this.state.value;
      }
      if (entryRef) {
        return localVar_Rn.default.unsafe_prefs.isValid(
          this.props.prefName,
          valueRef,
        );
      } else {
        return !1;
      }
    }
    formGroupClass() {
      if (this.isValid()) {
        if (this.state.value != this.props.initialValue) {
          return 'has-success';
        } else {
          if (this.state.value != this.state.spec.defaultValue) {
            return 'has-warning';
          } else {
            return '';
          }
        }
      } else {
        return 'has-danger';
      }
    }
    getInputWidth() {
      switch (this.state.spec.type) {
        case 'string':
          return this.state.spec.width || '20em';
        case 'integer':
        case 'float':
          return this.state.spec.width || '8em';
        case 'boolean':
          return '34px';
        case 'choice':
          return this.state.spec.width || '12em';
      }
    }
    renderInput() {
      switch (this.state.spec.type) {
        case 'string':
        case 'integer':
        case 'float':
          return localVar_qt.default.createElement('input', {
            className: 'form-control',
            value: this.state.value,
            onChange: this.handleChange,
            maxLength: this.state.spec.maxLength || -1,
            id: 'weh-param-' + this.paramIndex,
            type: 'text',
            style: {
              width: this.getInputWidth(),
            },
          });
        case 'boolean':
          return localVar_qt.default.createElement(
            'div',
            null,
            localVar_qt.default.createElement('input', {
              className: 'form-control',
              checked: this.state.value,
              onChange: this.handleChange,
              id: 'weh-param-' + this.paramIndex,
              type: 'checkbox',
              style: {
                width: '34px',
              },
            }),
          );
        case 'choice':
          if ((this.state.spec.choices || []).length === 0) {
            return !1;
          }
          return localVar_qt.default.createElement(ComboBox, {
            value: this.state.value,
            onChange: this.handleChange,
            id: 'weh-param-' + this.paramIndex,
            options: this.state.spec.choices,
            width: this.getInputWidth(),
          });
      }
    }
    render() {
      return localVar_qt.default.createElement(
        'div',
        {
          className: 'form-group row ' + this.formGroupClass(),
        },
        localVar_qt.default.createElement(
          'label',
          {
            className: 'col-3 col-form-label',
            htmlFor: 'weh-param-' + this.paramIndex,
          },
          this.state.spec.label,
        ),
        localVar_qt.default.createElement(
          'div',
          {
            className: 'col-8',
          },
          (this.props.renderInput && this.props.renderInput.call(this))
            || this.renderInput(),
          this.state.spec.description
            && localVar_qt.default.createElement(
              'div',
              {
                className: 'form-text',
              },
              localVar_qt.default.createElement(
                'em',
                null,
                this.state.spec.description,
              ),
            ),
        ),
      );
    }
  },
);
