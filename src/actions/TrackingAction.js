import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {browserHistory} from 'react-router';

export class TrackingAction {
  reset() {
    store.update('TRACKING_RESET');
  }

  getItem(id) {
    let url = `${config.api.url}/order/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  setItem(data) {
    store.update('TRACKING_STORE', {data: data});
  }

  setShipping(shipping) {
    let data = store.getState().tracking.data;
    data.shipping = shipping;
    store.update('TRACKING_STORE', {data: data});
  }

  saveShipping() {
    let data = store.getState().tracking.data;
    let status = 'working';
    let val = data.status_list.find(item => {
      return item.status === status;
    });

    if (val === undefined) {
      data.status = status;
      data.status_list.push({status, updated_at: Date.now()})
    }

    if (data._id !== '') {
      let url = `${config.api.url}/order/${data._id}/edit`;
      http.put(url, {json: data, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          browserHistory.push(`/tracking/${data._id}`);
        }
      });
    }
  }
}

export const action = new TrackingAction();
