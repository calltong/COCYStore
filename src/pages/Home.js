import React from 'react';
import {ReducerBase} from './ReducerBase';
import {store} from '../store';
import {actions} from '../actions/Action';
import {manager} from '../utility/Manager';

import Builder from './content/Builder';

export class Home extends ReducerBase {
  componentDidMount() {
    actions.tracking.view();
    manager.SetOnTop();
  }

  render() {
    let main = store.getState().main;
    let list = main.content.content_list;
    return (
      <div>
        <Builder list={main.content.content_list} />
      </div>
    );
  }
}

export default Home;
