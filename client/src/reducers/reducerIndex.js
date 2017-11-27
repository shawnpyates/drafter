import { combineReducers } from 'redux';
import userReducer from './userReducer';
import draftReducer from './draftReducer';
import sessionReducer from './sessionReducer';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  user: userReducer,
  draft: draftReducer,
  session: sessionReducer,
  form: formReducer
})

export default reducers;