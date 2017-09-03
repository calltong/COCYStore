import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';


export class ProductAction {

  getList(type) {
    let product = store.getState().product;
    let page = product.page;
    page.index = 1;
    page.next = 'loading';
    page.condition.type = type;

    let url = `${config.api.url}/product?page=1&&limit=${page.limit}`;
    if (type) {
      url += `&&type=${type}`;
    }
    store.update('PRO_SET_PAGE', {page: page});

    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        if (data) {
          page.next = 'ready';
          store.update('PRO_STORE_PRODUCT_LIST', {data});
        } else {
          page.next = 'end';
        }
        store.update('PRO_SET_PAGE', {page: page});
      }
    });
  }

  getItem(id) {
    let url = `${config.api.url}/product/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        store.update('PRO_STORE_PRODUCT_ITEM', {data});
      }
    });
  }

  getNextList(type) {
    let product = store.getState().product;
    let page = product.page;
    page.index = page.index + 1;
    page.next = 'loading';
    store.update('PRO_SET_PAGE', {page: page});
    let url = `${config.api.url}/product?page=${page.index}&&limit=${page.limit}`;
    if (type) {
      url += `&&type=${type}`;
    }

    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        if (data) {
          page.next = 'ready';
          store.update('PRO_STORE_NEXT_LIST', {data});
        } else {
          page.next = 'end';
        }
        store.update('PRO_SET_PAGE', {page: page});
      }
    });
  }

  UpQuantity() {
    store.update('PRO_UP_QUANTITY');
  }

  DownQuantity() {
    store.update('PRO_DOWN_QUANTITY');
  }

  SetSize(size) {
    store.update('PRO_SET_SIZE', {value: size});
  }

  SetImage(index) {
    store.update('PRO_SET_IMAGE', {index: index});
  }

  ClearSelected() {
    let data = {
      quantity: 1,
      size: undefined,
    };
    store.update('PRO_SELECTED_DETAIL', {data});
  }
}

export const action = new ProductAction();
