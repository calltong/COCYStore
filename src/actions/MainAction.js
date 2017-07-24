import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

export class MainAction {
  getPageItem(id) {
    let url = `${config.api.url}/page/${id}`;
    http.get(url, {}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setPage(data);
      }
    });
  }

  getPageActive() {
    let url = `${config.api.url}/page/active`;
    http.get(url, {}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setPage(data);
      }
    });
  }

  setPage(data) {
    store.update('MAIN_STORE', {data});
  }
}

export const action = new MainAction();
