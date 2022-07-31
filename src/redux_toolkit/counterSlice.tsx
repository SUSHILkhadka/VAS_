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









//
// Action creators are generated for each case reducer function

//actions from slice
export const { increment, decrement, incrementByAmount } = counterSlice.actions

//reducers from slice
export default counterSlice.reducer