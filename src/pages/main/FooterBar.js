import React from 'react';

import {generator} from '../utility/Generator';
import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';

export class FooterBar extends ReducerBase {
  render() {
    let content = store.getState().main.content;
    let list = generator.socialLink(content.social_list);
    let information = content.information;

    return (
        <footer className="footer-distributed">
          <div className="footer-left">
            <h4>{content.name}</h4>

				    <p className="footer-company-name" style={{marginTop: '15px'}}>
              {information.company}
            </p>

            <p className="footer-company-about" style={{marginTop: '15px'}}>
              {information.detail}
            </p>
			    </div>

			    <div className="footer-center">
            <div>
              <i className="fa fa-phone"/>
              <p><span>{information.mobile}</span></p>
            </div>
            <div>
              <i className="fa fa-envelope"/>
              <p><a href={`mailto:${information.email}`}><span>{information.email}</span></a></p>
            </div>
            <div>
              <i className="fa fa-map-marker"/>
              <p><span>{information.address}</span></p>
            </div>
            <div>
              <i className="fa fa-comment-o"/>
              <p><span>ID: {information.line.id}</span></p>
            </div>
            <div>
              <img src={information.line.code} role="presentation" className="img-code" />
            </div>
          </div>

			    <div className="footer-right">
            <h4>Connect with us</h4>
				    <div className="footer-icons">
					     {list}
				    </div>
			   </div>

		</footer>
    );
  }
}

export default FooterBar;
