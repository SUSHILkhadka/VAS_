import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  DatePicker,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { Address, RegisterInfo, register } from '../../redux_toolkit/slices/registerSlice';
import { dateToString, stringToDate } from '../../utils/common';
import { RootState } from '../../redux_toolkit/stores/store';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

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

const PatientRegisterForm: React.FC = () => {
  const registerInfo = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const address: Address = {
      state: `${values.address.state}`,
      city: `${values.address.city}`,
      street: `${values.address.street}`,
    };
    const info: RegisterInfo = {
      firstName: `${values.firstName}`,
      secondName: `${values.lastName}`,
      birthDate: dateToString(values.birthDate),
      ethnicity: `${values.ethnicity}`,
      gender: `${values.gender}`,
      email: `${values.email}`,
      address: address,
      paymentMethod: `${values.paymentMethod}`,
      insuranceProvider: `${values.insuranceProvider}`,
    };
    dispatch(register(info));
    navigate('/clientPatientRegisterConfirmation');
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const initialvalue =
    registerInfo.firstName == 'defaultfromslice'
      ? {}
      : {
          firstName: registerInfo.firstName,
          lastName: registerInfo.secondName,
          birthDate: stringToDate(registerInfo.birthDate),
          ethnicity: registerInfo.ethnicity,
          gender: registerInfo.gender,
          email: registerInfo.email,
          address: {
            state: registerInfo.address.state,
            city: registerInfo.address.city,
            street: registerInfo.address.street,
          },
          paymentMethod: registerInfo.paymentMethod,
          insuranceProvider: registerInfo.insuranceProvider,
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
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: false,
            message: 'Please input your First Name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: false,
            message: 'Please input your Last Name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="birthDate"
        label="Birth Date"
        rules={[
          {
            required: false,
            message: 'Please input your Last Name',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="ethnicity"
        label="Ethnicity"
        rules={[
          {
            required: false,
            message: 'Please input your Ethnicity',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="Gender" rules={[{ required: false, message: 'Please select gender!' }]}>
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: false,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item name={['address', 'state']} noStyle rules={[{ required: false, message: 'Province is required' }]}>
            <Select placeholder="Select State">
              <Option value="province1">province 1</Option>
              <Option value="province2">province 2</Option>
              <Option value="province3">province 3</Option>
              <Option value="province4">province 4</Option>
              <Option value="province5">province 5</Option>
              <Option value="province6">province 6</Option>
              <Option value="province7">province 7</Option>
            </Select>
          </Form.Item>

          <Form.Item name={['address', 'city']} noStyle rules={[{ required: false, message: 'Province is required' }]}>
            <Input style={{ width: '25%' }} placeholder="Input City" />
          </Form.Item>
          <Form.Item name={['address', 'street']} noStyle rules={[{ required: false, message: 'Street is required' }]}>
            <Input style={{ width: '25%' }} placeholder="Input street" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        name="paymentMethod"
        label="Payment Method"
        rules={[{ required: false, message: 'Province is required' }]}
      >
        <Select placeholder="Select Payment Method">
          <Option value="province1">Insurance Id</Option>
          <Option value="province2">Member Id</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="insuranceProvider"
        label="Insurance Provider"
        rules={[
          {
            required: false,
            message: 'Please input your Insurance Provider',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Upload" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatientRegisterForm;
