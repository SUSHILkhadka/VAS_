import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Select, Upload } from 'antd';
import React from 'react';
import { Address, Patient, register } from '../../redux_toolkit/slices/patientSlice';
import { dateToString, stringToDate } from '../../utils/common';
import { RootState } from '../../redux_toolkit/stores/store';
import PatientForm from './PatientForm';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const PatientRegisterForm: React.FC = () => {
  const registerInfo = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const address: Address = {
      state: values.address.state,
      city: values.address.city,
      street: values.address.street,
    };
    const info: Patient = {
      firstName: values.firstName,
      secondName: values.lastName,
      birthDate: dateToString(values.birthDate),
      ethnicity: values.ethnicity,
      gender: values.gender,
      email: values.email,
      address: address,
      paymentMethod: values.paymentMethod,
      insuranceProvider: values.insuranceProvider,
    };
    dispatch(register(info));
    navigate('/patient/confirmation');
  };

  const initialvalue =
    registerInfo.firstName == ''
      ? {}
      : {
          firstName: registerInfo.firstName,
          lastName: registerInfo.secondName,
          birthDate: stringToDate(registerInfo.birthDate),
          ethnicity: registerInfo.ethnicity,
          gender: registerInfo.gender,
          email: registerInfo.email,
          address: {
            state: registerInfo.address.state,
            city: registerInfo.address.city,
            street: registerInfo.address.street,
          },
          paymentMethod: registerInfo.paymentMethod,
          insuranceProvider: registerInfo.insuranceProvider,
        };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={initialvalue}
      scrollToFirstError
    >
      <PatientForm />

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatientRegisterForm;
