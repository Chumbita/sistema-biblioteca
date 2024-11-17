import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Modal from "./Modal";

const Libros = () => {
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const inputs = [
    { name: "titulo", label: "Titulo", type: "text" },
    { name: "autor", label: "Autor", type: "text" },
    { name: "genero", label: "Genero", type: "text" },
    { name: "ISBN", label: "ISBN", type: "text" },
    { name: "numero_estante", label: "Numero de estante", type: "number" },
    { name: "numero_repisa", label: "Numero de repisa", type: "number" },
    { name: "estado", label: "Disponibilidad", type: "text" },
  ];

  const getBooks = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/libros", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getBooks();
    }
  }, [token]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar este libro?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            removeBook(id).then(() => {
              setSelectedBook(null);
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const removeBook = async (id) => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/libros/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setFormData(book);
    setModalOpen(true);
  };

  const handleEdit = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/libros/${selectedBook.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === selectedBook.id ? { ...book, ...formData } : book
          )
        );

        setMessage("Libro actualizado exitosamente");
      } else {
        setError(data.message);
      }

      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold text-gray-900">Libros</h1>
      <span className="sm:ml-3 ">
        <button
          type="button"
          // onClick={handleOpenModal}
          onClick={() =>
            window.open("https://www.instagram.com/chumbitaluciano/", "_blank")
          }
          className="inline-flex mt-4 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Agregar
        </button>
      </span>
      <div className=" max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="group relative"
              onClick={() => setSelectedBook(book)}
            >
              <img
                alt={book.titulo}
                src={`../src/assets/${book.imagen}`}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {book.titulo}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{book.autor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles del libro */}
      {selectedBook && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <Modal
              title="Editar miembro"
              isOpen={isModalOpen}
              inputs={inputs}
              formData={formData}
              onClose={handleCloseModal}
              onSubmit={handleEdit}
              handleChange={handleChange}
            />
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedBook.titulo}
            </h2>
            <img
              className=""
              src={`../src/assets/${selectedBook.imagen}`}
              alt={selectedBook.titulo}
            />
            <p>
              <strong>Autor:</strong> {selectedBook.autor}
            </p>
            <p>
              <strong>Género:</strong> {selectedBook.genero}
            </p>
            <p>
              <strong>ISBN:</strong> {selectedBook.ISBN}
            </p>
            <p>
              <strong>Ubicación:</strong> Estante {selectedBook.numero_estante},
              Repisa {selectedBook.numero_repisa}
            </p>
            <p>
              <strong>Disponibilidad:</strong>{" "}
              {selectedBook.estado ? "Disponible" : "No disponible"}
            </p>
            <div className="d-flex">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg me-3"
                onClick={() => setSelectedBook(null)}
              >
                Cerrar
              </button>

              <button
                className="px-4 py-2 bg-gray-200 rounded-lg me-3"
                onClick={() => handleEditClick(selectedBook)}
              >
                <i className="edit-icon bi bi-pencil-square"></i> Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmDelete(selectedBook.id)}
              >
                <i className="bi bi-trash me-2"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Libros;
