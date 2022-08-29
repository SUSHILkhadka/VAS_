import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import { useSelector, useDispatch } from 'react-redux';
import { makeLoggedInWithInfo } from '../../redux_toolkit/slices/authSlice';
import { login } from '../../services/backendCallUser';
import { setLoginResponse } from '../../services/getLocalData';

const LoginForm: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading,setLoading]=useState<boolean>(false);
  const handleLogin = async (values: any) => {
    setLoading(true);
    const body = JSON.stringify({
      email: values.username,
      password: values.password,
    });

    try {
      const response = await login(body);
      if (!response.data) {
        message.error(`${response.message}`);
      } else {
        message.success(`${response.message}`);
        dispatch(makeLoggedInWithInfo(response));
        setLoginResponse(response);
      }
      message.success('logged in successfully')
    } catch {
      message.error(`error logging in`);
    }
    setLoading(false);

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return !auth?.login ? (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  ) : (
    <HomePage />
  );
};

export default LoginForm;
