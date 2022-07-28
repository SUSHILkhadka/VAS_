import { createContext,Dispatch,useState, SetStateAction, ReactNode } from "react"

interface Auth{
    displayName: string;
    loggedIn: string;
    setDisplayName:Dispatch<SetStateAction<string>>;
    setLoggedIn: Dispatch<SetStateAction<string>>;
}
export const AuthContext=createContext<Auth | undefined>(undefined)

type Props={
    children? : ReactNode
}

export const AuthProvider: React.FC<Props> =({children})=>{
    const [loggedIn, setLoggedIn]=useState("false")
    const [displayName, setDisplayName]=useState("default")
    return(<AuthContext.Provider value={{loggedIn,setLoggedIn,displayName,setDisplayName}}>{children}</AuthContext.Provider>)
}