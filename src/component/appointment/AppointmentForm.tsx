import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select, TimePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { RootState } from '../../redux_toolkit/stores/store';
import { useSelector } from 'react-redux';
import { read } from '../../services/backendCallVaccine';
import '../styles/Forms.css';

export const AppointmentForm: React.FC = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const [vacineArray, setVaccineArray] = useState<any>([]);
  useEffect(() => {
    async function getAllVaccine() {
      try {
        const response = await read();
        setVaccineArray(response.data);
      } catch {
        setVaccineArray([]);
      }
    }
    getAllVaccine();
  }, []);

  function getAllVaccines() {
    return (
      <Form.Item
        rules={[{ required: true, message: 'Service name is required' }]}
        className="form-wholefield"
        name="service"
        label="Service"
      >
        <Select>
          {vacineArray.map((element: any) => {
            return <Select.Option value={element.serviceName}>{element.serviceName}</Select.Option>;
          })}
        </Select>
      </Form.Item>
    );
  }

  return (
    <div>
      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          name="patientId"
          label="Patient ID"
          rules={[
            {
              required: true,
              message: 'Please input your Patient ID',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form-wholefield"
          name="siteLocation"
          label="Site location"
          rules={[{ required: true, message: 'Location is required' }]}
        >
          <Select>
            <Select.Option value="Kathmandu">Kathmandu</Select.Option>
            <Select.Option value="Lalitpur">Lalitpur</Select.Option>
            <Select.Option value="Bhaktapur">Bhaktapur</Select.Option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-row">{getAllVaccines()}</div>
      <div className="form-row">
        <Form.Item className="form-wholefield" name="firstDose" label="1st Dose">
          <Input.Group compact>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'First dose date is required',
                },
              ]}
              name={['firstDose_date']}
            >
              <DatePicker
                className="form-datepickerForDoses"
                dateRender={(current) => {
                  const style: React.CSSProperties = {};
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
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'First dose time is required',
                },
              ]}
              name={['firstDose_time']}
            >
              <TimePicker className="form-datepickerForDoses" minuteStep={30} secondStep={10} format="HH:mm" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item className="form-wholefield" name="secondDose" label="2nd Dose">
          <Input.Group compact>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Second dose date is required',
                },
              ]}
              name={['secondDose_date']}
            >
              <DatePicker
                className="form-datepickerForDoses"
                dateRender={(current) => {
                  const style: React.CSSProperties = {};
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
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Second dose time is required',
                },
              ]}
              name={['secondDose_time']}
            >
              <TimePicker className="form-datepickerForDoses" minuteStep={30} secondStep={10} format="HH:mm" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </div>
    </div>
  );
};
