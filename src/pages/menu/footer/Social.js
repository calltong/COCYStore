import React from 'react';

export default class Social extends React.Component {
  render() {
    let data = this.props.data;
    let css = {
      color: this.props.css.color,
    };

    let content = data.items.map((item, index) => {
      let block = <div />;
      switch (item.type) {
        case 'facebook':
          block = (
            <a target="_blank" href={item.url} style={css}>
              <span className="footer-icon">
                <i className='fa fa-facebook-square' /></span>FACEBOOK
            </a>);
          break;
        case 'instagram':
          block = (
            <a target="_blank" href={item.url} style={css}>
              <span className="footer-icon">
                <i className='fa fa-instagram' /></span>INSTAGRAM
            </a>);
          break;
        case 'youtube':
          block = (
            <a target="_blank" href={item.url} style={css}>
              <span className="footer-icon">
                <i className='fa fa-youtube-square' /></span>YOUTUBE
            </a>);
          break;
        case 'line':
          block = (
            <a target="_blank" href={item.url} style={css}>
              <span className="footer-icon">@</span>LINE
            </a>);
          break;
        default:
          block = <div />;
          break;
      }
      return (
        <p className="footer-menu" key={index}>
          {block}
        </p>
      );
    });
    return (
      <div>
        <p className="footer-title">{this.props.data.title}</p>
        {content}
      </div>
    );
  }
}
