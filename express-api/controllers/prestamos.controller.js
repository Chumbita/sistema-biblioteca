import pool from "../config/db.js";

export const getPrestamos = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM prestamos");
    res.json(rows);
  } catch (e) {
    res.json(e.message);
  }
};

export const crearPrestamo = async (req, res) => {
  const { fecha_prestamo, estado, fecha_devolucion, fk_miembros, fk_libros } =
    req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO prestamos (fecha_prestamo, estado, fecha_devolucion, fk_miembros, fk_libros) VALUES(?,?,?,?,?)",
      [fecha_prestamo, estado, fecha_devolucion, fk_miembros, fk_libros]
    );
    res.json({ id: result.insertId });
  } catch (e) {
    res.json(e.message);
  }
};

export const devolverLibro = async (req, res) => {
  const { id } = req.params;
  const { fecha_devolucion } = req.body;
  const estado = "concluido";

  try {
    const [result] = await pool.query(
      "UPDATE prestamos SET estado = ?, fecha_devolucion = ? WHERE id = ?",
      [estado, fecha_devolucion, id]
    );
    if (result.affectedRows === 1) {
      res.json({ message: "Prestamo concluido" });
    } else {
      res.json({ message: "Error al actualizar el prestamo" });
    }
  } catch (e) {
    res.json(e.message);
  }
};

export const prestamosController = {
  getPrestamos,
  crearPrestamo,
  devolverLibro,
};
