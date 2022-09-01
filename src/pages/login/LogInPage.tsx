import LoginForm from '../../component/login/LoginForm';
import { Link } from 'react-router-dom';
import logo from '../../assets/VasLogo.svg';
const LogInPage = () => {
  return (
    <div className="loginpage-container">
      <img className="img-logo" src={logo} />
      <LoginForm />
      <Link to="/register" className="loginpage-row2 ">
        New user??Register
      </Link>
    </div>
  );
};
export default LogInPage;
