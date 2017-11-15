import React from 'react';
import swal from 'sweetalert';
import {observer, inject} from 'mobx-react';

import {ga} from '../../utility/ga';
import EnButton from '../forms/EnButton';

import CustomerInfo from '../customer/CustomerInfo';
import OrderMenu from '../order/OrderMenu';

export class OrderAddress extends React.Component {
  componentDidMount() {
    ga.view();

    let id = this.props.match.params.id;
    let data = this.props.tracking.toJS().data;
    if (data._id !== id) {
      this.props.tracking.getItem(id);
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
      this.props.tracking.saveShipping();
      ga.action('Checkout', 'Confirm Address', 'Customer');
    }
  }

  update(data) {
    this.props.tracking.setShipping(data);
  }

  render() {
    let data = this.props.tracking.toJS().data;
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

export default inject('tracking')(observer(OrderAddress));
