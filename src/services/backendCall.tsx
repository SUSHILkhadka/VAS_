import { URL_TO_BACKEND } from '../constants/common';
import { Appointment } from '../redux_toolkit/slices/appointmentSlice';

export async function create(body: any): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/appointment', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const appointment = await response.json();
  return appointment.data;
}
export async function read(): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/appointment');
  const appointments = await response.json();
  return appointments.data;
}

async function update(body: any, id: string | undefined): Promise<Appointment> {
  const response = await fetch(URL_TO_BACKEND + `/appointment/${id}`, {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const appointment = await response.json();
  return appointment.data;
}
export default update;

export async function deleteBackend(id: string | undefined): Promise<Appointment> {
  const response = await fetch(URL_TO_BACKEND + `/appointment/${id}`, {
    method: 'DELETE',
  });
  const appointment = await response.json();
  return appointment.data;
}
