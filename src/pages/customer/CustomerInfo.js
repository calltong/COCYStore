import React from 'react';

import {actions} from '../../actions/Action';
import {store} from '../../store';
import swal from 'sweetalert';

import EnText from '../forms/EnText';
import EnTextArea from '../forms/EnTextArea';

import EnButton from '../forms/EnButton';

export class CustomerInfo extends React.Component {

  changeName(event) {
    let data = store.getState().customer.data;
    data.name = event.target.value;
    store.update('CUSTOMER_STORE', {data: data});
  }

  changeMobile(event) {
    let data = store.getState().customer.data;
    data.information.mobile = event.target.value;
    store.update('CUSTOMER_STORE', {data: data});
  }

  changeEmail(event) {
    let data = store.getState().customer.data;
    data.email = event.target.value;
    store.update('CUSTOMER_STORE', {data: data});

  }

  changeAddress(event) {
    let data = store.getState().customer.data;
    data.information.address = event.target.value;
    store.update('CUSTOMER_STORE', {data: data});
  }

  changeCity(event) {
    let data = store.getState().customer.data;
    data.information.city = event.target.value;
    store.update('CUSTOMER_STORE', {data: data});
  }

  changePostcode(event) {
    let data = store.getState().customer.data;
    data.information.postcode = event.target.value;
    store.update('CUSTOMER_STORE', {data: data});
  }

  onBack() {
    this.props.backCheckout();
  }

  onNext() {
    let state = store.getState();
    let customer = state.customer.data;
    let register_user = state.customer.register_user;
    let err = '';
    if (customer.name === '') {
      err = 'กรุณา ใส่ชื่อ ด้วยนะค่ะ';
    } else if (customer.information.address === '') {
      err = 'กรุณา ใส่ที่อยู่ ด้วยนะค่ะ';
    } else if (customer.information.mobile === '') {
      err = 'กรุณา ใส่เบอร์โทร ด้วยนะค่ะ';
    } else if (customer.information.postcode === '') {
      err = 'กรุณา ใส่รหัสไปรษณีย์ ด้วยนะค่ะ';
    } else if (register_user.disable === false) {
      if (register_user.email === '') {
        err = 'กรุณา ใส่ email ด้วยนะค่ะ';
      } else if (register_user.password === '') {
        err = 'กรุณา ใส่ password ด้วยนะค่ะ';
      } else if (register_user.password !== register_user.retry) {
        err = 'password ไม่เหมือนกันค่ะ';
      } else {
        this.props.checkout();
      }
    } else {
      this.props.checkout();
    }

    if (err !== '') {
      actions.tracking.action('Customer Register', 'Fill in', 'Order');
      swal({
        title: 'ข้อมูลไม่สมบูรณ์',
        text: err,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  }

  render() {
    let customer = this.props.data;
    let information = customer.information;

    return (
      <div className="panel panel-customer">
        <div className="panel-heading">
          ที่อยู่ในการจัดส่ง
        </div>
        <div className="panel-body">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>ชื่อ</label>
                <EnText
                  value={customer.name}
                  onChange={this.changeName.bind(this)}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <div className="form-group">
                <label>ที่อยู่</label>
                <EnTextArea
                  rows="4"
                  value={information.address}
                  onChange={this.changeAddress.bind(this)}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6">
              <div className="form-group">
                <label>จังหวัด</label>
                <EnText
                  value={information.city}
                  onChange={this.changeCity.bind(this)}/>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6">
              <div className="form-group">
                <label>รหัสไปรษณีย์</label>
                <EnText
                  value={information.postcode}
                  onChange={this.changePostcode.bind(this)}/>
              </div>
            </div>
          </div>

          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-6">
              <div className="form-group">
                <label>เบอร์โทร</label>
                <EnText
                  value={information.mobile}
                  onChange={this.changeMobile.bind(this)}/>
              </div>
            </div>
          </div>

        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <EnButton className="btn btn-continues pull-left" onClick={this.onBack.bind(this)}>
                กลับ
              </EnButton>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6">
              <EnButton className="btn btn-continues pull-right" onClick={this.onNext.bind(this)}>
                ยืนยัน
              </EnButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerInfo;
