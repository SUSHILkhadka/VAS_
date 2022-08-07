import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  message,
  Select,
} from "antd";
import React, { useState } from "react";
import {
  Address,
  RegisterInfo,
} from "../../redux_toolkit/slices/registerSlice";
import { dateToString, stringToDate } from "../../utils/common";
import { RootState } from "../../redux_toolkit/stores/store";
import {register} from "../../services/backendCallUser"
const { Option } = Select;
const dateFormat = "YYYY-MM-DD";

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

const MainRegisterForm: React.FC = () => {
  const registerInfo = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish =async (values: any) => {

    const body=JSON.stringify({
        name: values.userName,
        email:values.email,
        password:values.password
    })
    const response=await register(body);
    console.log('response after register=',response)
    if(!response.data){
        message.error(`${response.message}`)
    }
    else{
    message.success(`${response.message}`)
    navigate("/loginpage");
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{}}
      scrollToFirstError
    >
      <Form.Item
        name="userName"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your Name",
          },
        ]}
      >
        <Input />
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

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MainRegisterForm;
