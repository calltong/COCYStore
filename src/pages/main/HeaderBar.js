import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {manager} from '../../utility/Manager';

export class HeaderBar extends ReducerBase {

  changeMenu(type, value) {
    console.log(type, ':type:', value);
    if (type === 'category') {
      if (value === '') {
        browserHistory.push('/products');
      } else {
        browserHistory.push(`/products?type=${value}`);
      }
    }

    manager.CloseMenu('#header-bar');
  }

  onOrder() {
    browserHistory.push('/order');
    manager.CloseMenu('#header-bar');
  }

  onContact() {
    browserHistory.push('/howorder');
    manager.CloseMenu('#header-bar');
  }

  toggleMenu() {
    manager.ToggleMenu('#header-bar');
  }

  render() {
    let state = store.getState();
    let menu = state.main.content.menu;
    let index = 0;
    let list = menu.list.map(item => {
      return (
        <li key={index++}>
          <a onClick={this.changeMenu.bind(this, item.type, item.value)}>
            {item.name}
          </a>
        </li>
      );
    });

    let order = state.order;
    return (
      <nav className="navbar navbar-header navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleMenu.bind(this)}>
              <span className="sr-only">Menu</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link className="navbar-brand" to="/home">{menu.brand.name}</Link>
          </div>

          <div className="collapse navbar-collapse" id="header-bar">
            <ul className="nav navbar-nav">
              {list}
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.onOrder.bind(this)}>
                  <i className="fa fa-shopping-bag" aria-hidden="true"> {order.data.db_list.length}</i>
                </a>
              </li>

              <li>
                <a onClick={this.onContact.bind(this)}>
                  <i className="fa fa-question-circle-o" aria-hidden="true"> Help</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default HeaderBar;
