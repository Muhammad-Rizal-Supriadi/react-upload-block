import React, { useState } from 'react';

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
      const ipfsHash = data[0].hash;
      setFileHash(ipfsHash);
    }
  };

  const handleDownload = () => {
    window.open(`http://localhost:8080/ipfs/${fileHash}`); //ubah sesuai alamat backend Anda
  };
  const redirectUploadData = () => {
    window.open('http://localhost:3000/myform'); //halaman untuk mengupload data suara
  }
 
  return (
    <div >
      <h3>Upload document Anda ( 2 Document )</h3>
      <form>
        <input type="file" onChange={handleFileUpload} multiple />
        <button>Upload</button>
      </form>

      <p>Hash: {fileHash}</p>

      <input id="filehash" type="text" value={fileHash} onChange={(event) => setFileHash(event.target.value)} />
      
      <button onClick={handleDownload}>Download</button>
      
      <button onClick={redirectUploadData}>Lanjut</button>
    </div>
  );
};

export default IPFS;
