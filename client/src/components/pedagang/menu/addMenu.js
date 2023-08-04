import React, { useState } from 'react';
import Navbar from '../../layout/navbar';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaMakanan: '',
    harga: '',
    image: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));

    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaMakanan) {
      setError('Nama makanan harus diisi');
      return;
    }

    if (!formData.harga) {
      setError('Kolom harga tidak boleh kosong');
      return;
    }

    if (isNaN(formData.harga)) {
      setError('Harga harus berupa angka');
      return;
    }

    if (!formData.image) {
      setError('Gambar harus diisi');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('namaMakanan', formData.namaMakanan);
    formDataToSend.append('harga', formData.harga);
    formDataToSend.append('image', formData.image);

    axiosInstance
      .post('/menu', formDataToSend)
      .then((response) => {
        console.log(response.data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>Tambah Menu</h1>
      <div style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px', display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', backgroundColor: '#f2f2f2' }} className="border p-4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama Makanan</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Makanan" name="namaMakanan" onChange={handleChange} value={formData.namaMakanan} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Harga</Form.Label>
            <Form.Control type="text" placeholder="Harga Makanan" name="harga" onChange={handleChange} value={formData.harga} />
            {error && (
              <Alert variant="danger" style={{ margin: '5px' }}>
                {error}
              </Alert>
            )}
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Gambar</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddMenu;
