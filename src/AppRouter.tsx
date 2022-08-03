import "./App.css";
import FormPage from "./component/login/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getLogStatus } from "./services/getLocalData";
import { NavBar, NavBarForLandingPage } from "./component/NavBar";
import LogInPage from "./pages/login/LogInPage";
import AboutPage from "./pages/about/AboutPage";
import HomePage from "./pages/home/HomePage";
import LogOutPage from "./pages/logout/LogOutPage";
import SettingPage from "./pages/setting/SettingPage";
import RegisterPage from "./pages/register/RegisterPage";
import { AppointmentConfirmationPage } from "./pages/appointment/AppointmentConfirmationPage";
import RegisterConfirmationPage from "./pages/register/RegisterConfirmationPage";
import AppointmentSchedulePage from "./pages/appointment/AppointSchedulePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux_toolkit/stores/store";
import { useDispatch } from "react-redux";
import { makeLoggedIn } from "./redux_toolkit/slices/authSlice";

const App = () => {
  console.log("nothing")
  const authInfo=useSelector((state: RootState)=>state.auth)
  const dispatch=useDispatch();
  if(getLogStatus()==true){
  dispatch(makeLoggedIn())
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
              <Route
                path="/clientPatientRegister"
                element={<RegisterPage />}
              ></Route>
              <Route
                path="/clientPatientRegisterConfirmation"
                element={<RegisterConfirmationPage />}
              ></Route>
              <Route
                path="/appointmentSchedule"
                element={<AppointmentSchedulePage />}
              ></Route>
              <Route
                path="/appointmentConfirmation"
                element={<AppointmentConfirmationPage />}
              ></Route>
              {/* <Route path="/clientPatientListAll" element={</>}></Route> */}

            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};
export default App;
