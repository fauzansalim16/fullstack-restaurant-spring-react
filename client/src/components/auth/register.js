import React, { useState } from 'react';
import Axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    noTelepon: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    nama: '',
    alamat: '',
    noTelepon: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newFormErrors = {};

    if (!formData.nama) {
      newFormErrors.nama = 'Nama harus diisi';
      isValid = false;
    }

    if (!formData.alamat) {
      newFormErrors.alamat = 'Alamat harus diisi';
      isValid = false;
    }

    if (!formData.noTelepon) {
      newFormErrors.noTelepon = 'Nomor telepon harus diisi';
      isValid = false;
    }

    if (!formData.email) {
      newFormErrors.email = 'Email harus diisi';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newFormErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newFormErrors.password = 'Password harus diisi';
      isValid = false;
    } else if (formData.password.length < 6) {
      newFormErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(newFormErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Axios.post('http://localhost:8080/registrasi', formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <style>
        {`
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #080710;
  }
  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
  form {
    margin-top: 100px;
    height: 850px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }
  form * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder {
    color: #e5e5e5;
  }
  button {
    margin-top: 40px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  .social {
    margin-top: 30px;
    display: flex;
  }
  .social div {
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255, 255, 255, 0.27);
    color: #eaf0fb;
    text-align: center;
  }
  .social div:hover {
    background-color: rgba(255, 255, 255, 0.47);
  }
  .social .fb {
    margin-left: 25px;
  }
  .social i {
    margin-right: 4px;
  }
`}
      </style>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form action="#" method="post" onSubmit={handleSubmit}>
        <h3>Register</h3>

        <label htmlFor="name">Name</label>
        <input type="text" placeholder="Name" id="name" name="nama" onChange={handleChange} />
        {formErrors.nama && <p>{formErrors.nama}</p>}

        <label htmlFor="alamat">Alamat</label>
        <input type="text" placeholder="Alamat" id="alamat" name="alamat" onChange={handleChange} />
        {formErrors.alamat && <p>{formErrors.alamat}</p>}

        <label htmlFor="telepon">No Telp</label>
        <input type="text" placeholder="No Telp" id="telepon" name="noTelepon" onChange={handleChange} />
        {formErrors.noTelepon && <p>{formErrors.noTelepon}</p>}

        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email" id="email" name="email" onChange={handleChange} />
        {formErrors.email && <p>{formErrors.email}</p>}

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" onChange={handleChange} />
        {formErrors.password && <p>{formErrors.password}</p>}

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
