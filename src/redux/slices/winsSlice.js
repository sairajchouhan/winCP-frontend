import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allWins: null,
};

export const winsSlice = createSlice({
  name: 'wins',
  initialState,
  reducers: {
    SET_ALL_WINS: (state, action) => {
      state.allWins = action.payload;
    },
  },
});

export const { SET_ALL_WINS } = winsSlice.actions;

export default winsSlice.reducer;

// http://localhost:5001/wincp-9d49a/us-central1/api/signup
