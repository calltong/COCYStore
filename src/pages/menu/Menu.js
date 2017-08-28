import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {manager} from '../../utility/Manager';

export class Menu extends ReducerBase {
  changeMenu(type, value) {
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
    let order = store.getState().order;
    let doc = store.getState().page.menu;

    let menu = doc.data.menu;
    let css = {
      color: menu.css.color,
      backgroundColor: menu.css.bg_color,
      fontFamily: menu.css.font,
      fontSize: menu.css.size,
    };

    let cssBrand = {
      color: menu.brand.css.color,
      fontFamily: menu.brand.css.font,
      fontSize: menu.brand.css.size,
    };

    let list = menu.list.map((item, index) => {
      return (
        <li key={index}>
          <a style={css} onClick={this.changeMenu.bind(this, item.type, item.value)} >
            {item.name}
          </a>
        </li>
      );
    });

    return (
      <nav style={css} className="navbar navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="menu-header">
            <button type="button" className="navbar-toggle" style={css}>
              <span className="sr-only">Menu</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link to="/home" className="navbar-brand" style={cssBrand}>{menu.brand.name}</Link>
          </div>

          <div className="collapse navbar-collapse" id="header-bar">
            <ul className="nav navbar-nav">
              {list}
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.onOrder.bind(this)} style={css} >
                  <i className="fa fa-shopping-bag"> {order.data.db_list.length}</i>
                </a>
              </li>

              <li>
                <a onClick={this.onContact.bind(this)} style={css}>
                  <i className="fa fa-question-circle-o"> Help</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
