import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import winsReducer from './slices/winsSlice';
import snackbarReducer from './slices/snackbarSlice';
import imageSlice from './slices/imageSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    wins: winsReducer,
    snackbar: snackbarReducer,
    images: imageSlice,
  },
});
