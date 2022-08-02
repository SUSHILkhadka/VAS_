import { configureStore } from '@reduxjs/toolkit'
import  counterReducer from './counterSlice'
import { authReducer } from './authentication/authSlice'
import { registerReducer } from './registration/registerSlice'
import { appointmentReducer } from './appointment/appointmentSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    register: registerReducer,
    appointment: appointmentReducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch