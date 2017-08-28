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
}

export const action = new TrackingAction();
