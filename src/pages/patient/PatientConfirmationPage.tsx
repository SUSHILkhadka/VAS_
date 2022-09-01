import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PatientRegisterConfirmationSection from '../../component/patient/PatientRegisterConfirmationSection';
import { Button, message, Modal } from 'antd';
import { resetPatient } from '../../redux_toolkit/slices/patientSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { create } from '../../services/backendCallPatient';
import '../../component/styles/PatientConfirmationCard.css';
import { useState } from 'react';

export const PatientRegisterConfirmationPage = () => {
  const navigate = useNavigate();
  const patientInfo = useSelector((state: RootState) => state.patient);
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleConfirmation = async () => {
    setLoading(true);
    let body = {
      firstName: patientInfo.firstName,
      secondName: patientInfo.secondName,
      birthDate: patientInfo.birthDate,
      ethnicity: patientInfo.ethnicity,
      gender: patientInfo.gender,
      email: patientInfo.email,
      addressState: patientInfo.address.state,
      addressCity: patientInfo.address.city,
      addressStreet: patientInfo.address.street,
      paymentMethod: patientInfo.paymentMethod,
      insuranceProvider: patientInfo.insuranceProvider,
      photoUrl: patientInfo.photoUrl,
    };

    try {
      const patient = await create(body);
      dispatch(resetPatient());
      Modal.success({
        title: 'You have been registered successfully',
        content: 'Your patient ID is ' + patient.data.id,
      });

      authInfo.isAdmin ? navigate('/patient/list') : navigate('/appointment/');
    } catch (e: any) {
      message.error(e.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <PatientRegisterConfirmationSection />
      <Link className="btn-fromLink btn-ending btn-gap" to={authInfo.isAdmin ? '/patient/edit' : '/patient'}>
        {' '}
        Edit
      </Link>

      <Button
        className="btn-ending btn-gap"
        onClick={handleConfirmation}
        type="primary"
        htmlType="submit"
        loading={loading}
      >
        Confirm and Submit
      </Button>
    </div>
  );
};

export default PatientRegisterConfirmationPage;
