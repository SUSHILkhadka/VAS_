import { createSlice } from '@reduxjs/toolkit';
export interface DateRange {
  startDate: string;
  endDate: string;
}
export interface Vaccine {
  id?: number;
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
      if (action.payload.id) {
        state.id = action.payload.id;
      }
      state.serviceName = action.payload.serviceName;
      state.siteLocation = action.payload.siteLocation;
      state.date = action.payload.date;
      state.doseType = action.payload.doseType;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.ethinicity = action.payload.ethinicity;
    },
    resetVaccine: (state) => {
      state.serviceName = '';
      state.siteLocation = '';
      state.date = defaultDateRange;
      state.doseType = '';
      state.gender = '';
      state.age = 0;
      state.ethinicity = '';
    },
  },
});

export const { addVaccine, resetVaccine } = vaccineSlice.actions;
export const vaccineReducer = vaccineSlice.reducer;
