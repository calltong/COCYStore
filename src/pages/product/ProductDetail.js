import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Select from 'react-select';
import swal from 'sweetalert';
import {observer, inject} from 'mobx-react';

import {manager} from '../../utility/Manager';
import {ga} from '../../utility/ga';

export class ProductDetail extends React.Component {
  colorChange(val) {
    let variant = this.product.variant_list.find(item => {
      return item.color._id === val.value;
    });
    let name;
    if (variant) {
      let size;
      if (variant.list.length > 0) {
        size = variant.list[0].size;
      }
      this.props.product.SetColor(variant.color, size, variant.image_list);
      name = variant.color.content.main.name;
    } else {
      this.props.product.SetColor(undefined, undefined, this.detail.all_image);
      name = 'เลือกทั้งหมด';
    }
    ga.action('Product', 'Select Color', `${name}`);
  }

  sizeChange(val) {
    let stock = this.sizes.find(item => {
      return item.size._id === val.value;
    });

    this.props.product.SetSize(stock.size);
    ga.action('Product', 'Select Size', `${stock.size.code}`);
  }

  increaseQuantity() {
    this.props.product.UpQuantity();
    ga.action('Product', 'Increase', '');
  }

  decreaseQuantity() {
    this.props.product.DownQuantity();
    ga.action('Product', 'Decrease', '');
  }

  addToBag() {
    ga.action('Product', 'Add to cart', '');
    let order = this.props.order.toJS().data;
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
      let proStore = this.props.product.toJS();
      let detail = proStore.detail;
      if (detail.color === undefined) {
        swal({
          title: 'เลือกสีสินค้าก่อนนะค่ะ',
          text: '',
          timer: 2000,
          showConfirmButton: true,
        });
        return;
      }

      if (detail.size === undefined) {
        swal({
          title: 'เลือกขนาดสินค้าก่อนนะค่ะ',
          text: '',
          timer: 2000,
          showConfirmButton: true,
        });
        return;
      }

      if (detail.size) {
        let productId = proStore.data._id;
        let colorId = detail.color._id;
        let sizeId = detail.size._id;
        let check = order.list.find(item => {
          return item.product_id === productId &&
            item.color_id === colorId &&
            item.size_id === sizeId;
        });
        if (check) {
          swal({
            title: 'สินค้ามีตะกร้าแล้ว นะค่ะ',
            text: '',
            timer: 2000,
            showConfirmButton: true,
          });
        } else {
          let img = '';
          if (detail.image_list.length > 0) {
            img = detail.image_list[0];
          }
          this.props.order.addToBag(proStore.data,
            img,
            detail.color,
            detail.size,
            detail.quantity);
          manager.DisplayPanel('#OrderUpdate');
        }
      }
    }
  }

  render() {
    let doc = this.props.page.toJS().product.data;
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

    let cssOutStock = {color: '#B90303'};

    let proStore = this.props.product.toJS();
    let product = proStore.data;
    let detail = proStore.detail;
    this.product = product;
    this.detail = detail;
    let colorDiv = (<p style={cssOutStock}>สินค้าหมดค่ะ</p>);
    let sizeDiv = (<p style={cssOutStock}>-</p>);
    let disabled = true;

    if (detail.color_list.length > 0) {
      let variant;
      let color = '';
      let size;
      if (detail.color) {
        color = detail.color._id;
        variant = product.variant_list.find(item => {
          return item.color._id === color;
        })
      }
      if (detail.size) {
        size = detail.size._id;
      }

      colorDiv = (
        <Select
          clearable={false}
          searchable={false}
          value={color}
          options={detail.color_list}
          onChange={this.colorChange.bind(this)} />
        );

      if (variant && variant.list.length > 0) {
        disabled = false;
        this.sizes = variant.list;
        let sizeList = variant.list.map(item => {
          return {
            value: item.size._id,
            label: item.size.content.main.name,
            clearableValue: false,
            disabled: item.quantity===0,
          };
        });
        sizeDiv = (
          <Select
            clearable={false}
            searchable={false}
            value={size}
            options={sizeList}
            onChange={this.sizeChange.bind(this)} />
          );
      } else {
        sizeDiv = (<p style={cssOutStock}>ขนาดสินค้าหมดค่ะ</p>);
      }
    }

    let price;
    if (product.sale_price > 0) {
      price = (<h4 className="product-price">ราคา: <strike>&#3647;{product.price}</strike> <span> &#3647;{product.sale_price}</span></h4>);
    } else {
      price = (<h4 className="product-price">ราคา: &#3647;{product.price}</h4>);
    }

    return (
    <div className="product-info-detail">
      <div className="header">
        <h1>{product.content.main.name}</h1>
        {price}
      </div>
      <hr/>

      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-5">
            <div className="form-group">
              <label>สี</label>
              {colorDiv}
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-5">
            <div className="form-group">
              <label>ขนาด</label>
              {sizeDiv}
            </div>
          </div>
        </div>
        <div className="row">
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

          <div className="col-xs-12 col-sm-6 col-md-5">
            <div className="form-group">
              <label>&nbsp;</label>
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

      </div>
      <hr/>
      <div>
        {ReactHtmlParser(product.content.main.description)}
      </div>
    </div>
    );
  }
}

export default inject('product', 'order', 'page')(observer(ProductDetail));
