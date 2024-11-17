import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./components/Login";
import Libros from "./components/Libros.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import "./index.css";
import Register from "./components/Register";
import Generos from "./components/Generos.jsx";
import Miembros from "./components/Miembros.jsx";
import Prestamos from "./components/Prestamos.jsx";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
                
              </ProtectedRoute>
              
            }
            >
            <Route index element={<Navigate to="libros" replace />} />
            <Route path="libros" element={<Libros />} />
            <Route path="generos" element={<Generos />} />
            <Route path="miembros" element={<Miembros />} />
            <Route path="prestamos" element={<Prestamos />} />
         
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
