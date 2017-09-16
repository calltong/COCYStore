import React from 'react';

import {actions} from '../../actions/Action';
import {store} from '../../store';
import {ReducerBase} from '../ReducerBase';
import OrderPanel from './OrderPanel';
import OrderStatus from './OrderStatus';
import OrderAddress from './OrderAddress';

export class OrderTracking extends ReducerBase {
  componentDidMount() {
    let id = this.props.params.id;
    actions.order.getOrderByTracking(id);
    actions.tracking.view();
  }

  render() {
    let order = store.getState().order;
    let tracking = order.tracking;
    return (
    <div className="container summary-form">
      <h4>รหัสสั่งซื้อสินค้า: {tracking._id}</h4>
      <hr />
      <br />
      <div className="row">
        <div className="col-xs-12 col-sm-4 col-md-4">
          <OrderStatus data={tracking}/>
        </div>

        <div className="col-xs-12 col-sm-8 col-md-8">
          <OrderPanel disable data={tracking}/>
          <OrderAddress data={tracking.shipping}/>
        </div>
      </div>

    </div>
    );
  }
}

export default OrderTracking;
