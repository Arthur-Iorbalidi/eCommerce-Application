/* eslint-disable no-param-reassign */
import { Category } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceRanges } from '../../components/Catalog/components/components/priceRangeFilter/priceRangeFilter';

const initialState = {
  categories: [] as Category[],
  activeCategoryId: '',

  priceRange: {
    min: PriceRanges.MIN,
    max: PriceRanges.MAX,
  },

  brands: [] as string[],
  activeBrands: [] as string[],

  osArray: [] as string[],
  activeOsArray: [] as string[],

  displayDiagonals: [] as string[],
  activeDisplayDiagonals: [] as string[],
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

    setBrands: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload;
    },
    setActiveBrands: (state, action: PayloadAction<string[]>) => {
      state.activeBrands = action.payload;
    },
    resetActiveBrands: (state) => {
      state.activeBrands = [];
    },

    setOsArray: (state, action: PayloadAction<string[]>) => {
      state.osArray = action.payload;
    },
    setActiveOsArray: (state, action: PayloadAction<string[]>) => {
      state.activeOsArray = action.payload;
    },
    resetActiveOsArray: (state) => {
      state.activeOsArray = [];
    },

    setDisplayDiagonals: (state, action: PayloadAction<string[]>) => {
      state.displayDiagonals = action.payload;
    },
    setActiveDisplayDiagonals: (state, action: PayloadAction<string[]>) => {
      state.activeDisplayDiagonals = action.payload;
    },
    resetActiveDisplayDiagonals: (state) => {
      state.activeDisplayDiagonals = [];
    },
  },
});

export const {
  setCategories,
  setActiveCategoryId,
  resetActiveCategoryId,

  setPriceRange,
  resetPriceRange,

  setBrands,
  setActiveBrands,
  resetActiveBrands,

  setOsArray,
  setActiveOsArray,
  resetActiveOsArray,

  setDisplayDiagonals,
  setActiveDisplayDiagonals,
  resetActiveDisplayDiagonals,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
