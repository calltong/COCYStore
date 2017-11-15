import React from 'react';
import {observer, inject} from 'mobx-react';
import {ga} from '../../utility/ga';

export class OrderCondition extends React.Component {
  componentDidMount() {
    this.props.page.getOrderCondition();
    ga.view();
  }

  render() {
    let doc = this.props.page.toJS().order_condition;
    let conditions = doc.data.list.map((item, index) => {
      return (<li key={index}>{item.title}</li>);
    });

    return (
      <div className="condition-page">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h4>เงื่อนไขการสั่งซื้อ</h4>
            <ul style={{listStyleType: 'circle'}}>
              {conditions}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('page')(observer(OrderCondition));
