import { combineReducers } from 'redux';
import countReducer from './countReducer';
import auth from './auth';
import ordersReducer from './ordersReducer';

export default combineReducers({
  countReducer,
  auth,
  ordersReducer
})