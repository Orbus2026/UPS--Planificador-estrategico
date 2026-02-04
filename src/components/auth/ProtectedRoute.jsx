
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    const location = useLocation();

    // In a real app, we might check a 'loading' state from AuthContext
    // For this mock, we assume 'user' being null means not logged in

    if (!user) {
        // Redirect to login but save the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole && user.role !== 'DIRECTOR') {
        // If user doesn't have the required role and isn't a Director, redirect to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
