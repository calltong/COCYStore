import React, {Component} from 'react';
import DropZone from 'react-dropzone';

export default class EnImageSelector extends Component {
  render() {
    let width = +this.props.width;
    let height = +this.props.height;

    let style = {
      width,
      height,
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'solid',
      borderRadius: 1,
      cursor: 'pointer',
    };

    let preview;
    if (this.props.src) {
      preview = <img width="100%" height="100%" role="presentation" src={this.props.src}/>;
    } else {
      preview = <div style={{height: '100%', textAlign: 'center', lineHeight: `${height}px`}}>
                  {this.props.placeholder || 'Click to upload file.'}
                </div>;
    }
    return (
      <DropZone style={style} accept={this.props.accept} multiple={false} onDrop={this.props.onDrop}>
        {preview}
      </DropZone>
    );
  }
}
