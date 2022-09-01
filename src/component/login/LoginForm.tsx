import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import { useSelector, useDispatch } from 'react-redux';
import { makeLoggedInWithInfo } from '../../redux_toolkit/slices/authSlice';
import { login } from '../../services/backendCallUser';
import { setLoginResponse } from '../../services/getLocalData';
import '../styles/LoginPage.css';
import '../styles/Button.css';
const LoginForm: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (values: any) => {
    setLoading(true);
    const body = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await login(body);
      message.success(response.message);
      dispatch(makeLoggedInWithInfo(response));
      setLoginResponse(response);
      navigate('/appointment/list');
    } catch (e: any) {
      message.error(e.response.data.message);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="loginform-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Button className="btn-login" loading={loading} type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
