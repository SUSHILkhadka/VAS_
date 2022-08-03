import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../slices/authSlice'
import { registerReducer } from '../slices/registerSlice'
import { appointmentReducer } from '../slices/appointmentSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    appointment: appointmentReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch