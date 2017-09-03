import React from 'react';
import {ReducerBase} from '../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

export class HowToBuy extends ReducerBase {
  componentDidMount() {
    actions.page.getHowBuy();
  }

  render() {
    let doc = store.getState().page.how_buy;
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

export default HowToBuy;
