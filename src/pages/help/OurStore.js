import React from 'react';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';

export class OurStore extends ReducerBase {
  render() {
    let content = store.getState().main.content;
    let information = content.information;

    let list = content.shop_list.map((item, index) => {
      return (
      <div key={index + 100}>
        <hr />
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6">
            <img className="store-map" src={item.map} role="presentation" />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6">
            <h3>{item.name}</h3>
            <address>
              {item.address}
            </address>
            <p>Mobile: {item.mobile}</p>
          </div>
        </div>
      </div>
      );
    });
    return (
      <div className="store-page">
        <div className="row">
          <div className="col-md-12">
            <h3>{information.company}</h3>
            <p>{information.detail}</p>
            <address>{information.address}</address>
            <p>email: {information.email} line: {information.line}</p>
          </div>
        </div>

        {list}
      </div>
    );
  }
}

export default OurStore;
