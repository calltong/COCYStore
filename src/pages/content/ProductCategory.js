import React from 'react';
import {Link} from 'react-router-dom';
import {browserHistory} from 'react-router';
import {createLink} from '../../utility/display';

export default class ProductCategory extends React.Component {
  changeMenu(condition) {
    browserHistory.push('/products');
  }

  render() {
    let content = this.props.content;
    let data = content.data;
    let list = data.list.map((item, index) => {
      let path = createLink(item);
      let lik;
      if (path) {
        lik = (
          <Link to={path}>
            <img src={item.preview} role="presentation" className="img-rounded" />
            <p className="col4-content-text">{item.name}</p>
          </Link>
        );
      } else {
        lik = (
          <div>
            <img src={item.preview} role="presentation" className="img-rounded" />
            <p className="col4-content-text">{item.name}</p>
          </div>
        );
      }
      return (
        <div className="col-xs-6 col-sm-4 col-md-2 col-product" key={index}>
          {lik}
        </div>
      );
    });

    return (
    <div className="panel panel-section">
      <div className="panel-heading">{data.name}
        <span>
          see more
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
