import React from 'react';

import EnText from '../forms/EnText';
import EnTextArea from '../forms/EnTextArea';

export default class CustomerInfo extends React.Component {
  changeName(event) {
    let data = this.props.data;
    data.name = event.target.value;
    this.props.update(data);
  }

  changeMobile(event) {
    let data = this.props.data;
    data.mobile = event.target.value;
    this.props.update(data);
  }

  changeEmail(event) {
    let data = this.props.data;
    data.email = event.target.value;
    this.props.update(data);

  }

  changeAddress(event) {
    let data = this.props.data;
    data.address = event.target.value;
    this.props.update(data);
  }

  changeCity(event) {
    let data = this.props.data;
    data.city = event.target.value;
    this.props.update(data);
  }

  changePostcode(event) {
    let data = this.props.data;
    data.postcode = event.target.value;
    this.props.update(data);
  }

  render() {
    let customer = this.props.data;

    return (
      <div>
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
                value={customer.address}
                onChange={this.changeAddress.bind(this)}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <div className="form-group">
              <label>จังหวัด</label>
              <EnText
                value={customer.city}
                onChange={this.changeCity.bind(this)}/>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6">
            <div className="form-group">
              <label>รหัสไปรษณีย์</label>
              <EnText
                value={customer.postcode}
                onChange={this.changePostcode.bind(this)}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <div className="form-group">
              <label>เบอร์โทร</label>
              <EnText
                value={customer.mobile}
                onChange={this.changeMobile.bind(this)}/>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
