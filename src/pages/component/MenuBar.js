import React from 'react';
import {Link} from 'react-router'


export class MenuBar extends React.Component {

  render() {
    return (
      <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
          <li>
            <Link to={`/Contact`}>
              <i className="fa fa-life-ring" aria-hidden="true"> Information</i>
            </Link>
            <Link to={`/Contact`}>
              <i className="fa fa-life-ring" aria-hidden="true"> Information</i>
            </Link>
            <Link to={`/Contact`}>
              <i className="fa fa-life-ring" aria-hidden="true"> Information</i>
            </Link>
            <Link to={`/Contact`}>
              <i className="fa fa-life-ring" aria-hidden="true"> Information</i>
            </Link>
          </li>

          </ul>
      </div>
    );
  }
}

export default MenuBar;
