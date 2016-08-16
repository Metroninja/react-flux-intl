import React, { Component, PropTypes } from 'react';

export default class ServerLayout extends Component {
  static propTypes = {
    assets: PropTypes.object.isRequired,
    environment: PropTypes.string.isRequired,
    locale: PropTypes.object.isRequired,
    markup: PropTypes.object.isRequired,
  };

  appStylesheet() {
    if (this.props.environment !== 'development') {
      return (
        <link
          href={this.props.assets.styles.main}
          rel="stylesheet"
          type="text/css"
        />
      );
    }
  }
  
  render() {
    /*eslint-disable */
    // supress warnings to use dangerouslySetInnerHTML.

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=1200" name="viewport" />
          <title>{'Ninjabam React Demo'}</title>
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en|always"></script>
          {this.appStylesheet()}
        </head>
        <body >
          <div id="main" >
            <div dangerouslySetInnerHTML={{ __html: this.props.markup.app }} />
          </div>
          <script src={this.props.assets.scripts.main}></script>
        </body>
      </html>
    );
    /*eslint-enable */
  }
}
