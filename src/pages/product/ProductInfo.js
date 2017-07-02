import React from 'react';
import ImageGallery from 'react-image-gallery';
import sizetable from '../../images/sizetable.jpg';
import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {manager} from '../../utility/Manager';
import {actions} from '../../actions/Action';

import swal from 'sweetalert';
import ProductDetail from './ProductDetail';
import OrderUpdate from './OrderUpdate';

export class ProductInfo extends ReducerBase {

  componentDidMount() {
    let id = this.props.params.id;
    actions.product.getItem(id);
    actions.tracking.view();
    manager.SetOnTop();
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.params.id;
    actions.product.getItem(id);
    manager.SetOnTop();
  }

  increaseQuantity() {
    actions.product.UpQuantity();
    actions.tracking.action('Product Detail', 'Increase', 'Product');
  }

  decreaseQuantity() {
    actions.product.DownQuantity();
    actions.tracking.action('Product Detail', 'Decrease', 'Product');
  }

  selectSize(size) {
    actions.product.SetSize(size);
    actions.tracking.action('Product Detail', 'Select Size', `${size.code}`);
  }

  selectImage(index) {
    actions.product.SetImage(index);
    actions.tracking.action('Product Detail', 'Select Image', `${index}`);
  }

  AddtoBag() {
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
        let list = order.product_list;
        let found = list.find(item => {
          return item.product._id === product.data._id && item.size._id === detail.size._id;
        });
        if (found) {
          swal({
            title: 'สินค้าและขนาดมีอยู่แล้วค่ะ',
            text: '',
            timer: 2000,
            showConfirmButton: true,
          });
        } else {
          store.update('ORDER_ADD_BAG', {
            product:product.data,
            size:detail.size,
            quantity:detail.quantity,
          });
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
    let order = state.order.data;
    let product = state.product;
    let data = product.data;
    let detail = product.detail;
    let images = data.image_list.map(item => {
      return ({
        original: item.data,
        thumbnail: item.data,
      });
    });
    return (
      <div className="product-info">
        <div className="row product-info-header">
          <div className="col-xs-12 col-sm-12 col-md-6">
            <ImageGallery
              items={images}
              slideDuration={500}
              slideInterval={8000}
              showFullscreenButton={false}
              showPlayButton={false}
              autoPlay={true}
              />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6">
            <ProductDetail
              onSelectSize={this.selectSize.bind(this)}
              onUpQuantity={this.increaseQuantity.bind(this)}
              onDownQuantity={this.decreaseQuantity.bind(this)}
              onAddtoBag={this.AddtoBag.bind(this)}
              data={data} detail={detail}/>
          </div>
        </div>

        <hr/>

        <div style={{textAlign: 'center'}}>
        <img className="product-info-img" src={sizetable} role="presentation" />
        </div>
        <OrderUpdate data={order}/>
      </div>
    );
  }
}

export default ProductInfo;
