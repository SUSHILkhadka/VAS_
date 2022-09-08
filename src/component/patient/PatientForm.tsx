import { Form, Input, Select, DatePicker, Upload } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/stores/store';
import '../styles/Forms.css';
const { Option } = Select;
const PatientForm = () => {
  const authInfo = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your First Name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form-wholefield"
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input your Last Name',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          name="birthDate"
          label="Birth Date"
          rules={[
            {
              required: true,
              message: 'Please input your Last Name',
            },
          ]}
        >
          <DatePicker className="form-datepicker" />
        </Form.Item>

        <Form.Item
          className="form-wholefield"
          name="ethnicity"
          label="Ethnicity"
          rules={[
            {
              required: true,
              message: 'Please input your Ethnicity',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form-wholefield"
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          className="form-addressfield"
          label="State"
          name={['address', 'state']}
          rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select className="form-inputforaddress" placeholder="Select State">
            <Option value="province1">province 1</Option>
            <Option value="province2">province 2</Option>
            <Option value="province3">province 3</Option>
            <Option value="province4">province 4</Option>
            <Option value="province5">province 5</Option>
            <Option value="province6">province 6</Option>
            <Option value="province7">province 7</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="City"
          className="form-addressfield"
          name={['address', 'city']}
          rules={[{ required: true, message: 'Province is required' }]}
        >
          <Input className="form-inputforaddress" placeholder="Input City" />
        </Form.Item>
        <Form.Item
          label="Street"
          className="form-addressfield"
          name={['address', 'street']}
          rules={[{ required: true, message: 'Street is required' }]}
        >
          <Input className="form-inputforaddress" placeholder="Input street" />
        </Form.Item>
      </div>

      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select placeholder="Select Payment Method">
            <Option value="insuranceId">Insurance Id</Option>
            <Option value="MemberId">Member Id</Option>
          </Select>
        </Form.Item>

        <Form.Item className="form-wholefield" name="insuranceProvider" label="Insurance Provider">
          <Input />
        </Form.Item>
      </div>
    </div>
  );
};

export default PatientForm;
