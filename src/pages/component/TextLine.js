import React from 'react';

export class TextLine extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-4 col-md-4">
          <p className={this.props.css?this.props.css:'summary-text'}>{this.props.name}</p>
        </div>
        <div className="col-xs-1 col-md-1">
          <p className={this.props.css?this.props.css:'summary-text'}>{this.props.value}</p>
        </div>
      </div>
    );
  }
}

export default TextLine;
