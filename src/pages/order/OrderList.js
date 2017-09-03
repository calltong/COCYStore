import React from 'react';

import {actions} from '../../actions/Action';
import {store} from '../../store';

import EnButton from '../forms/EnButton';
import TextLine from '../component/TextLine';

export class OrderList extends React.Component {
  onMinus(index) {
    store.update('ORDER_DOWN_QUANTITY', {index:index});
    actions.tracking.action('Order List', 'Decrease', 'Order');
  }

  onPlus(index) {
    store.update('ORDER_UP_QUANTITY', {index:index});
    actions.tracking.action('Order List', 'Increase', 'Order');
  }

  onRemove(index) {
    store.update('ORDER_REMOVE_BAG', {index:index});
    actions.tracking.action('Order List', 'Remove', 'Order');
  }

  replaceMoney(val, size) {
    let text = val.toFixed(0).replace(/./g, function(c, i, a) {
      return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
    let n = size - text.length;
    let space = '';
    if (n > 0) {
      space = '\u00A0'.repeat(n);
    }

    return space + text;
  }

  render() {
    let order = this.props.data;
    let index = 0;

    let visible = false;
    if (order.status === 'order' || order.status === 'payment') {
      visible = true;
    }

    let summary = order.summary;
    let list = order.display_list.map(item => {
      let product = item.product;
      let price = product.price;
      if (product.sale_price > 0) {
        price = product.sale_price;
      }
      let button = (<div/>);
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
      }
      let img = '';
      if (product.image_list !== null && product.image_list.length > 0) {
        img = product.image_list[0].data;
      }
      return (
      <div key={index++}>
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 order-col-header">
            <img className="summary-img img-rounded" src={img} role="presentation" />
          </div>

          <div className="col-xs-9 col-sm-9 col-md-9">

            <div className="row summary-row-value">
              <div className="col-xs-4 col-sm-4 col-md-4 order-col-value" >
                {item.size.name}
              </div>

              <div className="col-xs-4 col-sm-4 col-md-4 order-col-value">
                {item.quantity}
              </div>

              <div className="col-xs-4 col-sm-4 col-md-4 order-col-value">
                {this.replaceMoney(price*item.quantity, 0)}&#3647;
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
          <p className="summary-total">รวม: {this.replaceMoney(total, 12)}&#3647;</p>

          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 order-col-header">
              รูป
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3 order-col-header">
              ขนาด
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

export default OrderList;
