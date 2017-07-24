import React from 'react';

import BrandContent from './BrandContent';
import SlideContent from './SlideContent';
import Col3Content from './Col3Content';
import BlockContent from './BlockContent';
import Col4Content from './Col4Content';
import ProductList from './ProductList';

export class Builder extends React.Component {

  render() {
    let list = this.props.list.map((item, index) => {
      switch (item.type) {
        case 'brand':
          return (<BrandContent key={index} content={item}/>);
          break;
        case 'slide':
          return (<SlideContent key={index} content={item}/>);
          break;
        case 'col-3':
          return (<Col3Content key={index} content={item}/>);
          break;
        case 'block':
          return (<BlockContent key={index} content={item}/>);
          break;
        case 'col-4':
          return (<Col4Content key={index} content={item}/>);
          break;
        case 'product':
          return (<ProductList key={index} content={item}/>);
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

export default Builder;
