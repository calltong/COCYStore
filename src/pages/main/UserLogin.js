import React from 'react';
import userimg from '../../images/user.png';
//import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';

import {facebook} from '../../utility/Facebook';
import EnButton from '../forms/EnButton';

export class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }

  onFbLogin() {
    this.setState({err:''});
    let main = store.getState().customer;
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

  onConfrimOrder() {
    let customer = store.getState().customer;
    this.props.checkout(customer.data);
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

    let img = userimg;
    let data = this.props.data;
    return (
      <div className="panel panel-customer">

        <div className="panel-heading">
          User Login
        </div>
        <div className="panel-body">

          <div className="row" style={{marginTop: 1, textAlign: 'center'}}>
            <div className="col-xs-12 col-md-12">
              <img src={img} role="presentation" className="user-img" />
            </div>
          </div>

          <div className="row" style={{marginTop: 10, textAlign: 'center'}}>
            <div className="col-xs-12 col-md-12">
              <label className="user-name">{data.name}</label>
            </div>
          </div>

          {display}

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
              <EnButton className="btn btn-normal btn-fullsize" onClick={this.onConfrimOrder.bind(this)}>
                <i className="fa fa-check-circle-o"/> สั่งซื้อ
              </EnButton>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default UserLogin;
