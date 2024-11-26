// Box.jsx
import React from 'react';
import './Box.css';

const Box = ({ id, colour, questions, setCurrentQuestion, setShowQuestion }) => {

    // Manejar el clic en la casilla
    const handleClick = () => {
        const question = selectRandomQuestion({ questions });
        if (question) {
            setCurrentQuestion(question);
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

// Función para seleccionar una pregunta aleatoria de las asociadas a la casilla
const selectRandomQuestion = (box) => {
    console.log('box.questions dentro del componente:', box.questions);
    if (box.questions && box.questions.length > 0) {
        console.log('entré al if');
        const randomIndex = Math.floor(Math.random() * box.questions.length);
        return box.questions[randomIndex];
    }
    console.log('salí del if');
    return null;
};



// Exportación nombrada de selectRandomQuestion para poder usarla en otros componentes
export { selectRandomQuestion };

export default Box;