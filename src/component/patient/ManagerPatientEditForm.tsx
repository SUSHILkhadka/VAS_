import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, message, Select, Upload } from 'antd';
import React from 'react';
import { dateToString, stringToDate } from '../../utils/common';
import { RootState } from '../../redux_toolkit/stores/store';
import PatientForm from './PatientForm';
import update, { deleteBackend } from '../../services/backendCallPatient';
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

const ManagerPatientEditForm: React.FC = () => {
  const patientInfo = useSelector((state: RootState) => state.patient);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    let body = JSON.stringify({
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
    });

    try {
      const patient = await update(body, patientInfo.id);
      console.log(patient);
      message.success(`Edit successful. Id is ${patientInfo.id}`);
      navigate('/patient/list');
    } catch {
      message.error('error editing');
    }
  };

  const handleDelete = async () => {
    try {
      const patient = await deleteBackend(patientInfo.id);
      console.log(patient);
      message.success(`Delete successful. Id is ${patientInfo.id}`);
      navigate('/patient/list');
    } catch {
      message.error('error');
    }
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
          Save to Database
        </Button>
      </Form.Item>
      <Button onClick={handleDelete}>Delete</Button>
    </Form>
  );
};

export default ManagerPatientEditForm;
