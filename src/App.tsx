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

import { getLogStatus } from "./services/getLocalData";
import ClientPatientRegisterPage from "./component/clientPatientRegistration/ClientPatientRegisterPage";
import ClientPatientRegisterConfirmation from "./component/clientPatientRegistration/ConfirmationPage";
import ListAllFormsPage from "./component/clientPatientRegistration/ListAllForm";
import { NavBar, NavBarForLandingPage } from "./component/NavBar";
import AppointmentConfirmationPage from "./component/appointmentSchedule/AppointmentConfirmationPage";
import AppointmentSchedulePage from "./component/appointmentSchedule/UserAppointmentForm";

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <div>
            <div>Vaccination Appointment Scheduling</div>
            {getLogStatus()==false?<NavBarForLandingPage/>:<NavBar/>}
            <Routes>
              <Route path="/" element={<FormPage />}></Route>
              <Route path="/loginpage" element={<FormPage />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/homepage" element={<HomePage />}></Route>
              <Route path="/logout" element={<LogOut />}></Route>
              <Route path="/setting" element={<SettingPage />}></Route>
              <Route path="/clientPatientRegister" element={<ClientPatientRegisterPage   />}></Route>
              <Route path="/clientPatientRegisterConfirmation" element={<ClientPatientRegisterConfirmation   />}></Route>
              <Route path="/clientPatientListAll" element={<ListAllFormsPage   />}></Route>
              <Route path="/appointmentSchedule" element={<AppointmentSchedulePage   />}></Route>
              <Route path="/appointmentConfirmation" element={<AppointmentConfirmationPage   />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};
export default App;
