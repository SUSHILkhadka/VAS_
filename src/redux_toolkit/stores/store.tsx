import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../slices/authSlice';
import { patientReducer } from '../slices/patientSlice';
import { appointmentReducer } from '../slices/appointmentSlice';
import { vaccineReducer } from '../slices/vaccineSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    appointment: appointmentReducer,
    vaccine: vaccineReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
