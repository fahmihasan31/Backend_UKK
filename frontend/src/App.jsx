import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/LoginPage';

import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/dashboard/adminDashboard';
import ProtectedRoute from './pages/utils/protectedRoute'; // Import ProtectedRoute
import Pengguna from './pages/admin/pengguna/pengguna';
import Menu from './pages/admin/menu/menu';
import Meja from './pages/admin/meja/meja';

import ManajerDashboard from './pages/manajer/ManajerDashboard';
import KasirDashboard from './pages/kasir/KasirDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        {/* ProtectedRoute for admin */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="pengguna" element={<Pengguna />} />
          <Route path="menu" element={<Menu />} />
          <Route path="meja" element={<Meja />} />
        </Route>

        {/* ProtectedRoute for manager */}
        <Route path="/dashboard/manajer" element={
          <ProtectedRoute allowedRoles={['manajer']}>
            <ManajerDashboard />
          </ProtectedRoute>
        } />

        {/* ProtectedRoute for cashier */}
        <Route path="/dashboard/kasir" element={
          <ProtectedRoute allowedRoles={['kasir']}>
            <KasirDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
