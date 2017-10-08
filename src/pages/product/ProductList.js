import React from 'react';
import {Link} from 'react-router';
import {actions} from '../../actions/Action';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {ga} from '../../utility/ga';
import {productPath} from '../../utility/display';

class Display extends React.Component {

  render() {
    let product = this.props.data;
    let price;
    if (product.sale_price > 0) {
      price = (<p className="price"><strike>&#3647;{product.price}</strike>&nbsp;&nbsp;<span> &#3647;{product.sale_price}</span></p>);
    } else {
      price = (<p className="price">&#3647;{product.price}</p>);
    }
    let list = [];
    let sizes = [];
    for (let item of product.variant_list) {
      for (let color of item.list) {
        if (color.quantity !== 0) {
          let have = sizes.find(size => {
            return size === color.size.code;
          });
          if (have === undefined) {
            list.push((<div className="product-size" key={color.size.code}>{color.size.code}</div>));
            sizes.push(color.size.code);
          }
        }
      }
    }

    if (list.length === 0) {
      list = (<div>out of stock</div>);
    }

    let name = product.content.main.name;
    return (
      <div className="product-list-item">
        <Link to={productPath(product._id, name)}>
          <img src={product.image} role="presentation"/>
          <p className="name">{name}</p>
        </Link>
        {price}
        {list}
      </div>
    );
  }
}

export default class ProductList extends ReducerBase {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    let type = this.props.params.type;
    let value = this.props.params.value;
    actions.product.getList(type, value);
    ga.view();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    let type = nextProps.params.type;
    let value = nextProps.params.value;
    actions.product.getList(type, value);
    ga.view();
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

  onView() {
    let type = this.props.params.type;
    let value = this.props.params.value;
    actions.product.getNextList(type, value);
  }

  render() {
    let product = store.getState().product;
    let list = product.product_list.map((item, index) => {
      return (
        <div className="col-xs-6 col-sm-4 col-md-3 product-list-col" key={index}>
          <Display data={item}/>
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
