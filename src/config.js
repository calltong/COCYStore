class Config {

  constructor() {

    this.api = {
      url: 'http://139.59.109.169:8081',
    };

    this.token = '';
  }

  setup(host) {
    if (host.includes('localhost')) {
      this.localhost();
    } else if (host.includes('cocy.shop')) {
      this.cocyProduction();
    } else {
      this.ngynProduction();
    }
  }

  localhost() {
    this.api = {
      url: 'http://localhost:8081',
    };

    // COCY
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhMjhiMWMwZDI3ZmFiNThlZjUyZjYzIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9zZW9jeSIsImRiX25hbWUiOiJwb21wb21fZGIiLCJhZGRyZXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAxIn0sImV4cCI6MTUzNjY0ODM0M30.hfH-NaKMAobxxE1K7962oo7su6RYn4DdnxKr-kqWMog';
  }

  cocyProduction() {
    this.api = {
      url: 'http://139.59.109.169:8081',
    };
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhNDM3YTZmMTQwZTQzYjg0ODJiZWZhIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9jb2N5IiwiZGJfbmFtZSI6ImNvY3lfZGIiLCJhZGRyZXNzIjoiaHR0cDovL3d3dy5jb2N5LnNob3A6ODAwMSJ9LCJleHAiOjE1MzY0NjE2MTJ9.0zzQCbTW5yKE0Zy9WNkasajCS3gDH9H3t3zz_pltf9A';
  }

  ngynProduction() {
    this.api = {
      url: 'http://139.59.109.169:8081',
    };
    this.token = '';
  }
}

export const config = new Config();
