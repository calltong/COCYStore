import _ from 'lodash';
import {cookiedb} from '../utility/CookieStore';

import {Reducer} from '../redux-manager';
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

export const reducer = new Reducer({
  data: _.cloneDeep(instance),
});

reducer.register('ORDER_RESET', (state, action) => {
  state.data = _.cloneDeep(instance);
  cookiedb.saveOrder(state.data);
  return state;
});

reducer.register('ORDER_STORE', (state, action) => {
  let {data} = action.params;
  state.data = data;
  cookiedb.saveOrder(data);
  return state;
});
