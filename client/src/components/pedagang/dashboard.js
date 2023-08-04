import React, { useEffect, useState } from 'react';
import Navbar from '../layout/navbar';
import { Button, Table } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/menu')
      .then((response) => {
        setMenuData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigateToEditMenu = (id) => {
    navigate(`/menu/edit/${id}`);
  };

  const handleDeleteMenu = (id) => {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus menu ini? Note: Menu tidak dapat dihapus jika sudah terdapat di dalam transaksi');
    if (isConfirmed) {
      axiosInstance
        .delete(`/menu/${id}`)
        .then((response) => {
          console.log('Menu deleted successfully');
          const updatedMenuData = menuData.filter((menu) => menu.id !== id);
          setMenuData(updatedMenuData);
        })
        .catch((error) => {
          console.error('Failed to delete menu', error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '90px' }}>Menu Makanan</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '0px' }}>
        <Table striped bordered hover style={{ maxWidth: '800px' }}>
          <thead>
            <tr>
              <th>id</th>
              <th>Nama Makanan</th>
              <th>Gambar</th>
              <th>Harga</th>
              <th style={{ width: '150px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.id}</td>
                <td>{menu.namaMakanan}</td>
                <td style={{ width: '120px' }}>
                  <a href={menu.gambar}>
                    <img src={menu.gambar} alt={menu.namaMakanan} style={{ width: '110px', height: '100px' }} />
                  </a>
                </td>
                <td>Rp. {menu.harga}</td>
                <td>
                  <Button style={{ margin: '5px' }} variant="warning" onClick={() => navigateToEditMenu(menu.id)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteMenu(menu.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <h6 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '200px' }}>
        Tambah
        <a style={{ marginLeft: '5px' }} href="/menu">
          Menu
        </a>
      </h6>
    </>
  );
};

export default Dashboard;
