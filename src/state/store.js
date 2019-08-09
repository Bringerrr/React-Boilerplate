/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import history from './history';
import rootReducer from './reducer';
import sagas from './saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export default createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history))));

sagaMiddleware.run(sagas);
