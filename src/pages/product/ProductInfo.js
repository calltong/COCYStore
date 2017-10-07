import React from 'react';
import ImageGallery from 'react-image-gallery';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {manager} from '../../utility/Manager';
import {ga} from '../../utility/ga';
import {actions} from '../../actions/Action';

import Builder from '../content/Builder';

import ProductDetail from './ProductDetail';
import OrderUpdate from './OrderUpdate';

export default class ProductInfo extends ReducerBase {
  componentDidMount() {
    let id = this.props.params.id;
    actions.product.getItem(id);
    actions.page.getProduct();
    ga.view();
    manager.SetOnTop();
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.params.id;
    actions.product.getItem(id);
    ga.view();
    manager.SetOnTop();
  }

  render() {
    let state = store.getState();
    let doc = state.page.product;
    let order = state.order.data;
    let list = state.product.detail.image_list;

    let images = list.map(item => {
      return ({
        original: item,
        thumbnail: item,
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
