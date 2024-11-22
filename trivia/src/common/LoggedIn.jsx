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

const LoggedIn = () => {
  const [isLoggedIn] = useState(true);
  const user = localStorage.getItem('userMail');


  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <div className="landing-page">
          <h1>Bienvenidos a Trivia Board Challenge</h1>
          <p>¡Responde preguntas y avanza en el tablero para ganar!</p>

          <div className="buttons">
            <a href="/login" className="button-link">Inicia sesión</a>
            <a href="/register" className="button-link">Registrarse</a>
          </div>

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
            <a href='/crear' className="button-link">Crear Partida</a>
            <a href='/ver-partida' className="button-link">Ver Partidas</a>
            <a href='/logout' className="button-link">Log out</a>
          </div>

          <div className="images-container">
            <img src={ArteImg} alt="Arte" />
            <img src={CienciaImg} alt="Ciencia" />
            <img src={CulturaImg} alt="Cultura" />
            <img src={DeporteImg} alt="Deporte" />
            <img src={GeografiaImg} alt="Geografía" />
            <img src={HistoriaImg} alt="Historia" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedIn;