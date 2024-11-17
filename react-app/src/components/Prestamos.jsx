import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from "./Modal";

const Prestamos = () => {
  const { token } = useContext(AuthContext);
  const [prestamos, setPrestamos] = useState([]);
  const [message, setMessage] = useState("");
  const [errores, setError] = useState([]);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const inputs = [
    { name: "fk_miembros", label: "ID Miembro", type: "number" },
    { name: "fk_libros", label: "ID Libro", type: "number" },
  ];


  const getPrestamos = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/prestamos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPrestamos(data);
    } catch (error) {
      setError([error.message]);
    }
  };

  useEffect(() => {
    if (token) {
      getPrestamos();
    }
  }, [token]);


  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/prestamos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      handleCloseModal();
      setFormData({});
      getPrestamos();
    } catch (error) {
      setError([error.message]);
    }
  };


  const devolverPrestamo = async (id) => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/prestamos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fecha_devolucion: new Date().toISOString() }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      getPrestamos();
    } catch (error) {
      setError([error.message]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-900">Préstamos</h1>
      <span className="sm:ml-3">
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex mt-4 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Agregar Préstamo
        </button>
      </span>
      <Modal
        title="Agregar un nuevo préstamo"
        isOpen={isModalOpen}
        inputs={inputs}
        formData={formData}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <table className="table table-striped table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Fecha Préstamo</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Devolución</th>
            <th scope="col">Nombre del Miembro</th>
            <th scope="col">ISBN del Libro</th>
            <th scope="col">Devolver</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.length > 0 ? (
            prestamos.map((prestamo) => (
              <tr key={prestamo.id}>
                <td>{prestamo.id}</td>
                <td>{new Date(prestamo.fecha_prestamo).toLocaleDateString()}</td>
                <td>{prestamo.estado}</td>
                <td>
                  {prestamo.fecha_devolucion
                    ? new Date(prestamo.fecha_devolucion).toLocaleDateString()
                    : "No devuelto"}
                </td>
                <td>{prestamo.nombre_miembro}</td>
                <td>{prestamo.isbn_libro}</td>
                <td>
                  {prestamo.estado === "vigente" && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => devolverPrestamo(prestamo.id)}
                    >
                      Devolver
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="7">
                No hay préstamos disponibles
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
          {errores.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prestamos;
