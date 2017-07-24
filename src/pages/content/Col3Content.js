import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

class Display extends React.Component {
  onGotoPage(id) {
    browserHistory.push(`/product/${id}`);
  }

  render() {
    let data = this.props.data;
    return (
      <div className="modern-item">
        <Link onClick={this.onGotoPage.bind(this, data.value)}>
          <img src={data.preview} role="presentation" className="modern-img" />
        </Link>
      </div>
    );
  }
}

export class Col3Content extends React.Component {

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
      <div className="modern-section">
        <div className="header">
          {content.data.name}
        </div>
        <div className="detail">
          {content.data.detail}
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

export default Col3Content;
