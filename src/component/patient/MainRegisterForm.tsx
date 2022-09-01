import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { register } from '../../services/backendCallUser';

const dateFormat = 'YYYY-MM-DD';

const MainRegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (values: any) => {
    if (values.password === values.confirmPassword) {
      setLoading(false);

      const body = {
        name: values.userName,
        email: values.email,
        password: values.password,
        isAdmin: true,
      };
      try {
        const response = await register(body);
        message.success(`${response.message}`);
        navigate('/login');
      } catch (e) {
        message.success(`error registerting in`);
      }
      setLoading(false);
    } else {
      message.error("Both Password doesn't match");
    }
  };

  const goToLoginPage = () => {
    navigate('/login');
  };
  return (
    <div className="loginform-container">
      <Form name="register" layout="vertical" onFinish={handleRegister} initialValues={{}} scrollToFirstError>
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
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please input your confirm password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Button className="btn-gap" type="primary" htmlType="submit">
          Register
        </Button>
        <Button className="btn-gap" onClick={goToLoginPage}>
          Already has Account
        </Button>
      </Form>
    </div>
  );
};

export default MainRegisterForm;
