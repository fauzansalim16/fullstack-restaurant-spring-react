import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/navbar';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

const EditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaMakanan: '',
    harga: '',
    image: null,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`menu/${id}`)
      .then((response) => {
        setFormData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));

    if (name === 'image') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(formData.harga)) {
      setError('Harga harus berupa angka');
      return;
    }
    if (!formData.image) {
      setError('Please select an image');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('namaMakanan', formData.namaMakanan);
    formDataToSend.append('harga', formData.harga);
    formDataToSend.append('image', formData.image);

    axiosInstance
      .put(`menu/${id}`, formDataToSend)
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
      <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>Edit Menu</h1>
      <div style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px', display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', backgroundColor: '#f2f2f2' }} className="border p-4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama Makanan</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Makanan" name="namaMakanan" onChange={handleChange} value={formData.namaMakanan} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Harga</Form.Label>
            <Form.Control type="text" placeholder="Harga Makanan" name="harga" onChange={handleChange} value={formData.harga} />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
            {error && (
              <Alert variant="danger" style={{ margin: '5px' }}>
                {error}
              </Alert>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditMenu;
