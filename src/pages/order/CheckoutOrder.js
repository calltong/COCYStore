import React from 'react';
import swal from 'sweetalert';
import {browserHistory} from 'react-router';

import {actions} from '../../actions/Action';
import {store} from '../../store';
import {manager} from '../../utility/Manager';

import {ReducerBase} from '../ReducerBase';
import OrderMenu from './OrderMenu';
import UserNone from '../main/UserNone';
import UserLogin from '../main/UserLogin';

import OrderPanel from './OrderPanel';

export class CheckoutOrder extends ReducerBase {
  componentDidMount() {
    actions.tracking.view();
    manager.SetOnTop();
  }

  checkout(customer) {
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
      actions.tracking.action('Order Checkout', 'checkout', 'Order');
      if (data.status === 'order') {
        let shipping = {
          name: customer.name,
          address: customer.information.address,
          city: customer.information.city,
          postcode: customer.information.postcode,
          mobile: customer.information.mobile,
          email: customer.email,
        };
        store.update('ORDER_SAVE', {
          customer_id: customer._id,
          status: 'order',
          shipping: shipping,
          next: '/payment',
        });
      } else {
        browserHistory.push('/payment');
      }
    }
  }

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
    let state = store.getState();
    let customer = state.customer;
    let order = state.order.data;
    /*
    let menu = function(status, me) {
      if (status === true) {
        return (
          <UserLogin
            data={customer.data}
            checkout={me.checkout.bind(this)} />
          );
      } else {
        return (
          <UserNone
            checkoutEmail={me.checkout.bind(this)}
            checkoutGuest={me.checkoutByGuest.bind(this)} />
          );
      }

    }(customer.login.status, this);
    */
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderMenu status={'order'}/>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-8 col-md-offset-2">
          <OrderPanel data={order}/>
        </div>
      </div>

    </div>
    );
  }
}

export default CheckoutOrder;
