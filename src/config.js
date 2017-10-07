class Config {

  constructor() {

    this.api = {
      url: 'http://139.59.109.169:8081',
    };

    this.token = '';
    this.google = {
      analytics: 'UA-100117427-2',
    };
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

    this.google = {
      analytics: 'UA-100117427-2',
    };
    // COCY
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhMjhiMWMwZDI3ZmFiNThlZjUyZjYzIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9zZW9jeSIsImRiX25hbWUiOiJwb21wb21fZGIiLCJhZGRyZXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAxIn0sImV4cCI6MTUzNjY0ODM0M30.hfH-NaKMAobxxE1K7962oo7su6RYn4DdnxKr-kqWMog';
  }

  cocyProduction() {
    this.api = {
      url: 'http://139.59.109.169:8081',
    };
    this.google = {
      analytics: 'UA-100117427-1',
    };
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhNDM3YTZmMTQwZTQzYjg0ODJiZWZhIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9jb2N5IiwiZGJfbmFtZSI6ImNvY3lfZGIiLCJhZGRyZXNzIjoiaHR0cDovL3d3dy5jb2N5LnNob3A6ODAwMSJ9LCJleHAiOjE1MzcwNzI4MDh9.1vPr3Elo-8YleMRcfmLipNVE25eZMjuqO_PvpeAw3v4';
  }

  ngynProduction() {
    this.api = {
      url: 'http://139.59.109.169:8081',
    };

    this.google = {
      analytics: 'UA-100117427-2',
    };
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhNmNiYzE1N2FjZTBjNDIxNjRiOTRjIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9uZ3luIiwiZGJfbmFtZSI6Im5neW5fZGIiLCJhZGRyZXNzIjoiaHR0cDovL3d3dy5jb2N5LnNob3A6ODAwMSJ9LCJleHAiOjE1MzcwNzI5MjV9.iYCwBmMVcObm255Va0JzQpDMVH89XZUas2-FEkD7iaw';
  }
}

export const config = new Config();
