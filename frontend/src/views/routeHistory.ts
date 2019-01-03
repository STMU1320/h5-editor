import createHistory from 'history/createBrowserHistory';

import { BASE_ROUTE_PATH } from 'utils/config';

const history = createHistory({
  basename: BASE_ROUTE_PATH
});

export default history;