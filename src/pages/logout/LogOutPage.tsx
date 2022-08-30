import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { makeLoggedOut } from "../../redux_toolkit/slices/authSlice";
import { setLoginResponse } from "../../services/getLocalData";
import { logout } from "../../services/backendCallUser";
import { message } from "antd";

const LogOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <div>LogoutPage</div>
        <button
          onClick={async () => {
            try {
              const response = await logout();
              message.success("logged out successfully");
            } catch (e) {
              message.error("logged out failed");
            }
            dispatch(makeLoggedOut());
            setLoginResponse("");
          }}
        >
          LogOut
        </button>
      </div>
    </>
  );
};
export default LogOutPage;
