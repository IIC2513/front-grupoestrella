import {createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    return (
        <div>
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
        console.log('hola')
        </div>
    );
};