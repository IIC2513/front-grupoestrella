import React, { useState } from 'react';
import axios from 'axios';
import './Crear.css'; // Archivo CSS para estilos
import { useNavigate } from 'react-router-dom';

function Crear() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [numeroJugadores, setNumeroJugadores] = useState(2); // Valor inicial en 2
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Datos que se enviarán al backend
        const data = {
            mail: localStorage.getItem('userMail'),
            numeroJugadores: numeroJugadores,
        };

        try {
            // Crear la partida
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`, data,
                {
                    headers: {
                      Authorization: `Bearer ${token}`, // Incluye el token
                    },
                  }
            );
            console.log('Partida creada:', response.data);
            const gameId = response.data.game.id; // ID de la partida creada

            // Registrar al usuario en la partida
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/join-game`, {
                mail: data.mail,
                idGame: gameId,
            },
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Incluye el token
                },
              });
            console.log('Usuario registrado en la partida');

            // Redirigir al tablero
            localStorage.setItem('idGame', gameId); // Guardar el ID de la partida en localStorage
            navigate(`/board`);
        } catch (error) {
            console.error('Error al crear la partida o unirse a ella:', error);
            setMensaje('Hubo un error al crear la partida. Por favor, intenta nuevamente.');
        }
    };


    return (
        <div className="crear-container">
            <h1>Crear Partida</h1>
            {mensaje && <div className="mensaje">{mensaje}</div>}
            <form onSubmit={handleSubmit} className="crear-form">

                <label>
                    Número de Jugadores:
                    <select
                        value={numeroJugadores}
                        onChange={(e) => setNumeroJugadores(Number(e.target.value))}
                        required
                    >
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </label>
                <button type="submit" className="crear-btn">Crear Partida</button>
            </form>
        </div>
    );
}

export default Crear;
