// Board.jsx
import React, { useState } from 'react';
import './Board.css';
import Box from './Box';
import Question from './Question';

const Board = () => {
  const totalSquares = 60; // Número total de casillas en el tablero

  // Colores de las categorías de casillas
  const categories = [
    "red", "blue", "green", "yellow", "purple", "orange", "black", "gold"
  ];

  // Preguntas de ejemplo con respuesta correcta
  const sampleQuestions = [
    { text: "¿Cuál es el océano más grande del mundo?", options: ["Atlántico", "Pacífico", "Índico", "Ártico"], correctAnswer: "Pacífico" },
    { text: "¿Quién pintó la Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], correctAnswer: "Da Vinci" },
    { text: "¿Cuál es la capital de Australia?", options: ["Canberra", "Sydney", "Melbourne", "Perth"], correctAnswer: "Canberra" },
    { text: "¿Cuántos planetas hay en el sistema solar?", options: ["7", "8", "9", "10"], correctAnswer: "8" }
  ];

  // Estado del modal y pregunta actual
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Generar el tablero con las casillas de colores y preguntas
  const generateBoard = () => {
    return Array.from({ length: totalSquares }, (_, index) => (
      <Box
        key={index}
        id={index}
        color={categories[index % categories.length]}
        question={sampleQuestions[index % sampleQuestions.length]}
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
    </div>
  );
};

export default Board;
