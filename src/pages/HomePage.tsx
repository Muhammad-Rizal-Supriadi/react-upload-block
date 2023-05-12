import React from 'react';
import Login from '../components/Login';

const HomePage: React.FC = () => {
  return (
    <div>
      <div style={{ width: '100%', maxWidth: 600, }}>
        <Login />
      </div>
    </div>
  );
};


export default HomePage;
