import React from 'react';
import swal from 'sweetalert';

import OrderList from './OrderList';
import EnButton from '../forms/EnButton';

import {actions} from '../../actions/Action';
import {store} from '../../store';

export class OrderPanel extends React.Component {
  checkoutByGuest() {
    let data = store.getState().order.data;
    if (data.display_list.length === 0) {
      swal({
        title: 'รายการสินค้า',
        text: 'กรุณาเลือกสินค้าก่อนนะค่ะ',
        timer: 3000,
        showConfirmButton: true,
      });
      actions.tracking.action('Order Checkout', 'checkout by guest-none cart ', 'Order');
    } else {
      actions.tracking.action('Order Checkout', 'checkout by guest', 'Order');
      store.update('CUSTOMER_CREATE', {next: '/payment'});
    }
  }

  render() {
    let data = this.props.data;
    let footer = <div />;
    if (this.props.disable === undefined) {
      footer = (
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-8">
              <button type="button"
                className="btn btn-normal btn-summary-size pull-right"
                onClick={this.checkoutByGuest.bind(this)} >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="panel panel-order">
        <div className="panel-heading">
          รายการสินค้า
        </div>
        <div className="panel-body" style={{padding:'8px'}}>
          <OrderList data={data} />
        </div>
        {footer}
      </div>
    );
  }
}

export default OrderPanel;
