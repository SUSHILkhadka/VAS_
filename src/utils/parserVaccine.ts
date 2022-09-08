import { IVaccineFromDB } from "../component/vaccine/VaccineTable";
import { DateRange, Vaccine } from "../redux_toolkit/slices/vaccineSlice";
import { dateToString } from "./common";
 
export const getPatientObjFromDatabaseObject = (Obj: IVaccineFromDB) => {
  const date: DateRange = {
    startDate: Obj.startDate,
    endDate: Obj.endDate,
  };
  const dataForVaccineInfo = {
    id: Obj.id,
    siteLocation: Obj.siteLocation,
    serviceName: Obj.serviceName,
    date: date,
    doseType: Obj.doseType,
    gender: Obj.gender,
    age: Obj.age,
    ethinicity: Obj.ethinicity,
  };
  return dataForVaccineInfo;
};
 
export const getBodyFromVaccineForm=(values:any)=>{
  const dateRange: DateRange = {
    startDate: dateToString(values.date[0]),
    endDate: dateToString(values.date[1]),
  };
  const data: Vaccine = {
    serviceName: values.service,
    siteLocation: values.siteLocation,
    date: dateRange,
    doseType: values.doseType,
    gender: values.gender,
    age: values.age,
    ethinicity: values.ethinicity,
  };
  const body = {
    serviceName: values.serviceName,
    siteLocation: values.siteLocation,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    doseType: values.doseType,
    gender: values.gender,
    age: values.age,
    ethinicity: values.ethinicity,
  };
  return body;
}
