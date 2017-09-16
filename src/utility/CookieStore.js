import Cookies from 'universal-cookie';
const cookie = new Cookies();

class CookieStore {
  data = {
    order: undefined,
    customer: undefined,
  };

  saveOrder(data) {
    let order = {
      id: data._id,
      list: data.db_list,
    };
    cookie.set('order', order, { path: '/' });
  }

  saveCustomer(id) {
    let data = {
      id: id,
    };
    cookie.set('customer', data, { path: '/' });
  }

  saveTracking() {
    let data = {
      time: Date.now(),
    };
    cookie.set('tracking', data, { path: '/' });
  }

  loadData() {
    let order = cookie.get('order');
    let customer = cookie.get('customer');
    let tracking = cookie.get('tracking');
    let data = {
      order: order,
      customer: customer,
      tracking: tracking,
    };

    if (data) {
      this.data = data;
    }
    return data;
  }
}

export const cookiedb = new CookieStore();
