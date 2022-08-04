import { useSelector } from 'react-redux';
const AboutPage = () => {
  const registerInfo = useSelector((state: any) => state.register);

  console.log('register info is', registerInfo);

  return (
    <>
      <div className="App">
        <div>About Page</div>
        <div>email from registration is= {registerInfo.email}</div>
      </div>
    </>
  );
};
export default AboutPage;
