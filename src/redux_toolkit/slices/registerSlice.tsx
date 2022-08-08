import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  state: string;
  city: string;
  street: string;
}
export interface RegisterInfo {
  firstName: string;
  secondName: string;
  birthDate: string;
  ethnicity: string;
  gender: string;
  email: string;
  address: Address;

  paymentMethod: string;
  insuranceProvider: string;
}

const defaultAddress: Address = {
  state: '',
  city: '',
  street: '',
};
const defaultRegisterInfo: RegisterInfo = {
  firstName: '',
  secondName: '',
  birthDate: '',
  ethnicity: '',
  gender: '',
  email: '',
  address: defaultAddress,

  paymentMethod: '',
  insuranceProvider: '',
};

export const registerSlice = createSlice({
  name: 'registerInfo',
  initialState: defaultRegisterInfo,
  reducers: {
    register: (state, action: PayloadAction<RegisterInfo>) => {
      // state=action.payload; //doesnot work
      state.firstName = action.payload.firstName;
      state.secondName = action.payload.secondName;
      state.birthDate = action.payload.birthDate;
      state.ethnicity = action.payload.ethnicity;
      state.gender = action.payload.gender;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.paymentMethod = action.payload.paymentMethod;
      state.insuranceProvider = action.payload.insuranceProvider;
    },
    reset: (state) => {
      state.firstName = '';
      state.secondName = '';
      state.birthDate = '';
      state.ethnicity = '';
      state.gender = '';
      state.email = '';
      state.address = defaultAddress;
      state.paymentMethod = '';
      state.insuranceProvider = '';
    },
  },
});

export const { register, reset } = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
