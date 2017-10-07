import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

export class ProductAction {
  getList(type, value) {
    let product = store.getState().product;
    let page = product.page;
    let url = `${config.api.url}/product?page=1&&limit=${page.limit}`;
    if (type === 'category' && value !== 'all') {
      url += `&&type=${value}`;
    }

    page.index = 1;
    page.next = 'loading';
    store.update('PRO_SET_PAGE', {page: page});
    store.update('PRO_STORE_PRODUCT_LIST', {data: []});

    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        if (data && data.length > 0) {
          store.update('PRO_STORE_PRODUCT_LIST', {data});
          page.next = 'ready';
        } else {
          page.next = 'end';
        }
        store.update('PRO_SET_PAGE', {page: page});
      }
    });
  }

  getNextList(type, value) {
    let product = store.getState().product;
    let page = product.page;
    page.index += 1;
    page.next = 'loading';
    store.update('PRO_SET_PAGE', {page: page});
    let url = `${config.api.url}/product?page=${page.index}&&limit=${page.limit}`;
    if (type === 'category' && value !== 'all') {
      url += `&&type=${value}`;
    }

    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        if (data && data.length > 0) {
          page.next = 'ready';
          store.update('PRO_STORE_NEXT_LIST', {data});
        } else {
          page.next = 'end';
        }
        store.update('PRO_SET_PAGE', {page: page});
      }
    });
  }

  getItem(id) {
    let url = `${config.api.url}/product/${id}/get`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        let colors = [
          {
            value: '',
            label: 'เลือกสี',
            clearableValue: false,
          }
        ];
        let images = [];
        let len = data.variant_list.length;
        for (let item of data.variant_list) {
          let color = {
            value: item.color._id,
            label: item.color.content.main.name,
            clearableValue: false,
          };
          colors.push(color);

          images = images.concat(item.image_list);
        }

        if (len > 1) {
          this.SetVaraint(undefined, undefined, images, images, colors);
        } else if (len === 1) {
          colors.splice(0, 1);
          let variant = data.variant_list[0];
          let size = variant.list[0];
          if (variant.list.length > 0) {
            size = variant.list[0].size;
          }
          this.SetVaraint(variant.color, size, variant.image_list, variant.image_list, colors);
        }

        store.update('PRO_STORE_PRODUCT', {data});
      }
    });
  }

  UpQuantity() {
    let data = store.getState().product.detail;
    data.quantity++;
    store.update('PRO_SELECTED_DETAIL', {data});
  }

  DownQuantity() {
    let data = store.getState().product.detail;
    if (data.quantity > 0) {
      data.quantity--;
      store.update('PRO_SELECTED_DETAIL', {data});
    }
  }

  SetVaraint(color, size, allImages, images, colors) {
    let data = store.getState().product.detail;

    data.color = color;
    data.size = size;
    data.all_image = allImages;
    data.image_list = images;
    data.color_list = colors;
    data.quantity = 1;
    store.update('PRO_SELECTED_DETAIL', {data});
  }

  SetColor(color, size, list) {
    let data = store.getState().product.detail;
    data.color = color;
    data.size = size;
    data.image_list = list;
    store.update('PRO_SELECTED_DETAIL', {data});
  }

  SetSize(size) {
    let data = store.getState().product.detail;
    data.size = size;
    store.update('PRO_SELECTED_DETAIL', {data});
  }

  SetImage(index) {
    store.update('PRO_SET_IMAGE', {index: index});
  }

  ClearSelected() {
    let data = {
      quantity: 1,
      size: undefined,
      color: undefined,
      all_image: [],
      image_list: [],
      color_list: [],
    };
    store.update('PRO_SELECTED_DETAIL', {data});
  }
}

export const action = new ProductAction();
