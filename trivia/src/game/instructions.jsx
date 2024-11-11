// Instructions.jsx
import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions-page">
      <h2>Reglas e Instrucciones</h2>
      <h1>Trivia Board Challenge</h1>
      
      <section className="game-intro">
        <h2>Características del Juego</h2>
        <p><strong>Nombre del juego:</strong> Trivia Board Challenge</p>
        <p><strong>Objetivo:</strong> Los jugadores avanzan por un tablero al responder preguntas correctamente. El primero en llegar a la meta gana.</p>
        <p><strong>Jugadores:</strong> Mínimo 2 y máximo 6 jugadores, quienes juegan por turnos no sincrónicos.</p>
        <p><strong>Duración:</strong> La partida finaliza cuando un jugador llega a la última casilla del tablero.</p>
      </section>

      <section className="user-roles">
        <h2>Roles de Usuario</h2>
        <ul>
          <li><strong>Usuario no registrado:</strong> Solo puede ver partidas públicas en progreso.</li>
          <li><strong>Usuario registrado:</strong> Puede participar en partidas, crear nuevas partidas, y tener su propio perfil con estadísticas.</li>
          <li><strong>Administrador:</strong> Gestiona preguntas, colores especiales del tablero y moderación del juego.</li>
        </ul>
      </section>

      <section className="game-play">
        <h2>Comportamiento de la Aplicación</h2>
        <ul>
          <li>El usuario se registra o inicia sesión desde la landing page.</li>
          <li>En el menú principal, puede unirse a una partida o crear una nueva.</li>
          <li>El creador de la partida inicia el juego cuando haya entre 2 y 6 jugadores.</li>
          <li>Durante el turno, cada jugador tira un dado virtual y avanza en el tablero según el número obtenido.</li>
          <li>El color de la casilla determina el tipo de pregunta que deberá responder.</li>
          <li>Una ventana emergente muestra la pregunta, alternativas y un temporizador.</li>
          <li>Si responde correctamente, puede avanzar; si falla, vuelve a la casilla anterior.</li>
        </ul>
      </section>

      <section className="question-categories">
        <h2>Categorías de Preguntas por Color de Casilla</h2>
        <ul>
          <li><span className="red">Rojo:</span> Preguntas de historia.</li>
          <li><span className="blue">Azul:</span> Preguntas de ciencia.</li>
          <li><span className="green">Verde:</span> Preguntas de geografía.</li>
          <li><span className="yellow">Amarillo:</span> Preguntas de cultura general.</li>
          <li><span className="purple">Morado:</span> Preguntas de entretenimiento.</li>
          <li><span className="orange">Naranjo:</span> Preguntas de deporte.</li>
          <li><span className="black">Negro:</span> Casilla especial (pierde el siguiente turno si responde mal).</li>
        </ul>
      </section>

      <section className="special-rules">
        <h2>Reglas Especiales</h2>
        <p>El jugador tiene 15 segundos para responder la pregunta; si no responde a tiempo, se considera incorrecta.</p>
        <ul>
          <li>Respuestas correctas pueden permitir avanzar una o dos casillas adicionales, dependiendo de la dificultad.</li>
          <li>Si responde incorrectamente, el jugador vuelve a la posición original.</li>
          <li>Casilla dorada: responde correctamente para avanzar el doble del lanzamiento del dado.</li>
        </ul>
      </section>
      <a href="/" className="button-link">Volver</a>
    </div>
  );
};

export default Instructions;
