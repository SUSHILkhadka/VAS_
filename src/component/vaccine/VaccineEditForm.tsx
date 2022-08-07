import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, message } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate } from '../../utils/common';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DoseDate, Appointment, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { addVaccine, DateRange, Vaccine } from '../../redux_toolkit/slices/vaccineSlice';
import update, { create, deleteBackend } from '../../services/backendCallVaccine';
import VaccineForm from './VaccineForm';
type SizeType = Parameters<typeof Form>[0]['size'];
const { RangePicker } = DatePicker;
const { Option } = Select;

export const VaccineEditForm: React.FC = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    console.log('vaccineinfo', vaccineInfo);
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
    console.log('data=', data);
    // dispatch(addVaccine(data));

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

    const appointment = await update(body, vaccineInfo.id);
    message.success(`Edit successful. Id is ${vaccineInfo.id}`);
    navigate('/vaccine/list');
  };
  const onFinishFailed = (values: any) => {
    console.log('fill all values');
  };

  const handleDelete = async () => {
    const vaccine = await deleteBackend(vaccineInfo.id);
    message.success(`Delete successful. Id is ${vaccineInfo.id}`);
    navigate('/vaccine/list');
  };
  console.log('vaccine from redux', vaccineInfo);
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
  //returns true by comparing current with day to be disabled.
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // return true;
    return current && current < moment().endOf('day');
  };
  const [form] = Form.useForm();
  return (
    <Form
      name="basic"
      form={form}
      initialValues={initialValue}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <VaccineForm />

      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Save Changes to database
        </Button>
      </Form.Item>
      <Button type="primary" onClick={handleDelete}>
        Delete from Database
      </Button>
    </Form>
  );
};
