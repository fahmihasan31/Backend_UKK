import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/LoginPage'

import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/adminDashboard'
import Pengguna from './pages/admin/pengguna'
import Menu from './pages/admin/menu'
import Meja from './pages/admin/meja'

import ManajerDashboard from './pages/manajer/ManajerDashboard';
import KasirDashboard from './pages/kasir/KasirDashboard';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />

          <Route path="/dashboard/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pengguna" element={<Pengguna />} />
            <Route path="menu" element={<Menu />} />
            <Route path="meja" element={<Meja />} />
          </Route>


          <Route path="/dashboard/manajer" element={<ManajerDashboard />} />
          <Route path="/dashboard/kasir" element={<KasirDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;