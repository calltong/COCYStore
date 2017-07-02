import React from 'react';

import HeaderBar from './pages/main/HeaderBar';
import Footer from './pages/main/Footer';
//import {store} from './store';
import {manager} from './utility/Manager';

class StoreApp extends React.Component {

  componentDidMount() {
    //store.update('MAIN_LOAD_FBSDK');
    manager.initial();
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
