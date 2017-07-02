import cookie from 'react-cookie';
import request from 'then-request';

function resolve(promise) {
  return {
    done: (callback) => {
      promise.done(response => {
        if (response.body) {
          response.body = JSON.parse(response.body);
        } else {
          response.body = {};
        }

        callback(response);
      }, (err) => {
        console.log('error:', err);
      });
    },
  };
}

function setAuthorizationHeaders(options) {
  options.headers = {};

  if (options.token) {
    let token = cookie.load('auth').token;
    options.headers.token = token;
  }

  if (options.authorization) {
    let token = cookie.load('auth').token;
    options.headers.authorization = `Bearer ${token}`;
  }
  return options;
}

class Http {
  constructor() {
    this.request = request;

    this.StatusOK = 200;
    this.StatusCreated = 201;
  }

  get(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('GET', url, options));
  }

  post(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('POST', url, options));
  }

  put(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('PUT', url, options));
  }

  delete(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('DELETE', url, options));
  }
}

export const http = new Http();
