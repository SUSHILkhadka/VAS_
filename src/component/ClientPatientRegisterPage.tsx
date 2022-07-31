
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



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
} from "antd";
import React, { useState } from "react";
import { saveEmail, saveName } from "../redux_toolkit/counterSlice";

const { Option } = Select;


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

const ClientPatientRegisterPage: React.FC = () => {

  const registerInfo = useSelector((state: any) => state.register);
  const dispatch=useDispatch();
console.log(registerInfo);


  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    dispatch(saveName(values.firstName+" "+values.lastName))
    dispatch(saveEmail(values.email))


  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your First Name",
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
            required: true,
            message: "Please input your Last Name",
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
            required: true,
            message: "Please input your Last Name",
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
            required: true,
            message: "Please input your Ethnicity",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
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
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name={["address", "state"]}
            noStyle
            rules={[{ required: true, message: "Province is required" }]}
          >
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

          <Form.Item
            name={["address", "city"]}
            noStyle
            rules={[{ required: true, message: "Province is required" }]}
          >
            <Input style={{ width: "25%" }} placeholder="Input City" />
          </Form.Item>
          <Form.Item
            name={["address", "street"]}
            noStyle
            rules={[{ required: true, message: "Street is required" }]}
          >
            <Input style={{ width: "25%" }} placeholder="Input street" />
          </Form.Item>
        </Input.Group>
      </Form.Item>


      <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true, message: "Province is required" }]}
          >
            <Select placeholder="Select Payment Method">
              <Option value="province1">province 1</Option>
              <Option value="province2">province 2</Option>
            </Select>
          </Form.Item>

      <Form.Item
        name="insuraneProvider"
        label="Insurance Provider"
        rules={[
          {
            required: true,
            message: "Please input your Insurance Provider",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
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
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClientPatientRegisterPage;
