import React from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {manager} from '../../utility/Manager';
import {productListPath} from '../../utility/display';

export default class Menu extends ReducerBase {
  changeMenu(name) {
    manager.CloseMenu('#header-bar');
  }

  toggleMenu() {
    manager.ToggleMenu('#header-bar');
  }

  render() {
    let order = store.getState().order.data;
    let len = order.list.length;
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

    let cssBag = {
      color: 'black',
      backgroundColor: 'white',
    };

    let cssMobileMenu = {
      border: `1px solid ${menu.css.color}`,
      backgroundColor: menu.css.bg_color,
    };

    let cssMobileItem = {
      backgroundColor: menu.css.color,
    };

    let list = menu.list.map((item, index) => {
      let path = productListPath(item.type, item.value, item.name);
      return (
        <li key={index}>
          <Link
            style={css}
            to={path}
            onClick={this.changeMenu.bind(this, item.name)} >
            {item.name}
          </Link>
        </li>
      );
    });

    return (
      <nav style={css} className="navbar navbar-fixed-top" role="navigation">
        <div className="container" >
          <div className="navbar-header">
            <button
              type="button"
              style={cssMobileMenu}
              className="navbar-toggle"
              onClick={this.toggleMenu.bind(this)} >
              <span className="sr-only">Menu</span>
              <span style={cssMobileItem} className="icon-bar"/>
              <span style={cssMobileItem} className="icon-bar"/>
              <span style={cssMobileItem} className="icon-bar"/>
            </button>
            <Link to="/home" className="navbar-brand" style={cssBrand}>{menu.brand.name}</Link>
          </div>

          <div className="collapse navbar-collapse" id="header-bar">
            <ul className="nav navbar-nav">
              {list}
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link
                  style={css}
                  className="menu-bag"
                  to="/order"
                  onClick={this.changeMenu.bind(this, 'order')} >
                  <i className="fa fa-shopping-bag" />
                  <span style={cssBag} className="menu-bag-number">{len}</span>
                </Link>
              </li>

              <li>
                <Link
                  style={css}
                  className="menu-help"
                  to="/about-us"
                  onClick={this.changeMenu.bind(this, 'about-us')}>
                  <i className="fa fa-question-circle-o"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
