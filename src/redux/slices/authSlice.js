import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
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
      state.signupErrors = {};
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
  },
});

export const {
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} = authSlice.actions;

export const loginUser = (loginFormData) => async (dispatch) => {
  try {
    const res = await axios.post(
      'http://localhost:5001/wincp-9d49a/us-central1/api/login',
      loginFormData
    );
    const token = res.data.token;
    if (token) localStorage.setItem('token', token);
    dispatch(LOGIN_SUCCESS(token));
  } catch (err) {
    dispatch(LOGIN_FAIL(err.response.data.errors));
  }
};

export const signupUser = (signupFormData) => async (dispatch) => {
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
export const selectsignupErrors = (state) => state.auth.signupErrors;

export default authSlice.reducer;

// http://localhost:5001/wincp-9d49a/us-central1/api/signup
