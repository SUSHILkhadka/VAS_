import { Button, Checkbox, Form, Input } from "antd";
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import HomePage from "./HomePage";
import { AuthContext } from "../AuthContex";
import {
  getLogStatus,
  getName,
  setLogStatus,
  setName,
} from "../services/getLocalData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  makeLoggedIn,
  makeLoggedOut,
  changeName,
} from "../redux_toolkit/counterSlice";

const FormPage: React.FC = () => {
  // const auth=useContext(AuthContext);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginStatus = getLogStatus();
  useEffect(() => {
    if (loginStatus == "true") {
      // auth?.setLoggedIn("true");
      // auth?.setDisplayName(getName());

      //default redux
      // dispatch(makeLoggedIn_function_as_action(getName()))

      //redux toolkit
      dispatch(makeLoggedIn());
      dispatch(changeName(getName()));
      navigate("/homepage", { replace: true });
    }
  }, [navigate]);

  const onFinish = (values: any) => {
    if (
      values.username == "vyaguta@vyaguta.com" &&
      values.password == "vyaguta"
    ) {
      // auth?.setDisplayName(values.username);
      // auth?.setLoggedIn("true");

      //redux default
      // dispatch(makeLoggedIn_function_as_action(values.username))
      // dispatch(changename_function_as_action(values.username))

      //redux toolkit
      dispatch(makeLoggedIn());
      dispatch(changeName(values.username));

      setLogStatus("true");
      setName(values.username);
      navigate("/homepage", { replace: true });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  };

  return auth?.login == "false" ? (
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
  ) : (
    <HomePage />
  );
};

export default FormPage;
