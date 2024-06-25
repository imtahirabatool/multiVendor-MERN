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
    console.log("Dispatching getAllProductsShopRequest");
    dispatch({ type: "getAllproductsShopRequest" });

    const response = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    console.log("Fetched products response:", response); // Log the entire response

    const { data } = response;
    console.log("Fetched products data:", data); // Log the data

    dispatch({ type: "getAllProductsShopSuccess", payload: data.product }); // Ensure 'product' key is used
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

//delete product of shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const config = { withCredentials: true };

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      config
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
