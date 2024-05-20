import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'LoadUserRequest' });

    const { data } = await axios.get(`${server}/user/load-user`);

    dispatch({ type: 'LoadingUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({
      type: 'LoadUserFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: 'clearErrors' });
};
