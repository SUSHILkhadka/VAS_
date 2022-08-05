import { useNavigate } from 'react-router-dom';
import './UserAppointmentForm.css';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate, stringToTime, timeToString } from '../../utils/common';

import { useDispatch, useSelector } from 'react-redux';
import { DoseDate, Appointment, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { AppointmentForm } from './AppointmentForm';
type SizeType = Parameters<typeof Form>[0]['size'];

export const AppointmentAddForm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const authInfo = useSelector((state: RootState) => state.auth);
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // console.log("time=",values.firstDose_time.format("HH:mm"))
    const firstDose: DoseDate = {
      date: dateToString(values.firstDose_date),
      time: timeToString(values.firstDose_time),
    };
    const secondDose: DoseDate = {
      date: dateToString(values.secondDose_date),
      time: timeToString(values.secondDose_time),
    };
    const info: Appointment = {
      email: values.email,
      siteLocation: values.siteLocation,
      service: values.service,
      firstDose: firstDose,
      secondDose: secondDose,
    };
    dispatch(registerAppointment(info));
    console.log('info is=', info);
    navigate('/appointment/confirmation');
  };

  const initialValue =
    appointmentInfo.siteLocation == ''
      ? { email: authInfo.username }
      : {
          email: appointmentInfo.email,
          siteLocation: appointmentInfo.siteLocation,
          service: appointmentInfo.service,
          firstDose_date: stringToDate(appointmentInfo.firstDose.date),
          firstDose_time: stringToTime(appointmentInfo.firstDose.time),
          secondDose_date: stringToDate(appointmentInfo.secondDose.date),
          secondDose_time: stringToTime(appointmentInfo.secondDose.time),
        };

  //returns true by comparing current with day to be disabled.

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      layout="horizontal"
      size={componentSize as SizeType}
      initialValues={initialValue}
    >
      <AppointmentForm />

      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
