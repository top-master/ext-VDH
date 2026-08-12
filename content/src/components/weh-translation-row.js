import React from '../externals/react.js';
import { connect } from '../externals/react-redux.js';
import { bindActionCreators } from '../externals/redux.js';
import { weh } from '../core/runtime.js';

const reactRef = { default: React };
const browserRef = { browser: weh.browser };

export const WehTranslationRow = connect(
  (valueRef, entryRef) => {
    var resultRef = valueRef.translate.custom[entryRef.keyName];
    var countRef = resultRef;
    if (typeof valueRef.translate.modified[entryRef.keyName] < 'u') {
      countRef = valueRef.translate.modified[entryRef.keyName];
    }
    return {
      value: countRef || '',
      orgValue: resultRef || '',
    };
  },
  valueRef =>
    bindActionCreators(
      {
        updateString: (entryRef, resultRef) => ({
          type: 'UPDATE_STRING',
          payload: {
            key: entryRef,
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
        orgValue: this.props.orgValue || '',
      };
      var entryRef = 4;
      var resultRef = new Array(entryRef)
        .fill('')
        .map((countRef, optionRef) => '$ARG' + (optionRef + 1) + '$');
      this.defaultString = browserRef.browser.i18n.getMessage(
        this.props.keyName,
        resultRef,
      );
      this.handleChange = this.handleChange.bind(this);
      this.formClass = this.formClass.bind(this);
    }
    componentWillReceiveProps(valueRef) {
      this.setState({
        value: valueRef.value || '',
        orgValue: valueRef.orgValue || '',
      });
    }
    formClass(valueRef = '') {
      if (this.state.value !== this.state.orgValue) {
        return valueRef + 'success';
      } else {
        if (this.state.value !== '') {
          return valueRef + 'warning';
        } else {
          return '';
        }
      }
    }
    handleChange(valueRef) {
      var entryRef = valueRef.target.value;
      this.setState({
        value: entryRef,
      });
      this.props.updateString(this.props.keyName, entryRef);
    }
    render() {
      return reactRef.default.createElement(
        'div',
        {
          className: 'form-group row ' + this.formClass('has-'),
        },
        reactRef.default.createElement(
          'label',
          {
            className: 'col-4 col-form-label',
            htmlFor: 'weh-' + this.props.keyName,
            title: this.props.keyName,
          },
          this.props.keyName,
        ),
        reactRef.default.createElement(
          'div',
          {
            className: 'col-8',
          },
          reactRef.default.createElement('input', {
            className: 'form-control',
            onChange: this.handleChange,
            value: this.state.value,
            type: 'text',
            id: 'weh-' + this.props.keyName,
          }),
          reactRef.default.createElement(
            'div',
            {
              className: 'form-text',
            },
            reactRef.default.createElement('em', null, this.defaultString),
          ),
        ),
      );
    }
  },
);
