import { combineReducers } from 'redux';
import userReducer from './userReducer';
import draftReducer from './draftReducer';
import sessionReducer from './sessionReducer';

const reducers = combineReducers({
  user: userReducer,
  draft: draftReducer,
  session: sessionReducer,
});

export default reducers;
