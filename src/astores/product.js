import {Reducer} from '../redux-manager';

export const reducer = new Reducer({
  page: {
    index: 1,
    limit: 8,
    next: 'ready',
    condition: {
      type: '',
      price: '',
      tag: '',
    },
  },
  product_list: [],
  data: {
    _id: '',
    content: {
      main: {
        name: '',
        description: '',
      }
    },
    type_id: 0,
    price: 590,
    sale_price: 390,
    image: '',
    status: '',
    video: '',
    last_update: 0,
    tag_list: [],
    variant_list: [],
  },

  selected: {
    index: 0,
  },
  detail: {
    color_list: [],
    all_image: [],
    image_list: [],
    price: 0,
    quantity: 1,
    size: undefined,
    color: undefined,
  },
});

reducer.register('PRO_CLEAN', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('PRO_STORE_PRODUCT_LIST', (state, action) => {
  let {data} = action.params;
  if (data) {
    state.product_list = data;
  } else {
    state.product_list = [];
  }

  return state;
});

reducer.register('PRO_STORE_NEXT_LIST', (state, action) => {
  let {data} = action.params;
  if (data) {
    state.product_list = state.product_list.concat(data);
  }

  return state;
});

reducer.register('PRO_STORE_PRODUCT', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('PRO_SELECTED_DETAIL', (state, action) => {
  let {data} = action.params;
  state.detail = data;

  return state;
});

reducer.register('PRO_SET_IMAGE', (state, action) => {
  let {index} = action.params;
  state.selected.index = index;

  return state;
});

reducer.register('PRO_SET_PAGE', (state, action) => {
  let {page} = action.params;
  state.page = page;

  return state;
});
