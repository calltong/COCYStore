import React, { Component } from 'react';
import {Link} from 'react-router';

export class ItemDisplay extends Component {
  render() {
    let data = this.props.data;
    let img = {};
    if (data.image_list.length > 0) {
      img = data.image_list[0].data;
    }
    let price = (<p className="price">Price: {data.price} Bath</p>);
    if (data.sale_price > 0) {
      price = (<p className="price">Price: {data.price}B Special: {data.sale_price}B</p>);
    }
    return (
      <div className={this.props.cssName?this.props.cssName:'product-list'}>
        <Link to={`/ProductInfo/${data._id}`}>
          <img src={img} role="presentation" className="img-rounded" />
        </Link>
        <p className="name">{data.name}</p>
        {price}
      </div>
    );
  }
}

export default ItemDisplay;
