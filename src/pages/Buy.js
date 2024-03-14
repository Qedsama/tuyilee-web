import React, { useState, useEffect } from 'react';
import { Button, Breadcrumb, Layout, Menu, theme,Form, Input, List, message, Spin,Row,Col,Card  } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'; // 导入用户图标
import { useNavigate } from 'react-router-dom';
import './Buy.css';
const { Header, Content, Footer } = Layout;
//const apiUrl = 'http://8.141.94.202:28000';
const apiUrl='http://localhost:28000';
const Buy = () => {
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
  const [searchValue, setSearchValue] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchValue) return;
    setLoading(true);
  
    const formData = new FormData();
    formData.append('searchTerm', searchValue);
  
    axios.post(`${apiUrl}/api/search`, formData)
    .then((response) => {
      if (response.data && response.data.results) {
        let booksWithImageUrls = response.data.results.map(book => {
          let blob = new Blob([book.image], { type: 'image/jpeg' });
          let imageUrl = URL.createObjectURL(blob);
          return {
            ...book,
            imageUrl: imageUrl,
          };
        });
        setBooks(booksWithImageUrls);
      } else {
        message.error('搜索结果为空');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      message.error('搜索失败，请重试');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleBuy = (bookId, bookInfo) => {
    setLoading(true);
    axios.post(`${apiUrl}/api/buy`, { bookId, bookInfo })
      .then((response) => {
        if (response.data && response.data.success) {
          message.success('购买成功');
        } else {
          message.error('购买失败');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error('购买失败，请重试');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch();
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
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
          <Breadcrumb.Item>我要买书</Breadcrumb.Item>
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
            <Form className="search-form" onFinish={handleSearch}>
              <Form.Item name="searchValue">
                <Input.Search
                  placeholder="输入书名或作者搜索"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  enterButton
                />
              </Form.Item>
            </Form>

            <Spin spinning={loading}>
              {books.length > 0 ? (
                  <List
                  itemLayout="horizontal"
                  dataSource={books}
                  grid={{ gutter: 16, column: 2 }} // 使用grid属性设置列数和间隔
                  renderItem={(book) => (
                    <List.Item>
                      <a href="javascript:void(0)">
                        <Card style={{ width: '100%' }}> {/* 使用Card组件包裹书籍信息 */}
                          <Row gutter={16}>
                            <Col span={8}>
                              <img src={`data:image/jpeg;base64, ${book.image.data}`} alt={book.bookName} style={{ width: '100%', height: 'auto' }}/>
                            </Col>
                            <Col span={16}>
                              <div className="book-info" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* 添加样式控制纵向行宽 */}
                                <div className="book.bookName"><b>名称：</b>{book.bookName}</div>
                                <div className="book-author"><b>作者：</b>{book.author}</div>
                                <div className="book-price"><b>价格：</b>${book.price}</div>
                                <div className="book-description"><b>描述：</b>{book.description}</div>
                                <Button type="primary" block className="full-width-btn" onClick={() => handleBuy(book.id, book)}>
                                  购买
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </a>
                    </List.Item>
                  )}
                  />
              ) : (
                <p>没有搜索结果。</p>
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

export default Buy;
