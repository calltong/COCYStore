import {Store} from './redux-manager';

import {reducer as main} from './pages/main/reducer';
import {reducer as order} from './pages/order/reducer';
import {reducer as product} from './pages/product/reducer';
import {reducer as customer} from './pages/customer/reducer';

export const store = new Store({
  main: main.combine(),
  order: order.combine(),
  product: product.combine(),
  customer: customer.combine(),
});
