import React from 'react';

//import HeaderBar from './pages/main/HeaderBar';
//import Footer from './pages/main/Footer';
import Header from './pages/menu/Menu';
import Footer from './pages/menu/Footer';
import {ReducerBase} from './pages/ReducerBase';
import {actions} from './actions/Action';
import {manager} from './utility/Manager';
import {store} from './store';

class StoreApp extends ReducerBase {
  componentDidMount() {
    //store.update('MAIN_LOAD_FBSDK');
    manager.initial();
    actions.page.getMenu();
  }

  render() {
    let doc = store.getState().page.menu;
    return (
      <div id="wrapper">
        <Header content={doc.data.menu} />
        <div id="page-wrapper">
          {this.props.children}
        </div>
        <Footer content={doc.data.footer} />
      </div>
    );
  }
}

export default StoreApp;
