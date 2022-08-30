import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../redux_toolkit/stores/store';


export const  AdminRoute=()=> {
  const authInfo=useSelector((state:RootState)=>state.auth)
  return authInfo.login ? <Outlet /> : <Navigate to="/loginpage" />;
}
export default AdminRoute