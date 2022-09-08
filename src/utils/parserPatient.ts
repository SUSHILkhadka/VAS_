import { IPatientFromDatabase } from "../component/patient/PatientTable";
import { Address, Patient } from "../redux_toolkit/slices/patientSlice";
import { dateToString } from "./common";
 
export const getPatientObjFromDatabaseObject = (Obj: IPatientFromDatabase) => {
  const address: Address = {
    state: Obj.addressState,
    city: Obj.addressCity,
    street: Obj.addressStreet,
  };
  const dataForPatientInfo: Patient = {
    id: +Obj.id,
    firstName: Obj.firstName,
    secondName: Obj.secondName,
    birthDate: Obj.birthDate,
    ethnicity: Obj.ethnicity,
    gender: Obj.gender,
    email: Obj.email,
    address: address,
    paymentMethod: Obj.paymentMethod,
    insuranceProvider: Obj.insuranceProvider,
    photoUrl: Obj.photoUrl,
  };
  return dataForPatientInfo;
};
 
export const getBodyFromPatientForm = (values: any) => {
  const body = {
    firstName: values.firstName,
    secondName: values.lastName,
    birthDate: dateToString(values.birthDate),
    ethnicity: values.ethnicity,
    gender: values.gender,
    email: values.email,
    addressState: values.address.state,
    addressCity: values.address.city,
    addressStreet: values.address.street,
    paymentMethod: values.paymentMethod,
    insuranceProvider: values.insuranceProvider,
  };
  return body;
};
