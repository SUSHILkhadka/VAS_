import React from 'react';
import './UserAppointmentForm.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import { Typography, Divider, Col, Row, Button, message } from 'antd';
import { resetAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { useDispatch } from 'react-redux';
import { RootState } from '../../redux_toolkit/stores/store';
const { Title, Text } = Typography;

const AppointmentConfirmationSection = () => {
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleConfirmation = () => {
    // add data to DB here
    //get unique documentid and display it.
    message.success(`Registration successful`);
    dispatch(resetAppointment());
    navigate('/homepage');
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
