import { IAppointmentFromDb } from "../component/appointment/AppointmentTable";
import {  DoseDate } from "../redux_toolkit/slices/appointmentSlice";
import { dateToString, timeToString } from "./common";
 
export const getAppointmentObjFromDatabaseObject = (Obj: IAppointmentFromDb) => {
  const firstDose: DoseDate = {
    date: Obj.firstDoseDate,
    time: Obj.firstDoseTime,
  };
  const secondDose: DoseDate = {
    date: Obj.secondDoseDate,
    time: Obj.secondDoseTime,
  };
  const dataForAppointmentInfo = {
    id: Obj.id,
    patientId: Obj.patientId,
    siteLocation: Obj.siteLocation,
    service: Obj.serviceName,
    firstDose: firstDose,
    secondDose: secondDose,
  };
  return dataForAppointmentInfo;
};
 
export const getBodyFromAppointmentForm=(values:any)=>{
    const firstDose: DoseDate = {
        date: dateToString(values.firstDose_date),
        time: timeToString(values.firstDose_time),
      };
      const secondDose: DoseDate = {
        date: dateToString(values.secondDose_date),
        time: timeToString(values.secondDose_time),
      };
      const body = {
        patientId: values.patientId,
        siteLocation: values.siteLocation,
        serviceName: values.service,
        firstDoseDate: firstDose.date,
        firstDoseTime: firstDose.time,
        secondDoseDate: secondDose.date,
        secondDoseTime: secondDose.time,
      };
    return body;
}
