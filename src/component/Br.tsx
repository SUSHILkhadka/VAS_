import React from "react";
import "./About.css";
import Child from "./child";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../AuthContex";

const Branch = () => {
  const authContext=useContext(AuthContext);
  console.log("in branch",authContext);
  authContext?.setDisplayName("Aman");
  return (
        <>
        <div className="App">
          <div>
            Branch Page
          </div>
        </div>
    </>
  );
};
export default Branch;
