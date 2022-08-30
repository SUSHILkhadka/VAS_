import LoginForm from '../../component/login/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LogInPage = () => {
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
