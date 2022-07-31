import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}


//slice gives actions and reducers. So creating slice is engouh in toolkit

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})


export interface Auth {
    login: string;
    username: string;
  }
  

  const defaultValufe: Auth = {
    login: "false",
    username: "default",
  };
  

export const authSlice = createSlice({
    name: 'authInfo',
    initialState: defaultValufe,
    reducers: {
      makeLoggedIn: (state) => {
        state.login ="true";
      },
      makeLoggedOut: (state) => {
        state.login ="false";
        state.username=state.username;
      },
      changeName: (state,action) => {
        state.login =state.login;
        state.username=action.payload;
      },
    },
  })

  interface RegisterInfo {
    username: string;
    email: string;
  }
  
  const defaultRegisterInfo: RegisterInfo={
    username: "",
    email: ""
  }

  export const registerSlice = createSlice({
    name: 'counter',
    initialState: defaultRegisterInfo,
    reducers: {
        saveName: (state,action) => {  
            state.username =action.payload;
            state.email=state.email;
          },
          saveEmail: (state,action) => {
            state.username =state.username;
            state.email=action.payload;
          },
    },
  })




//
// Action creators are generated for each case reducer function

//actions from slice
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const {makeLoggedIn,makeLoggedOut,changeName}=authSlice.actions;
export const {saveName,saveEmail}=registerSlice.actions;

//reducers from slice
export default counterSlice.reducer
export const authReducer=authSlice.reducer
export const registerReducer=registerSlice.reducer