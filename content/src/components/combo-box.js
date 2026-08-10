import React from '../externals/react.js';
import { InputField } from './input-field.js';

// A <select>, inheriting InputField's form-control styling (12em wide by default).
export class ComboBox extends InputField {
  controlStyle() {
    return {
      width: this.props.width || '12em',
    };
  }
  renderControl() {
    var optionsList = (this.props.options || []).map(entryRef =>
      React.createElement(
        'option',
        {
          key: entryRef.value,
          value: entryRef.value,
        },
        entryRef.name,
      ),
    );
    return React.createElement(
      'select',
      {
        className: this.controlClassName(),
        id: this.props.id,
        value: this.props.value,
        onChange: this.props.onChange,
        style: Object.assign({}, this.controlStyle(), this.props.style),
      },
      optionsList,
    );
  }
}
