import { useContext } from "react";

export const apiFetch = async (url, options = {}) => {
  const { token } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error en la petición.");
  }

  return res.json();
};
// services/apiService.js
export const loginService = async (username, password) => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return data;
};

// Funciones para libros
export const fetchLibros = () => apiFetch("http://localhost:3000/libros");

export const fetchLibroByISBN = (isbn) =>
  apiFetch(`http://localhost:3000/libros/${isbn}`);

export const createLibro = (nuevoLibro) =>
  apiFetch("http://localhost:3000/libros", {
    method: "POST",
    body: JSON.stringify(nuevoLibro),
  });

export const updateLibro = (id, datosLibro) =>
  apiFetch(`http://localhost:3000/libros/${id}`, {
    method: "PUT",
    body: JSON.stringify(datosLibro),
  });

export const deleteLirbo = (id) =>
  apiFetch(`http://localhost:3000/libros/${id}`, {
    method: "DELETE",
  });

// Funciones para Miembros
export const fetchMiembros = () => apiFetch("http://localhost:3000/miembros");

export const fetchMiembroById = (id) =>
  apiFetch(`http://localhost:3000/miembros/${id}`);

export const createMiembro = (nuevoMiembro) =>
  apiFetch("http://localhost:3000/miembros", {
    method: "POST",
    body: JSON.stringify(nuevoMiembro),
  });

export const updateMiembro = (id, datosMiembro) =>
  apiFetch(`http://localhost:3000/miembros/${id}`, {
    method: "PUT",
    body: JSON.stringify(datosMiembro),
  });

export const deleteMiembro = (id) =>
  apiFetch(`http://localhost:3000/miembros/${id}`, {
    method: "DELETE",
  });

// Funciones para Secciones
export const fetchPrestamos = () => apiFetch("http://localhost:3000/prestamos");

export const createPrestamo = (nuevoPrestamo) =>
  apiFetch("http://localhost:3000/prestamos", {
    method: "POST",
    body: JSON.stringify(nuevoPrestamo),
  });

export const updatePrestamo = (id, fechaDevolucion) =>
  apiFetch(`http://localhost:3000/prestamos/${id}`, {
    method: "PUT",
    body: JSON.stringify(fechaDevolucion),
  });

// Funciones para Secciones
export const fetchSecciones = () => apiFetch("http://localhost:3000/secciones");

export const createSeccion = (nuevaSeccion) =>
  apiFetch("http://localhost:3000/secciones", {
    method: "POST",
    body: JSON.stringify(nuevaSeccion),
  });

export const updateSeccion = (id, datosSeccion) =>
  apiFetch(`http://localhost:3000/secciones/${id}`, {
    method: "PUT",
    body: JSON.stringify(datosSeccion),
  });

export const deleteSeccion = (id) =>
  apiFetch(`http://localhost:3000/secciones/${id}`, {
    method: "DELETE",
  });
