import * as React from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'components/Loading';

import history from './routeHistory';
import routes, { route } from './routes';

const LoadComponent = (path: string) => Loadable({
  loader: () => import(`./${path}`),
  loading: Loading
});
export default function AppRouter (): JSX.Element {
  return (
    <Router history={history}>
        <Switch>
          {
            routes.map((item: route) => <Route path={item.path} key={item.name} exact={item.exact} component={LoadComponent(item.name)}/> )
          }
        </Switch>
    </Router>
  );
}
