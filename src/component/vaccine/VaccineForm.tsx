import { Form, Input, Select, DatePicker, InputNumber, Radio } from 'antd';
import React from 'react';
import '../styles/Forms.css';

const { Option } = Select;
const { RangePicker } = DatePicker;
const VaccineForm: React.FC = () => {
  return (
    <div>
      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          label="Service Name"
          name="serviceName"
          rules={[{ required: true, message: 'Please input servicename!' }]}
        >
          <Input placeholder="Service Name" />
        </Form.Item>

        <Form.Item
          className="form-wholefield"
          label="Site Location"
          name="siteLocation"
          rules={[{ required: true, message: 'Please input site location!' }]}
        >
          <Input placeholder="siteLocation" />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input date range!' }]}>
          <RangePicker />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          label="DoseType"
          name="doseType"
          rules={[{ required: true, message: 'Please select dose type!' }]}
        >
          <Select
            className="form-datepicker"
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

        <Form.Item
          className="form-wholefield"
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Radio.Group className="form-datepicker">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="both">Both</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          label="Age greater for"
          name="age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <InputNumber className="form-datepicker" max={120} min={0} placeholder="Age" />
        </Form.Item>
        <Form.Item
          className="form-wholefield"
          label="Ethinicity"
          name="ethinicity"
          rules={[{ required: true, message: 'Please input your ethinicity!' }]}
        >
          <Input placeholder="Ethinicity" />
        </Form.Item>
      </div>
    </div>
  );
};

export default VaccineForm;
