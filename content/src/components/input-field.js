import React from '../externals/react.js';

// Base of the shared form-control hierarchy: a bare form control (a text input by
// default). ComboBox/ComboBoxLabeled extend it so every combo-box shares one
// styling and layout instead of each caller repeating the CSS.
export class InputField extends React.Component {
  controlClassName() {
    return 'form-control';
  }
  controlStyle() {
    return this.props.width ? { width: this.props.width } : {};
  }
  renderControl() {
    return React.createElement('input', {
      className: this.controlClassName(),
      id: this.props.id,
      type: this.props.type || 'text',
      value: this.props.value,
      onChange: this.props.onChange,
      style: Object.assign({}, this.controlStyle(), this.props.style),
    });
  }
  render() {
    return this.renderControl();
  }
}
