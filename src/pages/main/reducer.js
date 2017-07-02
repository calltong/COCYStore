//import moment from 'moment';
//import {browserHistory} from 'react-router';
import {store} from '../../store';
import {config} from '../../config';

import {http} from '../../utility/http';
import {Reducer} from '../../redux-manager';

export const reducer = new Reducer({
  content: {
    _id: '',
    name: '',
    status: 'active',
    information: {
      company: '',
      detail: '',
      address: '',
      mobile: '',
      email: '',
      line: '',
    },
    menu: {
      brand: {
        type: '',
        name: '',
        css: {
          font: '',
          color: '',
          bg_color: '',
        }
      },
      css: {
        font: '',
        color: '',
        bg_color: '',
      },
      list: [],
    },
    social_list: [],
    content_list: [],
    type_list: [],
    condition_list: [],
    shop_list: [],
  },
  sdk: {
    facebook_ready: false,
  },
});

reducer.register('MAIN_CLEAN_STATE', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('MAIN_GET', (state, action) => {
  let url = `${config.api.url}/page/active`;
  http.get(url, {}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      store.update('MAIN_STORE', {data});
    }
  });

  return state;
});

reducer.register('MAIN_STORE', (state, action) => {
  let {data} = action.params;
  state.content = data;
  return state;
});

reducer.register('MAIN_GET_TYPE', (state, action) => {
  let url = `${config.api.url}/protype`;
  http.get(url, {}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      store.update('MAIN_STORE_TYPE', {data});
    }
  });

  return state;
});

reducer.register('MAIN_STORE_TYPE', (state, action) => {
  let {data} = action.params;
  state.type_list = data;
  return state;
});

reducer.register('MAIN_SET_FB_SDK', (state, action) => {
  let {ready} = action.params;
  if (ready) {
    state.sdk.facebook_ready = ready;
  }

  return state;
});
