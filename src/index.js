import './assets.js';

import React from 'react';
import ReactDOM from 'react-dom';
import StoreApp from './StoreApp';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './pages/Home';

import AboutUs from './pages/help/AboutUs';
import HowToBuy from './pages/help/HowToBuy';
import OrderCondition from './pages/help/OrderCondition';
import MyAccount from './pages/main/MyAccount';

import ProductList from './pages/product/ProductList';
import ProductInfo from './pages/product/ProductInfo';
import CheckoutOrder from './pages/order/CheckoutOrder';
import CheckoutPayment from './pages/order/CheckoutPayment';

import OrderAddress from './pages/tracking/OrderAddress';
import OrderTracking from './pages/tracking/OrderTracking';

ReactDOM.render((
   <Router history={browserHistory}>
      <Route path="/" component={StoreApp}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="about-us" component={AboutUs} />
         <Route path="condition" component={OrderCondition} />
         <Route path="how-to-buy" component={HowToBuy} />
         <Route path="account" component={MyAccount} />

         <Route path="product-list/:type/:value/:tag" component={ProductList} />
         <Route path="product/:id/:tag" component={ProductInfo} />
         <Route path="order" component={CheckoutOrder} />
         <Route path="payment" component={CheckoutPayment} />
         <Route path="tracking/:id" component={OrderTracking} />
         <Route path="tracking/:id/address" component={OrderAddress} />
      </Route>
   </Router> ), document.getElementById('root'));
