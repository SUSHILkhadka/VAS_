import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { register } from '../../services/backendCallUser';
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

const MainRegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [loading,setLoading]=useState<boolean>(false);
  

  const handleRegister = async (values: any) => {
    setLoading(false);

    const body ={
      name: values.userName,
      email: values.email,
      password: values.password,
    }
    try{
    const response = await register(body);
    console.log('response after register=', response);
    if (!response.data) {
      message.error(`${response.message}`);
    } else {
      message.success(`${response.message}`);
      navigate('/loginpage');
    }
  }catch(e){
    message.success(`error registerting in`);
  }
    setLoading(false);
  };

  return (
    <Form {...formItemLayout} name="register" onFinish={handleRegister} initialValues={{}} scrollToFirstError>
      <Form.Item
        name="userName"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your Name',
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

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
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
