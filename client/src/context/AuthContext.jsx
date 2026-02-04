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
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Static login for development purposes
        if (email === 'admin@gmail.com' && password === 'admin123') {
            const staticData = {
                _id: 'static-id-123',
                name: 'Admin User',
                email: 'admin@gmail.com',
                isAdmin: true,
                token: 'static-jwt-token-for-dev'
            };
            localStorage.setItem('userInfo', JSON.stringify(staticData));
            setUser(staticData);
            return staticData;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            'http://localhost:5000/api/auth/login',
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
