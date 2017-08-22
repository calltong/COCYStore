import React from 'react';
import {ReducerBase} from './ReducerBase';
import {store} from '../store';
import {actions} from '../actions/Action';
import {manager} from '../utility/Manager';

import Builder from './content/Builder';

export class Home extends ReducerBase {
  componentDidMount() {
    actions.page.getHome();
    actions.tracking.view();
    manager.SetOnTop();
  }

  render() {
    let doc = store.getState().page.home;
    let list = doc.data.list !== undefined ? doc.data.list : [];
    return (
      <div>
        <Builder list={list} />
      </div>
    );
  }
}

export default Home;
