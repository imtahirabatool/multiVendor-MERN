import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    // Perform the API request to load user data
    const { data } = await axios.get(`${server}/user/load-user`, {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    // Dispatch success action with user data
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    // Handle any errors from the API request
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  // Dispatch action to clear errors
  dispatch({ type: "ClearErrors" });
};

//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });

    // Perform the API request to load seller data
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    // Dispatch success action with seller data
    dispatch({ type: "LoadSellerSuccess", payload: data.seller });
  } catch (error) {
    // Handle any errors from the API request
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};