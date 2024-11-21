// Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      mail: mail,
      password: password
    }).then((response) => {
      console.log('Login successful');
      setError(false);
      setMsg("Login exitoso!");
      console.log(response.data)
      const access_token = response.data.access_token;
      localStorage.setItem('token', access_token);
      localStorage.setItem('userMail', mail);
      setToken(access_token);
      console.log("Se seteo el token: ", access_token);
      navigate('/loggedin');
    }).catch((error) => {
      console.error('An error occurred while trying to login:', error);
      setError(true);
    });
  };

  return (
    <div className="Login">
      <h1>Inicio de Sesión</h1> {/* Título agregado */}
      
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}

      <form onSubmit={handleSubmit}>
        <label>
          Correo:
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
        <input type="submit" value="Enviar" />
      </form>

      {/* Botón Volver */}
      <button className="button-link" onClick={() => navigate('/')}>Volver</button>
    </div>
  );
}

export default Login;
