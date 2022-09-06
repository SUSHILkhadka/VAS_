import { useNavigate } from 'react-router-dom';
import { Button, Form, Select, message } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate } from '../../utils/common';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/stores/store';
import { DateRange, Vaccine } from '../../redux_toolkit/slices/vaccineSlice';
import update, { deleteBackend } from '../../services/backendCallVaccine';
import VaccineForm from './VaccineForm';
const { Option } = Select;

export const VaccineEditForm: React.FC = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingForDelete, setLoadingForDelete] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    const dateRange: DateRange = {
      startDate: dateToString(values.date[0]),
      endDate: dateToString(values.date[1]),
    };
    const data: Vaccine = {
      serviceName: values.service,
      siteLocation: values.siteLocation,
      date: dateRange,
      doseType: values.doseType,
      gender: values.gender,
      age: values.age,
      ethinicity: values.ethinicity,
    };
    const body = {
      serviceName: values.serviceName,
      siteLocation: values.siteLocation,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      doseType: values.doseType,
      gender: values.gender,
      age: values.age,
      ethinicity: values.ethinicity,
    };

    try {
      const vaccine = await update(body, vaccineInfo.id);
      message.success(`Edit successful. Id is ${vaccineInfo.id}`);
      navigate('/vaccine/list');
    } catch {
      message.error(`error editing`);
    }
    setLoading(true);
  };
  const onFinishFailed = (_values: any) => {
    console.log('fill all values');
  };

  const handleDelete = async () => {
    setLoadingForDelete(true);
    try {
      const vaccine = await deleteBackend(vaccineInfo.id);
      message.success(`Delete successful. Id is ${vaccineInfo.id}`);
      navigate('/vaccine/list');
    } catch {
      message.error(`error deleting`);
    }
    setLoadingForDelete(false);
  };
  const initialValue =
    vaccineInfo.serviceName == ''
      ? {}
      : {
          serviceName: vaccineInfo.serviceName,
          siteLocation: vaccineInfo.siteLocation,
          date: [stringToDate(vaccineInfo.date.startDate), stringToDate(vaccineInfo.date.endDate)],
          doseType: vaccineInfo.doseType,
          gender: vaccineInfo.gender,
          age: vaccineInfo.age,
          ethinicity: vaccineInfo.ethinicity,
        };

  const [form] = Form.useForm();
  return (
    <Form
      name="basic"
      layout="vertical"
      form={form}
      initialValues={initialValue}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <VaccineForm />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button loading={loading} className="btn-gap" type="primary" htmlType="submit">
          Save Changes to database
        </Button>
        <Button loading={loadingForDelete} className="btn-gap" type="primary" onClick={handleDelete}>
          Delete from Database
        </Button>
      </div>
    </Form>
  );
};
