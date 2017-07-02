import React from 'react';
import {ReducerBase} from './ReducerBase';
import {store} from '../store';
import {actions} from '../actions/Action';
import {manager} from '../utility/Manager';

import SlideSection from './component/SlideSection';
import ProductSection from './component/ProductSection';
import ModernSection from './component/ModernSection';
import BlockSection from './component/BlockSection';
import CategorySection from './component/CategorySection';
import Brandner from './component/Brandner';

export class Home extends ReducerBase {
  componentDidMount() {
    actions.tracking.view();
    manager.SetOnTop();
  }

  render() {
    let main = store.getState().main;

    let index = 0;
    let list = main.content.content_list.map(item => {
      if (item.type === 'slide') {
        return ( <SlideSection key={index++} content={item}/> );
      } else if (item.type === 'modern') {
        return ( <ModernSection key={index++} content={item}/> );
      } else if (item.type === 'block') {
        return ( <BlockSection key={index++} content={item}/> );
      } else if (item.type === 'category') {
        return ( <CategorySection key={index++} content={item}/> );
      } else {
        return ( <ProductSection key={index++} content={item}/> );
      }

    });
    return (
      <div>
        <Brandner content={main.content}/>
        {list}
      </div>
    );
  }
}

export default Home;
