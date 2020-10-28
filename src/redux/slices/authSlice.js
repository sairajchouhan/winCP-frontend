import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  errors: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    USER_LOADED: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    AUTH_ERROR: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    LOGIN_FAIL: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { USER_LOADED, AUTH_ERROR } = authSlice.actions;

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
    dispatch(AUTH_ERROR());
  }
};
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const body = { email, password };
    const res = await axios.post(
      'http://localhost:5001/wincp-9d49a/us-central1/api/login',
      body
    );
  } catch (err) {}
};

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
