//import moment from 'moment';
import _ from 'lodash';
import {cookiedb} from '../utility/CookieStore';

import {Reducer} from '../redux-manager';
let instance = {
  _id: '',
  customer_id: '',
  status: 'order',
  promotion_id: '',
  product_list: [],
  db_list: [],
  display_list: [],
  summary: {
    discount: 0,
    shipping: 0,
    total: 0,
  },
  payment: {
    type: '',
    data: {
      slip:'',
      updated: false,
    },
  },
  shipping: {
    name: '',
    address: '',
    city: '',
    postcode: '',
    mobile: '',
    email: '',
  },
  status_list: [],
  order_date: '',
};

export const reducer = new Reducer({
  data: _.cloneDeep(instance),
  tracking: _.cloneDeep(instance),
});

reducer.register('ORDER_RESET', (state, action) => {
  state = _.cloneDeep(reducer.initial);
  return state;
});

reducer.register('ORDER_CLEAR', (state, action) => {
  let {customer_id, shipping} = action.params;
  state.data = _.cloneDeep(reducer.initial.data);
  state.data.customer_id = customer_id;
  state.data.shipping = shipping;
  cookiedb.saveOrder(state.data);
  return state;
});
/*
reducer.register('ORDER_GET_ITEM', (state, action) => {
  let {id} = action.params;

  let url = `${config.api.url}/order/${id}`;
  http.get(url, {authorization: true}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      if (data._id) {
        let list = [];
        if (data.product_list !== undefined && data.product_list !== null) {
          list = data.product_list;
        }

        data.db_list = list.map(item => {
          return {
            product_id: item.product._id,
            size_id: item.size._id,
            quantity: item.quantity,
          };
        });
        data.display_list = list;
        data.product_list = [];

        store.update('ORDER_STORE', {data: data});
      }
    }
  });

  return state;
});

reducer.register('ORDER_SAVE', (state, action) => {
  let {customer_id, status, shipping, clear, next} = action.params;
  if (customer_id) {
    state.data.customer_id = customer_id;
  }

  if (shipping) {
    state.data.shipping = shipping;
  }

  let json = _.cloneDeep(state.data);
  json.status = status;
  json.product_list = json.db_list;
  json.display_list = [];
  json.db_list = [];
  let found = json.status_list.find(item => {
    return item.status === status;
  });

  if (found === undefined) {
    json.status_list.push({status, updated_at: Date.now()});
    state.data.status_list = json.status_list;
  }

  let url = '';
  if (json._id === '') {
    json.created_at = Date.now();
    url = `${config.api.url}/order/createdb`;
    http.post(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusCreated) {
        let data = response.body;
        store.update('ORDER_SAVE_DATA', {data:data});

        if (next) {
          browserHistory.push(next);
        }
      }
    });
  } else {
    url = `${config.api.url}/order/${json._id}/editdb`;
    http.put(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        if (clear === true) {
          store.update('ORDER_CLEAR', {
            customer_id: state.data.customer_id,
            shipping: state.data.shipping,
          });
        } else {
          cookiedb.saveOrder(state.data);
        }

        if (next) {
          browserHistory.push(next);
        }
      }
    });
  }

  return state;
});
*/
reducer.register('ORDER_STORE', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});
/*
reducer.register('ORDER_STORE_ORDER', (state, action) => {
  let {display, db} = action.params;
  state.data.display_list = display;
  state.data.db_list = db;
  let total = 0;
  for (let item of display) {
    let price = item.product.price;
    if (item.product.sale_price > 0) {
      price = item.product.sale_price;
    }
    let cost = price * item.quantity;
    total += cost;
  }

  state.data.summary.total = total;
  return state;
});

reducer.register('ORDER_SAVE_DATA', (state, action) => {
  let {data} = action.params;
  state.data._id = data._id;
  cookiedb.saveOrder(state.data);
  return state;
});


reducer.register('ORDER_ADD_BAG', (state, action) => {
  let {product, size, quantity} = action.params;
  let price = product.price;
  if (product.sale_price > 0) {
    price = product.sale_price;
  }
  let data = {
    product,
    size,
    price,
    quantity,
  };

  let pdata = {
    product_id: product._id,
    size_id: size._id,
    price,
    quantity,
  };

  state.data.display_list.push(data);
  state.data.db_list.push(pdata);
  let price = data.product.price;
  if (data.product.sale_price > 0) {
    price = data.product.sale_price;
  }
  let cost = price * data.quantity;
  state.data.summary.total += cost;
  cookiedb.saveOrder(state.data);
  return state;
});

reducer.register('ORDER_REMOVE_BAG', (state, action) => {
  let {index} = action.params;

  let data = state.data.display_list[index];
  let price = data.product.price;
  if (data.product.sale_price > 0) {
    price = data.product.sale_price;
  }
  let cost = price * data.quantity;
  state.data.summary.total -= cost;
  if (state.data.summary.total < 0) {
    state.data.summary.total = 0;
  }
  state.data.display_list.splice(index, 1);
  state.data.db_list.splice(index, 1);
  cookiedb.saveOrder(state.data);
  return state;
});


reducer.register('ORDER_UP_QUANTITY', (state, action) => {
  let {index} = action.params;

  let data = state.data.display_list[index];
  let price = data.product.price;
  if (data.product.sale_price > 0) {
    price = data.product.sale_price;
  }
  data.quantity++;
  state.data.summary.total += price;
  state.data.display_list[index] = data;
  state.data.db_list[index].quantity++;
  cookiedb.saveOrder(state.data);
  return state;
});

reducer.register('ORDER_DOWN_QUANTITY', (state, action) => {
  let {index} = action.params;

  let data = state.data.display_list[index];
  let price = data.product.price;
  if (data.product.sale_price > 0) {
    price = data.product.sale_price;
  }

  if (data.quantity > 1) {
    data.quantity--;
    state.data.summary.total -= price;

    if (state.data.summary.total < 0) {
      state.data.summary.total = 0;
    }

    state.data.display_list[index] = data;
    state.data.db_list[index].quantity--;
    cookiedb.saveOrder(state.data);
  }

  return state;
});

/*
reducer.register('ORDER_SET_SLIP', (state, action) => {
  let {data} = action.params;
  state.data.payment.type = 'slip';
  state.data.payment.data.slip = data;
  state.data.payment.data.updated = true;
  return state;
});


reducer.register('ORDER_GET_TRACKING', (state, action) => {
  let {id} = action.params;

  let url = `${config.api.url}/order/${id}`;
  http.get(url, {authorization: true}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      data.display_list = data.product_list;
      data.product_list = [];

      store.update('ORDER_STORE_TRACKING', {data: data});
    }
  });

  return state;
});
*/

reducer.register('ORDER_STORE_TRACKING', (state, action) => {
  let {data} = action.params;
  state.tracking = data;
  return state;
});
