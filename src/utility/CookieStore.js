import Cookies from 'universal-cookie';
const cookie = new Cookies();

class CookieStore {
  data = {
    order: undefined,
    customer: undefined,
  };

  saveOrder(data) {
    let order = {
      list: data.list,
    };
    cookie.set('order', order, { path: '/' });
  }

  saveCustomer(id) {
    let data = {
      id: id,
    };
    cookie.set('customer', data, { path: '/' });
  }

  loadData() {
    let order = cookie.get('order');
    let customer = cookie.get('customer');
    let data = {
      order: order,
      customer: customer,
    };

    if (data) {
      this.data = data;
    }
    return data;
  }
}

export const cookiedb = new CookieStore();
