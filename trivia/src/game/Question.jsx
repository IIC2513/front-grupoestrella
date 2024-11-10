// Question.jsx
import React, { useState } from 'react';
import './Question.css';

const Question = ({ question, closeQuestion }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Manejar la selección de una opción
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    // Verificar la respuesta y cerrar el modal después
    const handleAnswer = () => {
        if (selectedOption === question.correctAnswer) {
            alert("¡Respuesta correcta!");
        } else {
            alert("Respuesta incorrecta.");
        }
        closeQuestion(); // Cierra el modal después de responder
    };

    return (
        <div className="question-modal">
            <div className="question-content">
                <h2>{question.text}</h2>
                <div className="options">
                    {question.options.map((option, index) => (
                        <button 
                            key={index} 
                            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="buttons-container">
                    <button onClick={closeQuestion} className="close-button">Cerrar</button>
                    <button onClick={handleAnswer} className="answer-button">Responder</button>
                </div>
            </div>
        </div>
    );
};

export default Question;
