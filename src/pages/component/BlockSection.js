import React from 'react';
import {Link} from 'react-router';

import {browserHistory} from 'react-router';
//import {store} from '../../store';
import EnButton from '../forms/EnButton';

export class BlockSection extends React.Component {

  onGotoPage(id) {
    browserHistory.push(`/product/${id}`);
  }

  render() {
    let index = 0;
    let content = this.props.content;
    let list = content.data.list.map(item => {
      return (
      <div className="col-xs-4 col-sm-3 col-md-2" style={{paddingLeft:0, paddingRight:0}} key={index++}>
        <Link onClick={this.onGotoPage.bind(this, item.value)}>
          <div className="block-img" style={{backgroundImage: `url(${item.preview})`}}>
            <EnButton className="btn btn-block-next" onClick={this.onGotoPage.bind(this, item.value)}>
              I want it
            </EnButton>
          </div>
        </Link>
      </div>
      );
    });

    return (
      <div className="block-section">
        <div className="header">
          {content.data.name}
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

export default BlockSection;
