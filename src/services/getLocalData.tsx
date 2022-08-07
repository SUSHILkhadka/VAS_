export function getLogStatus(): boolean {
  const logStatus = localStorage.getItem("LogStatus");
  return logStatus ? Boolean(logStatus) : false;
}
export function getName(): any {
  const name = localStorage.getItem("displayName");
  return name ? name : "default";
}
export function setLogStatus(loggedIn: boolean): void {
  if (loggedIn == true) {
    localStorage.setItem("LogStatus", "true");
  } else {
    localStorage.setItem("LogStatus", "");
  }
}
export function setName(name: any): void {
  localStorage.setItem("displayName", name);
}
export function setAuthObj(body: string): void {
  localStorage.setItem("auth", body);
}
export function getAuthObj(): any {
  const obj = localStorage.getItem("auth");
  return obj ? obj : "";
}
