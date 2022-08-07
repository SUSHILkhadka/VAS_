import { createSlice } from '@reduxjs/toolkit';
export interface Auth {
  login: boolean;
  username: string;
  email: string;
  password: string;
  accessToken: string;
}

const defaultValue: Auth = {
  login: false,
  username: '',
  email: "",
  password: "",
  accessToken: "",
};

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: defaultValue,
  reducers: {
    makeLoggedIn: (state) => {
      state.login = true;
      // state.username=action.payload.username;
      // state.email=action.payload.email;
      // state.password=action.payload.password;
      // state.accessToken=action.payload.accessToken;
    },
    makeLoggedInWithInfo: (state,action) => {
      state.login = true;
      state.username=action.payload.data.name;
      state.email=action.payload.data.email;
      state.password=action.payload.data.password;
      state.accessToken=action.payload.accessToken;
    },
    makeLoggedOut: (state) => {
      state.login=false;
      state.username='';
      state.email='';
      state.password='';
      state.accessToken='';
    },
    changeName: (state, action) => {
      state.login = state.login;
      state.username = action.payload;
    },
  },
});

export const { makeLoggedIn,makeLoggedInWithInfo, makeLoggedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
