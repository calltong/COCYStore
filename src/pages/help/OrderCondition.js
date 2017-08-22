import React from 'react';
import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

export class OrderCondition extends ReducerBase {
  componentDidMount() {
    actions.page.getOrderCondition();
  }

  render() {
    let doc = store.getState().page.order_condition;
    let conditions = doc.data.list.map((item, index) => {
      return (<li key={index}>{item.title}</li>);
    });

    return (
      <div className="condition-page">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h4>เงื่อนไขการสั่งซื้อ</h4>
            <ul style={{listStyleType: 'circle'}}>
              {conditions}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCondition;
