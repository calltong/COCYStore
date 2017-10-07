import React from 'react';
import {browserHistory} from 'react-router';

import {actions} from '../../actions/Action';
import {store} from '../../store';
import {manager} from '../../utility/Manager';
import {ga} from '../../utility/ga';
import {ReducerBase} from '../ReducerBase';

import OrderPanel from './OrderPanel';
import OrderMenu from './OrderMenu';
import PaymentRegister from './PaymentRegister';

export class CheckoutPayment extends ReducerBase {
  componentDidMount() {
    ga.view();
    manager.SetOnTop();
  }

  checkout() {
    actions.order.payment();
    ga.action('Checkout', 'Confirm Payment', 'Payment');
  }

  backCheckout() {
    browserHistory.push('/order');
    ga.action('Checkout', 'Back', 'Payment');
  }

  render() {
    let order = store.getState().order.data;
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderMenu status={'created'} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <PaymentRegister
            data={order}
            checkout={this.checkout.bind(this)}
            backCheckout={this.backCheckout.bind(this)} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderPanel disable data={order} />
        </div>
      </div>
    </div>
    );
  }
}

export default CheckoutPayment;
