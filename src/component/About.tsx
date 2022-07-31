import React from "react";
import Child from "./child";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContex";
import Branch from "./Br";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { add_funtion_as_action,sub_funtion_as_action,changename_function_as_action } from "../default_redux/action";
const About = () => {
  const counter=useSelector((state:any)=>state.counter)
  const auth=useSelector((state:any)=>state.auth)
  const registerInfo = useSelector((state: any) => state.register);

  console.log("register info is",registerInfo)
  const dispatch=useDispatch();

  return (
    <>
      <div className="App">
        <div>About Page</div>
        <div>email from registration is= {registerInfo.email}</div>



      </div>
    </>
  );
};
export default About;
