import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext';

interface User {
    name: string;
    email: string;
    role: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    // provider lee el local storage por primera vez para ver si tiene un usuario logueado
    useEffect(() => {
        try {
            const userSerializado = localStorage.getItem('user');
            if (userSerializado) {
                const storedUser = JSON.parse(userSerializado) as User;
            setUser(storedUser);
        }
    } 
    catch (error) {
        console.error("Error al parsear usuario de localStorage", error);
        localStorage.removeItem('user'); 
    } 
    
}, []);

    // estas funciones se llaman desde loginPage
    const login = (userData: User) => {
        setUser({
            name:userData.name, 
            email:userData.email, 
            role:userData.role
        }); // al cambiar el estado los componentes suscriptos(que leen el contexto) se re-renderizan. En este caso el Navbar
        localStorage.setItem('user', JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}