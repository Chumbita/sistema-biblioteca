import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading && location.pathname !== "/") {
    return <div>Cargando...</div>; // tambien un gif, mientras verifica el token
  }

  if (!token && location.pathname !== "/") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
