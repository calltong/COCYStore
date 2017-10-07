import {config} from '../config';

export class GoogleAnalytic {
  constructor() {
    let ReactGA = require('react-ga');
    ReactGA.initialize(config.google.analytics);
    this.googleAnalytic = ReactGA;
  }

  view(name = undefined) {
    let path = window.location.pathname;
    if (name) {
      path = `${path}[${name}]`;
    }
    this.googleAnalytic.ga('send', 'pageview', path);
    //console.log('View:', path);
  }

  action(category, action, label) {
    this.googleAnalytic.event({
      category: category,
      action: action,
      label: label,
      nonInteraction: true,
    });
    //console.log('Event:', category, action, label);
  }
}

export const ga = new GoogleAnalytic();
export default ga;
