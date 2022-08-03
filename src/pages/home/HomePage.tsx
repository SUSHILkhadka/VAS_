import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContex";

import { useSelector } from "react-redux";
import { getLogStatus, setLogStatus } from "../../services/getLocalData";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../component/NavBar";

const HomePage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    const loginStatus = getLogStatus();
    if (loginStatus == false) {
      navigate("/loginpage");
    }
  }, [navigate]);

  return (
    <div>
      Logged In Successfully
      <div> Login Status = {`${auth.login}`}</div>
      <div>User name= {auth.username}</div>
    </div>
  );
};
export default HomePage;
