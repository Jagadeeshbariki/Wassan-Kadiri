
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  element: React.ReactElement;
  role?: 'customer' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
