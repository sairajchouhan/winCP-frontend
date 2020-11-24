import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import winsReducer from './slices/winsSlice';
import snackbarReducer from './slices/snackbarSlice';
import notificationsReducer from './slices/notificationsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    wins: winsReducer,
    snackbar: snackbarReducer,
    notifications: notificationsReducer,
  },
});
