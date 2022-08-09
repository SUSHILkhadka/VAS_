import { useNavigate } from 'react-router-dom';
import { setLogStatus } from '../../services/getLocalData';

import { useDispatch } from 'react-redux';
import { makeLoggedOut } from '../../redux_toolkit/slices/authSlice';

const LogOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <div>LogoutPage</div>
        <button
          onClick={() => {
            dispatch(makeLoggedOut());
            setLogStatus(false);
            navigate('/loginpage');
          }}
        >
          LogOut
        </button>
      </div>
    </>
  );
};
export default LogOutPage;
