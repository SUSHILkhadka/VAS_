import { createSlice } from '@reduxjs/toolkit';
export interface DateRange {
  startDate: string;
  endDate: string;
}
export interface Vaccine {
  serviceName: string;
  siteLocation: string;
  date: DateRange;
  doseType: string;
  gender: string;
  age: number;
  ethinicity: string;
}
const defaultDateRange: DateRange = {
  startDate: '',
  endDate: '',
};

const defaultValue: Vaccine = {
  serviceName: '',
  siteLocation: '',
  date: defaultDateRange,
  doseType: '',
  gender: '',
  age: 0,
  ethinicity: '',
};

export const vaccineSlice = createSlice({
  name: 'vaccineInfo',
  initialState: defaultValue,
  reducers: {
    addVaccine: (state, action) => {
      state.serviceName = action.payload.serviceName;
      state.siteLocation = action.payload.siteLocation;
      state.date = action.payload.date;
      state.doseType = action.payload.doseType;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.ethinicity = action.payload.ethinicity;
    },
    resetVaccine: (state) => {
      state = defaultValue;
    },
  },
});

export const { addVaccine, resetVaccine } = vaccineSlice.actions;
export const vaccineReducer = vaccineSlice.reducer;
