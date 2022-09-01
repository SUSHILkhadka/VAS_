import { Button, Dropdown, Menu, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { makeLoggedOut } from "../redux_toolkit/slices/authSlice";
import { RootState } from "../redux_toolkit/stores/store";
import { logout } from "../services/backendCallUser";
import { setLoginResponse } from "../services/getLocalData";
import { FacebookFilled } from "@ant-design/icons";
import "./Layout.css";
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authInfo = useSelector((state: RootState) => state.auth);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      const response = await logout();
      dispatch(makeLoggedOut());
      setLoginResponse("");
      message.success("logout successfully");
      navigate("/login");
    } catch (e) {
      message.error("couldnot logout!!");
    }
    setLoadingLogout(false);
  };
  const menu = (
    <Menu
      items={[
        {
          key: "2",
          onClick: () => handleLogout(),
          label: <Button loading={loadingLogout}>LogOut</Button>,
        },
      ]}
    />
  );

  const Styling = (prop: { isActive: boolean }) => {
    const { isActive } = prop;
    return {
      backgroundColor: !isActive ? "white" : "#0090ff",
      color: !isActive ? "black" : "white",
    };
  };
  const [navbarTitle, setNavbarTitle] = useState("Patients");

  const giveLoginAndRegisterTabsOnlyForUser = () => {
    return !authInfo.isAdmin ? (
      <>
        <NavLink
          style={Styling}
          className="layout--tabs--elements"
          to={"/login"}
          onClick={() => setNavbarTitle("Login")}
        >
          Login
        </NavLink>
        <NavLink
          style={Styling}
          className="layout--tabs--elements"
          to={"/register"}
          onClick={() => setNavbarTitle("Register")}
        >
          <div>Admin Register</div>
        </NavLink>
      </>
    ) : (
      <></>
    );
  };
  const givePatientCreateOrPatientList = () => {
    return authInfo.isAdmin ? (
      <NavLink
        style={Styling}
        className="layout--tabs--elements"
        to={"/patient/list"}
        onClick={() => setNavbarTitle("Patients")}
      >
        Patient
      </NavLink>
    ) : (
      <NavLink
        style={Styling}
        className="layout--tabs--elements"
        to={"/patient"}
        onClick={() => setNavbarTitle("Patients")}
      >
        Patient
      </NavLink>
    );
  };
  return (
    <div className="app-container">
      <div className="layout--container">
        <div className="layout--tabs">
          {giveLoginAndRegisterTabsOnlyForUser()}
          {givePatientCreateOrPatientList()}
          <NavLink
            style={Styling}
            onClick={() => setNavbarTitle("Appointments")}
            className="layout--tabs--elements"
            to={"/appointment/list"}
          >
            Appointment
          </NavLink>
          {authInfo.isAdmin ? (
            <NavLink
              style={Styling}
              className="layout--tabs--elements"
              onClick={() => setNavbarTitle("Vaccine")}
              to={"/vaccine/list"}
            >
              List Vaccines
            </NavLink>
          ) : (
            <></>
          )}
        </div>
        {authInfo.isAdmin ? (
          <div className="layout--options-element">
            <Dropdown overlay={menu}>
              <button
                className=".btn-fromLink"
                onClick={(e) => e.preventDefault()}
              >
                <div>
                  <FacebookFilled />
                  {authInfo.email}
                </div>
                <div
                  className={authInfo.isAdmin ? "admin-true" : "admin-false"}
                >
                  Admin={authInfo.isAdmin.toString()}
                </div>
              </button>
            </Dropdown>
            <div className="navbar-title">{navbarTitle}</div>
          </div>
        ) : (
          <div className="layout--options-element">
            <div className="dummy-dropdown"></div>
            <div className="navbar-title">{navbarTitle}</div>
          </div>
        )}
      </div>

      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
