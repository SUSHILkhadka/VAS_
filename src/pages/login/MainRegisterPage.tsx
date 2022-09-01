import MainRegisterForm from '../../component/patient/MainRegisterForm';
import logo from '../../assets/VasLogo.svg';

const MainRegisterPage = () => {
  return (
    <div className="loginpage-container">
      <img className="img-logo" src={logo} />
      <MainRegisterForm />
    </div>
  );
};
export default MainRegisterPage;
