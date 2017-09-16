import React from 'react';
import {browserHistory} from 'react-router';
import {actions} from '../../actions/Action';
import {store} from '../../store';
import {manager} from '../../utility/Manager';
import {ReducerBase} from '../ReducerBase';

import CustomerInfo from '../customer/CustomerInfo';
import RegisterUser from '../customer/RegisterUser';
import OrderMenu from './OrderMenu';

export class CheckoutCustomer extends ReducerBase {
  componentDidMount() {
    actions.tracking.view();
    manager.SetOnTop();
  }

  checkout() {
    let state = store.getState();
    let order = state.order.data;
    let customer = state.customer.data;
    let register_user = state.customer.register_user;
    if (register_user.disable === false) {
      customer.type = 'email';
      customer.email = register_user.email;
      customer.password = register_user.password;
    }

    order.shipping.name = customer.name;
    order.shipping.address = customer.information.address;
    order.shipping.city = customer.information.city;
    order.shipping.postcode = customer.information.postcode;
    order.shipping.mobile = customer.information.mobile;

    store.update('CUSTOMER_SAVE', {
      data: customer,
    });
    actions.order.save(undefined, 'working', order.shipping, true, `/tracking/${order._id}`);
    actions.tracking.action('Customer Checkout', 'checkout', 'Order');
  }

  backCheckout() {
    browserHistory.push('/payment');
    actions.tracking.action('Customer Checkout', 'back', 'Order');
  }

  render() {
    let customer = store.getState().customer;
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderMenu status={'customer'}/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-8 col-md-offset-2">
          <CustomerInfo
            checkout={this.checkout.bind(this)}
            backCheckout={this.backCheckout.bind(this)}
            data={customer.data}/>
        </div>
      </div>
    </div>
    );
  }
}

export default CheckoutCustomer;
