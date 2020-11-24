import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    SET_NOTIFICATION: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { SET_NOTIFICATION } = notificationsSlice.actions;

export default notificationsSlice.reducer;
