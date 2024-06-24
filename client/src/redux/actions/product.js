import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "productCreateRequest" });
    const config = { header: { "Content-Type": "multipart/form-data" } };

    const data = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch({ type: "productCreateSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    // console.log("Dispatching getAllProductsShopRequest");
    dispatch({ type: "getAllproductsShopRequest" });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    // console.log("Fetched products data:", data); // Detailed logging
    

    dispatch({ type: "getAllProductsShopSuccess", payload: data.products });
  } catch (error) {
    console.error(
      "Failed to fetch products:",
      error.response?.data?.message || error.message
    );
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
