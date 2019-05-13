import { combineReducers } from 'redux';
import userReducer from './userReducer';
import draftReducer from './draftReducer';
import teamReducer from './teamReducer';
import playerReducer from './playerReducer';
import sessionReducer from './sessionReducer';

const reducers = combineReducers({
  user: userReducer,
  draft: draftReducer,
  team: teamReducer,
  player: playerReducer,
  session: sessionReducer,
});

export default reducers;
