import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import home from './home';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  home
});

export default rootReducer;
