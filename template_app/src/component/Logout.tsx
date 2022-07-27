import React from "react";
import "./About.css";
import Child from "./child";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../AuthContex";

const LogOut = () => {
  const authContext=useContext(AuthContext);
  return (
        <>
        <div className="App">
          <div>
            LogoutPage
          </div>
          <button onClick={()=>{
            authContext?.setLoggedIn("please log in");
          }}>LogOut</button>
        </div>
    </>
  );
};
export default LogOut;
