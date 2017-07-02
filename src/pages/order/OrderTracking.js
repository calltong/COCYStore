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
    store.update('ORDER_GET_TRACKING', {id: id});
    actions.tracking.view();
  }

  render() {
    let order = store.getState().order;
    let tracking = order.tracking;
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-4 col-md-4">
          <OrderStatus data={tracking}/>
        </div>

        <div className="col-xs-12 col-sm-8 col-md-8">
          <OrderPanel
            id={tracking._id}
            data={tracking}/>
          <OrderAddress
            data={tracking.shipping}/>
        </div>
      </div>

    </div>
    );
  }
}

export default OrderTracking;
