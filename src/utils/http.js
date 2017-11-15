import request from 'then-request';

import { config } from '../config';

export class Http {
  constructor() {
    this.httpReq = request;
  }

  setAuthorization(options) {
    if (!options.headers) options.headers = {};
    options.headers['Authorization'] = config.token;

    return options;
  }

  parseBody(response) {
    if (response.statusCode === 200 && response.body !== null && response.body !== undefined) {
      response.body = JSON.parse(response.body)
    };
    return response;
  }

  async get(url, options = {}) {
    options = this.setAuthorization(options);
    let response = await this.httpReq('GET', url, options);
    return this.parseBody(response);
  }

  async post(url, options = {}) {
    options = this.setAuthorization(options);

    let response = await this.httpReq('POST', url, options);
    return this.parseBody(response);
  }

  async put(url, options = {}) {
    options = this.setAuthorization(options);

    let response = await this.httpReq('PUT', url, options);
    return this.parseBody(response);
  }

  async delete(url, options = {}) {
    options = this.setAuthorization(options);
    let response = await this.httpReq('DELETE', url, options);
    return this.parseBody(response);
  }
}

export const http = new Http();
export default http;
