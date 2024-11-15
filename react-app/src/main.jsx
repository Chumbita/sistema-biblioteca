import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";  // Importa el AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider> {/* Envuelve la aplicación con el AuthProvider */}
    <App />
  </AuthProvider>
);
