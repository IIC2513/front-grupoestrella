// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Registro exitoso!');
    localStorage.setItem('isLoggedIn', 'true'); // Guardar el estado de "logueado"
    navigate('/'); // Redirigir a la página principal
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
