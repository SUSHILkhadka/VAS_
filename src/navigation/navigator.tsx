import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogInPage from '../pages/login/LogInPage';
import PatientRegisterPage from '../pages/patient/PatientRegisterPage';
import { AppointmentConfirmationPage } from '../pages/appointment/AppointmentConfirmationPage';
import PatientRegisterConfirmationPage from '../pages/patient/PatientConfirmationPage';
import AppointmentSchedulePage from '../pages/appointment/AppointmentSchedulePage';
import AddVaccinePage from '../pages/vaccine/AddVaccinePage';
import ListAppointmentsPage from '../pages/appointment/ListAppointmentsPage';
import ListVaccinesPage from '../pages/vaccine/ListVaccinesPage';
import ManagerVaccineEditPage from '../pages/vaccine/ManagerVaccineEditPage';
import MainRegisterPage from '../pages/login/MainRegisterPage';
import ManagerPatientEditPage from '../pages/patient/ManagerPatientEditPage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux_toolkit/stores/store';
import instance from '../services/api';
import { getRefreshToken } from '../services/getLocalData';
import { makeLoggedInWithInfo, makeLoggedOut } from '../redux_toolkit/slices/authSlice';
import AdminRoute from './AdminRoutes';
import ListPatientsPage from '../pages/patient/ListPatientsPage';
import Layout from './Layout';
import { PageNotFound } from '../pages/PageNotFound';
import PatientDetailsPage from '../pages/patient/PatientDetailsPage';
import AppointmentEditPage from '../pages/appointment/AppointmentEditPage';
import SplashScreen from '../pages/SplashScreen';

const Navigator = () => {
  const [loading, setLoading] = useState(true);
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const response = await instance.post('/token', {
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
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={authInfo.isAdmin ? '/patient/list' : '/login'} />}></Route>
          <Route path="/login" element={<LogInPage />}></Route>
          <Route path="/register" element={<MainRegisterPage />}></Route>
          <Route path="/patient" element={<PatientRegisterPage />}></Route>
          <Route path="/patient/confirmation" element={<PatientRegisterConfirmationPage />}></Route>
          <Route path="/appointment" element={<AppointmentSchedulePage />}></Route>
          <Route path="/appointment/confirmation" element={<AppointmentConfirmationPage />}></Route>
          <Route path="/appointment/list" element={<ListAppointmentsPage />}></Route>
          {authInfo.isAdmin ? (
            <>
              <Route path="/" element={<AdminRoute />}>
                <Route path="/patient/list" element={<ListPatientsPage />}></Route>
                <Route path="/patient/details" element={<PatientDetailsPage />}></Route>
                <Route path="/patient/edit" element={<ManagerPatientEditPage />}></Route>
                <Route path="/appointment/edit" element={<AppointmentEditPage />}></Route>

                <Route path="/vaccine" element={<AddVaccinePage />}></Route>
                <Route path="/vaccine/list" element={<ListVaccinesPage />}></Route>
                <Route path="/vaccine/edit" element={<ManagerVaccineEditPage />}></Route>
              </Route>
            </>
          ) : (
            <></>
          )}
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};
export default Navigator;
