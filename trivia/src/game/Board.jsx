import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';
import Box, { selectRandomQuestion } from './Box';
import Question from './Question';
import Dice from '../assets/images/dice.png';
import WinnerScreen from './WinnerScreen';



const Board = () => {
  const [players, setPlayers] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [diceResult, setDiceResult] = useState(null); // Resultado del dado
  const [isOwner, setIsOwner] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState(0);
  const [winner, setWinner] = useState(null);

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
      if (newPosition >= 50) {
        newPosition=50;
      }
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

      if (newPosition >= 50) {
        handleGameEnd({ winner: playerName });
      }
  
      alert("¡Posición actualizada correctamente!");
    } catch (error) {
      console.error("Error al actualizar la posición del jugador:", error);
      alert("Hubo un problema al actualizar la posición del jugador.");
    }
  };

  const getCurrentPlayer = () => {
    if (players.length === 0) return null;
    return players[currentTurn % players.length]; 
  };
 
  const advanceTurn = async () => {
    try {
      const newTurn = (currentTurn + 1) % players.length; // Calcula el siguiente turno
      setCurrentTurn(newTurn); // Actualiza el estado local inmediatamente
      await axios.put(
        `http://localhost:3000/games/${gameId}/update-turn`,
        { turn: newTurn },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(`Turno actualizado a ${newTurn}`);
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
      alert("Hubo un problema al avanzar el turno.");
    }
  };
  
  

  const handleStartGame = async () => {
    try {

      const response = await axios.post(
        `http://localhost:3000/users/${gameId}/start`, // Ajustamos la URL para no incluir el mail
        { mail: userMail }, // Enviamos el mail como parte del cuerpo
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // En caso de autenticación con token
          },
        }
      );
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
        setPlayers(response.data.players);
      } catch (error) {
        console.error('Error al obtener los jugadores:', error);
      }
    };

    const fetchBoxes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}/boxes`);
        setBoxes(response.data.boxes || []);
      } catch (error) {
        console.error('Error al obtener las boxes:', error);
      }
    };

    const fetchGameInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}`);

        // Verifica si el usuario es el propietario
        setIsOwner(response.data.idOwner === userMail);
        setCurrentTurn(response.data.turn);
        
        if (response.data.status === 2) {
          console.log("El juego ya está finalizado. Redirigiendo a WinnerScreen...");
        }
      } catch (error) {
        console.error('Error al obtener la información del juego:', error);
      }
    };

    const checkGameStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}`);
        setGameStatus(response.data.status); // Actualiza el estado del juego
        setWinner(response.data.winner || null); // Si hay un ganador, actualízalo
      } catch (error) {
        console.error("Error al verificar el estado del juego:", error);
      }
    };

    fetchPlayers();
    fetchBoxes();
    fetchGameInfo();
    checkGameStatus();
    
  }, [gameId]);

  const getPlayersInBox = (boxId) => {
    const adjustedBoxId = boxId - boxes[0]?.boxId; // Ajusta boxId relativo al primer boxId
    return players.filter((player) => Number(player.position) === adjustedBoxId);
  };

  
  const handleGameEnd = async (winner) => {
    setWinner(winner); 
    setGameStatus(2);
  
    try {
      await axios.put(
        `http://localhost:3000/games/${gameId}/end`,
        { status: 2, winner },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error al finalizar el juego:", error);
    }
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
          advanceTurn={advanceTurn}
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
      const playerResponse = await axios.get(`http://localhost:3000/players/name/${name}/${gameId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const currentPlayer = playerResponse.data;
      console.log("Jugador actual:", currentPlayer);
      const currentPosition = currentPlayer.position;
      console.log("Posición actual:", currentPosition);

      // 3. Calcular la nueva posición del jugador
      let casillaBuscada = currentPosition + roll;

      if (casillaBuscada >= 50) {
        casillaBuscada=49;
      }

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
  
  if (gameStatus && winner) {
    return <WinnerScreen winner={winner} players={players} />;
  }

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
    casillaOriginal={players.find((player) => player.name === name)?.position}
    updatePlayerPosition={updatePlayerPosition} 
    advanceTurn={advanceTurn}  // Función para actualizar la posición
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