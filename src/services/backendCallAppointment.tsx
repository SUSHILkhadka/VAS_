import api from './api';

export async function create(body: any): Promise<any> {
  const response = await api.post('/appointment/', body);
  return response.data;
}
export async function readAll(): Promise<any> {
  const response = await api.get('/appointment/');
  return response.data;
}
export async function readByPatientId(patientId: string): Promise<any> {
  const response = await api.get('/appointment/' + patientId);
  return response.data;
}

async function update(body: any, id: number | undefined): Promise<any> {
  const response = await api.put('/appointment/' + id, body);
  return response.data;
}
export default update;

export async function deleteBackend(id: number | undefined): Promise<any> {
  const response = await api.delete('/appointment/' + id);
  return response.data;
}
