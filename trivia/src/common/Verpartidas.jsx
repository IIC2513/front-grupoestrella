// ViewGames.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verpartidas.css';

function ViewGames() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de fetch a la API para obtener las partidas
    fetch(`${import.meta.env.VITE_BACKEND_URL}/games`)
      .then((response) => response.json())
      .then((data) => setGames(data.games || []))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  const handleBack = () => {
    navigate('/loggedin'); // Volver al menú principal
  };

  return (
    <div className="view-games-container">
      <h1>Partidas Disponibles</h1>
      <div className="games-list">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <p><strong>ID:</strong> {game.id}</p>
              <p><strong>Estado:</strong> {game.status === 0 ? 'Pendiente' : 'En Progreso'}</p>
              <p><strong>Turno:</strong> {game.turn}</p>
            </div>
          ))
        ) : (
          <p>No hay partidas disponibles</p>
        )}
      </div>
      <button onClick={handleBack} className="button-link back-button">Volver</button>
    </div>
  );
}

export default ViewGames;
