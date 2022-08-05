import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getLogStatus } from './services/getLocalData';
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
import { useSelector } from 'react-redux';
import { RootState } from './redux_toolkit/stores/store';
import { useDispatch } from 'react-redux';
import { makeLoggedIn } from './redux_toolkit/slices/authSlice';
import ListAllFormsPage from './pages/register/ListsPage';
import AddVaccinePage from './pages/vaccine/AddVaccinePage';
import ListAppointmentsPage from './pages/appointment/ListAppointmentsPage';
import ManagerEditPage from './pages/appointment/ManagerAppointmentEditPage';
import ListVaccinesPage from './pages/vaccine/ListVaccinesPage';
import ManagerVaccineEditPage from './pages/vaccine/ManagerVaccineEditPage';

const App = () => {
  console.log('nothing');
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  if (getLogStatus() == true) {
    dispatch(makeLoggedIn());
  }

  return (
    <div>
      <Router>
        <div className="App">
          <div>
            <div>Vaccination Appointment Scheduling</div>
            {authInfo.login == false ? <NavBarForLandingPage /> : <NavBar />}
            <Routes>
              <Route path="/" element={<LogInPage />}></Route>
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
        </div>
      </Router>
    </div>
  );
};
export default App;
