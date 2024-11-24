import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Verpartidas.css';

function VerPartidas() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  // Función para obtener las partidas desde la API
  const fetchGames = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games`);
      setGames(response.data.games || []);
      console.log("Partidas actualizadas:", response.data.games);
    } catch (error) {
      console.error("Error al obtener las partidas:", error);
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

      // Realizar la solicitud POST al backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/join-game`,
        {
          mail: userMail,
          idGame: idGame,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token
          },
        }
      );

      // Confirmar que se unió al juego
      console.log("Unido al juego:", response.data);

      // Navegar a la página de tablero
      navigate('/board');
    } catch (error) {
      console.error("Error al unirse al juego:", error);
      alert("Hubo un error al intentar unirse al juego. Por favor, intenta nuevamente.");
    }
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
              <button
                onClick={() => handleJoinGame(game.id)}
                className="button-link"
                disabled={game.status !== 0} // Deshabilitar si el estado no es 'Pendiente'
              >
                {game.status === 0 ? 'Join' : 'No Disponible'}
              </button>
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

export default VerPartidas;
