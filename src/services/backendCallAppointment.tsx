import { URL_TO_BACKEND } from '../constants/common';
import { Appointment } from '../redux_toolkit/slices/appointmentSlice';
import api from "./api";

export async function create(body: any): Promise<any> {

  const response=await api.post('/appointment',body)
  return response.data;
}
export async function read(): Promise<any> {
  const response=await api.get('/appointment')
  return response.data;
}

async function update(body: any, id: number |undefined ): Promise<any> {
  const response=await api.put('/appointment/'+id,body)
  return response.data;

}
export default update;

export async function deleteBackend(id: number|undefined ): Promise<any> {
  const response=await api.delete('/appointment/'+id)
  return response.data;

}
