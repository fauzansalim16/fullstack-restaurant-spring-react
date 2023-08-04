import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import axiosInstance, { removeAuthToken } from '../../api/axiosInstance';
const Navbar = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await axiosInstance.get('/users/current');
      const { role } = response.data.data;
      setUserRole(role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleLogout = () => {
    axiosInstance
      .delete('/logout')
      .then((response) => {
        console.log('Logout successful');
        removeAuthToken();
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <Nav style={{ display: 'flex', justifyContent: 'start', marginBottom: '40px', backgroundColor: 'white' }} activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      {userRole === 'pedagang' && (
        <>
          <Nav.Item>
            <Nav.Link href="/dashboard" eventKey="dashboard">
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/pesanan" eventKey="pesanan">
              Pesanan
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      {userRole !== null && (
        <Nav.Item>
          <Nav.Link href="#logout" eventKey="logout" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
