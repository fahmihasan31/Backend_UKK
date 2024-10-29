import React from 'react';
import { Outlet } from 'react-router-dom';
import { ManagerSidebar } from '../sidebar/ManajerSidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <ManagerSidebar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;