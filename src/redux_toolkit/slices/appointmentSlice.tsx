import { createSlice } from '@reduxjs/toolkit'

export interface DoseDate{
    date: string;
    time: string;
}
export interface Appointment {
    id: string;
    siteLocation: string;
    service: string;
    firstDose: DoseDate;
    secondDose: DoseDate;

  }
  
  const defaultDoseDate: DoseDate={
    date:"",
    time:"",
  }

  const defaultValue: Appointment = {
        id: "",
    siteLocation: "",
    service: "",
    firstDose: defaultDoseDate,
    secondDose: defaultDoseDate,
  };
  

export const appointmentSlice = createSlice({
    name: 'appointmentInfo',
    initialState: defaultValue,
    reducers: {
      registerAppointment: (state,action)=>{
        state.id=action.payload.id;
        state.siteLocation=action.payload.siteLocation;
        state.service=action.payload.service;
        state.firstDose=action.payload.firstDose;
        state.secondDose=action.payload.secondDose;

      },
      resetAppointment: (state:Appointment)=>{
        state=defaultValue;
      },

    },
  })

export const {registerAppointment,resetAppointment}=appointmentSlice.actions;
export const appointmentReducer=appointmentSlice.reducer
