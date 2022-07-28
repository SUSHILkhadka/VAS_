import React, { useContext } from "react";
import { AuthContext } from "../AuthContex";
import "./HomePage.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add_funtion_as_action,sub_funtion_as_action,changename_function_as_action } from "../default_redux/action";

const  SettingPage=()=>{
    // const value=useContext(AuthContext);

  const auth=useSelector((state:any)=>state.secondreducer)
  const dispatch=useDispatch();
  console.log(auth);

    const saveName=(event:any)=>{
        event.preventDefault();
        // value?.setDisplayName(event.target.nameArea.value);
        dispatch(changename_function_as_action(event.target.nameArea.value))
    }
    return(
        <div className="about">
            Setting Page
            <div> Current display name is {auth.username}</div>
            <form onSubmit={saveName}>
            <textarea name="nameArea"></textarea>
            <button type="submit">Save</button>
            </form>
        </div>
    )
}
export default SettingPage;