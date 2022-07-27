import React from "react";
import "./About.css";
import Child from "./child";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../AuthContex";

const About = () => {
  const authContext=useContext(AuthContext);
  console.log(authContext);
  return (
        <>
        <div className="App">
          <div>
            About Page
          </div>
        </div>
    </>
  );
};
export default About;
