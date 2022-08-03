import { createSlice } from '@reduxjs/toolkit';
export interface Auth {
  login: boolean;
  username: string;
}

const defaultValufe: Auth = {
  login: false,
  username: 'default',
};

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: defaultValufe,
  reducers: {
    makeLoggedIn: (state) => {
      state.login = true;
    },
    makeLoggedOut: (state) => {
      state.login = false;
      state.username = state.username;
    },
    changeName: (state, action) => {
      state.login = state.login;
      state.username = action.payload;
    },
  },
});

export const { makeLoggedIn, makeLoggedOut, changeName } = authSlice.actions;
export const authReducer = authSlice.reducer;
