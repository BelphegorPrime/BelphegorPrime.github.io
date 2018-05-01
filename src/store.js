import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { routerReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import main from './reducers/main';

const appReducers = combineReducers({
  main,
  routing: routerReducer
});

// middleware
const logger = createLogger();
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, logger),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// store
const store = createStoreWithMiddleware(appReducers);

export default store;
