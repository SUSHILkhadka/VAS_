import { useNavigate } from 'react-router-dom';
import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate } from '../../utils/common';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/stores/store';
import { addVaccine, DateRange, Vaccine } from '../../redux_toolkit/slices/vaccineSlice';
import { create } from '../../services/backendCallVaccine';
import VaccineForm from './VaccineForm';

export const VaccineAddForm: React.FC = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
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
    dispatch(addVaccine(data));

    //write to database
    const body = JSON.stringify({
      serviceName: values.serviceName,
      siteLocation: values.siteLocation,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      doseType: values.doseType,
      gender: values.gender,
      age: values.age,
      ethinicity: values.ethinicity,
    });
    setLoading(true);
    try {
      const vaccine = await create(body);
      message.success(`Addition successful with Id is ${vaccine.data.id}`);
      navigate('/vaccine/list');
    } catch {
      message.error('error adding vaccine to database');
    }
    setLoading(false);
  };
  const onFinishFailed = (_values: any) => {
    console.log('fill all values');
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
      layout="vertical"
      name="basic"
      form={form}
      initialValues={initialValue}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <VaccineForm />

      <Button loading={loading} type="primary" htmlType="submit">
        Add to database
      </Button>
    </Form>
  );
};
