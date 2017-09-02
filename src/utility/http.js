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
    //let token = cookie.load('auth').token;
    //options.headers.authorization = token;
    options.headers.authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhMjhiMWMwZDI3ZmFiNThlZjUyZjYzIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9zZW9jeSIsImRiX25hbWUiOiJwb21wb21fZGIiLCJhZGRyZXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAxIn0sImV4cCI6MTUzNTkwMDgyNn0.o6TOwvyCbRIkhA_89ZQ60XKh-Dr1g76eiZZZvO4Cgwg';
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
