import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const Libros = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { token } = useContext(AuthContext);

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

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold text-gray-900">Libros</h1>
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
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => setSelectedBook(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Libros;
