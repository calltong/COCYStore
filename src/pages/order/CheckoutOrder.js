import React from 'react';
import {browserHistory} from 'react-router';
import swal from 'sweetalert';
import {observer, inject} from 'mobx-react';

import {ga} from '../../utility/ga';

import OrderMenu from './OrderMenu';
import OrderPanel from './OrderPanel';

export class CheckoutOrder extends React.Component {
  componentDidMount() {
    ga.view();
  }

  checkoutByGuest() {
    let data = this.props.order.toJS().data;
    if (data.list.length === 0) {
      swal({
        title: 'รายการสินค้า',
        text: 'กรุณาเลือกสินค้าก่อนนะค่ะ',
        timer: 3000,
        showConfirmButton: true,
      });
      ga.action('Checkout', 'No Product Cart ', 'Order');
    } else {
      ga.action('Checkout', 'Confirm Product', 'Order');
      browserHistory.push('/payment')
    }
  }

  render() {
    let order = this.props.order.toJS().data;
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderMenu status={'created'}/>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderPanel
            data={order}
            checkout={this.checkoutByGuest.bind(this)}/>
        </div>
      </div>

    </div>
    );
  }
}

export default inject('order')(observer(CheckoutOrder));
