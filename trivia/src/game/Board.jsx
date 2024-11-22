import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';
import Box from './Box';
import Question from './Question';

const Board = () => {
  const [players, setPlayers] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const gameId = localStorage.getItem("idGame"); // ID de la partida específica
  const userMail = localStorage.getItem("userMail"); // Correo del usuario

  // Colores de las categorías de casillas
  const categoryColors = {
    'historias': 'red',
    'geografia': 'blue',
    'ciencias': 'green',
    'cultura general': 'yellow',
    'entretenimiento': 'purple',
    'deporte': 'orange'
  };

  const handleStartGame = async () => {
    try {
      console.log("Datos enviados:", { gameId, mail: userMail });

      const response = await axios.post(
        `http://localhost:3000/users/${gameId}/start`, // Ajustamos la URL para no incluir el mail
        { mail: userMail }, // Enviamos el mail como parte del cuerpo
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // En caso de autenticación con token
          },
        }
      );
      console.log('Juego iniciado:', response.data);
      alert("¡La partida ha comenzado!");
      window.location.reload();
    } catch (error) {
      console.error('Error al iniciar el juego:', error);
      alert(error.response?.data?.message || "Hubo un error al intentar iniciar la partida.");
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}/players`);
        console.log('Jugadores recibidos:', response.data);
        setPlayers(response.data.players);
      } catch (error) {
        console.error('Error al obtener los jugadores:', error);
      }
    };

    const fetchBoxes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}/boxes`);
        console.log('Boxes recibidos:', response.data);
        setBoxes(response.data.boxes);
      } catch (error) {
        console.error('Error al obtener las boxes:', error);
      }
    };

    const fetchGameInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}`);
        console.log('Información del juego:', response.data);

        // Verifica si el usuario es el propietario
        setIsOwner(response.data.idOwner === userMail);
      } catch (error) {
        console.error('Error al obtener la información del juego:', error);
      }
    };

    fetchPlayers();
    fetchBoxes();
    fetchGameInfo();
  }, [gameId]);

  const generateBoard = () => {
    return Object.values(boxes).map((box) => (
      <Box
        key={box.boxId}
        id={box.boxId}
        colour={categoryColors[box.category] || 'black'}
        questions={box.questions}
        setCurrentQuestion={setCurrentQuestion}
        setShowQuestion={setShowQuestion}
      />
    ));
  };

  const deleteGame = async (gameId) => {
    const userMail = localStorage.getItem("userMail");
    const token = localStorage.getItem("token");
  
    try {
      console.log("Enviando solicitud con mail y token:", userMail, token);
  
      const response = await axios.delete(
        `http://localhost:3000/users/borrar/${gameId}`,
        {
          data: { mail: userMail }, // Enviamos el mail en el cuerpo de la solicitud
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Asegura que el tipo de contenido esté definido
          },
        }
      );
      console.log("Partida eliminada:", response.data);
      alert("La partida se eliminó correctamente.");
    } catch (error) {
      console.error("Error al eliminar la partida:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Hubo un error al intentar eliminar la partida.");
    }
  };
  
  return (
    <div className="board">
      <h1>Trivia Board Challenge</h1>
      <div className="board-grid">
        {generateBoard()}
      </div>
      <a href='/loggedin' className="button-link">Volver</a>
      {/* Mostrar el botón "Iniciar Juego" solo si no hay boxes */}
    {boxes.length === 0 && (
      <button onClick={handleStartGame} className="button-link start-button">Iniciar Juego</button>
    )}

      {showQuestion && currentQuestion && (
        <Question question={currentQuestion} closeQuestion={() => setShowQuestion(false)} />
      )}

      <h2>Jugadores:</h2>
      <ul>
      {Object.values(players)
  .filter(
    (player, index, self) =>
      index === self.findIndex((p) => p.name === player.name) // Filtra nombres únicos
  )
  .map((player) => (
    <li key={player.id}>
      {player.name} - Color: {player.colour}
    </li>
  ))}

      </ul>
    </div>
  );
};

export default Board;
