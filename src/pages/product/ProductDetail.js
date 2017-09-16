import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Select from 'react-select';
import swal from 'sweetalert';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';
import {manager} from '../../utility/Manager';

class ProductDetail extends ReducerBase {
  sizeChange(val) {
    let stock = this.list.find(item => {
      return item.size._id === val.value;
    });

    actions.product.SetSize(stock.size);
    actions.tracking.action('Product Detail', 'Select Size', `${stock.size.code}`);
  }

  increaseQuantity() {
    actions.product.UpQuantity();
    actions.tracking.action('Product Detail', 'Increase', 'Product');
  }

  decreaseQuantity() {
    actions.product.DownQuantity();
    actions.tracking.action('Product Detail', 'Decrease', 'Product');
  }

  addToBag() {
    actions.tracking.action('Product Detail', 'Add to cart', 'Cart');
    let state = store.getState();
    let product = state.product;
    let detail = product.detail;
    let order = state.order.data;
    if (order.status === 'shipping' || order.status === 'done') {
      swal({
        title: 'คุณต้องการเริ่มการสั่งสินค้าใหม่ใช่มัย?',
        text: 'ขณะนี้มีคำสั่งสินค้าเดิมอยู่! คุณต้องการเริ่มการสั่งสินค้าใหม่ใช่มัย?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, เริ่มใหม่',
        closeOnConfirm: false,
      }, function() {
        swal('เริ่มใหม่อีกครั้ง!', '', 'success');
      });
    } else {

      if (detail.size) {
        let productId = product.data._id;
        let sizeId = detail.size._id;
        let check = order.display_list.find(item => {
          return item.product._id === productId && item.size._id === sizeId;
        });
        if (check) {
          swal({
            title: 'สินค้ามีตะกร้าแล้ว นะค่ะ',
            text: '',
            timer: 2000,
            showConfirmButton: true,
          });
        } else {
          actions.order.addToBag(product.data, detail.size, detail.quantity);
          manager.DisplayPanel('#OrderUpdate');
        }

      } else {
        swal({
          title: 'เลือกขนาดสินค้าด้วยนะค่ะ',
          text: '',
          timer: 2000,
          showConfirmButton: true,
        });
      }
    }
  }

  render() {
    let state = store.getState();
    let product = state.product;
    let detail = product.detail;
    let data = product.data;

    this.list = data.stock_list;

    let doc = state.page.product.data;
    let size = undefined;
    let disabled = false;
    if (detail.size) {
      let id = detail.size._id;
      let sizeList = data.stock_list.map(item => {
        return {
          value: item.size._id,
          label: item.size.name,
          clearableValue: false,
          disabled: item.quantity===0,
        };
      });
      size = (
        <Select
          clearable={false}
          searchable={false}
          value={id}
          options={sizeList}
          onChange={this.sizeChange.bind(this)} /> );
    } else {
      disabled = true;
      size = (<p style={{color: '#B90303'}}>สินค้าหมดค่ะ</p>);
    }

    let css = {
      color: doc.css.color,
      backgroundColor: doc.css.bg_color,
      width: '100%',
      zIndex: 0,
      border: '1px solid #ccc',
    };

    let cssText = {
      borderTop: '1px solid #ccc',
      borderBottom: '1px solid #ccc',
      borderLeft: '1px solid white',
    };

    let price = '';
    if (data.sale_price > 0) {
      price = (<h4 className="product-price">ราคา: <strike>&#3647;{data.price}</strike> <span> &#3647;{data.sale_price}</span></h4>);
    } else {
      price = (<h4 className="product-price">ราคา: &#3647;{data.price}</h4>);
    }

    return (
    <div className="product-info-detail">
      <div className="header">
        <h1>{data.name}</h1>
        {price}
      </div>
      <hr/>

      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-5">
            <div className="form-group">
              <label>ขนาดสินค้า</label>
              {size}
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-5">
            <div className="form-group">
              <label>จำนวนสินค้า</label>
              <div className="input-group">
                <div className="input-group-btn">
                  <button type="button"
                    style={css}
                    className="btn"
                    onClick={this.decreaseQuantity.bind(this)} >
                    <i className="fa fa-minus" style={{marginLeft: 2}}/>
                  </button>
                </div>

                <div className="product-quantity" style={cssText} >
                  {detail.quantity}
                </div>

                <div className="input-group-btn">
                  <button type="button"
                    style={css}
                    className="btn"
                    onClick={this.increaseQuantity.bind(this)} >
                    <i className="fa fa-plus" style={{marginRight: 2}}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-5">
            <button type="button"
              disabled={disabled}
              style={css}
              className="btn"
              onClick={this.addToBag.bind(this)} >
              ใส่ตะกร้า
            </button>
          </div>
        </div>

      </div>
      <hr/>
      <div>
        {ReactHtmlParser(data.information.value)}
      </div>
    </div>
    );
  }
}

export default ProductDetail;
