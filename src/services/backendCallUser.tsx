import { useSelector } from 'react-redux';
import { URL_TO_BACKEND } from '../constants/common';
import { Vaccine } from '../redux_toolkit/slices/vaccineSlice';


export async function login(body: any): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/login', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const fullSucessPromise = await response.json();
  return fullSucessPromise;
}

export async function register(body: any): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/register', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const fullSucessPromise = await response.json();
  return fullSucessPromise;
}

export async function create(body: any): Promise<any> {
  const response = await fetch(URL_TO_BACKEND + '/vaccine', {
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
  const response = await fetch(URL_TO_BACKEND + '/vaccine');
  const vaccines = await response.json();
  return vaccines.data;
}

async function update(body: any, id: number | undefined): Promise<Vaccine> {
  const response = await fetch(URL_TO_BACKEND + `/vaccine/${id}`, {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const vaccine = await response.json();
  return vaccine.data;
}
export default update;

export async function deleteBackend(id: number | undefined): Promise<Vaccine> {
  const response = await fetch(URL_TO_BACKEND + `/vaccine/${id}`, {
    method: 'DELETE',
  });
  const vaccine = await response.json();
  return vaccine.data;
}
