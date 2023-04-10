import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Register: React.FC = () => {

  const [data, setData] = useState({
    username: '',
    orgName: '',
  })
  
  const navigate = useNavigate();
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
  
    axios.post('http://localhost:4000/users/login', data)
      .then(response => {
        console.log('Data berhasil disimpan:', response.data);
        const token = response.data.message.token;
        localStorage.setItem('token', token);
        navigate('/myform'); // redirect ke halaman MyForm
      })
      .catch(error => {
        console.log('Terjadi kesalahan saat menyimpan data:', error);
      });
  }
  
  
  
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })}/>
      </Form.Item>

      <Form.Item
        label="OrgName"
        name="orgName"
        rules={[{ required: true, message: 'Please input your OrgName!' }]}
      >
      <Input value={data.orgName} onChange={(e) => setData({ ...data, orgName: e.target.value })}/>
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
