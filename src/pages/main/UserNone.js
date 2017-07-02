import React from 'react';

//import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';

import {facebook} from '../../utility/Facebook';
import {http} from '../../utility/http';
import {config} from '../../config';
import EnButton from '../forms/EnButton';
import EnText from '../forms/EnText';


export class UserNone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      err: '',
    };
  }

  onFbLogin() {
    this.setState({err:''});
    let main = store.getState().customer;
    console.log('customer:', main);
    if (main.data.login === false) {
      facebook.login(function(response) {

        //let id = response.authResponse.userID;
        //store.update('CUSTOMER_GET_FB', {
        //  id: id,
        //});
      });
    }
  }

  onLineLogin() {
    this.setState({err:''});
  }

  onEmailLogin() {
    this.setState({err:''});
    let me = this;
    this.getUser(this.state.email, this.state.password, function(result, data) {
      if (result === true) {
        store.update('CUSTOMER_SET_LOGIN', {login: true});
        store.update('CUSTOMER_STORE', {data});
        me.props.checkoutEmail(data);
      } else {
        me.setState({err:'Email หรือ Password ไม่ถูกต้อง'});
      }
    });
  }

  onCreateGuest() {
    this.setState({err:''});
    this.props.checkoutGuest();
  }

  getUser(email, pass, callback) {
    let url = `${config.api.url}/customer/find/data?email=${email}&&password=${pass}`;
    http.get(url, {}).done(response => {
      if (response.statusCode === http.StatusOK) {
        callback(true, response.body);
      } else {
        callback(false, undefined);
      }
    });
  }

  changeEmail(event) {
    this.setState({email:event.target.value});
  }

  changePassword(event) {
    this.setState({password:event.target.value});
  }

  render() {
    let display = '';

    if (this.state.err !== '') {
      display = (
        <div className="row" style={{marginTop: 1}}>
          <div className="col-xs-12 col-md-12">
            <label style={{color:'red'}}>{this.state.err}</label>
          </div>
        </div>
      );
    }

    return (
      <div className="panel panel-customer">
        <div className="panel-heading">
          การสั่งสินค้า
        </div>
        <div className="panel-body">

          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <div className="form-group">
                <label>Email</label>
                <EnText
                  value={this.state.email}
                  onChange={this.changeEmail.bind(this)}/>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <div className="form-group">
                <label>Password</label>
                <EnText
                  type="password"
                  value={this.state.password}
                  onChange={this.changePassword.bind(this)}/>
              </div>
            </div>
          </div>

          {display}

          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <EnButton className="btn btn-normal btn-fullsize" onClick={this.onEmailLogin.bind(this)}>
                <i className="fa fa-sign-in"/> Login
              </EnButton>
            </div>
          </div>

          <div className="row" style={{marginTop: 1, display: 'none'}} >
            <div className="col-xs-12 col-md-12">
              <EnButton className="btn btn-facebook btn-fullsize" onClick={this.onFbLogin.bind(this)}>
                <i className="fa fa-facebook-square"/> Facebook Login
              </EnButton>
            </div>
          </div>

          <div className="row" style={{marginTop: 1, display: 'none'}} >
            <div className="col-xs-12 col-md-12">
              <EnButton className="btn btn-line btn-fullsize" onClick={this.onLineLogin.bind(this)}>
                <i className="fa fa-user-o"/> Line Login
              </EnButton>
            </div>
          </div>

          <hr/>

          <div className="row" style={{marginTop: 1}}>
            <div className="col-xs-12 col-md-12">
              <EnButton className="btn btn-normal btn-fullsize" onClick={this.onCreateGuest.bind(this)}>
                <i className="fa fa-check-circle-o"/> สั่งซื้อ
              </EnButton>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default UserNone;
