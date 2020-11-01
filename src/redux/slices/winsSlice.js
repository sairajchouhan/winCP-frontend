import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allWins: null,
  loading: false,
};

export const winsSlice = createSlice({
  name: 'wins',
  initialState,
  reducers: {
    SET_ALL_WINS: (state, action) => {
      state.allWins = action.payload;
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
  SET_ALL_WINS,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} = winsSlice.actions;

export default winsSlice.reducer;

// http://localhost:5001/wincp-9d49a/us-central1/api/signup
