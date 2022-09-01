export function setLoginResponse(response: any): void {
  setAccessToken(response.accessToken);
  setRefreshToken(response.refreshToken);
}

export function setAccessToken(body: string): void {
  localStorage.setItem('accessToken', body);
}
export function getAccessToken(): string {
  const obj = localStorage.getItem('accessToken');
  return obj ? obj : '';
}

export function setRefreshToken(body: string): void {
  localStorage.setItem('refreshToken', body);
}
export function getRefreshToken(): string {
  const obj = localStorage.getItem('refreshToken');
  return obj ? obj : '';
}
