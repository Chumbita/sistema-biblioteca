import React from 'react';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

const PDFGenerador = ({books}) => {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de libros", 14, 10);

    const columns = ["Título", "Autor", "Género", "ISBN", "N° Estante", "N° Repisa"];
    const rows = books.map((book) => [
      book.titulo,
      book.autor,
      book.genero,
      book.ISBN,
      book.numero_estante,
      book.numero_repisa,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save("listado-libros.pdf");
  }
  return (
    <button onClick={handleGeneratePDF} type="button" className="btn btn-dark mt-4 ">PDF Listado</button>
  )
}

export default PDFGenerador
