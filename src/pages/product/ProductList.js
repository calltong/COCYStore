import React from 'react';
import {Link} from 'react-router';
import {actions} from '../../actions/Action';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {manager} from '../../utility/Manager';

class Display extends React.Component {

  render() {
    let data = this.props.data;
    let price = (<p className="price">&#3647;{data.price}</p>);
    if (data.sale_price > 0) {
      price = (<p className="price"><strike>&#3647;{data.price}</strike>&nbsp;&nbsp;<span> &#3647;{data.sale_price}</span></p>);
    }
    let list = [];
    for (let item of data.stock_list) {
      if (item.quantity !== 0) {
        list.push((<div className="product-size" key={item.size.code}>{item.size.code}</div>));
      }
    }

    if (list.length === 0) {
      list = (<div>out of stock</div>);
    }

    return (
      <div className="product-list-item">
        <Link to={`/product/${data._id}`}>
          <img src={this.props.image} role="presentation"/>
          <p className="name">{data.name}</p>
        </Link>
        {price}
        {list}
      </div>
    );
  }
}

export class ProductList extends ReducerBase {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    let type = this.props.location.query.type;
    this.getData(type);
    actions.tracking.view();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    let type = nextProps.location.query.type;
    this.getData(type);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let product = store.getState().product;
    if (product.page.next === 'ready') {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom + 200 >= docHeight) {
        this.onView();
      }
    }
  }

  getData(type) {
    let product = store.getState().product;
    let condition = product.page.condition;
    if (condition.type !== type) {
      actions.product.getList(type);
      manager.SetOnTop();
    }
  }

  onView() {
    let type = this.props.location.query.type;
    actions.product.getNextList(type);
    actions.tracking.action('Product List', 'Get Next Product', 'Product');
  }

  render() {
    let product = store.getState().product;
    let index = 0;

    let list = product.product_list.map(item => {
      let img = '';
      if (item.image_list.length > 0) {
        img = item.image_list[0].data;
      }
      return (
        <div className="col-xs-6 col-sm-4 col-md-3 product-list-col" key={index++}>
          <Display image={img} data={item}/>
        </div>
      );
    });
    let btn = (<div/>);
    if (product.page.next === 'loading') {
      btn = (
        <div className="row product-list-row" style={{textAlign: 'center', marginTop: '15px'}}>
          <button type="button" className="btn btn-view-more">
            Loading...
          </button>
        </div>
      );
    }
    return (
      <div className="container product-list">
        <div className="row product-list-row">
          {list}
        </div>

        {btn}
      </div>
    );
  }
}

export default ProductList;
