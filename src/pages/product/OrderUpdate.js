import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import {manager} from '../../utility/Manager';
import OrderList from '../order/OrderList';

export default class OrderUpdate extends Component {

  onContinues() {
    manager.ClosePanel('#OrderUpdate');
  }

  onCheckout() {
    manager.ClosePanel('#OrderUpdate');
    browserHistory.push('/order');
  }

  render() {
    return (
      <div id="OrderUpdate" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog order-dialog" role="document">
          <div className="modal-content">
            <div className="panel panel-order">
              <div className="panel-heading">
                รายการสินค้า
              </div>
              <div className="panel-body">
                <OrderList />
              </div>
              <div className="panel-footer">
                <div className="col-sm-6 col-md-4">
                  <button type="button"
                    className="btn btn-normal btn-fullsize"
                    onClick={this.onContinues.bind(this)}>
                    เลือกสินค้าต่อ
                  </button>
                </div>

                <div className="col-sm-6 col-md-4 col-md-offset-4">
                  <button type="button"
                    className="btn btn-normal btn-fullsize"
                    onClick={this.onCheckout.bind(this)}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
