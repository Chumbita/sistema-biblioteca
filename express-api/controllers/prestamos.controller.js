import pool from "../config/db.js";

export const getPrestamos = async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM prestamos");

    // Filtra solo los datos de las filas, excluyendo metadatos y datos binarios
    const filteredResults = rows.map((row) => ({
      id: row.id,
      fecha_prestamo: row.fecha_prestamo,
      estado: row.estado,
      fecha_devolucion: row.fecha_devolucion,
      fk_miembros: row.fk_miembros,
      fk_libros: row.fk_libros,
    }));

    // Devuelve solo los datos relevantes en formato JSON
    res.json(filteredResults);
  } catch (e) {
    res.status(500).json({ error: e.message });
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

export const sp_insertar_prestamo = async (req, res) =>{
  const {fk_libros: idLibro, fk_miembros: idMiembro} = req.body;

  try{
    const [result] = await pool.query(
      "CALL sp_insertar_prestamo(?, ?)",
      [idLibro, idMiembro]
    );

    const mensaje = result[0][0].mensaje;

    res.json({message:mensaje});
    
  } catch (e){
    res.status(500).json({message: e.message});
  }
};

export const prestamosController = {
  getPrestamos,
  crearPrestamo,
  devolverLibro,
  sp_insertar_prestamo,
};
