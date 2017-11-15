import React from 'react';
import { Link } from 'react-router-dom';

export default class Information extends React.Component {
  render() {
    let css = {
      color: this.props.css.color,
    };
    return (
      <div className="footer-section">
        <p className="footer-title">{this.props.data.title}</p>
        <p className="footer-menu"><Link to="/about-us" style={css}>ร้านของเรา</Link></p>
        <p className="footer-menu"><Link to="/how-to-buy" style={css}>การสั่งซื้อสินค้า</Link></p>
        <p className="footer-menu"><Link to="/condition" style={css}>เงื่อนไขการสั่งซื้อ</Link></p>
      </div>
    );
  }
}
