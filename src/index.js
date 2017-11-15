import './assets.js';

//import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import history from './utils/history';
import mobx from './stores/store.js';

import ScrollToTop from './pages/component/ScrollToTop';

import App from './pages/App';
import NotFound from './pages/auth/404';
import Forbidden from './pages/auth/403';
/*
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
*/
ReactDOM.render((
  <Provider {...mobx}>
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <Route path="/403" component={Forbidden} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={App} />
        </Switch>
      </ScrollToTop>
    </Router>
  </Provider>
), document.getElementById('root'));

/*
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
   */
