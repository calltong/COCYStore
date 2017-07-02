//import moment from 'moment';
//import {browserHistory} from 'react-router';
import _ from 'lodash';
import {manager} from '../../utility/Manager';
import {store} from '../../store';
import {config} from '../../config';
import {cookiedb} from '../../utility/CookieStore';
import {http} from '../../utility/http';
import {Reducer} from '../../redux-manager';

export const reducer = new Reducer({
  login: {
    status: false,
    facebook: {
      status: false,
      data: {},
    },
    line: {
      status: false,
      data: {},
    },
  },
  data: {
    _id: '',
    browser: '',
    type: '',
    name: '',
    email: '',
    password: '',
    status: '',
    information: {
      address: '',
      city: '',
      postcode: '',
      mobile: '',
    },
    media_list: [],
    order_date: '',
  },
  register_user: {
    disable: true,
    email: '',
    password: '',
    retry: '',
    err: '',
  },
  message: '',
});

reducer.register('CUSTOMER_CLEAN', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('CUSTOMER_CREATE', (state, action) => {
  let {next} = action.params;
  let data = _.cloneDeep(reducer.initial);
  let id = manager.getBrowserId();
  data.browser = `${id}`;
  data.type = 'guest';
  state.data = data;
  let url = `${config.api.url}/customer/create`;
  http.post(url, {json: data}).done(response => {
    if (response.statusCode === http.StatusCreated) {
      let cdata = response.body;
      store.update('CUSTOMER_STORE', {data: cdata});
      store.update('CUSTOMER_SET_LOGIN', {login: true});
      store.update('ORDER_SAVE', {
        customer_id: cdata._id,
        status: 'order',
        next: next,
      });
    }
  });
  return state;
});

reducer.register('CUSTOMER_SAVE', (state, action) => {
  let {data} = action.params;
  if (data) {
    state.data = data;
  }
  let json = state.data;
  let url = `${config.api.url}/customer/${json._id}/edit`;
  http.put(url, {json}).done(response => {
    if (response.statusCode !== http.StatusOK) {
      let msg = response.body;
      store.update('CUSTOMER_SET_MESSAGE', {data: msg});
    }
  });
  return state;
});

reducer.register('CUSTOMER_GET_BY_ID', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/customer/${id}`;
  http.get(url, {}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      store.update('CUSTOMER_STORE', {data});
      store.update('CUSTOMER_SET_LOGIN', {login: true});
    }
  });

  return state;
});

reducer.register('CUSTOMER_GET_BY_LINE', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/customer/${id}/line`;
  http.get(url).done(response => {
    console.log('Code:', response.statusCode);
    console.log('Body:', response.body);
  });
  return state;
});

reducer.register('CUSTOMER_SET_LOGIN', (state, action) => {
  let {login} = action.params;
  state.login.status = login;

  return state;
});

reducer.register('CUSTOMER_STORE', (state, action) => {
  let {data} = action.params;
  state.data = data;
  cookiedb.saveCustomer(data._id);
  return state;
});

reducer.register('CUSTOMER_SET_REGISTER', (state, action) => {
  let {data} = action.params;

  state.register_user = data;
  return state;
});

reducer.register('CUSTOMER_SET_MESSAGE', (state, action) => {
  let {data} = action.params;

  state.message = data;
  return state;
});
