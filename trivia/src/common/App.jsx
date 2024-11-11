// App.jsx
import React, { useState } from 'react';
import './App.css';

// Importar las imágenes
import ArteImg from '../assets/images/arte.png';
import CienciaImg from '../assets/images/ciencia.png';
import CulturaImg from '../assets/images/cultura.png';
import DeporteImg from '../assets/images/deporte.png';
import GeografiaImg from '../assets/images/geografia.png';
import HistoriaImg from '../assets/images/historia.png';

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
            <a href="/register" className="button-link">Registrarse</a>
          </div>

          {/* Ubicar las imágenes debajo de los botones */}
          <div className="images-container">
            <img src={ArteImg} alt="Arte" />
            <img src={CienciaImg} alt="Ciencia" />
            <img src={CulturaImg} alt="Cultura" />
            <img src={DeporteImg} alt="Deporte" />
            <img src={GeografiaImg} alt="Geografía" />
            <img src={HistoriaImg} alt="Historia" />
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
