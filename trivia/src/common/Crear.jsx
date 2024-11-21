import React, { useState } from 'react';
import axios from 'axios';
import './Crear.css'; // Archivo CSS para estilos
import { useNavigate } from 'react-router-dom';

function Crear() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [numeroJugadores, setNumeroJugadores] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Datos que se enviarán al backend
        const data = {
            nombreUsuario: nombreUsuario,
            numeroJugadores: numeroJugadores,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/crear-partida`, data);
            console.log('Partida creada:', response.data);
            setMensaje('¡Partida creada exitosamente!');
            // Navegar a otra página si es necesario
            navigate('/loggedin');
        } catch (error) {
            console.error('Error al crear la partida:', error);
            setMensaje('Hubo un error al crear la partida. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div className="crear-container">
            <h1>Crear Partida</h1>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <form onSubmit={handleSubmit} className="crear-form">
                <label>
                    Nombre del Usuario:
                    <input
                        type="text"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Número de Jugadores:
                    <input
                        type="number"
                        value={numeroJugadores}
                        onChange={(e) => setNumeroJugadores(e.target.value)}
                        required
                    />
                </label>
                {/* Agrega más campos aquí según lo que necesites */}
                <button type="submit">Crear Partida</button>
            </form>
        </div>
    );
}

export default Crear;
