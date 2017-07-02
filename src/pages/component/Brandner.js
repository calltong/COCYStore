import React from 'react';
//import {Link} from 'react-router'
//import {browserHistory} from 'react-router';
//import {store} from '../../store';

export class Brandner extends React.Component {

  changeLanguage(lang) {

  }

  render() {
    let content = this.props.content;
    return (
      <div className="brand-section">
        <div className="row">
          <div className="col-md-12">
            <p className="brand-header">{content.name}</p>
            <p className="brand-sub">Tokyo - Seoul - Bangkok</p>
          </div>
        </div>
     </div>
 );
  }
}

export default Brandner;
