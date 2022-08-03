import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="">
      <Link className="navbar" to="/homepage">
        Home
      </Link>
      <Link className="navbar" to="/clientPatientListAll">
        Client Patient List All Page
      </Link>
      <Link className="navbar" to="/about">
        About
      </Link>
      <Link className="navbar" to="/appointmentSchedule">
        Appoint a schedule
      </Link>
      <Link className="navbar" to="/logout">
        Logout
      </Link>
      <Link className="navbar" to="/setting">
        Setting
      </Link>
    </div>
  );
};

export const NavBarForLandingPage = () => {
  return (
    <div className="">
      <Link className="navbar" to="/clientPatientRegister">
        Client Patient Register Page
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
