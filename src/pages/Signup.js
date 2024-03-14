import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

//const apiUrl = 'http://8.141.94.202:28000';
const apiUrl='http://localhost:28000';

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;

    const data = {
      username,
      password,
    };

    const jsonData = JSON.stringify(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.post(apiUrl + '/api/signup', jsonData, config)
      .then((response) => {
        if (response.status === 200) {
          console.log('Success:', response.data);
          navigate('/signup');
        } else {
          console.log('Failed:', response.data);
          notification.error({
            message: 'Error',
            description: response.data.errorMessage,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        notification.error({
          message: 'Error',
          description: 'An error occurred while making the request.',
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="centered-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
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
    </div>
  );
};

export default Signup;
