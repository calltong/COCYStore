import React from 'react';
import {ReducerBase} from './ReducerBase';
import {store} from '../store';
import {actions} from '../actions/Action';
import {manager} from '../utility/Manager';

import SlideSection from './component/SlideSection';
import ProductSection from './component/ProductSection';
import ModernSection from './component/ModernSection';
import BlockContent from './contents/BlockContent';
import CategorySection from './component/CategorySection';
import BrandContent from './contents/BrandContent';

export class Home extends ReducerBase {
  componentDidMount() {
    actions.tracking.view();
    manager.SetOnTop();
  }

  render() {
    let main = store.getState().main;
    let list = main.content.content_list.map((item, index) => {
      console.log('item:', item);
      switch (item.type) {
        case 'brand':
          return (<BrandContent key={index} content={item}/>);
          break;
        case 'slide':
          return (<SlideSection key={index} content={item}/>);
          break;
        case 'modern':
          return (<ModernSection key={index} content={item}/>);
          break;
        case 'block':
          return (<BlockContent key={index} content={item}/>);
          break;
        case 'category':
          return (<CategorySection key={index} content={item}/>);
          break;
        case 'product':
          return (<ProductSection key={index} content={item}/>);
          break;
        default:
          return (<div key={index}/>);
      }

    });
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default Home;
