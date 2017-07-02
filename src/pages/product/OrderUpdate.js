import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {manager} from '../../utility/Manager';
import OrderList from '../order/OrderList';

export class OrderUpdate extends Component {

  onContinues() {
    manager.ClosePanel('#OrderUpdate');
  }

  onCheckout() {
    manager.ClosePanel('#OrderUpdate');
    browserHistory.push('/Order');
  }

  render() {
    let data = this.props.data;
    return (
      <div id="OrderUpdate" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog order-dialog" role="document">
          <div className="modal-content">
            <div className="panel panel-order">
              <div className="panel-heading">
                รายการสินค้า
              </div>
              <div className="panel-body">
                <OrderList data={data}/>
              </div>
              <div className="panel-footer">
                <button type="button" className="btn btn-continues pull-right"
                  onClick={this.onContinues.bind(this)}>
                  Continues
                </button>
                <button type="button" className="btn btn-continues pull-right"
                  onClick={this.onCheckout.bind(this)}>
                  Checkout
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default OrderUpdate;
