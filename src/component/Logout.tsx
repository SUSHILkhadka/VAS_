import React from "react";
import {
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import {
  setLogStatus,
} from "../services/getLocalData";

import { useDispatch } from "react-redux";
import  {makeLoggedOut,changeName} from "../redux_toolkit/authentication/authSlice"

const LogOut = () => {
  const dispatch=useDispatch();

  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <div>LogoutPage</div>
        <button
          onClick={() => {
            dispatch(makeLoggedOut())
            dispatch(changeName("name after logout out"))

            setLogStatus("false");
            navigate("/loginpage");
          }}
        >
          LogOut
        </button>
      </div>
    </>
  );
};
export default LogOut;
