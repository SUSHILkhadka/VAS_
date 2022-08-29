import { useSelector } from 'react-redux';

const HomePage = () => {
  const auth = useSelector((state: any) => state.auth);
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
