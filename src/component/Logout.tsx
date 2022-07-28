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

const LogOut = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <div>LogoutPage</div>
        <button
          onClick={() => {
            authContext?.setLoggedIn("please log in");
            setLogStatus("please log in");
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
