import React from "react";
import "./About.css";
import Child from "./child";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContex";
import {
  getLogStatus,
  getName,
  setLogStatus,
  setName,
} from "../services/getLocalData";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeLoggedOut_function_as_action } from "../default_redux/action";
 
const LogOut = () => {
  // const authContext = useContext(AuthContext);
  const dispatch=useDispatch();

  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <div>LogoutPage</div>
        <button
          onClick={() => {
            // authContext?.setLoggedIn("false");
            dispatch(makeLoggedOut_function_as_action())

            setLogStatus("false");
            console.log(getLogStatus())
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
