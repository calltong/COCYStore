import _ from 'lodash';

import {Reducer} from '../redux-manager';
let instance = {
  _id: '',
  page: '',
  name: '',
  status: '',
  data: {
    title: '',
    description: '',
    list: []
  }
};

let menu = {
  _id: '',
  page: '',
  name: '',
  status: '',
  data: {
    css : {
      size : 22,
      font : '',
      color : '#000000',
      bg_color : '#ffffff'
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
        bg_color : '#ffffff'
      },
      list: [],
    },
  }
};

let product = {
  _id: '',
  page: '',
  name: '',
  status: '',
  data: {
    css : {
      size : 22,
      font : '',
      color : '#000000',
      bg_color : '#ffffff'
    },
    list: []
  }
};

export const reducer = new Reducer({
  menu: _.cloneDeep(menu),
  home: _.cloneDeep(instance),
  how_buy: _.cloneDeep(instance),
  about_us: _.cloneDeep(instance),
  order_condition: _.cloneDeep(instance),
  product: _.cloneDeep(product),
  product_list: _.cloneDeep(instance),
  payment: _.cloneDeep(instance),
});

reducer.register('PAGE_MENU', (state, action) => {
  let {data} = action.params;
  state.menu = data;

  return state;
});

reducer.register('PAGE_HOME', (state, action) => {
  let {data} = action.params;
  state.home = data;
  return state;
});

reducer.register('PAGE_ABOUT_US', (state, action) => {
  let {data} = action.params;
  state.about_us = data;
  return state;
});

reducer.register('PAGE_HOW_BUY', (state, action) => {
  let {data} = action.params;
  state.how_buy = data;
  return state;
});

reducer.register('PAGE_ORDER_CONDITION', (state, action) => {
  let {data} = action.params;
  state.order_condition = data;

  return state;
});

reducer.register('PAGE_PRODUCT', (state, action) => {
  let {data} = action.params;
  state.product = data;

  return state;
});

reducer.register('PAGE_PRODUCT_LIST', (state, action) => {
  let {data} = action.params;
  state.product_list = data;

  return state;
});

reducer.register('PAGE_PAYMENT', (state, action) => {
  let {data} = action.params;
  state.payment = data;

  return state;
});
