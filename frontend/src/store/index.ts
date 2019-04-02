import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as modules from './modules';

function createReducer({ namespace = '', reducers, ...options }: any) {
  return function reducer(state = options.state || {}, action: any) {
    const property = namespace && action.type.split(`${namespace}/`)[1];
    if (Object.prototype.hasOwnProperty.call(reducers, property)) {
      return reducers[property](state, action);
    } else {
      return state;
    }
  };
}

const models: any = modules;

const reducers: any = {};
const sagas: any = [];
const middlewares: any = [];

Object.keys(models).forEach((key: string) => {
  reducers[key] = createReducer(models[key]);
});

const global: any = window;

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (global && global.__REDUX_DEVTOOLS_EXTENSION__) ? global.__REDUX_DEVTOOLS_EXTENSION__() : (f: Function) => f
);

export default function configureStore(initialState = {}) {
  const store = createStore(combineReducers(reducers), initialState, storeEnhancers);
  if (module.hot) {
    module.hot.accept(() => {
      const model = require('./modules');
      store.replaceReducer(model.rootReducers);
    });
  }
  return store;
}
