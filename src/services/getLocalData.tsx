export function getLogStatus(): boolean {
    const val=localStorage.getItem("LogStatus")?localStorage.getItem("LogStatus"):"false";
    if(val=="true"){
        return true
    }
    else{
        return false
    }
}

export function getName(): any {
    return localStorage.getItem("displayName")?localStorage.getItem("displayName"):"default";
}
export function setLogStatus(loggedIn: boolean): void{

    if(loggedIn==true){
        localStorage.setItem("LogStatus", "true");
    }
    else{
        localStorage.setItem("LogStatus", "false");

    }
}

export function setName( name: any): void{
    localStorage.setItem("displayName", name);
}