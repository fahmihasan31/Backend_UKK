import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/LoginPage';

import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/dashboard/adminDashboard';
import Pengguna from './pages/admin/pengguna/pengguna';
import Menu from './pages/admin/menu/menu';
import Meja from './pages/admin/meja/meja';

import ManajerDashboard from './pages/manajer/ManajerDashboard';

import KasirLayout from './components/layout/KasirLayout';
import KasirDashboard from './pages/kasir/dashboard/kasirDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to /login by default */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        {/* Routes for admin */}
        <Route path="/dashboard/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pengguna" element={<Pengguna />} />
          <Route path="menu" element={<Menu />} />
          <Route path="meja" element={<Meja />} />
        </Route>

        {/* Routes for manager */}
        <Route path="/dashboard/manajer" element={<ManajerDashboard />} />

        {/* Routes for cashier */}
        <Route path="/dashboard/kasir" element={<KasirLayout />} />
        {/* <Route index element={<KasirDashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;