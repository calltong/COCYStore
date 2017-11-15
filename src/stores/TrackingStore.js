import _ from 'lodash';
import {browserHistory} from 'react-router';

import BaseStore from './BaseStore';
import {config} from '../config';
import {http} from '../utils/http';

let instance = {
  _id: '',
  customer_id: '',
  status: 'order',
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

export class TrackingStore extends BaseStore {
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

  setShipping(shipping) {
    this.data.shipping = shipping;
  }

  async saveShipping() {
    let data = this.toJS().data;
    let status = 'working';
    let val = data.status_list.find(item => {
      return item.status === status;
    });

    if (val === undefined) {
      data.status = status;
      data.status_list.push({status, updated_at: Date.now()})
    }

    if (data._id !== '') {
      let url = `${config.api.url}/order/${data._id}/edit`;
      let response = await http.put(url, {json: data, authorization: true});
      if (response.statusCode === 200) {
        browserHistory.push(`/tracking/${data._id}`);
      }
    }
  }
}

export default new TrackingStore();
