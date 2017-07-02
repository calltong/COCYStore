import React, { Component } from 'react';

export class GoogleTag extends Component {
  render() {
    return (
      <div>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GWC95S"
            height="0" width="0" style="display:none;visibility:hidden">
          </iframe>
        </noscript>
      </div>
    );
  }
}

export default GoogleTag;
