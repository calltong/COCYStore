import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {observer, inject} from 'mobx-react';

import {manager} from '../utility/Manager';
import Menu from './menu/Menu';
import Footer from './menu/Footer';

import Home from './Home';
import AboutUs from './help/AboutUs';
import HowToBuy from './help/HowToBuy';
import OrderCondition from './help/OrderCondition';

import ProductList from './product/ProductList';
import ProductInfo from './product/ProductInfo';
import CheckoutOrder from './order/CheckoutOrder';
import CheckoutPayment from './order/CheckoutPayment';

import OrderAddress from './tracking/OrderAddress';
import OrderTracking from './tracking/OrderTracking';

export class App extends Component {
  componentDidMount() {
    manager.initial();
    this.props.page.getMenu();
  }

  render() {
    let doc = this.props.page.toJS().menu;
    let css = {backgroundColor: doc.data.css.bg_color};

    return (
      <div id="wrapper">
        <Menu />
        <div id="page-wrapper" style={css}>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/condition" component={OrderCondition} />
          <Route exact path="/how-to-buy" component={HowToBuy} />

          <Route exact path="/product-list/:type/:value/:tag" component={ProductList} />
          <Route exact path="/product/:id/:tag" component={ProductInfo} />

          <Route exact path="/order" component={CheckoutOrder} />
          <Route exact path="/payment" component={CheckoutPayment} />

          <Route exact path="/tracking/:id" component={OrderTracking} />
          <Route exact path="/tracking/:id/address" component={OrderAddress} />
        </div>
        <Footer content={doc.data.footer} />
      </div>
    );
  }
}

export default inject('page')(observer(App));
