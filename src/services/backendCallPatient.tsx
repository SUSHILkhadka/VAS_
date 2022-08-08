import { URL_TO_BACKEND } from '../constants/common';
import { Patient } from '../redux_toolkit/slices/patientSlice';

export async function create(body: any): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/patient', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const vaccine = await response.json();
  return vaccine.data;
}
export async function read(): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/patient');
  const patients = await response.json();
  return patients.data;
}

async function update(body: any, id: number | undefined): Promise<Patient> {
  const response = await fetch(URL_TO_BACKEND + `/patient/${id}`, {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const patient = await response.json();
  return patient.data;
}
export default update;

export async function deleteBackend(id: number | undefined): Promise<Patient> {
  const response = await fetch(URL_TO_BACKEND + `/patient/${id}`, {
    method: 'DELETE',
  });
  const patient = await response.json();
  return patient.data;
}
