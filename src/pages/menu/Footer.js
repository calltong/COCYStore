import React from 'react';

import Title from './footer/Title';
import Social from './footer/Social';
import TextList from './footer/TextList';
import Information from './footer/Information';

export class Footer extends React.Component {
  render() {
    let content = this.props.content;
    let list = content.list.map((item, index) => {
      let data = <div />;
      let col = 'col-sm-6 col-md-3';
      switch (item.type) {
        case 'title':
          data = <Title data={item.data} css={content.css} />;
          break;
        case 'social':
          col = 'col-sm-6 col-md-2';
          data = <Social data={item.data} css={content.css} />;
          break;
        case 'text':
          col = 'col-sm-6 col-md-3';
          data = <TextList data={item.data} css={content.css} />;
          break;
        case 'information':
          col = 'col-sm-6 col-md-3';
          data = <Information data={item.data} css={content.css} />;
          break;
        default:
          data = <div />;
          break;
      }
      return (
        <div className={col} key={index}>
          {data}
        </div>
      );
    });
    let css = {
      color: content.css.color,
      backgroundColor: content.css.bg_color,
    };
    return (
      <footer id="footer" className="footer" style={css}>
        <div className="row">
          {list}
			  </div>
		  </footer>
    );
  }
}

export default Footer;
