import { useNavigate } from 'react-router-dom';
import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate, stringToTime, timeToString } from '../../utils/common';

import { useDispatch, useSelector } from 'react-redux';
import { DoseDate, Appointment, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { AppointmentForm } from './AppointmentForm';

export const AppointmentAddForm: React.FC = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    if (values.firstDose_date < values.secondDose_date) {
      const firstDose: DoseDate = {
        date: dateToString(values.firstDose_date),
        time: timeToString(values.firstDose_time),
      };
      const secondDose: DoseDate = {
        date: dateToString(values.secondDose_date),
        time: timeToString(values.secondDose_time),
      };
      const info: Appointment = {
        patientId: values.patientId,
        siteLocation: values.siteLocation,
        service: values.service,
        firstDose: firstDose,
        secondDose: secondDose,
      };
      dispatch(registerAppointment(info));
      navigate('/appointment/confirmation');
    } else {
      message.error('second dose date cannot be smaller than first dose date');
    }
  };
  const initialValue = {
    patientId: appointmentInfo.patientId,
    siteLocation: appointmentInfo.siteLocation,
    service: appointmentInfo.service,
    firstDose_date: appointmentInfo.firstDose.date ? stringToDate(appointmentInfo.firstDose.date) : '',
    firstDose_time: appointmentInfo.firstDose.time ? stringToTime(appointmentInfo.firstDose.time) : '',
    secondDose_date: appointmentInfo.secondDose.date ? stringToDate(appointmentInfo.secondDose.date) : '',
    secondDose_time: appointmentInfo.secondDose.time ? stringToTime(appointmentInfo.secondDose.time) : '',
  };
  return (
    <Form onFinish={onFinish} layout="vertical" initialValues={initialValue}>
      <AppointmentForm />

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
