import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MisPartidas.css';

function MisPartidas() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  // Función para obtener las partidas desde la API
  const fetchGames = async () => {
    try {
      const userMail = localStorage.getItem('userMail'); // Obtenemos el email del usuario desde localStorage
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/${userMail}/games`);
      setGames(response.data.games || []);
      console.log("Partidas del jugador actualizadas:", response.data.games);
    } catch (error) {
      console.error("Error al obtener las partidas del jugador:", error);
    }
  };

  useEffect(() => {
    // Cargar las partidas al montar el componente
    fetchGames();

    // Configurar un intervalo para actualizar las partidas cada 5 segundos
    const intervalId = setInterval(() => {
      fetchGames();
    }, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const handleBack = () => {
    navigate('/loggedin'); // Volver al menú principal
  };

  const handleJoinGame = async (idGame) => {
    try {
      // Obtener el mail del usuario desde localStorage
      const userMail = localStorage.getItem('userMail');
      const token = localStorage.getItem('token');
      console.log("Enviando", userMail);
      if (!userMail) {
        alert("No se encontró el correo del usuario. Por favor, inicia sesión.");
        return;
      }

      // Guardar el ID del juego en localStorage para usarlo en Board
      localStorage.setItem('idGame', idGame);

      // Navegar a la página de tablero
      navigate('/board');
    } catch (error) {
      console.error("Error al intentar entrar en la partida:", error);
      alert("Hubo un error al intentar entrar en la partida. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="view-games-container">
      <h1>Mis Partidas</h1>
      <div className="games-list">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <p><strong>ID:</strong> {game.id}</p>
              <p><strong>Estado:</strong> {game.status === 0 ? 'Pendiente' : 'En Progreso'}</p>
              <p><strong>Turno:</strong> {game.turn}</p>
              <button onClick={() => handleJoinGame(game.id)} className="button-link">
                Continuar Partida
              </button>
            </div>
          ))
        ) : (
          <p>No tienes partidas disponibles</p>
        )}
      </div>
      <button onClick={handleBack} className="button-link back-button">Volver</button>
    </div>
  );
}

export default MisPartidas;