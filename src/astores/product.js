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
    name: 'ชุดชั้นใน สวยมาก',
    type_id: 0,
    information: '',
    price: 590,
    sale_price: 390,
    image: '',
    status: '',
    video: '',
    last_update: 0,
    image_list: [],
    color_list: [],
    tag_list: [],
    stock_list: [],
    connected_list: [],
    lang_eng: {
      name: '',
      information: '',
    },
  },
  selected: {
    index: 0,
  },
  detail: {
    quantity: 1,
    size: undefined,
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
  } else {
    state.page.no_next = true;
  }

  return state;
});

reducer.register('PRO_STORE_PRODUCT_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('PRO_UP_QUANTITY', (state, action) => {
  state.detail.quantity++;
  return state;
});

reducer.register('PRO_DOWN_QUANTITY', (state, action) => {
  if (state.detail.quantity > 1) {
    state.detail.quantity--;
  }

  return state;
});

reducer.register('PRO_SET_SIZE', (state, action) => {
  let {value} = action.params;
  state.detail.size = value;

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
