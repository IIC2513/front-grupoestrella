import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';
import Box, { selectRandomQuestion } from './Box';
import Question from './Question';
import Dice from '../assets/images/dice.png';



const Board = () => {
  const [players, setPlayers] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [diceResult, setDiceResult] = useState(null); // Resultado del dado
  const [isOwner, setIsOwner] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);

  const gameId = localStorage.getItem("idGame"); // ID de la partida específica
  const userMail = localStorage.getItem("userMail"); // Correo del usuario
  const name = localStorage.getItem("name"); 

  // Colores de las categorías de casillas
  const categoryColors = {
    'historias': 'red',
    'geografia': 'blue',
    'ciencias': 'green',
    'cultura': 'yellow',
    'entretenimiento': 'purple',
    'deporte': 'orange',
  };
  
  const updatePlayerPosition = async (playerName, gameId, newPosition) => {
    try {
      console.log(`Actualizando posición: ${playerName}, Juego: ${gameId}, Nueva Posición: ${newPosition}`);
      const response = await axios.put(
        `http://localhost:3000/players/${gameId}/${playerName}/update-position`,
        { newPosition },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
  
      // Actualizar la posición localmente
      const updatedPlayers = players.map((player) =>
        player.name === playerName ? { ...player, position: newPosition } : player
      );
      setPlayers(updatedPlayers);
  
      alert("¡Posición actualizada correctamente!");
    } catch (error) {
      console.error("Error al actualizar la posición del jugador:", error);
      alert("Hubo un problema al actualizar la posición del jugador.");
    }
  };

  const getCurrentPlayer = () => {
    if (players.length === 0) return null;
    return players[currentTurn % players.length]; // Usa módulo para evitar desbordamiento
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
        console.log('Boxes recibidos:', response.data); // Verifica estructura
        setBoxes(response.data.boxes || []);
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
        setCurrentTurn(response.data.turn);
      } catch (error) {
        console.error('Error al obtener la información del juego:', error);
      }
    };

    fetchPlayers();
    fetchBoxes();
    fetchGameInfo();
  }, [gameId]);

  const getPlayersInBox = (boxId) => {
    const adjustedBoxId = boxId - boxes[0]?.boxId; // Ajusta boxId relativo al primer boxId
    return players.filter((player) => Number(player.position) === adjustedBoxId);
  };
  

  const generateBoard = () => {
    if (boxes.length === 0)if (boxes.length === 0) {
      return (
        <div className="centered-container">
          <p>Inicia juego para visualizar tablero...</p>
        </div>
      );
    }
    
    return Object.values(boxes).map((box) => {
      const playersInBox = getPlayersInBox(box.boxId);
      return (
        <Box
          key={box.boxId}
          id={box.boxId}
          colour={categoryColors[box.category] || 'black'}
          playersInBox={playersInBox}
        />
      );
    });
  };

  const handlePlay = async () => {

    try {
      // 1. Generar un número aleatorio entre 1 y 6
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceResult(roll); // Mostrar el resultado del dado en la interfaz

      // 2. Obtener la posición actual del jugador desde el backend
      const playerResponse = await axios.get(`http://localhost:3000/players/name/${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const currentPlayer = playerResponse.data;
      console.log("Jugador actual:", currentPlayer);
      const currentPosition = currentPlayer.position;
      console.log("Posición actual:", currentPosition);

      // 3. Calcular la nueva posición del jugador
      const casillaBuscada = currentPosition + roll;

      console.log("Casilla buscada es la", casillaBuscada);

      // 5. Hacer una nueva petición para obtener las preguntas asociadas a la casilla
      const boxResponse = await axios.get(
        `http://localhost:3000/games/${gameId}/boxes/${casillaBuscada}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
  
      const box = boxResponse.data.box;
      console.log("Box recibido:", box);
      console.log("Preguntas recibidas:", box.questions);
  
      // 4. Select a random question
      if (box && box.questions && box.questions.length > 0) {
        const question = selectRandomQuestion(box);
        setCurrentQuestion({
          ...question,
          playerName: currentPlayer.name,
          casillaBuscada,
          gameId,
        });
        setShowQuestion(true);

        const playersResponse = await axios.get(
          `http://localhost:3000/games/${gameId}/players`
        );
        const boxesResponse = await axios.get(
          `http://localhost:3000/games/${gameId}/boxes`
        );
        
      setPlayers(playersResponse.data.players);
      console.log("Jugadores actualizados:", playersResponse.data.players);
      setBoxes(boxesResponse.data.boxes); 
        
      } else {
        alert("No hay preguntas disponibles para esta casilla.");
      }
    } catch (error) {
      console.error("Error al mover al jugador o al obtener la pregunta:", error);
      alert("Hubo un problema al realizar el movimiento. Inténtalo de nuevo.");
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

<div className="dice-container">
  <img src={Dice} className="dice-image" />
  {getCurrentPlayer()?.name === name ? (
    <button onClick={handlePlay} className="button-link play-button">
      Jugar
    </button>
  ) : (
    <button className="button-link play-button disabled" disabled>
      Esperando turno
    </button>
  )}
  {diceResult !== null && <p>Resultado del dado: {diceResult}</p>}
</div>
      {showQuestion && currentQuestion && (
  <Question
    question={currentQuestion}
    closeQuestion={() => setShowQuestion(false)}
    playerName={name} // Nombre del jugador
    gameId={gameId} // ID del juego
    casillaBuscada={diceResult + players.find((player) => player.name === name)?.position}
    updatePlayerPosition={updatePlayerPosition} // Función para actualizar la posición
  />
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
              {player.name} - Posicion: {player.position}
            </li>
          ))}
      </ul>
      <h2>Turno de: {getCurrentPlayer()?.name || "Cargando..."}</h2>
    </div>
  );
};

export default Board;