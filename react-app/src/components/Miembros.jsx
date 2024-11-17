import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchMiembros } from "../services/apiService";

const Miembros = () => {
    const [members, setMembers] = useState([]);

    const getMembers = async () => {
      const response = await fetchMiembros();
      const members = await response.json();
      setMembers(members);
    }

    useEffect(() => {
      getMembers();
    }, []);

    return (
      <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-900">Gestión de géneros</h1>
      <table className="table table-striped table-hover mt-10 ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Telefono</th>
            <th scope="col">Dirección</th>
            <th scope="col">Nacimiento</th>
            <th scope="col">Fecha de inicio</th>
            <th scope="col">Fecha de renovación</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.nombre}</td>
              <td>{member.correo_electronico}</td>
              <td>{member.telefono}</td>
              <td>{member.direccion}</td>
              <td>{member.fecha_nacimiento}</td>
              <td>{member.fecha_inicio_membresia}</td>
              <td>{member.fecha_renovacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  };
  
  export default Miembros;
  