import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { Typography, Divider,Col, Row, Button, message } from 'antd';
import { reset } from "../../redux_toolkit/registration/registerSlice";
const { Title, Text } = Typography;

const ClientPatientRegisterConfirmation = () => {
    const navigate=useNavigate();

  const patientData = useSelector((state: any) => state.register);
  const dispatch=useDispatch();


  const handleConfirmation = () =>{
    // add data to DB here 
    //get unique documentid and display it.
    message.success(`Registration successful`);
    dispatch(reset())
    navigate('/')
}

  return (
    <section className='formContainer userRegisterConfirmForm'>
    <Title className='formContainerHeading' level={5}>Please Confirm the details below and confirm to register. </Title>
    < Divider />
    <Row>
        <Col>
            <Title level={5}>First name: <Text type="secondary" italic>{patientData.firstname+" "+patientData.secondname}</Text></Title>
            <Title level={5}>Email: <Text type="secondary" italic>{patientData.email}</Text></Title>
            <Title level={5}>DOB: <Text type="secondary" italic>{patientData.birthDate}</Text></Title>
            <Title level={5}>Ethnicity: <Text type="secondary" italic>{patientData.ethnicity}</Text></Title>
            <Title level={5}>Gender: <Text type="secondary" italic>{patientData.gender}</Text></Title>
            <Title level={5}>Address: <Text type="secondary" italic>{patientData.address.province}, {patientData.address.city}, {patientData.address.street}</Text></Title>
            <Title level={5}>Payment: <Text type="secondary" italic>{patientData.paymentMethod}, {patientData.insuranceProvider}</Text></Title>
        </Col>
        <Col>
            <Button onClick={handleConfirmation} className='primaryBtn confirmBtn'  type="primary" htmlType="submit">
                Confirm and Submit
            </Button>
        </Col>
        <Col>                
            <Link to='/clientPatientRegister'> Edit</Link>
        </Col>
    </Row>
</section>
  );
};
export default ClientPatientRegisterConfirmation;
