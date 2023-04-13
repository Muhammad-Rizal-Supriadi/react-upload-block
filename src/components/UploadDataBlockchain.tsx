import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Card, Select } from 'antd';
import axios from 'axios';

const onFinish = (values: object) => {
  console.log('Form submitted:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
};
const MyForm: React.FC = () => {

  const [data, setData] = useState({
    ID: '',
    DataHash1: '',
    DataHash2: '',
    JmlSuratDiterima: 0,
    JmlSuratDikembalikan: 0,
    JmlSuratTidakDigunakan: 0,
    JmlSuratDigunakan: 0,
    JmlSuaraSahCalonA: 0,
    JmlSuaraSahCalonB: 0,
    JmlSuaraSahSeluruhCalon: 0,
    JmlSuaraTidakSah: 0,
    JmlSuaraSahTidakSah: 0,
  })

  const [channelName, setChannelName] = useState('');

  const token  = localStorage.getItem('token'); // ini script yang digunakan untuk mengambil token

  const handleSubmit = (e: any) => {
    e.preventDefault()

    axios.post(`http://localhost:4000/channels/${channelName}/chaincodes/voting-kecamatan`,{
      fcn: 'createData',
      args: [
        JSON.stringify({
          ID: data.ID,
          DataHash1: data.DataHash1,
          DataHash2: data.DataHash2,
          JmlSuratDiterima: data.JmlSuratDiterima,
          JmlSuratDikembalikan: data.JmlSuratDikembalikan,
          JmlSuratTidakDigunakan: data.JmlSuratTidakDigunakan,
          JmlSuratDigunakan: data.JmlSuratDigunakan,
          JmlSuaraSahCalonA: data.JmlSuaraSahCalonA,
          JmlSuaraSahCalonB: data.JmlSuaraSahCalonB,
          JmlSuaraSahSeluruhCalon: data.JmlSuaraSahSeluruhCalon,
          JmlSuaraTidakSah: data.JmlSuaraTidakSah,
          JmlSuaraSahTidakSah: data.JmlSuaraSahTidakSah
        })
      ]
      }, {
        headers: {
          'Authorization' :  `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Data suara berhasil disimpan:', response.data);   
      })
      .catch(error => {
        console.log('Terjadi kesalahan saat menyimpan data:', error);
      });
  };

  const handleChange = (value: string) => {
    setChannelName(value);
  };

  const handleSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Card title="Input Data Suara" bordered={true} style={{ width: 500 }}>
    <Form
      labelCol={{ span: 15 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Channel Name">
      <Select
        showSearch
        id="channel-dropdown"
        style={{ width: 300 }}
        placeholder="Select a Channel"
        optionFilterProp="children"
        onChange={handleChange}
        onSearch={handleSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: 'aceh',
            label: 'Aceh',
          },
          {
            value: 'kabupaten-aceh-barat',
            label: 'Kabupaten Aceh Barat',
          },
          {
            value: 'kabupaten-aceh-barat-daya',
            label: 'Kabupaten Aceh Barat Daya',
          },
        ]}
      />
      </Form.Item>
      <Form.Item label="Kode TPS" name="ID">
        <Input value={data.ID} onChange={(e) => setData({...data, ID: e.target.value})}/>
      </Form.Item>
      <Form.Item label="Data Hash 1" name="DataHash1">
        <Input value={data.DataHash1} onChange={(e) => setData({...data, DataHash1: e.target.value})}/>
      </Form.Item>
      <Form.Item label="Data Hash 2" name="DataHash2">
        <Input value={data.DataHash2} onChange={(e) => setData({...data, DataHash2: e.target.value})}/>
      </Form.Item>
      <Form.Item label="Jumlah Surat Diterima" name="JmlSuratDiterima" style={{ marginBottom: "1rem" }}>
        <InputNumber
          value={data.JmlSuratDiterima}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuratDiterima: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Surat Dikembalikan" name="JmlSuratDikembalikan" style={{ marginBottom: "1rem" }}>
        <InputNumber 
          value={data.JmlSuratDikembalikan}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuratDikembalikan: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Surat Tidak Digunakan" name="JmlSuratTidakDigunakan" style={{ marginBottom: "1rem" }}> 
        <InputNumber 
          value={data.JmlSuratTidakDigunakan}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuratTidakDigunakan: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Surat Digunakan" name="JmlSuratDigunakan" style={{ marginBottom: "1rem" }}>
        <InputNumber 
          value={data.JmlSuratDigunakan}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuratDigunakan: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Suara Sah Calon A" name="JmlSuaraSahCalonA" style={{ marginBottom: "1rem" }}>
        <InputNumber 
          value={data.JmlSuaraSahCalonA}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuaraSahCalonA: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Suara Sah Calon B" name="JmlSuaraSahCalonB" style={{ marginBottom: "1rem" }}>
        <InputNumber 
          value={data.JmlSuaraSahCalonB}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuaraSahCalonB: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Suara Sah Seluruh Calon" name="JmlSuaraSahSeluruhCalon" style={{ marginBottom: "1rem" }}>
        <InputNumber 
          value={data.JmlSuaraSahSeluruhCalon}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuaraSahSeluruhCalon: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Suara Tidak Sah" name="JmlSuaraTidakSah" style={{ marginBottom: "1rem" }}>
        <InputNumber 
          value={data.JmlSuaraTidakSah}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuaraTidakSah: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item label="Jumlah Suara Sah dan Tidak Sah" name="JmlSuaraSahTidakSah" style={{ marginBottom: "1rem" }}>
        <InputNumber 
          value={data.JmlSuaraSahTidakSah}
          onChange={(value) =>
            setData({
              ...data,
              JmlSuaraSahTidakSah: parseInt(String(value || "0"), 10),
            })
          }
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 15, span: 14 }}>
      <Button type="primary" htmlType="submit" onClick={handleSubmit}>
         Submit
      </Button>
      </Form.Item>
    </Form>
    </Card>
    );
};

export default MyForm;