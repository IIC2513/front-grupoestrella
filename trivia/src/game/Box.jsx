// Box.jsx
import React from 'react';
import './Box.css';

const Box = ({ id, colour, questions, setCurrentQuestion, setShowQuestion, playersInBox}) => {

    // Manejar el clic en la casilla
    const handleClick = () => {
        const question = selectRandomQuestion({ questions });
        if (question) {
            setCurrentQuestion(question);
            setShowQuestion(true);
        }
    };
    const getPosition = (index) => {
        const gridSize = Math.ceil(Math.sqrt(playersInBox.length)); // Define una cuadrícula dinámica
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
    
        const cellSize = 100 / gridSize; // Tamaño relativo de cada celda
        return {
          top: `${row * cellSize + cellSize / 4}%`,
          left: `${col * cellSize + cellSize / 4}%`,
        };
      };
    

    return (<div className={`box ${colour}`}>
        <div className="box-content">
    {playersInBox.map((player, index) => (
    <div
      key={index}
      className="player-token"
      style={{
        backgroundColor: player.colour || 'white', // Usa el color asociado al jugador
        ...getPosition(index),
      }}
      title={player.name} // Tooltip con el nombre del jugador
    >
      {/* Puedes agregar texto o un ícono dentro de la ficha */}
      {player.name[0]} {/* Primera letra del nombre */}
    </div>
  ))}
</div>
</div>);
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