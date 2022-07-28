import React from "react";
import "./About.css";
import Child from "./child";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContex";
import Branch from "./Br";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { add_funtion_as_action,sub_funtion_as_action,changename_function_as_action } from "../default_redux/action";
const About = () => {
  // const authContext = useContext(AuthContext);

  const counter=useSelector((state:any)=>state.firstreducer)
  const auth=useSelector((state:any)=>state.secondreducer)

  console.log(counter)

  const dispatch=useDispatch();

  console.log(auth)

  return (
    <>
      <div className="App">
        <div>About Page</div>
        <>Counter= {counter}</>
        <button onClick={()=>{dispatch(add_funtion_as_action(3))}}>Add</button>
        <button onClick={()=>{dispatch(sub_funtion_as_action(3))}}>Sub</button>

        <button onClick={()=>{
          dispatch(changename_function_as_action("nothing"))
        }}>changename</button>

      </div>
    </>
  );
};
export default About;
