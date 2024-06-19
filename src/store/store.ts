import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { sideMenuReducer } from './reducers/sideMenuSlice';
import { authorizationStateReducer } from './reducers/authorizationSlice';
import { filtersReducer } from './reducers/filtersSlice';
import { sortReducer } from './reducers/sortSlice';

const rootReducer = combineReducers({
  sideMenuReducer,
  authorizationStateReducer,
  filtersReducer,
  sortReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
