import React from 'react';
import { Outlet } from 'react-router-dom';

function MainContainer() {
  return (
    <div className="main-container">
      <Outlet />
    </div>
  );
}

export default MainContainer;
