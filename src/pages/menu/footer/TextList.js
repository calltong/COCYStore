import React from 'react';

export default class TextList extends React.Component {
  render() {
    let data = this.props.data;
    let content = data.items.map((item, index) => {
      return <p className="footer-menu" key={index}>{item.value}</p>;
    });

    return (
      <div className="footer-section">
        <p className="footer-title">{this.props.data.title}</p>
        {content}
      </div>
    );
  }
}
