import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import MyForm from './components/UploadDataBlockchain';
import IPFS from './public/IPFS';
import Register from './components/Register';
import DataVoice from './components/DataVoice';

function App() {
  return (

    
    <div className='app' >
      <div style={{ width: 1800, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Blockchain Productzilla KPU</h1>
        <div style={{ width: '100%', maxWidth: 600, }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myform" element={<MyForm />} />
            <Route path="/document" element={<IPFS />} />
            <Route path="/datavoice" element={<DataVoice />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
