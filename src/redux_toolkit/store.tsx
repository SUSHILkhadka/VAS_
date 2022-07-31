import { configureStore } from '@reduxjs/toolkit'
import  counterReducer from './counterSlice'
import { authReducer } from './authentication/authSlice'
import { registerReducer } from './registration/registerSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    register: registerReducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch