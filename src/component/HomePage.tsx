import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContex";
import "./HomePage.css";

import { useSelector } from "react-redux";
import { getLogStatus } from "../services/getLocalData";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
//   const value = useContext(AuthContext);
  const navigate=useNavigate();
  const auth = useSelector((state: any) => state.secondreducer);

console.log(auth);
  useEffect(()=>{
  const loginStatus=getLogStatus();
  if(loginStatus=="false"){
    navigate("/loginpage")
    console.log(navigate)
        }
  },[])

  return (
    <div className="about">
      Logged In Successfully
      <div>name from redux {auth.username}</div>
    </div>
  );
};
export default HomePage;
