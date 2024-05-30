import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { sideMenuReducer } from './reducers/sideMenuSlice';
import { authorizationStateReducer } from './reducers/authorizationState';

const rootReducer = combineReducers({
  sideMenuReducer,
  authorizationStateReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
