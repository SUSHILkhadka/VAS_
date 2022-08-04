import { useNavigate } from 'react-router-dom';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate } from '../../utils/common';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DoseDate, Appointment, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { addVaccine, DateRange, Vaccine } from '../../redux_toolkit/slices/vaccineSlice';
type SizeType = Parameters<typeof Form>[0]['size'];
const { RangePicker } = DatePicker;
const { Option } = Select;

export const VaccineForm: React.FC = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log('dateRange=', values.date);
    const dateRange: DateRange = {
      startDate: dateToString(values.date[0]),
      endDate: dateToString(values.date[1]),
    };
    const data: Vaccine = {
      serviceName: values.serviceName,
      siteLocation: values.siteLocation,
      date: dateRange,
      doseType: values.doseType,
      gender: values.gender,
      age: values.age,
      ethinicity: values.ethinicity,
    };
    console.log('data=', data);
    dispatch(addVaccine(data));
  };
  const onFinishFailed = (values: any) => {
    console.log('fill all values');
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
      <Form.Item
        label="Service Name"
        name="serviceName"
        rules={[{ required: true, message: 'Please input servicename!' }]}
      >
        <Input placeholder="Service Name" />
      </Form.Item>

      <Form.Item
        label="Site Location"
        name="siteLocation"
        rules={[{ required: false, message: 'Please input site location!' }]}
      >
        <Input placeholder="siteLocation" />
      </Form.Item>

      <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input date range!' }]}>
        <RangePicker />
      </Form.Item>

      <Form.Item label="DoseType" name="doseType" rules={[{ required: false, message: 'Please select dose type!' }]}>
        <Select
          showSearch
          placeholder="Select Dose Type"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
        >
          <Option value="singleDose">Single Dose</Option>
          <Option value="multipleDose">Multiple Dose</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item name="secondDose" label="2nd Dose time">
          <Form.Item name={["secondDose_time"]}>
            <TimePicker minuteStep={30} secondStep={10} format="HH:mm" />
          </Form.Item>
      </Form.Item> */}

      <Form.Item label="Gender" name="gender" rules={[{ required: false, message: 'Please select your gender!' }]}>
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Both</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Age" name="age" rules={[{ required: false, message: 'Please input your age!' }]}>
        <InputNumber max={120} min={0} placeholder="Age" />
      </Form.Item>
      <Form.Item
        label="Ethinicity"
        name="ethinicity"
        rules={[{ required: false, message: 'Please input your ethinicity!' }]}
      >
        <Input placeholder="Ethinicity" />
      </Form.Item>

      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
