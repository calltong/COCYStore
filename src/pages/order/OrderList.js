import React from 'react';

import {actions} from '../../actions/Action';
import {money} from '../../utility/display';
import {ga} from '../../utility/ga';

export default class OrderList extends React.Component {
  onMinus(index) {
    actions.order.downQuantity(index);
    ga.action('Order List', 'Decrease', 'Order');
  }

  onPlus(index) {
    actions.order.upQuantity(index);
    ga.action('Order List', 'Increase', 'Order');
  }

  onRemove(index) {
    actions.order.removeFromBag(index);
    ga.action('Order List', 'Remove', 'Order');
  }

  render() {
    let order = this.props.data;
    let visible = false;
    if (order.status === 'order' || order.status === 'payment') {
      visible = true;
    }

    let summary = order.summary;
    let list = order.list.map((item, index) => {
      let button;
      if (visible) {
        button = (
          <div className="row">
            <div style={{textAlign: 'center'}}>
              <button className="btn btn-normal btn-summary-size"
                onClick={this.onMinus.bind(this, index)}>
                <i className="fa fa-minus"/>
              </button>

              <button className="btn btn-normal btn-summary-size"
                onClick={this.onPlus.bind(this, index)} >
                <i className="fa fa-plus"/>
              </button>

              <button className="btn btn-remove btn-summary-size"
                onClick={this.onRemove.bind(this, index)} >
                ลบ
              </button>
            </div>
          </div>
        );
      } else {
        button = (<div/>);
      }

      return (
      <div key={index}>
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 order-col-header">
            <img className="summary-img img-rounded" src={item.image} role="presentation" />
          </div>

          <div className="col-xs-9 col-sm-9 col-md-9">

            <div className="row summary-row-value">
              <div className="col-xs-4 col-sm-4 col-md-4 order-col-value" >
                {item.color}
                <br />
                {item.size}
              </div>

              <div className="col-xs-4 col-sm-4 col-md-4 order-col-value">
                {item.quantity}
              </div>

              <div className="col-xs-4 col-sm-4 col-md-4 order-col-value">
                {money(item.price * item.quantity)}&#3647;
              </div>
            </div>

            {button}
          </div>
        </div>

        <hr style={{marginTop: 2, marginBottom: 2}}/>
      </div>
      );
    });
    let total = summary.total + summary.shipping - summary.discount;

    return (
        <div className="container-fluid">
          <p className="summary-total">รวม: {money(total)}&#3647;</p>

          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 order-col-header">
              รูป
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3 order-col-header">
              สี/ขนาด
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3 order-col-header" >
              จำนวน
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3 order-col-header">
              ราคา
            </div>

          </div>
          <hr style={{marginTop: 2, marginBottom: 5}}/>
          {list}
        </div>
    );
  }
}
