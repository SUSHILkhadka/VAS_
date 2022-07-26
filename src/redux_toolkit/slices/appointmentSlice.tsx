import { createSlice } from '@reduxjs/toolkit';

export interface DoseDate {
  date: string;
  time: string;
}
export interface Appointment {
  id?: number;
  patientId: number;
  siteLocation: string;
  service: string;
  firstDose: DoseDate;
  secondDose: DoseDate;
}

const defaultDoseDate: DoseDate = {
  date: '',
  time: '',
};

const defaultValue: Appointment = {
  id: 0,
  patientId: 0,
  siteLocation: '',
  service: '',
  firstDose: defaultDoseDate,
  secondDose: defaultDoseDate,
};

export const appointmentSlice = createSlice({
  name: 'appointmentInfo',
  initialState: defaultValue,
  reducers: {
    registerAppointment: (state, action) => {
      if (action.payload.id) {
        state.id = action.payload.id;
      }
      state.patientId = action.payload.patientId;
      state.siteLocation = action.payload.siteLocation;
      state.service = action.payload.service;
      state.firstDose = action.payload.firstDose;
      state.secondDose = action.payload.secondDose;
    },
    resetAppointment: (state: Appointment) => {
      state.id = 0;
      state.patientId = 0;
      state.siteLocation = '';
      state.service = '';
      state.firstDose = defaultDoseDate;
      state.secondDose = defaultDoseDate;
    },
  },
});

export const { registerAppointment, resetAppointment } = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
