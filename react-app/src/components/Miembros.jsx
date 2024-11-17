import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from "./Modal";

const Miembros = () => {
  const { token } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [errores, setError] = useState([]);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const inputs = [
    { name: "nombre", label: "Nombre", type: "text" },
    { name: "correo_electronico", label: "Email", type: "email" },
    { name: "telefono", label: "Nro Teléfono", type: "text" },
    { name: "direccion", label: "Dirección", type: "text" },
    { name: "fecha_nacimiento", label: "Nacimiento", type: "date" },
    {
      name: "fecha_inicio_membresia",
      label: "Inicio de membresia",
      type: "date",
    },
    { name: "fecha_renovacion", label: "Renovación", type: "date" },
  ];

  // Para obtener los miembros
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
      setError([data.message]);
    }
  };

  useEffect(() => {
    if (token) {
      getMembers();
    }
  }, [token]);

  // Para eliminar un miembro
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
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
      setMessage(data.message);
    } catch (e) {
      setError(data.message);
    }
  };

  //Pra agregar un miembro
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handbleSubmit = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/miembros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMembers((prevMembers) => [
        ...prevMembers,
        { ...formData, id: data.id },
      ]);
      handleCloseModal();
      setFormData({});
      setMessage("Usuario creado exitosamente");
    } catch (e) {
      setError([data.message]);
    }
  };

  // Para editar :)
  const handleEditClick = (member) => {
    // Acá se debe formatear la fecha porque sino no se muestran en los input
    const convertDateFormat = (isoDateString) => {
      if (!isoDateString) return "";
      const date = new Date(isoDateString);
      return date.toISOString().split("T")[0];
    };
    setFormData({
      ...member,
      fecha_nacimiento: member.fecha_nacimiento
        ? convertDateFormat(member.fecha_nacimiento)
        : "",
      fecha_inicio_membresia: member.fecha_inicio_membresia
        ? convertDateFormat(member.fecha_inicio_membresia)
        : "",
      fecha_renovacion: member.fecha_renovacion
        ? convertDateFormat(member.fecha_renovacion)
        : "",
    });
    setModalOpen(true);
  };

  const handleEdit = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/miembros/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === formData.id ? { ...member, ...formData } : member
        )
      );

      const data = await response.json();
      handleCloseModal();
      setFormData({});
      setMessage("Miembro actualizado exitosamente");
    } catch (e) {
      setError([data.message]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-900">Miembros</h1>
      <span className="sm:ml-3 ">
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex mt-4 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Agregar
        </button>
      </span>
      <Modal
        title="Agregar un nuevo miembro"
        isOpen={isModalOpen}
        inputs={inputs}
        formData={formData}
        onClose={handleCloseModal}
        onSubmit={handbleSubmit}
        handleChange={handleChange}
      />
      <Modal
        title="Editar miembro"
        isOpen={isModalOpen}
        inputs={inputs}
        formData={formData}
        onClose={handleCloseModal}
        onSubmit={handleEdit}
        handleChange={handleChange}
      />
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
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
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
                  <i
                    onClick={() => handleEditClick(member)}
                    className="edit-icon bi bi-pencil-square"
                  ></i>
                </td>
                <td className="btn-icon">
                  <i
                    className="edit-delete bi bi-trash-fill"
                    onClick={() => removeMember(member.id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">No hay miembros disponibles</td>
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
