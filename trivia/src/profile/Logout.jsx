import React, { useContext, useState } from 'react';
import './Login.css';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // Inicializar navigate

  const handleLogout = () => {
    logout();
    setMsg("Has hecho logout con éxito!");
    navigate('/'); // Redirigir a la página principal
  };

  return (
    <>
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </>
  );
};

export default LogoutButton;
