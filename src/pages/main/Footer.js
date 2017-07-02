import React from 'react';
import { Link } from 'react-router';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';

export class Footer extends ReducerBase {
  socialLink(list) {
    let i = 0;
    return list.map(item => {
      let btn = '';
      if (item.name === 'facebook') {
        btn = (
          <a target="_blank" href={item.url} >
            <i className='fa fa-facebook-square' /> Facebook
          </a>
        );
      } else if (item.name === 'instagram') {
        btn = (
          <a target="_blank" href={item.url} >
            <i className='fa fa-instagram' /> Instagram
          </a>
        );
      } else if (item.name === 'youtube') {
        btn = (
          <a target="_blank" href={item.url} >
            <i className='fa fa-youtube-square' /> Youtube
          </a>
        );
      } else if (item.name === 'line') {
        btn = (
          <a href={item.url}>
            <span>@</span>Line
          </a>
        );
      }

      return (
        <p className="footer-connent" key={i++}>
          {btn}
        </p>);
    });
  }

  render() {
    let content = store.getState().main.content;
    let list = this.socialLink(content.social_list);
    let information = content.information;

    return (
      <footer className="footer">
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="footer-section">
              {list}
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="footer-section">
              <p className="footer-menu"><Link to="/store">ร้านของเรา</Link></p>
              <p className="footer-menu"><Link to="/account">ประวัติการสั่งซื้อ</Link></p>
              <p className="footer-menu"><Link to="/howorder">วิธีการสั่งซื้อ</Link></p>
              <p className="footer-menu"><Link to="/howorder">เงื่อนไขการสั่งซื้อ</Link></p>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="footer-section">
              <p className="footer-menu">ติดต่อเรา</p>
              <p><span>{information.mobile}</span></p>
              <p className="footer-menu"><a href={`mailto:${information.email}`}><span>{information.email}</span></a></p>
              <p><span>Line: {information.line}</span></p>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="footer-section">
              <p className="footer-company-name">{content.name}</p>
              <p className="footer-company-about">
                {information.detail}
              </p>
            </div>
          </div>
			  </div>
		 </footer>
    );
  }
}

export default Footer;
