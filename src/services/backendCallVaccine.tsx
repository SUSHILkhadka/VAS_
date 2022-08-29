import { URL_TO_BACKEND } from '../constants/common';
import { Vaccine } from '../redux_toolkit/slices/vaccineSlice';
import api from "./api";

export async function create(body: any): Promise<any> {
  const response=await api.post('/vaccine/',body);
  return response.data;

}
export async function read(): Promise<any> {
  const response=await api.get('/vaccine/');
  return response.data;

}

async function update(body: any, id: number | undefined): Promise<Vaccine> {
  const response=await api.put('/vaccine/'+id,body);
  return response.data;
}
export default update;

export async function deleteBackend(id: number | undefined): Promise<Vaccine> {
  const response=await api.delete('/vaccine/'+id);
  return response.data;
}
