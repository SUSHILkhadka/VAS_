import React, { useContext, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { getLogStatus, setLogStatus } from '../../services/getLocalData';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    const loginStatus = getLogStatus();
    if (loginStatus == false) {
      navigate('/loginpage');
    }
  }, []);

  return (
    <div>
      Logged In Successfully
      <div> Login Status = {`${auth.login}`}</div>
      <div>User name= {auth.username}</div>
      <div>password= {auth.password}</div>
      <div>accessTOken= {auth.accessToken}</div>
    </div>
  );
};
export default HomePage;
