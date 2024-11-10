// App.jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <a href='/instructions'> Ir a Instrucciones</a>
      <a href='/about'> Acerca de</a>
      {!isLoggedIn ? (
        <div className="landing-page">
          <h1>Bienvenidos a Trivia Board Challenge</h1>
          <p>¡Responde preguntas y avanza en el tablero para ganar!</p>

          <div className="buttons">
            <button onClick={handleLogin}>Inicia sesión</button>
            <a href="/register" className="button-link">Registrarse</a> {/* Enlace a la página de registro */}
          </div>
        </div>
      ) : (
        <div className="main-menu">
          <h1>Menú Principal</h1>
          <div className="menu-buttons">
            <a href='/board' className="button-link">Ver Tablero</a>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
