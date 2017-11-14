import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'
import reducers from './reducers/reducerIndex';

const middleware = applyMiddleware(promiseMiddleware(), thunk, logger);

const store = createStore(reducers, middleware);

export default store;