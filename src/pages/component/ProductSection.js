import React from 'react';
//import {Link} from 'react-router'
import {browserHistory} from 'react-router';
import ItemDisplay from './ItemDisplay';
import {store} from '../../store';

export class ProductSection extends React.Component {

  changeMenu(condition) {
    browserHistory.push('/products');
    store.update('PRO_GET_PRODUCT_LIST', {index:1, condition: condition});
  }

  render() {
    let content = this.props.content;
    let data = content.data;
    let index = 0;
    let list = data.list.map(item => {
      return (
        <div className="col-xs-6 col-sm-4 col-md-2 col-product" key={index++}>
          <ItemDisplay data={item} cssName="section-display-product"/>
        </div>
      );
    });

    let condition = '';
    let first = true;
    for (let con of data.condition_list) {
      if (first === true) {
        condition += `${con.name}=${con.value}`;
        first = false;
      } else {
        condition += `&&${con.name}=${con.value}`;
      }
    }

    return (
    <div className="panel panel-section">
      <div className="panel-heading">{data.name}
        <span>
          <a onClick={this.changeMenu.bind(this, condition)}>
          see more
          </a>
        </span>
      </div>
      <div className="panel-body">
        <div className="row">
          {list}
        </div>
      </div>
    </div>
   );
  }
}

export default ProductSection;
