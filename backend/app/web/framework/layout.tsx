import React, { Component } from 'react';
export default class Layout extends Component<any> {
  render() {
    const { title = 'H5', backgroundColor = 'white', children } = this.props;
    return <html>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
        <script src="/flexible.js"></script>
      </head>
      <body style={{ backgroundColor }} ><div id="app">{children}</div></body>
    </html>;
  }
}