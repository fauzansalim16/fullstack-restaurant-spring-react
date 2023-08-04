import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from '../layout/navbar';
import axiosInstance from '../../api/axiosInstance';

const Pesanan = () => {
  const [pesananList, setPesananList] = useState([]);
  const [selesaiList, setSelesaiList] = useState([]);

  const handleSelesaiButtonClick = (pesananId) => {
    setSelesaiList([...selesaiList, pesananId]);
  };

  useEffect(() => {
    axiosInstance('/pesanan')
      .then((response) => {
        setPesananList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const todayDateString = today.toLocaleDateString();
    const dateDateString = date.toLocaleDateString();
    return dateDateString === todayDateString;
  };

  const getFormattedTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <Navbar />
      <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '90px', marginTop: '50px' }}>Pesanan Hari Ini</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Table striped bordered hover style={{ maxWidth: '850px' }}>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Id</th>
              <th>Nama Pemesan</th>
              <th>Id Menu - Menu Pesanan</th>
              <th>Total harga</th>
              <th>Alamat</th>
              <th>No Telepon</th>
              <th>Waktu</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pesananList
              .filter((pesanan) => isToday(pesanan.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((pesanan) => (
                <tr key={pesanan.id}>
                  <td>{pesanan.id}</td>
                  <td>{pesanan.user.nama}</td>
                  <td>
                    {pesanan.detailPesananList.map((detail) => (
                      <span key={detail.menu.id}>
                        {detail.menu.id} - {detail.menu.namaMakanan},{' '}
                      </span>
                    ))}
                  </td>
                  <td>Rp. {pesanan.totalHarga.toLocaleString()}</td>
                  <td>{pesanan.user.alamat}</td>
                  <td>{pesanan.user.noTelepon}</td>
                  <td>{getFormattedTime(pesanan.createdAt)}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleSelesaiButtonClick(pesanan.id)} disabled={selesaiList.includes(pesanan.id)}>
                      {selesaiList.includes(pesanan.id) ? 'Selesai' : 'Selesai?'}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Pesanan;
