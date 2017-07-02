import './assets.js';

import React from 'react';
import ReactDOM from 'react-dom';
import StoreApp from './StoreApp';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './pages/Home';

import OurStore from './pages/help/OurStore';
import HowOrder from './pages/help/HowOrder';
import MyAccount from './pages/main/MyAccount';

import ProductList from './pages/product/ProductList';
import ProductInfo from './pages/product/ProductInfo';
import CheckoutOrder from './pages/order/CheckoutOrder';
import CheckoutPayment from './pages/order/CheckoutPayment';
import CheckoutCustomer from './pages/order/CheckoutCustomer';
import OrderTracking from './pages/order/OrderTracking';
import {config} from './config';

config.setup(window.location.host);

ReactDOM.render((
   <Router history={browserHistory}>
      <Route path="/" component={StoreApp}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="store" component={OurStore} />
         <Route path="howorder" component={HowOrder} />
         <Route path="account" component={MyAccount} />

         <Route path="products" component={ProductList} />
         <Route path="product/:id" component={ProductInfo} />
         <Route path="order" component={CheckoutOrder} />
         <Route path="payment" component={CheckoutPayment} />
         <Route path="customer" component={CheckoutCustomer} />
         <Route path="tracking/:id" component={OrderTracking} />
      </Route>
   </Router> ), document.getElementById('root'));
