import React, {Component} from 'react';

export default class EnImage extends Component {

  render() {
    let style = this.props.style || {};

    if (this.props.border) {
      style.borderWidth = 1;
      style.borderRadius = 1;
      style.borderColor = '#ccc';
      style.borderStyle = 'solid';
    }

    return (
      <img role="presentation"
        className={this.props.className}
        style={style}
        src={this.props.src || this.props.placeholder}
        width={this.props.width}
        height={this.props.height}
        onClick={this.props.onClick}
      />
    );
  }

}
