// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ import AuthContext

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />; // redirect if not logged in
  }

  return children; // render the protected component if user exists
};

export default PrivateRoute;
