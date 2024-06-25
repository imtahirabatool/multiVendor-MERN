import axios from "axios";
import { server } from "../../server";

// create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });
    const config = { header: { "Content-Type": "multipart/form-data" } };

    const data = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({ type: "eventCreateSuccess", payload: data.event });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsShopRequest" });

    const response = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    );

    const { data } = response;

    dispatch({ type: "getAllEventsShopSuccess", payload: data.event });
  } catch (error) {
    console.error(
      "Failed to fetch events:",
      error.response?.data?.message || error.message
    );
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

//delete event of shop
export const deleteevent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });

    const config = { withCredentials: true };

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      config
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
