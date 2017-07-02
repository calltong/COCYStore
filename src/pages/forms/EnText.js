import React, { Component } from 'react';

export class EnText extends Component {
  value() {
    return this.refs.textInput.value;
  }

  clear() {
    this.refs.textInput.value = '';
  }

  render() {
    return (
      <input ref={this.props.name || 'enInput'}
        id={this.props.id}
        type={this.props.type || 'text'}
        className={`form-control ${this.props.className || ''}`}
        style={this.props.style}
        placeholder={this.props.placeholder || ''}
        value={this.props.value}
        size={this.props.size}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyPress={this.props.onKeyPress}
        readOnly={this.props.readOnly || false}
        disabled={this.props.disabled || false}
      />
    );
  }
}

export default EnText;
