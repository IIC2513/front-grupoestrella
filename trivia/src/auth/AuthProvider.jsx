import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";
import React from 'react';

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    function logout() {
        setToken(null)
    }

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;