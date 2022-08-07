import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from './redux_toolkit/stores/store';
import { makeLoggedIn, makeLoggedInWithInfo } from './redux_toolkit/slices/authSlice';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getAuthObj, getLogStatus } from './services/getLocalData';
import { NavBar, NavBarForLandingPage } from './component/NavBar';
import LogInPage from './pages/login/LogInPage';
import AboutPage from './pages/about/AboutPage';
import HomePage from './pages/home/HomePage';
import LogOutPage from './pages/logout/LogOutPage';
import SettingPage from './pages/setting/SettingPage';
import RegisterPage from './pages/register/RegisterPage';
import { AppointmentConfirmationPage } from './pages/appointment/AppointmentConfirmationPage';
import RegisterConfirmationPage from './pages/register/RegisterConfirmationPage';
import AppointmentSchedulePage from './pages/appointment/AppointSchedulePage';
import ListAllFormsPage from './pages/register/ListsPage';
import AddVaccinePage from './pages/vaccine/AddVaccinePage';
import ListAppointmentsPage from './pages/appointment/ListAppointmentsPage';
import ManagerEditPage from './pages/appointment/ManagerAppointmentEditPage';
import ListVaccinesPage from './pages/vaccine/ListVaccinesPage';
import ManagerVaccineEditPage from './pages/vaccine/ManagerVaccineEditPage';
import MainRegisterPage from './pages/login/MainRegisterPage';

const App = () => {
  console.log('nothing');
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  if (getLogStatus() == true) {

    const body=getAuthObj();
    console.log('body from local storage=',body)
    dispatch(makeLoggedInWithInfo(JSON.parse(body)));
    dispatch(makeLoggedIn());

  }

  return (
      <Router>
        <div className="App">
            <div>Vaccination Appointment Scheduling</div>
            {authInfo.login == false ? <NavBarForLandingPage /> : <NavBar />}
            <Routes>
              <Route path="/" element={<LogInPage />}></Route>
              <Route path="/mainregister" element={<MainRegisterPage />}></Route>
              <Route path="/loginpage" element={<LogInPage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/homepage" element={<HomePage />}></Route>
              <Route path="/logout" element={<LogOutPage />}></Route>
              <Route path="/setting" element={<SettingPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/register/confirmation" element={<RegisterConfirmationPage />}></Route>
              <Route path="/register/list" element={<ListAllFormsPage />}></Route>
              <Route path="/appointment" element={<AppointmentSchedulePage />}></Route>
              <Route path="/appointment/confirmation" element={<AppointmentConfirmationPage />}></Route>
              <Route path="/appointment/list" element={<ListAppointmentsPage />}></Route>
              <Route path="/appointment/edit" element={<ManagerEditPage />}></Route>
              <Route path="/vaccine" element={<AddVaccinePage />}></Route>
              <Route path="/vaccine/list" element={<ListVaccinesPage />}></Route>
              <Route path="/vaccine/edit" element={<ManagerVaccineEditPage />}></Route>
              <Route path="*" element={<h1>Page not found</h1>}></Route>
            </Routes>
          </div>
      </Router>
  );
};
export default App;
