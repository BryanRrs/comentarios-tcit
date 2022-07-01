import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/commentsList/commentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});
