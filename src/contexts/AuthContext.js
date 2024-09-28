import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const Navigate = useNavigate()

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setIsAuthenticated(true);
            // console.log(isAuthenticated)
        } else {
            Navigate('/login')
        }
    }, []);
    // 
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        Navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
