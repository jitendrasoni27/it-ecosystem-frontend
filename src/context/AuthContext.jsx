import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        const { token, role, ...details } = userData;
        setUserRole(role);
        setToken(token);
        setCurrentUser(details);

        localStorage.setItem('userRole', role);
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(details));
    };

    const logout = () => {
        setUserRole(null);
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ userRole, token, currentUser, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
