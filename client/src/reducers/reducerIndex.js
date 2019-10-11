import { combineReducers } from 'redux';

import draftReducer from './draftReducer';
import playerReducer from './playerReducer';
import requestReducer from './requestReducer';
import sessionReducer from './sessionReducer';
import socketReducer from './socketReducer';
import teamReducer from './teamReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  draft: draftReducer,
  player: playerReducer,
  request: requestReducer,
  session: sessionReducer,
  socket: socketReducer,
  team: teamReducer,
  user: userReducer,
});

export default reducers;
