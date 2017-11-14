import { combineReducers } from 'redux';
import userReducer from './userReducer';
import draftReducer from './draftReducer';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  user: userReducer,
  draft: draftReducer,
  form: formReducer
})

export default reducers;