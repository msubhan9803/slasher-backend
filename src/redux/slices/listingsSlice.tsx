/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BusinessListing } from '../../routes/business-listings/type';

const initialState = {
  listingsFlat: [] as BusinessListing[],
  lastRetrievalTime: null as null | string,
};

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListingsFlat: (state, action: PayloadAction<BusinessListing[]>) => ({
      ...state,
      listingsFlat: action.payload,
      lastRetrievalTime: new Date().toISOString(),
    }),
  },
});

export const { setListingsFlat } = listingsSlice.actions;

export default listingsSlice.reducer;
