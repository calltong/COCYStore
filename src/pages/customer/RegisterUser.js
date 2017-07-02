import React from 'react';

import {store} from '../../store';

//import EnButton from '../forms/EnButton';
import EnText from '../forms/EnText';

export class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: true,
      email: '',
      password: '',
      retry: '',
    };
  }

  changeEnable(event) {
    let data = this.props.data;
    data.disable = data.disable===true?false:true;
    store.update('CUSTOMER_SET_REGISTER', {data: data});
  }

  changeEmail(event) {
    let data = this.props.data;
    data.email = event.target.value;
    store.update('CUSTOMER_SET_REGISTER', {data: data});
  }

  changePassword(event) {
    let data = this.props.data;
    data.password = event.target.value;
    store.update('CUSTOMER_SET_REGISTER', {data: data});
  }

  changeRetry(event) {
    let data = this.props.data;
    data.retry = event.target.value;
    store.update('CUSTOMER_SET_REGISTER', {data: data});
  }

  render() {
    let data = this.props.data;
    let display = '';

    if (this.props.message !== '') {
      display = (
        <div className="row" style={{marginTop: 1}}>
          <div className="col-xs-12 col-md-12">
            <label style={{color:'red'}}>{this.props.message}</label>
          </div>
        </div>
      );
    }

    let disable = data.disable;
    return (
      <div className="panel panel-customer">
        <div className="panel-heading">
          การสั่งสินค้า
        </div>
        <div className="panel-body">

          {display}
          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <div className="form-inline checkout-register">
                <input type="checkbox"
                value={data.disable}
                onClick={this.changeEnable.bind(this)}/>

                <label> สร้าง User</label>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <div className="form-group">
                <label>Email</label>
                <EnText
                  value={data.email}
                  onChange={this.changeEmail.bind(this)}
                  disabled={disable}/>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <div className="form-group">
                <label>Password</label>
                <EnText
                  type="password"
                  value={data.password}
                  onChange={this.changePassword.bind(this)}
                  disabled={disable}/>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <div className="form-group">
                <label>Retry-Password</label>
                <EnText
                  type="password"
                  value={data.retry}
                  onChange={this.changeRetry.bind(this)}
                  disabled={disable}/>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default RegisterUser;
