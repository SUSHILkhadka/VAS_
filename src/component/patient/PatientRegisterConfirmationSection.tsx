import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Divider, Col, Row, Button, message } from 'antd';
import { resetPatient } from '../../redux_toolkit/slices/patientSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { create } from '../../services/backendCallPatient';
const { Title, Text } = Typography;

const PatientRegisterConfirmationSection = () => {
  const navigate = useNavigate();
  const patientInfo = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch();

  const handleConfirmation = async () => {
    let body = JSON.stringify({
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
    });

    try {
      const patient = await create(body);
      dispatch(resetPatient());
      navigate('/patient/list');
      message.success(`Registration successful. Id is ${patient.data.id}`);
    } catch {
      message.error(`error adding confirmation`);
    }
  };

  return (
    <section className="formContainer userRegisterConfirmForm">
      <Title className="formContainerHeading" level={5}>
        Please Confirm the details below and confirm to register.{' '}
      </Title>
      <Divider />
      <Row>
        <Col>
          <Title level={5}>
            First name:{' '}
            <Text type="secondary" italic>
              {patientInfo.firstName + ' ' + patientInfo.secondName}
            </Text>
          </Title>
          <Title level={5}>
            Email:{' '}
            <Text type="secondary" italic>
              {patientInfo.email}
            </Text>
          </Title>
          <Title level={5}>
            DOB:{' '}
            <Text type="secondary" italic>
              {patientInfo.birthDate}
            </Text>
          </Title>
          <Title level={5}>
            Ethnicity:{' '}
            <Text type="secondary" italic>
              {patientInfo.ethnicity}
            </Text>
          </Title>
          <Title level={5}>
            Gender:{' '}
            <Text type="secondary" italic>
              {patientInfo.gender}
            </Text>
          </Title>
          <Title level={5}>
            Address:{' '}
            <Text type="secondary" italic>
              {patientInfo.address.state}, {patientInfo.address.city}, {patientInfo.address.street}
            </Text>
          </Title>
          <Title level={5}>
            Payment:{' '}
            <Text type="secondary" italic>
              {patientInfo.paymentMethod}, {patientInfo.insuranceProvider}
            </Text>
          </Title>
        </Col>
        <Col>
          <Button onClick={handleConfirmation} className="primaryBtn confirmBtn" type="primary" htmlType="submit">
            Confirm and Submit
          </Button>
        </Col>
        <Col>
          <Link to="/clientPatientRegister"> Edit</Link>
        </Col>
      </Row>
    </section>
  );
};
export default PatientRegisterConfirmationSection;
