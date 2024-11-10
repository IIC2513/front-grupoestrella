// Box.jsx
import React from 'react';
import './Box.css';

const Box = ({ id, color, question, setCurrentQuestion, setShowQuestion }) => {

    const handleClick = () => {
        setCurrentQuestion(question);
        setShowQuestion(true);
    };

    return (
        <div className={`box ${color}`} onClick={handleClick}>
            {/* El Box no muestra nada adicional; solo abre la pregunta al hacer clic */}
        </div>
    );
};

export default Box;
