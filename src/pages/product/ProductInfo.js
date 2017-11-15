import React from 'react';
import ImageGallery from 'react-image-gallery';
import {observer, inject} from 'mobx-react';

import {ga} from '../../utility/ga';

import Builder from '../content/Builder';
import ProductDetail from './ProductDetail';
import OrderUpdate from './OrderUpdate';

export class ProductInfo extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.product.getItem(id);
    this.props.page.getProduct();
    ga.view();
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    this.props.product.getItem(id);
    ga.view();
  }

  render() {
    let doc = this.props.page.toJS().product;
    //let order = state.order.data;
    let list = this.props.product.toJS().detail.image_list;

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
        <OrderUpdate />
      </div>
    );
  }
}

export default inject('product', 'page')(observer(ProductInfo));
