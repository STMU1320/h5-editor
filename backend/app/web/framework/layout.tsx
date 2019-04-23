import React, { Component } from 'react';
export default class Layout extends Component<any> {
  render() {
    return <html>
      <head>
        <title>{this.props.title}</title>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body><div id="app">{this.props.children}</div></body>
    </html>;
  }
}