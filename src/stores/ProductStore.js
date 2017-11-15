import BaseStore from './BaseStore';

import {config} from '../config';
import {http} from '../utils/http';

export class ProductStore extends BaseStore {
  constructor() {
    super();
    this.observable({
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
  }

  async getList(type, value) {
    let page = this.toJS().page;
    let url = `${config.api.url}/product?page=1&&limit=${page.limit}`;
    if (type === 'category' && value !== 'all') {
      url += `&&type=${value}`;
    }

    this.page.index = 1;
    this.page.next = 'loading';
    this.product_list = [];

    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let data = response.body;
      if (data && data.length > 0) {
        this.product_list = data;
        this.page.next = 'ready';
      } else {
        this.page.next = 'end';
      }
    }
  }

  async getNextList(type, value) {
    let page = this.toJS().page;
    this.page.index += 1;
    this.page.next = 'loading';
    let url = `${config.api.url}/product?page=${page.index}&&limit=${page.limit}`;
    if (type === 'category' && value !== 'all') {
      url += `&&type=${value}`;
    }

    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let data = response.body;
      if (data && data.length > 0) {
        this.product_list = this.product_list.concat(data);
        this.page.next = 'ready';
      } else {
        this.page.next = 'end';
      }
    }
  }

  async getItem(id) {
    let url = `${config.api.url}/product/${id}/get`;
    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let data = response.body;
      let colors = [{
          value: '',
          label: 'เลือกสี',
          clearableValue: false,
      }];
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

      this.data = data;
    }
  }

  UpQuantity() {
    this.detail.quantity++;
  }

  DownQuantity() {
    if (this.detail.quantity > 0) {
      this.detail.quantity--;
    }
  }

  SetVaraint(color, size, allImages, images, colors) {
    this.detail = {
      color_list: colors,
      all_image: allImages,
      image_list: images,
      price: 0,
      quantity: 1,
      size: size,
      color: color,
    };
  }

  SetColor(color, size, list) {
    this.detail.color = color;
    this.detail.size = size;
    this.detail.image_list = list;
  }

  SetSize(size) {
    this.detail.size = size;
  }

  ClearSelected() {
    this.detail = {
      color_list: [],
      all_image: [],
      image_list: [],
      price: 0,
      quantity: 1,
      size: undefined,
      color: undefined,
    };
  }
}

export default new ProductStore();
