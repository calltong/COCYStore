//import {store} from '../store';
//import {ReactGA} from 'react-ga';
//import {config} from '../config';
//import {http} from '../utility/http';
import {client} from '../utility/client';
//import {cookiedb} from '../utility/CookieStore';

let id = client.getFingerprint();
let ReactGA = require('react-ga');
ReactGA.initialize('UA-100117427-1', {
  gaOptions: {
    userId: id,
  }});

export class TrackingAction {
  data = {
    updated_at: {
      name: '',
      value: '',
    },
    user: {
      _id: '',
      customer_id: '',
      browser: '',
      status_list: [],
    },
  };

  view() {
    let path = window.location.pathname;
    ReactGA.ga('send', 'pageview', path);
  }

  action(category, action, label) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
      nonInteraction: true,
    });
  }

  /*
  save() {
    if (this.data.user._id !== '') {
      let url = `${config.api.url}/trackuser/${this.data.user._id}/edit`;
      http.put(url, {json: this.data.user}).done(response => {
      });
    }
  }

  createUser(customer_id, browser) {
    let url = `${config.api.url}/trackuser/create`;
    this.data.user = {
      customer_id: customer_id,
      browser: browser,
      status_list: [{
        status: 'open',
        value: window.location.pathname,
        updated_at: Date.now(),
      }],
    };

    http.post(url, {json: this.data.user}).done(response => {
      if (response.statusCode === http.StatusCreated) {
        this.data.user = response.body;
      }
    });
  }
  */
}

export const action = new TrackingAction();
