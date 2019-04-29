import * as React from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './views';
import '../src/assets/icons/iconfont.css';
import '../src/theme/base.less';
import '../src/assets/antd.css';

import configerStore from './store';

const appRoot = document.createElement('div');
appRoot.classList.add('app-wrap');
document.body.appendChild(appRoot);
const store = configerStore();
const renderToDOM = (AppContainer?: new () => React.Component<any, any>, AppComponent = App) => {
  if (AppContainer) {
    render(
      <AppContainer>
        <Provider store={store}>
          <LocaleProvider locale={zhCN}>
            <AppComponent />
          </LocaleProvider>
        </Provider>
      </AppContainer>,
      appRoot
    );
  } else {
    render(
      <Provider store={store}>
        <LocaleProvider locale={zhCN}>
          <AppComponent />
        </LocaleProvider>
      </Provider>
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
