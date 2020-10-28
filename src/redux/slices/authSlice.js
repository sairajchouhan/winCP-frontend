import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
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

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
