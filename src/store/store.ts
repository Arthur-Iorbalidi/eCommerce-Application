import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { sideMenuReducer } from './reducers/sideMenuSlice';

const rootReducer = combineReducers({
  sideMenuReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
