class Config {

  constructor() {

    this.api = {
      url: 'http://139.59.109.169:8081',
    };

    this.token = '';
  }

  setup(host) {
    if (host.includes('localhost')) {
      //this.api = {
      //  url: 'http://localhost:8081',
      //};
      this.api = {
        url: 'http://139.59.109.169:8081',
      };
      // NGYN
      this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhNmNiYzE1N2FjZTBjNDIxNjRiOTRjIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9uZ3luIiwiZGJfbmFtZSI6Im5neW5fZGIiLCJhZGRyZXNzIjoiaHR0cDovL3d3dy5jb2N5LnNob3A6ODAwMSJ9LCJleHAiOjE1MzY0NjEwMzl9.OAk9B-WcY--1uMDBl8i6ex9hU8Q1nZ2kbrXo3LkJ-Jw';
      // COCY
      //this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhNDM3YTZmMTQwZTQzYjg0ODJiZWZhIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9jb2N5IiwiZGJfbmFtZSI6ImNvY3lfZGIiLCJhZGRyZXNzIjoiaHR0cDovL3d3dy5jb2N5LnNob3A6ODAwMSJ9LCJleHAiOjE1MzY0NjE2MTJ9.0zzQCbTW5yKE0Zy9WNkasajCS3gDH9H3t3zz_pltf9A';
    } else if (host.includes('cocy.shop')) {
      this.api = {
        url: 'http://139.59.109.169:8081',
      };
      this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhNDM3YTZmMTQwZTQzYjg0ODJiZWZhIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9jb2N5IiwiZGJfbmFtZSI6ImNvY3lfZGIiLCJhZGRyZXNzIjoiaHR0cDovL3d3dy5jb2N5LnNob3A6ODAwMSJ9LCJleHAiOjE1MzY0NjE2MTJ9.0zzQCbTW5yKE0Zy9WNkasajCS3gDH9H3t3zz_pltf9A';
    } else {
      this.api = {
        url: 'http://139.59.109.169:8081',
      };
      this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhNmNiYzE1N2FjZTBjNDIxNjRiOTRjIiwicHJvamVjdCI6eyJmb2xkZXIiOiJyZXNvdXJjZS9uZ3luIiwiZGJfbmFtZSI6Im5neW5fZGIiLCJhZGRyZXNzIjoiaHR0cDovL3d3dy5jb2N5LnNob3A6ODAwMSJ9LCJleHAiOjE1MzY0NjEwMzl9.OAk9B-WcY--1uMDBl8i6ex9hU8Q1nZ2kbrXo3LkJ-Jw';
    }
  }
}

export const config = new Config();
