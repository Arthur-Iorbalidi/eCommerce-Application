import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState: { showSideMenu: false },
  reducers: {
    activateSideMenu: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.showSideMenu = action.payload;
    },
  },
});

export const sideMenuReducer = sideMenuSlice.reducer;

export const { activateSideMenu } = sideMenuSlice.actions;
