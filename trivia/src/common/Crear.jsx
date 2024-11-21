import React, { useState } from 'react';
import axios from 'axios';
import './Crear.css'; // Archivo CSS para estilos
import { useNavigate } from 'react-router-dom';

function Crear() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [numeroJugadores, setNumeroJugadores] = useState(2); // Valor inicial en 2
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Datos que se enviarán al backend
        const data = {
            mail: localStorage.getItem('userMail'),
            numeroJugadores: numeroJugadores,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`, data);
            console.log('Partida creada:', response.data);
            setMensaje('¡Partida creada exitosamente!');
            setTimeout(() => {
                navigate('/loggedin'); // Navegar de regreso después de un éxito
            }, 2000);
        } catch (error) {
            console.error('Error al crear la partida:', error);
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
