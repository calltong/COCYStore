import React from 'react';
//import {Link} from 'react-router'

export class SlideSection extends React.Component {
  render() {
    let index = 0;
    let content = this.props.content;
    let list = [];
    let menu = [];
    for (let item of content.data.list) {
      if (index === 0) {
        menu.push(<li data-target="#image-menu" data-slide-to={`${index}`} className="active" key={index}/>);
        list.push(
          <div className="item active" key={index}>
            <img className="slide-image" src={item.preview} role="presentation"/>
          </div>);
        index++;
      } else {
        menu.push(<li data-target="#image-menu" data-slide-to={`${index}`} key={index}/>);
        list.push(
          <div className="item" key={index}>
            <img className="slide-image" src={item.preview} role="presentation"/>
          </div>);
        index++;
      }
    }

    return (
    <div className="carousel-holder">
      <div id="image-menu" className="carousel slide" data-ride="carousel" >
        <ol className="carousel-indicators">
          {menu}
        </ol>
        <div className="carousel-inner">
          {list}
        </div>
        <a className="left carousel-control" href="#image-menu" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left"/>
        </a>
        <a className="right carousel-control" href="#image-menu" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right"/>
        </a>
      </div>
    </div>
    );
  }
}

export default SlideSection;
