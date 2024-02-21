import React from 'react';
import { Button, Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'; // 导入用户图标
import { useNavigate } from 'react-router-dom';
import './Home.css';

const { Header, Content, Footer } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
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

export default Home;
