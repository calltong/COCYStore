import React from 'react';

import HeaderBar from './pages/main/HeaderBar';
import Footer from './pages/main/Footer';
import {actions} from './actions/Action';
import {manager} from './utility/Manager';

class StoreApp extends React.Component {

  componentDidMount() {
    //store.update('MAIN_LOAD_FBSDK');
    let page = this.props.params.page;
    console.log('page:', page);
    manager.initial();
    if (page) {
      actions.main.getPageItem(page);
    } else {
      actions.main.getPageActive();
    }
  }

  render() {
    return (
      <div id="wrapper">
        <HeaderBar/>
        <div id="page-wrapper">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default StoreApp;
