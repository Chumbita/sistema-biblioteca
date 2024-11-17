import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Miembros = () => {
  const [members, setMembers] = useState([]);
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [errores, setError] = useState("");
 
  const getMembers = async () => {
    if (!token) {
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

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getMembers();
    }
  }, [token]);

  const removeMember = async (id) => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/miembros/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
      setMessage(data.message)
    } catch (e) {
      setError(data.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-900">Gestión de miembros</h1>
      <span className="sm:ml-3 ">
        <button
          type="button"
          className="inline-flex mt-4 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Agregar
        </button>
      </span>
      <table className="table table-striped table-hover mt-4">
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
            <th scope="col"></th>
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
                <td>
                  {new Date(member.fecha_inicio_membresia).toLocaleDateString()}
                </td>
                <td>
                  {new Date(member.fecha_renovacion).toLocaleDateString()}
                </td>
                <td className="btn-icon">
                  <i className="edit-icon bi bi-pencil-square">
                    <span> </span>
                    <span> </span>
                    <i
                      className="edit-delete bi bi-trash-fill"
                      onClick={() => removeMember(member.id)}
                    ></i>
                  </i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">
                No hay miembros disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {message && (
          <div className="api-message">
            <p className="mt-4 text-center text-sm text-gray-500">{message}</p>
          </div>
        )}
      {errores.length > 0 && (
          <div className="mt-4 text-center text-sm text-red-500">
            {errores.map((error) => (
              <p>{error}</p>
            ))}
          </div>
        )}
    </div>
  );
};

export default Miembros;
