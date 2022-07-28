import React, { useEffect } from "react";
import { Button } from "antd";
import "./App.css";
import FormPage from "./component/LoginForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContex";

import About from "./component/About";
import HomePage from "./component/HomePage";
import LogOut from "./component/Logout";
import SettingPage from "./component/SettingPage";

import { useContext } from "react";
import { AuthContext } from "./AuthContex";
import { getLogStatus } from "./services/getLocalData";
import ClientPatientRegisterPage from "./component/ClientPatientRegisterPage";

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <div>
            <div>Vaccination Appointment Scheduling</div>
            <Link className="navbar" to="/clientPatientRegister">
              Client Patient Register Page
            </Link>
            <Link className="navbar" to="/loginpage">
              LoginPage
            </Link>
            <Link className="navbar" to="/about">
              About
            </Link>

            {getLogStatus() == "false" ? (
              ""
            ) : (
              <Link className="navbar" to="/logout">
                Logout
              </Link>
            )}
            {getLogStatus() == "false" ? (
              ""
            ) : (
              <Link className="navbar" to="/setting">
                Setting
              </Link>
            )}
            <Routes>
              <Route path="/" element={<FormPage />}></Route>

              <Route path="/loginpage" element={<FormPage />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/homepage" element={<HomePage />}></Route>
              <Route path="/logout" element={<LogOut />}></Route>
              <Route path="/setting" element={<SettingPage />}></Route>
              <Route path="/clientPatientRegister" element={<ClientPatientRegisterPage   />}></Route>

            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};
export default App;
