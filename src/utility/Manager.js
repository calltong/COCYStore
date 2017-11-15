import $ from 'jquery';

import {config} from '../config';
import {http} from './http';
import {cookiedb} from './CookieStore';
import {client} from './client';

class Manager {
  initial() {
    let data = cookiedb.loadData();
    this.loadOrder(data);
  }

  loadOrder(data) {
    if (data.order) {
      if (data.order.list && data.order.list.length !== 0) {
        //actions.order.setItemList(data.order.list)
      }
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
