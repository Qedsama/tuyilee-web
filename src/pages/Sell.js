import React, { useState } from 'react';
import { Form, Input, Button, Upload, Breadcrumb, Layout, Menu, theme, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'; // 导入用户图标
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import './Sell.css';

const { Header, Content, Footer } = Layout;

const Sell = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [modalVisible, setModalVisible] = useState(false); 
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // 在这里可以处理表单提交逻辑，比如向后端发送数据等
    message.success('提交成功');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('提交失败，请检查表单信息');
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片');
    }
    return isJpgOrPng;
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
          <Menu.Item key="1">
            <Link to="/">主页</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/buy">我要买书</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/sell">我要卖书</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/profile">个人中心</Link>
          </Menu.Item>
        </Menu>
        <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
          <Button type="primary" icon={<UserOutlined />} onClick={handleLoginClick}>
            登录
          </Button>
          <Button type="primary" icon={<UserOutlined />} onClick={handleSignupClick}>
            注册
          </Button>
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>我要卖书</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            padding: 24,
            minHeight: 280,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {isLoggedIn ? (
            <Form
            name="sellBookForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="书名"
              name="bookName"
              rules={[{ required: true, message: '请输入书名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="作者"
              name="author"
              rules={[{ required: true, message: '请输入作者名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="价格"
              name="price"
              rules={[{ required: true, message: '请输入价格' }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="描述"
              name="description"
              rules={[{ required: true, message: '请输入书籍描述' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="上传图片"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true, message: '请上传书籍封面' }]}
            >
              <Upload
                beforeUpload={beforeUpload}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
          ) : (
            <div>你需要登录才能进行卖书操作，请登录或注册一个新账号。</div>
          )}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
      </Footer>
    </Layout>
  );
};

export default Sell;
