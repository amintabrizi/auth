import { combineReducers } from 'redux';
import countReducer from './countReducer';
import auth from './auth';

export default combineReducers({
  countReducer,
  auth
})