import { Button, Dropdown, Menu, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { makeLoggedOut } from "../redux_toolkit/slices/authSlice";
import { RootState } from "../redux_toolkit/stores/store";
import { logout } from "../services/backendCallUser";
import { setLoginResponse } from "../services/getLocalData";
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
    } catch (e) {
      message.error("couldnot logout!!");
    }
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Settings
            </a>
          ),
        },
        {
          key: "2",
          onClick: () => handleLogout(),
          label: <Button loading={loadingLogout}>LogOut</Button>,
        },
      ]}
    />
  );

  const goToListPatientPage = () => {
    navigate("/patient/list");
  };
  const goToListAppointmentPage = () => {
    navigate("/appointment/list");
  };
  const goToListVaccinePage = () => {
    navigate("/vaccine/list");
  };
  return (
    <div>
      <div className="layout--container">
        <div className="layout--tabs">
          <div className="layout--tabs--elements" onClick={goToListPatientPage}>
            List Patients
          </div>
          <div
            className="layout--tabs--elements"
            onClick={goToListAppointmentPage}
          >
            List Appointments
          </div>
          {authInfo.isAdmin ? (
            <div
              className="layout--tabs--elements"
              onClick={goToListVaccinePage}
            >
              List Vaccines
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="layout--options-element">
          <Dropdown overlay={menu}>
            <Button onClick={(e) => e.preventDefault()}>
              {authInfo.username}
            </Button>
          </Dropdown>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
export default Layout;
