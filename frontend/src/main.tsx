import * as React from 'react';
import { render } from 'react-dom';
import App from './views';

import '../src/theme/base.less';

const appRoot = document.createElement('div');
appRoot.classList.add('app-wrap');
document.body.appendChild(appRoot);
const renderToDOM = (AppContainer?: new () => React.Component<any, any>, AppComponent = App) => {
  if (AppContainer) {
    render(
      <AppContainer>
          <AppComponent />
      </AppContainer>,
      appRoot
    );
  } else {
    render(
          <AppComponent />
        , appRoot);
  }
};

renderToDOM();

if (module.hot) {
  const { AppContainer } = require('react-hot-loader');

  module.hot.accept('./views/index', () => {
    const NextApp = require('./views/index').default;
    renderToDOM(AppContainer, NextApp);
  });
}
