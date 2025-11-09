import React from 'react';
import { Outlet } from 'react-router-dom';

function MainContainer() {
  return (
    <div style={{ background: '#f8f8f8', minHeight: '100vh', padding: '2rem' }}>
      {/* Aquí se renderizan las páginas */}
      <Outlet />
    </div>
  );
}
export default MainContainer;
