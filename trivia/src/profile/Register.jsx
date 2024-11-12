import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Register() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // Inicializar navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        name: name,
        mail: mail,
        password: password
      }).then((response) => {
        console.log('Registro exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg('Registro exitoso! Ahora puedes volver y loguearte');
        navigate('/'); 
      }).catch((error) => {      
        console.error('Ocurrió un error:', error);
        setError(true); // Aquí puede haber más lógica para tratar los errores
      });
  };

  return (
    <div className="Register"> {/* Cambiado de Login a Register */}
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}

      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input 
            type="text" 
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label>
          mail:
          <input 
            type="email"  // Cambiado de "mail" a "email" para mayor claridad
            name="mail"
            value={mail}
            onChange={e => setMail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Register;
