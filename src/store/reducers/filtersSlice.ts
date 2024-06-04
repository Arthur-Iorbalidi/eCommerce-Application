/* eslint-disable no-param-reassign */
import { Category } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceRanges } from '../../components/Catalog/components/components/priceRange/priceRange';

const initialState = {
  categories: [] as Category[],
  activeCategoryId: '',
  activeBrands: [] as string[],
  priceRange: {
    min: PriceRanges.MIN,
    max: PriceRanges.MAX,
  },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setActiveCategoryId: (state, action: PayloadAction<string>) => {
      state.activeCategoryId = action.payload;
    },
    resetActiveCategoryId: (state) => {
      state.activeCategoryId = '';
    },

    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>,
    ) => {
      state.priceRange.min = action.payload.min;
      state.priceRange.max = action.payload.max;
    },
    resetPriceRange: (state) => {
      state.priceRange.min = initialState.priceRange.min;
      state.priceRange.max = initialState.priceRange.max;
    },

    setActiveBrands: (state, action: PayloadAction<string[]>) => {
      state.activeBrands = action.payload;
    },
    resetActiveBrands: (state) => {
      state.activeBrands = [];
    },
  },
});

export const {
  setCategories,
  setActiveCategoryId,
  resetActiveCategoryId,

  setPriceRange,
  resetPriceRange,

  setActiveBrands,
  resetActiveBrands,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
