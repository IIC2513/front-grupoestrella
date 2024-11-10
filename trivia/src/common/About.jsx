// About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>Acerca de Trivia Board Challenge</h1>
      
      <section className="about-game">
        <h2>Sobre el Juego</h2>
        <p>Trivia Board Challenge es un juego en el que los jugadores avanzan a través de un tablero al responder correctamente preguntas de diferentes categorías. El objetivo es llegar a la meta antes que los demás jugadores. Las preguntas cubren temas como historia, ciencia, geografía, cultura general, entretenimiento y deportes, y cada turno trae consigo un nuevo desafío.</p>
      </section>

      <section className="game-objective">
        <h2>Objetivo del Juego</h2>
        <p>El propósito de Trivia Board Challenge es ofrecer una experiencia divertida y educativa en la que los jugadores pongan a prueba sus conocimientos mientras compiten entre sí. Este juego está diseñado para ser accesible tanto para jugadores ocasionales como para quienes desean una competencia más intensa.</p>
      </section>

      <section className="team-section">
        <h2>Equipo de Desarrollo</h2>
        <ul>
          <li><strong>Stefano Arata</strong> - Desarrollador Principal y Diseñador</li>
          <li><strong>Jaime Bendersky</strong> - Desarrollador Backend y Coordinador de Proyecto</li>
          <li><strong>Matilde Valdés</strong> - Especialista en Contenidos y Testing</li>
        </ul>
        <p>Nuestro equipo está compuesto por estudiantes apasionados de la tecnología y el aprendizaje, unidos por el objetivo de crear una plataforma interactiva y educativa. Cada miembro ha contribuido con su talento y habilidades únicas para hacer que Trivia Board Challenge sea una realidad.</p>
      </section>

      <a href="/" className="back-button">Volver</a>

        
    </div>
  );
};

export default About;
