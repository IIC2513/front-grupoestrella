// Box.jsx
import React from 'react';
import './Box.css';

const Box = ({ id, colour, questions, setCurrentQuestion, setShowQuestion }) => {

    const handleClick = () => {
        if (questions && questions.length > 0) {
            // Seleccionar una pregunta aleatoria de las asociadas a la box
            const randomIndex = Math.floor(Math.random() * questions.length);
            setCurrentQuestion(questions[randomIndex]);
            setShowQuestion(true);
        }
    };

    return (
        <div className={`box ${colour}`} onClick={handleClick}>
            <div className="box-content">
            </div>
        </div>
    );
};

export default Box;
