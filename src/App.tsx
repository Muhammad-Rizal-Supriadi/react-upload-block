import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import MyForm from './components/UploadDataBlockchain';
import IPFS from './public/IPFS';

function App() {
  return (
    <div className='app'>
      <h1>Blockchain Send Data</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myform" element={<MyForm />} />
        <Route path="/document" element={<IPFS />} />
      </Routes>
    </div>
  );
}

export default App;
