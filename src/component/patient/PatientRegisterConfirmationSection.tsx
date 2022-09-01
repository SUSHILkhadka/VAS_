import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux_toolkit/stores/store';

const PatientRegisterConfirmationSection = () => {
  const patientInfo = useSelector((state: RootState) => state.patient);
  return (
    <div className="detail-container ">
      <div className="detail-header">Please Confirm the details below and confirm to register</div>
      <div className="detail-container-row">
        <div className="detail-container-element">
          <h2 className="detail-title">First name: </h2>
          <h4 className="detail-value">{patientInfo.firstName}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Second name: </h2>
          <h4 className="detail-value">{patientInfo.secondName}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Email: </h2>
          <h4 className="detail-value">{patientInfo.email}</h4>
        </div>
      </div>
      <div className="detail-container-row">
        <div className="detail-container-element">
          <h2 className="detail-title">DOB: </h2>
          <h4 className="detail-value">{patientInfo.birthDate}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Ethnicity: </h2>
          <h4 className="detail-value">{patientInfo.ethnicity}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Gender: </h2>
          <h4 className="detail-value">{patientInfo.gender}</h4>
        </div>
      </div>
      <div className="detail-container-row">
        <div className="detail-container-element">
          <h2 className="detail-title">State: </h2>
          <h4 className="detail-value">{patientInfo.address.state}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">City: </h2>
          <h4 className="detail-value">{patientInfo.address.city} </h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Street: </h2>
          <h4 className="detail-value">{patientInfo.address.street}</h4>
        </div>
      </div>
      <div className="detail-container-row">
        <div className="detail-container-element">
          <h2 className="detail-title">Payment Method: </h2>
          <h4 className="detail-value">{patientInfo.paymentMethod}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Insurance Provider: </h2>
          <h4 className="detail-value">{patientInfo.insuranceProvider}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Insurance Provider: </h2>
          <h4 className="detail-value">{patientInfo.insuranceProvider}</h4>
        </div>
      </div>
    </div>
  );
};
export default PatientRegisterConfirmationSection;
