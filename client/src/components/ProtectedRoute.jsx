import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom for redirection
import { useSelector } from "react-redux"; // Import useSelector hook from react-redux for accessing Redux store

// A component to protect routes that require user authentication
const ProtectedRoute = ({ children }) => {
  // Retrieve the authentication state from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Assuming 'auth' is your Redux slice for authentication

  // If the user is not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  // If the user is authenticated, render the children components (protected content)
  return children;
};

export default ProtectedRoute;
