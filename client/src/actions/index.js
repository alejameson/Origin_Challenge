const axios = require("axios").default;
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER = "GET_USER";
export const GET_ALL_ACTIONS = "GET_ALL_ACTIONS";
export const ADD_ACTION = "ADD_ACTION";
export const ACTION_LOADED = "ACTION_LOADED";
export const REMOVE_ACTION = "REMOVE_ACTION";
export const GET_ACTION_BY_SYMBOL = "GET_ACTION_BY_SYMBOL";
export const GET_ACTION_DATA = "GET_ACTION_DATA";

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

export function getAllActions() {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/getActions`).then((response) => {
      dispatch({
        type: GET_ALL_ACTIONS,
        payload: response.data,
      });
    });
  };
}

export function addAction(data) {
  return (dispatch) => {
    return axios
      .post("http://localhost:3001/addUserAction", data)
      .then((response) => {
        dispatch({ type: ADD_ACTION, payload: response.data });
      });
  };
}

export function actionsLoaded(actions) {
  return function (dispatch) {
    dispatch({
      type: ACTION_LOADED,
      payload: actions,
    });
  };
}

export function removeActions(actionName) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_ACTION,
      payload: actionName,
    });
  };
}

export function getActionBySymbol(symbol) {
  return function (dispatch) {
    dispatch({
      type: GET_ACTION_BY_SYMBOL,
      payload: symbol,
    });
  };
}

export function getActionData(symbol){
  return function (dispatch) {
    return axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=5min&start_date=2021-04-16%2009:48:00&end_date=2021-10-19%2019:48:00&apikey=34ba91d0dfc14192bda4ce1502d7a4f7`).then((response) => {
      dispatch({
        type: GET_ACTION_DATA,
        payload: response.data,
      });
    });
  };
}
