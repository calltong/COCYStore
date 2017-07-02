import React from 'react';

import {store} from '../../store';
import {ReducerBase} from '../ReducerBase';

export class HowOrder extends ReducerBase {
  render() {
    let state = store.getState();
    let list = state.main.content.condition_list;
    let conditions = list.map((item, index) => {
      return (<li key={index}>{item}</li>);
    });

    return (
      <div className="help-page">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3">
            <div className="help-step-order">
              <span>1</span>
              <p>เลือกสินค้า/ขนาดสินค้าและกดสั่งซื้อ</p>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3">
            <div className="help-step-order">
              <span>2</span>
              <p>แจ้งโอนผ่านเวป หรือ Line, Facebook และใส่ชื่อที่อยู่ในการจัดส่ง</p>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3">
            <div className="help-step-order">
              <span>3</span>
              <p>สินค้าจะส่งภายใน 48 ชมและลูกค้าจะได้รับแจ้งทาง Line หรือ Facebook</p>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3">
            <div className="help-step-order">
              <span>4</span>
              <p>ลูกค้าได้รับสินค้าแล้ว</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <p>เงื่อนไขการสั่งซื้อ</p>
            <ul style={{listStyleType: 'circle'}}>
              {conditions}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default HowOrder;
