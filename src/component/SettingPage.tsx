import React, { useContext } from "react";
import { AuthContext } from "../AuthContex";
import "./HomePage.css"

const  SettingPage=()=>{
    const value=useContext(AuthContext);
    const saveName=(event:any)=>{
        event.preventDefault();
        console.log(event.target.nameArea.value)
        value?.setDisplayName(event.target.nameArea.value);

    }
    return(
        <div className="about">
            Setting Page
            <div> Current display name is {value?.displayName}</div>

            <form onSubmit={saveName}>
            <textarea name="nameArea"></textarea>
            <button type="submit">Save</button>
            </form>
        </div>
    )
}
export default SettingPage;