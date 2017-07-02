import React from 'react';

export class OrderStatus extends React.Component {
  getDateString(val) {
    return val.getDate() + '/' + val.getMonth() + '/' + val.getFullYear() + ' ' + val.getHours() + ':' + val.getMinutes();
  }

  render() {
    let data = this.props.data;
    let status = data.status;
    let set = 'badge badge-set';
    let unset = 'badge';
    let order = ' ';
    let payment = ' ';
    let working = ' ';
    let shipping = ' ';
    let completed = ' ';
    for (let item of data.status_list) {
      let date = ' ';
      if (item.updated_at !== 0) {
        date = this.getDateString(new Date(item.updated_at));
      }
      switch (item.status) {
        case 'order':
          order = date;
          break;
        case 'payment':
          payment = date;
          break;
        case 'working':
          working = date;
          break;
        case 'shipping':
          shipping = date;
          break;
        case 'completed':
          completed = date;
          break;
        default:

      }
    }
    return (
      <div className="panel panel-status">
        <div className="panel-heading">
          Order Tracking
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <div className="help-text summary-orderstatus">
                <span className={status==='order'?set:unset}>1</span>
                <p>สั่งซื้อสินค้า</p>
                <p>{order}</p>
              </div>
            </div>

            <div className="col-xs-12 col-md-12">
              <div className="help-text summary-orderstatus">
                <span className={status==='payment'?set:unset}>2</span>
                <p>ชำระเงิน</p>
                <p>{payment}</p>
              </div>
            </div>

            <div className="col-xs-12 col-md-12">
              <div className="help-text summary-orderstatus">
                <span className={status==='working'?set:unset}>3</span>
                <p>เตรียมจัดส่ง</p>
                <p>{working}</p>
              </div>
            </div>

            <div className="col-xs-12 col-md-12">
              <div className="help-text summary-orderstatus">
                <span className={status==='shipping'?set:unset}>4</span>
                <p>จัดส่งสินค้า</p>
                <p>{shipping}</p>
              </div>
            </div>

            <div className="col-xs-12 col-md-12">
              <div className="help-text summary-orderstatus">
                <span className={status==='completed'?set:unset}>5</span>
                <p>ลูกค้าได้รับสินค้า</p>
                <p>{completed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderStatus;
