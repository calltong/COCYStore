import React from 'react';

import {actions} from '../../actions/Action';
import {ga} from '../../utility/ga';
import {store} from '../../store';
import {ReducerBase} from '../ReducerBase';
import OrderPanel from '../order/OrderPanel';
import OrderStatus from '../order/OrderStatus';
import OrderAddress from '../order/OrderAddress';

export default class OrderTracking extends ReducerBase {
  componentDidMount() {
    ga.view();
    let id = this.props.params.id;
    let data = store.getState().tracking.data;
    if (data._id !== id) {
      actions.tracking.getItem(id);
    }
  }

  render() {
    let tracking = store.getState().tracking.data;
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <h4>รหัสสั่งซื้อสินค้า: {tracking._id}</h4>
          <hr />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderStatus data={tracking} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderPanel data={tracking} />
          <OrderAddress data={tracking.shipping} />
        </div>
      </div>

    </div>
    );
  }
}
