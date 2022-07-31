import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
    changeName,
  } from "../redux_toolkit/counterSlice";


  import {
    setName,
  } from "../services/getLocalData";
const  SettingPage=()=>{
    // const value=useContext(AuthContext);

  const auth=useSelector((state:any)=>state.auth)
  const dispatch=useDispatch();
  console.log(auth);

  

    const saveName=(event:any)=>{
        event.preventDefault();
        //redux toolkit
      dispatch(changeName(event.target.nameArea.value));
      setName(event.target.nameArea.value);


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