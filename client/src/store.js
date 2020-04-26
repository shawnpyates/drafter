import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers/reducerIndex';

const middlewares = [promiseMiddleware(), thunk];

const middlewaresWithLogger = process.env.NODE_ENV === 'development' && [...middlewares, logger];

const appliedMiddleware = applyMiddleware(...(middlewaresWithLogger || middlewares));

const store = createStore(reducers, appliedMiddleware);

export default store;
