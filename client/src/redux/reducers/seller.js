import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller:false,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadSellerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoadSellerSuccess', (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
      state.error = null; // Clear any previous errors
    })
    .addCase('LoadSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('ClearErrors', (state) => {
      state.error = null;
    });
});
