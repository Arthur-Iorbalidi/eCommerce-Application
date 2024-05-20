import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const authorizationStateSlice = createSlice({
  name: 'authorizationState',
  initialState: { isAuthorized: false },
  reducers: {
    activateAuthorizationState: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isAuthorized = action.payload;
    },
  },
});

export const authorizationStateReducer = authorizationStateSlice.reducer;

export const { activateAuthorizationState } = authorizationStateSlice.actions;
