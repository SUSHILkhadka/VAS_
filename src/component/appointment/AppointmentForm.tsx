import React from 'react';
import './UserAppointmentForm.css';
import { DatePicker, Form, Input, Select, TimePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
export const AppointmentForm: React.FC = () => {
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // return true;
    return current && current < moment().endOf('day');
  };
  return (
    <div>
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
                if (current.date() % 2 == 0) {
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
    </div>
  );
};
