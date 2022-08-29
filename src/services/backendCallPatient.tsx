import { URL_TO_BACKEND } from "../constants/common";
import { Patient } from "../redux_toolkit/slices/patientSlice";
import api from "./api";

export async function create(body: any): Promise<any> {
  const response = await api.post("/patient/", body);
  return response.data;
}
export async function read(): Promise<any> {
  const response = await api.get("/patient/");
  return response.data;
}
async function update(body: any, id: number | undefined): Promise<Patient> {
  const response = await api.put(`/patient/${id}`, body);
  return response.data;
}
export default update;
export async function deleteBackend(id: number | undefined): Promise<Patient> {
  const response = await api.delete(`/patient/${id}`);
  return response.data;
}
