import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from "./Modal";

const Secciones = () => {
  const { token } = useContext(AuthContext);
  const [secciones, setSecciones] = useState([]);
  const [message, setMessage] = useState("");
  const [errores, setError] = useState([]);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const inputs = [
    { name: "nombre_seccion", label: "Sección", type: "text" },
  ];

  //Traemos las ecciones
  const getSecciones = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/secciones", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setSecciones(data);
    } catch (error) {
      setError([data.message]);
    }
  };

  useEffect(() => {
    if (token) {
      getSecciones();
    }
  }, [token]);

  //Pra agregar una seccion
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
      const response = await fetch("http://localhost:3000/secciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setSecciones((prevMembers) => [
        ...prevMembers,
        { ...formData, id: data.id },
      ]);
      handleCloseModal();
      setFormData({});
      setMessage("Sección agregada correctamente");
    } catch (e) {
      setError([data.message]);
    }
  };

  // Para editar seccion
  const handleEditClick = (seccion) => {
    setFormData(seccion);
    setModalOpen(true);
  };

  const handleEdit = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/secciones/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      setSecciones((prevSecciones) =>
        prevSecciones.map((seccion) =>
          seccion.id === formData.id ? { ...seccion, ...formData } : seccion
        )
      );

      const data = await response.json();
      handleCloseModal();
      setFormData({});
      setMessage("Sección agregada exitosamente");
    } catch (e) {
      setError([data.message]);
    }
  };

  // Para borrar una sección
  const removeSeccion = async (id) => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/secciones/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setSecciones((prevSecciones) =>
        prevSecciones.filter((seccion) => seccion.id !== id)
      );
      setMessage(data.message);
    } catch (e) {
      setError(data.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-900">Secciones</h1>
      <button
        type="button"
        onClick={handleOpenModal}
        className="inline-flex mt-4 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Agregar
      </button>
      <Modal
        title="Agregar una nueva sección"
        isOpen={isModalOpen}
        inputs={inputs}
        formData={formData}
        onClose={handleCloseModal}
        onSubmit={handbleSubmit}
        handleChange={handleChange}
      />
      <Modal
        title="Editar sección"
        isOpen={isModalOpen}
        inputs={inputs}
        formData={formData}
        onClose={handleCloseModal}
        onSubmit={handleEdit}
        handleChange={handleChange}
      />
      <table className="table mt-10 ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre de sección</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {secciones.length > 0 ? (
            secciones.map((seccion) => (
              <tr key={seccion.id}>
                <td>{seccion.id}</td>
                <td>{seccion.nombre_seccion}</td>
                <td className="btn-icon">
                  <i
                    onClick={() => handleEditClick(seccion)}
                    className="edit-icon bi bi-pencil-square"
                  ></i>
                </td>
                <td className="btn-icon">
                  <i
                    className="edit-delete bi bi-trash-fill"
                    onClick={() => removeSeccion(seccion.id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">No hay secciones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Secciones;
