import { createSlice } from '@reduxjs/toolkit';

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
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loginErrors = {};
      state.signupErrors = {};
    },
    SIGNUP_SUCCESS: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
      state.signupErrors = {};
      state.loginErrors = {};
    },
    LOGIN_FAIL: (state, action) => {
      state.loginErrors = action.payload;
      state.token = null;
      state.isAuthenticated = false;
    },
    SIGNUP_FAIL: (state, action) => {
      state.signupErrors = action.payload;
      state.token = null;
      state.isAuthenticated = false;
      state.loginErrors = {};
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.loginErrors = {};
      state.signupErrors = {};
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
  LOGOUT,
} = authSlice.actions;

export const selectLoginErrors = (state) => state.auth.loginErrors;
export const selectSignupErrors = (state) => state.auth.signupErrors;
export const selectLoading = (state) => state.auth.loading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;

// http://localhost:5001/wincp-9d49a/us-central1/api/signup
