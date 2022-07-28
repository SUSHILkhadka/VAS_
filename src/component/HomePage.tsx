import React, { useContext } from "react";
import { AuthContext } from "../AuthContex";
import "./HomePage.css"

const  HomePage=()=>{
    const value=useContext(AuthContext);
    return(
        <div className="about">
            Logged In Successfully
            <div>display name is {value?.displayName}</div>
        </div>
    )
}
export default HomePage;