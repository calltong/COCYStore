import _ from 'lodash';
import {browserHistory} from 'react-router';

import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {cookiedb} from '../utility/CookieStore';

export class OrderAction {
  clear(customer_id, shipping) {
    store.update('ORDER_CLEAR', {customer_id, shipping});
  }

  getItem(id) {
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
            let price = item.product.price;
            if (item.product.sale_price > 0) {
              price = item.product.sale_price;
            }
            return {
              product_id: item.product._id,
              size_id: item.size._id,
              price,
              quantity: item.quantity,
            };
          });
          data.display_list = list;
          data.product_list = [];

          store.update('ORDER_STORE', {data: data});
        }
      }
    });
  }

  addToBag(product, size, quantity){
    let order = store.getState().order.data;
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

    order.display_list.push(data);
    order.db_list.push(pdata);
    let cost = price * data.quantity;
    order.summary.total += cost;
    cookiedb.saveOrder(order);
    store.update('ORDER_STORE', {data: order});
  }

  removeFromBag(index) {
    let order = store.getState().order.data;
    let data = order.display_list[index];
    let price = data.product.price;
    if (data.product.sale_price > 0) {
      price = data.product.sale_price;
    }
    let cost = price * data.quantity;
    order.summary.total -= cost;
    if (order.summary.total < 0) {
      order.summary.total = 0;
    }
    order.display_list.splice(index, 1);
    order.db_list.splice(index, 1);
    cookiedb.saveOrder(order);
    store.update('ORDER_STORE', {data: order});
  }

  upQuantity(index) {
    let order = store.getState().order.data;
    let data = order.display_list[index];
    let price = data.product.price;
    if (data.product.sale_price > 0) {
      price = data.product.sale_price;
    }
    data.quantity++;
    order.summary.total += price;
    order.display_list[index] = data;
    order.db_list[index].quantity++;
    cookiedb.saveOrder(order);
    store.update('ORDER_STORE', {data: order});
  }

  downQuantity(index) {
    let order = store.getState().order.data;
    let data = order.display_list[index];
    let price = data.product.price;
    if (data.product.sale_price > 0) {
      price = data.product.sale_price;
    }

    if (data.quantity > 1) {
      data.quantity--;
      order.summary.total -= price;

      if (order.summary.total < 0) {
        order.summary.total = 0;
      }

      order.display_list[index] = data;
      order.db_list[index].quantity--;
      cookiedb.saveOrder(order);
      store.update('ORDER_STORE', {data: order});
    }
  }

  save(customer_id, status, shipping, clear, next) {
    let order = store.getState().order.data;
    if (customer_id) {
      order.customer_id = customer_id;
    }

    if (shipping) {
      order.shipping = shipping;
    }

    let json = _.cloneDeep(order);
    json.status = status;
    json.product_list = json.db_list;
    json.display_list = [];
    json.db_list = [];
    let found = json.status_list.find(item => {
      return item.status === status;
    });

    if (found === undefined) {
      json.status = status;
      order.status = status;
      json.status_list.push({status, updated_at: Date.now()});
      order.status_list = json.status_list;
    }

    let url = '';
    if (json._id === '') {
      json.created_at = Date.now();
      url = `${config.api.url}/order/createdb`;
      http.post(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusCreated) {
          let data = response.body;
          order._id = data._id;
          store.update('ORDER_STORE', {data: order});
          cookiedb.saveOrder(order);
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
            this.clear(order.customer_id, order.shipping);
          } else {
            cookiedb.saveOrder(order);
          }

          if (next) {
            browserHistory.push(next);
          }
        }
      });
    }
  }

  setSlip(img) {
    let order = store.getState().order.data;
    order.payment.type = 'slip';
    order.payment.data.slip = img;
    order.payment.data.updated = true;
    store.update('ORDER_STORE', {data: order});
  }

  reverseOrder(data) {
    let order = store.getState().order.data;
    let url = `${config.api.url}/order/reword`;
    http.post(url, {json: {product_list: data.order.list}, authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body;
        order.display_list = list;
        order.db_list = data.order.list;
        let total = 0;
        for (let item of list) {
          let price = item.product.price;
          if (item.product.sale_price > 0) {
            price = item.product.sale_price;
          }
          let cost = price * item.quantity;
          total += cost;
        }

        order.summary.total = total;
        store.update('ORDER_STORE', {data: order});
      }
    });
  }

  getOrderByTracking(id) {
    let url = `${config.api.url}/order/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        data.display_list = data.product_list;
        data.product_list = [];

        store.update('ORDER_STORE_TRACKING', {data: data});
      }
    });
  }
}

export const action = new OrderAction();
