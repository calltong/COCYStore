import React from 'react';
import {observer, inject} from 'mobx-react';

import {ga} from '../../utility/ga';

export class HowToBuy extends React.Component {
  componentDidMount() {
    this.props.page.getHowBuy();
    ga.view();
  }

  render() {
    let doc = this.props.page.toJS().how_buy;
    let list = doc.data.list.map((item, index) => {
      return (
        <div className="col-xs-6 col-sm-6 col-md-3" key={index}>
          <div className="tobuy-step">
            <span>{index + 1}</span>
            <p>{item.title}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="tobuy-page">
        <div className="row">
          {list}
        </div>
      </div>
    );
  }
}

export default inject('page')(observer(HowToBuy));
