//import moment from 'moment';
import _ from 'lodash';

import {Reducer} from '../redux-manager';
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

export const reducer = new Reducer({
  data: _.cloneDeep(instance),
});

reducer.register('TRACKING_RESET', (state, action) => {
  state = _.cloneDeep(reducer.initial);
  return state;
});

reducer.register('TRACKING_STORE', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});
