# Trivia Board Challenge - Frontend

Este repositorio contiene el frontend de la aplicación Trivia Board Challenge. Este proyecto está desarrollado con React y Vite y JWT.

## Tecnologías Utilizadas
- **React**: Biblioteca principal para el desarrollo del frontend.
- **Vite**: Herramienta de construcción rápida y ligera.
- **React Router**: Utilizado para la navegación de diferentes rutas.
- **Axios**: Cliente HTTP para hacer las peticiones al backend.
- **Context API**: Manejo de estado global de autenticación con `AuthProvider`.
- **CSS**: Para los estilos de los diferentes componentes.
- **ESLint**: Para mantener un código limpio y consistente.

## Instalación

1. Clonar el repositorio:

2. Instalar dependencias:

   ```sh
   yarn install
   ```

3. Crear un archivo `.env` en la raíz del proyecto con la URL del backend:

   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

## Estructura del Proyecto

*NOTAR QUE no se inlcuyen los css en esta estructura por largo, sin embargo, cada pagina tiene su propio CSS.

```
├── src
│   ├── auth
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   ├── common
│   │   ├── App.jsx
│   │   ├── Routing.jsx
│   │   ├── main.jsx
│   │   ├── LoggedIn.jsx
│   │   ├── index.jsx
│   │   ├── Routing.jsx
│   │   ├── About.jsx
│   ├── game
│   │   ├── Board.jsx
│   │   ├── Box.jsx
│   │   ├── Question.jsx
│   │   ├── BoxButton.jsx
│   ├── profile
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Logout.jsx
│   └── assets
│       └── images
├── public
└── vite.config.js
```

- **`auth`**: Incluye el contexto de autenticación (`AuthContext`) y el proveedor (`AuthProvider`) que permite el manejo de sesiones y autenticación con JWT.
- **`common`**: Contiene componentes comunes como `App.jsx` y `Routing.jsx` para la navegación.
- **`game`**: Contiene todos los componentes relacionados con el juego como `Board`, `Box`, y `Question`.
- **`profile`**: Incluye los componentes de autenticación, `Login` y `Register`, donde los usuarios pueden iniciar sesión y registrarse.

## Funcionalidades

### Registro y Autenticación
- **Registro (`/register`)**: Permite a los usuarios crear una cuenta nueva. Envía una petición al backend para registrar la información del usuario.
- **Login (`/login`)**: Permite a los usuarios autenticar su sesión. Si el login es exitoso, el token JWT se guarda en el almacenamiento local y se actualiza el estado de autenticación.

### Componentes de Juego
- **Tablero de Juego (`Board.jsx`)**: Muestra el tablero con diferentes casillas que corresponden a preguntas de diversas categorías.
- **Casillas (`Box.jsx`)**: Representa cada casilla en el tablero, muestra las preguntas correspondientes al hacer clic.
- **Preguntas (`Question.jsx`)**: Muestra las preguntas asociadas a cada casilla y ofrece opciones de respuesta.

### Manejo de Estado de Sesiones
- Utiliza `AuthContext` y `AuthProvider` para el manejo global del estado de sesión.
- Autenticación con JWT para acceso seguro a recursos restringidos.

### ESLint Configuración
- **`eslint-plugin-react`**: Se configuró para detectar automáticamente la versión de React y para asegurar que el código sigue las mejores prácticas de desarrollo.

## Flujo de Usuario
1. **Registro**: El usuario debe registrarse a través del formulario en `/register`.
2. **Login**: Después de registrarse, el usuario puede iniciar sesión en `/login`.
3. **Acceso al Juego**: Si la autenticación es exitosa, el usuario puede acceder al tablero del juego y ver las preguntas correspondientes a cada categoría.
4. **Cerrar Sesión**: Existe un botón de logout para cerrar la sesión del usuario, eliminando el token de autenticación del almacenamiento local.



