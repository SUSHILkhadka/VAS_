import { useNavigate } from 'react-router-dom';
import './UserAppointmentForm.css';
import { Button, DatePicker, Form, Input, Select, TimePicker, message } from 'antd';
import React, { useState } from 'react';
import { dateToString, stringToDate, stringToTime, timeToString } from '../../utils/common';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DoseDate, Appointment, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { RootState } from '../../redux_toolkit/stores/store';
import { URL_TO_BACKEND } from '../../constants/common';
import update, { deleteBackend } from '../../services/backendCallAppointment';
type SizeType = Parameters<typeof Form>[0]['size'];

export const ManagerAppointmentEditForm: React.FC = () => {
  const [componentSize] = useState<SizeType | 'default'>('default');

  const authInfo = useSelector((state: RootState) => state.auth);
  const appointmentInfo = useSelector((state: RootState) => state.appointment);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const firstDose: DoseDate = {
      date: dateToString(values.firstDose_date),
      time: timeToString(values.firstDose_time),
    };
    const secondDose: DoseDate = {
      date: dateToString(values.secondDose_date),
      time: timeToString(values.secondDose_time),
    };

    let body = JSON.stringify({
      email: values.email,
      siteLocation: values.siteLocation,
      serviceName: values.service,
      firstDoseDate: firstDose.date,
      firstDoseTime: firstDose.time,
    });

    const appointment = await update(body, appointmentInfo.id);
    message.success(`Edit successful. Id is ${appointmentInfo.id}`);
    navigate('/appointment/list');
  };

  const handleDelete = async () => {
    const appointment = await deleteBackend(appointmentInfo.id);
    message.success(`Delete successful. Id is ${appointmentInfo.id}`);
    navigate('/appointment/list');
  };

  const initialValue =
    appointmentInfo.siteLocation == ''
      ? { id: authInfo.username }
      : {
          id: appointmentInfo.id,
          email: appointmentInfo.email,
          siteLocation: appointmentInfo.siteLocation,
          service: appointmentInfo.service,
          firstDose_date: stringToDate(appointmentInfo.firstDose.date),
          firstDose_time: stringToTime(appointmentInfo.firstDose.time),
          secondDose_date: stringToDate(appointmentInfo.secondDose.date),
          secondDose_time: stringToTime(appointmentInfo.secondDose.time),
        };

  //returns true by comparing current with day to be disabled.
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // return true;
    return current && current < moment().endOf('day');
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      layout="horizontal"
      size={componentSize as SizeType}
      initialValues={initialValue}
    >
      <Form.Item name="id" label="ID">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="EMAIL">
        <Input />
      </Form.Item>

      <Form.Item name="siteLocation" label="Site location">
        <Select>
          <Select.Option value="Kathmandu">Kathmandu</Select.Option>
          <Select.Option value="Lalitpur">Lalitpur</Select.Option>
          <Select.Option value="Bhaktapur">Bhaktapur</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="service" label="Service">
        <Select>
          <Select.Option value="first_vaccine">first vaccine</Select.Option>
          <Select.Option value="second_vaccine">second vaccine</Select.Option>
          <Select.Option value="third_vaccine">third vaccine</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="firstDose" label="1st Dose">
        <Input.Group compact>
          <Form.Item name={['firstDose_date']}>
            <DatePicker
              disabledDate={disabledDate}
              dateRender={(current) => {
                const style: React.CSSProperties = {};
                //if dateToString(current) equal any of allowed date from "list of allowed date", then
                if (current.date() % 4 == 0) {
                  style.border = '1px solid blue';
                  style.borderRadius = '50%';
                }
                return (
                  <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                  </div>
                );
              }}
            />
          </Form.Item>
          <Form.Item name={['firstDose_time']}>
            <TimePicker minuteStep={30} secondStep={10} format="HH:mm" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      {/* <Form.Item label="secondDose">
        <DatePicker
          disabledDate={disabledDate}
          dateRender={(current) => {
            const style: React.CSSProperties = {};
            console.log("current date=", current);

            //if dateToString(current) equal any of allowed date from "list of allowed date", then
            if (current.date() % 2 == 0) {
              style.border = "1px solid blue";
              style.borderRadius = "50%";
            }
            return (
              <div className="ant-picker-cell-inner" style={style}>
                {current.date()}
              </div>
            );
          }}
        />
        <TimePicker use12Hours minuteStep={15} secondStep={10} />
      </Form.Item> */}

      <Form.Item name="secondDose" label="1st Dose">
        <Input.Group compact>
          <Form.Item name={['secondDose_date']}>
            <DatePicker
              disabledDate={disabledDate}
              dateRender={(current) => {
                const style: React.CSSProperties = {};
                //if dateToString(current) equal any of allowed date from "list of allowed date", then
                if (current.date() % 4 == 0) {
                  style.border = '1px solid blue';
                  style.borderRadius = '50%';
                }
                return (
                  <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                  </div>
                );
              }}
            />
          </Form.Item>
          <Form.Item name={['secondDose_time']}>
            <TimePicker minuteStep={30} secondStep={10} format="HH:mm" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

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
