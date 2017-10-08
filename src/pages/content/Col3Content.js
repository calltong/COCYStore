import React from 'react';
import {Link} from 'react-router';
import {createLink} from '../../utility/display';

class Display extends React.Component {
  onGotoPage(item) {

  }

  render() {
    let item = this.props.data;
    let path = createLink(item);
    let lik;
    if (path) {
      lik = (
        <Link to={path}>
          <img src={item.preview} role="presentation" className="col3-content-img" />
        </Link>
      );
    } else {
      lik = (<img src={item.preview} role="presentation" className="col3-content-img" />);
    }
    return (
      <div className="col3-content-item">
        {lik}
      </div>
    );
  }
}

export default class Col3Content extends React.Component {

  render() {
    let content = this.props.content;
    let index = 0;
    let list = content.data.list.map(item => {
      return (
        <div className="col-xs-4 col-sm-4 col-md-4 none-col" key={index++}>
          <Display data={item}/>
        </div>
      );
    });

    return (
      <div className="col3-content">
        <div className="header">
          {content.data.title}
        </div>
        <div className="detail">
          {content.data.description}
        </div>

        <div className="body">
          <div className="container-fluid">
            <div className="row">
              {list}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
