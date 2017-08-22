import React from 'react';
export class BrandContent extends React.Component {
  render() {
    let content = this.props.content.data;
    return (
      <div className="brand-section">
        <div className="row">
          <div className="col-md-12">
            <p className="brand-title">{content.title}</p>
            <p className="brand-description">{content.description}</p>
          </div>
        </div>
     </div>
   );
  }
}

export default BrandContent;
