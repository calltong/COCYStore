import _ from 'lodash';

import BaseStore from './BaseStore';
import { config } from '../config';
import { http } from '../utils/http';

let instance = {
  page: '',
  name: '',
  status: '',
  data: {
    title: '',
    description: '',
    list: [],
  },
};

let menu = {
  page: '',
  name: '',
  status: '',
  data: {
    css : {
      size : 22,
      font : '',
      color : '#000000',
      bg_color : '#ffffff',
    },
    menu: {
      css : {
        size : 22,
        font : '',
        color : '#000000',
        bg_color : '#ffffff',
      },
      brand: {
        type: 'text',
        name: '',
        css: {
          size : 22,
          font : '',
          color : '#000000',
          bg_color : '#ffffff',
        }
      },
      list: [],
    },
    footer: {
      css : {
        size : 22,
        font : '',
        color : '#000000',
        bg_color : '#ffffff',
      },
      list: [],
    },
  }
};

let product = {
  page: '',
  name: '',
  status: '',
  data: {
    css : {
      size : 22,
      font : '',
      color : '#000000',
      bg_color : '#ffffff',
    },
    list: [],
  }
};

export class PageStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      menu: _.cloneDeep(menu),
      home: _.cloneDeep(instance),
      how_buy: _.cloneDeep(instance),
      about_us: _.cloneDeep(instance),
      order_condition: _.cloneDeep(instance),
      product: _.cloneDeep(product),
      product_list: _.cloneDeep(instance),
      payment: _.cloneDeep(instance),
    });
  }

  async getMenu() {
    let page = this.toJS();
    if (page.menu._id === undefined) {
      let url = `${config.api.url}/page/menu/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.menu = data;
      }
    }
  }

  async getHome() {
    let page = this.toJS();
    if (page.home._id === undefined) {
      let url = `${config.api.url}/page/home/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.home = data;
      }
    }
  }

  async getHowBuy() {
    let page = this.toJS();
    if (page.how_buy._id === undefined) {
      let url = `${config.api.url}/page/how_to_buy/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.how_buy = data;
      }
    }
  }

  async getOrderCondition() {
    let page = this.toJS();
    if (page.order_condition._id === undefined) {
      let url = `${config.api.url}/page/order_condition/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.order_condition = data;
      }
    }
  }

  async getAboutus() {
    let page = this.toJS();
    if (page.about_us._id === undefined) {
      let url = `${config.api.url}/page/about_us/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.about_us = data;
      }
    }
  }

  async getProduct() {
    let page = this.toJS();
    if (page.product._id === '') {
      let url = `${config.api.url}/page/product/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.product = data;
      }
    }
  }

  async getProductList() {
    let page = this.toJS();
    if (page.product_list._id === undefined) {
      let url = `${config.api.url}/page/product_list/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.product_list = data;
      }
    }
  }

  async getPayment() {
    let page = this.toJS();
    if (page.payment._id === undefined) {
      let url = `${config.api.url}/page/payment/active`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let data = response.body;
        this.payment = data;
      }
    }
  }
}

export default new PageStore();
