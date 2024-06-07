/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  orderOptions,
  sortOptions,
} from '../../components/Catalog/sortOptions';

const initialState = {
  sortOption: sortOptions[0].value,
  orderOption: orderOptions[0].value,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
    resetSortOption: (state) => {
      state.sortOption = sortOptions[0].value;
    },

    setSortOrderOption: (state, action: PayloadAction<string>) => {
      state.orderOption = action.payload;
    },
    resetSortOrderOption: (state) => {
      state.orderOption = orderOptions[0].value;
    },
  },
});

export const {
  setSortOption,
  resetSortOption,

  setSortOrderOption,
  resetSortOrderOption,
} = sortSlice.actions;

export const sortReducer = sortSlice.reducer;
