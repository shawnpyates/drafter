import { combineReducers } from 'redux';
import userReducer from './userReducer';
import draftReducer from './draftReducer';
import sessionReducer from './sessionReducer';
import uiReducer from './uiReducer';

const reducers = combineReducers({
  user: userReducer,
  draft: draftReducer,
  session: sessionReducer,
  ui: uiReducer,
});

export default reducers;
