import React from 'react';
import {Link} from 'react-router';
import {createLink} from '../../utility/display';

class Display extends React.Component {
  render() {
    let item = this.props.data;
    let path = createLink(item);
    let lik;
    if (path) {
      lik = (
        <Link to={path}>
          <img src={item.preview} role="presentation" className="col4-content-img" />
          <p className="col4-content-text">{item.name}</p>
        </Link>
      );
    } else {
      lik = (
        <div>
          <img src={item.preview} role="presentation" className="col4-content-img" />
          <p className="col4-content-text">{item.name}</p>
        </div>
      );
    }
    return (
      <div className="col4-content-item">
        {lik}
      </div>
    );
  }
}

export default class Col4Content extends React.Component {

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
