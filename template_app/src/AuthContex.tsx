import { createContext,Dispatch,useState, SetStateAction, ReactNode } from "react"

interface Auth{
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;

}
export const AuthContext=createContext<Auth | undefined>(undefined)

type Props={
    children? : ReactNode
}

export const AuthProvider: React.FC<Props> =({children})=>{
    const [loggedIn, setLoggedIn]=useState(false)
    return(<AuthContext.Provider value={{loggedIn, setLoggedIn}}>{children}</AuthContext.Provider>)
}