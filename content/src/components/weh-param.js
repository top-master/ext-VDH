import React from '../externals/react.js';
import { connect } from '../externals/react-redux.js';
import { bindActionCreators } from '../externals/redux.js';
import { weh } from '../core/runtime.js';
import { ComboBox } from './combo-box.js';

// Aliases so the mangled class body (kept verbatim) resolves to the module imports.
const reactRef = { default: React };
const wehRef = { default: weh };
let nextParamIndex = 1;

export const WehParam = connect(
  (valueRef, entryRef) => ({
    initialValue: valueRef.prefs.values[entryRef.prefName] || '',
    value: valueRef.prefs.current[entryRef.prefName] || '',
    spec: valueRef.prefs.specs[entryRef.prefName] || {},
  }),
  valueRef =>
    bindActionCreators(
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
  class extends reactRef.default.Component {
    constructor(valueRef) {
      super(valueRef);
      this.state = {
        value: this.props.value || '',
        spec: this.props.spec,
      };
      this.paramIndex = nextParamIndex++;
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
        return wehRef.default.unsafe_prefs.isValid(
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
          return reactRef.default.createElement('input', {
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
          return reactRef.default.createElement(
            'div',
            null,
            reactRef.default.createElement('input', {
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
          return reactRef.default.createElement(ComboBox, {
            value: this.state.value,
            onChange: this.handleChange,
            id: 'weh-param-' + this.paramIndex,
            options: this.state.spec.choices,
            width: this.getInputWidth(),
          });
      }
    }
    render() {
      return reactRef.default.createElement(
        'div',
        {
          className: 'form-group row ' + this.formGroupClass(),
        },
        reactRef.default.createElement(
          'label',
          {
            className: 'col-3 col-form-label',
            htmlFor: 'weh-param-' + this.paramIndex,
          },
          this.state.spec.label,
        ),
        reactRef.default.createElement(
          'div',
          {
            className: 'col-8',
          },
          (this.props.renderInput && this.props.renderInput.call(this))
            || this.renderInput(),
          this.state.spec.description
            && reactRef.default.createElement(
              'div',
              {
                className: 'form-text',
              },
              reactRef.default.createElement(
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
