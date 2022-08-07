import LoginForm from "../../component/login/LoginForm";
import { getLogStatus, getName } from "../../services/getLocalData";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogInPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getLogStatus() == true) {
      navigate("/homepage", { replace: true });
    }
  }, []);
  return (
    <div>
      <LoginForm />
      <p>
        New user??<Link to="/mainregister">Register</Link>
      </p>
    </div>
  );
};
export default LogInPage;
