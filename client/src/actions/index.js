const axios = require("axios").default;
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER = "GET_USER";

export function getAllUsers() {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/getUsers`).then((response) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    });
  };
}

export function getUser(user) {
  return function (dispatch) {
    dispatch({
      type: GET_USER,
      payload: user,
    });
  };
}
