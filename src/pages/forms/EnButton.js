import React, { Component } from 'react';

export class EnButton extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={this.props.className}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default EnButton;
