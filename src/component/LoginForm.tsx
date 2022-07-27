import { Button, Checkbox, Form, Input } from "antd";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import HomePage from "./HomePage";
import { AuthContext } from "../AuthContex";

const FormPage: React.FC = () => {
  const auth=useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    if (
      values.username == "vyaguta@vyaguta.com" &&
      values.password == "vyaguta"
    ) {
      auth?.setDisplayName(values.username);
      auth?.setLoggedIn("logged in successfully");
      navigate("/homepage", { replace: true });
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return auth?.loggedIn=="please log in"?(
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
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

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  ):(<HomePage/>);
};

export default FormPage;
