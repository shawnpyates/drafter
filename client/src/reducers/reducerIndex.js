import { combineReducers } from 'redux';

import draftReducer from './draftReducer';
import playerReducer from './playerReducer';
import requestReducer from './requestReducer';
import sessionReducer from './sessionReducer';
import teamReducer from './teamReducer';
import uiReducer from './uiReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  draft: draftReducer,
  player: playerReducer,
  request: requestReducer,
  session: sessionReducer,
  team: teamReducer,
  ui: uiReducer,
  user: userReducer,
});

export default reducers;
