import {store} from '../store';

export class MainAction {
  setPage(data) {
    store.update('MAIN_STORE', {data});
  }
}

export const action = new MainAction();
