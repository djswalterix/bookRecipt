import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Assumi che 'auth' sia il tuo slice di Redux per l'autenticazione

  if (!isAuthenticated) {
    // Reindirizza l'utente alla pagina di login
    return <Navigate to="/sign-in" />;
  }

  return children;
};
export default ProtectedRoute;
