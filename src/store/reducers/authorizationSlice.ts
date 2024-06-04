import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const authorizationStateSlice = createSlice({
  name: 'authorizationState',
  initialState: {
    isAuthorized: false,
    userInfo: null,
  },
  reducers: {
    activateAuthorizationState: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAuthorized: action.payload,
    }),
    changeUserInfo: (state, action) => ({
      ...state,
      userInfo: action.payload,
    }),
  },
});

export const authorizationStateReducer = authorizationStateSlice.reducer;

export const { activateAuthorizationState } = authorizationStateSlice.actions;
export const { changeUserInfo } = authorizationStateSlice.actions;
