import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';

export class EnListBox extends Component {

  render() {
    return (
        <Select2
          multiple
          className="form-control"

          defaultValue={this.props.value}
          data={this.props.data}
          options={
            { placeholder: this.props.placeholder}
          }
          onSelect={this.props.onSelect}
          onUnselect={this.props.onUnselect}
          onChange={this.props.onChange}
        />
    );
  }
}

export default EnListBox;
