import {Store} from './redux-manager';

import {reducer as main} from './pages/main/reducer';
import {reducer as customer} from './astores/customer';
import {reducer as order} from './astores/order';
import {reducer as page} from './astores/page';
import {reducer as product} from './astores/product';
import {reducer as tracking} from './astores/tracking';

export const store = new Store({
  main: main.combine(),
  order: order.combine(),
  product: product.combine(),
  customer: customer.combine(),
  page: page.combine(),
  tracking: tracking.combine(),
});
