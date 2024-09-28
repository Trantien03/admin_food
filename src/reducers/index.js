import { combineReducers } from 'redux';
import yourReducer from './yourReducer'; // Adjust the import path as needed

const rootReducer = combineReducers({
  yourState: yourReducer, // Ensure yourReducer is defined and returns a valid initial state
});

export default rootReducer;
