import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  products: [], // Ensure products is initialized as an empty array
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    // get all shop products
    .addCase("getAllproductsShopRequest", (state) => {
      console.log("Reducer: Handling getAllProductsShopRequest");
      state.isLoading = true;
      state.error = null; // Reset error on new request
    })
    .addCase("getAllproductsShopSuccess", (state, action) => {
      console.log(
        "Reducer: Handling getAllProductsShopSuccess, payload:",
        action.payload
      );
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllproductsShopFailed", (state, action) => {
      console.log(
        "Reducer: Handling getAllProductsShopFailed, error:",
        action.payload
      );
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
