import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInPage from "../pages/login/LogInPage";
import HomePage from "../pages/home/HomePage";
import LogOutPage from "../pages/logout/LogOutPage";
import PatientRegisterPage from "../pages/patient/PatientRegisterPage";
import { AppointmentConfirmationPage } from "../pages/appointment/AppointmentConfirmationPage";
import PatientRegisterConfirmationPage from "../pages/patient/PatientConfirmationPage";
import AppointmentSchedulePage from "../pages/appointment/AppointmentSchedulePage";
import AddVaccinePage from "../pages/vaccine/AddVaccinePage";
import ListAppointmentsPage from "../pages/appointment/ListAppointmentsPage";
import ManagerEditPage from "../pages/appointment/ManagerAppointmentEditPage";
import ListVaccinesPage from "../pages/vaccine/ListVaccinesPage";
import ManagerVaccineEditPage from "../pages/vaccine/ManagerVaccineEditPage";
import MainRegisterPage from "../pages/login/MainRegisterPage";
import ManagerPatientEditPage from "../pages/patient/ManagerPatientEditPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux_toolkit/stores/store";
import instance from "../services/api";
import { getRefreshToken } from "../services/getLocalData";
import {
  makeLoggedInWithInfo,
  makeLoggedOut,
} from "../redux_toolkit/slices/authSlice";
import AdminRoute from "./AdminRoutes";
import ListPatientsPage from "../pages/patient/ListPatientsPage";
import Layout from "./Layout";

const Navigator = () => {
  const [loading, setLoading] = useState(true);
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const response = await instance.post("/token", {
          refreshToken: getRefreshToken(),
        });
        dispatch(makeLoggedInWithInfo(response.data));
      } catch (e: any) {
        dispatch(makeLoggedOut());
      }
      setLoading(false);
    };
    checkRefreshToken();
  }, []);

  if (loading) {
    return <div>SplashScreen</div>;
  }

  return (
    <Router>
      <Routes>
        {!authInfo.login ? (
          <>
            <Route path="*" element={<LogInPage />}></Route>
            <Route path="/mainregister" element={<MainRegisterPage />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<AdminRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />}></Route>
                <Route path="/logout" element={<LogOutPage />}></Route>
                <Route
                  path="/patient"
                  element={<PatientRegisterPage />}
                ></Route>
                <Route
                  path="/patient/confirmation"
                  element={<PatientRegisterConfirmationPage />}
                ></Route>
                <Route
                  path="/patient/list"
                  element={<ListPatientsPage />}
                ></Route>
                <Route
                  path="/patient/edit"
                  element={<ManagerPatientEditPage />}
                ></Route>
                <Route
                  path="/appointment"
                  element={<AppointmentSchedulePage />}
                ></Route>
                <Route
                  path="/appointment/confirmation"
                  element={<AppointmentConfirmationPage />}
                ></Route>
                <Route
                  path="/appointment/list"
                  element={<ListAppointmentsPage />}
                ></Route>
                <Route
                  path="/appointment/edit"
                  element={<ManagerEditPage />}
                ></Route>
                <Route path="/vaccine" element={<AddVaccinePage />}></Route>
                <Route
                  path="/vaccine/list"
                  element={<ListVaccinesPage />}
                ></Route>
                <Route
                  path="/vaccine/edit"
                  element={<ManagerVaccineEditPage />}
                ></Route>
              </Route>
            </Route>
            <Route path="*" element={<h1>Page not found</h1>}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};
export default Navigator;
