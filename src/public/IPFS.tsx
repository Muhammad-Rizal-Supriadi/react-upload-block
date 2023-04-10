import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Upload,
  Button,
} from 'antd';

const IPFS: React.FC = () => {
  const [fileHash, setFileHash] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await fetch('http://localhost:3100/profile', { //ubah sesuai alamat backend Anda
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      setFileHash(data);
    }
  };

  const handleDownload = () => {
    window.open(`http://localhost:8080/ipfs/${fileHash}`); //ubah sesuai alamat backend Anda
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileUpload} />
        <button>Upload</button>
      </form>
      <input id="filehash" type="text" value={fileHash} onChange={(event) => setFileHash(event.target.value)} />
      
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default IPFS;