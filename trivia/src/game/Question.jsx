import React, { useState } from "react";
import "./Question.css";

const Question = ({ question, closeQuestion, playerName, gameId, casillaBuscada, casillaOriginal, updatePlayerPosition , advanceTurn}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Manejar la selección de una opción
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Verificar la respuesta y actualizar la posición si es correcta
  const handleAnswer = async () => {
    if (selectedOption === question.answer) {
      alert("¡Respuesta correcta!");
      if (playerName && casillaBuscada && gameId) {
        updatePlayerPosition(playerName, gameId, casillaBuscada);
      }
    } else {
      alert("Respuesta incorrecta.");
      if (playerName && casillaBuscada && gameId) {
        updatePlayerPosition(playerName, gameId, casillaOriginal);
      }
    }
    closeQuestion(); 
    await advanceTurn(); 
    await fetchGameInfo();// Cierra el modal después de responder
  };

  return (
    <div className="question-modal">
      <div className="question-content">
        <h2>{question.question}</h2>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option ? "selected" : ""}`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="buttons-container">
          <button onClick={closeQuestion} className="close-button">
            Cerrar
          </button>
          <button onClick={handleAnswer} className="answer-button">
            Responder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
