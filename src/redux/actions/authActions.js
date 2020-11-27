import axios from 'axios';
import { URL } from '../../utils/constants';

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  LOGOUT,
  USER_LOADED,
} from '../slices/authSlice';
import setAuthToken from '../../utils/setAuthToken';
import { SET_WINS_EMPTY } from '../slices/winsSlice';
import { SET_NOTIFICATION } from '../slices/notificationsSlice';

export const loginUser = (loginFormData) => async (dispatch) => {
  dispatch(SET_LOADING_TRUE());
  try {
    const res = await axios.post(`${URL}/login`, loginFormData);
    const token = res.data.token;
    if (token) localStorage.setItem('token', token);
    dispatch(LOGIN_SUCCESS(token));
    dispatch(loadUser());
    dispatch(SET_LOADING_FALSE());
    return true;
  } catch (err) {
    dispatch(LOGIN_FAIL(err?.response?.data?.errors));
    dispatch(SET_LOADING_FALSE());
    return false;
  }
};

export const signupUser = (signupFormData) => async (dispatch) => {
  dispatch(SET_LOADING_TRUE());
  try {
    const res = await axios.post(`${URL}/signup`, signupFormData);
    const token = res.data.token;
    dispatch(SIGNUP_SUCCESS(token));
    dispatch(loadUser());
  } catch (err) {
    console.log('in catch block ');
    dispatch(SIGNUP_FAIL(err?.response?.data.errors));
  }
  dispatch(SET_LOADING_FALSE());
};

export const logoutUser = () => async (dispatch) => {
  dispatch(LOGOUT());
  dispatch(SET_WINS_EMPTY());
  dispatch(SET_NOTIFICATION([]));
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${URL}/user`);
    dispatch(USER_LOADED(res.data));
  } catch (err) {
    dispatch(LOGOUT());
  }
};
