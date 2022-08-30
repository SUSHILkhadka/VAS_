import { useNavigate } from "react-router-dom";
import "./UserAppointmentForm.css";
import { Button, Form } from "antd";
import React from "react";
import { dateToString, timeToString } from "../../utils/common";

import { useDispatch, useSelector } from "react-redux";
import {
  DoseDate,
  Appointment,
  registerAppointment,
} from "../../redux_toolkit/slices/appointmentSlice";
import { RootState } from "../../redux_toolkit/stores/store";
import { AppointmentForm } from "./AppointmentForm";

export const AppointmentAddForm: React.FC = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
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
    console.log("info is=", info);
    navigate("/appointment/confirmation");
  };
  const initialValue = {
    email: authInfo.isAdmin ? appointmentInfo.email : authInfo.email,
    siteLocation: appointmentInfo.siteLocation,
    service: appointmentInfo.service,
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
