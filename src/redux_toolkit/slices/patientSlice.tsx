import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  state: string;
  city: string;
  street: string;
}
export interface Patient {
  id?: number;
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
const defaultPatientInfo: Patient = {
  id: 0,
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

export const patientSlice = createSlice({
  name: 'patientInfo',
  initialState: defaultPatientInfo,
  reducers: {
    register: (state, action: PayloadAction<Patient>) => {
      if (action.payload.id) state.id = action.payload.id;
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
    resetPatient: (state) => {
      state.id = 0;
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

export const { register, resetPatient } = patientSlice.actions;

export const patientReducer = patientSlice.reducer;
