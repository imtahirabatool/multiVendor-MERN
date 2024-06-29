import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  products: [],
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
      // console.log("Reducer: Handling getAllProductsShopRequest");
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      // console.log(
      //   "Reducer: Handling getAllProductsShopSuccess, payload:",
      //   action.payload
      // );
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      // console.log(
      //   "Reducer: Handling getAllProductsShopFailed, error:",
      //   action.payload
      // );
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    // delete product of shop
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
