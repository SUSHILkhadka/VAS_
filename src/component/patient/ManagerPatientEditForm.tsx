import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate } from '../../utils/common';
import { RootState } from '../../redux_toolkit/stores/store';
import PatientForm from './PatientForm';
import update, { deleteBackend } from '../../services/backendCallPatient';
import CustomImageUploader from '../utils/CustomImageUploader';

const ManagerPatientEditForm: React.FC = () => {
  const patientInfo = useSelector((state: RootState) => state.patient);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState(patientInfo.photoUrl);
  const [loading, setLoading] = useState(false);
  const [loadingForDelete, setLoadingForDelete] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    let body = {
      firstName: values.firstName,
      secondName: values.lastName,
      birthDate: dateToString(values.birthDate),
      ethnicity: values.ethnicity,
      gender: values.gender,
      email: values.email,
      addressState: values.address.state,
      addressCity: values.address.city,
      addressStreet: values.address.street,
      paymentMethod: values.paymentMethod,
      insuranceProvider: values.insuranceProvider,
      photoUrl: photoUrl,
    };

    try {
      const patient = await update(body, patientInfo.id);
      message.success(`Edit successful. Id is ${patientInfo.id}`);
      navigate('/patient/list');
    } catch {
      message.error('error editing');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoadingForDelete(true);
    try {
      const patient = await deleteBackend(patientInfo.id);
      console.log(patient);
      message.success(`Delete successful. Id is ${patientInfo.id}`);
      navigate('/patient/list');
    } catch {
      message.error('error');
    }
    setLoadingForDelete(false);
  };

  const initialvalue =
    patientInfo.firstName == ''
      ? {}
      : {
          firstName: patientInfo.firstName,
          lastName: patientInfo.secondName,
          birthDate: stringToDate(patientInfo.birthDate),
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
    <Form
      layout="vertical"
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={initialvalue}
      scrollToFirstError
    >
      <CustomImageUploader photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />

      <PatientForm />

      <Button loading={loading} className="btn-ending btn-gap" type="primary" htmlType="submit">
        Save to Database
      </Button>
      <Button loading={loadingForDelete} className="btn-ending btn-gap" onClick={handleDelete}>
        Delete
      </Button>
    </Form>
  );
};

export default ManagerPatientEditForm;
