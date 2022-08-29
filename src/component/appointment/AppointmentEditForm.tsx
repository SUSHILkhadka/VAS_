import { useNavigate } from 'react-router-dom';
import './UserAppointmentForm.css';
import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate, stringToTime, timeToString } from '../../utils/common';
import { useSelector } from 'react-redux';
import { DoseDate } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import update, { deleteBackend } from '../../services/backendCallAppointment';
import { AppointmentForm } from './AppointmentForm';

export const AppointmentEditForm: React.FC = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const firstDose: DoseDate = {
      date: dateToString(values.firstDose_date),
      time: timeToString(values.firstDose_time),
    };

    // const secondDose: DoseDate = {
    //   date: dateToString(values.secondDose_date),
    //   time: timeToString(values.secondDose_time),
    // };

    let body = JSON.stringify({
      email: values.email,
      siteLocation: values.siteLocation,
      serviceName: values.service,
      firstDoseDate: firstDose.date,
      firstDoseTime: firstDose.time,
    });

    try {
      const appointment = await update(body, appointmentInfo.id);
      console.log(appointment);
      message.success(`Edit successful. Id is ${appointmentInfo.id}`);
      navigate('/appointment/list');
    } catch {
      message.error('error editing');
    }
  };

  const handleDelete = async () => {
    try {
      const appointment = await deleteBackend(appointmentInfo.id);
      console.log(appointment);
      message.success(`Delete successful. Id is ${appointmentInfo.id}`);
      navigate('/appointment/list');
    } catch {
      message.error('error');
    }
  };

  const initialValue ={
          id: appointmentInfo.id,
          email: appointmentInfo.email,
          siteLocation: appointmentInfo.siteLocation,
          service: appointmentInfo.service,
          firstDose_date: stringToDate(appointmentInfo.firstDose.date),
          firstDose_time: stringToTime(appointmentInfo.firstDose.time),
          secondDose_date: stringToDate(appointmentInfo.secondDose.date),
          secondDose_time: stringToTime(appointmentInfo.secondDose.time),
        };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      layout="horizontal"
      initialValues={initialValue}
    >
      <AppointmentForm />
      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
      <Form.Item label="Button">
        <Button onClick={handleDelete}>Delete</Button>
      </Form.Item>
    </Form>
  );
};
