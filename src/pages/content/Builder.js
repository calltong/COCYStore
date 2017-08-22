import React from 'react';

import BrandContent from './BrandContent';
import SlideContent from './SlideContent';
import Col3Content from './Col3Content';
import BlockContent from './BlockContent';
import Col4Content from './Col4Content';
import ProductCategory from './ProductCategory';

export class Builder extends React.Component {

  render() {
    let list = this.props.list.map((item, index) => {
      switch (item.type) {
        case 'brand':
          return (<BrandContent key={index} content={item}/>);
        case 'slide-1':
          return (<SlideContent key={index} content={item}/>);
        case 'col-3':
          return (<Col3Content key={index} content={item}/>);
        case 'col-4':
          return (<Col4Content key={index} content={item}/>);
        case 'block-6':
          return (<BlockContent key={index} content={item}/>);    
        case 'product':
          return (<ProductCategory key={index} content={item}/>);
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

export default Builder;
