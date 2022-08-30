import './UserAppointmentForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Divider, Col, Row, Button, message } from 'antd';
import { resetAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { create } from '../../services/backendCallAppointment';
const { Title, Text } = Typography;

const AppointmentConfirmationSection = () => {
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleConfirmation = async () => {
    // add data to DB here
    let body = JSON.stringify({
      email: appointmentInfo.email,
      siteLocation: appointmentInfo.siteLocation,
      serviceName: appointmentInfo.service,
      firstDoseDate: appointmentInfo.firstDose.date,
      firstDoseTime: appointmentInfo.firstDose.time,
    });

    try {
      const appointment = await create(body);
      console.log("in try",appointment);
      dispatch(resetAppointment());
      navigate('/appointment/list');
      message.success(`Registration successful. Id is ${appointment.data.id}`);

    } catch(e:any) {
      message.error(e.response);
    }
  };
  return (
    <div className="giveborder">
      <section className="formContainer userRegisterConfirmForm">
        <Title className="formContainerHeading" level={5}>
          Please Confirm the details below and confirm to register.{' '}
        </Title>
        <Divider />
        <Row>
          <Col>
            <Title level={5}>
              Email:{' '}
              <Text type="secondary" italic>
                {appointmentInfo.email}
              </Text>
            </Title>
            <Title level={5}>
              SiteLocation:{' '}
              <Text type="secondary" italic>
                {appointmentInfo.siteLocation}
              </Text>
            </Title>
            <Title level={5}>
              service:{' '}
              <Text type="secondary" italic>
                {appointmentInfo.service}
              </Text>
            </Title>
            <Title level={5}>
              FirstDose:{' '}
              <Text type="secondary" italic>
                {appointmentInfo.firstDose.date} , {appointmentInfo.firstDose.time}
              </Text>
            </Title>
            <Title level={5}>
              SecondDose:{' '}
              <Text type="secondary" italic>
                {appointmentInfo.secondDose.date} , {appointmentInfo.secondDose.time}
              </Text>
            </Title>
          </Col>
          <Col>
            <Button onClick={handleConfirmation} className="primaryBtn confirmBtn" type="primary" htmlType="submit">
              Confirm and Submit
            </Button>
          </Col>
          <Col>
            <Link to="/appointmentSchedule"> Edit</Link>
          </Col>
        </Row>
      </section>
    </div>
  );
};
export default AppointmentConfirmationSection;
