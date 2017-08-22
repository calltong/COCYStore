import React from 'react';
import {Link} from 'react-router';

class Display extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className="col4-content-item">
        <Link to={`/products?type=${data.value}`}>
          <img src={data.preview} role="presentation" className="col4-content-img" />
          <p className="col4-content-text">{data.name}</p>
        </Link>
      </div>
    );
  }
}

export class Col4Content extends React.Component {

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
      <div className="col4-content">
        <div className="header">
          {content.data.title}
        </div>
        <div className="detail">
          {content.data.description}
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

export default Col4Content;
