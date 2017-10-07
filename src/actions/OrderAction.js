import _ from 'lodash';
import {browserHistory} from 'react-router';

import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

export class OrderAction {
  reset() {
    store.update('ORDER_RESET');
  }

  getItem(id) {
    let url = `${config.api.url}/order/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  setItem(data) {
    store.update('ORDER_STORE', {data: data});
  }

  setItemList(list) {
    let order = store.getState().order.data;
    order.list = list;
    order.summary.total = 0;
    for (let item of list) {
      let cost = item.price * item.quantity;
      order.summary.total += cost;
    }

    this.setItem(order);
  }

  addToBag(product, image, color, size, quantity){
    let order = store.getState().order.data;
    let price = product.price;
    if (product.sale_price > 0) {
      price = product.sale_price;
    }

    let data = {
      image: image,
      product_id: product._id,
      color_id: color._id,
      size_id: size._id,
      name: product.content.main.name,
      color: color.content.main.name,
      size: size.content.main.name,
      price,
      quantity,
    };

    order.list.push(data);
    let cost = price * data.quantity;
    order.summary.total += cost;
    this.setItem(order);
  }

  removeFromBag(index) {
    let order = store.getState().order.data;
    let data = order.list[index];

    let cost = data.price * data.quantity;
    order.summary.total -= cost;
    if (order.summary.total < 0) {
      order.summary.total = 0;
    }
    order.list.splice(index, 1);
    this.setItem(order);
  }

  upQuantity(index) {
    let order = store.getState().order.data;
    let data = order.list[index];

    data.quantity++;
    order.summary.total += data.price;
    order.list[index] = data;
    this.setItem(order);
  }

  downQuantity(index) {
    let order = store.getState().order.data;
    let data = order.list[index];

    if (data.quantity > 1) {
      data.quantity--;
      order.summary.total -= data.price;

      if (order.summary.total < 0) {
        order.summary.total = 0;
      }

      order.list[index] = data;
      this.setItem(order);
    }
  }

  payment() {
    let data = store.getState().order.data;
    data.status = 'created';
    data.status_list.push({status: 'created', updated_at: Date.now()})
    data.created_at = Date.now();
    let url = `${config.api.url}/order/create`;
    http.post(url, {json: data, authorization: true}).done(response => {
      if (response.statusCode === http.StatusCreated) {
        let data = response.body;
        browserHistory.push(`tracking/${data._id}/address`);
        this.reset();
      }
    });
  }

  setSlip(img) {
    let order = store.getState().order.data;
    order.payment.type = 'slip';
    order.payment.data.slip = img;
    order.payment.data.updated = true;
    store.update('ORDER_STORE', {data: order});
  }
}

export const action = new OrderAction();
