import pool from "../config/db.js";

export const getPrestamos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.fecha_prestamo,
        p.estado,
        p.fecha_devolucion,
        m.nombre AS nombre_miembro,
        l.isbn AS isbn_libro
      FROM prestamos p
      JOIN miembros m ON p.fk_miembros = m.id
      JOIN libros l ON p.fk_libros = l.id
    `);

    const filteredResults = rows.map((row) => ({
      id: row.id,
      fecha_prestamo: row.fecha_prestamo,
      estado: row.estado,
      fecha_devolucion: row.fecha_devolucion,
      nombre_miembro: row.nombre_miembro,
      isbn_libro: row.isbn_libro,
    }));

    res.json(filteredResults);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const sp_insertar_prestamo = async (req, res) =>{
  const {fk_miembros: idMiembro, fk_libros: idLibro} = req.body;

  try{
    const [result] = await pool.query(
      "CALL sp_insertar_prestamo(?, ?)",
      [idMiembro, idLibro]
    );

    const mensaje = result[0][0].mensaje;

    res.json({message:mensaje});
    
  } catch (e){
    res.status(500).json({message: e.message});
  }
};

export const devolverLibro = async (req, res) => {
  const { id } = req.params;
  const { fecha_devolucion } = req.body;
  const estadoPrestamo = "concluido";
  const estadoLibro = "disponible";
  

  try {
    const [prestamo] = await pool.query(
      "SELECT fk_libros FROM prestamos WHERE id = ?",
      [id]
    );

    if (prestamo.length === 0) {
      return res.json({ message: "Préstamo no encontrado" });
    }

    const idLibro = prestamo[0].fk_libros;

    const [result] = await pool.query(
      "UPDATE prestamos SET estado = ?, fecha_devolucion = ? WHERE id = ?",
      [estadoPrestamo, fecha_devolucion, id]
    );

    if (result.affectedRows === 1) {

      await pool.query(
        "UPDATE libros SET estado = ? WHERE id = ?",
        [estadoLibro, idLibro]
      );

      res.json({ message: "Prestamo concluido y libro disponible" });
    } else {
      res.json({ message: "Error al actualizar el prestamo" });
    }
  } catch (e) {
    res.json(e.message);
  }
};



export const prestamosController = {
  getPrestamos,
  sp_insertar_prestamo,
  devolverLibro,
};
