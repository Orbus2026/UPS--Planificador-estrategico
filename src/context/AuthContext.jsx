
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('ups_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Mock authentication logic
        // In a real app, this would be an API call
        if (email === 'admin@ups.edu.ec' && password === 'admin123') {
            const adminUser = {
                id: '1',
                name: 'Dr. Admin',
                email: 'admin@ups.edu.ec',
                role: 'DIRECTOR',
                career: 'General'
            };
            setUser(adminUser);
            localStorage.setItem('ups_user', JSON.stringify(adminUser));
            return { success: true };
        } else if (email === 'docente@ups.edu.ec' && password === 'docente123') {
            const docenteUser = {
                id: '2',
                name: 'Mgtr. Docente',
                email: 'docente@ups.edu.ec',
                role: 'DOCENTE',
                career: 'Psicologia'
            };
            setUser(docenteUser);
            localStorage.setItem('ups_user', JSON.stringify(docenteUser));
            return { success: true };
        } else if (email === 'calidad@ups.edu.ec' && password === 'calidad123') {
            const qualityUser = {
                id: '3',
                name: 'Anl. Acreditación',
                email: 'calidad@ups.edu.ec',
                role: 'ACREDITACIÓN',
                career: 'General'
            };
            setUser(qualityUser);
            localStorage.setItem('ups_user', JSON.stringify(qualityUser));
            return { success: true };
        }
        return { success: false, message: 'Credenciales inválidas' };
    };

    const register = (userData) => {
        // Mock registration - in a real app, this would be an API call
        const role = userData.role === 'GERENTE DOCENTE' ? 'DOCENTE' : (userData.role || 'DOCENTE');
        const newUser = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            role: role
        };
        setUser(newUser);
        localStorage.setItem('ups_user', JSON.stringify(newUser));
        return { success: true };
    };

    const updateUser = (updates) => {
        if (!user) return;
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('ups_user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ups_user');
    };

    const hasPermission = (permission) => {
        if (!user) return false;
        if (user.role === 'DIRECTOR') return true;

        const roles = {
            'DOCENTE': ['manage_initiatives', 'upload_evidence', 'view_reports'],
            'ACREDITACIÓN': ['validate_evidence', 'view_reports', 'audit']
        };

        return roles[user.role]?.includes(permission) || false;
    };

    // Role display normalization helper
    const getRoleLabel = (role) => {
        if (!role) return '';
        if (role === 'DOCENTE' || role === 'GERENTE DOCENTE') return 'ROL DOCENTE';
        return role;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateUser, hasPermission, getRoleLabel }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
