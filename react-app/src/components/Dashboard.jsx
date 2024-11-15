import React from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useContext } from 'react';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext); // Obtener el token
  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <button onClick={logout}>Cerrar sesión</button> {/* Llamada a logout */}
    </div>
  )
}

export default Dashboard
