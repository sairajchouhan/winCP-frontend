import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  loading: false,
  loginErrors: {},
  signupErrors: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    USER_LOADED: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loginErrors = {};
      state.signupErrors = {};
    },
    LOGIN_FAIL: (state, action) => {
      state.loginErrors = action.payload;
      state.token = null;
      state.isAuthenticated = false;
    },
    SIGNUP_SUCCESS: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.signupErrors = {};
      state.loginErrors = {};
    },
    SIGNUP_FAIL: (state, action) => {
      state.signupErrors = action.payload;
      state.token = null;
      state.isAuthenticated = false;
      state.loginErrors = {};
    },
    SET_LOADING_TRUE: (state) => {
      state.loading = true;
    },
    SET_LOADING_FALSE: (state) => {
      state.loading = false;
    },
  },
});

export const {
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} = authSlice.actions;

export const loginUser = (loginFormData) => async (dispatch) => {
  dispatch(SET_LOADING_TRUE());
  try {
    const res = await axios.post(
      'http://localhost:5001/wincp-9d49a/us-central1/api/login',
      loginFormData
    );
    const token = res.data.token;
    if (token) localStorage.setItem('token', token);
    dispatch(LOGIN_SUCCESS(token));
  } catch (err) {
    dispatch(SET_LOADING_TRUE());
    dispatch(LOGIN_FAIL(err.response.data.errors));
  }
  dispatch(SET_LOADING_FALSE());
};

export const signupUser = (signupFormData) => async (dispatch) => {
  dispatch(SET_LOADING_TRUE());
  try {
    const res = await axios.post(
      'http://localhost:5001/wincp-9d49a/us-central1/api/signup',
      signupFormData
    );
    const token = res.data.token;
    if (token) localStorage.setItem('token', token);
    dispatch(SIGNUP_SUCCESS(token));
  } catch (err) {
    console.log('in catch block ');
    dispatch(SIGNUP_FAIL(err.response.data.errors));
  }
  dispatch(SET_LOADING_FALSE());
};

export const loadUser = () => async (dispatch) => {
  let token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get(
      'http://localhost:5001/wincp-9d49a/us-central1/api/user'
    );
    dispatch(USER_LOADED(res.data));
  } catch (err) {
    // dispatch(AUTH_ERROR());
  }
};

export const selectAuthState = (state) => state.auth;
export const selectLoginErrors = (state) => state.auth.loginErrors;
export const selectSignupErrors = (state) => state.auth.signupErrors;
export const selectLoading = (state) => state.auth.loading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;

// http://localhost:5001/wincp-9d49a/us-central1/api/signup
