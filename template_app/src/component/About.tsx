import React from "react";
import "./About.css";
import Child from "./child";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const About = () => {
  return (
<>
        <div className="App">
          <div>
            About Page
            {/* <Link to="/loginpage">CHILD</Link> */}
          </div>
        </div>
    </>
  );
};
export default About;
