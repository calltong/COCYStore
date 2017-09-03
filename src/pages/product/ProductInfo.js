import React from 'react';
import ImageGallery from 'react-image-gallery';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {manager} from '../../utility/Manager';
import {actions} from '../../actions/Action';

import Builder from '../content/Builder';

import ProductDetail from './ProductDetail';
import OrderUpdate from './OrderUpdate';

export class ProductInfo extends ReducerBase {
  componentDidMount() {
    let id = this.props.params.id;
    actions.product.getItem(id);
    actions.tracking.view();
    manager.SetOnTop();
    actions.page.getProduct();
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.params.id;
    actions.product.getItem(id);
    manager.SetOnTop();
  }

  selectImage(index) {
    actions.product.SetImage(index);
    actions.tracking.action('Product Detail', 'Select Image', `${index}`);
  }

  render() {
    let state = store.getState();
    let doc = state.page.product;
    let order = state.order.data;
    let product = state.product;
    let data = product.data;
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
            <ProductDetail />
          </div>
        </div>

        <hr/>

        <Builder list={doc.data.list} />
        <OrderUpdate data={order}/>
      </div>
    );
  }
}

export default ProductInfo;
