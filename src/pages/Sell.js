import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Upload, Breadcrumb, Layout, Menu, theme, message, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import pica from 'pica';
import './Sell.css';
//const apiUrl = 'http://8.141.94.202:28000';
const apiUrl='http://localhost:28000';
const { Header, Content, Footer } = Layout;

const Sell = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [modalVisible, setModalVisible] = useState(false); 
  const [formData, setFormData] = useState(new FormData());
  const pica = require('pica')();
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleImageUpload = async (file) => {
    const reader = new FileReader();

    // 使用FileReader对象读取图片文件
    reader.readAsDataURL(file);

    reader.onload = async (event) => {
      // 创建一个新的Image对象
      const img = new Image();
      img.src = event.target.result;

      img.onload = async () => {
        // 创建一个Canvas对象
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置Canvas的尺寸
        canvas.width = img.width;
        canvas.height = img.height;

        // 将图片绘制到Canvas上
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // 将Canvas上的图片数据进行压缩处理
        canvas.toBlob((blob) => {
          // 创建一个新的File对象，替换原始文件
          const compressedFile = new File([blob], file.name, {
            type: blob.type,
            lastModified: Date.now(),
          });

          // 更新FormData对象中的图片信息
          const updatedFormData = new FormData();
          updatedFormData.append('image', compressedFile);
          setFormData(updatedFormData);
        }, 'image/jpeg', 0.7); // 设置压缩质量为0.7
      };
    };

    reader.onerror = () => {
      message.error('读取文件失败');
    };
  };

  const beforeUpload = (file) => {
    // 在这里处理文件上传前的压缩
    handleImageUpload(file);
    return false; // 阻止默认上传行为
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    const { bookName, author, price, description, image } = values;
    
    const formData = new FormData();
    formData.append('bookName', bookName);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image[0].originFileObj);
    
    axios.post(apiUrl+'/api/sell', formData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Success:', response.data);
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
    message.success('提交成功');
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('提交失败，请检查表单信息');
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
                action=""
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