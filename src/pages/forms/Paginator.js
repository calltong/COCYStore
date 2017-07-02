import React from 'react';

export default class Paginator extends React.Component {

  handlePrev() {
    let page = (this.props.current - 1 < 1) ? 1 : this.props.current - 1;
    this.props.onPrev(page);
  }

  handleNext() {
    let page = (this.props.current + 1 > this.props.pages)
      ? this.props.pages
      : this.props.current + 1;
    this.props.onNext(page);
  }

  handleJump(event) {
    this.props.onJump(parseInt(event.target.id, 10));
  }

  render() {
    let style = { cursor: 'pointer' };

    let display = (this.props.display < this.props.pages)
      ? this.props.display
      : this.props.pages;

    let until = (this.props.current + 2) > this.props.pages
      ? this.props.pages
      : this.props.current + 2;

    let start = 1;
    if (until - display < 1) {
      until = start + (display - 1);
    } else {
      start = until - (display - 1);
    }

    let pages = [];
    for (let n = start; n <= until; n++) {
      pages.push(n);
    }

    let buttons = pages.map(number => {
      if (number === this.props.current) {
        return (
          <li key={number} className="active">
            <a id={number} style={style} onClick={this.handleJump.bind(this)}>{number}</a>
          </li>
        );
      } else {
        return (
          <li key={number}>
            <a id={number} style={style} onClick={this.handleJump.bind(this)}>{number}</a>
          </li>
        );
      }
    });

    return (
      <ul className="pagination">
        <li key="prev" className="prev">
          <a style={style} onClick={this.handlePrev.bind(this)}>&laquo;</a>
        </li>
        {buttons}
        <li key="next" className="next">
          <a style={style} onClick={this.handleNext.bind(this)}>&raquo;</a>
        </li>
      </ul>
    );
  }

}
