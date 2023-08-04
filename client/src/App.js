import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/auth/register';
import MainContent from './home/home';
import LoginPage from './components/auth/login';
import Dashboard from './components/pedagang/dashboard';
import Pesanan from './components/pedagang/pesanan';
import AddMenu from './components/pedagang/menu/addMenu';
import EditMenu from './components/pedagang/menu/editMenu';
import Beranda from './components/pembeli/beranda';
import { getUserRole } from './api/axiosInstance';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const fetchUserRole = async () => {
    try {
      const role = await getUserRole();
      setUserRole(role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {userRole === 'pedagang' && (
          <>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/pesanan" element={<Pesanan />} />
            <Route exact path="/menu/edit/:id" element={<EditMenu />} />
            <Route exact path="/menu" element={<AddMenu />} />
          </>
        )}
        <Route exact path="/" element={<MainContent />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/beranda" element={<Beranda />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
