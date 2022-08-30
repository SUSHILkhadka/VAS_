import { Vaccine } from "../redux_toolkit/slices/vaccineSlice";
import api from "./api";
import { getRefreshToken } from "./getLocalData";

/**
 * f
 * @param body request's body for user login
 * @returns response from server
 */
export async function login(body: any): Promise<any> {
  const response = await api.post("/login", body);
  return response.data;
}
/**
 * f
 * @param body request's body for user register
 * @returns response from server
 */
export async function register(body: any): Promise<any> {
  const response = await api.post("/register", body);
  return response.data;
}

/**
 *
 * @returns response after logout request
 */
export async function logout(): Promise<any> {
  const response = await api.post("/logout", {
    refreshToken: getRefreshToken(),
  });
  return response.data;
}

export async function create(body: any): Promise<any> {
  const response = await api.post("/vaccine", body);
  return response.data;
}
export async function read(): Promise<any> {
  const response = await api.get("/vaccine");
  return response.data;
}

async function update(body: any, id: number | undefined): Promise<Vaccine> {
  const response = await api.put(`/vaccine/` + id, body);
  return response.data;
}
export default update;

export async function deleteBackend(id: number | undefined): Promise<Vaccine> {
  const response = await api.delete(`/vaccine/` + id);
  return await response.data;
}
