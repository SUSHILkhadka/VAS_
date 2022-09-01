import { createSlice } from '@reduxjs/toolkit';
export interface Auth {
  login: boolean;
  username?: string;
  isAdmin: boolean;
  email: string;
}

const defaultValue: Auth = {
  login: false,
  username: '',
  isAdmin: false,
  email: '',
};

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: defaultValue,
  reducers: {
    makeLoggedIn: (state) => {
      state.login = true;
    },
    makeLoggedInWithInfo: (state, action) => {
      state.login = true;
      state.username = action.payload.data.name;
      state.isAdmin = action.payload.data.isAdmin;
      state.email = action.payload.data.email;
    },
    makeLoggedOut: (state) => {
      state.login = false;
      state.username = '';
      state.isAdmin = false;
      state.email = '';
    },
  },
});

export const { makeLoggedIn, makeLoggedInWithInfo, makeLoggedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
