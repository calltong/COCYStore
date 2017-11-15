import React from 'react';
import swal from 'sweetalert';
import {observer, inject} from 'mobx-react';

import EnImageSelector from '../forms/EnImageSelector';
import EnButton from '../forms/EnButton';

export class PaymentRegister extends React.Component {
  componentDidMount() {
    this.props.page.getPayment();
  }

  onDropImage(files) {
    let order  = this.props.order;
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        order.setSlip(data);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onBack() {
    this.props.backCheckout();
  }

  onNext() {
    let data = this.props.order.toJS().data;
    if (data.payment.data.slip === '') {
      swal({
        title: 'รายการชำระสินค้า',
        text: 'กรุณาเลือกใบโอนก่อนนะค่ะ',
        timer: 3000,
        showConfirmButton: true,
      });
    } else {
      this.props.checkout();
    }
  }

  getBankName(bank) {
    switch (bank) {
      case 'scb':
        return '‎ไทยพาณิชย์';
      case 'kbank':
        return 'กสิกรไทย';
      case 'bbl':
        return 'กรุงเทพฯ';
      case 'bay':
        return 'กรุงศรีอยุธยา';
      default:
        return '';
    }
  }

  render() {
    let payment = this.props.page.toJS().payment;
    let data = this.props.order.toJS().data;
    let list = payment.data.list.map((item, index) => {
      return (
        <div className="row" key={index} >
          <div className="col-xs-4 col-sm-4 col-md-4">
            <p>{this.getBankName(item.bank)}</p>
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8">
            <p>{item.number}</p>
            <p>{item.name}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="panel panel-customer">
        <div className="panel-heading">
          ชำระเงิน
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="form-group" style={{margin:'0 auto', width: '200px'}}>
                <label>Slip</label>
                <EnImageSelector width="200" height="180"
                  src={data.payment.data.slip}
                  onDrop={this.onDropImage.bind(this)}/>

              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="form-group" style={{margin:'0 auto', width: '80%'}}>
                <label>ธนาคาร</label>
                <div>
                  {list}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <EnButton className="btn btn-normal btn-summary-size pull-left" onClick={this.onBack.bind(this)}>
                กลับ
              </EnButton>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6">
              <EnButton className="btn btn-normal btn-summary-size pull-right" onClick={this.onNext.bind(this)}>
                ยืนยัน
              </EnButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('order', 'page')(observer(PaymentRegister));
