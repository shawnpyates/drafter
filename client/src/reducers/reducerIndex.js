import { combineReducers } from 'redux';
import userReducer from './userReducer';
import draftReducer from './draftReducer';
import teamReducer from './teamReducer';
import sessionReducer from './sessionReducer';

const reducers = combineReducers({
  user: userReducer,
  draft: draftReducer,
  team: teamReducer,
  session: sessionReducer,
});

export default reducers;
