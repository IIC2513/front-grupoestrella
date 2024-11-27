import React from 'react';
import './WinnerScreen.css'; // Archivo CSS para estilos

const WinnerScreen = ({ winner, players }) => {
  return (
    <div className="winner-screen">
      <h1>¡Juego Finalizado!</h1>
      <h2>Ganador: {winner ? winner.name : "Desconocido"}</h2>
      <h3>Posiciones finales:</h3>
      <ul>
        {players
          .sort((a, b) => b.position - a.position) // Ordena por posición
          .map((player, index) => (
            <li key={player.name}>
              {index + 1}. {player.name} - Posición: {player.position}
            </li>
          ))}
      </ul>
      <a href="/loggedin" className="button-link">Volver</a>
    </div>
  );
};

export default WinnerScreen;
