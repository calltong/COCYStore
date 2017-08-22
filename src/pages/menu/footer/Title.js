import React from 'react';

export default class Title extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className="footer-section">
        <p className="footer-title">{data.title}</p>
        <p className="footer-description">{data.description}</p>
      </div>
    );
  }
}
