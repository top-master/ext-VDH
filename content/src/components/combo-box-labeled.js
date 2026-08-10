import React from '../externals/react.js';
import { ComboBox } from './combo-box.js';

// A ComboBox wrapped in the labeled form-group row, matching how WehParam lays
// out its controls so standalone combo-boxes line up with the settings list.
export class ComboBoxLabeled extends ComboBox {
  render() {
    return React.createElement(
      'div',
      {
        className: 'form-group row ' + (this.props.formGroupClass || ''),
      },
      React.createElement(
        'label',
        {
          className: 'col-3 col-form-label',
          htmlFor: this.props.id,
        },
        this.props.label,
      ),
      React.createElement(
        'div',
        {
          className: 'col-8',
        },
        this.renderControl(),
        this.props.description
          && React.createElement(
            'div',
            {
              className: 'form-text',
            },
            React.createElement('em', null, this.props.description),
          ),
      ),
    );
  }
}
