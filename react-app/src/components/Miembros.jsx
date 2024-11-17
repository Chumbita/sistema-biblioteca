import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

const Miembros = () => {
  const [members, setMembers] = useState([]);
  const { token } = useContext(AuthContext);

  const getMembers = async () => {
    if (!token) {
      console.log("Token is missing or invalid");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/miembros", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error en la petición.");
      }

      const data = await response.json();
      setMembers(data); 
    } catch (error) {
      console.log("Error fetching members:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getMembers();
    }
  }, [token]); 

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-900">Gestión de miembros</h1>
      <table className="table table-striped table-hover mt-10">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Telefono</th>
            {/* <th scope="col">Dirección</th> */}
            {/* <th scope="col">Nacimiento</th> */}
            <th scope="col">Fecha de inicio</th>
            <th scope="col">Fecha de renovación</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.nombre}</td>
                <td>{member.correo_electronico}</td>
                <td>{member.telefono}</td>
                {/* <td>{member.direccion}</td> */}
                {/* <td>{new Date(member.fecha_nacimiento).toLocaleDateString()}</td> */}
                <td>{new Date(member.fecha_inicio_membresia).toLocaleDateString()}</td>
                <td>{new Date(member.fecha_renovacion).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No hay miembros disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Miembros;
