import React from 'react';

import Header from './pages/menu/Menu';
import Footer from './pages/menu/Footer';
import {ReducerBase} from './pages/ReducerBase';
import {actions} from './actions/Action';
import {manager} from './utility/Manager';
import {store} from './store';

class StoreApp extends ReducerBase {
  componentDidMount() {
    manager.initial();
    actions.page.getMenu();
  }

  render() {
    let doc = store.getState().page.menu;
    let css = {backgroundColor: doc.data.css.bg_color};
    return (
      <div id="wrapper">
        <Header content={doc.data.menu} />
        <div id="page-wrapper" style={css}>
          {this.props.children}
        </div>
        <Footer content={doc.data.footer} />
      </div>
    );
  }
}

export default StoreApp;
