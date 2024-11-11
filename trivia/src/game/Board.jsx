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

  const gameId = 8; // ID de la partida específica

  // Colores de las categorías de casillas
  const categoryColors = {
    'historias': 'red',
    'geografia': 'blue',
    'ciencias': 'green',
    'cultura general': 'yellow',
    'entretenimiento': 'purple',
    'deporte': 'orange'
  };

  useEffect(() => {
    // Obtener jugadores de la partida
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}/players`);
        console.log('Jugadores recibidos:', response.data);
        setPlayers(response.data.players);
      } catch (error) {
        console.error('Error al obtener los jugadores:', error);
      }
    };

    // Obtener boxes y sus preguntas asociadas
    const fetchBoxes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${gameId}/boxes`);
        console.log('Boxes recibidos:', response.data);
        setBoxes(response.data.boxes);
      } catch (error) {
        console.error('Error al obtener las boxes:', error);
      }
    };

    fetchPlayers();
    fetchBoxes();
  }, [gameId]);

  const generateBoard = () => {
    return Object.values(boxes).map((box) => (
      <Box
        key={box.boxId}
        id={box.boxId}
        color={categoryColors[box.category] || 'black'}
        questions={box.questions}
        setCurrentQuestion={setCurrentQuestion}
        setShowQuestion={setShowQuestion}
      />
    ));
  };

  return (
    <div className="board">
      <h1>Trivia Board Challenge</h1>
      <div className="board-grid">
        {generateBoard()}
      </div>
      <a href='/' className="button-link">Volver</a>
      {showQuestion && currentQuestion && (
        <Question question={currentQuestion} closeQuestion={() => setShowQuestion(false)} />
      )}
      <h2>Jugadores:</h2>
      <ul>
        {Object.values(players).map((player) => (
          <li key={player.id}>
            {player.name} - Color: {player.colour}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
