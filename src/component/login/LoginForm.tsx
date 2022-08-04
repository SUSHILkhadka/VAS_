import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import { setLogStatus, setName } from '../../services/getLocalData';
import { useSelector, useDispatch } from 'react-redux';
import { makeLoggedIn, changeName } from '../../redux_toolkit/slices/authSlice';

const LoginForm: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    if (values.username == 'vyaguta@vyaguta.com' && values.password == 'vyaguta') {
      //redux toolkit
      dispatch(makeLoggedIn());
      dispatch(changeName(values.username));

      setLogStatus(true);
      setName(values.username);
      navigate('/homepage', { replace: true });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return auth?.login == false ? (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <HomePage />
  );
};

export default LoginForm;
