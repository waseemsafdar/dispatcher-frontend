import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
