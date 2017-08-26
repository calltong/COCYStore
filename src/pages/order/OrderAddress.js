import React from 'react';

export class OrderAddress extends React.Component {

  render() {
    let data = this.props.data;
    return (
      <div className="panel panel-order">
        <div className="panel-heading">
          Shipping
        </div>
        <div className="panel-body" style={{padding:'8px'}}>
          <div className="shipping">
            <p>ชื่อ: {data.name}</p>
            <p>ที่อยู่: {data.address} {data.city} {data.postcode}</p>
            <p>ติดต่อ: {data.mobile} email: {data.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderAddress;
