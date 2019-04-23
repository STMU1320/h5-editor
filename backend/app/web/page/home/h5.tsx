
import React, { Component, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Layout from '../../framework/layout';
import Page from '../../../../../common/components/Page';
import '../../asset/css/app.css';
import '../../asset/js/flexible';

class App extends Component<any, any> {
  render() {
    const data: any = {...this.props};
    return <Layout title={this.props.title}>
      <Page {...data}></Page>    
    </Layout>;
  }
}

function bootstrap() {
  if (EASY_ENV_IS_NODE) {
    return App;
  }
  const state = window.__INITIAL_STATE__ || {};
  const root = document.getElementById('app');
  if (EASY_ENV_IS_DEV) {
    ReactDOM.hydrate(<AppContainer>
      <Page {...state}></Page>
      </AppContainer>, root);
    if (module.hot) {
      module.hot.accept();
    }
  }
  ReactDOM.hydrate(<Page {...state}></Page>, root);
}

export default bootstrap();