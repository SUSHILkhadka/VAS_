export function getLogStatus(): any {
    const val=localStorage.getItem("LogStatus")?localStorage.getItem("LogStatus"):"plealog in";
    return val;
}

export function getName(): any {
    return localStorage.getItem("displayName")?localStorage.getItem("displayName"):"default";
}
export function setLogStatus(loggedIn: any): void{
    localStorage.setItem("LogStatus", loggedIn);
}

export function setName( name: any): void{
    localStorage.setItem("displayName", name);
}