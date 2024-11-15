import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lógica de logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);  // Cambiar loading a false después de comprobar el token
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, logout, loading }}>
      {!loading && children}  {/* Esto asegura que los hijos solo se rendericen cuando 'loading' sea false */}
    </AuthContext.Provider>
  );
};
