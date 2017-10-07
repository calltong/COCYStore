import React from 'react';
import swal from 'sweetalert';

import {actions} from '../../actions/Action';
import {store} from '../../store';
import {manager} from '../../utility/Manager';
import {ga} from '../../utility/ga';
import {ReducerBase} from '../ReducerBase';
import EnButton from '../forms/EnButton';

import CustomerInfo from '../customer/CustomerInfo';
import OrderMenu from '../order/OrderMenu';

export default class OrderAddress extends ReducerBase {
  componentDidMount() {
    ga.view();
    manager.SetOnTop();

    let id = this.props.params.id;
    let data = store.getState().tracking.data;
    if (data._id !== id) {
      actions.tracking.getItem(id);
    }
  }

  checkout() {
    let customer = this.data.shipping;
    let err = '';
    if (customer.name === '') {
      err = 'กรุณา ใส่ชื่อ ด้วยนะค่ะ';
    } else if (customer.address === '') {
      err = 'กรุณา ใส่ที่อยู่ ด้วยนะค่ะ';
    } else if (customer.mobile === '') {
      err = 'กรุณา ใส่เบอร์โทร ด้วยนะค่ะ';
    } else if (customer.postcode === '') {
      err = 'กรุณา ใส่รหัสไปรษณีย์ ด้วยนะค่ะ';
    }

    if (err !== '') {
      ga.action('Checkout', 'Can not complete address', 'Customer');
      swal({
        title: 'ข้อมูลไม่สมบูรณ์',
        text: err,
        timer: 3000,
        showConfirmButton: true,
      });
    } else {
      actions.tracking.saveShipping();
      ga.action('Checkout', 'Confirm Address', 'Customer');
    }
  }

  update(data) {
    actions.tracking.setShipping(data);
  }

  render() {
    let data = store.getState().tracking.data;
    this.data = data;
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <h4>รหัสสั่งซื้อสินค้า: {data._id}</h4>
          <hr />
          <br />
          <OrderMenu status={'customer'}/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-8 col-md-offset-2">
          <div className="panel panel-customer">
            <div className="panel-heading">
              ที่อยู่ในการจัดส่ง
            </div>
            <div className="panel-body">
              <CustomerInfo
                update={this.update.bind(this)}
                data={data.shipping} />
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <EnButton className="btn btn-continues pull-right" onClick={this.checkout.bind(this)}>
                    ยืนยัน
                  </EnButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
