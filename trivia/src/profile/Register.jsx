// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        name: name,
        mail: mail,
        password: password
      }).then((response) => {
        setError(false);
        setMsg('Registro exitoso! Ahora puedes volver y loguearte');
        navigate('/'); 
      }).catch((error) => {      
        setError(true);
      });
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      {error && <div className="error">Hubo un error con el Registro, por favor intenta nuevamente.</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input 
            type="text" 
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Correo Electrónico:
          <input 
            type="email"
            name="mail"
            value={mail}
            onChange={e => setMail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Registrarse" />
      </form>
      {/* Botón "Volver" */}
      <button onClick={() => navigate('/')} className="button-link back-button">Volver</button>
    </div>
  );
}

export default Register;
