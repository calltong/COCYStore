import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

export class PageAction {  
  getMenu() {
    let page = store.getState().page;
    if (page.menu._id === '') {
      let url = `${config.api.url}/page/menu/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_MENU', {data});
        }
      });
    }
  }

  getHome() {
    let page = store.getState().page;
    if (page.home._id === '') {
      let url = `${config.api.url}/page/home/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_HOME', {data});
        }
      });
    }
  }

  getHowBuy() {
    let page = store.getState().page;
    if (page.how_buy._id === '') {
      let url = `${config.api.url}/page/how_to_buy/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_HOW_BUY', {data});
        }
      });
    }
  }

  getOrderCondition() {
    let page = store.getState().page;
    if (page.order_condition._id === '') {
      let url = `${config.api.url}/page/order_condition/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_ORDER_CONDITION', {data});
        }
      });
    }
  }

  getAboutus() {
    let page = store.getState().page;
    if (page.about_us._id === '') {
      let url = `${config.api.url}/page/about_us/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_ABOUT_US', {data});
        }
      });
    }
  }

  getProduct() {
    let page = store.getState().page;
    if (page.product._id === '') {
      let url = `${config.api.url}/page/product/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_PRODUCT', {data});
        }
      });
    }
  }

  getProductList() {
    let page = store.getState().page;
    if (page.product_list._id === '') {
      let url = `${config.api.url}/page/product_list/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_PRODUCT_LIST', {data});
        }
      });
    }
  }

  getPayment() {
    let page = store.getState().page;
    if (page.payment._id === '') {
      let url = `${config.api.url}/page/payment/active`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let data = response.body;
          store.update('PAGE_PAYMENT', {data});
        }
      });
    }
  }
}

export const action = new PageAction();
