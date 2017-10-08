import React from 'react';
import {Link} from 'react-router';
import {createLink} from '../../utility/display';

export default class BlockContent extends React.Component {
  gotoPage(item) {

  }

  render() {
    let content = this.props.content;
    let list = content.data.list.map((item, index) => {
      let path = createLink(item);

      let lik;
      if (path) {
        lik = (
          <Link to={path}>
            <img src={item.preview} role="presentation" className="block-content-img" />
          </Link>
        );
      } else {
        lik = (<img src={item.preview} role="presentation" className="block-content-img" />);
      }

      return (
      <div className="col-xs-3 col-sm-2 col-md-2" style={{paddingLeft:0, paddingRight:0}} key={index}>
        {lik}
      </div>
      );
    });

    return (
      <div className="block-content">
        <div className="header">
          {content.data.title}
        </div>
        <div className="body">
          <div className="row none-row">
            {list}
          </div>
        </div>
      </div>
    );
  }
}
