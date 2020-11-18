import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
};

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    SET_FILES: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { SET_FILES } = imageSlice.actions;

export default imageSlice.reducer;
