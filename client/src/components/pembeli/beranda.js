import React, { useState, useEffect } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../layout/navbar';

const Beranda = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [pesanError, setPesanError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/menu')
      .then((response) => {
        setMenuData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    const token = localStorage.getItem('X-API-TOKEN');
    setIsLoggedIn(!!token);
  }, []);

  const handleTambahButtonClick = (menu) => {
    setSelectedMenus((prevSelectedMenus) => [...prevSelectedMenus, menu]);
  };

  const handleDeleteButtonClick = (menuId) => {
    setSelectedMenus((prevSelectedMenus) => prevSelectedMenus.filter((menu) => menu.id !== menuId));
  };

  const handleKonfirmasiPesanan = () => {
    if (selectedMenus.length === 0) {
      setPesanError('Anda belum memilih pesanan. Silakan pilih menu terlebih dahulu.');
      return;
    }

    const pesananRequests = selectedMenus.map((menu) => ({
      menuId: menu.id,
      namaMakanan: menu.namaMakanan,
      harga: menu.harga,
    }));

    axiosInstance
      .post('/pesanan', { pesananRequests })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    setSelectedMenus([]);
    setPesanError('');

    document.getElementById('totalHarga').innerText = 'Rp. 0';
  };

  return (
    <>
      <Navbar />
      <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '90px' }}>Menu Makanan</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridGap: '20px',
          margin: '20px',
        }}
      >
        {menuData.map((menu) => (
          <Card
            key={menu.id}
            style={{
              margin: 'auto',
              width: '300px',
              height: '400px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
            }}
          >
            <Card.Img
              variant="top"
              src={menu.gambar}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '250px',
              }}
            />
            <Card.Body>
              <Card.Title>{menu.namaMakanan}</Card.Title>
              <Card.Text>{menu.deskripsi}</Card.Text>
              <Card.Text>Rp.{menu.harga}</Card.Text>
              <Button variant="primary" onClick={() => handleTambahButtonClick(menu)}>
                Tambah
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {isLoggedIn && (
        <>
          <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '90px', marginTop: '100px' }}>Pesanan</h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '200px' }}>
            <Table striped bordered hover style={{ maxWidth: '800px' }}>
              <thead>
                <tr>
                  <th>Nama Makanan</th>
                  <th>Harga</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedMenus.map((menu) => (
                  <tr key={menu.id}>
                    <td>{menu.namaMakanan}</td>
                    <td>Rp.{menu.harga}</td>
                    <td style={{ width: '100px' }}>
                      <Button variant="danger" onClick={() => handleDeleteButtonClick(menu.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ fontWeight: 'bold' }}>
                    Total
                  </td>
                  <td id="totalHarga">Rp.{selectedMenus.reduce((total, menu) => total + menu.harga, 0)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    <Button type="button" className="btn btn-primary" onClick={handleKonfirmasiPesanan} style={{ marginBottom: '10px' }}>
                      konfirmasi pesanan
                    </Button>
                    <div style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>{pesanError}</div>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </>
      )}
    </>
  );
};

export default Beranda;
