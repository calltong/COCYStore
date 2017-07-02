import React, {Component} from 'react';

export default class EnNumberText extends Component {

  value() {
    return this.refs.numberInput.value;
  }

  clear() {
    this.refs.textInput.value = '';
  }

  handleKeyPress(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
      <input ref="numberInput"
        type={this.props.type || 'text'}
        className={`form-control ${this.props.className || ''}`}
        style={this.props.style}
        placeholder={this.props.placeholder || ''}
        value={this.props.value}
        readOnly={this.props.readOnly || false}
        disabled={this.props.disabled || false}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    );
  }

}
