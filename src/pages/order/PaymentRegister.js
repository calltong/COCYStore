import React from 'react';
import swal from 'sweetalert';
import bank from '../../images/bank.jpg';
//import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';

import EnImageSelector from '../forms/EnImageSelector';
import EnButton from '../forms/EnButton';

export class PaymentRegister extends React.Component {

  onDropImage(files) {
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        store.update('ORDER_SET_SLIP', {data});
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onBack() {
    this.props.backCheckout();
  }

  onNext() {
    let data = this.props.data;
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

  render() {
    let data = this.props.data;
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
              <div className="form-group" style={{margin:'0 auto', width:'200px'}}>
                <img src={bank} role="presentation" className="payment-img" />
              </div>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <EnButton className="btn btn-normal pull-left" onClick={this.onBack.bind(this)}>
                กลับ
              </EnButton>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6">
              <EnButton className="btn btn-normal pull-right" onClick={this.onNext.bind(this)}>
                ยืนยัน
              </EnButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentRegister;
