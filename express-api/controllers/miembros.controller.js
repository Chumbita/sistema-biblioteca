import pool from "../config/db.js";

const findAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM miembros");
    res.json(rows);
  } catch (error) {
    res.json(error.message);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await pool.query("SELECT * FROM miembros WHERE id = ?", [id]);
    if (row.length === 1) {
      res.json(row[0]);
    } else {
      res.json({ message: "Miembro no encontrado" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

const create = async (req, res) => {
  const {
    id,
    nombre,
    fecha_nacimiento,
    correo_electronico,
    telefono,
    direccion,
    fecha_inicio_membresia,
    fecha_renovacion,
  } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO miembros (nombre, fecha_nacimiento, correo_electronico, telefono, direccion, fecha_inicio_membresia, fecha_renovacion) VALUE (?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        fecha_nacimiento,
        correo_electronico,
        telefono,
        direccion,
        fecha_inicio_membresia,
        fecha_renovacion,
      ]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.json(error.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    fecha_nacimiento,
    correo_electronico,
    telefono,
    direccion,
    fecha_inicio_membresia,
    fecha_renovacion,
  } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE miembros SET nombre = ?, fecha_nacimiento = ?, correo_electronico = ?, telefono = ?, direccion = ?, fecha_inicio_membresia = ?, fecha_renovacion = ? WHERE id = ?",
      [
        nombre,
        fecha_nacimiento,
        correo_electronico,
        telefono,
        direccion,
        fecha_inicio_membresia,
        fecha_renovacion,
        id
      ]
    );
    if (result.affectedRows === 1) {
      res.json({ message: "Miembro actualizado" });
    } else {
      res.json({ message: "Miembro inexistente" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM miembros WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 1) {
      res.json({ message: "Miembro eliminado" });
    } else {
      res.json({ message: "Miembro inexistente" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

export const miembrosController = { findAll, findById, create, update, remove };