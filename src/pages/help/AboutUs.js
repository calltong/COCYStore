import React from 'react';
import {observer, inject} from 'mobx-react';
import ReactHtmlParser from 'react-html-parser';

import {ga} from '../../utility/ga';

export class AboutUs extends React.Component {
  componentDidMount() {
    this.props.page.getAboutus();
    ga.view();
  }

  render() {
    let doc = this.props.page.toJS().about_us;
    let list = doc.data.list.map((item, index) => {
      return (
      <div key={index + 10}>
        <hr />
        <br />
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6">
            <img className="aboutus-map" src={item.preview} role="presentation" />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6">
            <h3>{item.title}</h3>
            <div>{ReactHtmlParser(item.description)}</div>
          </div>
        </div>
      </div>
      );
    });
    return (
      <div className="aboutus-page">
        <br />
        <div className="row">
          <div className="col-md-12">
            <h3>{doc.data.title}</h3>
            <div>{ReactHtmlParser(doc.data.description)}</div>
          </div>
        </div>
        <br />
        {list}
      </div>
    );
  }
}

export default inject('page')(observer(AboutUs));
