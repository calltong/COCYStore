import React from 'react';

export class OrderMenu extends React.Component {
  render() {
    let status = this.props.status;
    let set = 'badge badge-set';
    let unset = 'badge';

    return (
      <div className="panel panel-status">
        <div className="panel-heading">
          ขั้นตอนการสั่งสินค้า
        </div>
        <div className="panel-body">
          <div className="row" style={{marginTop: '10px'}}>
            <div className="col-xs-3 col-sm-3 col-md-3">
              <div className="help-text">
                <span className={status==='order'?set:unset}>1</span>
                <p>สั่งซื้อสินค้า</p>
              </div>
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3">
              <div className="help-text">
                <span className={status==='payment'?set:unset}>2</span>
                <p>ชำระเงิน</p>
              </div>
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3">
              <div className="help-text">
                <span className={status==='customer'?set:unset}>3</span>
                <p>ระบุที่อยู่</p>
              </div>
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3">
              <div className="help-text">
                <span className={status==='shipping'?set:unset}>4</span>
                <p>จัดส่งสินค้า</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderMenu;
