import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

export class ProductCategory extends React.Component {
  changeMenu(condition) {
    browserHistory.push('/products');
  }

  render() {
    let content = this.props.content;
    let data = content.data;
    let index = 0;
    let list = data.list.map(item => {
      return (
        <div className="col-xs-6 col-sm-4 col-md-2 col-product" key={index++}>
          <div>
            <Link to={`/ProductInfo/${item._id}`}>
              <img src={item.image_list[0].data} role="presentation" className="img-rounded" />
            </Link>
            <p className="name">{data.name}</p>
          </div>
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

export default ProductCategory;
