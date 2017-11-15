import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

//import {manager} from '../utility/Manager';
import { ga } from '../utility/ga';

import Builder from './content/Builder';

export class Home extends Component {
  componentDidMount() {
    this.props.page.getHome();
    ga.view('Home Page');
    console.log('home page');
  }

  render() {
    let doc = this.props.page.toJS().home;
    let list = doc.data.list !== undefined ? doc.data.list : [];
    return (
      <div>
        <Builder list={list} />
      </div>
    );
  }
}

export default inject('page')(observer(Home));
