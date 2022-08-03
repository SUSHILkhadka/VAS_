import PatientRegisterForm from "../../component/register/PatientRegisterForm";
import LoginForm from "../../component/login/LoginForm";
import { getLogStatus, getName } from "../../services/getLocalData";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  changeName,
  makeLoggedIn,
} from "../../redux_toolkit/slices/authSlice";

const LogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (getLogStatus() == true) {
    dispatch(makeLoggedIn());
    dispatch(changeName(getName()));
    navigate("/homepage", { replace: true });
  }
  return (
    <div>
      <LoginForm />
      <p>New user??<Link to="/clientPatientRegister">Register</Link></p>
    </div>
  );
};
export default LogInPage;
