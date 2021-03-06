
import React, { Component, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Layout from '../../framework/layout';


class App extends Component<any, any> {
  render() {
    return <Layout {...this.props}>
      404    
    </Layout>;
  }
}

function bootstrap() {
  if (EASY_ENV_IS_NODE) {
    return App;
  }
  const state = window.__INITIAL_STATE__;
  const root = document.getElementById('app');
  if (EASY_ENV_IS_DEV) {
    ReactDOM.hydrate(<AppContainer>
      <div>404</div></AppContainer>, root);
    if (module.hot) {
      module.hot.accept();
    }
  }
  ReactDOM.hydrate(<div>404</div>, root);
}

export default bootstrap();