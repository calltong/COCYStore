import _ from 'lodash';
import {browserHistory} from 'react-router';

import BaseStore from './BaseStore';

import {config} from '../config';
import {http} from '../utils/http';

let instance = {
  _id: '',
  customer_id: '',
  status: 'created',
  promotion_id: '',
  list: [],
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

export class OrderStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      data: _.cloneDeep(instance),
    });
  }

  reset() {
    this.data = _.cloneDeep(instance);
  }

  async getItem(id) {
    let url = `${config.api.url}/order/${id}`;
    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let data = response.body;
      this.data = data;
    }
  }

  setItem(data) {
    this.data = data;
  }

  setItemList(list) {
    let order = this.toJS().data;
    order.list = list;
    order.summary.total = 0;
    for (let item of list) {
      let cost = item.price * item.quantity;
      order.summary.total += cost;
    }

    this.data = order;
  }

  addToBag(product, image, color, size, quantity){
    let order = this.toJS().data;
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
    this.data = order;
  }

  removeFromBag(index) {
    let order = this.toJS().data;
    let data = order.list[index];

    let cost = data.price * data.quantity;
    order.summary.total -= cost;
    if (order.summary.total < 0) {
      order.summary.total = 0;
    }
    order.list.splice(index, 1);
    this.data = order;
  }

  upQuantity(index) {
    let order = this.toJS().data;
    let data = order.list[index];

    data.quantity++;
    order.summary.total += data.price;
    order.list[index] = data;
    this.data = order;
  }

  downQuantity(index) {
    let order = this.toJS().data;
    let data = order.list[index];

    if (data.quantity > 1) {
      data.quantity--;
      order.summary.total -= data.price;

      if (order.summary.total < 0) {
        order.summary.total = 0;
      }

      order.list[index] = data;
      this.data = order;
    }
  }

  async payment() {
    let data = this.toJS().data;
    data.status = 'created';
    data.status_list.push({status: 'created', updated_at: Date.now()})
    data.created_at = Date.now();
    let url = `${config.api.url}/order/create`;
    let response = await http.post(url, {json: data, authorization: true});
    if (response.statusCode === 201) {
      let data = response.body;
      browserHistory.push(`tracking/${data._id}/address`);
      this.reset();
    }
  }

  setSlip(img) {
    let order = this.toJS().data;
    order.payment.type = 'slip';
    order.payment.data.slip = img;
    order.payment.data.updated = true;
    this.data = order;
  }
}

export default new OrderStore();
