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
      config,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "eventCreateSuccess", payload: data.event });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/event/get-all-shop-events/${id}`
    );

    dispatch({ type: "getAllEventsShopSuccess", payload: data.events }); // Ensure the payload matches the response key
  } catch (error) {
    console.error(
      "Failed to fetch events:",
      error.response?.data?.message || error.message
    );
    dispatch({
      type: "getAllEventsShopFail",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const config = { withCredentials: true };

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      config
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);

    dispatch({
      type: "getAllEventsSuccess",
      payload: data.allEvents,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFail",
      payload: error.response.data.message,
    });
  }
};
