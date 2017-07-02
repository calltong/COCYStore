import React from 'react';
import OrderList from './OrderList';


export class OrderPanel extends React.Component {

  render() {
    let id = this.props.id?this.props.id:'-';
    let data = this.props.data;

    return (
      <div className="panel panel-order">
        <div className="panel-heading">
          รายการสินค้า
        </div>
        <div className="panel-body" style={{padding:'8px'}}>
          <OrderList data={data}/>
          <p className="pull-right" style={{marginTop: '10px', marginRight:'10px'}}>Order ID: {id}</p>
        </div>
      </div>
    );
  }
}

export default OrderPanel;
