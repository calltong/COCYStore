//import {facebook} from './Facebook';
import $ from 'jquery';

import {config} from '../config';
import {http} from './http';
import {store} from '../store';
import {cookiedb} from './CookieStore';
import {client} from './client';
//import {actions} from '../actions/Action';

class Manager {
  initial() {
    let data = cookiedb.loadData();
    //console.log('cookie:', data);
    this.loadCustomer(data);
    this.loadOrder(data);
    /*
    let me = this;
    facebook.setupInit(function(res) {
      if (res.result === true) {
        store.update('MAIN_SET_FB_SDK', {ready: true});
        me.loadCustomer();
      } else {
        store.update('MAIN_SET_FB_SDK', {ready: false});
      }
    });
    */
  }

  loadOrder(data) {
    if (data.order) {
      if (data.order.id && data.order.id !== '') {
        store.update('ORDER_GET_ITEM', {id: data.order.id});
      } else if (data.order.list.length !== 0) {
        let url = `${config.api.url}/order/reword`;
        http.post(url, {json: {product_list: data.order.list}}).done(response => {
          if (response.statusCode === http.StatusOK) {
            let cdata = response.body;
            store.update('ORDER_STORE_ORDER', {display: cdata, db: data.order.list});
          }
        });
      }
    }
  }

  loadCustomer(data) {
    let browser = this.getBrowserId();
    if (data.customer) {
      let url = '';
      if (data.customer.id !== undefined) {
        url = `${config.api.url}/customer/${data.customer.id}/id`;
      } else {
        if (data.customer.browser !== undefined) {
          browser = data.customer.browser;
        }

        url = `${config.api.url}/customer/${browser}/browser`;
      }

      http.get(url, {}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let cdata = response.body;
          store.update('CUSTOMER_STORE', {data: cdata});
          store.update('CUSTOMER_SET_LOGIN', {login: true});
        }
      });
    }
  }

  getBrowserId() {
    let id = client.getFingerprint();
    return `${id}`;
  }

  DisplayPanel(id) {
    $(id).modal('show');
  }

  ClosePanel(id) {
    $(id).modal('hide');
  }

  TogglePanel(id) {
    $(id).modal('toggle');
  }

  DisplayMenu(id) {
    $(id).collapse('show');
  }

  CloseMenu(id) {
    $(id).collapse('hide');
  }

  ToggleMenu(id) {
    $(id).collapse('toggle');
  }

  GetWindowWidth() {
    return $(window).width();
  }

  SetOnTop() {
    $(document.body).scrollTop(0);
  }
}

export const manager = new Manager();