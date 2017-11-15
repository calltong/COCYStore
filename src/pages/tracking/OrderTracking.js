import React from 'react';
import {observer, inject} from 'mobx-react';

import {ga} from '../../utility/ga';

import OrderPanel from '../order/OrderPanel';
import OrderStatus from '../order/OrderStatus';
import OrderAddress from '../order/OrderAddress';

export class OrderTracking extends React.Component {
  componentDidMount() {
    ga.view();
    let id = this.props.match.params.id;
    let data = this.props.tracking.toJS().data;
    if (data._id !== id) {
      this.props.tracking.getItem(id);
    }
  }

  render() {
    let tracking = this.props.tracking.toJS().data;
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

export default inject('tracking')(observer(OrderTracking));
