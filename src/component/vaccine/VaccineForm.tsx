import { Form, Input, Select, DatePicker, Typography, InputNumber, Checkbox, Row, Col, Radio } from 'antd';
import React from 'react';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;
const VaccineForm: React.FC = () => {
  return (
    <React.Fragment>
      <Form.Item></Form.Item>
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
    </React.Fragment>
  );
};

export default VaccineForm;
