import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className="">
      <Link className="navbar" to="/homepage">
        Home
      </Link>
      <Link className="navbar" to="/patient">
        Patient Register Page
      </Link>
      <Link className="navbar" to="/patient/list">
        Patient List All Page
      </Link>
      <Link className="navbar" to="/about">
        About
      </Link>
      <Link className="navbar" to="/appointment">
        Appoint a schedule
      </Link>
      <Link className="navbar" to="/appointment/list">
        List all appointments
      </Link>
      <Link className="navbar" to="/logout">
        Logout
      </Link>
      <Link className="navbar" to="/setting">
        Setting
      </Link>
      <Link className="navbar" to="/vaccine">
        Add Vaccine
      </Link>
      <Link className="navbar" to="/vaccine/list">
        List all vaccines
      </Link>
    </div>
  );
};

export const NavBarForLandingPage = () => {
  return (
    <div className="">
      <Link className="navbar" to="/mainregister">
        Main Register Page
      </Link>
      <Link className="navbar" to="/loginpage">
        LoginPage
      </Link>
      <Link className="navbar" to="/about">
        About
      </Link>
    </div>
  );
};
