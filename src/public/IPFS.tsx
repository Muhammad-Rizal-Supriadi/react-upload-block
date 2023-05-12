import React, { useState } from 'react';
import { Card, Row } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload, Input} from 'antd';

const props: UploadProps = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    console.log('Your upload file:', file);
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};

const IPFS: React.FC = () => {
  const [fileHash, setFileHash] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('avatar', files[i]);
      }
      const response = await fetch('http://localhost:3100/document', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      const ipfsHash = data.hashes[0]; // assuming only 1 file is uploaded
      setFileHash(ipfsHash);
      localStorage.setItem('ipfsHash', ipfsHash); // save hash to local storage
    }
  };
  

  const handleDownload = () => {
    window.open(`http://localhost:8080/ipfs/${fileHash}`); //ubah sesuai alamat backend Anda
  };
  const redirectUploadData = () => {
    window.open('http://localhost:3000/myform'); //halaman untuk mengupload data suara
  }
 
  return (
    <Card title="Upload Data Blockchain" bordered={true} style={{ width: 700 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Upload document Anda ( 2 Document )</h3>
      <form>
        <Row>
            <div>
              <Input type="file" onChange={handleFileUpload} multiple />
            </div>
            <Button style={{marginLeft:5}} icon={<UploadOutlined />}>Upload</Button>
        </Row>
      </form>

      <p>Hash: {fileHash}</p>

      <Input id="filehash" type="text" value={fileHash} onChange={(event) => setFileHash(event.target.value)} />
      <Row style={{marginTop: 30}}>
        <Upload {...props}>
          <Button onClick={handleDownload} icon={<DownloadOutlined />}>Check Images</Button>
        </Upload>
        

        <Upload {...props}>
          <Button style={{backgroundColor:'#0088ff', color:'white', marginLeft:3}} onClick={redirectUploadData}>Next</Button>
        </Upload>
      </Row>
    </div>
    </Card>
  );
};

export default IPFS;
