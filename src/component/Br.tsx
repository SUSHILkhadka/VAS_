import React from "react";
import "./About.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../AuthContex";

const Branch = () => {
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
