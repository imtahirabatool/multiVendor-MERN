// actions/wishlist.js
import { createAction } from "@reduxjs/toolkit";

// Define actions
export const addToWishlist = createAction("wishlist/addToWishlist");
export const removeFromWishlist = createAction("wishlist/removeFromWishlist");

// Action creator functions
export const addToWishlistAsync = (data) => async (dispatch, getState) => {
  dispatch(addToWishlist(data));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

export const removeFromWishlistAsync = (data) => async (dispatch, getState) => {
  dispatch(removeFromWishlist(data._id));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};
