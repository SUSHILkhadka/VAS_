import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Divider, Col, Row, Button, message, Modal } from 'antd';
import { resetAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { create } from '../../services/backendCallAppointment';
import { useState } from 'react';
const { Title, Text } = Typography;

const AppointmentConfirmationSection = () => {
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleConfirmation = async () => {
    setLoading(true);
    let body = {
      patientId: appointmentInfo.patientId,
      siteLocation: appointmentInfo.siteLocation,
      serviceName: appointmentInfo.service,
      firstDoseDate: appointmentInfo.firstDose.date,
      firstDoseTime: appointmentInfo.firstDose.time,
      secondDoseDate: appointmentInfo.secondDose.date,
      secondDoseTime: appointmentInfo.secondDose.time,
    };

    try {
      const appointment = await create(body);
      dispatch(resetAppointment());
      navigate('/appointment/list');
      Modal.success({
        title: 'Your appointment is ready',
        content: 'Your confirmation code is ' + appointment.data.id,
      });
    } catch (e: any) {
      message.error(e.response.data.message);
    }
    setLoading(false);
  };
  return (
    <div className="detail-container ">
      <div className="detail-header">Please Confirm the details below and confirm to book appointment</div>
      <div className="detail-container-row">
        <div className="detail-container-element">
          <h2 className="detail-title">PatientId: </h2>
          <h4 className="detail-value">{appointmentInfo.patientId}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Site Location </h2>
          <h4 className="detail-value">{appointmentInfo.siteLocation}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Service Name: </h2>
          <h4 className="detail-value">{appointmentInfo.service}</h4>
        </div>
      </div>
      <div className="detail-container-row">
        <div className="detail-container-element">
          <h2 className="detail-title">First Dose Date </h2>
          <h4 className="detail-value">{appointmentInfo.firstDose.date}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">First Dose Time </h2>
          <h4 className="detail-value">{appointmentInfo.firstDose.time}</h4>
        </div>
      </div>
      <div className="detail-container-row">
        <div className="detail-container-element">
          <h2 className="detail-title">Second Dose Date </h2>
          <h4 className="detail-value">{appointmentInfo.secondDose.date}</h4>
        </div>
        <div className="detail-container-element">
          <h2 className="detail-title">Second Dose Time </h2>
          <h4 className="detail-value">{appointmentInfo.secondDose.time}</h4>
        </div>
      </div>
      <Link className="btn-fromLink btn-ending btn-gap" to= '/appointment/edit'>
        {' '}
        Edit
      </Link>

      <Button
        loading={loading}
        className="btn-ending btn-gap"
        onClick={handleConfirmation}
        type="primary"
        htmlType="submit"
      >
        Confirm and Book
      </Button>
    </div>
  );
};
export default AppointmentConfirmationSection;
