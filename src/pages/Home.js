import React, { useState, useEffect } from 'react';
import { Button, Breadcrumb, Layout, Menu, theme,Form, Input, List, message, Spin,Row,Col,Card  } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'; // 导入用户图标
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

// 假设后端API提供获取随机书籍的接口
const getRandomBooksApiUrl = 'http://localhost:28000/api/random';

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
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.post(getRandomBooksApiUrl);
      if (response.data && response.data.results) {
        const data = response.data.results;
        setRandomBooks(data);
        sessionStorage.setItem('randomBooks', JSON.stringify(data)); // 存储到localStorage
      } else {
        console.error('No books found in response');
      }
    } catch (error) {
      console.error('Error fetching random books:', error);
      message.error('Error fetching random books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedBooks = sessionStorage.getItem('randomBooks');
    if (cachedBooks) {
      const parsedBooks = JSON.parse(cachedBooks);
      setRandomBooks(parsedBooks); // 直接使用缓存的数据
    } else {
      fetchRandomBooks();
    }
  }, []);


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
          <div className="buy-books-container">
            <Spin spinning={loading}>
              {randomBooks.length > 0 ? (
                  <List
                  itemLayout="horizontal"
                  dataSource={randomBooks}
                  grid={{ gutter: 16, column: 2 }} // 使用grid属性设置列数和间隔
                  renderItem={(randomBooks) => (
                    <List.Item>
                      <a href="javascript:void(0)">
                        <Card style={{ width: '100%' }}> {/* 使用Card组件包裹书籍信息 */}
                          <Row gutter={16}>
                            <Col span={8}>
                              <img src={`data:image/jpeg;base64, ${randomBooks.image.data}`} alt={randomBooks.bookName} style={{ width: '100%', height: 'auto' }}/>
                            </Col>
                            <Col span={16}>
                              <div className="book-info" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* 添加样式控制纵向行宽 */}
                                <div className="book.bookName"><b>名称：</b>{randomBooks.bookName}</div>
                                <div className="book-author"><b>作者：</b>{randomBooks.author}</div>
                                <div className="book-price"><b>价格：</b>${randomBooks.price}</div>
                                <div className="book-description"><b>描述：</b>{randomBooks.description}</div>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </a>
                    </List.Item>
                  )}
                  />
              ) : (
                <p>没有推荐结果。</p>
              )}
            </Spin>
          </div>
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