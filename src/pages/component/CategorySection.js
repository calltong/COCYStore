import React from 'react';
import {Link} from 'react-router-dom';

class Display extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className="category-item">
        <Link to={`/products?type=${data.value}`}>
          <img src={data.preview} role="presentation" className="category-img" />
          <p className="category-text">{data.name}</p>
        </Link>
      </div>
    );
  }
}

export default class CategorySection extends React.Component {

  render() {
    let content = this.props.content;
    let index = 0;
    let list = content.data.list.map(item => {
      return (
      <div className="col-xs-6 col-sm-3 col-md-3 none-col" key={index++}>
        <Display data={item}/>
      </div>
      );
    });

    return (
      <div className="category-section">
        <div className="header">
          {content.data.name}
        </div>
        <div className="body">
          <div className="row">
            {list}
          </div>
        </div>
      </div>
    );
  }
}
