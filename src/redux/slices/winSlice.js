import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  body: '',
  createdAt: '',
};

export const authSlice = createSlice({
  name: 'win',
  initialState,
  reducers: {
    CREATE_WIN: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { USER_LOADED } = authSlice.actions;

export default authSlice.reducer;
