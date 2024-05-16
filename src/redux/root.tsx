import { combineReducers } from 'redux';

import sideMenuReducer from './sideMenuReducer';

const rootReducer = combineReducers({
  sideMenuReducer,
});

export default rootReducer;
