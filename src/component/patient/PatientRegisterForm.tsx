import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { Address, Patient, register } from '../../redux_toolkit/slices/patientSlice';
import { dateToString, stringToDate } from '../../utils/common';
import { RootState } from '../../redux_toolkit/stores/store';
import PatientForm from './PatientForm';
import CustomImageUploader from '../utils/CustomImageUploader';

const PatientRegisterForm: React.FC = () => {
  const patientInfo = useSelector((state: RootState) => state.patient);
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState(patientInfo.photoUrl);

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
      photoUrl: photoUrl,
    };
    dispatch(register(info));
    navigate('/patient/confirmation');
  };

  const initialvalue = {
    firstName: patientInfo.firstName,
    lastName: patientInfo.secondName,
    birthDate: patientInfo.birthDate ? stringToDate(patientInfo.birthDate) : '',
    ethnicity: patientInfo.ethnicity,
    gender: patientInfo.gender,
    email: patientInfo.email,
    address: {
      state: patientInfo.address.state,
      city: patientInfo.address.city,
      street: patientInfo.address.street,
    },
    paymentMethod: patientInfo.paymentMethod,
    insuranceProvider: patientInfo.insuranceProvider,
    photoUrl: photoUrl,
  };

  return (
    <div className="content-container">
      <Form
        form={form}
        layout="vertical"
        name="register"
        onFinish={onFinish}
        initialValues={initialvalue}
        scrollToFirstError
      >
        <PatientForm />
        <div className="form-uploadpic">
          <CustomImageUploader photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
        </div>
        <Button className="btn-ending" type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default PatientRegisterForm;
