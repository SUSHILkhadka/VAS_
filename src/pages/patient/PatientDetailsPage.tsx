import { Link, useNavigate } from 'react-router-dom';
import PatientRegisterConfirmationSection from '../../component/patient/PatientRegisterConfirmationSection';
import { Button } from 'antd';

import '../../component/styles/PatientConfirmationCard.css';
export const PatientDetailsPage = () => {
  const navigate = useNavigate();
  const handleCancel = async () => {
    navigate('/patient/list');
  };
  return (
    <div>
      <PatientRegisterConfirmationSection />
      <Link className="btn-fromLink btn-ending btn-gap" to="/patient/edit">
        {' '}
        Edit Patient
      </Link>

      <Button className="btn-ending btn-gap" onClick={handleCancel} type="primary" htmlType="submit">
        Ok
      </Button>
    </div>
  );
};

export default PatientDetailsPage;
