export function getLogStatus(): boolean {
    const logStatus = localStorage.getItem("LogStatus")
    return logStatus?Boolean(logStatus):false
}
export function getName(): any {
    const name=localStorage.getItem("displayName")
    return name?name:"default";
}
export function setLogStatus(loggedIn: boolean): void{
    if(loggedIn==true){
        localStorage.setItem("LogStatus", "true");
    }
    else{
        localStorage.setItem("LogStatus", "");
    }
}
export function setName( name: any): void{
    localStorage.setItem("displayName", name);
}