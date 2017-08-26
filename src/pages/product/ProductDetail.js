import React, { Component } from 'react';

class ProductDetail extends Component {
  selectSize(size) {
    this.props.onSelectSize(size);
  }

  render() {
    let data = this.props.data;
    let detail = this.props.detail;
    let price = '';
    if (data.sale_price > 0) {
      price = (<h4 className="product-price">ราคา: <strike>&#3647;{data.price}</strike> <span> &#3647;{data.sale_price}</span></h4>);
    } else {
      price = (<h4 className="product-price">ราคา: &#3647;{data.price}</h4>);
    }

    let sizeList = data.stock_list.map((item, index) => {
      let active = 'btn btn-size';
      if (detail.size) {
        if (detail.size._id === item.size._id) {
          active = 'btn btn-size-selected';
        }
      }
      return (
        <button
          key={index}
          className={active}
          type="button"
          disabled={item.quantity===0}
          onClick={this.selectSize.bind(this, item.size)}>
          {item.size.name}
        </button>
      );
    });
    let index = 0;
    let info_val = '';
    let info_list = '';
    if (data.information) {
      if (data.information.list) {
        info_list = data.information.list.map(item => {
          return (<li key={index++}>{item}</li>);
        });
      }

      if (data.information.value) {
        info_val = data.information.value;
      }
    }
    return (
    <div className="product-info-detail">
      <div className="header">
        <h1>{data.name}</h1>
        {price}
      </div>
      <hr/>
      <div className="size">
        <div className="form-group">
          <label>ขนาดสินค้า</label>
        </div>
        <div className="product-size" role="group" aria-label="...">
          {sizeList}
        </div>
      </div>
      <hr/>
      <div>
        <div className="row">
          <div className="col-xs-4 col-md-4">
            <div className="form-group">
              <label>จำนวนสินค้า</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-5">
            <div className="input-group">

              <div className="input-group-btn">
                <button type="button" className="btn btn-normal" onClick={this.props.onDownQuantity}>
                  <i className="fa fa-minus" style={{marginRight: 2, marginLeft: 2}}/>
                </button>
              </div>

              <div className="product-quantity" >
                {detail.quantity}
              </div>

              <div className="input-group-btn">
                <button type="button" className="btn btn-normal" onClick={this.props.onUpQuantity}>
                  <i className="fa fa-plus" style={{marginRight: 2}}/>
                </button>
              </div>

            </div>
          </div>

          <div className="col-xs-5 col-sm-5 col-md-4">
            <button type="button" className="btn btn-normal" style={{width:'100%'}} onClick={this.props.onAddtoBag}>
              ใส่ตะกร้า
            </button>
          </div>

        </div>
      </div>
      <hr/>
      <div>
        <p>{info_val}</p>
        <ul>
          {info_list}
        </ul>
      </div>
    </div>
    );
  }
}

export default ProductDetail;
