import React, { Component } from 'react';

export class EnHeader extends Component {
  constructor(props) {
      super(props);
      this.name = props.name ? props.name : 'Header Name';
   }

  render() {
    return (
      <div className="row">
         <div className="col-lg-12">
             <h3 className="page-header">{this.name}</h3>
         </div>
      </div>
    );
  }
}

export default EnHeader;
