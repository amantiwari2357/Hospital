import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            // Critical Fix: Clear old static tokens that cause server crashes
            if (parsedUser.token === 'static-jwt-token-for-dev') {
                console.warn("Found legacy static token. Clearing to force re-login.");
                localStorage.removeItem('userInfo');
                setUser(null);
            } else {
                setUser(parsedUser);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Removed static login for development purposes
        // Real authentication below


        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            'https://hospital-40m0.onrender.com/api/auth/login',
            { email, password },
            config
        );

        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
