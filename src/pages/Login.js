import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext'; 
import './Login.css';
const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:28000' : 'http://39.99.233.173:28000';
const Login = () => {
  const navigate = useNavigate(); // 将 useNavigate 放在组件的顶层
  const { loginAuth } = useAuth();
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

    // 发送POST请求
    axios
      .post(apiUrl+'/api/login', jsonData, config)
      .then((response) => {
        if (response.status === 200) {
          console.log('Success:', response.data);
          navigate('/login'); // 使用传递的 navigate 函数
          loginAuth();
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
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
