import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    SET_SNACKBAR: (state, action) => {
      state.snackbarOpen = action.payload.snackbarOpen;
      state.snackbarType = action.payload.snackbarType;
      state.snackbarMessage = action.payload.snackbarMessage;
    },
  },
});

export const { SET_SNACKBAR } = snackbarSlice.actions;

export default snackbarSlice.reducer;

export const setSnackbar = (
  dispatch,
  snackbarOpen,
  snackbarType = 'success',
  snackbarMessage = ''
) => {
  dispatch(
    SET_SNACKBAR({
      snackbarOpen,
      snackbarType,
      snackbarMessage,
    })
  );
};

// http://localhost:5001/wincp-9d49a/us-central1/api/signup
